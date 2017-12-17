/**
 * 产品审核
 * @author neusoft
 * @creationTime 2016-07-27 15:43:51
 * @modificationTime 2017-02-21 10:17:15
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfProductApprove", function () {

    var refreshDefer = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfProductApprove.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryApproveSuccess: queryApproveSuccess,
                saveApproveSuccess: saveApproveSuccess,
                goToProDetail: goToProDetail,
                queryInsurSuccess: queryInsurSuccess,
                queryComboSuccess: queryComboSuccess,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                button3_onClick: button3_onClick,
                cell_proCode__approve_formatter: cell_proCode__approve_formatter,
                grid_approve_selection_onAfterAllSelect: grid_approve_selection_onAfterAllSelect,
                grid_approve_binding_rpc: grid_approve_binding_rpc,
                refreshDefer: refreshDefer
            });

            this.processor = new _factoryabclife.risk.pfProductApprove.Processor(this);

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

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_grid')) {
                var tInsurtypeBasicInf_grid = new unieap.ds.DataStore('tInsurtypeBasicInf_grid');
                tInsurtypeBasicInf_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_grid);
            }

            if (!dataCenter.getDataStore('proApproveDTO_form')) {
                var proApproveDTO_form = new unieap.ds.DataStore('proApproveDTO_form');
                proApproveDTO_form.setRowSetName("com.neusoft.abclife.productfactory.dto.ProApproveDTO");

                dataCenter.addDataStore(proApproveDTO_form);
            }

            if (!dataCenter.getDataStore('proApproveDTO_grid')) {
                var proApproveDTO_grid = new unieap.ds.DataStore('proApproveDTO_grid');
                proApproveDTO_grid.setRowSetName("com.neusoft.abclife.productfactory.dto.ProApproveDTO");

                dataCenter.addDataStore(proApproveDTO_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


            refreshDefer = new dojo.Deferred();
            refreshDefer.addCallback(function () {
                view.navigator._getNavigatorContainer().resizeContainer();
            });

            unieap.byId("proType__approve").setValue("01");
            view.processor.queryApprove(view.form.getDataStore("form_approve"), 1, 10);

            view.navigator.onComplete("返回", function (dc) {
                //	view.processor.getRisksByCondition(view.form.getDataStore("form_approve"), "1", "10");

            });
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_proType", [{
                CODEVALUE: "01",
                CODENAME: "险种"
            }, {
                CODEVALUE: "02",
                CODENAME: "组合"
            }])

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:queryApprove方法的成功回调。
     *
     */

    function queryApproveSuccess(dc) {
        var result = dc.getDataStore("queryApproveResult");
        view.grid.setDataStore("grid_approve", result);


        window.setTimeout(function () {
            if (refreshDefer.fired == -1) {
                refreshDefer.callback();
            }
        }, 200);
    }
    /**
     * @description:saveApprove方法的成功回调。
     *
     */

    function saveApproveSuccess(dc) {
        view.processor.queryApprove(view.form.getDataStore("form_approve"), 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function goToProDetail(inRowIndex) {
        var selectRow = view.grid.getRow("grid_approve", inRowIndex);
        var type = selectRow.getRowSet().getRow(0).getItemValue("proType");
        if (type == "01") {
            view.processor.queryInsur(selectRow);
        }
        else if (type == "02") {
            view.processor.queryCombo(selectRow);
        }

        //var dc = new unieap.ds.DataCenter();
        //dc.addDataStore("tInsurtypeBasicInf", selectRow);
        //view.navigator.forward("ProductFactory", "factoryabclife", "riskInformation/pfRiskInfDetail", "审核险种信息", dc);			
    }
    /**
     * @description:queryInsur方法的成功回调。
     *
     */

    function queryInsurSuccess(dc) {
        var insur = dc.getDataStore("queryInsurById");
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore("tInsurtypeBasicInf", insur);
        view.navigator.forward("ProductFactory", "factoryabclife", "riskInformation/pfRiskInfDetail", "审核险种信息", dc);
    }
    /**
     * @description:queryCombo方法的成功回调。
     *
     */

    function queryComboSuccess(dc) {
        var combo = dc.getDataStore("queryComboById");
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore("comboInf", combo);
        view.navigator.forward("ProductFactory", "factoryabclife", "comboInformation/pfComboChoose", "审核组合信息", dc);
    }

    function button1_onClick(event) {
        view.processor.queryApprove(view.form.getDataStore("form_approve"), 1, 10);
    }

    function button2_onClick(event) {
        //var data = view.grid.getRow("grid_approve");
        //if(data){
        //	view.processor.saveApprove(data, "true");
        //}else{
        //			MessageBox.autoCloseAlert({title:"提示",
        //			message:"请选择一条数据"});
        //}


    }

    function button3_onClick(event) {
        var data = view.grid.getRow("grid_approve");
        if (data) {
            view.processor.saveApprove(data, "false");
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请选择一条数据"
            });
        }

    }

    function cell_proCode__approve_formatter(inValue, inRowIndex) {
        return "<a href=\"javascript:;\" onclick=\"pfProductApprove.goToProDetail('" + inRowIndex + "')\" >" + inValue + "</a>";
    }

    function grid_approve_selection_onAfterAllSelect(select) {

    }

    function grid_approve_binding_rpc(store, load) {
        view.processor.queryApprove(view.form.getDataStore("form_approve"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.risk.pfProductApprove.View();
    view.init();

    return view;
})