/**
 * 新增产品及管理
 * @author Neusoft
 * @creationTime 2017-03-03 10:26:50
 * @modificationTime 2017-03-17 14:31:48
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfMarketManageDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfMarketManageDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTInsurtypeBasicInfSuccess: queryTInsurtypeBasicInfSuccess,
                addTProductSaleChnlSuccess: addTProductSaleChnlSuccess,
                productCode_onChange: productCode_onChange,
                saveButton_onClick: saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfMarketManageDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('form_tProductSaleChnl')) {
                var form_tProductSaleChnl = new unieap.ds.DataStore('form_tProductSaleChnl');
                form_tProductSaleChnl.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductSaleChnl");

                dataCenter.addDataStore(form_tProductSaleChnl);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("productCode"), "onChange", this.productCode_onChange);

            this.connect(unieap.byId("saveButton"), "onClick", this.saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            view.processor.queryTInsurtypeBasicInf();
            opt = datas.opt;

        },
        page_init: function () {
            var ds1 = new unieap.ds.DataStore("saleChnl", [{
                CODENAME: "个险",
                CODEVALUE: "01"
            }, {
                CODENAME: "银代",
                CODEVALUE: "03"
            }, {
                CODENAME: "电销",
                CODEVALUE: "05"
            }, {
                CODENAME: "网销",
                CODEVALUE: "06"
            }, {
                CODENAME: "中介",
                CODEVALUE: "07"
            }, {
                CODENAME: "财富",
                CODEVALUE: "08"
            }, {
                CODENAME: "税优",
                CODEVALUE: "09"
            }])
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:getTUnivrslShare方法的成功回调。
     *
     */

    function queryTInsurtypeBasicInfSuccess(dc) {
        var result = dc.getDataStore("reTInsurtypeBasicInf");
        for (var i = 0; i < result.getRowSet().getRowCount(); i++) {
            result.rowSet.primary[i].insurtypeName = result.rowSet.primary[i].insurtypeCode + "-" + result.rowSet.primary[i].insurtypeName;
        }
        unieap.byId("productCode").getDataProvider().setDataStore(result);
    }
    /**
     * @description:addTProductSaleChnl方法的成功回调。
     *
     */

    function addTProductSaleChnlSuccess(dc) {
        var info = dc.getParameter("reAddTProductSaleChnl");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }

    function productCode_onChange(value) {
        var result = unieap.byId("productCode").getDataProvider().getDataStore();
        var productVer;
        for (var i = 0; i < result.getRowSet().getRowCount(); i++) {
            if (result.rowSet.primary[i].insurtypeCode == unieap.byId("productCode").getValue()) {
                productVer = result.rowSet.primary[i].verNo;
            }
        }
        unieap.byId("productVer").setValue(productVer);
        if (opt == "add") {
            unieap.byId("productVer").setReadOnly(true);
        }
    }

    function saveButton_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }
        var saleMngcom = unieap.byId("saleMngcom").getValue();
        if (saleMngcom != null && saleMngcom != "") {
            if (saleMngcom.substr(0, 2) != "86") {
                MessageBox.alert({
                    title: '提示',
                    message: "请输入正确的销售机构！"
                });
                return;
            }
        }
        view.processor.addTProductSaleChnl(view.form.getDataStore('form1'), opt);
    }

    var view = new _factoryabclife.risk.pfMarketManageDialog.View();
    view.init();

    return view;
})