
<%--
	险种要素关系
    @author Administrator
    @creationTime 2016-11-17 09:53:41
    @modificationTime 2016-12-27 16:19:04
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboInsurtypeRef-processor.js?version=20161227161904"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/pfComboInsurtypeRef-view.js?version=20161227161904"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboInsurtypeRef_navigateButton.setViewcContext("pfComboInsurtypeRef_navigateButton");
pfComboInsurtypeRef_navigateButton.page_initEvents&&dojo.hitch(pfComboInsurtypeRef_navigateButton,pfComboInsurtypeRef_navigateButton.page_initEvents)();
pfComboInsurtypeRef_navigateButton.page_load&&dojo.hitch(pfComboInsurtypeRef_navigateButton,pfComboInsurtypeRef_navigateButton.page_load)();
pfComboInsurtypeRef.page_initEvents&&dojo.hitch(pfComboInsurtypeRef,pfComboInsurtypeRef.page_initEvents)();
				pfComboInsurtypeRef.page_load&&dojo.hitch(pfComboInsurtypeRef,pfComboInsurtypeRef.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/comboInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfComboInsurtypeRef" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1'>
                        <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_insur_ref'}">
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
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_insurElem' binding="{store:'tComboInsurtypeElemRel_grid'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <toolbar paging="{userPageSize:false}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种代码' name='insurtypeCode' width='18%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurtypeName' label='险种名称' name='insurtypeName' width='18%' decoder="{store:'INSURTYPE_NAME'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_insurtypeVer' label='险种版本' name='insurtypeVer' width='18%' decoder="{store:'INSURTYPE_VER'}"></cell>
                                    <cell dataType='string' enable='false' id='cell_pricingCode' label='定价代码' name='pricingCode' width='18%'></cell>
                                    <cell dataType='string' enable='false' id='cell_elemName' label='要素名称' name='elemName' width='18%'></cell>
                                    <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfComboInsurtypeRef.cell_control_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='xdialog1' title='设置算法' url='<%=path%>/ProductFactory/factoryabclife/comboInformation_pfComboInsurtypeRefCalDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='120px' id='xdialog2' title='设置固定值' url='<%=path%>/ProductFactory/factoryabclife/comboInformation_pfComboInsurtypeRefFixDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='120px' id='xdialog3' title='设置固定值' url='<%=path%>/ProductFactory/factoryabclife/comboInformation_pfComboInsurtypeRefFixDialog2_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
