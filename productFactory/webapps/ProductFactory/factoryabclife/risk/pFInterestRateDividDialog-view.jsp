
<%--
	红利参数
    @author Neusoft
    @creationTime 2016-11-16 09:52:20
    @modificationTime 2017-03-09 09:54:35
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateDividDialog-processor.js?version=20170309095435"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateDividDialog-view.js?version=20170309095435"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateDividDialog.page_initEvents&&dojo.hitch(pFInterestRateDividDialog,pFInterestRateDividDialog.page_initEvents)();
				pFInterestRateDividDialog.page_load&&dojo.hitch(pFInterestRateDividDialog,pFInterestRateDividDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form4_2' binding="{store:'add_tDividParam'}">
        <table id='form4_2_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form4_2_1_tr'>
                    <td align='right' id='accountingYear_label_td' rowSpan='1'>
                        <label id='accountingYear_label'>会计年度：</label>
                    </td>
                    <td colSpan='1' id='accountingYear_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='accountingYear' maxLength='22' required='true' width='100%' binding="{name:'accountingYear'}" range="{allowDecimal:false,max:2200,min:1970}"></div>
                    </td>
                    <td align='right' id='dividBizSurplus_label_td' rowSpan='1'>
                        <label id='dividBizSurplus_label'>分红业务盈余：</label>
                    </td>
                    <td colSpan='1' id='dividBizSurplus_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='dividBizSurplus' maxLength='22' required='true' width='100%' binding="{name:'dividBizSurplus'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form4_2_3_tr'>
                    <td align='right' id='allocablSurplus_label_td' rowSpan='1'>
                        <label id='allocablSurplus_label'>可分配盈余：</label>
                    </td>
                    <td colSpan='1' id='allocablSurplus_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='allocablSurplus' maxLength='22' required='true' width='100%' binding="{name:'allocablSurplus'}"></div>
                    </td>
                    <td align='right' id='payoutDividAmt_label_td' rowSpan='1'>
                        <label id='payoutDividAmt_label'>派发红利金额：</label>
                    </td>
                    <td colSpan='1' id='payoutDividAmt_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='payoutDividAmt' maxLength='22' required='true' width='100%' binding="{name:'payoutDividAmt'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form4_2_5_tr'>
                    <td align='right' id='accumIntbearIntrate_label_td' rowSpan='1'>
                        <label id='accumIntbearIntrate_label'>累积生息利率：</label>
                    </td>
                    <td colSpan='1' id='accumIntbearIntrate_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='accumIntbearIntrate' maxLength='22' required='true' width='100%' binding="{name:'accumIntbearIntrate'}" range="{max:1,min:0}"></div>
                    </td>
                    <td align='right' id='payDividPropor_label_td' rowSpan='1'>
                        <label id='payDividPropor_label'>支付红利的比例：</label>
                    </td>
                    <td colSpan='1' id='payDividPropor_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='payDividPropor' maxLength='22' required='true' width='100%' binding="{name:'payDividPropor'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form4_2_6_tr'>
                    <td align='right' id='dividAnnounceDate_label_td' rowSpan='1'>
                        <label id='dividAnnounceDate_label'>红利公布日：</label>
                    </td>
                    <td colSpan='1' id='dividAnnounceDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='dividAnnounceDate' required='true' width='100%' binding="{name:'dividAnnounceDate'}"></div>
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
    <table id='form4_2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form4_2_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
