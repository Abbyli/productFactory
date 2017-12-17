dojo.provide("unieap.form.ComboBoxLocationPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.global")
dojo.declare("unieap.form.ComboBoxLocationPopup", unieap.form.Popup, {
	
	templateString: 
		"<div class='u-comboboxloaction-list' dojoAttachPoint='listNode,popupcontainer,containerNode'>"+		
			"<div class='u-comboboxloaction-list-tip' dojoAttachPoint='listTipNode'>"+
				"<span dojoAttachPoint='tipSpanNode'></span>"+
				"<a class='u-comboboxloaction-list-close' dojoAttachPoint='tipCloseNode'></a>"+
			"</div>"+	
			"<div class='u-comboboxloaction-list-header' dojoAttachPoint='listHeaderNode'>"+
			"</div>"+
			"<div class='u-comboboxloaction-list-container' dojoAttachPoint='listContainerNode,focusNode'>"+
			"</div>"+
			"<div class='u-comboboxloaction-list-footer' dojoAttachPoint='listFooterNode'>"+
			"</div>"+
		"</div>",
	
	/**
	 * @summary:
	 * 		指定下拉框的高度
	 * @type：
	 * 		{number}
	 * @default:
	 * 		0
	 */
	height: "auto",
	
	width :"",//宽度一定
	
	_width :"342px",	
	
	_optionSize:5,//初始每行5个数据
	
	_previousPageState : false,//前一页状态标识符
	
	_nextPageState : false,//后一页转台标识符
	
	postMixInProperties: function() {
		this.inherited(arguments);
		dojo.require("unieap.form.ComboBoxLocationPopupList");
		dojo.mixin(this, unieap.form.ComboBoxLocationPopup.list);
	},
	postCreate: function() {
		this.inherited(arguments);
		this.width = this._width;
		this.optionSize = this._optionSize;
		this.connect(this.focusNode, "onmouseover", "_onMouseOver");
		this.connect(this.focusNode, "onmouseout", "_onMouseOut");
	},
	
	onSelect: function(item, widget) {
	},
	
	/**
	 * @summary:
	 * 		打开弹出框
	 * @example:
	 * |var city = unieap.byId('city');
	 * |city.getPopup().open();
	 * 如果下拉框处于关闭状态，则打开下拉框
	 * 
	 */
	open: function(items, selection, callback, unIconClick) {
		if(!this.widget._canPopOpen()){
			return;
		}
		if (!dojo.isArray(items)) {
			items = this.widget.getDataProvider().getItems();
			if (!dojo.isArray(items) || items.length==0)
				return;
		}
		
		if (this.pageSize == 0) return;
		if (this.pageSize > 0) {
			items = items.slice(0, this.pageSize);
		}
		
		if (selection) {
			this._selection = dojo.isArray(selection)?selection:[];
		} else {
			this._updateSelection();
		}
		this._callback = callback || this.widget._onPopupClose;
		this._highlighted = null;
		
		if (this.structure == null) {
			this._createStructure();
		}
		
		this._createPopup(items, this.structure,unIconClick);
		this.inherited(arguments);
	},
	
	_headerOnClick:function(evt){
		this._onStatePageNum = 1;
		var t = evt.target || evt.srcElement;
		var charNum = t.charNum;
		dojo.addClass(evt.target,"u-comboboxloaction-list-header-click");
		
		var dataFilter = this.widget.getDataFilter();
//		var reg = dataFilter.ignoreCase?new RegExp("^.*["+charNum+"].*$","i"):new RegExp("^.*["+charNum+"].*$");
		var reg = new RegExp("^["+charNum+"].*$","i");//头部匹配只支持第一个字母匹配
		var filter = {};
			if (dataFilter.searchAttr) {
				dataFilter.searchAttr = [].concat(dataFilter.searchAttr);
				for(var i=0,l=dataFilter.searchAttr.length; i<l; i++){
					filter[dataFilter.searchAttr[i]] = reg;
				}
			}
		var items = dataFilter.doFilter(this._initItems, filter, "include", "||");
		this._items = items;
		this._pageNum = Math.ceil(items.length/(this.optionSize*this._initRowNum));
		this._doCreateOptions(items);
		this._createFooter();
	},
	
	_createStructure: function() {
		var d = this.widget.getDecoder();
		if (this.displayStyle=="table") {
			// table的默认展现方式
			this.structure = {
				rows: [
					{title:RIA_I18N.form.combobox.codeValue,field:d.valueAttr,width:'30%'},
					{title:RIA_I18N.form.combobox.codeName,field:d.displayAttr,width:'70%'}
				]
			}
		} else {
			this.structure = {
				rows: [
					{field: d.displayAttr}
				]
			}
		}
		return this.structure;
	},
	
	_onClick: function(evt) {
		var t = evt.target || evt.srcElement;
		var isItem = true;
		while (!t.item) {
			t = t.parentNode;
			if (t === this.listNode) {
				isItem = false;
				break;
			}
		}
		isItem && this._onSelect(evt, t);
	},
	
	/**
	 * @summary:
	 * 		关闭弹出框
	 * @example:
	 * |var city = unieap.byId('city');
	 * |city.getPopup().close();
	 * 如果下拉框处于下拉状态，则关闭下拉框
	 */
	close: function(callback) {
		if (this.isOpen()) {
			this.inherited(arguments);
			if (dojo.isFunction(callback)) {
				callback.apply(this.widget, [this._selection]);
			} else if (dojo.isFunction(this._callback))  {
				this._callback.apply(this.widget, [this._selection]);
			}
		}
	},
	
	_onSelect: function(evt, target) {
		// override by list|table|multi
	},
	
	_createPopup: function(items, structure) {
		// override by list|table|multi
	},
	
	_handleKeyDown: function(evt) {
		// override by list|table|multi
	},
	
	_focusOptionNode: function(/*DomNode */ node) {
		if (this._highlighted == node)
			return;
		this._blurOptionNode();
		this._highlighted = node;
		dojo.addClass(this._highlighted, "u-comboboxlocation-item-hover");//这个class写错了，暂时将错就错。。。
		dijit.scrollIntoView(this._highlighted);	
	},

	_blurOptionNode: function() {
		if (this._highlighted) {
			dojo.removeClass(this._highlighted, "u-comboboxlocation-item-hover");
			this._highlighted = null;
		}
	},
	
	// inner API
	_updateSelection: function(selection) {
		var selection = this.widget._getSelectedItems();
		this._selection = dojo.isArray(selection)?selection:null;
		// update ui?
	},
	
	// 鼠标移入
	_onMouseOver: function(evt) {
		var t = evt.target;
		while (t && !t.item) {
			t = t.parentNode;
		}
		if (!t) return;
		try {
			this._focusOptionNode(t);
		} catch (e) {}
	},
	// 鼠标移出
	_onMouseOut: function(evt) {
		this._blurOptionNode();
	}
});