/**
 *
 * @author lugj
 * @creationTime 2014-03-14 09:37:36
 * @modificationTime 2015-06-19 15:15:34
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("gridImport", function () {

    var _this = null;

    var dialogState = false;

    var excelGridSelectRow = -1;

    var importGridSelectRow = -1;

    var uploadFlag = false;

    var labelRowSpinner;

    var labelCell;

    var labelEndCell;

    var dataStartRow;

    var dataEndRow;
    //表示是否从数据库加载成功配置信息
    var sqlConfigFlag = false;

    var importFlag = false;

    var cmpPath = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_ria.gridImport.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getDataByFileUrlSuccess: getDataByFileUrlSuccess,
                getSheetsSuccess: getSheetsSuccess,
                getImportMessageSuccess: getImportMessageSuccess,
                dialogResize: dialogResize,
                getImportMessageError: getImportMessageError,
                clearConfigImformation: clearConfigImformation,
                getImportMessage: getImportMessage,
                getConfigInfoFromSQL: getConfigInfoFromSQL,
                aotuUploadConfigInfo: aotuUploadConfigInfo,
                doGetImportMessage: doGetImportMessage,
                fileInput1_onChange: fileInput1_onChange,
                fileInput1_onCancel: fileInput1_onCancel,
                sheets_onChange: sheets_onChange,
                advanceConfig_onChange: advanceConfig_onChange,
                upload_onClick: upload_onClick,
                excelAllCells_views_onRowClick: excelAllCells_views_onRowClick,
                moveRight_onClick: moveRight_onClick,
                moveLeft_onClick: moveLeft_onClick,
                moveTop_onClick: moveTop_onClick,
                moveDown_onClick: moveDown_onClick,
                excelImportCells_views_onRowClick: excelImportCells_views_onRowClick,
                saveConfig_onClick: saveConfig_onClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                _this: _this,
                dialogState: dialogState,
                excelGridSelectRow: excelGridSelectRow,
                importGridSelectRow: importGridSelectRow,
                uploadFlag: uploadFlag,
                labelRowSpinner: labelRowSpinner,
                labelCell: labelCell,
                labelEndCell: labelEndCell,
                dataStartRow: dataStartRow,
                dataEndRow: dataEndRow,
                sqlConfigFlag: sqlConfigFlag,
                importFlag: importFlag,
                cmpPath: cmpPath
            });

            this.processor = new _ria.gridImport.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {},

        page_initEvents: function () {

            this.connect(unieap.byId("fileInput1"), "onChange", this.fileInput1_onChange);

            this.connect(unieap.byId("fileInput1"), "onCancel", this.fileInput1_onCancel);

            this.connect(unieap.byId("sheets"), "onChange", this.sheets_onChange);

            this.connect(unieap.byId("advanceConfig"), "onChange", this.advanceConfig_onChange);

            this.connect(unieap.byId("upload"), "onClick", this.upload_onClick);

            this.connect(unieap.byId("moveRight"), "onClick", this.moveRight_onClick);

            this.connect(unieap.byId("moveLeft"), "onClick", this.moveLeft_onClick);

            this.connect(unieap.byId("moveTop"), "onClick", this.moveTop_onClick);

            this.connect(unieap.byId("moveDown"), "onClick", this.moveDown_onClick);

            this.connect(unieap.byId("saveConfig"), "onClick", this.saveConfig_onClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            cmpPath = unieap.getXDialog().getObject().cmpPath;
        }


    });
    /**
     * @description:getDataByFileUrl方法的成功回调。
     *
     */

    function getDataByFileUrlSuccess(dc) {
        unieap.showXhrLoading(false);
        var ishighlight = !unieap.byId("ishighlight") ? 0 : unieap.byId("ishighlight").getValue();
        var tmpDc = new unieap.ds.DataCenter();
        //var excelInfos=dc.getDataStore("excelInfos").getRowSet().getRow(0);

        var pojoList = dc.getDataStore("pojoList");
        var errorMessageList = dc.getDataStore("errorMessageList");
        var stateMap = dc.getDataStore("stateMap");
        var excelToOrginId = dc.getDataStore("excelToOrginId");
        var dsTmp = new unieap.ds.DataStore();
        var errorDsTmp = new unieap.ds.DataStore();
        var stateMapTmp = new unieap.ds.DataStore();
        var excelToOrginIdTmp = new unieap.ds.DataStore();
        //
        //dsTmp.getRowSet().addRows(pojoList);
        //errorDsTmp.getRowSet().addRows(errorMessageList);
        //stateMapTmp.getRowSet().addRows(stateMap);
        //excelToOrginIdTmp.getRowSet().addRows(excelToOrginId);

        tmpDc.addDataStore("pojoList", pojoList);
        tmpDc.addDataStore("errorMessageList", errorMessageList);
        tmpDc.addDataStore("stateMap", stateMap);
        tmpDc.addDataStore("excelToOrginId", excelToOrginId);

        var xlsData = {
            "xlsData": tmpDc,
            "ishighlight": ishighlight,
            "_this": _this
        };

        dojo.style(unieap.getXDialog().mainNode, 'display', 'none');
        _this.grid.getManager('ImportManager')._dataPreview(xlsData);
        dojo.style(unieap.getXDialog().preDialog._modalDiv, 'display', 'none');
        //unieap.getXDialog().setReturn(xlsData);
        //unieap.showXhrLoading(true);			
    }
    /**
     * @description:getSheets方法的成功回调。
     *
     */

    function getSheetsSuccess(dc) {
        //lianggh 修改
        var tmpSheets = dc.getDataStore("sheets");
        var sheets = new unieap.ds.DataStore('sheets');
        var i = 0;
        tmpSheets.getRowSet().forEach(function (row) {
            row.setItemValue('dept', 20);
            var data = {
                "CODEVALUE": i,
                "CODENAME": row.getItemValue(i + "")
            };
            sheets.getRowSet().addRow(data);
            i++;
        })
        //lianggh 注释
        //while(parameters[i]){
        //	 var data = {"CODEVALUE":i,"CODENAME":parameters[i]};
        //	 sheets.getRowSet().addRow(data);
        //	 i++;
        //}
        dataCenter.addDataStore("sheets", sheets);
        var sheetsCombobox = unieap.byId("sheets");
        sheetsCombobox.getDataProvider().setDataStore(sheets);
        sheetsCombobox.setValue(0);
        var checked = unieap.byId("advanceConfig").getValue();
        if (checked == 1) {
            getImportMessage(0);
        }
    }
    /**
     * @description:getImportMessage方法的成功回调。
     *
     */

    function getImportMessageSuccess(dc) {
        if (!dialogState) {
            dialogResize(true);
        }
        var dataEndRowSpinner = unieap.byId("dataEndRowSpinner");
        dojo.style(dataEndRowSpinner.inputNode, {
            color: '#727171'
        });
        var excelLabels = dc.getDataStore("excelLabels");
        if (sqlConfigFlag) { //如果是从数据库加载过来的数据则只需要更新最大数据行和EXCEL剩余列grid数据
            if (dc.getParameter("dataEndRow") && dc.getParameter("dataEndRow") != dataEndRow) {
                dataEndRowSpinner.setValue(dc.getParameter("dataEndRow"));
                dojo.style(dataEndRowSpinner.inputNode, {
                    color: 'red'
                });
            }
            var excelImportCellsGrid = unieap.byId("excelImportCells");
            var importGridRowSet = excelImportCellsGrid.getBinding().getRowSet();
            var excelAllLabels = [];
            var importGridLength = importGridRowSet.getRowCount();
            var data = excelLabels;
            //excelLabels.getRowSet().getData()[0];
            var k = 0;
            var autoFormatNum = 0;
            while (data[k]) {
                var d = data[k];
                var excelLabel = {};
                for (var i = 0; i < importGridLength; i++) {
                    if (d == importGridRowSet.getRow(i).getItemValue("label")) {
                        break;
                    }
                    if (i == importGridLength - 1) {
                        autoFormatNum++;
                        excelLabel["label"] = d;
                        excelAllLabels.push(excelLabel);
                    }
                }
                k++;
            }
            //清除数据库中保存的excel导入列名，但是实际的excel中没有的列名
            for (var j = 0; j < importGridLength; j++) {
                for (var i = 0; i < k; i++) {
                    if (data[i] == importGridRowSet.getRow(j).getItemValue("label")) {
                        break;
                    }
                    if (i == k - 1) {
                        importGridRowSet.getRow(j).setItemValue("label", "");
                    }
                }

            }
            var excelAllCellsDS = new unieap.ds.DataStore("excelAllCellsDS", excelAllLabels);
            var excelAllCellsGrid = unieap.byId("excelAllCells");
            excelAllCellsGrid.getBinding().setDataStore(excelAllCellsDS);
            var excelAllCellsGridView = excelAllCellsGrid.getViewManager();
            for (var m = 0; m < autoFormatNum; m++) {
                excelAllCellsGridView.setRowStyles(m, {
                    'background': '#FFFFFF'
                });
            }
            var excelImportCellsGridView = excelImportCellsGrid.getViewManager();
            for (var n = 0; n < importGridLength; n++) {
                excelImportCellsGridView.setRowStyles(n, {
                    'background': '#FFFFFF'
                });
            }
            sqlConfigFlag = false;
        }
        else {
            if (!excelLabels) {
                clearConfigImformation();
                MessageBox.alert({
                    title: "确认框",
                    message: "标题无法自动匹配，请选择标题所在行。"
                });
                unieap.showLoading(false);
                return;
            }
            var data = excelLabels.getRowSet().getRow(0).getData();
            // excelLabels.getRowSet().getData()[0];
            var gridCellList = unieap.byId("gridCellList").getBinding().getDataStore().getRowSet();
            var gridCellListLength = gridCellList.getRowCount();
            var excelAllLabels = [];
            var excelImportLabels = [];
            var k = 0;
            var num = 0;
            var autoFormatNum = 0;
            var flag;
            while (typeof (data[num]) != "undefined") {
                var d = data[num];
                if (d == "") {
                    num++;
                    continue;
                }
                var excelLabel = {};
                var importLabel = {};
                for (var i = 0; i < gridCellListLength; i++) {
                    if (d == gridCellList.getRow(i).getItemValue("label")) {
                        flag = true;
                        autoFormatNum++;
                        importLabel["label"] = d;
                        excelImportLabels[i] = importLabel;
                        break;
                    }
                }
                if (!flag) {
                    excelLabel["label"] = d;
                    excelAllLabels.push(excelLabel);
                }
                num++;
                k++;
            }
            for (var j = 0; j < gridCellListLength; j++) {
                if (!excelImportLabels[j]) {
                    var importLabel = {};
                    importLabel["label"] = null;
                    excelImportLabels[j] = importLabel;
                }
            }
            var excelAllCellsDS = new unieap.ds.DataStore("excelAllCellsDS", excelAllLabels);
            var excelAllCellsGrid = unieap.byId("excelAllCells");
            excelAllCellsGrid.getBinding().setDataStore(excelAllCellsDS);
            var excelAllCellsGridView = excelAllCellsGrid.getViewManager();
            //	for(var m=0;m<k-autoFormatNum;m++ ){
            //		excelAllCellsGridView.setRowStyles(m,{'background':'#FFFFFF'});
            //	}
            var excelImportCellsDS = new unieap.ds.DataStore("excelImportCellsDS", excelImportLabels);
            var excelImportCellsGrid = unieap.byId("excelImportCells");
            excelImportCellsGrid.getBinding().setDataStore(excelImportCellsDS);
            var excelImportCellsGridView = excelImportCellsGrid.getViewManager();
            for (var n = 0; n < gridCellListLength; n++) {
                excelImportCellsGridView.setRowStyles(n, {
                    'background': '#FFFFFF'
                });
            }
            labelRowSpinner = dc.getParameter("labelRow") || unieap.byId("labelRowSpinner").getValue();
            labelCell = dc.getParameter("labelCell") || unieap.byId("labelStartCellSpinner").getValue();
            labelEndCell = dc.getParameter("labelEndCell") || unieap.byId("labelEndCellSpinner").getValue();
            dataStartRow = dc.getParameter("dataStartRow") || unieap.byId("dataStartRowSpinner").getValue();
            dataEndRow = dc.getParameter("dataEndRow") || unieap.byId("dataEndRowSpinner").getValue();
            dc.getParameter("labelRow") && unieap.byId("labelRowSpinner").setValue(labelRowSpinner);
            dc.getParameter("labelCell") && unieap.byId("labelStartCellSpinner").setValue(labelCell);
            dc.getParameter("labelEndCell") && unieap.byId("labelEndCellSpinner").setValue(labelEndCell);
            dc.getParameter("dataStartRow") && unieap.byId("dataStartRowSpinner").setValue(dataStartRow);
            dc.getParameter("dataEndRow") && unieap.byId("dataEndRowSpinner").setValue(dataEndRow);
            uploadFlag = true;
            excelGridSelectRow = -1;
            importGridSelectRow = -1;
        }
    }
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
            dialog.setHeight(530);
            dialog.setWidth(700);
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
            dialog.setHeight(235);
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
    /**
     * @description:getImportMessage方法的失败回调。
     *
     */

    function getImportMessageError(xhr) {
        uploadFlag = false;
        MessageBox.alert({
            title: "确认框",
            message: "无法加载标题信息，请重新选择标题所在行。"
        });
        if (!dialogState) {
            dialogResize(true);
        }
        clearConfigImformation();
    }

    function clearConfigImformation() {
        unieap.byId("excelAllCells").getBinding().clear();
        unieap.byId("excelImportCells").getBinding().clear();
        labelRowSpinner = 1;
        labelCell = 1;
        labelEndCell = 1;
        dataStartRow = 1;
        dataEndRow = 1;
        unieap.byId("labelRowSpinner").setValue(1);
        unieap.byId("labelStartCellSpinner").setValue(1);
        unieap.byId("labelEndCellSpinner").setValue(1);
        unieap.byId("dataStartRowSpinner").setValue(1);
        unieap.byId("dataEndRowSpinner").setValue(1);
    }
    /**
     * @description:
     *
     * @param: {参数类型} value 参数描述
     * @return:
     *
     */

    function getImportMessage(value) {
        getConfigInfoFromSQL();
        if (sqlConfigFlag) {
            return;
        }
        doGetImportMessage(value);
    }

    function getConfigInfoFromSQL() {
        //var userAccount = unieap.userAccount;
        //var cmpID = unieap.getXDialog().getObject()._this.grid.id;
        //var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
        //var dc=new unieap.ds.DataCenter();
        //dc.setParameter("_boId", "ria_gridImportBO_bo");
        //dc.setParameter("_methodName", "getImportConfig");
        //dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String,java.lang.String");
        //dc.setParameter("cmpPath", cmpPath);
        //dc.setParameter("userAccount", userAccount);
        //dc.setParameter("cmpID", cmpID);
        //dc.setParameter("_parameters", "cmpPath,userAccount,cmpID");
        //dc.setParameter("_parameterTypes", "string,string,string");
        //unieap.Action.requestData({
        //	url:url,
        //	sync:true,
        //	load:function(dc){
        //		var result = dc.getParameter("result");
        //	    if(result==""){
        //	    	sqlConfigFlag = false;
        //	    }else{
        //	    	importFlag = true;
        //	    	sqlConfigFlag = true;
        //	    	var configInfo = result;
        //	    	labelRowSpinner = configInfo["labelRow"];
        //			labelCell = configInfo["labelStartCell"];
        //			labelEndCell = configInfo["labelEndCell"];
        //			dataStartRow = configInfo["dataStartRow"];
        //			dataEndRow = configInfo["dataEndRow"];
        //			var importLabels = configInfo["importLabels"];
        //			unieap.byId("labelRowSpinner").setValue(labelRowSpinner);
        //			unieap.byId("labelStartCellSpinner").setValue(labelCell);
        //			unieap.byId("labelEndCellSpinner").setValue(labelEndCell);
        //			unieap.byId("dataStartRowSpinner").setValue(dataStartRow);
        //			unieap.byId("dataEndRowSpinner").setValue(dataEndRow);
        //			var excelImportLabels = [];
        //			var k = 0;
        //			while(typeof(importLabels[k]) != 'undefined'){
        //				var d = importLabels[k];
        //				var importLabel = {};
        //				importLabel["label"] = d;
        //				excelImportLabels.push(importLabel);
        //				k++;
        //			}
        //			var excelImportCellsDS = new unieap.ds.DataStore("excelImportCellsDS",excelImportLabels);
        //			var excelImportCellsGrid = unieap.byId("excelImportCells");
        //			excelImportCellsGrid.getBinding().setDataStore(excelImportCellsDS);
        //			
        //			//由于最后一行数据不固定，处理获得最后一样
        //			aotuUploadConfigInfo();
        ////			doGetImportMessage(unieap.byId("sheets").getValue());
        //	    }
        //	}
        //},dc,false);			
    }
    /**
     * @description:
     *
     * @return:
     *
     */

    function aotuUploadConfigInfo() {
        var sheetId = unieap.byId("sheets").getValue();
        if (!unieap.byId("fileInput1").getValue() || !sheetId) {
            MessageBox.alert({
                title: "确认框",
                message: "源文件或工作表不能为空。"
            });
            return;
        }
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
        var configImformation = {};
        configImformation["labelRowSpinner"] = unieap.byId("labelRowSpinner").getValue() || 1;
        configImformation["labelStartCellSpinner"] = unieap.byId("labelStartCellSpinner").getValue() || 1;
        configImformation["labelEndCellSpinner"] = unieap.byId("labelEndCellSpinner").getValue() || 1;
        if (configImformation["labelStartCellSpinner"] > configImformation["labelEndCellSpinner"]) {
            MessageBox.alert({
                title: "确认框",
                message: "标题开始列不能大于标题结束列。"
            });
            return;
        }
        //configImformation["dataStartRowSpinner"] = unieap.byId("dataStartRowSpinner").getValue()||0;
        //configImformation["dataEndRowSpinner"] = unieap.byId("dataEndRowSpinner").getValue()||0;
        //参数一：form              
        //参数二：dataTypeCells：后台数据类型匹配
        //参数三：sheet页
        //参数四：configImformation 配置的信息
        view.processor.getImportMessage("importForm", dataTypeCells, sheetId, configImformation);
    }
    /**
     * @description:
     *
     * @param: {参数类型} value 参数描述
     * @return:
     *
     */

    function doGetImportMessage(value) {
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
        //参数一：form              
        //参数二：dataTypeCells：后台数据类型匹配
        //参数三：sheet页
        //var sheetId = unieap.byId("sheets").getValue();
        view.processor.getImportMessage("importForm", dataTypeCells, value, null);
    }

    function fileInput1_onChange(event) {
        //每次变动文件清空配置信息
        var checked = unieap.byId("advanceConfig").getValue();
        if (checked == 1) {
            clearConfigImformation();
        }
        var sheets = unieap.byId("sheets");
        sheets.getDataProvider().setDataStore(null);
        sheets.setValue(null);

        view.processor.getSheets("importForm");
    }

    function fileInput1_onCancel(event) {
        var checked = unieap.byId("advanceConfig").getValue();
        if (checked == 1) {
            clearConfigImformation();
        }
        var sheets = unieap.byId("sheets");
        sheets.getDataProvider().setDataStore(null);
        sheets.setValue(null);
    }

    function sheets_onChange(value) {
        var checked = unieap.byId("advanceConfig").getValue();
        if (checked == 1) {
            if (!value) {
                if (!dialogState) {
                    dialogResize(true);
                }
                return;
            }
            getImportMessage(value);
        }
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
            var cellsListDS = new unieap.ds.DataStore("gridLabelList", dataTypeCells);
            unieap.byId("gridCellList").getBinding().setDataStore(cellsListDS);
            dialogResize(true);
            if (unieap.byId("fileInput1").getValue() == "" || unieap.byId("sheets").getValue() == null) {
                return;
            }
            //	getConfigInfoFromSQL();
            //	if(sqlConfigFlag){
            //		return;
            //	}
            //参数一：form              
            //参数二：dataTypeCells：后台数据类型匹配
            //参数三：sheet页
            var sheetId = unieap.byId("sheets").getValue();
            view.processor.getImportMessage("importForm", dataTypeCells, sheetId, "");
        }
        else {
            if (dialogState) {
                dialogResize(false);
            }
        }




    }

    function upload_onClick(event) {
        aotuUploadConfigInfo();
    }

    function excelAllCells_views_onRowClick(event) {
        var rowIndex = event.rowIndex;
        if (typeof (rowIndex) == undefined) {
            return;
        }
        var viewManager = this.grid.getViewManager();
        if (excelGridSelectRow != -1) {
            viewManager.setRowStyles(excelGridSelectRow, {
                'background': '#FFFFFF',
                'color': '#000000'
            });
        }
        excelGridSelectRow = rowIndex;
        viewManager.setRowStyles(rowIndex, {
            'background': '#1876CF',
            'color': '#FFFFFF'
        });

    }

    function moveRight_onClick(event) {
        if (excelGridSelectRow == -1) {
            MessageBox.alert({
                title: "确认框",
                message: "请在Excel剩余列选中一行。"
            });
        }
        else if (importGridSelectRow == -1) {
            var excelAllCells = unieap.byId("excelAllCells");
            var excelImportCells = unieap.byId("excelImportCells");
            var excelLabel = excelAllCells.getBinding().getRow(excelGridSelectRow).label;
            var excelImportBinding = excelImportCells.getBinding();
            var excelImportCellsLength = excelImportBinding.getRowCount();
            for (var i = 0; i < excelImportCellsLength; i++) {
                var label = excelImportBinding.getRow(i).label;
                if (label == null || label == "") {
                    excelImportCells.getBinding().getDataStore().getRowSet().setItemValue(i, "label", excelLabel);
                    excelImportCells.getViewManager().setRowStyles(i, {
                        'background': '#FFFFFF',
                        'color': '#000000'
                    });
                    excelAllCells.getBinding().deleteRow(excelGridSelectRow);
                    break;
                }
            }
            excelGridSelectRow = -1;
            importGridSelectRow = -1;
        }
        else {
            var excelAllCells = unieap.byId("excelAllCells");
            var excelImportCells = unieap.byId("excelImportCells");
            var excelLabel = excelAllCells.getBinding().getRow(excelGridSelectRow).label;
            var importLabel = excelImportCells.getBinding().getRow(importGridSelectRow).label;
            if (importLabel == null || importLabel == "") {
                excelImportCells.getBinding().getDataStore().getRowSet().setItemValue(importGridSelectRow, "label", excelLabel);
                excelImportCells.getViewManager().setRowStyles(importGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });
                excelAllCells.getBinding().deleteRow(excelGridSelectRow);
            }
            else {
                var _importLabel = importLabel;
                excelImportCells.getBinding().getDataStore().getRowSet().setItemValue(importGridSelectRow, "label", excelLabel);
                excelImportCells.getViewManager().setRowStyles(importGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });
                excelAllCells.getBinding().getDataStore().getRowSet().setItemValue(excelGridSelectRow, "label", _importLabel);
                excelAllCells.getViewManager().setRowStyles(excelGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });
            }
            excelGridSelectRow = -1;
            importGridSelectRow = -1;
        }

    }

    function moveLeft_onClick(event) {
        if (importGridSelectRow == -1) {
            MessageBox.alert({
                title: "确认框",
                message: "请在Excel导入列选择左移行。"
            });
        }
        else {
            var excelAllCells = unieap.byId("excelAllCells");
            var excelImportCells = unieap.byId("excelImportCells");
            var importLabel = excelImportCells.getBinding().getRow(importGridSelectRow).label;
            if (importLabel == null || importLabel == "") {
                MessageBox.alert({
                    title: "确认框",
                    message: "Excel导入列选择的行数是空值，请重新选择。"
                });
            }
            else {
                var excelAllCellsBinding = excelAllCells.getBinding();
                var excelAllCellBindingCount = excelAllCellsBinding.getRowCount();
                excelAllCellsBinding.insertRow({
                    "label": importLabel
                }, excelAllCellBindingCount);
                excelAllCells.getViewManager().setRowStyles(excelAllCellBindingCount, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });
                excelImportCells.getBinding().getDataStore().getRowSet().setItemValue(importGridSelectRow, "label", null);
                excelImportCells.getViewManager().setRowStyles(importGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#FFFFFF'
                });
                importGridSelectRow = -1;
            }
        }
    }

    function moveTop_onClick(event) {
        if (importGridSelectRow == -1) {
            MessageBox.alert({
                title: "确认框",
                message: "请在Excel导入列选择需要移动的行。"
            });
        }
        else {
            var excelImportCells = unieap.byId("excelImportCells");
            var excelImportGridBindDS = excelImportCells.getBinding();
            if (0 == importGridSelectRow) {
                MessageBox.alert({
                    title: "确认框",
                    message: "此行已经是第一行。"
                });
            }
            else {
                var importLabel = excelImportGridBindDS.getRow(importGridSelectRow).label;
                var importLabelNext = excelImportGridBindDS.getRow(importGridSelectRow - 1).label;
                //交换位置的缓存数据
                var _importLabelNext = importLabelNext;
                var importGridViewManager = excelImportCells.getViewManager();
                var importGridBindRowSet = excelImportGridBindDS.getDataStore().getRowSet();
                importGridBindRowSet.setItemValue(importGridSelectRow - 1, "label", importLabel);
                importGridViewManager.setRowStyles(importGridSelectRow - 1, {
                    'background': '#1876CF',
                    'color': '#FFFFFF'
                });

                importGridBindRowSet.setItemValue(importGridSelectRow, "label", _importLabelNext);
                importGridViewManager.setRowStyles(importGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });

                importGridSelectRow = importGridSelectRow - 1;
            }
        }
    }

    function moveDown_onClick(event) {
        if (importGridSelectRow == -1) {
            MessageBox.alert({
                title: "确认框",
                message: "请在Excel导入列选择需要移动的行。"
            });
        }
        else {
            var excelImportCells = unieap.byId("excelImportCells");
            var excelImportGridBindDS = excelImportCells.getBinding();
            if (excelImportGridBindDS.getRowCount() - 1 == importGridSelectRow) {
                MessageBox.alert({
                    title: "确认框",
                    message: "此行已经是最后一行。"
                });
            }
            else {
                var importLabel = excelImportGridBindDS.getRow(importGridSelectRow).label;
                var importLabelNext = excelImportGridBindDS.getRow(importGridSelectRow + 1).label;
                //交换位置的缓存数据
                var _importLabelNext = importLabelNext;
                var importGridViewManager = excelImportCells.getViewManager();
                var importGridBindRowSet = excelImportGridBindDS.getDataStore().getRowSet();
                importGridBindRowSet.setItemValue(importGridSelectRow + 1, "label", importLabel);
                importGridViewManager.setRowStyles(importGridSelectRow + 1, {
                    'background': '#1876CF',
                    'color': '#FFFFFF'
                });

                importGridBindRowSet.setItemValue(importGridSelectRow, "label", _importLabelNext);
                importGridViewManager.setRowStyles(importGridSelectRow, {
                    'background': '#FFFFFF',
                    'color': '#000000'
                });

                importGridSelectRow = importGridSelectRow + 1;
            }
        }
    }

    function excelImportCells_views_onRowClick(event) {
        var rowIndex = event.rowIndex;
        if (typeof (rowIndex) == undefined) {
            return;
        }
        var viewManager = this.grid.getViewManager();
        if (importGridSelectRow != -1) {
            viewManager.setRowStyles(importGridSelectRow, {
                'background': '#FFFFFF',
                'color': '#000000'
            });
        }
        importGridSelectRow = rowIndex;
        viewManager.setRowStyles(rowIndex, {
            'background': '#1876CF',
            'color': '#FFFFFF'
        });

    }

    function saveConfig_onClick(event) {
        var configInfo = {};
        var importGrid = unieap.byId("excelImportCells").getBinding().getDataStore();
        var length = importGrid.getRecordCount();
        var importRowSet = importGrid.getRowSet();
        var importLabels = {};
        for (var i = 0; i < length; i++) {
            importLabels[i] = importRowSet.getRow(i).getItemValue("label");
        }

        if (labelRowSpinner != unieap.byId("labelRowSpinner").getValue() || labelCell != unieap.byId("labelStartCellSpinner").getValue() || labelEndCell != unieap.byId("labelEndCellSpinner").getValue()) {
            MessageBox.alert({
                title: "确认框",
                message: "配置信息已经修改，请先点击加载按钮，确认能否可以加载到EXCEL标题列。"
            });
            return;
        }

        configInfo["labelRow"] = labelRowSpinner || 1;
        configInfo["labelStartCell"] = labelCell || 1;
        configInfo["labelEndCell"] = labelEndCell || 1;
        configInfo["dataStartRow"] = unieap.byId("dataStartRowSpinner").getValue() || 1;
        configInfo["dataEndRow"] = unieap.byId("dataEndRowSpinner").getValue() || 1;
        configInfo["importLabels"] = importLabels;
        var userAccount = unieap.userAccount;
        var cmpID = unieap.getXDialog().getObject()._this.grid.id;
        var url = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
        var dc = new unieap.ds.DataCenter();
        dc.setParameter("_boId", "ria_gridImportBO_bo");
        dc.setParameter("_methodName", "saveImportConfig");
        dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String,java.lang.String,java.lang.String");
        dc.setParameter("configInfo", configInfo);
        dc.setParameter("cmpPath", cmpPath);
        dc.setParameter("userAccount", userAccount);
        dc.setParameter("cmpID", cmpID);
        dc.setParameter("_parameters", "configInfo,cmpPath,userAccount,cmpID");
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
        _this = unieap.getXDialog().getObject()._this;
        var gridDS = _this.grid.getBinding().getDataStore();
        var data = {};
        //获取高级配置信息：数据开始行，数据结束行，EXCEL中label和grid的一一对应关系
        if (unieap.byId("advanceConfig").getValue() == 1) {
            if (!uploadFlag && !importFlag) {
                MessageBox.alert({
                    title: "确认框",
                    message: "请先配置导入设置，成功加载并获取EXCEL导入列再导入。"
                });
                return;
            }
            var gridBinding = unieap.byId("gridCellList").getBinding();
            var length = gridBinding.getRowCount();
            var gridRowSet = gridBinding.getDataStore().getRowSet();
            var excelImportRowSet = unieap.byId("excelImportCells").getBinding().getDataStore().getRowSet();
            if (excelImportRowSet.getRowCount() == 0) {
                MessageBox.alert({
                    title: "确认框",
                    message: "Excel导入列为空，请重新加载。"
                });
                return;
            }
            //excel和grid中的列匹配
            var advanceConfig = [];
            for (var j = 0; j < length; j++) {
                var config = {};
                config["gridLabel"] = gridRowSet.getRow(j).getItemValue("label");
                config["excelLabel"] = excelImportRowSet.getRow(j).getItemValue("label");
                advanceConfig.push(config);
            }
            data["advanceConfig"] = advanceConfig;
            var configNum = {};
            configNum["labelRowSpinner"] = labelRowSpinner || 1;
            configNum["labelStartCellSpinner"] = labelCell || 1;
            configNum["labelEndCellSpinner"] = labelEndCell || 1;
            configNum["dataStartRowSpinner"] = unieap.byId("dataStartRowSpinner").getValue() || 1;
            configNum["dataEndRowSpinner"] = unieap.byId("dataEndRowSpinner").getValue() || 1;
            if (configNum["labelStartCellSpinner"] > configNum["labelEndCellSpinner"] || configNum["dataStartRowSpinner"] > configNum["dataEndRowSpinner"]) {
                MessageBox.alert({
                    title: "确认框",
                    message: "数据开始行不能大于数据结束行。"
                });
                return;
            }
            data["configNum"] = configNum;
            data["advanceFlag"] = true;
        }
        else {
            data["advanceFlag"] = false;
        }
        //unieap.showXhrLoading(true);
        //基本导入配置信息
        var dataTypeCells = [];
        var cells = _this.grid.getLayoutManager().getCells();
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var dataTypeCell = {};
            dataTypeCell["name"] = cell.name;
            dataTypeCell["dataType"] = cell.dataType;
            dataTypeCell["label"] = cell.label;
            //codelist的处理
            var decoder = cell.decoder;
            var _decoder = {};
            if (decoder) {
                var ds = unieap.getDataStore(decoder.store);
                if (!ds) {
                    ds = _this.grid.getBinding().dataCenter ? _this.grid.getBinding().dataCenter.getDataStore(decoder.store) : null;
                    if (!ds) {
                        ds = globalDataCenter.getDataStore(decoder.store);
                    }
                }
                if (ds) {
                    _decoder["store"] = ds.getRowSet().getData();
                    _decoder["valueAttr"] = decoder.valueAttr ? decoder.valueAttr : "CODEVALUE";
                    _decoder["displayAttr"] = decoder.displayAttr ? decoder.displayAttr : "CODENAME";
                }
            }
            var displayFormatter = cell.getDisplayFormatter();
            if (displayFormatter && displayFormatter.getFormat()) {
                dataTypeCell["format"] = displayFormatter.getFormat();
            }
            else {
                dataTypeCell["format"] = "";
            }
            dataTypeCell["decoder"] = _decoder;
            dataTypeCells.push(dataTypeCell);
        }

        var viewModelId = unieap.getXDialog().getObject().viewModelId;
        //参数一：form              
        //参数二：dataTypeCells：后台数据类型匹配
        //参数三：rowSetName:pojo的类名
        //参数四： uniqueCells 唯一性校验字段数组
        //参数五：orginRowSet 当前的datastore，用于唯一性校验
        //参数六：sheetId sheet页
        //参数七：customBeanName 自定义导入时的bean名称（通过解析cmpPath获得）
        var sheetId = unieap.byId("sheets").getValue();
        var unqueCells = _this.uniqueCell == null ? null : _this.uniqueCell;
        if (gridDS.getRowSetName()) {
            data["rowSetName"] = gridDS.getRowSetName();
        }
        else {
            MessageBox.alert({
                title: "确认框",
                message: "导入失败，请联系管理员。"
            })
            return;
        }
        data["sheetId"] = sheetId;
        data["customBeanName"] = viewModelId;
        data["uniqueCells"] = unqueCells;
        data["orginRowSet"] = gridDS.getRowSet().getData();
        data["dataTypeCells"] = dataTypeCells;
        data["import_maxLength"] = _this.import_maxLength;
        view.processor.getDataByFileUrl("importForm", data);

    }

    function form1_resetButton_onClick(event) {
        var dialog = unieap.getXDialog();
        if (dialog) {
            dialog.close();
        }

    }

    var view = new _ria.gridImport.View();
    view.init();

    return view;
})