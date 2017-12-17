
<%--
	
    @author zhangyujia
    @creationTime 2014-08-12 09:41:37
    @modificationTime 2014-08-14 08:44:11
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/role/sysSecRoleAdd-processor.js?version=20140814084411"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/role/sysSecRoleAdd-view.js?version=20140814084411"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecRoleAdd.page_initEvents&&dojo.hitch(sysSecRoleAdd,sysSecRoleAdd.page_initEvents)();
				sysSecRoleAdd.page_load&&dojo.hitch(sysSecRoleAdd,sysSecRoleAdd.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecRole'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='25%'></col>
                <col width='35%'></col>
                <col width='40%'></col>
            </colgroup>
            <tbody>
                <tr height='30px' id='form1_0_tr'>
                    <td align='right' height='21px' id='name_label_td' rowSpan='1'>
                        <label id='name_label'>角色名称：</label>
                    </td>
                    <td colSpan='1' id='name_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name' required='true' width='100%' binding="{name:'name'}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_1_tr'>
                    <td align='right' id='code_label_td' rowSpan='1'>
                        <label id='code_label'>角色编号：</label>
                    </td>
                    <td colSpan='1' id='code_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='code' required='true' width='100%' binding="{name:'code'}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_2_tr'>
                    <td align='right' id='status_label_td' rowSpan='1'>
                        <label id='status_label'>角色状态：</label>
                    </td>
                    <td colSpan='1' id='status_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='status' required='true' width='100%' binding="{name:'status'}" dataProvider="{store:'statusDs'}"></div>
                    </td>
                </tr>
                <tr height='59px' id='form1_3_tr'>
                    <td align='right' id='remark_label_td' rowSpan='1'>
                        <label id='remark_label'>角色描述：</label>
                    </td>
                    <td colSpan='2' id='remark_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='remark' width='80%' binding="{name:'remark'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col width='97px'></col>
            <col width='97px'></col>
        </colgroup>
        <tbody>
            <tr height='35px'>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
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
