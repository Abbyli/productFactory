
<%--
	组合参数
    @author Administrator
    @creationTime 2016-11-16 11:30:37
    @modificationTime 2016-12-27 14:48:48
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboParam-processor.js?version=20161227144848"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboParam-view.js?version=20161227144848"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboParam_navigateButton.setViewcContext("pfComboParam_navigateButton");
pfComboParam_navigateButton.page_initEvents&&dojo.hitch(pfComboParam_navigateButton,pfComboParam_navigateButton.page_initEvents)();
pfComboParam_navigateButton.page_load&&dojo.hitch(pfComboParam_navigateButton,pfComboParam_navigateButton.page_load)();
pfComboParam.page_initEvents&&dojo.hitch(pfComboParam,pfComboParam.page_initEvents)();
				pfComboParam.page_load&&dojo.hitch(pfComboParam,pfComboParam.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/comboInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboParam" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1'>
                        <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_param_form'}">
                            <table id='form_comboInf_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_comboInf_1_tr'>
                                        <td align='right' id='comboCode_label_td' rowSpan='1'>
                                            <label id='comboCode_label'>组合编码：</label>
                                        </td>
                                        <td colSpan='1' id='comboCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' readOnly='true' width='100%' binding="{name:'comboCode'}"></div>
                                        </td>
                                        <td align='right' id='comboName_label_td' rowSpan='1'>
                                            <label id='comboName_label'>组合名称：</label>
                                        </td>
                                        <td colSpan='1' id='comboName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='comboName' maxLength='120' readOnly='true' width='100%' binding="{name:'comboName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TabContainer' id='tabContainer1'>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='保险期间'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insur' binding="{store:'tProductParamDef_grid_insur'}" views="{rowBar:true,rowNumber:true}">
                                    <toolbar paging="{userPageSize:false}">
                                    </toolbar>
                                    <header>
                                        <row>
                                            <cell dataType='number' enable='false' id='cell_paramVal' label='保险期间' name='paramVal' width='30%'></cell>
                                            <cell dataType='string' enable='false' id='cell_paramUnit' label='保险期间单位' name='paramUnit' width='30%' decoder="{store:'ds_dataUnit'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_paramDesc' label='保险期间描述' name='paramDesc' width='40%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='交费期间'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' width='100%'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_payEnd' binding="{store:'tProductParamDef_grid_payEnd'}" views="{rowBar:true,rowNumber:true}">
                                    <toolbar>
                                    </toolbar>
                                    <header>
                                        <row>
                                            <cell dataType='number' enable='false' id='cell_paramVal' label='交费期间' name='paramVal' width='30%'></cell>
                                            <cell dataType='string' enable='false' id='cell_paramUnit' label='交费期间单位' name='paramUnit' width='30%' decoder="{store:'ds_dataUnit'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_paramDesc' label='交费期间描述' name='paramDesc' width='40%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='交费频率'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane4' width='100%'>
                                <div dojoType='unieap.form.CheckBoxGroup' cols='10' disabled='true' id='checkBoxGroup1' labelAlign='right' width='100%' dataProvider="{store:'ds_freq'}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
