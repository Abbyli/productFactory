
<%--
	
    @author zhyu.neu
    @creationTime 2014-07-22 16:16:20
    @modificationTime 2014-07-23 17:22:29
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/authority/role/selectTest-processor.js?version=20140723172229"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/authority/role/selectTest-view.js?version=20140723172229"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				selectTest.page_initEvents&&dojo.hitch(selectTest,selectTest.page_initEvents)();
				selectTest.page_load&&dojo.hitch(selectTest,selectTest.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.tree.Tree' height='429px' id='tree1' width='402px' binding="{id:'id',label:'name',parent:'delFlag',query:{name:'delFlag',relation:'=',value:'n'},rootNodeId:''n'',store:'sysSecRole'}"></div>
</s:i18n>
    </security:auth>
	</body>
</html>
