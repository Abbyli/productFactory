/**
 *
 * @author Administrator
 * @creationTime 2016-10-11 15:59:07
 * @modificationTime 2016-12-27 09:59:32
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPricingInf", function () {

    var A1 = null;

    var A2 = null;

    var B3 = null;

    var C1 = null;

    var C2 = null;

    var feeresult = null;

    var liabReslut = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPricingInf_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskPricingInf.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getPricingLiabSuccess: getPricingLiabSuccess,
                getFormulasSuccess: getFormulasSuccess,
                getInsurFeeSuccess: getInsurFeeSuccess,
                getFeeLiabSuccess: getFeeLiabSuccess,
                cell_riskPay_formatter: cell_riskPay_formatter,
                cell_jobFee_formatter: cell_jobFee_formatter,
                cell_healthFee_formatter: cell_healthFee_formatter,
                A1: A1,
                A2: A2,
                B3: B3,
                C1: C1,
                C2: C2,
                feeresult: feeresult,
                liabReslut: liabReslut
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfRiskPricingInf.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_check_pricing_form')) {
                var tInsurtypeBasicInf_check_pricing_form = new unieap.ds.DataStore('tInsurtypeBasicInf_check_pricing_form');
                tInsurtypeBasicInf_check_pricing_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_check_pricing_form);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_pricing_grid')) {
                var tPricingLiabDef_pricing_grid = new unieap.ds.DataStore('tPricingLiabDef_pricing_grid');
                tPricingLiabDef_pricing_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_pricing_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种定价责任", function (dc) {
                //获取险种基本信息

                unieap.byId("grid1").getBinding().getDataStore().getRowSet().deleteAllRows();

                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                //执行翻页方法
                view.processor.getPricingLiab(tInsurtypeBasicInf, 1, 10);
                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("duty");
        },
        page_init: function () {
            //计算方向默认dataStore
            var ds = new unieap.ds.DataStore("ds_direct", [{
                CODENAME: "保费算保额",
                CODEVALUE: "P"
            }, {
                CODENAME: "保额算保费",
                CODEVALUE: "G"
            }, {
                CODENAME: "其他算法",
                CODEVALUE: "A"
            }, {
                CODENAME: "录入保费保额",
                CODEVALUE: "I"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_choose", [{
                    CODENAME: "必选",
                    CODEVALUE: "0"
                }, {
                    CODENAME: "可选",
                    CODEVALUE: "1"
                }

            ])
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);

            view.processor.getFormulas();
            dataCenter.addDataStore("ds_A1", A1);
            dataCenter.addDataStore("ds_A2", A2);

        }

    });
    /**
     * @description:getPricingLiab方法的成功回调。
     *
     */

    function getPricingLiabSuccess(dc) {
        var result = dc.getDataStore("queryPricingLiabDef");
        view.grid.setDataStore("grid1", result);
        //unieap.byId("grid1").setDataStore(result);			
    }
    /**
     * @description:getFormulas方法的成功回调。
     *
     */

    function getFormulasSuccess(dc) {
        A1 = dc.getDataStore("getFormulaA1");
        A2 = dc.getDataStore("getFormulaA2");
        B3 = dc.getDataStore("getFormulaB3");
        C1 = dc.getDataStore("getFormulaC1");
        C2 = dc.getDataStore("getFormulaC2");
    }
    /**
     * @description:getInsurFee方法的成功回调。
     *
     */

    function getInsurFeeSuccess(dc) {
        feeresult = dc.getDataStore("queryInsurtypeFeeDef");
    }
    /**
     * @description:getFeeLiab方法的成功回调。
     *
     */

    function getFeeLiabSuccess(dc) {
        liabReslut = dc.getDataStore("queryOneLiabFeeDef");
    }

    function cell_riskPay_formatter(inValue, inRowIndex) {
        view.processor.getInsurFee(view.grid.getRow("grid1", inRowIndex));
        var id = feeresult.rowSet.primary[0].feeCalcFormulaId;
        var value = "";
        if (id != null) {
            var count = B3.getRowSet().getRowCount();
            for (var i = 0; i < count; i++) {
                if (id == B3.rowSet.primary[0].id) {
                    value = B3.rowSet.primary[0].memo;
                }
            }
        }

        return value;
    }

    function cell_jobFee_formatter(inValue, inRowIndex) {
        view.processor.getFeeLiab(view.grid.getRow("grid1", inRowIndex), "02");
        var id = liabReslut.rowSet.primary[0].addpremAlgoId;
        var value = "";
        if (id != null) {
            var count = C2.getRowSet().getRowCount();
            for (var i = 0; i < count; i++) {
                if (id == C2.rowSet.primary[0].id) {
                    value = C2.rowSet.primary[0].memo;
                }
            }
        }

        return value;
    }

    function cell_healthFee_formatter(inValue, inRowIndex) {
        view.processor.getFeeLiab(view.grid.getRow("grid1", inRowIndex), "01");
        var id = liabReslut.rowSet.primary[0].addpremAlgoId;
        var value = "";
        if (id != null) {
            var count = C1.getRowSet().getRowCount();
            for (var i = 0; i < count; i++) {
                if (id == C1.rowSet.primary[0].id) {
                    value = C1.rowSet.primary[0].memo;
                }
            }
        }

        return value;
    }

    var view = new _factoryabclife.riskInformation.pfRiskPricingInf.View();
    view.init();

    return view;
})