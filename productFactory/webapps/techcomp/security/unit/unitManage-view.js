/**
 *
 * @author zhyu.neu
 * @creationTime 2014-07-04 09:39:32
 * @modificationTime 2014-12-29 14:11:42
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("unitManage", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.unit.unitManage.View", unieap.view.View, {



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
                updateSysSecUnitSuccess: updateSysSecUnitSuccess,
                saveSysSecUnitSuccess: saveSysSecUnitSuccess,
                deleteSysSecUnitSuccess: deleteSysSecUnitSuccess,
                addbtn_onClick: addbtn_onClick,
                delbtn_onClick: delbtn_onClick,
                unitTree_onAfterClick: unitTree_onAfterClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.unit.unitManage.Processor(this);

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
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addbtn"), "onClick", this.addbtn_onClick);

            this.connect(unieap.byId("delbtn"), "onClick", this.delbtn_onClick);

            this.connect(unieap.byId("unitTree"), "onAfterClick", this.unitTree_onAfterClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllUnitList();
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
     * @description:updateSysSecUnit方法的成功回调。
     *
     */

    function updateSysSecUnitSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '保存成功！'
        });
        var node = unieap.byId("unitTree").getCurrentNode();
        unieap.byId("unitTree").freshNodeLabel(node);
    }
    /**
     * @description:saveSysSecUnit方法的成功回调。
     *
     */

    function saveSysSecUnitSuccess(dc) {
        view.processor.getAllUnitList();
    }
    /**
     * @description:deleteSysSecUnit方法的成功回调。
     *
     */

    function deleteSysSecUnitSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '刪除成功！'
        });
    }

    function addbtn_onClick(event) {
        var value = +new Date;
        var datePattern = "yyyyMMddHHmmss";
        var timePattern = "yyyyMMdd hh:mm:ss";
        var currentTime = unieap.dateFormat(value, datePattern, {
            dataType: "string",
            valueFormat: 'yyyyMMdd'
        });
        var parentNode = unieap.byId("unitTree").getCurrentNode();
        var currentDate = unieap.dateParser(value, timePattern);
        if (!parentNode) {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择一个节点！'
            });
            return;
        }
        else {
            var parentNodeID = parentNode.getData()["id"]; //获取当前节点的ID
            var data = {
                id: '',
                creationDate: '',
                parentId: parentNodeID,
                description: '新增组织机构',
                isLeaf: '1',
                name: '新增组织机构' + currentTime,
                code: currentTime,
                lastUpdator: '',
                delFlag: 'n',
                lastUpdateDate: '',
                creator: ''
            };
            var rowSet = new unieap.ds.RowSet();
            rowSet.addRows(data);
            var store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecUnit');
            store1.setRowSet(rowSet);
            store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnit");
            //	unieap.debug(store1);
            view.processor.saveSysSecUnit(store1);
            unieap.byId("unitTree").createNode(data, parentNode); //给当前节点添加一个子节点
        }
    }

    function delbtn_onClick(event) {
        var delNode = unieap.byId("unitTree").getCurrentNode();
        if (!delNode) {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择一个节点！'
            })
            return;
        }
        else {
            MessageBox.confirm({
                title: '提示信息',
                message: '你确定要删除该机构吗？',
                onComplete: confirmReturn,
                iconCloseComplete: true
            }, dojo.byId("confirm"));

            function confirmReturn(value) {
                if (value == true) {
                    var form = unieap.byId("form1");
                    if (form == null) {
                        return;
                    }
                    var conditionDS = view.form.getDataStore('form1');
                    dataCenter.addHeaderAttribute('queryUserList', 'serverExport');
                    //发送请求
                    view.processor.deleteSysSecUnit(conditionDS);
                    unieap.byId("unitTree").deleteNode(delNode, true);
                }
                else {
                    return;
                }
            }
        }
    }

    function unitTree_onAfterClick(node) {
        var delbtn = unieap.byId("delbtn");
        var parentNode = unieap.byId("unitTree").getCurrentNode().getParent();
        if (parentNode.getParent()) {
            delbtn.setDisabled(false);
        }
        else {
            delbtn.setDisabled(true);
        }
        var rowSet = new unieap.ds.RowSet();
        rowSet.addRow(node.getData());
        var dataStore = new unieap.ds.DataStore('store1');
        dataStore.setRowSet(rowSet);
        view.form.setDataStore("form1", dataStore);
    }

    function form1_saveButton_onClick(event) {
        var form2 = unieap.byId("form1");
        if (form2.isModified()) {
            var conditionDs = view.form.getDataStore("form1");
            //	unieap.debug(conditionDs);
            var rowset = conditionDs.getRowSet();
            var unitName = rowset.getItemValue(0, "name");
            var unitCode = rowset.getItemValue(0, "code");
            if (unitCode.length > 32) {
                alert("不能超过32位");
                return;
            }

            view.processor.updateSysSecUnit(conditionDs);

        }
        else {
            MessageBox.alert({
                title: "提示信息",
                message: '机构信息未发生改变!'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        formRowSet.discardUpdate(0);
        formRowSet.resetUpdate();
    }

    var view = new _security.unit.unitManage.View();
    view.init();

    return view;
})