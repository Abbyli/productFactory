/**
 * 维度定义
 * @author think
 * @creationTime 2016-07-13 16:03:06
 * @modificationTime 2017-03-13 09:59:44
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfDimension", function () {

    var forOrder = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfDimension.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getDimensionDefSuccess: getDimensionDefSuccess,
                update_dimensionDef: update_dimensionDef,
                del_dimensionDef: del_dimensionDef,
                delDimensionDefSuccess: delDimensionDefSuccess,
                queryDimensionNoPageSuccess: queryDimensionNoPageSuccess,
                changeOrderSuccess: changeOrderSuccess,
                up_dimensionDef: up_dimensionDef,
                down_dimensionDef: down_dimensionDef,
                add_dimensionDef_onComplete: add_dimensionDef_onComplete,
                update_dimensionDef_onComplete: update_dimensionDef_onComplete,
                button1_onClick: button1_onClick,
                button_DimensionDef_onClick: button_DimensionDef_onClick,
                cell_name1__DimensionDef_formatter: cell_name1__DimensionDef_formatter,
                grid_DimensionDef_binding_rpc: grid_DimensionDef_binding_rpc,
                forOrder: forOrder
            });

            this.processor = new _factoryabclife.basic.pfDimension.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tDimensionDef_grid')) {
                var tDimensionDef_grid = new unieap.ds.DataStore('tDimensionDef_grid');
                tDimensionDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TDimensionDef");

                dataCenter.addDataStore(tDimensionDef_grid);
            }

            if (!dataCenter.getDataStore('tDimensionDef_forOrder')) {
                var tDimensionDef_forOrder = new unieap.ds.DataStore('tDimensionDef_forOrder');
                tDimensionDef_forOrder.setRowSetName("com.neusoft.abclife.productfactory.entity.TDimensionDef");

                dataCenter.addDataStore(tDimensionDef_forOrder);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("add_dimensionDef"), "onComplete", this.add_dimensionDef_onComplete);

            this.connect(unieap.byId("update_dimensionDef"), "onComplete", this.update_dimensionDef_onComplete);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button_DimensionDef"), "onClick", this.button_DimensionDef_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryDimensionNoPage(view.form.getDataStore("form_DimensionDef"));

            view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_column", [{
                CODEVALUE: "string",
                CODENAME: "字符串"
            }, {
                CODEVALUE: "number",
                CODENAME: "数字"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_match", [{
                CODEVALUE: "0",
                CODENAME: "精确匹配"
            }, {
                CODEVALUE: "1",
                CODENAME: "范围匹配"
            }]);
            var ds2 = new unieap.ds.DataStore("ds_dimension", [{
                CODEVALUE: "1",
                CODENAME: "默认值"
            }, {
                CODEVALUE: "2",
                CODENAME: "引用BOM的属性"
            }, {
                CODEVALUE: "3",
                CODENAME: "引用属性"
            }]);
            var ds3 = new unieap.ds.DataStore("ds_return", [{
                CODEVALUE: "string",
                CODENAME: "string"
            }, {
                CODEVALUE: "number",
                CODENAME: "number"
            }]);
            var ds4 = new unieap.ds.DataStore("ds_rate", [{
                    CODEVALUE: "RT_P",
                    CODENAME: "保费费率表"
                }, {
                    CODEVALUE: "RT_A",
                    CODENAME: "保额费率表"
                }, {
                    CODEVALUE: "V",
                    CODENAME: "现价表"
                }, {
                    CODEVALUE: "EXP",
                    CODENAME: "风险扣费表"
                }, {
                    CODEVALUE: "HL",
                    CODENAME: "健康加费表"
                },
                //{CODEVALUE:"JOB",CODENAME:"职业加费"},
                {
                    CODEVALUE: "PU",
                    CODENAME: "减额缴清表"
                }
            ]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
        }

    });
    /**
     * @description:getDimensionDef方法的成功回调。
     *
     */

    function getDimensionDefSuccess(dc) {
        var result = dc.getDataStore("queryDimensionDefResult");
        view.grid.setDataStore("grid_DimensionDef", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update_dimensionDef(inRowIndex) {
        var selectrow = view.grid.getRow("grid_DimensionDef", inRowIndex);
        if (selectrow) {
            var xdialog = unieap.byId("update_dimensionDef");
            xdialog.dialogData = {
                opt: "update",
                row: selectrow
            };
            xdialog.show();
            ds
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del_dimensionDef(inRowIndex) {
        var data = view.grid.getRow("grid_DimensionDef", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delDimensionDef(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delDimensionDef方法的成功回调。
     *
     */

    function delDimensionDefSuccess(dc) {
        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);
    }
    /**
     * @description:queryDimensionNoPage方法的成功回调。
     *
     */

    function queryDimensionNoPageSuccess(dc) {
        forOrder = dc.getDataStore("queryDimensionDefNoPage");
    }
    /**
     * @description:changeOrder方法的成功回调。
     *
     */

    function changeOrderSuccess(dc) {
        view.processor.queryDimensionNoPage(view.form.getDataStore("form_DimensionDef"));

        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function up_dimensionDef(inRowIndex) {
        var row = view.grid.getRow("grid_DimensionDef", inRowIndex);
        var count = forOrder.getRowSet().getRowCount();
        var i = 0;
        for (; i < count; i++) {
            if (row.getRowSet().getRow(0).getItemValue("id") == forOrder.getRowSet().getRow(i).getItemValue("id")) {
                break;
            }
        }
        var dimen = forOrder.rowSet.primary[i - 1];
        var ds = new unieap.ds.DataStore();
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRow(dimen);
        ds.setRowSet(rowSet);
        ds.setRowSetName("com.neusoft.abclife.productfactory.entity.TDimensionDef");
        view.processor.changeOrder(row, ds);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function down_dimensionDef(inRowIndex) {
        var row = view.grid.getRow("grid_DimensionDef", inRowIndex);
        var count = forOrder.getRowSet().getRowCount();
        var i = 0;
        for (; i < count; i++) {
            if (row.getRowSet().getRow(0).getItemValue("id") == forOrder.getRowSet().getRow(i).getItemValue("id")) {
                break;
            }
        }
        var dimen = forOrder.rowSet.primary[i + 1];
        var ds = new unieap.ds.DataStore();
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRow(dimen);
        ds.setRowSet(rowSet);
        ds.setRowSetName("com.neusoft.abclife.productfactory.entity.TDimensionDef");
        view.processor.changeOrder(row, ds);
    }

    function add_dimensionDef_onComplete(returnObj) {
        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);
    }

    function update_dimensionDef_onComplete(returnObj) {
        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);
    }

    function button1_onClick(event) {
        if (!unieap.byId("form_DimensionDef").validate(true)) {
            return;
        }
        view.processor.queryDimensionNoPage(view.form.getDataStore("form_DimensionDef"));
        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), 1, 20);

    }

    function button_DimensionDef_onClick(event) {
        var dialog = unieap.byId("add_dimensionDef");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.show();
    }

    function cell_name1__DimensionDef_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var moveUp = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_shift-down.png";
        var moveDown = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_shift-up.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfDimension.update_dimensionDef('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfDimension.del_dimensionDef('" + inRowIndex + "')\" />";

        var upBtn = "<img src='" + moveUp + "' " +
            "style=\"cursor:pointer\" title=\"上移\" " +
            "onclick=\"pfDimension.up_dimensionDef('" + inRowIndex + "')\" />";

        var downBtn = "<img src='" + moveDown + "' " +
            "style=\"cursor:pointer\" title=\"下移\" " +
            "onclick=\"pfDimension.down_dimensionDef('" + inRowIndex + "')\" />";

        var rowNum = view.grid.getRow("grid_DimensionDef", inRowIndex).getRowSet().getRow(0).getItemValue("orderNum");
        var maxNum = forOrder.getRowSet().getRowCount() - 1;
        if (rowNum == forOrder.getRowSet().getRow(0).getItemValue("orderNum")) {
            return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + downBtn + " " + updateBtn + delBtn;
        }
        else if (rowNum == forOrder.getRowSet().getRow(maxNum).getItemValue("orderNum")) {
            return upBtn + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + updateBtn + delBtn;
        }
        else {

            return upBtn + " " + downBtn + " " + updateBtn + delBtn;
        }


    }

    function grid_DimensionDef_binding_rpc(store, load) {
        view.processor.getDimensionDef(view.form.getDataStore("form_DimensionDef"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.basic.pfDimension.View();
    view.init();

    return view;
})