/**
 *
 * @author dongyw
 * @creationTime 2014-07-03 08:47:49
 * @modificationTime 2014-11-04 17:15:47
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUserGroup", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.userGroup.sysSecUserGroup.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getUserGroupPageSuccess: getUserGroupPageSuccess,
                updateEnableStatus: updateEnableStatus,
                changeEnabledStatusSuccess: changeEnabledStatusSuccess,
                btnAdd_onClick: btnAdd_onClick,
                btnEdit_onClick: btnEdit_onClick,
                btnEnab_onClick: btnEnab_onClick,
                btnUnEnab_onClick: btnUnEnab_onClick,
                btnAddUser_onClick: btnAddUser_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                addXDialog_onComplete: addXDialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete
            });

            this.processor = new _security.userGroup.sysSecUserGroup.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUserGroup')) {
                var sysSecUserGroup = new unieap.ds.DataStore('sysSecUserGroup');
                sysSecUserGroup.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUserGroup");

                dataCenter.addDataStore(sysSecUserGroup);
            }

            if (!dataCenter.getDataStore('sysSecUserGroup1')) {
                var sysSecUserGroup1 = new unieap.ds.DataStore('sysSecUserGroup1');
                sysSecUserGroup1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUserGroup");

                dataCenter.addDataStore(sysSecUserGroup1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("btnEdit"), "onClick", this.btnEdit_onClick);

            this.connect(unieap.byId("btnEnab"), "onClick", this.btnEnab_onClick);

            this.connect(unieap.byId("btnUnEnab"), "onClick", this.btnUnEnab_onClick);

            this.connect(unieap.byId("btnAddUser"), "onClick", this.btnAddUser_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("addXDialog"), "onComplete", this.addXDialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            //发送请求
            view.processor.getUserGroupPage(conditionDS, 1, 10);
        },
        page_init: function () {
            var isEnableDS = new unieap.ds.DataStore("isEnableDS", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            dataCenter.addDataStore("isEnableDS", isEnableDS);
        }

    });
    /**
     * @description:getUserGroupPage方法的成功回调。
     *
     */

    function getUserGroupPageSuccess(dc) {
        var result = dc.getDataStore('userGroup');

        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} isEnable 参数描述
     * @return:
     *
     */

    function updateEnableStatus(isEnable) {
        var rowSet = unieap.byId("grid1").getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rowSet.getRowCount();
        var sltDs = view.grid.getRows("grid1");

        if (sltNum == 0) {
            alert("请选择记录");
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rowSet.getItemValue(0, "isEnabled") == isEnable) {
                alert("该记录已经是" + (isEnable == 1 ? "可用" : "不可用") + "状态");
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rowSet.getItemValue(i, "isEnabled") == isEnable) {
                    alert("记录中已经存在" + (isEnable == 1 ? "可用" : "不可用") + "状态的记录");
                    return;
                }
            }
        }
        view.processor.changeEnabledStatus(sltDs, isEnable);
    }
    /**
     * @description:changeEnabledStatus方法的成功回调。
     *
     */

    function changeEnabledStatusSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getUserGroupPage(conditionDs, 1, 10);
            }
        });
    }

    function btnAdd_onClick(event) {
        unieap.byId("addXDialog").show();
    }

    function btnEdit_onClick(event) {
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

    function btnEnab_onClick(event) {
        updateEnableStatus('1');

    }

    function btnUnEnab_onClick(event) {
        updateEnableStatus('0');
    }

    function btnAddUser_onClick(event) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        if (rows.getRowCount() == 1) {
            var sltId = rows.getItemValue(0, "id");
            var sltStatus = rows.getItemValue(0, "isEnabled");

            if (sltStatus == '0') {
                alert("请选择启用状态的用户组");
                return;
            }
            var dialog = unieap.byId("AddUserXDialog");

            dialog.dialogData = {
                groupId: sltId
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
        dataCenter.addHeaderAttribute('getUserGroupPage', 'serverExport');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    function addXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, 1, 10);
    }

    var view = new _security.userGroup.sysSecUserGroup.View();
    view.init();

    return view;
})