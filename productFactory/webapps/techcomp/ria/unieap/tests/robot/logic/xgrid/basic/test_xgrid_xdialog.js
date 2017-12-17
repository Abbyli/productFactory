dojo.require("doh.runner");
dojo.addOnLoad(test);
function test() {
	doh.register("XGrid xdialog 方法测试", [
		function openDialog(){
		 	var d = XDialogUtil.createDialog({
				title:"xgrid",
				height:"370px",
				width:"600px",
				url:"test_xgrid_inner.html",
				dialogData:{"number":"1"},
				onComplete:openDialogAgain
			});
			function openDialogAgain(){
				var d1 = XDialogUtil.createDialog({
					title:"xgrid",
					height:"370px",
					width:"600px",
					url:"test_xgrid_inner.html",
					dialogData:{"number":"2"}
				});
				d1.show();
			}
			d.show();                                 
		}
	]);
	doh.run();
}



