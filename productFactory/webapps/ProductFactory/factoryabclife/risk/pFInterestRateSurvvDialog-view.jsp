
<%--
	生存金累计生息利率
    @author Neusoft
    @creationTime 2016-11-11 10:21:54
    @modificationTime 2017-03-09 09:57:58
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateSurvvDialog-processor.js?version=20170309095758"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pFInterestRateSurvvDialog-view.js?version=20170309095758"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pFInterestRateSurvvDialog.page_initEvents&&dojo.hitch(pFInterestRateSurvvDialog,pFInterestRateSurvvDialog.page_initEvents)();
				pFInterestRateSurvvDialog.page_load&&dojo.hitch(pFInterestRateSurvvDialog,pFInterestRateSurvvDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.form.Form' id='form2_2' binding="{store:'add_tSurvvBeneAccumIntbeIntra'}">
        <table id='form2_2_tableLayout' width='100%' style='table-layout:fixed;'>
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
                        <div dojoType='unieap.form.ComboBox' id='insurtypeCode' maxLength='8' required='true' width='100%' binding="{name:'insurtypeCode'}" decoder="{displayAttr:'insurtypeName',valueAttr:'insurtypeCode'}" popup="{height:'200px'}"></div>
                    </td>
                    <td align='right' id='startDate_label_td' rowSpan='1'>
                        <label id='startDate_label'>开始日期：</label>
                    </td>
                    <td colSpan='1' id='startDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='startDate' required='true' width='100%' binding="{name:'startDate'}"></div>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='form1_3_tr'>
                    <td align='right' id='endDate_label_td' rowSpan='1'>
                        <label id='endDate_label'>结束日期：</label>
                    </td>
                    <td colSpan='1' id='endDate_td' rowSpan='1'>
                        <div dojoType='unieap.form.DateTextBox' id='endDate' required='true' width='100%' binding="{name:'endDate'}"></div>
                    </td>
                    <td align='right' id='intrate_label_td' rowSpan='1'>
                        <label id='intrate_label'>利率：</label>
                    </td>
                    <td colSpan='1' id='intrate_td' rowSpan='1'>
                        <div dojoType='unieap.form.NumberTextBox' id='intrate' maxLength='12' required='true' width='100%' binding="{name:'intrate'}" range="{max:1,min:0}"></div>
                    </td>
                    <td>
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
            <col width='145px'></col>
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
                    <div dojoType='unieap.form.Button' class='myButton' id='form1_saveButton' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                </td>
            </tr>
        </tbody>
    </table>
</s:i18n>
    </security:auth>
	</body>
</html>
