
<%--
	定价责任弹窗
    @author Administrator
    @creationTime 2016-06-28 14:05:50
    @modificationTime 2017-03-16 14:05:05
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
	   	 
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/btn.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfPriceDutyDialog-processor.js?version=20170316140505"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfPriceDutyDialog-view.js?version=20170316140505"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfPriceDutyDialog.page_initEvents&&dojo.hitch(pfPriceDutyDialog,pfPriceDutyDialog.page_initEvents)();
				pfPriceDutyDialog.page_load&&dojo.hitch(pfPriceDutyDialog,pfPriceDutyDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='liab' binding="{store:'tPricingLiabDef_form'}">
        <table id='liab_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='liab_1_tr'>
                    <td align='right' id='pricingLiabCode_label_td' rowSpan='1'>
                        <label id='pricingLiabCode_label'>定价责任代码：</label>
                    </td>
                    <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='pricingLiabCode' required='true' width='100%' binding="{name:'pricingLiabCode'}" validator="{errorMsg:'格式为：xxxx0x 如100101',regExp:/^[0-9]{4}[0][0-9]$/}"></div>
                    </td>
                    <td align='right' id='pricingLiabName_label_td' rowSpan='1'>
                        <label id='pricingLiabName_label'>定价名称：</label>
                    </td>
                    <td colSpan='1' id='pricingLiabName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='pricingLiabName' maxLength='120' required='true' width='100%' binding="{name:'pricingLiabName'}" validator="{errorMsg:'请录入汉字',realTime:true}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='liab_3_tr'>
                    <td align='right' id='isOpt_label_td' rowSpan='1'>
                        <label id='isOpt_label'>可选责任标记：</label>
                    </td>
                    <td colSpan='1' id='isOpt_td' rowSpan='1'>
                        <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='isOpt' labelAlign='right' maxLength='2' value='0' width='100%' binding="{name:'isOpt'}" dataProvider="{store:'ds_choose'}"></div>
                    </td>
                    <td align='right' id='amntPremUnit_label_td' rowSpan='1'>
                        <label id='label7'>责任类型：</label>
                    </td>
                    <td colSpan='1' id='amntPremUnit_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='uniDutyType' width='100%' binding="{name:'uniDutyType'}" cascade="{defaultSelect:false}" dataProvider="{store:'ds_uniDutyType'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='liab_5_tr'>
                    <td align='right' id='isWaive_label_td' rowSpan='1'>
                        <label id='isWaive_label'>是否豁免：</label>
                    </td>
                    <td colSpan='1' id='isWaive_td' rowSpan='1'>
                        <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='isWaive' labelAlign='right' maxLength='2' required='true' width='100%' binding="{name:'isWaive'}" dataProvider="{store:'isWaive'}"></div>
                    </td>
                    <td align='right' id='waiveType_label_td' rowSpan='1'>
                        <label id='waiveType_label'>豁免类型：</label>
                    </td>
                    <td colSpan='1' id='waiveType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='waiveType' width='100%' dataProvider="{store:'waiveType'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='liab_7_tr'>
                    <td align='right' id='isAmntIncrem_label_td' rowSpan='1'>
                        <label id='isAmntIncrem_label'>是否保额递增：</label>
                    </td>
                    <td colSpan='1' id='isAmntIncrem_td' rowSpan='1'>
                        <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='isAmntIncrem' labelAlign='right' required='true' width='100%' binding="{name:'isAmntIncrem'}" dataProvider="{store:'isAmntIncrem'}"></div>
                    </td>
                    <td align='right' id='incremWay_label_td' rowSpan='1'>
                        <label id='incremWay_label'>递增方式：</label>
                    </td>
                    <td colSpan='1' id='incremWay_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='incremWay' width='100%' dataProvider="{store:'incremWay'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='liab_9_tr'>
                    <td align='right' id='increm_Freq_label_td' rowSpan='1'>
                        <label id='increm_Freq_label'>递增频率：</label>
                    </td>
                    <td colSpan='1' id='increm_Freq_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='increm_Freq' width='100%' validator="{prompts:'请输入正确类型',regExp:/^[0-9]+$/}"></div>
                    </td>
                    <td align='right' id='increm_Propor_label_td' rowSpan='1'>
                        <label id='increm_Propor_label'>递增比例：</label>
                    </td>
                    <td colSpan='1' id='increm_Propor_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='increm_Propor' width='100%' range="{max:1,min:0}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='parmnt' width='100%'>
        <colgroup>
            <col width='18%'></col>
            <col width='30%'></col>
            <col width='52%'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
                <td colSpan='3'>
                    <div dojoType='unieap.form.CheckBox' id='parmntCheck'></div>
                    <label id='label1'>交费定义</label>
                </td>
            </tr>
            <tr height='25px'>
                <td>
                </td>
                <td>
                    <label id='label2'>计算方向：</label>
                </td>
                <td>
                    <div dojoType='unieap.form.ComboBox' id='calcDirection' width='92%' dataProvider="{store:'ds_direct'}"></div>
                </td>
            </tr>
            <tr height='25px' id='myTr'>
                <td>
                </td>
                <td>
                    <label id='amntPremUnit_label'>每份保额/保费：</label>
                </td>
                <td>
                    <div dojoType='unieap.form.NumberTextBox' id='amntPremUnit' width='92%' binding="{name:'amntPremUnit'}"></div>
                </td>
            </tr>
            <tr height='25px'>
                <td>
                </td>
                <td>
                    <label id='label3'>保费算法：</label>
                </td>
                <td>
                    <div dojoType='unieap.form.ComboBox' id='suminsurAlgoId' width='92%' binding="{name:'suminsurAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                </td>
            </tr>
            <tr height='25px'>
                <td>
                </td>
                <td>
                    <label id='label4'>保额算法：</label>
                </td>
                <td>
                    <div dojoType='unieap.form.ComboBox' id='premAlgoId' width='92%' binding="{name:'premAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                </td>
            </tr>
        </tbody>
    </table>
    <div dojoType='unieap.form.Form' id='form_fee' binding="{store:'tInsurtypeFeeDef'}">
        <table id='form_fee_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='52%'></col>
            </colgroup>
            <tbody>
                <tr id='form_fee_0_tr'>
                    <td id='feeType_label_td' rowSpan='1'>
                        <div dojoType='unieap.form.CheckBox' id='feeCheck'></div>
                        <label id='feeType_label'>扣费定义</label>
                    </td>
                    <td colSpan='1' id='feeType_td' rowSpan='1'>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_fee_1_tr'>
                    <td id='feeCalcFormulaId_label_td' rowSpan='1'>
                    </td>
                    <td colSpan='1' id='feeCalcFormulaId_td' rowSpan='1'>
                        <label id='feeCalcFormulaId_label'>风险扣费：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='feeCalcFormulaId' width='92%' binding="{name:'feeCalcFormulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.form.Form' id='form_addprem2' binding="{store:'tLiabFeeDef_form2'}">
        <table id='form_addprem2_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='52%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td>
                        <div dojoType='unieap.form.CheckBox' id='addPremCheck'></div>
                        <label id='label5'>加费定义</label>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_addprem2_0_tr'>
                    <td id='addpremAlgoId_label_td' rowSpan='1'>
                    </td>
                    <td colSpan='1' id='addpremAlgoId_td' rowSpan='1'>
                        <div dojoType='unieap.form.CheckBox' id='healthCheck'></div>
                        <label id='label6'>健康加费：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='addpremAlgoIdh' maxLength='16' width='92%' binding="{name:'addpremAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.form.Form' id='form_addprem' binding="{store:'tLiabFeeDef'}">
        <table id='form_addprem_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='52%'></col>
            </colgroup>
            <tbody>
                <tr id='form_addprem_0_tr'>
                    <td id='addpremAlgoId_label_td' rowSpan='1'>
                    </td>
                    <td colSpan='1' id='addpremAlgoId_td' rowSpan='1'>
                        <div dojoType='unieap.form.CheckBox' id='jobCheck'></div>
                        <label id='addpremAlgoId_label'>职业加费：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='addpremAlgoIdj' maxLength='16' width='92%' binding="{name:'addpremAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='ToolBar1' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='saveliab' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
