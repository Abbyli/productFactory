
<%--
	条款管理
    @author Neusoft
    @creationTime 2016-10-17 11:06:31
    @modificationTime 2016-10-26 09:21:54
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/docuManage/pfTermManagement-processor.js?version=20161026092154"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/docuManage/pfTermManagement-view.js?version=20161026092154"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfTermManagement.page_initEvents&&dojo.hitch(pfTermManagement,pfTermManagement.page_initEvents)();
				pfTermManagement.page_load&&dojo.hitch(pfTermManagement,pfTermManagement.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' id='titlePane1' title='险种查询'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='select_button' label='查&nbsp询' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form1' binding="{store:'tInsurtypeBasicInf_tmForm'}">
                    <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form1_1_tr'>
                                <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                                    <label id='insurtypeCode_label'>险种编码：</label>
                                </td>
                                <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='6' width='100%' binding="{name:'insurtypeCode'}"></div>
                                </td>
                                <td align='right' id='verNo_label_td' rowSpan='1'>
                                    <label id='verNo_label'>险种版本：</label>
                                </td>
                                <td colSpan='1' id='verNo_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' id='verNo' maxLength='16' width='100%' binding="{name:'verNo'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane1'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='险种列表' width='100%'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'tInsurtypeBasicInf_tmGrad',rpc:pfTermManagement.grid1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_insurtypeCode' label='险种编码' name='insurtypeCode' width='20%' decoder="{store:'INSURTYPE_CODE'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeName' label='险种名称' name='insurtypeName' width='25%' decoder="{store:'INSURTYPE_NAME'}"></cell>
                            <cell dataType='number' enable='false' id='cell_verNo' label='险种版本' name='verNo' width='20%'></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeAbbr' label='险种简称' name='insurtypeAbbr' width='25%' decoder="{store:'INSURTYPE_ABBR'}"></cell>
                            <cell enable='false' id='cell_operation' label='操作' name='operation' width='10%' formatter='pfTermManagement.cell_operation_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
