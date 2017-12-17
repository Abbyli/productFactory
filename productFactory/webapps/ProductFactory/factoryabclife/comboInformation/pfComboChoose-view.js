/**
 * 选择险种
 * @author Administrator
 * @creationTime 2016-11-14 09:32:06
 * @modificationTime 2016-12-27 15:33:41
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboChoose", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboChoose_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboChoose.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryComboInsurSuccess: queryComboInsurSuccess,
                del: del,
                delComboInsurSuccess: delComboInsurSuccess,
                grid_insurtype_binding_rpc: grid_insurtype_binding_rpc
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.comboInformation.pfComboChoose.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_choose_form')) {
                var tComboInf_choose_form = new unieap.ds.DataStore('tComboInf_choose_form');
                tComboInf_choose_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_choose_form);
            }

            if (!dataCenter.getDataStore('tComboInsurtype_grid')) {
                var tComboInsurtype_grid = new unieap.ds.DataStore('tComboInsurtype_grid');
                tComboInsurtype_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtype");

                dataCenter.addDataStore(tComboInsurtype_grid);
            }
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("审核组合信息", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.queryComboInsur(comboInf, "1", "10");
            })

            navigateButton.activeNavigateButton("choose");
        }


    });
    /**
     * @description:queryComboInsur方法的成功回调。
     *
     */

    function queryComboInsurSuccess(dc) {
        var result = dc.getDataStore("queryComboInsurtypeForPage");
        view.grid.setDataStore("grid_insurtype", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(rowIndex) {
        var selectRow = view.grid.getRow("grid_insurtype", rowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    view.processor.delComboInsur(selectRow);
                }
            }
        });
    }
    /**
     * @description:delComboInsur方法的成功回调。
     *
     */

    function delComboInsurSuccess(dc) {
        view.processor.queryComboInsur(view.form.getDataStore("form_comboInf"), "1", "10");
    }

    function grid_insurtype_binding_rpc(store, load) {
        view.processor.queryComboInsur(view.form.getDataStore("form_comboInf"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.comboInformation.pfComboChoose.View();
    view.init();

    return view;
})