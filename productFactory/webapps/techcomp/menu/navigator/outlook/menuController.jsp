<%@ page contentType="text/html; charset=UTF-8" %>

<%
  String location=request.getParameter("location");
  //如果是相对路径
  if (!location.startsWith("/") || !(location.trim().indexOf("http")==0) ){
  	 location = request.getContextPath().concat(location);
  }
  
  response.sendRedirect(location);
  return;
%>