
<%--
	账户定义
    @author shichl
    @creationTime 2016-06-23 10:56:31
    @modificationTime 2016-12-22 09:55:22
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAccInf-processor.js?version=20161222095522"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAccInf-view.js?version=20161222095522"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAccInf_navigateButton.setViewcContext("pfRiskAccInf_navigateButton");
pfRiskAccInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskAccInf_navigateButton,pfRiskAccInf_navigateButton.page_initEvents)();
pfRiskAccInf_navigateButton.page_load&&dojo.hitch(pfRiskAccInf_navigateButton,pfRiskAccInf_navigateButton.page_load)();
pfRiskAccInf.page_initEvents&&dojo.hitch(pfRiskAccInf,pfRiskAccInf.page_initEvents)();
				pfRiskAccInf.page_load&&dojo.hitch(pfRiskAccInf,pfRiskAccInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskAccInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_grid' title='账户信息' width='100%'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insurtypeaccdef' binding="{store:'tInsurtypeAccDef_grid',rpc:pfRiskAccInf.grid_insurtypeaccdef_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_insurtypeAccCode' label='险种账户代码' name='insurtypeAccCode' width='13%'></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeAccName' label='险种账户名称' name='insurtypeAccName' width='13%'></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeAccType' label='账户类型' name='insurtypeAccType' width='13%' decoder="{store:'ds_type_ac'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accrualType' label='计息类型' name='accrualType' width='13%' decoder="{store:'ds_accrula_type'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accrualMethod' label='计息方法 ' name='accrualMethod' width='13%' decoder="{store:'ds_accrula_method'}"></cell>
                            <cell dataType='string' enable='false' id='cell_settleTimepoint' label='结算时点' name='settleTimepoint' width='13%' decoder="{store:'ds_settle_timepoint'}"></cell>
                            <cell dataType='string' enable='false' id='cell_settleCyc' label='结算周期' name='settleCyc' width='9%'></cell>
                            <cell dataType='string' enable='false' id='cell_settleType' label='结算类型' name='settleType' width='13%' decoder="{store:'ds_settle_type'}"></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
