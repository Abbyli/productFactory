/**
 *
 * @author Administrator
 * @creationTime 2016-08-04 10:36:18
 * @modificationTime 2016-10-14 15:37:23
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskCopyDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskCopyDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                copySuccess: copySuccess,
                getCodeInsurSuccess: getCodeInsurSuccess,
                queryRiskSuccess: queryRiskSuccess,
                insurtypeCode_onBlur: insurtypeCode_onBlur,
                insurtypeCode2_onBlur: insurtypeCode2_onBlur,
                button1_onClick: button1_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskCopyDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_copyForm1')) {
                var tInsurtypeBasicInf_copyForm1 = new unieap.ds.DataStore('tInsurtypeBasicInf_copyForm1');
                tInsurtypeBasicInf_copyForm1.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_copyForm1);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_copyform2')) {
                var tInsurtypeBasicInf_copyform2 = new unieap.ds.DataStore('tInsurtypeBasicInf_copyform2');
                tInsurtypeBasicInf_copyform2.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_copyform2);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeCode"), "onBlur", this.insurtypeCode_onBlur);

            this.connect(unieap.byId("insurtypeCode2"), "onBlur", this.insurtypeCode2_onBlur);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        },
        page_init: function () {
            //窗口顶端空白
            var dialog = unieap.getXDialog();
            dialog.topNode.style.marginBottom = "0px";
        }

    });
    /**
     * @description:copy方法的成功回调。
     *
     */

    function copySuccess(dc) {
        MessageBox.autoCloseAlert({
            title: '提示',
            message: '保存成功！',
            onComplete: function () {
                unieap.getXDialog().close(true);
            }
        });
    }
    /**
     * @description:getCodeInsur方法的成功回调。
     *
     */

    function getCodeInsurSuccess(dc) {
        var result = dc.getDataStore("getCodeInsur");

        if (result.getRowSet().getRowCount() > 0) {
            unieap.byId("insurtypeName2").setValue(result.rowSet.primary[0].insurtypeName);
            unieap.byId("insurtypeAbbr2").setValue(result.rowSet.primary[0].insurtypeAbbr);
            unieap.byId("verNo2").getDataProvider().setDataStore(result);
            unieap.byId("verNo2").setValue(result.rowSet.primary[0].verNo);
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
            unieap.byId("insurtypeName").setValue(result.rowSet.primary[0].insurtypeName);
            unieap.byId("insurtypeAbbr").setValue(result.rowSet.primary[0].insurtypeAbbr);
            unieap.byId("insurtypeEngName").setValue(result.rowSet.primary[0].insurtypeEngName);
            unieap.byId("insurtypeEngAbbr").setValue(result.rowSet.primary[0].insurtypeEngAbbr);
            unieap.byId("verNo").setValue(result.rowSet.primary[0].verNo + 1);
        }
        else {
            unieap.byId("insurtypeName").setValue("");
            unieap.byId("insurtypeAbbr").setValue("");
            unieap.byId("insurtypeEngName").setValue("");
            unieap.byId("insurtypeEngAbbr").setValue("");
            unieap.byId("verNo").setValue("1");
        }
    }

    function insurtypeCode_onBlur(event) {
        var riskCode = view.form.getDataStore("form1");
        view.processor.queryRisk(riskCode);
    }

    function insurtypeCode2_onBlur(event) {
        var code = unieap.byId("insurtypeCode2").getValue();
        view.processor.getCodeInsur(code);
    }

    function button1_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }
        if (!unieap.byId("form2").validate(false)) {
            return;
        }


        var newInsur = view.form.getDataStore("form1");
        var code = unieap.byId("insurtypeCode2").getValue();
        var verNo = unieap.byId("verNo2").getText();
        view.processor.copy(newInsur, code, verNo);
    }

    var view = new _factoryabclife.risk.pfRiskCopyDialog.View();
    view.init();

    return view;
})