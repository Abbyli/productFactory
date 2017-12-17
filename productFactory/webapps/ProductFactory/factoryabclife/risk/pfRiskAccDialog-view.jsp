
<%--
	账户定义弹窗
    @author shichl
    @creationTime 2016-06-23 15:02:29
    @modificationTime 2017-03-16 14:50:13
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAccDialog-processor.js?version=20170316145013"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskAccDialog-view.js?version=20170316145013"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAccDialog.page_initEvents&&dojo.hitch(pfRiskAccDialog,pfRiskAccDialog.page_initEvents)();
				pfRiskAccDialog.page_load&&dojo.hitch(pfRiskAccDialog,pfRiskAccDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'tInsurtypeAccDef_dialog'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form1_1_tr'>
                    <td align='right' id='insurtypeAccType_label_td' rowSpan='1'>
                        <label id='insurtypeAccType_label'>账户类型：</label>
                    </td>
                    <td colSpan='1' id='insurtypeAccType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='insurtypeAccType' maxLength='6' required='true' width='100%' binding="{name:'insurtypeAccType'}" dataProvider="{store:'ds_type_ac'}" popup="{height:'300px'}"></div>
                    </td>
                    <td align='right' id='insurtypeAccCode_label_td' rowSpan='1'>
                        <label id='insurtypeAccCode_label'>险种账户代码：</label>
                    </td>
                    <td colSpan='1' id='insurtypeAccCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeAccCode' maxLength='6' readOnly='true' required='true' width='100%' binding="{name:'insurtypeAccCode'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_3_tr'>
                    <td align='right' id='insurtypeAccName_label_td' rowSpan='1'>
                        <label id='insurtypeAccName_label'>险种账户名称：</label>
                    </td>
                    <td colSpan='1' id='insurtypeAccName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='insurtypeAccName' maxLength='100' required='true' width='100%' binding="{name:'insurtypeAccName'}"></div>
                    </td>
                    <td align='right' id='accrualType_label_td' rowSpan='1'>
                        <label id='accrualType_label'>计息类型：</label>
                    </td>
                    <td colSpan='1' id='accrualType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='accrualType' maxLength='2' required='true' width='100%' binding="{name:'accrualType'}" dataProvider="{store:'ds_accrula_type'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_5_tr'>
                    <td align='right' id='accrualMethod_label_td' rowSpan='1'>
                        <label id='accrualMethod_label'>计息方法：</label>
                    </td>
                    <td colSpan='1' id='accrualMethod_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='accrualMethod' maxLength='2' required='true' width='100%' binding="{name:'accrualMethod'}" dataProvider="{store:'ds_accrula_method'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='settleCyc_label_td' rowSpan='1'>
                        <label id='settleCyc_label'>结算周期：</label>
                    </td>
                    <td colSpan='1' id='settleCyc_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='settleCyc' maxLength='4' required='true' width='80%' binding="{name:'settleCyc'}"></div>
                        <label id='label1'>月</label>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_7_tr'>
                    <td align='right' id='settleTimepoint_label_td' rowSpan='1'>
                        <label id='settleTimepoint_label'>结算时点：</label>
                    </td>
                    <td colSpan='1' id='settleTimepoint_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='settleTimepoint' maxLength='2' required='true' width='100%' binding="{name:'settleTimepoint'}" dataProvider="{store:'ds_settle_timepoint'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='settleType_label_td' rowSpan='1'>
                        <label id='settleType_label'>结算类型：</label>
                    </td>
                    <td colSpan='1' id='settleType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='settleType' maxLength='2' required='true' width='100%' binding="{name:'settleType'}" dataProvider="{store:'ds_settle_type'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_9_tr'>
                    <td align='right' id='isProvision_label_td' rowSpan='1'>
                        <label id='isProvision_label'>是否计提：</label>
                    </td>
                    <td colSpan='1' id='isProvision_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='isProvision' maxLength='2' width='100%' binding="{name:'isProvision'}" dataProvider="{store:'ds_is_provision'}"></div>
                    </td>
                    <td align='right' id='provisionCyc_label_td' rowSpan='1'>
                        <label id='provisionCyc_label'>计提周期：</label>
                    </td>
                    <td colSpan='1' id='provisionCyc_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='provisionCyc' maxLength='4' width='80%' binding="{name:'provisionCyc'}"></div>
                        <label id='label2'>月</label>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
