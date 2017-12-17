/**
	 * 组合要素
组合要素
	 * @author Administrator
	 * @creationTime 2016-11-17 09:41:20
	 * @modificationTime 2016-12-27 16:10:00
	 * @version 1.0.0 
	 * @generated
	 */
dojo.require("unieap.view.View");
unieap.define("pfComboElement", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboElement_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboElement.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getTobjElmenetSuccess: getTobjElmenetSuccess,
                update: update,
                delTObjSkelementSuccess: delTObjSkelementSuccess,
                del: del,
                cell_control_formatter: cell_control_formatter,
                grid_element_binding_rpc: grid_element_binding_rpc,
                xdialog1_onComplete: xdialog1_onComplete
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.comboInformation.pfComboElement.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjSkelement_element_grid')) {
                var tObjSkelement_element_grid = new unieap.ds.DataStore('tObjSkelement_element_grid');
                tObjSkelement_element_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjSkelement");

                dataCenter.addDataStore(tObjSkelement_element_grid);
            }

            if (!dataCenter.getDataStore('tComboInf_element')) {
                var tComboInf_element = new unieap.ds.DataStore('tComboInf_element');
                tComboInf_element.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_element);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合要素定义", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.getTobjElmenet(comboInf, "1", "10");
            })

            navigateButton.activeNavigateButton("comboElement");
        }


    });
    /**
     * @description:getTobjElmenet方法的成功回调。
     *
     */

    function getTobjElmenetSuccess(dc) {
        view.grid.setDataStore("grid_element", dc.getDataStore("getTObjSkElement"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var dialog = unieap.byId("xdialog1");
        var row = view.grid.getRow("grid_element", inRowIndex);
        dialog.dialogData = {
            "opt": "update",
            "comboInf": view.form.getDataStore("form_comboInf"),
            "row": row
        };
        dialog.title = "修改要素";
        dialog.show();
    }
    /**
     * @description:delTObjSkelement方法的成功回调。
     *
     */

    function delTObjSkelementSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示框",
            message: "删除成功"
        });
        view.processor.getTobjElmenet(dataCenter.getDataStore("comboInf"), "1", "10");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_element", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delTObjSkelement(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"查询\" " +
            "onclick=\"pfComboElement.update('" + inRowIndex + "')\" />";


        return updateBtn;
    }

    function grid_element_binding_rpc(store, load) {
        view.processor.getTobjElmenet(dataCenter.getDataStore("comboInf"), store.getPageNumber(), store.getPageSize());
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.getTobjElmenet(dataCenter.getDataStore("comboInf"), "1", "10");

    }

    var view = new _factoryabclife.comboInformation.pfComboElement.View();
    view.init();

    return view;
})