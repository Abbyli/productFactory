
<%--
	组合显示页面
    @author Administrator
    @creationTime 2016-11-11 09:34:36
    @modificationTime 2016-12-26 11:18:03
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfCombo-processor.js?version=20161226111803"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfCombo-view.js?version=20161226111803"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfCombo.page_initEvents&&dojo.hitch(pfCombo,pfCombo.page_initEvents)();
				pfCombo.page_load&&dojo.hitch(pfCombo,pfCombo.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='combo_query' label='查&nbsp;询' width='100px'></div>
                    <div dojoType='unieap.form.Button' id='button1' label='算法测试' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_comboInf' binding="{store:'tComboInf_form'}">
                    <table id='form_comboInf_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_comboInf_0_tr'>
                                <td align='right' id='comboCode_label_td' rowSpan='1'>
                                    <label id='comboCode_label'>组合编码：</label>
                                </td>
                                <td colSpan='1' id='comboCode_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='comboCode' maxLength='20' width='100%' binding="{name:'comboCode'}"></div>
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
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' width='100%'>
                <div id='div2' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='combo_add' label='新&nbsp;增' width='100px'></div>
                    <div dojoType='unieap.form.Button' id='submitCombo' label='提交审核' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_comboInf' binding="{store:'tComboInf_grid',rpc:pfCombo.grid_comboInf_binding_rpc}" selection="{selectType:'single'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_comboCode' label='组合编码' name='comboCode' width='18%' formatter='pfCombo.cell_comboCode_formatter'></cell>
                            <cell dataType='number' enable='false' id='cell_comboVer' label='组合版本' name='comboVer' width='18%'></cell>
                            <cell dataType='string' enable='false' id='cell_comboName' label='组合名称' name='comboName' width='18%'></cell>
                            <cell dataType='string' enable='false' id='cell_comboAbbr' label='组合简称' name='comboAbbr' width='18%'></cell>
                            <cell dataType='string' enable='false' id='cell_remark' label='备注' name='remark' width='18%'></cell>
                            <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfCombo.cell_control_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='210px' id='combo_dialog' title='新增组合' url='<%=path%>/ProductFactory/factoryabclife/combo_pfComboDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
