
function test_attr(){
	doh.register("InlineEditBox属性测试",[
	
		//required属性
		function test_required(){
			var box=unieap.byId("inlineEditBox"),
				visible=dojo.style(box.requiredNode,"visibility");
			doh.is("visible",visible);
		},
		
		//displayFormatter属性
		function test_displayFormatter(){
			var box=unieap.byId("complextBox"),
				text,value;
			box.setValue(20);
			text=box.getText();
			value=box.getValue();
			doh.is("$20.00",text);
			doh.is(20,box.getValue());
			
			box.setValue("2000");
			text=box.getText();
			value=box.getValue();
			doh.is("$2,000.00",text);
			doh.is(2000,box.getValue());
			
			box.setValue(2000000);
			text=box.getText();
			value=box.getValue();
			doh.is("$2,000,000.00",text);
			doh.is(2000000,box.getValue());
		},
		
		//validator属性
		function test_validator(){
			var box=unieap.byId("complextBox"),
				validator=box.getValidator();
			doh.t(validator.validate());
			box.setValue('native2ascii');
			doh.f(validator.validate());
			doh.is('只能输入数字',validator.getErrorMsg());
			
			box.setRequired(true);
			box.setValue('');
			doh.f(validator.validate());
			doh.t(validator.getErrorMsg().indexOf('该输入项的值不能为空')>-1);
			
			box.setRequired(false);
			box.setValue(3000);
		}
	]);
}

function test_method(){
	
	doh.register("InlineEditBox方法测试",[
	
		//是指是否必填
		//setRequired
		function test_setRequired(){
			var box=unieap.byId("inlineEditBox");
			box.setRequired(false);
			var visible=dojo.style(box.requiredNode,"visibility");
			doh.is("hidden",visible);
			box.setRequired(true);
			visible=dojo.style(box.requiredNode,"visibility");
			doh.is("visible",visible);
		},
		
		//获得文本值
		//getValue
		function test_getValue(){
			var box=unieap.byId('inlineEditBox');
			doh.is('hi',box.getValue());
			box.setValue("hello");
			doh.is("hello",box.getValue());
		},
		
		//校验
		//getValidator().validate()
		function test_validate(){
			var box=unieap.byId('inlineEditBox'),
				validator=box.getValidator(),
				errorNode=box.errorNode;
			box.setValue('');
			doh.f(validator.validate());
			doh.is(dojo.style(errorNode,'display'),'block');
			doh.t(validator.getErrorMsg().indexOf('该输入项的值不能为空')>-1);
			
			box.setValue("hello");
			doh.t(validator.validate());
			doh.is(dojo.style(errorNode,'display'),'none');
			doh.t(validator.validate());
		}
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
