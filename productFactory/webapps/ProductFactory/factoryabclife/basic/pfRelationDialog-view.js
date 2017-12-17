/**
 *
 * @author neusoft
 * @creationTime 2016-07-20 11:35:28
 * @modificationTime 2016-11-03 14:32:00
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRelationDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfRelationDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveRelationDefSuccess: saveRelationDefSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.basic.pfRelationDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tRelationDef_addRelation')) {
                var tRelationDef_addRelation = new unieap.ds.DataStore('tRelationDef_addRelation');
                tRelationDef_addRelation.setRowSetName("com.neusoft.abclife.productfactory.entity.TRelationDef");

                dataCenter.addDataStore(tRelationDef_addRelation);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = unieap.getXDialog().dialogData;
            opt = data.opt;
            if (opt == "update") {
                var row = data.row
                view.form.setDataStore("form_relation", row);
            }
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
     * @description:saveRelationDef方法的成功回调。
     *
     */

    function saveRelationDefSuccess(dc) {
        var rtnMessage = dc.getParameter("saveRelationDefResult");
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

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form_relation');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form_relation');
            view.processor.saveRelationDef(conditionDs, opt);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    var view = new _factoryabclife.basic.pfRelationDialog.View();
    view.init();

    return view;
})