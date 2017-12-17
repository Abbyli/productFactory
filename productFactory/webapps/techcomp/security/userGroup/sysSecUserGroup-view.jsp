
<%--
	
    @author dongyw
    @creationTime 2014-07-03 08:47:49
    @modificationTime 2014-11-04 17:15:47
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/userGroup/sysSecUserGroup-processor.js?version=20141104171547"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/userGroup/sysSecUserGroup-view.js?version=20141104171547"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecUserGroup.page_initEvents&&dojo.hitch(sysSecUserGroup,sysSecUserGroup.page_initEvents)();
				sysSecUserGroup.page_load&&dojo.hitch(sysSecUserGroup,sysSecUserGroup.page_load)();
				
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
                            <div dojoType='unieap.form.Button' height='25px' id='btnAdd' label='新增' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnEdit' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnEnab' label='启用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnUnEnab' label='停用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnAddUser' label='添加人员' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUserGroup1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='17%'></col>
                        <col width='17%'></col>
                        <col width='7%'></col>
                        <col width='17%'></col>
                        <col width='7%'></col>
                        <col width='17%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_2_tr'>
                            <td align='right' id='searchName_label_td' rowSpan='1'>
                                <label id='searchName_label'>名称（全模糊）:</label>
                            </td>
                            <td colSpan='1' id='searchName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='searchCode_label_td' rowSpan='1'>
                                <label id='searchCode_label'>编码:</label>
                            </td>
                            <td colSpan='1' id='searchCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='code' width='100%' binding="{markDirty:false,name:'code'}"></div>
                            </td>
                            <td align='right' id='searchIsEnabled_label_td' rowSpan='1'>
                                <label id='searchIsEnabled_label'>是否启用:</label>
                            </td>
                            <td colSpan='1' id='searchIsEnabled_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='isEnabled' width='100%' binding="{markDirty:false,name:'isEnabled'}" dataProvider="{store:'isEnableDS'}"></div>
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
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='用户组列表'>
                <div dojoType='unieap.xgrid.Grid' height='291px' id='grid1' binding="{store:'sysSecUserGroup',rpc:sysSecUserGroup.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='用户组名称' name='name' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_code' label='编码' name='code' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='40%'></cell>
                            <cell dataType='string' enable='false' id='cell_isEnabled' label='是否可用' name='isEnabled' width='15%' decoder="{store:'isEnableDS'}"></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='addXDialog' title='添加用户组' url='<%=path%>/techcomp/security/userGroup_sysSecUserGroupAdd_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='editXDialog' title='用户组信息修改' url='<%=path%>/techcomp/security/userGroup_sysSecUserGroupEdit_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='AddUserXDialog' title='为用户组添加用户' url='<%=path%>/techcomp/security/userGroup_sysSecUserGroup_User_entry.action' width='600px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
