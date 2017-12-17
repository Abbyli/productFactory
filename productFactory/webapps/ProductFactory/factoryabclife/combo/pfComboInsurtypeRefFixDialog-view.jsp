
<%--
	组合险种要素关系固定值
    @author Administrator
    @creationTime 2016-11-21 10:17:01
    @modificationTime 2017-01-05 11:33:33
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboInsurtypeRefFixDialog-processor.js?version=20170105113333"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboInsurtypeRefFixDialog-view.js?version=20170105113333"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboInsurtypeRefFixDialog.page_initEvents&&dojo.hitch(pfComboInsurtypeRefFixDialog,pfComboInsurtypeRefFixDialog.page_initEvents)();
				pfComboInsurtypeRefFixDialog.page_load&&dojo.hitch(pfComboInsurtypeRefFixDialog,pfComboInsurtypeRefFixDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_fix' binding="{store:'tComboInsurtypeElemRel_setFix'}">
        <table id='form_fix_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='30%'></col>
                <col width='60%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form_fix_0_tr'>
                    <td align='right' id='fixVal_label_td' rowSpan='1'>
                        <label id='fixVal_label'>固定值：</label>
                    </td>
                    <td colSpan='1' id='fixVal_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' hasDefault='true' id='fixVal' maxLength='16' width='100%' binding="{name:'fixVal'}" decoder="{displayAttr:'paramDesc',valueAttr:'paramUnit'}" popup="{height:'200px'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form_fix_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='save' label='保&nbsp;存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
