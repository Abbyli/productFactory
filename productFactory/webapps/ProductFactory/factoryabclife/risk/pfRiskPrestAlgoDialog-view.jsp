
<%--
	给付算法弹窗
    @author Administrator
    @creationTime 2016-07-12 09:06:34
    @modificationTime 2017-02-15 10:42:27
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
	   	 
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/btn.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAlgoDialog-processor.js?version=20170215104227"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAlgoDialog-view.js?version=20170215104227"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestAlgoDialog.page_initEvents&&dojo.hitch(pfRiskPrestAlgoDialog,pfRiskPrestAlgoDialog.page_initEvents)();
				pfRiskPrestAlgoDialog.page_load&&dojo.hitch(pfRiskPrestAlgoDialog,pfRiskPrestAlgoDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='45%' id='titlePane1' title='相关性信息' width='100%'>
        <div id='div1' type='buttons'>
            <div dojoType='unieap.form.Button' class='titlePane-button' id='addRelation' label='添&nbsp加' width='100px'></div>
        </div>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_obj_relate' binding="{store:'tObjRelationDTO'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <header>
                <row>
                    <cell canSort='false' dataType='number' enable='true' id='cell_relaDefId' label='相关性' name='relaDefId' width='27%' decoder="{displayAttr:'name',store:'ds_result',valueAttr:'id'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_relaDefId_comboBox', dataProvider:{store:'ds_result'}, popup:{height:'150px'}, decoder:{displayAttr:'name',valueAttr:'id'}}}"></cell>
                    <cell canSort='false' dataType='string' enable='true' id='cell_relaDefOpt' label='操作符' name='relaDefOpt' width='16%' decoder="{displayAttr:'name',store:'ds_opt',valueAttr:'id'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_relaDefOpt_comboBox', dataProvider:{store:'ds_opt'}, decoder:{displayAttr:'name',valueAttr:'id'}}}"></cell>
                    <cell canSort='false' dataType='string' enable='true' id='cell_relaDefValue' label='相关性值' name='relaDefValue' width='20%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_relaDefValue_textBox', validator:{errorMsg:'非法参数',regExp:/^(?:[0-9]|[1-9]\d+|[1-9]\d{3}-\d{2}-\d{2})$/}}}"></cell>
                    <cell canSort='false' dataType='number' enable='true' id='cell_relaDefValue_rela' label='相关性参数' name='relaDefValue_rela' width='27%' decoder="{displayAttr:'name',store:'ds_result',valueAttr:'id'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'cell_relaDefValue_rela_comboBox', dataProvider:{store:'ds_result'}, popup:{height:'150px'}, decoder:{displayAttr:'name',valueAttr:'id'}}}"></cell>
                    <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfRiskPrestAlgoDialog.cell_control_formatter'></cell>
                </row>
            </header>
        </div>
    </div>
    <div dojoType='unieap.form.Form' id='form_formulaInfo' binding="{store:'tObjFormula_prestAlgo_form'}">
        <table height='15%' id='form_formulaInfo_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='30%'></col>
                <col width='60%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form_formulaInfo_0_tr'>
                    <td id='formulaId_label_td' rowSpan='1'>
                        <label id='formulaId_label'>选择公式：</label>
                    </td>
                    <td colSpan='1' id='formulaId_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='formulaId' maxLength='16' required='true' width='100%' binding="{name:'formulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}" popup="{height:'100px'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_formulaInfo_1_tr'>
                    <td id='description_label_td' rowSpan='1'>
                        <label id='description_label'>公式描述：</label>
                    </td>
                    <td colSpan='1' id='description_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='description' maxLength='1000' required='true' width='100%' binding="{name:'description'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='30%' id='titlePane2' title='参数信息' width='100%'>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_formula_params' binding="{store:'tFormulaParamRef_prestAlgo_grid'}" edit="{editType:'rowEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_name' label='参数名称' name='name' width='50%'></cell>
                    <cell dataType='string' enable='true' id='cell_refValue' label='参数值' name='refValue' width='50%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_refValue_textBox', validator:{errorMsg:'非法参数',regExp:/^(?:([0](\.\d{0,3}){0,1})|([1-9][0-9]{0,18}(\.\d{0,3}){0,1}))$/}}}"></cell>
                </row>
            </header>
        </div>
    </div>
    <table class='toolbar-table' id='tableLayout1' width='100%' style='margin-top:0px'>
        <colgroup>
            <col width='150px'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='save' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
