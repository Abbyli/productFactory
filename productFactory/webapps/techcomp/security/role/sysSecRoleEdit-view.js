/**
 *
 * @author zhangyujia
 * @creationTime 2014-08-12 09:41:37
 * @modificationTime 2014-08-13 19:16:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecRoleEdit", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.role.sysSecRoleEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                editRoleSuccess: editRoleSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.role.sysSecRoleEdit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecRole')) {
                var sysSecRole = new unieap.ds.DataStore('sysSecRole');
                sysSecRole.setRowSetName("com.neusoft.fdframework.security.entity.SysSecRole");

                dataCenter.addDataStore(sysSecRole);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        },
        page_init: function () {
            var statusDs = new unieap.ds.DataStore("statusDs", [{
                CODENAME: '启用',
                CODEVALUE: '1'
            }, {
                CODENAME: '停用',
                CODEVALUE: '0'
            }]);
            dataCenter.addDataStore("statusDs", statusDs);
        }

    });
    /**
     * @description:editRole方法的成功回调。
     *
     */

    function editRoleSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows > 0) {
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else if (affectRows == -1) {
            alert("编号已经存在");
            return;
        }
        else if (affectRows == "-2") {
            alert("该数据已经不存在");
            return;
        }
        else {
            alert("修改失败");
            return;
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
            view.processor.editRole(conditionDs);
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

    var view = new _security.role.sysSecRoleEdit.View();
    view.init();

    return view;
})