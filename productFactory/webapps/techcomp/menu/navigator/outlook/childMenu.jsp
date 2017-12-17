<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!-- MODIFY BY TENGYF -->
<s:i18n name="techcomp.package">
<%
    String webPath=request.getContextPath();
    String appName=request.getParameter("appname");
    String apppath=webPath+"/"+appName;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>MenuTree</title>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/<%=appName%>/menu/navigator/outlook/themes/navigator.css" ></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/base/css/common.css"></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/blue/css/common.css"></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/base/css/tree.css"></link>
<link rel="stylesheet" type="text/css" href="<%=webPath%>/techcomp/ria/unieap/themes/blue/css/tree.css"></link>

<script type="text/javascript" src="<%=webPath%>/techcomp/ria/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%=webPath%>/techcomp/ria/unieap/patch/dojo-patch.js"></script>
<script type="text/javascript" src="<%=webPath%>/techcomp/ria/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript">
	if (!window.unieap) {
		unieap = {};
	}
	unieap.WEB_APP_NAME = "<%=webPath%>";
	unieap.appPath="<%=apppath%>";
	unieap.appName= "<%=appName%>";
	dojo.require("unieap.rpc");
	dojo.require("unieap.tree.Tree");
</script>
<script type="text/javascript"	src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/childMenu.js"></script>
</head>
<body class="unieap" >
	<div class="u-ngt">
			<table class="u-ngt-tab" cellspacing="0" cellpadding="0">				
					<tr>
						<td id="nvgcontenttd">	
							<table  width="100%" height="100%" cellspacing="0" cellpadding="0">
								<tr>
									<td id="u-navigator"></td>	
								</tr>
								<tr>
									<td style="height:25px;">
										<div id="ngtmenus" style="display:block;">
											<div id="upBtn" class="u-ngt-up" onclick="scrollup()" title='<s:text name="techcomp.menu.navigator.outlook.childMenu.scrollUp"/>'><div class="icon"></div></div>
											<div id="ngttabmenus" style="overflow:hidden;"></div>
											<div id="downBtn" class="u-ngt-down" onclick="scrolldown()" title='<s:text name="techcomp.menu.navigator.outlook.childMenu.scrollDown"/>'><div class="icon"></div></div>
										</div>
										<div class="u-ngt-btm">
											<!-- <div class="u-ngt-favorite" title='<s:text name="techcomp.menu.navigator.outlook.childMenu.history"/>' onClick="openFavorite()"></div> -->
											<div class="u-ngt-display" title='<s:text name="techcomp.menu.navigator.outlook.childMenu.expand"/>' onclick="openMenus(this)"></div>
										</div>
									</td>	
								</tr>
							</table>
						</td>
						<td class="u-ngt-drag" onmousedown="dragNavigator(event,this)">
							<div id="navigatorBtn" onClick="zoomNavigator(this)" class="u-ngt-dragproxy"></div>
						</td>
					</tr>				
			</table>
	</div>
</body>
</html>
</s:i18n>
