
<%--
	维度定义
    @author think
    @creationTime 2016-07-13 16:03:06
    @modificationTime 2017-03-13 09:59:44
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfDimension-processor.js?version=20170313095944"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfDimension-view.js?version=20170313095944"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfDimension.page_initEvents&&dojo.hitch(pfDimension,pfDimension.page_initEvents)();
				pfDimension.page_load&&dojo.hitch(pfDimension,pfDimension.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' height='235px' id='add_dimensionDef' title='维度定义新增' url='<%=path%>/ProductFactory/factoryabclife/basic_pfDimensionDefDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='235px' id='update_dimensionDef' title='维度定义修改' url='<%=path%>/ProductFactory/factoryabclife/basic_pfDimensionDefDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='维度定义查询'>
                <div id='div2' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='查询' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_DimensionDef' binding="{store:'tDimensionDef_grid'}">
                    <table id='form_DimensionDef_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_DimensionDef_0_tr'>
                                <td align='right' id='rateType__DimensionDef_label_td' rowSpan='1'>
                                    <label id='rateType__DimensionDef_label'>精算表类型：</label>
                                </td>
                                <td colSpan='1' id='rateType__DimensionDef_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='rateType__DimensionDef' maxLength='6' width='100%' binding="{name:'rateType'}" dataProvider="{store:'ds_rate'}" popup="{height:'auto'}"></div>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='维度定义' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button_DimensionDef' label='新&nbsp增' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_DimensionDef' binding="{store:'tDimensionDef_grid',rpc:pfDimension.grid_DimensionDef_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name__DimensionDef' label='维度名称' name='name' width='11%'></cell>
                            <cell dataType='string' enable='false' id='cell_property__DimensionDef' label='维度属性' name='property' width='11%'></cell>
                            <cell dataType='string' enable='false' id='cell_columnType__DimensionDef' label='字段类型' name='columnType' width='11%' decoder="{store:'ds_column'}"></cell>
                            <cell dataType='string' enable='false' id='cell_matchFlag__DimensionDef' label='匹配标志' name='matchFlag' width='11%' decoder="{store:'ds_match'}"></cell>
                            <cell dataType='string' enable='false' id='cell_dimensionType__DimensionDef' label='维度类型' name='dimensionType' width='11%' decoder="{store:'ds_dimension'}"></cell>
                            <cell dataType='string' enable='false' id='cell_returnType__DimensionDef' label='返回类型' name='returnType' width='11%' decoder="{store:'ds_return'}"></cell>
                            <cell dataType='string' enable='false' id='cell_refValue__DimensionDef' label='引用值' name='refValue' width='11%'></cell>
                            <cell dataType='string' enable='false' id='cell_rateType__DimensionDef' label='精算表类型' name='rateType' width='11%' decoder="{store:'ds_rate'}"></cell>
                            <cell enable='false' id='cell_name1__DimensionDef' label='操作' name='name1' width='12%' formatter='pfDimension.cell_name1__DimensionDef_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
