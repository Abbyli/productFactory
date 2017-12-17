
<%--
	
    @author user
    @creationTime 2014-07-28 15:05:57
    @modificationTime 2014-08-14 09:42:29
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/data_authority/data_authority_edit-processor.js?version=20140814094229"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/data_authority/data_authority_edit-view.js?version=20140814094229"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				data_authority_edit.page_initEvents&&dojo.hitch(data_authority_edit,data_authority_edit.page_initEvents)();
				data_authority_edit.page_load&&dojo.hitch(data_authority_edit,data_authority_edit.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataAuthority'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='20'></col>
                <col width='80'></col>
            </colgroup>
            <tbody>
                <tr height='30px' id='form1_1_tr'>
                    <td align='right' id='name_label_td' rowSpan='1'>
                        <label id='name_label'>名称：</label>
                    </td>
                    <td colSpan='1' id='name_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name' required='true' width='50%' binding="{name:'name'}"></div>
                        <div dojoType='unieap.form.TextBox' id='id' width='0px' binding="{name:'id'}"></div>
                    </td>
                </tr>
                <tr height='40px' id='form1_2_tr'>
                    <td align='right' height='30px' id='code_label_td' rowSpan='1'>
                        <label id='code_label'>编号：</label>
                    </td>
                    <td colSpan='1' id='code_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='code' required='true' width='50%' binding="{name:'code'}"></div>
                    </td>
                </tr>
                <tr height='40px' id='form1_3_tr'>
                    <td align='right' id='isEnabled_label_td' rowSpan='1'>
                        <label height='30px' id='isEnabled_label'>是否启用：</label>
                    </td>
                    <td colSpan='1' id='isEnabled_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='isEnabled' width='50%' binding="{name:'isEnabled'}" dataProvider="{store:'isEnabledDs'}"></div>
                    </td>
                </tr>
                <tr height='40px' id='form1_4_tr'>
                    <td align='right' id='appId_label_td' rowSpan='1'>
                        <label height='30px' id='appId_label'>所属应用：</label>
                    </td>
                    <td colSpan='1' id='appId_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='appId' required='true' width='50%' binding="{name:'appId'}" dataProvider="{store:'applicationDS'}" decoder="{displayAttr:'name',valueAttr:'id'}"></div>
                    </td>
                </tr>
                <tr height='40px' id='form1_5_tr'>
                    <td align='right' id='description_label_td' rowSpan='1'>
                        <label id='description_label'>描述：</label>
                    </td>
                    <td colSpan='1' id='description_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' height='59px' id='description' width='100%' binding="{name:'description'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.form.InlineEditBox' disabled='true' height='15px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col width='100px'></col>
            <col width='100px'></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' height='25px' id='form1_saveButton' label='保存' width='90px'></div>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' height='25px' id='form1_resetButton' label='关闭' width='90px'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
