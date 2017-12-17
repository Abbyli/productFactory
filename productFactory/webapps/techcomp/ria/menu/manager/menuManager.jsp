<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ include file="/techcomp/ria/base/base.jsp" %>
<%
String webpath=request.getContextPath();
%>
<%-- MODIFY BY TENGYF --%>
<s:i18n name="techcomp.ria.package">
<html style="height:100%">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title><s:text name="techcomp.ria.menu.manager.menuManager.title"/></title>
        <script type="text/javascript">
        	dojo.require("unieap.dialog.MessageBox");
        </script>
		<script type="text/javascript" src="<%=webpath%>/techcomp/ria/menu/manager/menuManager.js" load="enforce"></script>
	</head>
	<body class="unieap">
	 <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' width="20%">
            <div dojoType="unieap.layout.TitlePane" flexible='false' title='<s:text name="techcomp.ria.menu.manager.menuManager.menuTree"/>' height="100%">
				<div dojoType="unieap.tree.Tree" animate = "false" id="menuTree"  jsId="menuTree" onContextMenu="menuManager.onContextMenu" 
					 onAfterExpand="menuManager.onAfterMenuTreeExpand"  onClick="menuManager.treeNodeClick"  
				     loader="{'url':'<%=webpath%>/menuProcessor!getMenuTree.action','getPostData':menuManager.getPostData,'dc':menuManager.dc}" 
					 binding = "{addItemToLeaf:menuManager.customAddItemToLeaf,store:'appStore','leaf':'leaf','label':'label','parent':'parentId',query:{name:'parentId',relation:'=',value:null}}">
			    </div>
			</div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
        <!-- =================================================右侧Form域 begin====================================== -->
			<div dojoType="unieap.layout.TitlePane" flexible='false' height='100%' title='<s:text name="techcomp.ria.menu.manager.menuManager.menuDetail"/>'>
			<div id='userGrid_div' type='buttons'>
                		<div dojoType='unieap.form.Button' class='titlePane-button-save' onClick="menuManager.saveMenuInfo()"
                		 id='addUserBtn' label='<s:text name="techcomp.ria.menu.manager.menuManager.save"/>' toolTip='<s:text name="techcomp.ria.menu.manager.menuManager.save"/>'></div>
                		<div dojoType='unieap.form.Button' class='titlePane-button-reset' onClick="menuManager.resetMenuInfo()"
                		 id='deleteUserBtn' label='<s:text name="techcomp.ria.menu.manager.menuManager.reset"/>' toolTip='<s:text name="techcomp.ria.menu.manager.menuManager.reset"/>'></div>
            			</div>
                         <div id="displayMenuInfo" style="display:none">
       <div dojoType='unieap.form.FieldSet' id='basicInfoFieldSet' title='<s:text name="techcomp.ria.menu.manager.menuManager.basicInfoFieldSet.title"/>'>                        
						  <div id="menuInfoForm" jsId="menuInfoForm" dojoType="unieap.form.Form">
							<table style="table-layout:fixed;font-size:12px;" width="100%">
								<colgroup>
								<col width='13%'></col>
								<col width='20%'></col>
								<col width='26%'></col>
								<col width='40%'></col>
								</colgroup>
                				<tbody>
			                    <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.menuName"/></label>
			                        </td>
			                        <td colSpan='3' rowSpan='1'>
			                            <div dojoType="unieap.form.TextBox" validator="{regExp:/^[^&@$!\#%*\“\”]+$/,errorMsg:'<s:text name="techcomp.ria.menu.manager.menuManager.msg.invalidName"/>'}" maxLength="32" jsId="name" id="name" binding="{name:'name'}"  required="true" width="100%"></div>
			                        </td>
			                    </tr>
			                    <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.menuTitle"/></label>
			                        </td>
			                        <td colSpan='3' rowSpan='1'>
			                            <div dojoType="unieap.form.TextBox" validator="{regExp:/^[^&@$!\#%*\“\”]+$/,errorMsg:'<s:text name="techcomp.ria.menu.manager.menuManager.msg.invalidName"/>'}" maxLength="32" jsId="title" id="title" binding="{name:'title'}"  required="true" width="100%"></div>
			                        </td>
			                    </tr>
			                    <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.urlLink"/></label>
			                        </td>
			                        <td colSpan='3' rowSpan='1'>
			                            <div dojoType="unieap.form.TextBox" validator="{regExp:/^[^\\]+$/,errorMsg:'<s:text name="techcomp.ria.menu.manager.menuManager.msg.invalidUrl"/>'}" jsId="url" id="url" binding="{name:'location'}" maxLength="256" width='100%'></div>
			                        </td>
			                    </tr>
			                    <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.defaultDisplay"/></label>
			                        </td>
			                        <td colSpan='1' rowSpan='1'>
			                           <div dojoType="unieap.form.RadioButtonGroup" id="rbg" labelAlign="right" dataProvider="{'store':'defaultShow_store'} " binding="{name:'isDefault'}" width="100%"></div>
			                        </td>			                    
			                    </tr>
			                    <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.imgUrl"/></label>
			                        </td>
			                        <td colSpan='3' rowSpan='1'>
			                            <div dojoType="unieap.form.TextBox" validator="{regExp:/^[^\\]+$/,errorMsg:'<s:text name="techcomp.ria.menu.manager.menuManager.msg.invalidUrl"/>'}" jsId="image" id="image" binding="{name:'image'}" maxLength="256" width='100%'></div>
			                        </td>
			                    </tr>			                    
			                     <tr>
			                        <td colSpan='1' rowSpan='1'>
			                            <label><s:text name="techcomp.ria.menu.manager.menuManager.description"/></label>
			                        </td>
			                        <td colSpan='3' rowSpan='1'>
			                           <div dojotype="unieap.form.Textarea" jsId="desc" id="desc" binding="{name:'description'}" maxLength="256" width="100%"/>
			                        </td>
			                    </tr>
               		 			</tbody>
							</table>
						  </div>
						   </div> 
						   <div dojoType='unieap.form.FieldSet' id='extInfoFieldSet' title='<s:text name="techcomp.ria.menu.manager.menuManager.extInfoFieldSet.title"/>'></div>
					    </div>
			</div>
			<!-- =================================================右侧Form域 end====================================== -->
		</div>
     </div>
	</body>
</html>
</s:i18n>
