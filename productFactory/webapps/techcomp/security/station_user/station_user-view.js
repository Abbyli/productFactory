/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-12 10:52:28
 * @modificationTime 2014-12-31 16:36:31
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("station_user", function () {

    var result;

    var stationId;

    var unitId;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station_user.station_user.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getTreeSuccess: getTreeSuccess,
                getStationListByUnitIdSuccess: getStationListByUnitIdSuccess,
                getUsersGridByStationIdSuccess: getUsersGridByStationIdSuccess,
                getAllEnabledStationByUnitIdSuccess: getAllEnabledStationByUnitIdSuccess,
                editxDialog_onComplete: editxDialog_onComplete,
                addxDialog_onComplete: addxDialog_onComplete,
                editbtn_onClick: editbtn_onClick,
                adduserbtn_onClick: adduserbtn_onClick,
                unitTree_onAfterClick: unitTree_onAfterClick,
                grid1_views_onRowClick: grid1_views_onRowClick,
                grid1_selection_onAfterSelect: grid1_selection_onAfterSelect,
                grid2_queryButton_onClick: grid2_queryButton_onClick,
                grid2_resetButton_onClick: grid2_resetButton_onClick,
                userGrid_binding_rpc: userGrid_binding_rpc,
                result: result,
                stationId: stationId,
                unitId: unitId
            });

            this.processor = new _security.station_user.station_user.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecStationUser')) {
                var sysSecStationUser = new unieap.ds.DataStore('sysSecStationUser');
                sysSecStationUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStationUser");

                dataCenter.addDataStore(sysSecStationUser);
            }

            if (!dataCenter.getDataStore('sysSecStationUser1')) {
                var sysSecStationUser1 = new unieap.ds.DataStore('sysSecStationUser1');
                sysSecStationUser1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStationUser");

                dataCenter.addDataStore(sysSecStationUser1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("editxDialog"), "onComplete", this.editxDialog_onComplete);

            this.connect(unieap.byId("addxDialog"), "onComplete", this.addxDialog_onComplete);

            this.connect(unieap.byId("editbtn"), "onClick", this.editbtn_onClick);

            this.connect(unieap.byId("adduserbtn"), "onClick", this.adduserbtn_onClick);

            this.connect(unieap.byId("unitTree"), "onAfterClick", this.unitTree_onAfterClick);

            this.connect(unieap.byId("grid2_queryButton"), "onClick", this.grid2_queryButton_onClick);

            this.connect(unieap.byId("grid2_resetButton"), "onClick", this.grid2_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getTree();
        },
        page_init: function () {
            var isMajorDs = new unieap.ds.DataStore("isMajorDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            dataCenter.addDataStore("isMajorDs", isMajorDs);
        }

    });
    /**
     * @description:getTree方法的成功回调。
     *
     */

    function getTreeSuccess(dc) {
        view.tree.setDataStore("unitTree", dc.getSingleDataStore());
        unieap.byId("unitTree").expandAllNodes();
    }
    /**
     * @description:getStationListByUnitId方法的成功回调。
     *
     */

    function getStationListByUnitIdSuccess(dc) {
        result = dc.getDataStore('station');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:getUsersGridByStationId方法的成功回调。
     *
     */

    function getUsersGridByStationIdSuccess(dc) {
        view.grid.setDataStore("userGrid", dc.getSingleDataStore());
    }
    /**
     * @description:getAllEnabledStationByUnitId方法的成功回调。
     *
     */

    function getAllEnabledStationByUnitIdSuccess(dc) {
        view.grid.setDataStore("grid1", dc.getSingleDataStore());
    }

    function editxDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');

        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(conditionDS, 1, 10);
    }

    function addxDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');

        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(conditionDS, 1, 10);
    }

    function editbtn_onClick(event) {
        var grid = unieap.byId("userGrid");
        var rows = grid.getManager('SelectionManager').getSelectedRows();
        if (stationId == null) {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择岗位！'
            });
            return;
        }
        if (rows.length == 1) {
            var data = view.grid.getRow("userGrid");
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

    function adduserbtn_onClick(event) {
        if (unitId == null || stationId == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "请选择岗位！"
            });
            return;
        }
        else {
            var dialog = unieap.byId("addxDialog");
            dialog.dialogData = {
                stationId: stationId,
                unitId: unitId
            };
            dialog.show();
        }

    }

    function unitTree_onAfterClick(node) {
        unitId = unieap.byId("unitTree").getCurrentNode().getData()['id'];
        view.processor.getAllEnabledStationByUnitId(unitId);
    }

    function grid1_views_onRowClick(event) {
        var grid1 = unieap.byId("grid1");
        var inRowIndex = grid1.getRowManager().getCurrentRowIndex();
        grid1.getManager("SelectionManager").setSelect(inRowIndex, true);
        stationId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        unieap.byId("form1").clear();
        var ds = view.form.getDataStore("form1");
        var rowset = ds.getRowSet();
        rowset.setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(ds, 1, 10);
    }

    function grid1_selection_onAfterSelect(inRowIndex) {

        stationId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        unieap.byId("form1").clear();
        var ds1 = view.form.getDataStore("form1");
        ds1.getRowSet().setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(ds1, 1, 10);
    }

    function grid2_queryButton_onClick(event) {
        if (stationId == null) {
            alert("请选择岗位信息");
            return;
        }
        var conditionDS = unieap.byId("form1").getBinding().getDataStore();
        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(conditionDS, 1, 10);
    }

    function grid2_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function userGrid_binding_rpc(store, load) {
        var conditionDS = unieap.byId("form1").getBinding().getDataStore();
        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "stationId", stationId);
        view.processor.getUsersGridByStationId(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    var view = new _security.station_user.station_user.View();
    view.init();

    return view;
})