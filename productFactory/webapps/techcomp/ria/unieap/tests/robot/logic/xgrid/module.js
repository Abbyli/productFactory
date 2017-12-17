dojo.provide("unieap.tests.robot.logic.grid.module");
try{
	doh.registerUrl('xgrid-绑定测试',
		dojo.moduleUrl('logic','xgrid/basic/test_xgrid_binding.html'),999999);
	doh.registerUrl('xgrid-选择测试-多选',
		dojo.moduleUrl('logic','xgrid/selection/test_xgrid_select_multiple.html'),999999);
	doh.registerUrl('xgrid-选择测试-单选',
		dojo.moduleUrl('logic','xgrid/selection/test_xgrid_select_single.html'),999999);

	//测试onAfterPage事件响应函数
	doh.registerUrl('xgrid-翻页测试-AfterPage',
			dojo.moduleUrl('logic','xgrid/paging/test_xgrid_paging_onAfterPaging.html'),999999);
	doh.registerUrl('xgrid-个性化测试',
			dojo.moduleUrl('logic','xgrid/individual/test_xgrid_individual.html'),999999);
	
	doh.registerUrl('xgrid-可编辑翻页测试',
			dojo.moduleUrl('logic','xgrid/rowedit/test_xgrid_edit_paging.html'),999999);
	
	doh.registerUrl('xgrid-可编辑测试',
			dojo.moduleUrl('logic','xgrid/rowedit/test_xgrid_rowedit.html'),999999);
	
	doh.registerUrl('xgrid-选择测试-设置选择方式',
		dojo.moduleUrl('logic','xgrid/selection/test_xgrid_select_setSelectType.html'),999999);
	
	doh.registerUrl('xgrid-弹出xdialog测试',
			dojo.moduleUrl('logic','xgrid/basic/test_xgrid_xdialog.html'),999999);
	
	doh.registerUrl('xgrid-校验方法测试',
			dojo.moduleUrl('logic','xgrid/validate/test_xgrid_validate.html'),999999);
}catch(e){
	alert('发现错误！！'+e.toString());
}