
<%--
	
    @author neusoft
    @creationTime 2016-07-20 11:35:28
    @modificationTime 2016-11-03 14:32:00
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRelationDialog-processor.js?version=20161103143200"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRelationDialog-view.js?version=20161103143200"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRelationDialog.page_initEvents&&dojo.hitch(pfRelationDialog,pfRelationDialog.page_initEvents)();
				pfRelationDialog.page_load&&dojo.hitch(pfRelationDialog,pfRelationDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_relation' binding="{store:'tRelationDef_addRelation'}">
        <table id='form_relation_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='20%'></col>
                <col width='25%'></col>
                <col width='20%'></col>
                <col width='25%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form_relation_1_tr'>
                    <td align='right' id='name__relation_label_td' rowSpan='1'>
                        <label id='name__relation_label'>相关性名称：</label>
                    </td>
                    <td colSpan='1' id='name__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name__relation' maxLength='200' width='100%' binding="{name:'name'}"></div>
                    </td>
                    <td align='right' id='property__relation_label_td' rowSpan='1'>
                        <label id='property__relation_label'>相关性属性：</label>
                    </td>
                    <td colSpan='1' id='property__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='property__relation' maxLength='50' width='100%' binding="{name:'property'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_relation_3_tr'>
                    <td align='right' id='relationType__relation_label_td' rowSpan='1'>
                        <label id='relationType__relation_label'>相关性类型：</label>
                    </td>
                    <td colSpan='1' id='relationType__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='relationType__relation' maxLength='2' width='100%' binding="{name:'relationType'}" dataProvider="{store:'ds_relationType'}"></div>
                    </td>
                    <td align='right' id='returnType__relation_label_td' rowSpan='1'>
                        <label id='returnType__relation_label'>返回类型：</label>
                    </td>
                    <td colSpan='1' id='returnType__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='returnType__relation' maxLength='20' width='100%' binding="{name:'returnType'}" dataProvider="{store:'ds_returnType'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_relation_5_tr'>
                    <td align='right' id='refValue__relation_label_td' rowSpan='1'>
                        <label id='refValue__relation_label'>引用值：</label>
                    </td>
                    <td colSpan='1' id='refValue__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='refValue__relation' maxLength='255' width='100%' binding="{name:'refValue'}"></div>
                    </td>
                    <td align='right' id='busiType__relation_label_td' rowSpan='1'>
                        <label id='busiType__relation_label'>业务分类：</label>
                    </td>
                    <td colSpan='1' id='busiType__relation_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='busiType__relation' maxLength='2' width='100%' binding="{name:'busiType'}"></div>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
