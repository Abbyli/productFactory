/**
 * 组合险种要素关系算法弹窗
 * @author Administrator
 * @creationTime 2016-11-21 09:43:03
 * @modificationTime 2016-11-30 09:41:20
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboInsurtypeRefCalDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.combo.pfComboInsurtypeRefCalDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryFormulaSuccess: queryFormulaSuccess,
                queryTFormulaParamSuccess: queryTFormulaParamSuccess,
                saveSuccess: saveSuccess,
                queryObjFormulaSuccess: queryObjFormulaSuccess,
                queryObjParamSuccess: queryObjParamSuccess,
                formulaId_onChange: formulaId_onChange,
                save_onClick: save_onClick
            });

            this.processor = new _factoryabclife.combo.pfComboInsurtypeRefCalDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjFormula_combo_cal')) {
                var tObjFormula_combo_cal = new unieap.ds.DataStore('tObjFormula_combo_cal');
                tObjFormula_combo_cal.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_combo_cal);
            }

            if (!dataCenter.getDataStore('tObjParam_combo')) {
                var tObjParam_combo = new unieap.ds.DataStore('tObjParam_combo');
                tObjParam_combo.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjParam");

                dataCenter.addDataStore(tObjParam_combo);
            }

            if (!dataCenter.getDataStore('tFormulaParamRef_grid')) {
                var tFormulaParamRef_grid = new unieap.ds.DataStore('tFormulaParamRef_grid');
                tFormulaParamRef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TFormulaParamRef");

                dataCenter.addDataStore(tFormulaParamRef_grid);
            }

            if (!dataCenter.getDataStore('tObjEntranceCombine_forsave')) {
                var tObjEntranceCombine_forsave = new unieap.ds.DataStore('tObjEntranceCombine_forsave');
                tObjEntranceCombine_forsave.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjEntranceCombine");

                dataCenter.addDataStore(tObjEntranceCombine_forsave);
            }

            if (!dataCenter.getDataStore('tComboInsurtypeElemRel_forquery')) {
                var tComboInsurtypeElemRel_forquery = new unieap.ds.DataStore('tComboInsurtypeElemRel_forquery');
                tComboInsurtypeElemRel_forquery.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel");

                dataCenter.addDataStore(tComboInsurtypeElemRel_forquery);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("formulaId"), "onChange", this.formulaId_onChange);

            this.connect(unieap.byId("save"), "onClick", this.save_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryFormula();
            var datas = unieap.getXDialog().dialogData;
            var row = datas.row;
            view.processor.queryObjFormula(row);
            view.processor.queryObjParam(row);
        },
        page_init: function () {
            //窗口顶端空白
            var dialog = unieap.getXDialog();
            dialog.topNode.style.marginBottom = "0px";
        }

    });
    /**
     * @description:queryFormula方法的成功回调。
     *
     */

    function queryFormulaSuccess(dc) {
        unieap.byId("formulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaSplit"));
    }
    /**
     * @description:queryTFormulaParam方法的成功回调。
     *
     */

    function queryTFormulaParamSuccess(dc) {
        view.grid.setDataStore("grid_param", dc.getDataStore("queryTFormulaParamRef"));
    }
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: '提示',
            message: '保存成功！',
            onComplete: function () {
                unieap.getXDialog().close(true);
            }
        });
    }
    /**
     * @description:queryObjFormula方法的成功回调。
     *
     */

    function queryObjFormulaSuccess(dc) {
        view.form.setDataStore("form_combo_cal", dc.getDataStore("queryFormula"));
    }
    /**
     * @description:queryObjParam方法的成功回调。
     *
     */

    function queryObjParamSuccess(dc) {
        view.grid.setDataStore("grid_param", dc.getDataStore("queryParam"));
    }

    function formulaId_onChange(value) {
        if (value) {
            view.processor.queryTFormulaParam(value);
        }

    }

    function save_onClick(event) {

        if (!unieap.byId("form_combo_cal").validate(false)) {
            return;
        }

        if (!unieap.byId("grid_param").validate(false)) {
            return;
        }

        var datas = unieap.getXDialog().dialogData;
        var row = datas.row;
        var comboInf = datas.comboInf;
        var objParam = new unieap.ds.DataStore();
        objParam.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjParam");
        //获取通用参数数据
        var param = view.grid.getDataStore("grid_param");

        var paramCount = param.getRowSet().getRowCount();
        objParam.setRecordCount(paramCount);
        //将通用参数数据放入一个rowSet
        var rowset = new unieap.ds.RowSet();
        var objParams = [];
        for (var i = 0; i < paramCount; i++) {
            objParams.push({
                "objId": row.rowSet.primary[0].comboInsurtypeElemRelId,
                "paramId": param.rowSet.primary[i].id,
                "paramValue": param.rowSet.primary[i].refValue,
                "type": "SPLIT"
            });
        }
        rowset.addRows(objParams);
        objParam.setRowSet(rowset);

        var formula = view.form.getDataStore("form_combo_cal");
        formula.rowSet.primary[0].objId = row.rowSet.primary[0].comboInsurtypeElemRelId;
        formula.rowSet.primary[0].type = "SPLIT";
        var ds_entrance = new unieap.ds.DataStore("ds_entrance", [{
            "combineCode": comboInf.getRowSet().getRow(0).getItemValue("comboCode"),
            "combineVer": comboInf.getRowSet().getRow(0).getItemValue("comboVer"),
            "combineElemId": row.rowSet.primary[0].comboInsurtypeElemRelId,
            "algoType": "SPLIT",
        }]);
        ds_entrance.rowSetName = "com.neusoft.abclife.productfactory.entity.TObjEntranceCombine";

        view.processor.save(objParam, ds_entrance, formula);
    }

    var view = new _factoryabclife.combo.pfComboInsurtypeRefCalDialog.View();
    view.init();

    return view;
})