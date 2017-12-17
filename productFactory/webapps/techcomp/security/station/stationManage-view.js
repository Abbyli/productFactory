/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-11 10:55:24
 * @modificationTime 2014-11-12 13:52:33
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("stationManage", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station.stationManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                changeEnabledStatus: changeEnabledStatus,
                getAllSysSecUnitSuccess: getAllSysSecUnitSuccess,
                getSysSecStationPageSuccess: getSysSecStationPageSuccess,
                updateEnableStatusSuccess: updateEnableStatusSuccess,
                unitTree_onAfterClick: unitTree_onAfterClick,
                addbtn_onClick: addbtn_onClick,
                editbtn_onClick: editbtn_onClick,
                enablebtn_onClick: enablebtn_onClick,
                unablebtn_onClick: unablebtn_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                addxDialog_onComplete: addxDialog_onComplete,
                editxDialog_onComplete: editxDialog_onComplete
            });

            this.processor = new _security.station.stationManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUnit')) {
                var sysSecUnit = new unieap.ds.DataStore('sysSecUnit');
                sysSecUnit.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnit");

                dataCenter.addDataStore(sysSecUnit);
            }

            if (!dataCenter.getDataStore('sysSecStation')) {
                var sysSecStation = new unieap.ds.DataStore('sysSecStation');
                sysSecStation.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStation");

                dataCenter.addDataStore(sysSecStation);
            }

            if (!dataCenter.getDataStore('sysSecStation1')) {
                var sysSecStation1 = new unieap.ds.DataStore('sysSecStation1');
                sysSecStation1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStation");

                dataCenter.addDataStore(sysSecStation1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("unitTree"), "onAfterClick", this.unitTree_onAfterClick);

            this.connect(unieap.byId("addbtn"), "onClick", this.addbtn_onClick);

            this.connect(unieap.byId("editbtn"), "onClick", this.editbtn_onClick);

            this.connect(unieap.byId("enablebtn"), "onClick", this.enablebtn_onClick);

            this.connect(unieap.byId("unablebtn"), "onClick", this.unablebtn_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("addxDialog"), "onComplete", this.addxDialog_onComplete);

            this.connect(unieap.byId("editxDialog"), "onComplete", this.editxDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllSysSecUnit();
        },
        page_init: function () {
            var isEnabledDs = new unieap.ds.DataStore("isEnabledDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: '1',
                CODENAME: '是'
            }, {
                CODEVALUE: '0',
                CODENAME: '否'
            }]);
            dataCenter.addDataStore("isEnabledDs", isEnabledDs);
        }

    });
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
        //unieap.debug(sltDs);
        if (sltNum == 0) {
            MessageBox.alert({
                title: "提示信息",
                message: "请选择一条记录！"
            });
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rows.getItemValue(0, "isEnabled") == isEnable) {
                MessageBox.alert({
                    title: "提示信息",
                    message: "此岗位已经是" + (isEnable == 1 ? "启用" : "停用") + "状态"
                });
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rows.getItemValue(i, "isEnabled") == isEnable) {
                    MessageBox.alert({
                        title: "提示信息",
                        message: "所选岗位中已经存在" + (isEnable == 1 ? "启用" : "停用") + "状态的岗位"
                    });
                    return;
                }
            }
        }
        view.processor.updateEnableStatus(sltDs, isEnable);
    }
    /**
     * @description:getAllSysSecUnit方法的成功回调。
     *
     */

    function getAllSysSecUnitSuccess(dc) {
        view.tree.setDataStore("unitTree", dc.getSingleDataStore());
        unieap.byId("unitTree").expandAllNodes();
    }
    /**
     * @description:getSysSecStationPage方法的成功回调。
     *
     */

    function getSysSecStationPageSuccess(dc) {
        var result = dc.getDataStore('station');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:updateEnableStatus方法的成功回调。
     *
     */

    function updateEnableStatusSuccess(dc) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                if (unitId != null) {
                    var store1 = view.form.getDataStore("form1");
                    var rowSet = store1.getRowSet();
                    rowSet.setItemValue(0, "unitId", unitId);
                    view.processor.getSysSecStationPage(store1, 1, 10);
                }
            }
        });
    }

    function unitTree_onAfterClick(node) {
        var unitId = node.getData()["id"];
        var store1 = view.form.getDataStore("form1");
        var rowSet = store1.getRowSet();
        rowSet.setItemValue(0, "unitId", unitId);
        rowSet.setItemValue(0, "name", "");
        rowSet.setItemValue(0, "code", "");
        view.processor.getSysSecStationPage(store1, 1, 10);
    }

    function addbtn_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        if (node == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "请选择一个组织机构！"
            });
            return;
        }
        var unitId = node.getData()['id'];
        var addxDialog = unieap.byId('addxDialog');
        var data = {
            queryId: unitId
        }
        addxDialog.dialogData = data;
        addxDialog.show();
    }

    function editbtn_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        if (node == null) {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择组织机构！'
            });
            return;
        }
        else {
            var grid = unieap.byId("grid1");
            var rows = grid.getManager('SelectionManager').getSelectedRows();
            if (rows.length == 1) {
                var data = view.grid.getRow("grid1");
                var dialog = unieap.byId("editxDialog");
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

    }

    function enablebtn_onClick(event) {
        changeEnabledStatus("1");
    }

    function unablebtn_onClick(event) {
        changeEnabledStatus("0");
    }

    function grid1_queryButton_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        var form = unieap.byId("form1");
        var store1 = view.form.getDataStore("form1");
        var rowSet = store1.getRowSet();
        rowSet.setItemValue(0, "unitId", unitId);
        view.processor.getSysSecStationPage(store1, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_binding_rpc(store, load) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        var store1 = view.form.getDataStore("form1");
        var rowSet = store1.getRowSet();
        rowSet.setItemValue(0, "unitId", unitId);
        rowSet.setItemValue(0, "name", "");
        rowSet.setItemValue(0, "code", "");
        view.processor.getSysSecStationPage(store1, store.getPageNumber(), store.getPageSize());
    }

    function addxDialog_onComplete(returnObj) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        var form = unieap.byId("form1");
        var store1 = view.form.getDataStore("form1");
        var rowSet = store1.getRowSet();
        rowSet.setItemValue(0, "unitId", unitId);
        view.processor.getSysSecStationPage(store1, 1, 10);
    }

    function editxDialog_onComplete(returnObj) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        if (unitId != null) {
            var store1 = view.form.getDataStore("form1");
            var rowSet = store1.getRowSet();
            rowSet.setItemValue(0, "unitId", unitId);
            view.processor.getSysSecStationPage(store1, 1, 10);
        }
    }

    var view = new _security.station.stationManage.View();
    view.init();

    return view;
})