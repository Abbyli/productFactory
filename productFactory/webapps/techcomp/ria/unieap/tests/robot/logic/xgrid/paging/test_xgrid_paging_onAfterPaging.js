dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {

	doh.register("XGrid Paging onAfterPaging 方法测试", [
		
		function test_xgrid_onAfterPaging() {
			//未执行翻页前，判断flag为false
			doh.is(flag, false);
			var manager=xgrid.getManager('PagingManager');
			manager.nextPage();
			//执行翻页后，afterPage函数中对flag赋值true
			doh.is(flag, true);
		}
	]);
	doh.run();
}
