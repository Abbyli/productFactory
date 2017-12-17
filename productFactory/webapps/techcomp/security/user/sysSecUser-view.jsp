
<%--
	
    @author dong-yw
    @creationTime 2014-06-30 10:34:06
    @modificationTime 2014-12-11 15:53:08
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/user/sysSecUser-processor.js?version=20141211155308"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/user/sysSecUser-view.js?version=20141211155308"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				sysSecUser.page_initEvents&&dojo.hitch(sysSecUser,sysSecUser.page_initEvents)();
				sysSecUser.page_load&&dojo.hitch(sysSecUser,sysSecUser.page_load)();
				
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
                    <col width='97px'></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
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
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnAdd' label='新增' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnEdit' label='修改' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnLoc' label='锁定' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnUnLoc' label='解锁' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnEnab' label='设置可用' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnUnEnab' label='设置不可用' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnImp' label='导入' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='btnDownTempl' label='模板下载' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUser1'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='14%'></col>
                        <col width='15%'></col>
                        <col width='10%'></col>
                        <col width='15%'></col>
                        <col width='7%'></col>
                        <col width='15%'></col>
                        <col></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_2_tr'>
                            <td align='right' id='searchName_label_td' rowSpan='1'>
                                <label id='searchName_label'>人员姓名（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='searchName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' width='100%' binding="{markDirty:false,name:'name'}"></div>
                            </td>
                            <td align='right' id='searchAccount_label_td' rowSpan='1'>
                                <label id='searchAccount_label'>账号（全模糊）：</label>
                            </td>
                            <td colSpan='1' id='searchAccount_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='account' width='100%' binding="{markDirty:false,name:'account'}"></div>
                            </td>
                            <td align='right' id='searchAccountEnabled_label_td' rowSpan='1'>
                                <label id='searchAccountEnabled_label'>是否可用：</label>
                            </td>
                            <td colSpan='1' id='searchAccountEnabled_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='accountEnabled' width='100%' binding="{name:'accountEnabled'}" dataProvider="{store:'accountEnableDs'}"></div>
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
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_queryButton' label='查询' width='90px'></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' height='25px' id='grid1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='grid1_titlePane_qResult' title='用户列表'>
                <div dojoType='unieap.xgrid.Grid' height='337px' id='grid1' binding="{store:'sysSecUser',rpc:sysSecUser.grid1_binding_rpc}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' hidden='true' id='cell_id' label='id' name='id' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_name' label='人员姓名' name='name' width='20%' formatter='sysSecUser.cell_name_formatter'></cell>
                            <cell dataType='string' enable='false' id='cell_account' label='账号' name='account' width='20%'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_code' label='编码' name='code' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_type' label='type' name='type' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_passwo' label='passwo' name='passwo' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_description' label='描述' name='description' width='40%'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_passwordChangeDate' label='passwordChangeDate' name='passwordChangeDate' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_accountEnabled' label='是否可用' name='accountEnabled' width='10%' decoder="{store:'accountEnableDs'}"></cell>
                            <cell dataType='string' enable='false' id='cell_accountLocked' label='是否锁定' name='accountLocked' width='10%' decoder="{store:'accountLockDs'}"></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_accountLockedReason' label='accountLockedReason' name='accountLockedReason' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_sex' label='sex' name='sex' width='100px'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_birthdate' label='birthdate' name='birthdate' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_nationality' label='nationality' name='nationality' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_credentialsType' label='credentialsType' name='credentialsType' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_credentialsNumber' label='credentialsNumber' name='credentialsNumber' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_email' label='email' name='email' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_mobileTelephone' label='mobileTelephone' name='mobileTelephone' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_homeTelephone' label='homeTelephone' name='homeTelephone' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_officeTelephone' label='officeTelephone' name='officeTelephone' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_fax' label='fax' name='fax' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_homeAddress' label='homeAddress' name='homeAddress' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_creator' label='creator' name='creator' width='100px'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_creationDate' label='creationDate' name='creationDate' width='100px'></cell>
                            <cell dataType='string' enable='false' hidden='true' id='cell_lastUpdator' label='lastUpdator' name='lastUpdator' width='100px'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_lastUpdateDate' label='lastUpdateDate' name='lastUpdateDate' width='100px'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_loginTime' label='loginTime' name='loginTime' width='100px'></cell>
                            <cell dataType='number' enable='false' hidden='true' id='cell_loginErrorPasswoNum' label='loginErrorPasswoNum' name='loginErrorPasswoNum' width='100px'></cell>
                            <cell dataType='date' enable='false' hidden='true' id='cell_loginErrorPasswoTime' label='loginErrorPasswoTime' name='loginErrorPasswoTime' width='100px'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='addXdialog' title='新增人员' url='<%=path%>/techcomp/security/user_sysSecUserAdd_entry.action' width='600px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='editXDialog' title='修改人员' url='<%=path%>/techcomp/security/user_sysSecUserEdit_entry.action' width='600px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='500px' id='dtlXDialog' title='详细信息' url='<%=path%>/techcomp/security/user_sysSecUserDtl_entry.action' width='600px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
