
<%--
	
    @author zhyu.neu
    @creationTime 2014-08-12 10:52:28
    @modificationTime 2014-12-31 16:36:31
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/station_user/station_user-processor.js?version=20141231163631"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/station_user/station_user-view.js?version=20141231163631"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				station_user.page_initEvents&&dojo.hitch(station_user,station_user.page_initEvents)();
				station_user.page_load&&dojo.hitch(station_user,station_user.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='editxDialog' title='岗位人员信息修改' url='<%=path%>/techcomp/security/station_user_station_userEdit_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='600px' id='addxDialog' title='向岗位添加人员' url='<%=path%>/techcomp/security/station_user_station_userAdd_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='sidebar' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
            <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
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
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='editbtn' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='adduserbtn' label='添加人员' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='50%' id='borderPane3' region='top' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.tree.Tree' height='100%' id='unitTree' width='100%' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit'}"></div>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane4' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'sysSecStation'}" rows="{defaultHeaderHeight:'30',defaultRowHeight:'30'}" selection="{selectType:'single',onAfterSelect:station_user.grid1_selection_onAfterSelect}" views="{rowBar:true,rowNumber:false,onRowClick:station_user.grid1_views_onRowClick}">
                        <header>
                            <row>
                                <cell dataType='string' enable='false' id='cell_name' label='岗位信息' name='name' width='100%'></cell>
                            </row>
                        </header>
                    </div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane2' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecStationUser1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='15%'></col>
                        <col width='20%'></col>
                        <col width='13%'></col>
                        <col width='20%'></col>
                        <col width='32%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='50px' id='form1_1_tr'>
                            <td align='right' id='userId_label_td' rowSpan='1'>
                                <label id='userId_label'>人员姓名（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='userId_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='userId' width='100%' binding="{markDirty:false,name:'userId'}"></div>
                            </td>
                            <td align='right' id='isMajor_label_td' rowSpan='1'>
                                <label id='isMajor_label'>是否为主职位：</label>
                            </td>
                            <td colSpan='1' id='isMajor_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='isMajor' width='100%' binding="{markDirty:false,name:'isMajor'}" dataProvider="{store:'isMajorDs'}"></div>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='grid2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                    <tr height='45px'>
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
                            <div dojoType='unieap.form.Button' height='25px' id='grid2_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid2_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid2_titlePane_qResult' title='岗位人员列表'>
                <div dojoType='unieap.xgrid.Grid' height='365px' id='userGrid' binding="{store:'sysSecStationUser',rpc:station_user.userGrid_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:[10]}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_stationId' label='岗位名称' name='stationId' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_userId' label='人员姓名' name='userId' width='25%'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='35%'></cell>
                            <cell dataType='string' enable='false' id='cell_isMajor' label='是否为主职位' name='isMajor' width='15%' decoder="{store:'isMajorDs'}"></cell>
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
