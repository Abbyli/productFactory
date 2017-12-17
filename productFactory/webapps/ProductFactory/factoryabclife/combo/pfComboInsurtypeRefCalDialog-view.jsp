
<%--
	组合险种要素关系算法弹窗
    @author Administrator
    @creationTime 2016-11-21 09:43:03
    @modificationTime 2016-11-30 09:41:20
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboInsurtypeRefCalDialog-processor.js?version=20161130094120"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/combo/pfComboInsurtypeRefCalDialog-view.js?version=20161130094120"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfComboInsurtypeRefCalDialog.page_initEvents&&dojo.hitch(pfComboInsurtypeRefCalDialog,pfComboInsurtypeRefCalDialog.page_initEvents)();
				pfComboInsurtypeRefCalDialog.page_load&&dojo.hitch(pfComboInsurtypeRefCalDialog,pfComboInsurtypeRefCalDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='选择算法'>
        <div dojoType='unieap.form.Form' id='form_combo_cal' binding="{store:'tObjFormula_combo_cal'}">
            <table id='form_combo_cal_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='30%'></col>
                    <col width='60%'></col>
                    <col width='10%'></col>
                </colgroup>
                <tbody>
                    <tr id='form_combo_cal_0_tr'>
                        <td id='formulaId_label_td' rowSpan='1'>
                            <label id='formulaId_label'>公式主键</label>
                        </td>
                        <td colSpan='1' id='formulaId_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='formulaId' maxLength='16' required='true' width='100%' binding="{name:'formulaId'}" decoder="{displayAttr:'memo',valueAttr:'id'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form_combo_cal_1_tr'>
                        <td id='description_label_td' rowSpan='1'>
                            <label id='description_label'>公式描述</label>
                        </td>
                        <td colSpan='1' id='description_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' id='description' maxLength='1000' width='100%' binding="{name:'description'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100px' id='titlePane2' title='设置参数'>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_param' binding="{store:'tFormulaParamRef_grid'}" edit="{editType:'cellEdit'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_name' label='参数名称' name='name' width='50%'></cell>
                    <cell dataType='string' enable='true' id='cell_refValue' label='参数值' name='refValue' width='50%' editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'cell_refValue_textBox',required:true, validator:{errorMsg:'请录入合理参数',regExp:/^(?:([0](\.\d{0,3}){0,1})|([1-9][0-9]{0,18}(\.\d{0,3}){0,1}))$/}}}"></cell>
                </row>
            </header>
        </div>
    </div>
    <table id='tableLayout1' width='100%'>
        <colgroup>
            <col width='150px'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='save' label='保&nbsp;存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
