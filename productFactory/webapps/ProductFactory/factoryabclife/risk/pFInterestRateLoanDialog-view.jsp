
<%--
	贷款利率
    @author Neusoft
    @creationTime 2016-11-16 09:52:20
    @modificationTime 2017-03-09 09:57:40
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateLoanDialog-processor.js?version=20170309095740"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateLoanDialog-view.js?version=20170309095740"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateLoanDialog.page_initEvents&&dojo.hitch(pFInterestRateLoanDialog,pFInterestRateLoanDialog.page_initEvents)();
				pFInterestRateLoanDialog.page_load&&dojo.hitch(pFInterestRateLoanDialog,pFInterestRateLoanDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form3_2' binding="{store:'add_tLoanAutoPayIntrate'}">
        <table id='form3_2_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form3_2_1_tr'>
                    <td align='right' id='period_label_td' rowSpan='1'>
                        <label id='period_label'>期间：</label>
                    </td>
                    <td colSpan='1' id='period_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='period' maxLength='22' required='true' width='100%' binding="{name:'period'}" range="{allowDecimal:false,max:99,min:0}"></div>
                    </td>
                    <td align='right' id='periodFlg_label_td' rowSpan='1'>
                        <label id='periodFlg_label'>期间标记：</label>
                    </td>
                    <td colSpan='1' id='periodFlg_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='periodFlg' maxLength='2' required='true' width='100%' binding="{name:'periodFlg'}" dataProvider="{store:'periodFlg'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form3_2_3_tr'>
                    <td align='right' id='intrateType_label_td' rowSpan='1'>
                        <label id='intrateType_label'>利率类型：</label>
                    </td>
                    <td colSpan='1' id='intrateType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='intrateType' maxLength='2' required='true' width='100%' binding="{name:'intrateType'}" dataProvider="{store:'intrateType'}" popup="{height:'300px'}"></div>
                    </td>
                    <td align='right' id='depositLoanFlg_label_td' rowSpan='1'>
                        <label id='depositLoanFlg_label'>存贷标记：</label>
                    </td>
                    <td colSpan='1' id='depositLoanFlg_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='depositLoanFlg' maxLength='2' required='true' width='100%' binding="{name:'depositLoanFlg'}" dataProvider="{store:'depositLoanFlg'}" popup="{height:'auto'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form3_2_5_tr'>
                    <td align='right' id='announceDate_label_td' rowSpan='1'>
                        <label id='announceDate_label'>公布日期：</label>
                    </td>
                    <td colSpan='1' id='announceDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='announceDate' required='true' width='100%' binding="{name:'announceDate'}"></div>
                    </td>
                    <td align='right' id='endDate_label_td' rowSpan='1'>
                        <label id='endDate_label'>止期：</label>
                    </td>
                    <td colSpan='1' id='endDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='endDate' required='true' width='100%' binding="{name:'endDate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form3_2_6_tr'>
                    <td align='right' id='intrate_label_td' rowSpan='1'>
                        <label id='intrate_label'>利率：</label>
                    </td>
                    <td colSpan='1' id='intrate_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='intrate' maxLength='12' required='true' width='100%' binding="{name:'intrate'}" range="{max:1,min:0}"></div>
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
    <table id='form3_2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col width='145px'></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' class='myButton' id='form3_2_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
