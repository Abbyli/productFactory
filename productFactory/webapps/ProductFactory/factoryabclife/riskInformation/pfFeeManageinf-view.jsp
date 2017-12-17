
<%--
	费用管理
    @author Administrator
    @creationTime 2016-07-06 09:25:24
    @modificationTime 2016-11-03 17:17:34
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfFeeManageinf-processor.js?version=20161103171734"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfFeeManageinf-view.js?version=20161103171734"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfFeeManageinf_navigateButton.setViewcContext("pfFeeManageinf_navigateButton");
pfFeeManageinf_navigateButton.page_initEvents&&dojo.hitch(pfFeeManageinf_navigateButton,pfFeeManageinf_navigateButton.page_initEvents)();
pfFeeManageinf_navigateButton.page_load&&dojo.hitch(pfFeeManageinf_navigateButton,pfFeeManageinf_navigateButton.page_load)();
pfFeeManageinf.page_initEvents&&dojo.hitch(pfFeeManageinf,pfFeeManageinf.page_initEvents)();
				pfFeeManageinf.page_load&&dojo.hitch(pfFeeManageinf,pfFeeManageinf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfFeeManageinf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2' width='100%'>
                    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='首续期扣费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane2' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef1' binding="{store:'tInsurtypeFeeDef_form1'}">
                                    <table id='form_feeDef1_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef1_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label1'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode1' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为:险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='isCorrelToAcc_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label1'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='isCorrelToAcc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId1' maxLength='16' readOnly='true' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr id='form_feeDef1_2_tr'>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane3' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate1' binding="{store:'tFeeRate_grid1'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='15%'></cell>
                                            <cell dataType='string' enable='false' id='cell_pricingLiabCode' label='责任代码' name='pricingLiabCode' width='15%' decoder="{displayAttr:'pricingLiabCode',store:'ds_pricingLiab',valueAttr:'pricingLiabCode'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_paymentFre' label='缴费频率' name='paymentFre' width='15%' decoder="{store:'ds_freq'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_beginYear' label='起始年度' name='beginYear' width='10%'></cell>
                                            <cell dataType='number' enable='false' id='cell_endYear' label='终止年度' name='endYear' width='10%'></cell>
                                            <cell dataType='number' enable='false' id='cell_minAmount' label='最低金额' name='minAmount' width='10%'></cell>
                                            <cell dataType='number' enable='false' id='cell_maxAmount' label='最高金额' name='maxAmount' width='10%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='扣费比例' name='rate' width='15%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='追加扣费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane4' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef2' binding="{store:'tInsurtypeFeeDef_form2'}">
                                    <table id='form_feeDef2_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef2_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label2'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode2' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label2'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId2' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane5' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate2' binding="{store:'tFeeRate_grid2'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='20%'></cell>
                                            <cell dataType='string' enable='false' id='cell_pricingLiabCode' label='责任代码' name='pricingLiabCode' width='20%' decoder="{displayAttr:'pricingLiabCode',store:'ds_pricingLiab',valueAttr:'pricingLiabCode'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_minAmount' label='最低金额' name='minAmount' width='20%'></cell>
                                            <cell dataType='number' enable='false' id='cell_maxAmount' label='最高金额' name='maxAmount' width='20%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='扣费比例' name='rate' width='20%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='保单管理费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane6' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef3' binding="{store:'tInsurtypeFeeDef_form3'}">
                                    <table id='form_feeDef3_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef3_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label3'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode3' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label3'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId3' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr id='form_feeDef3_2_tr'>
                                                <td align='right' id='feeOccurCyc_label_td' rowSpan='1'>
                                                    <label id='feeOccurCyc_label3'>费用周期：</label>
                                                </td>
                                                <td colSpan='1' id='feeOccurCyc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeOccurCyc3' maxLength='2' width='100%' binding="{name:'feeOccurCyc'}" dataProvider="{store:'ds_feeOccurCyc'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane7' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate3' binding="{store:'tFeeRate_grid3'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='20%'></cell>
                                            <cell dataType='number' enable='false' id='cell_beginYear' label='起始年度' name='beginYear' width='15%'></cell>
                                            <cell dataType='number' enable='false' id='cell_endYear' label='终止年度' name='endYear' width='15%'></cell>
                                            <cell dataType='number' enable='false' id='cell_minAmount' label='最低金额' name='minAmount' width='15%'></cell>
                                            <cell dataType='number' enable='false' id='cell_maxAmount' label='最高金额' name='maxAmount' width='15%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='保单管理费' name='rate' width='20%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane4' title='持续奖励'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane8' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef4' binding="{store:'tInsurtypeFeeDef_form4'}">
                                    <table id='form_feeDef4_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef4_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label4'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode4' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label4'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId4' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr id='form_feeDef4_2_tr'>
                                                <td align='right' id='feeOccurCyc_label_td' rowSpan='1'>
                                                    <label id='feeOccurCyc_label4'>奖励周期：</label>
                                                </td>
                                                <td colSpan='1' id='feeOccurCyc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeOccurCyc4' maxLength='2' width='100%' binding="{name:'feeOccurCyc'}" dataProvider="{store:'ds_feeOccurCyc'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane9' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate4' binding="{store:'tFeeRate_grid4'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_beginYear' label='起始年度' name='beginYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_endYear' label='终止年度' name='endYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='奖励比例' name='rate' width='25%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane5' title='部分领取'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane10' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef5' binding="{store:'tInsurtypeFeeDef_form5'}">
                                    <table id='form_feeDef5_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef5_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label5'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode5' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label5'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId5' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane11' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate5' binding="{store:'tFeeRate_gird5'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_beginYear' label='起始年度' name='beginYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_endYear' label='终止年度' name='endYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='费用比例' name='rate' width='25%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane6' title='退保'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane12' width='100%'>
                                <div dojoType='unieap.form.Form' id='form_feeDef6' binding="{store:'tInsurtypeFeeDef_form6'}">
                                    <table id='form_feeDef6_tableLayout' width='100%' style='table-layout:fixed;'>
                                        <colgroup>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='15%'></col>
                                            <col width='30%'></col>
                                            <col width='10%'></col>
                                        </colgroup>
                                        <tbody>
                                            <tr id='form_feeDef6_1_tr'>
                                                <td align='right' id='feeCode_label_td' rowSpan='1'>
                                                    <label id='feeCode_label6'>费用代码：</label>
                                                </td>
                                                <td colSpan='1' id='feeCode_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.TextBox' id='feeCode6' maxLength='10' readOnly='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label6'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='feeCalcFormulaId6' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane13' title='费率信息' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate6' binding="{store:'tFeeRate_grid6'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_beginYear' label='起始年度' name='beginYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_endYear' label='终止年度' name='endYear' width='25%'></cell>
                                            <cell dataType='number' enable='false' id='cell_rate' label='费用比例' name='rate' width='25%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
