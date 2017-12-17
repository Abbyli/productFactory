
<%--
	
    @author Administrator
    @creationTime 2016-08-12 09:36:12
    @modificationTime 2016-08-16 15:59:51
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskItemProperty-processor.js?version=20160816155951"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskItemProperty-view.js?version=20160816155951"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskItemProperty_navigateButton.setViewcContext("pfRiskItemProperty_navigateButton");
pfRiskItemProperty_navigateButton.page_initEvents&&dojo.hitch(pfRiskItemProperty_navigateButton,pfRiskItemProperty_navigateButton.page_initEvents)();
pfRiskItemProperty_navigateButton.page_load&&dojo.hitch(pfRiskItemProperty_navigateButton,pfRiskItemProperty_navigateButton.page_load)();
pfRiskItemProperty.page_initEvents&&dojo.hitch(pfRiskItemProperty,pfRiskItemProperty.page_initEvents)();
				pfRiskItemProperty.page_load&&dojo.hitch(pfRiskItemProperty,pfRiskItemProperty.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskItemProperty" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种基本信息'>
                        <div dojoType='unieap.form.Form' id='form_insurtypebasicinf' binding="{store:'tInsurtypeBasicInf_itemProperty_form'}">
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
                                            <div dojoType='unieap.form.TextBox' id='verNo' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='save_insuritem' label='保&nbsp;存' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_itemProperty' binding="{store:'tInsurtypePsItemDef_itemProperty_grid'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_psItemId' label='保全项' name='psItemId' width='50%' decoder="{displayAttr:'psItemName',store:'ds_psItemDef',valueAttr:'psItemId'}"></cell>
                                    <cell dataType='string' enable='true' id='cell_psItemFormulaId' label='保全算法' name='psItemFormulaId' width='50%' decoder="{displayAttr:'memo',store:'ds_formulaitem',valueAttr:'id'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_psItemFormulaId_comboBox', dataProvider:{store:'ds_formulaitem'}, decoder:{displayAttr:'memo',valueAttr:'id'}}}"></cell>
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
