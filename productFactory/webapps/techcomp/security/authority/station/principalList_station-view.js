/**
 *
 * @author hanyongxu
 * @creationTime 2014-08-11 14:07:01
 * @modificationTime 2014-12-31 16:39:55
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("principalList_station", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.authority.station.principalList_station.View", unieap.view.View, {



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
                getAllEnabledStationByUnitIdSuccess: getAllEnabledStationByUnitIdSuccess,
                getMenuTreeSuccess: getMenuTreeSuccess,
                getAuthorityMenuListSuccess: getAuthorityMenuListSuccess,
                saveAuthoritySuccess: saveAuthoritySuccess,
                unitTree_onAfterClick: unitTree_onAfterClick,
                grid1_views_onRowClick: grid1_views_onRowClick,
                grid1_selection_onAfterSelect: grid1_selection_onAfterSelect,
                savebtn_onClick: savebtn_onClick
            });

            this.processor = new _security.authority.station.principalList_station.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUnitDTO')) {
                var sysSecUnitDTO = new unieap.ds.DataStore('sysSecUnitDTO');
                sysSecUnitDTO.setRowSetName("com.neusoft.fdframework.security.dto.SysSecUnitDTO");

                dataCenter.addDataStore(sysSecUnitDTO);
            }

            if (!dataCenter.getDataStore('sysSecStationDTO')) {
                var sysSecStationDTO = new unieap.ds.DataStore('sysSecStationDTO');
                sysSecStationDTO.setRowSetName("com.neusoft.fdframework.security.dto.SysSecStationDTO");

                dataCenter.addDataStore(sysSecStationDTO);
            }

            if (!dataCenter.getDataStore('sysSecMenuDTO')) {
                var sysSecMenuDTO = new unieap.ds.DataStore('sysSecMenuDTO');
                sysSecMenuDTO.setRowSetName("com.neusoft.fdframework.security.dto.SysSecMenuDTO");

                dataCenter.addDataStore(sysSecMenuDTO);
            }

            if (!dataCenter.getDataStore('sysSecStation')) {
                var sysSecStation = new unieap.ds.DataStore('sysSecStation');
                sysSecStation.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStation");

                dataCenter.addDataStore(sysSecStation);
            }

            if (!dataCenter.getDataStore('sysSecMenu')) {
                var sysSecMenu = new unieap.ds.DataStore('sysSecMenu');
                sysSecMenu.setRowSetName("com.neusoft.fdframework.security.entity.SysSecMenu");

                dataCenter.addDataStore(sysSecMenu);
            }

            if (!dataCenter.getDataStore('sysSecUnit')) {
                var sysSecUnit = new unieap.ds.DataStore('sysSecUnit');
                sysSecUnit.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnit");

                dataCenter.addDataStore(sysSecUnit);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("unitTree"), "onAfterClick", this.unitTree_onAfterClick);

            this.connect(unieap.byId("savebtn"), "onClick", this.savebtn_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllUnitList();
            view.processor.getMenuTree("all", 1, 10000);
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
     * @description:getAllEnabledStationByUnitId方法的成功回调。
     *
     */

    function getAllEnabledStationByUnitIdSuccess(dc) {
        view.grid.setDataStore("grid1", dc.getSingleDataStore());
    }
    /**
     * @description:getMenuTree方法的成功回调。
     *
     */

    function getMenuTreeSuccess(dc) {
        var result = dc.getDataStore('menu');
        //unieap.debug(result);
        view.tree.setDataStore("menuTree", result);
        unieap.byId("menuTree").expandAllNodes();
    }
    /**
     * @description:getAuthorityMenuList方法的成功回调。
     *
     */

    function getAuthorityMenuListSuccess(dc) {
        var result = dc.getDataStore("menuListDTO");
        var rowset = result.getRowSet();
        var primary = unieap.ds.Buffer.PRIMARY;
        var length = rowset.getData(primary).length;
        for (var i = 0; i < length; i++) {
            var data1 = rowset.getData(primary)[i];
            var node = unieap.byId("menuTree").getNodeById(data1.id);
            var isLeaf = unieap.byId("menuTree").isLeafByData(node.getItem());
            if (isLeaf) {
                unieap.byId("menuTree").setChecked(node, true);
            }
        }
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

    function unitTree_onAfterClick(node) {
        var unitId = node.getData()["id"];
        view.processor.getAllEnabledStationByUnitId(unitId);
    }

    function grid1_views_onRowClick(event) {
        var grid1 = unieap.byId("grid1");
        var inRowIndex = grid1.getRowManager().getCurrentRowIndex();
        grid1.getManager("SelectionManager").setSelect(inRowIndex, true);
        stationId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        view.processor.getMenuTree("all", 1, 10000);
        view.processor.getAuthorityMenuList(stationId, "1");
    }

    function grid1_selection_onAfterSelect(inRowIndex) {


        stationId = view.grid.getRow("grid1", inRowIndex).getRowSet().getItemValue(0, "id");
        view.processor.getMenuTree("all", 1, 10000);
        view.processor.getAuthorityMenuList(stationId, "1");
    }

    function savebtn_onClick(event) {
        var menuTree = unieap.byId("menuTree");
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
        view.processor.saveAuthority(stationId, "1", "com.neusoft.fdframework.security.menu.entity.SysSecMenu", store1)
    }

    var view = new _security.authority.station.principalList_station.View();
    view.init();

    return view;
})