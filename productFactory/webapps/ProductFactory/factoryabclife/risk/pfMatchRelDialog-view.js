/**
 * 险种搭配弹窗
 * @author zhy
 * @creationTime 2016-08-01 11:22:07
 * @modificationTime 2017-03-24 15:10:45
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfMatchRelDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfMatchRelDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                savaMatchRelSuccess: savaMatchRelSuccess,
                queryMatchRowSuccess: queryMatchRowSuccess,
                queryRiskNameSuccess: queryRiskNameSuccess,
                assocProductCode__MatchRel_onBlur: assocProductCode__MatchRel_onBlur,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _factoryabclife.risk.pfMatchRelDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tProductInsurtypeMatchRel_form')) {
                var tProductInsurtypeMatchRel_form = new unieap.ds.DataStore('tProductInsurtypeMatchRel_form');
                tProductInsurtypeMatchRel_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductInsurtypeMatchRel");

                dataCenter.addDataStore(tProductInsurtypeMatchRel_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("assocProductCode__MatchRel"), "onBlur", this.assocProductCode__MatchRel_onBlur);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            var opt = datas.opt;

            if (opt == "update") {
                var basic = datas.basic;
                var addition = datas.selectRow.rowSet.primary[0].insurtypeCode;
                view.processor.queryMatchRow(basic, addition);
            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_deduc", [{
                CODEVALUE: "N",
                CODENAME: "否"
            }, {
                CODEVALUE: "Y",
                CODENAME: "是"
            }]);
            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:savaMatchRel方法的成功回调。
     *
     */

    function savaMatchRelSuccess(dc) {
        var info = dc.getParameter("savaAdditionResult");
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
     * @description:queryMatchRow方法的成功回调。
     *
     */

    function queryMatchRowSuccess(dc) {
        var result = dc.getDataStore("queryMatchRowResult");
        view.form.setDataStore("form_MatchRel", result);
        view.processor.queryRiskName(unieap.byId("assocProductCode__MatchRel").getValue());
    }
    /**
     * @description:queryRiskName方法的成功回调。
     *
     */

    function queryRiskNameSuccess(dc) {
        var result = dc.getDataStore("queryRiskNameResult");
        unieap.byId("textBox_riskname").setValue("");
        if (result.rowSetName != "") {
            var riskname = result.rowSet.primary[0].insurtypeName;
            unieap.byId("textBox_riskname").setValue(riskname);
        }
    }

    function assocProductCode__MatchRel_onBlur(event) {
        view.processor.queryRiskName(unieap.byId("assocProductCode__MatchRel").getValue());
    }

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form_MatchRel").validate(false)) {
            return;
        }
        //保存form中的数据
        var conditionDs = view.form.getDataStore('form_MatchRel');
        conditionDs.rowSet.primary[0].matchType = "01";
        conditionDs.rowSet.primary[0].matchRel = "01";

        var datas = unieap.getXDialog().dialogData;
        if (datas.matchRel == '01') {
            conditionDs.rowSet.primary[0].matchRel = "11";
        }

        var basic = datas.basic;
        var opt = datas.opt;
        view.processor.savaMatchRel(conditionDs, basic, opt);

    }

    var view = new _factoryabclife.risk.pfMatchRelDialog.View();
    view.init();

    return view;
})