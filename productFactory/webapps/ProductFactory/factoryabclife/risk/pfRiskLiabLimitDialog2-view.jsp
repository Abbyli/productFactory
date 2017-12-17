
<%--
	
    @author Administrator
    @creationTime 2016-08-25 11:24:42
    @modificationTime 2017-01-19 11:00:02
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimitDialog2-processor.js?version=20170119110002"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimitDialog2-view.js?version=20170119110002"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskLiabLimitDialog2.page_initEvents&&dojo.hitch(pfRiskLiabLimitDialog2,pfRiskLiabLimitDialog2.page_initEvents)();
				pfRiskLiabLimitDialog2.page_load&&dojo.hitch(pfRiskLiabLimitDialog2,pfRiskLiabLimitDialog2.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'tLiabLimit_form_limit'}">
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
                    <td align='right' id='protecLiabCode_label_td' rowSpan='1'>
                        <label id='protecLiabCode_label'>保障责任编码：</label>
                    </td>
                    <td colSpan='1' id='protecLiabCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='protecLiabCode' maxLength='10' readOnly='true' width='100%' binding="{name:'protecLiabCode'}"></div>
                    </td>
                    <td align='right' id='limitValue_label_td' rowSpan='1'>
                        <label id='limitTimeType_label'>适用期间：</label>
                    </td>
                    <td colSpan='1' id='limitValue_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='limitTimeType' required='true' width='100%' binding="{name:'limitTimeType'}" dataProvider="{store:'ds_limit_time'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_2_tr'>
                    <td align='right' id='limitTimeType_label_td' rowSpan='1'>
                        <label id='limitValue_label'>天数：</label>
                    </td>
                    <td colSpan='1' id='limitTimeType_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='limitValue' maxLength='16' required='true' width='100%' binding="{name:'limitValue'}" validator="{errorMsg:'非法参数',regExp:/^\d+$/}"></div>
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
    <table class='toolbar-table' id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
