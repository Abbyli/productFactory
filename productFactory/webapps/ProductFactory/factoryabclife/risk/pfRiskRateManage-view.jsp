
<%--
	精算数据
    @author Administrator
    @creationTime 2016-07-12 10:13:22
    @modificationTime 2016-09-30 14:16:49
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskRateManage-processor.js?version=20160930141649"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskRateManage-view.js?version=20160930141649"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskRateManage_navigateButton.setViewcContext("pfRiskRateManage_navigateButton");
pfRiskRateManage_navigateButton.page_initEvents&&dojo.hitch(pfRiskRateManage_navigateButton,pfRiskRateManage_navigateButton.page_initEvents)();
pfRiskRateManage_navigateButton.page_load&&dojo.hitch(pfRiskRateManage_navigateButton,pfRiskRateManage_navigateButton.page_load)();
pfRiskRateManage.page_initEvents&&dojo.hitch(pfRiskRateManage,pfRiskRateManage.page_initEvents)();
				pfRiskRateManage.page_load&&dojo.hitch(pfRiskRateManage,pfRiskRateManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='xdialog1' title='精算表维护' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskRateManageDialog_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='xdialog2' title='上传费率' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskRateManageFileUpload_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskRateManage" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_ratemanage_form'}">
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
                        <div dojoType='unieap.form.Form' id='form_pricingliab' binding="{store:'tPricingLiabDef_ratemanage_form'}">
                            <table id='form_pricingliab_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_pricingliab_1_tr'>
                                        <td align='right' id='pricingLiabCode__pricingliab_label_td' rowSpan='1'>
                                            <label id='pricingLiabCode__pricingliab_label'>定价代码：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabCode__pricingliab_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='pricingLiabCode__pricingliab' maxLength='32' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabName'}"></div>
                                        </td>
                                        <td align='right' id='pricingLiabName__pricingliab_label_td' rowSpan='1'>
                                            <label id='pricingLiabName__pricingliab_label'>定价名称：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabName__pricingliab_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='pricingLiabName__pricingliab' maxLength='120' readOnly='true' width='100%' binding="{name:'pricingLiabName'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='定价责任精算表' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_Add' label='新增精算表' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_upload' label='上传数据' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button2' label='下载数据' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_export' label='精算模板导出' width='100px'></div>
                        </div>
                        <div dojoType='unieap.grid.Grid' height='100%' id='grid_objRate' binding="{store:'tObjRate_grid'}" rows="{rowsPerPage:'10'}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_rateType__objRate' label='费率表类型' name='rateType' width='45%' decoder="{displayAttr:'CODENAME',store:'ds_rateType',valueAttr:'CODEVALUE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_tableName__objRate' label='表名称' name='tableName' width='45%'></cell>
                                    <cell enable='false' id='cell_control__objRate' label='操作' name='control' styles='text-align:center' width='10%' formatter='pfRiskRateManage.cell_control__objRate_formatter'></cell>
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
