<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"  %>
<%@ page import="java.util.*,org.apache.struts2.ServletActionContext" %>
<%@ page import="com.opensymphony.xwork2.ActionContext" %>
<%@ page import="com.neusoft.unieap.core.exception.UniEAPExceptionHolder"%>
<%@ page import="com.neusoft.unieap.core.i18n.GlobalService" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <%
    String localeStr = GlobalService.getUserI18nContext().getLocale().toString();
   	UniEAPExceptionHolder uniEAPExceptionHolder = (UniEAPExceptionHolder)ActionContext.getContext()
   						.getValueStack().peek();
    String stackInfo = uniEAPExceptionHolder.getHtmlExceptionStack();
    boolean showStack = false;
    if(stackInfo != null && !stackInfo.trim().equals(""))
    {
    	showStack = true;
    }
%>
<s:i18n name="com.neusoft.unieap.core.exception.package">
  <head>
    <title><s:text name="unieap.techcomp.core.exception.title.pageTitle"/></title>
     <link href="<%=request.getContextPath()%>/platform/core/exception/css/exception.css" rel="stylesheet"></link>    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<script type="text/javascript" src="<%=request.getContextPath()%>/platform/core/exception/nls/application_<%=localeStr %>.js">
	</script>
	<script type="text/javascript">
     var flag = 1;
     function displayExceptionStack()
     {
         if(flag == 1)
         {
        	 document.all.btn.value = TECHCOMP_CORE_EXCEPTION_I18N.displayStackInfo;
        	 document.all.exceptionStack.style.display  = "none";
        	 flag = 0;
         }
         else
         {
        	 document.all.btn.value = TECHCOMP_CORE_EXCEPTION_I18N.closeStackInfo;
        	 document.all.exceptionStack.style.display  = "block";
        	 flag = 1;
         }
     }
	</script>
  </head>
  <body class="body_bg">
      <div>
      <table>
       <tr>
       <td>
      	<h2 class="title"><s:text name="unieap.techcomp.core.exception.title.pageTitle"/></h2>
      </td>
      </tr>
      </table>
      </div>
      <div class="message_div">
      <table>
        <tr style="background-color">
          <td><label><s:text name="unieap.techcomp.core.exception.label.message"/></label><s:property value="exceptionMessage"/></td>
        </tr>
        <% 
          if(showStack)
          {
        %>
        <br>
        <tr>
          <td><label><s:text name="unieap.techcomp.core.exception.label.stack"/></label></td><td id="titleText"><input type="button"  id="btn" onclick="displayExceptionStack()" value='<s:text name="unieap.techcomp.core.exception.button.closeStackInfo"/>'></input></td>
        </tr>
      </table>
      </div>
       <div align="left" class="stack_div" id="exceptionStack"><s:property value="htmlExceptionStack" escape="false"/></div>
       <%
        }
        else
        {	
       %>
         </table>
         </div>
        <%
        }
        %>
  </body> 
</s:i18n>        
</html>