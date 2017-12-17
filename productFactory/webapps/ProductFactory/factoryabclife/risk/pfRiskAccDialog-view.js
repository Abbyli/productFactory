/**
 * 账户定义弹窗
 * @author shichl
 * @creationTime 2016-06-23 15:02:29
 * @modificationTime 2017-03-16 14:50:13
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAccDialog", function () {

    var basic = null;

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskAccDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPfInsurtypeAccDefSuccess: addPfInsurtypeAccDefSuccess,
                querySuccess: querySuccess,
                insurtypeAccType_onChange: insurtypeAccType_onChange,
                form1_saveButton_onClick: form1_saveButton_onClick,
                basic: basic,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfRiskAccDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeRelToAcc_add')) {
                var tInsurtypeRelToAcc_add = new unieap.ds.DataStore('tInsurtypeRelToAcc_add');
                tInsurtypeRelToAcc_add.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeRelToAcc");

                dataCenter.addDataStore(tInsurtypeRelToAcc_add);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_needid')) {
                var tInsurtypeBasicInf_needid = new unieap.ds.DataStore('tInsurtypeBasicInf_needid');
                tInsurtypeBasicInf_needid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_needid);
            }

            if (!dataCenter.getDataStore('tInsurtypeAccDef_dialog')) {
                var tInsurtypeAccDef_dialog = new unieap.ds.DataStore('tInsurtypeAccDef_dialog');
                tInsurtypeAccDef_dialog.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef");

                dataCenter.addDataStore(tInsurtypeAccDef_dialog);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeAccType"), "onChange", this.insurtypeAccType_onChange);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;

            basic = datas.basicinf;
            opt = datas.opt;
            if (opt == "update") {
                unieap.byId("insurtypeAccType").setDisabled(true);
                var type = datas.acc.rowSet.primary[0].insurtypeAccType;
                unieap.byId("insurtypeAccType").onChange(type);
                view.form.setDataStore("form1", datas.acc);
            }
        },
        page_init: function () {
            var datas = unieap.getXDialog().dialogData;
            var dc = datas.dc;
            dataCenter.append(dc);


            var ds = new unieap.ds.DataStore("ds_settle_timepoint", [{
                CODEVALUE: "1",
                CODENAME: "每月一日"
            }, {
                CODEVALUE: "2",
                CODENAME: "保单周年日"
            }]);

            var ds2 = new unieap.ds.DataStore("ds_settle_type", [{
                CODEVALUE: "1",
                CODENAME: "结算后计入本金"
            }, {
                CODEVALUE: "2",
                CODENAME: "结算后不计入本金"
            }]);

            var ds3 = new unieap.ds.DataStore("ds_is_provision", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
        }

    });
    /**
     * @description:addPfInsurtypeAccDef方法的成功回调。
     *
     */

    function addPfInsurtypeAccDefSuccess(dc) {
        var info = dc.getParameter("addinsurtypeaccdef");
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
    /**
     * @description:query方法的成功回调。
     *
     */

    function querySuccess(dc) {
        view.form.setDataStore("form1", dc.getDataStore("queryTInsurtypeAccDefByType"));
    }

    function insurtypeAccType_onChange(value) {
        if (value == "002") {
            unieap.byId("accrualMethod").setDisabled(false);
            unieap.byId("accrualType").setDisabled(false);
            unieap.byId("insurtypeAccName").setReadOnly(false);
            unieap.byId("settleCyc").setReadOnly(false);
            unieap.byId("settleTimepoint").setDisabled(false);
            unieap.byId("settleType").setDisabled(false);
            var code = basic.rowSet.primary[0].insurtypeCode;
            unieap.byId("insurtypeAccCode").setValue(code + "01");
            unieap.byId("accrualMethod").setValue("");
            unieap.byId("accrualType").setValue("");
            unieap.byId("insurtypeAccName").setValue("");
            unieap.byId("settleCyc").setValue("");
            unieap.byId("settleTimepoint").setValue("");
            unieap.byId("settleType").setValue("");
        }
        else if (value == "004" || value == "005") {
            view.processor.query(value);

            unieap.byId("accrualMethod").setDisabled(true);
            unieap.byId("accrualType").setDisabled(true);
            unieap.byId("insurtypeAccName").setReadOnly(true);
            unieap.byId("settleCyc").setReadOnly(true);
            unieap.byId("settleTimepoint").setDisabled(true);
            unieap.byId("settleType").setDisabled(true);


        }
    }

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }

        //if(unieap.byId("form1").isModified()){
        //	return;
        //}
        var conditionDs = view.form.getDataStore('form1');
        view.processor.addPfInsurtypeAccDef(basic, conditionDs, opt);
    }

    var view = new _factoryabclife.risk.pfRiskAccDialog.View();
    view.init();

    return view;
})