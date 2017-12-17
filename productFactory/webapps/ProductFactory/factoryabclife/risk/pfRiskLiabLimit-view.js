/**
	 * 责任限额

	 * @author Administrator
	 * @creationTime 2016-07-26 10:00:58
	 * @modificationTime 2017-01-18 10:39:24
	 * @version 1.0.0 
	 * @generated
	 */
dojo.require("unieap.view.View");
unieap.define("pfRiskLiabLimit", function () {

    var limitType = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskLiabLimit_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskLiabLimit.View", unieap.view.View, {



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
                getProtecLiabDefsSuccess: getProtecLiabDefsSuccess,
                queryLiabLimitSuccess: queryLiabLimitSuccess,
                getObjFormulasSuccess: getObjFormulasSuccess,
                delFormulaSuccess: delFormulaSuccess,
                delFormula: delFormula,
                updateFormula: updateFormula,
                update: update,
                del: del,
                delLiabLimitSuccess: delLiabLimitSuccess,
                addDialog1_onComplete: addDialog1_onComplete,
                updateDialog1_onComplete: updateDialog1_onComplete,
                addFormula_onComplete: addFormula_onComplete,
                pricingLiabId_onChange: pricingLiabId_onChange,
                protecLiabId__protecLiabDef_onChange: protecLiabId__protecLiabDef_onChange,
                add1_onClick: add1_onClick,
                cell_control_formatter: cell_control_formatter,
                grid_limit_1_selection_onAfterSelect: grid_limit_1_selection_onAfterSelect,
                formula1_onClick: formula1_onClick,
                cell_controlformula1_formatter: cell_controlformula1_formatter,
                tabPane1_onShow: tabPane1_onShow,
                add2_onClick: add2_onClick,
                cell_control2_formatter: cell_control2_formatter,
                grid_limit_2_selection_onAfterSelect: grid_limit_2_selection_onAfterSelect,
                tabPane2_onShow: tabPane2_onShow,
                add3_onClick: add3_onClick,
                cell_control3_formatter: cell_control3_formatter,
                grid_limit_3_selection_onAfterSelect: grid_limit_3_selection_onAfterSelect,
                tabPane3_onShow: tabPane3_onShow,
                updateFormula1_onComplete: updateFormula1_onComplete,
                addDialog2_onComplete: addDialog2_onComplete,
                updateDialog2_onComplete: updateDialog2_onComplete,
                limitType: limitType
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskLiabLimit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_liab_limit')) {
                var tInsurtypeBasicInf_liab_limit = new unieap.ds.DataStore('tInsurtypeBasicInf_liab_limit');
                tInsurtypeBasicInf_liab_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_liab_limit);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_liab_limit')) {
                var tPricingLiabDef_liab_limit = new unieap.ds.DataStore('tPricingLiabDef_liab_limit');
                tPricingLiabDef_liab_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_liab_limit);
            }

            if (!dataCenter.getDataStore('tProtecLiabDef_liab_limit')) {
                var tProtecLiabDef_liab_limit = new unieap.ds.DataStore('tProtecLiabDef_liab_limit');
                tProtecLiabDef_liab_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef_liab_limit);
            }

            if (!dataCenter.getDataStore('tObjFormula_grid_limit')) {
                var tObjFormula_grid_limit = new unieap.ds.DataStore('tObjFormula_grid_limit');
                tObjFormula_grid_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_grid_limit);
            }

            if (!dataCenter.getDataStore('tObjFormula_gird_limit2')) {
                var tObjFormula_gird_limit2 = new unieap.ds.DataStore('tObjFormula_gird_limit2');
                tObjFormula_gird_limit2.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_gird_limit2);
            }

            if (!dataCenter.getDataStore('tObjFormula_grid_limit3')) {
                var tObjFormula_grid_limit3 = new unieap.ds.DataStore('tObjFormula_grid_limit3');
                tObjFormula_grid_limit3.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_grid_limit3);
            }

            if (!dataCenter.getDataStore('tLiabLimit_grid_limit')) {
                var tLiabLimit_grid_limit = new unieap.ds.DataStore('tLiabLimit_grid_limit');
                tLiabLimit_grid_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabLimit");

                dataCenter.addDataStore(tLiabLimit_grid_limit);
            }

            if (!dataCenter.getDataStore('tLiabLimit_grid_limit2')) {
                var tLiabLimit_grid_limit2 = new unieap.ds.DataStore('tLiabLimit_grid_limit2');
                tLiabLimit_grid_limit2.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabLimit");

                dataCenter.addDataStore(tLiabLimit_grid_limit2);
            }

            if (!dataCenter.getDataStore('tLiabLimit_grid_limit3')) {
                var tLiabLimit_grid_limit3 = new unieap.ds.DataStore('tLiabLimit_grid_limit3');
                tLiabLimit_grid_limit3.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabLimit");

                dataCenter.addDataStore(tLiabLimit_grid_limit3);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addDialog1"), "onComplete", this.addDialog1_onComplete);

            this.connect(unieap.byId("updateDialog1"), "onComplete", this.updateDialog1_onComplete);

            this.connect(unieap.byId("addFormula"), "onComplete", this.addFormula_onComplete);

            this.connect(unieap.byId("pricingLiabId"), "onChange", this.pricingLiabId_onChange);

            this.connect(unieap.byId("protecLiabId__protecLiabDef"), "onChange", this.protecLiabId__protecLiabDef_onChange);

            this.connect(unieap.byId("add1"), "onClick", this.add1_onClick);

            this.connect(unieap.byId("formula1"), "onClick", this.formula1_onClick);

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("add2"), "onClick", this.add2_onClick);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("add3"), "onClick", this.add3_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("updateFormula1"), "onComplete", this.updateFormula1_onComplete);

            this.connect(unieap.byId("addDialog2"), "onComplete", this.addDialog2_onComplete);

            this.connect(unieap.byId("updateDialog2"), "onComplete", this.updateDialog2_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种责任限额定义", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);

                unieap.byId("form_pricingLiabDef").clear();
                unieap.byId("form_pricingLiabDef").getBinding().getDataStore().getRowSet().clear(0);
                //获取定价责任
                view.processor.getPricingLiabDefs(tInsurtypeBasicInf);

                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));

                unieap.byId("tabContainer1").showTab("tabPane1", true);
                unieap.byId("tabPane1").onShow();

            });
            navigateButton.activeNavigateButton("liablimit");

            dojo.provide("unieap.myFormatter");
            dojo.require("unieap.form.SimpleFormatter");
            dojo.declare("unieap.myFormatter", unieap.form.SimpleFormatter, {

                format: function (value) {
                    var val = value.split(",");
                    var protec = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
                    var count = protec.getRowSet().getRowCount();
                    var rtn = "";
                    for (var i = 0; i < count; i++) {
                        for (var j = 0; j < val.length; j++) {
                            if (val[j] == protec.rowSet.primary[i].protecLiabCode) {
                                rtn += "," + protec.rowSet.primary[i].protecLiabName;
                                break;
                            }
                        }
                    }
                    rtn = rtn.substring(1);
                    return rtn;
                }
            });
        },
        page_init: function () {
            var ds = unieap.ds.DataStore("ds_limit_time", [{
                CODENAME: "单个保单年度内",
                CODEVALUE: "01"
            }, {
                CODENAME: "保险期间内",
                CODEVALUE: "02"
            }, {
                CODENAME: "单次赔付",
                CODEVALUE: "03"
            }]);

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:getPricingLiabDefs方法的成功回调。
     *
     */

    function getPricingLiabDefsSuccess(dc) {
        unieap.byId("pricingLiabId")
            .getDataProvider().setDataStore(dc.getDataStore("insurtyprestduty"));

        if (dc.getDataStore("insurtyprestduty").getRowSet().getRowCount() > 0) {
            var value = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabId;
            var name = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabName;
            unieap.byId("pricingLiabId").setValue(value);
            unieap.byId("pricingLiabName").setValue(name);
            //查询保障责任
            view.processor.getProtecLiabDefs(value);

        }
    }
    /**
     * @description:getProtecLiabDefs方法的成功回调。
     *
     */

    function getProtecLiabDefsSuccess(dc) {
        var rtnQueryPrestResultNoPage = dc.getDataStore("queryPrestResultNoPage");
        unieap.byId("protecLiabId__protecLiabDef").getDataProvider().setDataStore(rtnQueryPrestResultNoPage);

        if (rtnQueryPrestResultNoPage.getRowSet().getRowCount() > 0) {
            var value = rtnQueryPrestResultNoPage.rowSet.primary[0].protecLiabId;
            var name = rtnQueryPrestResultNoPage.rowSet.primary[0].protecLiabName;
            unieap.byId("protecLiabId__protecLiabDef").setValue(value);
            unieap.byId("protecLiabId__protecLiabDef").onChange(value);
            unieap.byId("protecLiabName__protecLiabDef").setValue(name);
        }
        else {
            unieap.byId("protecLiabId__protecLiabDef").setValue(null);
            unieap.byId("protecLiabName__protecLiabDef").setValue(null);
            unieap.byId("grid_limit_1").getBinding().getDataStore().getRowSet().deleteAllRows();
            unieap.byId("grid_limit_2").getBinding().getDataStore().getRowSet().deleteAllRows();
            unieap.byId("grid_limit_3").getBinding().getDataStore().getRowSet().deleteAllRows();
        }

        dataCenter.addDataStore("ds_protecName", rtnQueryPrestResultNoPage);
    }
    /**
     * @description:queryLiabLimit方法的成功回调。
     *
     */

    function queryLiabLimitSuccess(dc) {
        var result = dc.getDataStore("queryTLiabLimit");
        if (limitType == "01") {
            view.grid.setDataStore("grid_limit_1", result);
        }

        if (limitType == "02") {
            view.grid.setDataStore("grid_limit_2", result);
        }

        if (limitType == "03") {
            view.grid.setDataStore("grid_limit_3", result);
        }
    }
    /**
     * @description:getObjFormulas方法的成功回调。
     *
     */

    function getObjFormulasSuccess(dc) {
        if (limitType == "01") {
            view.grid.setDataStore("grid_limit_formula1", dc.getDataStore("getTObjFormula"));
        }

        if (limitType == "02") {
            view.grid.setDataStore("grid_limit_formula2", dc.getDataStore("getTObjFormula"));
        }

        if (limitType == "03") {
            view.grid.setDataStore("grid_limit_formula3", dc.getDataStore("getTObjFormula"));
        }
    }
    /**
     * @description:delFormula方法的成功回调。
     *
     */

    function delFormulaSuccess(dc) {
        var row = null;
        if (limitType == "01") {
            row = view.grid.getRow("grid_limit_1");
        }

        if (limitType == "02") {
            row = view.grid.getRow("grid_limit_2");
        }

        if (limitType == "03") {
            row = view.grid.getRow("grid_limit_3");
        }

        if (row == null) {

        }
        else {
            var id = row.rowSet.primary[0].id;
            view.processor.getObjFormulas(id, "D2");
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function delFormula(inRowIndex) {
        var data = null;
        if (limitType == "01") {
            data = view.grid.getRow("grid_limit_formula1", inRowIndex);
        }

        if (limitType == "02") {
            data = view.grid.getRow("grid_limit_formula2", inRowIndex);
        }

        if (limitType == "03") {
            data = view.grid.getRow("grid_limit_formula3", inRowIndex);
        }
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
                        view.processor.delFormula(objSeq);

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function updateFormula(inRowIndex) {
        var row = null;
        if (limitType == "01") {
            row = view.grid.getRow("grid_limit_formula1", inRowIndex);
        }

        if (limitType == "02") {
            row = view.grid.getRow("grid_limit_formula2", inRowIndex);
        }

        if (limitType == "03") {
            row = view.grid.getRow("grid_limit_formula3", inRowIndex);
        }
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var selectRow = null;
                if (limitType == "01") {
                    selectRow = view.grid.getRow("grid_limit_1", inRowIndex);
                }

                if (limitType == "02") {
                    selectRow = view.grid.getRow("grid_limit_2", inRowIndex);
                }

                if (limitType == "03") {
                    selectRow = view.grid.getRow("grid_limit_3", inRowIndex);
                }


                var dialog = unieap.byId("updateFormula1");
                dialog.dialogData = {
                    "selectRow": selectRow,
                    "opt": "liabLimit",
                    "row_formulainfo": row,
                    "seq": "update",
                    "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = null;
        var dialog = null;
        if (limitType == "01") {
            row = view.grid.getRow("grid_limit_1", inRowIndex);
            dialog = unieap.byId("updateDialog1");
        }

        if (limitType == "02") {
            row = view.grid.getRow("grid_limit_2", inRowIndex);
            dialog = unieap.byId("updateDialog2");
        }

        if (limitType == "03") {
            row = view.grid.getRow("grid_limit_3", inRowIndex);
            dialog = unieap.byId("updateDialog2");
            dialog.title = "修改限次";
        }

        if (row == null) {

        }
        else {

            var ds = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
            dialog.dialogData = {
                "opt": "update",
                "ds_limit": row,
                "ds": ds
            };
            dialog.show();
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
        var data = null;
        if (limitType == "01") {
            data = view.grid.getRow("grid_limit_1", inRowIndex);
            unieap.byId("grid_limit_formula1").getBinding().getDataStore().getRowSet().deleteAllRows();
        }

        if (limitType == "02") {
            data = view.grid.getRow("grid_limit_2", inRowIndex);
        }

        if (limitType == "03") {
            data = view.grid.getRow("grid_limit_3", inRowIndex);
        }



        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delLiabLimit(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delLiabLimit方法的成功回调。
     *
     */

    function delLiabLimitSuccess(dc) {
        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function addDialog1_onComplete(returnObj) {
        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function updateDialog1_onComplete(returnObj) {
        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function addFormula_onComplete(returnObj) {
        var row = null;
        if (limitType == "01") {
            row = view.grid.getRow("grid_limit_1");
        }

        if (limitType == "02") {
            row = view.grid.getRow("grid_limit_2");
        }

        if (limitType == "03") {
            row = view.grid.getRow("grid_limit_3");
        }

        if (row == null) {

        }
        else {
            var id = row.rowSet.primary[0].id;
            view.processor.getObjFormulas(id, "D2");
        }
    }

    function pricingLiabId_onChange(value) {
        var dsform = unieap.byId("pricingLiabId").getDataProvider().getDataStore();
        var count = dsform.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (dsform.getRowSet().getRow(i).getItemValue("pricingLiabId") == value) {
                unieap.byId("pricingLiabName").setValue(dsform.getRowSet().getRow(i).getItemValue("pricingLiabName"));
            }
        }
        //查询保障责任
        view.processor.getProtecLiabDefs(value);
    }

    function protecLiabId__protecLiabDef_onChange(value) {
        var dsform = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
        var count = dsform.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (dsform.getRowSet().getRow(i).getItemValue("protecLiabId") == value) {
                unieap.byId("protecLiabName__protecLiabDef").setValue(dsform.getRowSet().getRow(i).getItemValue("protecLiabName"));
            }
        }

        unieap.byId("tabContainer1").showTab("tabPane1", true);
        unieap.byId("tabPane1").onShow();
        unieap.byId("grid_limit_formula1").getBinding().getDataStore().getRowSet().deleteAllRows();
    }

    function add1_onClick(event) {
        var protecLiabCode = unieap.byId("protecLiabId__protecLiabDef").getText();
        if (protecLiabCode == null || protecLiabCode == "") {
            MessageBox.alert({
                title: "提示",
                message: "请选择一条适用保障责任"
            });
            return;
        }




        var pricingLiabCode = unieap.byId("pricingLiabId").getText();
        var riskVer = unieap.byId("verNo").getValue();
        var riskCode = unieap.byId("insurtypeCode").getValue();

        var ds_limit = new unieap.ds.DataStore("ds_limit", [{
            "limitType": limitType,
            "riskCode": riskCode,
            "riskVer": riskVer,
            "pricingLiabCode": pricingLiabCode,
            "protecLiabCode": protecLiabCode
        }]);
        ds_limit.rowSetName = "com.neusoft.abclife.productfactory.entity.TLiabLimit";





        var dialog = unieap.byId("addDialog1");
        var ds = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
        dialog.dialogData = {
            "ds": ds,
            "ds_limit": ds_limit
        };
        dialog.show();
    }

    function cell_control_formatter(inValue, inRowIndex) {

        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskLiabLimit.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "'" +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskLiabLimit.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_limit_1_selection_onAfterSelect(inRowIndex) {
        var row = view.grid.getRow("grid_limit_1", inRowIndex);
        var id = row.rowSet.primary[0].id;
        view.processor.getObjFormulas(id, "D2")
    }

    function formula1_onClick(event) {

        var selectRow = view.grid.getRow("grid_limit_1");
        if (selectRow) {
            var dialog = unieap.byId("addFormula");
            dialog.dialogData = {
                "selectRow": selectRow,
                "opt": "liabLimit",
                "seq": "add",
                "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
            };
            dialog.show();

        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请选择一条限额数据"
            });
        }
    }

    function cell_controlformula1_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";




        var updateBtn = "<img src='" + editImg + "'  " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskLiabLimit.updateFormula('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "'  " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskLiabLimit.delFormula('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function tabPane1_onShow(pane) {
        limitType = "01";


        unieap.byId("grid_limit_1").getBinding().getRowSet().deleteAllRows();
        unieap.byId("grid_limit_formula1").getBinding().getRowSet().deleteAllRows();

        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function add2_onClick(event) {
        var protecLiabCode = unieap.byId("protecLiabId__protecLiabDef").getText();
        if (protecLiabCode == null || protecLiabCode == "") {
            MessageBox.alert({
                title: "提示",
                message: "请选择一条适用保障责任"
            });
            return;
        }


        var pricingLiabCode = unieap.byId("pricingLiabId").getText();
        var riskVer = unieap.byId("verNo").getValue();
        var riskCode = unieap.byId("insurtypeCode").getValue();

        var ds_limit = new unieap.ds.DataStore("ds_limit", [{
            "limitType": limitType,
            "riskCode": riskCode,
            "riskVer": riskVer,
            "pricingLiabCode": pricingLiabCode,
            "protecLiabCode": protecLiabCode
        }]);
        ds_limit.rowSetName = "com.neusoft.abclife.productfactory.entity.TLiabLimit";





        var dialog = unieap.byId("addDialog2");
        var ds = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
        dialog.dialogData = {
            "ds": ds,
            "ds_limit": ds_limit
        };
        dialog.title = "新增限天";
        dialog.show();
    }

    function cell_control2_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskLiabLimit.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "'" +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskLiabLimit.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_limit_2_selection_onAfterSelect(inRowIndex) {
        var row = view.grid.getRow("grid_limit_2", inRowIndex);
        var id = row.rowSet.primary[0].id;
        view.processor.getObjFormulas(id, "D2");
    }

    function tabPane2_onShow(pane) {
        limitType = "02";

        unieap.byId("grid_limit_2").getBinding().getRowSet().deleteAllRows();

        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function add3_onClick(event) {
        var protecLiabCode = unieap.byId("protecLiabId__protecLiabDef").getText();
        if (protecLiabCode == null || protecLiabCode == "") {
            MessageBox.alert({
                title: "提示",
                message: "请选择一条适用保障责任"
            });
            return;
        }


        var pricingLiabCode = unieap.byId("pricingLiabId").getText();
        var riskVer = unieap.byId("verNo").getValue();
        var riskCode = unieap.byId("insurtypeCode").getValue();

        var ds_limit = new unieap.ds.DataStore("ds_limit", [{
            "limitType": limitType,
            "riskCode": riskCode,
            "riskVer": riskVer,
            "pricingLiabCode": pricingLiabCode,
            "protecLiabCode": protecLiabCode
        }]);
        ds_limit.rowSetName = "com.neusoft.abclife.productfactory.entity.TLiabLimit";





        var dialog = unieap.byId("addDialog2");
        var ds = unieap.byId("protecLiabId__protecLiabDef").getDataProvider().getDataStore();
        dialog.dialogData = {
            "ds": ds,
            "ds_limit": ds_limit
        };
        dialog.title = "新增限次";
        dialog.show();
    }

    function cell_control3_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskLiabLimit.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "'" +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskLiabLimit.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_limit_3_selection_onAfterSelect(inRowIndex) {
        var row = view.grid.getRow("grid_limit_3", inRowIndex);
        var id = row.rowSet.primary[0].id;
        view.processor.getObjFormulas(id, "D2");
    }

    function tabPane3_onShow(pane) {
        limitType = "03";

        unieap.byId("grid_limit_3").getBinding().getRowSet().deleteAllRows();

        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function updateFormula1_onComplete(returnObj) {
        var row = null;
        if (limitType == "01") {
            row = view.grid.getRow("grid_limit_1");
        }

        if (limitType == "02") {
            row = view.grid.getRow("grid_limit_2");
        }

        if (limitType == "03") {
            row = view.grid.getRow("grid_limit_3");
        }
        if (row == null) {

        }
        else {
            var id = row.rowSet.primary[0].id;
            view.processor.getObjFormulas(id, "D2");
        }

    }

    function addDialog2_onComplete(returnObj) {
        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    function updateDialog2_onComplete(returnObj) {
        var protec = unieap.byId("protecLiabId__protecLiabDef").getText();
        var riskVer = unieap.byId("verNo").getValue();
        view.processor.queryLiabLimit(protec, limitType, riskVer);
    }

    var view = new _factoryabclife.risk.pfRiskLiabLimit.View();
    view.init();

    return view;
})