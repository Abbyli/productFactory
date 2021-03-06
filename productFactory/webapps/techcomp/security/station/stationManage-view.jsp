
<%--
	
    @author zhyu.neu
    @creationTime 2014-08-11 10:55:24
    @modificationTime 2014-11-12 13:52:33
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/station/stationManage-processor.js?version=20141112135233"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/station/stationManage-view.js?version=20141112135233"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				stationManage.page_initEvents&&dojo.hitch(stationManage,stationManage.page_initEvents)();
				stationManage.page_load&&dojo.hitch(stationManage,stationManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.tree.Tree' height='100%' id='unitTree' width='100%' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit'}"></div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane2' region='top' showTitleBar='false' splitLine='false'>
                    <table height='35px' id='ToolBar1' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col></col>
                            <col></col>
                            <col width='97px'></col>
                            <col width='97px'></col>
                            <col width='97px'></col>
                            <col width='97px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='25px'>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='addbtn' label='新增' width='90px'></div>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='editbtn' label='修改' width='90px'></div>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='enablebtn' label='启用' width='90px'></div>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='unablebtn' label='停用' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecStation1'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='15%'></col>
                                <col width='20%'></col>
                                <col width='10%'></col>
                                <col width='20%'></col>
                                <col width='35%'></col>
                            </colgroup>
                            <tbody>
                                <tr height='43px' id='form1_1_tr'>
                                    <td align='right' id='name_label_td' rowSpan='1'>
                                        <label id='name_label'>岗位名称(全模糊)：</label>
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
                                    <td>
                                    </td>
                                </tr>
                                <tr height='23px' id='form1_2_tr'>
                                    <td align='right' id='isEnabled_label_td' rowSpan='1'>
                                        <label id='isEnabled_label'>是否启用：</label>
                                    </td>
                                    <td colSpan='1' id='isEnabled_td' rowSpan='1'>
                                        <div dojoType='unieap.form.ComboBox' id='isEnabled' width='100%' binding="{markDirty:false,name:'isEnabled'}" dataProvider="{store:'isEnabledDs'}"></div>
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
                    <div dojoType='unieap.form.InlineEditBox' disabled='true' height='12px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
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
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='岗位列表'>
                        <div dojoType='unieap.xgrid.Grid' height='365px' id='grid1' binding="{store:'sysSecStation',rpc:stationManage.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:[10]}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_name' label='岗位名称' name='name' width='20%'></cell>
                                    <cell dataType='string' enable='false' id='cell_code' label='编号' name='code' width='20%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='岗位描述' name='description' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_isEnabled' label='是否启用' name='isEnabled' width='15%' decoder="{store:'isEnabledDs'}"></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='addxDialog' title='添加岗位' url='<%=path%>/techcomp/security/station_stationAdd_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='editxDialog' title='岗位信息修改' url='<%=path%>/techcomp/security/station_stationEdit_entry.action' width='500px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
