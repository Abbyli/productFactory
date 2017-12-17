
<%--
	
    @author dongzl
    @creationTime 2017-04-05 14:19:53
    @modificationTime 2017-04-06 09:14:46
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
	   	 
		<script type="text/javascript" scope="processor" src="<%=path%>/dzltest/clmtest/tTxDef-processor.js?version=20170406091446"></script>
		
		<script type="text/javascript" scope="view" src="<%=path%>/dzltest/clmtest/tTxDef-view.js?version=20170406091446"></script>
		
		<script type="text/javascript">
			if(!window["dataCenter"]){
		 		dataCenter = new unieap.ds.DataCenter();
	 		}
	 		
	 		dojo.addOnLoad(function(){
	 		    var interval = new Date().getTime()- beginTime;			    
			    console.log("interval: " + interval  + "ms");
	 		    dataCenter.setParameter("_control_interval", interval + "ms");
				tTxDef.page_initEvents&&dojo.hitch(tTxDef,tTxDef.page_initEvents)();
				tTxDef.page_load&&dojo.hitch(tTxDef,tTxDef.page_load)();
				
			});
			
		</script>
		
	<unieap:render-dc />
	
	</head>
	<body class="unieap">
	<security:auth><s:i18n name="dzltest.clmtest.package">
    <div dojoType='unieap.layout.AdaptiveContainer' id='adaptiveContainer1'>
        <div dojoType='unieap.layout.AdaptivePane' autoHeight='true' id='pane1' width='auto'>
            <div dojoType='unieap.layout.TitlePane' title='查询条件'>
            </div>
            <div dojoType='unieap.form.Form' id='form1' binding="{store:'tTxDef'}">
                <table id='form1_tableLayout' width='100%' style='table-layout:fixed;'>
                    <colgroup>
                        <col width='13%'></col>
                        <col width='20%'></col>
                        <col width='13%'></col>
                        <col width='20%'></col>
                        <col width='13%'></col>
                        <col width='20%'></col>
                    </colgroup>
                    <tbody>
                        <tr id='form1_1_tr'>
                            <td id='txCode_label_td' rowSpan='1'>
                                <label id='txCode_label'>交易编码</label>
                            </td>
                            <td colSpan='1' id='txCode_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='txCode' maxLength='30' width='100%' binding="{name:'txCode'}"></div>
                            </td>
                            <td id='txName_label_td' rowSpan='1'>
                                <label id='txName_label'>交易名称</label>
                            </td>
                            <td colSpan='1' id='txName_td' rowSpan='1'>
                                <div dojoType='unieap.form.TextBox' id='txName' maxLength='120' width='100%' binding="{name:'txName'}"></div>
                            </td>
                            <td>
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
                    <col></col>
                    <col></col>
                    <col width='145px'></col>
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
                        </td>
                        <td>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' id='form1_saveButton' label='查询' width='140px'></div>
                        </td>
                        <td>
                            <div dojoType='unieap.form.Button' id='form1_resetButton' label='重置' width='140px'></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div dojoType='unieap.layout.TitlePane' height='100%' id='title1' title='查询结果'>
                <div dojoType='unieap.xgrid.Grid' height='100%' id='grid1' binding="{store:'tTxDef',rpc:tTxDef.grid1_binding_rpc}" selection="{selectType:'none'}" views="{rowBar:false,rowNumber:true}">
                    <toolbar>
                    </toolbar>
                    <header>
                        <row>
                            <cell dataType='string' enable='false' id='cell_txCode' label='交易编码' name='txCode' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_txName' label='交易名称' name='txName' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_interCode' label='内部编码' name='interCode' width='100px' decoder="{store:'INTER_CODE'}"></cell>
                            <cell dataType='number' enable='false' id='cell_gatewayId' label='冗余列' name='gatewayId' width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_channelId' label='渠道ID' name='channelId' width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_senderId' label='发送器ID' name='senderId' width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_maxConcurrTxs' label='最大并发交易数' name='maxConcurrTxs' width='100px'></cell>
                            <cell dataType='number' enable='false' id='cell_maxTxs' label='最大交易数' name='maxTxs' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_runStatus' label='运行状态' name='runStatus' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_txDesc' label='交易描述' name='txDesc' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_insertOper' label='插入操作员' name='insertOper' width='100px' decoder="{store:'INSERT_OPER'}"></cell>
                            <cell dataType='date' enable='false' id='cell_insertTime' label='插入时间' name='insertTime' width='100px' decoder="{store:'INSERT_TIME'}"></cell>
                            <cell dataType='string' enable='false' id='cell_updateOper' label='更新操作员' name='updateOper' width='100px'></cell>
                            <cell dataType='date' enable='false' id='cell_updateTime' label='更新时间' name='updateTime' width='100px'></cell>
                            <cell dataType='string' enable='false' id='cell_bizStatus' label='业务状态' name='bizStatus' width='100px'></cell>
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
