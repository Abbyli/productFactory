
<%--
	组合要素弹窗
    @author Administrator
    @creationTime 2016-06-30 16:32:16
    @modificationTime 2017-03-08 16:53:54
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboElementDialog-processor.js?version=20170308165354"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboElementDialog-view.js?version=20170308165354"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboElementDialog.page_initEvents&&dojo.hitch(pfComboElementDialog,pfComboElementDialog.page_initEvents)();
				pfComboElementDialog.page_load&&dojo.hitch(pfComboElementDialog,pfComboElementDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='要素基本信息'>
        <div dojoType='unieap.form.Form' id='form_elementinfo' binding="{store:'tObjSkelement_form'}">
            <table id='form_elementinfo_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='%'></col>
                </colgroup>
                <tbody>
                    <tr id='form_elementinfo_1_tr'>
                        <td align='right' id='name_label_td' rowSpan='1'>
                            <label id='name_label'>要素名称：</label>
                        </td>
                        <td colSpan='1' id='name_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='name_element' maxLength='300' required='true' width='100%' binding="{name:'keyWord'}" decoder="{displayAttr:'name',valueAttr:'property'}" popup="{height:'200px'}"></div>
                        </td>
                        <td align='right' id='keyWord_label_td' rowSpan='1'>
                            <label id='keyWord_label'>关键字：</label>
                        </td>
                        <td colSpan='1' id='keyWord_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='keyWord' maxLength='64' required='true' width='100%' binding="{name:'keyWord'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form_elementinfo_2_tr'>
                        <td align='right' id='isCalRef_label_td' rowSpan='1'>
                            <label id='isCalRef_label'>是否与计算相关：</label>
                        </td>
                        <td colSpan='1' id='isCalRef_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='isCalRef' width='100%' binding="{name:'isCalRef'}" dataProvider="{store:'isOpt'}"></div>
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
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='属性展现信息'>
        <div dojoType='unieap.form.Form' id='form1' binding="{store:'tPropShowDef_form'}">
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
                        <td align='right' id='editorType_label_td' rowSpan='1'>
                            <label id='editorType_label'>编辑器类型：</label>
                        </td>
                        <td colSpan='1' id='editorType_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='editorType' required='true' width='100%' binding="{name:'editorType'}" dataProvider="{store:'editTypeData'}"></div>
                        </td>
                        <td align='right' id='defaultVal_label_td' rowSpan='1'>
                            <label id='defaultVal_label'>默认值：</label>
                        </td>
                        <td colSpan='1' id='defaultVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' class='forDisabled' id='defaultVal' maxLength='128' width='100%' binding="{name:'defaultVal'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_3_tr'>
                        <td align='right' id='required_label_td' rowSpan='1'>
                            <label id='required_label'>是否必填：</label>
                        </td>
                        <td colSpan='1' id='required_td' rowSpan='1'>
                            <div dojoType='unieap.form.RadioButtonGroup' class='forDisabled' cols='2' id='required' labelAlign='right' maxLength='22' width='100%' binding="{name:'required'}" dataProvider="{store:'isEmptyData'}"></div>
                        </td>
                        <td align='right' id='readonly_label_td' rowSpan='1'>
                            <label id='readonly_label'>是否只读：</label>
                        </td>
                        <td colSpan='1' id='readonly_td' rowSpan='1'>
                            <div dojoType='unieap.form.RadioButtonGroup' class='forDisabled' cols='2' id='readonly' labelAlign='right' maxLength='22' width='100%' binding="{name:'readonly'}" dataProvider="{store:'isReadData'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_5_tr'>
                        <td align='right' id='minLength_label_td' rowSpan='1'>
                            <label id='minLength_label'>最小长度：</label>
                        </td>
                        <td colSpan='1' id='minLength_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='minLength' maxLength='22' width='100%' binding="{name:'minLength'}" validator="{errorMsg:'非法参数',regExp:/^\d+$/}"></div>
                        </td>
                        <td align='right' id='maxLength_label_td' rowSpan='1'>
                            <label id='maxLength_label'>最大长度：</label>
                        </td>
                        <td colSpan='1' id='maxLength_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='maxLength' maxLength='22' width='100%' binding="{name:'maxLength'}" validator="{errorMsg:'非法参数',regExp:/^\d+$/}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_7_tr'>
                        <td align='right' id='minVal_label_td' rowSpan='1'>
                            <label id='minVal_label'>最小值：</label>
                        </td>
                        <td colSpan='1' id='minVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='minVal' maxLength='22' width='100%' binding="{name:'minVal'}" validator="{errorMsg:'非法参数',regExp:/^\d+$/}"></div>
                        </td>
                        <td align='right' id='maxVal_label_td' rowSpan='1'>
                            <label id='maxVal_label'>最大值：</label>
                        </td>
                        <td colSpan='1' id='maxVal_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='maxVal' maxLength='22' width='100%' binding="{name:'maxVal'}" validator="{errorMsg:'非法参数',regExp:/^\d+$/}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_9_tr'>
                        <td align='right' id='description_label_td' rowSpan='1'>
                            <label id='description_label'>描述：</label>
                        </td>
                        <td colSpan='1' id='description_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' class='forDisabled' height='100px' id='description' maxLength='3000' width='100%' binding="{name:'description'}"></div>
                        </td>
                        <td align='right' id='dictionary_label_td' rowSpan='1'>
                            <label id='dictionary_label'>数据字典：</label>
                        </td>
                        <td colSpan='1' id='dictionary_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' class='forDisabled' disabled='true' height='100px' id='dictionary' maxLength='3000' width='100%' binding="{name:'dictionary'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <table id='tableLayout1' width='100%'>
        <colgroup>
            <col width='150px'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
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
