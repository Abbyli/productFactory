
<%--
	人员定义弹窗
    @author zhy
    @creationTime 2016-07-15 13:50:31
    @modificationTime 2016-09-28 16:49:07
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamPersonnelDialog-processor.js?version=20160928164907"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskParamPersonnelDialog-view.js?version=20160928164907"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskParamPersonnelDialog.page_initEvents&&dojo.hitch(pfRiskParamPersonnelDialog,pfRiskParamPersonnelDialog.page_initEvents)();
				pfRiskParamPersonnelDialog.page_load&&dojo.hitch(pfRiskParamPersonnelDialog,pfRiskParamPersonnelDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_personnel' binding="{store:'tInsurtypeCustElemCtrl_addPersonnel'}">
        <table id='form_personnel_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_personnel_1_tr'>
                    <td align='right' id='psnnlType__personnel_label_td' rowSpan='1'>
                        <label id='psnnlType__personnel_label'>人员类型：</label>
                    </td>
                    <td colSpan='1' id='psnnlType__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='psnnlType__personnel' maxLength='2' required='true' width='100%' binding="{name:'psnnlType'}" dataProvider="{store:'ds_pelType'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='gender__personnel_label_td' rowSpan='1'>
                        <label id='gender__personnel_label'>性别：</label>
                    </td>
                    <td colSpan='1' id='gender__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='gender__personnel' maxLength='2' required='true' width='100%' binding="{name:'gender'}" dataProvider="{store:'ds_pelSex'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_personnel_3_tr'>
                    <td align='right' id='applyMinAge__personnel_label_td' rowSpan='1'>
                        <label id='applyMinAge__personnel_label'>最小年龄：</label>
                    </td>
                    <td colSpan='1' id='applyMinAge__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='applyMinAge__personnel' maxLength='3' required='true' width='100%' binding="{name:'applyMinAge'}" validator="{errorMsg:'数据不合法',regExp:/^[0-9]{0,3}$/}"></div>
                    </td>
                    <td align='right' id='applyMinAgeUnit__personnel_label_td' rowSpan='1'>
                        <label id='applyMinAgeUnit__personnel_label'>最小年龄单位：</label>
                    </td>
                    <td colSpan='1' id='applyMinAgeUnit__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='applyMinAgeUnit__personnel' maxLength='2' required='true' width='100%' binding="{name:'applyMinAgeUnit'}" dataProvider="{store:'ds_pelUnit'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_personnel_5_tr'>
                    <td align='right' id='applyMaxAge__personnel_label_td' rowSpan='1'>
                        <label id='applyMaxAge__personnel_label'>最大年龄：</label>
                    </td>
                    <td colSpan='1' id='applyMaxAge__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='applyMaxAge__personnel' maxLength='3' required='true' width='100%' binding="{name:'applyMaxAge'}" validator="{errorMsg:'数据不合法',regExp:/^[0-9]{0,3}$/}"></div>
                    </td>
                    <td align='right' id='applyMaxAgeUnit__personnel_label_td' rowSpan='1'>
                        <label id='applyMaxAgeUnit__personnel_label'>最大年龄单位：</label>
                    </td>
                    <td colSpan='1' id='applyMaxAgeUnit__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='applyMaxAgeUnit__personnel' maxLength='2' required='true' width='100%' binding="{name:'applyMaxAgeUnit'}" dataProvider="{store:'ds_pelUnit'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_personnel_7_tr'>
                    <td align='right' id='insurRenewMaxAge__personnel_label_td' rowSpan='1'>
                        <label id='insurRenewMaxAge__personnel_label'>最大续保年龄：</label>
                    </td>
                    <td colSpan='1' id='insurRenewMaxAge__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='insurRenewMaxAge__personnel' maxLength='3' width='100%' binding="{name:'insurRenewMaxAge'}" validator="{errorMsg:'数据不合法',regExp:/^[0-9]{0,3}$/}"></div>
                    </td>
                    <td align='right' id='insurRenewMaxAgeUnit__personnel_label_td' rowSpan='1'>
                        <label id='insurRenewMaxAgeUnit__personnel_label'>最大续保年龄单位：</label>
                    </td>
                    <td colSpan='1' id='insurRenewMaxAgeUnit__personnel_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='insurRenewMaxAgeUnit__personnel' maxLength='2' width='100%' binding="{name:'insurRenewMaxAgeUnit'}" dataProvider="{store:'ds_pelUnit'}" popup="{height:'300px'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='form_personnel_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_personnel_saveButton' label='保存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
