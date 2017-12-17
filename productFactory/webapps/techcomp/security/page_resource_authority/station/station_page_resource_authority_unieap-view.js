/**
 *
 * @author shify
 * @creationTime 2014-07-15 16:42:40
 * @modificationTime 2014-12-31 16:50:37
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("station_page_resource_authority_unieap", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page_resource_authority.station.station_page_resource_authority_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllUnitsSuccess: getAllUnitsSuccess,
                getStationListSuccess: getStationListSuccess,
                getAllPageResourcesSuccess: getAllPageResourcesSuccess,
                getAuthorizedPageResourcesSuccess: getAuthorizedPageResourcesSuccess,
                saveSelectedPageResourcesForAuthority: saveSelectedPageResourcesForAuthority,
                saveAuthoritySuccess: saveAuthoritySuccess,
                saveAuthorityError: saveAuthorityError,
                button1_onClick: button1_onClick,
                tree1_onAfterClick: tree1_onAfterClick,
                tree1_onClick: tree1_onClick,
                grid1_selection_onAfterSelect: grid1_selection_onAfterSelect,
                grid1_views_onCellClick: grid1_views_onCellClick
            });

            this.processor = new _security.page_resource_authority.station.station_page_resource_authority_unieap.Processor(this);

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

            if (!dataCenter.getDataStore('sysSecPageResource')) {
                var sysSecPageResource = new unieap.ds.DataStore('sysSecPageResource');
                sysSecPageResource.setParameter("_queryDSRowSetName", "com.neusoft.fdframework.security.entity.SysSecPageResource");
                sysSecPageResource.setParameter("_queryFakeInfo", {
                    'parentId': 'id'
                });

                dataCenter.addDataStore(sysSecPageResource);
            }

            if (!dataCenter.getDataStore('sysSecPageResource1')) {
                var sysSecPageResource1 = new unieap.ds.DataStore('sysSecPageResource1');
                sysSecPageResource1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPageResource");

                dataCenter.addDataStore(sysSecPageResource1);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("tree1"), "onAfterClick", this.tree1_onAfterClick);

            this.connect(unieap.byId("tree1"), "onClick", this.tree1_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            // call methods
            view.processor.getAllUnits();
            view.processor.getAllApps();
            view.processor.getAllPages();
            view.processor.getAllPageResources();
        }


    });
    /**
     * @description:getAllUnits方法的成功回调。
     *
     */

    function getAllUnitsSuccess(dc) {
        var ds = dc.getDataStore("units");
        view.tree.setDataStore("tree1", ds);
        unieap.byId("tree1").expandAllNodes();
    }
    /**
     * @description:getStationList方法的成功回调。
     *
     */

    function getStationListSuccess(dc) {
        var result = dc.getDataStore('station');
        view.grid.setDataStore("grid1", result);
    }
    /**
     * @description:getAllPageResources方法的成功回调。
     *
     */

    function getAllPageResourcesSuccess(dc) {
        //为pageResource添加parentId属性
        var ds = dataCenter.getDataStore("pageResource");
        var rs = ds.getRowSet();
        var sz = rs.getRowCount();
        //var underApp = new Array();
        var underPage = new Array();
        for (var i = 0; i < sz; i++) {
            var data = rs.getRowData(i);
            var pageId = data["pageId"];
            data["parentId"] = pageId;
            //	underApp.push(data["appId"]);
            underPage.push(pageId);
        }

        //为page添加parentId属性
        var pageDs = dataCenter.getDataStore("page");
        var pageRs = pageDs.getRowSet();
        // 查询包含pageResource的page，在filter缓存区中，只显示包含pageResource的page
        if (underPage.length != 0) {
            for (var i = 0; i < underPage.length; i++) {
                // 应该为‘=’，unieap的bug
                pageRs.doFilter('id', '!=', underPage[i], true);
            }
        }
        // 合并page与pageResource,为page添加parentId属性
        var pageSz = pageRs.getRowCount(unieap.ds.Buffer.FILTER);
        var pageArray = new Array();
        var underApp = new Array();
        for (var i = 0; i < pageSz; i++) {
            var data = pageRs.getRowData(i, unieap.ds.Buffer.FILTER);
            var appId = data["appId"];
            data["parentId"] = appId;
            pageArray.push(data);
            underApp.push(appId);
        }
        rs.addRows(pageArray);

        var appDs = dataCenter.getDataStore("application");
        var appRs = appDs.getRowSet();
        // 查询包含pageResource的app，在filter缓存区中，只显示包含pageResource的app
        if (underApp.length != 0) {
            for (var i = 0; i < underApp.length; i++) {
                // 应该为‘=’，unieap的bug
                appRs.doFilter('id', '!=', underApp[i], true);
            }
        }
        //合并pageResource与app
        var appSz = appRs.getRowCount(unieap.ds.Buffer.FILTER);
        var appArray = new Array();
        for (var i = 0; i < appSz; i++) {
            var data = appRs.getRowData(i, unieap.ds.Buffer.FILTER);
            appArray.push(data);
        }
        rs.addRows(appArray);

        //ds.append(appDs,"append");
        //ds.append(pageDs, "append");

        view.tree.setDataStore("tree2", ds);
        unieap.byId("tree2").expandAllNodes();
    }
    /**
     * @description:getAuthorizedPageResources方法的成功回调。
     *
     */

    function getAuthorizedPageResourcesSuccess(dc) {
        var authPageResourcesDs = dc.getDataStore("pageResource");
        dataCenter.addDataStore("authorizedResources", authPageResourcesDs);

        var pageTree = unieap.byId("tree2");
        // 首先清除之前所有的勾选
        pageTree.selectAll(false);

        // 设置page树的勾选状态
        var rs = authPageResourcesDs.getRowSet();
        var sz = rs.getRowCount();
        for (var i = 0; i < sz; i++) {
            var id = rs.getItemValue(i, "id", "primary");
            //	alert(id)
            var node = pageTree.getNodeById(id);
            pageTree.setChecked(node, true, true);
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} items 参数描述
     * @return:
     *
     */

    function saveSelectedPageResourcesForAuthority(items) {
        var stationId = view.grid.getPropertyValue("grid1", "id");
        var classPath = "com.neusoft.fdframeowrk.security.page.entity.SysSecPageResource";

        var pageResourceDs = dataCenter.getDataStore("sysSecPageResource1");
        var pageResourceRs = new unieap.ds.RowSet();
        if (items != null) {
            var sz = items.length;
            for (var i = 0; i < sz; i++) {
                //判断是否是pageResource而不是app或page
                var key = items[i].data;
                if (key.pageId != null) {
                    //删除为建立tree而加入的parentId属性
                    delete key['parentId'];
                    pageResourceRs.addRow(key, false, false);
                }
            }
        }
        pageResourceDs.setRowSet(pageResourceRs);
        //unieap.debug(pageDs)
        view.processor.saveAuthority(stationId, "1", classPath, pageResourceDs);
    }
    /**
     * @description:saveAuthority方法的成功回调。
     *
     */

    function saveAuthoritySuccess(dc) {
        alert("保存成功")
    }
    /**
     * @description:saveAuthority方法的失败回调。
     *
     */

    function saveAuthorityError(xhr) {
        alert("保存失败");
    }

    function button1_onClick(event) {
        var stationId = view.grid.getPropertyValue("grid1", "id");
        if (stationId != null) {
            var pageTree = unieap.byId("tree2");
            pageTree.getCheckLogic().getSelectedItems(function (items) {
                saveSelectedPageResourcesForAuthority(items)
            });
        }
        else {
            alert("请选择一个岗位");
        }

    }

    function tree1_onAfterClick(node) {
        var unitId = view.tree.getPropertyValue("tree1", node, "id");

        if (unitId != null) {
            view.processor.getStationList(unitId);
        }
        else {
            alert("请选择一个节点");
        }
    }

    function tree1_onClick(node) {
        var pageTree = unieap.byId("tree2");
        // 清除之前所有的勾选
        pageTree.selectAll(false);
    }

    function grid1_selection_onAfterSelect(inRowIndex) {
        var stationId = view.grid.getPropertyValue("grid1", "id", inRowIndex);
        //alert(stationId)
        view.processor.getAuthorizedPageResources(stationId, "1");
    }

    function grid1_views_onCellClick(inCell, inRowIndex) {
        var grid1 = unieap.byId("grid1");
        var inRowIndex = grid1.getRowManager().getCurrentRowIndex();
        grid1.getManager("SelectionManager").setSelect(inRowIndex, true);

        var stationId = view.grid.getPropertyValue("grid1", "id", inRowIndex);
        //alert(stationId)
        view.processor.getAuthorizedPageResources(stationId, "1");
    }

    var view = new _security.page_resource_authority.station.station_page_resource_authority_unieap.View();
    view.init();

    return view;
})