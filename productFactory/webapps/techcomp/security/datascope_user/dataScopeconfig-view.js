/**
 *
 * @author zhyu.neu
 * @creationTime 2014-07-31 16:09:31
 * @modificationTime 2014-12-31 16:22:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("dataScopeconfig", function () {

    var groupId;

    var groupType;

    var globalDs = null;

    var delRowsDs = null;

    var allEnableDataScope;

    var sltRowsDsBeforeAllSlt = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascope_user.dataScopeconfig.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllDataScopeForUnieapSuccess: getAllDataScopeForUnieapSuccess,
                insertDataScopeGroupSuccess: insertDataScopeGroupSuccess,
                insertDataScopeGroupError: insertDataScopeGroupError,
                savebtn_onClick: savebtn_onClick,
                grid_dsconfig_queryButton_onClick: grid_dsconfig_queryButton_onClick,
                grid_dsconfig_resetButton_onClick: grid_dsconfig_resetButton_onClick,
                grid_dsconfig_binding_rpc: grid_dsconfig_binding_rpc,
                grid_dsconfig_selection_onAfterDeselect: grid_dsconfig_selection_onAfterDeselect,
                grid_dsconfig_selection_onBeforeAllSelect: grid_dsconfig_selection_onBeforeAllSelect,
                groupId: groupId,
                groupType: groupType,
                globalDs: globalDs,
                delRowsDs: delRowsDs,
                allEnableDataScope: allEnableDataScope,
                sltRowsDsBeforeAllSlt: sltRowsDsBeforeAllSlt
            });

            this.processor = new _security.datascope_user.dataScopeconfig.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

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
        },

        page_initEvents: function () {

            this.connect(unieap.byId("savebtn"), "onClick", this.savebtn_onClick);

            this.connect(unieap.byId("grid_dsconfig_queryButton"), "onClick", this.grid_dsconfig_queryButton_onClick);

            this.connect(unieap.byId("grid_dsconfig_resetButton"), "onClick", this.grid_dsconfig_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var obj = unieap.getXDialog().getObject();
            groupId = obj.groupId;
            groupType = obj.groupType;
            view.processor.getGroupDataScopeList(groupId, groupType);
            var store1 = view.form.getDataStore("form_dsconfig");
            view.processor.getAllDataScopeForUnieap(store1, "", groupType, 1, 10);
        }


    });
    /**
     * @description:getAllDataScopeForUnieap方法的成功回调。
     *
     */

    function getAllDataScopeForUnieapSuccess(dc) {
        var result = dc.getDataStore('result');

        view.grid.setDataStore('grid_dsconfig', result);
        //比较datascopegroup与datascope数据，勾选已选择选项
        var gloRs = new unieap.ds.RowSet();
        var gridDs = view.grid.getDataStore("grid_dsconfig");
        var selectedDs = dataCenter.getDataStore("dataScopeGroup");
        var numOfRows = selectedDs.getRowSet().getRowCount();
        for (var i = 0; i < numOfRows; i++) {
            var idx = view.grid.getRowIndexsByPropertyValue("grid_dsconfig", "id", selectedDs.getRowSet().getItemValue(i, "dataScopeId", "primary"));
            unieap.byId("grid_dsconfig").getManager("SelectionManager").setSelect(idx, true);
            var rs = view.grid.getRow("grid_dsconfig", idx).getRowSet();
            gloRs.addRow(rs.getData()[0]);
        }



        globalDs = new unieap.ds.DataStore();
        globalDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecDataScope');
        globalDs.setRowSet(gloRs);
    }
    /**
     * @description:insertDataScopeGroup方法的成功回调。
     *
     */

    function insertDataScopeGroupSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功"
        });
        unieap.getXDialog().close();
    }
    /**
     * @description:insertDataScopeGroup方法的失败回调。
     *
     */

    function insertDataScopeGroupError(xhr) {
        alert("操作失败");
    }

    function savebtn_onClick(event) {
        //var sltDs = view.grid.getRows("grid_dsconfig");
        //if(sltDs != null){
        //	view.processor.insertDataScopeGroup(sltDs, groupId, groupType);
        //}else{
        //// use an empty data scope ds
        //	view.processor.insertDataScopeGroup(dataCenter.getDataStore("sysSecDataScope2"), groupId, groupType);
        //}
        var globalRowSet = globalDs.getRowSet();
        var sltDs = view.grid.getRows("grid_dsconfig");
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
                delRowsDs.setRowSetName('com.neusoft.fdframework.security.entity.sysSecDataScope');
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
        view.processor.insertDataScopeGroup(globalDs, groupId, groupType);
    }

    function grid_dsconfig_queryButton_onClick(event) {
        var store1 = view.form.getDataStore("form_dsconfig");
        view.processor.getAllDataScopeForUnieap(store1, "", "0", 1, 10);
    }

    function grid_dsconfig_resetButton_onClick(event) {
        unieap.byId("form_dsconfig").clear();
    }

    function grid_dsconfig_binding_rpc(store, load) {
        var store1 = view.form.getDataStore("form_dsconfig");
        view.processor.getAllDataScopeForUnieap(store1, "", "0", store.getPageNumber(), store.getPageSize());
    }

    function grid_dsconfig_selection_onAfterDeselect(inRowIndex) {
        var deSelectedRow = view.grid.getRow("grid_dsconfig", inRowIndex);
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

    function grid_dsconfig_selection_onBeforeAllSelect(select) {
        sltRowsDsBeforeAllSlt = view.grid.getRows("grid_dsconfig");
        return true;
    }

    var view = new _security.datascope_user.dataScopeconfig.View();
    view.init();

    return view;
})