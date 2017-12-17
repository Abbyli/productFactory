dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	testWidget = xgrid;
	var ds = dataCenter.getDataStore("empDS2");
	ds.getRowSet().getRow(0).setItemValue("attr_sal1",0);
	testWidget.getBinding().setDataStore(ds);
	//当XGrid初始化后测试XGrid的属性是否正确
	doh.register("XGrid validate 属性测试", [
	]);
	doh.register("XGrid validate 方法测试", [
		function test_validate() {
			var xgrid=unieap.byId("xgrid");
			doh.f(xgrid.validate(3));
			var currentIndex0=xgrid.getManager("RowEditManager").getCurrentRowIndex();
			doh.is(currentIndex0,"3");
			
			doh.f(xgrid.validate(6));
			var currentIndex1=xgrid.getManager("RowEditManager").getCurrentRowIndex();
			doh.is(currentIndex1,"6");
			
			doh.t(xgrid.validate(0));
	        doh.f(xgrid.validate(6,true));
			doh.t(xgrid.validate(0,true));
	        doh.f(xgrid.validate(false));
		},
		
		//xgrid中cell数字为空检验
		function test_NumberTextBox_notNull(){
			var xgrid=unieap.byId("xgrid");
			doh.is(xgrid.validate(0),true);
		}
	]);
	doh.run();
}
