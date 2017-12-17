dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = xgrid.getManager("SelectionManager");
	doh.register("XGrid select multiple 方法测试", [
		
		function test_xgrid_multipleSelect() {
			doh.is(select.getSelectType(), "multiple");
		},
		
		function test_xgrid_select() {
			select.clearSelection();
			select.setSelect(0, true);
			select.setSelect(1, true);
			var row = xgrid.getBinding().getRow(0);
			doh.is(row["_s"], true);
			var row = xgrid.getBinding().getRow(1);
			doh.is(row["_s"], true);
		},
		
		function test_xgrid_getSelectedRowIndexs() {
			select.clearSelection();
			select.setSelect(0, true);
			select.setSelect(2, true);
			select.setSelect(4, true);
			doh.is(select.getSelectedRowIndexs().length, 3);
			doh.is(select.getSelectedRowIndexs()[0], 0);
		},
		
		function test_xgrid_isSelect() {
			select.clearSelection();
			select.setSelect(2, true);
			doh.is(select.isSelected(2), true);
			select.setSelect(2, false);
			doh.is(select.isSelected(2), false);
		},
		
		function test_xgrid_setAllSelect() {
			select.setAllSelect(true);
			doh.is(xgrid.getBinding().getRowSet().getUnSelectedRows().length,0);
			select.clearSelection();
			doh.is(xgrid.getBinding().getRowSet().getSelectedRowIndexs().length,0);
		}
	]);
	doh.run();
}
