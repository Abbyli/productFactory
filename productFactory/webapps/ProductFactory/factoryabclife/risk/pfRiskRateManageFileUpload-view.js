/**
 * 精算数据
 * @author Administrator
 * @creationTime 2016-07-12 10:13:22
 * @modificationTime 2016-09-30 14:17:52
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskRateManageFileUpload", function () {

    var tObjRate = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskRateManageFileUpload.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getPfInsurtypePrestSuccess: getPfInsurtypePrestSuccess,
                queryRiskRateByIdSuccess: queryRiskRateByIdSuccess,
                del: del,
                delRiskRateSuccess: delRiskRateSuccess,
                saveUploadInfoSuccess: saveUploadInfoSuccess,
                btn_upload_onClick: btn_upload_onClick,
                tObjRate: tObjRate
            });

            this.processor = new _factoryabclife.risk.pfRiskRateManageFileUpload.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjRate_submit')) {
                var tObjRate_submit = new unieap.ds.DataStore('tObjRate_submit');
                tObjRate_submit.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRate");

                dataCenter.addDataStore(tObjRate_submit);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("btn_upload"), "onClick", this.btn_upload_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            tObjRate = datas.selectRow;

        }


    });
    /**
     * @description:getPfInsurtypePrest方法的成功回调。
     *
     */

    function getPfInsurtypePrestSuccess(dc) {
        var ds = dc.getDataStore("insurtyprestduty");
        unieap.byId("pricingLiabCode__pricingliab").getDataProvider().setDataStore(ds);
    }
    /**
     * @description:queryRiskRateById方法的成功回调。
     *
     */

    function queryRiskRateByIdSuccess(dc) {
        var ds = dc.getDataStore("rtnRiskRates");
        view.grid.setDataStore("grid_objRate", ds);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(rowIndex) {
        var selectRow = view.grid.getRow("grid_objRate", rowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    view.processor.delRiskRate(selectRow);
                }
            }
        });
    }
    /**
     * @description:delRiskRate方法的成功回调。
     *
     */

    function delRiskRateSuccess(dc) {
        var insurtypeCode = unieap.byId("insurtypeCode").getValue();
        var verNo = unieap.byId("verNo").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode__pricingliab").getText();

        view.processor.queryRiskRateById(insurtypeCode, verNo, pricingLiabCode);
    }
    /**
     * @description:saveUploadInfo方法的成功回调。
     *
     */

    function saveUploadInfoSuccess(dc) {
        if (dc.getParameter("SYS_ASYNC_TAG") == '99') {
            MessageBox.autoCloseAlert({
                title: RIA_I18N.rpc.success,
                durationTime: 2000,
                message: "任务已经转为异步处理，稍后请上任务处理队列中查看结果。",
                onComplete: function () {
                    unieap.getXDialog().close(false);
                }
            });
        }
    }

    function btn_upload_onClick(event) {
        view.processor.saveUploadInfo("form_upload", tObjRate);
    }

    var view = new _factoryabclife.risk.pfRiskRateManageFileUpload.View();
    view.init();

    return view;
})