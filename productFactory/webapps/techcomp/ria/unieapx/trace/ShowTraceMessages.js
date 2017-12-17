
function init() {
	unieap.byId("parentCLAdaptive").notifyResize();
	var grid = unieap.byId("traceGrid"),
		manager = grid.getLayoutManager();
	if (userType == USER_ADMIN_TYPE) {
		manager.showCell([2]);
	}else{
		manager.hideCell([2]);
	}
	var queryObj = unieap.byId("traceQuery");
	queryObj.clear();
	queryObj.query();
}
dojo.addOnLoad(init);

// 翻页不做保存处理
function pageProcessor() {
	return false;
}

function descendTracePage(ds,callback) {
	var queryObj = unieap.byId("traceQuery");
	queryObj.descendPage(ds,callback);
}

function changeQueryHeight() {
	setTimeout(function() {
		unieap.byId("parentCLAdaptive").notifyResize();
	}, 0)
}

function cancel() {
	unieap.getDialog().close();
}

function customBuilderQueryCondition(queryStore) {
	// 判断是否为管理员类型
	if (userType != USER_ADMIN_TYPE) {
		var rowset = queryStore.getRowSet();
		rowset.addRow( {
			column : "creatorId",
			operation : "E",
			dataType : 12,
			value : userAccount
		});
	}
}

function deleteTraceMessages() {
	var selectRows = unieap.byId("traceGrid")
			.getManager("SelectionManager").getSelectedRowIndexs();
	var rowIndex = selectRows[0];
	if (rowIndex == undefined || rowIndex < 0) {
		MessageBox.alert( {
			title : RIA_UNIEAPX_I18N.trace.infoTitle,
			message : RIA_UNIEAPX_I18N.trace.unselectedInfo
		});
		return;
	}
	var ids = [];
	var row;
	for ( var i = 0; i < selectRows.length; i++) {
		row = unieap.byId("traceGrid").getBinding()
				.getRow(selectRows[i]);
		ids.push(row.id);
	}
	MessageBox.confirm( {
		title : RIA_UNIEAPX_I18N.trace.unselectedInfo.confirmTitle,
		message : RIA_UNIEAPX_I18N.trace.confirmMessage,
		onComplete : function(value) {
			if (!value) {
				return;
			}
			unieap.Action.requestData( {
				url : ROOT_PATH
						+ "/traceMessageProcessor!deleteTraceMessages.action",
				parameters : {
					ids : ids.join(",")
				},
				sync : true,
				load : function(dc) {
					unieap.byId("traceGrid").getBinding().deleteRows(
							selectRows);
				}
			});
		}
	});
}

function getStackInfoByTraceId() {
	var selectRows = unieap.byId("traceGrid")
		.getManager("SelectionManager").getSelectedRowIndexs();
	var rowIndex = selectRows[0];
	if (selectRows.length != 1) {
	MessageBox.alert( 
		{
			title : RIA_UNIEAPX_I18N.trace.infoTitle,
			message : RIA_UNIEAPX_I18N.trace.lookMessage
		});
	return;
	}
	var row = unieap.byId("traceGrid").getBinding()
			.getRow(selectRows[0]);
	unieap.Action.requestData( {
		url : ROOT_PATH
				+ "/traceMessageProcessor!getStackInfoByTraceId.action",
		parameters : {
			id : row.id
		},
		sync : true,
		load : function(dc) {
			showStackInof(dc);
		}
	});
	
}

function showStackInof(dc){
	DialogUtil.showDialog({
		title : RIA_UNIEAPX_I18N.trace.stackTitle,
		dialogData : dc,
		width:"600",
		height:"395",
		url : unieap.WEB_APP_NAME+"/techcomp/ria/unieapx/trace/ShowStackMessage.jsp"
	});
}
