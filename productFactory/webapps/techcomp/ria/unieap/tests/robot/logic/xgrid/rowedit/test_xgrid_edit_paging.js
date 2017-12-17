dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {

	doh.register("XGrid edit padding 方法测试", [
		
		function test_grid_onAfterPaging() {
			var edit=grid.getManager('RowEditManager');
			var bindValue = grid.getBinding().getDataStore().getRowSet().getItemValue(0,"NAME");
			edit.setEdit(0,"NAME"); 
			var manager=grid.getManager('PagingManager');
			manager.nextPage();
			//翻页后可编辑控件销毁编辑控件
			var editNodeValue = grid.LayoutManager.getCell("NAME").getEditor().inputNode.value;
			doh.is(editNodeValue!=bindValue,true);
		}
	]);
	doh.run();
}
