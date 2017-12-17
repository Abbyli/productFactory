
<%--
	利率管理
    @author Neusoft
    @creationTime 2016-11-02 15:07:19
    @modificationTime 2017-03-03 17:56:43
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
	   	 
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/navigateButton.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRate-processor.js?version=20170303175643"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRate-view.js?version=20170303175643"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRate.page_initEvents&&dojo.hitch(pFInterestRate,pFInterestRate.page_initEvents)();
				pFInterestRate.page_load&&dojo.hitch(pFInterestRate,pFInterestRate.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1' width='100%'>
        <div dojoType='unieap.layout.ContentPane' id='tabPane1' title='万能结算利率'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1_1'>
                    <div dojoType='unieap.layout.TitlePane' id='titlePane1_1'>
                        <div id='div1_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select1_1' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form1_1' binding="{store:'form_tUnivrslSettlIntrate'}">
                            <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form1_0_tr'>
                                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                            <label id='insurtypeCode_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='20' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1_2' title='利率信息'>
                        <div id='div1_2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='add1_1' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1_1' binding="{store:'in_tUnivrslSettlIntrate',rpc:pFInterestRate.grid1_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='7%'></cell>
                                    <cell dataType='string' enable='false' id='cell_accCode' label='账户编码' name='accCode' width='8%'></cell>
                                    <cell dataType='number' enable='false' id='cell_accountingYear' label='会计年度' name='accountingYear' width='8%'></cell>
                                    <cell dataType='string' enable='false' id='cell_intrateType' label='利率类型' name='intrateType' width='8%' decoder="{store:'intrateType'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_intrateShouldAnnounceDate' label='利率应公布日期' name='intrateShouldAnnounceDate' width='10%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_intrateActualAnnounceDate' label='利率实际公布日期' name='intrateActualAnnounceDate' width='11%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_intrateApplicationStartDate' label='利率应用开始日期' name='intrateApplicationStartDate' width='11%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_intrateApplicationEndDate' label='利率应用结束日期' name='intrateApplicationEndDate' width='11%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_settlDate' label='结算日期' name='settlDate' width='10%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_intrate' label='利率' name='intrate' width='8%'></cell>
                                    <cell enable='false' id='cell_operation1' label='操作' name='operation' width='8%' formatter='pFInterestRate.cell_operation1_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='生存金结息利率'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer2'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2_1'>
                    <div dojoType='unieap.layout.TitlePane' id='titlePane2_1'>
                        <div id='div2_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select2_1' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form2_1' binding="{store:'form_tSurvvBeneAccumIntbeIntra'}">
                            <table id='form2_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form1_0_tr'>
                                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                            <label id='insurtypeCode_label2'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode2' maxLength='8' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2_2' title='利率信息'>
                        <div id='div2_2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='add2_1' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid2' binding="{store:'in_tSurvvBeneAccumIntbeIntra',rpc:pFInterestRate.grid2_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar>
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='20%'></cell>
                                    <cell dataType='date' enable='false' id='cell_startDate' label='开始日期' name='startDate' width='25%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_endDate' label='结束日期' name='endDate' width='25%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_intrate' label='利率' name='intrate' width='20%'></cell>
                                    <cell enable='false' id='cell_operation2' label='操作' name='operation' width='10%' formatter='pFInterestRate.cell_operation2_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='贷款利率'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer3'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane3_1'>
                    <div dojoType='unieap.layout.TitlePane' id='titlePane3_1'>
                        <div id='div3_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select3_1' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form3_1' binding="{store:'from_tLoanAutoPayIntrate'}">
                            <table id='form3_1_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form3_1_0_tr'>
                                        <td align='right' id='announceDate_label_td' rowSpan='1'>
                                            <label id='announceDate_label'>公布日期：</label>
                                        </td>
                                        <td colSpan='1' id='announceDate_td' rowSpan='1'>
                                            <div dojoType='unieap.form.DateTextBox' id='announceDate' width='100%' binding="{name:'announceDate'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane3_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3_2' title='利率信息'>
                        <div id='div3_2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='add3_1' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid3_1' binding="{store:'in_tLoanAutoPayIntrate',rpc:pFInterestRate.grid3_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='number' enable='false' id='cell_period' label='期间' name='period' width='15%'></cell>
                                    <cell dataType='string' enable='false' id='cell_periodFlg' label='期间标记' name='periodFlg' width='10%' decoder="{store:'periodFlg'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_intrateType' label='利率类型' name='intrateType' width='10%' decoder="{store:'intrateType3'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_depositLoanFlg' label='存贷标记' name='depositLoanFlg' width='15%' decoder="{store:'depositLoanFlg'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_announceDate' label='公布日期' name='announceDate' width='15%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='date' enable='false' id='cell_endDate' label='止期' name='endDate' width='15%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_intrate' label='利率' name='intrate' width='10%' decoder="{store:'INTRATE'}"></cell>
                                    <cell enable='false' id='cell_operation3' label='操作' name='operation3' width='10%' formatter='pFInterestRate.cell_operation3_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane4' title='红利参数'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer4'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane4_1'>
                    <div dojoType='unieap.layout.TitlePane' id='titlePane4_1'>
                        <div id='div4_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select4_1' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form4_1' binding="{store:'form_tDividParam'}">
                            <table id='form4_1_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form4_1_0_tr'>
                                        <td align='right' id='accountingYear_label_td' rowSpan='1'>
                                            <label id='accountingYear_label'>会计年度：</label>
                                        </td>
                                        <td colSpan='1' id='accountingYear_td' rowSpan='1'>
                                            <div dojoType='unieap.form.NumberTextBox' id='accountingYear' maxLength='22' width='100%' binding="{name:'accountingYear'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane4_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane4_2' title='利率信息'>
                        <div id='div4_2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='add4_1' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid4_1' binding="{store:'in_tDividParam',rpc:pFInterestRate.grid4_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='number' enable='false' id='cell_accountingYear' label='会计年度' name='accountingYear' width='10%'></cell>
                                    <cell dataType='number' enable='false' id='cell_payoutDividAmt' label='派发红利金额' name='payoutDividAmt' width='15%'></cell>
                                    <cell dataType='date' enable='false' id='cell_dividAnnounceDate' label='红利公布日' name='dividAnnounceDate' width='15%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_dividBizSurplus' label='分红业务盈余' name='dividBizSurplus' width='15%'></cell>
                                    <cell dataType='number' enable='false' id='cell_allocablSurplus' label='可分配盈余' name='allocablSurplus' width='10%'></cell>
                                    <cell dataType='number' enable='false' id='cell_payDividPropor' label='支付红利的比例' name='payDividPropor' width='10%'></cell>
                                    <cell dataType='number' enable='false' id='cell_accumIntbearIntrate' label='累积生息利率' name='accumIntbearIntrate' width='15%'></cell>
                                    <cell enable='false' id='cell_operation4' label='操作' name='operation4' width='10%' formatter='pFInterestRate.cell_operation4_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane5' title='现价利率'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer5'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane5_1'>
                    <div dojoType='unieap.layout.TitlePane' id='titlePane5_1'>
                        <div id='div5_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select5_1' label='查&nbsp询' width='100px'></div>
                        </div>
                        <div dojoType='unieap.form.Form' id='form5_1' binding="{store:'form_tCurrPriceIntrate'}">
                            <table id='form5_1_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form5_1_0_tr'>
                                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                            <label id='insurtypeCode_label'>险种编码：</label>
                                        </td>
                                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='insurtypeCode3' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane5_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane5_2' title='利率信息'>
                        <div id='div5_2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='add5_1' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid5_1' binding="{store:'in_tCurrPriceIntrate',rpc:pFInterestRate.grid5_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='20px' decoder="{store:'INSURTYPE_CODE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_paymntFreq' label='交费频率' name='paymntFreq' width='15%' decoder="{store:'ds4_paymntFreq'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_startYearterm' label='起始年期' name='startYearterm' width='20%'></cell>
                                    <cell dataType='number' enable='false' id='cell_endYearterm' label='终止年期' name='endYearterm' width='20%'></cell>
                                    <cell dataType='number' enable='false' id='cell_intrate' label='利率' name='intrate' width='15%' decoder="{store:'INTRATE'}"></cell>
                                    <cell enable='false' id='cell_operation5' label='操作' name='operation5' width='10%' formatter='pFInterestRate.cell_operation5_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane6' title='法定准备金因子'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer6'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane6_1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane6_1'>
                        <div id='div6_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='download6_1' label='模板下载' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='leadingIn6_1' label='导&nbsp入' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select6_1' label='查&nbsp询' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='delete6_1' label='删&nbsp除' width='100px'></div>
                        </div>
                    </div>
                    <div dojoType='unieap.form.Form' id='form6_1' binding="{store:'form_tReserveFundFactor'}">
                        <table id='form6_1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='15%'></col>
                                <col width='30%'></col>
                                <col width='15%'></col>
                                <col width='30%'></col>
                                <col width='10%'></col>
                            </colgroup>
                            <tbody>
                                <tr id='form6_1_0_tr'>
                                    <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                        <label id='insurtypeCode_label'>险种编码：</label>
                                    </td>
                                    <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='insurtypeCode4' maxLength='20' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane6_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane6_2' title='利率信息'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid6_1' binding="{store:'in_tReserveFundFactor',rpc:pFInterestRate.grid6_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar>
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='8%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_singlePayOrRegulPay' label='趸/期交' name='singlePayOrRegulPay' width='8%' decoder="{store:'singlePayOrRegulPay'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_paymntPeriod' label='交费期间' name='paymntPeriod' width='10%' decoder="{store:'paymntPeriod'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_insurperiod' label='保险期间' name='insurperiod' width='9%' decoder="{store:'insurperiod'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurdGender' label='被保险人性别' name='insurdGender' width='9%' decoder="{store:'insurdGender'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_applyAge' label='投保年龄' name='applyAge' width='8%'></cell>
                                    <cell dataType='number' enable='false' id='cell_annuityStartDrawAge' label='年金开始领取年龄' name='annuityStartDrawAge' width='10%' decoder="{store:'annuityStartDrawAge'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_polYear' label='保单年度' name='polYear' width='10%'></cell>
                                    <cell dataType='number' enable='false' id='cell_reserveFundFactor' label='准备金因子' name='reserveFundFactor' width='10%' decoder="{store:'reserveFundFactor'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_reserveFundType' label='准备金类型' name='reserveFundType' width='10%' decoder="{store:'paymntFreq'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_basicSum' label='基本保额' name='basicSum' width='8%'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane7' title='评估净保费因子'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer7'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane7_1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane7_1'>
                        <div id='div7_1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='download7_1' label='模板下载' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='leadingIn7_1' label='导&nbsp入' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='select7_1' label='查&nbsp询' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='delete7_1' label='删&nbsp除' width='100px'></div>
                        </div>
                    </div>
                    <div dojoType='unieap.form.Form' id='form7_1' binding="{store:'form_tAssessNetPrem'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='15%'></col>
                                <col width='30%'></col>
                                <col width='15%'></col>
                                <col width='30%'></col>
                                <col width='10%'></col>
                            </colgroup>
                            <tbody>
                                <tr id='form1_0_tr'>
                                    <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                        <label id='insurtypeCode_label'>险种编码：</label>
                                    </td>
                                    <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='insurtypeCode5' maxLength='20' width='100%' binding="{name:'insurtypeCode'}"></div>
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
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane7_2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane7_2' title='利率信息'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid7_1' binding="{store:'in_tAssessNetPrem',rpc:pFInterestRate.grid7_1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='8%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_singlePayOrRegulPay' label='趸/期交' name='singlePayOrRegulPay' width='8%' decoder="{store:'singlePayOrRegulPay'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_paymntPeriod' label='交费期间' name='paymntPeriod' width='10%' decoder="{store:'paymntPeriod'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_insurperiod' label='保险期间' name='insurperiod' width='9%' decoder="{store:'insurperiod'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurdGender' label='被保险人性别' name='insurdGender' width='9%' decoder="{store:'insurdGender'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_applyAge' label='投保年龄' name='applyAge' width='8%'></cell>
                                    <cell dataType='number' enable='false' id='cell_annuityStartDrawAge' label='年金开始领取年龄' name='annuityStartDrawAge' width='10%' decoder="{store:'annuityStartDrawAge'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_firstperiodRenew' label='首/续期' name='firstperiodRenew' width='10%' decoder="{store:'reserveFundType'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_assessNetPrem' label='评估净保费' name='assessNetPrem' width='10%'></cell>
                                    <cell dataType='string' enable='false' id='cell_assessNetPremType' label='评估净保费类型' name='assessNetPremType' width='10%' decoder="{store:'assessNetPremType'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_basicSum' label='基本保额' name='basicSum' width='8%'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='250px' id='addOrUpDialog1_1' title='新增万能结算利率' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateUnivrslDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='150px' id='addOrUpDialog2_1' title='新增生存金累计生息利率' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateSurvvDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='210px' id='addOrUpDialog3_1' title='新增贷款 自垫利率' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateLoanDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='210px' id='addOrUpDialog4_1' title='红利参数' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateDividDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='180px' id='addOrUpDialog5_1' title='现价利率' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateCruuDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='upload6_1' title='法定准备金因子' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateFileUpload_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='upload7_1' title='法定准备金因子' url='<%=path%>/ProductFactory/factoryabclife/risk_pFInterestRateFileUpload_entry.action' width='700px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
