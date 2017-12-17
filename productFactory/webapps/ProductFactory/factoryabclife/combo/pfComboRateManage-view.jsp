
<%--
	组合精算数据
    @author Administrator
    @creationTime 2016-12-07 14:50:19
    @modificationTime 2016-12-08 11:12:28
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboRateManage-processor.js?version=20161208111228"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboRateManage-view.js?version=20161208111228"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboRateManage_navigateButton.setViewcContext("pfComboRateManage_navigateButton");
pfComboRateManage_navigateButton.page_initEvents&&dojo.hitch(pfComboRateManage_navigateButton,pfComboRateManage_navigateButton.page_initEvents)();
pfComboRateManage_navigateButton.page_load&&dojo.hitch(pfComboRateManage_navigateButton,pfComboRateManage_navigateButton.page_load)();
pfComboRateManage.page_initEvents&&dojo.hitch(pfComboRateManage,pfComboRateManage.page_initEvents)();
				pfComboRateManage.page_load&&dojo.hitch(pfComboRateManage,pfComboRateManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/combo/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboRateManage" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='组合基本信息' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_rateManage'}">
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
                                            <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' width='100%' binding="{name:'comboCode'}"></div>
                                        </td>
                                        <td align='right' id='comboName_label_td' rowSpan='1'>
                                            <label id='comboName_label'>组合名称：</label>
                                        </td>
                                        <td colSpan='1' id='comboName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='comboName' maxLength='120' width='100%' binding="{name:'comboName'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='组合精算数据' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_Add' label='新增精算表' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_upload' label='上传数据' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='下载数据' width='100px'></div>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='btn_export' label='精算模板导出' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_comboRateManage' binding="{store:'tObjRate_combo'}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_rateType' label='费率类型' name='rateType' width='45%' decoder="{store:'ds_dimension'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_tableName' label='表名称' name='tableName' width='45%'></cell>
                                    <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfComboRateManage.cell_control_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='xdialog1' title='精算表维护' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskRateManageDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='xdialog2' title='上传费率' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskRateManageFileUpload_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
