
<%--
	保障责任
    @author neusoft
    @creationTime 2016-07-06 09:31:38
    @modificationTime 2016-11-01 15:41:57
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrest-processor.js?version=20161101154157"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrest-view.js?version=20161101154157"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrest_navigateButton.setViewcContext("pfRiskPrest_navigateButton");
pfRiskPrest_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrest_navigateButton,pfRiskPrest_navigateButton.page_initEvents)();
pfRiskPrest_navigateButton.page_load&&dojo.hitch(pfRiskPrest_navigateButton,pfRiskPrest_navigateButton.page_load)();
pfRiskPrest.page_initEvents&&dojo.hitch(pfRiskPrest,pfRiskPrest.page_initEvents)();
				pfRiskPrest.page_load&&dojo.hitch(pfRiskPrest,pfRiskPrest.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrest" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane_basic' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_basic' binding="{store:'tInsurtypeBasicInf_prest'}">
                            <table id='form_basic_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_basic_1_tr'>
                                        <td align='right' id='insurtypeCode__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeCode__basic_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeCode__basic' maxLength='6' width='100%' binding="{name:'insurtypeCode'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeName__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeName__basic_label'>险种名称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeName__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeName__basic' maxLength='120' width='100%' binding="{name:'insurtypeName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr id='form_basic_3_tr'>
                                        <td align='right' id='verNo__basic_label_td' rowSpan='1'>
                                            <label id='verNo__basic_label'>险种版本：</label>
                                        </td>
                                        <td colSpan='1' id='verNo__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' disabled='true' id='verNo__basic' maxLength='16' width='100%' binding="{name:'verNo'}"></div>
                                        </td>
                                        <td align='right' id='insurtypeAbbr__basic_label_td' rowSpan='1'>
                                            <label id='insurtypeAbbr__basic_label'>险种简称：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeAbbr__basic_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeAbbr__basic' maxLength='90' width='100%' binding="{name:'insurtypeAbbr'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='20%' id='titlePane_prest' title='保障责任定义' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button_PrestAdd' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form_PriceDuty' binding="{store:'tPricingLiabDef_combox'}">
                            <table height='8%' id='form_PriceDuty_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_PriceDuty_0_tr'>
                                        <td align='right' id='pricingLiabCode__PriceDuty_label_td' rowSpan='1'>
                                            <label id='pricingLiabCode__PriceDuty_label'>定价代码：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabCode__PriceDuty_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='procingLiabCode__PriceDuty' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}"></div>
                                        </td>
                                        <td align='right'>
                                            <label id='label1'>定价名称：</label>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.TextBox' id='pricingLiabName' readOnly='true' width='100%'></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='80%' id='titlePane1' title='保障责任列表' width='100%'>
                        <div id='div2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button_PrestDefine' label='给付项定义' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='element' label='要素定义' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_prest' binding="{store:'tProtecLiabDef_prest',rpc:pfRiskPrest.grid_prest_binding_rpc}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_protecLiabCode__prest' label='保障责任代码' name='protecLiabCode' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_protecLiabName__prest' label='保障责任名称' name='protecLiabName' width='30%'></cell>
                                    <cell dataType='string' enable='false' id='cell_protecLiabType__prest' label='保障责任类型' name='protecLiabType' width='30%' decoder="{store:'ds_type_prest'}"></cell>
                                    <cell enable='false' id='cell_name1__prest' label='操作' name='name1' styles='text-align:center' width='10%' formatter='pfRiskPrest.cell_name1__prest_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='140px' id='xdialog_protect' title='保障新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
