/**
 *
 * @author user
 * @creationTime 2014-07-29 08:27:31
 * @modificationTime 2014-12-30 14:19:22
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("data_authority_configure", function () {

    var appId = '';

    var dataAuthId = '';

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.data_authority.data_authority_configure.View", unieap.view.View, {



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
                getAllDataGroupListSuccess: getAllDataGroupListSuccess,
                deleteDataGroupAuthoritySuccess: deleteDataGroupAuthoritySuccess,
                addXDialog_onComplete: addXDialog_onComplete,
                tree1_onAfterClick: tree1_onAfterClick,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                appId: appId,
                dataAuthId: dataAuthId
            });

            this.processor = new _security.data_authority.data_authority_configure.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecDataScopeGroup')) {
                var sysSecDataScopeGroup = new unieap.ds.DataStore('sysSecDataScopeGroup');
                sysSecDataScopeGroup.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");

                dataCenter.addDataStore(sysSecDataScopeGroup);
            }

            if (!dataCenter.getDataStore('sysSecDataScopeGroup1')) {
                var sysSecDataScopeGroup1 = new unieap.ds.DataStore('sysSecDataScopeGroup1');
                sysSecDataScopeGroup1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");

                dataCenter.addDataStore(sysSecDataScopeGroup1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addXDialog"), "onComplete", this.addXDialog_onComplete);

            this.connect(unieap.byId("tree1"), "onAfterClick", this.tree1_onAfterClick);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


            unieap.byId("borderPane1").hide();
            view.processor.getTree();
        },
        page_init: function () {
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
     * @description:getTree方法的成功回调。
     *
     */

    function getTreeSuccess(dc) {
        view.tree.setDataStore("tree1", dc.getSingleDataStore());
        var data = {};
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var sltDs = new unieap.ds.DataStore("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        sltDs.setRowSet(rowSet);
        sltDs.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        //view.processor.getAllDataGroupList(sltDs, dataAuthId,appId, 1, 10);			
    }
    /**
     * @description:getAllDataGroupList方法的成功回调。
     *
     */

    function getAllDataGroupListSuccess(dc) {
        var result = dc.getDataStore('dataScopeGroup');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:deleteDataGroupAuthority方法的成功回调。
     *
     */

    function deleteDataGroupAuthoritySuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: '操作成功!',
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getAllDataGroupList(conditionDs, dataAuthId, appId, 1, 10);
            }
        });
    }

    function addXDialog_onComplete(returnObj) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var data = {

        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        view.processor.getAllDataGroupList(store1, dataAuthId, appId, 1, 10);
    }

    function tree1_onAfterClick(node) {
        unieap.byId("borderPane1").show();
        var node = unieap.byId("tree1").getCurrentNode();
        appId = node.getData()['appId'];
        dataAuthId = node.getData()['id'];
        var data = {

        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        view.processor.getAllDataGroupList(store1, dataAuthId, appId, 1, 10);
    }

    function button1_onClick(event) {

        var node = unieap.byId("tree1").getCurrentNode();
        if (node == null) {
            alert("请选择节点！");
            return;
        }
        else {
            var addxDialog = unieap.byId('addXDialog');
            var data = {
                appId: appId,
                dataAuthId: dataAuthId
            }
            addxDialog.dialogData = data;
            addxDialog.show();
        }







    }

    function button2_onClick(event) {
        var sltDs = view.grid.getRows("grid1");
        var selectRows = unieap.byId("grid1").getManager("SelectionManager").getSelectedRows();
        var count = selectRows.length;
        var id = '';
        if (count > 0) {
            view.processor.deleteDataGroupAuthority(sltDs);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择要删除的记录！'
            });
        }
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
        view.processor.getAllDataGroupList(store1, dataAuthId, appId, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var data = {};
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeGroup");
        view.processor.getAllDataGroupList(store1, dataAuthId, appId, 1, 10);
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
        view.processor.getAllDataGroupList(store1, dataAuthId, appId, 1, 10);
    }

    var view = new _security.data_authority.data_authority_configure.View();
    view.init();

    return view;
})