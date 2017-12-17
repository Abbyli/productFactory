/**
 * 生存给付
 * @author neusoft
 * @creationTime 2016-07-08 11:45:06
 * @modificationTime 2017-03-24 10:45:03
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestLive", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPrestLive_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestLive.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTSurvvGivepayDefSuccess: queryTSurvvGivepayDefSuccess,
                del: del,
                delTSurvvGivepayDefSuccess: delTSurvvGivepayDefSuccess,
                update: update,
                getTObjFormulaSuccess: getTObjFormulaSuccess,
                delParamFormulaRelationSuccess: delParamFormulaRelationSuccess,
                delformula: delformula,
                updateformula: updateformula,
                addlive_onClick: addlive_onClick,
                cell_control_live_formatter: cell_control_live_formatter,
                grid_liveGrid_selection_onAfterSelect: grid_liveGrid_selection_onAfterSelect,
                addformula_onClick: addformula_onClick,
                cell_control_formula_formatter: cell_control_formula_formatter,
                addDialog_onComplete: addDialog_onComplete,
                updateDialog_onComplete: updateDialog_onComplete,
                addAlgo_onComplete: addAlgo_onComplete,
                updateAlgo_onComplete: updateAlgo_onComplete
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskPrestLive.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tProtecLiabDef_liveForm')) {
                var tProtecLiabDef_liveForm = new unieap.ds.DataStore('tProtecLiabDef_liveForm');
                tProtecLiabDef_liveForm.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef_liveForm);
            }

            if (!dataCenter.getDataStore('tSurvvGivepayDef_liveGrid')) {
                var tSurvvGivepayDef_liveGrid = new unieap.ds.DataStore('tSurvvGivepayDef_liveGrid');
                tSurvvGivepayDef_liveGrid.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef");

                dataCenter.addDataStore(tSurvvGivepayDef_liveGrid);
            }

            if (!dataCenter.getDataStore('tObjFormula_live_grid')) {
                var tObjFormula_live_grid = new unieap.ds.DataStore('tObjFormula_live_grid');
                tObjFormula_live_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_live_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addlive"), "onClick", this.addlive_onClick);

            this.connect(unieap.byId("addformula"), "onClick", this.addformula_onClick);

            this.connect(unieap.byId("addDialog"), "onComplete", this.addDialog_onComplete);

            this.connect(unieap.byId("updateDialog"), "onComplete", this.updateDialog_onComplete);

            this.connect(unieap.byId("addAlgo"), "onComplete", this.addAlgo_onComplete);

            this.connect(unieap.byId("updateAlgo"), "onComplete", this.updateAlgo_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            navigateButton.activeNavigateButton("get");

            view.navigator.receiveData("生存给付", function (dc) {
                //险种基本信息
                dataCenter.addDataStore("tInsurtypeBasicInf", dc.getDataStore("tInsurtypeBasicInf"));
                //保障责任信息
                var selectRow = dc.getDataStore("selectRow");
                view.form.setDataStore("form_liveform", selectRow);
                //查询给付项
                view.processor.queryTSurvvGivepayDef(selectRow);
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            })

            dojo.provide("unieap.myLiveFormatter");
            dojo.require("unieap.form.SimpleFormatter");
            dojo.declare("unieap.myLiveFormatter", unieap.form.SimpleFormatter, {

                format: function (value) {
                    var rtn = "";
                    if (value == "0") {
                        rtn = "一次领取";
                    }
                    else if (value != null || value != "") {
                        rtn = value + "月";
                    }

                    return rtn;

                }
            });
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_survv", [{
                CODEVALUE: "S1",
                CODENAME: "生存金"
            }, {
                CODEVALUE: "S2",
                CODENAME: "满期金"
            }, {
                CODEVALUE: "S3",
                CODENAME: "养老金"
            }]);

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:queryTSurvvGivepayDef方法的成功回调。
     *
     */

    function queryTSurvvGivepayDefSuccess(dc) {
        view.grid.setDataStore("grid_liveGrid", dc.getDataStore("queryTSurvvGivepayDef"));
        unieap.byId("grid_live_formula").getBinding().getDataStore().getRowSet().deleteAllRows();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_liveGrid", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delTSurvvGivepayDef(data, "D1#0");
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delTSurvvGivepayDef方法的成功回调。
     *
     */

    function delTSurvvGivepayDefSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示框",
            message: "删除成功"
        });
        view.processor.queryTSurvvGivepayDef(view.form.getDataStore("form_liveform"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = view.grid.getRow("grid_liveGrid", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("updateDialog");
                var prestLive = view.form.getDataStore("form_liveform");

                dialog.dialogData = {
                    "opt": "update",
                    "live": row,
                    "prestLive": prestLive
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:getTObjFormula方法的成功回调。
     *
     */

    function getTObjFormulaSuccess(dc) {
        view.grid.setDataStore("grid_live_formula", dc.getDataStore("getTObjFormula"));
    }
    /**
     * @description:delParamFormulaRelation方法的成功回调。
     *
     */

    function delParamFormulaRelationSuccess(dc) {
        var data = view.grid.getRow("grid_liveGrid");
        var id = data.rowSet.primary[0].survvGivepayId;
        //view.processor.getTObjFormula(id, "1", 1, 4);
        view.processor.getTObjFormula(id, "D1#0");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function delformula(inRowIndex) {
        var data = view.grid.getRow("grid_live_formula", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        var objSeq = data.rowSet.primary[0].objSeq;
                        view.processor.delParamFormulaRelation(objSeq);

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function updateformula(inRowIndex) {
        var row = view.grid.getRow("grid_live_formula", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var selectRow = view.grid.getRow("grid_liveGrid");
                var dialog = unieap.byId("updateAlgo");
                dialog.dialogData = {
                    "selectRow": selectRow,
                    "opt": "live",
                    "row_formulainfo": row,
                    "seq": "update",
                    "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
                };
                dialog.show();
            }
        }
    }

    function addlive_onClick(event) {
        var dialog = unieap.byId("addDialog");
        var prestLive = view.form.getDataStore("form_liveform");
        //dialog传入给付基本信息 添加标识  中的数据
        dialog.dialogData = {
            "prestLive": prestLive,
            "opt": "add"
        };

        dialog.show();
    }

    function cell_control_live_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestLive.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestLive.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_liveGrid_selection_onAfterSelect(inRowIndex) {
        var data = view.grid.getRow("grid_liveGrid", inRowIndex);
        var id = data.rowSet.primary[0].survvGivepayId;
        //view.processor.getTObjFormula(id, "1", 1, 4);
        view.processor.getTObjFormula(id, "D1#0");
    }

    function addformula_onClick(event) {
        var selectRow = view.grid.getRow("grid_liveGrid");

        if (selectRow) {
            var dialog = unieap.byId("addAlgo");
            dialog.dialogData = {
                "selectRow": selectRow,
                "opt": "live",
                "seq": "add",
                "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
            };
            dialog.show();

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条生存给付数据！'
            })
        }


    }

    function cell_control_formula_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestLive.updateformula('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestLive.delformula('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function addDialog_onComplete(returnObj) {
        view.processor.queryTSurvvGivepayDef(view.form.getDataStore("form_liveform"));
    }

    function updateDialog_onComplete(returnObj) {
        view.processor.queryTSurvvGivepayDef(view.form.getDataStore("form_liveform"));
    }

    function addAlgo_onComplete(returnObj) {
        var data = view.grid.getRow("grid_liveGrid");
        var id = data.rowSet.primary[0].survvGivepayId;
        //view.processor.getTObjFormula(id, "1", 1, 4);
        view.processor.getTObjFormula(id, "D1#0");
    }

    function updateAlgo_onComplete(returnObj) {
        var data = view.grid.getRow("grid_liveGrid");
        var id = data.rowSet.primary[0].survvGivepayId;
        //view.processor.getTObjFormula(id, "1", 1, 4);
        view.processor.getTObjFormula(id, "D1#0");
    }

    var view = new _factoryabclife.risk.pfRiskPrestLive.View();
    view.init();

    return view;
})