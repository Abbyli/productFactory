/**
 *
 * @author lugj
 * @creationTime 2014-03-14 09:37:36
 * @modificationTime 2015-01-13 16:09:54
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("gridExport", function () {

    var exportData = null;

    var dialogState = false;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_ria.gridExport.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                dialogResize: dialogResize,
                getConfigFromSQL: getConfigFromSQL,
                advanceConfig_onChange: advanceConfig_onChange,
                saveConfig_onClick: saveConfig_onClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                exportData: exportData,
                dialogState: dialogState
            });

            this.processor = new _ria.gridExport.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("advanceConfig"), "onChange", this.advanceConfig_onChange);

            this.connect(unieap.byId("saveConfig"), "onClick", this.saveConfig_onClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var dialog = unieap.getXDialog();
            if (dialog) {
                exportData = dialog.getObject();
            }
            unieap.byId("exportType").setValue("excel");
        },
        page_init: function () {
            var store = new unieap.ds.DataStore([{
                CODEVALUE: 'csv',
                CODENAME: "CSV文件（*.csv）"
            }, {
                CODEVALUE: 'excel',
                CODENAME: "Excel文件（*.xls）"
            }]);

            dataCenter.addDataStore("exportType", store);

        }

    });
    /**
     * @description:
     *
     * @param: {参数类型} checked 参数描述
     * @return:
     *
     */

    function dialogResize(checked) {
        var dialog = unieap.getXDialog();
        var viewport = dijit.getViewport();
        var dialogInitX;
        var dialogInitY;
        if (checked) {
            dialog.setHeight(360);
            dialog.setWidth(563);
            dialogInitX = Math.floor(viewport.l + (viewport.w - dialog.width) / 2) > 0 ? Math.floor(viewport.l + (viewport.w - dialog.width) / 2) : "0";
            dialogInitY = Math.floor(viewport.t + (viewport.h - dialog.height) / 2) > 0 ? Math.floor(viewport.t + (viewport.h - dialog.height) / 2) : "0";
            dojo.style(dialog.mainNode, {
                left: dialogInitX + "px",
                top: dialogInitY + "px"
            });
            dojo.style(getElementById("advancedConfigDiv"), {
                display: "inline"
            });
            unieap.byId("saveConfig").setDisabled(false);
            dialogState = true;
        }
        else {
            dialog.setHeight(180);
            dialog.setWidth(563);
            dialogInitX = Math.floor(viewport.l + (viewport.w - dialog.width) / 2) > 0 ? Math.floor(viewport.l + (viewport.w - dialog.width) / 2) : "0";
            dialogInitY = Math.floor(viewport.t + (viewport.h - dialog.height) / 2) > 0 ? Math.floor(viewport.t + (viewport.h - dialog.height) / 2) : "0";
            dojo.style(dialog.mainNode, {
                left: dialogInitX + "px",
                top: dialogInitY + "px"
            });
            dojo.style(getElementById("advancedConfigDiv"), {
                display: "none"
            });
            unieap.byId("saveConfig").setDisabled(true);
            dialogState = false;
        }
    }

    function getConfigFromSQL() {
        var cmpPath = unieap.cmpPath;
        var userAccount = unieap.userAccount;
        var cmpID = unieap.getXDialog().getObject()._this.grid.id;
        var url = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
        //lianggh注释，目的是不需要将配置信息保存到数据库，然后在这里根据保存的配置直接查询。
        //var dc=new unieap.ds.DataCenter();
        //dc.setParameter("_boId", "ria_gridExportBO_bo");
        //dc.setParameter("_methodName", "getExportConfig");
        //dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String,java.lang.String");
        //dc.setParameter("cmpPath", cmpPath);
        //dc.setParameter("userAccount", userAccount);
        //dc.setParameter("cmpID", cmpID);
        //dc.setParameter("_parameters", "cmpPath,userAccount,cmpID");
        //dc.setParameter("_parameterTypes", "string,string,string");
        //unieap.Action.requestData({
        //	url:url,
        //	sync:false,
        //	load:function(dc){
        //	    var result = dc.getParameter("result");
        //	    if(result!=""){
        //	    	var exportGrid = unieap.byId("exportOptions");
        //			var exportOptionsRS = exportGrid.getBinding().getDataStore().getRowSet();
        //			var exportOptionsManager = exportGrid.getManager("SelectionManager");
        //	    	var num = 0;
        //	    	var exportGridLength = exportOptionsRS.getRowCount();
        //		    while(result[num]){
        //		    	for(var k=0;k<exportGridLength;k++){
        //		    		if(exportOptionsRS.getRow(k).getItemValue("name")==result[num]){
        //		    			exportOptionsManager.setSelect(k, true);
        //		    			continue;
        //		    		}
        //		    	}
        //		    	num++;
        //		    }
        //	    }else{
        //	    	var exportGrid = unieap.byId("exportOptions");
        //			var exportOptionsRS = exportGrid.getBinding().getDataStore().getRowSet();
        //			var exportOptionsManager = exportGrid.getManager("SelectionManager");
        //			exportOptionsManager.setAllSelect(true);
        //	    }
        //	}
        //},dc,false);			
    }

    function advanceConfig_onChange(checked) {
        if (checked) {
            var dialog = unieap.getXDialog();
            var dataTypeCells = [];
            var cells = dialog.getObject()._this.grid.getLayoutManager().getCells();
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                var dataTypeCell = {};
                dataTypeCell["name"] = cell.name;
                dataTypeCell["dataType"] = cell.dataType;
                dataTypeCell["label"] = cell.label;
                dataTypeCells.push(dataTypeCell);
            }
            var cellsListDS = new unieap.ds.DataStore("exportOptions", dataTypeCells);
            unieap.byId("exportOptions").getBinding().setDataStore(cellsListDS);
            dialogResize(true);
            getConfigFromSQL();
        }
        else {
            if (dialogState) {
                dialogResize(false);
            }
        }




    }

    function saveConfig_onClick(event) {
        var exportLabelsRowSet = unieap.byId("exportOptions").getManager('SelectionManager').getSelectedDataSet();
        if (exportLabelsRowSet.getRowCount() <= 0) {
            MessageBox.alert({
                title: "确认框",
                message: "请选择需要保存的列。"
            });
            return;
        }
        var exportLabels = {};
        var _exportLabels = exportLabelsRowSet.getData();

        for (var i = 0; i < _exportLabels.length; i++) {
            exportLabels[i] = _exportLabels[i].name;
        }
        var cmpPath = unieap.cmpPath;
        var userAccount = unieap.userAccount;
        var cmpID = unieap.getXDialog().getObject()._this.grid.id;
        var url = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
        var dc = new unieap.ds.DataCenter();
        dc.setParameter("_boId", "ria_gridExportBO_bo");
        dc.setParameter("_methodName", "saveExportConfig");
        dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String,java.lang.String,java.lang.String");
        dc.setParameter("exportLabels", exportLabels);
        dc.setParameter("cmpPath", cmpPath);
        dc.setParameter("userAccount", userAccount);
        dc.setParameter("cmpID", cmpID);
        dc.setParameter("_parameters", "exportLabels,cmpPath,userAccount,cmpID");
        dc.setParameter("_parameterTypes", "string,string,string,string");
        unieap.Action.requestData({
            url: url,
            sync: false,
            load: function (dc) {
                MessageBox.alert({
                    title: "确认框",
                    message: "保存成功。"
                });
            }
        }, dc, false);
    }

    function form1_saveButton_onClick(event) {
        var exportType = unieap.byId("exportType").getValue();
        if (exportType) {
            if (exportData) {
                var exportLabels = {};
                if (unieap.byId("advanceConfig").checked) {
                    var exportLabelsRowSet = unieap.byId("exportOptions").getManager('SelectionManager').getSelectedDataSet();
                    if (exportLabelsRowSet.getRowCount() <= 0) {
                        MessageBox.alert({
                            title: '确认框',
                            message: '请选择需要导出的列。'
                        });
                        return;
                    }
                    else {
                        exportLabels = exportLabelsRowSet.getData();
                    }
                }
                dojo.mixin(exportData, {
                    'exportLabels': exportLabels,
                    'exportType': exportType
                });
                unieap.Action.doExport(exportData);
                unieap.getXDialog().close();
            }
            else {
                MessageBox.alert({
                    title: '确认框',
                    message: '无导出数据。'
                })
            }
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '请选择导出类型。'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        var dialog = unieap.getXDialog();
        if (dialog) {
            dialog.close();
        }
    }

    var view = new _ria.gridExport.View();
    view.init();

    return view;
})