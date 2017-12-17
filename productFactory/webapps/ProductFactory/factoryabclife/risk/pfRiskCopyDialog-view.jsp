
<%--
	
    @author Administrator
    @creationTime 2016-08-04 10:36:18
    @modificationTime 2016-10-14 15:37:23
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
	    		
		<script type="text/javascript" scope="processor" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskCopyDialog-processor.js?version=20161014153723"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/ProductFactory/factoryabclife/risk/pfRiskCopyDialog-view.js?version=20161014153723"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				pfRiskCopyDialog.page_initEvents&&dojo.hitch(pfRiskCopyDialog,pfRiskCopyDialog.page_initEvents)();
				pfRiskCopyDialog.page_load&&dojo.hitch(pfRiskCopyDialog,pfRiskCopyDialog.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="productfactory.factoryabclife.package">
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane1' title='新建险种' width='100%'>
        <div dojoType='unieap.form.Form' id='form1' binding="{store:'tInsurtypeBasicInf_copyForm1'}">
            <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='4%'></col>
                </colgroup>
                <tbody>
                    <tr id='form1_1_tr'>
                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                            <label id='insurtypeCode_label'>险种编码：</label>
                        </td>
                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeCode' maxLength='6' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                        </td>
                        <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                            <label id='insurtypeName_label'>险种名称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeName' maxLength='120' required='true' width='100%' binding="{name:'insurtypeName'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_3_tr'>
                        <td align='right' id='verNo_label_td' rowSpan='1'>
                            <label id='verNo_label'>险种版本：</label>
                        </td>
                        <td colSpan='1' id='verNo_td' rowSpan='1'>
                            <div dojoType='unieap.form.NumberTextBox' disabled='true' id='verNo' maxLength='16' required='true' width='100%' binding="{name:'verNo'}"></div>
                        </td>
                        <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                            <label id='insurtypeAbbr_label'>险种简称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr' maxLength='90' required='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_5_tr'>
                        <td align='right' id='insurtypeEngName_label_td' rowSpan='1'>
                            <label id='insurtypeEngName_label'>险种英文名称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeEngName_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeEngName' maxLength='120' width='100%' binding="{name:'insurtypeEngName'}"></div>
                        </td>
                        <td align='right' id='insurtypeEngAbbr_label_td' rowSpan='1'>
                            <label id='insurtypeEngAbbr_label'>险种英文简称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeEngAbbr_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeEngAbbr' maxLength='90' width='100%' binding="{name:'insurtypeEngAbbr'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form1_6_tr'>
                        <td align='right' id='insurtypeDesc_label_td' rowSpan='1'>
                            <label id='insurtypeDesc_label'>险种描述：</label>
                        </td>
                        <td colSpan='3' id='insurtypeDesc_td' rowSpan='1'>
                            <div dojoType='unieap.form.Textarea' id='insurtypeDesc' maxLength='500' width='100%' binding="{name:'insurtypeDesc'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div dojoType='unieap.layout.TitlePane' flexible='false' id='titlePane2' title='已定义的险种' width='100%'>
        <div dojoType='unieap.form.Form' id='form2' binding="{store:'tInsurtypeBasicInf_copyform2'}">
            <table id='form2_tableLayout' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='18%'></col>
                    <col width='30%'></col>
                    <col width='4%'></col>
                </colgroup>
                <tbody>
                    <tr id='form2_1_tr'>
                        <td align='right' id='insurtypeCode_label_td' rowSpan='1'>
                            <label id='insurtypeCode_label2'>险种编码：</label>
                        </td>
                        <td colSpan='1' id='insurtypeCode_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeCode2' maxLength='6' required='true' width='100%' binding="{name:'insurtypeCode'}"></div>
                        </td>
                        <td align='right' id='insurtypeName_label_td' rowSpan='1'>
                            <label id='insurtypeName_label2'>险种名称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeName_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeName2' maxLength='120' readOnly='true' required='true' width='100%' binding="{name:'insurtypeName'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr id='form2_3_tr'>
                        <td align='right' id='verNo_label_td' rowSpan='1'>
                            <label id='verNo_label2'>险种版本：</label>
                        </td>
                        <td colSpan='1' id='verNo_td' rowSpan='1'>
                            <div dojoType='unieap.form.ComboBox' id='verNo2' maxLength='16' required='true' width='100%' binding="{name:'verNo'}" decoder="{displayAttr:'verNo',valueAttr:'verNo'}"></div>
                        </td>
                        <td align='right' id='insurtypeAbbr_label_td' rowSpan='1'>
                            <label id='insurtypeAbbr_label2'>险种简称：</label>
                        </td>
                        <td colSpan='1' id='insurtypeAbbr_td' rowSpan='1'>
                            <div dojoType='unieap.form.TextBox' id='insurtypeAbbr2' maxLength='90' readOnly='true' required='true' width='100%' binding="{name:'insurtypeAbbr'}"></div>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table class='toolbar-table' id='tableLayout1' width='100%'>
            <colgroup>
                <col width='600px'></col>
            </colgroup>
            <tbody>
                <tr height='25px'>
                    <td align='right'>
                        <div dojoType='unieap.form.Button' class='myButton' id='button1' label='保&nbsp存' width='100px' style='border-left:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE;border-right:1px solid #BEBEBE;border-top:1px solid #BEBEBE;'></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
