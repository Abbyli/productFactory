
<%--
	
    @author shify
    @creationTime 2014-06-27 16:30:16
    @modificationTime 2014-11-06 15:39:49
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/page/page_list_unieap-processor.js?version=20141106153949"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/page/page_list_unieap-view.js?version=20141106153949"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				page_list_unieap.page_initEvents&&dojo.hitch(page_list_unieap,page_list_unieap.page_initEvents)();
				page_list_unieap.page_load&&dojo.hitch(page_list_unieap,page_list_unieap.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.xdialog.Dialog' animate='false' height='300px' id='xdialog1' title='新增页面' url='<%=path%>/techcomp/security/page_page_add_unieap_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='xdialog2' title='修改页面' url='<%=path%>/techcomp/security/page_page_edit_unieap_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='xdialog3' title='新增资源' url='<%=path%>/techcomp/security/page_page_resource_add_unieap_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='xdialog4' title='修改资源' url='<%=path%>/techcomp/security/page_page_resource_edit_unieap_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' height='170%' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='auto' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
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
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='button1' label='新增' width='90px'></div>
                        </td>
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='button2' label='修改' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='430px' id='borderPane2' region='top' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecPage1'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='20%'></col>
                                <col width='15%'></col>
                                <col width='65%'></col>
                            </colgroup>
                            <tbody>
                                <tr height='40px' id='form1_0_tr'>
                                    <td align='right'>
                                        <label id='searchName_label' width='124px'>页面名称（全模糊）：</label>
                                    </td>
                                    <td id='searchName_label_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                                    </td>
                                    <td colSpan='1' id='searchName_td' rowSpan='1'>
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
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                                </td>
                                <td align='center'>
                                    <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='330px' id='grid1_titlePane_qResult' title='页面列表'>
                        <div dojoType='unieap.xgrid.Grid' height='300px' id='grid1' binding="{store:'sysSecPage',rpc:page_list_unieap.grid1_binding_rpc}" selection="{selectType:'multiple',onAfterSelect:page_list_unieap.grid1_selection_onAfterSelect}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:[10]}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_name' label='页面名称' name='name' width='20%'></cell>
                                    <cell dataType='string' enable='false' id='cell_url' label='页面地址' name='url' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='页面描述' name='description' width='35%'></cell>
                                    <cell dataType='string' enable='false' id='cell_appId' label='应用' name='appId' width='20%' decoder="{displayAttr:'name',store:'appDs',valueAttr:'id'}"></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout3' showTitleBar='false'>
                        <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane4' region='top' showTitleBar='false' splitLine='false'>
                            <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                                <colgroup>
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
                                            <div dojoType='unieap.form.Button' height='25px' id='button3' label='新增' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='button4' label='修改' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='button5' label='删除' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div dojoType='unieap.layout.BorderPane' id='borderPane5' region='center' showTitleBar='false' splitLine='false'>
                            <div dojoType='unieap.form.Form' id='form2' binding="{store:'sysSecPageResource1'}">
                                <table id='form2_tableLayout' width='100%' style='table-layout:fixed;'>
                                    <colgroup>
                                        <col width='20%'></col>
                                        <col width='19%'></col>
                                        <col width='7%'></col>
                                        <col width='15%'></col>
                                        <col width='39%'></col>
                                    </colgroup>
                                    <tbody>
                                        <tr height='40px' id='form2_1_tr'>
                                            <td align='right' id='searchResourceName_label_td' rowSpan='1'>
                                                <label id='searchResourceName_label' width='76px'>资源名称（全模糊）：</label>
                                            </td>
                                            <td colSpan='1' id='searchControlId_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='resourceName' width='160px' binding="{markDirty:false,name:'name'}"></div>
                                            </td>
                                            <td align='right' id='searchControlId_label_td' rowSpan='1'>
                                                <label height='25px' id='searchControlId_label' width='58px'>控件ID：</label>
                                            </td>
                                            <td colSpan='1' id='searchControlId_td' rowSpan='1'>
                                                <div dojoType='unieap.form.TextBox' id='controlId' width='160px' binding="{markDirty:false,name:'controlId'}"></div>
                                            </td>
                                            <td colSpan='1' id='searchControlId_td' rowSpan='1'>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox2' width='98%' style='margin-left :1%;margin-right:1%;'></div>
                            <table id='grid2_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                                            <div dojoType='unieap.form.Button' height='25px' id='grid2_queryButton' label='查询' width='90px'></div>
                                        </td>
                                        <td>
                                            <div dojoType='unieap.form.Button' height='25px' id='grid2_resetButton' label='重置' width='90px'></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div dojoType='unieap.layout.TitlePane' flexible='false' height='330px' id='grid2_titlePane_qResult' title='页面资源列表'>
                                <div dojoType='unieap.xgrid.Grid' height='300px' id='grid2' binding="{store:'sysSecPageResource',rpc:page_list_unieap.grid2_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                                    <toolbar paging="{userPageSize:[10]}">
                                    </toolbar>
                                    <header>
                                        <row>
                                            <cell dataType='string' enable='false' id='cell_name' label='页面资源名称' name='name' width='25%'></cell>
                                            <cell dataType='string' enable='false' id='cell_controlId' label='页面控件ID' name='controlId' width='25%'></cell>
                                            <cell dataType='string' enable='false' id='cell_description' label='页面资源描述' name='description' width='50%'></cell>
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
</s:i18n>
    </security:auth>
	</body>
</html>
