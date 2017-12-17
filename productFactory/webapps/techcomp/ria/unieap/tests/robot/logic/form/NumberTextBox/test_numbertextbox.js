dojo.require("doh.robot");
function init(){
	 var ds=new unieap.ds.DataStore("testStore",[{name:'liu',empno:'1',hiredate:'2003-07-13',deptno:'10',sal:'3000'},
	                                             {name:'yang',empno:'2',hiredate:'2013-07-13',deptno:'20',sal:'5000'}]);
	 var test =new unieap.ds.DataStore("testDEPT",[{CODEVALUE:10,CODENAME:'salDepartment'},
												  {CODEVALUE:20,CODENAME:'techDepartment'},
												  {CODEVALUE:30,CODENAME:'testDepartment'}]);
	 dataCenter.addDataStore(ds);
	 dataCenter.addDataStore(test);
}
init();

function test_attr(){

	doh.register("NumberTextBox属性测试",[
	                      
	                                  
	    //name属性测试
	    function test_name(){
	    	var box=unieap.byId('maxLengthBox');
	    	doh.is("maxLengthBox",box.name);
	    },
	    
	    //required属性
		function test_required(){
			var box=unieap.byId("requiredBox"),
				visible=dojo.style(box.requiredNode,"visibility");
			doh.is("visible",visible);
		},
		
	    //formatter属性测试
	    function test_formatter(){
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
	    
		//数字文本框range测试
		function test_range(){
			var box=unieap.byId('numberBox'),
				value="",
				validator=box.getValidator();
			box.setValue("hello");
			doh.t(validator.validate());
			
			box.setValue(-2);
			doh.f(validator.validate());
			doh.is('最小值为1',validator.getErrorMsg());
			
			box.setValue(1);
			doh.t(validator.validate());
			
			box.setValue(600);
			doh.t(validator.validate());
			
			box.setValue(1000);
			doh.t(validator.validate());
			
			box.setValue(1001);
			doh.f(validator.validate());
			doh.is('最大值为1000',validator.getErrorMsg());
			
			box.setValue(100);
		},    
	    
		//精度测试
		function test_prcesionAndScale(){
			var box=unieap.byId('numberBox'),
				validator=box.getValidator();
			box.setValue(1.2);
			doh.t(validator.validate());
			box.setValue(1.20);
			doh.t(validator.validate());
			box.setValue(1.201);
			doh.f(validator.validate());
			doh.is('小数部分最多为2个数字',validator.getErrorMsg());
		},
		//maxlength测试小数和负数
		function test_maxLength(){
			
			var box=unieap.byId('maxLengthBox'),
				validator=box.getValidator();
			box.setValue(1.255);
			doh.t(validator.validate());
			doh.is("1.255",box.getValue());
			box.setValue(1.2565);
			doh.t(validator.validate());
			doh.is("1.2565",box.getValue());
			box.setValue(1.25657);
			doh.f(validator.validate());
			doh.is('该输入项的最大长度为6',validator.getErrorMsg());
			
			box.setValue(-2555);
			doh.t(validator.validate());
			doh.is("-2555",box.getValue());
			box.setValue(-25552);
			doh.t(validator.validate());
			doh.is("-25552",box.getValue());
			box.setValue(-255522);
			doh.f(validator.validate());
			doh.is('该输入项的最大长度为6',validator.getErrorMsg());
			
			box.setValue(-2.55);
			doh.t(validator.validate());
			doh.is("-2.55",box.getValue());
			box.setValue(-2.555);
			doh.t(validator.validate());
			doh.is("-2.555",box.getValue());
			box.setValue(-2.5555);
			doh.f(validator.validate());
			doh.is('该输入项的最大长度为6',validator.getErrorMsg());
		}
	]);
	
}

function test_method(){

	doh.register("NumberTextBox方法测试",[
	           
		//getDisplayFormatter 方法测试
		function test_getDisplayFormatter(){
			var box=unieap.byId('complextBox');
			var formatter=box.getDisplayFormatter();
			doh.is("$###,###.00",formatter.dataFormat);
			doh.is("unieap.form.NumberDisplayFormatter",formatter.declaredClass);
		},
		
		//getValue setValue 方法测试
		function test_getValue_setValue(){
			var box=unieap.byId('maxLengthBox');
			box.setValue("1000");
			doh.is("1000",box.getValue());
		},
		
		//getText setText 方法测试
		function test_getText_setText(){
			var box=unieap.byId('maxLengthBox');
			box.setText("1000");
			doh.is("1000",box.getText());
		},
		
		//reset 方法测试
		function test_reset(){
			var box=unieap.byId('salBinding');
			doh.is("5000",box.getValue());
			box.setValue("3000");
			doh.is("3000",box.getValue());
			box.reset();
			doh.is("5000",box.getValue());
		},
		
		//setDisabled  方法测试
		function test_setDisabled(){
			var box=unieap.byId('salBinding');
			box.setDisabled(true);
			doh.is(true,box.disabled);
		}
	]);
	
}

dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
	
});



