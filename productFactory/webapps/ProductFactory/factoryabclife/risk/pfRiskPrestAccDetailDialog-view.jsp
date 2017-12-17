
<%--
	
    @author Administrator
    @creationTime 2016-07-28 15:20:04
    @modificationTime 2016-09-28 16:59:34
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAccDetailDialog-processor.js?version=20160928165934"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestAccDetailDialog-view.js?version=20160928165934"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestAccDetailDialog.page_initEvents&&dojo.hitch(pfRiskPrestAccDetailDialog,pfRiskPrestAccDetailDialog.page_initEvents)();
				pfRiskPrestAccDetailDialog.page_load&&dojo.hitch(pfRiskPrestAccDetailDialog,pfRiskPrestAccDetailDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'tClaimPayItemDetail_accdetail_dialog'}">
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
                    <td align='right' id='claimPayItemCode_label_td' rowSpan='1'>
                        <label id='claimPayItemCode_label'>医疗费用/疾病代码：</label>
                    </td>
                    <td colSpan='1' id='claimPayItemCode_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='claimPayItemCode' maxLength='10' required='true' width='100%' binding="{name:'claimPayItemCode'}" validator="{errorMsg:'只能录入6位数字或字母',realTime:true,regExp:/^[A-Za-z0-9]{6}$/}"></div>
                    </td>
                    <td align='right' id='claimPayItemName_label_td' rowSpan='1'>
                        <label id='claimPayItemName_label'>医疗费用/疾病名称：</label>
                    </td>
                    <td colSpan='1' id='claimPayItemName_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='claimPayItemName' maxLength='100' required='true' width='100%' binding="{name:'claimPayItemName'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_2_tr'>
                    <td align='right' id='claimPayCalcWay_label_td' rowSpan='1'>
                        <label id='claimPayCalcWay_label'>费用计算方式：</label>
                    </td>
                    <td colSpan='1' id='claimPayCalcWay_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='comboBox1' required='true' width='100%' binding="{name:'claimPayCalcWay'}" dataProvider="{store:'ds_type_acc'}"></div>
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
    <table class='toolbar-table' id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
