/**
 *
 * @author dongyw
 * @creationTime 2014-07-03 10:45:02
 * @modificationTime 2014-12-31 14:49:28
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUserGroup_User", function () {
    //角色ID
    var groupId;
    //所有可用的用户
    var allEnableUsers;

    var globalDs = null;

    var delRowsDs = null;

    var sltRowsDsBeforeAllSlt = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.userGroup.sysSecUserGroup_User.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getEnableUserListSuccess: getEnableUserListSuccess,
                getUsersByGroupIdSuccess: getUsersByGroupIdSuccess,
                insertGroupUsersSuccess: insertGroupUsersSuccess,
                btnSave_onClick: btnSave_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                grid1_selection_onAfterDeselect: grid1_selection_onAfterDeselect,
                grid1_selection_onBeforeAllSelect: grid1_selection_onBeforeAllSelect,
                groupId: groupId,
                allEnableUsers: allEnableUsers,
                globalDs: globalDs,
                delRowsDs: delRowsDs,
                sltRowsDsBeforeAllSlt: sltRowsDsBeforeAllSlt
            });

            this.processor = new _security.userGroup.sysSecUserGroup_User.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUser')) {
                var sysSecUser = new unieap.ds.DataStore('sysSecUser');
                sysSecUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser);
            }

            if (!dataCenter.getDataStore('sysSecUser1')) {
                var sysSecUser1 = new unieap.ds.DataStore('sysSecUser1');
                sysSecUser1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnSave"), "onClick", this.btnSave_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            //发送请求
            view.processor.getEnableUserList(conditionDS, 1, 10);
        },
        page_init: function () {
            var obj = unieap.getXDialog().getObject();
            groupId = obj.groupId;


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


            var isLockDS = new unieap.ds.DataStore("isLockDS", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            dataCenter.addDataStore("isLockDS", isLockDS);
        }

    });
    /**
     * @description:getEnableUserList方法的成功回调。
     *
     */

    function getEnableUserListSuccess(dc) {
        allEnableUsers = dc.getDataStore('user');
        view.grid.setDataStore('grid1', allEnableUsers);

        view.processor.getUsersByGroupId(groupId);
    }
    /**
     * @description:getUsersByGroupId方法的成功回调。
     *
     */

    function getUsersByGroupIdSuccess(dc) {
        // allEnableUsers全局变量,所有可用的用户 
        // users该角色下的用户
        var users = dc.getDataStore('user');

        globalDs = new unieap.ds.DataStore();
        globalDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecUser');


        var usersSltRowSet = users.getRowSet();

        globalDs.setRowSet(usersSltRowSet);
        var usersRowSet = allEnableUsers.getRowSet();

        var usersSltCount = usersSltRowSet.getTotalCount();
        var usersCount = usersRowSet.getTotalCount();

        for (var i = 0; i < usersSltCount; i++) {
            var userSltID = usersSltRowSet.getRow(i).getItemValue("id");
            for (var j = 0; j < usersCount; j++) {
                if (userSltID == usersRowSet.getRow(j).getItemValue("id")) {
                    usersRowSet.setRowSelected(j, true);
                }
            }
        }

        unieap.byId("grid1").getManager("ViewManager").refresh();
    }
    /**
     * @description:insertGroupUsers方法的成功回调。
     *
     */

    function insertGroupUsersSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                //		var conditionDs = view.form.getDataStore("form1");
                //		view.processor.getEnableUserList(conditionDs, "1", "10");
                unieap.getXDialog().close();
            }
        });
    }

    function btnSave_onClick(event) {
        //var sltUsersDs = view.grid.getRows("grid1");
        //var rowSet = unieap.byId("grid1").getManager('SelectionManager').getSelectedDataSet();
        //var sltUsersDs = new unieap.ds.DataStore();
        //sltUsersDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecUser');
        //sltUsersDs.setRowSet(rowSet);
        //view.processor.insertGroupUsers(groupId, sltUsersDs);
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
        view.processor.insertGroupUsers(groupId, globalDs);
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getEnableUserList', 'serverExport');
        //发送请求
        view.processor.getEnableUserList(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_binding_rpc(store, load) {
        var conditionDs = view.form.getDataStore("form1");
        view.processor.getEnableUserList(conditionDs, store.getPageNumber(), store.getPageSize());
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

    function grid1_selection_onBeforeAllSelect(select) {
        sltRowsDsBeforeAllSlt = view.grid.getRows("grid1");
        return true;
    }

    var view = new _security.userGroup.sysSecUserGroup_User.View();
    view.init();

    return view;
})