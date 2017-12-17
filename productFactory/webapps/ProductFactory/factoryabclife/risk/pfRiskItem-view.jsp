
<%--
	保全项定义
    @author zhy
    @creationTime 2016-08-11 16:36:39
    @modificationTime 2016-08-16 16:37:10
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskItem-processor.js?version=20160816163710"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskItem-view.js?version=20160816163710"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskItem_navigateButton.setViewcContext("pfRiskItem_navigateButton");
pfRiskItem_navigateButton.page_initEvents&&dojo.hitch(pfRiskItem_navigateButton,pfRiskItem_navigateButton.page_initEvents)();
pfRiskItem_navigateButton.page_load&&dojo.hitch(pfRiskItem_navigateButton,pfRiskItem_navigateButton.page_load)();
pfRiskItem.page_initEvents&&dojo.hitch(pfRiskItem,pfRiskItem.page_initEvents)();
				pfRiskItem.page_load&&dojo.hitch(pfRiskItem,pfRiskItem.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskItem" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insur' binding="{store:'tInsurtypeBasicInf_form'}">
                            <table id='form_insur_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_insur_1_tr'>
                                        <td align='right' id='insurtypeCode__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeCode__insur_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode__insur' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeName__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeName__insur_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeName__insur' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_insur_3_tr'>
                                        <td align='right' id='verNo__insur_label_td' rowSpan='1'>
                                            <label id='verNo__insur_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='verNo__insur' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr__insur_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__insur' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='保全项定义'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='保&nbsp存' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.CheckBoxGroup' id='checkBoxGroup1' labelAlign='right' width='100%' decoder="{displayAttr:'psItemName',valueAttr:'psItemId'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
