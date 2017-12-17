/**
 *
 * @author think
 * @creationTime 2016-07-21 13:11:20
 * @modificationTime 2016-12-07 16:21:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskRateManageDialog", function () {

    var insurtypeCode = "";

    var verNo = "";

    var pricingLiabCode = "";

    var opt = "";

    var currentIndex = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskRateManageDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTDimensionDefsSuccess: queryTDimensionDefsSuccess,
                dsManage: dsManage,
                saveRiskRateSuccess: saveRiskRateSuccess,
                comboBox_ratetype_onChange: comboBox_ratetype_onChange,
                btnAdd_onClick: btnAdd_onClick,
                up_onClick: up_onClick,
                down_onClick: down_onClick,
                btnSave_onClick: btnSave_onClick,
                grid_dimenRef_selection_onAfterSelect: grid_dimenRef_selection_onAfterSelect,
                insurtypeCode: insurtypeCode,
                verNo: verNo,
                pricingLiabCode: pricingLiabCode,
                opt: opt,
                currentIndex: currentIndex
            });

            this.processor = new _factoryabclife.risk.pfRiskRateManageDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjRate')) {
                var tObjRate = new unieap.ds.DataStore('tObjRate');
                tObjRate.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRate");

                dataCenter.addDataStore(tObjRate);
            }

            if (!dataCenter.getDataStore('tObjRateDimenRef_grid')) {
                var tObjRateDimenRef_grid = new unieap.ds.DataStore('tObjRateDimenRef_grid');
                tObjRateDimenRef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRateDimenRef");

                dataCenter.addDataStore(tObjRateDimenRef_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("comboBox_ratetype"), "onChange", this.comboBox_ratetype_onChange);

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("up"), "onClick", this.up_onClick);

            this.connect(unieap.byId("down"), "onClick", this.down_onClick);

            this.connect(unieap.byId("btnSave"), "onClick", this.btnSave_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            insurtypeCode = datas.insurtypeCode;
            verNo = datas.verNo;
            pricingLiabCode = datas.pricingLiabCode;
            opt = datas.opt;

            var ds = new unieap.ds.DataStore([{
                CODEVALUE: "RT_P",
                CODENAME: "保费费率表"
            }, {
                CODEVALUE: "RT_A",
                CODENAME: "保额费率表"
            }]);
            if (pricingLiabCode == "") {
                unieap.byId("comboBox_ratetype").getDataProvider().setDataStore(ds);
            }
        },
        page_init: function () {
            var ds_rateType = new unieap.ds.DataStore("ds_rateType", [{
                    CODEVALUE: "RT_P",
                    CODENAME: "保费费率表"
                }, {
                    CODEVALUE: "RT_A",
                    CODENAME: "保额费率表"
                }, {
                    CODENAME: "现价表",
                    CODEVALUE: "V"
                }, {
                    CODENAME: "风险扣费表",
                    CODEVALUE: "EXP"
                }, {
                    CODENAME: "健康加费表",
                    CODEVALUE: "HL"
                },
                //{CODENAME:"职业加费",CODEVALUE:"JOB"}
                {
                    CODEVALUE: "PU",
                    CODENAME: "减额缴清表"
                }
            ]);
            dataCenter.addDataStore(ds_rateType);

            var dialog = unieap.getXDialog();
            dialog.topNode.style.marginBottom = "0px";
        }

    });
    /**
     * @description:queryTDimensionDefs方法的成功回调。
     *
     */

    function queryTDimensionDefsSuccess(dc) {
        var rtnTDimensionDefs1 = dc.getDataStore("rtnTDimensionDefs1");
        var newStore1 = rtnTDimensionDefs1.clone("newStore" + new Date().getTime());
        unieap.byId("checkBoxGroup_conditionCol_single").getDataProvider().setDataStore(newStore1);


        var rtnTDimensionDefs2 = dc.getDataStore("rtnTDimensionDefs2");
        var newStore2 = rtnTDimensionDefs2.clone("newStore" + new Date().getTime());

        unieap.byId("checkBoxGroup_conditionCol_range").getDataProvider().setDataStore(newStore2);
    }
    /**
     * @description:从dataStore取数据
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function dsManage(ds, sourceName, sourceValue, targetName) {
        var count = ds.getRowSet().getRowCount();
        var t_value = "";
        for (var k = 0; k < count; k++) {
            var s_name = ds.getRowSet().getRow(k).getItemValue(sourceName);
            if (s_name == sourceValue) {
                t_value = ds.getRowSet().getRow(k).getItemValue(targetName);
                break;
            }
        }
        return t_value;
    }
    /**
     * @description:saveRiskRate方法的成功回调。
     *
     */

    function saveRiskRateSuccess(dc) {
        var rtnMessage = dc.getParameter("rtnMessage");
        if (rtnMessage == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });

        }
        else {
            var text = unieap.byId("comboBox_ratetype").getText();
            MessageBox.alert({
                title: '提示',
                message: text + "已存在"
            })

        }
    }

    function comboBox_ratetype_onChange(value) {
        //删除已添加维度 add by shi.chl
        unieap.byId("grid_dimenRef").getBinding().getRowSet().deleteAllRows();
        //查询维度表
        view.processor.queryTDimensionDefs(value);
        //alert(value);
    }

    function btnAdd_onClick(event) {
        var single_v = unieap.byId("checkBoxGroup_conditionCol_single").getValue();
        var single_t = unieap.byId("checkBoxGroup_conditionCol_single").getText();
        var single_ds = unieap.byId("checkBoxGroup_conditionCol_single").getDataProvider().getDataStore();
        var range_v = unieap.byId("checkBoxGroup_conditionCol_range").getValue();
        var range_t = unieap.byId("checkBoxGroup_conditionCol_range").getText();
        var range_ds = unieap.byId("checkBoxGroup_conditionCol_range").getDataProvider().getDataStore();

        var ds_dimenRef = new unieap.ds.DataStore("ds_dimenRef", []);
        ds_dimenRef.rowSetName = "com.neusoft.abclife.productfactory.entity.TObjRateDimenRef";
        if (single_v != null && single_v != "") {
            var array_sv = single_v.split(",");
            var array_st = single_t.split(",");

            for (var i = 0; i < array_sv.length; i++) {
                var obj = new Object();
                obj.dimensionId = array_sv[i];
                obj.dimensionName = array_st[i];
                obj.dimensionProperty = dsManage(single_ds, "id", obj.dimensionId, "property");
                obj.orderNum = ds_dimenRef.getRowSet().getRowCount() + 1;
                ds_dimenRef.getRowSet().addRow(obj);
            }
        }
        if (range_v != null && range_v != "") {
            var array_rv = range_v.split(",");
            var array_rt = range_t.split(",");

            for (var j = 0; j < array_rv.length; j++) {
                var obj = new Object();
                obj.dimensionId = array_rv[j];
                obj.dimensionName = array_rt[j];
                obj.dimensionProperty = dsManage(range_ds, "id", obj.dimensionId, "property");
                obj.orderNum = ds_dimenRef.getRowSet().getRowCount() + 1;
                ds_dimenRef.getRowSet().addRow(obj);
            }
        }
        view.grid.setDataStore("grid_dimenRef", ds_dimenRef);


    }

    function up_onClick(event) {
        var row = view.grid.getRow("grid_dimenRef");
        if (row != null) {
            var orderNum = row.getRowSet().getRow(0).getItemValue("orderNum");
            if (orderNum != 1) {
                var previousRow = view.grid.getRow("grid_dimenRef", currentIndex - 1);
                row.getRowSet().getRow(0).setItemValue("orderNum", orderNum - 1);
                previousRow.getRowSet().getRow(0).setItemValue("orderNum", orderNum);

                unieap.byId("grid_dimenRef").getBinding().getDataStore().getRowSet().updateRow(currentIndex, previousRow.getRowSet().getRow(0));
                unieap.byId("grid_dimenRef").getBinding().getDataStore().getRowSet().updateRow(currentIndex - 1, row.getRowSet().getRow(0));
                //add by shichl 2016/9/9
                unieap.byId("grid_dimenRef").getManager("SelectionManager").setSelect(currentIndex - 1, true);
                unieap.byId("grid_dimenRef").refresh();
            }

        }


    }

    function down_onClick(event) {
        var row = view.grid.getRow("grid_dimenRef");
        var count = view.grid.getDataStore("grid_dimenRef").getRowSet().getRowCount();
        if (row != null) {
            var orderNum = row.getRowSet().getRow(0).getItemValue("orderNum");
            if (orderNum != count) {
                var nextRow = view.grid.getRow("grid_dimenRef", currentIndex + 1);
                row.getRowSet().getRow(0).setItemValue("orderNum", orderNum + 1);
                nextRow.getRowSet().getRow(0).setItemValue("orderNum", orderNum);
                unieap.byId("grid_dimenRef").getBinding().getDataStore().getRowSet().updateRow(currentIndex, nextRow.getRowSet().getRow(0));
                unieap.byId("grid_dimenRef").getBinding().getDataStore().getRowSet().updateRow(currentIndex + 1, row.getRowSet().getRow(0));
                //add by shichl 2016/9/9
                unieap.byId("grid_dimenRef").getManager("SelectionManager").setSelect(currentIndex + 1, true);

                unieap.byId("grid_dimenRef").refresh();

            }
        }
    }

    function btnSave_onClick(event) {
        var rateType = unieap.byId("comboBox_ratetype").getValue();
        if (rateType == null || rateType == "") {
            MessageBox.alert({
                title: "提示",
                message: "请选择费率表类型！"
            })
            return;
        }
        var conditionCol = view.grid.getDataStore("grid_dimenRef");
        var count = conditionCol.getRowSet().getRowCount();
        if (count == null || count == "") {
            MessageBox.alert({
                title: "提示",
                message: "请选择条件列！"
            })
            return;
        }

        view.processor.saveRiskRate(insurtypeCode, verNo, pricingLiabCode, rateType, conditionCol, opt);

    }

    function grid_dimenRef_selection_onAfterSelect(inRowIndex) {
        currentIndex = inRowIndex;
    }

    var view = new _factoryabclife.risk.pfRiskRateManageDialog.View();
    view.init();

    return view;
})