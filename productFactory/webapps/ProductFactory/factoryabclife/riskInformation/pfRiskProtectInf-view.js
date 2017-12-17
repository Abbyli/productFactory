/**
 *
 * @author Administrator
 * @creationTime 2016-10-12 13:40:23
 * @modificationTime 2016-12-27 13:43:34
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskProtectInf", function () {

    var giveValue = "";

    var tObjFormula = null;

    var D1 = null;
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskProtectInf_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskProtectInf.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getPricingLiabSuccess: getPricingLiabSuccess,
                getProtecLiabSuccess: getProtecLiabSuccess,
                getClaimSuccess: getClaimSuccess,
                getSurvvSuccess: getSurvvSuccess,
                getGievpayAfSuccess: getGievpayAfSuccess,
                getObjFormulaSuccess: getObjFormulaSuccess,
                getFormulaSuccess: getFormulaSuccess,
                getHtml: getHtml,
                getAllProtecSuccess: getAllProtecSuccess,
                pricingLiabId_onChange: pricingLiabId_onChange,
                cell_gievpayprocess_formatter: cell_gievpayprocess_formatter,
                grid1_detail_getMasterDetail: grid1_detail_getMasterDetail,
                cell_givepayIntvUnit_formatter: cell_givepayIntvUnit_formatter,
                grid2_detail_getMasterDetail: grid2_detail_getMasterDetail,
                giveValue: giveValue,
                tObjFormula: tObjFormula,
                D1: D1
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfRiskProtectInf.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tClaimGivepayDef_grid')) {
                var tClaimGivepayDef_grid = new unieap.ds.DataStore('tClaimGivepayDef_grid');
                tClaimGivepayDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimGivepayDef");

                dataCenter.addDataStore(tClaimGivepayDef_grid);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_form')) {
                var tPricingLiabDef_form = new unieap.ds.DataStore('tPricingLiabDef_form');
                tPricingLiabDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_form);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_query')) {
                var tInsurtypeBasicInf_query = new unieap.ds.DataStore('tInsurtypeBasicInf_query');
                tInsurtypeBasicInf_query.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_query);
            }

            if (!dataCenter.getDataStore('tSurvvGivepayDef_grid')) {
                var tSurvvGivepayDef_grid = new unieap.ds.DataStore('tSurvvGivepayDef_grid');
                tSurvvGivepayDef_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef");

                dataCenter.addDataStore(tSurvvGivepayDef_grid);
            }

            if (!dataCenter.getDataStore('tProtecLiabDef')) {
                var tProtecLiabDef = new unieap.ds.DataStore('tProtecLiabDef');
                tProtecLiabDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");

                dataCenter.addDataStore(tProtecLiabDef);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("pricingLiabId"), "onChange", this.pricingLiabId_onChange);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("保障责任信息", function (dc) {
                //获取险种基本信息
                unieap.byId("grid1").getBinding().getDataStore().getRowSet().deleteAllRows();
                unieap.byId("grid2").getBinding().getDataStore().getRowSet().deleteAllRows();

                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                //执行翻页方法
                view.processor.getAllProtec();
                view.processor.getPricingLiab(tInsurtypeBasicInf);
                view.processor.getFormula();
                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });
            navigateButton.activeNavigateButton("get");
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
            var ds1 = new unieap.ds.DataStore("ds_exempt", [{
                CODEVALUE: "N",
                CODENAME: "无"
            }, {
                CODEVALUE: "Y",
                CODENAME: "有"
            }]);
            var ds2 = new unieap.ds.DataStore("ds_payType", [{
                CODEVALUE: "01",
                CODENAME: "身故"
            }, {
                CODEVALUE: "02",
                CODENAME: "高残"
            }, {
                CODEVALUE: "03",
                CODENAME: "重大疾病"
            }, {
                CODEVALUE: "04",
                CODENAME: "伤残"
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
            var ds3 = new unieap.ds.DataStore("ds_action", [{
                CODEVALUE: "00",
                CODENAME: "退保费"
            }, {
                CODEVALUE: "11",
                CODENAME: "退现价"
            }]);
            var ds4 = new unieap.ds.DataStore("ds_actionType", [{
                CODEVALUE: "01",
                CODENAME: "本险种终止"
            }, {
                CODEVALUE: "02",
                CODENAME: "本责任终止"
            }, {
                CODEVALUE: "03",
                CODENAME: "削减主险合同基本保额"
            }, {
                CODEVALUE: "04",
                CODENAME: "险种其他责任终止"
            }, {
                CODEVALUE: "05",
                CODENAME: "保单终止"
            }, {
                CODEVALUE: "06",
                CODENAME: "无条件销户"
            }, {
                CODEVALUE: "07",
                CODENAME: "最后一次给付销户"
            }, {
                CODEVALUE: "08",
                CODENAME: "本责任继续有效"
            }]);

            var ds5 = new unieap.ds.DataStore("ds_beginEnd", [{
                CODEVALUE: "S",
                CODENAME: "起保日期对应日"
            }, {
                CODEVALUE: "B",
                CODENAME: "出生日期对应日"
            }, {
                CODEVALUE: "C",
                CODENAME: "参考保单选择"
            }]);
            var ds6 = new unieap.ds.DataStore("ds_vechicle", [{
                CODEVALUE: "01",
                CODENAME: "飞机"
            }, {
                CODEVALUE: "02",
                CODENAME: "火车"
            }, {
                CODEVALUE: "03",
                CODENAME: "轮船"
            }, {
                CODEVALUE: "04",
                CODENAME: "公共交通"
            }, {
                CODEVALUE: "05",
                CODENAME: "出租车"
            }, {
                CODEVALUE: "06",
                CODENAME: "市内公交车"
            }, {
                CODEVALUE: "07",
                CODENAME: "长途汽车"
            }, {
                CODEVALUE: "08",
                CODENAME: "自驾车"
            }, {
                CODEVALUE: "09",
                CODENAME: "公务车"
            }]);
            var ds7 = new unieap.ds.DataStore("ds_survvtype", [{
                CODEVALUE: "S1",
                CODENAME: "生存金"
            }, {
                CODEVALUE: "S2",
                CODENAME: "满期金"
            }, {
                CODEVALUE: "S3",
                CODENAME: "年金"
            }]);


            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
            dataCenter.addDataStore(ds5);
            dataCenter.addDataStore(ds6);
            dataCenter.addDataStore(ds7);
        }

    });
    /**
     * @description:getPricingLiab方法的成功回调。
     *
     */

    function getPricingLiabSuccess(dc) {
        unieap.byId("pricingLiabId").getDataProvider().setDataStore(dc.getDataStore("insurtyprestduty"));

        view.processor.getProtecLiab(dc.getDataStore("insurtyprestduty").getRowSet().getRow(0).getItemValue("pricingLiabId"));

        var count = dc.getDataStore("insurtyprestduty").getRowSet().getRowCount();
        if (count > 0) {
            unieap.byId("pricingLiabId").setValue(dc.getDataStore("insurtyprestduty").getRowSet().getRow(0).getItemValue("pricingLiabId"));
            unieap.byId("pricingLiabName").setValue(dc.getDataStore("insurtyprestduty").getRowSet().getRow(0).getItemValue("pricingLiabName"));
        }
    }
    /**
     * @description:getProtecLiab方法的成功回调。
     *
     */

    function getProtecLiabSuccess(dc) {
        var protec = dc.getDataStore("queryPrestResultNoPage");
        var count = protec.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            var type = protec.getRowSet().getRow(i).getItemValue("protecLiabType");
            var protecId = protec.getRowSet().getRow(i).getItemValue("protecLiabId");
            if (type == "1") {
                view.processor.getClaim(protecId);
            }
            if (type == "0") {
                var ds_protec = new unieap.ds.DataStore("ds_protec", [{
                    "protecLiabId": protecId
                }]);
                ds_protec.setRowSetName("com.neusoft.abclife.productfactory.entity.TProtecLiabDef");
                view.processor.getSurvv(ds_protec);
            }
        }
    }
    /**
     * @description:getClaim方法的成功回调。
     *
     */

    function getClaimSuccess(dc) {
        view.grid.setDataStore("grid1", dc.getDataStore("queryClaimResult"));
    }
    /**
     * @description:getSurvv方法的成功回调。
     *
     */

    function getSurvvSuccess(dc) {
        view.grid.setDataStore("grid2", dc.getDataStore("queryTSurvvGivepayDef"));
    }
    /**
     * @description:getGievpayAf方法的成功回调。
     *
     */

    function getGievpayAfSuccess(dc) {
        var giveAf = dc.getDataStore("queryGivePaidResult");
        var count = giveAf.getRowSet().getRowCount();
        giveValue = "";
        var data = dataCenter.getDataStore("ds_actionType");

        if (count > 0) {
            var type = giveAf.getRowSet().getRow(0).getItemValue("givepaidActionType");
            for (var i = 0; i < data.getRowSet().getRowCount(); i++) {
                if (data.getRowSet().getRow(i).getItemValue("CODEVALUE") == type) {
                    giveValue = data.getRowSet().getRow(i).getItemValue("CODENAME");
                }
            }
            for (var i = 1; i < count; i++) {
                var types = giveAf.getRowSet().getRow(i).getItemValue("givepaidActionType");
                for (var j = 0; j < data.getRowSet().getRowCount(); j++) {
                    if (data.getRowSet().getRow(j).getItemValue("CODEVALUE") == types) {
                        giveValue += "," + data.getRowSet().getRow(j).getItemValue("CODENAME");
                    }
                }
            }
        }
    }
    /**
     * @description:getObjFormula方法的成功回调。
     *
     */

    function getObjFormulaSuccess(dc) {
        tObjFormula = dc.getDataStore("getTObjFormula");
    }
    /**
     * @description:getFormula方法的成功回调。
     *
     */

    function getFormulaSuccess(dc) {
        D1 = dc.getDataStore("getFormulaD1");
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function getHtml(tObjFormula) {
        var count = tObjFormula.getRowSet().getRowCount();
        var result = "<div width='100%'>";
        result += "<table width='100%' cellspacing='0'>";
        result += "<tr>";
        result += "<td width='50%' align='center'>"
        result += "条件";
        result += "</td>";
        //result+="<td width='20%' align='center'>"
        //result+="公式";
        //result+="</td>";
        result += "<td width='50%' align='center'>"
        result += "描述";
        result += "</td>";
        result += "</tr>";
        for (var i = 0; i < count; i++) {
            result += "<tr>";
            result += "<td width='30%' align='center'>"
            var relationContent = tObjFormula.getRowSet().getRow(i).getItemValue("relationContent");
            if (relationContent == null) {
                result += "";
            }
            else {
                result += relationContent;
            }
            result += "</td>";
            //	result+="<td width='20%' align='center'>"
            //	var formulaId=tObjFormula.getRowSet().getRow(i).getItemValue("formulaId");
            //	if(formulaId==null){
            //		result+="";
            //	}else{
            //		result+="";
            //		for(var j = 0;j<D1.getRowSet().getRowCount();j++){
            //		if(formulaId==D1.getRowSet().getRow(j).getItemValue("id")){
            //			result+=D1.getRowSet().getRow(j).getItemValue("memo");
            //			break;
            //		}
            //		}
            //	}
            //	
            //	result+="</td>";
            result += "<td width='50%' align='center'>"
            var description = tObjFormula.getRowSet().getRow(i).getItemValue("description");
            if (description == null) {
                result += "";
            }
            else {
                result += description;
            }

            result += "</td>";
            result += "</tr>";
        }

        result += "</table>";
        result += "</div>";

        return result;
    }
    /**
     * @description:getAllProtec方法的成功回调。
     *
     */

    function getAllProtecSuccess(dc) {
        dataCenter.addDataStore("protec", dc.getDataStore("getAllProtecLiab"));
    }

    function pricingLiabId_onChange(value) {
        unieap.byId("grid1").getBinding().getDataStore().getRowSet().deleteAllRows();
        unieap.byId("grid2").getBinding().getDataStore().getRowSet().deleteAllRows();
        view.processor.getProtecLiab(value);
        var dsform = unieap.byId("pricingLiabId").getDataProvider().getDataStore();
        var count = dsform.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (dsform.getRowSet().getRow(i).getItemValue("pricingLiabId") == value) {
                unieap.byId("pricingLiabName").setValue(dsform.getRowSet().getRow(i).getItemValue("pricingLiabName"));
            }
        }

    }

    function cell_gievpayprocess_formatter(inValue, inRowIndex) {
        var id = view.grid.getRow("grid1", inRowIndex).getRowSet().getRow(0).getItemValue("claimGivepayId");
        view.processor.getGievpayAf(id);
        return giveValue;
    }

    function grid1_detail_getMasterDetail(inRowIndex) {
        var data = view.grid.getRow("grid1", inRowIndex);

        view.processor.getObjFormula(data.getRowSet().getRow(0).getItemValue("claimGivepayId"), "D1#1");
        return view.getHtml(tObjFormula);
    }

    function cell_givepayIntvUnit_formatter(inValue, inRowIndex) {
        return "月";
    }

    function grid2_detail_getMasterDetail(inRowIndex) {
        var data = view.grid.getRow("grid2", inRowIndex);


        view.processor.getObjFormula(data.getRowSet().getRow(0).getItemValue("survvGivepayId"), "D1#0");

        return view.getHtml(tObjFormula);
    }

    var view = new _factoryabclife.riskInformation.pfRiskProtectInf.View();
    view.init();

    return view;
})