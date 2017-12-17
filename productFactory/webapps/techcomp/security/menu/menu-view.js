/**
 *
 * @author hanyongxu
 * @creationTime 2014-08-12 11:12:12
 * @modificationTime 2015-09-16 16:37:56
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("menu", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.menu.menu.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllAuthorityMenuListSuccess: getAllAuthorityMenuListSuccess,
                updateMenuSuccess: updateMenuSuccess,
                inserMenuNodeSuccess: inserMenuNodeSuccess,
                delMenuNodeSuccess: delMenuNodeSuccess,
                btnadd_onClick: btnadd_onClick,
                btnDel_onClick: btnDel_onClick,
                menuTree_onAfterClick: menuTree_onAfterClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.menu.menu.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecMenu')) {
                var sysSecMenu = new unieap.ds.DataStore('sysSecMenu');
                sysSecMenu.setRowSetName("com.neusoft.fdframework.security.entity.SysSecMenu");

                dataCenter.addDataStore(sysSecMenu);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnadd"), "onClick", this.btnadd_onClick);

            this.connect(unieap.byId("btnDel"), "onClick", this.btnDel_onClick);

            this.connect(unieap.byId("menuTree"), "onAfterClick", this.menuTree_onAfterClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllAuthorityMenuList("all");

            unieap.byId("btnDel").setDisabled(true);
        },
        page_init: function () {
            var isDefaultDS = new unieap.ds.DataStore("isDefaultDS", [{
                CODENAME: '是',
                CODEVALUE: '1'
            }, {
                CODENAME: '否',
                CODEVALUE: '0'
            }]);

            dataCenter.addDataStore("isDefaultDS", isDefaultDS);
        }

    });
    /**
     * @description:getAllAuthorityMenuList方法的成功回调。
     *
     */

    function getAllAuthorityMenuListSuccess(dc) {
        view.tree.setDataStore("menuTree", dc.getSingleDataStore());
        unieap.byId("menuTree").expandAllNodes();
        unieap.byId("form1").clear();
    }
    /**
     * @description:updateMenu方法的成功回调。
     *
     */

    function updateMenuSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '保存成功！'
        });
        var node = unieap.byId("menuTree").getCurrentNode();
        unieap.byId("menuTree").freshNodeLabel(node);
    }
    /**
     * @description:inserMenuNode方法的成功回调。
     *
     */

    function inserMenuNodeSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: '操作成功!'
        });

        view.processor.getAllAuthorityMenuList("all");
        //unieap.byId("menuTree").getCurrentNode().setChecked(true);
        unieap.byId("menuTree").expandAllNodes();
    }
    /**
     * @description:delMenuNode方法的成功回调。
     *
     */

    function delMenuNodeSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: '操作成功!'
        });
        unieap.byId("form1").clear();
    }

    function btnadd_onClick(event) {
        var value = +new Date;
        var currentTime = unieap.dateFormat(value, 'yyyyMMddHHmmss', {
            dataType: "string",
            valueFormat: 'yyyyMMdd'
        });
        var menuTree = unieap.byId("menuTree");
        var parentNode = menuTree.getCurrentNode(); //获取当前节点
        if (!parentNode) {
            alert("请选择一个树节点！");
            return;
        }
        else {
            var parentNodeID = parentNode.getData()["id"]; //获取当前节点的ID
            var appId = parentNode.getData()["appId"]; //获取当前节点的appId
            var data = {
                id: '',
                name: '新建菜单节点' + currentTime,
                appId: appId,
                target: '',
                url: '',
                image: '',
                orderNum: '',
                isDefault: '1',
                description: '',
                parentId: parentNodeID,
                title: '',
                businessId: '',
                creator: '',
                creationDate: '',
                lastUpdator: '',
                lastUpdateDate: ''
            }; //构造新节点的数据

            var rowSet = new unieap.ds.RowSet();
            rowSet.addRows(data);
            var newNodeDs = new unieap.ds.DataStore();
            newNodeDs.setRowSet(rowSet);
            newNodeDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecMenu');
            view.processor.inserMenuNode(newNodeDs);
            menuTree.createNode(data, parentNode); //给当前节点添加一个孩子节点
        }
    }

    function btnDel_onClick(event) {
        var currNode = unieap.byId("menuTree").getCurrentNode(); //获取当前节点
        if (!currNode) {
            alert("请选择一个树节点！");
            return;
        }
        else {
            MessageBox.confirm({
                onComplete: confirmReturn,
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: true
            }, dojo.byId("confirm"));
        }

        function confirmReturn(value) {
            if (value) {
                unieap.byId("menuTree").deleteNode(currNode);
                view.processor.delMenuNode(currNode.getData()["id"]);
                unieap.byId("btnDel").setDisabled(true);
            }
            else {
                return;
            }
        }
    }

    function menuTree_onAfterClick(node) {
        //if(node.isLeaf()){
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRow(node.getData());
        var dataStore = new unieap.ds.DataStore('store1');
        dataStore.setRowSet(rowSet);
        view.form.setDataStore("form1", dataStore);
        //}

        if (node.isLeaf()) {
            // 控制子节点才可以进行删除
            unieap.byId("btnDel").setDisabled(false);
        }
        else {
            unieap.byId("btnDel").setDisabled(true);
        }

        //alert
    }

    function form1_saveButton_onClick(event) {
        var currentNode = unieap.byId("menuTree").getCurrentNode(); //获取当前节点
        if (!currentNode) {
            alert("请选择一个树节点！");
            return;
        }
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form1');
            view.processor.updateMenu(conditionDs);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        formRowSet.discardUpdate(0);
        formRowSet.resetUpdate();
    }

    var view = new _security.menu.menu.View();
    view.init();

    return view;
})