
<%--
	个险险种定义 基本信息
    @author think
    @creationTime 2016-06-23 14:08:01
    @modificationTime 2017-02-16 14:38:14
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskBaseInfo-processor.js?version=20170216143814"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskBaseInfo-view.js?version=20170216143814"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskBaseInfo_navigateButton.setViewcContext("pfRiskBaseInfo_navigateButton");
pfRiskBaseInfo_navigateButton.page_initEvents&&dojo.hitch(pfRiskBaseInfo_navigateButton,pfRiskBaseInfo_navigateButton.page_initEvents)();
pfRiskBaseInfo_navigateButton.page_load&&dojo.hitch(pfRiskBaseInfo_navigateButton,pfRiskBaseInfo_navigateButton.page_load)();
pfRiskBaseInfo.page_initEvents&&dojo.hitch(pfRiskBaseInfo,pfRiskBaseInfo.page_initEvents)();
				pfRiskBaseInfo.page_load&&dojo.hitch(pfRiskBaseInfo,pfRiskBaseInfo.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false'>
            <jsp:include page='/ProductFactory/factoryabclife/risk/navigateButton-view.jsp'>
                <jsp:param name="viewcContext" value="pfRiskBaseInfo" /></jsp:include>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.layout.TitlePane' flexible='false' height='100%' id='titlePane1' title='险种基本信息' width='100%'>
                <div id='div1' type='buttons'>
                    <div dojoType='unieap.form.Button' class='titlePane-button' id='btnAddBase' label='保 存' width='100px'></div>
                </div>
                <div dojoType='unieap.form.Form' id='form_riskBase' binding="{store:'tInsurtypeBasicInf_form_base'}">
                    <table id='form_riskBase_tableLayout' width='100%' style='table-layout:fixed;'>
                        <colgroup>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='15%'></col>
                            <col width='30%'></col>
                            <col width='10%'></col>
                        </colgroup>
                        <tbody>
                            <tr id='form_riskBase_1_tr'>
                                <td align='right' id='insurtypeCode__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeCode__riskBase_label'>险种编码：</label>
                                </td>
                                <td colSpan='1' id='insurtypeCode__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeCode__riskBase' maxLength='6' readOnly='true' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                                </td>
                                <td align='right' id='verNo__riskBase_label_td' rowSpan='1'>
                                    <label id='verNo__riskBase_label'>险种版本：</label>
                                </td>
                                <td colSpan='1' id='verNo__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.NumberTextBox' id='verNo__riskBase' maxLength='16' readOnly='true' required='true' width='100%' binding="{name:'verNo'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_3_tr'>
                                <td align='right' id='insurtypeName__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeName__riskBase_label'>险种名称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeName__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeName__riskBase' maxLength='120' readOnly='true' required='true' width='100%' binding="{name:'insurtypeName'}"></div>
                                </td>
                                <td align='right' id='insurtypeAbbr__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeAbbr__riskBase_label'>险种简称：</label>
                                </td>
                                <td colSpan='1' id='insurtypeAbbr__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.TextBox' id='insurtypeAbbr__riskBase' maxLength='90' readOnly='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_5_tr'>
                                <td align='right' id='mainCovRiderFlg__riskBase_label_td' rowSpan='1'>
                                    <label id='mainCovRiderFlg__riskBase_label'>主附险标识：</label>
                                </td>
                                <td colSpan='1' id='mainCovRiderFlg__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='mainCovRiderFlg__riskBase' maxLength='2' required='true' width='100%' binding="{name:'mainCovRiderFlg'}" dataProvider="{store:'ds_mainsub'}" popup="{height:'150px'}"></div>
                                </td>
                                <td align='right' id='designType__riskBase_label_td' rowSpan='1'>
                                    <label id='designType__riskBase_label'>设计类型：</label>
                                </td>
                                <td colSpan='1' id='designType__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='designType__riskBase' maxLength='2' required='true' width='100%' binding="{name:'designType'}" dataProvider="{store:'ds_designType'}" popup="{height:'150px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_7_tr'>
                                <td align='right' id='insurtypeLevel1Cat__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel1Cat__riskBase_label'>险种一级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel1Cat__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='insurtypeLevel1Cat__riskBase' required='true' width='100%' binding="{name:'insurtypeLevel1Cat'}" dataProvider="{store:'ds_level01'}" popup="{height:'auto'}"></div>
                                </td>
                                <td align='right' id='insurtypeLevel2Cat__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel2Cat__riskBase_label'>险种二级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel2Cat__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='insurtypeLevel2Cat__riskBase' width='100%' binding="{name:'insurtypeLevel2Cat'}" cascade="{filterAttr:'P',filterNull:'none',primary:'insurtypeLevel1Cat__riskBase'}" dataProvider="{store:'ds_level02'}" popup="{height:'auto'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_9_tr'>
                                <td align='right' id='insurtypeLevel3Cat__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel3Cat__riskBase_label'>险种三级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel3Cat__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='insurtypeLevel3Cat__riskBase' width='100%' binding="{name:'insurtypeLevel3Cat'}" cascade="{filterAttr:'P',filterNull:'none',primary:'insurtypeLevel2Cat__riskBase'}" dataProvider="{store:'ds_level03'}" popup="{height:'auto'}"></div>
                                </td>
                                <td align='right' id='insurtypeLevel4Cat__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeLevel4Cat__riskBase_label'>险种四级分类：</label>
                                </td>
                                <td colSpan='1' id='insurtypeLevel4Cat__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='insurtypeLevel4Cat__riskBase' width='100%' binding="{name:'insurtypeLevel4Cat'}" cascade="{filterAttr:'P',filterNull:'none',primary:'insurtypeLevel3Cat__riskBase'}" dataProvider="{store:'ds_level04'}" popup="{height:'300px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_11_tr'>
                                <td align='right' id='termType__riskBase_label_td' rowSpan='1'>
                                    <label id='termType__riskBase_label'>期限类型：</label>
                                </td>
                                <td colSpan='1' id='termType__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='termType__riskBase' maxLength='2' required='true' width='100%' binding="{name:'termType'}" dataProvider="{store:'ds_term'}" popup="{height:'150px'}"></div>
                                </td>
                                <td align='right' id='isAccType__riskBase_label_td' rowSpan='1'>
                                    <label id='isAccType__riskBase_label'>是否账户类型：</label>
                                </td>
                                <td colSpan='1' id='isAccType__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='isAccType__riskBase' maxLength='2' required='true' width='100%' binding="{name:'isAccType'}" dataProvider="{store:'ds_yesNo'}" popup="{height:'150px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_13_tr'>
                                <td align='right' id='isAnnuityType__riskBase_label_td' rowSpan='1'>
                                    <label id='isAnnuityType__riskBase_label'>是否年金型：</label>
                                </td>
                                <td colSpan='1' id='isAnnuityType__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='isAnnuityType__riskBase' maxLength='2' required='true' width='100%' binding="{name:'isAnnuityType'}" dataProvider="{store:'ds_yesNo'}" popup="{height:'150px'}"></div>
                                </td>
                                <td align='right' id='isWaive__riskBase_label_td' rowSpan='1'>
                                    <label id='isWaive__riskBase_label'>是否豁免：</label>
                                </td>
                                <td colSpan='1' id='isWaive__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.ComboBox' id='isWaive__riskBase' required='true' width='100%' binding="{name:'isWaive'}" dataProvider="{store:'ds_yesNo'}" popup="{height:'300px'}"></div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr id='form_riskBase_14_tr'>
                                <td align='right' id='insurtypeDesc__riskBase_label_td' rowSpan='1'>
                                    <label id='insurtypeDesc__riskBase_label'>险种描述：</label>
                                </td>
                                <td colSpan='3' id='insurtypeDesc__riskBase_td' rowSpan='1'>
                                    <div dojoType='unieap.form.Textarea' height='100px' id='insurtypeDesc__riskBase' maxLength='500' width='100%' binding="{name:'insurtypeDesc'}"></div>
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
