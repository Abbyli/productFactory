/**
 *
 * @author shify
 * @creationTime 2014-06-27 16:30:16
 * @modificationTime 2014-11-06 15:39:49
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("page_list_unieap", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page.page_list_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryPagesSuccess: queryPagesSuccess,
                queryPageResourcesSuccess: queryPageResourcesSuccess,
                batchDeletePageResourcesSuccess: batchDeletePageResourcesSuccess,
                deleteConfirmFn: deleteConfirmFn,
                batchDeletePageResourcesError: batchDeletePageResourcesError,
                xdialog1_onComplete: xdialog1_onComplete,
                xdialog2_onComplete: xdialog2_onComplete,
                xdialog3_onComplete: xdialog3_onComplete,
                xdialog4_onComplete: xdialog4_onComplete,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                grid1_selection_onAfterSelect: grid1_selection_onAfterSelect,
                button3_onClick: button3_onClick,
                button4_onClick: button4_onClick,
                button5_onClick: button5_onClick,
                grid2_queryButton_onClick: grid2_queryButton_onClick,
                grid2_resetButton_onClick: grid2_resetButton_onClick,
                grid2_binding_rpc: grid2_binding_rpc
            });

            this.processor = new _security.page.page_list_unieap.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecPage')) {
                var sysSecPage = new unieap.ds.DataStore('sysSecPage');
                sysSecPage.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPage");

                dataCenter.addDataStore(sysSecPage);
            }

            if (!dataCenter.getDataStore('sysSecPage1')) {
                var sysSecPage1 = new unieap.ds.DataStore('sysSecPage1');
                sysSecPage1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPage");

                dataCenter.addDataStore(sysSecPage1);
            }

            if (!dataCenter.getDataStore('sysSecPageResource')) {
                var sysSecPageResource = new unieap.ds.DataStore('sysSecPageResource');
                sysSecPageResource.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPageResource");

                dataCenter.addDataStore(sysSecPageResource);
            }

            if (!dataCenter.getDataStore('sysSecPageResource1')) {
                var sysSecPageResource1 = new unieap.ds.DataStore('sysSecPageResource1');
                sysSecPageResource1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPageResource");

                dataCenter.addDataStore(sysSecPageResource1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

            this.connect(unieap.byId("xdialog2"), "onComplete", this.xdialog2_onComplete);

            this.connect(unieap.byId("xdialog3"), "onComplete", this.xdialog3_onComplete);

            this.connect(unieap.byId("xdialog4"), "onComplete", this.xdialog4_onComplete);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

            this.connect(unieap.byId("button4"), "onClick", this.button4_onClick);

            this.connect(unieap.byId("button5"), "onClick", this.button5_onClick);

            this.connect(unieap.byId("grid2_queryButton"), "onClick", this.grid2_queryButton_onClick);

            this.connect(unieap.byId("grid2_resetButton"), "onClick", this.grid2_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllAppList();
            var conditionDS = view.form.getDataStore('form1');
            dataCenter.addHeaderAttribute('queryPages', 'serverExport');
            //发送请求
            view.processor.queryPages(conditionDS, 1, 10);
        },
        page_init: function () {
            var application = new unieap.ds.DataStore("appDs", [{
                CODENAME: '应用支撑平台',
                CODEVALUE: '1'
            }, {
                CODENAME: '页面权限测试',
                CODEVALUE: '0'
            }]);
            dataCenter.addDataStore("appDs", application);

        }

    });
    /**
     * @description:queryPages方法的成功回调。
     *
     */

    function queryPagesSuccess(dc) {
        var result = dc.getDataStore('page');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:queryPageResources方法的成功回调。
     *
     */

    function queryPageResourcesSuccess(dc) {
        var result = dc.getDataStore('pageResource');
        view.grid.setDataStore('grid2', result);
    }
    /**
     * @description:batchDeletePageResources方法的成功回调。
     *
     */

    function batchDeletePageResourcesSuccess(dc) {
        alert("删除成功！");
        var conditionDS = view.form.getDataStore('form2');
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        //发送请求
        view.processor.queryPageResources(conditionDS, 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} flag 参数描述
     * @return:
     *
     */

    function deleteConfirmFn(flag) {
        if (flag == true) {
            // delete selected records
            var deletePageResourceListDS = view.grid.getRows("grid2");
            view.processor.batchDeletePageResources(deletePageResourceListDS);
        }
        else {
            //			alert("记录未删除！")
        }
    }
    /**
     * @description:batchDeletePageResources方法的失败回调。
     *
     */

    function batchDeletePageResourcesError(xhr) {
        alert("删除时出错");
    }

    function xdialog1_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('queryPages', 'serverExport');
        //发送请求
        view.processor.queryPages(conditionDS, 1, 10);
    }

    function xdialog2_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('queryPages', 'serverExport');
        //发送请求
        view.processor.queryPages(conditionDS, 1, 10);
    }

    function xdialog3_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form2');
        //unieap.debug(conditionDS)
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        //发送请求
        view.processor.queryPageResources(conditionDS, 1, 10);
    }

    function xdialog4_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form2');
        //unieap.debug(conditionDS)
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        //发送请求
        view.processor.queryPageResources(conditionDS, 1, 10);
    }

    function button1_onClick(event) {
        var dialog = unieap.byId("xdialog1");
        dialog.show();
    }

    function button2_onClick(event) {
        var gridid = view.grid.getPropertyValue("grid1", "id");
        //判断是否在列表中选择数据
        if (gridid != null) {
            var numOfSelectedRows = view.grid.getRows("grid1").getRowSet().getRowCount("primary");
            if (numOfSelectedRows == 1) {
                //获取xdialog控件
                var dialog = unieap.byId("xdialog2");
                //获取列表中的选择列	
                var gridDS = view.grid.getRow("grid1");
                //将参数赋值
                dialog.dialogData = gridDS;
                //弹出窗口方法
                dialog.show();
            }
            else {
                MessageBox.alert({
                    title: "提示信息",
                    message: "请选择一条记录！"
                });
            }
        }
        else {
            MessageBox.alert({
                title: "提示信息",
                message: "请选择一条记录！"
            });
        }

    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('queryPages', 'serverExport');
        //发送请求
        view.processor.queryPages(conditionDS, 1, 10);

        // reset selected page id (only on grid1's save and reset button)
        var pageResourceDs = dataCenter.getDataStore("sysSecPageResource1");
        var rs1 = pageResourceDs.getRowSet();
        rs1.setItemValue(0, "pageId", "");
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('queryPages', 'serverExport');
        //发送请求
        view.processor.queryPages(conditionDS, 1, 10);

        // reset selected page id by clicking grid1's query and reset button
        var pageResourceDs = dataCenter.getDataStore("sysSecPageResource1");
        var rs1 = pageResourceDs.getRowSet();
        rs1.setItemValue(0, "pageId", "");
    }

    function grid1_binding_rpc(store, load) {
        var conditionDs = view.form.getDataStore('form1');
        view.processor.queryPages(conditionDs, store.getPageNumber(), store.getPageSize());
    }

    function grid1_selection_onAfterSelect(inRowIndex) {
        // get the id of selected page
        var selectedPage = view.grid.getRow("grid1", inRowIndex);
        var rs = selectedPage.getRowSet();
        var r = rs.getRow(0);
        var id = r.getItemValue("id");
        //var id = selectedPageId
        //alert(id)
        // deliver the id to the datastore
        var oldDs = dataCenter.getDataStore("sysSecPageResource1");
        //var newDs = oldDs.collect("all");
        var rs1 = oldDs.getRowSet();
        rs1.setItemValue(0, "pageId", id);
        //unieap.debug(newDs)
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        view.processor.queryPageResources(oldDs, 1, 10);
    }

    function button3_onClick(event) {
        var gridid = view.grid.getPropertyValue("grid1", "id");
        //判断是否在列表中选择数据
        if (gridid != null) {
            var dialog = unieap.byId("xdialog3");
            //获取列表中的选择列	
            var gridDS = view.grid.getRow("grid1");
            //	unieap.debug(gridDS)
            //将参数赋值
            dialog.dialogData = gridDS;
            dialog.show();
        }
        else {
            alert("请选择一个页面");
        }
    }

    function button4_onClick(event) {
        var gridid = view.grid.getPropertyValue("grid2", "id");
        //判断是否在列表中选择数据
        if (gridid != null) {
            var numOfSelectedRows = view.grid.getRows("grid2").getRowSet().getRowCount("primary");
            if (numOfSelectedRows == 1) {
                var dialog = unieap.byId("xdialog4");
                //获取列表中的选择列	
                var gridDS = view.grid.getRow("grid2");
                //将参数赋值
                dialog.dialogData = gridDS;
                dialog.show();
            }
            else {
                MessageBox.alert({
                    title: "确认框",
                    message: "请选择一条页面资源记录！"
                });
            }
        }
        else {
            MessageBox.alert({
                title: "确认框",
                message: "请选择一条页面资源记录！"
            });
        }
    }

    function button5_onClick(event) {
        var selectRows = unieap.byId("grid2").getManager("SelectionManager").getSelectedRows();
        if (selectRows.length > 0) {
            MessageBox.confirm({
                title: '提示',
                message: '删除操作不可逆，您是否确认？',
                onComplete: deleteConfirmFn,
                type: "warn"
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择要删除的页面资源信息！'
            });
        }
    }

    function grid2_queryButton_onClick(event) {
        var form = unieap.byId('form2');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form2');
        //unieap.debug(conditionDS)
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        //发送请求
        view.processor.queryPageResources(conditionDS, 1, 10);
    }

    function grid2_resetButton_onClick(event) {
        unieap.byId('form2').clear();
        // 重查
        var conditionDS = view.form.getDataStore('form2');
        //unieap.debug(conditionDS)
        dataCenter.addHeaderAttribute('queryPageResources', 'serverExport');
        //发送请求
        view.processor.queryPageResources(conditionDS, 1, 10);
    }

    function grid2_binding_rpc(store, load) {
        var conditionDs = view.form.getDataStore('form2');
        view.processor.queryPageResources(conditionDs, store.getPageNumber(), store.getPageSize());
    }

    var view = new _security.page.page_list_unieap.View();
    view.init();

    return view;
})