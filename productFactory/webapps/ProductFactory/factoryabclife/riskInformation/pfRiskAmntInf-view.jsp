
<%--
	
    @author Administrator
    @creationTime 2016-07-19 15:39:06
    @modificationTime 2016-10-14 10:34:04
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAmntInf-processor.js?version=20161014103404"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskAmntInf-view.js?version=20161014103404"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAmntInf_navigateButton.setViewcContext("pfRiskAmntInf_navigateButton");
pfRiskAmntInf_navigateButton.page_initEvents&&dojo.hitch(pfRiskAmntInf_navigateButton,pfRiskAmntInf_navigateButton.page_initEvents)();
pfRiskAmntInf_navigateButton.page_load&&dojo.hitch(pfRiskAmntInf_navigateButton,pfRiskAmntInf_navigateButton.page_load)();
pfRiskAmntInf.page_initEvents&&dojo.hitch(pfRiskAmntInf,pfRiskAmntInf.page_initEvents)();
				pfRiskAmntInf.page_load&&dojo.hitch(pfRiskAmntInf,pfRiskAmntInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskAmntInf" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='风险保额定义'>
                        <div dojoType='unieap.form.Form' id='form_pricingLiabDef' binding="{store:'tPricingLiabDef_amnt_form'}">
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
                                        <td align='right' id='pricingLiabCode_label_td' rowSpan='1'>
                                            <label id='pricingLiabCode_label'>定价代码：</label>
                                        </td>
                                        <td colSpan='1' id='pricingLiabCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.ComboBox' id='pricingLiabCode' maxLength='32' width='100%' binding="{name:'pricingLiabCode'}" decoder="{displayAttr:'pricingLiabCode',valueAttr:'pricingLiabId'}"></div>
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
                </div>
                <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='风险保额列表' width='100%'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_objFormula' binding="{store:'tObjFormula_amnt_grid',rpc:pfRiskAmntInf.grid_objFormula_binding_rpc}" selection="{selectType:'single'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_type' label='风险类型' name='type' width='20%' decoder="{displayAttr:'riskamntName',store:'ds_result',valueAttr:'riskamntType'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='50%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='风险保额算法' name='description' width='30%'></cell>
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
