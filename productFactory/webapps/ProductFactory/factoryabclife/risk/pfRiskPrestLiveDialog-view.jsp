
<%--
	生存给付 增/修 弹窗
    @author Administrator
    @creationTime 2016-07-08 15:02:24
    @modificationTime 2017-03-24 10:44:36
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestLiveDialog-processor.js?version=20170324104436"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestLiveDialog-view.js?version=20170324104436"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestLiveDialog.page_initEvents&&dojo.hitch(pfRiskPrestLiveDialog,pfRiskPrestLiveDialog.page_initEvents)();
				pfRiskPrestLiveDialog.page_load&&dojo.hitch(pfRiskPrestLiveDialog,pfRiskPrestLiveDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_live' binding="{store:'tSurvvGivepayDef_dialogform'}">
        <table id='form_live_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_live_1_tr'>
                    <td align='right' id='survvGivepayCode_label_td' rowSpan='1'>
                        <label id='survvGivepayCode_label'>给付代码：</label>
                    </td>
                    <td colSpan='1' id='survvGivepayCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='survvGivepayCode' maxLength='30' width='100%' binding="{name:'survvGivepayCode'}" validator="{errorMsg:'格式为：xxxx4x0x如10014101',regExp:/^[0-9]{4}[4][0-9][0][0-9]$/}"></div>
                    </td>
                    <td align='right' id='survvGivepayName_label_td' rowSpan='1'>
                        <label id='survvGivepayName_label'>给付名称：</label>
                    </td>
                    <td colSpan='1' id='survvGivepayName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='survvGivepayName' maxLength='120' trim='true' width='100%' binding="{name:'survvGivepayName'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_live_3_tr'>
                    <td align='right' id='survvGivepayType_label_td' rowSpan='1'>
                        <label id='survvGivepayType_label'>给付类型：</label>
                    </td>
                    <td colSpan='1' id='survvGivepayType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='survvGivepayType' maxLength='2' required='true' width='100%' binding="{name:'survvGivepayType'}" dataProvider="{store:'ds_type'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='givepayIntv_label_td' rowSpan='1'>
                        <label id='givepayIntv_label'>给付间隔：</label>
                    </td>
                    <td colSpan='1' id='givepayIntv_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='givepayIntv' maxLength='22' width='80%' binding="{name:'givepayIntv'}" validator="{regExp:/^\d+$/}"></div>
                        <label id='label1'>月</label>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_live_5_tr'>
                    <td align='right' id='startDrawDateCalcRef_label_td' rowSpan='1'>
                        <label id='startDrawDate_label'>起领期间：</label>
                    </td>
                    <td colSpan='1' id='startDrawDateCalcRef_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='startDrawDate' width='100%' binding="{name:'startDrawDate'}"></div>
                    </td>
                    <td align='right' id='startDrawDateCalcWay_label_td' rowSpan='1'>
                        <label id='stopDrawDateUnit_label'>起领期间单位：</label>
                    </td>
                    <td colSpan='1' id='startDrawDateCalcWay_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='startDrawDateUnit' width='100%' binding="{name:'startDrawDateUnit'}" dataProvider="{store:'ds_unit'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_live_7_tr'>
                    <td align='right' id='stopDrawDateCalcRef_label_td' rowSpan='1'>
                        <label id='startDrawDateCalcRef_label'>起领日期计算参照：</label>
                    </td>
                    <td colSpan='1' id='stopDrawDateCalcRef_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='startDrawDateCalcRef' maxLength='2' width='100%' binding="{name:'startDrawDateCalcRef'}" dataProvider="{store:'calc_ref'}"></div>
                    </td>
                    <td align='right' id='stopDrawDateCalcWay_label_td' rowSpan='1'>
                        <label id='startDrawDateCalcWay_label'>起领日期计算方式：</label>
                    </td>
                    <td colSpan='1' id='stopDrawDateCalcWay_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='startDrawDateCalcWay' maxLength='2' width='100%' binding="{name:'startDrawDateCalcWay'}" dataProvider="{store:'calc_way'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_live_9_tr'>
                    <td align='right' id='startDrawDate_label_td' rowSpan='1'>
                        <label id='stopDrawDate_label'>止领期间：</label>
                    </td>
                    <td colSpan='1' id='startDrawDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='stopDrawDate' width='100%' binding="{name:'stopDrawDate'}"></div>
                    </td>
                    <td align='right' id='stopDrawDateUnit_label_td' rowSpan='1'>
                        <label id='startDrawDateUnit_label'>止领期间单位：</label>
                    </td>
                    <td colSpan='1' id='stopDrawDateUnit_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='stopDrawDateUnit' width='100%' binding="{name:'stopDrawDateUnit'}" dataProvider="{store:'ds_unit'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_live_11_tr'>
                    <td align='right' id='stopDrawDate_label_td' rowSpan='1'>
                        <label id='stopDrawDateCalcRef_label'>止领日期计算参照：</label>
                    </td>
                    <td colSpan='1' id='stopDrawDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='stopDrawDateCalcRef' maxLength='2' width='100%' binding="{name:'stopDrawDateCalcRef'}" dataProvider="{store:'calc_ref'}"></div>
                    </td>
                    <td align='right' id='startDrawDateUnit_label_td' rowSpan='1'>
                        <label id='stopDrawDateCalcWay_label'>止领日期计算方式：</label>
                    </td>
                    <td colSpan='1' id='startDrawDateUnit_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='stopDrawDateCalcWay' maxLength='2' width='100%' binding="{name:'stopDrawDateCalcWay'}" dataProvider="{store:'calc_way'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='form_live_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_live_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
