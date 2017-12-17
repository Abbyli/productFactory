
<%--
	险种搭配弹窗
    @author zhy
    @creationTime 2016-08-01 11:22:07
    @modificationTime 2017-03-24 15:10:45
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMatchRelDialog-processor.js?version=20170324151045"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfMatchRelDialog-view.js?version=20170324151045"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfMatchRelDialog.page_initEvents&&dojo.hitch(pfMatchRelDialog,pfMatchRelDialog.page_initEvents)();
				pfMatchRelDialog.page_load&&dojo.hitch(pfMatchRelDialog,pfMatchRelDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form_MatchRel' binding="{store:'tProductInsurtypeMatchRel_form'}">
        <table id='form_MatchRel_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr id='form_MatchRel_1_tr'>
                    <td align='right' id='assocProductCode__MatchRel_label_td' rowSpan='1'>
                        <label id='assocProductCode__MatchRel_label'>关联产品代码：</label>
                    </td>
                    <td colSpan='1' id='assocProductCode__MatchRel_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='assocProductCode__MatchRel' maxLength='6' required='true' width='100%' binding="{name:'assocProductCode'}"></div>
                    </td>
                    <td align='right' id='agentFeeDeducFlg__MatchRel_label_td' rowSpan='1'>
                        <label id='risk_name'>险种名称：</label>
                    </td>
                    <td colSpan='1' id='agentFeeDeducFlg__MatchRel_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' disabled='true' id='textBox_riskname' width='100%'></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr height='25px'>
                    <td align='right'>
                        <label id='agentFeeDeducFlg__MatchRel_label'>是否代扣费：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' hasDefault='true' id='agentFeeDeducFlg__MatchRel' maxLength='2' width='100%' binding="{markDirty:false,name:'agentFeeDeducFlg'}" dataProvider="{store:'ds_deduc'}"></div>
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
    <table class='toolbar-table' id='form_MatchRel_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td align='right'>
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保存' width='140px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
