
<%--
	
    @author user
    @creationTime 2014-07-04 10:17:05
    @modificationTime 2014-11-14 14:19:49
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/datascope/datascop_edit-processor.js?version=20141114141949"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/datascope/datascop_edit-view.js?version=20141114141949"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				datascop_edit.page_initEvents&&dojo.hitch(datascop_edit,datascop_edit.page_initEvents)();
				datascop_edit.page_load&&dojo.hitch(datascop_edit,datascop_edit.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecDataScope'}">
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='20%'></col>
                <col width='35%'></col>
                <col width='1%'></col>
                <col width='10%'></col>
                <col width='10%'></col>
                <col width='10%'></col>
                <col width='4%'></col>
                <col width='10%'></col>
            </colgroup>
            <tbody>
                <tr height='30px' id='form1_0_tr'>
                    <td align='right' id='name_label_td' rowSpan='1'>
                        <label id='name_label'>范围名称 :</label>
                    </td>
                    <td colSpan='6' id='name_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='name' maxLength='64' required='true' width='50%' binding="{name:'name'}"></div>
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
                    <td>
                    </td>
                </tr>
                <tr height='60px' id='form1_2_tr'>
                    <td align='right' id='description_label_td' rowSpan='1'>
                        <label id='description_label'>描述 :</label>
                    </td>
                    <td colSpan='6' height='59px' id='description_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='description' maxLength='255' width='95%' binding="{name:'description'}"></div>
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
                    <td>
                    </td>
                </tr>
                <tr height='40px' id='form1_3_tr'>
                    <td align='right' id='dataSourceName_label_td' rowSpan='1'>
                        <label id='dataSourceName_label'>数据源名称 :</label>
                    </td>
                    <td colSpan='6' height='30px' id='dataSourceName_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='dataSource' maxLength='32' width='50%' binding="{markDirty:false,name:'dataSource'}" dataProvider="{store:'dataSourceDS'}" decoder="{displayAttr:'name',valueAttr:'id'}"></div>
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
                    <td>
                    </td>
                </tr>
                <tr height='59px' id='form1_1_tr'>
                    <td align='right' id='sql_label_td' rowSpan='1'>
                        <label id='sql_label'>SQL :</label>
                    </td>
                    <td colSpan='6' id='sql_td' rowSpan='1'>
                        <div dojoType='unieap.form.Textarea' id='sql' maxLength='4000' required='true' width='95%' binding="{name:'sql'}"></div>
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
                    <td>
                    </td>
                </tr>
                <tr height='40px' id='form1_3_tr'>
                    <td align='right' id='param_label_td' rowSpan='1'>
                        <label id='param_label'>参数：</label>
                    </td>
                    <td colSpan='1' height='40px' id='param_td' rowSpan='1'>
                        <div dojoType='unieap.form.TextBox' id='param' maxLength='32' width='100%' binding="{name:'param'}"></div>
                    </td>
                    <td>
                    </td>
                    <td align='center'>
                        <div dojoType='unieap.form.Button' id='btnAddPara' label='增加' width='100%'></div>
                    </td>
                    <td align='center'>
                        <div dojoType='unieap.form.Button' id='btnDelPara' label='删除' width='100%'></div>
                    </td>
                    <td align='center'>
                        <div dojoType='unieap.form.Button' id='btnClearPara' label='清空' width='100%'></div>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div dojoType='unieap.xgrid.Grid' height='200px' id='grid1' binding="{store:'sysSecDataScopeParams'}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:false}">
        <header>
            <row>
                <cell dataType='string' enable='false' id='cell_code' label='参数' name='code' width='100%'></cell>
            </row>
        </header>
    </div>
    <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col width='100px'></col>
            <col width='100px'></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' height='25px' id='form1_saveButton' label='保存' width='90px'></div>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' height='25px' id='form1_resetButton' label='关闭' width='90px'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
