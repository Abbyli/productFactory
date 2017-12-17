
<%--
	
    @author zhyu.neu
    @creationTime 2014-08-12 10:06:57
    @modificationTime 2014-12-31 14:49:57
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/station_user/station_userAdd-processor.js?version=20141231144957"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/station_user/station_userAdd-view.js?version=20141231144957"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				station_userAdd.page_initEvents&&dojo.hitch(station_userAdd,station_userAdd.page_initEvents)();
				station_userAdd.page_load&&dojo.hitch(station_userAdd,station_userAdd.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
            <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                <colgroup>
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
                            <div dojoType='unieap.form.Button' height='25px' id='savebtn' label='保存' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUser'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='20%'></col>
                        <col width='20%'></col>
                        <col width='15%'></col>
                        <col width='20%'></col>
                        <col width='25%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='50px' id='form1_1_tr'>
                            <td align='right' id='account_label_td' rowSpan='1'>
                                <label id='account_label'>人员姓名（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='account_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='account' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>账号（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'account'}"></div>
                            </td>
                            <td>
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
                    <col width='97px'></col>
                    <col width='97px'></col>
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
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='用户列表'>
                <div dojoType='unieap.xgrid.Grid' height='350px' id='grid1' binding="{store:'sysSecUser',rpc:station_userAdd.grid1_binding_rpc}" selection="{selectType:'multiple',onAfterDeselect:station_userAdd.grid1_selection_onAfterDeselect,onBeforeAllSelect:station_userAdd.grid1_selection_onBeforeAllSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='人员姓名' name='name' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_account' label='账号' name='account' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='45%'></cell>
                            <cell dataType='string' enable='false' id='cell_accountEnabled' label='是否可用' name='accountEnabled' width='15%' decoder="{store:'accountEnableDs'}"></cell>
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
