
<%--
	
    @author Administrator
    @creationTime 2016-12-02 09:22:43
    @modificationTime 2017-03-23 11:03:30
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/test/calTest-processor.js?version=20170323110330"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/test/calTest-view.js?version=20170323110330"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				calTest.page_initEvents&&dojo.hitch(calTest,calTest.page_initEvents)();
				calTest.page_load&&dojo.hitch(calTest,calTest.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='投保费率测试'>
            <div dojoType='unieap.form.Form' id='form3' binding="{store:'rate_policyDTO'}">
                <table id='form2_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='10%'></col>
                        <col width='20%'></col>
                        <col width='10%'></col>
                        <col width='20%'></col>
                        <col width='10%'></col>
                        <col width='20%'></col>
                        <col width='10%'></col>
                    </colgroup>
                    <tbody>
                        <tr id='form2_2_tr'>
                            <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                <label id='insurtypeCode_label'>险种代码：</label>
                            </td>
                            <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='insurtypeCode3' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                            </td>
                            <td align='right' id='varNo_label_td' rowSpan='1'>
                                <label id='varNo_label'>版本号：</label>
                            </td>
                            <td colSpan='1' id='varNo_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='varNo3' required='true' width='100%' decoder="{displayAttr:'verNo',valueAttr:'verNo'}"></div>
                            </td>
                            <td align='right' id='pricingLiabCode_label_td' rowSpan='1'>
                                <label id='pricingLiabCode_label'>定价责任：</label>
                            </td>
                            <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='pricingLiabCode3' required='true' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabName',valueAttr:'pricingLiabCode'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form2_5_tr'>
                            <td align='right' id='appAge_label_td' rowSpan='1'>
                                <label id='appAge_label'>投保年龄：</label>
                            </td>
                            <td colSpan='1' id='appAge_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='appAge3' width='100%' binding="{name:'appAge'}"></div>
                            </td>
                            <td align='right' id='sex_label_td' rowSpan='1'>
                                <label id='sex_label'>性别：</label>
                            </td>
                            <td colSpan='1' id='sex_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='sex3' width='100%' binding="{name:'sex'}" dataProvider="{store:'ds_sex'}"></div>
                            </td>
                            <td align='right' id='job_label_td' rowSpan='1'>
                                <label id='job_label'>职业类别：</label>
                            </td>
                            <td colSpan='1' id='job_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='job3' width='100%' binding="{name:'job'}" dataProvider="{store:'job2'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form2_8_tr'>
                            <td align='right' id='insuYear_label_td' rowSpan='1'>
                                <label id='insuYear_label'>保险期间：</label>
                            </td>
                            <td colSpan='1' id='insuYear_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='insuYear3' width='100%' binding="{name:'insuYear'}"></div>
                            </td>
                            <td align='right' id='insuYearFlag_label_td' rowSpan='1'>
                                <label id='insuYearFlag_label'>保险期间单位：</label>
                            </td>
                            <td colSpan='1' id='insuYearFlag_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='insuYearFlag3' width='100%' binding="{name:'insuYearFlag'}" dataProvider="{store:'insuYearFlag2'}" popup="{height:'300px'}"></div>
                            </td>
                            <td align='right' id='payIntv_label_td' rowSpan='1'>
                            </td>
                            <td colSpan='1' id='payIntv_td' rowSpan='1'>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form2_11_tr'>
                            <td align='right' id='payEndYear_label_td' rowSpan='1'>
                                <label id='payEndYear_label'>交费期间：</label>
                            </td>
                            <td colSpan='1' id='payEndYear_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='payEndYear3' width='100%' binding="{name:'payEndYear'}"></div>
                            </td>
                            <td align='right' id='payEndYearFlag_label_td' rowSpan='1'>
                                <label id='payEndYearFlag_label'>交费期间单位：</label>
                            </td>
                            <td colSpan='1' id='payEndYearFlag_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='payEndYearFlag3' width='100%' binding="{name:'payEndYearFlag'}" dataProvider="{store:'insuYearFlag2'}"></div>
                            </td>
                            <td align='right' id='copies_label_td' rowSpan='1'>
                                <label id='payIntv_label'>交费频率：</label>
                            </td>
                            <td colSpan='1' id='copies_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='payIntv3' width='100%' binding="{name:'payIntv'}" dataProvider="{store:'payIntv2'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form2_13_tr'>
                            <td align='right' id='amnt_label_td' rowSpan='1'>
                                <label id='copies_label'>份数：</label>
                            </td>
                            <td colSpan='1' id='amnt_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='copies3' width='100%' binding="{name:'mult'}"></div>
                            </td>
                            <td align='right' id='prem_label_td' rowSpan='1'>
                                <label id='amnt_label'>保额：</label>
                            </td>
                            <td colSpan='1' id='prem_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='amnt3' width='100%' binding="{name:'amnt'}"></div>
                            </td>
                            <td align='right'>
                                <label id='prem_label'>保费：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.NumberTextBox' id='prem3' width='100%' binding="{name:'prem'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table id='form3_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' class='myButton' id='form3_saveButton' label='测&nbsp试' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane4' title='理赔算法测试'>
            <div dojoType='unieap.form.Form' id='form4' binding="{store:'rate_policyDTO'}">
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
                            <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                <label id='insurtypeCode_label'>险种代码：</label>
                            </td>
                            <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='insurtypeCode4' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                            </td>
                            <td align='right' id='verNo_label_td' rowSpan='1'>
                                <label id='verNo_label'>版本号：</label>
                            </td>
                            <td colSpan='1' id='verNo_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='verNo4' required='true' width='100%' decoder="{displayAttr:'verNo',valueAttr:'verNo'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_3_tr'>
                            <td align='right' id='pricingLiabCode_label_td' rowSpan='1'>
                                <label id='pricingLiabCode_label'>定价责任：</label>
                            </td>
                            <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='pricingLiabCode4' required='true' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabName',valueAttr:'pricingLiabCode'}"></div>
                            </td>
                            <td align='right' id='protecLiabCode_label_td' rowSpan='1'>
                                <label id='protecLiabCode_label'>保障责任：</label>
                            </td>
                            <td colSpan='1' id='protecLiabCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='protecLiabCode4' required='true' width='100%' decoder="{displayAttr:'protecLiabName',valueAttr:'protecLiabCode'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_5_tr'>
                            <td align='right' id='subType1_label_td' rowSpan='1'>
                                <label id='subType1_label'>赔付类型：</label>
                            </td>
                            <td colSpan='1' id='subType1_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='subType2_4' width='100%' dataProvider="{store:'ds_subType2'}"></div>
                            </td>
                            <td align='right' id='subType2_label_td' rowSpan='1'>
                                <label id='subType2_label'>出险原因：</label>
                            </td>
                            <td colSpan='1' id='subType2_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='subType1_4' width='100%' dataProvider="{store:'ds_subType1'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_7_tr'>
                            <td align='right' id='subType3_label_td' rowSpan='1'>
                                <label id='subType3_label'>生存给付项：</label>
                            </td>
                            <td colSpan='1' id='subType3_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='subType3_4' width='100%' decoder="{displayAttr:'survvGivepayName',valueAttr:'survvGivepayCode'}"></div>
                            </td>
                            <td align='right' id='amnt_label_td' rowSpan='1'>
                            </td>
                            <td colSpan='1' id='amnt_td' rowSpan='1'>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='amnt_label'>保额：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.NumberTextBox' id='amnt4' width='100%' binding="{name:'amnt'}"></div>
                            </td>
                            <td align='right'>
                                <label id='prem_label'>保费：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.NumberTextBox' id='prem4' width='100%' binding="{name:'prem'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_9_tr'>
                            <td align='right' id='prem_label_td' rowSpan='1'>
                                <label id='insYear_label'>保单年度：</label>
                            </td>
                            <td colSpan='1' id='prem_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='textBox2' width='100%' binding="{name:'insYear'}"></div>
                            </td>
                            <td align='right' id='insYear_label_td' rowSpan='1'>
                                <label id='sex_label'>性别：</label>
                            </td>
                            <td colSpan='1' id='insYear_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='sex4' width='100%' binding="{name:'sex'}" dataProvider="{store:'ds_sex'}" popup="{height:'auto'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_11_tr'>
                            <td align='right' id='sex_label_td' rowSpan='1'>
                                <label id='appAge_label'>投保年龄：</label>
                            </td>
                            <td colSpan='1' id='sex_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='appAge4' width='100%' binding="{name:'appAge'}"></div>
                            </td>
                            <td align='right' id='appAge_label_td' rowSpan='1'>
                                <label id='insuYear_label'>保险期间：</label>
                            </td>
                            <td colSpan='1' id='appAge_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='insuYear4' width='100%' binding="{name:'insuYear'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='label1'>保险期间单位：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.ComboBox' id='comboBox1' width='100%' binding="{name:'insuYearFlag'}" dataProvider="{store:'insuYearFlag2'}"></div>
                            </td>
                            <td align='right'>
                                <label id='label2'>交费期间：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.TextBox' id='textBox1' width='100%' binding="{name:'payEndYear'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='label3'>交费期间单位：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.ComboBox' id='comboBox2' width='100%' binding="{name:'payEndYearFlag'}" dataProvider="{store:'insuYearFlag2'}"></div>
                            </td>
                            <td align='right'>
                                <label id='label4'>领取年期：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.TextBox' id='textBox3' width='100%' binding="{name:'getYear'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_13_tr'>
                            <td align='right' id='insuYear_label_td' rowSpan='1'>
                                <label id='bdsxr_label'>生效日期：</label>
                            </td>
                            <td colSpan='1' id='insuYear_td' rowSpan='1'>
                                <div dojoType='unieap.form.DateTextBox' id='bdsxr4' width='100%' binding="{name:'bdsxr'}"></div>
                            </td>
                            <td align='right' id='bdsxr_label_td' rowSpan='1'>
                                <label id='birthday_label'>出生日期：</label>
                            </td>
                            <td colSpan='1' id='bdsxr_td' rowSpan='1'>
                                <div dojoType='unieap.form.DateTextBox' id='birthday4' width='100%' binding="{name:'birthday'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_15_tr'>
                            <td align='right' id='birthday_label_td' rowSpan='1'>
                                <label id='curAge_label'>当前年龄：</label>
                            </td>
                            <td colSpan='1' id='birthday_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='curAge4' width='100%' binding="{name:'curAge'}"></div>
                            </td>
                            <td align='right' id='curAge_label_td' rowSpan='1'>
                                <label id='disableLvl_label'>伤残等级：</label>
                            </td>
                            <td colSpan='1' id='curAge_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='disableLvl4' width='100%' binding="{name:'disableLvl'}" dataProvider="{store:'ds_disable'}" popup="{height:'auto'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_17_tr'>
                            <td align='right' id='disableLvl_label_td' rowSpan='1'>
                                <label id='rgtDays_label'>生效（复效）日天数：</label>
                            </td>
                            <td colSpan='1' id='disableLvl_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='rgtDays4' width='100%' binding="{name:'rgtDays'}"></div>
                            </td>
                            <td align='right' id='rgtDays_label_td' rowSpan='1'>
                                <label id='accidentDate_label'>事故发生日：</label>
                            </td>
                            <td colSpan='1' id='rgtDays_td' rowSpan='1'>
                                <div dojoType='unieap.form.DateTextBox' id='accidentDate4' width='100%' binding="{name:'accidentDate'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_19_tr'>
                            <td align='right' id='accidentDate_label_td' rowSpan='1'>
                                <label id='socalInsurFlag_label'>社保标记：</label>
                            </td>
                            <td colSpan='1' id='accidentDate_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='socalInsurFlag4' width='100%' binding="{name:'socalInsurFlag'}" dataProvider="{store:'ds_flag'}"></div>
                            </td>
                            <td align='right' id='socalInsurFlag_label_td' rowSpan='1'>
                                <label id='observation_label'>观察期天数 ：</label>
                            </td>
                            <td colSpan='1' id='socalInsurFlag_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='observation4' width='100%' binding="{name:'observation'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr id='form1_21_tr'>
                            <td align='right' id='observation_label_td' rowSpan='1'>
                                <label id='term_label'>交费期数：</label>
                            </td>
                            <td colSpan='1' id='observation_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='term4' width='100%' binding="{name:'term'}"></div>
                            </td>
                            <td align='right' id='term_label_td' rowSpan='1'>
                                <label id='daysInHos_label'>住院天数：</label>
                            </td>
                            <td colSpan='1' id='term_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='daysInHos4' width='100%' binding="{name:'daysInHos'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='label5'>医疗费用总额：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.TextBox' id='totalFee' width='100%' binding="{name:'totalFee'}"></div>
                            </td>
                            <td align='right'>
                                <label id='label6'>已赔偿费用：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.TextBox' id='soInMo' width='100%' binding="{name:'soInMo'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table id='form4_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' class='myButton' id='form4_saveButton' label='测&nbsp试' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
