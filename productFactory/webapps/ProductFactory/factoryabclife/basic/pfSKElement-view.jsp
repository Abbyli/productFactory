
<%--
	要素标准化
    @author think
    @creationTime 2016-05-17 10:57:55
    @modificationTime 2017-03-10 11:08:42
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/basic/pfSKElement-processor.js?version=20170310110842"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/basic/pfSKElement-view.js?version=20170310110842"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfSKElement.page_initEvents&&dojo.hitch(pfSKElement,pfSKElement.page_initEvents)();
				pfSKElement.page_load&&dojo.hitch(pfSKElement,pfSKElement.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane_element' title='要素定义' width='100%'>
        <div id='div2' type='buttons'>
            <div dojoType='unieap.form.Button' class='titlePane-button' id='button_add2' label='新 增' width='100px'></div>
        </div>
        <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'PfSKElementsDTO_x',rpc:pfSKElement.grid1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
            <toolbar paging="{userPageSize:false}">
            </toolbar>
            <header>
                <row>
                    <cell dataType='string' enable='false' id='cell_name' label='要素名称' name='name' width='18%'></cell>
                    <cell dataType='string' enable='false' id='cell_property' label='要素属性' name='property' width='18%'></cell>
                    <cell dataType='string' enable='false' id='cell_busiType' label='业务场景' name='busiType' width='18%' decoder="{store:'ds_busiType'}"></cell>
                    <cell dataType='string' enable='false' id='cell_isCalRef' label='是否与相关计算' name='isCalRef' width='18%' decoder="{store:'ds_isCalRef'}"></cell>
                    <cell dataType='string' enable='false' id='cell_editorType' label='编辑器类型' name='editorType' width='18%' decoder="{store:'ds_editorType'}"></cell>
                    <cell enable='false' id='cell_control' label='操作' name='control' width='10%' formatter='pfSKElement.cell_control_formatter'></cell>
                </row>
            </header>
        </div>
    </div>
    <div dojoType='unieap.xdialog.Dialog' height='390px' id='xdialog1' isExpand='false' title='要素定义' url='<%=path%>/ProductFactory/factoryabclife/basic_pfSKElementDialog_entry.action' width='600px'>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
