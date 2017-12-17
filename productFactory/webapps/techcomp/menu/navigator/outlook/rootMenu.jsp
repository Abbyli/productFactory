<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- MODIFY BY TENGYF -->
<s:i18n name="techcomp.package">
<%
	String webPath=request.getContextPath();
	String appName=request.getParameter("appname");
	String appPath=webPath+"/"+appName;
	String show ="style=\"display:block\"";
%>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No"/>
<title>UniEAP V4</title>

<script language=javascript	src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/rootMenu.js"></script>
<script type="text/javascript">		
			var appPath = "<%= appPath %>";
</script>	
<style>
body {
	background: #FFFFFF;
	margin: 0px;
}
.head_tab_checked_bk {
	color: #000;
	text-decoration: none;
}
.head_bg_blue2 {
	background-image: url(<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/head_bg_blue.png);
	background-repeat: no-repeat;
}
.head_bg_black2 {
	background-image: url(<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/head_bg_black.gif);
	background-repeat: repeat-x;
}
</style>
</head>
<body class="body" >
<!-- 
<input type="button" onclick="refreshMessage();" value='<s:text name="techcomp.menu.navigator.outlook.rootMenu.displayMyInfo"/>'>
<span id="spannews"><font color='black' id='fontitem'></font></span>
 -->
<table width="100%" height="68" border="0" cellpadding="0"
	cellspacing="0">
	<tr>
		<td width="182"><img
			src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/head_logo_UniEAP.png" width="177"
			height="68" /></td>
		<td class="head_bg_black2" width="100%">
		<table  width="100%"  height="68" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td  width="230"><img
					src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/head_bg_blue.png" 
					 border="0" align="absmiddle"  />
				</td>
				<td  width="230"><span id="userName"></span><span onmouseover="showToolTip(this)" id="org"></span>
				</td >
				<td  width="400">&nbsp;
				</td>
				
				<td width="30"><div id="exceptionImg" onClick="showException()"></div></td>
				<!-- 
				<td width="45" align="right" >
					 <img
					src="<%=appPath%>/pages/menu/images/lock.gif" alt='<s:text name="techcomp.menu.navigator.outlook.rootMenu.lockSystem"/>' style="cursor:pointer"
					width="30" height="30" border="0" align="absmiddle" onclick="lockSystem()" />
				</td>
				 -->
				<!-- 
				<td width="45" align="right" class="unieap">
					<div dojoType="unieapx.trace.MessageCenter" title='<s:text name="techcomp.menu.navigator.outlook.rootMenu.infoCenter"/>'></div>
				</td>
				<td  width="45" align="right"><img style="display:none;"
					src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/password.gif" alt='<s:text name="techcomp.menu.navigator.outlook.rootMenu.changePassword"/>' style="cursor:pointer"
					width="30" height="30" border="0" align="absmiddle" onclick="changePersonProps()" />
				</td>
				 -->
				 <td width="45" align="right"><a
					href="<%=request.getContextPath()%>/j_spring_security_logout"
					target="_top"><img
					src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/logout.gif" alt='<s:text name="techcomp.menu.navigator.outlook.rootMenu.logout"/>'
					width="30" height="30" border="0" align="absmiddle" /></a></td>
				 
				<td width="45" align="right" nowrap="nowrap" <%=show%>>
					<a href="<%=request.getContextPath()%>/platform/core/applications/index.jsp" target="_top"><img  alt='<s:text name="techcomp.menu.navigator.outlook.rootMenu.multiApp"/>' title='<s:text name="techcomp.menu.navigator.outlook.rootMenu.multiApp"/>'
					src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/apps.gif"
					width="30" height="30" border="0" align="absmiddle" /></a></td>
				<td width="110" align="right"><img src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/images/head_logo_neusoft.gif"	width="103" height="68" /></td>
				<td width="37">&nbsp;</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
</body>
</html>
</s:i18n>
