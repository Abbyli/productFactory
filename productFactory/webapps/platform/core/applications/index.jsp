<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page
	import="java.lang.*,java.util.*,com.neusoft.unieap.core.base.model.*"%>
<%@ page import="com.neusoft.unieap.core.i18n.GlobalService"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	String path = request.getContextPath();
	Locale locale = GlobalService.getDefaultI18nContext().getLocale();

	//session.setAttribute("WW_TRANS_I18N_LOCALE", locale.toString());
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<meta HTTP-EQUIV="MSThemeCompatible" CONTENT="No"></meta>
<!-- MODIFY BY TENGYF -->
<title><s:i18n name="platform.core.package"><s:text name="platform.core.applications.index.title"/></s:i18n></title>
<script type="text/javascript" src="<%=path%>/techcomp/ria/dojo/dojo.js" djConfig=" parseOnLoad: true,locale:'zh'"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/patch/dojo-patch.js" charset="utf-8"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/dijit/dijit.js" charset="utf-8"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/patch/loader.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/patch/boosters.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/nls/application_<%=locale.toString()%>.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/global.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/cache.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/unieap/rpc.js"></script>
<script type="text/javascript"
	src="<%=path%>/techcomp/ria/base/rpc.js"></script>
<link href="<%=path%>/platform/core/applications/css/style.css"
	rel="stylesheet"></link>
<script type="text/javascript">
			var applications = [];
			var webpath = "<%=path%>";
			<%List apps = SCRepository.getAvailableApplications();
			for (int i = 0, l = apps.size(); i < l; i++) {
				Application app = (Application) apps.get(i);%>
			 		applications.push(<%=app.toJson()%>);
			 <%}%>
			
			function getWelcome(application){
				var url = webpath + application.welcome;
				url+= (url.lastIndexOf("?")>0 ? "&" : "?") + "appname="+application.id;
				return url;
			}
			function createApp(){
				//只有一个应用，则直接跳转
				if(applications.length==1){
					window.location.href =  getWelcome(applications[0]);
					return;
				}
				var oTR1 ,oTR2, oTD1, oTD2, oTD3 ,oTD4;
				var apptb = document.getElementById("apptb");
				for(var i=0,app; (app=applications[i]);i++){
					if(i%4==0){
						oTR1 = document.createElement("tr");
						apptb.appendChild(oTR1);
						oTR2 = document.createElement("tr");
						apptb.appendChild(oTR2);
						oTD1 = document.createElement("td");
						oTR1.appendChild(oTD1);
						oTD2 = document.createElement("td");
						oTR2.appendChild(oTD2);
						oTD1.innerHTML = "<a class='text_14_B' href='"+getWelcome(app) +"'> <img src='"+ webpath+ app.icon +"' width='64' height='64' border='0'/></a>";
						oTD2.innerHTML="<a class='text_14_B' href='"+getWelcome(app) +"' target='_self' class='link_tab_14_bk'>"+ app.title +"</a>";
					}else{
						oTD3 = document.createElement("td");
						oTR1.appendChild(oTD3);
						oTD3.className="blanktd";
						oTD4 = document.createElement("td");
						oTR2.appendChild(oTD4);
						oTD1 = document.createElement("td");
						oTR1.appendChild(oTD1);
						oTD1.innerHTML = "<a class='text_14_B' href='"+getWelcome(app) +"'> <img src='"+ webpath+ app.icon +"' width='64' height='64' border='0'/></a>";
						oTD2 = document.createElement("td");
						oTR2.appendChild(oTD2);
						oTD2.innerHTML="<a class='text_14_B' href='"+getWelcome(app) +"' target='_self' class='link_tab_14_bk'>"+ app.title +"</a>";
					}
				}
			}
		</script>

<script type="text/javascript">
	dojo.addOnLoad(function(){
		dojo.require("unieap.rpc");
		if(unieap.cache.isAvailable()){
			unieap.WEB_APP_NAME = "<%=path%>";
			unieap.Action.loadCacheData("check"); //检查更新
		}
	});
</script>
</head>
<body class="body_bg" onload="createApp()">
<div id="showAppArea"
	style="padding-top: 15%; margin-left: auto; margin-right: auto; width: 545px;">
<div class="login_bg_head"></div>
<div class="login_bg_center" style="padding-bottom: 50px;">
<div>
<div
	style="text-align: left; padding-left: 50px; padding-bottom: 20px; padding-top: 20px;">
<img
	src="<%=path%>/platform/core/applications/css/images/UniEAP_logo.png"
	width="184" height="58" /></div>
<div class="app_table" style="margin-left: 50px; margin-right: 50px;">
<table style="width: 90%;" border="0" cellpadding="0" cellspacing="0">
	<tbody id="apptb"></tbody>
</table>
</div>
</div>
</div>
<div class="login_bg_bottom"></div>
</div>
</body>
</html>
