
<%--
	责任限额

    @author Administrator
    @creationTime 2016-07-26 10:00:58
    @modificationTime 2016-10-14 11:17:56
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskLiabLimitInf-processor.js?version=20161014111756"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskLiabLimitInf-view.js?version=20161014111756"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskLiabLimitInf_navigateButton.setViewcContext("pfRiskLiabLimitInf_navigateButton");
pfRiskLiabLimitInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskLiabLimitInf_navigateButton,pfRiskLiabLimitInf_navigateButton.page_initEvents)();
pfRiskLiabLimitInf_navigateButton.page_load&&dojo.hitch(pfRiskLiabLimitInf_navigateButton,pfRiskLiabLimitInf_navigateButton.page_load)();
pfRiskLiabLimitInf.page_initEvents&&dojo.hitch(pfRiskLiabLimitInf,pfRiskLiabLimitInf.page_initEvents)();
				pfRiskLiabLimitInf.page_load&&dojo.hitch(pfRiskLiabLimitInf,pfRiskLiabLimitInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskLiabLimitInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='定价责任' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_pricingLiabDef' binding="{store:'tPricingLiabDef_liab_limit'}">
                            <table id='form_pricingLiabDef_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_pricingLiabDef_1_tr'>
                                        <td align='right' id='pricingLiabId_label_td' rowSpan='1'>
                                            <label id='pricingLiabId_label'>定价代码：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabId_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='pricingLiabId' maxLength='16' width='100%' binding="{name:'pricingLiabId'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}" popup="{height:'150px'}"></div>
                                        </td>
                                        <td align='right' id='pricingLiabName_label_td' rowSpan='1'>
                                            <label id='pricingLiabName_label'>定价名称：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='pricingLiabName' maxLength='120' readOnly='true' width='100%' binding="{name:'pricingLiabName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane3' title='保障责任' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_protecLiabDef' binding="{store:'tProtecLiabDef_liab_limit'}">
                            <table id='form_protecLiabDef_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_protecLiabDef_1_tr'>
                                        <td align='right' id='protecLiabId__protecLiabDef_label_td' rowSpan='1'>
                                            <label id='protecLiabId__protecLiabDef_label'>保障代码：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabId__protecLiabDef_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='protecLiabId__protecLiabDef' maxLength='16' width='100%' binding="{name:'protecLiabId'}" decoder="{displayAttr:'protecLiabCode',valueAttr:'protecLiabId'}" popup="{height:'150px'}"></div>
                                        </td>
                                        <td align='right' id='protecLiabName__protecLiabDef_label_td' rowSpan='1'>
                                            <label id='protecLiabName__protecLiabDef_label'>保障名称：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabName__protecLiabDef_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='protecLiabName__protecLiabDef' maxLength='120' readOnly='true' width='100%' binding="{name:'protecLiabName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1'>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='限&nbsp;&nbsp;额'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='50%' id='titlePane4'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_1' binding="{store:'tLiabLimit_grid_limit'}" selection="{selectType:'single',onAfterSelect:pfRiskLiabLimitInf.grid_limit_1_selection_onAfterSelect}" views="{rowBar:true,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='50%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_refProtecLiabCode' label='相关保障责任' name='refProtecLiabCode' width='50%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='50%' id='titlePane5'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_formula1' binding="{store:'tObjFormula_grid_limit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='50%'></cell>
                                            <cell dataType='string' enable='false' id='cell_description' label='公式描述' name='description' width='50%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='限&nbsp;&nbsp;天'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane6'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_2' binding="{store:'tLiabLimit_grid_limit2'}" selection="{selectType:'none',onAfterSelect:pfRiskLiabLimitInf.grid_limit_2_selection_onAfterSelect}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='30%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_limitTimeType' label='适用期间' name='limitTimeType' width='30%' decoder="{store:'ds_limit_time'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_limitValue' label='天数' name='limitValue' width='40%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='限&nbsp;&nbsp;次'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane8'>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_3' binding="{store:'tLiabLimit_grid_limit3'}" selection="{selectType:'none',onAfterSelect:pfRiskLiabLimitInf.grid_limit_3_selection_onAfterSelect}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='30%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_limitTimeType' label='适用期间' name='limitTimeType' width='30%' decoder="{store:'ds_limit_time'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_limitValue' label='次数' name='limitValue' width='40%'></cell>
                                        </row>
                                    </header>
                                </div>
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
