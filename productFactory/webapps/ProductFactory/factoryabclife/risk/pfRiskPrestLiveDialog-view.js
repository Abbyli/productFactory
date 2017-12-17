/**
 * 生存给付 增/修 弹窗
 * @author Administrator
 * @creationTime 2016-07-08 15:02:24
 * @modificationTime 2017-03-24 10:44:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestLiveDialog", function () {

    var prestLive = null;

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestLiveDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveTSurvvGivepayDefSuccess: saveTSurvvGivepayDefSuccess,
                survvGivepayType_onChange: survvGivepayType_onChange,
                form_live_saveButton_onClick: form_live_saveButton_onClick,
                prestLive: prestLive,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfRiskPrestLiveDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tSurvvGivepayDef_dialogform')) {
                var tSurvvGivepayDef_dialogform = new unieap.ds.DataStore('tSurvvGivepayDef_dialogform');
                tSurvvGivepayDef_dialogform.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef");

                dataCenter.addDataStore(tSurvvGivepayDef_dialogform);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("survvGivepayType"), "onChange", this.survvGivepayType_onChange);

            this.connect(unieap.byId("form_live_saveButton"), "onClick", this.form_live_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            prestLive = datas.prestLive;
            opt = datas.opt;

            unieap.byId("survvGivepayCode").setValue(prestLive.rowSet.primary[0].protecLiabCode);
            if (opt == "update") {
                unieap.byId("survvGivepayType").onChange(datas.live.rowSet.primary[0].survvGivepayType);
                view.form.setDataStore("form_live", datas.live);
                unieap.byId("survvGivepayType").setDisabled(true);


            }

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_type", [{
                CODEVALUE: "S1",
                CODENAME: "生存金"
            }, {
                CODEVALUE: "S2",
                CODENAME: "满期金"
            }, {
                CODEVALUE: "S3",
                CODENAME: "养老金"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_unit", [{
                CODEVALUE: "Y",
                CODENAME: "年"
            }, {
                CODEVALUE: "A",
                CODENAME: "岁"
            }]);

            var ds2 = new unieap.ds.DataStore("calc_ref", [{
                CODEVALUE: "S",
                CODENAME: "起保日期对应日"
            }, {
                CODEVALUE: "B",
                CODENAME: "出生日期对应日"
            }, {
                CODEVALUE: "C",
                CODENAME: "参考保单选择"
            }]);
            var ds3 = new unieap.ds.DataStore("calc_way", [{
                CODEVALUE: "0",
                CODENAME: "以计算为准"
            }, {
                CODEVALUE: "1",
                CODENAME: "取计算后当月一号"
            }, {
                CODEVALUE: "2",
                CODENAME: "取计算后当年一号"
            }, {
                CODEVALUE: "3",
                CODENAME: "取保险终止日期"
            }]);


            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
        }

    });
    /**
     * @description:saveTSurvvGivepayDef方法的成功回调。
     *
     */

    function saveTSurvvGivepayDefSuccess(dc) {
        var info = dc.getParameter("saveTSurvvGivepayDef");
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

    function survvGivepayType_onChange(value) {
        if (value == "S2") {
            unieap.byId("givepayIntv").setValue("0");
            unieap.byId("givepayIntv").setReadOnly(true);
            unieap.byId("startDrawDateCalcRef").setValue("S");
            unieap.byId("startDrawDateCalcRef").setDisabled(true);
            unieap.byId("startDrawDateCalcWay").setValue("3");
            unieap.byId("startDrawDateCalcWay").setDisabled(true);
            unieap.byId("stopDrawDateCalcRef").setValue("S");
            unieap.byId("stopDrawDateCalcRef").setDisabled(true);
            unieap.byId("stopDrawDateCalcWay").setValue("3");
            unieap.byId("stopDrawDateCalcWay").setDisabled(true);

            unieap.byId("startDrawDate").setValue("");
            unieap.byId("startDrawDateUnit").setValue("");
            unieap.byId("stopDrawDate").setValue("");
            unieap.byId("stopDrawDateUnit").setValue("");

            unieap.byId("startDrawDate").setRequired(false);
            unieap.byId("startDrawDateUnit").setRequired(false);
            //	unieap.byId("stopDrawDate").setRequired(false);
            //	unieap.byId("stopDrawDateUnit").setRequired(false);
            unieap.byId("startDrawDate").setReadOnly(true);
            unieap.byId("startDrawDateUnit").setReadOnly(true);
            unieap.byId("stopDrawDate").setReadOnly(true);
            unieap.byId("stopDrawDateUnit").setReadOnly(true);

        }
        else {
            unieap.byId("givepayIntv").setReadOnly(false);
            unieap.byId("startDrawDate").setRequired(false);
            unieap.byId("startDrawDateUnit").setRequired(false);
            //	unieap.byId("stopDrawDate").setRequired(true);
            //	unieap.byId("stopDrawDateUnit").setRequired(true);
            unieap.byId("startDrawDate").setReadOnly(false);
            unieap.byId("startDrawDateUnit").setReadOnly(false);
            unieap.byId("stopDrawDate").setReadOnly(false);
            unieap.byId("stopDrawDateUnit").setReadOnly(false);

            unieap.byId("startDrawDateCalcRef").setValue("");
            unieap.byId("startDrawDateCalcRef").setDisabled(false);
            unieap.byId("startDrawDateCalcWay").setValue("");
            unieap.byId("startDrawDateCalcWay").setDisabled(false);
            unieap.byId("stopDrawDateCalcRef").setValue("");
            unieap.byId("stopDrawDateCalcRef").setDisabled(false);
            unieap.byId("stopDrawDateCalcWay").setValue("");
            unieap.byId("stopDrawDateCalcWay").setDisabled(false);
        }
    }

    function form_live_saveButton_onClick(event) {
        if (!unieap.byId("form_live").validate(false)) {
            return;
        }

        var data = view.form.getDataStore("form_live");
        data.rowSet.primary[0].protecLiabId = prestLive.rowSet.primary[0].protecLiabId;
        data.rowSet.primary[0].protecLiabCode = prestLive.rowSet.primary[0].protecLiabCode;

        data.rowSet.primary[0].pricingLiabCode = prestLive.rowSet.primary[0].pricingLiabCode;
        view.processor.saveTSurvvGivepayDef(data, opt);
    }

    var view = new _factoryabclife.risk.pfRiskPrestLiveDialog.View();
    view.init();

    return view;
})