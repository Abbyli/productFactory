
<%--
	保全属性定义
    @author zhy
    @creationTime 2016-08-22 17:10:29
    @modificationTime 2016-10-14 11:14:04
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAttribInf-processor.js?version=20161014111404"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAttribInf-view.js?version=20161014111404"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAttribInf_navigateButton.setViewcContext("pfRiskAttribInf_navigateButton");
pfRiskAttribInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskAttribInf_navigateButton,pfRiskAttribInf_navigateButton.page_initEvents)();
pfRiskAttribInf_navigateButton.page_load&&dojo.hitch(pfRiskAttribInf_navigateButton,pfRiskAttribInf_navigateButton.page_load)();
pfRiskAttribInf.page_initEvents&&dojo.hitch(pfRiskAttribInf,pfRiskAttribInf.page_initEvents)();
				pfRiskAttribInf.page_load&&dojo.hitch(pfRiskAttribInf,pfRiskAttribInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskAttribInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1' width='100%'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='保全属性定义' width='100%'>
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
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitAddinsur__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitAddinsur'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitAddprem__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAddprem__Attrib_label'>是否允许减保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAddprem__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitAddprem__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitAddprem'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_3_tr'>
                                        <td align='right' id='isPermitSurrender__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitSurrender__Attrib_label'>是否允许退保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitSurrender__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitSurrender__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitSurrender'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitPolLoan__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitPolLoan__Attrib_label'>是否允许保单贷款：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitPolLoan__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitPolLoan__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitPolLoan'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_5_tr'>
                                        <td align='right' id='isPermitAutoPay__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAutoPay__Attrib_label'>是否允许自垫：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAutoPay__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitAutoPay__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitAutoPay'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isPermitReducAmtPayclr__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitReducAmtPayclr__Attrib_label'>是否允许减额缴清：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitReducAmtPayclr__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitReducAmtPayclr__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitReducAmtPayclr'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_7_tr'>
                                        <td align='right' id='isPermitInsurRenew__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitInsurRenew__Attrib_label'>是否允许续保：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitInsurRenew__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitInsurRenew__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitInsurRenew'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isMatureLiab__Attrib_label_td' rowSpan='1'>
                                            <label id='isMatureLiab__Attrib_label'>是否有满期责任：</label>
                                        </td>
                                        <td colSpan='1' id='isMatureLiab__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isMatureLiab__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isMatureLiab'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_9_tr'>
                                        <td align='right' id='isPermitAddfee__Attrib_label_td' rowSpan='1'>
                                            <label id='isPermitAddfee__Attrib_label'>是否允许追加保费：</label>
                                        </td>
                                        <td colSpan='1' id='isPermitAddfee__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isPermitAddfee__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isPermitAddfee'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='isDividend__Attrib_label_td' rowSpan='1'>
                                            <label id='isDividend__Attrib_label'>是否有分红：</label>
                                        </td>
                                        <td colSpan='1' id='isDividend__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='isDividend__Attrib' maxLength='1' required='true' width='100%' binding="{name:'isDividend'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_11_tr'>
                                        <td align='right' id='dividendWay__Attrib_label_td' rowSpan='1'>
                                            <label id='dividendWay__Attrib_label'>分红领取方式：</label>
                                        </td>
                                        <td colSpan='1' id='dividendWay__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='dividendWay__Attrib' maxLength='2' required='true' width='100%' binding="{name:'dividendWay'}" dataProvider="{store:'ds_dividend'}"></div>
                                        </td>
                                        <td align='right' id='dividendIsAccSettle__Attrib_label_td' rowSpan='1'>
                                            <label id='dividendIsAccSettle__Attrib_label'>分红时是否账户结算：</label>
                                        </td>
                                        <td colSpan='1' id='dividendIsAccSettle__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='dividendIsAccSettle__Attrib' maxLength='1' required='true' width='100%' binding="{name:'dividendIsAccSettle'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_Attrib_13_tr'>
                                        <td align='right' id='regulPayAllowExceptSurrnd__Attrib_label_td' rowSpan='1'>
                                            <label id='regulPayAllowExceptSurrnd__Attrib_label'>期交是否允许通融退保：</label>
                                        </td>
                                        <td colSpan='1' id='regulPayAllowExceptSurrnd__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='regulPayAllowExceptSurrnd__Attrib' maxLength='1' required='true' width='100%' binding="{name:'regulPayAllowExceptSurrnd'}" dataProvider="{store:'ds_choose_attrib'}"></div>
                                        </td>
                                        <td align='right' id='singlePayAllowExceptSurrnd__Attrib_label_td' rowSpan='1'>
                                            <label id='singlePayAllowExceptSurrnd__Attrib_label'>趸交是否允许通融退保：</label>
                                        </td>
                                        <td colSpan='1' id='singlePayAllowExceptSurrnd__Attrib_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' disabled='true' id='singlePayAllowExceptSurrnd__Attrib' maxLength='1' required='true' width='100%' binding="{name:'singlePayAllowExceptSurrnd'}" dataProvider="{store:'ds_choose_attrib'}"></div>
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
