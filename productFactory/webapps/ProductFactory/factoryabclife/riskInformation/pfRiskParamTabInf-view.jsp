
<%--
	参数定义
    @author neusoft
    @creationTime 2016-06-30 12:36:11
    @modificationTime 2016-10-13 14:07:34
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskParamTabInf-processor.js?version=20161013140734"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskParamTabInf-view.js?version=20161013140734"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskParamTabInf_navigateButton.setViewcContext("pfRiskParamTabInf_navigateButton");
pfRiskParamTabInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskParamTabInf_navigateButton,pfRiskParamTabInf_navigateButton.page_initEvents)();
pfRiskParamTabInf_navigateButton.page_load&&dojo.hitch(pfRiskParamTabInf_navigateButton,pfRiskParamTabInf_navigateButton.page_load)();
pfRiskParamTabInf.page_initEvents&&dojo.hitch(pfRiskParamTabInf,pfRiskParamTabInf.page_initEvents)();
				pfRiskParamTabInf.page_load&&dojo.hitch(pfRiskParamTabInf,pfRiskParamTabInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskParamTabInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
                <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='保险期间'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='保险期间' width='100%'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insur' binding="{store:'tProductParamDef'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_paramVal__insur' label='保险期间' name='paramVal' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_paramUnit__insur' label='保险期间单位' name='paramUnit' width='30%' decoder="{store:'ds_date'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_paramDesc__insur' label='保险期间描述' name='paramDesc' width='40%'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='交费期间'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='交费期间' width='100%'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_pay' binding="{store:'tProductParamDef'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_paramVal__pay' label='交费期间' name='paramVal' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_paramUnit__pay' label='交费期间单位' name='paramUnit' width='30%' decoder="{store:'ds_date'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_paramDesc__pay' label='交费期间描述' name='paramDesc' width='40%'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.ContentPane' id='tabPane_freq' title='交费频率'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_freq' title='交费频率'>
                        <div dojoType='unieap.form.CheckBoxGroup' cols='6' id='checkBoxGroup1' labelAlign='right' width='50%' dataProvider="{store:'ds_freq'}"></div>
                    </div>
                </div>
                <div dojoType='unieap.layout.ContentPane' id='tabPane_Personnel' title='人员定义'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_Personnel' title='人员定义'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_Personnel' binding="{store:'tInsurtypeCustElemCtrl_Personnel'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_psnnlType__Personnel' label='人员类型' name='psnnlType' width='13%' decoder="{store:'ds_pelType'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_gender__Personnel' label='性别' name='gender' width='9%' decoder="{store:'ds_pelSex'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_applyMinAge__Personnel' label='最小投保年龄' name='applyMinAge' styles='text-align:left' width='13%'></cell>
                                    <cell dataType='string' enable='false' id='cell_applyMinAgeUnit__Personnel' label='最小投保年龄单位' name='applyMinAgeUnit' width='13%' decoder="{store:'ds_pelUnit'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_applyMaxAge__Personnel' label='最大投保年龄' name='applyMaxAge' styles='text-align:left' width='13%'></cell>
                                    <cell dataType='string' enable='false' id='cell_applyMaxAgeUnit__Personnel' label='最大投保年龄单位' name='applyMaxAgeUnit' width='13%' decoder="{store:'ds_pelUnit'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_insurRenewMaxAge__Personnel' label='最大续保年龄' name='insurRenewMaxAge' styles='text-align:left' width='13%' decoder="{store:'INSUR_RENEW_MAX_AGE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurRenewMaxAgeUnit__Personnel' label='最大续保年龄单位' name='insurRenewMaxAgeUnit' width='13%' decoder="{store:'ds_pelUnit'}"></cell>
                                </row>
                            </header>
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
