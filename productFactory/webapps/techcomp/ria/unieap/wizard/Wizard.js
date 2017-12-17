dojo.provide("unieap.wizard.Wizard");
dojo.require("unieap.layout.StackContainer");
dojo.require("dijit._Templated");
dojo.require("unieap.form.Button");

dojo.declare("unieap.wizard.Wizard", [unieap.layout.StackContainer, dijit._Templated], {
	
	/**
	 * @declaredClass:
	 * 		unieap.wizard.Wizard
	 * @superClass:
	 * 		unieap.layout.StackContainer
	 * @summary:
	 * 		下一步和上一步按钮在不同页面之间切换，完成按钮完成向导，取消按钮取消向导。
	 * @example:
	 * |<div dojoTYpe="unieap.wizard.Wizard">
	 * |	<div dojoType="unieap.layout.ContentPane">Yes</div>
	 * |	<div dojoType="unieap.layout.ContentPane">NO</div>
	 * |</div>
	 * */
	
	_previousButton: null,
	_nextButton: null,
	_doneButton: null,
	_cancelButton: null,
	
	UserInterfaces: dojo.mixin({
		height: "string",
		onBeforeBack: "function",
		onBack: "function",
		onAfterBack: "function",
		onBeforeNext: "function",
		onNext: "function",
		onAfterNext: "function",
		onDone: "function",
		onCancel: "function",
		setBackDisabled: "function",
		setNextDisabled: "function",
		setDoneDisabled: "function",
		setCancelDisabled: "function"
	}),
	
	templateString: 
		'<div dojoAttachPoint="domNode" class="wizard-wrapper">' +
			'<div dojoAttachPoint="containerNode" class="stackcontainer wizard-container"></div>' + 
			'<div dojoAttachPoint="navNode" class="wizard-nav"></div>' + 
    	'</div>',
    	
    /**
	 * @summary:
	 * 		设置容器的高度
	 * @type:
	 * 		{string}
	 * @default:
	 * 		"400px"
	 * @example:
	 * |<div dojoTYpe="unieap.layout.StackContainer" style="border"1px solid #9b9b9b" height="450px">
	 * |	<div dojoType="unieap.layout.ContentPane">第一个页面</div>
	 * |	<div dojoType="unieap.layout.ContentPane">第二个页面</div>
	 * |</div>
	 */
	height:'400px',
    	
    postCreate: function() {
    	this.inherited(arguments);
    	
    	this._createNav();  // 创建导航栏
    	this._bind();  // 绑定事件
    },
    
    startup: function() {
    	this.inherited(arguments);
    	
    	this._refreshNav();
    },
    
    // 工具方法
    _getChildrenSize: function() {
    	return this.getChildren().length;
    },
    
    _refreshNav: function() {
    	if(this.hasChildren()) {
    		var currentSelectedChild = this.getSelectedChild();
    		var index = this.getIndexOfChild(currentSelectedChild);
    		var size = this._getChildrenSize();
    		
    		if(index == 0 || index == (size - 1)) {
    			// 第一页或最后一页
    			if(index == 0) {
    				this._backButton.setDisabled(true);
    				this._nextButton.setDisabled(false);
    			}
    			
    			if(index == (size - 1)) {
    				this._backButton.setDisabled(false);
    				this._nextButton.setDisabled(true);
    			}
    			
    			if(size == 1) {
    				this._backButton.setDisabled(true);
    				this._nextButton.setDisabled(true);
    			}
    		} else {
    			// 中间页
    			this._backButton.setDisabled(false);
    			this._nextButton.setDisabled(false);
    		}
    	}
    },
	
	_createNav: function() {
		this._cancelButton = this._createNavButton(RIA_I18N.wizard.cancel);
		this.navNode.appendChild(this._cancelButton.domNode);
		dojo.addClass(this._cancelButton.domNode, 'wizard-nav-btn');

		this._doneButton = this._createNavButton(RIA_I18N.wizard.done);
		this.navNode.appendChild(this._doneButton.domNode);
		dojo.addClass(this._doneButton.domNode, 'wizard-nav-btn');

		this._nextButton = this._createNavButton(RIA_I18N.wizard.next);
		this.navNode.appendChild(this._nextButton.domNode);
		dojo.addClass(this._nextButton.domNode, 'wizard-nav-btn');

		this._backButton = this._createNavButton(RIA_I18N.wizard.back);
		this.navNode.appendChild(this._backButton.domNode);
		dojo.addClass(this._backButton.domNode, 'wizard-nav-btn');
	},
	
	_createNavButton: function(buttonLabel) {
		return new unieap.form.Button({label: buttonLabel});
	},
	
	_bind: function() {
		this.connect(this._backButton, "onClick", this._handleBackEvent);
		this.connect(this._nextButton, "onClick", this._handleNextEvent);
		this.connect(this._doneButton, "onClick", this._handleDoneEvent);
		this.connect(this._cancelButton, "onClick", this._handleCancelEvent);
	},
	
	// 事件处理
	_handleBackEvent: function(event) {
		var child = this.getSelectedChild();
    	var index = this.getIndexOfChild(child);
    	if(!unieap.fireEvent(this, this.onBeforeBack, [event, index, child])) {
			if(!unieap.fireEvent(this, this.onBack, [event])) {
				this.back();
				this._refreshNav();
				
				child = this.getSelectedChild();
				index = this.getIndexOfChild(child);				
				unieap.fireEvent(this, this.onAfterBack, [event, index, child]);
			}
    	}
	},
	
	_handleNextEvent: function(event) {
		var child = this.getSelectedChild();
    	var index = this.getIndexOfChild(child);
    	if(!unieap.fireEvent(this, this.onBeforeNext, [event, index, child])) {
			if(!unieap.fireEvent(this, this.onNext, [event])) {
				this.forward();
				this._refreshNav();
				
				child = this.getSelectedChild();
				index = this.getIndexOfChild(child);				
				unieap.fireEvent(this, this.onAfterNext, [event, index, child]);
			}
    	}
	},
	
	_handleDoneEvent: function(event) {
		if(!unieap.fireEvent(this, this.onDone, [event])) {
			//
		}
	},
	
	_handleCancelEvent: function(event) {
		if(!unieap.fireEvent(this, this.onCancel, [event])) {
			//
		}
	},
	
	// 事件处理
	/**
	 * @summary:
	 * 		上一步前事件
	 * @description:
	 * 		在触发上一步之前，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onBeforeBack = function() { doSomething(); }
	 * |</script>
	 */
	onBeforeBack: function() {},
	/**
	 * @summary:
	 * 		上一步事件
	 * @description:
	 * 		在点击上一步按钮时，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onBack = function() { doSomething(); }
	 * |</script>
	 */
	onBack: function() {},
	/**
	 * @summary:
	 * 		上一步后事件
	 * @description:
	 * 		在触发上一步之后，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onAfterBack = function() { doSomething(); }
	 * |</script>
	 */
	onAfterBack: function() {},
	
	/**
	 * @summary:
	 * 		下一步前事件
	 * @description:
	 * 		在触发下一步之前，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onBeforeNext = function() { doSomething(); }
	 * |</script>
	 */
	onBeforeNext: function() {},
	/**
	 * @summary:
	 * 		下一步事件
	 * @description:
	 * 		在点击下一步按钮时，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onNext = function() { doSomething(); }
	 * |</script>
	 */
	onNext: function(event) {},
	/**
	 * @summary:
	 * 		下一步后事件
	 * @description:
	 * 		在触发下一步之后，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onAfterNext = function() { doSomething(); }
	 * |</script>
	 */
	onAfterNext: function() {},
	
	/**
	 * @summary:
	 * 		完成事件
	 * @description:
	 * 		在点击完成按钮时，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onDone = function() { doSomething(); }
	 * |</script>
	 */
	onDone: function(event) {},
	
	/**
	 * @summary:
	 * 		取消事件
	 * @description:
	 * 		在点击取消按钮时，回调该方法
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.onCancel = function() { doSomething(); }
	 * |</script>
	 */
	onCancel: function(event) {},
	
	/**
	 * @summary:
	 * 		是否禁用上一页按钮
	 * @description:
	 * 		禁用的上一页按钮灰显且无法点击
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.setBackDisabled(true);
	 * |</script>
	 */
	setBackDisabled: function(state) {
		this._backButton.setDisabled(state);
	},
	
	/**
	 * @summary:
	 * 		是否禁用下一页按钮
	 * @description:
	 * 		禁用的下一页按钮灰显且无法点击
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.setNextDisabled(true);
	 * |</script>
	 */
	setNextDisabled: function(state) {
		this._nextButton.setDisabled(state);
	},
	
	/**
	 * @summary:
	 * 		是否禁用完成按钮
	 * @description:
	 * 		禁用的完成按钮灰显且无法点击
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.setDoneDisabled(true);
	 * |</script>
	 */
	setDoneDisabled: function(state) {
		this._doneButton.setDisabled(state);
	},
	
	/**
	 * @summary:
	 * 		禁用取消按钮
	 * @description:
	 * 		禁用的取消按钮灰显且无法点击
	 * @example:
	 * |<script type="text/javascript">
	 * |	var wizard=unieap.byId('myWizard');
	 * |	wizard.setCancelDisabled(true);
	 * |</script>
	 */
	setCancelDisabled: function(state) {
		this._cancelButton.setDisabled(state);
	}
	
});