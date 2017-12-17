/**
 *
 * @author Administrator
 * @creationTime 2016-11-23 15:19:13
 * @modificationTime 2016-11-30 09:42:41
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboInsurtypeRefFixDialog2", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog2.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveSuccess: saveSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog2.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInsurtypeElemRel_fix_form')) {
                var tComboInsurtypeElemRel_fix_form = new unieap.ds.DataStore('tComboInsurtypeElemRel_fix_form');
                tComboInsurtypeElemRel_fix_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel");

                dataCenter.addDataStore(tComboInsurtypeElemRel_fix_form);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", datas.row);
        }


    });
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: '提示',
            message: '保存成功！',
            onComplete: function () {
                unieap.getXDialog().close(true);
            }
        });
    }

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }

        view.processor.save(view.form.getDataStore("form1"));
    }

    var view = new _factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog2.View();
    view.init();

    return view;
})