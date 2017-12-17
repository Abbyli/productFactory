
<%--
	
    @author lugj
    @creationTime 2014-03-14 09:37:36
    @modificationTime 2015-06-19 15:15:34
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/ria/gridImport-processor.js?version=20150619151534"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/ria/gridImport-view.js?version=20150619151534"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				gridImport.page_initEvents&&dojo.hitch(gridImport,gridImport.page_initEvents)();
				gridImport.page_load&&dojo.hitch(gridImport,gridImport.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.ria.package">
    <div dojoType='unieap.form.FieldSet' flexible='false' id='fieldset2' title='Excel文件'>
        <div dojoType='unieap.form.Form' enctype='multipart/form-data' id='importForm'>
            <table id='form1_tableLayout' width='100%' style='table-layout:fixed;margin-top:10px;'>
                <colgroup>
                    <col width='15%'></col>
                    <col width='27%'></col>
                    <col width='28%'></col>
                    <col width='30%'></col>
                </colgroup>
                <tbody>
                    <tr id='form1_0_tr'>
                        <td align='right' id='exportType_label_td' rowSpan='1'>
                            <label id='exportType_label'>源文件：</label>
                        </td>
                        <td colSpan='3' id='exportType_td' rowSpan='1'>
                            <div dojoType='unieap.form.FileInput' cancelText='重置' fileFilter='xls' id='fileInput1' width='100%'></div>
                        </td>
                    </tr>
                    <tr height='25px'>
                        <td align='right' height='50px'>
                            <label id='label2' width='65%'>工作表：</label>
                        </td>
                        <td colSpan='3'>
                            <div dojoType='unieap.form.ComboBox' id='sheets' width='100%'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table id='form1_ToolBarInfo_copy1' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='380px'></col>
                    <col width='70px'></col>
                </colgroup>
                <tbody>
                    <tr height='30px'>
                        <td>
                            <div dojoType='unieap.form.CheckBox' id='ishighlight' style='margin-left:62px;display:none;'></div>
                            <label id='label1' width='200px' style='display:none;'>导入后以红色显示更新内容</label>
                        </td>
                        <td>
                            <div dojoType='unieap.form.CheckBox' class='float:right;' id='advanceConfig'></div>
                            <label id='label3' width='100%'>高级设置</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id='advancedConfigDiv' style='display:none;'>
        <div dojoType='unieap.form.FieldSet' flexible='false' height='90px' id='fieldset1' title='导入设置'>
            <table id='tableLayout1'>
                <colgroup>
                    <col width='150px'></col>
                    <col width='150px'></col>
                    <col width='150px'></col>
                    <col width='150px'></col>
                    <col width='150px'></col>
                    <col width='150px'></col>
                    <col width='150px'></col>
                </colgroup>
                <tbody>
                    <tr height='25px'>
                        <td align='right'>
                            <label id='labelRow' width='100%'>标题所在行：</label>
                        </td>
                        <td>
                            <div dojoType="unieap.form.NumberSpinner" id="labelRowSpinner" width="85px" onChange="gridImport.changeUploadFlag" constraints={max:9999,min:1}></div>

                        </td>
                        <td align='right'>
                            <label id='labelCell' width='100%'>标题开始列：</label>
                        </td>
                        <td>
                            <div dojoType="unieap.form.NumberSpinner" id="labelStartCellSpinner" width="85px" onChange="gridImport.changeUploadFlag" constraints={max:9999,min:1}></div>
                        </td>
                        <td align='right'>
                            <label id='labelEndCell'>标题结束列：</label>
                        </td>
                        <td>
                            <div dojoType="unieap.form.NumberSpinner" id="labelEndCellSpinner" width="85px" onChange="gridImport.changeUploadFlag" constraints={max:9999,min:1}></div>
                        </td>
                        <td align='right'>
                            <div dojoType='unieap.form.Button' id='upload' label='加载' width='70px' style='margin-right:-5px;'></div>
                        </td>
                    </tr>
                    <tr height='25px'>
                        <td align='right'>
                            <label id='dataStartRow' width='100%'>数据开始行：</label>
                        </td>
                        <td>
                            <div dojoType="unieap.form.NumberSpinner" id="dataStartRowSpinner" width="85px" constraints={max:9999,min:1}></div>
                        </td>
                        <td align='right'>
                            <label id='dataEndRow' width='100%'>数据结束行：</label>
                        </td>
                        <td>
                            <div dojoType="unieap.form.NumberSpinner" id="dataEndRowSpinner" width="85px" constraints={max:9999,min:1}></div>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td align='right'>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table id='tableLayout2'>
            <colgroup>
                <col width='30%'></col>
                <col width='10%'></col>
                <col width='30%'></col>
                <col width='30%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td>
                        <div dojoType='unieap.grid.Grid' height='100%' id='excelAllCells' rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{markDirty:false,orderType:'none',rowBar:false,rowNumber:false,onRowClick:gridImport.excelAllCells_views_onRowClick}">
                            <header>
                                <row>
                                    <cell enable='false' id='cell_label' label='Excel剩余列' name='label' width='100%'></cell>
                                </row>
                            </header>
                        </div>
                    </td>
                    <td>
                        <div dojoType='unieap.form.Button' id='moveRight' label=' > ' width='40px' style='margin-left:13px;margin-bottom:5px;'></div>
                        <div dojoType='unieap.form.Button' id='moveLeft' label=' < ' width='40px' style='margin-left:13px;margin-bottom:5px;'></div>
                        <div dojoType='unieap.form.Button' id='moveTop' label='^' width='40px' style='margin-left:13px;margin-bottom:5px;'></div>
                        <div dojoType='unieap.form.Button' id='moveDown' label='v' width='40px' style='margin-left:13px;margin-bottom:5px;'></div>
                    </td>
                    <td>
                        <div dojoType='unieap.grid.Grid' height='100%' id='excelImportCells' rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{markDirty:false,orderType:'none',rowBar:false,rowNumber:false,onRowClick:gridImport.excelImportCells_views_onRowClick}">
                            <header>
                                <row>
                                    <cell enable='false' id='cell_label' label='Excel导入列' name='label' width='100%'></cell>
                                </row>
                            </header>
                        </div>
                    </td>
                    <td>
                        <div dojoType='unieap.grid.Grid' height='100%' id='gridCellList' rows="{rowsPerPage:'10'}" selection="{selectType:'none'}" views="{orderType:'none',rowBar:false,rowNumber:false}">
                            <header>
                                <row>
                                    <cell enable='false' id='cell_label' label='列表全部列' name='label' width='100%'></cell>
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
                    <div dojoType='unieap.form.Button' disabled='true' id='saveConfig' label='保存设置' width='70px' style='margin-right:3px;display:none'></div>
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
