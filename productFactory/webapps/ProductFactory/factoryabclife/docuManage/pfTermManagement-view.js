/**
 * 条款管理
 * @author Neusoft
 * @creationTime 2016-10-17 11:06:31
 * @modificationTime 2016-10-26 09:21:54
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfTermManagement", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.docuManage.pfTermManagement.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTInsurtypeBasicInfSuccess: queryTInsurtypeBasicInfSuccess,
                query_details: query_details,
                select_button_onClick: select_button_onClick,
                cell_operation_formatter: cell_operation_formatter,
                grid1_binding_rpc: grid1_binding_rpc
            });

            this.processor = new _factoryabclife.docuManage.pfTermManagement.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_tmForm')) {
                var tInsurtypeBasicInf_tmForm = new unieap.ds.DataStore('tInsurtypeBasicInf_tmForm');
                tInsurtypeBasicInf_tmForm.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_tmForm);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_tmGrad')) {
                var tInsurtypeBasicInf_tmGrad = new unieap.ds.DataStore('tInsurtypeBasicInf_tmGrad');
                tInsurtypeBasicInf_tmGrad.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_tmGrad);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("select_button"), "onClick", this.select_button_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryTInsurtypeBasicInf(view.form.getDataStore("form1"), 1, 10);
        }


    });
    /**
     * @description:getTInsurtypeBasicInf方法的成功回调。
     *
     */

    function queryTInsurtypeBasicInfSuccess(dc) {
        var result = dc.getDataStore("queryTInsurtype");

        view.grid.setDataStore("grid1", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function query_details(inRowIndex) {
        var newDC = new unieap.ds.DataCenter();
        var selectRow = view.grid.getRow("grid1", inRowIndex);
        newDC.addDataStore("tInsurtypeBasicInf", selectRow);

        view.navigator.forward("ProductFactory", "factoryabclife", "docuManage/pfTermManagementShow", "条款详情", newDC);
    }

    function select_button_onClick(event) {
        view.processor.queryTInsurtypeBasicInf(view.form.getDataStore("form1"), 1, 10);
    }

    function cell_operation_formatter(inValue, inRowIndex) {
        var query = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/button_query.png";

        var queryBtn = "<img src='" + query + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"查看\" " +
            "onclick=\"pfTermManagement.query_details('" + inRowIndex + "')\" />";

        return queryBtn;


    }

    function grid1_binding_rpc(store, load) {
        view.processor.queryTInsurtypeBasicInf(view.form.getDataStore("form1"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.docuManage.pfTermManagement.View();
    view.init();

    return view;
})