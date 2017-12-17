
<%--
	
    @author Administrator
    @creationTime 2016-08-24 10:48:22
    @modificationTime 2017-01-18 10:36:21
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
	   	 
	    <link href="<%=path%>/ProductFactory/factoryabclife/navigateButton/btn.css" rel="stylesheet" type="text/css" />
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimitDialog-processor.js?version=20170118103621"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskLiabLimitDialog-view.js?version=20170118103621"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskLiabLimitDialog.page_initEvents&&dojo.hitch(pfRiskLiabLimitDialog,pfRiskLiabLimitDialog.page_initEvents)();
				pfRiskLiabLimitDialog.page_load&&dojo.hitch(pfRiskLiabLimitDialog,pfRiskLiabLimitDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form1'>
        <table id='tableLayout1' width='100%'>
            <colgroup>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='18%'></col>
                <col width='30%'></col>
                <col width='4%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td align='right'>
                        <label id='label1'>相关保障责任编码：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='protecLiabCode' required='true' width='100%' decoder="{displayAttr:'protecLiabCode',valueAttr:'protecLiabName'}" popup="{displayStyle:'multi'}"></div>
                    </td>
                    <td align='right'>
                        <label id='label2'>相关保障责任名称：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.TextBox' id='protecLiabName' readOnly='true' width='100%'></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr height='25px'>
                    <td align='right'>
                        <label id='label3'>适用期间：</label>
                    </td>
                    <td>
                        <div dojoType='unieap.form.ComboBox' id='comboBox1' width='100%' binding="{name:'limitTimeType'}" dataProvider="{store:'ds_limit_time2'}"></div>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class='toolbar-table' id='tableLayout2' width='100%'>
            <colgroup>
                <col width='100%'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td align='right'>
                        <div dojoType='unieap.form.Button' class='myButton' id='save' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
