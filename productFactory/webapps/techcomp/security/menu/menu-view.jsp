
<%--
	
    @author hanyongxu
    @creationTime 2014-08-12 11:12:12
    @modificationTime 2015-09-16 16:37:56
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/techcomp/security/menu/menu-processor.js?version=20150916163756"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/techcomp/security/menu/menu-view.js?version=20150916163756"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				menu.page_initEvents&&dojo.hitch(menu,menu.page_initEvents)();
				menu.page_load&&dojo.hitch(menu,menu.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="techcomp.security.package">
    <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout1' showTitleBar='false'>
        <div dojoType='unieap.layout.BorderPane' id='borderPane0' region='left' showTitleBar='false' splitLine='false' width='25%'>
            <div dojoType='unieap.layout.BorderContainer' design='headline' id='borderLayout2' showTitleBar='false'>
                <div dojoType='unieap.layout.BorderPane' height='40px' id='borderPane2' region='top' showTitleBar='false' splitLine='false'>
                    <table id='tableLayout1'>
                        <colgroup>
                            <col width='50px'></col>
                            <col width='50px'></col>
                            <col width='50px'></col>
                            <col width='50px'></col>
                        </colgroup>
                        <tbody>
                            <tr height='30px'>
                                <td>
                                    <div dojoType='unieap.form.Button' height='30px' id='btnadd' label='新增' width='48px'></div>
                                </td>
                                <td>
                                    <div dojoType='unieap.form.Button' height='30px' id='btnDel' label='删除' width='49px'></div>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div dojoType='unieap.layout.BorderPane' id='borderPane3' region='center' showTitleBar='false' splitLine='false'>
                    <div dojoType='unieap.tree.Tree' id='menuTree' binding="{id:'id',label:'name',parent:'parentId',query:{name:'parentId',relation:'=',value:null},store:'sysSecMenu'}"></div>
                </div>
            </div>
        </div>
        <div dojoType='unieap.layout.BorderPane' id='borderPane1' region='center' showTitleBar='false' splitLine='false'>
            <div dojoType='unieap.form.Button' height='39px' id='button1' label='菜单管理' width='100%'></div>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'sysSecMenu'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='13%'></col>
                        <col width='35%'></col>
                        <col width='5%'></col>
                        <col width='17%'></col>
                        <col width='13%'></col>
                        <col width='20%'></col>
                    </colgroup>
                    <tbody>
                        <tr height='40px' id='form1_0_tr'>
                            <td align='right' id='name_label_td' rowSpan='1'>
                                <label id='name_label'>菜单名称：</label>
                            </td>
                            <td colSpan='1' id='name_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='name' required='true' width='100%' binding="{name:'name'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_1_tr'>
                            <td align='right' id='target_label_td' rowSpan='1'>
                                <label id='target_label'>目标区域：</label>
                            </td>
                            <td colSpan='1' id='target_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='target' width='100%' binding="{name:'target'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_2_tr'>
                            <td align='right' id='url_label_td' rowSpan='1'>
                                <label id='url_label'>URL地址：</label>
                            </td>
                            <td colSpan='1' id='url_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='url' width='100%' binding="{name:'url'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_3_tr'>
                            <td align='right' id='image_label_td' rowSpan='1'>
                                <label id='image_label'>图片路径：</label>
                            </td>
                            <td colSpan='1' id='image_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='image' width='100%' binding="{name:'image'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_4_tr'>
                            <td align='right' id='orderNum_label_td' rowSpan='1'>
                                <label id='orderNum_label'>菜单序号：</label>
                            </td>
                            <td colSpan='1' id='orderNum_td' rowSpan='1'>
                                <div dojoType='unieap.form.NumberTextBox' id='orderNum' width='100%' binding="{name:'orderNum'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_5_tr'>
                            <td align='right' id='isDefault_label_td' rowSpan='1'>
                                <label id='isDefault_label'>是否显示：</label>
                            </td>
                            <td colSpan='1' id='isDefault_td' rowSpan='1'>
                                <div dojoType='unieap.form.ComboBox' id='isDefault' required='true' width='100%' binding="{name:'isDefault'}" dataProvider="{store:'isDefaultDS'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_6_tr'>
                            <td align='right' id='title_label_td' rowSpan='1'>
                                <label id='title_label'>标题：</label>
                            </td>
                            <td colSpan='1' id='title_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='title' width='100%' binding="{name:'title'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='40px' id='form1_8_tr'>
                            <td align='right' id='businessId_label_td' rowSpan='1'>
                                <label id='businessId_label'>业务ID：</label>
                            </td>
                            <td colSpan='1' id='businessId_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='businessId' width='100%' binding="{name:'businessId'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                        <tr height='59px' id='form1_7_tr'>
                            <td align='right' id='description_label_td' rowSpan='1'>
                                <label id='description_label'>描述信息：</label>
                            </td>
                            <td colSpan='2' id='description_td' rowSpan='1'>
                                <div dojoType='unieap.form.Textarea' id='description' maxLength='256' width='100%' binding="{name:'description'}"></div>
                            </td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div dojoType='unieap.form.InlineEditBox' disabled='true' height='5px' id='inlineEditBox1' width='98%' style='margin-left :1%;margin-right:1%;'></div>
            <table id='form1_ToolBarInfo' width='100%' style='table-layout:fixed;'>
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col width='97px'></col>
                    <col width='97px'></col>
                </colgroup>
                <tbody>
                    <tr height='40px'>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='form1_saveButton' label='保存' width='90px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' height='25px' id='form1_resetButton' label='重置' width='90px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</s:i18n>
    </security:auth>
	</body>
</html>
