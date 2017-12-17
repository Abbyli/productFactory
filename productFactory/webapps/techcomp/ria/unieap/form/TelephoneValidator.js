if (!dojo._hasResource["unieap.form.TelephoneValidator"]) {
	dojo._hasResource["unieap.form.TelephoneValidator"] = true;
	dojo.provide("unieap.form.TelephoneValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.TelephoneValidator", unieap.form.TextBoxValidator, {
		/**
        * @summary:
        * 		座机号码校验器
        * @declaredClass：
        * 		unieap.form.MobilePhoneValidator
     	* @superClass:
     	* 		unieap.form.FormWidgetValidator 
        */
        
        regExp: /^(\d{3,4}-?)?\d{7,8}(-\d{1,4})?$/,
        
        errorMsg: RIA_I18N.form.telephoneValidator.errorMsg,
        
        validate: function() {
        	var bool = this.inherited(arguments);
			return bool;
        }
	});
}