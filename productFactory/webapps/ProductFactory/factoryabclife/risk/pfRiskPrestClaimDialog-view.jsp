
<%--
	理赔给付弹窗
    @author zhy
    @creationTime 2016-07-11 09:20:15
    @modificationTime 2017-02-15 16:41:40
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestClaimDialog-processor.js?version=20170215164140"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestClaimDialog-view.js?version=20170215164140"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestClaimDialog.page_initEvents&&dojo.hitch(pfRiskPrestClaimDialog,pfRiskPrestClaimDialog.page_initEvents)();
				pfRiskPrestClaimDialog.page_load&&dojo.hitch(pfRiskPrestClaimDialog,pfRiskPrestClaimDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_addClaim' binding="{store:'tClaimGivepayDef_Claim'}">
        <table id='form_addClaim_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_addClaim_1_tr'>
                    <td align='right' id='claimGivepayCode__addClaim_label_td' rowSpan='1'>
                        <label id='Code'>理赔给付代码：</label>
                    </td>
                    <td colSpan='1' id='claimGivepayCode__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='claimGivepayCode' width='100%' binding="{name:'claimGivepayCode'}" validator="{errorMsg:'格式为：xxxx4x0x如：10014101',regExp:/^[0-9]{4}[4][0-9][0][0-9]$/}"></div>
                    </td>
                    <td align='right' id='claimGivepayName__addClaim_label_td' rowSpan='1'>
                        <label id='claimGivepayName__addClaim_label'>理赔给付名称：</label>
                    </td>
                    <td colSpan='1' id='claimGivepayName__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='claimGivepayName__addClaim' maxLength='120' required='true' trim='true' width='100%' binding="{name:'claimGivepayName'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_addClaim_3_tr'>
                    <td align='right' id='claimClaimPayType__addClaim_label_td' rowSpan='1'>
                        <label id='claimClaimPayType__addClaim_label'>赔付类型：</label>
                    </td>
                    <td colSpan='1' id='claimClaimPayType__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='claimClaimPayType__addClaim' maxLength='2' required='true' width='100%' binding="{name:'claimClaimPayType'}" dataProvider="{store:'ds_payType'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='accidOccurReason__addClaim_label_td' rowSpan='1'>
                        <label id='accidOccurReason__addClaim_label'>出险原因：</label>
                    </td>
                    <td colSpan='1' id='accidOccurReason__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='accidOccurReason__addClaim' maxLength='2' required='true' width='100%' binding="{name:'accidOccurReason'}" dataProvider="{store:'ds_reson'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_addClaim_5_tr'>
                    <td align='right' id='claimSubtype__addClaim_label_td' rowSpan='1'>
                        <label id='claimSubtype__addClaim_label'>交通工具：</label>
                    </td>
                    <td colSpan='1' id='claimSubtype__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='claimSubtype__addClaim' width='100%' binding="{name:'claimSubtype'}" dataProvider="{store:'ds_vechicle'}" popup="{displayStyle:'multi',height:'300px'}"></div>
                    </td>
                    <td align='right' id='claimLiabStartDateAlgo__addClaim_label_td' rowSpan='1'>
                        <label id='liabExempProcessActionAlgo__addClaim_label'>免责处理动作：</label>
                    </td>
                    <td colSpan='1' id='claimLiabStartDateAlgo__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='liabExempProcessActionAlgo__addClaim' maxLength='6' width='100%' binding="{name:'liabExempProcessActionAlgo'}" dataProvider="{store:'ds_action'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form_addClaim_8_tr'>
                    <td align='right' id='indemExemptId__addClaim_label_td' rowSpan='1'>
                        <label id='label_actionType'>赔付后动作：</label>
                    </td>
                    <td colSpan='1' id='indemExemptId__addClaim_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='comboBox_actionType' width='100%' dataProvider="{store:'ds_actionType'}" popup="{displayStyle:'multi'}"></div>
                    </td>
                    <td align='right'>
                        <label id='indemExemptId__addClaim_label' style='display:none'>观察期：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.RadioButtonGroup' cols='2' id='indemExemptId__addClaim' labelAlign='right' maxLength='2' width='48%' style='display:none' dataProvider="{store:'ds_exempt'}"></div>
                        <div dojoType='unieap.form.TextBox' id='textBox1' width='30%' style='display:none' binding="{name:'waitPeriodDays'}" validator="{errorMsg:'只能是三位数字',regExp:/^[0-9]{0,3}$/}"></div>
                        <label id='label1' width='18%' style='display:none'>天</label>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='form_addClaim_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form_addClaim_saveButton' label='保存' width='140px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
