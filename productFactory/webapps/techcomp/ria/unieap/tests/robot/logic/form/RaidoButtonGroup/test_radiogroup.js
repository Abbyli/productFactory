
//属性测试
function test_attr(){
	doh.register("RaidoButtonGroup属性测试",[
	]);
}


//方法测试
function test_method(){
	doh.register("RaidoButtonGroup方法测试",[
	
	    //测试CODEVALUE为布尔型true或false时，setValue方法
		function test_setValue_Boolean(){
			var box=unieap.byId('radioGroup1');
			box.setValue(true);
			var value=[];
			dojo.query("input:checkbox",box.domNode).forEach(function(radio,index){
				if (radio.checked) {
					value.push(index);
				}
			});
			doh.is("0",value.join(","));
			doh.is(true,box.getValue());
			
			box.setValue(false);
			value=[];
			dojo.query("input:checkbox",box.domNode).forEach(function(radio,index){
				if (radio.checked) {
					value.push(index);
				}
			});
			doh.is("1",value.join(","));
			doh.is(false,box.getValue());
		},
		
		
		function test_getValue(){
			var box=unieap.byId('radioGroup');
			box.setValue("20");
			var value=[];
			dojo.query("input:checkbox",box.domNode).forEach(function(radio,index){
				if (radio.checked) {
					value.push(index);
				}
			});
			doh.is("1",value.join(","));
			doh.is("20",box.getValue());
			box.setValue("10");
			value=[];
			dojo.query("input:checkbox",box.domNode).forEach(function(radio,index){
				if (radio.checked) {
					value.push(index);
				}
			});
			doh.is("0",value.join(","));
			doh.is("10",box.getValue());
		},
		
		
		//获得文本
		function test_getText(){
			var box=unieap.byId('radioGroup'),
				text=box.getText();
			doh.is("财务部",text);
		}
		
		
	
	]);
}


dojo.addOnLoad(function(){
	test_attr();
	test_method();
	doh.run();
});
