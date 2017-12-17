/**
 *
 * @author Administrator
 * @creationTime 2016-07-20 10:40:55
 * @modificationTime 2016-09-28 16:01:36
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAmntDialog", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskAmntDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllRiskAmntTypeSuccess: getAllRiskAmntTypeSuccess,
                addTObjFormulaSuccess: addTObjFormulaSuccess,
                form_riskamnt_save_saveButton_onClick: form_riskamnt_save_saveButton_onClick
            });

            this.processor = new _factoryabclife.risk.pfRiskAmntDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjFormula_riskamnt_save')) {
                var tObjFormula_riskamnt_save = new unieap.ds.DataStore('tObjFormula_riskamnt_save');
                tObjFormula_riskamnt_save.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_riskamnt_save);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form_riskamnt_save_saveButton"), "onClick", this.form_riskamnt_save_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getAllRiskAmntType();
            var data = unieap.getXDialog().dialogData;

            var riskamnt = view.form.getDataStore("form_riskamnt_save");

            riskamnt.rowSet.primary[0].objId = data.pricingLiabId;

        }


    });
    /**
     * @description:getAllRiskAmntType方法的成功回调。
     *
     */

    function getAllRiskAmntTypeSuccess(dc) {
        unieap.byId("type").getDataProvider().setDataStore(dc.getDataStore("getAllRiskAmntType"));
    }
    /**
     * @description:addTObjFormula方法的成功回调。
     *
     */

    function addTObjFormulaSuccess(dc) {
        var info = dc.getParameter("addTObjFormula");
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

    function form_riskamnt_save_saveButton_onClick(event) {
        if (!unieap.byId("form_riskamnt_save").validate(false)) {
            return;
        }
        var type = unieap.byId("type").getValue();
        //if(""==type||null==type){
        //MessageBox.autoCloseAlert({
        //	title:"提示",
        //	message:"下拉框不能空"
        //});
        //return;
        //}

        var riskamnt = view.form.getDataStore("form_riskamnt_save");
        riskamnt.rowSet.primary[0].type = type;
        view.processor.addTObjFormula(riskamnt);
    }

    var view = new _factoryabclife.risk.pfRiskAmntDialog.View();
    view.init();

    return view;
})