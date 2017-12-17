
<%--
	产品搭配
    @author zhy
    @creationTime 2016-07-29 09:36:06
    @modificationTime 2017-03-24 15:09:59
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMatchRel-processor.js?version=20170324150959"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMatchRel-view.js?version=20170324150959"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfMatchRel.page_initEvents&&dojo.hitch(pfMatchRel,pfMatchRel.page_initEvents)();
				pfMatchRel.page_load&&dojo.hitch(pfMatchRel,pfMatchRel.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='产品险种查询'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='查&nbsp询' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_MatchRel' binding="{store:'proMatchDto_form'}">
                    <table id='form_MatchRel_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_MatchRel_1_tr'>
                                <td align='right' id='proType__MatchRel_label_td' rowSpan='1'>
                                    <label id='proType__MatchRel_label'>产品类型：</label>
                                </td>
                                <td colSpan='1' id='proType__MatchRel_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='proType__MatchRel' required='true' width='100%' binding="{name:'proType'}" dataProvider="{store:'ds_risk_query'}"></div>
                                </td>
                                <td align='right' id='proCode__MatchRel_label_td' rowSpan='1'>
                                    <label id='proCode__MatchRel_label'>产品代码：</label>
                                </td>
                                <td colSpan='1' id='proCode__MatchRel_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='proCode__MatchRel' width='100%' binding="{name:'proCode'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_MatchRel_2_tr'>
                                <td align='right' id='proName__MatchRel_label_td' rowSpan='1'>
                                    <label id='proName__MatchRel_label'>产品名称：</label>
                                </td>
                                <td colSpan='1' id='proName__MatchRel_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='proName__MatchRel' width='100%' binding="{name:'proName'}"></div>
                                </td>
                                <td>
                                </td>
                                <td>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='险种列表' width='100%'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_MatchRel' binding="{store:'proMatchDto_grid',rpc:pfMatchRel.grid_MatchRel_binding_rpc}" selection="{selectType:'single',onAfterSelect:pfMatchRel.grid_MatchRel_selection_onAfterSelect}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_proCode__MatchRel' label='产品代码' name='proCode' width='40%'></cell>
                            <cell dataType='string' enable='false' id='cell_proName__MatchRel' label='产品名称' name='proName' width='40%'></cell>
                            <cell dataType='string' enable='false' id='cell_proType__MatchRel' label='产品类型' name='proType' width='20%' decoder="{store:'ds_risk'}"></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane3'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='可搭配的险种'>
                <div id='div3' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button3' label='新&nbsp增' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_basic' binding="{store:'tInsurtypeBasicInf_grid_basic',rpc:pfMatchRel.grid_basic_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_insurtypeCode__basic' label='险种编码' name='insurtypeCode' width='30%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeName__basic' label='险种名称' name='insurtypeName' width='30%' decoder="{store:'INSURTYPE_NAME'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeAbbr__basic' label='险种简称' name='insurtypeAbbr' width='30%' decoder="{store:'INSURTYPE_ABBR'}"></cell>
                            <cell enable='false' id='cell_name1__basic' label='操作' name='name1' width='10%' formatter='pfMatchRel.cell_name1__basic_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='135px' id='add_MatchRel' title='险种搭配新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfMatchRelDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='155px' id='update_MatchRel' title='险种搭配修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfMatchRelDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
