<%@ page language="java" pageEncoding="UTF-8" %>
<html>
<head>
<title>UniEAP v4</title>
<%
String webPath=request.getContextPath();
String appName=request.getParameter("appname");
String appPath=webPath+"/"+appName;


%>
<link rel="stylesheet" href="<%=webPath%>/<%=appName%>/menu/navigator/outlook/themes/frame.css" type="text/css"></link>
<link rel="stylesheet" href="<%=webPath%>/<%=appName%>/menu/navigator/outlook/themes/tab.css" type="text/css"></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/base/css/menu.css"></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/blue/css/menu.css"></link>
<script language="javascript">
		var appPath = "<%=appPath%>";
		temppath=appPath.split("/");
 		actionpath="/"+temppath[temppath.length-1];
 		function refreshWorkArea(){
			refresh();
		}
</script>

<script type="text/javascript" src="<%=webPath%>/techcomp/ria/dojo/dojo.js" djConfig="parseOnLoad: false,locale:'zh'"></script>
<script type="text/javascript" src="<%=webPath%>/techcomp/ria/unieap/patch/dojo-patch.js"></script>

<script type="text/javascript" src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/tab.js"></script>

</head>
<body rightmargin="0" leftmargin="0" scroll="no" class="unieap">

<table style="width:100%;height:100%;" border="0" cellspacing="0" cellpadding="0" >
  <tr>
  	<td style="height:30px;">
		<table width="100%"  border="0" cellspacing="0" cellpadding="0" class="tab_bg">
		  	<tr>
		  		<td width="20"></td>
		    	<td  class="Tab" ><table border="0" cellspacing="0" cellpadding="0" onclick=menuClick(event) oncontextmenu="menuContextClick(event)">
		    	<tr id="unieap_menus"></tr></table>
		    	</td>

		    	<td style="padding-left:5px;" width="45" id="favorite"></td>
   				<td  width="45" id="docbook"></td>
		   	</tr>
		 </table>
  	</td>
 </tr>
 <tr>
 	<td style="height:100%;">
 		<div style="height:100%;" id="unieap_pages"></div>
 	</td>
 </tr>
</table>
</body>
</html>