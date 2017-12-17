dojo.provide("unieap.tests.robot.logic.tree.module");

try{
	doh.registerUrl('树控件-样式测试',
		dojo.moduleUrl('logic','tree/test_tree.html'),999999);

}catch(e){
	alert('发现错误！！'+e.toString());
}