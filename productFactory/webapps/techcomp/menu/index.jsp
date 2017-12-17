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
	String appName="techcomp";

	String appTitle="保险产品工厂系统V1.0";
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
	unieap.getTopWin().document.onkeyup = function(evt){
		var e = evt || window.event || event
		if(e.keyCode==27){//ESC
			var dialog = unieap.getDialog() || unieap.getXDialog();
			if(dialog != null){
				if(e.stopPropagation){
					e.stopPropagation(); 
				}
				dialog.close(false);
			} else {
				if(!!navigatorContainerList && navigatorContainerList.length > 0){
					var navigatorContainer = _currentNodeOfSingleFrame.parentContainer;
					if(navigatorContainer && navigatorContainer.navigatorList){
						var list = navigatorContainer.navigatorList
						if(list.length > 1){
							//if判断 ,by qyt							
							var pane = list[list.length-1];
							var runEsc = pane.data.parameters.runEsc;
							if(!runEsc){
								navigatorContainer.tablist.onButtonClick(list[list.length-2]);
							}
						}
					}
				}
			}
		}
	}
</script>
<script	type="text/javascript" src="<%=appPath%>/menu/navigator/outlook/childMenu.js"></script>
<%
	Object infotipDc = SCRepository.getSoftwareComponent("techcomp")==null?null:SCRepository.getSoftwareComponent("techcomp").getDevelopmentComponent("infotip");
	if(infotipDc!=null){
%>
<%-- InfoTip组件需要的脚本和样式 Begin --%>
<script type="text/javascript" src="<%=webPath%>/techcomp/infotip/js/jQuery/jquery.js"></script>
<script type="text/javascript" src="<%=webPath%>/techcomp/infotip/js/jQuery/jquery-ui-1.10.2.custom.js"></script>
<link href="<%=webPath%>/techcomp/infotip/js/jQuery/themes/base/jquery.ui.all.css" rel="stylesheet" type="text/css" />

<link href="<%=webPath%>/techcomp/infotip/resources/style/global.css" rel="stylesheet" type="text/css" />
<link href="<%=webPath%>/techcomp/infotip/resources/style/infotip.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=webPath%>/techcomp/infotip/js/infoTipInit.js"></script>

<%-- InfoTip组件需要的脚本和样式 End --%>
<% }%>
<style>
.unieap .u-xdlg-mt{
	margin-bottom:10px;
}
.unieap .u-xdlg .toolbar-table{
	background-color:#efefef;
	margin-top:10px;
	border-top-color: rgb(180, 180, 180);
	border-top-style: solid;
	border-top-width: 1px;
}
.unieap .u-xdlg .toolbar-table>tbody>tr{
	height:40px;
}
</style>
</head>
<body class="unieap acap">
<div dojoType="unieap.layout.BorderContainer" 
	height="100%" width="100%">
<div dojoType="unieap.layout.BorderPane" region="top" height="44px" splitLine=false
	showTitleBar="false" fixed="true">
<div style="overflow: hidden; height: 100%; width: 100%;">
<table width="100%" height="100%" border="0" cellpadding="0"
	cellspacing="0" style="background: -moz-linear-gradient(top, #f0f0f0, #dfdfdf); 
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f0f0f0), color-stop(1, #dfdfdf)); 
	background:linear-gradient(to bottom, #f0f0f0, #dfdfdf);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f0f0f0', endColorstr='#dfdfdf', GradientType='0');">
	<tr>
		<td width="182">
			<div style="width:300px;">
				<img src="./sp_log.png" style="margin-left: 5px;"/>
				<div style="font-family: 微软雅黑;font-size: 20px;color: #212121;display:inline-block;position: absolute;margin-top: 5px;margin-left: 10px;">保1险产品工厂系统V1.0</div>
			</div>
		</td>
		<td width="100%">
		<table width="100%" height="38" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="230">
					<p style="color:#899199;font-size:14px"></p>
				</td>
					
				<td width="660">&nbsp;</td>
							
				<td width="45" align="right" nowrap="nowrap" id="__UNIEAP_INFOTIP_TIPSNUM_TD__" style="visibility:hidden"><a
					target="_top" style="cursor:pointer"><img
					alt='<s:text name="techcomp.menu.index.systemMsg"/>' src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/notices.png" width="16"
					height="16" border="0" align="absmiddle" /></a>(<span id="__UNIEAP_INFOTIP_TIPSNUM__" title='<s:text name="techcomp.menu.index.unreadMsgCount"/>'>0</span>)</td>
					<%--
				<td width="45" align="right" nowrap="nowrap"><a
					href="<%=request.getContextPath()%>/techcomp/security/applications/index.jsp" target="_top"><img
					alt='<s:text name="techcomp.menu.index.multiApp"/>' src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/apps.png" title='<s:text name="techcomp.menu.index.multiApp"/>'  width="16"
					height="16" border="0" align="absmiddle" /></a></td>
				--%>
				<td width="45" align="right"><a
					href="<%=request.getContextPath()%>/logout.action"
					target="_top"><img
					src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/logout.png" title='<s:text name="techcomp.menu.index.logout"/>' alt='<s:text name="techcomp.menu.index.logout"/>' width="16"
					height="16" border="0" align="absmiddle" /></a></td>
				<%--
				<td width="45" align="right"><div id="unieap_helptip_button" tooltip="操作指引" class="navigator-helptip-btn"  disabled='true' dojoType="unieap.Helptip"></td>
				 --%>
				<!-- 在线帮助  -->
				 <%--
				<td width="45" align="right" nowrap="nowrap" id="__UNIEAP_ONLINEHELP__" style="visibility:visible"><img
					alt='<s:text name="techcomp.menu.index.onlineHelp"/>' src="<%=appPath%>/menu/navigator/outlook/images/gainsboro/help.png" title='<s:text name="techcomp.menu.index.onlineHelp"/>'  width="16"
					height="16" border="0" align="absmiddle" onclick="getAllHelpPageForIconOnClick()" /></td>
					--%>
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
