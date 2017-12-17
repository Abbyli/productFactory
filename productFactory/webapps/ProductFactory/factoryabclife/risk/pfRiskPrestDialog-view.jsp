
<%--
	保障责任弹窗
    @author neusoft
    @creationTime 2016-07-07 17:08:52
    @modificationTime 2016-09-29 15:40:41
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestDialog-processor.js?version=20160929154041"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestDialog-view.js?version=20160929154041"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestDialog.page_initEvents&&dojo.hitch(pfRiskPrestDialog,pfRiskPrestDialog.page_initEvents)();
				pfRiskPrestDialog.page_load&&dojo.hitch(pfRiskPrestDialog,pfRiskPrestDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_PrestDialog' binding="{store:'tProtecLiabDef_PrestDialog'}">
        <table id='form_PrestDialog_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_PrestDialog_1_tr'>
                    <td align='right' id='protecLiabCode__PrestDialog_label_td' rowSpan='1'>
                        <label id='protecLiabCode__PrestDialog_label'>保障责任代码：</label>
                    </td>
                    <td colSpan='1' id='protecLiabCode__PrestDialog_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='protecLiabCode__PrestDialog' maxLength='10' required='true' width='100%' binding="{name:'protecLiabCode'}" validator="{errorMsg:'格式为：险种代码+4+X 如：101041',regExp:/^[0-9]{4}[4][0-9]$/}"></div>
                    </td>
                    <td align='right' id='protecLiabName__PrestDialog_label_td' rowSpan='1'>
                        <label id='protecLiabName__PrestDialog_label'>保障责任名称：</label>
                    </td>
                    <td colSpan='1' id='protecLiabName__PrestDialog_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='protecLiabName__PrestDialog' maxLength='120' required='true' width='100%' binding="{name:'protecLiabName'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_PrestDialog_2_tr'>
                    <td align='right' id='protecLiabType__PrestDialog_label_td' rowSpan='1'>
                        <label id='protecLiabType__PrestDialog_label'>保障责任类型：</label>
                    </td>
                    <td colSpan='1' id='protecLiabType__PrestDialog_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='protecLiabType__PrestDialog' maxLength='2' required='true' width='100%' binding="{name:'protecLiabType'}" dataProvider="{store:'ds_type'}"></div>
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
    <table class='toolbar-table' id='form_PrestDialog_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_PrestDialog_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
