/**
 * 保障责任
 * @author neusoft
 * @creationTime 2016-07-06 09:31:38
 * @modificationTime 2016-11-01 15:41:57
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrest", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPrest_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrest.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryPriceDutySuccess: queryPriceDutySuccess,
                priceDutyIdSuccess: priceDutyIdSuccess,
                del: del,
                delTProtecLiabDefSuccess: delTProtecLiabDefSuccess,
                button_PrestAdd_onClick: button_PrestAdd_onClick,
                procingLiabCode__PriceDuty_onChange: procingLiabCode__PriceDuty_onChange,
                button_PrestDefine_onClick: button_PrestDefine_onClick,
                element_onClick: element_onClick,
                cell_name1__prest_formatter: cell_name1__prest_formatter,
                grid_prest_binding_rpc: grid_prest_binding_rpc,
                xdialog_protect_onComplete: xdialog_protect_onComplete
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskPrest.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_prest')) {
                var tInsurtypeBasicInf_prest = new unieap.ds.DataStore('tInsurtypeBasicInf_prest');
                tInsurtypeBasicInf_prest.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_prest);
            }

            if (!dataCenter.getDataStore('tProtecLiabDef_prest')) {
                var tProtecLiabDef_prest = new unieap.ds.DataStore('tProtecLiabDef_prest');
                tProtecLiabDef_prest.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef_prest);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_combox')) {
                var tPricingLiabDef_combox = new unieap.ds.DataStore('tPricingLiabDef_combox');
                tPricingLiabDef_combox.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_combox);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button_PrestAdd"), "onClick", this.button_PrestAdd_onClick);

            this.connect(unieap.byId("procingLiabCode__PriceDuty"), "onChange", this.procingLiabCode__PriceDuty_onChange);

            this.connect(unieap.byId("button_PrestDefine"), "onClick", this.button_PrestDefine_onClick);

            this.connect(unieap.byId("element"), "onClick", this.element_onClick);

            this.connect(unieap.byId("xdialog_protect"), "onComplete", this.xdialog_protect_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("保障责任定义", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                //重复加载数据
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_basic", tInsurtypeBasicInf);
                //执行查询定价信息方法
                view.processor.queryPriceDuty(tInsurtypeBasicInf);
                unieap.byId("pricingLiabName").setValue("");
                unieap.byId("procingLiabCode__PriceDuty").setValue("");
                unieap.byId("grid_prest").getBinding().getRowSet().deleteAllRows();

                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("get");
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_type_prest", [{
                CODEVALUE: "0",
                CODENAME: "生存"
            }, {
                CODEVALUE: "1",
                CODENAME: "理赔"
            }]);
            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:queryPriceDuty方法的成功回调。
     *
     */

    function queryPriceDutySuccess(dc) {
        unieap.byId("procingLiabCode__PriceDuty")
            .getDataProvider().setDataStore(dc.getDataStore("insurtyprestduty"));

        if (dc.getDataStore("insurtyprestduty").getRowSet().getRowCount() > 0) {
            var value = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabId;
            var name = dc.getDataStore("insurtyprestduty").rowSet.primary[0].pricingLiabName;
            unieap.byId("procingLiabCode__PriceDuty").setValue(value);
            unieap.byId("pricingLiabName").setValue(name)
            view.processor.priceDutyId(value, 1, 10);
        }
    }
    /**
     * @description:priceDutyId方法的成功回调。
     *
     */

    function priceDutyIdSuccess(dc) {
        var result = dc.getDataStore("queryPrestResult");
        view.grid.setDataStore("grid_prest", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_prest", inRowIndex);

        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delTProtecLiabDef(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delTProtecLiabDef方法的成功回调。
     *
     */

    function delTProtecLiabDefSuccess(dc) {
        view.processor.priceDutyId(unieap.byId("procingLiabCode__PriceDuty").getValue(), 1, 10);
    }

    function button_PrestAdd_onClick(event) {
        var combox = unieap.byId("procingLiabCode__PriceDuty");
        if (combox.getValue() == null) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请选择一条定价责任"
            });
        }
        else {
            var dialog = unieap.byId("xdialog_protect");
            var priceDutyId = combox.getValue();
            var priceDutyCode = combox.getText();
            dialog.dialogData = {
                "priceDutyId": priceDutyId,
                "priceDutyCode": priceDutyCode
            };
            dialog.show();
        }

    }

    function procingLiabCode__PriceDuty_onChange(value) {
        view.processor.priceDutyId(value, 1, 10);
        var dsform = unieap.byId("procingLiabCode__PriceDuty").getDataProvider().getDataStore();
        var count = dsform.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (dsform.getRowSet().getRow(i).getItemValue("pricingLiabId") == value) {
                unieap.byId("pricingLiabName").setValue(dsform.getRowSet().getRow(i).getItemValue("pricingLiabName"));
            }
        }

    }

    function button_PrestDefine_onClick(event) {
        var selectRow = view.grid.getRow("grid_prest");
        var newDC = new unieap.ds.DataCenter();
        newDC.addDataStore("selectRow", selectRow);
        newDC.addDataStore("tInsurtypeBasicInf", view.form.getDataStore("form_basic")); //险种基本信息
        newDC.setParameter("PriceDutyCode", unieap.byId("procingLiabCode__PriceDuty").getText()); //定价责任代码
        if (selectRow) {
            if (selectRow.rowSet.primary[0].protecLiabType == "0") {
                view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestLive", "生存给付", newDC);

            }
            else if (selectRow.rowSet.primary[0].protecLiabType == "1") {
                view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestClaim", "理赔给付", newDC);

            }
            else {
                MessageBox.autoCloseAlert({
                    title: "提示",
                    message: "请选择一条有类型的数据"
                });
            }
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "请选择一条数据"
            });
        }

    }

    function element_onClick(event) {
        var selectRow = view.grid.getRow("grid_prest");
        if (selectRow) {
            var newDC = new unieap.ds.DataCenter();
            newDC.addDataStore("selectRow", selectRow);
            newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf")); //险种基本信息
            newDC.setParameter("PriceDutyCode", unieap.byId("procingLiabCode__PriceDuty").getText()); //定价责任代码
            //newDC.addDataStore("duty", selectRow);
            view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestElement", "保障责任要素定义", newDC);

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条数据！'
            })
        }
    }

    function cell_name1__prest_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";

        var delHTML = "<img src='" + delImg + "' style='cursor:pointer;' title='删除' onclick='pfRiskPrest.del(" + inRowIndex + ");' ></img>";

        return delHTML;
    }

    function grid_prest_binding_rpc(store, load) {
        view.processor.priceDutyId(unieap.byId("procingLiabCode__PriceDuty").getValue(), store.getPageNumber(), store.getPageSize());
    }

    function xdialog_protect_onComplete(returnObj) {
        var priceId = unieap.byId("procingLiabCode__PriceDuty").getValue();
        view.processor.priceDutyId(priceId, 1, 10);
    }

    var view = new _factoryabclife.risk.pfRiskPrest.View();
    view.init();

    return view;
})