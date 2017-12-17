
<%--
	
    @author think
    @creationTime 2016-07-12 14:52:29
    @modificationTime 2017-03-10 11:04:02
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRelation-processor.js?version=20170310110402"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfRelation-view.js?version=20170310110402"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRelation.page_initEvents&&dojo.hitch(pfRelation,pfRelation.page_initEvents)();
				pfRelation.page_load&&dojo.hitch(pfRelation,pfRelation.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.xdialog.Dialog' height='182px' id='add_relationDef' title='相关性定义新增' url='<%=path%>/ProductFactory/factoryabclife/basic_pfRelationDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='182px' id='update_relation' title='相关性定义修改' url='<%=path%>/ProductFactory/factoryabclife/basic_pfRelationDialog_entry.action' width='680px'>
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='相关性定义' width='100%'>
        <div id='div1' type='buttons'>
            <div dojoType='unieap.form.Button' class='titlePane-button' id='button_relation' label='新&nbsp增' width='100px'></div>
        </div>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid_relation' binding="{store:'tRelationDef_grid',onAfterSave:pfRelation.grid_relation_binding_onAfterSave,rpc:pfRelation.grid_relation_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <toolbar paging="{userPageSize:false}">
            </toolbar>
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_name__relation' label='相关性名称' name='name' width='15%'></cell>
                    <cell dataType='string' enable='false' id='cell_property__relation' label='相关性属性' name='property' width='15%'></cell>
                    <cell dataType='string' enable='false' id='cell_relationType__relation' label='相关性类型' name='relationType' width='15%' decoder="{store:'ds_relationType'}"></cell>
                    <cell dataType='string' enable='false' id='cell_returnType__relation' label='返回类型' name='returnType' width='15%' decoder="{store:'ds_returnType'}"></cell>
                    <cell dataType='string' enable='false' id='cell_refValue__relation' label='引用值' name='refValue' width='15%'></cell>
                    <cell dataType='string' enable='false' id='cell_busiType__relation' label='业务分类' name='busiType' width='15%'></cell>
                    <cell enable='false' id='cell_name1__relation' label='操作' name='name1' width='10%' formatter='pfRelation.cell_name1__relation_formatter'></cell>
                </row>
            </header>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
