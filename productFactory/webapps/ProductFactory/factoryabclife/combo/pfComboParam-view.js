/**
 * 组合参数
 * @author Administrator
 * @creationTime 2016-11-16 11:30:37
 * @modificationTime 2016-11-17 15:22:53
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboParam", function () {

    var type = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboParam_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboParam.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryInsurParamsSuccess: queryInsurParamsSuccess,
                queryComboParamSuccess: queryComboParamSuccess,
                saveSuccess: saveSuccess,
                save1_onClick: save1_onClick,
                tabPane1_onShow: tabPane1_onShow,
                save2_onClick: save2_onClick,
                tabPane2_onShow: tabPane2_onShow,
                save3_onClick: save3_onClick,
                tabPane3_onShow: tabPane3_onShow,
                type: type
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.combo.pfComboParam.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_param_form')) {
                var tComboInf_param_form = new unieap.ds.DataStore('tComboInf_param_form');
                tComboInf_param_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_param_form);
            }

            if (!dataCenter.getDataStore('tProductParamDef_grid_insur')) {
                var tProductParamDef_grid_insur = new unieap.ds.DataStore('tProductParamDef_grid_insur');
                tProductParamDef_grid_insur.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductParamDef");

                dataCenter.addDataStore(tProductParamDef_grid_insur);
            }

            if (!dataCenter.getDataStore('tProductParamDef_grid_payEnd')) {
                var tProductParamDef_grid_payEnd = new unieap.ds.DataStore('tProductParamDef_grid_payEnd');
                tProductParamDef_grid_payEnd.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductParamDef");

                dataCenter.addDataStore(tProductParamDef_grid_payEnd);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("save1"), "onClick", this.save1_onClick);

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("save2"), "onClick", this.save2_onClick);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("save3"), "onClick", this.save3_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合参数定义", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);

                unieap.byId("grid_insur").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("grid_payEnd").getBinding().getDataStore().getRowSet().deleteAllRows();

                unieap.byId("tabContainer1").showTab("tabPane1", true);
                unieap.byId("tabPane1").onShow();

            })

            navigateButton.activeNavigateButton("comboParam");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_dataUnit", [{
                CODEVALUE: "Y",
                CODENAME: "年"
            }, {
                CODEVALUE: "A",
                CODENAME: "岁"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_freq", [{
                CODEVALUE: "0",
                CODENAME: "一次交清"
            }, {
                CODEVALUE: "12",
                CODENAME: "年交"
            }, {
                CODEVALUE: "6",
                CODENAME: "半年交"
            }, {
                CODEVALUE: "3",
                CODENAME: "季交"
            }, {
                CODEVALUE: "1",
                CODENAME: "月交"
            }, {
                CODEVALUE: "-1",
                CODENAME: "不定期"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryInsurParams方法的成功回调。
     *
     */

    function queryInsurParamsSuccess(dc) {
        if (type == "02") {
            view.grid.setDataStore("grid_insur", dc.getDataStore("queryComboParam"));
        }
        if (type == "01") {
            view.grid.setDataStore("grid_payEnd", dc.getDataStore("queryComboParam"));
        }

        view.processor.queryComboParam(dataCenter.getDataStore("comboInf"), type);
    }
    /**
     * @description:queryComboParam方法的成功回调。
     *
     */

    function queryComboParamSuccess(dc) {
        var params = null;
        var count = 0;
        if (type == "02") {
            params = view.grid.getDataStore("grid_insur");
        }
        if (type == "01") {
            params = view.grid.getDataStore("grid_payEnd");
        }

        var result = dc.getDataStore("queryComboParams");
        if (params != null) {
            count = params.getRowSet().getRowCount();
        }
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < result.getRowSet().getRowCount(); j++) {
                if (params.getRowSet().getRow(i).getItemValue("paramVal") == result.getRowSet().getRow(j).getItemValue("paramVal") &&
                    params.getRowSet().getRow(i).getItemValue("paramUnit") == result.getRowSet().getRow(j).getItemValue("paramUnit")) {
                    if (type == "02") {
                        unieap.byId("grid_insur").getManager("SelectionManager").setSelect(i);
                    }
                    if (type == "01") {
                        unieap.byId("grid_payEnd").getManager("SelectionManager").setSelect(i);
                    }

                    break;
                }
            }
        }
        if (type == "04") {
            unieap.byId("checkBoxGroup1").setValue("");
            var count2 = result.getRowSet().getRowCount();
            if (count2 > 0) {
                for (var i = 0; i < count2; i++) {
                    var value = result.rowSet.primary[i].paramVal;
                    if (value == "0") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [0]);
                    }
                    if (value == "12") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [1]);
                    }
                    if (value == "6") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [2]);
                    }
                    if (value == "3") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [3]);
                    }
                    if (value == "1") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [4]);
                    }
                    if (value == "-1") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [5]);
                    }
                }
            }
        }
    }
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示",
            message: "保存成功"
        });
    }

    function save1_onClick(event) {
        var comboInsur = view.grid.getRows("grid_insur");
        var comboInf = dataCenter.getDataStore("comboInf");
        view.processor.save(comboInsur, comboInf, "02");


        //unieap.byId("grid_insur").getManager("SelectionManager").setSelect(1);
    }

    function tabPane1_onShow(pane) {
        type = "02";
        view.processor.queryInsurParams(view.form.getDataStore("form_comboInf"), type);
    }

    function save2_onClick(event) {
        var comboInsur = view.grid.getRows("grid_payEnd");
        var comboInf = dataCenter.getDataStore("comboInf");
        view.processor.save(comboInsur, comboInf, "01");
    }

    function tabPane2_onShow(pane) {
        type = "01";
        view.processor.queryInsurParams(dataCenter.getDataStore("comboInf"), type);
    }

    function save3_onClick(event) {
        type = "04"
        var pay = unieap.byId("checkBoxGroup1").getValue();
        if (pay != "") {
            var comboId = dataCenter.getDataStore("comboInf").rowSet.primary[0].comboId;
            var param = new unieap.ds.DataStore();
            param.rowSetName = "com.neusoft.abclife.productfactory.entity.TProductParamDef";

            var rowset = new unieap.ds.RowSet();
            var list = pay.split(",");
            for (var i = 0; i < list.length; i++) {
                var data = {
                    entityId: comboId,
                    ascribHierar: "04",
                    paramType: type,
                    paramVal: list[i]
                };
                rowset.addRow(data);
            }


            param.setRowSet(rowset);
            view.processor.save(param, dataCenter.getDataStore("comboInf"), type);
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示框",
                message: "请选择数据"
            });
        }
    }

    function tabPane3_onShow(pane) {
        type = "04";
        view.processor.queryComboParam(dataCenter.getDataStore("comboInf"), type);
    }

    var view = new _factoryabclife.combo.pfComboParam.View();
    view.init();

    return view;
})