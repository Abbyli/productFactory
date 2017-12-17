
<%--
	
    @author Administrator
    @creationTime 2016-07-28 14:36:23
    @modificationTime 2016-09-20 10:58:03
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAccDetail-processor.js?version=20160920105803"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAccDetail-view.js?version=20160920105803"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestAccDetail_navigateButton.setViewcContext("pfRiskPrestAccDetail_navigateButton");
pfRiskPrestAccDetail_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrestAccDetail_navigateButton,pfRiskPrestAccDetail_navigateButton.page_initEvents)();
pfRiskPrestAccDetail_navigateButton.page_load&&dojo.hitch(pfRiskPrestAccDetail_navigateButton,pfRiskPrestAccDetail_navigateButton.page_load)();
pfRiskPrestAccDetail.page_initEvents&&dojo.hitch(pfRiskPrestAccDetail,pfRiskPrestAccDetail.page_initEvents)();
				pfRiskPrestAccDetail.page_load&&dojo.hitch(pfRiskPrestAccDetail,pfRiskPrestAccDetail.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrestAccDetail" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='理赔给付信息'>
                        <div dojoType='unieap.form.Form' id='form_claim' binding="{store:'tClaimGivepayDef_accDetail_form'}">
                            <table id='form_claim_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_claim_1_tr'>
                                        <td align='right' id='claimGivepayCode_label_td' rowSpan='1'>
                                            <label id='claimGivepayCode_label'>理赔给付代码：</label>
                                        </td>
                                        <td colSpan='1' id='claimGivepayCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='claimGivepayCode' maxLength='30' readOnly='true' width='100%' binding="{name:'claimGivepayCode'}"></div>
                                        </td>
                                        <td align='right' id='claimGivepayName_label_td' rowSpan='1'>
                                            <label id='claimGivepayName_label'>理赔给付名称：</label>
                                        </td>
                                        <td colSpan='1' id='claimGivepayName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='claimGivepayName' maxLength='120' readOnly='true' width='100%' binding="{name:'claimGivepayName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane4'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane4' title='查询条件'>
                        <div id='div3' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='form_accDetail_form_queryButton' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form_accDetail_form' binding="{store:'tClaimPayItemDetail_accDetail_form'}">
                            <table id='form_accDetail_form_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_accDetail_form_1_tr'>
                                        <td align='right' id='claimPayItemCode_label_td' rowSpan='1'>
                                            <label id='claimPayItemCode_label'>医疗费用/疾病代码：</label>
                                        </td>
                                        <td colSpan='1' id='claimPayItemCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='claimPayItemCode' maxLength='10' width='100%' binding="{name:'claimPayItemCode'}"></div>
                                        </td>
                                        <td align='right' id='claimPayItemName_label_td' rowSpan='1'>
                                            <label id='claimPayItemName_label'>医疗费用/疾病名称：</label>
                                        </td>
                                        <td colSpan='1' id='claimPayItemName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='claimPayItemName' maxLength='100' width='100%' binding="{name:'claimPayItemName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='67%' autoHeight='true' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='账户费用明细' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btndefault' label='默认值' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btnAdd' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_addDetail' binding="{store:'tClaimPayItemDetail_accdetail_grid',rpc:pfRiskPrestAccDetail.grid_addDetail_binding_rpc}" selection="{selectType:'single',onAfterSelect:pfRiskPrestAccDetail.grid_addDetail_selection_onAfterSelect}"
                        views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_claimPayItemCode' label='医疗费用/疾病代码' name='claimPayItemCode' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_claimPayItemName' label='医疗费用/疾病名称' name='claimPayItemName' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_claimPayCalcWay' label='费用计算方式' name='claimPayCalcWay' width='30%' decoder="{store:'ds_type_acc'}"></cell>
                                    <cell enable='false' id='cell_control_accdetail' label='操作' name='control_accdetail' width='10%' formatter='pfRiskPrestAccDetail.cell_control_accdetail_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='33%' autoHeight='true' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='账户明细算法' width='100%'>
                        <div id='div2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addFormula' label='添加算法' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_accdetail_formula' binding="{store:'tObjFormula_accdetail'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='公式描述' name='description' width='45%'></cell>
                                    <cell enable='false' id='cell_control_formula' label='操作' name='control_formula' width='10%' formatter='pfRiskPrestAccDetail.cell_control_formula_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='155px' id='addDialog' title='费用明细新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAccDetailDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='155px' id='updateDialog' title='费用明细修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAccDetailDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='addAlgo' title='算法新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='updateAlgo' title='算法修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
