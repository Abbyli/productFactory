
<%--
	新增产品及管理
    @author Neusoft
    @creationTime 2017-03-03 10:26:50
    @modificationTime 2017-03-17 14:31:48
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMarketManageDialog-processor.js?version=20170317143148"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMarketManageDialog-view.js?version=20170317143148"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfMarketManageDialog.page_initEvents&&dojo.hitch(pfMarketManageDialog,pfMarketManageDialog.page_initEvents)();
				pfMarketManageDialog.page_load&&dojo.hitch(pfMarketManageDialog,pfMarketManageDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'form_tProductSaleChnl'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr id='form1_1_tr'>
                    <td align='right' id='productCode_label_td' rowSpan='1'>
                        <label id='productCode_label'>产品代码：</label>
                    </td>
                    <td colSpan='1' id='productCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='productCode' maxLength='20' required='true' width='100%' binding="{name:'productCode'}" decoder="{displayAttr:'insurtypeName',valueAttr:'insurtypeCode'}" popup="{height:'200px'}"></div>
                    </td>
                    <td align='right' id='productVer_label_td' rowSpan='1'>
                        <label id='productVer_label'>产品版本：</label>
                    </td>
                    <td colSpan='1' id='productVer_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='productVer' maxLength='16' required='true' width='100%' binding="{name:'productVer'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_3_tr'>
                    <td align='right' id='saleChnl_label_td' rowSpan='1'>
                        <label id='saleChnl_label'>销售渠道：</label>
                    </td>
                    <td colSpan='1' id='saleChnl_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='saleChnl' maxLength='2' required='true' width='100%' binding="{name:'saleChnl'}" dataProvider="{store:'saleChnl'}" popup="{height:'auto'}"></div>
                    </td>
                    <td align='right' id='saleMngcom_label_td' rowSpan='1'>
                        <label id='saleMngcom_label'>销售机构：</label>
                    </td>
                    <td colSpan='1' id='saleMngcom_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='saleMngcom' maxLength='16' required='true' width='100%' binding="{name:'saleMngcom'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_5_tr'>
                    <td align='right' id='bankCode_label_td' rowSpan='1'>
                        <label id='bankCode_label'>银行代码：</label>
                    </td>
                    <td colSpan='1' id='bankCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='bankCode' maxLength='16' required='true' width='100%' binding="{name:'bankCode'}"></div>
                    </td>
                    <td align='right' id='saleState_label_td' rowSpan='1'>
                        <label id='startdate_label'>起售日期：</label>
                    </td>
                    <td colSpan='1' id='saleState_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='startdate' required='true' width='100%' binding="{name:'startdate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_7_tr'>
                    <td align='right' id='startdate_label_td' rowSpan='1'>
                        <label id='enddate_label'>停售日期：</label>
                    </td>
                    <td colSpan='1' id='startdate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='enddate' width='100%' binding="{name:'enddate'}"></div>
                    </td>
                    <td align='right' id='enddate_label_td' rowSpan='1'>
                    </td>
                    <td colSpan='1' id='enddate_td' rowSpan='1'>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
