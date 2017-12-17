dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	//当Grid初始化后测试Grid的属性是否正确
	doh.register("Grid view 属性测试", [
	]);
	doh.register("Grid view 方法测试", [
	    
	    //setRowStyles方法测试有滚动条的grid样式设置                                
		function test_setRowStyles() {
			var viewMan=unieap.byId("grid").getManager("ViewManager");
			var num = dataCenter.getDataStore("empDataStore").getRowSet().getRowCount();
			for(var i=0;i<num;i++){
				 viewMan.setRowStyles(i,{"color":"red"});
			}
			viewMan.scrollToRow(num-1); 
			var cellNode0=viewMan.getCellNode("attr_sal",num-1);
		  var style0 = cellNode0.children[0].style;
		  doh.is("red",style0.color);
		  
		  var cellNode1=viewMan.getCellNode("NAME",num-1);
		  var style1 = cellNode1.children[0].style;
		  doh.is("red",style1.color);
		  
		  var cellNode2=viewMan.getCellNode("attr_job",num-1);
		  var style2 = cellNode2.children[0].style;
		  doh.is("red",style2.color);
		}
	]);
	doh.run();
}
