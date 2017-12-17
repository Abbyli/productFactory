
<%--
	
    @author Administrator
    @creationTime 2016-07-19 15:39:06
    @modificationTime 2016-09-28 15:14:47
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAmnt-processor.js?version=20160928151447"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAmnt-view.js?version=20160928151447"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAmnt_navigateButton.setViewcContext("pfRiskAmnt_navigateButton");
pfRiskAmnt_navigateButton.page_initEvents&&dojo.hitch(pfRiskAmnt_navigateButton,pfRiskAmnt_navigateButton.page_initEvents)();
pfRiskAmnt_navigateButton.page_load&&dojo.hitch(pfRiskAmnt_navigateButton,pfRiskAmnt_navigateButton.page_load)();
pfRiskAmnt.page_initEvents&&dojo.hitch(pfRiskAmnt,pfRiskAmnt.page_initEvents)();
				pfRiskAmnt.page_load&&dojo.hitch(pfRiskAmnt,pfRiskAmnt.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskAmnt" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_amnt_form'}">
                            <table id='form_insurtypebasicinf_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_insurtypebasicinf_1_tr'>
                                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                            <label id='insurtypeCode_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                                            <label id='insurtypeName_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeName' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_insurtypebasicinf_3_tr'>
                                        <td align='right' id='verNo_label_td' rowSpan='1'>
                                            <label id='verNo_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='verNo' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='风险保额定义'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addRiskAmnt' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form_pricingLiabDef' binding="{store:'tPricingLiabDef_amnt_form'}">
                            <table id='form_pricingLiabDef_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_pricingLiabDef_1_tr'>
                                        <td align='right' id='pricingLiabCode_label_td' rowSpan='1'>
                                            <label id='pricingLiabCode_label'>定价代码：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='pricingLiabCode' maxLength='32' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}"></div>
                                        </td>
                                        <td align='right' id='pricingLiabName_label_td' rowSpan='1'>
                                            <label id='pricingLiabName_label'>定价名称：</label>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='风险保额列表' width='100%'>
                        <div id='div2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='editFormula' label='编辑算法' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_objFormula' binding="{store:'tObjFormula_amnt_grid',rpc:pfRiskAmnt.grid_objFormula_binding_rpc}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_type' label='风险类型' name='type' width='20%' decoder="{displayAttr:'riskamntName',store:'ds_result',valueAttr:'riskamntType'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='50%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='风险保额算法' name='description' width='20%'></cell>
                                    <cell enable='false' id='cell_control_amnt' label='操作' name='control_amnt' styles='text-align:center' width='10%' formatter='pfRiskAmnt.cell_control_amnt_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='addDialog' title='风险保额新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskAmntDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='editformulaDialog' title='风险保额算法编辑' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
