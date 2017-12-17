/**
 * 组合精算数据
 * @author Administrator
 * @creationTime 2016-12-07 14:50:19
 * @modificationTime 2016-12-08 11:12:28
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboRateManage", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboRateManage_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboRateManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryObjRateSuccess: queryObjRateSuccess,
                del: del,
                delRiskRateSuccess: delRiskRateSuccess,
                btn_Add_onClick: btn_Add_onClick,
                btn_upload_onClick: btn_upload_onClick,
                button1_onClick: button1_onClick,
                btn_export_onClick: btn_export_onClick,
                cell_control_formatter: cell_control_formatter,
                xdialog1_onComplete: xdialog1_onComplete
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.combo.pfComboRateManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_rateManage')) {
                var tComboInf_rateManage = new unieap.ds.DataStore('tComboInf_rateManage');
                tComboInf_rateManage.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_rateManage);
            }

            if (!dataCenter.getDataStore('tObjRate_combo')) {
                var tObjRate_combo = new unieap.ds.DataStore('tObjRate_combo');
                tObjRate_combo.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRate");

                dataCenter.addDataStore(tObjRate_combo);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btn_Add"), "onClick", this.btn_Add_onClick);

            this.connect(unieap.byId("btn_upload"), "onClick", this.btn_upload_onClick);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("btn_export"), "onClick", this.btn_export_onClick);

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合精算数据定义", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.queryObjRate(comboInf)
            })
            navigateButton.activeNavigateButton("comboRateManage");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore([{
                CODEVALUE: "RT_P",
                CODENAME: "保费费率表"
            }, {
                CODEVALUE: "RT_A",
                CODENAME: "保额费率表"
            }]);

            dataCenter.addDataStore("ds_dimension", ds);
        }

    });
    /**
     * @description:queryObjRate方法的成功回调。
     *
     */

    function queryObjRateSuccess(dc) {
        view.grid.setDataStore("grid_comboRateManage", dc.getDataStore("getTObjRate"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var selectRow = view.grid.getRow("grid_comboRateManage", inRowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value) {
                    view.processor.delRiskRate(selectRow);
                }
            }
        });
    }
    /**
     * @description:delRiskRate方法的成功回调。
     *
     */

    function delRiskRateSuccess(dc) {
        view.processor.queryObjRate(dataCenter.getDataStore("comboInf"));
    }

    function btn_Add_onClick(event) {
        var comboInf = view.form.getDataStore("form_comboInf");

        var xdialog1 = unieap.byId("xdialog1");
        xdialog1.dialogData = {
            "insurtypeCode": comboInf.getRowSet().getRow(0).getItemValue("comboCode"),
            "verNo": comboInf.getRowSet().getRow(0).getItemValue("comboVer"),
            "pricingLiabCode": "",
            "opt": "add"
        };
        xdialog1.show();


    }

    function btn_upload_onClick(event) {
        var selectRow = view.grid.getRow("grid_comboRateManage");
        if (selectRow == null) {
            MessageBox.alert({
                title: "提示",
                message: '请选择一条数据！'
            })
        }
        else {
            var xdialog2 = unieap.byId("xdialog2");
            xdialog2.dialogData = {
                "selectRow": selectRow
            };
            xdialog2.show();

        }
    }

    function button1_onClick(event) {
        var selectRow = view.grid.getRow("grid_comboRateManage");
        if (selectRow == null) {
            MessageBox.alert({
                title: "提示",
                message: '请选择一条数据！'
            })
        }
        else {
            view.processor.exportRateTable(selectRow);

        }
    }

    function btn_export_onClick(event) {
        var selectRow = view.grid.getRow("grid_comboRateManage");
        if (selectRow == null) {
            MessageBox.alert({
                title: "提示",
                message: '请选择一条数据！'
            })
        }
        else {
            view.processor.exportModel(selectRow);

        }
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfComboRateManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.queryObjRate(dataCenter.getDataStore("comboInf"));
    }

    var view = new _factoryabclife.combo.pfComboRateManage.View();
    view.init();

    return view;
})