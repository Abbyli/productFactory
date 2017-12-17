/**
 *
 * @author Administrator
 * @creationTime 2016-12-02 09:22:43
 * @modificationTime 2017-03-23 11:03:30
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("calTest", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.test.calTest.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getInsurCodeSuccess: getInsurCodeSuccess,
                getPricingLiabDefSuccess: getPricingLiabDefSuccess,
                getProtecLiabsSuccess: getProtecLiabsSuccess,
                calSuccess: calSuccess,
                premiumRateSuccess: premiumRateSuccess,
                getGivepaySuccess: getGivepaySuccess,
                insurtypeCode3_onBlur: insurtypeCode3_onBlur,
                varNo3_onChange: varNo3_onChange,
                form3_saveButton_onClick: form3_saveButton_onClick,
                tabPane3_onShow: tabPane3_onShow,
                insurtypeCode4_onBlur: insurtypeCode4_onBlur,
                verNo4_onChange: verNo4_onChange,
                pricingLiabCode4_onChange: pricingLiabCode4_onChange,
                protecLiabCode4_onChange: protecLiabCode4_onChange,
                form4_saveButton_onClick: form4_saveButton_onClick,
                tabPane4_onShow: tabPane4_onShow
            });

            this.processor = new _factoryabclife.test.calTest.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('policyDTO_test')) {
                var policyDTO_test = new unieap.ds.DataStore('policyDTO_test');
                policyDTO_test.setRowSetName("com.neusoft.abclife.productfactory.dto.PolicyDTO");

                dataCenter.addDataStore(policyDTO_test);
            }

            if (!dataCenter.getDataStore('rate_policyDTO')) {
                var rate_policyDTO = new unieap.ds.DataStore('rate_policyDTO');
                rate_policyDTO.setRowSetName("com.neusoft.abclife.productfactory.dto.PolicyDTO");

                dataCenter.addDataStore(rate_policyDTO);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("insurtypeCode3"), "onBlur", this.insurtypeCode3_onBlur);

            this.connect(unieap.byId("varNo3"), "onChange", this.varNo3_onChange);

            this.connect(unieap.byId("form3_saveButton"), "onClick", this.form3_saveButton_onClick);

            this.connect(unieap.byId("tabPane3"), "onShow", this.tabPane3_onShow);

            this.connect(unieap.byId("insurtypeCode4"), "onBlur", this.insurtypeCode4_onBlur);

            this.connect(unieap.byId("verNo4"), "onChange", this.verNo4_onChange);

            this.connect(unieap.byId("pricingLiabCode4"), "onChange", this.pricingLiabCode4_onChange);

            this.connect(unieap.byId("protecLiabCode4"), "onChange", this.protecLiabCode4_onChange);

            this.connect(unieap.byId("form4_saveButton"), "onClick", this.form4_saveButton_onClick);

            this.connect(unieap.byId("tabPane4"), "onShow", this.tabPane4_onShow);

        },



        page_load: function () {
            this.inherited(arguments);

            //默认展现第一页
            unieap.byId("tabContainer1").showTab("tabPane3", true);
            unieap.byId("tabPane3").onShow();

        },
        page_init: function () {
            var ds2_1 = new unieap.ds.DataStore("payIntv2", [{
                CODENAME: "不定期",
                CODEVALUE: "-1"
            }, {
                CODENAME: "一次交清",
                CODEVALUE: "0"
            }, {
                CODENAME: "月交",
                CODEVALUE: "1"
            }, {
                CODENAME: "季交",
                CODEVALUE: "3"
            }, {
                CODENAME: "半年交",
                CODEVALUE: "6"
            }, {
                CODENAME: "年交",
                CODEVALUE: "12"
            }]);
            var ds3_1 = new unieap.ds.DataStore("payIntv3", [{
                CODENAME: "不定期",
                CODEVALUE: "-1"
            }, {
                CODENAME: "一次交清",
                CODEVALUE: "0"
            }, {
                CODENAME: "月交",
                CODEVALUE: "1"
            }, {
                CODENAME: "季交",
                CODEVALUE: "3"
            }, {
                CODENAME: "半年交",
                CODEVALUE: "6"
            }, {
                CODENAME: "年交",
                CODEVALUE: "12"
            }]);
            var ds2_2 = new unieap.ds.DataStore("insuYearFlag2", [{
                CODENAME: "年",
                CODEVALUE: "Y"
            }, {
                CODENAME: "岁",
                CODEVALUE: "A"
            }]);
            var ds3_2 = new unieap.ds.DataStore("insuYearFlag3", [{
                CODENAME: "年",
                CODEVALUE: "Y"
            }, {
                CODENAME: "岁",
                CODEVALUE: "A"
            }]);
            var ds2_3 = new unieap.ds.DataStore("job2", [{
                CODENAME: "一类职业",
                CODEVALUE: "1"
            }, {
                CODENAME: "二类职业",
                CODEVALUE: "2"
            }, {
                CODENAME: "三类职业",
                CODEVALUE: "3"
            }, {
                CODENAME: "四类职业",
                CODEVALUE: "4"
            }, {
                CODENAME: "五类职业",
                CODEVALUE: "5"
            }, {
                CODENAME: "六类职业",
                CODEVALUE: "6"
            }]);
            var ds3_3 = new unieap.ds.DataStore("job3", [{
                CODENAME: "一类职业",
                CODEVALUE: "1"
            }, {
                CODENAME: "二类职业",
                CODEVALUE: "2"
            }, {
                CODENAME: "三类职业",
                CODEVALUE: "3"
            }, {
                CODENAME: "四类职业",
                CODEVALUE: "4"
            }, {
                CODENAME: "五类职业",
                CODEVALUE: "5"
            }, {
                CODENAME: "六类职业",
                CODEVALUE: "6"
            }]);
            dataCenter.addDataStore(ds2_1);
            dataCenter.addDataStore(ds2_2);
            dataCenter.addDataStore(ds2_3);
            dataCenter.addDataStore(ds3_1);
            dataCenter.addDataStore(ds3_2);
            dataCenter.addDataStore(ds3_3);


            var ds = new unieap.ds.DataStore("ds_algoType", [{
                CODENAME: "理赔",
                CODEVALUE: "D1"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_subType1", [{
                CODEVALUE: "1",
                CODENAME: "疾病"
            }, {
                CODEVALUE: "2",
                CODENAME: "意外"
            }, {
                CODEVALUE: "3",
                CODENAME: "一般"
            }]);

            var ds2 = new unieap.ds.DataStore("ds_subType2", [{
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
            var ds6 = new unieap.ds.DataStore("ds_subType3", [{
                CODEVALUE: "S1",
                CODENAME: "生存金"
            }, {
                CODEVALUE: "S2",
                CODENAME: "满期金"
            }, {
                CODEVALUE: "S3",
                CODENAME: "年金"
            }]);

            var ds3 = new unieap.ds.DataStore("ds_sex", [{
                CODEVALUE: "0",
                CODENAME: "男"
            }, {
                CODEVALUE: "1",
                CODENAME: "女"
            }]);

            var ds4 = new unieap.ds.DataStore("ds_flag", [{
                CODEVALUE: "1",
                CODENAME: "社保"
            }, {
                CODEVALUE: "0",
                CODENAME: "非社保"
            }]);

            var ds5 = new unieap.ds.DataStore("ds_disable", [{
                CODEVALUE: "一",
                CODENAME: "一级伤残"
            }, {
                CODEVALUE: "二",
                CODENAME: "二级伤残"
            }, {
                CODEVALUE: "三",
                CODENAME: "三级伤残"
            }, {
                CODEVALUE: "四",
                CODENAME: "四级伤残"
            }, {
                CODEVALUE: "五",
                CODENAME: "五级伤残"
            }, {
                CODEVALUE: "六",
                CODENAME: "六级伤残"
            }, {
                CODEVALUE: "七",
                CODENAME: "七级伤残"
            }, {
                CODEVALUE: "八",
                CODENAME: "八级伤残"
            }, {
                CODEVALUE: "九",
                CODENAME: "九级伤残"
            }, {
                CODEVALUE: "十",
                CODENAME: "十级伤残"
            }]);


            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
            dataCenter.addDataStore(ds5);
            dataCenter.addDataStore(ds6);

        }

    });
    /**
     * @description:getInsurCode方法的成功回调。
     *
     */

    function getInsurCodeSuccess(dc) {
        var result = dc.getDataStore("getInsurCode");
        if (result.getRowSet().getRowCount() > 0) {
            unieap.byId("varNo3").getDataProvider().setDataStore(result);

            //unieap.byId("verNo").getDataProvider().setDataStore(result);
            //unieap.byId("verNo").setValue("");
            //unieap.byId("pricingLiabCode").setValue("");
            //unieap.byId("protecLiabCode").setValue("");

            unieap.byId("verNo4").getDataProvider().setDataStore(result);
            unieap.byId("verNo4").setValue("");
            unieap.byId("pricingLiabCode4").setValue("");
            unieap.byId("protecLiabCode4").setValue("");
        }
        else {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "没有此险种信息"
            });
        }
    }
    /**
     * @description:getPricingLiabDef方法的成功回调。
     *
     */

    function getPricingLiabDefSuccess(dc) {
        //unieap.byId("pricingLiabCode").getDataProvider().setDataStore(dc.getDataStore("getTPricingLiabDefs"));
        unieap.byId("pricingLiabCode3").getDataProvider().setDataStore(dc.getDataStore("getTPricingLiabDefs"));
        //unieap.byId("pricingLiabCode").setValue("");
        //unieap.byId("protecLiabCode").setValue("");

        unieap.byId("pricingLiabCode4").getDataProvider().setDataStore(dc.getDataStore("getTPricingLiabDefs"));
        unieap.byId("pricingLiabCode4").setValue("");
        unieap.byId("protecLiabCode4").setValue("");
    }
    /**
     * @description:getProtecLiabs方法的成功回调。
     *
     */

    function getProtecLiabsSuccess(dc) {
        //unieap.byId("protecLiabCode").getDataProvider().setDataStore(dc.getDataStore("queryPrestResultNoPage"));
        //unieap.byId("protecLiabCode").setValue("");

        unieap.byId("protecLiabCode4").getDataProvider().setDataStore(dc.getDataStore("queryPrestResultNoPage"));
        unieap.byId("protecLiabCode4").setValue("");
    }
    /**
     * @description:cal方法的成功回调。
     *
     */

    function calSuccess(dc) {
        var value = dc.getParameter("calTest");
        alert("赔付金额为：" + value);
    }
    /**
     * @description:premiumRate方法的成功回调。
     *
     */

    function premiumRateSuccess(dc) {
        var value = dc.getDataStore("rtpremiumRate");

        var amnt = value.rowSet.primary[0].amnt;
        var prem = value.rowSet.primary[0].prem;

        alert("保额:" + amnt + "     保费:" + prem);
    }
    /**
     * @description:getGivepay方法的成功回调。
     *
     */

    function getGivepaySuccess(dc) {
        var result = dc.getDataStore("getSurvvGivepay");
        unieap.byId("subType3_4").getDataProvider().setDataStore(result);
    }

    function insurtypeCode3_onBlur(event) {
        var code = unieap.byId("insurtypeCode3").getValue();
        if (code == "" || code == null) {

        }
        else {
            view.processor.getInsurCode(code);
        }
    }

    function varNo3_onChange(value) {
        view.processor.getPricingLiabDef(unieap.byId("insurtypeCode3").getValue(), value);
    }

    function form3_saveButton_onClick(event) {
        if (!unieap.byId("form3").validate(false)) {
            return;
        }


        var dto = view.form.getDataStore("form3");
        dto.rowSet.primary[0].appAge = unieap.byId("appAge3").getValue().toString();
        dto.rowSet.primary[0].insuYear = unieap.byId("insuYear3").getValue().toString();
        dto.rowSet.primary[0].payEndYear = unieap.byId("payEndYear3").getValue().toString();
        dto.rowSet.primary[0].unit = "1";
        var prem = unieap.byId("prem3").getValue();
        var amnt = unieap.byId("amnt3").getValue();

        view.processor.premiumRate(unieap.byId("insurtypeCode3").getValue(), unieap.byId("varNo3").getValue(), unieap.byId("pricingLiabCode3").getValue(), dto);
    }

    function tabPane3_onShow(pane) {
        unieap.byId("form3").clear();
        unieap.byId("form3").getBinding().getDataStore().getRowSet().clear(0);
    }

    function insurtypeCode4_onBlur(event) {
        var code = unieap.byId("insurtypeCode4").getValue();
        view.processor.getInsurCode(code);
    }

    function verNo4_onChange(value) {
        view.processor.getPricingLiabDef(unieap.byId("insurtypeCode4").getValue(), value);
    }

    function pricingLiabCode4_onChange(value) {
        var prcingLiabs = unieap.byId("pricingLiabCode4").getDataProvider().getDataStore();
        var count = prcingLiabs.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (prcingLiabs.getRowSet().getRow(i).getItemValue("pricingLiabCode") == value) {
                view.processor.getProtecLiabs(prcingLiabs.getRowSet().getRow(i).getItemValue("pricingLiabId"));
                break;
            }
        }
    }

    function protecLiabCode4_onChange(value) {
        var prcingLiabs = unieap.byId("protecLiabCode4").getDataProvider().getDataStore();
        var count = prcingLiabs.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (prcingLiabs.getRowSet().getRow(i).getItemValue("protecLiabCode") == value) {
                if (prcingLiabs.getRowSet().getRow(i).getItemValue("protecLiabType") == "0") {
                    view.processor.getGivepay(prcingLiabs.getRowSet().getRow(i).getItemValue("protecLiabId"));
                    unieap.getElementById("form1_7_tr").style.display = "";
                    unieap.getElementById("form1_5_tr").style.display = "none";
                    unieap.byId("subType1_4").setValue();
                    unieap.byId("subType1_4").setVisible(false);
                    unieap.getElementById("subType1_label").style.display = "none";
                    unieap.byId("subType2_4").setValue();
                    unieap.byId("subType2_4").setVisible(false);
                    unieap.getElementById("subType2_label").style.display = "none";
                    unieap.byId("subType3_4").setVisible(true);
                    unieap.getElementById("subType3_label").style.display = "block";
                }
                else {
                    unieap.getElementById("form1_5_tr").style.display = "";
                    unieap.getElementById("form1_7_tr").style.display = "none";
                    unieap.byId("subType1_4").setVisible(true);
                    unieap.getElementById("subType1_label").style.display = "block";
                    unieap.byId("subType2_4").setVisible(true);
                    unieap.getElementById("subType2_label").style.display = "block";
                    unieap.byId("subType3_4").setValue();
                    unieap.byId("subType3_4").setVisible(false);
                    unieap.getElementById("subType3_label").style.display = "none";
                }
                break;
            }
        }
    }

    function form4_saveButton_onClick(event) {
        var dto = view.form.getDataStore("form4");
        var riskCode = unieap.byId("insurtypeCode4").getValue();
        var verNo = unieap.byId("verNo4").getValue();
        var pricingLiabCode = unieap.byId("pricingLiabCode4").getValue();
        var protecLiabCode = unieap.byId("protecLiabCode4").getValue();
        var subType1 = unieap.byId("subType1_4").getValue();
        var subType2 = unieap.byId("subType2_4").getValue();
        if (subType2 == null || subType2 == "") {
            subType1 = "";
            subType2 = "";
        }
        var givepayCode = unieap.byId("subType3_4").getValue();
        var birthday;
        var accidentDate;
        var da = new Date();
        var yyyy;
        var MM;
        var dd;
        if (unieap.byId("bdsxr4").getValue() != "") {
            da.setTime(unieap.byId("bdsxr4").getValue());
            yyyy = da.getFullYear();
            MM = da.getMonth() + 1;
            dd = da.getDate();
            if (MM < 10) {
                MM = "0" + MM;
            }
            if (dd < 10) {
                dd = "0" + dd;
            }
            dto.rowSet.primary[0].bdsxr = yyyy + "" + MM + "" + dd;
        }
        if (unieap.byId("birthday4").getValue() != "") {
            da.setTime(unieap.byId("birthday4").getValue());
            yyyy = da.getFullYear();
            MM = da.getMonth() + 1;
            dd = da.getDate();
            if (MM < 10) {
                MM = "0" + MM;
            }
            if (dd < 10) {
                dd = "0" + dd;
            }
            dto.rowSet.primary[0].birthday = yyyy + "" + MM + "" + dd;
        }
        if (unieap.byId("accidentDate4").getValue() != "") {
            da.setTime(unieap.byId("accidentDate4").getValue());
            yyyy = da.getFullYear();
            MM = da.getMonth() + 1;
            dd = da.getDate();
            if (MM < 10) {
                MM = "0" + MM;
            }
            if (dd < 10) {
                dd = "0" + dd;
            }
            dto.rowSet.primary[0].accidentDate = yyyy + "" + MM + "" + dd;
        }

        dto.rowSet.primary[0].unit = "1";
        view.processor.cal(riskCode, verNo, pricingLiabCode, protecLiabCode, "D1", subType1, subType2, givepayCode, dto);
    }

    function tabPane4_onShow(pane) {
        unieap.byId("form4").clear();
        unieap.byId("form4").getBinding().getDataStore().getRowSet().clear(0);

        unieap.getElementById("form1_7_tr").style.display = "none";
        unieap.getElementById("form1_5_tr").style.display = "none";
        unieap.byId("subType1_4").setVisible(false);
        unieap.getElementById("subType1_label").style.display = "none";
        unieap.byId("subType2_4").setVisible(false);
        unieap.getElementById("subType2_label").style.display = "none";
        unieap.byId("subType3_4").setVisible(false);
        unieap.getElementById("subType3_label").style.display = "none";
    }

    var view = new _factoryabclife.test.calTest.View();
    view.init();

    return view;
})