/**
 *
 * @author user
 * @creationTime 2014-07-08 08:57:45
 * @modificationTime 2014-11-13 16:22:22
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("datascope", function () {

    var id;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascope.datascope.View", unieap.view.View, {



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
                getGridListSuccess: getGridListSuccess,
                delSuccess: delSuccess,
                getGridListByIdSuccess: getGridListByIdSuccess,
                tree1_onAfterClick: tree1_onAfterClick,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                button3_onClick: button3_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc,
                addXDialog_onComplete: addXDialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete,
                id: id
            });

            this.processor = new _security.datascope.datascope.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataScopeType')) {
                var sysSecDataScopeType = new unieap.ds.DataStore('sysSecDataScopeType');
                sysSecDataScopeType.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeType");

                dataCenter.addDataStore(sysSecDataScopeType);
            }

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

            this.connect(unieap.byId("tree1"), "onAfterClick", this.tree1_onAfterClick);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("addXDialog"), "onComplete", this.addXDialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);



            view.processor.getTree();
            //view.form.setDataStore("form1", new unieap.ds.DataStore("store"));
        }


    });
    /**
     * @description:getTree方法的成功回调。
     *
     */

    function getTreeSuccess(dc) {
        view.tree.setDataStore("tree1", dc.getSingleDataStore());
        //var conditionDS = view.form.getDataStore('form1');
        //dataCenter.addHeaderAttribute('getGridList', 'serverExport');
        ////发送请求
        //
        //view.processor.getGridList(conditionDS, 1, 10);			
    }
    /**
     * @description:getGridList方法的成功回调。
     *
     */

    function getGridListSuccess(dc) {
        var result = dc.getDataStore('dataScope');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:del方法的成功回调。
     *
     */

    function delSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: '操作成功!',
            onComplete: function () {
                var ds = view.form.getDataStore("form1");
                var rowset = ds.getRowSet();
                rowset.setItemValue(0, "dataScopeTypeId", id);
                view.processor.getGridListById(ds, 1, 10);
            }
        });
    }
    /**
     * @description:getGridListById方法的成功回调。
     *
     */

    function getGridListByIdSuccess(dc) {
        var result = dc.getDataStore('dataScope');
        view.grid.setDataStore('grid1', result);
    }

    function tree1_onAfterClick(node) {
        var node = unieap.byId("tree1").getCurrentNode();
        id = node.getData()['id'];
        var data = {
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    function button1_onClick(event) {
        var appId;
        var node = unieap.byId("tree1").getCurrentNode();
        if (node == null) {
            alert("请选择节点！");
            return;
        }
        else {
            id = node.getData()['id'];
            appId = node.getData()['appId'];
        }





        var addxDialog = unieap.byId('addXDialog');
        var data = {
            id: id,
            appId: appId
        }
        addxDialog.dialogData = data;
        addxDialog.show();

    }

    function button2_onClick(event) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager('SelectionManager').getSelectedRows();
        if (rows.length == 1) {
            var data = view.grid.getRow("grid1");
            var dialog = unieap.byId("editXDialog");
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

    function button3_onClick(event) {
        var selectRows = unieap.byId("grid1").getManager("SelectionManager").getSelectedRows();
        var count = selectRows.length;
        var id = '';
        if (count > 0) {
            var ds = view.grid.getRows("grid1");
            var rowset = ds.getRowSet();
            for (var i = 0; i < count - 1; i++) {
                var a = "'" + rowset.getItemValue(i, "id") + "',";
                id = id + a;
            }
            id = id + "'" + rowset.getItemValue(count - 1, "id") + "'";
            view.processor.del(id);
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
        dataCenter.addHeaderAttribute('getGridList', 'serverExport');
        //发送请求



        //var node = unieap.byId("tree1").getCurrentNode();
        //if(node == null){
        //      alert("请选择节点！");
        //      return;
        //}
        var data = {
            name: unieap.byId("dataScopeName").getValue(),
            dataSourceId: unieap.byId("dataSourceId").getValue(),
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var data = {
            name: unieap.byId("dataScopeName").getValue(),
            dataSourceId: unieap.byId("dataSourceId").getValue(),
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    function grid1_binding_rpc(store, load) {

        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        dataCenter.addHeaderAttribute('getGridList', 'serverExport');
        //发送请求



        //var node = unieap.byId("tree1").getCurrentNode();
        //if(node == null){
        //      alert("请选择节点！");
        //      return;
        //}
        var data = {
            name: unieap.byId("dataScopeName").getValue(),
            dataSourceId: unieap.byId("dataSourceId").getValue(),
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    function addXDialog_onComplete(returnObj) {

        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        dataCenter.addHeaderAttribute('getGridList', 'serverExport');
        //发送请求



        //var node = unieap.byId("tree1").getCurrentNode();
        //if(node == null){
        //      alert("请选择节点！");
        //      return;
        //}
        var data = {
            name: unieap.byId("dataScopeName").getValue(),
            dataSourceId: unieap.byId("dataSourceId").getValue(),
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {

        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        dataCenter.addHeaderAttribute('getGridList', 'serverExport');
        //发送请求



        //var node = unieap.byId("tree1").getCurrentNode();
        //if(node == null){
        //      alert("请选择节点！");
        //      return;
        //}
        var data = {
            name: unieap.byId("dataScopeName").getValue(),
            dataSourceId: unieap.byId("dataSourceId").getValue(),
            dataScopeTypeId: id
        };
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScope');
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.getGridListById(store1, 1, 10);
    }

    var view = new _security.datascope.datascope.View();
    view.init();

    return view;
})