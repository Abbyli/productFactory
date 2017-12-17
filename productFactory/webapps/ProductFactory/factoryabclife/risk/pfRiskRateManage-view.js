/**
 * 精算数据
 * @author Administrator
 * @creationTime 2016-07-12 10:13:22
 * @modificationTime 2016-09-30 14:16:49
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskRateManage", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskRateManage_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskRateManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getPfInsurtypePrestSuccess: getPfInsurtypePrestSuccess,
                queryRiskRateByIdSuccess: queryRiskRateByIdSuccess,
                del: del,
                delRiskRateSuccess: delRiskRateSuccess,
                xdialog1_onComplete: xdialog1_onComplete,
                pricingLiabCode__pricingliab_onChange: pricingLiabCode__pricingliab_onChange,
                btn_Add_onClick: btn_Add_onClick,
                btn_upload_onClick: btn_upload_onClick,
                button2_onClick: button2_onClick,
                btn_export_onClick: btn_export_onClick,
                cell_control__objRate_formatter: cell_control__objRate_formatter
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskRateManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_ratemanage_form')) {
                var tInsurtypeBasicInf_ratemanage_form = new unieap.ds.DataStore('tInsurtypeBasicInf_ratemanage_form');
                tInsurtypeBasicInf_ratemanage_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_ratemanage_form);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_ratemanage_form')) {
                var tPricingLiabDef_ratemanage_form = new unieap.ds.DataStore('tPricingLiabDef_ratemanage_form');
                tPricingLiabDef_ratemanage_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_ratemanage_form);
            }

            if (!dataCenter.getDataStore('tObjRate_grid')) {
                var tObjRate_grid = new unieap.ds.DataStore('tObjRate_grid');
                tObjRate_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRate");

                dataCenter.addDataStore(tObjRate_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

            this.connect(unieap.byId("pricingLiabCode__pricingliab"), "onChange", this.pricingLiabCode__pricingliab_onChange);

            this.connect(unieap.byId("btn_Add"), "onClick", this.btn_Add_onClick);

            this.connect(unieap.byId("btn_upload"), "onClick", this.btn_upload_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("btn_export"), "onClick", this.btn_export_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            navigateButton.activeNavigateButton("ratemanage");

            view.navigator.receiveData("险种精算数据", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);
                //清空数据定价信息
                unieap.byId("form_pricingliab").clear();
                unieap.byId("form_pricingliab").getBinding().getDataStore().getRowSet().clear(0);

                unieap.byId("grid_objRate").getBinding().getDataStore().getRowSet().deleteAllRows();

                //查询定价信息
                view.processor.getPfInsurtypePrest(tInsurtypeBasicInf);
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });

        },
        page_init: function () {
            var ds_rateType = new unieap.ds.DataStore("ds_rateType", [{
                    CODEVALUE: "RT_P",
                    CODENAME: "保费费率表"
                }, {
                    CODEVALUE: "RT_A",
                    CODENAME: "保额费率表"
                }, {
                    CODENAME: "现价表",
                    CODEVALUE: "V"
                }, {
                    CODENAME: "风险扣费表",
                    CODEVALUE: "EXP"
                }, {
                    CODENAME: "健康加费表",
                    CODEVALUE: "HL"
                },
                //{CODENAME:"职业加费",CODEVALUE:"JOB"}
                {
                    CODEVALUE: "PU",
                    CODENAME: "减额缴清表"
                }
            ]);
            dataCenter.addDataStore(ds_rateType);

        }

    });
    /**
     * @description:getPfInsurtypePrest方法的成功回调。
     *
     */

    function getPfInsurtypePrestSuccess(dc) {
        var ds = dc.getDataStore("insurtyprestduty");
        unieap.byId("pricingLiabCode__pricingliab").getDataProvider().setDataStore(ds);
        var count = ds.getRowSet().getRowCount();
        if (count > 0) {
            var value = ds.rowSet.primary[0].pricingLiabName;
            unieap.byId("pricingLiabCode__pricingliab").setValue(value);
            unieap.byId("pricingLiabCode__pricingliab").onChange(value);
        }
    }
    /**
     * @description:queryRiskRateById方法的成功回调。
     *
     */

    function queryRiskRateByIdSuccess(dc) {
        var ds = dc.getDataStore("rtnRiskRates");
        view.grid.setDataStore("grid_objRate", ds);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(rowIndex) {
        var selectRow = view.grid.getRow("grid_objRate", rowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
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
        var insurtypeCode = unieap.byId("insurtypeCode").getValue();
        var verNo = unieap.byId("verNo").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode__pricingliab").getText();

        view.processor.queryRiskRateById(insurtypeCode, verNo, pricingLiabCode);
    }

    function xdialog1_onComplete(returnObj) {
        var insurtypeCode = unieap.byId("insurtypeCode").getValue();
        var verNo = unieap.byId("verNo").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode__pricingliab").getText();

        view.processor.queryRiskRateById(insurtypeCode, verNo, pricingLiabCode);

    }

    function pricingLiabCode__pricingliab_onChange(value) {
        unieap.byId("pricingLiabName__pricingliab").setValue(value);

        var insurtypeCode = unieap.byId("insurtypeCode").getValue();
        var verNo = unieap.byId("verNo").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode__pricingliab").getText();

        if (value != null && value != "") {

            view.processor.queryRiskRateById(insurtypeCode, verNo, pricingLiabCode);
        }
        else {

            unieap.byId("grid_objRate").getBinding().getDataStore().getRowSet().deleteAllRows();
        }

    }

    function btn_Add_onClick(event) {
        var insurtypeCode = unieap.byId("insurtypeCode").getValue();
        var verNo = unieap.byId("verNo").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode__pricingliab").getText();

        if (pricingLiabCode != null && pricingLiabCode != "") {
            var xdialog1 = unieap.byId("xdialog1");
            xdialog1.dialogData = {
                "insurtypeCode": insurtypeCode,
                "verNo": verNo,
                "pricingLiabCode": pricingLiabCode,
                "opt": "add"
            };
            xdialog1.show();

        }
        else {
            MessageBox.alert({
                title: "提示",
                message: "请选择定价责任！"
            });
        }

    }

    function btn_upload_onClick(event) {
        var selectRow = view.grid.getRow("grid_objRate");
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

    function button2_onClick(event) {
        var selectRow = view.grid.getRow("grid_objRate");
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
        var selectRow = view.grid.getRow("grid_objRate");
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

    function cell_control__objRate_formatter(inValue, inRowIndex) {
        //var updateBtn = "<img src=\"../../ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png \" "+
        //		"style=\"margin-right:10px; cursor:pointer\" title=\"修改\" "+
        //		"onclick=\"\" />";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskRateManage.del('" + inRowIndex + "')\" />";

        //return updateBtn+delBtn;
        return delBtn;
    }

    var view = new _factoryabclife.risk.pfRiskRateManage.View();
    view.init();

    return view;
})