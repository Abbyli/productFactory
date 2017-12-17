
<%--
	
    @author user
    @creationTime 2014-09-28 10:32:37
    @modificationTime 2014-10-09 16:58:14
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/resetpassword/resetPsd-processor.js?version=20141009165814"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/resetpassword/resetPsd-view.js?version=20141009165814"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				resetPsd.page_initEvents&&dojo.hitch(resetPsd,resetPsd.page_initEvents)();
				resetPsd.page_load&&dojo.hitch(resetPsd,resetPsd.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUser'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='20%'></col>
                <col width='70%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr height='33px' id='form1_0_tr'>
                    <td align='right' id='passwo_label_td' rowSpan='1'>
                        <label id='passwo_label'>新密码：</label>
                    </td>
                    <td colSpan='1' id='passwo_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='passwo' minLength='6' password='true' width='100%' binding="{name:'passwo'}" inputFilter="{filterRule:/[0-9A-Za-z]/}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr height='33px' id='form1_1_tr'>
                    <td align='right' id='newpsw_label_td' rowSpan='1'>
                        <label id='newpsw_label'>确认新密码：</label>
                    </td>
                    <td colSpan='1' id='newpsw_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='newpsw' minLength='6' password='true' width='100%' inputFilter="{filterRule:/[0-9A-Za-z]/}"></div>
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
            <col></col>
            <col></col>
            <col width='97px'></col>
            <col width='10%'></col>
        </colgroup>
        <tbody>
            <tr height='33px'>
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
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
