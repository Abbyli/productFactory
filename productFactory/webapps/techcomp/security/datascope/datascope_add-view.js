/**
 *
 * @author user
 * @creationTime 2014-07-03 18:41:37
 * @modificationTime 2014-11-14 14:22:06
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("datascope_add", function () {

    var params_store1;

    var params_rowSet;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascope.datascope_add.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveSuccess: saveSuccess,
                getSourceListSuccess: getSourceListSuccess,
                btnAddPara_onClick: btnAddPara_onClick,
                btnDelPara_onClick: btnDelPara_onClick,
                btnClearPara_onClick: btnClearPara_onClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                params_store1: params_store1,
                params_rowSet: params_rowSet
            });

            this.processor = new _security.datascope.datascope_add.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataScope')) {
                var sysSecDataScope = new unieap.ds.DataStore('sysSecDataScope');
                sysSecDataScope.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");

                dataCenter.addDataStore(sysSecDataScope);
            }

            if (!dataCenter.getDataStore('sysSecDataScopeParams')) {
                var sysSecDataScopeParams = new unieap.ds.DataStore('sysSecDataScopeParams');
                sysSecDataScopeParams.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeParams");

                dataCenter.addDataStore(sysSecDataScopeParams);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btnAddPara"), "onClick", this.btnAddPara_onClick);

            this.connect(unieap.byId("btnDelPara"), "onClick", this.btnDelPara_onClick);

            this.connect(unieap.byId("btnClearPara"), "onClick", this.btnClearPara_onClick);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getSourceList();
            params_rowSet = new unieap.ds.RowSet();
            params_store1 = new unieap.ds.DataStore('com.neusoft.fdframework.security.entity.SysSecDataScopeParams');
            params_store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScopeParams");
        }


    });
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        unieap.getXDialog().close();
        MessageBox.alert({
            title: '提示信息',
            message: '保存成功！'
        });
    }
    /**
     * @description:getSourceList方法的成功回调。
     *
     */

    function getSourceListSuccess(dc) {
        var result = dataCenter.getDataStore('dataSource');
        dataCenter.addDataStore("dataSourceDS", result);
        //unieap.byId("dataSource").setValue("232cb21e2d1e4dff9b8def2968032316");			
    }

    function btnAddPara_onClick(event) {
        var datascope_param = unieap.byId("param").getValue();
        if (datascope_param == "") {
            return;
        }
        var data = {
            id: '',
            code: datascope_param,
            orderNum: '',
            dataScopeId: ''
        };
        params_rowSet.addRows(data);
        params_store1.setRowSet(params_rowSet);
        view.grid.setDataStore("grid1", params_store1);

    }

    function btnDelPara_onClick(event) {
        params_rowSet.deleteSelectedRows();
        params_store1.setRowSet(params_rowSet);
        view.grid.setDataStore("grid1", params_store1);


    }

    function btnClearPara_onClick(event) {
        unieap.byId("param").reset();
        params_rowSet.reset();
        params_store1.setRowSet(params_rowSet);
        view.grid.setDataStore("grid1", params_store1);

    }

    function form1_saveButton_onClick(event) {

        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }

        var xDlgdata = unieap.getXDialog().dialogData;
        var conditionDs = view.form.getDataStore('form1');
        var data = {
            name: conditionDs.getRowSet().getItemValue(0, 'name'),
            sql: conditionDs.getRowSet().getItemValue(0, "sql"),
            description: conditionDs.getRowSet().getItemValue(0, "description"),
            dataScopeTypeId: xDlgdata.id,
            dataSourceId: conditionDs.getRowSet().getItemValue(0, 'dataSource'),
            appId: xDlgdata.appId
        }

        var rowSet = new unieap.ds.RowSet();
        rowSet.addRows(data);
        var store1 = new unieap.ds.DataStore();
        store1.setRowSet(rowSet);
        store1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataScope");
        view.processor.save(store1, params_store1);

    }

    function form1_resetButton_onClick(event) {
        unieap.getXDialog().close();
    }

    var view = new _security.datascope.datascope_add.View();
    view.init();

    return view;
})