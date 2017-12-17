unieap.define("xdialog",function(){
	dojo.addOnLoad(function(){
		unieap.byId('xgrid').validate(false);
		unieap.getXDialog().close();
	});
});
