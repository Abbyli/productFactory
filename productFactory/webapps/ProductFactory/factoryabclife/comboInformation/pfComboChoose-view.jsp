
<%--
	选择险种
    @author Administrator
    @creationTime 2016-11-14 09:32:06
    @modificationTime 2016-12-27 15:33:41
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboChoose-processor.js?version=20161227153341"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboChoose-view.js?version=20161227153341"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboChoose_navigateButton.setViewcContext("pfComboChoose_navigateButton");
pfComboChoose_navigateButton.page_initEvents&&dojo.hitch(pfComboChoose_navigateButton,pfComboChoose_navigateButton.page_initEvents)();
pfComboChoose_navigateButton.page_load&&dojo.hitch(pfComboChoose_navigateButton,pfComboChoose_navigateButton.page_load)();
pfComboChoose.page_initEvents&&dojo.hitch(pfComboChoose,pfComboChoose.page_initEvents)();
				pfComboChoose.page_load&&dojo.hitch(pfComboChoose,pfComboChoose.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/comboInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboChoose" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='组合信息' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_choose_form'}">
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
                                            <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' readOnly='true' width='100%' binding="{name:'comboCode'}"></div>
                                        </td>
                                        <td align='right' id='comboName_label_td' rowSpan='1'>
                                            <label id='comboName_label'>组合名称：</label>
                                        </td>
                                        <td colSpan='1' id='comboName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='comboName' maxLength='120' readOnly='true' width='100%' binding="{name:'comboName'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='组合列表' width='100%'>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insurtype' binding="{store:'tComboInsurtype_grid',rpc:pfComboChoose.grid_insurtype_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeName' label='险种名称' name='insurtypeName' width='20%' decoder="{store:'INSURTYPE_NAME'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='15%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurtypeVer' label='险种版本' name='insurtypeVer' width='15%' decoder="{store:'INSURTYPE_VER'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurtypeAbbr' label='险种简称' name='insurtypeAbbr' width='15%' decoder="{store:'INSURTYPE_ABBR'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_pricingCode' label='定价代码' name='pricingCode' width='15%'></cell>
                                    <cell dataType='string' enable='false' id='cell_pricingName' label='定价名称' name='pricingName' width='20%'></cell>
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
