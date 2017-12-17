dojo.provide("unieap.tests.robot.logic.grid.module");
try{
	doh.registerUrl('grid-绑定测试',
		dojo.moduleUrl('logic','grid/basic/test_grid_binding.html'),999999);
	doh.registerUrl('grid-选择测试-多选',
		dojo.moduleUrl('logic','grid/selection/test_grid_select_multiple.html'),999999);
	doh.registerUrl('grid-选择测试-单选',
		dojo.moduleUrl('logic','grid/selection/test_grid_select_single.html'),999999);
	
	//测试onAfterPage事件响应函数
	doh.registerUrl('grid-翻页测试-AfterPage',
			dojo.moduleUrl('logic','grid/paging/test_grid_paging_onAfterPaging.html'),999999);
	
	doh.registerUrl('grid-view测试',
			dojo.moduleUrl('logic','grid/view/test_grid_view.html'),999999);
	
	doh.registerUrl('grid-个性化测试',
			dojo.moduleUrl('logic','grid/individual/test_grid_individual.html'),999999);
	
//	doh.registerUrl('grid-可编辑翻页测试',
//			dojo.moduleUrl('logic','grid/edit/test_grid_edit_paging.html'),999999);
	
	doh.registerUrl('grid-可编辑测试',
			dojo.moduleUrl('logic','grid/edit/test_grid_edit.html'),999999);
	
	doh.registerUrl('grid-锁定行测试',
			dojo.moduleUrl('logic','grid/lockrow/test_grid_lockrow_edit.html'),999999);
	
	//该测试用例会造成浏览器长脚本无响应
//	doh.registerUrl('表格-选择测试-设置选择方式',
//		dojo.moduleUrl('logic','grid/selection/test_grid_select_setSelectType.html'),999999);
}catch(e){
	alert('发现错误！！'+e.toString());
}