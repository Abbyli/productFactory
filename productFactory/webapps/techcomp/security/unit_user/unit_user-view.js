/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-12 08:31:39
 * @modificationTime 2014-09-23 14:12:05
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("unit_user", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.unit_user.unit_user.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllUnitListSuccess: getAllUnitListSuccess,
                getUnitUserListByUnitIdSuccess: getUnitUserListByUnitIdSuccess,
                editxDialog_onComplete: editxDialog_onComplete,
                addUserxDialog_onComplete: addUserxDialog_onComplete,
                unitTree_onAfterClick: unitTree_onAfterClick,
                editbtn_onClick: editbtn_onClick,
                adduserbtn_onClick: adduserbtn_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc
            });

            this.processor = new _security.unit_user.unit_user.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecUnitUser')) {
                var sysSecUnitUser = new unieap.ds.DataStore('sysSecUnitUser');
                sysSecUnitUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnitUser");

                dataCenter.addDataStore(sysSecUnitUser);
            }

            if (!dataCenter.getDataStore('sysSecUnitUser1')) {
                var sysSecUnitUser1 = new unieap.ds.DataStore('sysSecUnitUser1');
                sysSecUnitUser1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnitUser");

                dataCenter.addDataStore(sysSecUnitUser1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("editxDialog"), "onComplete", this.editxDialog_onComplete);

            this.connect(unieap.byId("addUserxDialog"), "onComplete", this.addUserxDialog_onComplete);

            this.connect(unieap.byId("unitTree"), "onAfterClick", this.unitTree_onAfterClick);

            this.connect(unieap.byId("editbtn"), "onClick", this.editbtn_onClick);

            this.connect(unieap.byId("adduserbtn"), "onClick", this.adduserbtn_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllUnitList();
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
     * @description:getAllUnitList方法的成功回调。
     *
     */

    function getAllUnitListSuccess(dc) {
        view.tree.setDataStore("unitTree", dc.getSingleDataStore());
        unieap.byId("unitTree").expandAllNodes();
    }
    /**
     * @description:getUnitUserListByUnitId方法的成功回调。
     *
     */

    function getUnitUserListByUnitIdSuccess(dc) {
        var result = dc.getDataStore('unitUser');
        view.grid.setDataStore("grid1", result);
    }

    function editxDialog_onComplete(returnObj) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        unieap.byId("form1").clear();
        var conditionDs = view.form.getDataStore("form1");
        var rowset = conditionDs.getRowSet();
        rowset.setItemValue(0, "unitId", unitId);
        view.processor.getUnitUserListByUnitId(conditionDs, 1, 10);
    }

    function addUserxDialog_onComplete(returnObj) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        unieap.byId("form1").clear();
        var conditionDs = view.form.getDataStore("form1");
        var rowset = conditionDs.getRowSet();
        rowset.setItemValue(0, "unitId", unitId);
        view.processor.getUnitUserListByUnitId(conditionDs, 1, 10);
    }

    function unitTree_onAfterClick(node) {
        var unitId = node.getData()["id"];
        unieap.byId("form1").clear();
        var store1 = view.form.getDataStore("form1");
        var rowSet = store1.getRowSet();
        rowSet.setItemValue(0, "unitId", unitId);
        view.processor.getUnitUserListByUnitId(store1, 1, 10);
    }

    function editbtn_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var grid = unieap.byId("grid1");
        var rows = grid.getManager('SelectionManager').getSelectedRows();
        if (node == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "先选择机构"
            });
        }
        else {
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

    function adduserbtn_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        if (node == null) {
            MessageBox.alert({
                title: "提示信息",
                message: "请先选择一个机构节点"
            });
        }
        var unitId = node.getData()['id'];
        var addUserxDialog = unieap.byId('addUserxDialog');
        var data = {
            queryId: unitId
        }
        addUserxDialog.dialogData = data;
        addUserxDialog.show();
    }

    function grid1_queryButton_onClick(event) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        var conditionDs = view.form.getDataStore("form1");
        var rowset = conditionDs.getRowSet();
        rowset.setItemValue(0, "unitId", unitId);
        view.processor.getUnitUserListByUnitId(conditionDs, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function grid1_binding_rpc(store, load) {
        var node = unieap.byId("unitTree").getCurrentNode();
        var unitId = node.getData()["id"];
        var conditionDs = view.form.getDataStore("form1");
        var rowset = conditionDs.getRowSet();
        rowset.setItemValue(0, "unitId", unitId);
        view.processor.getUnitUserListByUnitId(conditionDs, store.getPageNumber(), store.getPageSize());
    }

    var view = new _security.unit_user.unit_user.View();
    view.init();

    return view;
})