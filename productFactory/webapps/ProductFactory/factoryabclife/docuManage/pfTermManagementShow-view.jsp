
<%--
	条款展示信息
    @author Neusoft
    @creationTime 2016-10-17 16:19:48
    @modificationTime 2017-01-20 13:44:11
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/docuManage/pfTermManagementShow-processor.js?version=20170120134411"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/docuManage/pfTermManagementShow-view.js?version=20170120134411"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfTermManagementShow.page_initEvents&&dojo.hitch(pfTermManagementShow,pfTermManagementShow.page_initEvents)();
				pfTermManagementShow.page_load&&dojo.hitch(pfTermManagementShow,pfTermManagementShow.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' height='100px' id='xdialog1' title='条案上传' url='<%=path%>/ProductFactory/factoryabclife/docuManage_pfTermManagementUp_entry.action' width='700px'>
    </div>
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='险种信息'>
                <div dojoType='unieap.form.Form' id='form1' binding="{store:'tInsurtypeBasicInf_from'}">
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
                                    <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                </td>
                                <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                                    <label id='insurtypeName_label'>险种名称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeName' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_3_tr'>
                                <td align='right' id='verNo_label_td' rowSpan='1'>
                                    <label id='verNo_label'>险种版本：</label>
                                </td>
                                <td colSpan='1' id='verNo_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' id='verNo' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                </td>
                                <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                                    <label id='insurtypeAbbr_label'>险种简称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeAbbr' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
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
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='条案信息' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button1' label='上&nbsp传'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='375px' id='grid1' binding="{store:'tRuleManageDef'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_downloadPath' label='版本标识' name='downloadPath' width='30%'></cell>
                            <cell dataType='string' enable='false' id='cell_ruleName' label='条款名称' name='ruleName' width='30%'></cell>
                            <cell dataType='date' enable='false' id='cell_uploadTime' label='上传时间' name='uploadTime' width='30%' displayFormatter="{declaredClass:'unieap.long_date'}"></cell>
                            <cell enable='false' id='cell_operation' label='操作' name='operation' width='10%' formatter='pfTermManagementShow.cell_operation_formatter'></cell>
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
