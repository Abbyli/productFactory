
<%--
	
    @author Administrator
    @creationTime 2016-10-12 13:40:23
    @modificationTime 2016-12-27 13:43:34
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskProtectInf-processor.js?version=20161227134334"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskProtectInf-view.js?version=20161227134334"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskProtectInf_navigateButton.setViewcContext("pfRiskProtectInf_navigateButton");
pfRiskProtectInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskProtectInf_navigateButton,pfRiskProtectInf_navigateButton.page_initEvents)();
pfRiskProtectInf_navigateButton.page_load&&dojo.hitch(pfRiskProtectInf_navigateButton,pfRiskProtectInf_navigateButton.page_load)();
pfRiskProtectInf.page_initEvents&&dojo.hitch(pfRiskProtectInf,pfRiskProtectInf.page_initEvents)();
				pfRiskProtectInf.page_load&&dojo.hitch(pfRiskProtectInf,pfRiskProtectInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskProtectInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane3'>
                <div dojoType='unieap.form.Form' id='form1' binding="{store:'tPricingLiabDef_form'}">
                    <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form1_1_tr'>
                                <td id='pricingLiabCode_label_td' rowSpan='1'>
                                    <label id='pricingLiabCode_label'>定价责任代码</label>
                                </td>
                                <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='pricingLiabId' maxLength='32' width='100%' binding="{name:'pricingLiabId'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}"></div>
                                </td>
                                <td id='pricingLiabName_label_td' rowSpan='1'>
                                    <label id='pricingLiabName_label'>定价责任名称</label>
                                </td>
                                <td colSpan='1' id='pricingLiabName_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='pricingLiabName' maxLength='120' readOnly='true' width='100%' binding="{name:'pricingLiabName'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='40%' id='titlePane1' width='100%'>
                <div dojoType='unieap.grid.Grid' height='100%' id='grid1' binding="{store:'tClaimGivepayDef_grid'}" detail="{getMasterDetail:pfRiskProtectInf.grid1_detail_getMasterDetail}" rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{enableTooltip:true,rowBar:false,rowNumber:true}">
                    <header>
                        <row>
                            <cell dataType='number' enable='false' id='cell_protecLiabId' label='保障责任名称' name='protecLiabId' width='10%' decoder="{displayAttr:'protecLiabName',store:'protec',valueAttr:'protecLiabId'}"></cell>
                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='保障责任代码' name='protecLiabCode' width='10%'></cell>
                            <cell dataType='string' enable='false' id='cell_claimGivepayName' label='理赔给付名称' name='claimGivepayName' width='10%'></cell>
                            <cell dataType='string' enable='false' id='cell_claimClaimPayType' label='理赔类型' name='claimClaimPayType' width='10%' decoder="{store:'ds_payType'}"></cell>
                            <cell dataType='string' enable='false' id='cell_claimSubtype' label='交通方式' name='claimSubtype' width='10%' decoder="{store:'ds_vechicle'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accidOccurReason' label='出险原因' name='accidOccurReason' width='10%' decoder="{store:'ds_reson'}"></cell>
                            <cell dataType='string' enable='false' id='cell_liabExempProcessActionAlgo' label='免责处理动作' name='liabExempProcessActionAlgo' width='10%' decoder="{store:'ds_action'}"></cell>
                            <cell dataType='number' enable='false' id='cell_waitPeriodDays' label='等待期天数' name='waitPeriodDays' width='10%'></cell>
                            <cell enable='false' id='cell_gievpayprocess' label='给付后动作' name='gievpayprocess' width='20%' formatter='pfRiskProtectInf.cell_gievpayprocess_formatter' decoder="{store:'ds_actionType'}"></cell>
                        </row>
                    </header>
                </div>
            </div>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='40%' id='titlePane2' width='100%'>
                <div dojoType='unieap.grid.Grid' height='100%' id='grid2' binding="{store:'tSurvvGivepayDef_grid'}" detail="{getMasterDetail:pfRiskProtectInf.grid2_detail_getMasterDetail}" rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <header>
                        <row>
                            <cell dataType='number' enable='false' id='cell_protecLiabId' label='保障责任名称' name='protecLiabId' width='20%' decoder="{displayAttr:'protecLiabName',store:'protec',valueAttr:'protecLiabId'}"></cell>
                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='保障责任代码' name='protecLiabCode' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_survvGivepayName' label='生存给付名称' name='survvGivepayName' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_survvGivepayType' label='生存给付类型' name='survvGivepayType' width='15%' decoder="{store:'ds_survvtype'}"></cell>
                            <cell dataType='number' enable='false' id='cell_givepayIntv' label='给付间隔' name='givepayIntv' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_givepayIntvUnit' label='给付间隔单位' name='givepayIntvUnit' width='15%' formatter='pfRiskProtectInf.cell_givepayIntvUnit_formatter'></cell>
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
