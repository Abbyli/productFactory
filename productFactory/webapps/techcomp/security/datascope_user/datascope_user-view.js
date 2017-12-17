/**
 *
 * @author zhyu.neu
 * @creationTime 2014-07-31 11:29:39
 * @modificationTime 2014-12-31 16:55:05
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("datascope_user", function () {

    var unitId;

    var stationId;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascope_user.datascope_user.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllSysSecUnitForUnitSuccess: getAllSysSecUnitForUnitSuccess,
                getAllSysSecUnitForStationSuccess: getAllSysSecUnitForStationSuccess,
                getAllDataScopeForUnieapSuccess: getAllDataScopeForUnieapSuccess,
                getStationListSuccess: getStationListSuccess,
                deleteDataScopeGroupSuccess: deleteDataScopeGroupSuccess,
                deleteDataScopeGroupError: deleteDataScopeGroupError,
                getUserGroupPageSuccess: getUserGroupPageSuccess,
                unitTree_unit_onAfterClick: unitTree_unit_onAfterClick,
                cfgbtn_onClick: cfgbtn_onClick,
                delbtn_onClick: delbtn_onClick,
                grid_unit_dataScope_queryButton_onClick: grid_unit_dataScope_queryButton_onClick,
                grid_unit_dataScope_resetButton_onClick: grid_unit_dataScope_resetButton_onClick,
                grid_unit_dataScope_binding_rpc: grid_unit_dataScope_binding_rpc,
                tabPane1_onShow: tabPane1_onShow,
                grid_station_selection_onAfterSelect: grid_station_selection_onAfterSelect,
                grid_station_views_onRowClick: grid_station_views_onRowClick,
                unitTree_station_onAfterClick: unitTree_station_onAfterClick,
                unitTree_station_onClick: unitTree_station_onClick,
                cfgbtn_station_onClick: cfgbtn_station_onClick,
                delbtn_station_onClick: delbtn_station_onClick,
                grid_station_dataScope_queryButton_onClick: grid_station_dataScope_queryButton_onClick,
                grid_station_dataScope_resetButton_onClick: grid_station_dataScope_resetButton_onClick,
                grid_station_dataScope_binding_rpc: grid_station_dataScope_binding_rpc,
                tabPane2_onShow: tabPane2_onShow,
                btnAddDataScope_onClick: btnAddDataScope_onClick,
                grid7_queryButton_onClick: grid7_queryButton_onClick,
                grid7_resetButton_onClick: grid7_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                tabPane3_onShow: tabPane3_onShow,
                ds_ConfigDialog_onComplete: ds_ConfigDialog_onComplete,
                unitId: unitId,
                stationId: stationId
            });

            this.processor = new _security.datascope_user.datascope_user.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecDataScope')) {
                var sysSecDataScope = new unieap.ds.DataStore('sysSecDataScope');
                sysSecDataScope.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");

                dataCenter.addDataStore(sysSecDataScope);
            }

            if (!dataCenter.getDataStore('sysSecDataScope1')) {
                var sysSecDataScope1 = new unieap.ds.DataStore('sysSecDataScope1');
                sysSecDataScope1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");

                dataCenter.addDataStore(sysSecDataScope1);
            }

            if (!dataCenter.getDataStore('sysSecUnit1')) {
                var sysSecUnit1 = new unieap.ds.DataStore('sysSecUnit1');
                sysSecUnit1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnit");

                dataCenter.addDataStore(sysSecUnit1);
            }

            if (!dataCenter.getDataStore('sysSecDataScope2')) {
                var sysSecDataScope2 = new unieap.ds.DataStore('sysSecDataScope2');
                sysSecDataScope2.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");

                dataCenter.addDataStore(sysSecDataScope2);
            }

            if (!dataCenter.getDataStore('sysSecDataScope3')) {
                var sysSecDataScope3 = new unieap.ds.DataStore('sysSecDataScope3');
                sysSecDataScope3.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");

                dataCenter.addDataStore(sysSecDataScope3);
            }

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

            this.connect(unieap.byId("unitTree_unit"), "onAfterClick", this.unitTree_unit_onAfterClick);

            this.connect(unieap.byId("cfgbtn"), "onClick", this.cfgbtn_onClick);

            this.connect(unieap.byId("delbtn"), "onClick", this.delbtn_onClick);

            this.connect(unieap.byId("grid_unit_dataScope_queryButton"), "onClick", this.grid_unit_dataScope_queryButton_onClick);

            this.connect(unieap.byId("grid_unit_dataScope_resetButton"), "onClick", this.grid_unit_dataScope_resetButton_onClick);

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("unitTree_station"), "onAfterClick", this.unitTree_station_onAfterClick);

            this.connect(unieap.byId("unitTree_station"), "onClick", this.unitTree_station_onClick);

            this.connect(unieap.byId("cfgbtn_station"), "onClick", this.cfgbtn_station_onClick);

            this.connect(unieap.byId("delbtn_station"), "onClick", this.delbtn_station_onClick);

            this.connect(unieap.byId("grid_station_dataScope_queryButton"), "onClick", this.grid_station_dataScope_queryButton_onClick);

            this.connect(unieap.byId("grid_station_dataScope_resetButton"), "onClick", this.grid_station_dataScope_resetButton_onClick);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("btnAddDataScope"), "onClick", this.btnAddDataScope_onClick);

            this.connect(unieap.byId("grid7_queryButton"), "onClick", this.grid7_queryButton_onClick);

            this.connect(unieap.byId("grid7_resetButton"), "onClick", this.grid7_resetButton_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("ds_ConfigDialog"), "onComplete", this.ds_ConfigDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllSysSecUnitForUnit();
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
            view.processor.getAllDataSourceList();

        }

    });
    /**
     * @description:getAllSysSecUnitForUnit方法的成功回调。
     *
     */

    function getAllSysSecUnitForUnitSuccess(dc) {
        //var ds = dc.getDataStore("units");
        //unieap.debug(ds);
        //view.tree.setDataStore("unitTree_unit", ds);
        //unieap.byId("unitTree_unit").expandAllNodes();

        view.tree.setDataStore("unitTree_unit", dc.getSingleDataStore());
        unieap.byId("unitTree_unit").expandAllNodes();
    }
    /**
     * @description:getAllSysSecUnitForStation方法的成功回调。
     *
     */

    function getAllSysSecUnitForStationSuccess(dc) {
        view.tree.setDataStore("unitTree_station", dc.getSingleDataStore());
        unieap.byId("unitTree_station").expandAllNodes();
    }
    /**
     * @description:getAllDataScopeForUnieap方法的成功回调。
     *
     */

    function getAllDataScopeForUnieapSuccess(dc) {
        var result = dc.getDataStore('result');
        //取得过程调用的第三个参数，即groupType
        var groupType = eval('(' + result.getParameter("processor").parameters[2] + ')').data;
        if (groupType == 0) { //unit
            view.grid.setDataStore('grid_unit_dataScope', result);
        }
        else if (groupType == 1) { //station
            view.grid.setDataStore("grid_station_dataScope", result);
        }
        else {
            alert("group type error");
        }
    }
    /**
     * @description:getStationList方法的成功回调。
     *
     */

    function getStationListSuccess(dc) {
        var result = dc.getDataStore('station');
        view.grid.setDataStore("grid_station", result);
    }
    /**
     * @description:deleteDataScopeGroup方法的成功回调。
     *
     */

    function deleteDataScopeGroupSuccess(dc) {
        alert("操作成功")
        if (unitId != null) {
            var store1 = view.form.getDataStore("form_unitdataScope");
            view.processor.getAllDataScopeForUnieap(store1, unitId, "0", 1, 10);
        }
        if (stationId != null) {
            var store2 = view.form.getDataStore("form_station_dataScope");
            view.processor.getAllDataScopeForUnieap(store2, stationId, "1", 1, 10);
        }
    }
    /**
     * @description:deleteDataScopeGroup方法的失败回调。
     *
     */

    function deleteDataScopeGroupError(xhr) {
        alert("操作失败");
    }
    /**
     * @description:getUserGroupPage方法的成功回调。
     *
     */

    function getUserGroupPageSuccess(dc) {
        var result = dc.getDataStore('userGroup');
        view.grid.setDataStore('grid7', result);
    }

    function unitTree_unit_onAfterClick(node) {
        unitId = node.getData()["id"];
        unieap.byId("form_unitdataScope").clear();
        var store1 = view.form.getDataStore("form_unitdataScope");
        //var rowSet = store1.getRowSet();
        //rowSet.setItemValue(0, "name", "");
        //var name = rowSet.getItemValue(0,"name");
        //alert(store1);
        //unieap.debug(store1);
        view.processor.getAllDataScopeForUnieap(store1, unitId, "0", 1, 10);
    }

    function cfgbtn_onClick(event) {
        if (unitId == null) {
            alert("请选择组织机构")
        }
        else {
            var dialog = unieap.byId("ds_ConfigDialog");
            dialog.dialogData = {
                groupId: unitId,
                groupType: "0"
            };
            dialog.show();
        }
    }

    function delbtn_onClick(event) {
        if (unitId ==

            null) {
            alert("请选择组织机构")
        }
        else {
            var gridid = view.grid.getPropertyValue("grid_unit_dataScope", "id");
            if (gridid != null) {
                view.processor.deleteDataScopeGroup(view.grid.getRows("grid_unit_dataScope"), unitId, "0");
            }
            else {
                MessageBox.alert({
                    title: '提示',
                    message: '请选择记录！'
                });
            }
        }
    }

    function grid_unit_dataScope_queryButton_onClick(event) {
        var node = unieap.byId("unitTree_unit").getCurrentNode();
        if (node == null || unitId == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "请先选择机构"
            });
            return;
        }
        else {
            var store1 = view.form.getDataStore("form_unitdataScope");
            view.processor.getAllDataScopeForUnieap(store1, unitId, "0", 1, 10);
        }
    }

    function grid_unit_dataScope_resetButton_onClick(event) {
        unieap.byId

        ("form_unitdataScope").clear();
    }

    function grid_unit_dataScope_binding_rpc(store, load) {
        var store1 = view.form.getDataStore

        ("form_unitdataScope");
        //var rowSet = store1.getRowSet();
        //rowSet.setItemValue(0, "name", "");
        //var name = rowSet.getItemValue(0,"name");
        //alert(store1);
        //unieap.debug(store1);
        view.processor.getAllDataScopeForUnieap(store1, unitId, "0", store.getPageNumber(), store.getPageSize());
    }

    function tabPane1_onShow(pane) {
        //每次显示tab页，清空stationId
        unitId = null;
    }

    function grid_station_selection_onAfterSelect(inRowIndex) {
        stationId = view.grid.getPropertyValue("grid_station", "id", inRowIndex)
        //alert(stationId)
        var conditionDS = view.form.getDataStore('form_station_dataScope');
        //dataCenter.addHeaderAttribute('getAllDataScopeForUnieap', 'serverExport');
        //发送请求
        view.processor.getAllDataScopeForUnieap(conditionDS, stationId, "1", 1, 10);
    }

    function grid_station_views_onRowClick(event) {
        var grid1 = unieap.byId("grid_station");
        var inRowIndex = grid1.getRowManager().getCurrentRowIndex();
        grid1.getManager("SelectionManager").setSelect(inRowIndex, true);
        //stationId = view.grid.getRow("grid_station",inRowIndex).getRowSet().getItemValue(0, "id");


        stationId = view.grid.getPropertyValue("grid_station", "id", inRowIndex)
        //alert(stationId)
        var conditionDS = view.form.getDataStore('form_station_dataScope');
        //dataCenter.addHeaderAttribute('getAllDataScopeForUnieap', 'serverExport');
        //发送请求
        view.processor.getAllDataScopeForUnieap(conditionDS, stationId, "1", 1, 10);
    }

    function unitTree_station_onAfterClick(node) {
        var unitId = view.tree.getPropertyValue("unitTree_station", node, "id");

        if (unitId != null) {
            view.processor.getStationList(unitId);
        }
        else {
            alert("请选择一个节点");
        }
    }

    function unitTree_station_onClick(node) {
        //清空上次选择的stationId
        stationId = null;
    }

    function cfgbtn_station_onClick(event) {
        if (stationId == null) {
            alert("请选择岗位")
        }
        else {
            var dialog = unieap.byId("ds_ConfigDialog");
            dialog.dialogData = {
                groupId: stationId,
                groupType: "1"
            };
            dialog.show();
        }
    }

    function delbtn_station_onClick(event) {
        if (stationId == null) {
            alert("请选择岗位")
        }
        else {
            var gridid = view.grid.getPropertyValue("grid_station_dataScope", "id");
            if (gridid != null) {
                view.processor.deleteDataScopeGroup(view.grid.getRows("grid_station_dataScope"), stationId, "1");
            }
            else {
                MessageBox.alert({
                    title: '提示',
                    message: '请选择记录！'
                });
            }
        }
    }

    function grid_station_dataScope_queryButton_onClick(event) {
        if

        (stationId == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "请先选择岗位"
            });
            return;
        }
        else {
            var conditionDS = view.form.getDataStore('form_station_dataScope');
            dataCenter.addHeaderAttribute('getAllDataScopeForUnieap', 'serverExport');
            //发送请求
            view.processor.getAllDataScopeForUnieap(conditionDS, stationId, "1", 1, 10);
        }
    }

    function grid_station_dataScope_resetButton_onClick(event) {
        unieap.byId

        ('form_station_dataScope').clear();
    }

    function grid_station_dataScope_binding_rpc(store, load) {
        var store1 = view.form.getDataStore

        ("form_station_dataScope");
        view.processor.getAllDataScopeForUnieap(store1, stationId, "1", store.getPageNumber(), store.getPageSize());
    }

    function tabPane2_onShow(pane) {
        view.processor.getAllSysSecUnitForStation();
        //每次显示tab页，清空stationId和grid选项
        stationId = null;
        unieap.byId("grid_station").getManager("SelectionManager").clearSelection();
    }

    function btnAddDataScope_onClick(event) {
        var grid = unieap.byId("grid7");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        if (rows.getRowCount() == 1) {
            var sltId = rows.getItemValue(0, "id");
            var dialog = unieap.byId("ds_ConfigDialog");
            dialog.dialogData = {
                groupId: sltId,
                groupType: '2'
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

    function grid7_queryButton_onClick(event) {
        var form = unieap.byId('form8');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form8');
        var name = unieap.byId('name1').getValue();
        var rowset = conditionDS.getRowSet();
        rowset.setItemValue(0, "name", name);
        rowset.setItemValue(0, "isEnabled", '1');
        dataCenter.addHeaderAttribute('getUserGroupPage', 'serverExport');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, 1, 10);
    }

    function grid7_resetButton_onClick(event) {
        unieap.byId('form8').clear();
    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getUserGroupPage(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    function tabPane3_onShow(pane) {
        var data = {
            isEnabled: '1'
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var sltDs = new unieap.ds.DataStore("");
        sltDs.setRowSet(rowSet);
        sltDs.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUserGroup");

        view.processor.getUserGroupPage(sltDs, 1, 10);
    }

    function ds_ConfigDialog_onComplete(returnObj) {
        if (unitId != null) {
            var store1 = view.form.getDataStore("form_unitdataScope");
            view.processor.getAllDataScopeForUnieap(store1, unitId, "0", 1, 10);
        }

        if (stationId != null) {
            var store2 = view.form.getDataStore("form_station_dataScope");
            view.processor.getAllDataScopeForUnieap(store2, stationId, "1", 1, 10);
        }
    }

    var view = new _security.datascope_user.datascope_user.View();
    view.init();

    return view;
})