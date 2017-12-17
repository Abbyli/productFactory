
<%--
	
    @author Administrator
    @creationTime 2016-08-31 11:40:06
    @modificationTime 2016-08-31 18:16:02
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfUploadManage-processor.js?version=20160831181602"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfUploadManage-view.js?version=20160831181602"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfUploadManage.page_initEvents&&dojo.hitch(pfUploadManage,pfUploadManage.page_initEvents)();
				pfUploadManage.page_load&&dojo.hitch(pfUploadManage,pfUploadManage.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='精算数据上传信息' width='100%'>
        <div dojoType='unieap.grid.Grid' height='100%' id='grid1' binding="{store:'sysAsyncExecuteResult_info'}" detail="{getMasterDetail:pfUploadManage.grid1_detail_getMasterDetail}" rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_bussinessDesc' label='业务描述' name='bussinessDesc' width='25%'></cell>
                    <cell dataType='string' enable='false' id='cell_userId' label='操作员' name='userId' width='25%'></cell>
                    <cell dataType='date' enable='false' id='cell_executeTime' label='执行时间' name='executeTime' width='25%' displayFormatter="{dataFormat:'yyyy-MM-dd HH:mm:ss',declaredClass:'unieap.form.DateDisplayFormatter'}"></cell>
                    <cell dataType='string' enable='false' id='cell_statue' label='状态' name='statue' width='25%' decoder="{store:'ds_status_upload'}"></cell>
                </row>
            </header>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
