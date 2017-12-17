/**
 * 保全项定义
 * @author zhy
 * @creationTime 2016-08-11 16:36:39
 * @modificationTime 2016-08-16 16:37:10
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskItem", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskItem_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskItem.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryItemSuccess: queryItemSuccess,
                saveItemSuccess: saveItemSuccess,
                queryRiskItemSuccess: queryRiskItemSuccess,
                button1_onClick: button1_onClick
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskItem.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_form')) {
                var tInsurtypeBasicInf_form = new unieap.ds.DataStore('tInsurtypeBasicInf_form');
                tInsurtypeBasicInf_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_form);
            }

            if (!dataCenter.getDataStore('tPsItemDef_grid')) {
                var tPsItemDef_grid = new unieap.ds.DataStore('tPsItemDef_grid');
                tPsItemDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TPsItemDef");

                dataCenter.addDataStore(tPsItemDef_grid);
            }

            if (!dataCenter.getDataStore('tInsurtypePsItemDef')) {
                var tInsurtypePsItemDef = new unieap.ds.DataStore('tInsurtypePsItemDef');
                tInsurtypePsItemDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef");

                dataCenter.addDataStore(tInsurtypePsItemDef);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种保全项定义", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                //重复加载数据
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insur", tInsurtypeBasicInf);
                view.processor.queryItem();
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("item");
        }


    });
    /**
     * @description:queryItem方法的成功回调。
     *
     */

    function queryItemSuccess(dc) {
        var result = dc.getDataStore("queryItemResult");
        unieap.byId("checkBoxGroup1").getDataProvider().setDataStore(result);
        //险种保全查询
        var basic = unieap.byId("form_insur").getBinding().getDataStore();
        view.processor.queryRiskItem(basic);
    }
    /**
     * @description:saveItem方法的成功回调。
     *
     */

    function saveItemSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示",
            message: "保存成功"
        });
    }
    /**
     * @description:queryRiskItem方法的成功回调。
     *
     */

    function queryRiskItemSuccess(dc) {
        var result = dc.getDataStore("queryRiskItemResult");
        var count = result.getRowSet().getRowCount();
        if (count > 0) {
            var value = result.rowSet.primary[0].psItemId;
            for (var i = 1, j = count; i < j; i++) {
                value = value + "," + result.rowSet.primary[i].psItemId;
            }
            unieap.byId("checkBoxGroup1").setValue(value);
        }
    }

    function button1_onClick(event) {
        var riskIrem = unieap.byId("checkBoxGroup1").getValue();

        var basic = view.form.getDataStore("form_insur");
        view.processor.saveItem(riskIrem, basic);
    }

    var view = new _factoryabclife.risk.pfRiskItem.View();
    view.init();

    return view;
})