
<%--
	
    @author Administrator
    @creationTime 2016-08-25 16:06:47
    @modificationTime 2016-08-25 17:15:58
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/test-processor.js?version=20160825171558"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/test-view.js?version=20160825171558"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				test.page_initEvents&&dojo.hitch(test,test.page_initEvents)();
				test.page_load&&dojo.hitch(test,test.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieapx.form.FormList' id='formList1' binding="{store:'policyDTO'}">
        <div dojoType='unieap.form.Form' id='form1'>
            <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='13%'></col>
                    <col width='20%'></col>
                    <col width='13%'></col>
                    <col width='20%'></col>
                    <col width='13%'></col>
                    <col width='20%'></col>
                </colgroup>
                <tbody>
                    <tr id='form1_2_tr'>
                        <td id='NewColumn1_label_td' rowSpan='1'>
                            <label id='NewColumn1_label'>NewColumnLabel1</label>
                        </td>
                        <td colSpan='1' id='NewColumn1_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='NewColumn1' width='100%' binding="{name:'prem'}"></div>
                        </td>
                        <td id='NewColumn2_label_td' rowSpan='1'>
                            <label id='NewColumn2_label'>NewColumnLabel2</label>
                        </td>
                        <td colSpan='1' id='NewColumn2_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='NewColumn2' width='100%' binding="{name:'amnt'}"></div>
                        </td>
                        <td id='NewColumn3_label_td' rowSpan='1'>
                            <label id='NewColumn3_label'>NewColumnLabel3</label>
                        </td>
                        <td colSpan='1' id='NewColumn3_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='NewColumn3' width='100%' binding="{name:'n'}"></div>
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
                    <td>
                        <div dojoType='unieap.form.Button' id='button2' label='del' onClick='test.button2_onClick'></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='tableLayout1'>
        <colgroup>
            <col width='150px'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
                <td>
                    <div dojoType='unieap.form.Button' id='button1' label='add'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
