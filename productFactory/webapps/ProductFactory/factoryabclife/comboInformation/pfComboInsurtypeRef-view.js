/**
 * 险种要素关系
 * @author Administrator
 * @creationTime 2016-11-17 09:53:41
 * @modificationTime 2016-12-27 16:19:04
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboInsurtypeRef", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboInsurtypeRef_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboInsurtypeRef.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryInsurElemSuccess: queryInsurElemSuccess,
                cal: cal,
                fixCombo: fixCombo,
                fixTextBox: fixTextBox,
                cell_control_formatter: cell_control_formatter,
                xdialog1_onComplete: xdialog1_onComplete,
                xdialog2_onComplete: xdialog2_onComplete,
                xdialog3_onComplete: xdialog3_onComplete
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.comboInformation.pfComboInsurtypeRef.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_insur_ref')) {
                var tComboInf_insur_ref = new unieap.ds.DataStore('tComboInf_insur_ref');
                tComboInf_insur_ref.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_insur_ref);
            }

            if (!dataCenter.getDataStore('tComboInsurtypeElemRel_grid')) {
                var tComboInsurtypeElemRel_grid = new unieap.ds.DataStore('tComboInsurtypeElemRel_grid');
                tComboInsurtypeElemRel_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel");

                dataCenter.addDataStore(tComboInsurtypeElemRel_grid);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

            this.connect(unieap.byId("xdialog2"), "onComplete", this.xdialog2_onComplete);

            this.connect(unieap.byId("xdialog3"), "onComplete", this.xdialog3_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种要素关系", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);
                view.processor.queryInsurElem(comboInf);
            })

            navigateButton.activeNavigateButton("elementRef");
        }


    });
    /**
     * @description:queryInsurElem方法的成功回调。
     *
     */

    function queryInsurElemSuccess(dc) {
        view.grid.setDataStore("grid_insurElem", dc.getDataStore("queryInsurElem"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function cal(inRowIndex) {
        var dialog = unieap.byId("xdialog1");
        dialog.dialogData = {
            "row": view.grid.getRow("grid_insurElem", inRowIndex),
            "comboInf": dataCenter.getDataStore("comboInf")
        };
        dialog.show();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function fixCombo(inRowIndex) {
        var dialog = unieap.byId("xdialog2");
        dialog.dialogData = {
            row: view.grid.getRow("grid_insurElem", inRowIndex)
        };
        dialog.show();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function fixTextBox(inRowIndex) {
        var dialog = unieap.byId("xdialog3");
        dialog.dialogData = {
            row: view.grid.getRow("grid_insurElem", inRowIndex)
        };
        dialog.show();
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";

        var row = view.grid.getRow("grid_insurElem", inRowIndex);
        var elementName = row.getRowSet().getRow(0).getItemValue("elemName");
        var updateBtn = "";
        if (elementName == "交费期间" || elementName == "保险期间" || elementName == "交费频率") {
            updateBtn = "<img src='" + editImg + "' " +
                "style=\"margin-right:10px; cursor:pointer\" title=\"设置固定值\" " +
                "onclick=\"pfComboInsurtypeRef.fixCombo('" + inRowIndex + "')\" />";
        }
        else if (elementName == "保额" || elementName == "保费") {
            updateBtn = "<img src='" + editImg + "' " +
                "style=\"margin-right:10px; cursor:pointer\" title=\"设置固定值\" " +
                "onclick=\"pfComboInsurtypeRef.cal('" + inRowIndex + "')\" />";
        }
        else {
            updateBtn = "<img src='" + editImg + "' " +
                "style=\"margin-right:10px; cursor:pointer\" title=\"设置固定值\" " +
                "onclick=\"pfComboInsurtypeRef.fixTextBox('" + inRowIndex + "')\" />";
        }


        return updateBtn;
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.queryInsurElem(dataCenter.getDataStore("comboInf"));
    }

    function xdialog2_onComplete(returnObj) {
        view.processor.queryInsurElem(dataCenter.getDataStore("comboInf"));
    }

    function xdialog3_onComplete(returnObj) {
        view.processor.queryInsurElem(dataCenter.getDataStore("comboInf"));
    }

    var view = new _factoryabclife.comboInformation.pfComboInsurtypeRef.View();
    view.init();

    return view;
})