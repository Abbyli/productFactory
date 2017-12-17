/**
 * 账户定义
 * @author shichl
 * @creationTime 2016-06-23 10:56:31
 * @modificationTime 2016-12-22 09:55:22
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAccInf", function () {

    var DC = new unieap.ds.DataCenter();
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskAccInf_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskAccInf.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                insurtypeAccDefQuerySuccess: insurtypeAccDefQuerySuccess,
                del: del,
                insurtypeAccDefdelSuccess: insurtypeAccDefdelSuccess,
                update: update,
                grid_insurtypeaccdef_binding_rpc: grid_insurtypeaccdef_binding_rpc,
                DC: DC
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfRiskAccInf.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_disable')) {
                var tInsurtypeBasicInf_disable = new unieap.ds.DataStore('tInsurtypeBasicInf_disable');
                tInsurtypeBasicInf_disable.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_disable);
            }

            if (!dataCenter.getDataStore('tInsurtypeAccDef_grid')) {
                var tInsurtypeAccDef_grid = new unieap.ds.DataStore('tInsurtypeAccDef_grid');
                tInsurtypeAccDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef");

                dataCenter.addDataStore(tInsurtypeAccDef_grid);
            }

            if (!dataCenter.getDataStore('tInsurtypeAccDef_from')) {
                var tInsurtypeAccDef_from = new unieap.ds.DataStore('tInsurtypeAccDef_from');
                tInsurtypeAccDef_from.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef");

                dataCenter.addDataStore(tInsurtypeAccDef_from);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种账户信息", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                //执行翻页方法
                view.processor.insurtypeAccDefQuery(tInsurtypeBasicInf, 1, 10);
                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("account");

            //view.navigator.onComplete("返回", function(dc){
            //	//view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
            //	
            //});

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_accrula_type", [{
                CODEVALUE: "1",
                CODENAME: "不计息"
            }, {
                CODEVALUE: "2",
                CODENAME: "活期(天单利)"
            }, {
                CODEVALUE: "3",
                CODENAME: "活期(天复利)"
            }, {
                CODEVALUE: "4",
                CODENAME: "1年定期"
            }, {
                CODEVALUE: "5",
                CODENAME: "1月定期"
            }, {
                CODEVALUE: "6",
                CODENAME: "6月定期"
            }]);


            var ds2 = new unieap.ds.DataStore("ds_type_ac", [{
                CODEVALUE: "002",
                CODENAME: "万能账户"
            }, {
                CODEVALUE: "004",
                CODENAME: "红利账户"
            }, {
                CODEVALUE: "005",
                CODENAME: "生存金账户"
            }]);

            var ds3 = new unieap.ds.DataStore("ds_accrula_method", [{
                CODEVALUE: "1",
                CODENAME: "积数计息法"
            }, {
                CODEVALUE: "2",
                CODENAME: "逐笔计息法"
            }]);

            var ds4 = new unieap.ds.DataStore("ds_settle_timepoint", [{
                CODEVALUE: "1",
                CODENAME: "每月一日"
            }, {
                CODEVALUE: "2",
                CODENAME: "保单周年日"
            }]);

            var ds5 = new unieap.ds.DataStore("ds_settle_type", [{
                CODEVALUE: "1",
                CODENAME: "结算后计入本金"
            }, {
                CODEVALUE: "2",
                CODENAME: "结算后不计入本金"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds2);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
            dataCenter.addDataStore(ds5);


        }

    });
    /**
     * @description:insurtypeAccDefQuery方法的成功回调。
     *
     */

    function insurtypeAccDefQuerySuccess(dc) {
        var result = dc.getDataStore("insurtypeaccdefs");
        view.grid.setDataStore("grid_insurtypeaccdef", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_insurtypeaccdef", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        var basic = view.form.getDataStore("form_insurtypebasicinf");
                        view.processor.insurtypeAccDefdel(basic, data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:insurtypeAccDefdel方法的成功回调。
     *
     */

    function insurtypeAccDefdelSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示框",
            message: "删除成功"
        });
        view.processor.insurtypeAccDefQuery(view.form.getDataStore("form_insurtypebasicinf"), 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = view.grid.getRow("grid_insurtypeaccdef", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("updateDialog");
                var basic = view.form.getDataStore("form_insurtypebasicinf");
                dialog.dialogData = {
                    "basicinf": basic,
                    "opt": "update",
                    "acc": row,
                    "dc": DC
                };
                dialog.show();
            }
        }
    }

    function grid_insurtypeaccdef_binding_rpc(store, load) {
        view.processor.insurtypeAccDefQuery(dataCenter.getDataStore("tInsurtypeBasicInf"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.riskInformation.pfRiskAccInf.View();
    view.init();

    return view;
})