/**
 * 参数定义弹窗
 * @author neusoft
 * @creationTime 2016-06-27 10:57:25
 * @modificationTime 2016-09-28 16:50:10
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskParamDialog", function () {

    var paramType = "";

    var asch = "";

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskParamDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addparamSuccess: addparamSuccess,
                addInsurParamSuccess: addInsurParamSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                paramType: paramType,
                asch: asch,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfRiskParamDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tProductParamDef')) {
                var tProductParamDef = new unieap.ds.DataStore('tProductParamDef');
                tProductParamDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductParamDef");

                dataCenter.addDataStore(tProductParamDef);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            prestLive = datas.prestLive;
            opt = datas.opt;

            if (opt == "update") {
                view.form.setDataStore("form1", datas.live);
            }
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_type", [{
                CODEVALUE: "Y",
                CODENAME: "年"
            }, {
                CODEVALUE: "A",
                CODENAME: "岁"
            }]);
            dataCenter.addDataStore(ds);


        }

    });
    /**
     * @description:addparam方法的成功回调。
     *
     */

    function addparamSuccess(dc) {
        var info = dc.getParameter("addPfRiskParamDef");
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
     * @description:addInsurParam方法的成功回调。
     *
     */

    function addInsurParamSuccess(dc) {
        var info = dc.getParameter("addPfRiskParamDef");
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
        var datas = unieap.getXDialog().dialogData;

        var paramType = datas.paramType;
        var asch = datas.asch;
        var entityId = datas.entityId.rowSet.primary[0].insurtypeId;
        var conditionDs = view.form.getDataStore('form1');
        //超过100年校验
        var paramVal = conditionDs.rowSet.primary[0].paramVal;
        var paramUnit = conditionDs.rowSet.primary[0].paramUnit;
        var year = /^([1-9][0-9]|[1-9]|100)$/;
        var age = /^([1-9][0-9]|[1-9]|[1][0][0,6])$/;
        if ((paramUnit == "Y" && paramType == "01" && year.test(paramVal)) ||
            (paramUnit == "Y" && paramType == "02" && year.test(paramVal)) ||
            (paramUnit == "A" && age.test(paramVal)) ||
            (paramType == "01" && paramUnit == "Y" && paramVal == "1000")) {
            var entity = conditionDs.rowSet.primary[0];
            entity.paramType = paramType;
            entity.ascribHierar = asch;
            entity.entityId = entityId;
            entity.paramDesc = entity.paramVal + unieap.byId("paramUnit").getText();
            if (entity.paramDesc == "100年" || entity.paramDesc == "106岁") {
                entity.paramDesc = "终身";
            }
            if (entity.paramDesc == "1000年") {
                entity.paramDesc = "趸交";
            }
            view.processor.addInsurParam(conditionDs, opt);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '数据不合法'
            });
        }
    }

    var view = new _factoryabclife.risk.pfRiskParamDialog.View();
    view.init();

    return view;
})