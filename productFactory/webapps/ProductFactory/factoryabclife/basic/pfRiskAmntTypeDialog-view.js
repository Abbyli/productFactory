/**
 *
 * @author Administrator
 * @creationTime 2016-07-20 09:24:23
 * @modificationTime 2016-09-28 16:22:39
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAmntTypeDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfRiskAmntTypeDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveTfRiskamntTypeSuccess: saveTfRiskamntTypeSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _factoryabclife.basic.pfRiskAmntTypeDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tRiskamntTypeDef_form')) {
                var tRiskamntTypeDef_form = new unieap.ds.DataStore('tRiskamntTypeDef_form');
                tRiskamntTypeDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TRiskamntTypeDef");

                dataCenter.addDataStore(tRiskamntTypeDef_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = unieap.getXDialog().dialogData;
            if (data.opt == "update") {
                view.form.setDataStore("form1", data.riskamnt);
            }
        },
        page_init: function () {


        }

    });
    /**
     * @description:saveTfRiskamntType方法的成功回调。
     *
     */

    function saveTfRiskamntTypeSuccess(dc) {
        var info = dc.getParameter("saveTfRiskamntType");
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

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }

        var opt = unieap.getXDialog().dialogData.opt;
        var riskAmnt = view.form.getDataStore("form1");
        view.processor.saveTfRiskamntType(riskAmnt, opt);
    }

    var view = new _factoryabclife.basic.pfRiskAmntTypeDialog.View();
    view.init();

    return view;
})