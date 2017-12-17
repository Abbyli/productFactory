var oldHeight = null;
var titleLength = null;

function init() {
	var obj = unieap.getDialog().getObject();
	var dc = obj.dc;
	var exType = obj.exType;
	if(exType == unieapx.exception.Handler.getBusinessExceptionType()){
		var iconObj = document.getElementById("iconId");
		dojo.addClass(iconObj,'icon-warn');
	}else{
		var iconObj = document.getElementById("iconId");
		dojo.addClass(iconObj,'icon-error');
	}
	oldHeight = unieap.getDialog().height;
	titleLength = 60;
	var detail = dc.getDetail();
	var title = dc.getTitle();
	if (detail != null && detail != '') {
		// 创建含有堆栈信息的Message
		var titleObj = document.getElementById("titleId");
		if(title != null && title != ''&&title.length > titleLength)
		{
			title = title.substring(0,titleLength)+"...";		
		}
		titleObj.innerHTML = title
		+ "<a href=\"#\" onclick='displayStack()'> >>"
		+ RIA_UNIEAPX_I18N.exception.stackLabel + "</a>";
		var stackDetail = document.getElementById("stackDetail");
		stackDetail.value = detail;
	} else {
		var titleObj = document.getElementById("titleId");
		titleObj.innerHTML = title;
	}
}
dojo.addOnLoad(init);
// 显示收缩堆栈信息
function displayStack() {
	var stackDiv = document.getElementById("outerStackId");
	if (stackDiv.style.display == "none") {
		var newHeight = 320;
		unieap.getDialog().setHeight(newHeight);
		stackDiv.style.display = "block";
	} else {
		stackDiv.style.display = "none";
		unieap.getDialog().setHeight(oldHeight);
	}
}

function winClose(){
	unieap.getDialog().close();
}