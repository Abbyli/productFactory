dojo.provide("unieap.ImageViewer");
dojo.require("unieap.form.Button");
dojo.require("unieap.form.NumberSpinner");
dojo.declare("unieap.ImageViewer", [dijit._Widget, dijit._Templated], {
	/**
	 * @declaredClass:
	 * 		unieap.ImageViewer
	 * @superClass:
	 * 		dijit._Widget, dijit._Templated
	 * @summary:
	 * 		图片浏览功能，并可对照片进行缩放和旋转
	 * @example:
	 * |<div dojoType="unieap.widget.ImageViewer" src="img.png"></div>
	 * 		显示路径为“img.png”的图片
	 */
	 
	//配置属性接口 
	UserInterfaces : dojo.mixin({
		src : "string",
		width : "string",
		height : "string",
		zoom: "string",
		setSrc : "function",
		setWidth : "function",
		setHeight : "function",
		setZoom: "function"
	}),
	
	/**
	 * @summary:
	 * 		图片的路径
	 * @type:
	 * 		{string}
	 */
	src: '',
	
	/**
	 * @summary:
	 * 		组件宽度，默认为“400px”
	 * @type:
	 * 		{string}
	 */
	width: '400px',
	
	/**
	 * @summary:
	 * 		组件的高度，默认为“500px”
	 * @type:
	 * 		{string}
	 */
	height: '500px',
	
	/**
	 * @summary:
	 * 		缩放相关信息
	 * @type:
	 * 		{string}
	 * @example:
	 *      {"maxZoom":"200%", "minZoom": "10%", "delta": "20", "multiple":"1.6"}
	 */
	zoom: '',
	
	// 全局相关
	_multiple: 2,
	_delta: 10,
	_maxZoom: 200,
	_minZoom: 20,
	_isInitialized: false,
	_isFit: false,
	
	// 缩放相关
	_isImageLoaded: false,
	_currentZoomRate: 1,
	_zoomRateNumberSpinner: null,
	_originalWidth: 0,
	_originalHeight: 0,
	
	// 拖拽图片相关
	_isDragEnable: true,
	_isDragging: false,
	_oldX: 0,
	_oldY: 0,
	
	// 旋转图片相关
	_currentRotateAngle: 0,
	
	templateString:
			'<div dojoAttachPoint="domNode">' + 
				'<div dojoAttachPoint="wrapperNode">' +
					'<img dojoAttachPoint="imgNode"></img>' +
					'<div dojoAttachPoint="toobarNode"></div>' +
				'</div>' +
			'</div>',
			
	postCreate:function(){
		this.inherited(arguments);
		
		dojo.addClass(this.wrapperNode, 'imageviewer-wrapper');
		dojo.addClass(this.imgNode, 'imageviewer-image');
		dojo.addClass(this.toobarNode, 'imageviewer-toolbar');
		this.width&&this.setWidth(this.width);
		this.height&&this.setHeight(this.height);
		this.zoom&&this.setZoom(this.zoom);
		
		this.connect(this.imgNode, 'onload', this._handleImageLoadEvent);
		
		this.src&&this.setSrc(this.src);
	},
	
	// 绑定事件
	_bind:function(){
		this.connect(this.imgNode, 'mousedown', this._handleMouseDownEvent);
		this.connect(this.imgNode, 'mousemove', this._handleMouseMoveEvent);
		this.connect(this.imgNode, 'mouseup', this._handleMouseUpEvent);
		this.connect(this.imgNode, 'mouseout', this._handleMouseUpEvent);
		
		var browser = this._browser();
		if(browser.firefox) {
			this.connect(this.imgNode, 'DOMMouseScroll', this._handleMouseWheelEvent);
		} else {
			this.connect(this.imgNode, 'mousewheel', this._handleMouseWheelEvent);
		}
		
		this.connect(this.toobarNode, 'mouseout', this._handleToolbarOutEvent);
	},
	
	// 创建工具栏
	_createToolbar:function() {
		this._createLeftRotateButton();
		this._createRightRotateButton();
		this._createFitButton();
		this._createZoomOutButton();
		this._createZoomInButton();
		this._createZoomPercentDIV();
		this._createZoomRateInput();
	},
	_createLeftRotateButton:function(){
		var leftRotateButton = new unieap.form.Button({
			iconClass: 'imageviewer-toolbar-icon-rotate-left',
			width: '50px',
			height: '40px'
		});
		dojo.addClass(leftRotateButton.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(leftRotateButton.domNode, 'imageviewer-toolbar-btn-rotate-left');
		this.toobarNode.appendChild(leftRotateButton.domNode);
		this.connect(leftRotateButton, 'onClick', this._handleLeftRotateEvent);
	},
	_createRightRotateButton:function(){
		var rightRotateButton = new unieap.form.Button({
			iconClass: 'imageviewer-toolbar-icon-rotate-right',
			width: '50px',
			height: '40px'
		});
		dojo.addClass(rightRotateButton.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(rightRotateButton.domNode, 'imageviewer-toolbar-btn-rotate-right');
		this.toobarNode.appendChild(rightRotateButton.domNode);
		this.connect(rightRotateButton, 'onClick', this._handleRightRotateEvent);
	},
	_createFitButton:function(){
		var rightRotateButton = new unieap.form.Button({
			iconClass: 'imageviewer-toolbar-icon-fit',
			width: '50px',
			height: '40px'
		});
		dojo.addClass(rightRotateButton.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(rightRotateButton.domNode, 'imageviewer-toolbar-btn-fit');
		this.toobarNode.appendChild(rightRotateButton.domNode);
		this.connect(rightRotateButton, 'onClick', this._handleFitEvent);
	},
	_createZoomRateInput:function(){
		var zoomRateNumberSpinner = this._zoomRateNumberSpinner = new unieap.form.NumberSpinner({
			smallDelta: this._delta,
			constraints: {max: this._maxZoom, min: this._minZoom}
		});
		zoomRateNumberSpinner.setValue(100);
		dojo.addClass(zoomRateNumberSpinner.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(zoomRateNumberSpinner.domNode, 'imageviewer-toolbar-input-zoom-rate');
		this.toobarNode.appendChild(zoomRateNumberSpinner.domNode);
		this.connect(zoomRateNumberSpinner.iconUpNode, 'mouseup', this._handleAdaptZoomRateEvent);
		this.connect(zoomRateNumberSpinner.iconDownNode, 'mouseup', this._handleAdaptZoomRateEvent);
		this.connect(zoomRateNumberSpinner.inputNode, 'onchange', this._handleAdaptZoomRateEvent);
	},
	_createZoomPercentDIV:function() {
		var zoomPercentDiv = dojo.create("div", {innerHTML: "%"});
		dojo.style(zoomPercentDiv, {"float": "right", "marginTop": "15px"});
		dojo.addClass(zoomPercentDiv, 'imageviewer-toolbar-common');
		dojo.addClass(zoomPercentDiv, 'imageviewer-toolbar-zoom-percent');
		this.toobarNode.appendChild(zoomPercentDiv);
	},
	_createZoomOutButton:function(){
		var zoomOutButton = new unieap.form.Button({
			iconClass: 'imageviewer-toolbar-icon-zoom-out',
			width: '50px',
			height: '40px'
		});
		dojo.addClass(zoomOutButton.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(zoomOutButton.domNode, 'imageviewer-toolbar-btn-zoom-out');
		this.toobarNode.appendChild(zoomOutButton.domNode);
		this.connect(zoomOutButton, 'onClick', this._handleZoomOutEvent);
	},
	_createZoomInButton:function(){
		var zoomInButton = new unieap.form.Button({
			iconClass: 'imageviewer-toolbar-icon-zoom-in',
			width: '50px',
			height: '40px'
		});
		dojo.addClass(zoomInButton.domNode, 'imageviewer-toolbar-common');
		dojo.addClass(zoomInButton.domNode, 'imageviewer-toolbar-btn-zoom-in');
		this.toobarNode.appendChild(zoomInButton.domNode);
		this.connect(zoomInButton, 'onClick', this._handleZoomInEvent);
	},
	
	// 工具方法
	_browser: function () {
		var t = true

		function detect(ua) {

			function getFirstMatch(regex) {
				var match = ua.match(regex);
				return (match && match.length > 1 && match[1]) || '';
			}

			if (/opera|opr/i.test(ua)) {
				result = {
					name: 'Opera'
					, opera: t
					, version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
				}
			} else if (/msie|trident/i.test(ua)) {
				result = {
					name: 'Internet Explorer'
					, msie: t
					, version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
				}
			} else if (/chrome|crios|crmo/i.test(ua)) {
				result = {
					name: 'Chrome'
					, chrome: t
					, version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
				}
			} else if (/firefox|iceweasel/i.test(ua)) {
				result = {
					name: 'Firefox'
					, firefox: t
					, version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
				}
				if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
					result.firefoxos = t
				}
			} else if (/safari/i.test(ua)) {
				result = {
					name: 'Safari'
					, safari: t
					, version: versionIdentifier
				}
			} else result = {}

			return result
		}

		var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

		bowser._detect = detect;

		return bowser
	},
	
	_waitingImageLoaded:function() {
		if(!this._isImageLoaded) {
			var THIS = this;
			setTimeout(function(){THIS._waitingImageLoaded.apply(THIS);}, 500);
		} else {
			// 初始化图片大小信息
			var imageSize = this._getImageSize();
			this._originalWidth = imageSize['width'];
			this._originalHeight = imageSize['height'];
			
			if(!this._isIniliazed) {
				// 创建工具栏
				this._createToolbar();
				
				// 绑定图片事件
				this._bind();
				
				this._isIniliazed = true;
			}

			// 自动适配并居中
			this._fit();
			this._center();
		}
	},
	
	_getContainerSize:function() {
		var containnerPosition = dojo.position(this.domNode);
		return {
			'width': containnerPosition.w,
			 'height': containnerPosition.h
		};
	},
	_getImageSize:function() {
		var containnerPosition = dojo.position(this.imgNode);
		return {
			'width': containnerPosition.w,
			 'height': containnerPosition.h
		};
	},
	
	_getImagePosition:function() {
		var x = dojo.style(this.imgNode, 'left');
		var y = dojo.style(this.imgNode, 'top');
		return {
			'x': x,
			'y': y
		};
	},
	
	_center:function(){
		var containerSize = this._getContainerSize();
		var imageSize = this._getImageSize();
		
		var fitX = Math.round((containerSize['width'] - imageSize['width']) / 2);
		var fitY = Math.round((containerSize['height'] - imageSize['height']) / 2);
		
		this._setImagePosition(fitX, fitY);
	},
	
	_fit:function(){
		var containerSize = this._getContainerSize();
		
		var widthZoomRate = containerSize['width'] / this._originalWidth;
		var heightZoomRage = containerSize['height'] / this._originalHeight;
		
		var zoomRate = widthZoomRate < heightZoomRage ? widthZoomRate : heightZoomRage;
		this._setZoom(this._preprocessZoomRate(zoomRate));
		
		this._isFit = true;
	},
	
	_preprocessZoomRate:function(zoomRate) {
		var zoom = Math.round(zoomRate * 100);
		zoom = zoom > this._maxZoom ? this._maxZoom : (zoom < this._minZoom ? this._minZoom : zoom);
		this._zoomRateNumberSpinner.inputNode.value = zoom;
		return zoom / 100;
	},
	
	_getXFromEvent:function(event){
		var x = event.x; // IE
		if(typeof x === 'undefined' || x === null) {
			x = event.clientX; // FF
		}
		return x;
	},
	
	_getYFromEvent:function(event){
		var y = event.y; // IE
		if(typeof y === 'undefined' || y === null) {
			y = event.clientY; // FF
		}
		return y;
	},
	
	// 缩放相关方法
	_setZoom:function(zoomRate){
		this._currentZoomRate = zoomRate;
		
		var newWidth = Math.round(this._originalWidth * zoomRate);
		var newHeight = Math.round(this._originalHeight * zoomRate);
		
		var containerSize = this._getContainerSize();
		this._isDragEnable = newHeight > containerSize['height'] || newWidth > containerSize['width'];
		
		dojo.style(this.imgNode, 'width', newWidth+'px');
		dojo.style(this.imgNode, 'height', newHeight+'px');
		
		if(!this._isDragEnable) this._center();
		
		this._isFit = false;
	},
	
	_moveImage:function(oldX, oldY, newX, newY) {
		var browser = this._browser();
		
		var offsetX = newX - oldX;
		var offsetY = newY - oldY;
		
		var imagePosition = this._getImagePosition();
		var imageSize = this._getImageSize();
		var containnerSize = this._getContainerSize();
		
		var x = imagePosition['x'] + offsetX;
		var minX = containnerSize['width'] - imageSize['width'];
		
		//修复在Firefox和chrome下，旋转90度后位置偏移的问题
		var xFix = 0;
		if(browser.firefox || browser.chrome) {
			if(!(this._currentRotateAngle / 90 % 2 == 0)) {
				xFix = (imageSize['width'] - imageSize['height']) / 2;
			}
		}
		
		var y = imagePosition['y'] + offsetY;
		var minY = containnerSize['height'] - imageSize['height'];
		
		//修复在Firefox和chrome下，旋转90度后位置偏移的问题
		var yFix = 0;
		if(browser.firefox || browser.chrome) {
			if(!(this._currentRotateAngle / 90 % 2 == 0)) {
				yFix = -((imageSize['width'] - imageSize['height']) / 2);
			}
		}
		
		if(x > (0 + xFix)) {
			x = 0 + xFix;
		} else if(x < (minX + xFix)) {
			x = minX + xFix;
		}
		
		if(y > (0 + yFix)) {
			y = 0 + yFix;
		} else if(y < (minY + yFix)) {
			y = minY + yFix;
		}
		
		if(imagePosition['x'] > 0) {
			var fitX = Math.round((containnerSize['width'] - imageSize['width']) / 2);
			this._setImagePosition(fitX, y);
		} else if(imagePosition['y'] > 0) {
			var fitY = Math.round((containnerSize['height'] - imageSize['height']) / 2);
			this._setImagePosition(x, fitY);
		} else this._setImagePosition(x, y);
		
		this._isFit = false;
	},
	
	_setImagePosition:function(x, y){
		dojo.style(this.imgNode, 'left', Math.round(x)+'px');
		dojo.style(this.imgNode, 'top', Math.round(y)+'px');
	},
	
	//旋转相关方法
	_rotate:function(angle) {
		while(angle < 0) angle += 360;
		while(angle > 360) angle -= 360;
		
		// 清理所有旋转 class 属性
		dojo.removeClass(this.imgNode, 'imageviewer-image-rotate90');
		dojo.removeClass(this.imgNode, 'imageviewer-image-rotate180');
		dojo.removeClass(this.imgNode, 'imageviewer-image-rotate270');
		
		switch (angle) {
			case 0:
				// do nothing
				break;
				
			case 90:
				dojo.addClass(this.imgNode, 'imageviewer-image-rotate90');
				break;
				
			case 180:
				dojo.addClass(this.imgNode, 'imageviewer-image-rotate180');
				break;
				
			case 270:
				dojo.addClass(this.imgNode, 'imageviewer-image-rotate270');
				break;

			default:
				break;
		}
	},
	
	// 响应事件回调方法
	_handleImageLoadEvent:function(event){
		this._isImageLoaded = true;
		return true;
	},
	
	_handleMouseDownEvent:function(event){
		if(!this._isDragEnable) return true; 
		
		if(!this._isDragging) {
			this._isDragging = true;
			
			dojo.addClass(this.imgNode, "imageviewer-drag-start");
			
			this._oldX = this._getXFromEvent(event);
			this._oldY = this._getYFromEvent(event);
			
			dojo.stopEvent(event);
			
			return false;
		}
		return true;
	},
	
	_handleMouseMoveEvent:function(event){
		if(!this._isDragEnable) return true;
		
		if(this._isDragging) {
			this._moveImage(this._oldX, this._oldY, this._getXFromEvent(event), this._getYFromEvent(event));
			
			this._oldX = this._getXFromEvent(event);
			this._oldY = this._getYFromEvent(event);
			
			dojo.stopEvent(event);
			return false;
		}
		
		return true;
	},
	
	_handleMouseUpEvent:function(event){
		
		if(!this._isDragEnable) return true;
		
		if(this._isDragging) {
			this._isDragging = false;
			
			dojo.removeClass(this.imgNode, "imageviewer-drag-start");
			
			this._oldX = 0;
			this._oldY = 0;
			
			
			dojo.stopEvent(event);
			
			return false;
		}
		
		return true;
	},
	
	_handleLeftRotateEvent:function(event){
		var angle = this._currentRotateAngle - 90;
		this._rotate(angle);
		this._center();
		this._currentRotateAngle = angle;
	},
	
	_handleRightRotateEvent:function(event){
		var angle = this._currentRotateAngle + 90;
		this._rotate(angle);
		this._center();
		this._currentRotateAngle = angle;
	},
	
	_handleFitEvent:function(event){
		if(!this._isFit) {
			this._fit();
			this._center();
		} else {
			this._setZoom(this._preprocessZoomRate(1));
			this._center();
		}
	},
	
	_handleZoomOutEvent:function(event){
		var zoomRate = this._currentZoomRate / this._multiple;
		zoomRate = this._preprocessZoomRate(zoomRate);
		this._setZoom(zoomRate);
		this._center();
	},
	
	_handleZoomInEvent:function(event){
		var zoomRate = this._currentZoomRate * this._multiple;
		zoomRate = this._preprocessZoomRate(zoomRate);
		this._setZoom(zoomRate);
	},
	
	_handleAdaptZoomRateEvent:function(event){
		var input = this._zoomRateNumberSpinner.inputNode;
		var zoom = parseInt(input.value);
		this._setZoom(zoomRate = this._preprocessZoomRate(zoom / 100));
	},
	
	_handleMouseWheelEvent:function(event){
		var scroll = 0;
		scroll = this._browser().firefox ? event.detail : event.wheelDelta;
		
		if(this._isIniliazed) {
			if(scroll > 0) {
				var zoomRate = this._currentZoomRate * this._multiple;
				zoomRate = this._preprocessZoomRate(zoomRate);
				this._setZoom(zoomRate);
				this._center();
			} else {
				var zoomRate = this._currentZoomRate / this._multiple;
				zoomRate = this._preprocessZoomRate(zoomRate);
				this._setZoom(zoomRate);
				this._center();
			}
		}
		
		dojo.stopEvent(event);
		return false;
	},
	
	_handleToolbarOutEvent: function(event) {
		this._zoomRateNumberSpinner.inputNode.blur();
		return true;
	},
	
	/**
	 * @summary:
	 * 		设置图片路径
	 * @param:
	 * 		{string} src 图片的路径
	 * @example:
	 * |var img=unieap.byId('img');
	 * |btn.setSrc('img.png');
	 * 		设置路径在'img.png'下的图片
	 */
	setSrc:function(src){
		this._isImageLoaded = false;
		
		this.src=src;
		this.imgNode.src=src;
		
		// 等待图片加载结束
		this._waitingImageLoaded();
	},
	
	/**
	 * @summary:
	 * 		设置控件宽度
	 * @param:
	 * 		{string} width 控件宽度
	 */
	setWidth:function(width){
		if(typeof width !== 'undefined' && width !== null) {
			if(typeof width === 'number') {
				width = Math.round(width)+"px";
			}
			dojo.style(this.domNode, 'width', width);
			dojo.style(this.wrapperNode, 'width', width);
			
			if(this._isIniliazed) {
				this._fit();
				this._center();
			}
		}
	},
	
	/**
	 * @summary:
	 * 		设置控件高度
	 * @param:
	 * 		{string} height 控件高度
	 */
	setHeight:function(height){
		if(typeof height !== 'undefined' && height !== null) {
			if(typeof height === 'number') {
				height = Math.round(height)+"px";
			}
			dojo.style(this.domNode, 'height', height);
			dojo.style(this.wrapperNode, 'height', height);
			
			if(this._isIniliazed) {
				this._fit();
				this._center();
			}
		}
	},
	
	/**
	 * @summary:
	 * 		设置缩放相关信息
	 * @type:
	 * 		{string}
	 * @example:
	 *      var zoom = {"maxZoom":"200%", "minZoom": "10%", "delta": "20", "multiple":"1.6"}
	 *      imageviewer.setZoom(zoom);
	 */
	setZoom:function(zoom){
		if(typeof zoom !== 'undefined' && zoom !== null){
			var zoomObject;
			
			if(typeof zoom === 'object') {
				zoomObject = zoom;
			} else if (typeof zoom === 'string') {
				zoom = zoom.replace("'", "\"");
				try {
					zoomObject = JSON.parse(zoom);
				} catch(e) {
					return;
				}
			}
			
			if(zoomObject.maxZoom) {
				var maxZoom = zoomObject.maxZoom;
				if(typeof maxZoom === 'string' && maxZoom.indexOf('%') > 0) {
					this._maxZoom = parseInt(maxZoom.substring(0, maxZoom.indexOf('%')));
				} else if(typeof maxZoom === 'number') {
					this._maxZoom = maxZoom;
				}
			}
			
			if(zoomObject.minZoom) {
				var minZoom = zoomObject.minZoom;
				if(typeof minZoom === 'string' && minZoom.indexOf('%') > 0) {
					this._minZoom = parseInt(minZoom.substring(0, minZoom.indexOf('%')));
				} else if(typeof minZoom == 'number') {
					this._minZoom = minZoom;
				}
			}
			
			if(zoomObject.delta) {
				var delta = zoomObject.delta;
				if(typeof delta === 'string') this._delta = parseInt(delta);
				else if(typeof delta === 'number') this._delta = delta;
			}
			
			if(zoomObject.multiple) {
				var multiple = zoomObject.multiple;
				if(typeof multiple === 'string') this._multiple = parseFloat(multiple);
				else if(typeof multiple === 'number') this._multiple = multiple;
			}
		}
	}
	
});