
<%--
	
    @author Administrator
    @creationTime 2016-10-11 15:59:07
    @modificationTime 2016-12-27 09:59:32
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskPricingInf-processor.js?version=20161227095932"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskPricingInf-view.js?version=20161227095932"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPricingInf_navigateButton.setViewcContext("pfRiskPricingInf_navigateButton");
pfRiskPricingInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskPricingInf_navigateButton,pfRiskPricingInf_navigateButton.page_initEvents)();
pfRiskPricingInf_navigateButton.page_load&&dojo.hitch(pfRiskPricingInf_navigateButton,pfRiskPricingInf_navigateButton.page_load)();
pfRiskPricingInf.page_initEvents&&dojo.hitch(pfRiskPricingInf,pfRiskPricingInf.page_initEvents)();
				pfRiskPricingInf.page_load&&dojo.hitch(pfRiskPricingInf,pfRiskPricingInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPricingInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='定价基本信息' width='100%'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'tPricingLiabDef_pricing_grid'}" selection="{selectType:'none'}" views="{enableTooltip:true,rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_pricingLiabName' label='定价责任名称' name='pricingLiabName' width='11%'></cell>
                            <cell dataType='string' enable='false' id='cell_pricingLiabCode' label='定价责任代码' name='pricingLiabCode' width='11%'></cell>
                            <cell dataType='string' enable='false' id='cell_isOpt' label='可选责任标记' name='isOpt' width='11%' decoder="{store:'ds_choose'}"></cell>
                            <cell dataType='string' enable='false' id='cell_calcDirection' label='计算方向' name='calcDirection' width='11%' decoder="{store:'ds_direct'}"></cell>
                            <cell dataType='number' enable='false' id='cell_suminsurAlgoId' label='保额算法' name='suminsurAlgoId' width='11%' decoder="{displayAttr:'memo',store:'ds_A2',valueAttr:'id'}"></cell>
                            <cell dataType='number' enable='false' id='cell_premAlgoId' label='保费算法' name='premAlgoId' width='11%' decoder="{displayAttr:'memo',store:'ds_A1',valueAttr:'id'}"></cell>
                            <cell enable='false' id='cell_riskPay' label='风险扣费算法' name='riskPay' width='11%' formatter='pfRiskPricingInf.cell_riskPay_formatter'></cell>
                            <cell enable='false' id='cell_jobFee' label='职业加费算法' name='jobFee' width='11%' formatter='pfRiskPricingInf.cell_jobFee_formatter'></cell>
                            <cell enable='false' id='cell_healthFee' label='健康加费算法' name='healthFee' width='12%' formatter='pfRiskPricingInf.cell_healthFee_formatter'></cell>
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
