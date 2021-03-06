
<%--
	要素定义穿透新增修改
    @author Administrator
    @creationTime 2016-06-30 16:32:16
    @modificationTime 2017-03-29 13:50:19
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestElementShow-processor.js?version=20170329135019"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestElementShow-view.js?version=20170329135019"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestElementShow_navigateButton.setViewcContext("pfRiskPrestElementShow_navigateButton");
pfRiskPrestElementShow_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrestElementShow_navigateButton,pfRiskPrestElementShow_navigateButton.page_initEvents)();
pfRiskPrestElementShow_navigateButton.page_load&&dojo.hitch(pfRiskPrestElementShow_navigateButton,pfRiskPrestElementShow_navigateButton.page_load)();
pfRiskPrestElementShow.page_initEvents&&dojo.hitch(pfRiskPrestElementShow,pfRiskPrestElementShow.page_initEvents)();
				pfRiskPrestElementShow.page_load&&dojo.hitch(pfRiskPrestElementShow,pfRiskPrestElementShow.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrestElementShow" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='新增要素' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='save' label='保&nbsp存' width='100px'></div>
                </div>
                <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
                    <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='要素属性配置'>
                        <div dojoType='unieap.form.FieldSet' id='fieldset1' title='要素基本信息'>
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
                                                <div dojoType='unieap.form.ComboBox' id='name_element' maxLength='300' width='100%' binding="{name:'keyWord'}" decoder="{displayAttr:'name',valueAttr:'property'}" popup="{height:'200px'}"></div>
                                            </td>
                                            <td align='right' id='keyWord_label_td' rowSpan='1'>
                                                <label id='keyWord_label'>关键字：</label>
                                            </td>
                                            <td colSpan='1' id='keyWord_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='keyWord' maxLength='64' width='100%' binding="{name:'keyWord'}"></div>
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
                        <div dojoType='unieap.form.FieldSet' id='fieldset2' title='属性展现信息'>
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
                                                <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='minLength' maxLength='22' width='100%' binding="{name:'minLength'}"></div>
                                            </td>
                                            <td align='right' id='maxLength_label_td' rowSpan='1'>
                                                <label id='maxLength_label'>最大长度：</label>
                                            </td>
                                            <td colSpan='1' id='maxLength_td' rowSpan='1'>
                                                <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='maxLength' maxLength='22' width='100%' binding="{name:'maxLength'}"></div>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr id='form1_7_tr'>
                                            <td align='right' id='minVal_label_td' rowSpan='1'>
                                                <label id='minVal_label'>最小值：</label>
                                            </td>
                                            <td colSpan='1' id='minVal_td' rowSpan='1'>
                                                <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='minVal' maxLength='22' width='100%' binding="{name:'minVal'}"></div>
                                            </td>
                                            <td align='right' id='maxVal_label_td' rowSpan='1'>
                                                <label id='maxVal_label'>最大值：</label>
                                            </td>
                                            <td colSpan='1' id='maxVal_td' rowSpan='1'>
                                                <div dojoType='unieap.form.NumberTextBox' class='forDisabled' id='maxVal' maxLength='22' width='100%' binding="{name:'maxVal'}"></div>
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
                    </div>
                    <div dojoType='unieap.layout.ContentPane' hidden='true' id='tabPane2' title='onLoad事件'>
                    </div>
                    <div dojoType='unieap.layout.ContentPane' hidden='true' id='tabPane3' title='onChange事件'>
                    </div>
                    <div dojoType='unieap.layout.ContentPane' hidden='true' id='tabPane4' title='onBlur事件'>
                    </div>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
