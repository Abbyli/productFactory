dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	var select = grid.getManager("SelectionManager");
	var select1 = grid1.getManager("SelectionManager");
	doh.register("Grid select single 方法测试", [
		
		function test_grid_singleSelect() {
			doh.is(select.getSelectType(), "single");
		},
		
		function test_grid_select1() {
			select.clearSelection();
			select.setSelect(0, true);
			var row = grid.getBinding().getRowData()[0];
			doh.is(row["_s"], true);
		},
		
		function test_grid_getSelectedRowIndexs() {
			select.clearSelection();
			select.setSelect(1, true);
			select.setSelect(3, true);
			doh.is(select.getSelectedRowIndexs().length, 1);
			doh.is(select.getSelectedRowIndexs()[0], 3);
		},
		
		function test_grid_isSelect() {
			//测试isSelected基本功能
			select.clearSelection();
			select.setSelect(2, true);
			doh.is(select.isSelected(2), true);
			select.setSelect(2, false);
			doh.is(select.isSelected(2), false);
		},
		
		function test_grid_isSelect_overRowNum() {
			//测试选中大于数据总数行时，isSelected返回值
			var row = grid.getBinding().getRowData().length,
				num = row + Math.floor(Math.random()*10);
			select.clearSelection();
			select.setSelect(num, true);
			doh.is(select.isSelected(num), false);
		},
			
		function test_grid_isSelect_afterReset() {
			//测试reset绑定数据后，isSelected返回值
			var rowset = grid.getBinding().getDataStore().getRowSet();
			rowset.reset();
			var row = grid.getBinding().getRowData().length,
				num = Math.floor(Math.random()*10);
			select.clearSelection();
			select.setSelect(num, true);
			doh.is(select.isSelected(num), false);
		},	
			
		function test_grid_isSelect_withoutDataStore() {
			//测试无绑定的dataStore时，isSelected返回值
			var row = grid1.getBinding().getRowData().length;
		    	num = Math.floor(Math.random()*10);
		    select1.clearSelection();
			select1.setSelect(num, true);
			doh.is(select1.isSelected(num), false);
		}	
	]);
	doh.run();
}
