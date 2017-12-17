dojo.addOnLoad(test);
var imagePath = "images/user.png";
var labelCss = "fontLabel"; 
function customIconStyle(item,opened,isExpandable){
	return {backgroundImage: "url('"+imagePath+"')"};
}
function customLabelClass(item,opened,isExpandable){
	return labelCss;
}
 function test(){
 	var testWidget = unieap.byId("testTree");
	//当树初始化后测试树的属性是否正确
	doh.register("Tree 属性测试", [
		function test_label(){
			doh.is("树根节点",testWidget.attr("label"));
		},
		function test_pathSeparator(){
			doh.is("/",testWidget.attr("pathSeparator"));
		},
		function test_expandRoot(){
			doh.is(true,testWidget.attr("expandRoot"));
		},
		function test_templateString(){
			doh.is("<div class=\"dijitTreeContainer\" dojoAttachPoint=\"treeNode\"></div>",testWidget.attr("templateString"));
		}
	]);
	doh.register("Tree 方法测试",[
		//getIconStyle还没实现，写一个会失败的用例
		function test_getIconStyle(){
			var node = testWidget.getNodeById("1231035443386");
			//getIconStyle没有返回任何值，所以下面的断言会失败。
			doh.t(testWidget.getIconStyle(node.getItem(),true,true));
			//自定义的样式是否生效。
			doh.t(dojo.style(testWidget.getIconNode(node.getDomNode()),"backgroundImage").indexOf(imagePath)>-1);
		},
		function test_getNodeById(){
			var node = testWidget.getNodeById("1231035443386");
			//每个断言前最好写一下注释，这样当断言失败时，在报告中会显示这段注释信息。
			//节点不能为空
			doh.t(node);
            doh.is("数据结构",node.getLabel());
			doh.is(0,node.getPosition());
			doh.is(false,node.isOpend());
			doh.is(false,node.isRoot());
			doh.is(false,node.isLeaf());
			doh.is(false,node.isChecked());
			doh.is(1,node.getLevel());
		},
		function test_getIconClass(){
			var node = testWidget.getNodeById("1231035443386");
			doh.is("dijitFolderClosed",testWidget.getIconClass(node.getItem(),false,true));
            doh.is("dijitFolderOpened",testWidget.getIconClass(node.getItem(),true,true));
			doh.is("dijitLeaf",testWidget.getIconClass(node.getItem(),false,false));
			doh.is("dijitLeaf",testWidget.getIconClass(node.getItem(),true,false));
		},
		function test_getLabelClass(){
			var node = testWidget.getNodeById("1231035443386");
			var labelClass = testWidget.getLabelClass(null,true,true);
			doh.is(labelClass,labelCss);
		}

	]);
	
	doh.run();
}
