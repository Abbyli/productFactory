<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.neusoft.unieap.core.context.UniEAPContextHolder" %>
<%@ taglib uri="http://unieap.neusoft.com/techcomp/ria" prefix="ria" %>
<%
	String ROOT_PATH=request.getContextPath()+"/techcomp/ria/";
	String userType = UniEAPContextHolder.getContext().getCurrentUser().getType();
	String userAccount = UniEAPContextHolder.getContext().getCurrentUser().getAccount();
%>
<html>
<head>
 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<%@ include file="/techcomp/ria/base/base.jsp" %>
 	<script type="text/javascript" src="<%=ROOT_PATH%>unieapx/trace/ShowTraceMessages.js"></script>
 	<script language="javascript">
		var ROOT_PATH = "<%=ROOT_PATH%>";
		var userType = "<%=userType%>";
		var userAccount = "<%=userAccount%>";
		var USER_ADMIN_TYPE = "1";

		var traceFieldStore = new unieap.ds.DataStore("traceFieldStore");
		var message = new unieap.ds.MetaData("message");
		message.setPrimaryKey(true);
		message.setDataType(12);
		message.setNullable(false);
		message.setLabel(RIA_UNIEAPX_I18N.trace.summaryInfo);
		traceFieldStore.addMetaData(message);
		
		var createdTime = new unieap.ds.MetaData("createdTime");
		createdTime.setPrimaryKey(false);
		createdTime.setDataType(93);
		createdTime.setNullable(true);
		createdTime.setLabel(RIA_UNIEAPX_I18N.trace.occurTime);
		traceFieldStore.addMetaData(createdTime);
		if(userType == USER_ADMIN_TYPE){
			var creatorName = new unieap.ds.MetaData("creatorName");
			creatorName.setPrimaryKey(true);
			creatorName.setDataType(12);
			creatorName.setNullable(false);
			creatorName.setLabel(RIA_UNIEAPX_I18N.trace.operator);
			traceFieldStore.addMetaData(creatorName);
		}
		
		traceFieldStore.setRowSetName("com.neusoft.unieap.core.exception.entity.TraceMessageBrief");
		dataCenter.addDataStore(traceFieldStore);
	</script>
</head>
<body class="unieap" scroll="no">
<s:i18n name="com.neusoft.unieap.techcomp.ria.package">
	<div id="parentCLAdaptive" dojoType="unieap.layout.AdaptiveContainer" height="100%"> 
		<div id="queryAdaptiveCLId" dojoType="unieap.layout.AdaptivePane">
			<div dojoType="unieap.form.FieldSet"  title='<s:text name="unieap.techcomp.ria.dialog.query.label"/>'
				open="false" 
				onToggle="changeQueryHeight" width="auto">
				<div dojoType='unieapx.query.Query'
					id='traceQuery' 
					binding="{store:'traceFieldStore'}" 
					target="traceGrid"
				 	maxDisplayCount="4"
				 	pageSize="18"
				 	onChangeCondition="changeQueryHeight"
				 	buildQueryCondition="customBuilderQueryCondition"
				 	order="CREATION_TIME desc"
					>
				</div>
			</div>
		</div>
		<div id="gridAdaptiveCLId" dojoType="unieap.layout.AdaptivePane" autoHeight="true">
			<div id="traceGrid"
				dojoType="unieap.grid.Grid"
				width="100%"
				height="100%"
				views="{rowBar:true,rowNumber:true,enableTooltip:true}"
				binding="{store:'traceStore',rpc:descendTracePage}"
				selection="{selectType:'m'}">
				<header>
					<div tagName="cell" width="60%" 
						label='<s:text name="unieap.techcomp.ria.dialog.summaryInfo.label"/>'
						binding="{name:'message'}" 
						name="message" >
					</div>
					<div tagName="cell" width="20%" 
						label='<s:text name="unieap.techcomp.ria.dialog.occurTime.label"/>'
						displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy/MM/dd hh:mm:ss'}"
						name="createdTime" >
					</div>
					<div tagName="cell" width="20%" 
						label='<s:text name="unieap.techcomp.ria.dialog.operator.label"/>'
						name="creatorName">
					</div>
				</header>
				<toolbar paging="{onPagingModified:pageProcessor}"></toolbar>
			</div>
		</div>
		<div dojoType="unieap.layout.AdaptivePane">	
			<div class="buttons">
				<div id="modifyCodeList"
					dojoType="unieap.form.Button"
					onclick="deleteTraceMessages()"
					label='<s:text name="unieap.techcomp.ria.dialog.delete.label"/>'></div>
				<div id="deleteCodeList" width="80px"
					dojoType="unieap.form.Button" 
					onclick="getStackInfoByTraceId()"
					label='<s:text name="unieap.techcomp.ria.dialog.lookStackInfo.label"/>'></div>
				<div id="cancel"
					dojoType="unieap.form.Button" 
					onclick="cancel()"
					label='<s:text name="unieap.techcomp.ria.dialog.close.label"/>'></div>
				</div>
		</div>
	</div>	
</s:i18n>
</body>
</html>