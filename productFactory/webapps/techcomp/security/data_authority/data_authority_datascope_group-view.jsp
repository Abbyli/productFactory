
<%--
	
    @author user
    @creationTime 2014-07-29 15:05:24
    @modificationTime 2014-12-31 14:51:45
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/data_authority/data_authority_datascope_group-processor.js?version=20141231145145"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/data_authority/data_authority_datascope_group-view.js?version=20141231145145"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				data_authority_datascope_group.page_initEvents&&dojo.hitch(data_authority_datascope_group,data_authority_datascope_group.page_initEvents)();
				data_authority_datascope_group.page_load&&dojo.hitch(data_authority_datascope_group,data_authority_datascope_group.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
            <table height='35px' id='ToolBar1' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col width='97px'></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
                        <td>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btn_Save' label='保存' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataScopeGroup2'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='25%'></col>
                        <col width='20%'></col>
                        <col width='25%'></col>
                        <col width='20%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_1_tr'>
                            <td align='right' id='dataScopeId_label_td' rowSpan='1'>
                                <label id='dataScopeId_label'>数据范围名称（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='dataScopeId_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='dataScopeId' width='100%' binding="{markDirty:false,name:'dataScopeId'}"></div>
                            </td>
                            <td align='right' id='groupId_label_td' rowSpan='1'>
                                <label id='groupId_label'>群组名称（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='groupId_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='groupId' width='100%' binding="{markDirty:false,name:'groupId'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='35px' id='form1_2_tr'>
                            <td align='right' id='groupType_label_td' rowSpan='1'>
                                <label id='groupType_label'>群组类型 ：</label>
                            </td>
                            <td colSpan='1' id='groupType_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='groupType' width='100%' binding="{name:'groupType'}" dataProvider="{store:'groupTypeDs'}"></div>
                            </td>
                            <td>
                            </td>
                            <td>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='数据权限列表'>
                <div dojoType='unieap.xgrid.Grid' height='285px' id='grid1' binding="{store:'sysSecDataScopeGroup',rpc:data_authority_datascope_group.grid1_binding_rpc}" selection="{selectType:'multiple',onAfterDeselect:data_authority_datascope_group.grid1_selection_onAfterDeselect,onBeforeAllSelect:data_authority_datascope_group.grid1_selection_onBeforeAllSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' hidden='true' id='cell_id' label='id' name='id' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_dataScopeId' label='数据范围名称' name='dataScopeId' width='33%'></cell>
                            <cell dataType='string' enable='false' id='cell_groupId' label='群组名称' name='groupId' width='33%'></cell>
                            <cell dataType='string' enable='false' id='cell_groupType' label='群组类型 ' name='groupType' width='34%' decoder="{store:'groupTypeDs'}"></cell>
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
