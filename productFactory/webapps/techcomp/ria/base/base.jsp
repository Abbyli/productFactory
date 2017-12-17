<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.unieap.core.context.UniEAPContextHolder" %>
<%@ page import="com.neusoft.unieap.core.i18n.GlobalService" %>
<%@ page import="com.neusoft.unieap.core.CoreVariability" %>
<%
String path = request.getContextPath();
String cmpPath = request.getRequestURI();
//String localeStr = UniEAPContextHolder.getContext().getI18nContext().getLocale().toString();
String localeStr = GlobalService.getUserI18nContext().getLocale().toString();
String userAccount = UniEAPContextHolder.getContext().getCurrentUser().getAccount();
int bitsOfOneChinese = CoreVariability.getDatabaseCharset().equals("UTF-8") ? 3 : 2;
%>
<!-- 录制脚本 -->
<link href="<%=path%>/techcomp/ria/dijit/themes/claro/claro.css" rel="stylesheet" type="text/css" />
<style>
	@import "<%=path%>/techcomp/ria/unieap/themes/base/css/unieap.css";
	@import "<%=path%>/techcomp/ria/unieap/themes/gainsboro/css/unieap.css";
	@import "<%=path%>/techcomp/ria/base/themes/common.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/gainsboro/css/query.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/css/exception.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/css/MessageCenter.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/base/css/layout-navigatorcontainer.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/gainsboro/css/layout-navigatorcontainer.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/gainsboro/css/form-quicksearch.css";
	@import "<%=path%>/techcomp/ria/unieapx/themes/gainsboro/css/record-script.css";
	@import "<%=path%>/ProductFactory/factory/pageButton/buttons.css";
	body{
		margin : 0px;
		visibility : hidden;
	}
</style>
<link href="<%=path%>/techcomp/css/style.css" rel="stylesheet" type="text/css" />
<!-- 图片按钮样式 -->
	<link href="<%=path%>/techcomp/css/style-image.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/techcomp/ria/dojo/dojo.js" djConfig=" parseOnLoad: true,locale:'zh',cacheBust:version=201309261654" ></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/patch/dojo-patch.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/patch/loader.js" ></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/patch/boosters.js" ></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/nls/application_<%=localeStr %>.js" ></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/nls/application_<%=localeStr %>.js" ></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/global.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/cache.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/rpc.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Form.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/FieldSet.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/TextBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/InlineEditBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Textarea.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/NumberTextBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/TextBoxWithIcon.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/ComboBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/DateTextBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/ComboBoxTree.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Button.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/DropDownButton.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/CheckBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/RadioButton.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/CheckBoxGroup.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/RadioButtonGroup.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/CurrencyTextBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/FileInput.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/form/FormListBinding.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/form/FormList.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/tree/Tree.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/Container.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/TitlePane.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/TabContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/AdaptiveContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/BorderContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/BorderPane.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/grid/Grid.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/xgrid/Grid.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/dialog/DialogUtil.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/xdialog/xDialogUtil.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/xdialog/xDialog.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/dialog/MessageBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/menu/Menu.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/Tooltip.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/Helptip.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/progressbar/ProgressBar.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/base/rpc.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/base/view.js"></script>

<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/HBoxContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/VBoxContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/StackContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/AccordionPane.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/layout/AccordionContainer.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/MultilineTextBox.js"></script>

<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/trace/MessageCenter.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/trace/TraceMessageBox.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/query/Query.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/query/Binding.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/query/AdvancedQuery.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/form/FormList.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/form/FormListBinding.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/form/QuickSearch.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/exception/Handler.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/layout/NavigatorContainer.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/layout/NavigatorController.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieapx/layout/NavigatorPane.js"></script>

<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/NumberSpinner.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Slider.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/IpAddress.js"></script>

<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/ImageViewer.js"></script>

<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/wizard/Wizard.js"></script>

<!-- 多附件上传 -->
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/plupload/plupload.full.min.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Uploader.js"></script>

<!--<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/RichTextEditor.js"></script>-->
<script type="text/javascript" src="<%=path%>/techcomp/ria/base/common.js"></script> 
<!-- 多附件上传 -->
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/plupload/plupload.full.min.js"></script>
<script type="text/javascript" src="<%=path%>/techcomp/ria/unieap/form/Uploader.js"></script>

<script type="text/javascript">
	var dataCenter = new unieap.ds.DataCenter();/*用于单帧菜单，非单帧情况可以不定义*/
	unieap.WEB_APP_NAME = "<%=path%>";
	unieap.locale = "<%=localeStr%>";
	unieap.userAccount = <%=userAccount == null%>?null:"<%=userAccount%>";
	unieap.cmpPath = "<%=cmpPath%>";
	unieap.global.bitsOfOneChinese = <%=bitsOfOneChinese%>;
	dojo.addOnLoad(function(){
		dojo.style(document.body,"visibility","visible");
	});
	
	if(typeof(RIA_UNIEAPX_I18N)=='undefined'){
		dojo.require("unieapx.nls.application_"+unieap.locale);
	}
	/*存储每个页面中view和viewc的名字，单帧下key为rootNodeId，非单帧下为viewContext*/
  	if(typeof(unieapViewContextHolder) == "undefined"){
		unieapViewContextHolder = {};
	}
</script>
