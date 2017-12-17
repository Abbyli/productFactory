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
	doh.register("Form属性测试",[
	
	//form属性binding                         
	function test_binding(){
		doh.is("liu",unieap.byId('name').getValue());
		doh.is("1",unieap.byId('empno').getValue());
		doh.is("2003-07-13",unieap.byId('hiredate').getValue());
		doh.is("10",unieap.byId('deptno').getValue());
		doh.is("3000",unieap.byId('sal').getValue());
	},
	
	//FormBinding属性bindIndex+dataCenter+store测试
	function test_bindIndex(){
		doh.is("yang",unieap.byId('nameBinding').getValue());
		doh.is("5000",unieap.byId('salBinding').getValue());
	}
	]);
}


function test_method(){
	
	doh.register("Form方法测试",[
	
		//控件值收集
		function test_collectData(){
			var form=unieap.byId('form'),
				actualData=form.getHelper().collectData(),
				expectedData={
					name:'liu',
					sal:3000,
					empno:'1',
					hiredate:'2003-07-13',
					deptno:'10'
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//form中的getbinding方式测试
		function test_getBinding(){
			var form=unieap.byId('form');
			var binding=form.getBinding();
			doh.is(dataCenter.getDataStore("testStore"),binding.getDataStore());
		},
		
		//from中getHelper方法测试
		function test_getHelper(){
			var form=unieap.byId('form');
			var helper=form.getHelper();
			doh.is("unieap.form.FormHelper",helper.declaredClass);
		},
		
		//获得form下的Widget控件
//		function test_getDescendants(){
//			var form=unieap.byId('form');
//			doh.is(5,form.getDescendants().length);
//		},
		//form中getDescendants方法测试（当控件是unieap.form.FormWidget的子类才返回）
		function test_getDescendants(){
			unieap.form.FormWidget.prototype._name='_formWidget';
			var form=unieap.byId('form');
			var children=form.getDescendants();
			doh.t(children.length>0);
			dojo.forEach(children,function(widget){
				doh.is("_formWidget",widget._name);
			});
		},
		
		//判断form是否修改
		function test_isModified(){
			var form=unieap.byId('form');
			doh.f(form.isModified());
			unieap.byId('name').setValue('flyingzl');
			doh.t(form.isModified());
			
		},
		
		//清空form下所有控件的值
		//不显示小三角，但测试form.isModified()为true
		function test_clear(){
			var form=unieap.byId('form');
			form.clear();
			doh.t(form.isModified());
			var actualData=form.getHelper().collectData(),
				expectedData={
					name:'',
					sal:'',
					empno:'',
					hiredate:'',
					deptno:null
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//还原到初始值
		function test_reset(){
			var form=unieap.byId('form');
			form.reset();
			doh.f(form.isModified());
			var actualData=form.getHelper().collectData(),
				expectedData={
					name:'liu',
					sal:3000,
					empno:'1',
					hiredate:'2003-07-13',
					deptno:'10'
				}
			doh.is(dojo.toJson(expectedData),dojo.toJson(actualData));
		},
		
		//表单校验
		function test_validate(){
			var form=unieap.byId("form");
			doh.t(form.validate());
			unieap.byId('name').setValue('');
			doh.f(form.validate());
			//获得第一个出错的控件
			doh.is('name',form.getInvalidWidget().id);
			unieap.byId('name').setValue('flyingzl');
			doh.t(form.validate());
			//全部校验通过，没有非法的控件
			doh.is(null,form.getInvalidWidget());
			form.reset();
			doh.f(form.isModified());
		},
		
		//刷新绑定
		function test_refresh(){
			var form=unieap.byId("form"),
				binding=form.getBinding(),
				row=binding.getRow();
			row.getData()['name']='flyingzl';
			form.refresh();
			doh.is('flyingzl',unieap.byId('name').getValue());
			
		},
		
		//FormBinding方法bind测试
		function test_bind(){
			var form=unieap.byId("formBinding");
			var ds=new unieap.ds.DataStore('demo',[{name:'liu',sal:'2000'},{name:'kou',sal:'6000'}]);
			var row=ds.getRowSet().getRow(1);
			form.getBinding().bind(row);
			doh.is("kou",unieap.byId('nameBinding').getValue());
			doh.is("6000",unieap.byId('salBinding').getValue());
		},
		
		//FormBinding方法getDataStore测试
		function test_getDataStore(){
			var form=unieap.byId('form');
			var binding=form.getBinding();
			doh.is(dataCenter.getDataStore("testStore"),binding.getDataStore());
		},
		
		//FormBinding方法getRow测试
		function test_getRow(){
			var form=unieap.byId('form');
			var binding=form.getBinding();
			doh.is(dataCenter.getDataStore("testStore").getRowSet().getRow(0),binding.getRow());
		},
		
		//FormBinding方法setDataStore测试
		function test_getDataStore(){
			var form=unieap.byId('formBinding');
			var ds=new unieap.ds.DataStore('demo',[{name:'wu',sal:'1000'},{name:'hu',sal:'7000'}]);
			var binding=form.getBinding();
			binding.setDataStore(ds,0);
			doh.is(ds,binding.getDataStore());
		},
		
		//FormBinding方法unbind测试
		function test_unbind(){
			var form=unieap.byId('formBinding');
			var binding=form.getBinding();
			binding.unbind();
			doh.is(null,binding.getDataStore());
		},
		
		//FormHelper方法collectData测试
		function collectData(){
			var helper=unieap.byId('formBinding').getHelper();
			//data为{'name':'wu','sal':'1000'},
			var data=helper.collectData();
			//new_data为{'name':'jack'},因为只收集带binding属性的控件
			doh.is("wu",data.name);
			doh.is("1000",data.sal);
			var new_data=helper.collectData(true);
			doh.is("wu",new_data.name);
			doh.is("1000",new_data.sal);
		}
	
	]);
}

dojo.addOnLoad(function(){
	
	test_attr();
	test_method();
	doh.run();
});



