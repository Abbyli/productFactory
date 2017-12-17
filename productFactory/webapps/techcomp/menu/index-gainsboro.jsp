<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Locale"%>
<%@ page import="java.util.TimeZone"%>
<%@ page import="com.opensymphony.xwork2.util.LocalizedTextUtil"%>
<%@ page import="com.neusoft.unieap.core.i18n.GlobalService"%>
<%@ page import="com.neusoft.unieap.core.context.UniEAPContextHolder"%>
<%@ page import="com.neusoft.unieap.core.context.UniEAPContext"%>
<%@ page import="com.neusoft.unieap.core.context.properties.I18nContext"%>
<%@ page import="com.neusoft.unieap.core.base.model.SCRepository"%>
<%@ page import="com.neusoft.unieap.core.i18n.util.LocaleUtil"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- MODIFY BY TENGYF -->
<s:i18n name="techcomp.package">
<%
	UniEAPContext eapContext = UniEAPContextHolder.getContext();
	String appName=request.getParameter("appname");
	eapContext.addCustomProperty("currentAppName",appName);

	String appTitle=request.getParameter("title");
	String webPath=request.getContextPath();
    String appPath=webPath+"/"+appName;
%>
<html>
<head>
<%
	if(appTitle != null && !appTitle.equals("")){
		appTitle = java.net.URLDecoder.decode(appTitle, "utf-8");
%>
<title><%=appTitle%></title>
<%
	}else{
%>
<title><%=appName%></title>
<%
	}
%>
<%@ include file="/techcomp/ria/base/base.jsp"%>
<script type="text/javascript">
	unieap.WEB_APP_NAME = "<%=webPath%>";
	unieap.appPath="<%=appPath%>";
	unieap.appName= "<%=appName%>";
</script>

<script	type="text/javascript" src="<%=appPath%>/menu/navigator/outlook/childMenu.js"></script>
<%
	Object infotipDc = SCRepository.getSoftwareComponent("techcomp")==null?null:SCRepository.getSoftwareComponent("techcomp").getDevelopmentComponent("infotip");
	if(infotipDc!=null){
%>
<%-- InfoTip组件需要的脚本和样式 Begin --%>
<script type="text/javascript" src="<%=webPath%>/techcomp/ria/jQuery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=webPath%>/techcomp/ria/jQuery/jquery-ui-1.10.2.custom.js"></script>
<link href="<%=webPath%>/techcomp/ria/jQuery/themes/base/jquery.ui.all.css" rel="stylesheet" type="text/css" />
<link href="<%=webPath%>/techcomp/infotip/resources/style/global.css" rel="stylesheet" type="text/css" />
<link href="<%=webPath%>/techcomp/infotip/resources/style/infotip.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=webPath%>/techcomp/infotip/js/infoTipInit.js"></script>

<%-- InfoTip组件需要的脚本和样式 End --%>
<% }%>
</head>
<body class="unieap acap">
<div dojoType="unieap.layout.BorderContainer"
	height="100%" width="100%">
<div dojoType="unieap.layout.BorderPane" region="top" height="70px" splitLine=false
	showTitleBar="false" fixed="true">
<div style="overflow: hidden; height: 100%; width: 100%;">
<table width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0"
	style="background-image: -moz-linear-gradient(top, #f0f0f0, #dfdfdf); 
	background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f0f0f0), color-stop(1, #dfdfdf)); 
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f0f0f0', endColorstr='#dfdfdf', GradientType='0');">
	<tr>
		<td width="182">
			<p style="color:#136eca;font-size:40px;font-weight:bold;left:10px">&nbsp;&nbsp;UniEAP</p>
		</td>
		<td width="100%">
		<table width="100%" height="68" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="230">
					<p style="color:#899199;font-size:14px">&nbsp;&nbsp;通用企业应用平台</p>
				</td>
					
				<td width="660">&nbsp;</td>
				
				<td width="45" align="right" nowrap="nowrap" id="__UNIEAP_INFOTIP_TIPSNUM_TD__" style="visibility:hidden"><a
					target="_top" style="cursor:pointer"><img
					alt='<s:text name="techcomp.menu.index.systemMsg"/>' src="<%=appPath%>/menu/navigator/outlook/images/notices.png" width="30"
					height="30" border="0" align="absmiddle" /></a>&nbsp;(<span id="__UNIEAP_INFOTIP_TIPSNUM__" title='<s:text name="techcomp.menu.index.unreadMsgCount"/>'>0</span>)</td>
				
				<td width="45" align="right" nowrap="nowrap"><a
					href="<%=request.getContextPath()%>/techcomp/security/applications/index.jsp" target="_top"><img
					alt='<s:text name="techcomp.menu.index.multiApp"/>' src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/apps.png" title='<s:text name="techcomp.menu.index.multiApp"/>'  width="16"
					height="16" border="0" align="absmiddle" /></a></td>

				<td width="45" align="right"><a
					href="<%=request.getContextPath()%>/j_spring_security_logout"
					target="_top"><img
					src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/logout.png" title='<s:text name="techcomp.menu.index.logout"/>' alt='<s:text name="techcomp.menu.index.logout"/>' width="16"
					height="16" border="0" align="absmiddle" /></a></td>
				<td width="37">&nbsp;</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
</div>
</div>
<div dojoType="unieap.layout.BorderPane" region="left" width="240px"
	showTitleBar="true" title='<s:text name="techcomp.menu.index.menuNavi"/>'>
<div dojoType="unieap.layout.AccordionContainer" id="frameMenuContainer"
	height="100%"></div>
</div>
<div dojoType="unieap.layout.BorderPane" region="center"
	showTitleBar="false">
<div dojoType="unieap.layout.TabContainer" id="framePageContainer"
	height="100%" onAfterCloseChild="onAfterCloseChild"></div>
</div>
</div>
</body>
</html>
</s:i18n>
