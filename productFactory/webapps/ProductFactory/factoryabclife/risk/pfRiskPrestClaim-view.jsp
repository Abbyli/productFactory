
<%--
	理赔给付
    @author neusoft
    @creationTime 2016-07-08 11:42:13
    @modificationTime 2017-02-15 10:32:48
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestClaim-processor.js?version=20170215103248"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestClaim-view.js?version=20170215103248"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestClaim_navigateButton.setViewcContext("pfRiskPrestClaim_navigateButton");
pfRiskPrestClaim_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrestClaim_navigateButton,pfRiskPrestClaim_navigateButton.page_initEvents)();
pfRiskPrestClaim_navigateButton.page_load&&dojo.hitch(pfRiskPrestClaim_navigateButton,pfRiskPrestClaim_navigateButton.page_load)();
pfRiskPrestClaim.page_initEvents&&dojo.hitch(pfRiskPrestClaim,pfRiskPrestClaim.page_initEvents)();
				pfRiskPrestClaim.page_load&&dojo.hitch(pfRiskPrestClaim,pfRiskPrestClaim.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrestClaim" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane_claim' title='保障责任信息'>
                        <div dojoType='unieap.form.Form' id='form_Claim' binding="{store:'tProtecLiabDef_Claim'}">
                            <table id='form_Claim_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_Claim_1_tr'>
                                        <td align='right' id='protecLiabCode__Claim_label_td' rowSpan='1'>
                                            <label id='protecLiabCode__Claim_label'>保障责任代码：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabCode__Claim_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' disabled='true' id='protecLiabCode__Claim' maxLength='10' width='100%' binding="{name:'protecLiabCode'}"></div>
                                        </td>
                                        <td align='right' id='protecLiabName__Claim_label_td' rowSpan='1'>
                                            <label id='protecLiabName__Claim_label'>保障责任名称：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabName__Claim_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' disabled='true' id='protecLiabName__Claim' maxLength='120' width='100%' binding="{name:'protecLiabName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='50%' autoHeight='true' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_Claim' title='理赔给付信息' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button_addPrestClaim' label='新&nbsp增' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='element' label='要素定义' width='100px' style='display:none'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_Claim' binding="{store:'tClaimGivepayDef_ClaimAdd'}" selection="{selectType:'single',onAfterSelect:pfRiskPrestClaim.grid_Claim_selection_onAfterSelect}" views="{rowBar:true,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_claimGivepayCode__Claim' label='理赔给付代码' name='claimGivepayCode' width='22%'></cell>
                                    <cell dataType='string' enable='false' id='cell_claimGivepayName__Claim' label='理赔给付名称' name='claimGivepayName' width='23%'></cell>
                                    <cell dataType='string' enable='false' id='cell_claimClaimPayType__Claim' label='赔付类型' name='claimClaimPayType' width='22%' decoder="{store:'ds_payType'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_accidOccurReason__Claim' label='出险原因' name='accidOccurReason' width='23%' decoder="{store:'ds_reson'}"></cell>
                                    <cell enable='false' id='cell_name1__Claim' label='操作' name='name1' width='10%' formatter='pfRiskPrestClaim.cell_name1__Claim_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='50%' autoHeight='true' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='理赔算法' width='100%'>
                        <div id='div2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addformula' label='添加算法' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_claim_formula' binding="{store:'tObjFormula_claim_grid'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='公式描述' name='description' width='45%'></cell>
                                    <cell enable='false' id='cell_control_claimformula' label='操作' name='control_claimformula' width='10%' formatter='pfRiskPrestClaim.cell_control_claimformula_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='210px' id='xdialog_ClaimAdd' title='理赔添加' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestClaimDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='210px' id='xdialog_ClaimUpd' title='理赔修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestClaimDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='addAlgo' title='新增算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='updateAlgo' title='修改算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
