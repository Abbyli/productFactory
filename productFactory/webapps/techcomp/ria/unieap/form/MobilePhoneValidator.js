if (!dojo._hasResource["unieap.form.MobilePhoneValidator"]) {
	dojo._hasResource["unieap.form.MobilePhoneValidator"] = true;
	dojo.provide("unieap.form.MobilePhoneValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.MobilePhoneValidator", unieap.form.TextBoxValidator, {
		/**
        * @summary:
        * 		手机号码校验器
        * @declaredClass：
        * 		unieap.form.MobilePhoneValidator
     	* @superClass:
     	* 		unieap.form.FormWidgetValidator 
        */
        
        regExp: /^((\+86)|86)?1\d{10}$/,
        
        errorMsg: RIA_I18N.form.mobilePhoneValidator.errorMsg,
        
        validate: function() {
        	var bool = this.inherited(arguments);
			return bool;
        }
	});
}