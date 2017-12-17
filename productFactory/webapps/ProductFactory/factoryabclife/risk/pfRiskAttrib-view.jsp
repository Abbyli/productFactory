
<%--
	保全属性定义
    @author zhy
    @creationTime 2016-08-22 17:10:29
    @modificationTime 2017-03-28 13:55:05
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAttrib-processor.js?version=20170328135505"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAttrib-view.js?version=20170328135505"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAttrib_navigateButton.setViewcContext("pfRiskAttrib_navigateButton");
pfRiskAttrib_navigateButton.page_initEvents&&dojo.hitch(pfRiskAttrib_navigateButton,pfRiskAttrib_navigateButton.page_initEvents)();
pfRiskAttrib_navigateButton.page_load&&dojo.hitch(pfRiskAttrib_navigateButton,pfRiskAttrib_navigateButton.page_load)();
pfRiskAttrib.page_initEvents&&dojo.hitch(pfRiskAttrib,pfRiskAttrib.page_initEvents)();
				pfRiskAttrib.page_load&&dojo.hitch(pfRiskAttrib,pfRiskAttrib.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskAttrib" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1' width='100%'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='保全属性定义' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='保&nbsp存' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form_basic' binding="{store:'tInsurtypeBasicInf_form'}">
                            <table id='form_basic_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_basic_1_tr'>
                                        <td align='right' id='insurtypeCode__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeCode__basic_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode__basic' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='verNo__basic_label_td' rowSpan='1'>
                                            <label id='verNo__basic_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='verNo__basic' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_basic_3_tr'>
                                        <td align='right' id='insurtypeName__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeName__basic_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeName__basic' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr__basic_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__basic' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div dojoType='unieap.form.Form' id='form_Attrib' binding="{store:'tInsurtypePsAttribDef_form'}">
                            <table id='form_Attrib_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_Attrib_1_tr'>
                                        <td align='right' id='isPermitAddinsur__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAddinsur__Attrib_label'>是否允许加保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAddinsur__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitAddinsur__Attrib' maxLength='1' width='100%' binding="{name:'isPermitAddinsur'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitAddprem__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAddprem__Attrib_label'>是否允许减保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAddprem__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitAddprem__Attrib' maxLength='1' width='100%' binding="{name:'isPermitAddprem'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_3_tr'>
                                        <td align='right' id='isPermitSurrender__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitSurrender__Attrib_label'>是否允许退保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitSurrender__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitSurrender__Attrib' maxLength='1' width='100%' binding="{name:'isPermitSurrender'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitPolLoan__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitPolLoan__Attrib_label'>是否允许保单贷款：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitPolLoan__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitPolLoan__Attrib' maxLength='1' width='100%' binding="{name:'isPermitPolLoan'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_5_tr'>
                                        <td align='right' id='isPermitAutoPay__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAutoPay__Attrib_label'>是否允许自垫：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAutoPay__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitAutoPay__Attrib' maxLength='1' width='100%' binding="{name:'isPermitAutoPay'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitReducAmtPayclr__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitReducAmtPayclr__Attrib_label'>是否允许减额缴清：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitReducAmtPayclr__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitReducAmtPayclr__Attrib' maxLength='1' width='100%' binding="{name:'isPermitReducAmtPayclr'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_7_tr'>
                                        <td align='right' id='isPermitInsurRenew__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitInsurRenew__Attrib_label'>是否允许续保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitInsurRenew__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitInsurRenew__Attrib' maxLength='1' width='100%' binding="{name:'isPermitInsurRenew'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isMatureLiab__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAddfee__Attrib_label'>是否允许追加保费：</label>
                                        </td>
                                        <td colSpan='1' id='isMatureLiab__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isPermitAddfee__Attrib' maxLength='1' width='100%' binding="{name:'isPermitAddfee'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_9_tr'>
                                        <td align='right' id='isPermitAddfee__Attrib_label_td' rowSpan='1'>
                                            <label id='isDividend__Attrib_label'>是否有分红：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAddfee__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='isDividend__Attrib' maxLength='1' width='100%' binding="{name:'isDividend'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isDividend__Attrib_label_td' rowSpan='1'>
                                            <label id='dividendIsAccSettle__Attrib_label'>分红时是否账户结算：</label>
                                        </td>
                                        <td colSpan='1' id='isDividend__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='dividendIsAccSettle__Attrib' maxLength='1' width='100%' binding="{name:'dividendIsAccSettle'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_11_tr'>
                                        <td align='right' id='dividendWay__Attrib_label_td' rowSpan='1'>
                                            <label id='singlePayAllowExceptSurrnd__Attrib_label'>趸交是否允许通融退保：</label>
                                        </td>
                                        <td colSpan='1' id='dividendWay__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='singlePayAllowExceptSurrnd__Attrib' maxLength='1' width='100%' binding="{name:'singlePayAllowExceptSurrnd'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='dividendIsAccSettle__Attrib_label_td' rowSpan='1'>
                                            <label id='regulPayAllowExceptSurrnd__Attrib_label'>期交是否允许通融退保：</label>
                                        </td>
                                        <td colSpan='1' id='dividendIsAccSettle__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='regulPayAllowExceptSurrnd__Attrib' maxLength='1' width='100%' binding="{name:'regulPayAllowExceptSurrnd'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_13_tr'>
                                        <td align='right' id='regulPayAllowExceptSurrnd__Attrib_label_td' rowSpan='1'>
                                        </td>
                                        <td colSpan='1' id='regulPayAllowExceptSurrnd__Attrib_td' rowSpan='1'>
                                        </td>
                                        <td align='right' id='singlePayAllowExceptSurrnd__Attrib_label_td' rowSpan='1'>
                                        </td>
                                        <td colSpan='1' id='singlePayAllowExceptSurrnd__Attrib_td' rowSpan='1'>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
