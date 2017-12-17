
<%--
	法定准备金因子上传
    @author Administrator
    @creationTime 2016-07-12 10:13:22
    @modificationTime 2017-01-16 15:42:40
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
	   	 
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/btn.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateFileUpload-processor.js?version=20170116154240"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateFileUpload-view.js?version=20170116154240"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateFileUpload.page_initEvents&&dojo.hitch(pFInterestRateFileUpload,pFInterestRateFileUpload.page_initEvents)();
				pFInterestRateFileUpload.page_load&&dojo.hitch(pFInterestRateFileUpload,pFInterestRateFileUpload.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' enctype='multipart/form-data' id='form_upload'>
        <table id='tableLayout_upload' width='100%'>
            <colgroup>
                <col width='10%'></col>
                <col width='80%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td>
                    </td>
                    <td>
                        <div dojoType='unieap.form.FileInput' fileFilter='csv' height='30px' id='fileInput1' width='100%'></div>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class='toolbar-table' id='tableLayout_btn' width='100%'>
        <colgroup>
            <col width='600px'></col>
        </colgroup>
        <tbody>
            <tr height='25px'>
                <td align='right' class='toolbar_'>
                    <div dojoType='unieap.form.Button' class='myButton' id='btn_upload' label='确&nbsp认' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
