/**
 * 保障责任弹窗
 * @author neusoft
 * @creationTime 2016-07-07 17:08:52
 * @modificationTime 2016-09-29 15:40:41
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPrestSuccess: addPrestSuccess,
                form_PrestDialog_saveButton_onClick: form_PrestDialog_saveButton_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskPrestDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tProtecLiabDef_PrestDialog')) {
                var tProtecLiabDef_PrestDialog = new unieap.ds.DataStore('tProtecLiabDef_PrestDialog');
                tProtecLiabDef_PrestDialog.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef_PrestDialog);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form_PrestDialog_saveButton"), "onClick", this.form_PrestDialog_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_type", [{
                CODEVALUE: "0",
                CODENAME: "生存"
            }, {
                CODEVALUE: "1",
                CODENAME: "理赔"
            }]);
            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:addPrest方法的成功回调。
     *
     */

    function addPrestSuccess(dc) {
        var info = dc.getParameter("addPrestResult");
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

    function form_PrestDialog_saveButton_onClick(event) {
        if (!unieap.byId("form_PrestDialog").validate(false)) {
            return;
        }
        var datas = unieap.getXDialog().dialogData;
        var prest = view.form.getDataStore("form_PrestDialog");
        prest.rowSet.primary[0].pricingLiabId = datas.priceDutyId;
        prest.rowSet.primary[0].pricingLiabCode = datas.priceDutyCode;
        view.processor.addPrest(prest);
    }

    var view = new _factoryabclife.risk.pfRiskPrestDialog.View();
    view.init();

    return view;
})