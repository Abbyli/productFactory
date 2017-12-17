
<%--
	要素定义
    @author Administrator
    @creationTime 2016-06-30 15:39:54
    @modificationTime 2016-11-04 10:32:24
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestElement-processor.js?version=20161104103224"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskPrestElement-view.js?version=20161104103224"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskPrestElement_navigateButton.setViewcContext("pfRiskPrestElement_navigateButton");
pfRiskPrestElement_navigateButton.page_initEvents&&dojo.hitch(pfRiskPrestElement_navigateButton,pfRiskPrestElement_navigateButton.page_initEvents)();
pfRiskPrestElement_navigateButton.page_load&&dojo.hitch(pfRiskPrestElement_navigateButton,pfRiskPrestElement_navigateButton.page_load)();
pfRiskPrestElement.page_initEvents&&dojo.hitch(pfRiskPrestElement,pfRiskPrestElement.page_initEvents)();
				pfRiskPrestElement.page_load&&dojo.hitch(pfRiskPrestElement,pfRiskPrestElement.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskPrestElement" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='要素列表' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='addElement' label='新增要素' width='100px'></div>
                </div>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_element' binding="{store:'tObjSkelement_form',rpc:pfRiskPrestElement.grid_element_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar paging="{userPageSize:false}">
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_name' label='要素名称' name='name' width='45%'></cell>
                            <cell dataType='string' enable='false' id='cell_keyWord' label='关键字' name='keyWord' width='45%'></cell>
                            <cell enable='false' id='cell_control_element' label='操作' name='control_element' width='10%' formatter='pfRiskPrestElement.cell_control_element_formatter'></cell>
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
