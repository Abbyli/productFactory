/**
 *
 * @author Administrator
 * @creationTime 2016-07-28 15:20:04
 * @modificationTime 2016-09-28 16:59:34
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestAccDetailDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestAccDetailDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveAccDetailSuccess: saveAccDetailSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskPrestAccDetailDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tClaimPayItemDetail_accdetail_dialog')) {
                var tClaimPayItemDetail_accdetail_dialog = new unieap.ds.DataStore('tClaimPayItemDetail_accdetail_dialog');
                tClaimPayItemDetail_accdetail_dialog.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail");

                dataCenter.addDataStore(tClaimPayItemDetail_accdetail_dialog);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            if (datas.opt == "update") {
                view.form.setDataStore("form1", datas.row);
            }
        },
        page_init: function () {
            var datas = unieap.getXDialog().dialogData;
            var dc = datas.dc;
            dataCenter.append(dc);
        }

    });
    /**
     * @description:saveAccDetail方法的成功回调。
     *
     */

    function saveAccDetailSuccess(dc) {
        var info = dc.getParameter("saveAccDetail");
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

    function form1_saveButton_onClick(event) {
        if (!unieap.byId("form1").validate(false)) {
            return;
        }



        var accDetail = view.form.getDataStore("form1");
        var datas = unieap.getXDialog().dialogData;
        var claim = datas.claim;
        accDetail.rowSet.primary[0].claimGivepayId = claim.rowSet.primary[0].claimGivepayId;
        var reason = claim.rowSet.primary[0].accidOccurReason;
        if (reason == "1" || reason == "2") {
            accDetail.rowSet.primary[0].claimType = reason + claim.rowSet.primary[0].claimClaimPayType;
        }



        view.processor.saveAccDetail(accDetail, datas.opt)
    }

    var view = new _factoryabclife.risk.pfRiskPrestAccDetailDialog.View();
    view.init();

    return view;
})