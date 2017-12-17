/**
 *
 * @author Administrator
 * @creationTime 2016-08-25 11:24:42
 * @modificationTime 2017-01-19 11:00:02
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskLiabLimitDialog2", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskLiabLimitDialog2.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                saveSuccess: saveSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskLiabLimitDialog2.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tLiabLimit_form_limit')) {
                var tLiabLimit_form_limit = new unieap.ds.DataStore('tLiabLimit_form_limit');
                tLiabLimit_form_limit.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabLimit");

                dataCenter.addDataStore(tLiabLimit_form_limit);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;

            view.form.setDataStore("form1", datas.ds_limit);
            if (datas.ds_limit.rowSet.primary[0].limitType == "03") {
                unieap.getElementById("limitValue_label").innerText = "次数："
            }
            else {
                var ds = dataCenter.getDataStore("ds_limit_time");
                ds.getRowSet().addRow({
                    CODENAME: "单次赔付",
                    CODEVALUE: "03"
                });
            }

        },
        page_init: function () {
            var ds = unieap.ds.DataStore("ds_limit_time", [{
                CODENAME: "保险期间内",
                CODEVALUE: "02"
            }, {
                CODENAME: "单个保单年度内",
                CODEVALUE: "01"
            }]);

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        var info = dc.getParameter("saveLiabLimit");
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


        var limit = view.form.getDataStore("form1");
        view.processor.save(limit);
    }

    var view = new _factoryabclife.risk.pfRiskLiabLimitDialog2.View();
    view.init();

    return view;
})