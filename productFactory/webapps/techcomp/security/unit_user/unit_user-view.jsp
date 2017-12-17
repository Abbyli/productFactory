
<%--
	
    @author zhyu.neu
    @creationTime 2014-08-12 08:31:39
    @modificationTime 2014-09-23 14:12:05
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/unit_user/unit_user-processor.js?version=20140923141205"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/unit_user/unit_user-view.js?version=20140923141205"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				unit_user.page_initEvents&&dojo.hitch(unit_user,unit_user.page_initEvents)();
				unit_user.page_load&&dojo.hitch(unit_user,unit_user.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.xdialog.Dialog' height='300px' id='editxDialog' title='机构人员信息' url='<%=path%>/techcomp/security/unit_user_unit_userEdit_entry.action' width='500px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='600px' id='addUserxDialog' title='添加人员' url='<%=path%>/techcomp/security/unit_user_unit_userAdd_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.tree.Tree' height='100%' id='unitTree' width='100%' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit'}"></div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane2' region='top' showTitleBar='false' splitLine='false'>
                    <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col></col>
                            <col></col>
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
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUnitUser1'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='17%'></col>
                                <col width='18%'></col>
                                <col width='11%'></col>
                                <col width='18%'></col>
                                <col width='36%'></col>
                            </colgroup>
                            <tbody>
                                <tr height='50px' id='form1_1_tr'>
                                    <td align='right' id='userId_label_td' rowSpan='1'>
                                        <label id='userId_label'>人员姓名（全模糊）：</label>
                                    </td>
                                    <td colSpan='1' id='userId_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='userId' width='100%' binding="{markDirty:false,name:'userId'}"></div>
                                    </td>
                                    <td align='right' id='isLeader_label_td' rowSpan='1'>
                                        <label id='isLeader_label'>是否为负责人：</label>
                                    </td>
                                    <td colSpan='1' id='isLeader_td' rowSpan='1'>
                                        <div dojoType='unieap.form.ComboBox' id='isLeader' width='100%' binding="{markDirty:false,name:'isLeader'}" dataProvider="{store:'isEnabledDs'}"></div>
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
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='机构人员列表'>
                        <div dojoType='unieap.xgrid.Grid' height='365px' id='grid1' binding="{store:'sysSecUnitUser',rpc:unit_user.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                            <toolbar paging="{userPageSize:[10]}">
                            </toolbar>
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_unitId' label='机构名称' name='unitId' width='20%'></cell>
                                    <cell dataType='string' enable='false' id='cell_userId' label='人员姓名' name='userId' width='20%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_isLeader' label='是否为负责人' name='isLeader' width='15%' decoder="{store:'isEnabledDs'}"></cell>
                                </row>
                            </header>
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
