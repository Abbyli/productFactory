dojo.provide("unieap.form.ComboBoxTreePopup");
dojo.require("unieap.form.Popup")
dojo.declare("unieap.form.ComboBoxTreePopup",unieap.form.Popup,{
	
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxTreePopup
	 * @superClass:
	 * 		unieap.form.Popup
	 * @summary:
	 * 		下拉树的弹出窗口管理
	 */
	
	_isShowingNow:false,
	/**
	 * @summary:
	 * 		设置下拉树弹出窗口的高度
	 * @type：
	 * 		{string}
	 * @default:
	 * 		172px
	 */
	height:"172px",
	
	postCreate: function() {
		this.inherited(arguments);
		this.connect(this.containerNode,"onblur","_onBlur");
	},
	
	_onBlur: function(evt){
		this.widget._onBlur(evt,true);
	},
	
	open:function(){
		if(!this.widget._canPopOpen()){
			return;
		}
		this.inherited(arguments);
		dojo.addClass(this.popupcontainer, "u-combobox-popup-open-border");
		dojo.style(this.popupcontainer,"overflow","auto");
	}
});