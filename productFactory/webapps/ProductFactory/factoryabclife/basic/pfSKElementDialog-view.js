/**
 *
 * @author think
 * @creationTime 2016-05-17 10:58:16
 * @modificationTime 2017-03-24 14:34:41
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfSKElementDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfSKElementDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPfStandardSuccess: addPfStandardSuccess,
                updPfStandardSuccess: updPfStandardSuccess,
                getTPropShowDefSuccess: getTPropShowDefSuccess,
                editorType_onChange: editorType_onChange,
                form_element_saveButton_onClick: form_element_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.basic.pfSKElementDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tPropShowDefInit')) {
                var tPropShowDefInit = new unieap.ds.DataStore('tPropShowDefInit');
                tPropShowDefInit.setRowSetName("com.neusoft.abclife.productfactory.entity.TPropShowDef");

                dataCenter.addDataStore(tPropShowDefInit);
            }

            if (!dataCenter.getDataStore('tSkelementDef_form')) {
                var tSkelementDef_form = new unieap.ds.DataStore('tSkelementDef_form');
                tSkelementDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TSkelementDef");

                dataCenter.addDataStore(tSkelementDef_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("editorType"), "onChange", this.editorType_onChange);

            this.connect(unieap.byId("form_element_saveButton"), "onClick", this.form_element_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = unieap.getXDialog().dialogData;
            view.opt = data.opt;
            if (view.opt == "upd") {
                var row = data.row;
                var ds = new unieap.ds.DataStore("ds", [{
                    id: row.getRowSet().getRow(0).getItemValue("id"),
                    name: row.getRowSet().getRow(0).getItemValue("name"),
                    property: row.getRowSet().getRow(0).getItemValue("property"),
                    busiType: row.getRowSet().getRow(0).getItemValue("busiType"),
                    isCalRef: row.getRowSet().getRow(0).getItemValue("isCalRef")
                }]);
                ds.rowSetName = "com.neusoft.abclife.productfactory.entity.TSkelementDef";
                //unieap.debug(ds);
                view.form.setDataStore("form_element", ds);
                //查询数据
                view.processor.getTPropShowDef(ds);

            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_busitype", [{
                CODENAME: "定价",
                CODEVALUE: "1"
            }, {
                CODENAME: "理赔",
                CODEVALUE: "2"
            }]);
            //combobox初始化
            var ds1 = new unieap.ds.DataStore("isEmptyData", [{
                CODEVALUE: "1",
                CODENAME: "必填"
            }, {
                CODEVALUE: "0",
                CODENAME: "非必填"
            }]);
            var ds2 = new unieap.ds.DataStore("isReadData", [{
                CODEVALUE: "1",
                CODENAME: "只读"
            }, {
                CODEVALUE: "0",
                CODENAME: "非只读"
            }]);

            var ds3 = new unieap.ds.DataStore("editTypeData", [{
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
            var ds4 = new unieap.ds.DataStore("isOpt", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:addPfStandard方法的成功回调。
     *
     */

    function addPfStandardSuccess(dc) {
        var rtnMessage = dc.getParameter("rtnMessage");
        if (rtnMessage == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: "保存成功！",
                type: "info",
                //		durationTime:"3000",
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: rtnMessage
            });
        }
    }
    /**
     * @description:updPfStandard方法的成功回调。
     *
     */

    function updPfStandardSuccess(dc) {
        var rtnMessage = dc.getParameter("rtnMessage");
        if (rtnMessage == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: "保存成功！",
                type: "info",
                //		durationTime:"3000",
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: rtnMessage
            });
        }
    }
    /**
     * @description:getTPropShowDef方法的成功回调。
     *
     */

    function getTPropShowDefSuccess(dc) {
        // alert(dc.getDataStore("rtnTPropShowDef").getRowSet().getRow(0));
        if (dc.getDataStore("rtnTPropShowDef").getRowSet().getRow(0) != null) {
            unieap.byId("editorType").onChange(dc.getDataStore("rtnTPropShowDef").getRowSet().getRow(0).getItemValue("editorType"));
            view.form.setDataStore("form1", dc.getDataStore("rtnTPropShowDef"));
        }
    }

    function editorType_onChange(value) {
        if (value == "MutipleComboBox" || value == "SingleComboBox") {
            unieap.byId("dictionary").setDisabled(false);
            unieap.byId("maxLength").setDisabled(true);
            unieap.byId("minLength").setDisabled(true);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "TextBox" || value == "Textarea") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(false);
            unieap.byId("minLength").setDisabled(false);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "DateTextBox") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(true);
            unieap.byId("minLength").setDisabled(true);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "NumberTextBox") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(false);
            unieap.byId("minLength").setDisabled(false);
            unieap.byId("maxVal").setDisabled(false);
            unieap.byId("minVal").setDisabled(false);
        }

        //每次onchange清空值
        var nodes = dojo.query(".forDisabled");
        unieap.byId("form1").clear();
        //unieap.byId("form1").getBinding().getDataStore().getRowSet().getRow(0).clear();
        unieap.byId("editorType").setValue(value);
        //value == null所有控件都可用
        if (!value) {
            for (var i = 0; i < nodes.length; i++) {
                dijit.byNode(nodes[i]).setDisabled(false);
            }
        }

    }

    function form_element_saveButton_onClick(event) {
        if (!unieap.byId("form_element").validate(false)) {
            return;
        }
        if (!unieap.byId("form1").validate(false)) {
            return;
        }

        if (unieap.byId("maxLength").getValue() < unieap.byId("minLength").getValue()) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "最大长度应大于最小长度"
            });
            return;
        }
        if (unieap.byId("maxVal").getValue() < unieap.byId("minVal").getValue()) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "最大值应大于最小值"
            });
            return;
        }
        var ds = unieap.byId("form_element").getBinding().getDataStore();
        var show = unieap.byId("form1").getBinding().getDataStore();
        if (view.opt == "add") {
            view.processor.addPfStandard(ds, show, view.opt);
        }
        else {
            view.processor.updPfStandard(ds, show, view.opt);
        }






    }

    var view = new _factoryabclife.basic.pfSKElementDialog.View();
    view.init();

    return view;
})