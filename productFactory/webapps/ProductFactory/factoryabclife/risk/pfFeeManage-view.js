/**
 * 费用管理
 * @author Administrator
 * @creationTime 2016-07-06 09:25:24
 * @modificationTime 2017-02-22 15:37:32
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfFeeManage", function () {

    var feeType = "";

    var insurtypeId = "";

    var insurtypeCode = "";

    var ds_pricingLiab = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfFeeManage_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfFeeManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveRiskFeeManageSuccess: saveRiskFeeManageSuccess,
                queryTFeeRateSuccess: queryTFeeRateSuccess,
                queryTInsurtypeFeeDefSuccess: queryTInsurtypeFeeDefSuccess,
                deleteTFeeRateSuccess: deleteTFeeRateSuccess,
                getFormulafeeSuccess: getFormulafeeSuccess,
                del: del,
                getPricingLiabSuccess: getPricingLiabSuccess,
                clearSuccess: clearSuccess,
                check: check,
                checkRepeat: checkRepeat,
                save1_onClick: save1_onClick,
                clear1_onClick: clear1_onClick,
                add1_onClick: add1_onClick,
                cell_control_fee1_formatter: cell_control_fee1_formatter,
                tabPane1_onShow: tabPane1_onShow,
                save2_onClick: save2_onClick,
                clear2_onClick: clear2_onClick,
                add2_onClick: add2_onClick,
                cell_control_fee2_formatter: cell_control_fee2_formatter,
                tabPane2_onShow: tabPane2_onShow,
                save3_onClick: save3_onClick,
                clear3_onClick: clear3_onClick,
                add3_onClick: add3_onClick,
                cell_control_fee3_formatter: cell_control_fee3_formatter,
                tabPane3_onShow: tabPane3_onShow,
                save4_onClick: save4_onClick,
                clear4_onClick: clear4_onClick,
                add4_onClick: add4_onClick,
                cell_control_fee4_formatter: cell_control_fee4_formatter,
                tabPane4_onShow: tabPane4_onShow,
                save5_onClick: save5_onClick,
                clear5_onClick: clear5_onClick,
                add5_onClick: add5_onClick,
                cell_control_fee5_formatter: cell_control_fee5_formatter,
                tabPane5_onShow: tabPane5_onShow,
                save6_onClick: save6_onClick,
                clear6_onClick: clear6_onClick,
                add6_onClick: add6_onClick,
                cell_control_fee6_formatter: cell_control_fee6_formatter,
                tabPane6_onShow: tabPane6_onShow,
                feeType: feeType,
                insurtypeId: insurtypeId,
                insurtypeCode: insurtypeCode,
                ds_pricingLiab: ds_pricingLiab
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfFeeManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_form')) {
                var tInsurtypeBasicInf_form = new unieap.ds.DataStore('tInsurtypeBasicInf_form');
                tInsurtypeBasicInf_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_form);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form1')) {
                var tInsurtypeFeeDef_form1 = new unieap.ds.DataStore('tInsurtypeFeeDef_form1');
                tInsurtypeFeeDef_form1.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form1);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form2')) {
                var tInsurtypeFeeDef_form2 = new unieap.ds.DataStore('tInsurtypeFeeDef_form2');
                tInsurtypeFeeDef_form2.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form2);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form3')) {
                var tInsurtypeFeeDef_form3 = new unieap.ds.DataStore('tInsurtypeFeeDef_form3');
                tInsurtypeFeeDef_form3.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form3);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form4')) {
                var tInsurtypeFeeDef_form4 = new unieap.ds.DataStore('tInsurtypeFeeDef_form4');
                tInsurtypeFeeDef_form4.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form4);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form5')) {
                var tInsurtypeFeeDef_form5 = new unieap.ds.DataStore('tInsurtypeFeeDef_form5');
                tInsurtypeFeeDef_form5.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form5);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef_form6')) {
                var tInsurtypeFeeDef_form6 = new unieap.ds.DataStore('tInsurtypeFeeDef_form6');
                tInsurtypeFeeDef_form6.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef_form6);
            }

            if (!dataCenter.getDataStore('tFeeRate_grid1')) {
                var tFeeRate_grid1 = new unieap.ds.DataStore('tFeeRate_grid1');
                tFeeRate_grid1.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_grid1);
            }

            if (!dataCenter.getDataStore('tFeeRate_grid2')) {
                var tFeeRate_grid2 = new unieap.ds.DataStore('tFeeRate_grid2');
                tFeeRate_grid2.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_grid2);
            }

            if (!dataCenter.getDataStore('tFeeRate_grid3')) {
                var tFeeRate_grid3 = new unieap.ds.DataStore('tFeeRate_grid3');
                tFeeRate_grid3.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_grid3);
            }

            if (!dataCenter.getDataStore('tFeeRate_grid4')) {
                var tFeeRate_grid4 = new unieap.ds.DataStore('tFeeRate_grid4');
                tFeeRate_grid4.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_grid4);
            }

            if (!dataCenter.getDataStore('tFeeRate_gird5')) {
                var tFeeRate_gird5 = new unieap.ds.DataStore('tFeeRate_gird5');
                tFeeRate_gird5.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_gird5);
            }

            if (!dataCenter.getDataStore('tFeeRate_grid6')) {
                var tFeeRate_grid6 = new unieap.ds.DataStore('tFeeRate_grid6');
                tFeeRate_grid6.setRowSetName("com.neusoft.abclife.productfactory.entity.TFeeRate");

                dataCenter.addDataStore(tFeeRate_grid6);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("save1"), "onClick", this.save1_onClick);

            this.connect(unieap.byId("clear1"), "onClick", this.clear1_onClick);

            this.connect(unieap.byId("add1"), "onClick", this.add1_onClick);

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("save2"), "onClick", this.save2_onClick);

            this.connect(unieap.byId("clear2"), "onClick", this.clear2_onClick);

            this.connect(unieap.byId("add2"), "onClick", this.add2_onClick);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("save3"), "onClick", this.save3_onClick);

            this.connect(unieap.byId("clear3"), "onClick", this.clear3_onClick);

            this.connect(unieap.byId("add3"), "onClick", this.add3_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("save4"), "onClick", this.save4_onClick);

            this.connect(unieap.byId("clear4"), "onClick", this.clear4_onClick);

            this.connect(unieap.byId("add4"), "onClick", this.add4_onClick);

            this.connect(unieap.byId("tabPane4"), "onShow", this.tabPane4_onShow);

            this.connect(unieap.byId("save5"), "onClick", this.save5_onClick);

            this.connect(unieap.byId("clear5"), "onClick", this.clear5_onClick);

            this.connect(unieap.byId("add5"), "onClick", this.add5_onClick);

            this.connect(unieap.byId("tabPane5"), "onShow", this.tabPane5_onShow);

            this.connect(unieap.byId("save6"), "onClick", this.save6_onClick);

            this.connect(unieap.byId("clear6"), "onClick", this.clear6_onClick);

            this.connect(unieap.byId("add6"), "onClick", this.add6_onClick);

            this.connect(unieap.byId("tabPane6"), "onShow", this.tabPane6_onShow);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种费用管理", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);
                insurtypeId = tInsurtypeBasicInf.rowSet.primary[0].insurtypeId;
                insurtypeCode = tInsurtypeBasicInf.rowSet.primary[0].insurtypeCode;
                //清空tab页中的数据
                unieap.byId("form_feeDef1").clear();
                unieap.byId("form_feeDef1").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate1").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("form_feeDef2").clear();
                unieap.byId("form_feeDef2").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate2").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("form_feeDef3").clear();
                unieap.byId("form_feeDef3").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate3").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("form_feeDef4").clear();
                unieap.byId("form_feeDef4").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate4").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("form_feeDef5").clear();
                unieap.byId("form_feeDef5").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate5").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("form_feeDef6").clear();
                unieap.byId("form_feeDef6").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_feeRate6").getBinding().getDataStore().getRowSet().deleteAllRows();
                view.processor.getFormulafee();

                //查询该险种下定价（转义用）
                view.processor.getPricingLiab(tInsurtypeBasicInf);
                dataCenter.addDataStore("ds_pricingLiab", ds_pricingLiab);
                //默认展现第一页
                unieap.byId("tabContainer1").showTab("tabPane1", true);
                unieap.byId("tabPane1").onShow();

                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("feemanage");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_freq", [{
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

            var ds1 = new unieap.ds.DataStore("ds_feeOccurCyc", [{
                CODEVALUE: "Y",
                CODENAME: "年"
            }, {
                CODEVALUE: "M",
                CODENAME: "月"
            }, {
                CODEVALUE: "D",
                CODENAME: "日"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);



        }

    });
    /**
     * @description:saveRiskFeeManage方法的成功回调。
     *
     */

    function saveRiskFeeManageSuccess(dc) {
        var info = dc.getParameter("saveRiskFeeManage");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    var tInsurtypeBasicInf = view.form.getDataStore("form_insurtypebasicinf");
                    view.processor.getPricingLiab(tInsurtypeBasicInf);
                    view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
                    view.processor.queryTFeeRate(feeType, insurtypeId);
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:queryTFeeRate方法的成功回调。
     *
     */

    function queryTFeeRateSuccess(dc) {
        var feeRate = dc.getDataStore("queryTFeeRate");

        if (feeRate.rowSet.initialCount > 0) {
            var Type = feeRate.rowSet.primary[0].feeType;

            if (Type == "B1") {

                view.grid.setDataStore("grid_feeRate1", feeRate);
            }
            if (Type == "B2") {

                view.grid.setDataStore("grid_feeRate2", feeRate);
            }
            if (Type == "B3") {

                view.grid.setDataStore("grid_feeRate3", feeRate);
            }
            if (Type == "B4") {

                view.grid.setDataStore("grid_feeRate4", feeRate);
            }
            if (Type == "B5") {

                view.grid.setDataStore("grid_feeRate5", feeRate);
            }
            if (Type == "B6") {

                view.grid.setDataStore("grid_feeRate6", feeRate);
            }
        }
        else {
            if (feeType == "B1") {

                unieap.byId("grid_feeRate1").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B2") {

                unieap.byId("grid_feeRate2").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B3") {

                unieap.byId("grid_feeRate3").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B4") {

                unieap.byId("grid_feeRate4").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B5") {

                unieap.byId("grid_feeRate5").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B6") {

                unieap.byId("grid_feeRate6").getBinding().getDataStore().getRowSet().deleteAllRows();
            }

        }
    }
    /**
     * @description:queryTInsurtypeFeeDef方法的成功回调。
     *
     */

    function queryTInsurtypeFeeDefSuccess(dc) {
        var feeDef = dc.getDataStore("queryTInsurtypeFeeDef");
        if (feeDef.rowSet.initialCount > 0) {
            var Type = feeDef.rowSet.primary[0].feeType;

            if (Type == "B1") {

                view.form.setDataStore("form_feeDef1", feeDef);
            }
            if (Type == "B2") {
                view.form.setDataStore("form_feeDef2", feeDef);
            }
            if (Type == "B3") {
                view.form.setDataStore("form_feeDef3", feeDef);
            }
            if (Type == "B4") {
                view.form.setDataStore("form_feeDef4", feeDef);
            }
            if (Type == "B5") {
                view.form.setDataStore("form_feeDef5", feeDef);
            }
            if (Type == "B6") {
                view.form.setDataStore("form_feeDef6", feeDef);
            }
        }
    }
    /**
     * @description:deleteTFeeRate方法的成功回调。
     *
     */

    function deleteTFeeRateSuccess(dc) {
        //view.processor.queryTFeeRate(feeType, insurtypeId);			
    }
    /**
     * @description:getFormulafee方法的成功回调。
     *
     */

    function getFormulafeeSuccess(dc) {
        unieap.byId("feeCalcFormulaId1").getDataProvider().setDataStore(dc.getDataStore("getFormulaB4"));
        unieap.byId("feeCalcFormulaId2").getDataProvider().setDataStore(dc.getDataStore("getFormulaB7"));
        unieap.byId("feeCalcFormulaId3").getDataProvider().setDataStore(dc.getDataStore("getFormulaB1"));
        unieap.byId("feeCalcFormulaId4").getDataProvider().setDataStore(dc.getDataStore("getFormulaB5"));
        unieap.byId("feeCalcFormulaId5").getDataProvider().setDataStore(dc.getDataStore("getFormulaB8"));
        unieap.byId("feeCalcFormulaId6").getDataProvider().setDataStore(dc.getDataStore("getFormulaB9"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = null;
        if (feeType == "B1") {
            data = view.grid.getRow("grid_feeRate1", inRowIndex);
        }
        else if (feeType == "B2") {
            data = view.grid.getRow("grid_feeRate2", inRowIndex);
        }
        else if (feeType == "B3") {
            data = view.grid.getRow("grid_feeRate3", inRowIndex);
        }
        else if (feeType == "B4") {
            data = view.grid.getRow("grid_feeRate4", inRowIndex);
        }
        else if (feeType == "B5") {
            data = view.grid.getRow("grid_feeRate5", inRowIndex);
        }
        else if (feeType == "B6") {
            data = view.grid.getRow("grid_feeRate6", inRowIndex);
        }


        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        if (data.rowSet.primary[0].id != null) {
                            view.processor.deleteTFeeRate(data);
                        }
                        if (feeType == "B4") {
                            unieap.byId("grid_feeRate1").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate1").getBinding().getRowSet().deleteRow(inRowIndex);
                        }
                        else if (feeType == "B7") {
                            unieap.byId("grid_feeRate2").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate2").getBinding().getRowSet().deleteRow(inRowIndex);
                        }
                        else if (feeType == "B1") {
                            unieap.byId("grid_feeRate3").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate3").getBinding().getRowSet().deleteRow(inRowIndex);
                        }
                        else if (feeType == "B5") {
                            unieap.byId("grid_feeRate4").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate4").getBinding().getRowSet().deleteRow(inRowIndex);
                        }
                        else if (feeType == "B8") {
                            unieap.byId("grid_feeRate5").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate5").getBinding().getRowSet().deleteRow(inRowIndex);
                        }
                        else if (feeType == "B9") {
                            unieap.byId("grid_feeRate6").getManager("RowEditManager").apply();
                            unieap.byId("grid_feeRate6").getBinding().getRowSet().deleteRow(inRowIndex);
                        }

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:getPricingLiab方法的成功回调。
     *
     */

    function getPricingLiabSuccess(dc) {
        ds_pricingLiab = dc.getDataStore("insurtyprestduty");
    }
    /**
     * @description:clear方法的成功回调。
     *
     */

    function clearSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示",
            message: "清空成功"
        });
        if (feeType == "B1") {
            unieap.byId("form_feeDef1").clear();
            unieap.byId("form_feeDef1").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B2") {
            unieap.byId("form_feeDef2").clear();
            unieap.byId("form_feeDef2").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B3") {
            unieap.byId("form_feeDef3").clear();
            unieap.byId("form_feeDef3").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B4") {
            unieap.byId("form_feeDef4").clear();
            unieap.byId("form_feeDef4").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B5") {
            unieap.byId("form_feeDef5").clear();
            unieap.byId("form_feeDef5").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B6") {
            unieap.byId("form_feeDef6").clear();
            unieap.byId("form_feeDef6").getBinding().getDataStore().getRowSet().clear(0);
        }

        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function check(min, max) {
        if (parseInt(min) > parseInt(max)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function checkRepeat(ds) {
        var count = ds.getRowSet().getRowCount();
        var flag = true;
        for (var i = 0; i < count; i++) {
            for (var j = i + 1; j < count; j++) {
                if (ds.rowSet.primary[i].insurtypeCode == ds.rowSet.primary[j].insurtypeCode &&
                    ds.rowSet.primary[i].paymentFre == ds.rowSet.primary[j].paymentFre &&
                    ds.rowSet.primary[i].beginYear == ds.rowSet.primary[j].beginYear &&
                    ds.rowSet.primary[i].insurtypeId == ds.rowSet.primary[j].insurtypeId &&
                    ds.rowSet.primary[i].feeType == ds.rowSet.primary[j].feeType &&
                    ds.rowSet.primary[i].minAmount == ds.rowSet.primary[j].minAmount &&
                    ds.rowSet.primary[i].maxAmount == ds.rowSet.primary[j].maxAmount &&
                    ds.rowSet.primary[i].rate == ds.rowSet.primary[j].rate &&
                    ds.rowSet.primary[i].pricingLiabCode == ds.rowSet.primary[j].pricingLiabCode
                ) {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                break;
            }

        }


        return flag;
    }

    function save1_onClick(event) {

        var feeDef = view.form.getDataStore("form_feeDef1");

        if (!unieap.byId("form_feeDef1").validate(false)) {
            return;
        }
        if (!unieap.byId("grid_feeRate1").validate(false)) {
            return;
        }

        var grid = view.grid.getDataStore("grid_feeRate1");
        var count = grid.getRowSet().getRowCount();
        var yearFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].beginYear;
            var max = grid.rowSet.primary[i].endYear;
            if (view.check(min, max)) {
                yearFlag = true;
            }
        }
        if (yearFlag) {
            MessageBox.alert({
                title: "提示",
                message: "年度参数错误"
            });
            return;
        }

        var moneyFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].minAmount;
            var max = grid.rowSet.primary[i].maxAmount;
            if (view.check(min, max)) {
                moneyFlag = true;
            }
        }
        if (moneyFlag) {
            MessageBox.alert({
                title: "提示",
                message: "金额参数错误"
            });
            return;
        }

        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }



        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate1");
        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);


    }

    function clear1_onClick(event) {
        var data = view.form.getDataStore("form_feeDef1");

        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }



    }

    function add1_onClick(event) {

        //每行数据默认数据
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate1", rowData);

    }

    function cell_control_fee1_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane1_onShow(pane) {
        feeType = "B1";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);


    }

    function save2_onClick(event) {

        var feeDef = view.form.getDataStore("form_feeDef2");
        if (!unieap.byId("form_feeDef2").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_feeRate2").validate(false)) {
            return;
        }

        var grid = view.grid.getDataStore("grid_feeRate2");
        var count = grid.getRowSet().getRowCount();


        var moneyFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].minAmount;
            var max = grid.rowSet.primary[i].maxAmount;
            if (view.check(min, max)) {
                moneyFlag = true;
            }
        }
        if (moneyFlag) {
            MessageBox.alert({
                title: "提示",
                message: "金额参数错误"
            });
            return;
        }
        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }


        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate2");

        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);

    }

    function clear2_onClick(event) {
        var data = view.form.getDataStore("form_feeDef2");
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }

    }

    function add2_onClick(event) {
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate2", rowData);
    }

    function cell_control_fee2_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane2_onShow(pane) {
        feeType = "B2";



        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function save3_onClick(event) {
        var feeDef = view.form.getDataStore("form_feeDef3");

        if (!unieap.byId("form_feeDef3").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_feeRate3").validate(false)) {
            return;
        }

        var grid = view.grid.getDataStore("grid_feeRate3");
        var count = grid.getRowSet().getRowCount();
        var yearFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].beginYear;
            var max = grid.rowSet.primary[i].endYear;
            if (view.check(min, max)) {
                yearFlag = true;
            }
        }
        if (yearFlag) {
            MessageBox.alert({
                title: "提示",
                message: "年度参数错误"
            });
            return;
        }

        var moneyFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].minAmount;
            var max = grid.rowSet.primary[i].maxAmount;
            if (view.check(min, max)) {
                moneyFlag = true;
            }
        }
        if (moneyFlag) {
            MessageBox.alert({
                title: "提示",
                message: "金额参数错误"
            });
            return;
        }
        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }

        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate3");

        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);
    }

    function clear3_onClick(event) {
        var data = view.form.getDataStore("form_feeDef3");
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }

    }

    function add3_onClick(event) {
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate3", rowData);
    }

    function cell_control_fee3_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane3_onShow(pane) {
        feeType = "B3";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function save4_onClick(event) {
        var feeDef = view.form.getDataStore("form_feeDef4");

        if (!unieap.byId("form_feeDef4").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_feeRate4").validate(false)) {
            return;
        }
        var grid = view.grid.getDataStore("grid_feeRate4");
        var count = grid.getRowSet().getRowCount();
        var yearFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].beginYear;
            var max = grid.rowSet.primary[i].endYear;
            if (view.check(min, max)) {
                yearFlag = true;
            }
        }
        if (yearFlag) {
            MessageBox.alert({
                title: "提示",
                message: "年度参数错误"
            });
            return;
        }
        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }


        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate4");

        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);
    }

    function clear4_onClick(event) {
        var data = view.form.getDataStore("form_feeDef4");
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }

    }

    function add4_onClick(event) {
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate4", rowData);
    }

    function cell_control_fee4_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane4_onShow(pane) {
        feeType = "B4";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function save5_onClick(event) {
        var feeDef = view.form.getDataStore("form_feeDef5");

        if (!unieap.byId("form_feeDef5").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_feeRate5").validate(false)) {
            return;
        }
        var grid = view.grid.getDataStore("grid_feeRate5");
        var count = grid.getRowSet().getRowCount();
        var yearFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].beginYear;
            var max = grid.rowSet.primary[i].endYear;
            if (view.check(min, max)) {
                yearFlag = true;
            }
        }
        if (yearFlag) {
            MessageBox.alert({
                title: "提示",
                message: "年度参数错误"
            });
            return;
        }

        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }



        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate5");

        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);
    }

    function clear5_onClick(event) {
        var data = view.form.getDataStore("form_feeDef5");
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }

    }

    function add5_onClick(event) {
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate5", rowData);
    }

    function cell_control_fee5_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane5_onShow(pane) {
        feeType = "B5";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function save6_onClick(event) {
        var feeDef = view.form.getDataStore("form_feeDef6");

        if (!unieap.byId("form_feeDef6").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_feeRate6").validate(false)) {
            return;
        }

        var grid = view.grid.getDataStore("grid_feeRate6");
        var count = grid.getRowSet().getRowCount();
        var yearFlag = false;
        for (var i = 0; i < count; i++) {
            var min = grid.rowSet.primary[i].beginYear;
            var max = grid.rowSet.primary[i].endYear;
            if (view.check(min, max)) {
                yearFlag = true;
            }
        }
        if (yearFlag) {
            MessageBox.alert({
                title: "提示",
                message: "年度参数错误"
            });
            return;
        }

        if (!view.checkRepeat(grid)) {
            MessageBox.alert({
                titile: "提示",
                message: "数据重复"
            });
            return;
        }


        feeDef.rowSet.primary[0].insurtypeId = insurtypeId;
        feeDef.rowSet.primary[0].feeType = feeType;

        var feeRate = view.grid.getDataStore("grid_feeRate6");

        var insurtypeBasic = view.form.getDataStore("form_insurtypebasicinf");

        view.processor.saveRiskFeeManage(feeRate, feeDef, insurtypeBasic);
    }

    function clear6_onClick(event) {
        var data = view.form.getDataStore("form_feeDef6");
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否清空本页数据？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.clear(data);
                    }
                }
            }, dojo.byId("confirm"));
        }

    }

    function add6_onClick(event) {
        var rowData = {
            insurtypeId: insurtypeId,
            insurtypeCode: insurtypeCode,
            feeType: feeType
        };

        view.grid.insertRow("grid_feeRate6", rowData);
    }

    function cell_control_fee6_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfFeeManage.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function tabPane6_onShow(pane) {
        feeType = "B6";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    var view = new _factoryabclife.risk.pfFeeManage.View();
    view.init();

    return view;
})