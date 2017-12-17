dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {

	doh.register("Grid Paging onAfterPaging 方法测试", [
		
		function test_grid_onAfterPaging() {
			//未执行翻页前，判断flag为false
			doh.is(flag, false);
			var manager=grid.getManager('PagingManager');
			manager.nextPage();
			//执行翻页后，afterPage函数中对flag赋值true
			doh.is(flag, true);
		}
	]);
	doh.run();
}
