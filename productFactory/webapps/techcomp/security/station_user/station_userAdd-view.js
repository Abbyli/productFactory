/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-12 10:06:57
 * @modificationTime 2014-12-31 14:49:57
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("station_userAdd", function () {

    var stationId;

    var usersByUnitId;

    var unitId;

    var globalDs = null;

    var delRowsDs = null;

    var sltRowsDsBeforeAllSlt = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station_user.station_userAdd.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getEnableUserGridByUnitIdSuccess: getEnableUserGridByUnitIdSuccess,
                getUsersByStationIdSuccess: getUsersByStationIdSuccess,
                insertStationUsersSuccess: insertStationUsersSuccess,
                savebtn_onClick: savebtn_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_selection_onAfterDeselect: grid1_selection_onAfterDeselect,
                grid1_binding_rpc: grid1_binding_rpc,
                grid1_selection_onBeforeAllSelect: grid1_selection_onBeforeAllSelect,
                stationId: stationId,
                usersByUnitId: usersByUnitId,
                unitId: unitId,
                globalDs: globalDs,
                delRowsDs: delRowsDs,
                sltRowsDsBeforeAllSlt: sltRowsDsBeforeAllSlt
            });

            this.processor = new _security.station_user.station_userAdd.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUnitUser')) {
                var sysSecUnitUser = new unieap.ds.DataStore('sysSecUnitUser');
                sysSecUnitUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnitUser");

                dataCenter.addDataStore(sysSecUnitUser);
            }

            if (!dataCenter.getDataStore('sysSecUser')) {
                var sysSecUser = new unieap.ds.DataStore('sysSecUser');
                sysSecUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("savebtn"), "onClick", this.savebtn_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = {
                type: unitId
            };
            var rowSet = new unieap.ds.RowSet();
            rowSet.addRows(data);
            var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecUser');
            store1.setRowSet(rowSet);
            store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");
            view.processor.getEnableUserGridByUnitId(store1, 1, 10);
        },
        page_init: function () {
            var obj = unieap.getXDialog().getObject();
            stationId = obj.stationId;
            unitId = obj.unitId;
            var accountEnableDs = new unieap.ds.DataStore("accountEnableDs", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore("accountEnableDs", accountEnableDs);
        }

    });
    /**
     * @description:getEnableUserGridByUnitId方法的成功回调。
     *
     */

    function getEnableUserGridByUnitIdSuccess(dc) {
        usersByUnitId = dc.getDataStore('user');
        view.grid.setDataStore('grid1', usersByUnitId);
        view.processor.getUsersByStationId(stationId);
    }
    /**
     * @description:getUsersByStationId方法的成功回调。
     *
     */

    function getUsersByStationIdSuccess(dc) {
        var users = dc.getDataStore('user');
        globalDs = new unieap.ds.DataStore();
        globalDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecUser');


        var usersByStationIdRowSet = users.getRowSet();
        globalDs.setRowSet(usersByStationIdRowSet);
        var usersByUnitIdRowSet = usersByUnitId.getRowSet();
        var usersSltCount = usersByStationIdRowSet.getTotalCount();
        var usersCount = usersByUnitIdRowSet.getTotalCount();
        for (var i = 0; i < usersSltCount; i++) {
            var userSltID = usersByStationIdRowSet.getRow(i).getItemValue("id");
            for (var j = 0; j < usersCount; j++) {
                if (userSltID == usersByUnitIdRowSet.getRow(j).getItemValue("id")) {
                    usersByUnitIdRowSet.setRowSelected(j, true);
                }
            }
        }
        unieap.byId("grid1").getManager("ViewManager").refresh();
    }
    /**
     * @description:insertStationUsers方法的成功回调。
     *
     */

    function insertStationUsersSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '操作成功！',
            onComplete: function () {
                unieap.getXDialog().close();
            }
        });
    }

    function savebtn_onClick(event) {
        //var sltDs = view.grid.getRows("grid1");
        //if (sltDs == null) {
        //	var data = {};
        //	var rowSet = new unieap.ds.RowSet();
        //	rowSet.addRows(data);
        //	var sltDs = new unieap.ds.DataStore(
        //			'com.neusoft.fdframework.security.entity.SysSecUser');
        //	sltDs.setRowSet(rowSet);
        //	sltDs.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");
        //}
        //view.processor.insertStationUsers(stationId, sltDs);

        var globalRowSet = globalDs.getRowSet();
        var sltDs = view.grid.getRows("grid1");
        if (sltDs != null) {
            var sltRowSet = sltDs.getRowSet();
            var sltRowNum = sltRowSet.getTotalCount();
            var addflag = true;
            for (var i = 0; i < sltRowNum; i++) {
                flag = true;
                var sltUserId = sltRowSet.getRow(i).getItemValue("id");
                for (var j = 0; j < globalRowSet.getRowCount(); j++) {
                    var gloUserId = globalRowSet.getRow(j).getItemValue("id");
                    if (sltUserId == gloUserId) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    var sltData = sltRowSet.getData()[i];
                    globalRowSet.addRow(sltData);
                }
            }
        }
        if (sltRowsDsBeforeAllSlt != null) {
            if (delRowsDs == null) {
                delRowsDs = new unieap.ds.DataStore();
                delRowsDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecUser');
                delRowsDs.setRowSet(sltRowsDsBeforeAllSlt.getRowSet());
            }
            else {
                var srsRs = sltRowsDsBeforeAllSlt.getRowSet();
                var srsNum = srsRs.getRowCount();
                var mergeflag = true;
                for (var isrs = 0; isrs < srsNum; isrs++) {
                    var srsid = srsRs.getRow(isrs).getItemValue("id");
                    mergeflag = true;
                    var drNum = delRowsDs.getRowSet().getRowCount();
                    for (var idu = 0; idu < drNum; idu++) {
                        var duid = delRowsDs.getRowSet().getRow(idu).getItemValue("id");
                        if (srsid == duid) {
                            mergeflag = false;
                            break;
                        }
                    }
                    if (flag) {
                        var srsData = srsRs.getData()[isrs];
                        delRowsDs.getRowSet().addRow(srsData);
                    }
                }
            }
        }
        if (delRowsDs != null && sltDs != null) {
            for (var ii = 0; ii < sltDs.getRowSet().getRowCount(); ii++) {
                var suid = sltDs.getRowSet().getRow(ii).getItemValue("id");
                for (var jj = 0; jj < delRowsDs.getRowSet().getRowCount(); jj++) {
                    var deluid = delRowsDs.getRowSet().getRow(jj).getItemValue("id");
                    if (suid == deluid) {
                        delRowsDs.getRowSet().deleteRow(jj);
                        break;
                    }
                }
            }
        }

        if (delRowsDs != null) {
            var delRowNum = delRowsDs.getRowSet().getTotalCount();
            for (var idel = 0; idel < delRowNum; idel++) {
                var delUserId = delRowsDs.getRowSet().getRow(idel).getItemValue("id");
                var gloRowNum = globalRowSet.getRowCount();
                for (var jglo = 0; jglo < gloRowNum; jglo++) {
                    var gloUserId2 = globalRowSet.getRow(jglo).getItemValue("id");
                    if (delUserId == gloUserId2) {
                        globalRowSet.deleteRow(jglo);
                        break;
                    }
                }
            }
        }
        globalDs.setRowSet(globalRowSet);
        view.processor.insertStationUsers(stationId, globalDs);




    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "type", unitId);
        view.processor.getEnableUserGridByUnitId(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_selection_onAfterDeselect(inRowIndex) {
        var deSelectedRow = view.grid.getRow("grid1", inRowIndex);
        var desltRowData = deSelectedRow.getRowSet().getData()[0];
        var desltUserId = desltRowData["id"];
        var flag = true;
        if (delRowsDs == null) {
            delRowsDs = deSelectedRow;
        }
        else {
            var userNum = delRowsDs.getRowSet().getTotalCount();
            var delRowSet = delRowsDs.getRowSet();
            for (var i = 0; i < userNum; i++) {
                var deletedUserId = delRowsDs.getRowSet().getRow(i).getItemValue("id");
                if (desltUserId == deletedUserId) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                delRowSet.addRow(desltRowData);
                delRowsDs.setRowSet(delRowSet);
            }
        }

    }

    function grid1_binding_rpc(store, load) {
        var data = {
            type: unitId
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecUser');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");
        view.processor.getEnableUserGridByUnitId(store1, store.getPageNumber(), store.getPageSize());
    }

    function grid1_selection_onBeforeAllSelect(select) {
        sltRowsDsBeforeAllSlt = view.grid.getRows("grid1");
        return true;
    }

    var view = new _security.station_user.station_userAdd.View();
    view.init();

    return view;
})