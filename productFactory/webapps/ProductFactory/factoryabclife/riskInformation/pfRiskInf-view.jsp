
<%--
	个险险种定义
    @author think
    @creationTime 2016-06-23 10:29:46
    @modificationTime 2016-10-11 14:28:00
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskInf-processor.js?version=20161011142800"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskInf-view.js?version=20161011142800"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskInf.page_initEvents&&dojo.hitch(pfRiskInf,pfRiskInf.page_initEvents)();
				pfRiskInf.page_load&&dojo.hitch(pfRiskInf,pfRiskInf.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' id='xdialog3' title='XDialog' url='<%=path%>/ProductFactory/factoryabclife/risk_test_entry.action'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='167px' id='xdialog1' isExpand='false' title='个险定义' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskDialog_entry.action' width='600px'>
    </div>
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1' width='100%'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_form' title='险种查询' width='100%'>
                <div id='div_btn_form' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnQuery' label='查&nbsp询' width='100px'></div>
                    <div dojoType='unieap.form.Button' id='button1' label='算法测试' width='100px' style='display:none'></div>
                    <div dojoType='unieap.form.Button' id='button3' label='formlist' style='display:none'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button4' label='重&nbsp置' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_risk' binding="{store:'tInsurtypeBasicInf_form'}">
                    <table id='form_risk_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_risk_1_tr'>
                                <td align='right' id='insurtypeCode__risk_label_td' rowSpan='1'>
                                    <label id='insurtypeCode__risk_label'>险种编码：</label>
                                </td>
                                <td colSpan='1' id='insurtypeCode__risk_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeCode__risk' maxLength='4' width='100%' binding="{name:'insurtypeCode'}"></div>
                                </td>
                                <td align='right' id='verNo__risk_label_td' rowSpan='1'>
                                    <label id='verNo__risk_label'>险种版本：</label>
                                </td>
                                <td colSpan='1' id='verNo__risk_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' id='verNo__risk' maxLength='16' width='100%' binding="{name:'verNo'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_risk_3_tr'>
                                <td align='right' id='insurtypeName__risk_label_td' rowSpan='1'>
                                    <label id='insurtypeName__risk_label'>险种名称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeName__risk_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeName__risk' maxLength='120' width='100%' binding="{name:'insurtypeName'}"></div>
                                </td>
                                <td align='right' id='insurtypeAbbr__risk_label_td' rowSpan='1'>
                                    <label id='insurtypeAbbr__risk_label'>险种简称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeAbbr__risk_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__risk' maxLength='90' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='adaptivePane2'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_grid' title='险种列表' width='100%'>
                <div id='div_btn_grid' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnAdd' label='新&nbsp增' width='100px'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='button2' label='复&nbsp制' width='100px' style='display:none'></div>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnReview' label='提交审核' width='100px'></div>
                </div>
                <div dojoType='unieap.grid.Grid' height='100%' id='grid_risk' binding="{store:'tInsurtypeBasicInf_grid',rpc:pfRiskInf.grid_risk_binding_rpc}" rows="{rowsPerPage:'10'}" selection="{selectType:'single'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_insurtypeCode__risk' label='险种编码' name='insurtypeCode' width='10%' formatter='pfRiskInf.cell_insurtypeCode__risk_formatter' decoder="{store:'INSURTYPE_CODE'}"></cell>
                            <cell dataType='number' enable='false' id='cell_verNo__risk' label='险种版本' name='verNo' width='10%'></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeName__risk' label='险种名称' name='insurtypeName' width='20%' decoder="{store:'INSURTYPE_NAME'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeAbbr__risk' label='险种简称' name='insurtypeAbbr' width='15%' decoder="{store:'INSURTYPE_ABBR'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeEngName__risk' label='险种英文名称' name='insurtypeEngName' width='20%' decoder="{store:'INSURTYPE_ENG_NAME'}"></cell>
                            <cell dataType='string' enable='false' id='cell_insurtypeEngAbbr__risk' label='险种英文简称' name='insurtypeEngAbbr' width='15%' decoder="{store:'INSURTYPE_ENG_ABBR'}"></cell>
                            <cell enable='false' id='cell_control__risk' label='操作' name='control' styles='text-align:center' width='10%' formatter='pfRiskInf.cell_control__risk_formatter'></cell>
                        </row>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='343px' id='xdialog2' title='复制' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskCopyDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
