/**
 * 现价利率
 * @author Neusoft
 * @creationTime 2016-11-16 09:52:20
 * @modificationTime 2017-03-09 09:54:01
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateCruuDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateCruuDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addUpTCurrShareSuccess: addUpTCurrShareSuccess,
                getTUnivrslShareSuccess: getTUnivrslShareSuccess,
                form5_2_saveButton_onClick: form5_2_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pFInterestRateCruuDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('add_tCurrPriceIntrate')) {
                var add_tCurrPriceIntrate = new unieap.ds.DataStore('add_tCurrPriceIntrate');
                add_tCurrPriceIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TCurrPriceIntrate");

                dataCenter.addDataStore(add_tCurrPriceIntrate);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form5_2_saveButton"), "onClick", this.form5_2_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            view.processor.getTUnivrslShare();
            if (opt == "update") {
                view.form.setDataStore("form5_2", datas.row);
            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("paymntFreq", [{
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
            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:addUpTCurrShare方法的成功回调。
     *
     */

    function addUpTCurrShareSuccess(dc) {
        var info = dc.getParameter("reAddUpTCurrShare");
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
    /**
     * @description:getTUnivrslShare方法的成功回调。
     *
     */

    function getTUnivrslShareSuccess(dc) {
        var result = dc.getDataStore("reTUnivrslShare");
        var count = result.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            result.rowSet.primary[i].insurtypeName = result.rowSet.primary[i].insurtypeCode + "-" + result.rowSet.primary[i].insurtypeName;
        }
        unieap.byId("insurtypeCode").getDataProvider().setDataStore(result);
    }

    function form5_2_saveButton_onClick(event) {
        if (!unieap.byId("form5_2").validate(false)) {
            return;
        }

        if (unieap.byId("startYearterm").getValue() > unieap.byId("endYearterm").getValue()) {
            MessageBox.alert({
                title: '提示',
                message: "起始年期 不能大于 终止年期！"
            });
            return;
        }

        view.processor.addUpTCurrShare(view.form.getDataStore('form5_2'), opt);
    }

    var view = new _factoryabclife.risk.pFInterestRateCruuDialog.View();
    view.init();

    return view;
})