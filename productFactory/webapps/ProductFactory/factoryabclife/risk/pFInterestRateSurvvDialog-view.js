/**
 * 生存金累计生息利率
 * @author Neusoft
 * @creationTime 2016-11-11 10:21:54
 * @modificationTime 2017-03-09 09:57:58
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateSurvvDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateSurvvDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addUpTSurvvShareSuccess: addUpTSurvvShareSuccess,
                getTUnivrslShareSuccess: getTUnivrslShareSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pFInterestRateSurvvDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('add_tSurvvBeneAccumIntbeIntra')) {
                var add_tSurvvBeneAccumIntbeIntra = new unieap.ds.DataStore('add_tSurvvBeneAccumIntbeIntra');
                add_tSurvvBeneAccumIntbeIntra.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvBeneAccumIntbeIntra");

                dataCenter.addDataStore(add_tSurvvBeneAccumIntbeIntra);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            view.processor.getTUnivrslShare();
            if (opt == "update") {
                view.form.setDataStore("form2_2", datas.row);
            }

        }


    });
    /**
     * @description:addUpTSurvvShare方法的成功回调。
     *
     */

    function addUpTSurvvShareSuccess(dc) {
        var info = dc.getParameter("reAddUpTSurvvShare");
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

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form2_2").validate(false)) {
            return;
        }
        if (unieap.byId("startDate").getValue() > unieap.byId("endDate").getValue()) {
            MessageBox.alert({
                title: '提示',
                message: "利率开始日期 不能大于 利率结束日期！"
            });
            return;
        }
        view.processor.addUpTSurvvShare(view.form.getDataStore('form2_2'), opt);
    }

    var view = new _factoryabclife.risk.pFInterestRateSurvvDialog.View();
    view.init();

    return view;
})