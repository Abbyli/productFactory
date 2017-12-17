/**
 *
 * @author user
 * @creationTime 2014-07-04 10:17:05
 * @modificationTime 2014-11-14 14:19:49
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("datascop_edit", function () {

    var dataScopeId;

    var params_store1;

    var params_rowSet;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datascope.datascop_edit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                updateSuccess: updateSuccess,
                getSourceListSuccess: getSourceListSuccess,
                getParamsByDataScopeIdSuccess: getParamsByDataScopeIdSuccess,
                btnAddPara_onClick: btnAddPara_onClick,
                btnDelPara_onClick: btnDelPara_onClick,
                btnClearPara_onClick: btnClearPara_onClick,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                dataScopeId: dataScopeId,
                params_store1: params_store1,
                params_rowSet: params_rowSet
            });

            this.processor = new _security.datascope.datascop_edit.Processor(this);

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
                sysSecDataScopeParams.setRowSetName("SysSecDataScopeParams");

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
            var dialogData = unieap.getXDialog().dialogData;
            var dlgRowSet = dialogData.getRowSet();
            dataScopeId = dlgRowSet.getData()[0].id;
            view.form.setDataStore("form1", dialogData);
            view.processor.getParamsByDataScopeId(dataScopeId);
        }


    });
    /**
     * @description:update方法的成功回调。
     *
     */

    function updateSuccess(dc) {
        unieap.getXDialog().close();
        MessageBox.alert({
            title: '提示信息',
            message: '修改成功！'
        });
    }
    /**
     * @description:getSourceList方法的成功回调。
     *
     */

    function getSourceListSuccess(dc) {
        var result = dataCenter.getDataStore('dataSource');
        dataCenter.addDataStore("dataSourceDS", result);
    }
    /**
     * @description:getParamsByDataScopeId方法的成功回调。
     *
     */

    function getParamsByDataScopeIdSuccess(dc) {
        params_store1 = dc.getDataStore('dataScopeParams');
        params_rowSet = params_store1.getRowSet();
        view.grid.setDataStore("grid1", params_store1);
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
        unieap.debug(dlgRowSet);
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
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form1');
            view.processor.update(conditionDs, dataScopeId, params_store1);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        //var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        //formRowSet.discardUpdate(0);
        //formRowSet.resetUpdate();
        unieap.getXDialog().close();
    }

    var view = new _security.datascope.datascop_edit.View();
    view.init();

    return view;
})