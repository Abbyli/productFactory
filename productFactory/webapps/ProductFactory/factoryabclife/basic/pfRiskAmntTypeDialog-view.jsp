
<%--
	
    @author Administrator
    @creationTime 2016-07-20 09:24:23
    @modificationTime 2016-09-28 16:22:39
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRiskAmntTypeDialog-processor.js?version=20160928162239"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRiskAmntTypeDialog-view.js?version=20160928162239"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAmntTypeDialog.page_initEvents&&dojo.hitch(pfRiskAmntTypeDialog,pfRiskAmntTypeDialog.page_initEvents)();
				pfRiskAmntTypeDialog.page_load&&dojo.hitch(pfRiskAmntTypeDialog,pfRiskAmntTypeDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'tRiskamntTypeDef_form'}">
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
                    <td align='right' id='riskamntName_label_td' rowSpan='1'>
                        <label id='riskamntName_label'>风险保额名称：</label>
                    </td>
                    <td colSpan='1' id='riskamntName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='riskamntName' maxLength='100' width='100%' binding="{name:'riskamntName'}"></div>
                    </td>
                    <td align='right' id='riskamntType_label_td' rowSpan='1'>
                        <label id='riskamntType_label'>风险保额类型：</label>
                    </td>
                    <td colSpan='1' id='riskamntType_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='riskamntType' maxLength='6' width='100%' binding="{name:'riskamntType'}"></div>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保&nbsp存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
