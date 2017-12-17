//属性测试
function test_attr(){
	doh.register("Button属性测试",[
		function test_label(){
			var btn=unieap.byId('btn');
			doh.is("按钮",btn.getValue());
		}
	]);
}


//方法测试
function test_method(){
	doh.register("Button方法测试",[
		function test_setDisabled(){
			var btn = unieap.byId('btn'), button = btn.btnNode;
			btn.setDisabled(true);
			doh.is(dojo.attr(btn, 'disabled'), true);
			btn.setDisabled(false);
			doh.is(dojo.attr(btn, 'disabled'), false);
		},
		
		function test_setLabel(){
			var btn=unieap.byId('btn');
			btn.setLabel('你好');
			doh.is("你好",btn.label);
			btn.setLabel('按钮');
		},
		
		function test_setValue(){
			var btn=unieap.byId('btn');
			btn.setValue("测试");
			doh.is("测试",btn.getValue());
			//测试数据绑定
			var form=unieap.byId('form');
			form.getBinding().setDataStore(dataCenter.getDataStore("largeDataStore"));
			btn=unieap.byId('btn_bind');
			doh.is(btn.getValue(),'工程师3');
		},
		
		function test_setVisible(){
			var btn=unieap.byId('btn');
			btn.setVisible(false);
			doh.is(dojo.style(btn.domNode, 'visibility'), "hidden");
			btn.setVisible(true);
			doh.is(dojo.style(btn.domNode, 'visibility'), "visible");
		}
			
	]);
}

//事件测试
function test_evt(){
	doh.register("Button事件测试",[
		function test_onClick(){
			dojo.query("button",dojo.byId("btn"))[0].click();
			doh.is("点击事件",unieap.byId("btn").getValue());
		},
		
		//DropDownButton onArrowClick事件
		function test_onArrowClick(){
			dojo.query("span",dojo.byId("btn_menu_0").parentNode)[0].click();
			doh.is("onArrowClick",unieap.byId("btn_menu_0").label);
		},
		
		//DropDownButton onBeforeArrowClick事件
		function test_onBeforeArrowClick(){
			dojo.query("span",dojo.byId("btnmenu").parentNode)[1].click();
			doh.is("onBeforeArrowClick",unieap.byId("btnmenu").label);
		}
		
	]);
}

dojo.addOnLoad(function(){
	test_attr();
	test_method();
	test_evt();
	doh.run();
});


