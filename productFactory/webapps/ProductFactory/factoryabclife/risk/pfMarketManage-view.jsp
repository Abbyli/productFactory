
<%--
	销售管理
    @author Neusoft
    @creationTime 2017-03-01 16:43:46
    @modificationTime 2017-03-17 14:32:07
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMarketManage-processor.js?version=20170317143207"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMarketManage-view.js?version=20170317143207"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfMarketManage.page_initEvents&&dojo.hitch(pfMarketManage,pfMarketManage.page_initEvents)();
				pfMarketManage.page_load&&dojo.hitch(pfMarketManage,pfMarketManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='select' label='查&nbsp询' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form' binding="{store:'form_tProductSaleChnl'}">
                    <table id='form_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_1_tr'>
                                <td align='right' id='productCode_label_td' rowSpan='1'>
                                    <label id='productCode_label'>产品代码：</label>
                                </td>
                                <td colSpan='1' id='productCode_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='productCode' maxLength='20' width='100%' binding="{name:'productCode'}"></div>
                                </td>
                                <td align='right' id='saleChnl_label_td' rowSpan='1'>
                                    <label id='saleChnl_label'>销售渠道：</label>
                                </td>
                                <td colSpan='1' id='saleChnl_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='saleChnl' maxLength='2' width='100%' binding="{name:'saleChnl'}" dataProvider="{store:'saleChnl'}" popup="{height:'auto'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_3_tr'>
                                <td align='right' id='saleMngcom_label_td' rowSpan='1'>
                                    <label id='saleMngcom_label'>销售机构：</label>
                                </td>
                                <td colSpan='1' id='saleMngcom_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='saleMngcom' maxLength='16' width='100%' binding="{name:'saleMngcom'}"></div>
                                </td>
                                <td align='right' id='saleState_label_td' rowSpan='1'>
                                    <label id='saleState_label'>销售状态：</label>
                                </td>
                                <td colSpan='1' id='saleState_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='saleState' maxLength='2' width='100%' binding="{name:'saleState'}" dataProvider="{store:'saleState'}" popup="{height:'auto'}"></div>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2'>
                <div id='div2' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='add' label='添&nbsp加' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid' binding="{store:'grid_tProductSaleChnl'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_productCode' label='产品代码' name='productCode' width='10%'></cell>
                            <cell dataType='number' enable='false' id='cell_productVer' label='产品版本' name='productVer' width='10%'></cell>
                            <cell dataType='string' enable='false' id='cell_saleChnl' label='销售渠道' name='saleChnl' width='15%' decoder="{store:'saleChnl'}"></cell>
                            <cell dataType='string' enable='false' id='cell_saleMngcom' label='销售机构' name='saleMngcom' width='13%'></cell>
                            <cell dataType='string' enable='false' id='cell_bankCode' label='银行代码' name='bankCode' width='10%'></cell>
                            <cell dataType='string' enable='false' id='cell_saleState' label='销售状态' name='saleState' width='10%' decoder="{store:'saleState'}"></cell>
                            <cell dataType='date' enable='false' id='cell_startdate' label='起售日期' name='startdate' width='11%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                            <cell dataType='date' enable='false' id='cell_enddate' label='停售日期' name='enddate' width='11%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                            <cell enable='false' id='cell_editor' label='编辑' name='editor' width='10%' formatter='pfMarketManage.cell_editor_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='230px' id='xdialog1' title='XDialog' url='<%=path%>/ProductFactory/factoryabclife/risk_pfMarketManageDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
