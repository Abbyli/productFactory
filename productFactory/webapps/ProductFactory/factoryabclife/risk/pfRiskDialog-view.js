/**
 * 个险险种定义 编辑窗口
 * @author think
 * @creationTime 2016-06-23 11:34:10
 * @modificationTime 2016-10-14 15:34:03
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskDialog", function () {

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveRiskSuccess: saveRiskSuccess,
                queryRiskSuccess: queryRiskSuccess,
                insurtypeCode__riskD_onBlur: insurtypeCode__riskD_onBlur,
                form_riskD_saveButton_onClick: form_riskD_saveButton_onClick,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfRiskDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_formD')) {
                var tInsurtypeBasicInf_formD = new unieap.ds.DataStore('tInsurtypeBasicInf_formD');
                tInsurtypeBasicInf_formD.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_formD);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeCode__riskD"), "onBlur", this.insurtypeCode__riskD_onBlur);

            this.connect(unieap.byId("form_riskD_saveButton"), "onClick", this.form_riskD_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            if (opt == "upd") {
                var selectRow = datas.selectRow;
                view.form.setDataStore("form_riskD", selectRow);
                //设置只读
                unieap.byId("insurtypeCode__riskD").setReadOnly(true);
                unieap.byId("verNo__riskD").setReadOnly(true);
            }
        }


    });
    /**
     * @description:saveRisk方法的成功回调。
     *
     */

    function saveRiskSuccess(dc) {
        var info = dc.getParameter("rtnMessage");
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
     * @description:queryRisk方法的成功回调。
     *
     */

    function queryRiskSuccess(dc) {
        var result = dc.getDataStore("queryRiskResult");
        var count = result.getRowSet().getRowCount()
        if (count > 0) {
            unieap.byId("insurtypeName__riskD").setValue(result.rowSet.primary[0].insurtypeName);
            unieap.byId("insurtypeAbbr__riskD").setValue(result.rowSet.primary[0].insurtypeAbbr);
            unieap.byId("insurtypeEngName__riskD").setValue(result.rowSet.primary[0].insurtypeEngName);
            unieap.byId("insurtypeEngAbbr__riskD").setValue(result.rowSet.primary[0].insurtypeEngAbbr);
            unieap.byId("verNo__riskD").setValue(result.rowSet.primary[0].verNo + 1);
        }
        else {
            unieap.byId("insurtypeName__riskD").setValue("");
            unieap.byId("insurtypeAbbr__riskD").setValue("");
            unieap.byId("insurtypeEngName__riskD").setValue("");
            unieap.byId("insurtypeEngAbbr__riskD").setValue("");
            unieap.byId("verNo__riskD").setValue("1");
        }
    }

    function insurtypeCode__riskD_onBlur(event) {
        var riskCode = view.form.getDataStore("form_riskD");
        view.processor.queryRisk(riskCode);
    }

    function form_riskD_saveButton_onClick(event) {
        if (!unieap.byId("form_riskD").validate(false)) {
            return;
        }
        var ds = view.form.getDataStore("form_riskD");
        //设置险种状态
        ds.getRowSet().getRow(0).setItemValue("insurtypeStatus", "1");
        view.processor.saveRisk(ds, opt);

    }

    var view = new _factoryabclife.risk.pfRiskDialog.View();
    view.init();

    return view;
})