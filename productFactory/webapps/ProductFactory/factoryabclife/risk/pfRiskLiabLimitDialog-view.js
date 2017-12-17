/**
 *
 * @author Administrator
 * @creationTime 2016-08-24 10:48:22
 * @modificationTime 2017-01-18 10:36:21
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskLiabLimitDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskLiabLimitDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveLiabLimitSuccess: saveLiabLimitSuccess,
                protecLiabCode_onBlur: protecLiabCode_onBlur,
                save_onClick: save_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskLiabLimitDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tLiabLimit_save_limit')) {
                var tLiabLimit_save_limit = new unieap.ds.DataStore('tLiabLimit_save_limit');
                tLiabLimit_save_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabLimit");

                dataCenter.addDataStore(tLiabLimit_save_limit);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("protecLiabCode"), "onBlur", this.protecLiabCode_onBlur);

            this.connect(unieap.byId("save"), "onClick", this.save_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            var ds = datas.ds;
            unieap.byId("protecLiabCode").getDataProvider().setDataStore(ds);
            if (datas.opt == "update") {
                var refCode = datas.ds_limit.rowSet.primary[0].refProtecLiabCode;

                unieap.byId("protecLiabCode").setText(refCode);
                var codes = refCode.split(",");
                var count = ds.getRowSet().getRowCount();
                var name = "";
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < codes.length; j++) {
                        if (codes[j] == ds.rowSet.primary[i].protecLiabCode) {
                            name += "," + ds.rowSet.primary[i].protecLiabName;
                            break;
                        }
                    }
                }
                name = name.substring(1);

                unieap.byId("protecLiabName").setValue(name);

            }
        },
        page_init: function () {
            var ds = unieap.ds.DataStore("ds_limit_time2", [{
                CODENAME: "保险期间内",
                CODEVALUE: "02"
            }, {
                CODENAME: "单个保单年度内",
                CODEVALUE: "01"
            }]);

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:saveLiabLimit方法的成功回调。
     *
     */

    function saveLiabLimitSuccess(dc) {
        var info = dc.getParameter("saveLiabLimit");
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

    function protecLiabCode_onBlur(event) {
        unieap.byId("protecLiabName").setValue(unieap.byId("protecLiabCode").getValue());
    }

    function save_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }


        var datas = unieap.getXDialog().dialogData;
        var limit = datas.ds_limit;
        limit.rowSet.primary[0].refProtecLiabCode = unieap.byId("protecLiabCode").getText();
        limit.rowSet.primary[0].limitTimeType = unieap.byId("comboBox1").getValue();
        view.processor.saveLiabLimit(limit);
    }

    var view = new _factoryabclife.risk.pfRiskLiabLimitDialog.View();
    view.init();

    return view;
})