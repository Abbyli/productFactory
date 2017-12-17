
function test_attr(){
	doh.register("AdaptiveContainer属性测试",[
	
		
	]);
}

function test_method(){
	
	doh.register("AdaptiveContainer方法测试",[
	
	    //getChildren方法测试
	    function test_getChildren(){
	    	var children = unieap.byId("AdaptiveContainer").getChildren();
	    	doh.is("4",children.length);
	    },
	    
	    //addChild方法测试
	    function test_addChild(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	var title = new unieap.layout.AdaptivePane({title:"自定义", height:"100px"}); 
	    	container.addChild(title);
	    	var children = container.getChildren();
	    	doh.is("5",children.length);
	    },
	    
	    //getChildrenContainer方法测试
	    function test_getChildrenContainer(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	var adaptivePane1 = unieap.byId("adaptivePane1"); 
	    	doh.is("0",container.getIndexOfChild(adaptivePane1));
	    	
	    	var adaptivePane1 = unieap.byId("adaptivePanadfadfe"); 
	    	doh.is("-1",container.getIndexOfChild(adaptivePane1));
	    },
	    
	    //getParentContainer方法测试
	    function test_getChildrenContainer(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	var parent = container.getParentContainer();
	    	doh.is("titlePaneOuter",parent.id);
	    },
	    
	    //hasChildren方法测试
	    function test_getChildrenContainer(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	doh.t(container.hasChildren());
	    },
	    
	    //hide show和isHidden 测试
	    function test_hide(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	container.hide();
	    	doh.t(container.isHidden());
	    	
	    	container.show();
	    	doh.f(container.isHidden());
	    },
	    
	    //removeChild方法测试
	    function test_removeChild(){
	    	var container = unieap.byId("AdaptiveContainer");
	    	container.removeChild(unieap.byId("adaptivePane3"));
	    	var children = container.getChildren();
	    	doh.is("4",children.length);
	    },
	    
	    //setParentContainer方法测试(怎么测?)
	    function test_setParentContainer(){
//	    	debugger;
//	    	var container = unieap.byId("AdaptiveContainer");
//	    	container.setParentContainer("testId");
	    }
		
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
