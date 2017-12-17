
<%--
	
    @author liu.w
    @creationTime 2016-01-22 08:48:26
    @modificationTime 2016-12-27 16:04:54
    @version 1.0.0 
--%>

<%
String path = request.getContextPath();
String viewcContext = request.getParameter("viewcContext");
%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://unieap.neusoft.com/techcomp/ria" prefix="unieap" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
	    <script type="text/javascript">var navigateButtonContext = "<%=viewcContext%>_navigateButton";</script>
		
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/navigateButton.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/navigateButton-processor.js?version=20161227160454"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/comboInformation/navigateButton-view.js?version=20161227160454"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
		</script>
		<s:i18n name="productfactory.factoryabclife.package">
    <!--<style>
.navBtn_back {
	margin-bottom:5px;
	border-left-width: 0px !important;
    	border-right-width: 0px !important;
}
.navBtn_back button{
	background-color:#ebf3fb !important;
}
.navBtn {
	margin-bottom:5px;
	border:0px !important;
}
.navBtn button{
	background-color:#ebf3fb !important;
}
.navBtn-icon{
	margin-right:8px;
	margin-bottom:0px;
	display:inline-block;
	width:24px;
	height:24px;
	background:url("../../ProductFactory/factory/navigateButton/icon.png") no-repeat;
}
.navBtn_back{
	background:url("../../ProductFactory/factory/navigateButton/icon_back.png") no-repeat;
}
.unieap .navBtn-active .u-form-btn-txt{
	color:#1e81d4;
	font-weight: bold;
}
.navBtn_active{
	background:url("../../ProductFactory/factory/navigateButton/icon_active.png") no-repeat;
}
</style>-->
    <div id='div1' style='background-color:#ebf3fb;height:100%'>
        <div dojoType='unieap.form.Button' class='navBtn' height='24px' iconClass='navBtn_back' id='button_back' label='返&nbsp;&nbsp;&nbsp;回' toolTip='返回' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='choose' label='选择险种' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='comboAttr' label='组合属性' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='comboParam' label='组合参数' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='comboElement' label='组合要素' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='elementRef' label='要素关系' width='100px'></div>
        <div dojoType='unieap.form.Button' class='navBtn' height='30px' iconClass='navBtn-icon' id='comboRateManage' label='精算数据' width='100px'></div>
    </div>
</s:i18n>