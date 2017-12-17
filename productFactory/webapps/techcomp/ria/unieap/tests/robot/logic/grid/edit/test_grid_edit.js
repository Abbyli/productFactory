dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	//当Grid初始化后测试Grid的属性是否正确
	doh.register("Grid edit 属性测试", [
	    function test_editType(){
	    	doh.is("rowEdit",unieap.byId("grid").getManager('EditManager').getType());
	    },
	    
	    function test_singleClickEdit(){
	    	doh.is(true,unieap.byId("grid").getManager('EditManager').isSingleClickEdit());
	    }
	]);
	doh.register("Grid edit 方法测试", [
	    
	    //deleteRow方法测试有滚动条的grid样式设置                                
		function test_deleteRow(){
			var grid = unieap.byId("grid");
			var row0 = grid.getBinding().getRow(0);
			
			grid.getManager("EditManager").deleteRow(1);
			var _row0 = grid.getBinding().getRow(0);
			doh.is(row0,_row0);
		},
		
		//deleteRows方法测试
		function test_deleteRows(){
			var grid = unieap.byId("grid");
			var arr  = [0,2];
			var rowNum = grid.getBinding().getRowCount();
			
			grid.getManager("EditManager").deleteRows(arr);
			var _rowNum = grid.getBinding().getRowCount();
			doh.is(rowNum-2,_rowNum);
		},
		
		//setSingleClickEdit方法测试
		function test_setSingleClickEdit(){
			var grid = unieap.byId("grid");
			grid.getManager("EditManager").setSingleClickEdit(false);
			doh.f(grid.getManager('EditManager').isSingleClickEdit());
		},
		
		//setType方法测试
		function test_setType(){
			var gridManager = unieap.byId("grid").getManager("EditManager");
			gridManager.setType("cellEdit");
			doh.is("cellEdit",gridManager.getType());
			
			gridManager.setType("rowEdit");
		},
		
		//insertRow方法测试
		function test_insertRow(){
			var gridManager = unieap.byId("grid").getManager("EditManager");
			var rowData = {
					  attr_empno:"0001",
			          NAME: "somebody",
			          attr_job: "开发部",
			          attr_sal: 2000
			      };
		    //如果Grid控件为行编辑,编辑时光标位于第一行第一列上
			gridManager.insertRow(rowData,0);
			doh.is("0",gridManager.getCurrentRowIndex());
		    //编辑时光标落在第二行、第二列的单元格上
			gridManager.insertRow(rowData,1,1);
			doh.is("1",gridManager.getCurrentRowIndex());
			
		},
		
		//setEdit方法测试
		function test_setEdit(){
			var gridManager = unieap.byId("grid").getManager("EditManager");
			gridManager.setEdit(2,"attr_sal");
			doh.is("2",gridManager.getCurrentRowIndex());
		},
		
		//apply方法测试
		function test_apply(){
			var gridManager = unieap.byId("grid").getManager("EditManager");
			gridManager.setEdit(2,"attr_sal");
			doh.is("2",gridManager.getCurrentRowIndex());
			gridManager.apply();
			doh.is("-1",gridManager.getCurrentRowIndex());
		},
		
		//getFocusCell方法测试(这个方法？)
		function test_getFocusCell(){
//			var gridManager = unieap.byId("grid").getManager("EditManager");
//			gridManager.setType("cellEdit");
//			gridManager.setEdit(2,"attr_sal");
//			gridManager.setType("rowEdit");
		}
		
		
	]);
	doh.run();
}
