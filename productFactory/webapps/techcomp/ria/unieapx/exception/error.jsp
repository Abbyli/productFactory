<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://unieap.neusoft.com/techcomp/ria" prefix="ria" %>
<%
	String ROOT_PATH=request.getContextPath()+"/techcomp/ria/unieapx/exception/";
%>
<html>
<head>
 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<%@ include file="/techcomp/ria/base/base.jsp" %>
 	<script type="text/javascript" src="<%=ROOT_PATH%>error.js"></script>
</head>
<body class="unieap" style="width:100%;WORD-BREAK:break-all;WORD-WRAP:break-word;overflow-y:hidden;overflow-x:hidden">
	<s:i18n name="com.neusoft.unieap.techcomp.ria.package">
	<div>
		<table>
			<tr>
				<td><div id="iconId"></div></td>
				<td><div id="titleId"></div></td>
			</tr>
		</table>
	</div>
	<div id="outerStackId" style="display:none;">
		<hr />
	   	<div id="stackId" style="width:100%;height:200px;WORD-BREAK:break-all;WORD-WRAP:break-word;overflow-y:hidden;overflow-x:hidden">
	   		<textarea id="stackDetail" class="exception-content" style="height:100%;width:100%">
	   		</textarea>
		</div>
	</div>
	<hr />
	<div class="buttons">
		<div id="btnClose"
			dojoType="unieap.form.Button" 
			label='<s:text name="unieap.techcomp.ria.dialog.close.label"/>' 
			onClick="winClose"></div>
	</div>
	</s:i18n>
</body>
</html>