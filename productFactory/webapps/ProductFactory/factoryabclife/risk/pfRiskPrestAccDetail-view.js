/**
 *
 * @author Administrator
 * @creationTime 2016-07-28 14:36:23
 * @modificationTime 2016-09-20 10:58:03
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestAccDetail", function () {

    var DC = new unieap.ds.DataCenter();
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPrestAccDetail_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestAccDetail.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAccDetailSuccess: getAccDetailSuccess,
                update: update,
                getObjFormulasSuccess: getObjFormulasSuccess,
                updateformula: updateformula,
                delformula: delformula,
                delParamFormulaRelationSuccess: delParamFormulaRelationSuccess,
                addDefautValueSuccess: addDefautValueSuccess,
                del: del,
                delAccDetailSuccess: delAccDetailSuccess,
                form_accDetail_form_queryButton_onClick: form_accDetail_form_queryButton_onClick,
                btndefault_onClick: btndefault_onClick,
                btnAdd_onClick: btnAdd_onClick,
                cell_control_accdetail_formatter: cell_control_accdetail_formatter,
                grid_addDetail_binding_rpc: grid_addDetail_binding_rpc,
                grid_addDetail_selection_onAfterSelect: grid_addDetail_selection_onAfterSelect,
                addFormula_onClick: addFormula_onClick,
                cell_control_formula_formatter: cell_control_formula_formatter,
                addDialog_onComplete: addDialog_onComplete,
                updateDialog_onComplete: updateDialog_onComplete,
                addAlgo_onComplete: addAlgo_onComplete,
                updateAlgo_onComplete: updateAlgo_onComplete,
                DC: DC
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskPrestAccDetail.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tClaimPayItemDetail_accdetail_grid')) {
                var tClaimPayItemDetail_accdetail_grid = new unieap.ds.DataStore('tClaimPayItemDetail_accdetail_grid');
                tClaimPayItemDetail_accdetail_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail");

                dataCenter.addDataStore(tClaimPayItemDetail_accdetail_grid);
            }

            if (!dataCenter.getDataStore('tClaimGivepayDef_accDetail_form')) {
                var tClaimGivepayDef_accDetail_form = new unieap.ds.DataStore('tClaimGivepayDef_accDetail_form');
                tClaimGivepayDef_accDetail_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimGivepayDef");

                dataCenter.addDataStore(tClaimGivepayDef_accDetail_form);
            }

            if (!dataCenter.getDataStore('tObjFormula_accdetail')) {
                var tObjFormula_accdetail = new unieap.ds.DataStore('tObjFormula_accdetail');
                tObjFormula_accdetail.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_accdetail);
            }

            if (!dataCenter.getDataStore('tClaimPayItemDetail_accDetail_form')) {
                var tClaimPayItemDetail_accDetail_form = new unieap.ds.DataStore('tClaimPayItemDetail_accDetail_form');
                tClaimPayItemDetail_accDetail_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail");

                dataCenter.addDataStore(tClaimPayItemDetail_accDetail_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form_accDetail_form_queryButton"), "onClick", this.form_accDetail_form_queryButton_onClick);

            this.connect(unieap.byId("btndefault"), "onClick", this.btndefault_onClick);

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("addFormula"), "onClick", this.addFormula_onClick);

            this.connect(unieap.byId("addDialog"), "onComplete", this.addDialog_onComplete);

            this.connect(unieap.byId("updateDialog"), "onComplete", this.updateDialog_onComplete);

            this.connect(unieap.byId("addAlgo"), "onComplete", this.addAlgo_onComplete);

            this.connect(unieap.byId("updateAlgo"), "onComplete", this.updateAlgo_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("理赔费用明细", function (dc) {
                dataCenter.addDataStore("tInsurtypeBasicInf", dc.getDataStore("tInsurtypeBasicInf"));
                view.form.setDataStore("form_claim", dc.getDataStore("data"));

                unieap.byId("form_accDetail_form").clear();
                unieap.byId("form_accDetail_form").getBinding().getDataStore().getRowSet().clear(0);

                view.processor.getAccDetail(dc.getDataStore("data"), view.form.getDataStore("form_accDetail_form"), 1, 10);
                unieap.byId("adaptivePane3").hide();
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("get");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_type_acc", [{
                CODEVALUE: "00",
                CODENAME: "取默认值"
            }, {
                CODEVALUE: "01",
                CODENAME: "录入"
            }, {
                CODEVALUE: "02",
                CODENAME: "使用计算公式"
            }]);


            DC.addDataStore("ds_type_acc", ds);
            dataCenter.append(DC);

        }

    });
    /**
     * @description:getAccDetail方法的成功回调。
     *
     */

    function getAccDetailSuccess(dc) {
        view.grid.setDataStore("grid_addDetail", dc.getDataStore("getAccDetail"));
        unieap.byId("grid_accdetail_formula").getBinding().getDataStore().getRowSet().deleteAllRows();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = view.grid.getRow("grid_addDetail", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("updateDialog");
                dialog.dialogData = {
                    "dc": DC,
                    "opt": "update",
                    "claim": view.form.getDataStore("form_claim"),
                    "row": row
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:getObjFormulas方法的成功回调。
     *
     */

    function getObjFormulasSuccess(dc) {
        view.grid.setDataStore("grid_accdetail_formula", dc.getDataStore("getTObjFormula"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function updateformula(inRowIndex) {
        var row = view.grid.getRow("grid_accdetail_formula", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var selectRow = view.grid.getRow("grid_addDetail");
                var dialog = unieap.byId("updateAlgo");
                dialog.dialogData = {
                    "selectRow": selectRow,
                    "opt": "accDetail",
                    "row_formulainfo": row,
                    "seq": "update",
                    "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf"),
                    "claim": view.form.getDataStore("form_claim")
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function delformula(inRowIndex) {
        var data = view.grid.getRow("grid_accdetail_formula", inRowIndex);
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
                        view.processor.delParamFormulaRelation(objSeq)

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delParamFormulaRelation方法的成功回调。
     *
     */

    function delParamFormulaRelationSuccess(dc) {
        var row = view.grid.getRow("grid_addDetail");
        var id = row.rowSet.primary[0].payItemDetailId;
        view.processor.getObjFormulas(id, "D3");
    }
    /**
     * @description:addDefautValue方法的成功回调。
     *
     */

    function addDefautValueSuccess(dc) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_addDetail", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delAccDetail(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delAccDetail方法的成功回调。
     *
     */

    function delAccDetailSuccess(dc) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), 1, 10);
        unieap.byId("grid_accdetail_formula").getBinding().getDataStore().getRowSet().deleteAllRows();
    }

    function form_accDetail_form_queryButton_onClick(event) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), 1, 10);
    }

    function btndefault_onClick(event) {
        view.processor.addDefautValue(view.form.getDataStore("form_claim"));
    }

    function btnAdd_onClick(event) {
        var dialog = unieap.byId("addDialog");
        dialog.dialogData = {
            "dc": DC,
            "opt": "add",
            "claim": view.form.getDataStore("form_claim")
        };
        dialog.show();
    }

    function cell_control_accdetail_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestAccDetail.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestAccDetail.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_addDetail_binding_rpc(store, load) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), store.getPageNumber(), store.getPageSize());
    }

    function grid_addDetail_selection_onAfterSelect(inRowIndex) {
        var row = view.grid.getRow("grid_addDetail", inRowIndex);
        if (row.rowSet.primary[0].claimPayCalcWay == "02") {

            unieap.byId("adaptivePane1").setHeight("60%");
            unieap.byId("adaptivePane3").setHeight("40%");
            unieap.byId("adaptivePane3").show();
            var id = row.rowSet.primary[0].payItemDetailId;
            view.processor.getObjFormulas(id, "D3");
        }
        else {
            unieap.byId("adaptivePane3").hide();
        }

    }

    function addFormula_onClick(event) {
        var selectRow = view.grid.getRow("grid_addDetail");

        if (selectRow) {
            if (selectRow.rowSet.primary[0].claimPayCalcWay == "02") {
                var dialog = unieap.byId("addAlgo");
                dialog.dialogData = {
                    "selectRow": selectRow,
                    "opt": "accDetail",
                    "seq": "add",
                    "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf"),
                    "claim": view.form.getDataStore("form_claim")
                };
                dialog.show();
            }
            else {
                MessageBox.alert({
                    title: '提示',
                    message: '请选择一条使用计算公式数据！'
                })
            }


        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条账户明细数据！'
            })
        }
    }

    function cell_control_formula_formatter(inValue, inRowIndex) {
        var updateBtn = "<img src=\"../../ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png \" " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestAccDetail.updateformula('" + inRowIndex + "')\" />";

        var delBtn = "<img src=\"../../ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png \" " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestAccDetail.delformula('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function addDialog_onComplete(returnObj) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), 1, 10);
    }

    function updateDialog_onComplete(returnObj) {
        view.processor.getAccDetail(view.form.getDataStore("form_claim"), view.form.getDataStore("form_accDetail_form"), 1, 10);

    }

    function addAlgo_onComplete(returnObj) {
        var row = view.grid.getRow("grid_addDetail");
        var id = row.rowSet.primary[0].payItemDetailId;
        view.processor.getObjFormulas(id, "D3");
    }

    function updateAlgo_onComplete(returnObj) {
        var row = view.grid.getRow("grid_addDetail");

        if (row) {
            var id = row.rowSet.primary[0].payItemDetailId;
            view.processor.getObjFormulas(id, "D3");
        }

    }

    var view = new _factoryabclife.risk.pfRiskPrestAccDetail.View();
    view.init();

    return view;
})