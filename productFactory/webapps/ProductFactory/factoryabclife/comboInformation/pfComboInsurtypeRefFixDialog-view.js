/**
 * 组合险种要素关系固定值
 * @author Administrator
 * @creationTime 2016-11-21 10:17:01
 * @modificationTime 2016-11-30 13:55:30
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboInsurtypeRefFixDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryInsurParamSuccess: queryInsurParamSuccess,
                saveComboInsurElemSuccess: saveComboInsurElemSuccess,
                save_onClick: save_onClick
            });

            this.processor = new _factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInsurtypeElemRel_setFix')) {
                var tComboInsurtypeElemRel_setFix = new unieap.ds.DataStore('tComboInsurtypeElemRel_setFix');
                tComboInsurtypeElemRel_setFix.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel");

                dataCenter.addDataStore(tComboInsurtypeElemRel_setFix);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("save"), "onClick", this.save_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            var row = datas.row;
            if (row.getRowSet().getRow(0).getItemValue("elemName") == "保险期间") {
                row.getRowSet().getRow(0).setItemValue("elemName", "02");
            }
            if (row.getRowSet().getRow(0).getItemValue("elemName") == "交费频率") {
                row.getRowSet().getRow(0).setItemValue("elemName", "04");
            }
            if (row.getRowSet().getRow(0).getItemValue("elemName") == "交费期间") {
                row.getRowSet().getRow(0).setItemValue("elemName", "01");
            }

            view.processor.queryInsurParam(row);

        }


    });
    /**
     * @description:queryInsurParam方法的成功回调。
     *
     */

    function queryInsurParamSuccess(dc) {
        var result = dc.getDataStore("queryTProductParamDef");
        var count = result.getRowSet().getRowCount();
        if (count > 0) {
            if (result.getRowSet().getRow(0).getItemValue("paramType") == "04") {
                for (var i = 0; i < count; i++) {
                    var val = result.getRowSet().getRow(i).getItemValue("paramVal");
                    if (val == "0") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "一次交清");
                    }
                    else if (val == "1") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "月交");
                    }
                    else if (val == "3") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "季交");
                    }
                    else if (val == "6") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "半年交");
                    }
                    else if (val == "12") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "年交");
                    }
                    else if (val == "-1") {
                        result.getRowSet().getRow(i).setItemValue("paramDesc", "不定期交");
                    }
                    result.getRowSet().getRow(i).setItemValue("paramUnit", val);

                }
            }
            else {
                for (var i = 0; i < count; i++) {
                    var s = result.getRowSet().getRow(i).getItemValue("paramVal") + "-" + result.getRowSet().getRow(i).getItemValue("paramUnit");
                    result.getRowSet().getRow(i).setItemValue("paramUnit", s);
                }
            }
        }

        var row = result.getRowSet().getRows();
        var ds = new unieap.ds.DataStore("ds_fix", [{
            "paramDesc": "默认",
            "paramUnit": ""
        }]);
        ds.rowSetName = "com.neusoft.abclife.productfactory.entity.TProductParamDef";
        ds.append(result, "append");
        unieap.byId("fixVal").getDataProvider().setDataStore(ds);

        var datas = unieap.getXDialog().dialogData;
        var data = datas.row;
        view.form.setDataStore("form_fix", data);
    }
    /**
     * @description:saveComboInsurElem方法的成功回调。
     *
     */

    function saveComboInsurElemSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: '提示',
            message: '保存成功！',
            onComplete: function () {
                unieap.getXDialog().close(true);
            }
        });
    }

    function save_onClick(event) {
        if (!unieap.byId("form_fix").validate(false)) {
            return;
        }

        var comInsurElem = view.form.getDataStore("form_fix");

        if (comInsurElem.getRowSet().getRow(0).getItemValue("elemName") == "02") {
            comInsurElem.getRowSet().getRow(0).setItemValue("elemName", "保险期间");
        }
        if (comInsurElem.getRowSet().getRow(0).getItemValue("elemName") == "04") {
            comInsurElem.getRowSet().getRow(0).setItemValue("elemName", "交费频率");
        }
        if (comInsurElem.getRowSet().getRow(0).getItemValue("elemName") == "01") {
            comInsurElem.getRowSet().getRow(0).setItemValue("elemName", "交费期间");
        }
        view.processor.saveComboInsurElem(comInsurElem);
    }

    var view = new _factoryabclife.comboInformation.pfComboInsurtypeRefFixDialog.View();
    view.init();

    return view;
})