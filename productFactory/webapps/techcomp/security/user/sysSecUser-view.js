/**
 *
 * @author dong-yw
 * @creationTime 2014-06-30 10:34:06
 * @modificationTime 2014-12-11 15:53:08
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUser", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.user.sysSecUser.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getSysSecUserPageSuccess: getSysSecUserPageSuccess,
                changeLockedStatus: changeLockedStatus,
                updateLockedStatusSuccess: updateLockedStatusSuccess,
                changeEnabledStatus: changeEnabledStatus,
                updateEnableStatusSuccess: updateEnableStatusSuccess,
                linkAction: linkAction,
                btnAdd_onClick: btnAdd_onClick,
                btnEdit_onClick: btnEdit_onClick,
                btnLoc_onClick: btnLoc_onClick,
                btnUnLoc_onClick: btnUnLoc_onClick,
                btnEnab_onClick: btnEnab_onClick,
                btnUnEnab_onClick: btnUnEnab_onClick,
                btnDownTempl_onClick: btnDownTempl_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                cell_name_formatter: cell_name_formatter,
                grid1_binding_rpc: grid1_binding_rpc,
                addXdialog_onComplete: addXdialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete
            });

            this.processor = new _security.user.sysSecUser.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUser')) {
                var sysSecUser = new unieap.ds.DataStore('sysSecUser');
                sysSecUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser);
            }

            if (!dataCenter.getDataStore('sysSecUser1')) {
                var sysSecUser1 = new unieap.ds.DataStore('sysSecUser1');
                sysSecUser1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("btnEdit"), "onClick", this.btnEdit_onClick);

            this.connect(unieap.byId("btnLoc"), "onClick", this.btnLoc_onClick);

            this.connect(unieap.byId("btnUnLoc"), "onClick", this.btnUnLoc_onClick);

            this.connect(unieap.byId("btnEnab"), "onClick", this.btnEnab_onClick);

            this.connect(unieap.byId("btnUnEnab"), "onClick", this.btnUnEnab_onClick);

            this.connect(unieap.byId("btnDownTempl"), "onClick", this.btnDownTempl_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("addXdialog"), "onComplete", this.addXdialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            view.processor.getSysSecUserPage(conditionDS, 1, 10);

        },
        page_init: function () {
            var accountEnableDs = new unieap.ds.DataStore("accountEnableDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore("accountEnableDs", accountEnableDs);

            var accountLockDs = new unieap.ds.DataStore("accountLockDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore("accountLockDs", accountLockDs);
        }

    });
    /**
     * @description:getSysSecUserPage方法的成功回调。
     *
     */

    function getSysSecUserPageSuccess(dc) {
        var result = dc.getDataStore('user');

        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} isLock 参数描述
     * @return:
     *
     */

    function changeLockedStatus(isLock) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rows.getRowCount();

        var sltDs = view.grid.getRows("grid1");
        //var newRowSet =new unieap.ds.RowSet(); 

        if (sltNum == 0) {
            alert("请选择记录");
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rows.getItemValue(0, "accountLocked") == isLock) {
                alert("该记录已经是" + (isLock == 1 ? "锁定" : "解锁") + "状态");
                return;
            }
            //	newRowSet.setItemValue(0, "id", rows.getItemValue(0, "id"));
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rows.getItemValue(i, "accountLocked") == isLock) {
                    alert("记录中已经存在" + (isLock == 1 ? "锁定" : "解锁") + "状态的记录");
                    return;
                }
                //		newRowSet.setItemValue(i, "id", rows.getItemValue(i, "id"));
            }
        }

        //sltDs.setRowSet(newRowSet);
        view.processor.updateLockedStatus(sltDs, isLock, "");
    }
    /**
     * @description:updateLockedStatus方法的成功回调。
     *
     */

    function updateLockedStatusSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getSysSecUserPage(conditionDs, 1, 10);
            }
        });
    }
    /**
     * @description:
     *
     * @param: {参数类型} isEnable 参数描述
     * @return:
     *
     */

    function changeEnabledStatus(isEnable) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rows.getRowCount();

        var sltDs = view.grid.getRows("grid1");

        if (sltNum == 0) {
            alert("请选择记录");
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rows.getItemValue(0, "accountEnabled") == isEnable) {
                alert("该记录已经是" + (isEnable == 1 ? "可用" : "不可用") + "状态");
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rows.getItemValue(i, "accountEnabled") == isEnable) {
                    alert("记录中已经存在" + (isEnable == 1 ? "可用" : "不可用") + "状态的记录");
                    return;
                }
            }
        }
        view.processor.updateEnableStatus(sltDs, isEnable);
    }
    /**
     * @description:updateEnableStatus方法的成功回调。
     *
     */

    function updateEnableStatusSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getSysSecUserPage(conditionDs, 1, 10);
            }
        });
    }
    /**
     * @description:
     *
     * @param: {参数类型} parameter 参数描述
     * @return:
     *
     */

    function linkAction(parameter) {
        var dialog = unieap.byId("dtlXDialog");
        //dataDs.setParameter("flag", "detail"); 可以设置参数
        var dataDs = view.grid.getRow("grid1", parameter);
        dialog.dialogData = dataDs;
        dialog.show();
    }

    function btnAdd_onClick(event) {
        var addDialog = unieap.byId("addXdialog");
        addDialog.show();
    }

    function btnEdit_onClick(event) {
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

    function btnLoc_onClick(event) {
        changeLockedStatus('1');

    }

    function btnUnLoc_onClick(event) {
        changeLockedStatus('0');
    }

    function btnEnab_onClick(event) {
        changeEnabledStatus('1');
    }

    function btnUnEnab_onClick(event) {
        changeEnabledStatus('0');
    }

    function btnDownTempl_onClick(event) {
        window.location.href = unieap.WEB_APP_NAME + '/fdframework/common/pages/downLoad.jsp?url=/fdframework/security/user/template/userInfoTemplate.xls&type=export';
        return;
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getSysSecUserPage', 'serverExport');
        //发送请求
        view.processor.getSysSecUserPage(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function cell_name_formatter(inValue, inRowIndex) {
        return "<a href='#' onClick = 'sysSecUser.linkAction(" + inRowIndex + ")' >" + inValue + "</a>";
    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getSysSecUserPage(conditionDS, store.getPageNumber(), store.getPageSize());

    }

    function addXdialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getSysSecUserPage(conditionDS, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        view.processor.getSysSecUserPage(conditionDS, 1, 10);
    }

    var view = new _security.user.sysSecUser.View();
    view.init();

    return view;
})