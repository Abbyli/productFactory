
<%--
	个险险种定义 编辑窗口
    @author think
    @creationTime 2016-06-23 11:34:10
    @modificationTime 2016-10-14 15:34:03
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskDialog-processor.js?version=20161014153403"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskDialog-view.js?version=20161014153403"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskDialog.page_initEvents&&dojo.hitch(pfRiskDialog,pfRiskDialog.page_initEvents)();
				pfRiskDialog.page_load&&dojo.hitch(pfRiskDialog,pfRiskDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_riskD' binding="{store:'tInsurtypeBasicInf_formD'}">
        <table id='form_riskD_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_riskD_1_tr'>
                    <td align='right' id='insurtypeCode__riskD_label_td' rowSpan='1'>
                        <label id='insurtypeCode__riskD_label'>险种编码：</label>
                    </td>
                    <td colSpan='1' id='insurtypeCode__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeCode__riskD' maxLength='4' required='true' trim='true' width='100%' binding="{name:'insurtypeCode'}" validator="{regExp:/^\d{4}$/}"></div>
                    </td>
                    <td align='right' id='verNo__riskD_label_td' rowSpan='1'>
                        <label id='verNo__riskD_label'>险种版本：</label>
                    </td>
                    <td colSpan='1' id='verNo__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' disabled='true' id='verNo__riskD' maxLength='16' readOnly='true' required='true' width='100%' binding="{name:'verNo'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_riskD_3_tr'>
                    <td align='right' id='insurtypeName__riskD_label_td' rowSpan='1'>
                        <label id='insurtypeName__riskD_label'>险种名称：</label>
                    </td>
                    <td colSpan='1' id='insurtypeName__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeName__riskD' maxLength='90' required='true' width='100%' binding="{name:'insurtypeName'}"></div>
                    </td>
                    <td align='right' id='insurtypeAbbr__riskD_label_td' rowSpan='1'>
                        <label id='insurtypeAbbr__riskD_label'>险种简称：</label>
                    </td>
                    <td colSpan='1' id='insurtypeAbbr__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__riskD' maxLength='90' required='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_riskD_5_tr'>
                    <td align='right' id='insurtypeEngName__riskD_label_td' rowSpan='1'>
                        <label id='insurtypeEngName__riskD_label'>险种英文名称：</label>
                    </td>
                    <td colSpan='1' id='insurtypeEngName__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeEngName__riskD' maxLength='120' width='100%' binding="{name:'insurtypeEngName'}" validator="{errorMsg:'只能输入英文',regExp:/^[0-9a-zA-Z]+$/}"></div>
                    </td>
                    <td align='right' id='insurtypeEngAbbr__riskD_label_td' rowSpan='1'>
                        <label id='insurtypeEngAbbr__riskD_label'>险种英文简称：</label>
                    </td>
                    <td colSpan='1' id='insurtypeEngAbbr__riskD_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeEngAbbr__riskD' maxLength='90' width='100%' binding="{name:'insurtypeEngAbbr'}" validator="{errorMsg:'只能输入英文或数字',regExp:/^[0-9a-zA-Z]+$/}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form_riskD_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_riskD_saveButton' label='保&nbsp存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
