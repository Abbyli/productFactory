
<%--
	组合要素
组合要素
    @author Administrator
    @creationTime 2016-11-17 09:41:20
    @modificationTime 2016-11-24 16:10:51
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboElement-processor.js?version=20161124161051"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboElement-view.js?version=20161124161051"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboElement_navigateButton.setViewcContext("pfComboElement_navigateButton");
pfComboElement_navigateButton.page_initEvents&&dojo.hitch(pfComboElement_navigateButton,pfComboElement_navigateButton.page_initEvents)();
pfComboElement_navigateButton.page_load&&dojo.hitch(pfComboElement_navigateButton,pfComboElement_navigateButton.page_load)();
pfComboElement.page_initEvents&&dojo.hitch(pfComboElement,pfComboElement.page_initEvents)();
				pfComboElement.page_load&&dojo.hitch(pfComboElement,pfComboElement.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/combo/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboElement" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1'>
                        <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_element'}">
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addElement' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_element' binding="{store:'tObjSkelement_element_grid',rpc:pfComboElement.grid_element_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar>
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_name' label='要素名称' name='name' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_keyWord' label='关键字' name='keyWord' width='45%'></cell>
                                    <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfComboElement.cell_control_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='450px' id='xdialog1' title='XDialog' url='<%=path%>/ProductFactory/factoryabclife/combo_pfComboElementDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
