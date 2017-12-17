
<%--
	
    @author think
    @creationTime 2016-05-17 10:58:16
    @modificationTime 2017-03-24 14:34:41
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfSKElementDialog-processor.js?version=20170324143441"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfSKElementDialog-view.js?version=20170324143441"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfSKElementDialog.page_initEvents&&dojo.hitch(pfSKElementDialog,pfSKElementDialog.page_initEvents)();
				pfSKElementDialog.page_load&&dojo.hitch(pfSKElementDialog,pfSKElementDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='要素基本信息'>
        <div dojoType='unieap.form.Form' id='form_element' binding="{store:'tSkelementDef_form'}">
            <table id='form_element_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='20%'></col>
                    <col width='25%'></col>
                    <col width='20%'></col>
                    <col width='25%'></col>
                    <col width='10%'></col>
                </colgroup>
                <tbody>
                    <tr id='form_element_1_tr'>
                        <td align='right' id='name__element_label_td' rowSpan='1'>
                            <label id='name__element_label'>要素中文名：</label>
                        </td>
                        <td colSpan='1' id='name__element_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='name__element' maxLength='300' required='true' width='100%' binding="{name:'name'}"></div>
                        </td>
                        <td align='right' id='property__element_label_td' rowSpan='1'>
                            <label id='property__element_label'>要素英文名：</label>
                        </td>
                        <td colSpan='1' id='property__element_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='property__element' maxLength='64' required='true' width='100%' binding="{name:'property'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form_element_3_tr'>
                        <td align='right' id='busiType__element_label_td' rowSpan='1'>
                            <label id='busiType__element_label'>业务场景：</label>
                        </td>
                        <td colSpan='1' id='busiType__element_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='busiType__element' maxLength='2' required='true' width='100%' binding="{name:'busiType'}" dataProvider="{store:'ds_busitype'}" popup="{height:'300px'}"></div>
                        </td>
                        <td align='right' id='isCalRef__element_label_td' rowSpan='1'>
                            <label id='isCalRef__element_label'>是否与计算相关：</label>
                        </td>
                        <td colSpan='1' id='isCalRef__element_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='isCalRef__element' required='true' width='100%' binding="{name:'isCalRef'}" dataProvider="{store:'isOpt'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='属性展现信息'>
        <div dojoType='unieap.form.Form' id='form1' binding="{store:'tPropShowDefInit'}">
            <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='15%'></col>
                    <col width='30%'></col>
                    <col width='15%'></col>
                    <col width='30%'></col>
                    <col width='10%'></col>
                </colgroup>
                <tbody>
                    <tr id='form1_1_tr'>
                        <td align='right' id='editorType_label_td' rowSpan='1'>
                            <label id='editorType_label'>编辑器类型：</label>
                        </td>
                        <td colSpan='1' id='editorType_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='editorType' maxLength='64' required='true' width='100%' binding="{name:'editorType'}" dataProvider="{store:'editTypeData'}" popup="{height:'auto'}"></div>
                        </td>
                        <td align='right' id='defaultVal_label_td' rowSpan='1'>
                            <label id='defaultVal_label'>默认值：</label>
                        </td>
                        <td colSpan='1' id='defaultVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='defaultVal' maxLength='128' width='100%' binding="{name:'defaultVal'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_3_tr'>
                        <td align='right' id='required_label_td' rowSpan='1'>
                            <label id='required_label'>是否必填：</label>
                        </td>
                        <td colSpan='1' id='required_td' rowSpan='1'>
                            <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='required' labelAlign='right' maxLength='22' width='100%' binding="{name:'required'}" dataProvider="{store:'isEmptyData'}"></div>
                        </td>
                        <td align='right' id='readonly_label_td' rowSpan='1'>
                            <label id='readonly_label'>是否只读：</label>
                        </td>
                        <td colSpan='1' id='readonly_td' rowSpan='1'>
                            <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='readonly' labelAlign='right' maxLength='22' width='100%' binding="{name:'readonly'}" dataProvider="{store:'isReadData'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_5_tr'>
                        <td align='right' id='minLength_label_td' rowSpan='1'>
                            <label id='minLength_label'>最小长度：</label>
                        </td>
                        <td colSpan='1' id='minLength_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' id='minLength' maxLength='22' width='100%' binding="{name:'minLength'}"></div>
                        </td>
                        <td align='right' id='maxLength_label_td' rowSpan='1'>
                            <label id='maxLength_label'>最大长度：</label>
                        </td>
                        <td colSpan='1' id='maxLength_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' id='maxLength' maxLength='22' width='100%' binding="{name:'maxLength'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_7_tr'>
                        <td align='right' id='minVal_label_td' rowSpan='1'>
                            <label id='minVal_label'>最小值：</label>
                        </td>
                        <td colSpan='1' id='minVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' id='minVal' maxLength='22' width='100%' binding="{name:'minVal'}"></div>
                        </td>
                        <td align='right' id='maxVal_label_td' rowSpan='1'>
                            <label id='maxVal_label'>最大值：</label>
                        </td>
                        <td colSpan='1' id='maxVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' id='maxVal' maxLength='22' width='100%' binding="{name:'maxVal'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_9_tr'>
                        <td align='right' id='description_label_td' rowSpan='1'>
                            <label id='description_label'>描述：</label>
                        </td>
                        <td colSpan='1' id='description_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' id='description' maxLength='3000' width='100%' binding="{name:'description'}"></div>
                        </td>
                        <td align='right' id='dictionary_label_td' rowSpan='1'>
                            <label id='dictionary_label'>数据字典：</label>
                        </td>
                        <td colSpan='1' id='dictionary_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' id='dictionary' maxLength='3000' width='100%' binding="{name:'dictionary'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <table class='toolbar-table' id='form_element_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_element_saveButton' label='保 存' width='100px' style='border:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
