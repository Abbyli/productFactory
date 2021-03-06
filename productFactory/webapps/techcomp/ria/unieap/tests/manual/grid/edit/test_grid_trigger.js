dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});

function commit() {
	var row = dojo.byId("rowInput").value;
	if (row == "" || isNaN(row)) {
		alert("请输入数字");
		return
	} else {
		row = parseInt(row);
	}
	if (row>4) return;
	var name = dojo.byId("nameInput").value;
	if (name == "") {
		alert("列名为空");
		return;
	}
	var value = dojo.byId("valueInput").value;
	var rs = grid.getBinding().getRowSet();
	rs.setItemValue(row, name, value);
}