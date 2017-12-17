
<%--
	
    @author hanyongxu
    @creationTime 2014-08-08 16:28:31
    @modificationTime 2014-12-31 16:39:49
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/authority/role/principalList_role-processor.js?version=20141231163949"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/authority/role/principalList_role-view.js?version=20141231163949"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				principalList_role.page_initEvents&&dojo.hitch(principalList_role,principalList_role.page_initEvents)();
				principalList_role.page_load&&dojo.hitch(principalList_role,principalList_role.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'sysSecRole'}" rows="{defaultHeaderHeight:'40',defaultRowHeight:'30'}" selection="{selectType:'single',onAfterSelect:principalList_role.grid1_selection_onAfterSelect}" views="{rowBar:true,rowNumber:false,onRowClick:principalList_role.grid1_views_onRowClick}">
                <header>
                    <row>
                        <cell dataType='string' enable='false' id='cell_name' label='角色名称' name='name' width='100%'></cell>
                    </row>
                </header>
            </div>
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
                            <col width='145px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='30px'>
                                <td>
                                    <div dojoType='unieap.form.Button' height='25px' id='savbtn' label='保存' width='40px'></div>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.tree.Tree' height='100%' id='principalList_menuTree' width='100%' binding="{id:'id',label:'name',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecMenu'}" checkLogic="{model:'cascade'}"></div>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
