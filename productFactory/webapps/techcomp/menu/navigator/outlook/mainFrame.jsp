<%@ page contentType="text/html; charset=UTF-8" %>
<%
String webPath=request.getContextPath();
String appName=request.getParameter("appname");
String apppath=webPath+"/"+appName;
%>
<html>
<head>
<title>UniEAP V4</title>
</head>
<frameset rows="68,*" cols="*"  scrolling="no" frameBorder="0" frameSpacing="0" noresize="true" >
  <frame name="rootMenu" scrolling="NO" noresize src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/rootMenu.jsp?appname=<%=appName%>" id="rootMenu"/>
  <frameset name="child" rows="*" cols="200,*" frameborder="0" border="0" framespacing="0" id="child">
    <frame name="childMenu" frameBorder="0" noresize="true" scrolling="no" src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/childMenu.jsp?appname=<%=appName%>" id="childMenu"/>
    <frame name="pageArea" frameBorder="0" noresize="true" scrolling="no" id="pageArea"  src="<%=webPath%>/<%=appName%>/menu/navigator/outlook/page.jsp?appname=<%=appName%>"/>
  </frameset>
<noframes>
  <body>
</noframes>
</frameset>

</html>