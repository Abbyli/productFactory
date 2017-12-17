
<%--
	
    @author zhyu.neu
    @creationTime 2014-07-31 11:29:39
    @modificationTime 2014-12-31 16:55:05
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datascope_user/datascope_user-processor.js?version=20141231165505"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datascope_user/datascope_user-view.js?version=20141231165505"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				datascope_user.page_initEvents&&dojo.hitch(datascope_user,datascope_user.page_initEvents)();
				datascope_user.page_load&&dojo.hitch(datascope_user,datascope_user.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.TabContainer' height='100%' id='tabContainer1'>
        <div dojoType='unieap.layout.ContentPane' height='100%' id='tabPane1' title='组织机构与数据范围' width='100%'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
                    <div dojoType='unieap.tree.Tree' id='unitTree_unit' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit'}"></div>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout20' showTitleBar='false'>
                        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane20' region='top' showTitleBar='false' splitLine='false' wrap='false'>
                            <table id='ToolBar_unit' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col></col>
                                    <col width='97px'></col>
                                    <col width='97px'></col>
                                </colgroup>
                                <tbody>
                                    <tr height='30px'>
                                        <td>
                                        </td>
                                        <td height='30px'>
                                            <div dojoType='unieap.form.Button' height='25px' id='cfgbtn' label='配置' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='delbtn' label='删除' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div dojoType='unieap.layout.BorderPane' id='borderPane30' region='center' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.form.Form' id='form_unitdataScope' binding="{store:'sysSecDataScope1'}">
                                <table id='form_unitdataScope_tableLayout' width='100%' style='table-layout:fixed;'>
                                    <colgroup>
                                        <col width='15%'></col>
                                        <col width='20%'></col>
                                        <col width='18%'></col>
                                        <col width='20%'></col>
                                        <col></col>
                                    </colgroup>
                                    <tbody>
                                        <tr height='40px' id='form_unitdataScope_1_tr'>
                                            <td align='right' id='name_label_td' rowSpan='1'>
                                                <label id='name_label'>范围名称（全模糊）：</label>
                                            </td>
                                            <td colSpan='1' id='name_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                                            </td>
                                            <td align='right' id='dataSourceId_label_td' rowSpan='1'>
                                                <label id='dataSourceId_label'>数据源名称（全模糊）：</label>
                                            </td>
                                            <td colSpan='1' id='dataSourceId_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='dataSourceId' width='100%' binding="{markDirty:false,name:'dataSourceId'}"></div>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='0px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
                            <table id='grid_unit_dataScope_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col></col>
                                    <col width='97px'></col>
                                    <col width='97px'></col>
                                </colgroup>
                                <tbody>
                                    <tr height='40px'>
                                        <td>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid_unit_dataScope_queryButton' label='查询' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid_unit_dataScope_resetButton' label='重置' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='auto' id='grid_unit_dataScope_titlePane_qResult' title='数据范围列表' width='auto'>
                                <div dojoType='unieap.xgrid.Grid' height='285px' id='grid_unit_dataScope' binding="{store:'sysSecDataScope',rpc:datascope_user.grid_unit_dataScope_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                                    <toolbar paging="{userPageSize:[10]}">
                                    </toolbar>
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_name' label='范围名称' name='name' width='20%'></cell>
                                            <cell dataType='string' enable='false' id='cell_sql' label='SQL' name='sql' width='40%'></cell>
                                            <cell dataType='string' enable='false' id='cell_dataSourceId' label='数据源名称' name='dataSourceId' width='20%' decoder="{displayAttr:'name',store:'dataSource',valueAttr:'id'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='20%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane2' title='岗位与数据范围'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' id='borderPane2' region='left' showTitleBar='false' splitLine='false' width='25%'>
                    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout3' showTitleBar='false'>
                        <div dojoType='unieap.layout.BorderPane' height='50%' id='borderPane4' region='bottom' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_station' binding="{store:'sysSecStation'}" rows="{defaultHeaderHeight:'30',defaultRowHeight:'30'}" selection="{selectType:'single',onAfterSelect:datascope_user.grid_station_selection_onAfterSelect}"
                            views="{rowBar:true,rowNumber:false,onRowClick:datascope_user.grid_station_views_onRowClick}">
                                <header>
                                    <row>
                                        <cell dataType='string' enable='false' id='cell_name' label='岗位名称' name='name' width='100%'></cell>
                                    </row>
                                </header>
                            </div>
                        </div>
                        <div dojoType='unieap.layout.BorderPane' id='borderPane5' region='center' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.tree.Tree' id='unitTree_station' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit1'}"></div>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane10' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout300' showTitleBar='false'>
                        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane200' region='top' showTitleBar='false' splitLine='false' wrap='false'>
                            <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
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
                                            <div dojoType='unieap.form.Button' height='25px' id='cfgbtn_station' label='配置' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='delbtn_station' label='删除' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div dojoType='unieap.layout.BorderPane' id='borderPane300' region='center' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.form.Form' id='form_station_dataScope' binding="{store:'sysSecDataScope3'}">
                                <table id='form_station_dataScope_tableLayout' width='100%' style='table-layout:fixed;'>
                                    <colgroup>
                                        <col width='15%'></col>
                                        <col width='20%'></col>
                                        <col width='18%'></col>
                                        <col width='20%'></col>
                                        <col></col>
                                    </colgroup>
                                    <tbody>
                                        <tr height='40px' id='form_station_dataScope_1_tr'>
                                            <td align='right' id='name_000_label_td' rowSpan='1'>
                                                <label id='name_000_label'>范围名称（全模糊）：</label>
                                            </td>
                                            <td colSpan='1' id='name_000_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='name_000' width='100%' binding="{markDirty:false,name:'name'}"></div>
                                            </td>
                                            <td align='right' id='dataSourceId_000_label_td' rowSpan='1'>
                                                <label id='dataSourceId_000_label'>数据源名称（全模糊）：</label>
                                            </td>
                                            <td colSpan='1' id='dataSourceId_000_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='dataSourceId_000' width='100%' binding="{markDirty:false,name:'dataSourceId'}"></div>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='0px' id='inlineEditBox2' width='98%' style='margin-left   :1%;margin-right:1%;'></div>
                            <table id='grid_station_dataScope_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col></col>
                                    <col></col>
                                    <col></col>
                                    <col></col>
                                    <col></col>
                                    <col width='95px'></col>
                                    <col width='95px'></col>
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
                                            <div dojoType='unieap.form.Button' height='25px' id='grid_station_dataScope_queryButton' label='查询' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid_station_dataScope_resetButton' label='重置' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='auto' id='grid_station_dataScope_titlePane_qResult' title='数据范围列表' width='auto'>
                                <div dojoType='unieap.xgrid.Grid' height='300px' id='grid_station_dataScope' binding="{store:'sysSecDataScope2',rpc:datascope_user.grid_station_dataScope_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                                    <toolbar paging="{userPageSize:[10]}">
                                    </toolbar>
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_name_000' label='范围名称' name='name' width='20%'></cell>
                                            <cell dataType='string' enable='false' id='cell_sql_000' label='SQL' name='sql' width='40%'></cell>
                                            <cell dataType='string' enable='false' id='cell_dataSourceId_000' label='数据源名称' name='dataSourceId' width='20%' decoder="{displayAttr:'name',store:'dataSource',valueAttr:'id'}"></cell>
                                            <cell dataType='string' enable='false' id='cell_description_000' label='描述' name='description' width='20%'></cell>
                                        </row>
                                    </header>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.ContentPane' id='tabPane3' title='用户组与数据范围'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout4' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' id='borderPane6' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout5' showTitleBar='false'>
                        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane3' region='top' showTitleBar='false' splitLine='false'>
                            <table id='ToolBar7' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col></col>
                                    <col width='97px'></col>
                                </colgroup>
                                <tbody>
                                    <tr height='30px'>
                                        <td>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='btnAddDataScope' label='添加数据范围' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div dojoType='unieap.layout.BorderPane' id='borderPane7' region='center' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.form.Form' id='form8' binding="{store:'sysSecUserGroup1'}">
                                <table id='form8_tableLayout' width='100%' style='table-layout:fixed;'>
                                    <colgroup>
                                        <col width='15%'></col>
                                        <col width='20%'></col>
                                        <col width='10%'></col>
                                        <col width='20%'></col>
                                        <col></col>
                                    </colgroup>
                                    <tbody>
                                        <tr height='40px' id='form8_2_tr'>
                                            <td align='center' id='searchName_label_td' rowSpan='1'>
                                                <label id='searchName_label'>名称（全模糊）:</label>
                                            </td>
                                            <td colSpan='1' id='searchName_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='name1' width='100%' binding="{markDirty:false,name:'name1'}"></div>
                                            </td>
                                            <td align='center' id='searchCode_label_td' rowSpan='1'>
                                                <label id='searchCode_label'>编码:</label>
                                            </td>
                                            <td colSpan='1' id='searchCode_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='code' width='100%' binding="{markDirty:false,name:'code'}"></div>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox3' width='98%' style='margin-left :1%;margin-right:1%;'></div>
                            <table id='grid8_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col></col>
                                    <col width='97px'></col>
                                    <col width='97px'></col>
                                </colgroup>
                                <tbody>
                                    <tr height='40px'>
                                        <td>
                                        </td>
                                        <td align='right'>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid7_queryButton' label='查询' width='90px'></div>
                                        </td>
                                        <td align='right'>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid7_resetButton' label='重置' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid7_titlePane_qResult' title='用户组列表'>
                                <div dojoType='unieap.xgrid.Grid' height='291px' id='grid7' binding="{store:'sysSecUserGroup',rpc:datascope_user.grid7_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
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
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='475px' id='ds_ConfigDialog' title='数据范围信息' url='<%=path%>/techcomp/security/datascope_user_dataScopeconfig_entry.action' width='700px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
