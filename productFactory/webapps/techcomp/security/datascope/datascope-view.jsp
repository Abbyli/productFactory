
<%--
	
    @author user
    @creationTime 2014-07-08 08:57:45
    @modificationTime 2014-11-13 16:22:22
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datascope/datascope-processor.js?version=20141113162222"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datascope/datascope-view.js?version=20141113162222"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				datascope.page_initEvents&&dojo.hitch(datascope,datascope.page_initEvents)();
				datascope.page_load&&dojo.hitch(datascope,datascope.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.tree.Tree' id='tree1' binding="{id:'id',label:'name',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecDataScopeType'}"></div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane2' region='top' showTitleBar='false' splitLine='false' wrap='false'>
                    <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col></col>
                            <col></col>
                            <col></col>
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
                                    <div dojoType='unieap.form.Button' height='25px' id='button1' label='新增' width='90px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='button2' label='修改' width='90px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='button3' label='删除' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataScope1'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='15%'></col>
                                <col width='20%'></col>
                                <col width='18%'></col>
                                <col width='20%'></col>
                                <col></col>
                            </colgroup>
                            <tbody>
                                <tr height='40px' id='form1_1_tr'>
                                    <td align='right' id='name_label_td' rowSpan='1'>
                                        <label id='name_label'>范围名称（全模糊）：</label>
                                    </td>
                                    <td colSpan='1' id='name_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='dataScopeName' name='dataScopeName' width='100%' binding="{markDirty:false}"></div>
                                    </td>
                                    <td align='right' id='dataSourceId_label_td' rowSpan='1'>
                                        <label id='dataSourceId_label'>数据源名称（全模糊）：</label>
                                    </td>
                                    <td colSpan='1' id='dataSourceId_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='dataSourceId' name='dataSourceId' width='100%' binding="{markDirty:false}"></div>
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
                            <col width='97px'></col>
                            <col width='97px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='40px'>
                                <td>
                                </td>
                                <td height='35px'>
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                                </td>
                                <td height='35px'>
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='数据范围列表 ' width='100%'>
                        <div dojoType='unieap.xgrid.Grid' height='365px' id='grid1' binding="{store:'sysSecDataScopeDTO',rpc:datascope.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:[10]}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' hidden='true' id='cell_id' label='id' name='id' width='0px'></cell>
                                    <cell dataType='string' enable='false' id='cell_name' label='范围名称' name='name' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_sql' label='SQL' name='sql' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='描述 ' name='description' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_dataSourceId' label='dataSourceId' name='dataSourceId' width='0px'></cell>
                                    <cell dataType='string' enable='false' id='cell_creator' label='数据源名称' name='creator' width='25%'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='600px' id='addXDialog' title='数据范围信息' url='<%=path%>/techcomp/security/datascope_datascope_add_entry.action'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' id='editXDialog' title='数据范围信息' url='<%=path%>/techcomp/security/datascope_datascop_edit_entry.action'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
