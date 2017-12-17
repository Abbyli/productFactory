
<%--
	费用管理
    @author Administrator
    @creationTime 2016-07-06 09:25:24
    @modificationTime 2017-02-22 15:37:32
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfFeeManage-processor.js?version=20170222153732"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfFeeManage-view.js?version=20170222153732"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfFeeManage_navigateButton.setViewcContext("pfFeeManage_navigateButton");
pfFeeManage_navigateButton.page_initEvents&&dojo.hitch(pfFeeManage_navigateButton,pfFeeManage_navigateButton.page_initEvents)();
pfFeeManage_navigateButton.page_load&&dojo.hitch(pfFeeManage_navigateButton,pfFeeManage_navigateButton.page_load)();
pfFeeManage.page_initEvents&&dojo.hitch(pfFeeManage,pfFeeManage.page_initEvents)();
				pfFeeManage.page_load&&dojo.hitch(pfFeeManage,pfFeeManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfFeeManage" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_form'}">
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
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2' width='100%'>
                    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='首续期扣费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane2' width='100%'>
                                <div id='div1' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save1' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear1' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode1' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为:险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='isCorrelToAcc_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label1'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='isCorrelToAcc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId1' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
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
                                <div id='div2' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add1' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate1' binding="{store:'tFeeRate_grid1'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='15%'></cell>
                                            <cell dataType='string' enable='true' id='cell_pricingLiabCode' label='责任代码' name='pricingLiabCode' width='15%' decoder="{displayAttr:'pricingLiabName',store:'ds_pricingLiab',valueAttr:'pricingLiabCode'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_pricingLiabCode_comboBox',required:true,trim:true, dataProvider:{store:'ds_pricingLiab'}, popup:{height:'auto'}, decoder:{displayAttr:'pricingLiabName',valueAttr:'pricingLiabCode'}}}"></cell>
                                            <cell dataType='string' enable='true' id='cell_paymentFre' label='缴费频率' name='payIntv' width='10%' decoder="{store:'ds_freq'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_paymentFre_comboBox',required:true, dataProvider:{store:'ds_freq'}, popup:{height:'auto'}, binding:{name:'payIntv'}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_beginYear' label='起始年度' name='beginYear' width='10%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_beginYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_endYear' label='终止年度' name='endYear' width='10%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_endYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_minAmount' label='最低金额' name='minAmount' width='10%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_minAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_maxAmount' label='最高金额' name='maxAmount' width='10%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_maxAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='扣费比例' name='rate' width='10%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee1' label='操作' name='control_fee1' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee1_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='追加扣费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane4' width='100%'>
                                <div id='div3' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save2' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear2' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode2' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label2'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId2' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane5' title='费率信息' width='100%'>
                                <div id='div4' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add2' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate2' binding="{store:'tFeeRate_grid2'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='15%'></cell>
                                            <cell dataType='string' enable='true' id='cell_pricingLiabCode' label='责任代码' name='pricingLiabCode' width='15%' decoder="{displayAttr:'pricingLiabCode',store:'ds_pricingLiab',valueAttr:'pricingLiabCode'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_pricingLiabCode_comboBox',required:true, dataProvider:{store:'ds_pricingLiab'}, popup:{height:'auto'}, decoder:{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabCode'}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_minAmount' label='最低金额' name='minAmount' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_minAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_maxAmount' label='最高金额' name='maxAmount' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_maxAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='扣费比例' name='rate' width='20%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee2' label='操作' name='control_fee2' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee2_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='保单管理费'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane6' width='100%'>
                                <div id='div5' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save3' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear3' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode3' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label3'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId3' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr id='form_feeDef3_2_tr'>
                                                <td align='right' id='feeOccurCyc_label_td' rowSpan='1'>
                                                    <label id='feeOccurCyc_label3'>费用周期：</label>
                                                </td>
                                                <td colSpan='1' id='feeOccurCyc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeOccurCyc3' maxLength='2' width='100%' binding="{name:'feeOccurCyc'}" dataProvider="{store:'ds_feeOccurCyc'}"></div>
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
                                <div id='div6' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add3' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate3' binding="{store:'tFeeRate_grid3'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='15%'></cell>
                                            <cell dataType='number' enable='true' id='cell_beginYear' label='起始年度' name='beginYear' width='15%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_beginYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_endYear' label='终止年度' name='endYear' width='15%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_endYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_minAmount' label='最低金额' name='minAmount' width='15%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_minAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_maxAmount' label='最高金额' name='maxAmount' width='15%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_maxAmount_textBox', validator:{errorMsg:'非法参数',regExp:/^\d+$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='保单管理费' name='rate' width='15%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee3' label='操作' name='control_fee3' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee3_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane4' title='持续奖励'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane8' width='100%'>
                                <div id='div7' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save4' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear4' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode4' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label4'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId4' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr id='form_feeDef4_2_tr'>
                                                <td align='right' id='feeOccurCyc_label_td' rowSpan='1'>
                                                    <label id='feeOccurCyc_label4'>奖励周期：</label>
                                                </td>
                                                <td colSpan='1' id='feeOccurCyc_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeOccurCyc4' maxLength='2' width='100%' binding="{name:'feeOccurCyc'}" dataProvider="{store:'ds_feeOccurCyc'}"></div>
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
                                <div id='div8' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add4' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate4' binding="{store:'tFeeRate_grid4'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='true' id='cell_beginYear' label='起始年度' name='beginYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_beginYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_endYear' label='终止年度' name='endYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_endYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='奖励比例' name='rate' width='25%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee4' label='操作' name='control_fee4' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee4_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane5' title='部分领取'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane10' width='100%'>
                                <div id='div9' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save5' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear5' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode5' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label5'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId5' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane11' title='费率信息' width='100%'>
                                <div id='div10' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add5' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate5' binding="{store:'tFeeRate_gird5'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='true' id='cell_beginYear' label='起始年度' name='beginYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_beginYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_endYear' label='终止年度' name='endYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_endYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='费用比例' name='rate' width='25%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee5' label='操作' name='control_fee5' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee5_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane6' title='退保'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='28%' id='titlePane12' width='100%'>
                                <div id='div11' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save6' label='保&nbsp存' width='100px'></div>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='clear6' label='清&nbsp空' width='100px'></div>
                                </div>
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
                                                    <div dojoType='unieap.form.TextBox' id='feeCode6' maxLength='10' required='true' width='100%' binding="{name:'feeCode'}" validator="{errorMsg:'格式为：险种代码+9+X 如：101091',realTime:true,regExp:/^[0-9]{4}[9][1-9]$/}"></div>
                                                </td>
                                                <td align='right' id='feeCalcFormulaId_label_td' rowSpan='1'>
                                                    <label id='feeCalcFormulaId_label6'>计算公式：</label>
                                                </td>
                                                <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                                                    <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId6' maxLength='16' width='100%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='72%' id='titlePane13' title='费率信息' width='100%'>
                                <div id='div12' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add6' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_feeRate6' binding="{store:'tFeeRate_grid6'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='25%'></cell>
                                            <cell dataType='number' enable='true' id='cell_beginYear' label='起始年度' name='beginYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_beginYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_endYear' label='终止年度' name='endYear' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_endYear_textBox', validator:{errorMsg:'非法参数',regExp:/^\d{0,2}$/}}}"></cell>
                                            <cell dataType='number' enable='true' id='cell_rate' label='费用比例' name='rate' width='25%' editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{id:'cell_rate_numberTextBox',required:true, validator:{errorMsg:'非法参数',regExp:/^\d{0,3}(\.\d{0,4}){0,1}$/}}}"></cell>
                                            <cell enable='false' id='cell_control_fee6' label='操作' name='control_fee6' styles='text-align:center' width='10%' formatter='pfFeeManage.cell_control_fee6_formatter'></cell>
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
