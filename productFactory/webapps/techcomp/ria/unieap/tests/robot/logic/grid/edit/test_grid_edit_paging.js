dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {

	doh.register("Grid edit paging 方法测试", [
		
		function test_grid_onAfterPaging() {
			var edit=grid.getManager('EditManager');
			var bindValue = grid.getBinding().getDataStore().getRowSet().getItemValue(0,"NAME");
			edit.setEdit(0,"NAME"); 
			var manager=grid.getManager('PagingManager');
			manager.nextPage();
			var editNodeValue = grid.getCell("NAME").getEditor().inputNode.value;
			//执行翻页后，afterPage函数中对flag赋值true
			doh.is(editNodeValue!=bindValue,true);
		}
	]);
	doh.run();
}
