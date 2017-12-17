dojo.require("doh.runner");
var ds = unieap.getDataStore("empDataStore");
var statistics = {"attr_sal":{"max":5555,"min":222}};
ds.setStatistics(statistics);
dojo.addOnLoad(test);
function test() {
	testWidget = grid;
	doh.register("Grid lockrow 属性测试", [
		function test_lockFunAndstatistics(){
			var lock = dojo.query(".u-grid-locked-content-rows",grid.domNode);
			doh.is(lock.length,"3");
			var text1 = dojo.query(".u-grid-locked-content-rows",grid.domNode)[0].innerText;
			doh.is(text1,"");
			var text2 = dojo.query(".u-grid-locked-content-rows",grid.domNode)[1].innerText.replace(/\r\n/ig,"");
			doh.is(text2,"251252  ");
			var text3 = dojo.query(".u-grid-locked-content-rows",grid.domNode)[2].innerText.replace(/\r\n/ig,"");
			doh.is(text3,"用户1 25555用户2 25555  最大值: 5555  最小值: 222");
		},                            
		function test_getLockedRow(){
			var edit=grid.getManager('EditManager');
			edit.setEdit(0,"attr_empno"); 
			dojo.query(".u-grid-locked",grid.domNode).forEach(function(lockDiv){
				lockDiv.click();
			});
		}
	]);
	doh.register("Grid lockrow 方法测试", [
	    //当可编辑grid有锁定行时，点击锁定行
	    function test_lockrow_edit(){
	    	var edit=grid.getManager('EditManager');
	    	edit.setEdit(0,"attr_empno"); 
	    	dojo.query(".u-grid-locked",grid.domNode).forEach(function(lockDiv){
	    		lockDiv.click();
	    	});
	    }
	]);
	doh.run();
}
