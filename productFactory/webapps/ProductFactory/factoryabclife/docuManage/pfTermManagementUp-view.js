/**
 * 条案上传
 * @author Neusoft
 * @creationTime 2016-10-18 16:00:59
 * @modificationTime 2016-10-28 09:41:53
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfTermManagementUp", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.docuManage.pfTermManagementUp.View", unieap.view.View, {



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
                button1_onClick: button1_onClick
            });

            this.processor = new _factoryabclife.docuManage.pfTermManagementUp.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_up')) {
                var tInsurtypeBasicInf_up = new unieap.ds.DataStore('tInsurtypeBasicInf_up');
                tInsurtypeBasicInf_up.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_up);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

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
        var info = dc.getParameter("uploadInfo");
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

    function button1_onClick(event) {

        var tInsurtypeBasicInf = unieap.getXDialog().dialogData.gridDS;
        //unieap.debug(tInsurtypeBasicInf);
        view.processor.saveUploadInfo("upform", tInsurtypeBasicInf);
    }

    var view = new _factoryabclife.docuManage.pfTermManagementUp.View();
    view.init();

    return view;
})