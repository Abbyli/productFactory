/**
 * 组合属性
 * @author Administrator
 * @creationTime 2016-11-16 10:42:54
 * @modificationTime 2016-12-27 14:30:45
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

    dojo.declare("_factoryabclife.comboInformation.pfComboAttrib.View", unieap.view.View, {



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
                saveAttrib_onClick: saveAttrib_onClick
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.comboInformation.pfComboAttrib.Processor(this);

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

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合属性", function (dc) {
                view.processor.queryFormula();
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.queryAttrib(comboInf);
                unieap.byId("suminsurAlgoId").setDisabled(true);
                unieap.byId("premAlgoId").setDisabled(true);
            })

            navigateButton.activeNavigateButton("comboAttr");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_saleWay", [{
                CODEVALUE: "P",
                CODENAME: "按保费方式销售 "
            }, {
                CODEVALUE: "G",
                CODENAME: "按保额方式销售"
            }, {
                CODEVALUE: "I",
                CODENAME: "按保额保费方式销售"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_YON", [{
                CODEVALUE: "1",
                CODENAME: "是 "
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);

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

    function saveAttrib_onClick(event) {


        var comboAttrib = view.form.getDataStore("form_attrib");
        comboAttrib.getRowSet().getRow(0).setItemValue("comboId", view.form.getDataStore("form_comboInf").getRowSet().getRow(0).getItemValue("comboId"));
        view.processor.saveAttr(comboAttrib);
    }

    var view = new _factoryabclife.comboInformation.pfComboAttrib.View();
    view.init();

    return view;
})