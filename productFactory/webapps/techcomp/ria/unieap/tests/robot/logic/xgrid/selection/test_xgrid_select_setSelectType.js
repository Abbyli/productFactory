dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = xgrid.getManager("SelectionManager");
	doh.register("XGrid select setSelectType 方法测试", [
		function test_xgrid_selectType() {
			doh.is(select.getSelectType(), "none");
		},
		function test_xgrid_multipleSelect() {
			select.setSelectType("multiple");
			doh.is(select.getSelectType(), "multiple");
		},
		function test_xgrid_singleSelect() {
			select.setSelectType("single");
			doh.is(select.getSelectType(), "single");
		}
	]);
	doh.run();
}
