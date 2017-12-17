
<%--
	定价责任
    @author Administrator
    @creationTime 2016-06-28 10:35:04
    @modificationTime 2017-01-06 17:51:53
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfPriceDuty-processor.js?version=20170106175153"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfPriceDuty-view.js?version=20170106175153"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfPriceDuty_navigateButton.setViewcContext("pfPriceDuty_navigateButton");
pfPriceDuty_navigateButton.page_initEvents&&dojo.hitch(pfPriceDuty_navigateButton,pfPriceDuty_navigateButton.page_initEvents)();
pfPriceDuty_navigateButton.page_load&&dojo.hitch(pfPriceDuty_navigateButton,pfPriceDuty_navigateButton.page_load)();
pfPriceDuty.page_initEvents&&dojo.hitch(pfPriceDuty,pfPriceDuty.page_initEvents)();
				pfPriceDuty.page_load&&dojo.hitch(pfPriceDuty,pfPriceDuty.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' id='addDialog' title='新增定价责任' url='<%=path%>/ProductFactory/factoryabclife/risk_pfPriceDutyDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' id='updateDialog' title='修改定价责任' url='<%=path%>/ProductFactory/factoryabclife/risk_pfPriceDutyDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfPriceDuty" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_form'}">
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='定价责任信息' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='element' label='要素定义' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addButton' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='gridliabdef' binding="{store:'tPricingLiabDef_grid',rpc:pfPriceDuty.gridliabdef_binding_rpc}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_pricingLiabCode' label='定价代码' name='pricingLiabCode' width='35%'></cell>
                                    <cell dataType='string' enable='false' id='cell_pricingLiabName' label='定价名称' name='pricingLiabName' width='35%'></cell>
                                    <cell dataType='string' enable='false' id='cell_isOpt' label='责任可选标记' name='isOpt' width='20%' decoder="{store:'ds_chooseflag'}"></cell>
                                    <cell enable='false' id='cell_contral_liab' label='操作' name='contral_liab' width='10%' formatter='pfPriceDuty.cell_contral_liab_formatter'></cell>
                                </row>
                            </header>
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
