/**
 * 组合参数
 * @author Administrator
 * @creationTime 2016-11-16 11:30:37
 * @modificationTime 2016-12-27 14:48:48
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfComboParam", function () {

    var type = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfComboParam_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.comboInformation.pfComboParam.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryInsurParamsSuccess: queryInsurParamsSuccess,
                queryComboParamSuccess: queryComboParamSuccess,
                saveSuccess: saveSuccess,
                tabPane1_onShow: tabPane1_onShow,
                tabPane2_onShow: tabPane2_onShow,
                tabPane3_onShow: tabPane3_onShow,
                type: type
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.comboInformation.pfComboParam.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tComboInf_param_form')) {
                var tComboInf_param_form = new unieap.ds.DataStore('tComboInf_param_form');
                tComboInf_param_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TComboInf");

                dataCenter.addDataStore(tComboInf_param_form);
            }

            if (!dataCenter.getDataStore('tProductParamDef_grid_insur')) {
                var tProductParamDef_grid_insur = new unieap.ds.DataStore('tProductParamDef_grid_insur');
                tProductParamDef_grid_insur.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductParamDef");

                dataCenter.addDataStore(tProductParamDef_grid_insur);
            }

            if (!dataCenter.getDataStore('tProductParamDef_grid_payEnd')) {
                var tProductParamDef_grid_payEnd = new unieap.ds.DataStore('tProductParamDef_grid_payEnd');
                tProductParamDef_grid_payEnd.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductParamDef");

                dataCenter.addDataStore(tProductParamDef_grid_payEnd);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("tabPane1"), "onShow", this.tabPane1_onShow);

            this.connect(unieap.byId("tabPane2"), "onShow", this.tabPane2_onShow);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("组合参数定义", function (dc) {
                var comboInf = dc.getDataStore("comboInf");
                view.form.setDataStore("form_comboInf", comboInf);
                dataCenter.addDataStore("comboInf", comboInf);

                unieap.byId("grid_insur").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("grid_payEnd").getBinding().getDataStore().getRowSet().deleteAllRows();

                unieap.byId("tabContainer1").showTab("tabPane1", true);
                unieap.byId("tabPane1").onShow();

            })

            navigateButton.activeNavigateButton("comboParam");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_dataUnit", [{
                CODEVALUE: "Y",
                CODENAME: "年"
            }, {
                CODEVALUE: "A",
                CODENAME: "岁"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_freq", [{
                CODEVALUE: "0",
                CODENAME: "一次交清"
            }, {
                CODEVALUE: "12",
                CODENAME: "年交"
            }, {
                CODEVALUE: "6",
                CODENAME: "半年交"
            }, {
                CODEVALUE: "3",
                CODENAME: "季交"
            }, {
                CODEVALUE: "1",
                CODENAME: "月交"
            }, {
                CODEVALUE: "-1",
                CODENAME: "不定期"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryInsurParams方法的成功回调。
     *
     */

    function queryInsurParamsSuccess(dc) {
        if (type == "02") {
            view.grid.setDataStore("grid_insur", dc.getDataStore("queryComboParam"));
        }
        if (type == "01") {
            view.grid.setDataStore("grid_payEnd", dc.getDataStore("queryComboParam"));
        }

        view.processor.queryComboParam(dataCenter.getDataStore("comboInf"), type);
    }
    /**
     * @description:queryComboParam方法的成功回调。
     *
     */

    function queryComboParamSuccess(dc) {
        var params = null;
        var count = 0;
        var result = dc.getDataStore("queryComboParams");
        if (type == "02") {
            view.grid.setDataStore("grid_insur", result);
        }
        if (type == "01") {
            view.grid.setDataStore("grid_payEnd", result);
        }
        //if(params!=null){
        //count = params.getRowSet().getRowCount();
        //}
        //for(var i=0;i<count;i++){
        // 	for(var j=0;j<result.getRowSet().getRowCount();j++){
        // 		if(params.getRowSet().getRow(i).getItemValue("paramVal")==result.getRowSet().getRow(j).getItemValue("paramVal") &&
        // 		params.getRowSet().getRow(i).getItemValue("paramUnit")==result.getRowSet().getRow(j).getItemValue("paramUnit")){
        //	 		if(type == "02"){
        //	 			unieap.byId("grid_insur").getManager("SelectionManager").setSelect(i);
        //	 		}
        //	 		if(type == "01"){
        //	 			unieap.byId("grid_payEnd").getManager("SelectionManager").setSelect(i);
        //	 		}
        //	 		
        //	 		break;
        // 		}
        // 	}
        //}
        if (type == "04") {
            unieap.byId("checkBoxGroup1").setValue("");
            var count2 = result.getRowSet().getRowCount();
            if (count2 > 0) {
                for (var i = 0; i < count2; i++) {
                    var value = result.rowSet.primary[i].paramVal;
                    if (value == "0") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [0]);
                    }
                    if (value == "12") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [1]);
                    }
                    if (value == "6") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [2]);
                    }
                    if (value == "3") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [3]);
                    }
                    if (value == "1") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [4]);
                    }
                    if (value == "-1") {
                        unieap.byId("checkBoxGroup1").setChecked(true, [5]);
                    }
                }
            }
        }
    }
    /**
     * @description:save方法的成功回调。
     *
     */

    function saveSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示",
            message: "保存成功"
        });
    }

    function tabPane1_onShow(pane) {
        type = "02";
        //view.processor.queryInsurParams(view.form.getDataStore("form_comboInf"), type);
        view.processor.queryComboParam(dataCenter.getDataStore("comboInf"), type);
    }

    function tabPane2_onShow(pane) {
        type = "01";
        view.processor.queryInsurParams(dataCenter.getDataStore("comboInf"), type);
    }

    function tabPane3_onShow(pane) {
        type = "04";
        view.processor.queryComboParam(dataCenter.getDataStore("comboInf"), type);
    }

    var view = new _factoryabclife.comboInformation.pfComboParam.View();
    view.init();

    return view;
})