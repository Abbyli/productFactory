/**
 * 组合显示页面
 * @author Administrator
 * @creationTime 2016-11-11 09:34:36
 * @modificationTime 2016-12-26 11:18:03
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfCombo", function () {

    var refreshDefer = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfCombo.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryComboSuccess: queryComboSuccess,
                delComboSuccess: delComboSuccess,
                del: del,
                update: update,
                goComboDetail: goComboDetail,
                combineCalSuccess: combineCalSuccess,
                testCalSuccess: testCalSuccess,
                submitComboSuccess: submitComboSuccess,
                combo_query_onClick: combo_query_onClick,
                button1_onClick: button1_onClick,
                combo_add_onClick: combo_add_onClick,
                submitCombo_onClick: submitCombo_onClick,
                cell_comboCode_formatter: cell_comboCode_formatter,
                cell_control_formatter: cell_control_formatter,
                grid_comboInf_binding_rpc: grid_comboInf_binding_rpc,
                combo_dialog_onComplete: combo_dialog_onComplete,
                refreshDefer: refreshDefer
            });

            this.processor = new _factoryabclife.combo.pfCombo.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_form')) {
                var tComboInf_form = new unieap.ds.DataStore('tComboInf_form');
                tComboInf_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_form);
            }

            if (!dataCenter.getDataStore('tComboInf_grid')) {
                var tComboInf_grid = new unieap.ds.DataStore('tComboInf_grid');
                tComboInf_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_grid);
            }

            if (!dataCenter.getDataStore('policyDTO_combo')) {
                var policyDTO_combo = new unieap.ds.DataStore('policyDTO_combo');
                policyDTO_combo.setRowSetName("com.neusoft.abclife.productfactory.dto.PolicyDTO");

                dataCenter.addDataStore(policyDTO_combo);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("combo_query"), "onClick", this.combo_query_onClick);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("combo_add"), "onClick", this.combo_add_onClick);

            this.connect(unieap.byId("submitCombo"), "onClick", this.submitCombo_onClick);

            this.connect(unieap.byId("combo_dialog"), "onComplete", this.combo_dialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            refreshDefer = new dojo.Deferred();
            refreshDefer.addCallback(function () {
                view.navigator._getNavigatorContainer().resizeContainer();
            });

            view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");

            view.navigator.onComplete("返回", function (dc) {
                view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");

            });
        }


    });
    /**
     * @description:queryCombo方法的成功回调。
     *
     */

    function queryComboSuccess(dc) {
        var result = dc.getDataStore("getComboInf");
        view.grid.setDataStore("grid_comboInf", result);
    }
    /**
     * @description:delCombo方法的成功回调。
     *
     */

    function delComboSuccess(dc) {
        view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(rowIndex) {
        var selectRow = view.grid.getRow("grid_comboInf", rowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    view.processor.delCombo(selectRow);
                }
            }
        });
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(rowIndex) {
        var selectRow = view.grid.getRow("grid_comboInf", rowIndex);
        var xdialog = unieap.byId("combo_dialog");
        xdialog.dialogData = {
            "opt": "update",
            "row": selectRow
        };
        xdialog.title = "修改组合";
        xdialog.show();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function goComboDetail(inRowIndex) {
        var selectRow = view.grid.getRow("grid_comboInf", inRowIndex);
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore("comboInf", selectRow);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboChoose", "选择险种", dc);
    }
    /**
     * @description:combineCal方法的成功回调。
     *
     */

    function combineCalSuccess(dc) {
        var a = dc.getDataStore("calCombo");
        alert(a);
    }
    /**
     * @description:testCal方法的成功回调。
     *
     */

    function testCalSuccess(dc) {
        unieap.debug(dc.getDataStore("comboCal"));
    }
    /**
     * @description:submitCombo方法的成功回调。
     *
     */

    function submitComboSuccess(dc) {
        view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");
    }

    function combo_query_onClick(event) {
        view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");
    }

    function button1_onClick(event) {
        var policyDTO = new unieap.ds.DataStore("policyDTO", [{
            amnt: "10000",
            insurtypeCode: "",
            pricingLiabCode: "",
            payIntv: "0",
            beginYear: "",
            endYear: "",
            minAmount: "",
            maxAmount: "",
            prem: "10",
            mult: "5",
            amnt: "1000000",
            riskId: "1",
            feeType: "",
            unit: "1",
            sex: "1",
            appAge: "18",
            insuYear: "11",
            payEndYear: "11",
            insYear: "1",
            birthday: "19920101",
            bdsxr: "20140901",
            days: "100"
        }]); //10.10.69.25


        policyDTO.rowSetName = "com.neusoft.abclife.productfactory.dto.PolicyDTO";
        //view.processor.combineCal("C077", "2", "52", "SPLIT", "", "", policyDTO);
        view.processor.testCal("120", policyDTO);
    }

    function combo_add_onClick(event) {
        var dialog = unieap.byId("combo_dialog");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增组合";
        dialog.show();
    }

    function submitCombo_onClick(event) {
        var data = view.grid.getRow("grid_comboInf");
        if (data) {
            view.processor.submitCombo(data);
        }
        else {
            MessageBox.alert({
                title: "提示",
                message: "请选择险种"
            });
        }
    }

    function cell_comboCode_formatter(inValue, inRowIndex) {
        return "<a href=\"javascript:;\" onclick=\"pfCombo.goComboDetail('" + inRowIndex + "')\" >" + inValue + "</a>";
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfCombo.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfCombo.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_comboInf_binding_rpc(store, load) {
        view.processor.queryCombo(view.form.getDataStore("form_comboInf"), store.getPageNumber(), store.getPageSize());
    }

    function combo_dialog_onComplete(returnObj) {
        view.processor.queryCombo(view.form.getDataStore("form_comboInf"), "1", "10");
    }

    var view = new _factoryabclife.combo.pfCombo.View();
    view.init();

    return view;
})