
<%--
	
    @author zhangyujia
    @creationTime 2014-08-11 15:48:44
    @modificationTime 2014-11-04 17:03:19
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/role/sysSecRole-processor.js?version=20141104170319"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/role/sysSecRole-view.js?version=20141104170319"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecRole.page_initEvents&&dojo.hitch(sysSecRole,sysSecRole.page_initEvents)();
				sysSecRole.page_load&&dojo.hitch(sysSecRole,sysSecRole.page_load)();
				
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
                    <col width='97px'></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
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
                            <div dojoType='unieap.form.Button' height='25px' id='addbtn' label='新增' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='editbtn' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='enablebtn' label='启用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='unablebtn' label='停用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='adduserbtn' label='添加人员' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecRole1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='25%'></col>
                        <col width='17%'></col>
                        <col width='10%'></col>
                        <col width='17%'></col>
                        <col width='31%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='43px' id='form1_1_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>角色名称（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='status_label_td' rowSpan='1'>
                                <label id='status_label'>角色状态：</label>
                            </td>
                            <td colSpan='1' id='status_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' comboShowSelect='true' id='status' width='100%' binding="{markDirty:false,name:'status'}" dataProvider="{store:'statusDs'}"></div>
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
                    <tr height='43px'>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='角色列表'>
                <div dojoType='unieap.xgrid.Grid' height='300px' id='grid1' binding="{store:'sysSecRole',rpc:sysSecRole.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='角色名称' name='name' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_code' label='角色编号' name='code' width='15%'></cell>
                            <cell dataType='string' enable='false' id='cell_remark' label='角色描述' name='remark' width='30%'></cell>
                            <cell dataType='string' enable='false' id='cell_status' label='角色状态' name='status' width='10%' decoder="{store:'statusDs'}"></cell>
                            <cell dataType='date' enable='false' id='cell_timeBegin' label='生效时间' name='timeBegin' width='15%'></cell>
                            <cell dataType='date' enable='false' id='cell_timeEnd' label='失效时间' name='timeEnd' width='15%'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='AddXdialog' title='添加角色' url='<%=path%>/techcomp/security/role_sysSecRoleAdd_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='editXDialog' title='修改角色' url='<%=path%>/techcomp/security/role_sysSecRoleEdit_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='AddUserXDialog' title='添加人员' url='<%=path%>/techcomp/security/role_sysSecRole_User_entry.action' width='600px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
