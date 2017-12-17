
<%--
	组合定义页面弹窗
    @author Administrator
    @creationTime 2016-11-11 09:54:05
    @modificationTime 2017-03-06 10:40:10
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboDialog-processor.js?version=20170306104010"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboDialog-view.js?version=20170306104010"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboDialog.page_initEvents&&dojo.hitch(pfComboDialog,pfComboDialog.page_initEvents)();
				pfComboDialog.page_load&&dojo.hitch(pfComboDialog,pfComboDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_combo' binding="{store:'tComboInf_aa'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form1_1_tr'>
                    <td align='right' id='comboCode_label_td' rowSpan='1'>
                        <label id='comboCode_label'>组合编码：</label>
                    </td>
                    <td colSpan='1' id='comboCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' required='true' width='100%' binding="{name:'comboCode'}"></div>
                    </td>
                    <td align='right' id='comboVer_label_td' rowSpan='1'>
                        <label id='comboVer_label'>组合版本：</label>
                    </td>
                    <td colSpan='1' id='comboVer_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='comboVer' maxLength='10' readOnly='true' required='true' width='100%' binding="{name:'comboVer'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_3_tr'>
                    <td align='right' id='comboName_label_td' rowSpan='1'>
                        <label id='comboName_label'>组合名称：</label>
                    </td>
                    <td colSpan='1' id='comboName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='comboName' maxLength='120' required='true' width='100%' binding="{name:'comboName'}"></div>
                    </td>
                    <td align='right' id='comboAbbr_label_td' rowSpan='1'>
                        <label id='comboAbbr_label'>组合简称：</label>
                    </td>
                    <td colSpan='1' id='comboAbbr_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='comboAbbr' maxLength='90' required='true' width='100%' binding="{name:'comboAbbr'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_4_tr'>
                    <td align='right' height='50px' id='remark_label_td' rowSpan='1'>
                        <label id='remark_label'>备注：</label>
                    </td>
                    <td colSpan='3' id='remark_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='remark' maxLength='500' width='100%' binding="{name:'remark'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
