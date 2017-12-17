/**
 *
 * @author think
 * @creationTime 2016-07-12 14:52:29
 * @modificationTime 2017-03-10 11:04:02
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRelation", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfRelation.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryRelationDefSuccess: queryRelationDefSuccess,
                update_relation: update_relation,
                delRelationDefSuccess: delRelationDefSuccess,
                del_relation: del_relation,
                add_relationDef_onComplete: add_relationDef_onComplete,
                update_relation_onComplete: update_relation_onComplete,
                button_relation_onClick: button_relation_onClick,
                cell_name1__relation_formatter: cell_name1__relation_formatter,
                grid_relation_binding_onAfterSave: grid_relation_binding_onAfterSave,
                grid_relation_binding_rpc: grid_relation_binding_rpc
            });

            this.processor = new _factoryabclife.basic.pfRelation.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tRelationDef_grid')) {
                var tRelationDef_grid = new unieap.ds.DataStore('tRelationDef_grid');
                tRelationDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TRelationDef");

                dataCenter.addDataStore(tRelationDef_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("add_relationDef"), "onComplete", this.add_relationDef_onComplete);

            this.connect(unieap.byId("update_relation"), "onComplete", this.update_relation_onComplete);

            this.connect(unieap.byId("button_relation"), "onClick", this.button_relation_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryRelationDef(1, 20);
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_returnType", [{
                CODEVALUE: "string",
                CODENAME: "string"
            }, {
                CODEVALUE: "number",
                CODENAME: "number"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_relationType", [{
                CODEVALUE: "2",
                CODENAME: "引用BOM属性"
            }, {
                CODEVALUE: "3",
                CODENAME: "引用属性"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryRelationDef方法的成功回调。
     *
     */

    function queryRelationDefSuccess(dc) {
        var result = dc.getDataStore("queryRelationDefResult");
        view.grid.setDataStore("grid_relation", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update_relation(inRowIndex) {
        var selectrow = view.grid.getRow("grid_relation", inRowIndex);
        if (selectrow) {
            var xdialog = unieap.byId("update_relation");
            xdialog.dialogData = {
                opt: "update",
                row: selectrow
            };
            xdialog.show();
            ds
        }
    }
    /**
     * @description:delRelationDef方法的成功回调。
     *
     */

    function delRelationDefSuccess(dc) {
        view.processor.queryRelationDef(1, 20);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del_relation(inRowIndex) {
        var data = view.grid.getRow("grid_relation", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delRelationDef(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }

    function add_relationDef_onComplete(returnObj) {
        view.processor.queryRelationDef(1, 20);
    }

    function update_relation_onComplete(returnObj) {
        view.processor.queryRelationDef(1, 20);
    }

    function button_relation_onClick(event) {
        var dialog = unieap.byId("add_relationDef");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.show();
    }

    function cell_name1__relation_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";



        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRelation.update_relation('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "'" +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRelation.del_relation('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_relation_binding_onAfterSave() {
        view.processor.queryRelationDef(store.getPageNumber(), store.getPageSize());
    }

    function grid_relation_binding_rpc(store, load) {
        view.processor.queryRelationDef(store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.basic.pfRelation.View();
    view.init();

    return view;
})