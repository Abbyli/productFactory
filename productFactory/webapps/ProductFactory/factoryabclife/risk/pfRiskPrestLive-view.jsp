
<%--
	生存给付
    @author neusoft
    @creationTime 2016-07-08 11:45:06
    @modificationTime 2017-03-24 10:45:03
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestLive-processor.js?version=20170324104503"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestLive-view.js?version=20170324104503"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestLive_navigateButton.setViewcContext("pfRiskPrestLive_navigateButton");
pfRiskPrestLive_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrestLive_navigateButton,pfRiskPrestLive_navigateButton.page_initEvents)();
pfRiskPrestLive_navigateButton.page_load&&dojo.hitch(pfRiskPrestLive_navigateButton,pfRiskPrestLive_navigateButton.page_load)();
pfRiskPrestLive.page_initEvents&&dojo.hitch(pfRiskPrestLive,pfRiskPrestLive.page_initEvents)();
				pfRiskPrestLive.page_load&&dojo.hitch(pfRiskPrestLive,pfRiskPrestLive.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrestLive" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1' width='100%'>
                <div dojoType='unieap.layout.AdaptivePane' id='adaptivePane1'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='保障责任信息' width='100%'>
                        <div dojoType='unieap.form.Form' id='form_liveform' binding="{store:'tProtecLiabDef_liveForm'}">
                            <table id='form_liveform_tableLayout' width='100%' style='table-layout:fixed;'>
                                <colgroup>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='15%'></col>
                                    <col width='30%'></col>
                                    <col width='10%'></col>
                                </colgroup>
                                <tbody>
                                    <tr id='form_liveform_1_tr'>
                                        <td align='right' id='protecLiabCode_label_td' rowSpan='1'>
                                            <label id='protecLiabCode_label'>保障责任代码：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabCode_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='protecLiabCode' maxLength='10' readOnly='true' width='100%' binding="{name:'protecLiabCode'}"></div>
                                        </td>
                                        <td align='right' id='protecLiabName_label_td' rowSpan='1'>
                                            <label id='protecLiabName_label'>保障责任名称：</label>
                                        </td>
                                        <td colSpan='1' id='protecLiabName_td' rowSpan='1'>
                                            <div dojoType='unieap.form.TextBox' id='protecLiabName' maxLength='120' readOnly='true' width='100%' binding="{name:'protecLiabName'}"></div>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='50%' autoHeight='true' id='adaptivePane2'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane2' title='生存给付信息' width='100%'>
                        <div id='div1' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addlive' label='新&nbsp增' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_liveGrid' binding="{store:'tSurvvGivepayDef_liveGrid'}" selection="{selectType:'single',onAfterSelect:pfRiskPrestLive.grid_liveGrid_selection_onAfterSelect}" views="{rowBar:true,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_survvGivepayCode' label='生存给付代码' name='survvGivepayCode' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_survvGivepayName' label='生存给付名称' name='survvGivepayName' width='25%'></cell>
                                    <cell dataType='string' enable='false' id='cell_survvGivepayType' label='生存给付类型' name='survvGivepayType' width='25%' decoder="{store:'ds_survv'}"></cell>
                                    <cell dataType='number' enable='false' id='cell_givepayIntv' label='给付间隔' name='givepayIntv' width='15%' displayFormatter="{declaredClass:'unieap.myLiveFormatter'}"></cell>
                                    <cell enable='false' id='cell_control_live' label='操作' name='control_live' width='10%' formatter='pfRiskPrestLive.cell_control_live_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
                <div dojoType='unieap.layout.AdaptivePane' height='50%' autoHeight='true' id='adaptivePane3'>
                    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane3' title='给付算法' width='100%'>
                        <div id='div2' type='buttons'>
                            <div dojoType='unieap.form.Button' class='titlePane-button' id='addformula' label='添加算法' width='100px'></div>
                        </div>
                        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_live_formula' binding="{store:'tObjFormula_live_grid'}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                            <header>
                                <row>
                                    <cell dataType='string' enable='false' id='cell_relationContent' label='条件' name='relationContent' width='45%'></cell>
                                    <cell dataType='string' enable='false' id='cell_description' label='公式描述' name='description' width='45%'></cell>
                                    <cell enable='false' id='cell_control_formula' label='操作' name='control_formula' width='10%' formatter='pfRiskPrestLive.cell_control_formula_formatter'></cell>
                                </row>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='270px' id='addDialog' title='生存给付新增' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestLiveDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='270px' id='updateDialog' title='生存给付修改' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestLiveDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='addAlgo' title='添加算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='550px' id='updateAlgo' title='修改算法' url='<%=path%>/ProductFactory/factoryabclife/risk_pfRiskPrestAlgoDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
