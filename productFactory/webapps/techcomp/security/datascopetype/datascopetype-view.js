/**
 *
 * @author user
 * @creationTime 2014-07-25 13:24:01
 * @modificationTime 2014-11-07 09:24:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("datascopetype", function () {

    var id;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascopetype.datascopetype.View", unieap.view.View, {



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
                getDataScopeTypeByIdSuccess: getDataScopeTypeByIdSuccess,
                updataSuccess: updataSuccess,
                insertDataScopeTypeSuccess: insertDataScopeTypeSuccess,
                delSuccess: delSuccess,
                button1_onClick: button1_onClick,
                button2_onClick: button2_onClick,
                tree1_onAfterClick: tree1_onAfterClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                id: id
            });

            this.processor = new _security.datascopetype.datascopetype.Processor(this);

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
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("tree1"), "onAfterClick", this.tree1_onAfterClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            unieap.byId('borderPane2').hide();
            unieap.byId("button2").setDisabled(true);
            view.processor.getTree();

        }


    });
    /**
     * @description:getTree方法的成功回调。
     *
     */

    function getTreeSuccess(dc) {
        view.tree.setDataStore("tree1", dc.getSingleDataStore());
        unieap.byId("tree1").expandAllNodes();
    }
    /**
     * @description:getDataScopeTypeById方法的成功回调。
     *
     */

    function getDataScopeTypeByIdSuccess(dc) {
        unieap.byId("borderPane2").show();
        var result = dc.getDataStore('dataScopeType');
        view.form.setDataStore('form1', result);
    }
    /**
     * @description:updata方法的成功回调。
     *
     */

    function updataSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '修改成功！'
        });
    }
    /**
     * @description:insertDataScopeType方法的成功回调。
     *
     */

    function insertDataScopeTypeSuccess(dc) {
        view.processor.getTree();
    }
    /**
     * @description:del方法的成功回调。
     *
     */

    function delSuccess(dc) {
        view.processor.getTree();
        unieap.byId("button2").setDisabled(true);
    }

    function button1_onClick(event) {
        var tree1 = unieap.byId("tree1");
        var parentNode = tree1.getCurrentNode(); //获取当前节点
        if (!parentNode) {
            alert("请选择一个树节点！");
            return;
        }
        else {
            var parentNodeID = parentNode.getData()["id"]; //获取当前节点的ID
            var data = {
                name: '新增分类',
                description: '新增分类',
                parentId: parentNodeID,
                isLeaf: '1'
            }; //构造新节点的数据
            var rowSet = new unieap.ds.RowSet();
            rowSet.addRows(data);
            var newNodeDs = new unieap.ds.DataStore();
            newNodeDs.setRowSet(rowSet);
            newNodeDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecDataScopeType');
            view.processor.insertDataScopeType(newNodeDs);
        }

    }

    function button2_onClick(event) {
        var currNode = unieap.byId("tree1").getCurrentNode(); //获取当前节点
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
                var data = {
                    id: currNode.getData()['id']
                }; //构造新节点的数据

                var rowSet = new unieap.ds.RowSet();
                rowSet.addRows(data);
                var newNodeDs = new unieap.ds.DataStore();
                newNodeDs.setRowSet(rowSet);
                newNodeDs.setRowSetName('com.neusoft.fdframework.security.entity.SysSecDataScopeType');
                view.processor.del(newNodeDs);
            }
            else {
                return;
            }
        }
    }

    function tree1_onAfterClick(node) {
        unieap.byId("button2").setDisabled(false);
        var node = unieap.byId("tree1").getCurrentNode();
        id = node.getData()['id'];
        view.processor.getDataScopeTypeById(id);
    }

    function form1_saveButton_onClick(event) {
        var conditionDS = unieap.byId("form1").getBinding().getDataStore();
        var rowSet = conditionDS.getRowSet();
        rowSet.setItemValue(0, "id", id);
        view.processor.updata(conditionDS);
    }

    function form1_resetButton_onClick(event) {
        var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        formRowSet.discardUpdate(0);
        formRowSet.resetUpdate();
    }

    var view = new _security.datascopetype.datascopetype.View();
    view.init();

    return view;
})