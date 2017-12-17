
<%--
	
    @author Administrator
    @creationTime 2016-10-10 10:56:32
    @modificationTime 2016-10-11 15:48:48
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskInfDetail-processor.js?version=20161011154848"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/riskInformation/pfRiskInfDetail-view.js?version=20161011154848"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskInfDetail_navigateButton.setViewcContext("pfRiskInfDetail_navigateButton");
pfRiskInfDetail_navigateButton.page_initEvents&&dojo.hitch(pfRiskInfDetail_navigateButton,pfRiskInfDetail_navigateButton.page_initEvents)();
pfRiskInfDetail_navigateButton.page_load&&dojo.hitch(pfRiskInfDetail_navigateButton,pfRiskInfDetail_navigateButton.page_load)();
pfRiskInfDetail.page_initEvents&&dojo.hitch(pfRiskInfDetail,pfRiskInfDetail.page_initEvents)();
				pfRiskInfDetail.page_load&&dojo.hitch(pfRiskInfDetail,pfRiskInfDetail.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/riskInformation/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskInfDetail" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='险种基本信息' width='100%'>
                <div dojoType='unieap.form.Form' id='form1' binding="{store:'tInsurtypeBasicInf_check_form'}">
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
                                    <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeCode' maxLength='6' readOnly='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                </td>
                                <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                                    <label id='insurtypeName_label'>险种名称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeName' maxLength='120' readOnly='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_3_tr'>
                                <td align='right' id='verNo_label_td' rowSpan='1'>
                                    <label id='verNo_label'>险种版本：</label>
                                </td>
                                <td colSpan='1' id='verNo_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' disabled='true' id='verNo' maxLength='16' readOnly='true' width='100%' binding="{name:'verNo'}"></div>
                                </td>
                                <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                                    <label id='insurtypeAbbr_label'>险种简称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' disabled='true' id='insurtypeAbbr' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_5_tr'>
                                <td align='right' id='insurtypeLevel1Cat_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel1Cat_label'>险种一级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel1Cat_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='insurtypeLevel1Cat' maxLength='2' readOnly='true' width='100%' binding="{name:'insurtypeLevel1Cat'}" dataProvider="{store:'ds_level01'}" popup="{height:'300px'}"></div>
                                </td>
                                <td align='right' id='insurtypeLevel2Cat_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel2Cat_label'>险种二级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel2Cat_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='insurtypeLevel2Cat' maxLength='2' readOnly='true' width='100%' binding="{name:'insurtypeLevel2Cat'}" dataProvider="{store:'ds_level02'}" popup="{height:'300px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_7_tr'>
                                <td align='right' id='insurtypeLevel3Cat_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel3Cat_label'>险种三级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel3Cat_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='insurtypeLevel3Cat' maxLength='2' readOnly='true' width='100%' binding="{name:'insurtypeLevel3Cat'}" dataProvider="{store:'ds_level03'}" popup="{height:'300px'}"></div>
                                </td>
                                <td align='right' id='insurtypeLevel4Cat_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel4Cat_label'>险种四级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel4Cat_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='insurtypeLevel4Cat' maxLength='2' readOnly='true' width='100%' binding="{name:'insurtypeLevel4Cat'}" dataProvider="{store:'ds_level04'}" popup="{height:'300px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_9_tr'>
                                <td align='right' id='isAccType_label_td' rowSpan='1'>
                                    <label id='isAccType_label'>是否账户类型：</label>
                                </td>
                                <td colSpan='1' id='isAccType_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='isAccType' maxLength='2' readOnly='true' width='100%' binding="{name:'isAccType'}" dataProvider="{store:'ds_yesNo'}" popup="{height:'auto'}"></div>
                                </td>
                                <td align='right' id='mainCovRiderFlg_label_td' rowSpan='1'>
                                    <label id='mainCovRiderFlg_label'>主附险标识：</label>
                                </td>
                                <td colSpan='1' id='mainCovRiderFlg_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' disabled='true' id='mainCovRiderFlg' maxLength='2' readOnly='true' width='100%' binding="{name:'mainCovRiderFlg'}" dataProvider="{store:'ds_mainsub'}" popup="{height:'auto'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form1_10_tr'>
                                <td align='right' id='insurtypeDesc_label_td' rowSpan='1'>
                                    <label id='insurtypeDesc_label'>险种描述：</label>
                                </td>
                                <td colSpan='3' id='insurtypeDesc_td' rowSpan='1'>
                                    <div dojoType='unieap.form.Textarea' disabled='true' id='insurtypeDesc' maxLength='500' readOnly='true' width='100%' binding="{name:'insurtypeDesc'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
