
<%--
	现价利率
    @author Neusoft
    @creationTime 2016-11-16 09:52:20
    @modificationTime 2017-03-09 09:54:01
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateCruuDialog-processor.js?version=20170309095401"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateCruuDialog-view.js?version=20170309095401"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateCruuDialog.page_initEvents&&dojo.hitch(pFInterestRateCruuDialog,pFInterestRateCruuDialog.page_initEvents)();
				pFInterestRateCruuDialog.page_load&&dojo.hitch(pFInterestRateCruuDialog,pFInterestRateCruuDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form5_2' binding="{store:'add_tCurrPriceIntrate'}">
        <table id='form5_2_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form5_2_1_tr'>
                    <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                        <label id='insurtypeCode_label'>险种编码：</label>
                    </td>
                    <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='insurtypeCode' maxLength='8' required='true' width='100%' binding="{name:'insurtypeCode'}" dataProvider="{store:'INSURTYPE_CODE'}" decoder="{displayAttr:'insurtypeName',valueAttr:'insurtypeCode'}" popup="{height:'200px'}"></div>
                    </td>
                    <td align='right' id='paymntFreq_label_td' rowSpan='1'>
                        <label id='paymntFreq_label'>交费频率：</label>
                    </td>
                    <td colSpan='1' id='paymntFreq_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='paymntFreq' maxLength='2' required='true' width='100%' binding="{name:'paymntFreq'}" dataProvider="{store:'paymntFreq'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form5_2_3_tr'>
                    <td align='right' id='startYearterm_label_td' rowSpan='1'>
                        <label id='startYearterm_label'>起始年期：</label>
                    </td>
                    <td colSpan='1' id='startYearterm_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='startYearterm' maxLength='22' required='true' width='100%' binding="{name:'startYearterm'}" range="{allowDecimal:false,max:99,min:0}"></div>
                    </td>
                    <td align='right' id='endYearterm_label_td' rowSpan='1'>
                        <label id='endYearterm_label'>终止年期：</label>
                    </td>
                    <td colSpan='1' id='endYearterm_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='endYearterm' maxLength='22' required='true' width='100%' binding="{name:'endYearterm'}" range="{allowDecimal:false,max:99,min:0}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form5_2_4_tr'>
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
    <table id='form5_2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form5_2_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
