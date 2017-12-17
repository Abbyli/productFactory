/**
 * 贷款利率
 * @author Neusoft
 * @creationTime 2016-11-16 09:52:20
 * @modificationTime 2017-03-09 09:57:40
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateLoanDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateLoanDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addUpTLoanShareSuccess: addUpTLoanShareSuccess,
                form3_2_saveButton_onClick: form3_2_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pFInterestRateLoanDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('add_tLoanAutoPayIntrate')) {
                var add_tLoanAutoPayIntrate = new unieap.ds.DataStore('add_tLoanAutoPayIntrate');
                add_tLoanAutoPayIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TLoanAutoPayIntrate");

                dataCenter.addDataStore(add_tLoanAutoPayIntrate);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form3_2_saveButton"), "onClick", this.form3_2_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            if (opt == "update") {
                view.form.setDataStore("form3_2", datas.row);
            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("periodFlg", [{
                CODENAME: "年",
                CODEVALUE: "Y"
            }, {
                CODENAME: "月",
                CODEVALUE: "M"
            }])
            var ds1 = new unieap.ds.DataStore("intrateType", [{
                CODENAME: "活期",
                CODEVALUE: "C"
            }, {
                CODENAME: "定期",
                CODEVALUE: "F"
            }])
            var ds2 = new unieap.ds.DataStore("depositLoanFlg", [{
                CODENAME: "贷款",
                CODEVALUE: "L"
            }, {
                CODENAME: "存款",
                CODEVALUE: "D"
            }])
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
        }

    });
    /**
     * @description:addUpTLoanShare方法的成功回调。
     *
     */

    function addUpTLoanShareSuccess(dc) {
        var info = dc.getParameter("reAddUpTLoanShare");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
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

    function form3_2_saveButton_onClick(event) {
        if (!unieap.byId("form3_2").validate(false)) {
            return;
        }

        if (unieap.byId("announceDate").getValue() > unieap.byId("endDate").getValue()) {
            MessageBox.alert({
                title: '提示',
                message: "利率开始日期 不能大于 止日期！"
            });
            return;
        }

        view.processor.addUpTLoanShare(view.form.getDataStore('form3_2'), opt);
    }

    var view = new _factoryabclife.risk.pFInterestRateLoanDialog.View();
    view.init();

    return view;
})