
<%--
	选择险种弹窗
    @author Administrator
    @creationTime 2016-11-14 16:49:26
    @modificationTime 2017-03-23 15:27:26
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboChooseDialog-processor.js?version=20170323152726"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboChooseDialog-view.js?version=20170323152726"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboChooseDialog.page_initEvents&&dojo.hitch(pfComboChooseDialog,pfComboChooseDialog.page_initEvents)();
				pfComboChooseDialog.page_load&&dojo.hitch(pfComboChooseDialog,pfComboChooseDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_comboInsurtype' binding="{store:'tComboInsurtype_form'}">
        <table id='form_comboInsurtype_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_comboInsurtype_1_tr'>
                    <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                        <label id='insurtypeCode_label'>险种代码：</label>
                    </td>
                    <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='20' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                <tr id='form_comboInsurtype_3_tr'>
                    <td align='right' id='insurtypeVer_label_td' rowSpan='1'>
                        <label id='insurtypeVer_label'>险种版本：</label>
                    </td>
                    <td colSpan='1' id='insurtypeVer_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeVer' maxLength='10' readOnly='true' width='100%' binding="{name:'insurtypeVer'}"></div>
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
                <tr id='form_comboInsurtype_5_tr'>
                    <td align='right' id='pricingCode_label_td' rowSpan='1'>
                        <label id='pricingCode_label'>定价代码：</label>
                    </td>
                    <td colSpan='1' id='pricingCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='pricingCode' maxLength='20' required='true' width='100%' binding="{name:'pricingId'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}" popup="{displayStyle:'multi'}"></div>
                    </td>
                    <td align='right' id='pricingName_label_td' rowSpan='1'>
                        <label id='pricingName_label'>定价名称：</label>
                    </td>
                    <td colSpan='1' id='pricingName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='pricingName' maxLength='90' readOnly='true' width='100%' binding="{name:'pricingName'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form_comboInsurtype_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_comboInsurtype_saveButton' label='保&nbsp;存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
