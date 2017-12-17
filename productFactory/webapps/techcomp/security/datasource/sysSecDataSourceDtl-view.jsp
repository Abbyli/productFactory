
<%--
	
    @author dongyw
    @creationTime 2014-07-02 16:21:46
    @modificationTime 2014-08-15 10:16:57
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datasource/sysSecDataSourceDtl-processor.js?version=20140815101657"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datasource/sysSecDataSourceDtl-view.js?version=20140815101657"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecDataSourceDtl.page_initEvents&&dojo.hitch(sysSecDataSourceDtl,sysSecDataSourceDtl.page_initEvents)();
				sysSecDataSourceDtl.page_load&&dojo.hitch(sysSecDataSourceDtl,sysSecDataSourceDtl.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataSource'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='25%'></col>
                        <col width='40%'></col>
                        <col width='35%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='30px' id='form1_0_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>名称：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' disabled='true' id='name' readOnly='true' required='true' width='100%' binding="{name:'name'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_1_tr'>
                            <td align='right' id='url_label_td' rowSpan='1'>
                                <label id='url_label'>数据源地址：</label>
                            </td>
                            <td colSpan='1' id='url_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' disabled='true' id='url' readOnly='true' required='true' width='100%' binding="{name:'url'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_2_tr'>
                            <td align='right' id='driver_label_td' rowSpan='1'>
                                <label id='driver_label'>驱动：</label>
                            </td>
                            <td colSpan='1' id='driver_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' disabled='true' id='driver' readOnly='true' required='true' width='100%' binding="{name:'driver'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_3_tr'>
                            <td align='right' id='userName_label_td' rowSpan='1'>
                                <label id='userName_label'>账号：</label>
                            </td>
                            <td colSpan='1' id='userName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' disabled='true' id='userName' readOnly='true' required='true' width='100%' binding="{name:'userName'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_4_tr'>
                            <td align='right' id='passWord_label_td' rowSpan='1'>
                                <label id='passWord_label'>密码：</label>
                            </td>
                            <td colSpan='1' id='passWord_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' disabled='true' id='passWord' password='true' readOnly='true' width='100%' binding="{name:'passWord'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_5_tr'>
                            <td align='right' id='maxConnCount_label_td' rowSpan='1'>
                                <label id='maxConnCount_label'>最大连接数：</label>
                            </td>
                            <td colSpan='1' id='maxConnCount_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' disabled='true' id='maxConnCount' readOnly='true' width='100%' binding="{name:'maxConnCount'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_6_tr'>
                            <td align='right' id='minConnCount_label_td' rowSpan='1'>
                                <label id='minConnCount_label'>最小连接数：</label>
                            </td>
                            <td colSpan='1' id='minConnCount_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' disabled='true' id='minConnCount' readOnly='true' width='100%' binding="{name:'minConnCount'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_7_tr'>
                            <td align='right' id='maxIdleCount_label_td' rowSpan='1'>
                                <label id='maxIdleCount_label'>最大空闲数：</label>
                            </td>
                            <td colSpan='1' id='maxIdleCount_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' disabled='true' id='maxIdleCount' readOnly='true' width='100%' binding="{name:'maxIdleCount'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_8_tr'>
                            <td align='right' id='maxWait_label_td' rowSpan='1'>
                                <label id='maxWait_label'>最大等待时间：</label>
                            </td>
                            <td colSpan='1' id='maxWait_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' disabled='true' id='maxWait' readOnly='true' width='100%' binding="{name:'maxWait'}"></div>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_9_tr'>
                            <td align='right' id='initSize_label_td' rowSpan='1'>
                                <label id='initSize_label'>初始化连接数：</label>
                            </td>
                            <td colSpan='1' id='initSize_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' disabled='true' id='initSize' readOnly='true' width='100%' binding="{name:'initSize'}"></div>
                            </td>
                        </tr>
                        <tr height='59px' id='form1_10_tr'>
                            <td align='right' id='testSql_label_td' rowSpan='1'>
                                <label id='testSql_label'>测试连接SQL：</label>
                            </td>
                            <td colSpan='2' id='testSql_td' rowSpan='1'>
                                <div dojoType='unieap.form.Textarea' disabled='true' id='testSql' readOnly='true' width='80%' binding="{name:'testSql'}"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
