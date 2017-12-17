
<%--
	维度定义弹窗
    @author zhy
    @creationTime 2016-07-21 09:58:03
    @modificationTime 2017-03-09 09:51:02
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfDimensionDefDialog-processor.js?version=20170309095102"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfDimensionDefDialog-view.js?version=20170309095102"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfDimensionDefDialog.page_initEvents&&dojo.hitch(pfDimensionDefDialog,pfDimensionDefDialog.page_initEvents)();
				pfDimensionDefDialog.page_load&&dojo.hitch(pfDimensionDefDialog,pfDimensionDefDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_dimensionDef' binding="{store:'tDimensionDef_form'}">
        <table id='form_dimensionDef_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='20%'></col>
                <col width='18%'></col>
                <col width='20%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_dimensionDef_1_tr'>
                    <td align='right' id='name__dimensionDef_label_td' rowSpan='1'>
                        <label id='name__dimensionDef_label'>维度名称：</label>
                    </td>
                    <td colSpan='1' id='name__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name__dimensionDef' maxLength='20' required='true' width='100%' binding="{name:'name'}"></div>
                    </td>
                    <td align='right' id='property__dimensionDef_label_td' rowSpan='1'>
                        <label id='property__dimensionDef_label'>维度属性：</label>
                    </td>
                    <td colSpan='1' id='property__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='property__dimensionDef' maxLength='20' required='true' width='100%' binding="{name:'property'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_dimensionDef_3_tr'>
                    <td align='right' id='rateType__dimensionDef_label_td' rowSpan='1'>
                        <label id='rateType__dimensionDef_label'>精算表类型：</label>
                    </td>
                    <td colSpan='1' id='rateType__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='rateType__dimensionDef' required='true' width='100%' binding="{name:'rateType'}" dataProvider="{store:'ds_rate'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='matchFlag__dimensionDef_label_td' rowSpan='1'>
                        <label id='matchFlag__dimensionDef_label'>匹配标志：</label>
                    </td>
                    <td colSpan='1' id='matchFlag__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='matchFlag__dimensionDef' maxLength='2' required='true' width='100%' binding="{name:'matchFlag'}" dataProvider="{store:'ds_match'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_dimensionDef_5_tr'>
                    <td align='right' id='columnType__dimensionDef_label_td' rowSpan='1'>
                        <label id='columnType__dimensionDef_label'>字段类型：</label>
                    </td>
                    <td colSpan='1' id='columnType__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' disabled='true' id='columnType__dimensionDef' maxLength='20' readOnly='true' required='true' width='100%' binding="{name:'columnType'}" dataProvider="{store:'ds_column'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='returnType__dimensionDef_label_td' rowSpan='1'>
                        <label id='returnType__dimensionDef_label'>返回类型：</label>
                    </td>
                    <td colSpan='1' id='returnType__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' disabled='true' id='returnType__dimensionDef' maxLength='20' readOnly='true' required='true' width='100%' binding="{name:'returnType'}" dataProvider="{store:'ds_return'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_dimensionDef_7_tr'>
                    <td align='right' id='dimensionType__dimensionDef_label_td' rowSpan='1'>
                        <label id='dimensionType__dimensionDef_label'>维度类型：</label>
                    </td>
                    <td colSpan='1' id='dimensionType__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='dimensionType__dimensionDef' maxLength='2' required='true' width='100%' binding="{name:'dimensionType'}" dataProvider="{store:'ds_dimension'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='refValue__dimensionDef_label_td' rowSpan='1'>
                        <label id='refValue__dimensionDef_label'>引用值：</label>
                    </td>
                    <td colSpan='1' id='refValue__dimensionDef_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='refValue__dimensionDef' maxLength='255' required='true' width='100%' binding="{name:'refValue'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='form_dimensionDef_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_dimensionDef_saveButton' label='保存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
