
<%--
	
    @author hanyongxu
    @creationTime 2014-08-12 16:36:45
    @modificationTime 2014-09-23 09:50:42
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/application/sysSecApplication-processor.js?version=20140923095042"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/application/sysSecApplication-view.js?version=20140923095042"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecApplication.page_initEvents&&dojo.hitch(sysSecApplication,sysSecApplication.page_initEvents)();
				sysSecApplication.page_load&&dojo.hitch(sysSecApplication,sysSecApplication.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.xdialog.Dialog' height='200px' id='addXDialog' title='新增' url='<%=path%>/techcomp/security/application_sysSecApplicationAdd_entry.action' width='450px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='200px' iconCloseComplete='true' id='editXDialog' title='修改' url='<%=path%>/techcomp/security/application_sysSecApplicationEdit_entry.action' width='450px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
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
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' iconClass='buttonSepTrue' id='btnAdd' label='新增' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' iconClass='buttonSepFalse' id='btnEdit' label='修改' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' iconClass='buttonSepAdd' id='btnEnab' label='启用' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' iconClass='buttonSepSave' id='btnUnEnab' label='停用' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecApplication1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='15%'></col>
                        <col width='20%'></col>
                        <col width='10%'></col>
                        <col width='20%'></col>
                        <col width='35%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_1_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>应用名称(全模糊)：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='code_label_td' rowSpan='1'>
                                <label id='code_label'>应用编号：</label>
                            </td>
                            <td colSpan='1' id='code_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='appid' width='100%' binding="{markDirty:false,name:'appid'}"></div>
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
                    <col width='100px'></col>
                    <col width='100px'></col>
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
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='应用列表'>
                <div dojoType='unieap.xgrid.Grid' height='308px' id='grid1' binding="{store:'sysSecApplication',rpc:sysSecApplication.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='应用名称' name='name' width='40%'></cell>
                            <cell dataType='string' enable='false' id='cell_appid' label='应用编号' name='appid' width='40%'></cell>
                            <cell dataType='string' enable='false' id='cell_isEnabled' label='是否启用' name='isEnabled' width='20%' decoder="{store:'isEnableDs'}"></cell>
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
