dojo.require("doh.robot");
function init(){
	var ds=new unieap.ds.DataStore("menuTree",[
               {id:'100',label:'人',parent:'',leaf:false},
               {id:'1001',label:'人',parent:'100',leaf:false},
               {id:'10011',label:'学生',parent:'1001',leaf:true},
               {id:'10013',label:'农民',parent:'1001',leaf:true},
               {id:'1002',label:'动物', parent:'100',leaf:false},
               {id:'1003',label:'脊椎动物', parent:'1002',leaf:true}
    ]);
    dataCenter.addDataStore(ds);
}

init();

function test_method(){

	doh.register("ComboBoxTree方法测试",[
	           
	    //测试没有全选按钮时全部选中后报错
		function test_test_onclick(){
			var combotree = unieap.byId('comboTree');
			dojo.query("input",dojo.byId('comboTree'))[0].click();
			doh.is("人",combotree.getValue());
			dojo.query("a",dojo.byId('comboTree'))[0].click();
			doh.is("学生",combotree.getValue());
			combotree.clear();
			dojo.query("input",dojo.byId('comboTree'))[0].click();
			doh.is("人",combotree.getValue());
			dojo.query("a",dojo.byId('comboTree'))[0].click();
			doh.is("学生",combotree.getValue());
		}
	]);
	
}

dojo.addOnLoad(function(){
	test_method();
	doh.run();
	
});



