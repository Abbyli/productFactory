
<%--
	
    @author lugj
    @creationTime 2014-03-14 09:37:36
    @modificationTime 2015-01-13 16:09:54
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/ria/gridExport-processor.js?version=20150113160954"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/ria/gridExport-view.js?version=20150113160954"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				gridExport.page_initEvents&&dojo.hitch(gridExport,gridExport.page_initEvents)();
				gridExport.page_load&&dojo.hitch(gridExport,gridExport.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.ria.package">
    <div dojoType='unieap.form.FieldSet' flexible='false' id='fieldset1' title='导出设置'>
        <div id='div1' style='height:10px;display:block'>
        </div>
        <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
            <colgroup>
                <col width='15%'></col>
                <col width='27%'></col>
                <col width='28%'></col>
                <col width='30%'></col>
            </colgroup>
            <tbody>
                <tr id='form1_0_tr'>
                    <td align='right' id='exportType_label_td' rowSpan='1'>
                        <label id='exportType_label'>文件类型：</label>
                    </td>
                    <td colSpan='3' id='exportType_td' rowSpan='1'>
                        <div dojoType='unieap.form.ComboBox' id='exportType' width='100%' dataProvider="{store:'exportType'}" popup="{height:'auto'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table id='tableLayout1'>
            <colgroup>
                <col width='150px'></col>
                <col width='150px'></col>
                <col width='150px'></col>
                <col width='150px'></col>
                <col width='180px'></col>
                <col width='120px'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
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
                        <div dojoType='unieap.form.CheckBox' id='advanceConfig'></div>
                        <label id='label1' width='100%'>高级设置</label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id='advancedConfigDiv' style='display:none;'>
        <table id='tableLayout2' width='100%'>
            <colgroup>
                <col width='150px'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td>
                        <div dojoType='unieap.grid.Grid' height='180px' id='exportOptions' rows="{rowsPerPage:'10'}" selection="{selectType:'multiple'}" views="{rowBar:true,rowNumber:false}">
                            <header>
                                <row>
                                    <cell enable='false' id='cell_label' label='导出标题列表' name='label' width='100%'></cell>
                                </row>
                            </header>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
        <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col width='75px'></col>
            <col width='75px'></col>
        </colgroup>
        <tbody>
            <tr height='30px'>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td align='right'>
                    <div dojoType='unieap.form.Button' disabled='true' id='saveConfig' label='保存设置' width='70px' style='margin-right:3px;display:none;'></div>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' id='form1_saveButton' label='确定' width='70px'></div>
                </td>
                <td>
                    <div dojoType='unieap.form.Button' id='form1_resetButton' label='关闭' width='70px'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
