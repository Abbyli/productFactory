/**
 * 要素定义
 * @author Administrator
 * @creationTime 2016-06-30 15:39:54
 * @modificationTime 2016-11-04 10:32:24
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestElement", function () {

    var dutyId = "";

    var type = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPrestElement_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestElement.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getObjSkelementSuccess: getObjSkelementSuccess,
                del: del,
                delObjskelementSuccess: delObjskelementSuccess,
                update: update,
                addElement_onClick: addElement_onClick,
                cell_control_element_formatter: cell_control_element_formatter,
                grid_element_binding_rpc: grid_element_binding_rpc,
                dutyId: dutyId,
                type: type
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskPrestElement.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tPricingLiabDef_query')) {
                var tPricingLiabDef_query = new unieap.ds.DataStore('tPricingLiabDef_query');
                tPricingLiabDef_query.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_query);
            }

            if (!dataCenter.getDataStore('tObjSkelement_form')) {
                var tObjSkelement_form = new unieap.ds.DataStore('tObjSkelement_form');
                tObjSkelement_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjSkelement");

                dataCenter.addDataStore(tObjSkelement_form);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addElement"), "onClick", this.addElement_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("保障责任要素定义", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                var duty = dc.getDataStore("selectRow");
                dutyId = duty.rowSet.primary[0].protecLiabId;
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                dataCenter.addDataStore("duty", duty);
                dataCenter.setParameter("dutyId", dutyId);
                type = "2";
                view.processor.getObjSkelement(dutyId, type, 1, 10);
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });

            view.navigator.onComplete("保障要素属性", function (dc) {
                view.processor.getObjSkelement(dutyId, type, 1, 10);
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });

            navigateButton.activeNavigateButton("get");

            //titlepane private_displayOpen="false"

        }


    });
    /**
     * @description:getObjSkelement方法的成功回调。
     *
     */

    function getObjSkelementSuccess(dc) {
        var result = dc.getDataStore("getObjSkelement");
        view.grid.setDataStore("grid_element", result);
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
                        view.processor.delObjskelement(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delObjskelement方法的成功回调。
     *
     */

    function delObjskelementSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示框",
            message: "删除成功"
        });
        view.processor.getObjSkelement(dutyId, type, 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var newDC = new unieap.ds.DataCenter();
        var selectRow = view.grid.getRow("grid_element", inRowIndex);
        newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf"));
        newDC.addDataStore("duty", dataCenter.getDataStore("duty"));
        newDC.setParameter("dutyId", dutyId);
        newDC.setParameter("type", type);
        newDC.setParameter("opt", "update");
        newDC.addDataStore("selectRow", selectRow);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestElementShow", "保障要素属性", newDC);
    }

    function addElement_onClick(event) {
        var newDC = new unieap.ds.DataCenter();
        newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf"));
        newDC.addDataStore("duty", dataCenter.getDataStore("duty"));
        newDC.setParameter("dutyId", dataCenter.getParameter("dutyId"));
        newDC.setParameter("type", type);
        newDC.setParameter("opt", "add");
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestElementShow", "保障要素属性", newDC);
    }

    function cell_control_element_formatter(inValue, inRowIndex) {

        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestElement.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestElement.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_element_binding_rpc(store, load) {
        view.processor.getObjSkelement(dutyId, type, store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.risk.pfRiskPrestElement.View();
    view.init();

    return view;
})