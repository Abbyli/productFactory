/**
 * 红利参数
 * @author Neusoft
 * @creationTime 2016-11-16 09:52:20
 * @modificationTime 2017-03-09 09:54:35
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateDividDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateDividDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addUpTDividShareSuccess: addUpTDividShareSuccess,
                form4_2_saveButton_onClick: form4_2_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pFInterestRateDividDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('add_tDividParam')) {
                var add_tDividParam = new unieap.ds.DataStore('add_tDividParam');
                add_tDividParam.setRowSetName("com.neusoft.abclife.productfactory.entity.TDividParam");

                dataCenter.addDataStore(add_tDividParam);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form4_2_saveButton"), "onClick", this.form4_2_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            if (opt == "update") {
                view.form.setDataStore("form4_2", datas.row);
            }
        }


    });
    /**
     * @description:addUpTDividShare方法的成功回调。
     *
     */

    function addUpTDividShareSuccess(dc) {
        var info = dc.getParameter("reAddUpTDividShare");
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

    function form4_2_saveButton_onClick(event) {
        if (!unieap.byId("form4_2").validate(false)) {
            return;
        }

        view.processor.addUpTDividShare(view.form.getDataStore('form4_2'), opt);
    }

    var view = new _factoryabclife.risk.pFInterestRateDividDialog.View();
    view.init();

    return view;
})