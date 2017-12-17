
<%--
	参数定义弹窗
    @author neusoft
    @creationTime 2016-06-27 10:57:25
    @modificationTime 2016-09-28 16:50:10
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamDialog-processor.js?version=20160928165010"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamDialog-view.js?version=20160928165010"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskParamDialog.page_initEvents&&dojo.hitch(pfRiskParamDialog,pfRiskParamDialog.page_initEvents)();
				pfRiskParamDialog.page_load&&dojo.hitch(pfRiskParamDialog,pfRiskParamDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'tProductParamDef'}">
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
                    <td align='right' id='paramVal_label_td' rowSpan='1'>
                        <label id='paramVal_label'>期间：</label>
                    </td>
                    <td colSpan='1' id='paramVal_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='paramVal' maxLength='40' required='true' width='100%' binding="{name:'paramVal'}" validator="{errorMsg:'数据不合法',regExp:/^[0-9]{0,4}$/}"></div>
                    </td>
                    <td align='right' id='paramUnit_label_td' rowSpan='1'>
                        <label id='paramUnit_label'>期间单位：</label>
                    </td>
                    <td colSpan='1' id='paramUnit_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='paramUnit' required='true' width='100%' binding="{name:'paramUnit'}" dataProvider="{store:'ds_type'}" popup="{height:'auto'}"></div>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
