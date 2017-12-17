
<%--
	
    @author wuzb
    @creationTime 2014-04-09 11:06:36
    @modificationTime 2015-06-19 13:26:30
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/ria/gridImportPreview-processor.js?version=20150619132630"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/ria/gridImportPreview-view.js?version=20150619132630"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				gridImportPreview.page_initEvents&&dojo.hitch(gridImportPreview,gridImportPreview.page_initEvents)();
				gridImportPreview.page_load&&dojo.hitch(gridImportPreview,gridImportPreview.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.ria.package">
    <div id='xGridDiv'>
    </div>
    <div id='tipMessage' style='margin-top:35px;'>
        <table id='tableLayout1' width='100%'>
            <colgroup>
                <col width='5%'></col>
                <col width='95%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td>
                        <img border='1px' height='10px' id='img1' src='<%=path%>/techcomp/images/error.png' width='10px' style='margin-left:19px;'></img>
                    </td>
                    <td>
                        <label height='auto' id='label1' width='200px' style='float:left'>黄色表示错误数据，不导入。</label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id='execution' style='margin-top:5px;display:none'>
        <div dojoType='unieap.form.Button' id='cancel' label='返回' width='70px' style='float:right;margin-right:20px;'></div>
        <div dojoType='unieap.form.Button' id='doImport' label='导入' width='70px' style='float:right;margin-right:20px;'></div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
