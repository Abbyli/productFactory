
<%--
	
    @author user
    @creationTime 2014-09-10 15:09:30
    @modificationTime 2014-09-10 15:19:53
    @version 1.0.0 
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://unieap.neusoft.com/techcomp/ria" prefix="unieap" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title></title>
		<script type="text/javascript">
		    if(!window.beginTime){
		        beginTime = new Date().getTime();
		    }
		</script>	    		
	   	<%@ include file="/techcomp/ria/base/base.jsp" %>
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/menu/tabPane-processor.js?version=20140910151953"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/menu/tabPane-view.js?version=20140910151953"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				tabPane.page_initEvents&&dojo.hitch(tabPane,tabPane.page_initEvents)();
				tabPane.page_load&&dojo.hitch(tabPane,tabPane.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.TabContainer' id='tabContainer1'>
        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='tabPane'>
            <div dojoType='unieap.form.Button' id='button1' label='Button'></div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='zhyu'>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
