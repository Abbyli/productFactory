/**
 * 万能险新增
 * @author Neusoft
 * @creationTime 2016-11-08 10:09:56
 * @modificationTime 2017-03-09 09:58:28
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateUnivrslDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateUnivrslDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getTUnivrslShareSuccess: getTUnivrslShareSuccess,
                addUpTUnivrslShareSuccess: addUpTUnivrslShareSuccess,
                insurtypeCode_onChange: insurtypeCode_onChange,
                form1_2_saveButton_onClick: form1_2_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pFInterestRateUnivrslDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('add_tUnivrslSettlIntrate')) {
                var add_tUnivrslSettlIntrate = new unieap.ds.DataStore('add_tUnivrslSettlIntrate');
                add_tUnivrslSettlIntrate.setRowSetName("com.neusoft.abclife.productfactory.entity.TUnivrslSettlIntrate");

                dataCenter.addDataStore(add_tUnivrslSettlIntrate);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeCode"), "onChange", this.insurtypeCode_onChange);

            this.connect(unieap.byId("form1_2_saveButton"), "onClick", this.form1_2_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            view.processor.getTUnivrslShare();
            if (opt == "update") {
                view.form.setDataStore("form1_2", datas.row);
            }

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("intrateType", [{
                CODENAME: "年利率",
                CODEVALUE: "Y"
            }, {
                CODENAME: "月利率",
                CODEVALUE: "M"
            }])
            dataCenter.addDataStore(ds);


        }

    });
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
    /**
     * @description:addUpTUnivrslShare方法的成功回调。
     *
     */

    function addUpTUnivrslShareSuccess(dc) {
        var info = dc.getParameter("reAddUpTUnivrslShare");
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

    function insurtypeCode_onChange(value) {
        unieap.byId("accCode").setValue(value + "01");
        //var rowSet = new unieap.ds.RowSet([
        //{CODENAME:value+"01-万能账户",CODEVALUE:value+"01"}]);
        //var ds = new unieap.ds.DataStore();
        //ds.setRowSet(rowSet);
        //unieap.byId("accCode").getDataProvider().setDataStore(ds);

        //var ds = new unieap.ds.DataStore("accCode",[
        //{CODENAME:value+"年",CODEVALUE:"Y"}
        //])
        //dataCenter.addDataStore(ds);	
    }

    function form1_2_saveButton_onClick(event) {
        if (!unieap.byId("form1_2").validate(false)) {
            return;
        }
        if (unieap.byId("intrateApplicationStartDate").getValue() > unieap.byId("intrateApplicationEndDate").getValue()) {
            MessageBox.alert({
                title: '提示',
                message: "利率应用开始日期 不能大于 利率应用结束日期！"
            });
            return;
        }
        view.processor.addUpTUnivrslShare(view.form.getDataStore('form1_2'), opt);

    }

    var view = new _factoryabclife.risk.pFInterestRateUnivrslDialog.View();
    view.init();

    return view;
})