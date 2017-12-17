/**
 * 定价责任
 * @author Administrator
 * @creationTime 2016-06-28 10:35:04
 * @modificationTime 2017-01-06 17:51:53
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfPriceDuty", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfPriceDuty_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfPriceDuty.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                querySuccess: querySuccess,
                del: del,
                delliabfeedefSuccess: delliabfeedefSuccess,
                update: update,
                addDialog_onComplete: addDialog_onComplete,
                updateDialog_onComplete: updateDialog_onComplete,
                element_onClick: element_onClick,
                addButton_onClick: addButton_onClick,
                cell_contral_liab_formatter: cell_contral_liab_formatter,
                gridliabdef_binding_rpc: gridliabdef_binding_rpc
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfPriceDuty.Processor(this);

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

            if (!dataCenter.getDataStore('tPricingLiabDef_grid')) {
                var tPricingLiabDef_grid = new unieap.ds.DataStore('tPricingLiabDef_grid');
                tPricingLiabDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addDialog"), "onComplete", this.addDialog_onComplete);

            this.connect(unieap.byId("updateDialog"), "onComplete", this.updateDialog_onComplete);

            this.connect(unieap.byId("element"), "onClick", this.element_onClick);

            this.connect(unieap.byId("addButton"), "onClick", this.addButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("险种定价责任", function (dc) {
                //获取险种基本信息
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form_insurtypebasicinf", tInsurtypeBasicInf);
                //执行翻页方法
                view.processor.query(tInsurtypeBasicInf, 1, 10);
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("duty");

        },
        page_init: function () {
            var ds1 = new unieap.ds.DataStore("ds_chooseflag", [{
                    CODENAME: "必选",
                    CODEVALUE: "1"
                }, {
                    CODENAME: "可选",
                    CODEVALUE: "0"
                }

            ])

            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:query方法的成功回调。
     *
     */

    function querySuccess(dc) {
        var result = dc.getDataStore("queryPricingLiabDef");
        view.grid.setDataStore("gridliabdef", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("gridliabdef", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        view.processor.delliabfeedef(data);
                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delliabfeedef方法的成功回调。
     *
     */

    function delliabfeedefSuccess(dc) {
        MessageBox.autoCloseAlert({
            title: "提示框",
            message: "删除成功"
        });
        view.processor.query(view.form.getDataStore("form_insurtypebasicinf"), 1, 10);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = view.grid.getRow("gridliabdef", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("updateDialog");
                var basic = view.form.getDataStore("form_insurtypebasicinf");
                dialog.dialogData = {
                    "basicinf": basic,
                    "opt": "update",
                    "liab": row
                };
                dialog.show();
            }
        }
    }

    function addDialog_onComplete(returnObj) {
        view.processor.query(view.form.getDataStore("form_insurtypebasicinf"), 1, 10);
    }

    function updateDialog_onComplete(returnObj) {
        view.processor.query(view.form.getDataStore("form_insurtypebasicinf"), 1, 10);
    }

    function element_onClick(event) {

        var selectRow = view.grid.getRow("gridliabdef");
        if (selectRow) {
            var newDC = new unieap.ds.DataCenter();
            newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf"));
            newDC.addDataStore("duty", selectRow);

            view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskElement", "定价责任要素定义", newDC);

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条数据！'
            })
        }
    }

    function addButton_onClick(event) {
        var dialog = unieap.byId("addDialog");
        var insurtypebasicinf = view.form.getDataStore("form_insurtypebasicinf");
        dialog.dialogData = {
            "basicinf": insurtypebasicinf,
            "opt": "add"
        };
        dialog.show();
    }

    function cell_contral_liab_formatter(inValue, inRowIndex) {

        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfPriceDuty.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfPriceDuty.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function gridliabdef_binding_rpc(store, load) {
        view.processor.query(view.form.getDataStore("form_insurtypebasicinf"), store.getPageNumber(), store.getPageSize());
    }

    var view = new _factoryabclife.risk.pfPriceDuty.View();
    view.init();

    return view;
})