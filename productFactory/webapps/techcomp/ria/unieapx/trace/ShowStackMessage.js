
function init(){
	var dc = unieap.getDialog().getObject();
	var ds = dc.getDataStore("traceMessageStore");
	var row = ds.getRowSet().getRow(0);
	var stackMessage = row.getItemValue("stackMessage");
	var titleMessage = row.getItemValue("message");
	if(stackMessage != '' && stackMessage != null){
		var stackObj = document.getElementById("stackDetail");
		stackObj.value = stackMessage;
	}
	if(titleMessage != '' && titleMessage != null){
		var titleObj = document.getElementById("titleId");
		if(titleMessage.length > 200)
		{
			titleMessage = titleMessage.substring(0,200)+"...";
		}
		titleObj.innerHTML = titleMessage;
	}
}
function winClose(){
	unieap.getDialog().close();
}

dojo.addOnLoad(init);

