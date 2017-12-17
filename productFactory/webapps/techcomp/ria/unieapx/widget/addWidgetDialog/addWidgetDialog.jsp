<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ThemeRoller</title>
<%@ include file="/techcomp/ria/base/base.jsp"%>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/chart/jquery.min.js"></script>
<link href="<%=path%>/techcomp/ria/unieapx/widget/addWidgetDialog/addWidgetDialog.css" rel="stylesheet" type="text/css" />
<script scope="view" src="<%=path%>/techcomp/ria/unieapx/widget/addWidgetDialog/addWidgetDialog.js"></script>
</head>
<body class="unieap">   
   	<div id="bc" dojoType="unieap.layout.BorderContainer">
		<div dojoType="unieap.layout.BorderPane" region="center" title="Widget列表" onContainerResize="addWidgetDialog.onContainerResize">
			<div id="main" class="addWidgetMain">
			    <ul id="holder" class="addWidgetHolder">
				</ul>
			</div>
		</div>
		<div dojoType="unieap.layout.BorderPane" region="left" title="Widget分类" width="30%">
			<div dojoType="unieap.tree.Tree" id="basicTree" 
				onClick="addWidgetDialog.afterNodeClick"
				binding = "{'leaf':'isLeaf','label':'label','id':'id',
					'parent':'parentId', query:{name:'parentId',relation:'=',value:null} }">
			</div>
		</div>
	 </div>
</body>
</html>