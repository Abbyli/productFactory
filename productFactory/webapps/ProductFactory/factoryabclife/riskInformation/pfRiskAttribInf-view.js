/**
 * 保全属性定义
 * @author zhy
 * @creationTime 2016-08-22 17:10:29
 * @modificationTime 2016-10-14 11:14:04
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAttribInf", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskAttribInf_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskAttribInf.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryAttribSuccess: queryAttribSuccess,
                saveAttribSuccess: saveAttribSuccess
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfRiskAttribInf.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_form')) {
                var tInsurtypeBasicInf_form = new unieap.ds.DataStore('tInsurtypeBasicInf_form');
                tInsurtypeBasicInf_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_form);
            }

            if (!dataCenter.getDataStore('tInsurtypePsAttribDef_form')) {
                var tInsurtypePsAttribDef_form = new unieap.ds.DataStore('tInsurtypePsAttribDef_form');
                tInsurtypePsAttribDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef");

                dataCenter.addDataStore(tInsurtypePsAttribDef_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("保全属性信息", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                //重复加载数据
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.processor.queryAttrib(tInsurtypeBasicInf);
                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("Attrib");


        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_choose_attrib", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_dividend", [{
                CODEVALUE: "1",
                CODENAME: "领取现金"
            }, {
                CODEVALUE: "2",
                CODENAME: "抵缴保费"
            }, {
                CODEVALUE: "3",
                CODENAME: "增额缴清"
            }, {
                CODEVALUE: "4",
                CODENAME: "累积生息"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryAttrib方法的成功回调。
     *
     */

    function queryAttribSuccess(dc) {
        var result = dc.getDataStore("queryAttribResult");
        view.form.setDataStore("form_Attrib", result);
        if (unieap.byId("isDividend__Attrib").getValue() == "0") {
            unieap.byId("dividendWay__Attrib").setValue("");
            unieap.byId("dividendWay__Attrib").setDisabled(true);
        }
    }
    /**
     * @description:saveAttrib方法的成功回调。
     *
     */

    function saveAttribSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: '提示',
            message: '保存成功！',
            onComplete: function () {
                navigateButton.showBtn(dataCenter.getDataStore('tInsurtypeBasicInf'));
            }
        })
    }

    var view = new _factoryabclife.riskInformation.pfRiskAttribInf.View();
    view.init();

    return view;
})