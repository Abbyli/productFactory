/**
 *
 * @author hanyongxu
 * @creationTime 2014-08-08 16:28:31
 * @modificationTime 2014-12-31 16:39:49
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("principalList_role", function () {

    var roleId;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.authority.role.principalList_role.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllEnableSysSecRoleSuccess: getAllEnableSysSecRoleSuccess,
                getAuthorityMenuListSuccess: getAuthorityMenuListSuccess,
                getMenuTreeSuccess: getMenuTreeSuccess,
                saveAuthoritySuccess: saveAuthoritySuccess,
                grid1_views_onRowClick: grid1_views_onRowClick,
                grid1_selection_onAfterSelect: grid1_selection_onAfterSelect,
                savbtn_onClick: savbtn_onClick,
                roleId: roleId
            });

            this.processor = new _security.authority.role.principalList_role.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecRole')) {
                var sysSecRole = new unieap.ds.DataStore('sysSecRole');
                sysSecRole.setRowSetName("com.neusoft.fdframework.security.entity.SysSecRole");

                dataCenter.addDataStore(sysSecRole);
            }

            if (!dataCenter.getDataStore('sysSecMenu')) {
                var sysSecMenu = new unieap.ds.DataStore('sysSecMenu');
                sysSecMenu.setRowSetName("com.neusoft.fdframework.security.entity.SysSecMenu");

                dataCenter.addDataStore(sysSecMenu);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("savbtn"), "onClick", this.savbtn_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllEnableSysSecRole();
            view.processor.getMenuTree("all", 1, 10000);
        }


    });
    /**
     * @description:getAllEnableSysSecRole方法的成功回调。
     *
     */

    function getAllEnableSysSecRoleSuccess(dc) {
        var result = dc.getDataStore('roles');
        //unieap.debug(result);
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:getAuthorityMenuList方法的成功回调。
     *
     */

    function getAuthorityMenuListSuccess(dc) {
        var result = dc.getDataStore('menuListDTO');
        var rowset = result.getRowSet();
        var primary = unieap.ds.Buffer.PRIMARY;
        var length = rowset.getData(primary).length;
        for (var i = 0; i < length; i++) {
            var data1 = rowset.getData(primary)[i];
            var node = unieap.byId("principalList_menuTree").getNodeById(data1.id);
            var isLeaf = unieap.byId("principalList_menuTree").isLeafByData(node.getItem());
            if (isLeaf) {
                unieap.byId("principalList_menuTree").setChecked(node, true);
            }
        }
    }
    /**
     * @description:getMenuTree方法的成功回调。
     *
     */

    function getMenuTreeSuccess(dc) {
        var result = dc.getDataStore('menu');
        //unieap.debug(result);
        view.tree.setDataStore("principalList_menuTree", result);
        unieap.byId("principalList_menuTree").expandAllNodes();
    }
    /**
     * @description:saveAuthority方法的成功回调。
     *
     */

    function saveAuthoritySuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
        });
    }

    function grid1_views_onRowClick(event) {
        var grid1 = unieap.byId("grid1");
        var inRowIndex = grid1.getRowManager().getCurrentRowIndex();
        grid1.getManager("SelectionManager").setSelect(inRowIndex, true);
        roleId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        view.processor.getMenuTree("all", 1, 10000);
        view.processor.getAuthorityMenuList(roleId, "0");
    }

    function grid1_selection_onAfterSelect(inRowIndex) {

        roleId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        view.processor.getMenuTree("all", 1, 10000);
        view.processor.getAuthorityMenuList(roleId, "0");
    }

    function savbtn_onClick(event) {
        var menuTree = unieap.byId("principalList_menuTree");
        var rowSet = new unieap.ds.RowSet();
        var nodeArray = menuTree.getSelectedNodes();
        for (var i = 0; i < nodeArray.length; i++) {
            var node = nodeArray[i];
            var data = node.getData();
            rowSet.addRows(data);
        }
        var store1 = new unieap.ds.DataStore("com.neusoft.fdframework.security.entity.SysSecMenu");
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecMenu");
        //unieap.debug(roleId);
        view.processor.saveAuthority(roleId, "0", "com.neusoft.fdframework.security.menu.entity.SysSecMenu", store1);
    }

    var view = new _security.authority.role.principalList_role.View();
    view.init();

    return view;
})