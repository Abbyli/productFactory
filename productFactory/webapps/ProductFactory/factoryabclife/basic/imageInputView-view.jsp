
<%--
	新影像扫描页面, view页面集成activeX组件
    @author user
    @creationTime 2014-05-06 16:22:48
    @modificationTime 2017-01-13 10:52:25
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
	   	 
	    <link href="<%=path%>/lifeCommon/imageUpload/css/divPosition.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/imageInputView-processor.js?version=20170113105225"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/imageInputView-view.js?version=20170113105225"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				imageInputView.page_initEvents&&dojo.hitch(imageInputView,imageInputView.page_initEvents)();
				imageInputView.page_load&&dojo.hitch(imageInputView,imageInputView.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div class='verticalAlignqyt' id='divVerticalAlign'>
    </div>
    <div class='allqyt' id='divAll'>
        <object id="webScan" classid="clsid:53E28E6F-52EC-4B51-804D-514DFD6B177F" width="803px" height="603px" codebase="../../lifeCommon/imageUpload/install/WebScannerX.CAB#version=1,0,5,0">
            <param name="NotifyScanedScript" value="onScaned" />
            <param name="NotifyScanedPageScript" value="onScanedPage" />
            <param name="UploadImgDataJs" value="imageInputView.UploadImgData" />
        </object>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
