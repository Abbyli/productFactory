/**
 * 维度定义弹窗
 * @author zhy
 * @creationTime 2016-07-21 09:58:03
 * @modificationTime 2017-03-09 09:51:02
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfDimensionDefDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfDimensionDefDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveDimensionDefSuccess: saveDimensionDefSuccess,
                matchFlag__dimensionDef_onChange: matchFlag__dimensionDef_onChange,
                form_dimensionDef_saveButton_onClick: form_dimensionDef_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.basic.pfDimensionDefDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tDimensionDef_form')) {
                var tDimensionDef_form = new unieap.ds.DataStore('tDimensionDef_form');
                tDimensionDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TDimensionDef");

                dataCenter.addDataStore(tDimensionDef_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("matchFlag__dimensionDef"), "onChange", this.matchFlag__dimensionDef_onChange);

            this.connect(unieap.byId("form_dimensionDef_saveButton"), "onClick", this.form_dimensionDef_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = unieap.getXDialog().dialogData;
            opt = data.opt;
            if (opt == "update") {
                var row = data.row
                view.form.setDataStore("form_dimensionDef", row);
            }
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
                    CODENAME: "风险加费"
                }, {
                    CODEVALUE: "HL",
                    CODENAME: "健康加费"
                },
                //{CODEVALUE:"JOB",CODENAME:"职业加费"}
                {
                    CODEVALUE: "PU",
                    CODENAME: "减额缴清"
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
     * @description:saveDimensionDef方法的成功回调。
     *
     */

    function saveDimensionDefSuccess(dc) {
        var rtnMessage = dc.getParameter("saveDimensionDefResult");
        if (rtnMessage == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: "保存成功！",
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

    function matchFlag__dimensionDef_onChange(value) {
        var value = unieap.byId("matchFlag__dimensionDef").getValue();
        if (value == "0") {
            unieap.byId("columnType__dimensionDef").setValue("string");
            unieap.byId("returnType__dimensionDef").setValue("string");
        }
        if (value == "1") {
            unieap.byId("columnType__dimensionDef").setValue("number");
            unieap.byId("returnType__dimensionDef").setValue("number");
        }
    }

    function form_dimensionDef_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form_dimensionDef');
        //校验form
        if (!form.validate(false)) {
            return;
        }
        var prooerty = unieap.byId("property__dimensionDef").getValue();
        if (prooerty.toLocaleUpperCase() == "VAL") {
            MessageBox.alert({
                title: "提示",
                message: "属性不能为VAL"
            });
            return;
        }

        if (form.isModified()) {
            //保存form中的数据
            var dimensionDef = view.form.getDataStore('form_dimensionDef');
            view.processor.saveDimensionDef(dimensionDef, opt);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    var view = new _factoryabclife.basic.pfDimensionDefDialog.View();
    view.init();

    return view;
})