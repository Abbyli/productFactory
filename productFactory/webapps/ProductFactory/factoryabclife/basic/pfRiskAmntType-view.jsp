
<%--
	
    @author Administrator
    @creationTime 2016-07-19 17:17:47
    @modificationTime 2017-03-10 11:03:48
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRiskAmntType-processor.js?version=20170310110348"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRiskAmntType-view.js?version=20170310110348"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskAmntType.page_initEvents&&dojo.hitch(pfRiskAmntType,pfRiskAmntType.page_initEvents)();
				pfRiskAmntType.page_load&&dojo.hitch(pfRiskAmntType,pfRiskAmntType.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='风险保额定义' width='100%'>
        <div id='div1' type='buttons'>
            <div dojoType='unieap.form.Button' class='titlePane-button' id='add' label='新&nbsp增' width='100px'></div>
        </div>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'tRiskamntTypeDef_grid',rpc:pfRiskAmntType.grid1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_riskamntName' label='风险保额名称' name='riskamntName' width='45%'></cell>
                    <cell dataType='string' enable='false' id='cell_riskamntType' label='风险保额类型' name='riskamntType' width='45%'></cell>
                    <cell enable='false' id='cell_control_riskamnt' label='操作' name='control_riskamnt' width='10%' formatter='pfRiskAmntType.cell_control_riskamnt_formatter'></cell>
                </row>
            </header>
            <toolbar paging="{userPageSize:false}">
            </toolbar>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='130px' id='addDialog' title='风险保额新增' url='<%=path%>/ProductFactory/factoryabclife/basic_pfRiskAmntTypeDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='130px' id='updateDialog' title='风险保额类型修改' url='<%=path%>/ProductFactory/factoryabclife/basic_pfRiskAmntTypeDialog_entry.action' width='680px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
