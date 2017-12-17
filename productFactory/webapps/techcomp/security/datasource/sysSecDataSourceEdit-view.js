/**
 *
 * @author dongyw
 * @creationTime 2014-07-02 16:43:34
 * @modificationTime 2014-08-15 10:12:35
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecDataSourceEdit", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datasource.sysSecDataSourceEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                editDataSourceSuccess: editDataSourceSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.datasource.sysSecDataSourceEdit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataSource')) {
                var sysSecDataSource = new unieap.ds.DataStore('sysSecDataSource');
                sysSecDataSource.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataSource");

                dataCenter.addDataStore(sysSecDataSource);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        }


    });
    /**
     * @description:editDataSource方法的成功回调。
     *
     */

    function editDataSourceSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows != -1) {
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '保存失败！'
            });
        }
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form1');
            view.processor.editDataSource(conditionDs);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        formRowSet.discardUpdate(0);
        formRowSet.resetUpdate();
    }

    var view = new _security.datasource.sysSecDataSourceEdit.View();
    view.init();

    return view;
})