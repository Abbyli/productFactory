
<%--
	责任限额

    @author Administrator
    @creationTime 2016-07-26 10:00:58
    @modificationTime 2017-01-18 10:39:24
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimit-processor.js?version=20170118103924"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimit-view.js?version=20170118103924"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskLiabLimit_navigateButton.setViewcContext("pfRiskLiabLimit_navigateButton");
pfRiskLiabLimit_navigateButton.page_initEvents&&dojo.hitch(pfRiskLiabLimit_navigateButton,pfRiskLiabLimit_navigateButton.page_initEvents)();
pfRiskLiabLimit_navigateButton.page_load&&dojo.hitch(pfRiskLiabLimit_navigateButton,pfRiskLiabLimit_navigateButton.page_load)();
pfRiskLiabLimit.page_initEvents&&dojo.hitch(pfRiskLiabLimit,pfRiskLiabLimit.page_initEvents)();
				pfRiskLiabLimit.page_load&&dojo.hitch(pfRiskLiabLimit,pfRiskLiabLimit.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' height='140px' id='addDialog1' title='新增限额' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskLiabLimitDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='140px' id='updateDialog1' title='修改限额' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskLiabLimitDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='addFormula' title='新增算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskLiabLimit" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_liab_limit'}">
                            <table id='form_insurtypebasicinf_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_insurtypebasicinf_1_tr'>
                                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                            <label id='insurtypeCode_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                                            <label id='insurtypeName_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeName' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_insurtypebasicinf_3_tr'>
                                        <td align='right' id='verNo_label_td' rowSpan='1'>
                                            <label id='verNo_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='verNo' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                                <div id='div1' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add1' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_1' binding="{store:'tLiabLimit_grid_limit'}" selection="{selectType:'single',onAfterSelect:pfRiskLiabLimit.grid_limit_1_selection_onAfterSelect}" views="{rowBar:true,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='45%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_refProtecLiabCode' label='相关保障责任' name='refProtecLiabCode' width='45%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell enable='false' id='cell_control1' label='操作' name='control1' width='10%' formatter='pfRiskLiabLimit.cell_control_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='50%' id='titlePane5'>
                                <div id='div2' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='formula1' label='新增算法' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_formula1' binding="{store:'tObjFormula_grid_limit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='45%'></cell>
                                            <cell dataType='string' enable='false' id='cell_description' label='公式描述' name='description' width='45%'></cell>
                                            <cell enable='false' id='cell_controlformula1' label='操作' name='controlformula1' width='10%' formatter='pfRiskLiabLimit.cell_controlformula1_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='限&nbsp;&nbsp;天'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane6'>
                                <div id='div3' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add2' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_2' binding="{store:'tLiabLimit_grid_limit2'}" selection="{selectType:'none',onAfterSelect:pfRiskLiabLimit.grid_limit_2_selection_onAfterSelect}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='30%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_limitTimeType' label='适用期间' name='limitTimeType' width='30%' decoder="{store:'ds_limit_time'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_limitValue' label='天数' name='limitValue' width='30%'></cell>
                                            <cell enable='false' id='cell_control2' label='操作' name='control2' width='10%' formatter='pfRiskLiabLimit.cell_control2_formatter'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='限&nbsp;&nbsp;次'>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane8'>
                                <div id='div5' type='buttons'>
                                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add3' label='新&nbsp增' width='100px'></div>
                                </div>
                                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_limit_3' binding="{store:'tLiabLimit_grid_limit3'}" selection="{selectType:'none',onAfterSelect:pfRiskLiabLimit.grid_limit_3_selection_onAfterSelect}" views="{rowBar:false,rowNumber:false}">
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_protecLiabCode' label='适用保障责任' name='protecLiabCode' width='30%' displayFormatter="{declaredClass:'unieap.myFormatter'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_limitTimeType' label='适用期间' name='limitTimeType' width='30%' decoder="{store:'ds_limit_time'}"></cell>
                                            <cell dataType='number' enable='false' id='cell_limitValue' label='次数' name='limitValue' width='30%'></cell>
                                            <cell enable='false' id='cell_control3' label='操作' name='control3' width='10%' formatter='pfRiskLiabLimit.cell_control3_formatter'></cell>
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
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='updateFormula1' title='修改算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='140px' id='addDialog2' title='新增限天' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskLiabLimitDialog2_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='140px' id='updateDialog2' title='修改限天' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskLiabLimitDialog2_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
