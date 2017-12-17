/**
 *
 * @author user
 * @creationTime 2014-07-29 15:05:24
 * @modificationTime 2014-12-31 14:51:45
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("data_authority_datascope_group", function () {

    var appId = '';

    var dataAuthId = '';

    var sltDs = '';

    var result = '';

    var currentPage = 1;

    var currentPageSize = 10;

    var globalDs = null;

    var delRowsDs = null;

    var sltRowsDsBeforeAllSlt = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.data_authority.data_authority_datascope_group.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllDataGroupListSuccess: getAllDataGroupListSuccess,
                saveDataGroupAuthoritySuccess: saveDataGroupAuthoritySuccess,
                getAllDataGroupAuthorityByDataAuthIdSuccess: getAllDataGroupAuthorityByDataAuthIdSuccess,
                btn_Save_onClick: btn_Save_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                grid1_selection_onAfterDeselect: grid1_selection_onAfterDeselect,
                grid1_selection_onBeforeAllSelect: grid1_selection_onBeforeAllSelect,
                appId: appId,
                dataAuthId: dataAuthId,
                sltDs: sltDs,
                result: result,
                currentPage: currentPage,
                currentPageSize: currentPageSize,
                globalDs: globalDs,
                delRowsDs: delRowsDs,
                sltRowsDsBeforeAllSlt: sltRowsDsBeforeAllSlt
            });

            this.processor = new _security.data_authority.data_authority_datascope_group.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataScopeGroup')) {
                var sysSecDataScopeGroup = new unieap.ds.DataStore('sysSecDataScopeGroup');
                sysSecDataScopeGroup.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");

                dataCenter.addDataStore(sysSecDataScopeGroup);
            }

            if (!dataCenter.getDataStore('sysSecDataScopeGroup2')) {
                var sysSecDataScopeGroup2 = new unieap.ds.DataStore('sysSecDataScopeGroup2');
                sysSecDataScopeGroup2.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");

                dataCenter.addDataStore(sysSecDataScopeGroup2);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btn_Save"), "onClick", this.btn_Save_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var data = {};
            var rowSet = new unieap.ds.RowSet();
            rowSet.addRows(data);
            sltDs = new unieap.ds.DataStore();
            sltDs.setRowSet(rowSet);
            sltDs.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");

            view.processor.getAllDataGroupList(sltDs, '', '', 1, 10);

        },
        page_init: function () {
            var dialogData = unieap.getXDialog().dialogData;
            dataAuthId = dialogData.dataAuthId;
            appId = dialogData.appId;
            var groupTypeDs = new unieap.ds.DataStore("groupTypeDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "0",
                CODENAME: "组织机构"
            }, {
                CODEVALUE: "1",
                CODENAME: "岗位"
            }, {
                CODEVALUE: "2",
                CODENAME: "用户组"
            }]);

            dataCenter.addDataStore("groupTypeDs", groupTypeDs);
        }

    });
    /**
     * @description:getAllDataGroupList方法的成功回调。
     *
     */

    function getAllDataGroupListSuccess(dc) {
        result = dc.getDataStore('dataScopeGroup');
        view.grid.setDataStore('grid1', result);
        view.processor.getAllDataGroupAuthorityByDataAuthId(dataAuthId, 1, 10);
    }
    /**
     * @description:saveDataGroupAuthority方法的成功回调。
     *
     */

    function saveDataGroupAuthoritySuccess(dc) {
        unieap.getXDialog().close();
        MessageBox.alert({
            title: '提示信息',
            message: '添加成功！'
        });
    }
    /**
     * @description:getAllDataGroupAuthorityByDataAuthId方法的成功回调。
     *
     */

    function getAllDataGroupAuthorityByDataAuthIdSuccess(dc) {
        var dataGroupAuthority = dc.getDataStore('dataGroupAuthority');

        globalDs = new unieap.ds.DataStore();
        var sltRS = new unieap.ds.RowSet();
        globalDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecDataScopeGroup');


        var dataScopeGroupRowSet = dataGroupAuthority.getRowSet();
        //globalDs.setRowSet(dataScopeGroupRowSet);
        var dataScopeGroupCount = dataScopeGroupRowSet.getTotalCount();
        var resultRowSet = result.getRowSet();
        var resultCount = resultRowSet.getTotalCount();
        for (var i = 0; i < dataScopeGroupCount; i++) {
            var dataScopeGroupId = dataScopeGroupRowSet.getRow(i).getItemValue(
                "dataScopeGroupId");
            for (var j = 0; j < resultCount; j++) {
                if (dataScopeGroupId == resultRowSet.getRow(j).getItemValue("id")) {
                    resultRowSet.setRowSelected(j, true);
                    sltRS.addRow(resultRowSet.getData()[j]);
                }
            }
        }
        globalDs.setRowSet(sltRS);
        unieap.byId("grid1").getManager("ViewManager").refresh();
    }

    function btn_Save_onClick(event) {
        //var sltDs = view.grid.getRows("grid1");
        //if(sltDs == null){
        //		var data = {			
        //					};
        //		var rowSet = new unieap.ds.RowSet();
        //		rowSet.addRows(data);
        //		var sltDs = new unieap.ds.DataStore();
        //		sltDs.setRowSet(rowSet);
        //		sltDs.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        //}
        //view.processor.saveDataGroupAuthority(dataAuthId, sltDs);
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
                delRowsDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecDataScopeGroup');
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
        view.processor.saveDataGroupAuthority(dataAuthId, globalDs);
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var data = {
            dataScopeId: unieap.byId("dataScopeId").getValue(),
            groupId: unieap.byId("groupId").getValue(),
            groupType: unieap.byId("groupType").getValue()
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        view.processor.getAllDataGroupList(store1, '', '', 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var data = {
            dataScopeId: unieap.byId("dataScopeId").getValue(),
            groupId: unieap.byId("groupId").getValue(),
            groupType: unieap.byId("groupType").getValue()
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        view.processor.getAllDataGroupList(store1, '', '', 1, 10);
    }

    function grid1_binding_rpc(store, load) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var data = {
            dataScopeId: unieap.byId("dataScopeId").getValue(),
            groupId: unieap.byId("groupId").getValue(),
            groupType: unieap.byId("groupType").getValue()
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        currentPage = store.getPageNumber();
        currentPageSize = store.getPageSize();
        view.processor.getAllDataGroupList(store1, '', '', currentPage, currentPageSize);

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

    var view = new _security.data_authority.data_authority_datascope_group.View();
    view.init();

    return view;
})