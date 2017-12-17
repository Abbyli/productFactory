/**
 * 利率管理
 * @author Neusoft
 * @creationTime 2016-11-02 15:07:19
 * @modificationTime 2017-03-03 17:56:43
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRate", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRate.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTUnivrslSettlIntrateSuccess: queryTUnivrslSettlIntrateSuccess,
                deleteTUnivrslSettlIntrate: deleteTUnivrslSettlIntrate,
                delTUnivrslSettlIntrateSuccess: delTUnivrslSettlIntrateSuccess,
                upTUnivrslSettlIntrate: upTUnivrslSettlIntrate,
                queryTSurvvBeneAccumIntbeIntraSuccess: queryTSurvvBeneAccumIntbeIntraSuccess,
                deleteTSurvvBeneAccumIntbeIntra: deleteTSurvvBeneAccumIntbeIntra,
                upTSurvvBeneAccumIntbeIntra: upTSurvvBeneAccumIntbeIntra,
                delTSurvvBeneAccumIntbeIntraSuccess: delTSurvvBeneAccumIntbeIntraSuccess,
                delTLoanPayIntrateSuccess: delTLoanPayIntrateSuccess,
                queryTLoanPayIntrateSuccess: queryTLoanPayIntrateSuccess,
                deleteTLoanAutoPayIntrate: deleteTLoanAutoPayIntrate,
                upTLoanAutoPayIntrate: upTLoanAutoPayIntrate,
                queryTDividParamSuccess: queryTDividParamSuccess,
                delTDividShareSuccess: delTDividShareSuccess,
                delTCurrPriceIntrateSuccess: delTCurrPriceIntrateSuccess,
                queryTCurrPriceIntrateSuccess: queryTCurrPriceIntrateSuccess,
                deleteTDividShare: deleteTDividShare,
                deleteTCurrPriceIntrate: deleteTCurrPriceIntrate,
                upTCurrPriceIntrate: upTCurrPriceIntrate,
                upTDividShare: upTDividShare,
                queryTReserveFundFactorSuccess: queryTReserveFundFactorSuccess,
                queryTAssessNetPremSuccess: queryTAssessNetPremSuccess,
                delTAssessNetPremSuccess: delTAssessNetPremSuccess,
                delTReserveFundFactorSuccess: delTReserveFundFactorSuccess,
                select1_1_onClick: select1_1_onClick,
                add1_1_onClick: add1_1_onClick,
                cell_operation1_formatter: cell_operation1_formatter,
                grid1_1_binding_rpc: grid1_1_binding_rpc,
                tabPane1_onShow: tabPane1_onShow,
                select2_1_onClick: select2_1_onClick,
                add2_1_onClick: add2_1_onClick,
                cell_operation2_formatter: cell_operation2_formatter,
                grid2_binding_rpc: grid2_binding_rpc,
                tabPane2_onShow: tabPane2_onShow,
                select3_1_onClick: select3_1_onClick,
                add3_1_onClick: add3_1_onClick,
                cell_operation3_formatter: cell_operation3_formatter,
                grid3_1_binding_rpc: grid3_1_binding_rpc,
                tabPane3_onShow: tabPane3_onShow,
                select4_1_onClick: select4_1_onClick,
                add4_1_onClick: add4_1_onClick,
                cell_operation4_formatter: cell_operation4_formatter,
                grid4_1_binding_rpc: grid4_1_binding_rpc,
                tabPane4_onShow: tabPane4_onShow,
                select5_1_onClick: select5_1_onClick,
                add5_1_onClick: add5_1_onClick,
                cell_operation5_formatter: cell_operation5_formatter,
                grid5_1_binding_rpc: grid5_1_binding_rpc,
                tabPane5_onShow: tabPane5_onShow,
                download6_1_onClick: download6_1_onClick,
                leadingIn6_1_onClick: leadingIn6_1_onClick,
                select6_1_onClick: select6_1_onClick,
                delete6_1_onClick: delete6_1_onClick,
                grid6_1_binding_rpc: grid6_1_binding_rpc,
                tabPane6_onShow: tabPane6_onShow,
                download7_1_onClick: download7_1_onClick,
                leadingIn7_1_onClick: leadingIn7_1_onClick,
                select7_1_onClick: select7_1_onClick,
                delete7_1_onClick: delete7_1_onClick,
                grid7_1_binding_rpc: grid7_1_binding_rpc,
                tabPane7_onShow: tabPane7_onShow,
                addOrUpDialog1_1_onComplete: addOrUpDialog1_1_onComplete,
                addOrUpDialog2_1_onComplete: addOrUpDialog2_1_onComplete,
                addOrUpDialog3_1_onComplete: addOrUpDialog3_1_onComplete,
                addOrUpDialog4_1_onComplete: addOrUpDialog4_1_onComplete,
                addOrUpDialog5_1_onComplete: addOrUpDialog5_1_onComplete,
                upload6_1_onComplete: upload6_1_onComplete,
                upload7_1_onComplete: upload7_1_onComplete
            });

            this.processor = new _factoryabclife.risk.pFInterestRate.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('in_tUnivrslSettlIntrate')) {
                var in_tUnivrslSettlIntrate = new unieap.ds.DataStore('in_tUnivrslSettlIntrate');
                in_tUnivrslSettlIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TUnivrslSettlIntrate");

                dataCenter.addDataStore(in_tUnivrslSettlIntrate);
            }

            if (!dataCenter.getDataStore('in_tSurvvBeneAccumIntbeIntra')) {
                var in_tSurvvBeneAccumIntbeIntra = new unieap.ds.DataStore('in_tSurvvBeneAccumIntbeIntra');
                in_tSurvvBeneAccumIntbeIntra.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvBeneAccumIntbeIntra");

                dataCenter.addDataStore(in_tSurvvBeneAccumIntbeIntra);
            }

            if (!dataCenter.getDataStore('in_tDividParam')) {
                var in_tDividParam = new unieap.ds.DataStore('in_tDividParam');
                in_tDividParam.setRowSetName("com.neusoft.abclife.productfactory.entity.TDividParam");

                dataCenter.addDataStore(in_tDividParam);
            }

            if (!dataCenter.getDataStore('form_tUnivrslSettlIntrate')) {
                var form_tUnivrslSettlIntrate = new unieap.ds.DataStore('form_tUnivrslSettlIntrate');
                form_tUnivrslSettlIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TUnivrslSettlIntrate");

                dataCenter.addDataStore(form_tUnivrslSettlIntrate);
            }

            if (!dataCenter.getDataStore('form_tSurvvBeneAccumIntbeIntra')) {
                var form_tSurvvBeneAccumIntbeIntra = new unieap.ds.DataStore('form_tSurvvBeneAccumIntbeIntra');
                form_tSurvvBeneAccumIntbeIntra.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvBeneAccumIntbeIntra");

                dataCenter.addDataStore(form_tSurvvBeneAccumIntbeIntra);
            }

            if (!dataCenter.getDataStore('in_tLoanAutoPayIntrate')) {
                var in_tLoanAutoPayIntrate = new unieap.ds.DataStore('in_tLoanAutoPayIntrate');
                in_tLoanAutoPayIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TLoanAutoPayIntrate");

                dataCenter.addDataStore(in_tLoanAutoPayIntrate);
            }

            if (!dataCenter.getDataStore('from_tLoanAutoPayIntrate')) {
                var from_tLoanAutoPayIntrate = new unieap.ds.DataStore('from_tLoanAutoPayIntrate');
                from_tLoanAutoPayIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TLoanAutoPayIntrate");

                dataCenter.addDataStore(from_tLoanAutoPayIntrate);
            }

            if (!dataCenter.getDataStore('form_tDividParam')) {
                var form_tDividParam = new unieap.ds.DataStore('form_tDividParam');
                form_tDividParam.setRowSetName("com.neusoft.abclife.productfactory.entity.TDividParam");

                dataCenter.addDataStore(form_tDividParam);
            }

            if (!dataCenter.getDataStore('in_tCurrPriceIntrate')) {
                var in_tCurrPriceIntrate = new unieap.ds.DataStore('in_tCurrPriceIntrate');
                in_tCurrPriceIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TCurrPriceIntrate");

                dataCenter.addDataStore(in_tCurrPriceIntrate);
            }

            if (!dataCenter.getDataStore('form_tCurrPriceIntrate')) {
                var form_tCurrPriceIntrate = new unieap.ds.DataStore('form_tCurrPriceIntrate');
                form_tCurrPriceIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TCurrPriceIntrate");

                dataCenter.addDataStore(form_tCurrPriceIntrate);
            }

            if (!dataCenter.getDataStore('form_tReserveFundFactor')) {
                var form_tReserveFundFactor = new unieap.ds.DataStore('form_tReserveFundFactor');
                form_tReserveFundFactor.setRowSetName("com.neusoft.abclife.productfactory.entity.TReserveFundFactor");

                dataCenter.addDataStore(form_tReserveFundFactor);
            }

            if (!dataCenter.getDataStore('in_tReserveFundFactor')) {
                var in_tReserveFundFactor = new unieap.ds.DataStore('in_tReserveFundFactor');
                in_tReserveFundFactor.setRowSetName("com.neusoft.abclife.productfactory.entity.TReserveFundFactor");

                dataCenter.addDataStore(in_tReserveFundFactor);
            }

            if (!dataCenter.getDataStore('form_tAssessNetPrem')) {
                var form_tAssessNetPrem = new unieap.ds.DataStore('form_tAssessNetPrem');
                form_tAssessNetPrem.setRowSetName("com.neusoft.abclife.productfactory.entity.TAssessNetPrem");

                dataCenter.addDataStore(form_tAssessNetPrem);
            }

            if (!dataCenter.getDataStore('in_tAssessNetPrem')) {
                var in_tAssessNetPrem = new unieap.ds.DataStore('in_tAssessNetPrem');
                in_tAssessNetPrem.setRowSetName("com.neusoft.abclife.productfactory.entity.TAssessNetPrem");

                dataCenter.addDataStore(in_tAssessNetPrem);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("select1_1"), "onClick", this.select1_1_onClick);

            this.connect(unieap.byId("add1_1"), "onClick", this.add1_1_onClick);

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("select2_1"), "onClick", this.select2_1_onClick);

            this.connect(unieap.byId("add2_1"), "onClick", this.add2_1_onClick);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("select3_1"), "onClick", this.select3_1_onClick);

            this.connect(unieap.byId("add3_1"), "onClick", this.add3_1_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("select4_1"), "onClick", this.select4_1_onClick);

            this.connect(unieap.byId("add4_1"), "onClick", this.add4_1_onClick);

            this.connect(unieap.byId("tabPane4"), "onShow", this.tabPane4_onShow);

            this.connect(unieap.byId("select5_1"), "onClick", this.select5_1_onClick);

            this.connect(unieap.byId("add5_1"), "onClick", this.add5_1_onClick);

            this.connect(unieap.byId("tabPane5"), "onShow", this.tabPane5_onShow);

            this.connect(unieap.byId("download6_1"), "onClick", this.download6_1_onClick);

            this.connect(unieap.byId("leadingIn6_1"), "onClick", this.leadingIn6_1_onClick);

            this.connect(unieap.byId("select6_1"), "onClick", this.select6_1_onClick);

            this.connect(unieap.byId("delete6_1"), "onClick", this.delete6_1_onClick);

            this.connect(unieap.byId("tabPane6"), "onShow", this.tabPane6_onShow);

            this.connect(unieap.byId("download7_1"), "onClick", this.download7_1_onClick);

            this.connect(unieap.byId("leadingIn7_1"), "onClick", this.leadingIn7_1_onClick);

            this.connect(unieap.byId("select7_1"), "onClick", this.select7_1_onClick);

            this.connect(unieap.byId("delete7_1"), "onClick", this.delete7_1_onClick);

            this.connect(unieap.byId("tabPane7"), "onShow", this.tabPane7_onShow);

            this.connect(unieap.byId("addOrUpDialog1_1"), "onComplete", this.addOrUpDialog1_1_onComplete);

            this.connect(unieap.byId("addOrUpDialog2_1"), "onComplete", this.addOrUpDialog2_1_onComplete);

            this.connect(unieap.byId("addOrUpDialog3_1"), "onComplete", this.addOrUpDialog3_1_onComplete);

            this.connect(unieap.byId("addOrUpDialog4_1"), "onComplete", this.addOrUpDialog4_1_onComplete);

            this.connect(unieap.byId("addOrUpDialog5_1"), "onComplete", this.addOrUpDialog5_1_onComplete);

            this.connect(unieap.byId("upload6_1"), "onComplete", this.upload6_1_onComplete);

            this.connect(unieap.byId("upload7_1"), "onComplete", this.upload7_1_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            //清空tab页中的数据
            unieap.byId("grid1_1").getBinding().getDataStore().getRowSet().deleteAllRows();

            //默认展现第一页
            unieap.byId("tabContainer1").showTab("tabPane1", true);
            unieap.byId("tabPane1").onShow();

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("intrateType", [{
                CODENAME: "年利率",
                CODEVALUE: "Y"
            }, {
                CODENAME: "月利率",
                CODEVALUE: "M"
            }])
            var ds1 = new unieap.ds.DataStore("periodFlg", [{
                CODENAME: "年",
                CODEVALUE: "Y"
            }, {
                CODENAME: "月",
                CODEVALUE: "M"
            }])
            var ds2 = new unieap.ds.DataStore("intrateType3", [{
                CODENAME: "活期",
                CODEVALUE: "C"
            }, {
                CODENAME: "定期",
                CODEVALUE: "F"
            }])
            var ds3 = new unieap.ds.DataStore("depositLoanFlg", [{
                CODENAME: "贷款",
                CODEVALUE: "L"
            }, {
                CODENAME: "存款",
                CODEVALUE: "D"
            }])
            var ds4 = new unieap.ds.DataStore("ds4_paymntFreq", [{
                CODENAME: "不定期",
                CODEVALUE: "-1"
            }, {
                CODENAME: "一次交清",
                CODEVALUE: "0"
            }, {
                CODENAME: "月交",
                CODEVALUE: "1"
            }, {
                CODENAME: "季交",
                CODEVALUE: "3"
            }, {
                CODENAME: "半年交",
                CODEVALUE: "6"
            }, {
                CODENAME: "年交",
                CODEVALUE: "12"
            }])
            var ds5 = new unieap.ds.DataStore("singlePayOrRegulPay", [{
                CODENAME: "趸交",
                CODEVALUE: "1"
            }, {
                CODENAME: "期交",
                CODEVALUE: "2"
            }])
            var ds6 = new unieap.ds.DataStore("paymntPeriod", [{
                CODENAME: "趸交",
                CODEVALUE: "1"
            }, {
                CODENAME: "10年交",
                CODEVALUE: "10"
            }, {
                CODENAME: "交至60岁",
                CODEVALUE: "60"
            }])
            var ds7 = new unieap.ds.DataStore("insurperiod", [{
                CODENAME: "保10年",
                CODEVALUE: "10"
            }, {
                CODENAME: "保至60岁",
                CODEVALUE: "60"
            }])
            var ds8 = new unieap.ds.DataStore("insurdGender", [{
                CODENAME: "女性",
                CODEVALUE: "1"
            }, {
                CODENAME: "男性",
                CODEVALUE: "0"
            }])
            var ds9 = new unieap.ds.DataStore("annuityStartDrawAge", [{
                CODENAME: "无年金领取责任",
                CODEVALUE: "0"
            }])
            var ds10 = new unieap.ds.DataStore("reserveFundType", [{
                CODENAME: "首期",
                CODEVALUE: "0"
            }, {
                CODENAME: "续期",
                CODEVALUE: "1"
            }, {
                CODENAME: "满期自动续保后首期",
                CODEVALUE: "2"
            }, {
                CODENAME: "满期自动续保后续期",
                CODEVALUE: "3"
            }])
            var ds11 = new unieap.ds.DataStore("paymntFreq", [{
                CODENAME: "轻症理赔前",
                CODEVALUE: "1"
            }, {
                CODENAME: "轻症理赔后",
                CODEVALUE: "2"
            }, {
                CODENAME: "",
                CODEVALUE: "0"
            }])
            var ds12 = new unieap.ds.DataStore("assessNetPremType", [{
                CODENAME: "轻症理赔前",
                CODEVALUE: "1"
            }, {
                CODENAME: "轻症理赔后",
                CODEVALUE: "2"
            }, {
                CODENAME: "",
                CODEVALUE: "0"
            }])
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
            dataCenter.addDataStore(ds5);
            dataCenter.addDataStore(ds6);
            dataCenter.addDataStore(ds7);
            dataCenter.addDataStore(ds8);
            dataCenter.addDataStore(ds9);
            dataCenter.addDataStore(ds10);
            dataCenter.addDataStore(ds11);

            dojo.provide("unieap.long_date");
            dojo.require("unieap.form.SimpleFormatter");
            dojo.declare("unieap.long_date", unieap.form.SimpleFormatter, {
                format: function (value) {
                    var da = new Date();
                    da.setTime(value);
                    var ret = da.format('yyyy-MM-dd');
                    return ret;
                }
            });

            Date.prototype.format = function (fmt) {

                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
                    "H+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };

                var week = {
                    "0": "\u65e5",
                    "1": "\u4e00",
                    "2": "\u4e8c",
                    "3": "\u4e09",
                    "4": "\u56db",
                    "5": "\u4e94",
                    "6": "\u516d",
                };

                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                if (/(E+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.lenth > 1) ? (RegExp.$1.lenth > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.lenth == 1) ? (o[k]) : (("" + o[k]).substr(("" + o[k]).lenth)));
                    }
                }
                return fmt;
            }
        }

    });
    /**
     * @description:queryTUnivrslSettlIntrate方法的成功回调。
     *
     */

    function queryTUnivrslSettlIntrateSuccess(dc) {
        view.grid.setDataStore("grid1_1", dc.getDataStore("queryResult"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function deleteTUnivrslSettlIntrate(inRowIndex) {
        var tUnivrslSettlIntrate = view.grid.getRow("grid1_1", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTUnivrslSettlIntrate(tUnivrslSettlIntrate);
                }
            }
        })
    }
    /**
     * @description:delTUnivrslSettlIntrate方法的成功回调。
     *
     */

    function delTUnivrslSettlIntrateSuccess(dc) {
        var info = dc.getParameter("reDelTUnivrslSettlIntrate");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.queryTUnivrslSettlIntrate(view.form.getDataStore("form1_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTUnivrslSettlIntrate(inRowIndex) {
        var row = view.grid.getRow("grid1_1", inRowIndex);
        var dialog = unieap.byId("addOrUpDialog1_1");
        dialog.dialogData = {
            "opt": "update",
            "row": row
        };
        dialog.title = "修改万能结算利率";

        dialog.show();
    }
    /**
     * @description:queryTSurvvBeneAccumIntbeIntra方法的成功回调。
     *
     */

    function queryTSurvvBeneAccumIntbeIntraSuccess(dc) {
        view.grid.setDataStore("grid2", dc.getDataStore("querySurvv"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg1参数描述
     * @return:
     *
     */

    function deleteTSurvvBeneAccumIntbeIntra(inRowIndex) {
        var tSurvvBeneAccumIntbeIntra = view.grid.getRow("grid2", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTSurvvBeneAccumIntbeIntra(tSurvvBeneAccumIntbeIntra);
                }
            }
        })
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTSurvvBeneAccumIntbeIntra(inRowIndex) {
        var row = view.grid.getRow("grid2", inRowIndex);
        var dialog = unieap.byId("addOrUpDialog2_1");
        dialog.dialogData = {
            "opt": "update",
            "row": row
        };
        dialog.title = "修改生存金累计生息利率";
        dialog.show();
    }
    /**
     * @description:delTSurvvBeneAccumIntbeIntra方法的成功回调。
     *
     */

    function delTSurvvBeneAccumIntbeIntraSuccess(dc) {
        var info = dc.getParameter("reDelTSurvvBeneAccumIntbeIntra");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.queryTSurvvBeneAccumIntbeIntra(view.form.getDataStore("form2_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:delTLoanPayIntrate方法的成功回调。
     *
     */

    function delTLoanPayIntrateSuccess(dc) {
        var info = dc.getParameter("reDelTLoanPayIntrate");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.queryTLoanPayIntrate(view.form.getDataStore("form3_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:queryTLoanPayIntrate方法的成功回调。
     *
     */

    function queryTLoanPayIntrateSuccess(dc) {
        view.grid.setDataStore("grid3_1", dc.getDataStore("queryLoan"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function deleteTLoanAutoPayIntrate(inRowIndex) {
        var tLoanAutoPayIntrate = view.grid.getRow("grid3_1", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTLoanPayIntrate(tLoanAutoPayIntrate);
                }
            }
        })
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTLoanAutoPayIntrate(inRowIndex) {
        var row = view.grid.getRow("grid3_1", inRowIndex);
        var dialog = unieap.byId("addOrUpDialog3_1");
        dialog.dialogData = {
            "opt": "update",
            "row": row
        };
        dialog.title = "修改贷款 自垫利率";

        dialog.show();
    }
    /**
     * @description:queryTDividParam方法的成功回调。
     *
     */

    function queryTDividParamSuccess(dc) {
        view.grid.setDataStore("grid4_1", dc.getDataStore("queryDivid"));
    }
    /**
     * @description:delTDividShare方法的成功回调。
     *
     */

    function delTDividShareSuccess(dc) {
        var info = dc.getParameter("reDelTDividShare");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.queryTDividParam(view.form.getDataStore("form4_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:delTCurrPriceIntrate方法的成功回调。
     *
     */

    function delTCurrPriceIntrateSuccess(dc) {
        var info = dc.getParameter("reDelTCurrPriceIntrate");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.queryTCurrPriceIntrate(view.form.getDataStore("form5_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:queryTCurrPriceIntrate方法的成功回调。
     *
     */

    function queryTCurrPriceIntrateSuccess(dc) {
        view.grid.setDataStore("grid5_1", dc.getDataStore("queryCurr"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function deleteTDividShare(inRowIndex) {
        var tDividParam = view.grid.getRow("grid4_1", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTDividShare(tDividParam);
                }
            }
        })
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function deleteTCurrPriceIntrate(inRowIndex) {
        var tCurrPriceIntrate = view.grid.getRow("grid5_1", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTCurrPriceIntrate(tCurrPriceIntrate);
                }
            }
        })
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTCurrPriceIntrate(inRowIndex) {
        var row = view.grid.getRow("grid5_1", inRowIndex);
        var dialog = unieap.byId("addOrUpDialog5_1");
        dialog.dialogData = {
            "opt": "update",
            "row": row
        };
        dialog.title = "现价参数";

        dialog.show();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTDividShare(inRowIndex) {
        var row = view.grid.getRow("grid4_1", inRowIndex);
        var dialog = unieap.byId("addOrUpDialog4_1");
        dialog.dialogData = {
            "opt": "update",
            "row": row
        };
        dialog.title = "修改红利参数";

        dialog.show();
    }
    /**
     * @description:queryTReserveFundFactor方法的成功回调。
     *
     */

    function queryTReserveFundFactorSuccess(dc) {
        view.grid.setDataStore("grid6_1", dc.getDataStore("queryReserve"));
    }
    /**
     * @description:queryTAssessNetPrem方法的成功回调。
     *
     */

    function queryTAssessNetPremSuccess(dc) {
        view.grid.setDataStore("grid7_1", dc.getDataStore("queryAssess"));
    }
    /**
     * @description:delTAssessNetPrem方法的成功回调。
     *
     */

    function delTAssessNetPremSuccess(dc) {
        var info = dc.getParameter("reDelTAssessNetPrem");
        if (info > 0) {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！'
            });
            view.processor.queryTAssessNetPrem(view.form.getDataStore("form7_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: "未找到对应险种编码的费率！"
            });
        }
    }
    /**
     * @description:delTReserveFundFactor方法的成功回调。
     *
     */

    function delTReserveFundFactorSuccess(dc) {
        var info = dc.getParameter("reDelTReserveFundFactor");
        if (info > 0) {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！'
            });
            view.processor.queryTReserveFundFactor(view.form.getDataStore("form6_1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: "未找到对应险种编码的费率！"
            });
        }
    }

    function select1_1_onClick(event) {
        view.processor.queryTUnivrslSettlIntrate(view.form.getDataStore("form1_1"), 1, 10);
    }

    function add1_1_onClick(event) {
        var dialog = unieap.byId("addOrUpDialog1_1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增万能结算利率";
        dialog.show();
    }

    function cell_operation1_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var upBtn = "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pFInterestRate.upTUnivrslSettlIntrate('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pFInterestRate.deleteTUnivrslSettlIntrate('" + inRowIndex + "')\" />";


        return upBtn + deleteBtn;
    }

    function grid1_1_binding_rpc(store, load) {
        view.processor.queryTUnivrslSettlIntrate(view.form.getDataStore("form1_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane1_onShow(pane) {
        view.processor.queryTUnivrslSettlIntrate(view.form.getDataStore("form1_1"), 1, 10);
    }

    function select2_1_onClick(event) {
        view.processor.queryTSurvvBeneAccumIntbeIntra(view.form.getDataStore("form2_1"), 1, 10);
    }

    function add2_1_onClick(event) {
        var dialog = unieap.byId("addOrUpDialog2_1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "生存金累计生息利率";
        dialog.show();
    }

    function cell_operation2_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var upBtn = "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pFInterestRate.upTSurvvBeneAccumIntbeIntra('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pFInterestRate.deleteTSurvvBeneAccumIntbeIntra('" + inRowIndex + "')\" />";


        return upBtn + deleteBtn;
    }

    function grid2_binding_rpc(store, load) {
        view.processor.queryTSurvvBeneAccumIntbeIntra(view.form.getDataStore("form2_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane2_onShow(pane) {
        view.processor.queryTSurvvBeneAccumIntbeIntra(view.form.getDataStore("form2_1"), 1, 10);
    }

    function select3_1_onClick(event) {
        view.processor.queryTLoanPayIntrate(view.form.getDataStore("form3_1"), 1, 10);
    }

    function add3_1_onClick(event) {
        var dialog = unieap.byId("addOrUpDialog3_1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增贷款 自垫 利率";
        dialog.show();
    }

    function cell_operation3_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var upBtn = "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pFInterestRate.upTLoanAutoPayIntrate('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pFInterestRate.deleteTLoanAutoPayIntrate('" + inRowIndex + "')\" />";


        return upBtn + deleteBtn;
    }

    function grid3_1_binding_rpc(store, load) {
        view.processor.queryTLoanPayIntrate(view.form.getDataStore("form3_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane3_onShow(pane) {
        view.processor.queryTLoanPayIntrate(view.form.getDataStore("form3_1"), 1, 10);
    }

    function select4_1_onClick(event) {
        view.processor.queryTDividParam(view.form.getDataStore("form4_1"), 1, 10);
    }

    function add4_1_onClick(event) {
        var dialog = unieap.byId("addOrUpDialog4_1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增红利参数";
        dialog.show();
    }

    function cell_operation4_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var upBtn = "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pFInterestRate.upTDividShare('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pFInterestRate.deleteTDividShare('" + inRowIndex + "')\" />";


        return upBtn + deleteBtn;
    }

    function grid4_1_binding_rpc(store, load) {
        view.processor.queryTDividParam(view.form.getDataStore("form4_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane4_onShow(pane) {
        view.processor.queryTDividParam(view.form.getDataStore("form4_1"), 1, 10);
    }

    function select5_1_onClick(event) {
        view.processor.queryTCurrPriceIntrate(view.form.getDataStore("form5_1"), 1, 10);
    }

    function add5_1_onClick(event) {
        var dialog = unieap.byId("addOrUpDialog5_1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增现价利率";
        dialog.show();
    }

    function cell_operation5_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var upBtn = "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pFInterestRate.upTCurrPriceIntrate('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pFInterestRate.deleteTCurrPriceIntrate('" + inRowIndex + "')\" />";


        return upBtn + deleteBtn;
    }

    function grid5_1_binding_rpc(store, load) {
        view.processor.queryTCurrPriceIntrate(view.form.getDataStore("form5_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane5_onShow(pane) {
        view.processor.queryTCurrPriceIntrate(view.form.getDataStore("form5_1"), 1, 10);
    }

    function download6_1_onClick(event) {
        view.processor.exportModel("reserve");

    }

    function leadingIn6_1_onClick(event) {
        var upload6_1 = unieap.byId("upload6_1");
        var obj = "reserve";
        upload6_1.dialogData = {
            "obj": obj
        };
        upload6_1.show();


    }

    function select6_1_onClick(event) {
        view.processor.queryTReserveFundFactor(view.form.getDataStore("form6_1"), 1, 10);
    }

    function delete6_1_onClick(event) {
        var tReserveFundFactor = view.form.getDataStore("form6_1");
        if (tReserveFundFactor.rowSet.primary[0].insurtypeCode == null) {
            MessageBox.alert({
                title: "错误提示：",
                message: "请填写要删除费率的险种编码！ "
            })
        }
        else {
            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delTReserveFundFactor(view.form.getDataStore("form6_1"));
                    }
                }
            })
        }




    }

    function grid6_1_binding_rpc(store, load) {
        view.processor.queryTReserveFundFactor(view.form.getDataStore("form6_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane6_onShow(pane) {
        view.processor.queryTReserveFundFactor(view.form.getDataStore("form6_1"), 1, 10);
    }

    function download7_1_onClick(event) {
        view.processor.exportModel("assess");

    }

    function leadingIn7_1_onClick(event) {
        var upload = unieap.byId("upload7_1");
        var obj = "assess";
        upload.dialogData = {
            "obj": obj
        };
        upload.show();


    }

    function select7_1_onClick(event) {
        view.processor.queryTAssessNetPrem(view.form.getDataStore("form7_1"), 1, 10);
    }

    function delete7_1_onClick(event) {
        var tAssessNetPrem = view.form.getDataStore("form7_1");
        if (tAssessNetPrem.rowSet.primary[0].insurtypeCode == null) {
            MessageBox.alert({
                title: "错误提示：",
                message: "请填写要删除费率的险种编码！ "
            })
        }
        else {
            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delTAssessNetPrem(view.form.getDataStore("form7_1"));
                    }
                }
            })
        }




    }

    function grid7_1_binding_rpc(store, load) {
        view.processor.queryTAssessNetPrem(view.form.getDataStore("form7_1"), store.getPageNumber(), store.getPageSize());
    }

    function tabPane7_onShow(pane) {
        view.processor.queryTAssessNetPrem(view.form.getDataStore("form7_1"), 1, 10);
    }

    function addOrUpDialog1_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane1", true);
        unieap.byId("tabPane1").onShow();

    }

    function addOrUpDialog2_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane2", true);
        unieap.byId("tabPane2").onShow();

    }

    function addOrUpDialog3_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane3", true);
        unieap.byId("tabPane3").onShow();

    }

    function addOrUpDialog4_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane4", true);
        unieap.byId("tabPane4").onShow();

    }

    function addOrUpDialog5_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane5", true);
        unieap.byId("tabPane5").onShow();

    }

    function upload6_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane6", true);
        unieap.byId("tabPane6").onShow();
    }

    function upload7_1_onComplete(returnObj) {
        unieap.byId("tabContainer1").showTab("tabPane7", true);
        unieap.byId("tabPane7").onShow();
    }

    var view = new _factoryabclife.risk.pFInterestRate.View();
    view.init();

    return view;
})