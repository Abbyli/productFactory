dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	//当Grid初始化后测试Grid的属性是否正确
	doh.register("XGrid rowedit 属性测试", [
	]);
	doh.register("XGrid rowedit 方法测试", [
	    
		//insertRow方法测试
		function test_insertRow(){
			var gridManager = unieap.byId("xgrid").getManager("RowEditManager");
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
			var gridManager = unieap.byId("xgrid").getManager("RowEditManager");
			gridManager.setEdit(2,"attr_sal");
			doh.is("2",gridManager.getCurrentRowIndex());
		},
		
		//apply方法测试
		function test_apply(){
			var gridManager = unieap.byId("xgrid").getManager("RowEditManager");
			gridManager.setEdit(2,"attr_sal");
			doh.is("2",gridManager.getCurrentRowIndex());
			gridManager.apply();
			doh.is("-1",gridManager.getCurrentRowIndex());
		},
		
		//setCellIndex方法测试
		function test_setCellIndex(){
//			 var gridManager=unieap.byId("xgrid").getManager("RowEditManager");
//			 gridManager.setCellIndex(0);
//			 gridManager.getFocusCell();
		},
		
		//getFocusCell方法测试(这个方法？)
		function test_getFocusCell(){
//			var gridManager = unieap.byId("grid").getManager("RowEditManager");
//			gridManager.setType("cellEdit");
//			gridManager.setEdit(2,"attr_sal");
//			gridManager.setType("rowEdit");
		},
		
		//deleteRow方法测试有滚动条的grid样式设置                                
		function test_deleteRow(){
			var xgrid = unieap.byId("xgrid");
			var row0 = xgrid.getBinding().getRow(0);
			
			xgrid.getManager("RowEditManager").deleteRow(1);
			var _row0 = xgrid.getBinding().getRow(0);
			doh.is(row0,_row0);
		},
		
		//deleteRows方法测试
		function test_deleteRows(){
			var xgrid = unieap.byId("xgrid");
			var arr  = [0,2];
			var rowNum = xgrid.getBinding().getRowCount();
			
			xgrid.getManager("RowEditManager").deleteRows(arr);
			var _rowNum = xgrid.getBinding().getRowCount();
			doh.is(rowNum-2,_rowNum);
		}
		
		
	]);
	doh.run();
}
