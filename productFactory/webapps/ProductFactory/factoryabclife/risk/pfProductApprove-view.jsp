
<%--
	产品审核
    @author neusoft
    @creationTime 2016-07-27 15:43:51
    @modificationTime 2017-02-21 10:17:15
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfProductApprove-processor.js?version=20170221101715"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfProductApprove-view.js?version=20170221101715"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfProductApprove.page_initEvents&&dojo.hitch(pfProductApprove,pfProductApprove.page_initEvents)();
				pfProductApprove.page_load&&dojo.hitch(pfProductApprove,pfProductApprove.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='产品查询'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='查&nbsp询' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_approve' binding="{store:'proApproveDTO_form'}">
                    <table id='form_approve_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_approve_1_tr'>
                                <td id='proType__approve_label_td' rowSpan='1'>
                                    <label id='proType__approve_label'>产品类型</label>
                                </td>
                                <td colSpan='1' id='proType__approve_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='proType__approve' width='100%' binding="{name:'proType'}" dataProvider="{store:'ds_proType'}" popup="{height:'auto'}"></div>
                                </td>
                                <td id='proCode__approve_label_td' rowSpan='1'>
                                    <label id='proCode__approve_label'>产品代码</label>
                                </td>
                                <td colSpan='1' id='proCode__approve_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='proCode__approve' width='100%' binding="{name:'proCode'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_approve_3_tr'>
                                <td id='proVer__approve_label_td' rowSpan='1'>
                                    <label id='proVer__approve_label'>产品版本</label>
                                </td>
                                <td colSpan='1' id='proVer__approve_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='proVer__approve' width='100%' binding="{name:'proVer'}"></div>
                                </td>
                                <td id='proName__approve_label_td' rowSpan='1'>
                                    <label id='proName__approve_label'>产品名称</label>
                                </td>
                                <td colSpan='1' id='proName__approve_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='proName__approve' width='100%' binding="{name:'proName'}"></div>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='产品列表' width='100%'>
                <div id='div2' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button2' label='审核通过' width='100px'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button3' label='审核不通过' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_approve' binding="{store:'proApproveDTO_grid',rpc:pfProductApprove.grid_approve_binding_rpc}" selection="{selectType:'single',onAfterAllSelect:pfProductApprove.grid_approve_selection_onAfterAllSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_proCode__approve' label='产品代码' name='proCode' width='25%' formatter='pfProductApprove.cell_proCode__approve_formatter'></cell>
                            <cell dataType='number' enable='false' id='cell_proVer__approve' label='产品版本' name='proVer' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_proName__approve' label='产品名称' name='proName' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_proType__approve' label='产品类型' name='proType' width='25%' decoder="{store:'ds_proType'}"></cell>
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
