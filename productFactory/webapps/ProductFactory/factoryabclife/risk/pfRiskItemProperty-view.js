/**
 *
 * @author Administrator
 * @creationTime 2016-08-12 09:36:12
 * @modificationTime 2016-08-16 15:59:51
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskItemProperty", function () {

    var result = null;

    var ds_psItemDef = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskItemProperty_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskItemProperty.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getFormulasSuccess: getFormulasSuccess,
                getInsurItemsSuccess: getInsurItemsSuccess,
                getPsItemDefsSuccess: getPsItemDefsSuccess,
                save_insuritem_onClick: save_insuritem_onClick,
                result: result,
                ds_psItemDef: ds_psItemDef
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskItemProperty.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_itemProperty_form')) {
                var tInsurtypeBasicInf_itemProperty_form = new unieap.ds.DataStore('tInsurtypeBasicInf_itemProperty_form');
                tInsurtypeBasicInf_itemProperty_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_itemProperty_form);
            }

            if (!dataCenter.getDataStore('tInsurtypePsItemDef_itemProperty_grid')) {
                var tInsurtypePsItemDef_itemProperty_grid = new unieap.ds.DataStore('tInsurtypePsItemDef_itemProperty_grid');
                tInsurtypePsItemDef_itemProperty_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef");

                dataCenter.addDataStore(tInsurtypePsItemDef_itemProperty_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("save_insuritem"), "onClick", this.save_insuritem_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种保全属性定义", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);

                view.processor.getInsurItems(tInsurtypeBasicInf.rowSet.primary[0].insurtypeId);

                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("itemProperty");


        },
        page_init: function () {

            view.processor.getFormulas();
            dataCenter.addDataStore("ds_formulaitem", result);
            view.processor.getPsItemDefs();
            dataCenter.addDataStore("ds_psItemDef", ds_psItemDef);
        }

    });
    /**
     * @description:getFormulas方法的成功回调。
     *
     */

    function getFormulasSuccess(dc) {
        result = dc.getDataStore("getFormulaG");
        var data = {
            id: "",
            memo: "无算法"
        };
        result.getRowSet().addRow(data, false, false);
    }
    /**
     * @description:getInsurItems方法的成功回调。
     *
     */

    function getInsurItemsSuccess(dc) {
        view.grid.setDataStore("grid_itemProperty", dc.getDataStore("getPsItemDef"));
    }
    /**
     * @description:getPsItemDefs方法的成功回调。
     *
     */

    function getPsItemDefsSuccess(dc) {
        ds_psItemDef = dc.getDataStore("getPsItemchange");
    }

    function save_insuritem_onClick(event) {
        var insurtype = view.form.getDataStore("form_insurtypebasicinf");
        var itemProperty = view.grid.getDataStore("grid_itemProperty");
        if (itemProperty) {
            view.processor.saveItemProperty(itemProperty, insurtype);
        }
    }

    var view = new _factoryabclife.risk.pfRiskItemProperty.View();
    view.init();

    return view;
})