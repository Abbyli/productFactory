
<%--
	参数定义
    @author neusoft
    @creationTime 2016-06-30 12:36:11
    @modificationTime 2017-03-01 16:17:04
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamTab-processor.js?version=20170301161704"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamTab-view.js?version=20170301161704"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskParamTab_navigateButton.setViewcContext("pfRiskParamTab_navigateButton");
pfRiskParamTab_navigateButton.page_initEvents&&dojo.hitch(pfRiskParamTab_navigateButton,pfRiskParamTab_navigateButton.page_initEvents)();
pfRiskParamTab_navigateButton.page_load&&dojo.hitch(pfRiskParamTab_navigateButton,pfRiskParamTab_navigateButton.page_load)();
pfRiskParamTab.page_initEvents&&dojo.hitch(pfRiskParamTab,pfRiskParamTab.page_initEvents)();
				pfRiskParamTab.page_load&&dojo.hitch(pfRiskParamTab,pfRiskParamTab.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskParamTab" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer3'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane6'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane3' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insur' binding="{store:'tInsurtypeBasicInf'}">
                            <table id='form_insur_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_insur_1_tr'>
                                        <td align='right' id='insurtypeCode__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeCode__insur_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode__insur' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeName__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeName__insur_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeName__insur' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_insur_3_tr'>
                                        <td align='right' id='verNo__insur_label_td' rowSpan='1'>
                                            <label id='verNo__insur_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='verNo__insur' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr__insur_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr__insur_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr__insur_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__insur' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane5'>
                    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='保险期间'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='保险期间' width='100%'>
                                <div id='div1' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insur' binding="{store:'tProductParamDef'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_paramVal__insur' label='保险期间' name='paramVal' width='30%'></cell>
                                            <cell dataType='string' enable='false' id='cell_paramUnit__insur' label='保险期间单位' name='paramUnit' width='30%' decoder="{store:'ds_date'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_paramDesc__insur' label='保险期间描述' name='paramDesc' width='30%'></cell>
                                            <cell enable='false' id='cell_name1__insur' label='操作' name='name1' width='10%' formatter='pfRiskParamTab.cell_name1__insur_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='交费期间'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='交费期间' width='100%'>
                                <div id='div2' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button2' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_pay' binding="{store:'tProductParamDef'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_paramVal__pay' label='交费期间' name='paramVal' width='30%'></cell>
                                            <cell dataType='string' enable='false' id='cell_paramUnit__pay' label='交费期间单位' name='paramUnit' width='30%' decoder="{store:'ds_date'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_paramDesc__pay' label='交费期间描述' name='paramDesc' width='30%'></cell>
                                            <cell enable='false' id='cell_name1__pay' label='操作' name='name1' width='10%' formatter='pfRiskParamTab.cell_name1__pay_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane_freq' title='交费频率'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_freq' title='交费频率'>
                                <div id='div3' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button_freq' label='保&nbsp存' width='100px'></div>
                                </div>
                                <div dojoType='unieap.form.CheckBoxGroup' cols='6' id='checkBoxGroup1' labelAlign='right' width='50%' dataProvider="{store:'ds_freq'}"></div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane_Personnel' title='人员定义'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_Personnel' title='人员定义'>
                                <div id='div4' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button3' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_Personnel' binding="{store:'tInsurtypeCustElemCtrl_Personnel'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_psnnlType__Personnel' label='人员类型' name='psnnlType' width='12%' decoder="{store:'ds_pelType'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_gender__Personnel' label='性别' name='gender' width='6%' decoder="{store:'ds_pelSex'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_applyMinAge__Personnel' label='最小投保年龄' name='applyMinAge' styles='text-align:left' width='12%'></cell>
                                            <cell dataType='string' enable='false' id='cell_applyMinAgeUnit__Personnel' label='最小投保年龄单位' name='applyMinAgeUnit' width='12%' decoder="{store:'ds_pelUnit'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_applyMaxAge__Personnel' label='最大投保年龄' name='applyMaxAge' styles='text-align:left' width='12%'></cell>
                                            <cell dataType='string' enable='false' id='cell_applyMaxAgeUnit__Personnel' label='最大投保年龄单位' name='applyMaxAgeUnit' width='12%' decoder="{store:'ds_pelUnit'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_insurRenewMaxAge__Personnel' label='最大续保年龄' name='insurRenewMaxAge' styles='text-align:left' width='12%' decoder="{store:'INSUR_RENEW_MAX_AGE'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_insurRenewMaxAgeUnit__Personnel' label='最大续保年龄单位' name='insurRenewMaxAgeUnit' width='12%' decoder="{store:'ds_pelUnit'}"></cell>
                                            <cell enable='false' id='cell_name1__Personnel' label='操作' name='name1' width='10%' formatter='pfRiskParamTab.cell_name1__Personnel_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane5' title='红利领取方式'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane5' title='交费频率'>
                                <div id='div5' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button5' label='保&nbsp存' width='100px'></div>
                                </div>
                                <div dojoType='unieap.form.CheckBoxGroup' id='checkBoxGroup5' labelAlign='right' width='50%' dataProvider="{store:'ds_divCol'}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='108px' id='add_insur' title='保险期间新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='108px' id='add_pay' title='交费期间新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='108px' id='update_insur' title='保险期间修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='108px' id='update_pay' title='交费期间修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='200px' id='add_personnel' title='人员定义新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamPersonnelDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='200px' id='update_personnel' title='人员定义修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskParamPersonnelDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
