dojo.provide("unieap.form.ColorNumberDisplayFormatter");
dojo.require("unieap.form.NumberDisplayFormatter");
dojo.require("unieap.form.SimpleFormatter");
dojo.require("dojo.number");
dojo.require("unieap.patch.number");
dojo.declare("unieap.form.ColorNumberDisplayFormatter", unieap.form.NumberDisplayFormatter, {
	normal:"black",
	special:"red",
    format: function(value){
		if(value<0){
			dojo.style(this.widget.inputNode,"color",this.special);
		}else{
			dojo.style(this.widget.inputNode,"color",this.normal);
		}
		return this.inherited(arguments);
    }
});