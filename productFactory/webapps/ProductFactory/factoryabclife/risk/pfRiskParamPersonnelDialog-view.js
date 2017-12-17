/**
 * 人员定义弹窗
 * @author zhy
 * @creationTime 2016-07-15 13:50:31
 * @modificationTime 2016-09-28 16:49:07
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskParamPersonnelDialog", function () {

    var opt = "";

    var original = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskParamPersonnelDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                savePersonnelSuccess: savePersonnelSuccess,
                form_personnel_saveButton_onClick: form_personnel_saveButton_onClick,
                opt: opt,
                original: original
            });

            this.processor = new _factoryabclife.risk.pfRiskParamPersonnelDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeCustElemCtrl_addPersonnel')) {
                var tInsurtypeCustElemCtrl_addPersonnel = new unieap.ds.DataStore('tInsurtypeCustElemCtrl_addPersonnel');
                tInsurtypeCustElemCtrl_addPersonnel.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeCustElemCtrl");

                dataCenter.addDataStore(tInsurtypeCustElemCtrl_addPersonnel);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form_personnel_saveButton"), "onClick", this.form_personnel_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;

            if (opt == "update") {
                original = (datas.live).rowSet.primary[0].psnnlType;
                view.form.setDataStore("form_personnel", datas.live);
            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_pelType", [{
                CODEVALUE: "00",
                CODENAME: "投保人"
            }, {
                CODEVALUE: "01",
                CODENAME: "被保人"
            }, {
                CODEVALUE: "02",
                CODENAME: "受益人"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_pelSex", [{
                CODEVALUE: "0",
                CODENAME: "男"
            }, {
                CODEVALUE: "1",
                CODENAME: "女"
            }, {
                CODEVALUE: "2",
                CODENAME: "不限"
            }]);
            var ds2 = new unieap.ds.DataStore("ds_pelUnit", [{
                CODEVALUE: "A",
                CODENAME: "岁"
            }, {
                CODEVALUE: "D",
                CODENAME: "天"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
        }

    });
    /**
     * @description:savePersonnel方法的成功回调。
     *
     */

    function savePersonnelSuccess(dc) {
        var info = dc.getParameter("savePersonnelResult");
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

    function form_personnel_saveButton_onClick(event) {
        if (!unieap.byId("form_personnel").validate(false)) {
            return;
        }

        var datas = unieap.getXDialog().dialogData;
        var entityId = datas.entityId.rowSet.primary[0].insurtypeId;
        var personnel = view.form.getDataStore('form_personnel');
        var entity = personnel.rowSet.primary[0];
        entity.insurtypeId = entityId;
        if (entity.applyMinAgeUnit == "A" && (entity.applyMinAge > 100 || entity.applyMaxAge > 100)) {
            MessageBox.alert({
                title: '提示',
                message: "年龄不能大于100岁"
            });
            return;
        }
        if (entity.applyMinAgeUnit == "D" && (entity.applyMinAge > 365 || entity.applyMaxAge > 365)) {
            MessageBox.alert({
                title: '提示',
                message: "出生天数必须小于365天"
            });
            return;
        }
        if (entity.applyMinAgeUnit == "A") {
            var min = entity.applyMinAge * 365;
        }
        else {
            var min = entity.applyMinAge;
        }
        if (entity.applyMaxAgeUnit == "A") {
            var max = entity.applyMaxAge * 365;
        }
        else {
            var max = entity.applyMaxAge;
        }
        if (max < min) {
            MessageBox.alert({
                title: '提示',
                message: "最大年龄必须大于最小年龄"
            });
            return;
        }
        if (original == entity.psnnlType) {
            opt = "original";
        }
        view.processor.savePersonnel(personnel, opt);
    }

    var view = new _factoryabclife.risk.pfRiskParamPersonnelDialog.View();
    view.init();

    return view;
})