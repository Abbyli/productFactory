
<%--
	
    @author think
    @creationTime 2016-07-21 13:11:20
    @modificationTime 2016-12-07 16:21:36
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskRateManageDialog-processor.js?version=20161207162136"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskRateManageDialog-view.js?version=20161207162136"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskRateManageDialog.page_initEvents&&dojo.hitch(pfRiskRateManageDialog,pfRiskRateManageDialog.page_initEvents)();
				pfRiskRateManageDialog.page_load&&dojo.hitch(pfRiskRateManageDialog,pfRiskRateManageDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
            <table id='tableLayout_ratetype' width='100%'>
                <colgroup>
                    <col width='10%'></col>
                    <col width='15%'></col>
                    <col width='75%'></col>
                </colgroup>
                <tbody>
                    <tr height='25px'>
                        <td>
                        </td>
                        <td align='center' colSpan='1' rowSpan='1'>
                            <label id='label_ratetype'>精算表类型：</label>
                        </td>
                        <td id='td2'>
                            <div dojoType='unieap.form.ComboBox' id='comboBox_ratetype' required='true' width='30%' dataProvider="{store:'ds_rateType'}" popup="{height:'150px'}"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='49%' id='titlePane_conditionCol' title='条件列' width='100%'>
                <div id='div_conditionCol' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnAdd' label='确&nbsp认' width='100px'></div>
                </div>
                <table height='100%' id='tableLayout_conditionCol' width='100%'>
                    <colgroup>
                        <col width='10%'></col>
                        <col width='90%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='label_single'>精确维度：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.CheckBoxGroup' height='30px' id='checkBoxGroup_conditionCol_single' labelAlign='right' width='100%' decoder="{displayAttr:'name',valueAttr:'id'}"></div>
                            </td>
                        </tr>
                        <tr height='5px'>
                            <td>
                            </td>
                            <td>
                                <hr width='100%'></hr>
                            </td>
                        </tr>
                        <tr height='25px'>
                            <td align='right'>
                                <label id='label_range'>范围维度：</label>
                            </td>
                            <td>
                                <div dojoType='unieap.form.CheckBoxGroup' id='checkBoxGroup_conditionCol_range' labelAlign='right' width='100%' decoder="{displayAttr:'name',valueAttr:'id'}"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='50%' id='titlePane_result' title='条件列表' width='100%'>
                <div id='div_result' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='up' label='上&nbsp移' width='100px'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='down' label='下&nbsp移' width='100px'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnSave' label='保&nbsp存' width='100px'></div>
                </div>
                <div dojoType='unieap.grid.Grid' height='100%' id='grid_dimenRef' binding="{store:'tObjRateDimenRef_grid'}" rows="{rowsPerPage:'10'}" selection="{selectType:'single',onAfterSelect:pfRiskRateManageDialog.grid_dimenRef_selection_onAfterSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_dimensionName__dimenRef' label='维度名称' name='dimensionName' width='50%'></cell>
                            <cell dataType='string' enable='false' id='cell_dimensionProperty__dimenRef' label='维度属性' name='dimensionProperty' width='50%'></cell>
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
