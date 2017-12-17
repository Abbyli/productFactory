/**
 * 保全属性定义
 * @author zhy
 * @creationTime 2016-08-22 17:10:29
 * @modificationTime 2017-03-28 13:55:05
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskAttrib", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskAttrib_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskAttrib.View", unieap.view.View, {



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
                saveAttribSuccess: saveAttribSuccess,
                button1_onClick: button1_onClick,
                isDividend__Attrib_onChange: isDividend__Attrib_onChange
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskAttrib.Processor(this);

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

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("isDividend__Attrib"), "onChange", this.isDividend__Attrib_onChange);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("保全属性定义", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                //重复加载数据
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_basic", tInsurtypeBasicInf);
                //unieap.byId("dividendWay__Attrib").setDisabled(false);
                view.processor.queryAttrib(view.form.getDataStore("form_basic"));
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
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
        //if(unieap.byId("isDividend__Attrib").getValue()=="0"){
        //	unieap.byId("dividendWay__Attrib").setValue("");
        //	unieap.byId("dividendWay__Attrib").setDisabled(true);
        //}			
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

    function button1_onClick(event) {
        if (!unieap.byId("form_Attrib").validate(false)) {
            return;
        }
        view.processor.saveAttrib(view.form.getDataStore("form_basic"), view.form
            .getDataStore("form_Attrib"));
    }

    function isDividend__Attrib_onChange(value) {
        //if(value=="1"){
        //	unieap.byId("dividendWay__Attrib").setDisabled(false);
        //}
        //if(value=="0"){
        //	unieap.byId("dividendWay__Attrib").setValue("");
        //	unieap.byId("dividendWay__Attrib").setDisabled(true);
        //}
    }

    var view = new _factoryabclife.risk.pfRiskAttrib.View();
    view.init();

    return view;
})