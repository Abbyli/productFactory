if (!dojo._hasResource["unieap.form.EmailValidator"]) {
	dojo._hasResource["unieap.form.EmailValidator"] = true;
	dojo.provide("unieap.form.EmailValidator");
	dojo.require("unieap.form.TextBoxValidator");
	dojo.declare("unieap.form.EmailValidator", unieap.form.TextBoxValidator, {
		/**
        * @summary:
        * 		Email校验器
        * @declaredClass：
        * 		unieap.form.EmailValidator
     	* @superClass:
     	* 		unieap.form.FormWidgetValidator 
        */
        
        regExp: /^\w+[-_.]*\w*@\w+(.\w{1,4}){0,2}$/,
        
        errorMsg: RIA_I18N.form.emailValidator.errorMsg,
        
        validate: function() {
        	var bool = this.inherited(arguments);
			return bool;
        }
	});
}