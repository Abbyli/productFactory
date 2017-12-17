
<%--
	
    @author dong-yw
    @creationTime 2014-06-30 17:11:39
    @modificationTime 2014-08-14 14:48:55
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/user/sysSecUserDtl-processor.js?version=20140814144855"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/user/sysSecUserDtl-view.js?version=20140814144855"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecUserDtl.page_initEvents&&dojo.hitch(sysSecUserDtl,sysSecUserDtl.page_initEvents)();
				sysSecUserDtl.page_load&&dojo.hitch(sysSecUserDtl,sysSecUserDtl.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUser'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='15%'></col>
                <col width='30%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr height='30px' id='form1_1_tr'>
                    <td align='right' height='40px' id='name_label_td' rowSpan='1'>
                        <label id='name_label'>人员姓名：</label>
                    </td>
                    <td colSpan='1' height='40px' id='name_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name' readOnly='true' required='true' width='100%' binding="{name:'name'}"></div>
                    </td>
                    <td align='right' height='40px' id='homeAddress_label_td' rowSpan='1'>
                        <label id='homeAddress_label'>家庭住址：</label>
                    </td>
                    <td colSpan='1' height='40px' id='homeAddress_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='homeAddress' readOnly='true' width='100%' binding="{name:'homeAddress'}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_3_tr'>
                    <td align='right' height='40px' id='account_label_td' rowSpan='1'>
                        <label id='account_label'>账号：</label>
                    </td>
                    <td colSpan='1' height='40px' id='account_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='account' readOnly='true' required='true' width='100%' binding="{name:'account'}" inputFilter="{filterRule:/^[a-zA-Z0-9._-]+$/}"></div>
                    </td>
                    <td align='right' height='40px' id='birthdate_label_td' rowSpan='1'>
                        <label id='birthdate_label'>出生日期：</label>
                    </td>
                    <td colSpan='1' height='40px' id='birthdate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' disabled='true' id='birthdate' readOnly='true' width='100%' binding="{name:'birthdate'}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_5_tr'>
                    <td align='right' height='40px' id='passwo_label_td' rowSpan='1'>
                        <label id='passwo_label'>密码：</label>
                    </td>
                    <td colSpan='1' height='40px' id='passwo_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='passwo' password='true' readOnly='true' required='true' width='100%' binding="{name:'passwo'}"></div>
                    </td>
                    <td align='right' height='40px' id='officeTelephone_label_td' rowSpan='1'>
                        <label id='officeTelephone_label'>办公电话：</label>
                    </td>
                    <td colSpan='1' height='40px' id='officeTelephone_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='officeTelephone' readOnly='true' width='100%' binding="{name:'officeTelephone'}" inputFilter="{filterRule:/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_7_tr'>
                    <td align='right' height='40px' id='code_label_td' rowSpan='1'>
                        <label id='code_label'>编号：</label>
                    </td>
                    <td colSpan='1' height='40px' id='code_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='code' readOnly='true' required='true' width='100%' binding="{name:'code'}" inputFilter="{filterRule:/^[a-zA-Z0-9._-]+$/}"></div>
                    </td>
                    <td align='right' height='40px' id='email_label_td' rowSpan='1'>
                        <label id='email_label'>邮件地址：</label>
                    </td>
                    <td colSpan='1' height='40px' id='email_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='email' readOnly='true' width='100%' binding="{name:'email'}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_9_tr'>
                    <td align='right' height='40px' id='sex_label_td' rowSpan='1'>
                        <label id='sex_label'>性别：</label>
                    </td>
                    <td colSpan='1' height='40px' id='sex_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' disabled='true' id='sex' readOnly='true' width='100%' binding="{name:'sex'}" dataProvider="{store:'sexDs'}"></div>
                    </td>
                    <td align='right' height='40px' id='mobileTelephone_label_td' rowSpan='1'>
                        <label id='mobileTelephone_label'>移动电话：</label>
                    </td>
                    <td colSpan='1' height='40px' id='mobileTelephone_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='mobileTelephone' readOnly='true' width='100%' binding="{name:'mobileTelephone'}" inputFilter="{filterRule:/^[0-9-]+$/}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_11_tr'>
                    <td align='right' height='40px' id='credentialsType_label_td' rowSpan='1'>
                        <label id='credentialsType_label'>证件类型：</label>
                    </td>
                    <td colSpan='1' height='40px' id='credentialsType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' disabled='true' id='credentialsType' readOnly='true' width='100%' binding="{name:'credentialsType'}" dataProvider="{store:'credentialsTypeDs'}"></div>
                    </td>
                    <td align='right' height='40px' id='homeTelephone_label_td' rowSpan='1'>
                        <label id='homeTelephone_label'>家庭电话：</label>
                    </td>
                    <td colSpan='1' height='40px' id='homeTelephone_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='homeTelephone' readOnly='true' width='100%' binding="{name:'homeTelephone'}" inputFilter="{filterRule:/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/}"></div>
                    </td>
                </tr>
                <tr height='30px' id='form1_13_tr'>
                    <td align='right' height='40px' id='credentialsNumber_label_td' rowSpan='1'>
                        <label id='credentialsNumber_label'>证件号码：</label>
                    </td>
                    <td colSpan='1' height='40px' id='credentialsNumber_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='credentialsNumber' readOnly='true' width='100%' binding="{name:'credentialsNumber'}"></div>
                    </td>
                    <td align='right' height='40px' id='fax_label_td' rowSpan='1'>
                        <label id='fax_label'>传真：</label>
                    </td>
                    <td colSpan='1' height='40px' id='fax_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='fax' readOnly='true' width='100%' binding="{name:'fax'}"></div>
                    </td>
                </tr>
                <tr height='59px' id='form1_14_tr'>
                    <td align='right' height='40px' id='description_label_td' rowSpan='1'>
                        <label id='description_label'>描述：</label>
                    </td>
                    <td colSpan='3' height='40px' id='description_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='description' readOnly='true' width='100%' binding="{name:'description'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
