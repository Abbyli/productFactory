
<%--
	
    @author dongyw
    @creationTime 2014-07-02 16:11:29
    @modificationTime 2014-09-23 10:15:14
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datasource/sysSecDataSource-processor.js?version=20140923101514"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datasource/sysSecDataSource-view.js?version=20140923101514"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecDataSource.page_initEvents&&dojo.hitch(sysSecDataSource,sysSecDataSource.page_initEvents)();
				sysSecDataSource.page_load&&dojo.hitch(sysSecDataSource,sysSecDataSource.page_load)();
				
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
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnAdd' label='新增' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnEdit' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='btnDel' label='删除' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataSource1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='15%'></col>
                        <col width='16%'></col>
                        <col width='8%'></col>
                        <col width='16%'></col>
                        <col width='13%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_1_tr'>
                            <td align='right' id='searchName_label_td' rowSpan='1'>
                                <label id='searchName_label'>名称（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='searchName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='searchUserName_label_td' rowSpan='1'>
                                <label id='searchUserName_label'>用户名：</label>
                            </td>
                            <td colSpan='1' id='searchUserName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='userName' width='100%' binding="{markDirty:false,name:'userName'}"></div>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='数据源列表'>
                <div dojoType='unieap.xgrid.Grid' height='303px' id='grid1' binding="{store:'sysSecDataSource',rpc:sysSecDataSource.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='数据源名称' name='name' width='30%' formatter='sysSecDataSource.cell_name_formatter'></cell>
                            <cell dataType='string' enable='false' id='cell_url' label='地址' name='url' width='50%'></cell>
                            <cell dataType='string' enable='false' id='cell_userName' label='用户名' name='userName' width='20%'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='addXDialog' title='添加数据源' url='<%=path%>/techcomp/security/datasource_sysSecDataSourceAdd_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='editXDialog' title='修改数据源信息' url='<%=path%>/techcomp/security/datasource_sysSecDataSourceEdit_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='dtlXDialog' title='数据源详细信息' url='<%=path%>/techcomp/security/datasource_sysSecDataSourceDtl_entry.action' width='700px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
