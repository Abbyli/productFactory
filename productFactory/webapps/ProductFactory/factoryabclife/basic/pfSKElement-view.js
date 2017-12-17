/**
 * 要素标准化
 * @author think
 * @creationTime 2016-05-17 10:57:55
 * @modificationTime 2017-03-10 11:08:42
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfSKElement", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfSKElement.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                edit: edit,
                del: del,
                getPfStandardsSuccess: getPfStandardsSuccess,
                delPfStandardSuccess: delPfStandardSuccess,
                button_add2_onClick: button_add2_onClick,
                cell_control_formatter: cell_control_formatter,
                grid1_binding_rpc: grid1_binding_rpc,
                xdialog1_onComplete: xdialog1_onComplete
            });

            this.processor = new _factoryabclife.basic.pfSKElement.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tSkelementDef_grid')) {
                var tSkelementDef_grid = new unieap.ds.DataStore('tSkelementDef_grid');
                tSkelementDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TSkelementDef");

                dataCenter.addDataStore(tSkelementDef_grid);
            }

            if (!dataCenter.getDataStore('PfSKElementsDTO_x')) {
                var PfSKElementsDTO_x = new unieap.ds.DataStore('PfSKElementsDTO_x');
                PfSKElementsDTO_x.setRowSetName("com.neusoft.abclife.productfactory.dto.PfSKElementsDTO");

                dataCenter.addDataStore(PfSKElementsDTO_x);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button_add2"), "onClick", this.button_add2_onClick);

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getPfStandards("1", "20");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_busiType", [{
                CODENAME: "定价",
                CODEVALUE: "1"
            }, {
                CODENAME: "理赔",
                CODEVALUE: "2"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_isCalRef", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            var ds2 = new unieap.ds.DataStore("ds_editorType", [{
                CODEVALUE: "TextBox",
                CODENAME: "文本框"
            }, {
                CODEVALUE: "DateTextBox",
                CODENAME: "日期框"
            }, {
                CODEVALUE: "Textarea",
                CODENAME: "大文本域"
            }, {
                CODEVALUE: "ComboBox",
                CODENAME: "单选下拉框"
            }, {
                CODEVALUE: "NumberTextBox",
                CODENAME: "数字文本框"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
        }

    });
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function edit(inRowIndex) {
        var selectrow = view.grid.getRow("grid1", inRowIndex);
        if (selectrow) {
            var xdialog = unieap.byId("xdialog1");
            xdialog.dialogData = {
                opt: "upd",
                row: selectrow
            };
            xdialog.show();

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
                        view.processor.delPfStandard(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:getPfStandards方法的成功回调。
     *
     */

    function getPfStandardsSuccess(dc) {
        var ds = dc.getDataStore("rtnPfSkelements");
        view.grid.setDataStore("grid1", ds);
    }
    /**
     * @description:delPfStandard方法的成功回调。
     *
     */

    function delPfStandardSuccess(dc) {
        view.processor.getPfStandards("1", "20");
    }

    function button_add2_onClick(event) {
        var xdialog = unieap.byId("xdialog1");
        xdialog.dialogData = {
            opt: "add"
        };
        xdialog.show();
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var editImg_h = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit_h.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_o.png";
        var delImg_h = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";

        var editHTML = "<img src='" + editImg + "' style='cursor:pointer;' title='修改' onclick='pfSKElement.edit(" + inRowIndex + ");' ></img>";
        var delHTML = "<img src='" + delImg + "' style='cursor:pointer;' title='删除' onclick='pfSKElement.del(" + inRowIndex + ");' ></img>";
        return editHTML + "&nbsp;&nbsp;" + delHTML;
    }

    function grid1_binding_rpc(store, load) {
        view.processor.getPfStandards(store.getPageNumber(), store.getPageSize());
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.getPfStandards("1", "20");
    }

    var view = new _factoryabclife.basic.pfSKElement.View();
    view.init();

    return view;
})