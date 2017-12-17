/**
 *
 * @author zhangyujia
 * @creationTime 2014-08-11 15:48:44
 * @modificationTime 2014-11-04 17:03:19
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecRole", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.role.sysSecRole.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getSysSecRolePageSuccess: getSysSecRolePageSuccess,
                updateEnableStatusSuccess: updateEnableStatusSuccess,
                changeEnableStatus: changeEnableStatus,
                addbtn_onClick: addbtn_onClick,
                editbtn_onClick: editbtn_onClick,
                enablebtn_onClick: enablebtn_onClick,
                unablebtn_onClick: unablebtn_onClick,
                adduserbtn_onClick: adduserbtn_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                AddXdialog_onComplete: AddXdialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete,
                AddUserXDialog_onComplete: AddUserXDialog_onComplete
            });

            this.processor = new _security.role.sysSecRole.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecRole1')) {
                var sysSecRole1 = new unieap.ds.DataStore('sysSecRole1');
                sysSecRole1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecRole");

                dataCenter.addDataStore(sysSecRole1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addbtn"), "onClick", this.addbtn_onClick);

            this.connect(unieap.byId("editbtn"), "onClick", this.editbtn_onClick);

            this.connect(unieap.byId("enablebtn"), "onClick", this.enablebtn_onClick);

            this.connect(unieap.byId("unablebtn"), "onClick", this.unablebtn_onClick);

            this.connect(unieap.byId("adduserbtn"), "onClick", this.adduserbtn_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("AddXdialog"), "onComplete", this.AddXdialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

            this.connect(unieap.byId("AddUserXDialog"), "onComplete", this.AddUserXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            view.processor.getSysSecRolePage(conditionDS, 1, 10);
        },
        page_init: function () {
            var statusDs = new unieap.ds.DataStore("statusDs", [{
                CODENAME: '',
                CODEVALUE: ''
            }, {
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
     * @description:getSysSecRolePage方法的成功回调。
     *
     */

    function getSysSecRolePageSuccess(dc) {
        var result = dc.getDataStore('role');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:updateEnableStatus方法的成功回调。
     *
     */

    function updateEnableStatusSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getSysSecRolePage(conditionDs, 1, 10);
            }
        });
    }
    /**
     * @description:
     *
     * @param: {参数类型} isEnable 参数描述
     * @return:
     *
     */

    function changeEnableStatus(isEnable) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rows.getRowCount();
        var sltDs = view.grid.getRows("grid1");
        if (sltNum == 0) {
            MessageBox.alert({
                title: "提示信息",
                message: "需要先选中一个角色"
            });
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rows.getItemValue(0, "status") == isEnable) {
                MessageBox.alert({
                    title: "提示信息",
                    message: "该角色已经是" + (isEnable == 1 ? "可用" : "不可用") + "状态"
                });
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rows.getItemValue(i, "status") == isEnable) {
                    MessageBox.alert({
                        title: "提示信息",
                        message: "所选角色中已经存在" + (isEnable == 1 ? "可用" : "不可用") + "状态的角色"
                    });
                    return;
                }
            }
        }
        view.processor.updateEnableStatus(sltDs, isEnable);
    }

    function addbtn_onClick(event) {
        unieap.byId("AddXdialog").show();
    }

    function editbtn_onClick(event) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager('SelectionManager').getSelectedRows();
        if (rows.length == 1) {
            var data = view.grid.getRow("grid1");
            var dialog = unieap.byId("editXDialog");
            dialog.dialogData = data;
            dialog.show();
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择一条记录！'
            });
        }
    }

    function enablebtn_onClick(event) {
        changeEnableStatus('1');
    }

    function unablebtn_onClick(event) {
        changeEnableStatus('0');
    }

    function adduserbtn_onClick(event) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        if (rows.getRowCount() == 1) {
            var sltId = rows.getItemValue(0, "id");
            var sltStatus = rows.getItemValue(0, "status");

            if (sltStatus == '0') {
                alert("请选择启用状态的角色");
                return;
            }
            var dialog = unieap.byId("AddUserXDialog");

            dialog.dialogData = {
                roleId: sltId
            };
            dialog.show();
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择一条记录！'
            });
        }
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getSysSecRolePage', 'serverExport');
        //发送请求
        view.processor.getSysSecRolePage(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getSysSecRolePage(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    function AddXdialog_onComplete(returnObj) {
        var conditionDs = view.form.getDataStore("form1");
        view.processor.getSysSecRolePage(conditionDs, "1", "10");
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDs = view.form.getDataStore("form1");
        view.processor.getSysSecRolePage(conditionDs, "1", "10");
    }

    function AddUserXDialog_onComplete(returnObj) {
        //var conditionDs = view.form.getDataStore("form1");
        //view.processor.getSysSecRolePage(conditionDs, "1", "10");
    }

    var view = new _security.role.sysSecRole.View();
    view.init();

    return view;
})