
<%--
	
    @author zhangyujia
    @creationTime 2014-08-12 14:08:08
    @modificationTime 2014-12-31 14:48:32
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/role/sysSecRole_User-processor.js?version=20141231144832"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/role/sysSecRole_User-view.js?version=20141231144832"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecRole_User.page_initEvents&&dojo.hitch(sysSecRole_User,sysSecRole_User.page_initEvents)();
				sysSecRole_User.page_load&&dojo.hitch(sysSecRole_User,sysSecRole_User.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
            <table height='30px' id='ToolBar1' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col width='97px'></col>
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
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='savebtn' label='保存' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUser1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='20%'></col>
                        <col width='24%'></col>
                        <col width='12%'></col>
                        <col width='24%'></col>
                        <col width='20%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_1_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>用户名（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='account_label_td' rowSpan='1'>
                                <label id='account_label'>账号：</label>
                            </td>
                            <td colSpan='1' id='account_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='account' width='100%' binding="{markDirty:false,name:'account'}"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='grid1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col width='100x'></col>
                    <col width='100px'></col>
                </colgroup>
                <tbody>
                    <tr height='40px'>
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
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='324px' id='grid1_titlePane_qResult' title='用户列表'>
                <div dojoType='unieap.xgrid.Grid' height='290px' id='grid1' binding="{store:'sysSecUser',rpc:sysSecRole_User.grid1_binding_rpc}" selection="{selectType:'multiple',onAfterDeselect:sysSecRole_User.grid1_selection_onAfterDeselect,onBeforeAllSelect:sysSecRole_User.grid1_selection_onBeforeAllSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='用户名' name='name' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_account' label='账号' name='account' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='角色描述' name='description' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_accountEnabled' label='是否可用' name='accountEnabled' width='15%' decoder="{store:'isEnableDS'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accountLocked' label='是否锁定' name='accountLocked' width='15%' decoder="{store:'isLockDS'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accountLockedReason' label='锁定原因' name='accountLockedReason' width='15%'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
