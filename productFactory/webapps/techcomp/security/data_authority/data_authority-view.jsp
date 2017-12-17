
<%--
	
    @author user
    @creationTime 2014-07-28 09:26:10
    @modificationTime 2014-09-23 09:56:19
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/data_authority/data_authority-processor.js?version=20140923095619"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/data_authority/data_authority-view.js?version=20140923095619"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				data_authority.page_initEvents&&dojo.hitch(data_authority,data_authority.page_initEvents)();
				data_authority.page_load&&dojo.hitch(data_authority,data_authority.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.xdialog.Dialog' height='315px' id='addXdialog' title='数据权限信息 ' url='<%=path%>/techcomp/security/data_authority_data_authority_edit_entry.action'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
            <table height='30px' id='ToolBar1' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col></col>
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
                            <div dojoType='unieap.form.Button' height='25px' id='button1' label='新增' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='button2' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='button3' label='启用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='button4' label='停用' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataAuthority1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='10%'></col>
                        <col width='15%'></col>
                        <col width='5%'></col>
                        <col width='15%'></col>
                        <col width='7%'></col>
                        <col width='15%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_2_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>名称（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='code_label_td' rowSpan='1'>
                                <label id='code_label'>编号：</label>
                            </td>
                            <td colSpan='1' id='code_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='code' width='100%' binding="{markDirty:false,name:'code'}"></div>
                            </td>
                            <td align='right' id='isEnabled_label_td' rowSpan='1'>
                                <label id='isEnabled_label'>是否可用：</label>
                            </td>
                            <td colSpan='1' id='isEnabled_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='isEnabled' width='100%' binding="{name:'isEnabled'}" dataProvider="{store:'isEnabledDs'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='0px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='grid1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col width='100px'></col>
                    <col width='100px'></col>
                </colgroup>
                <tbody>
                    <tr height='40px'>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='数据权限列表 '>
                <div dojoType='unieap.xgrid.Grid' height='285px' id='grid1' binding="{store:'sysSecDataAuthority',rpc:data_authority.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' hidden='true' id='cell_id' label='id' name='id' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_name' label='名称' name='name' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_code' label='编号' name='code' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_creator' label='所属应用' name='creator' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_isEnabled' label='是否启用 ' name='isEnabled' width='20%' decoder="{store:'isEnabledDs'}"></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_appId' label='appId' name='appId' width='100px'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='315px' id='editXDialog' title='修改' url='<%=path%>/techcomp/security/data_authority_data_authority_edit_entry.action'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
