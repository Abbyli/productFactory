/**
 *
 * @author Administrator
 * @creationTime 2016-07-19 15:39:06
 * @modificationTime 2016-09-28 15:14:47
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAmnt", function () {

    var result = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskAmnt_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskAmnt.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getPricingLiabDefsSuccess: getPricingLiabDefsSuccess,
                getTObjFormulasSuccess: getTObjFormulasSuccess,
                getAllRiskAmntTypeSuccess: getAllRiskAmntTypeSuccess,
                del: del,
                delParamFormulaRelationSuccess: delParamFormulaRelationSuccess,
                addRiskAmnt_onClick: addRiskAmnt_onClick,
                pricingLiabCode_onChange: pricingLiabCode_onChange,
                editFormula_onClick: editFormula_onClick,
                cell_control_amnt_formatter: cell_control_amnt_formatter,
                grid_objFormula_binding_rpc: grid_objFormula_binding_rpc,
                addDialog_onComplete: addDialog_onComplete,
                editformulaDialog_onComplete: editformulaDialog_onComplete,
                result: result
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskAmnt.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_amnt_form')) {
                var tInsurtypeBasicInf_amnt_form = new unieap.ds.DataStore('tInsurtypeBasicInf_amnt_form');
                tInsurtypeBasicInf_amnt_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_amnt_form);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_amnt_form')) {
                var tPricingLiabDef_amnt_form = new unieap.ds.DataStore('tPricingLiabDef_amnt_form');
                tPricingLiabDef_amnt_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_amnt_form);
            }

            if (!dataCenter.getDataStore('tObjFormula_amnt_grid')) {
                var tObjFormula_amnt_grid = new unieap.ds.DataStore('tObjFormula_amnt_grid');
                tObjFormula_amnt_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_amnt_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addRiskAmnt"), "onClick", this.addRiskAmnt_onClick);

            this.connect(unieap.byId("pricingLiabCode"), "onChange", this.pricingLiabCode_onChange);

            this.connect(unieap.byId("editFormula"), "onClick", this.editFormula_onClick);

            this.connect(unieap.byId("addDialog"), "onComplete", this.addDialog_onComplete);

            this.connect(unieap.byId("editformulaDialog"), "onComplete", this.editformulaDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种风险保额定义", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);
                //获取定价责任
                view.processor.getPricingLiabDefs(tInsurtypeBasicInf);
                unieap.byId("form_pricingLiabDef").clear();
                unieap.byId("form_pricingLiabDef").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("grid_objFormula").getBinding().getDataStore().getRowSet().deleteAllRows();
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("riskamnt");

        },
        page_init: function () {
            view.processor.getAllRiskAmntType();
            dataCenter.addDataStore("ds_result", result);
        }

    });
    /**
     * @description:getPricingLiabDefs方法的成功回调。
     *
     */

    function getPricingLiabDefsSuccess(dc) {
        unieap.byId("pricingLiabCode")
            .getDataProvider().setDataStore(dc.getDataStore("insurtyprestduty"));

        if (dc.getDataStore("insurtyprestduty").getRowSet().getRowCount() > 0) {
            var value = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabId;
            var name = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabName;
            unieap.byId("pricingLiabCode").setValue(value);
            unieap.byId("pricingLiabName").setValue(name)
            view.processor.getTObjFormulas(value, 1, 10);
        }
    }
    /**
     * @description:getTObjFormulas方法的成功回调。
     *
     */

    function getTObjFormulasSuccess(dc) {
        view.grid.setDataStore("grid_objFormula", dc.getDataStore("getTObjFormulas"));
    }
    /**
     * @description:getAllRiskAmntType方法的成功回调。
     *
     */

    function getAllRiskAmntTypeSuccess(dc) {
        result = dc.getDataStore("getAllRiskAmntType");
        var count = result.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            var type = result.rowSet.primary[i].riskamntType;
            result.rowSet.primary[i].riskamntType = "E1#" + type;
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_objFormula", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        var objSeq = data.rowSet.primary[0].objSeq;
                        view.processor.delParamFormulaRelation(objSeq);

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delParamFormulaRelation方法的成功回调。
     *
     */

    function delParamFormulaRelationSuccess(dc) {
        var id = unieap.byId("pricingLiabCode").getValue();
        view.processor.getTObjFormulas(id, 1, 10);
    }

    function addRiskAmnt_onClick(event) {
        var combox = unieap.byId("pricingLiabCode");
        if (combox.getValue() == null) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请选择一条定价责任"
            });
        }
        else {
            var pricingLiabId = unieap.byId("pricingLiabCode").getValue();
            var dialog = unieap.byId("addDialog");
            dialog.dialogData = {
                "pricingLiabId": pricingLiabId
            };

            dialog.show();

        }
    }

    function pricingLiabCode_onChange(value) {
        view.processor.getTObjFormulas(value, 1, 10);
        var dsform = unieap.byId("pricingLiabCode").getDataProvider().getDataStore();
        var count = dsform.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (dsform.getRowSet().getRow(i).getItemValue("pricingLiabId") == value) {
                unieap.byId("pricingLiabName").setValue(dsform.getRowSet().getRow(i).getItemValue("pricingLiabName"));
            }
        }

    }

    function editFormula_onClick(event) {
        var row = view.grid.getRow("grid_objFormula");

        if (row) {
            var ds_pricing = new unieap.ds.DataStore("ds_pricing", [{
                "pricingLiabCode": unieap.byId("pricingLiabCode").getText(),
                "pricingLiabId": unieap.byId("pricingLiabCode").getValue(),
                "pricingLiabName": unieap.byId("pricingLiabName").getValue()

            }]);
            ds_pricing.rowSetName = "com.neusoft.abclife.productfactory.entity.TPricingLiabDef";
            var dialog = unieap.byId("editformulaDialog");
            dialog.dialogData = {
                "selectRow": ds_pricing,
                "opt": "riskamnt",
                "seq": "update",
                "row_formulainfo": row,
                "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
            };
            dialog.show();

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条风险保额数据！'
            })
        }

    }

    function cell_control_amnt_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskAmnt.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function grid_objFormula_binding_rpc(store, load) {

        var id = unieap.byId("pricingLiabCode").getValue();

        view.processor.getTObjFormulas(id, store.getPageNumber(), store.getPageSize());
    }

    function addDialog_onComplete(returnObj) {
        var id = unieap.byId("pricingLiabCode").getValue();
        view.processor.getTObjFormulas(id, 1, 10);
    }

    function editformulaDialog_onComplete(returnObj) {
        view.processor.getTObjFormulas(unieap.byId("pricingLiabCode").getValue(), 1, 10);
    }

    var view = new _factoryabclife.risk.pfRiskAmnt.View();
    view.init();

    return view;
})