dojo.provide("unieap.form.ComboBoxLocation");
dojo.require("unieap.form.ComboBox");
dojo.declare("unieap.form.ComboBoxLocation", unieap.form.ComboBox, {
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxLocation
	 * @superClass:
	 * 		unieap.form.ComboBox
	 * @summary:
	 * 		地点选择控件
	 * @classDescription：
	 * @img:
	 * 		
	 */
	 
	// 用户属性配置接口
	UserInterfaces: dojo.mixin(
		{
		},
		unieap.form.ComboBox.prototype.UserInterfaces),

	postMixInProperties: function() {
		this.inherited(arguments);
		this.popupClass = "unieap.form.ComboBoxLocationPopup";
	},
	
	postCreate: function() {
		this.inherited(arguments);
		dojo.addClass(this.iconNode, "u-form-combobox-icon-location");
		this.getDataFilter().spellAttr = "py";
	},
	
	//改变了不同于combobox的匹配模式，只匹配首个汉字
	_getItemsByValue:function(value){
		var dataFilter = this.getDataFilter();
//		var reg = dataFilter.ignoreCase?new RegExp("^.*["+charNum+"].*$","i"):new RegExp("^.*["+charNum+"].*$");
		var reg = new RegExp("^"+value+".*$","i");//头部匹配只支持第一个字母匹配
		var filter = {};
			if (dataFilter.searchAttr) {
				dataFilter.searchAttr = [].concat(dataFilter.searchAttr);
				for(var i=0,l=dataFilter.searchAttr.length; i<l; i++){
					filter[dataFilter.searchAttr[i]] = reg;
				}
			}
		var items = dataFilter.doFilter(this.getPopup()._initItems, filter, "include", "||");
		return items;
		
	},
	
	// inner event handler
	_onIconClick: function(evt) {
		if(!(this.readOnly&&unieap.global.combobox_notReadonlyPopup)&&!this.disabled&& unieap.fireEvent(this, this.onBeforeIconClick,[evt])) {
			unieap.fireEvent(this, this.onIconClick,[evt])
			var popup=this.getPopup();
			if (popup.isOpen()) {
				popup.close();
			} else {
				var items = this.getDataProvider().items;
				//当没有数据时不应弹出
				if(items.length && items.length > 0){
					popup.open(items, this._getSelectedItems(items), this._onPopupClose, true);
				}
			}
			this._keyPressed = true;
			this._hasBlur = false;
		}else{
			if(evt) dojo.stopEvent(evt);
		}
	}
	
});
