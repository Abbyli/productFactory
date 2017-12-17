/**
 * 组合属性
 * @author Administrator
 * @creationTime 2016-11-16 10:42:54
 * @modificationTime 2017-03-28 10:34:43
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboAttrib", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboAttrib_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboAttrib.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryAttribSuccess: queryAttribSuccess,
                saveAttrSuccess: saveAttrSuccess,
                queryFormulaSuccess: queryFormulaSuccess,
                getMapSuccess: getMapSuccess,
                saveAttrib_onClick: saveAttrib_onClick,
                isHaveIndependRate_onChange: isHaveIndependRate_onChange,
                isByCopiesSales_onChange: isByCopiesSales_onChange
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.combo.pfComboAttrib.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_attrib_form')) {
                var tComboInf_attrib_form = new unieap.ds.DataStore('tComboInf_attrib_form');
                tComboInf_attrib_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_attrib_form);
            }

            if (!dataCenter.getDataStore('tComboAttrib_form')) {
                var tComboAttrib_form = new unieap.ds.DataStore('tComboAttrib_form');
                tComboAttrib_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboAttrib");

                dataCenter.addDataStore(tComboAttrib_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("saveAttrib"), "onClick", this.saveAttrib_onClick);

            this.connect(unieap.byId("isHaveIndependRate"), "onChange", this.isHaveIndependRate_onChange);

            this.connect(unieap.byId("isByCopiesSales"), "onChange", this.isByCopiesSales_onChange);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合属性", function (dc) {
                view.processor.queryFormula();

                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.getMap(comboInf);
                view.processor.queryAttrib(comboInf);
                unieap.byId("suminsurAlgoId").setDisabled(true);
                unieap.byId("premAlgoId").setDisabled(true);
            })

            navigateButton.activeNavigateButton("comboAttr");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_saleWay", [{
                CODENAME: "按保费方式销售",
                CODEVALUE: "01"
            }, {
                CODENAME: "按保额方式销售",
                CODEVALUE: "02"
            }, {
                CODENAME: "按份数销售",
                CODEVALUE: "03"
            }, {
                CODENAME: "录入保费保额",
                CODEVALUE: "04"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_YON", [{
                CODEVALUE: "1",
                CODENAME: "是 "
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            var ds2 = new unieap.ds.DataStore("ds_test", [{
                CODEVALUE: "1",
                CODENAME: "生存金进万能账户"
            }, {
                CODEVALUE: "2",
                CODENAME: "红利进万能账户"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);

        }

    });
    /**
     * @description:queryAttrib方法的成功回调。
     *
     */

    function queryAttribSuccess(dc) {
        var result = dc.getDataStore("queryComboAttrib");
        if (result.getRowSet().getRowCount() > 0) {
            var rate = result.getRowSet().getRow(0).getItemValue("isHaveIndependRate");
            var sale = result.getRowSet().getRow(0).getItemValue("isByCopiesSales");
            unieap.byId("isByCopiesSales").onChange(sale);
            unieap.byId("isHaveIndependRate").onChange(rate);
            if (result.getRowSet().getRow(0).getItemValue("bonusToAccFlag") == "1") {
                unieap.byId("checkBoxGroup1").setValue("bonus");
            }
            s
            if (result.getRowSet().getRow(0).getItemValue("liveToAccFlag") == "1") {
                unieap.byId("checkBoxGroup1").setValue("live");
            }

            if (result.getRowSet().getRow(0).getItemValue("bonusToAccFlag") == "1" &&
                result.getRowSet().getRow(0).getItemValue("liveToAccFlag") == "1") {
                unieap.byId("checkBoxGroup1").setValue("bonus,live");
            }
            view.form.setDataStore("form_attrib", result);
        }
    }
    /**
     * @description:saveAttr方法的成功回调。
     *
     */

    function saveAttrSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示",
            message: "保存成功"
        });
    }
    /**
     * @description:queryFormula方法的成功回调。
     *
     */

    function queryFormulaSuccess(dc) {
        unieap.byId("premAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaComboPrem"));
        unieap.byId("suminsurAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaComboAmnt"));
    }
    /**
     * @description:getMap方法的成功回调。
     *
     */

    function getMapSuccess(dc) {
        var result = dc.getDataStore("getMapForFlag");
        var ds = new unieap.ds.DataStore();

        var rowSet = new unieap.ds.RowSet();
        if (result.rowSet.primary[0].live != null && result.rowSet.primary[0].live != undefined) {
            rowSet.addRow({
                CODENAME: "生存金进万能账户",
                CODEVALUE: "live"
            });
        }
        if (result.rowSet.primary[0].bonus != null && result.rowSet.primary[0].bonus != undefined) {
            rowSet.addRow({
                CODENAME: "红利进万能账户",
                CODEVALUE: "bonus"
            });
        }
        ds.setRowSet(rowSet);

        unieap.byId("checkBoxGroup1").getDataProvider().setDataStore(ds);
    }

    function saveAttrib_onClick(event) {
        if (!unieap.byId("form_attrib").validate(false)) {
            return;
        }

        var comboAttrib = view.form.getDataStore("form_attrib");
        comboAttrib.getRowSet().getRow(0).setItemValue("comboId", view.form.getDataStore("form_comboInf").getRowSet().getRow(0).getItemValue("comboId"));
        comboAttrib.getRowSet().getRow(0).setItemValue("liveToAccFlag", "0");
        comboAttrib.getRowSet().getRow(0).setItemValue("bonusToAccFlag", "0");
        var val = unieap.byId("checkBoxGroup1").getValue();
        var val_array = val.split(",");
        for (var i = 0; i < val_array.length; i++) {
            if (val_array[i] == "live") {
                comboAttrib.getRowSet().getRow(0).setItemValue("liveToAccFlag", "1");
            }
            if (val_array[i] == "bonus") {
                comboAttrib.getRowSet().getRow(0).setItemValue("bonusToAccFlag", "1");
            }
        }
        view.processor.saveAttr(comboAttrib);
    }

    function isHaveIndependRate_onChange(value) {
        if (value == "1") {
            unieap.byId("suminsurAlgoId").setDisabled(false);
            unieap.byId("premAlgoId").setDisabled(false);
            unieap.byId("suminsurAlgoId").setRequired(true);
            unieap.byId("premAlgoId").setRequired(true);
        }
        else {
            unieap.byId("suminsurAlgoId").setValue("");
            unieap.byId("premAlgoId").setValue("");
            unieap.byId("suminsurAlgoId").setDisabled(true);
            unieap.byId("premAlgoId").setDisabled(true);

        }
    }

    function isByCopiesSales_onChange(value) {
        //if(value == "1"){
        //	unieap.byId("unitPrem").setReadOnly(false);
        //	unieap.byId("unitSuminsur").setReadOnly(false);
        //	unieap.byId("unitPrem").setRequired(true);
        //	unieap.byId("unitSuminsur").setRequired(true);
        //}else{
        //	unieap.byId("unitPrem").setValue("");
        //	unieap.byId("unitSuminsur").setValue("");
        //	unieap.byId("unitPrem").setReadOnly(true);
        //	unieap.byId("unitSuminsur").setReadOnly(true);
        //	
        //}
    }

    var view = new _factoryabclife.combo.pfComboAttrib.View();
    view.init();

    return view;
})