/**
 *
 * @author wuzb
 * @creationTime 2014-04-09 11:06:36
 * @modificationTime 2015-06-19 13:26:30
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("gridImportPreview", function () {

    var stateMap = null;

    var pojoList = null;
    //var gridBindData = null;
    var errorMessageArray = new Array();

    var previewGridId = "import_preview_Grid";

    var excelToOrginId = null;

    var errorMessage = null;

    var gridEditState = false;

    var customBeanName = null;

    var uniqueCells = null;

    var orginRowSet = null;

    var orginGrid = null;
    //grid中的结构，用来创建新的grid以及是否可编辑列判断
    var mainTitleColumns = [];

    dojo.addOnLoad(function () {

    });

    dojo.declare("_ria.gridImportPreview.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                gridformat: gridformat,
                grid_onRowMouseOver: grid_onRowMouseOver,
                gridMouserOut: gridMouserOut,
                xdialogClose: xdialogClose,
                changeEditState: changeEditState,
                previewGridBeforeEdit: previewGridBeforeEdit,
                unUniqueCellContain: unUniqueCellContain,
                createXDialog: createXDialog,
                validationModifedSuccess: validationModifedSuccess,
                validatByErrorMessage: validatByErrorMessage,
                changeStateMap: changeStateMap,
                cancel_onClick: cancel_onClick,
                doImport_onClick: doImport_onClick,
                stateMap: stateMap,
                pojoList: pojoList,
                errorMessageArray: errorMessageArray,
                previewGridId: previewGridId,
                excelToOrginId: excelToOrginId,
                errorMessage: errorMessage,
                gridEditState: gridEditState,
                customBeanName: customBeanName,
                uniqueCells: uniqueCells,
                orginRowSet: orginRowSet,
                orginGrid: orginGrid,
                mainTitleColumns: mainTitleColumns
            });

            this.processor = new _ria.gridImportPreview.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {},

        page_initEvents: function () {

            this.connect(unieap.byId("cancel"), "onClick", this.cancel_onClick);

            this.connect(unieap.byId("doImport"), "onClick", this.doImport_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var ds = unieap.getXDialog().getObject().ds;
            orginGrid = ds._this.grid;
            createXDialog(ds.xlsData);


        }


    });
    /**
     * @description:
     *
     * @param: {参数类型} invalue 参数描述
     * @param: {参数类型} inRowIndex 参数描述
     * @return:
     *
     */

    function gridformat(invalue, inRowIndex) {
        var state = stateMap[inRowIndex];
        if (state == "error") {
            return "";
        }
        else if (state == "cover") {
            return "覆盖";
        }
        else if (state == "add") {
            return "追加";
        }
        return "";
    }
    /**
     * @description:
     *
     * @param: {参数类型} event 参数描述
     * @param: {参数类型} arg0 参数描述
     * @return:
     *
     */

    function grid_onRowMouseOver(event) {
        var cell = event.cell;
        if (!cell) {
            return;
        }
        var cellNode = event.cellNode;
        var index = event.rowIndex;
        var cellName = cell.name;
        if (cell && errorMessageArray && errorMessageArray[index] && errorMessageArray[index][cellName]) {
            var tipText = errorMessageArray[index][cellName];
            unieap.showTooltip(tipText, cellNode);
        }
        else {
            unieap.hideTooltip(cellNode);
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} cell 参数描述
     * @param: {参数类型} index 参数描述
     * @param: {参数类型} evt 参数描述
     * @return:
     *
     */

    function gridMouserOut(cell, index, evt) {
        if (!evt.cellNode) {
            return;
        }
        var cellName = cell.name;
        if (cell && errorMessageArray && errorMessageArray[index] && errorMessageArray[index][cellName]) {
            var tipText = errorMessageArray[index][cellName];
            unieap.showTooltip(tipText, evt.cellNode);
        }
        else {
            unieap.hideTooltip(evt.cellNode);
        }
    }

    function xdialogClose() {
        unieap.hideTooltip(null);
    }
    /**
     * @description:
     *
     * @param: {参数类型} e 参数描述
     * @return:
     *
     */

    function changeEditState(e) {
        if (!gridEditState) {
            gridEditState = true;
            this.innerHTML = "结束编辑";
            this.style.color = 'red';
        }
        else {
            gridEditState = false;
            var previewGrid = unieap.byId(previewGridId);
            previewGrid.getManager("RowEditManager").apply();
            this.innerHTML = "启动编辑";
            this.style.color = '#000000';

            var dataTypeCells = [];
            var cells = orginGrid.getLayoutManager().getCells();
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
                        ds = orginGrid.getBinding().dataCenter ? orginGrid.getBinding().dataCenter.getDataStore(decoder.store) : null;
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
                dataTypeCell["decoder"] = _decoder;
                dataTypeCells.push(dataTypeCell);
            }

            //进行二次校验
            var previewGridDS = previewGrid.getBinding().getDataStore();
            var rowSetName = previewGridDS.getRowSetName();
            var data = {};
            data["rowSetName"] = rowSetName;
            data["newRowSet"] = previewGridDS.getRowSet().getData();
            data["customBeanName"] = customBeanName;
            data["uniqueCells"] = uniqueCells;
            data["orginRowSet"] = orginRowSet;
            data["dataTypeCells"] = dataTypeCells;
            //参数一：rowSetName:pojo的类名
            //参数二：grid中修改后的data
            //参数三：customBeanName自定bean
            //参数四：唯一性校验列
            //参数五：原来grid的rowSet
            view.processor.validationModifed(data);
        }
    }

    function previewGridBeforeEdit() {
        //return gridEditState&&unieap.widget.grid.importViewEdit;
        return gridEditState;
    }
    /**
     * @description:
     * 唯一性列是否是编辑列判断
     * @param: {参数类型} uniqueCell 参数描述
     * @param: {参数类型} name 参数描述
     * @return:
     *
     */

    function unUniqueCellContain(uniqueCell, name) {
        var length = uniqueCell.length;
        for (var i = 0; i < length; i++) {
            if (uniqueCell[i] == name) {
                return true;
            }
        }
        return false;
    }
    /**
     * @description:
     *
     * @param: {参数类型} ds 参数描述
     * @return:
     *
     */

    function createXDialog(ds) {
        pojoList = ds.getDataStore("pojoList");
        excelToOrginId = ds.getDataStore("excelToOrginId") && ds.getDataStore("excelToOrginId").getRowSet().getRow(0).getData() || {};
        errorMessage = ds.getDataStore("errorMessageList").getRowSet();
        stateMap = ds.getDataStore("stateMap").getRowSet().getRow(0).getData();

        orginRowSet = orginGrid.getBinding().getDataStore().getRowSet().getData();
        //获取到grid的structure
        var origin = null;
        if (orginGrid.declaredClass == "unieap.xgrid.Grid") {
            origin = orginGrid.getManager("LayoutManager").origin.columns;
        }
        else {
            origin = orginGrid.getManager("LayoutManager").getOriginCells();
        }
        var inStructure = new Array(1);
        var gridImportManager = orginGrid.getManager("ImportManager");
        customBeanName = gridImportManager.customBeanName;
        uniqueCells = gridImportManager.uniqueCell;
        /*
	如果unieap.widget.grid.importViewEdit是ture，则编辑是打开的，所有的列都可以编辑，所有的校验信息都显示；
	如果unieap.widget.grid.importViewEdit是false，则只会根据原始grid的列编辑状态，即原始grid的列可以编辑的就编辑，校验；不可以编辑不能编辑，并且不校验！
												    不校验表示当前列如果校验错误，只要其他列正确也认为是正确数据，导入！
*/
        for (var i = 0; i < origin.length; i++) {
            var cloneCell = dojo.clone(origin[i]);
            if (unieap.widget.grid.importViewEdit) {
                //		if(!unUniqueCellContain(uniqueCells,cloneCell.name)){
                cloneCell.enable = true;
                if (cloneCell.dataType == "date") {
                    cloneCell.editor = {
                        'editorClass': 'unieap.form.DateTextBox'
                    };
                }
                else {
                    cloneCell.editor = {
                        'editorClass': 'unieap.form.TextBox'
                    };
                }
                //		}
            }
            else {
                //通过判断可以不可以编辑来清除errorMessage的不用校验的信息
                validatByErrorMessage(cloneCell);
                //		if(unUniqueCellContain(uniqueCells,cloneCell.name)){
                //			cloneCell.enable = false;
                //			cloneCell.editor = null;
                //		}
            }
            mainTitleColumns.push(cloneCell);
        }
        mainTitleColumns.length = origin.length;

        //通过errormessage来处理stateMap、excelToOrginId的信息（stateMap和excelToOrginId他们从后台传递过来时不关心数据的对与错，这里统一处理）
        for (var k = 0, length = errorMessage.getRowCount(); k < length; k++) {
            var row = errorMessage.getRow(k);
            var rowNum = row.getItemValue("rowNum");
            var cellName = row.getItemValue("cellName");
            changeStateMap(rowNum, cellName);
        }

        /*****************************************************动态创建grid start**************************************************************/
        //创建左侧固定列 执行操作 的cell结构
        var recommendCell = [];
        recommendCell.declaredClass = "unieap.grid.Cell";
        recommendCell.name = previewGridId + "recommendCell";
        recommendCell.id = previewGridId + "recommendCell";
        recommendCell.label = "执行操作";
        recommendCell.width = "100";
        recommendCell.styles = "color:blue;text-align:center";
        recommendCell.properties = [];
        recommendCell.formatter = view.gridformat;
        //inStructure[0].rows[0].push(recommendCell);
        inStructure = [{
            noscroll: true,
            rows: [
                [recommendCell]
            ]
        }, {
            rows: [mainTitleColumns]
        }];
        if (inStructure[0].type == "unieap.xgrid.RowView" || inStructure[0].type == "unieap.grid.RowView") {
            inStructure.shift();
        }
        //创建xGrid相关变量
        var dynamicGrid = new unieap.xgrid.Grid({
            id: previewGridId, //Grid的Id
            dataCenter: dataCenter, //dataCenter和_rootID这两项用于处理单帧下ID
            _rootID: view._rootNodeId, //比较重要，请保留
            views: {
                orderType: 'none',
                rowNumber: true,
                onCellMouseOver: view.gridMouserOut
            },
            layout: {
                structure: inStructure
            }, //xGrid的结构
            edit: {
                onBeforeEdit: view.previewGridBeforeEdit
            },
            width: "99.5%",
            height: "300px"
        });
        //渲染xGrid
        unieap.getElementById("xGridDiv").appendChild(dynamicGrid.domNode);
        dojo.require("unieap.xgrid.core.toolbar");
        var toolbar = new unieap.xgrid.toolbar({
            grid: unieap.byId(previewGridId)
        });
        //创建启动编辑按钮并绑定事件,通过unieap.widget.grid.importViewEdit控制
        dojo.require("unieap.form.Button");
        var button = new unieap.form.Button({
            label: "启动编辑"
        });
        dojo.connect(button.btnNode, 'onclick', view.changeEditState);
        //toolbar.containerNode.appendChild(button.domNode);
        //绑定数据
        unieap.byId(previewGridId).setDataStore(pojoList);
        //处理tooltip在xdialog关闭不消失的问题
        dojo.connect(unieap.getXDialog().closeNode, 'onclick', view.xdialogClose);
        /*******************************************************动态创建grid end**********************************************************/

        //错误样式渲染
        var viewMan = unieap.byId(previewGridId).getManager("ViewManager");
        for (var k = 0, length = errorMessage.getRowCount(); k < length; k++) {
            var row = errorMessage.getRow(k);
            var rowNum = row.getItemValue("rowNum");
            var cellName = row.getItemValue("cellName");
            viewMan.setCellStyles(rowNum, cellName, {
                "background": "#FFF4A4"
            });
            if (!errorMessageArray[rowNum]) {
                errorMessageArray[rowNum] = new Array();
            }
            var originalValue = row.getItemValue("originalValue") != "" ? row.getItemValue("originalValue") : "空";
            errorMessageArray[rowNum][cellName] = "错误信息：" + row.getItemValue("message") + "，Excel中的错误值：" + originalValue;
        }
        getElementById("execution").style.display = "block";
        getElementById("tipMessage").style.display = "block";
    }
    /**
     * @description:validationModifed方法的成功回调。
     *
     */

    function validationModifedSuccess(dc) {
        pojoList = dc.getDataStore("pojoList");
        //gridBindData = dc.getDataStore("gridBindData");
        excelToOrginId = dc.getDataStore("excelToOrginId") && dc.getDataStore("excelToOrginId").getRowSet().getRow(0).getData() || {};
        errorMessage = dc.getDataStore("errorMessageList").getRowSet();
        stateMap = dc.getDataStore("stateMap").getRowSet().getRow(0).getData();
        //绑定数据，由于数据没有变化，可以直接使用原始的数据，只需要把样式清空就行了
        var proviewGridBinding = unieap.byId(previewGridId).getBinding();
        var proviewGridDataStore = proviewGridBinding.getDataStore().clone();
        var proviewGridRowSet = proviewGridBinding.getRowSet();
        for (var l = 0; l < proviewGridRowSet.getRowCount(); l++) {
            var row = proviewGridRowSet.getRow(l);
            if (row.getItemValue("_styles")) {
                row.setItemValue("_styles", null);
            }
            if (row.getItemValue("identifierNO")) {
                row.setItemValue("identifierNO", null);
            }
        }
        proviewGridBinding.clear();
        /*
	如果unieap.widget.grid.importViewEdit是ture，则编辑是打开的，所有的列都可以编辑，所有的校验信息都显示；
	如果unieap.widget.grid.importViewEdit是false，则只会根据原始grid的列编辑状态，即原始grid的列可以编辑的就编辑，校验；不可以编辑不能编辑，并且不校验！
												    不校验表示当前列如果校验错误，只要其他列正确也认为是正确数据，导入！
*/
        var cells = unieap.byId(previewGridId).getManager("LayoutManager").getCells();
        for (var i = 0; i < cells.length; i++) {
            var cloneCell = cells[i];
            if (!unieap.widget.grid.importViewEdit) {
                //通过判断可以不可以编辑来清除errorMessage的不用校验的信息
                if (!cloneCell.enable) {
                    validatByErrorMessage(cloneCell);
                }
            }
        }

        //通过errormessage来处理stateMap、excelToOrginId的信息（stateMap和excelToOrginId他们从后台传递过来时不关心数据的对与错，这里统一处理）
        for (var k = 0, length = errorMessage.getRowCount(); k < length; k++) {
            var row = errorMessage.getRow(k);
            var rowNum = row.getItemValue("rowNum");
            var cellName = row.getItemValue("cellName");
            changeStateMap(rowNum, cellName);
        }
        proviewGridBinding.setDataStore(proviewGridDataStore);

        //错误样式渲染，首先清空原始的error提示信息
        errorMessageArray.length = 0;
        var viewMan = unieap.byId(previewGridId).getManager("ViewManager");
        for (var k = 0, length = errorMessage.getRowCount(); k < length; k++) {
            var row = errorMessage.getRow(k);
            var rowNum = row.getItemValue("rowNum");
            var cellName = row.getItemValue("cellName");
            viewMan.setCellStyles(rowNum, cellName, {
                "background": "#FFF4A4"
            });
            if (!errorMessageArray[rowNum]) {
                errorMessageArray[rowNum] = new Array();
            }
            var originalValue = row.getItemValue("originalValue") != "" ? row.getItemValue("originalValue") : "空";
            errorMessageArray[rowNum][cellName] = "错误信息：" + row.getItemValue("message") + "，Excel中的错误值：" + originalValue;
        }
        getElementById("execution").style.display = "block";
        getElementById("tipMessage").style.display = "block";
    }
    /**
     * @description:
     * 通过判断可以不可以编辑来清除errorMessage的不用校验的信息
     * @param: {参数类型} cloneCell 参数描述
     * @return:
     *
     */

    function validatByErrorMessage(cloneCell) {
        var unValidationCell = new Array();
        for (var k = 0, length = errorMessage.getRowCount(); k < length; k++) {
            var row = errorMessage.getRow(k);
            var cellName = row.getItemValue("cellName");
            if (!cloneCell.enable && cloneCell.name == cellName) {
                unValidationCell.push(k);
            }
        }
        errorMessage.deleteRows(unValidationCell);
    }
    /**
     * @description:
     * 通过errormessage来处理stateMap、excelToOrginId的信息（stateMap和excelToOrginId他们从后台传递过来时不关心数据的对与错，这里统一处理）
     * @param: {参数类型} rowNum 参数描述
     * @param: {参数类型} cellName 参数描述
     * @return:
     *
     */

    function changeStateMap(rowNum, cellName) {
        if (excelToOrginId[rowNum] != -1) {
            excelToOrginId[rowNum] = -1;
        }
        if (stateMap[rowNum] != "error") {
            stateMap[rowNum] = "error";
        }
    }

    function cancel_onClick(event) {
        var dialog = unieap.getXDialog();
        if (dialog) {
            unieap.hideTooltip(null);
            dialog.close();
        }
    }

    function doImport_onClick(event) {
        if (gridEditState) {
            MessageBox.alert({
                title: '确认框',
                message: '请先结束编辑后再导入。'
            });
        }
        else {
            var previewReturnData = {
                "xlsData": pojoList,
                "excelToOrginId": excelToOrginId,
                "origin": mainTitleColumns,
                "stateMap": stateMap
            };
            var dialog = unieap.getXDialog();
            if (dialog) {
                unieap.showXhrLoading(true);
                unieap.hideTooltip(null);
                dialog.setReturn(previewReturnData);
                dialog.close();
            }
        }
    }

    var view = new _ria.gridImportPreview.View();
    view.init();

    return view;
})