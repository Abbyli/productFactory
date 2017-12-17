/**
 * 选择险种弹窗
 * @author Administrator
 * @creationTime 2016-11-14 16:49:26
 * @modificationTime 2017-03-23 15:27:26
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboChooseDialog", function () {

    var insurtypeId = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboChooseDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getInsurCodeSuccess: getInsurCodeSuccess,
                getPricingLiabSuccess: getPricingLiabSuccess,
                saveComboInsurSuccess: saveComboInsurSuccess,
                insurtypeCode_onBlur: insurtypeCode_onBlur,
                pricingCode_onChange: pricingCode_onChange,
                pricingCode_onBlur: pricingCode_onBlur,
                form_comboInsurtype_saveButton_onClick: form_comboInsurtype_saveButton_onClick,
                insurtypeId: insurtypeId
            });

            this.processor = new _factoryabclife.combo.pfComboChooseDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInsurtype_form')) {
                var tComboInsurtype_form = new unieap.ds.DataStore('tComboInsurtype_form');
                tComboInsurtype_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtype");

                dataCenter.addDataStore(tComboInsurtype_form);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_query')) {
                var tInsurtypeBasicInf_query = new unieap.ds.DataStore('tInsurtypeBasicInf_query');
                tInsurtypeBasicInf_query.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_query);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeCode"), "onBlur", this.insurtypeCode_onBlur);

            this.connect(unieap.byId("pricingCode"), "onChange", this.pricingCode_onChange);

            this.connect(unieap.byId("pricingCode"), "onBlur", this.pricingCode_onBlur);

            this.connect(unieap.byId("form_comboInsurtype_saveButton"), "onClick", this.form_comboInsurtype_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });
    /**
     * @description:getInsurCode方法的成功回调。
     *
     */

    function getInsurCodeSuccess(dc) {
        var result = dc.getDataStore("getCodeInsur");

        if (result.getRowSet().getRowCount() > 0) {
            unieap.byId("insurtypeName").setValue(result.rowSet.primary[0].insurtypeName);
            unieap.byId("insurtypeAbbr").setValue(result.rowSet.primary[0].insurtypeAbbr);
            unieap.byId("insurtypeVer").setValue(result.rowSet.primary[0].verNo);
            insurtypeId = result.rowSet.primary[0].insurtypeId;
            view.processor.getPricingLiab(result);
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "没有此险种"
            });
        }
    }
    /**
     * @description:getPricingLiab方法的成功回调。
     *
     */

    function getPricingLiabSuccess(dc) {
        var pricingLiab = dc.getDataStore("insurtyprestduty");
        if (pricingLiab.getRowSet().getRowCount() > 0) {
            unieap.byId("pricingCode").getDataProvider().setDataStore(pricingLiab);
            unieap.byId("pricingCode").setValue(pricingLiab.getRowSet().getRow(0).getItemValue("pricingLiabId"));
            unieap.byId("pricingName").setValue(pricingLiab.getRowSet().getRow(0).getItemValue("pricingLiabName"));
        }
    }
    /**
     * @description:saveComboInsur方法的成功回调。
     *
     */

    function saveComboInsurSuccess(dc) {
        var inf = dc.getParameter("saveComboInsurtype");
        if (inf == "") {
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
                title: "提示",
                message: inf
            });
        }
    }

    function insurtypeCode_onBlur(event) {
        var code = unieap.byId("insurtypeCode").getValue();
        var partten = /^[0-9]{4}$/;
        if (partten.test(code)) {
            view.processor.getInsurCode(code);
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请录入4位险种代码"
            });
        }
    }

    function pricingCode_onChange(value) {


    }

    function pricingCode_onBlur(event) {
        var pricingLiab = unieap.byId("pricingCode").getDataProvider().getDataStore();
        var value = unieap.byId("pricingCode").getValue();
        var a = value.split(",");
        var pricingName = "";
        for (var i = 0; i < pricingLiab.getRowSet().getRowCount(); i++) {
            for (var j = 0; j < a.length; j++) {
                if (a[j] == pricingLiab.getRowSet().getRow(i).getItemValue("pricingLiabId")) {
                    pricingName += "," + pricingLiab.getRowSet().getRow(i).getItemValue("pricingLiabName");
                }
            }

        }
        if (a.length > 0) {
            pricingName = pricingName.substring(1);
        }
        unieap.byId("pricingName").setValue(pricingName);
    }

    function form_comboInsurtype_saveButton_onClick(event) {
        if (!unieap.byId("form_comboInsurtype").validate(false)) {
            return;
        }
        var comboInf = unieap.getXDialog().dialogData.comboInf;
        var comboInsurtype = view.form.getDataStore("form_comboInsurtype");
        comboInsurtype.getRowSet().getRow(0).setItemValue("insurtypeId", insurtypeId);
        comboInsurtype.getRowSet().getRow(0).setItemValue("pricingCode", unieap.byId("pricingCode").getText());
        comboInsurtype.getRowSet().getRow(0).setItemValue("comboId", comboInf.getRowSet().getRow(0).getItemValue("comboId"));

        var pricingId = unieap.byId("pricingCode").getValue();
        var pricingCode = unieap.byId("pricingCode").getText();
        var pricingName = unieap.byId("pricingName").getValue();
        if (pricingId.match(",") != null) {
            var a = pricingId.split(",");
            var b = pricingCode.split(",");
            var c = pricingName.split(",");
            //	var d = comboInsurtype.rowSet.primary[0];
            var e = comboInsurtype.getRowSet().getRow(0).getData();
            for (var i = 0; i < a.length && i < b.length && i < c.length; i++) {
                if (i > 0) {
                    comboInsurtype.getRowSet().addRow(e, true, false);
                }
                comboInsurtype.getRowSet().getRow(i).setItemValue("pricingId", a[i]);
                comboInsurtype.getRowSet().getRow(i).setItemValue("pricingCode", b[i]);
                comboInsurtype.getRowSet().getRow(i).setItemValue("pricingName", c[i]);
            }

        }


        view.processor.saveComboInsur(comboInsurtype);
    }

    var view = new _factoryabclife.combo.pfComboChooseDialog.View();
    view.init();

    return view;
})