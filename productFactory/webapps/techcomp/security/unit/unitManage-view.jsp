
<%--
	
    @author zhyu.neu
    @creationTime 2014-07-04 09:39:32
    @modificationTime 2014-12-29 14:11:42
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/unit/unitManage-processor.js?version=20141229141142"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/unit/unitManage-view.js?version=20141229141142"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				unitManage.page_initEvents&&dojo.hitch(unitManage,unitManage.page_initEvents)();
				unitManage.page_load&&dojo.hitch(unitManage,unitManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='sidebar' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='0%' id='borderPane0' region='top' showTitleBar='false' splitLine='false'>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane3' region='top' showTitleBar='false' splitLine='false'>
                    <table id='ToolBar1' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='55px'></col>
                            <col width='55px'></col>
                            <col></col>
                            <col></col>
                            <col></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr height='30px'>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='addbtn' label='新增' width='50px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='delbtn' label='删除' width='50px'></div>
                                </td>
                                <td>
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
                <div dojoType='unieap.layout.BorderPane' id='borderPane4' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.tree.Tree' height='100%' id='unitTree' width='100%' binding="{id:'id',label:'name',leaf:'isLeaf',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecUnit'}"></div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane2' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Button' height='39px' id='button1' label='机构信息' width='100%' style='display:block;'></div>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecUnit'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='10%'></col>
                        <col width='35%'></col>
                        <col width='55%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='30px' id='form1_0_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>机构名称：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' required='true' width='100%' binding="{name:'name'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='30px' id='form1_1_tr'>
                            <td align='right' id='code_label_td' rowSpan='1'>
                                <label id='code_label'>编码：</label>
                            </td>
                            <td colSpan='1' id='code_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='code' required='true' width='100%' binding="{name:'code'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='59px' id='form1_2_tr'>
                            <td align='right' id='description_label_td' rowSpan='1'>
                                <label id='description_label'>描述：</label>
                            </td>
                            <td colSpan='1' id='description_td' rowSpan='1'>
                                <div dojoType='unieap.form.Textarea' id='description' width='100%' binding="{name:'description'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
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
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='form1_saveButton' label='保存' width='90px'></div>
                        </td>
                        <td align='center'>
                            <div dojoType='unieap.form.Button' height='25px' id='form1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
