/**
 *
 * @author user
 * @creationTime 2014-07-28 09:26:10
 * @modificationTime 2014-09-23 09:56:19
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("data_authority", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.data_authority.data_authority.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getDataAuthorityListSuccess: getDataAuthorityListSuccess,
                getAllEnabledDataAuthoritySuccess: getAllEnabledDataAuthoritySuccess,
                changeEnabledStatus: changeEnabledStatus,
                updateEnableStatusSuccess: updateEnableStatusSuccess,
                addXdialog_onComplete: addXdialog_onComplete,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                button3_onClick: button3_onClick,
                button4_onClick: button4_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                editXDialog_onComplete: editXDialog_onComplete
            });

            this.processor = new _security.data_authority.data_authority.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataAuthority')) {
                var sysSecDataAuthority = new unieap.ds.DataStore('sysSecDataAuthority');
                sysSecDataAuthority.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataAuthority");

                dataCenter.addDataStore(sysSecDataAuthority);
            }

            if (!dataCenter.getDataStore('sysSecDataAuthority1')) {
                var sysSecDataAuthority1 = new unieap.ds.DataStore('sysSecDataAuthority1');
                sysSecDataAuthority1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataAuthority");

                dataCenter.addDataStore(sysSecDataAuthority1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addXdialog"), "onComplete", this.addXdialog_onComplete);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

            this.connect(unieap.byId("button4"), "onClick", this.button4_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            view.processor.getDataAuthorityList(conditionDS, 1, 10);
        },
        page_init: function () {
            var isEnabledDs = new unieap.ds.DataStore("isEnabled", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "启用"
            }, {
                CODEVALUE: "0",
                CODENAME: "停用"
            }]);
            dataCenter.addDataStore("isEnabledDs", isEnabledDs);
        }

    });
    /**
     * @description:getDataAuthorityList方法的成功回调。
     *
     */

    function getDataAuthorityListSuccess(dc) {
        var dataAuthority = dc.getDataStore('dataAuthority');
        view.grid.setDataStore('grid1', dataAuthority);
    }
    /**
     * @description:getAllEnabledDataAuthority方法的成功回调。
     *
     */

    function getAllEnabledDataAuthoritySuccess(dc) {
        var dataAuthority = dc.getDataStore('dataAuthority');
        view.grid.setDataStore('grid1', dataAuthority);
    }
    /**
     * @description:
     *
     * @param: {参数类型} isEnable 参数描述
     * @return:
     *
     */

    function changeEnabledStatus(isEnable) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rows.getRowCount();

        var sltDs = view.grid.getRows("grid1");
        if (sltNum == 0) {
            alert("请选择记录");
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rows.getItemValue(0, "isEnabled") == isEnable) {
                alert("该记录已经是" + (isEnable == 1 ? "启用" : "停用") + "状态");
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rows.getItemValue(i, "isEnabled") == isEnable) {
                    alert("记录中已经存在" + (isEnable == 1 ? "启用" : "停用") + "状态的记录");
                    return;
                }
            }
        }
        view.processor.updateEnableStatus(sltDs, isEnable);
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
                view.processor.getDataAuthorityList(conditionDs, 1, 10);
            }
        });
    }

    function addXdialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getDataAuthorityList(conditionDS, 1, 10);
    }

    function button1_onClick(event) {
        var addDialog = unieap.byId("addXdialog");
        addDialog.show();
    }

    function button2_onClick(event) {
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

    function button3_onClick(event) {
        changeEnabledStatus('1');
    }

    function button4_onClick(event) {
        changeEnabledStatus('0');
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getDataAuthorityList', 'serverExport');
        //发送请求
        view.processor.getDataAuthorityList(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getDataAuthorityList', 'serverExport');
        //发送请求
        view.processor.getDataAuthorityList(conditionDS, 1, 10);
    }

    function grid1_binding_rpc(store, load) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getDataAuthorityList', 'serverExport');
        //发送请求
        view.processor.getDataAuthorityList(conditionDS, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getDataAuthorityList(conditionDS, 1, 10);
    }

    var view = new _security.data_authority.data_authority.View();
    view.init();

    return view;
})