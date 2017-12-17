
<%--
	组合属性
    @author Administrator
    @creationTime 2016-11-16 10:42:54
    @modificationTime 2016-12-27 14:30:45
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboAttrib-processor.js?version=20161227143045"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboAttrib-view.js?version=20161227143045"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboAttrib_navigateButton.setViewcContext("pfComboAttrib_navigateButton");
pfComboAttrib_navigateButton.page_initEvents&&dojo.hitch(pfComboAttrib_navigateButton,pfComboAttrib_navigateButton.page_initEvents)();
pfComboAttrib_navigateButton.page_load&&dojo.hitch(pfComboAttrib_navigateButton,pfComboAttrib_navigateButton.page_load)();
pfComboAttrib.page_initEvents&&dojo.hitch(pfComboAttrib,pfComboAttrib.page_initEvents)();
				pfComboAttrib.page_load&&dojo.hitch(pfComboAttrib,pfComboAttrib.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/comboInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboAttrib" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='20%' id='titlePane1'>
                <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_attrib_form'}">
                    <table id='form_comboInf_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_comboInf_1_tr'>
                                <td align='right' id='comboCode_label_td' rowSpan='1'>
                                    <label id='comboCode_label'>组合编码：</label>
                                </td>
                                <td colSpan='1' id='comboCode_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' readOnly='true' width='100%' binding="{name:'comboCode'}"></div>
                                </td>
                                <td align='right' id='comboName_label_td' rowSpan='1'>
                                    <label id='comboName_label'>组合名称：</label>
                                </td>
                                <td colSpan='1' id='comboName_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='comboName' maxLength='120' readOnly='true' width='100%' binding="{name:'comboName'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='80%' id='titlePane2'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='saveAttrib' label='保&nbsp;存' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_attrib' binding="{store:'tComboAttrib_form'}">
                    <table id='form_attrib_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_attrib_1_tr'>
                                <td align='right' id='comboSalesWay_label_td' rowSpan='1'>
                                    <label id='comboSalesWay_label'>组合销售方式：</label>
                                </td>
                                <td colSpan='1' id='comboSalesWay_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='comboSalesWay' maxLength='2' width='100%' binding="{name:'comboSalesWay'}" dataProvider="{store:'ds_saleWay'}"></div>
                                </td>
                                <td id='isByCopiesSales_label_td' rowSpan='1'>
                                </td>
                                <td colSpan='1' id='isByCopiesSales_td' rowSpan='1'>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_attrib_3_tr'>
                                <td align='right' id='isHaveIndependRate_label_td' rowSpan='1'>
                                    <label id='isHaveIndependRate_label'>是否有独立费率：</label>
                                </td>
                                <td colSpan='1' id='isHaveIndependRate_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='isHaveIndependRate' maxLength='1' width='100%' binding="{name:'isHaveIndependRate'}" dataProvider="{store:'ds_YON'}"></div>
                                </td>
                                <td align='right' id='premAlgoId_label_td' rowSpan='1'>
                                    <label id='isByCopiesSales_label'>是否按份数销售：</label>
                                </td>
                                <td colSpan='1' id='premAlgoId_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='isByCopiesSales' maxLength='1' width='100%' binding="{name:'isByCopiesSales'}" dataProvider="{store:'ds_YON'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_attrib_5_tr'>
                                <td align='right' id='suminsurAlgoId_label_td' rowSpan='1'>
                                    <label id='premAlgoId_label'>保费算法：</label>
                                </td>
                                <td colSpan='1' id='suminsurAlgoId_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='premAlgoId' maxLength='16' width='100%' binding="{name:'premAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                </td>
                                <td align='right' id='unitPrem_label_td' rowSpan='1'>
                                    <label id='suminsurAlgoId_label'>保额算法：</label>
                                </td>
                                <td colSpan='1' id='unitPrem_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='suminsurAlgoId' maxLength='16' width='100%' binding="{name:'suminsurAlgoId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_attrib_6_tr'>
                                <td align='right' id='unitSuminsur_label_td' rowSpan='1'>
                                    <label id='unitPrem_label'>单位保费：</label>
                                </td>
                                <td colSpan='1' id='unitSuminsur_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' id='unitPrem' maxLength='20' readOnly='true' width='100%' binding="{name:'unitPrem'}"></div>
                                </td>
                                <td align='right'>
                                    <label id='unitSuminsur_label'>单位保额：</label>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.NumberTextBox' id='unitSuminsur' maxLength='20' readOnly='true' width='100%' binding="{name:'unitSuminsur'}"></div>
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
</s:i18n>
    </security:auth>
	</body>
</html>
