/**
 *
 * @author dongyw
 * @creationTime 2014-07-02 16:11:29
 * @modificationTime 2014-09-23 10:15:14
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecDataSource", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datasource.sysSecDataSource.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getDataSourcePageSuccess: getDataSourcePageSuccess,
                delDataSourceSuccess: delDataSourceSuccess,
                linkAction: linkAction,
                btnAdd_onClick: btnAdd_onClick,
                btnEdit_onClick: btnEdit_onClick,
                btnDel_onClick: btnDel_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                cell_name_formatter: cell_name_formatter,
                grid1_binding_rpc: grid1_binding_rpc,
                addXDialog_onComplete: addXDialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete
            });

            this.processor = new _security.datasource.sysSecDataSource.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataSource')) {
                var sysSecDataSource = new unieap.ds.DataStore('sysSecDataSource');
                sysSecDataSource.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataSource");

                dataCenter.addDataStore(sysSecDataSource);
            }

            if (!dataCenter.getDataStore('sysSecDataSource1')) {
                var sysSecDataSource1 = new unieap.ds.DataStore('sysSecDataSource1');
                sysSecDataSource1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataSource");

                dataCenter.addDataStore(sysSecDataSource1);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("btnEdit"), "onClick", this.btnEdit_onClick);

            this.connect(unieap.byId("btnDel"), "onClick", this.btnDel_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

            this.connect(unieap.byId("addXDialog"), "onComplete", this.addXDialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            //发送请求
            view.processor.getDataSourcePage(conditionDS, 1, 10);
        }


    });
    /**
     * @description:getDataSourcePage方法的成功回调。
     *
     */

    function getDataSourcePageSuccess(dc) {
        var result = dc.getDataStore('dataSource');

        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:delDataSource方法的成功回调。
     *
     */

    function delDataSourceSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '操作成功！',
            onComplete: function () {
                var conditionDS = view.form.getDataStore('form1');
                view.processor.getDataSourcePage(conditionDS, 1, 10);
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
        unieap.byId("addXDialog").show();
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

    function btnDel_onClick(event) {
        var grid = unieap.byId("grid1");
        var rows = grid.getManager('SelectionManager').getSelectedRows();

        if (rows.length > 0) {
            //			MessageBox.confirm({
            //                onComplete: confirmReturn,
            //                //关闭右上角的"X"按钮时执行onComplete函数
            //                iconCloseComplete: true
            //            }, dojo.byId("btnDel"));

            var data = view.grid.getRows("grid1");
            view.processor.delDataSource(data, 'y');
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '请选择记录！'
            });
            return;
        }
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getDataSourcePage', 'serverExport');
        //发送请求
        view.processor.getDataSourcePage(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
    }

    function cell_name_formatter(inValue, inRowIndex) {
        return "<a href='#' onclick = 'sysSecDataSource.linkAction(" + inRowIndex + ")' >" + inValue + "</a>";
    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getDataSourcePage(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    function addXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getDataSourcePage(conditionDS, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getDataSourcePage(conditionDS, 1, 10);
    }

    var view = new _security.datasource.sysSecDataSource.View();
    view.init();

    return view;
})