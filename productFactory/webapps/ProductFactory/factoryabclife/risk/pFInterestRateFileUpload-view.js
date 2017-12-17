/**
 * 法定准备金因子上传
 * @author Administrator
 * @creationTime 2016-07-12 10:13:22
 * @modificationTime 2017-01-16 15:42:40
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pFInterestRateFileUpload", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pFInterestRateFileUpload.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveUploadInfoSuccess: saveUploadInfoSuccess,
                btn_upload_onClick: btn_upload_onClick
            });

            this.processor = new _factoryabclife.risk.pFInterestRateFileUpload.Processor(this);

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


        }


    });
    /**
     * @description:saveUploadInfo方法的成功回调。
     *
     */

    function saveUploadInfoSuccess(dc) {
        var info = dc.getParameter("reSaveUploadInfo");
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

    function btn_upload_onClick(event) {
        var obj = unieap.getXDialog().dialogData.obj;
        view.processor.saveUploadInfo("form_upload", obj);
    }

    var view = new _factoryabclife.risk.pFInterestRateFileUpload.View();
    view.init();

    return view;
})