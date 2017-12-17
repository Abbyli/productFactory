if (!dojo._hasResource["unieap.form.CarPlateValidator"]) {
	dojo._hasResource["unieap.form.CarPlateValidator"] = true;
	dojo.provide("unieap.form.CarPlateValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.CarPlateValidator", unieap.form.TextBoxValidator, {
		/**
        * @summary:
        * 		Email校验器
        * @declaredClass：
        * 		unieap.form.EmailValidator
     	* @superClass:
     	* 		unieap.form.FormWidgetValidator 
        */
        
        regExp: /^([a-zA-Z\u4E00-\u9FA5].{6})$/,
        
        // 民用车牌正则表达式
        _peopleRegexp: /^[\u4eac\u5180\u8c6b\u4e91\u8fbd\u9ed1\u6e58\u7696\u9c81\u65b0\u82cf\u6d59\u8d63\u9102\u6842\u7518\u664b\u8499\u9655\u5409\u95fd\u8d35\u7ca4\u9752\u85cf\u5ddd\u5b81\u743c\u6e1d\u6d25\u6caa][a-zA-Z]\w{4}[a-zA-Z0-9\u6e2f\u6fb3\u5883]$/,
        
        // 军用车牌正则表达式
        _armyRegExp: /^[a-zA-Z\u519b\u7a7a\u6d77\u5317\u6c88\u5170\u6d4e\u5357\u5e7f\u6210][a-zA-Z]\w{5}$/,
        
        // 警用车牌正则表达式 
        _policeRegExp: /^[a-zA-Z\u4eac\u5180\u8c6b\u4e91\u8fbd\u9ed1\u6e58\u7696\u9c81\u65b0\u82cf\u6d59\u8d63\u9102\u6842\u7518\u664b\u8499\u9655\u5409\u95fd\u8d35\u7ca4\u9752\u85cf\u5ddd\u5b81\u743c\u6e1d\u6d25\u6caa][a-zA-Z]\w{4}[\u8b66]$/,
        
        errorMsg: RIA_I18N.form.carPlateValidator.errorMsg,
        
        validate: function() {
        	var bool = this.inherited(arguments);
			
			var value = this.widget.getValue();
			
			if(bool) {
				if(this._peopleRegexp.test(value)) {
					return true
				} else if(this._armyRegExp.test(value)) {
					return true;
				} else if(this._policeRegExp.test(value)) {
					return true;
				} else return false;
			} else return false;
        }
	});
}