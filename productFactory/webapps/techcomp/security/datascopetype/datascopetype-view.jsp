
<%--
	
    @author user
    @creationTime 2014-07-25 13:24:01
    @modificationTime 2014-11-07 09:24:36
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datascopetype/datascopetype-processor.js?version=20141107092436"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datascopetype/datascopetype-view.js?version=20141107092436"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				datascopetype.page_initEvents&&dojo.hitch(datascopetype,datascopetype.page_initEvents)();
				datascopetype.page_load&&dojo.hitch(datascopetype,datascopetype.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='39px' id='borderPane1' region='top' showTitleBar='false' splitLine='false'>
                    <table height='30px' id='ToolBar1' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='43px'></col>
                            <col width='43px'></col>
                            <col></col>
                            <col></col>
                            <col></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr height='21px'>
                                <td>
                                    <div dojoType='unieap.form.Button' height='30px' id='button1' label='新增' width='40px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='30px' id='button2' label='删除' width='40px'></div>
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
                    <div dojoType='unieap.tree.Tree' id='tree1' binding="{id:'id',label:'name',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecDataScopeType'}"></div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane2' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout3' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' id='borderPane5' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.form.Button' height='37px' id='button3' label='数据范围分类信息 ' width='100%'></div>
                    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataScopeType'}">
                        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                            <colgroup>
                                <col width='15%'></col>
                                <col width='40%'></col>
                                <col width='45%'></col>
                            </colgroup>
                            <tbody>
                                <tr height='40px' id='form1_0_tr'>
                                    <td align='right' id='name_label_td' rowSpan='1'>
                                        <label id='name_label'>分类名称：</label>
                                    </td>
                                    <td colSpan='1' id='name_td' rowSpan='1'>
                                        <div dojoType='unieap.form.TextBox' id='name' width='50%' binding="{name:'name'}"></div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr height='69px' id='form1_1_tr'>
                                    <td align='right' id='description_label_td' rowSpan='1'>
                                        <label id='description_label'>分类描述：</label>
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
                    <div dojoType='unieap.form.InlineEditBox' disabled='true' height='0px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
                    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col></col>
                            <col width='100px'></col>
                            <col width='100px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='40px'>
                                <td>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='form1_saveButton' label='保存' width='90px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='form1_resetButton' label='重置' width='90px'></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
