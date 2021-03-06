/**
 * 个险险种定义
 * @author think
 * @creationTime 2016-06-23 10:29:46
 * @modificationTime 2016-10-11 14:28:00
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskInf", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskInf.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getRisksByConditionSuccess: getRisksByConditionSuccess,
                goRiskDetail: goRiskDetail,
                navigatorRefresh: navigatorRefresh,
                update: update,
                del: del,
                delRiskBaseSuccess: delRiskBaseSuccess,
                testSuccess: testSuccess,
                submitReviewSuccess: submitReviewSuccess,
                testPASuccess: testPASuccess,
                xdialog1_onComplete: xdialog1_onComplete,
                btnQuery_onClick: btnQuery_onClick,
                button1_onClick: button1_onClick,
                button3_onClick: button3_onClick,
                button4_onClick: button4_onClick,
                btnAdd_onClick: btnAdd_onClick,
                button2_onClick: button2_onClick,
                btnReview_onClick: btnReview_onClick,
                cell_insurtypeCode__risk_formatter: cell_insurtypeCode__risk_formatter,
                cell_control__risk_formatter: cell_control__risk_formatter,
                grid_risk_binding_rpc: grid_risk_binding_rpc,
                xdialog2_onComplete: xdialog2_onComplete
            });

            this.processor = new _factoryabclife.riskInformation.pfRiskInf.Processor(this);

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

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_grid')) {
                var tInsurtypeBasicInf_grid = new unieap.ds.DataStore('tInsurtypeBasicInf_grid');
                tInsurtypeBasicInf_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_grid);
            }

            if (!dataCenter.getDataStore('policyDTO')) {
                var policyDTO = new unieap.ds.DataStore('policyDTO');
                policyDTO.setRowSetName("com.neusoft.abclife.productfactory.dto.PolicyDTO");

                dataCenter.addDataStore(policyDTO);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

            this.connect(unieap.byId("btnQuery"), "onClick", this.btnQuery_onClick);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

            this.connect(unieap.byId("button4"), "onClick", this.button4_onClick);

            this.connect(unieap.byId("btnAdd"), "onClick", this.btnAdd_onClick);

            this.connect(unieap.byId("button2"), "onClick", this.button2_onClick);

            this.connect(unieap.byId("btnReview"), "onClick", this.btnReview_onClick);

            this.connect(unieap.byId("xdialog2"), "onComplete", this.xdialog2_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");

            view.navigator.onComplete("返回", function (dc) {
                view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");

            });
        }


    });
    /**
     * @description:getRisksByCondition方法的成功回调。
     *
     */

    function getRisksByConditionSuccess(dc) {
        var ds_rtnRisksByCon = dc.getDataStore("rtnRisksByCon");
        view.grid.setDataStore("grid_risk", ds_rtnRisksByCon);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function goRiskDetail(rowIndex) {
        var selectRow = view.grid.getRow("grid_risk", rowIndex);
        var dc = new unieap.ds.DataCenter();
        dc.addDataStore("tInsurtypeBasicInf", selectRow);
        view.navigator.forward("ProductFactory", "factoryabclife", "riskInformation/pfRiskInfDetail", "审核险种信息", dc);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function navigatorRefresh() {
        //点击框架生成的页面穿透,刷新页面grid,已修改NavigatorController.js line390 onButtonClick
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(rowIndex) {
        var selectRow = view.grid.getRow("grid_risk", rowIndex);
        var xdialog = unieap.byId("xdialog1");
        xdialog.dialogData = {
            "opt": "upd",
            "selectRow": selectRow
        };
        xdialog.show();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del(rowIndex) {
        var selectRow = view.grid.getRow("grid_risk", rowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    view.processor.delRiskBase(selectRow);
                }
            }
        });
    }
    /**
     * @description:delRiskBase方法的成功回调。
     *
     */

    function delRiskBaseSuccess(dc) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
    }
    /**
     * @description:test方法的成功回调。
     *
     */

    function testSuccess(dc) {
        var rtnValue = dc.getParameter("rtnValue");
        alert(rtnValue);
    }
    /**
     * @description:submitReview方法的成功回调。
     *
     */

    function submitReviewSuccess(dc) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
    }
    /**
     * @description:testPA方法的成功回调。
     *
     */

    function testPASuccess(dc) {
        var pA = dc.getDataStore("calAllPremAndAmnt");
        var amnt = pA.rowSet.primary[0].amnt;
        var prem = pA.rowSet.primary[0].prem;

        alert("amnt:" + amnt + "     prem:" + prem);
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
    }

    function btnQuery_onClick(event) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), "1", "10");
    }

    function button1_onClick(event) {
        //测试1 首续期扣费  
        //var policyDTO = new unieap.ds.DataStore("policyDTO",[
        //{amnt:"100000",n:"3",insurtypeCode:"6801", pricingLiabCode:"680145", payIntv:"12",
        // beginYear:"1",endYear:"1",minAmount:"0",maxAmount:"99999999",
        // feeType:"B4",unit:"1"}
        //]); //本地orcl

        //var policyDTO = new unieap.ds.DataStore("policyDTO",[
        //{amnt:"100000",n:"3",insurtypeCode:"6801", pricingLiabCode:"680102", payIntv:"12",
        // beginYear:"1",endYear:"1",minAmount:"0",maxAmount:"99999999",
        // feeType:"B4",unit:"1"}
        //]); //10.10.69.25

        var policyDTO = new unieap.ds.DataStore("policyDTO", [{
            amnt: "10000",
            insurtypeCode: "6801",
            pricingLiabCode: "680101",
            payIntv: "12",
            beginYear: "",
            endYear: "",
            minAmount: "",
            maxAmount: "",
            prem: "",
            mult: "5",
            feeType: "",
            unit: "1",
            sex: "1",
            appAge: "18",
            insuYear: "3",
            year: "2",
            birthday: "19920101",
            bdsxr: "20140901"
        }]); //10.10.69.25


        policyDTO.rowSetName = "com.neusoft.abclife.productfactory.dto.PolicyDTO";
        //view.processor.test("6801","1","680101","680144","D1","1","03", policyDTO);
        view.processor.testPA("1", "680101", policyDTO);
    }

    function button3_onClick(event) {
        unieap.byId("xdialog3").show();
    }

    function button4_onClick(event) {
        unieap.byId("form_risk").reset();
    }

    function btnAdd_onClick(event) {
        var xdialog = unieap.byId("xdialog1");
        xdialog.dialogData = {
            "opt": "add"
        };
        xdialog.show();
    }

    function button2_onClick(event) {
        var row = view.grid.getRow("grid_risk");
        var dialog = unieap.byId("xdialog2");
        dialog.dialogData = {
            "row": row
        };
        dialog.show();

    }

    function btnReview_onClick(event) {
        var data = view.grid.getRow("grid_risk");
        if (data) {
            view.processor.submitReview(data);
        }
        else {
            MessageBox.alert({
                title: "提示",
                message: "请选择险种"
            });
        }

    }

    function cell_insurtypeCode__risk_formatter(inValue, inRowIndex) {
        return "<a href=\"javascript:;\" onclick=\"pfRisk.pfRiskInf('" + inRowIndex + "')\" >" + inValue + "</a>";
    }

    function cell_control__risk_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRisk.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRisk.del('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function grid_risk_binding_rpc(store, load) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), store.getPageNumber(), store.getPageSize());
    }

    function xdialog2_onComplete(returnObj) {
        view.processor.getRisksByCondition(view.form.getDataStore("form_risk"), 1, 10);
    }

    var view = new _factoryabclife.riskInformation.pfRiskInf.View();
    view.init();

    return view;
})