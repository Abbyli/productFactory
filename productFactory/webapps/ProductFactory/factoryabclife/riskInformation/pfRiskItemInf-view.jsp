
<%--
	保全项定义
    @author zhy
    @creationTime 2016-08-11 16:36:39
    @modificationTime 2016-10-14 11:14:51
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskItemInf-processor.js?version=20161014111451"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskItemInf-view.js?version=20161014111451"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskItemInf_navigateButton.setViewcContext("pfRiskItemInf_navigateButton");
pfRiskItemInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskItemInf_navigateButton,pfRiskItemInf_navigateButton.page_initEvents)();
pfRiskItemInf_navigateButton.page_load&&dojo.hitch(pfRiskItemInf_navigateButton,pfRiskItemInf_navigateButton.page_load)();
pfRiskItemInf.page_initEvents&&dojo.hitch(pfRiskItemInf,pfRiskItemInf.page_initEvents)();
				pfRiskItemInf.page_load&&dojo.hitch(pfRiskItemInf,pfRiskItemInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskItemInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='保全项定义'>
                <div dojoType='unieap.form.CheckBoxGroup' disabled='true' id='checkBoxGroup1' labelAlign='right' width='100%' decoder="{displayAttr:'psItemName',valueAttr:'psItemId'}"></div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
