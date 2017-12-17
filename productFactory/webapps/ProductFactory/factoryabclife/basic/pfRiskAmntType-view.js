/**
 *
 * @author Administrator
 * @creationTime 2016-07-19 17:17:47
 * @modificationTime 2017-03-10 11:03:48
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAmntType", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfRiskAmntType.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllPfRiskAmntTypeSuccess: getAllPfRiskAmntTypeSuccess,
                edit: edit,
                delRiskAmntTypeSuccess: delRiskAmntTypeSuccess,
                del: del,
                add_onClick: add_onClick,
                cell_control_riskamnt_formatter: cell_control_riskamnt_formatter,
                grid1_binding_rpc: grid1_binding_rpc,
                addDialog_onComplete: addDialog_onComplete,
                updateDialog_onComplete: updateDialog_onComplete
            });

            this.processor = new _factoryabclife.basic.pfRiskAmntType.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tRiskamntTypeDef_grid')) {
                var tRiskamntTypeDef_grid = new unieap.ds.DataStore('tRiskamntTypeDef_grid');
                tRiskamntTypeDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TRiskamntTypeDef");

                dataCenter.addDataStore(tRiskamntTypeDef_grid);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("add"), "onClick", this.add_onClick);

            this.connect(unieap.byId("addDialog"), "onComplete", this.addDialog_onComplete);

            this.connect(unieap.byId("updateDialog"), "onComplete", this.updateDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllPfRiskAmntType(1, 20);
        }


    });
    /**
     * @description:getAllPfRiskAmntType方法的成功回调。
     *
     */

    function getAllPfRiskAmntTypeSuccess(dc) {
        view.grid.setDataStore("grid1", dc.getDataStore("getAllPfRiskAmntTypeDaoImpl"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function edit(inRowIndex) {
        var row = view.grid.getRow("grid1", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("updateDialog");
                dialog.dialogData = {
                    "opt": "update",
                    "riskamnt": row
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:delRiskAmntType方法的成功回调。
     *
     */

    function delRiskAmntTypeSuccess(dc) {
        view.processor.getAllPfRiskAmntType(1, 20);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid1", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delRiskAmntType(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }

    function add_onClick(event) {
        var dialog = unieap.byId("addDialog");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.show();
    }

    function cell_control_riskamnt_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var editImg_h = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit_h.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_o.png";
        var delImg_h = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";

        var editHTML = "<img src='" + editImg + "' style='cursor:pointer;' title='修改' onclick='pfRiskAmntType.edit(" + inRowIndex + ");' ></img>";
        var delHTML = "<img src='" + delImg + "' style='cursor:pointer;' title='删除' onclick='pfRiskAmntType.del(" + inRowIndex + ");' ></img>";
        return editHTML + "&nbsp;&nbsp;" + delHTML;
    }

    function grid1_binding_rpc(store, load) {
        view.processor.getAllPfRiskAmntType(store.getPageNumber(), store.getPageSize());
    }

    function addDialog_onComplete(returnObj) {
        view.processor.getAllPfRiskAmntType(1, 20);
    }

    function updateDialog_onComplete(returnObj) {
        view.processor.getAllPfRiskAmntType(1, 20);
    }

    var view = new _factoryabclife.basic.pfRiskAmntType.View();
    view.init();

    return view;
})