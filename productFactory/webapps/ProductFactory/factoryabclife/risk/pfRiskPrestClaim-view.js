/**
 * 理赔给付
 * @author neusoft
 * @creationTime 2016-07-08 11:42:13
 * @modificationTime 2017-02-15 10:32:48
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestClaim", function () {

    var protecLiabId = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskPrestClaim_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestClaim.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryClaimSuccess: queryClaimSuccess,
                del_Claim: del_Claim,
                del_ClaimSuccess: del_ClaimSuccess,
                update: update,
                getTObjFormulaSuccess: getTObjFormulaSuccess,
                delParamFormulaRelationSuccess: delParamFormulaRelationSuccess,
                delformula: delformula,
                updateformula: updateformula,
                accDetail: accDetail,
                button_addPrestClaim_onClick: button_addPrestClaim_onClick,
                element_onClick: element_onClick,
                cell_name1__Claim_formatter: cell_name1__Claim_formatter,
                grid_Claim_selection_onAfterSelect: grid_Claim_selection_onAfterSelect,
                addformula_onClick: addformula_onClick,
                cell_control_claimformula_formatter: cell_control_claimformula_formatter,
                xdialog_ClaimAdd_onComplete: xdialog_ClaimAdd_onComplete,
                xdialog_ClaimUpd_onComplete: xdialog_ClaimUpd_onComplete,
                addAlgo_onComplete: addAlgo_onComplete,
                updateAlgo_onComplete: updateAlgo_onComplete,
                protecLiabId: protecLiabId
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskPrestClaim.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tProtecLiabDef_Claim')) {
                var tProtecLiabDef_Claim = new unieap.ds.DataStore('tProtecLiabDef_Claim');
                tProtecLiabDef_Claim.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef_Claim);
            }

            if (!dataCenter.getDataStore('tObjFormula_claim_grid')) {
                var tObjFormula_claim_grid = new unieap.ds.DataStore('tObjFormula_claim_grid');
                tObjFormula_claim_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_claim_grid);
            }

            if (!dataCenter.getDataStore('tClaimGivepayDef_ClaimAdd')) {
                var tClaimGivepayDef_ClaimAdd = new unieap.ds.DataStore('tClaimGivepayDef_ClaimAdd');
                tClaimGivepayDef_ClaimAdd.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimGivepayDef");

                dataCenter.addDataStore(tClaimGivepayDef_ClaimAdd);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button_addPrestClaim"), "onClick", this.button_addPrestClaim_onClick);

            this.connect(unieap.byId("element"), "onClick", this.element_onClick);

            this.connect(unieap.byId("addformula"), "onClick", this.addformula_onClick);

            this.connect(unieap.byId("xdialog_ClaimAdd"), "onComplete", this.xdialog_ClaimAdd_onComplete);

            this.connect(unieap.byId("xdialog_ClaimUpd"), "onComplete", this.xdialog_ClaimUpd_onComplete);

            this.connect(unieap.byId("addAlgo"), "onComplete", this.addAlgo_onComplete);

            this.connect(unieap.byId("updateAlgo"), "onComplete", this.updateAlgo_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            navigateButton.activeNavigateButton("get");

            view.navigator.receiveData("理赔给付", function (dc) {
                //险种基本信息
                dataCenter.addDataStore("tInsurtypeBasicInf", dc.getDataStore("tInsurtypeBasicInf"));
                //保障责任信息
                var selectRow = dc.getDataStore("selectRow");
                view.form.setDataStore("form_Claim", selectRow);
                //查询给付项
                var prestClaim = view.form.getDataStore("form_Claim");
                protecLiabId = prestClaim.rowSet.primary[0].protecLiabId;
                view.processor.queryClaim(protecLiabId);

                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_reson", [{
                CODEVALUE: "1",
                CODENAME: "疾病"
            }, {
                CODEVALUE: "2",
                CODENAME: "意外"
            }, {
                CODEVALUE: "3",
                CODENAME: "一般"
            }]);
            var ds1 = new unieap.ds.DataStore("ds_payType", [{
                CODEVALUE: "01",
                CODENAME: "身故"
            }, {
                CODEVALUE: "12",
                CODENAME: "全残"
            }, {
                CODEVALUE: "02",
                CODENAME: "高残"
            }, {
                CODEVALUE: "04",
                CODENAME: "伤残"
            }, {
                CODEVALUE: "03",
                CODENAME: "重大疾病"
            }, {
                CODEVALUE: "10",
                CODENAME: "重大疾病（重症）"
            }, {
                CODEVALUE: "11",
                CODENAME: "重大疾病（轻症）"
            }, {
                CODEVALUE: "05",
                CODENAME: "豁免"
            }, {
                CODEVALUE: "06",
                CODENAME: "医疗"
            }, {
                CODEVALUE: "07",
                CODENAME: "特种疾病"
            }, {
                CODEVALUE: "08",
                CODENAME: "护理"
            }, {
                CODEVALUE: "09",
                CODENAME: "失能"
            }]);
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryClaim方法的成功回调。
     *
     */

    function queryClaimSuccess(dc) {
        var result = dc.getDataStore("queryClaimResult");
        view.grid.setDataStore("grid_Claim", result);
        unieap.byId("grid_claim_formula").getBinding().getDataStore().getRowSet().deleteAllRows();
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del_Claim(inRowIndex) {
        var selectRow = view.grid.getRow("grid_Claim", inRowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    //view.processor.del_Claim(selectRow,"2");
                    view.processor.del_Claim(selectRow, "D1#1");
                }
            }
        });
    }
    /**
     * @description:del_Claim方法的成功回调。
     *
     */

    function del_ClaimSuccess(dc) {
        view.processor.queryClaim(protecLiabId);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update(inRowIndex) {
        var row = view.grid.getRow("grid_Claim", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("xdialog_ClaimUpd");
                var prestClaim = view.form.getDataStore("form_Claim");
                dialog.dialogData = {
                    "opt": "update",
                    "live": row,
                    "prestClaim": prestClaim
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:getTObjFormula方法的成功回调。
     *
     */

    function getTObjFormulaSuccess(dc) {
        view.grid.setDataStore("grid_claim_formula", dc.getDataStore("getTObjFormula"));
    }
    /**
     * @description:delParamFormulaRelation方法的成功回调。
     *
     */

    function delParamFormulaRelationSuccess(dc) {
        var data = view.grid.getRow("grid_Claim");
        var id = data.rowSet.primary[0].claimGivepayId;
        //view.processor.getTObjFormula(id, "2", 1, 4);
        view.processor.getTObjFormula(id, "D1#1");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function delformula(inRowIndex) {
        var data = view.grid.getRow("grid_claim_formula", inRowIndex);
        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        var objSeq = data.rowSet.primary[0].objSeq;
                        view.processor.delParamFormulaRelation(objSeq);

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function updateformula(inRowIndex) {
        var row = view.grid.getRow("grid_claim_formula", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var selectRow = view.grid.getRow("grid_Claim");
                var dialog = unieap.byId("updateAlgo");
                dialog.dialogData = {
                    "selectRow": selectRow,
                    "opt": "claim",
                    "row_formulainfo": row,
                    "seq": "update",
                    "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function accDetail(inRowIndex) {
        var data = view.grid.getRow("grid_Claim", inRowIndex);
        var newDC = new unieap.ds.DataCenter();
        newDC.addDataStore("selectRow", dataCenter.getDataStore("selectRow"));
        newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf")); //险种基本信息
        newDC.setParameter("PriceDutyCode", dataCenter.getParameter("PriceDutyCode")); //定价责任代码
        newDC.addDataStore("data", data);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestAccDetail", "理赔费用明细", newDC);
    }

    function button_addPrestClaim_onClick(event) {
        var dialog = unieap.byId("xdialog_ClaimAdd");
        var prestClaim = view.form.getDataStore("form_Claim");
        dialog.dialogData = {
            "prestClaim": prestClaim,
            "opt": "add"
        };
        dialog.show();
    }

    function element_onClick(event) {
        var selectRow = view.grid.getRow("grid_Claim");
        if (selectRow) {
            var newDC = new unieap.ds.DataCenter();
            newDC.addDataStore("selectRow", dc.getDataStore("selectRow"));
            newDC.addDataStore("tInsurtypeBasicInf", dc.getDataStore("tInsurtypeBasicInf")); //险种基本信息
            newDC.setParameter("PriceDutyCode", dc.getParameter("PriceDutyCode")); //定价责任代码
            newDC.addDataStore("duty", selectRow);
            view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrestElement", "保障责任要素定义", newDC);

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条数据！'
            })
        }
    }

    function cell_name1__Claim_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";
        var accBtn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/button_modify.png";

        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestClaim.update('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"margin-right:10px;cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestClaim.del_Claim('" + inRowIndex + "')\" />";

        var accBtn = "<img src='" + accBtn + "' " +
            "style=\"cursor:pointer\" title=\"明细\" " +
            "onclick=\"pfRiskPrestClaim.accDetail('" + inRowIndex + "')\" />";

        var data = view.grid.getRow("grid_Claim", inRowIndex);
        var claimPayType = data.rowSet.primary[0].claimClaimPayType;
        if (claimPayType == "06" || claimPayType == "02" || claimPayType == "03" || claimPayType == "04") {
            return updateBtn + delBtn + accBtn;
        }

        return updateBtn + delBtn;
    }

    function grid_Claim_selection_onAfterSelect(inRowIndex) {
        var data = view.grid.getRow("grid_Claim", inRowIndex);
        var id = data.rowSet.primary[0].claimGivepayId;
        //view.processor.getTObjFormula(id, "2", 1, 4);
        view.processor.getTObjFormula(id, "D1#1");
    }

    function addformula_onClick(event) {
        var selectRow = view.grid.getRow("grid_Claim");

        if (selectRow) {
            var dialog = unieap.byId("addAlgo");
            dialog.dialogData = {
                "selectRow": selectRow,
                "opt": "claim",
                "seq": "add",
                "tInsurtypeBasicInf": dataCenter.getDataStore("tInsurtypeBasicInf")
            };
            dialog.show();

        }
        else {
            MessageBox.alert({
                title: '提示',
                message: '请选择一条理赔给付数据！'
            })
        }
    }

    function cell_control_claimformula_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfRiskPrestClaim.updateformula('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestClaim.delformula('" + inRowIndex + "')\" />";

        return updateBtn + delBtn;
    }

    function xdialog_ClaimAdd_onComplete(returnObj) {
        view.processor.queryClaim(protecLiabId);
    }

    function xdialog_ClaimUpd_onComplete(returnObj) {
        view.processor.queryClaim(protecLiabId);
    }

    function addAlgo_onComplete(returnObj) {
        var data = view.grid.getRow("grid_Claim");
        var id = data.rowSet.primary[0].claimGivepayId;
        //view.processor.getTObjFormula(id, "2", 1, 4);
        view.processor.getTObjFormula(id, "D1#1");
    }

    function updateAlgo_onComplete(returnObj) {
        var data = view.grid.getRow("grid_Claim");
        var id = data.rowSet.primary[0].claimGivepayId;
        //view.processor.getTObjFormula(id, "2", 1, 4);
        view.processor.getTObjFormula(id, "D1#1");
    }

    var view = new _factoryabclife.risk.pfRiskPrestClaim.View();
    view.init();

    return view;
})