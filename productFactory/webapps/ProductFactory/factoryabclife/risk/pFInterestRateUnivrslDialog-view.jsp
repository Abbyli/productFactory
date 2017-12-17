
<%--
	万能险新增
    @author Neusoft
    @creationTime 2016-11-08 10:09:56
    @modificationTime 2017-03-09 09:58:28
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateUnivrslDialog-processor.js?version=20170309095828"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateUnivrslDialog-view.js?version=20170309095828"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateUnivrslDialog.page_initEvents&&dojo.hitch(pFInterestRateUnivrslDialog,pFInterestRateUnivrslDialog.page_initEvents)();
				pFInterestRateUnivrslDialog.page_load&&dojo.hitch(pFInterestRateUnivrslDialog,pFInterestRateUnivrslDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1_2' binding="{store:'add_tUnivrslSettlIntrate'}">
        <table id='form1_2_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form1_2_1_tr'>
                    <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                        <label id='insurtypeCode_label'>险种编码：</label>
                    </td>
                    <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='insurtypeCode' maxLength='20' required='true' width='100%' binding="{name:'insurtypeCode'}" decoder="{displayAttr:'insurtypeName',valueAttr:'insurtypeCode'}" popup="{height:'200px'}"></div>
                    </td>
                    <td align='right' id='accCode_label_td' rowSpan='1'>
                        <label id='accCode_label'>账户编码：</label>
                    </td>
                    <td colSpan='1' id='accCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='accCode' width='100%' binding="{name:'accCode'}"></div>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='accCode1' maxLength='20' required='true' width='100%' style='display:none'></div>
                    </td>
                </tr>
                <tr id='form1_2_3_tr'>
                    <td align='right' id='accountingYear_label_td' rowSpan='1'>
                        <label id='accountingYear_label'>会计年度：</label>
                    </td>
                    <td colSpan='1' id='accountingYear_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='accountingYear' maxLength='10' required='true' width='100%' binding="{name:'accountingYear'}" range="{allowDecimal:false,max:2200,min:1970}" validator="{errorMsg:'请输入1970-2200之间年份四位数字！'}"></div>
                    </td>
                    <td align='right' id='settlDate_label_td' rowSpan='1'>
                        <label id='settlDate_label'>结算日期：</label>
                    </td>
                    <td colSpan='1' id='settlDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='settlDate' required='true' width='100%' binding="{name:'settlDate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_2_5_tr'>
                    <td align='right' id='intrateShouldAnnounceDate_label_td' rowSpan='1'>
                        <label id='intrateShouldAnnounceDate_label'>利率应公布日期：</label>
                    </td>
                    <td colSpan='1' id='intrateShouldAnnounceDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='intrateShouldAnnounceDate' required='true' width='100%' binding="{name:'intrateShouldAnnounceDate'}"></div>
                    </td>
                    <td align='right' id='intrateActualAnnounceDate_label_td' rowSpan='1'>
                        <label id='intrateActualAnnounceDate_label'>利率实际公布日期：</label>
                    </td>
                    <td colSpan='1' id='intrateActualAnnounceDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='intrateActualAnnounceDate' required='true' width='100%' binding="{name:'intrateActualAnnounceDate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_2_7_tr'>
                    <td align='right' id='intrateType_label_td' rowSpan='1'>
                        <label id='intrateType_label'>利率类型 ：</label>
                    </td>
                    <td colSpan='1' id='intrateType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='intrateType' maxLength='2' required='true' width='100%' binding="{name:'intrateType'}" dataProvider="{store:'intrateType'}" popup="{height:'300px'}"></div>
                    </td>
                    <td align='right' id='intrate_label_td' rowSpan='1'>
                        <label id='intrate_label'>利率：</label>
                    </td>
                    <td colSpan='1' id='intrate_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='intrate' maxLength='12' required='true' width='100%' binding="{name:'intrate'}" range="{max:1,min:0}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_2_9_tr'>
                    <td align='right' id='intrateApplicationStartDate_label_td' rowSpan='1'>
                        <label id='intrateApplicationStartDate_label'>利率应用开始日期：</label>
                    </td>
                    <td colSpan='1' id='intrateApplicationStartDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='intrateApplicationStartDate' required='true' width='100%' binding="{name:'intrateApplicationStartDate'}"></div>
                    </td>
                    <td align='right' id='intrateApplicationEndDate_label_td' rowSpan='1'>
                        <label id='intrateApplicationEndDate_label'>利率应用结束日期：</label>
                    </td>
                    <td colSpan='1' id='intrateApplicationEndDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='intrateApplicationEndDate' required='true' width='100%' binding="{name:'intrateApplicationEndDate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form1_2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col width='150px'></col>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_2_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
