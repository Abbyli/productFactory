/**
 * 费用管理
 * @author Administrator
 * @creationTime 2016-07-06 09:25:24
 * @modificationTime 2016-11-03 17:17:34
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfFeeManageinf", function () {

    var feeType = "";

    var insurtypeId = "";

    var insurtypeCode = "";

    var ds_pricingLiab = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfFeeManageinf_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfFeeManageinf.View", unieap.view.View, {



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
                tabPane1_onShow: tabPane1_onShow,
                tabPane2_onShow: tabPane2_onShow,
                tabPane3_onShow: tabPane3_onShow,
                tabPane4_onShow: tabPane4_onShow,
                tabPane5_onShow: tabPane5_onShow,
                tabPane6_onShow: tabPane6_onShow,
                feeType: feeType,
                insurtypeId: insurtypeId,
                insurtypeCode: insurtypeCode,
                ds_pricingLiab: ds_pricingLiab
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfFeeManageinf.Processor(this);

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

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("tabPane4"), "onShow", this.tabPane4_onShow);

            this.connect(unieap.byId("tabPane5"), "onShow", this.tabPane5_onShow);

            this.connect(unieap.byId("tabPane6"), "onShow", this.tabPane6_onShow);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种费用管理信息", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                //view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);
                insurtypeId = tInsurtypeBasicInf.rowSet.primary[0].insurtypeId;
                insurtypeCode = tInsurtypeBasicInf.rowSet.primary[0].insurtypeCode;
                //
                ////查询该险种下定价（转义用）
                //view.processor.getPricingLiab(tInsurtypeBasicInf);
                //dataCenter.addDataStore("ds_pricingLiab", ds_pricingLiab);
                view.processor.getFormulafee();
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



                //默认展现第一页
                unieap.byId("tabContainer1").showTab("tabPane1", true);
                unieap.byId("tabPane1").onShow();

                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
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
                CODEVALUE: "4",
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

            if (Type == "B4") {

                view.grid.setDataStore("grid_feeRate1", feeRate);
            }
            if (Type == "B7") {

                view.grid.setDataStore("grid_feeRate2", feeRate);
            }
            if (Type == "B1") {

                view.grid.setDataStore("grid_feeRate3", feeRate);
            }
            if (Type == "B5") {

                view.grid.setDataStore("grid_feeRate4", feeRate);
            }
            if (Type == "B8") {

                view.grid.setDataStore("grid_feeRate5", feeRate);
            }
            if (Type == "B9") {

                view.grid.setDataStore("grid_feeRate6", feeRate);
            }
        }
        else {
            if (feeType == "B4") {

                unieap.byId("grid_feeRate1").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B7") {

                unieap.byId("grid_feeRate2").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B1") {

                unieap.byId("grid_feeRate3").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B5") {

                unieap.byId("grid_feeRate4").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B8") {

                unieap.byId("grid_feeRate5").getBinding().getDataStore().getRowSet().deleteAllRows();
            }
            if (feeType == "B9") {

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

            if (Type == "B4") {

                view.form.setDataStore("form_feeDef1", feeDef);
            }
            if (Type == "B7") {
                view.form.setDataStore("form_feeDef2", feeDef);
            }
            if (Type == "B1") {
                view.form.setDataStore("form_feeDef3", feeDef);
            }
            if (Type == "B5") {
                view.form.setDataStore("form_feeDef4", feeDef);
            }
            if (Type == "B8") {
                view.form.setDataStore("form_feeDef5", feeDef);
            }
            if (Type == "B9") {
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
        if (feeType == "B4") {
            data = view.grid.getRow("grid_feeRate1", inRowIndex);
        }
        else if (feeType == "B7") {
            data = view.grid.getRow("grid_feeRate2", inRowIndex);
        }
        else if (feeType == "B1") {
            data = view.grid.getRow("grid_feeRate3", inRowIndex);
        }
        else if (feeType == "B5") {
            data = view.grid.getRow("grid_feeRate4", inRowIndex);
        }
        else if (feeType == "B8") {
            data = view.grid.getRow("grid_feeRate5", inRowIndex);
        }
        else if (feeType == "B9") {
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
        if (feeType == "B4") {
            unieap.byId("form_feeDef1").clear();
            unieap.byId("form_feeDef1").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B7") {
            unieap.byId("form_feeDef2").clear();
            unieap.byId("form_feeDef2").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B1") {
            unieap.byId("form_feeDef3").clear();
            unieap.byId("form_feeDef3").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B5") {
            unieap.byId("form_feeDef4").clear();
            unieap.byId("form_feeDef4").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B8") {
            unieap.byId("form_feeDef5").clear();
            unieap.byId("form_feeDef5").getBinding().getDataStore().getRowSet().clear(0);
        }
        if (feeType == "B9") {
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

    function tabPane1_onShow(pane) {
        feeType = "B4";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);


    }

    function tabPane2_onShow(pane) {
        feeType = "B7";



        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function tabPane3_onShow(pane) {
        feeType = "B1";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function tabPane4_onShow(pane) {
        feeType = "B5";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function tabPane5_onShow(pane) {
        feeType = "B8";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    function tabPane6_onShow(pane) {
        feeType = "B9";


        view.processor.queryTFeeRate(feeType, insurtypeId);
        view.processor.queryTInsurtypeFeeDef(feeType, insurtypeId);
    }

    var view = new _factoryabclife.riskInformation.pfFeeManageinf.View();
    view.init();

    return view;
})