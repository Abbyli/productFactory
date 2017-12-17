
<%--
	
    @author shify
    @creationTime 2014-07-03 16:07:56
    @modificationTime 2014-12-31 16:45:56
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/page_authority/role/role_page_authority_unieap-processor.js?version=20141231164556"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/page_authority/role/role_page_authority_unieap-view.js?version=20141231164556"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				role_page_authority_unieap.page_initEvents&&dojo.hitch(role_page_authority_unieap,role_page_authority_unieap.page_initEvents)();
				role_page_authority_unieap.page_load&&dojo.hitch(role_page_authority_unieap,role_page_authority_unieap.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='sidebar' height='99%' id='borderLayout2' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' height='30px' id='borderPane2' region='top' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Button' height='25px' id='button1' label='保存' width='50px'></div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'sysSecRole'}" rows="{defaultHeaderHeight:'28',defaultRowHeight:'28'}" selection="{selectType:'single',onAfterSelect:role_page_authority_unieap.grid1_selection_onAfterSelect}"
            views="{rowBar:true,rowNumber:false,onRowClick:role_page_authority_unieap.grid1_views_onRowClick}">
                <header>
                    <row>
                        <cell dataType='string' enable='false' id='cell_name' label='角色信息' name='name' width='100%'></cell>
                    </row>
                </header>
            </div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane4' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.tree.Tree' height='199px' id='tree1' width='152px' binding="{id:'id',label:'name',parent:'appId',query:{name:'appId',relation:'=',value:null},store:'sysSecPage'}" checkLogic="{model:'cascade'}"></div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
