
<%--
	
    @author zhyu.neu
    @creationTime 2014-07-31 16:09:31
    @modificationTime 2014-12-31 16:22:36
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datascope_user/dataScopeconfig-processor.js?version=20141231162236"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datascope_user/dataScopeconfig-view.js?version=20141231162236"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				dataScopeconfig.page_initEvents&&dojo.hitch(dataScopeconfig,dataScopeconfig.page_initEvents)();
				dataScopeconfig.page_load&&dojo.hitch(dataScopeconfig,dataScopeconfig.page_load)();
				
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
                    <col width='97px'></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
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
            <div dojoType='unieap.form.Form' id='form_dsconfig' binding="{store:'sysSecDataScope'}">
                <table id='form_dsconfig_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='18%'></col>
                        <col width='20%'></col>
                        <col width='20%'></col>
                        <col width='20%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form_dsconfig_1_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>范围名称（全模糊）：</label>
                            </td>
                            <td align='center' colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='dataSourceId_label_td' rowSpan='1'>
                                <label id='dataSourceId_label'>数据源名称（全模糊）：</label>
                            </td>
                            <td align='center' colSpan='1' id='dataSourceId_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='dataSourceId' width='100%' binding="{markDirty:false,name:'dataSourceId'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox3' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='grid_dsconfig_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
                        <td>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='grid_dsconfig_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='grid_dsconfig_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid_dsconfig_titlePane_qResult' title='数据范围列表'>
                <div dojoType='unieap.xgrid.Grid' height='285px' id='grid_dsconfig' binding="{store:'sysSecDataScope1',rpc:dataScopeconfig.grid_dsconfig_binding_rpc}" selection="{selectType:'multiple',onAfterDeselect:dataScopeconfig.grid_dsconfig_selection_onAfterDeselect,onBeforeAllSelect:dataScopeconfig.grid_dsconfig_selection_onBeforeAllSelect}"
                views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='范围名称' name='name' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_sql' label='SQL' name='sql' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_dataSourceId' label='数据源名称' name='dataSourceId' width='20%' decoder="{displayAttr:'name',store:'dataSource',valueAttr:'id'}"></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='40%'></cell>
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
