/**
 *
 * @author hanyongxu
 * @creationTime 2014-08-12 16:36:45
 * @modificationTime 2014-09-23 09:50:42
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecApplication", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.application.sysSecApplication.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getApplicationPageSuccess: getApplicationPageSuccess,
                changeEnabledStatusSuccess: changeEnabledStatusSuccess,
                changeEnableStatus: changeEnableStatus,
                addXDialog_onComplete: addXDialog_onComplete,
                editXDialog_onComplete: editXDialog_onComplete,
                btnAdd_onClick: btnAdd_onClick,
                btnEdit_onClick: btnEdit_onClick,
                btnEnab_onClick: btnEnab_onClick,
                btnUnEnab_onClick: btnUnEnab_onClick,
                grid1_queryButton_onClick: grid1_queryButton_onClick,
                grid1_resetButton_onClick: grid1_resetButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc
            });

            this.processor = new _security.application.sysSecApplication.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecApplication')) {
                var sysSecApplication = new unieap.ds.DataStore('sysSecApplication');
                sysSecApplication.setRowSetName("com.neusoft.fdframework.security.entity.SysSecApplication");

                dataCenter.addDataStore(sysSecApplication);
            }

            if (!dataCenter.getDataStore('sysSecApplication1')) {
                var sysSecApplication1 = new unieap.ds.DataStore('sysSecApplication1');
                sysSecApplication1.setRowSetName("com.neusoft.fdframework.security.entity.SysSecApplication");

                dataCenter.addDataStore(sysSecApplication1);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addXDialog"), "onComplete", this.addXDialog_onComplete);

            this.connect(unieap.byId("editXDialog"), "onComplete", this.editXDialog_onComplete);

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("btnEdit"), "onClick", this.btnEdit_onClick);

            this.connect(unieap.byId("btnEnab"), "onClick", this.btnEnab_onClick);

            this.connect(unieap.byId("btnUnEnab"), "onClick", this.btnUnEnab_onClick);

            this.connect(unieap.byId("grid1_queryButton"), "onClick", this.grid1_queryButton_onClick);

            this.connect(unieap.byId("grid1_resetButton"), "onClick", this.grid1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var conditionDS = view.form.getDataStore('form1');
            //发送请求
            view.processor.getApplicationPage(conditionDS, 1, 10);
        },
        page_init: function () {
            var isEnableDs = new unieap.ds.DataStore("isEnableDs", [{
                CODENAME: '启用',
                CODEVALUE: '1'
            }, {
                CODENAME: '停用',
                CODEVALUE: '0'
            }]);
            dataCenter.addDataStore("isEnableDs", isEnableDs);
        }

    });
    /**
     * @description:getApplicationPage方法的成功回调。
     *
     */

    function getApplicationPageSuccess(dc) {
        var result = dc.getDataStore('application');
        view.grid.setDataStore('grid1', result);
    }
    /**
     * @description:changeEnabledStatus方法的成功回调。
     *
     */

    function changeEnabledStatusSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                var conditionDs = view.form.getDataStore("form1");
                view.processor.getApplicationPage(conditionDs, 1, 10);
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

    function changeEnableStatus(isEnable) {
        var rowSet = unieap.byId("grid1").getManager("SelectionManager").getSelectedDataSet();
        var sltNum = rowSet.getRowCount();

        var sltDs = view.grid.getRows("grid1");

        if (sltNum == 0) {
            alert("请选择记录");
            return;
        }
        //判断选择记录是否为已经是要置成状态的记录
        if (sltNum == 1) {
            if (rowSet.getItemValue(0, "isEnabled") == isEnable) {
                alert("该记录已经是" + (isEnable == 1 ? "可用" : "不可用") + "状态");
                return;
            }
        }
        else {
            for (var i = 0; i < sltNum; i++) {
                if (rowSet.getItemValue(i, "isEnabled") == isEnable) {
                    alert("记录中已经存在" + (isEnable == 1 ? "可用" : "不可用") + "状态的记录");
                    return;
                }
            }
        }
        view.processor.changeEnabledStatus(sltDs, isEnable);
    }

    function addXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getApplicationPage(conditionDS, 1, 10);
    }

    function editXDialog_onComplete(returnObj) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getApplicationPage(conditionDS, 1, 10);
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

    function btnEnab_onClick(event) {
        changeEnableStatus('1');
    }

    function btnUnEnab_onClick(event) {
        changeEnableStatus('0');
    }

    function grid1_queryButton_onClick(event) {
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getApplicationPage', 'serverExport');
        //发送请求
        view.processor.getApplicationPage(conditionDS, 1, 10);
    }

    function grid1_resetButton_onClick(event) {
        unieap.byId('form1').clear();
        var form = unieap.byId('form1');
        if (form == null) {
            return;
        }
        var conditionDS = view.form.getDataStore('form1');
        dataCenter.addHeaderAttribute('getApplicationPage', 'serverExport');
        //发送请求
        view.processor.getApplicationPage(conditionDS, 1, 10);

        //var rows = unieap.byId("grid1").getManager("SelectionManager").getSelectedRows();
        //unieap.debug(rows);

        //for (var i = 0; i < rows.length; i++){
        //	var row = rows[i];
        //	
        //	//var index = row.getData["index"];
        //	var index = i ;
        //	unieap.debug(index);
        //	//alert(index) ;
        //	//var index = unieap.byId("grid1").getManager("RowManager").getCurrentRowIndex();
        //	var Ds = view.grid.getDataStore("grid1");
        //	var rowset = Ds.getRowSet();
        //	rowset.setRowSelected(index,false);
        //}


        //var dd = document.getElementsByTagName("input") ;
        //for (var i = dd.length - 1; i >= 0; i--){
        //	if (dd[i].type == "checkbox") { 
        //		dd[i].checked=false ;
        //	}
        //}





    }

    function grid1_binding_rpc(store, load) {
        var conditionDS = view.form.getDataStore('form1');
        //发送请求
        view.processor.getApplicationPage(conditionDS, store.getPageNumber(), store.getPageSize());
    }

    var view = new _security.application.sysSecApplication.View();
    view.init();

    return view;
})