/**
 * 组合定义页面弹窗
 * @author Administrator
 * @creationTime 2016-11-11 09:54:05
 * @modificationTime 2017-03-06 10:40:10
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryComboSuccess: queryComboSuccess,
                saveComboInfSuccess: saveComboInfSuccess,
                comboCode_onBlur: comboCode_onBlur,
                form1_saveButton_onClick: form1_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.combo.pfComboDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_aa')) {
                var tComboInf_aa = new unieap.ds.DataStore('tComboInf_aa');
                tComboInf_aa.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_aa);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("comboCode"), "onBlur", this.comboCode_onBlur);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            if (opt == "update") {
                view.form.setDataStore("form_combo", datas.row);
                unieap.byId("comboCode").setReadOnly(true);
            }
        }


    });
    /**
     * @description:queryCombo方法的成功回调。
     *
     */

    function queryComboSuccess(dc) {
        var result = dc.getDataStore("queryComboInfByCode");
        var count = result.getRowSet().getRowCount();

        if (count > 0) {
            unieap.byId("comboVer").setValue(result.getRowSet().getRow(0).getItemValue("comboVer") + 1);
            unieap.byId("comboAbbr").setValue(result.getRowSet().getRow(0).getItemValue("comboAbbr"));
            unieap.byId("comboName").setValue(result.getRowSet().getRow(0).getItemValue("comboName"));
            unieap.byId("remark").setValue(result.getRowSet().getRow(0).getItemValue("remark"));
        }
        else {
            unieap.byId("comboVer").setValue("1");
            unieap.byId("comboAbbr").setValue("");
            unieap.byId("comboName").setValue("");
            unieap.byId("remark").setValue("");

        }
    }
    /**
     * @description:saveComboInf方法的成功回调。
     *
     */

    function saveComboInfSuccess(dc) {
        var info = dc.getParameter("saveComboInf");
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

    function comboCode_onBlur(event) {
        var code = unieap.byId("comboCode").getValue();

        var pattren = /^[C][0-9]{3}$/;
        if (pattren.test(code)) {}
        else {
            MessageBox.alert({
                title: '提示',
                message: '组合编码格式为:C+三位数字，如：C001'
            });
            return;
        }
        if (code == "" || code == null) {}
        else {
            view.processor.queryCombo(code);
        }


    }

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form_combo").validate(false)) {
            return;
        }

        var comboInf = view.form.getDataStore("form_combo");

        view.processor.saveComboInf(comboInf, opt);
    }

    var view = new _factoryabclife.combo.pfComboDialog.View();
    view.init();

    return view;
})