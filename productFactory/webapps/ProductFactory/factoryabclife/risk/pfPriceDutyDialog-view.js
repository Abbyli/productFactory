/**
 * 定价责任弹窗
 * @author Administrator
 * @creationTime 2016-06-28 14:05:50
 * @modificationTime 2017-03-16 14:05:05
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfPriceDutyDialog", function () {

    var basic = null;

    var opt = "";

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfPriceDutyDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addAupdateSuccess: addAupdateSuccess,
                queryInsurtypeFeeDefSuccess: queryInsurtypeFeeDefSuccess,
                queryLiabFeeDefSuccess: queryLiabFeeDefSuccess,
                getFormulaSuccess: getFormulaSuccess,
                queryTWaiveLiabSuccess: queryTWaiveLiabSuccess,
                queryTSuminsurIncremSuccess: queryTSuminsurIncremSuccess,
                getFormulaMultSuccess: getFormulaMultSuccess,
                isWaive_onChange: isWaive_onChange,
                isAmntIncrem_onChange: isAmntIncrem_onChange,
                parmntCheck_onChange: parmntCheck_onChange,
                calcDirection_onChange: calcDirection_onChange,
                premAlgoId_onChange: premAlgoId_onChange,
                feeCheck_onChange: feeCheck_onChange,
                addPremCheck_onClick: addPremCheck_onClick,
                healthCheck_onClick: healthCheck_onClick,
                healthCheck_onChange: healthCheck_onChange,
                jobCheck_onClick: jobCheck_onClick,
                jobCheck_onChange: jobCheck_onChange,
                saveliab_onClick: saveliab_onClick,
                basic: basic,
                opt: opt
            });

            this.processor = new _factoryabclife.risk.pfPriceDutyDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tLiabFeeDef')) {
                var tLiabFeeDef = new unieap.ds.DataStore('tLiabFeeDef');
                tLiabFeeDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabFeeDef");

                dataCenter.addDataStore(tLiabFeeDef);
            }

            if (!dataCenter.getDataStore('map')) {
                var map = new unieap.ds.DataStore('map');
                map.setRowSetName("com.neusoft.abclife.productfactory.dto.MapDto");

                dataCenter.addDataStore(map);
            }

            if (!dataCenter.getDataStore('tLiabFeeDef_form2')) {
                var tLiabFeeDef_form2 = new unieap.ds.DataStore('tLiabFeeDef_form2');
                tLiabFeeDef_form2.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabFeeDef");

                dataCenter.addDataStore(tLiabFeeDef_form2);
            }

            if (!dataCenter.getDataStore('tInsurtypeFeeDef')) {
                var tInsurtypeFeeDef = new unieap.ds.DataStore('tInsurtypeFeeDef');
                tInsurtypeFeeDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef");

                dataCenter.addDataStore(tInsurtypeFeeDef);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_saveobj')) {
                var tInsurtypeBasicInf_saveobj = new unieap.ds.DataStore('tInsurtypeBasicInf_saveobj');
                tInsurtypeBasicInf_saveobj.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_saveobj);
            }

            if (!dataCenter.getDataStore('in_tSuminsurIncrem')) {
                var in_tSuminsurIncrem = new unieap.ds.DataStore('in_tSuminsurIncrem');
                in_tSuminsurIncrem.setRowSetName("com.neusoft.abclife.productfactory.entity.TSuminsurIncrem");

                dataCenter.addDataStore(in_tSuminsurIncrem);
            }

            if (!dataCenter.getDataStore('in_tWaiveLiab')) {
                var in_tWaiveLiab = new unieap.ds.DataStore('in_tWaiveLiab');
                in_tWaiveLiab.setRowSetName("com.neusoft.abclife.productfactory.entity.TWaiveLiab");

                dataCenter.addDataStore(in_tWaiveLiab);
            }

            if (!dataCenter.getDataStore('tPricingLiabDef_form')) {
                var tPricingLiabDef_form = new unieap.ds.DataStore('tPricingLiabDef_form');
                tPricingLiabDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TPricingLiabDef");

                dataCenter.addDataStore(tPricingLiabDef_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("isWaive"), "onChange", this.isWaive_onChange);

            this.connect(unieap.byId("isAmntIncrem"), "onChange", this.isAmntIncrem_onChange);

            this.connect(unieap.byId("parmntCheck"), "onChange", this.parmntCheck_onChange);

            this.connect(unieap.byId("calcDirection"), "onChange", this.calcDirection_onChange);

            this.connect(unieap.byId("premAlgoId"), "onChange", this.premAlgoId_onChange);

            this.connect(unieap.byId("feeCheck"), "onChange", this.feeCheck_onChange);

            this.connect(unieap.byId("addPremCheck"), "onClick", this.addPremCheck_onClick);

            this.connect(unieap.byId("healthCheck"), "onClick", this.healthCheck_onClick);

            this.connect(unieap.byId("healthCheck"), "onChange", this.healthCheck_onChange);

            this.connect(unieap.byId("jobCheck"), "onClick", this.jobCheck_onClick);

            this.connect(unieap.byId("jobCheck"), "onChange", this.jobCheck_onChange);

            this.connect(unieap.byId("saveliab"), "onClick", this.saveliab_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;


            basic = datas.basicinf;
            opt = datas.opt;
            //可选标记默认为否
            unieap.byId("uniDutyType").setValue("0");
            unieap.byId("isOpt").setValue("1");
            unieap.byId("isWaive").setValue("0");
            unieap.byId("isAmntIncrem").setValue("0");
            unieap.byId("waiveType").setVisible(false);
            unieap.byId("incremWay").setVisible(false);
            unieap.byId("increm_Freq").setVisible(false);
            unieap.byId("increm_Propor").setVisible(false);
            unieap.getElementById("waiveType_label").style.display = "none";
            unieap.getElementById("incremWay_label").style.display = "none";
            unieap.getElementById("increm_Freq_label").style.display = "none";
            unieap.getElementById("increm_Propor_label").style.display = "none";

            //同步方法加载算法
            view.processor.getFormula();

            if (opt == "update") {
                //禁用定价责任代码 by qyt 20160716
                unieap.byId("pricingLiabCode").setReadOnly(true);
                view.form.setDataStore("liab", datas.liab);
                var parmnt = datas.liab.rowSet.primary[0];
                //缴费定义如果其中有条不为空就显示
                if (parmnt.calcDirection != null || parmnt.suminsurAlgo != null || parmnt.premAlgo != null) {
                    var value = parmnt.calcDirection;
                    unieap.byId("amntPremUnit").setValue(parmnt.amntPremUnit);
                    unieap.byId("calcDirection").onChange(value);
                    unieap.byId("parmntCheck").setChecked(true);
                    unieap.byId("calcDirection").setValue(parmnt.calcDirection);
                    unieap.byId("suminsurAlgoId").setValue(parmnt.suminsurAlgoId);
                    unieap.byId("premAlgoId").setValue(parmnt.premAlgoId);

                    unieap.byId("parmntCheck").onChange(true);
                }

                unieap.byId("isOpt").setValue(parmnt.isOpt);

                view.processor.queryLiabFeeDef(datas.liab);
                view.processor.queryInsurtypeFeeDef(datas.liab);

                var isWaive = unieap.byId("isWaive").getValue();
                var isAmntIncrem = unieap.byId("isAmntIncrem").getValue();
                if (isWaive == "0") {
                    unieap.byId("waiveType").setVisible(false);
                    unieap.getElementById("waiveType_label").style.display = "none";
                }
                else {
                    unieap.byId("waiveType").setVisible(true);
                    unieap.getElementById("waiveType_label").style.display = "block";
                    view.processor.queryTWaiveLiab(datas.liab);
                }
                if (isAmntIncrem == "0") {
                    unieap.byId("incremWay").setVisible(false);
                    unieap.getElementById("incremWay_label").style.display = "none";
                    unieap.byId("increm_Freq").setVisible(false);
                    unieap.getElementById("increm_Freq_label").style.display = "none";
                    unieap.byId("increm_Propor").setVisible(false);
                    unieap.getElementById("increm_Propor_label").style.display = "none";
                }
                else {
                    unieap.byId("incremWay").setVisible(true);
                    unieap.getElementById("incremWay_label").style.display = "block";
                    unieap.byId("increm_Freq").setVisible(true);
                    unieap.getElementById("increm_Freq_label").style.display = "block";
                    unieap.byId("increm_Propor").setVisible(true);
                    unieap.getElementById("increm_Propor_label").style.display = "block";
                    view.processor.queryTSuminsurIncrem(datas.liab);
                }
            }
        },
        page_init: function () {
            //计算方向默认dataStore
            var ds = new unieap.ds.DataStore("ds_direct", [{
                CODENAME: "保额算保费",
                CODEVALUE: "02"
            }, {
                CODENAME: "保费算保额",
                CODEVALUE: "01"
            }, {
                CODENAME: "按份数计算",
                CODEVALUE: "03"
            }, {
                CODENAME: "录入保费保额",
                CODEVALUE: "04"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_choose", [{
                CODENAME: "必选",
                CODEVALUE: "1"
            }, {
                CODENAME: "可选",
                CODEVALUE: "0"
            }]);

            var ds2 = new unieap.ds.DataStore("isWaive", [{
                CODENAME: "是",
                CODEVALUE: "1"
            }, {
                CODENAME: "否",
                CODEVALUE: "0"
            }]);

            var ds3 = new unieap.ds.DataStore("isAmntIncrem", [{
                CODENAME: "是",
                CODEVALUE: "1"
            }, {
                CODENAME: "否",
                CODEVALUE: "0"
            }]);

            var ds4 = new unieap.ds.DataStore("waiveType", [{
                CODENAME: "豁免主险合同",
                CODEVALUE: "1"
            }, {
                CODENAME: "豁免保单合同",
                CODEVALUE: "2"
            }, {
                CODENAME: "豁免长期主附险合同",
                CODEVALUE: "3"
            }]);

            var ds5 = new unieap.ds.DataStore("incremWay", [{
                CODENAME: "期间内",
                CODEVALUE: "1"
            }, {
                CODENAME: "续期",
                CODEVALUE: "2"
            }]);

            var ds6 = new unieap.ds.DataStore("ds_uniDutyType", [{
                CODENAME: "非万能",
                CODEVALUE: "0"
            }, {
                CODENAME: "万能基本",
                CODEVALUE: "1"
            }, {
                CODENAME: "万能额外",
                CODEVALUE: "2"
            }])
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
     * @description:addAupdate方法的成功回调。
     *
     */

    function addAupdateSuccess(dc) {
        var info = dc.getParameter("addAndUpdateThree");
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
     * @description:queryInsurtypeFeeDef方法的成功回调。
     *
     */

    function queryInsurtypeFeeDefSuccess(dc) {
        var InsurtypeFeeDef = dc.getDataStore("queryInsurtypeFeeDef");
        var count = InsurtypeFeeDef.getRowSet().getRowCount();

        if (count > 0) {
            if (InsurtypeFeeDef.rowSet.primary[0].feeType == "B0") {
                view.form.setDataStore("form_fee", InsurtypeFeeDef);
                unieap.byId("feeCheck").setChecked(false);
                unieap.byId("feeCheck").onChange(false);
                if (InsurtypeFeeDef.rowSet.primary[0].feeCalcFormulaId != null) {
                    unieap.byId("feeCheck").setChecked(true);
                    unieap.byId("feeCalcFormulaId").setValue(InsurtypeFeeDef.rowSet.primary[0].feeCalcFormulaId);
                    unieap.byId("feeCheck").onChange(true);
                }

            }
        }
    }
    /**
     * @description:queryLiabFeeDef方法的成功回调。
     *
     */

    function queryLiabFeeDefSuccess(dc) {
        //根据险种和责任查询出的固定两条数据进行类型判定


        var LiabFeeDef = dc.getDataStore("queryLiabFeeDef");

        var count = LiabFeeDef.getRowSet().getRowCount();
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var rowset = new unieap.ds.RowSet();
                var ds = new unieap.ds.DataStore();
                ds.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabFeeDef");
                rowset.addRow(LiabFeeDef.rowSet.primary[i]);
                ds.setRowSet(rowset);
                //加费为职业加费
                if (LiabFeeDef.rowSet.primary[i].addpremType == "02") {
                    if (LiabFeeDef.rowSet.primary[i].addpremAlgoId != null) {
                        unieap.byId("addPremCheck").setChecked(true);
                        view.form.setDataStore("form_addprem", ds);
                        unieap.byId("jobCheck").setChecked(true);
                        unieap.byId("jobCheck").onChange(true);
                    }

                }
                //加费为健康加费
                if (LiabFeeDef.rowSet.primary[i].addpremType == "01") {
                    if (LiabFeeDef.rowSet.primary[i].addpremAlgoId != null) {
                        unieap.byId("addPremCheck").setChecked(true);
                        view.form.setDataStore("form_addprem2", ds);
                        unieap.byId("healthCheck").setChecked(true);
                        unieap.byId("healthCheck").onChange(true);
                    }
                }
            }
        }
    }
    /**
     * @description:getFormula方法的成功回调。
     *
     */

    function getFormulaSuccess(dc) {
        unieap.byId("premAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaA1"));
        unieap.byId("suminsurAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaA2"));
        unieap.byId("feeCalcFormulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaB3"));
        unieap.byId("addpremAlgoIdh").getDataProvider().setDataStore(dc.getDataStore("getFormulaC1"));
        unieap.byId("addpremAlgoIdj").getDataProvider().setDataStore(dc.getDataStore("getFormulaC2"));
    }
    /**
     * @description:queryTWaiveLiab方法的成功回调。
     *
     */

    function queryTWaiveLiabSuccess(dc) {
        var tWaiveLiab = dc.getDataStore("reqQueryTWaiveLiab");
        var count = tWaiveLiab.getRowSet().getRowCount();
        if (count > 0) {
            if (tWaiveLiab.getRowSet().primary[0].waiveType != null) {
                unieap.byId("waiveType").setValue(tWaiveLiab.getRowSet().primary[0].waiveType);
            }
        }
    }
    /**
     * @description:queryTSuminsurIncrem方法的成功回调。
     *
     */

    function queryTSuminsurIncremSuccess(dc) {
        var tWaiveLiab = dc.getDataStore("reqQueryTSuminsurIncrem");
        var count = tWaiveLiab.getRowSet().getRowCount();
        if (count > 0) {
            if (tWaiveLiab.getRowSet().primary[0].incremWay != null) {
                unieap.byId("incremWay").setValue(tWaiveLiab.getRowSet().primary[0].incremWay);
            }
            if (tWaiveLiab.getRowSet().primary[0].incremFreq != null) {
                unieap.byId("increm_Freq").setValue(tWaiveLiab.getRowSet().primary[0].incremFreq);
            }
            if (tWaiveLiab.getRowSet().primary[0].incremPropor != null) {
                unieap.byId("increm_Propor").setValue(tWaiveLiab.getRowSet().primary[0].incremPropor);
            }
        }
    }
    /**
     * @description:getFormulaMult方法的成功回调。
     *
     */

    function getFormulaMultSuccess(dc) {
        unieap.byId("premAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaMultA1"));
        unieap.byId("suminsurAlgoId").getDataProvider().setDataStore(dc.getDataStore("getFormulaMultA2"));
    }

    function isWaive_onChange(checkbox) {
        var value = unieap.byId("isWaive").getValue();
        if (value == "1") {
            unieap.byId("waiveType").setVisible(true);
            unieap.getElementById("waiveType_label").style.display = "block";
        }
        else {
            unieap.byId("waiveType").setValue();
            unieap.byId("waiveType").setVisible(false);
            unieap.getElementById("waiveType_label").style.display = "none";
        }
    }

    function isAmntIncrem_onChange(checkbox) {
        var value = unieap.byId("isAmntIncrem").getValue();
        if (value == "1") {
            unieap.byId("incremWay").setVisible(true);
            unieap.getElementById("incremWay_label").style.display = "block";
            unieap.byId("increm_Freq").setVisible(true);
            unieap.getElementById("increm_Freq_label").style.display = "block";
            unieap.byId("increm_Propor").setVisible(true);
            unieap.getElementById("increm_Propor_label").style.display = "block";
        }
        else {
            unieap.byId("incremWay").setValue();
            unieap.byId("increm_Freq").setValue();
            unieap.byId("increm_Propor").setValue();
            unieap.byId("incremWay").setVisible(false);
            unieap.getElementById("incremWay_label").style.display = "none";
            unieap.byId("increm_Freq").setVisible(false);
            unieap.getElementById("increm_Freq_label").style.display = "none";
            unieap.byId("increm_Propor").setVisible(false);
            unieap.getElementById("increm_Propor_label").style.display = "none";
        }
    }

    function parmntCheck_onChange(checked) {
        if (checked) {
            unieap.byId("calcDirection").setRequired(true);
            unieap.byId("premAlgoId").setRequired(true);
            unieap.byId("suminsurAlgoId").setRequired(true);
        }
        else {
            unieap.byId("calcDirection").setRequired(false);
            unieap.byId("premAlgoId").setRequired(false);
            unieap.byId("suminsurAlgoId").setRequired(false);
            unieap.byId("amntPremUnit").setRequired(false);
        }
    }

    function calcDirection_onChange(value) {
        if (value == "01") {
            view.processor.getFormula();
            unieap.byId("premAlgoId").setValue("");
            unieap.byId("suminsurAlgoId").setDisabled(true);
            unieap.byId("suminsurAlgoId").setValue("34");
            unieap.byId("premAlgoId").setDisabled(false);
            unieap.getElementById("myTr").style.display = "none";
            unieap.byId("amntPremUnit").setRequired(false);
        }

        if (value == "02") {
            view.processor.getFormula();
            unieap.byId("suminsurAlgoId").setValue("");
            unieap.byId("suminsurAlgoId").setDisabled(false);
            unieap.byId("premAlgoId").setDisabled(true);
            unieap.byId("premAlgoId").setValue("33");
            unieap.getElementById("myTr").style.display = "none";
            unieap.byId("amntPremUnit").setRequired(false);
        }

        if (value == "03") {
            view.processor.getFormulaMult();
            unieap.byId("suminsurAlgoId").setValue("");
            unieap.byId("premAlgoId").setValue("");
            unieap.byId("suminsurAlgoId").setDisabled(false);
            unieap.byId("premAlgoId").setDisabled(false);
            unieap.getElementById("myTr").style.display = "";
            unieap.byId("amntPremUnit").setRequired(true);
        }

        if (value == "04") {
            view.processor.getFormula();
            unieap.byId("suminsurAlgoId").setDisabled(true);
            unieap.byId("premAlgoId").setDisabled(true);
            unieap.byId("suminsurAlgoId").setValue("34");
            unieap.byId("premAlgoId").setValue("33");
            unieap.getElementById("myTr").style.display = "none";
            unieap.byId("amntPremUnit").setRequired(false);
        }
    }

    function premAlgoId_onChange(value) {
        if (value == "55") {
            unieap.byId("amntPremUnit").setRequired(true);
        }
        else {
            unieap.byId("amntPremUnit").setRequired(false);
        }

    }

    function feeCheck_onChange(checked) {
        if (checked) {
            unieap.byId("feeCalcFormulaId").setRequired(true);
        }
        else {
            unieap.byId("feeCalcFormulaId").setRequired(false);
        }
    }

    function addPremCheck_onClick(event) {
        //加费定义多选框js方法
        if (unieap.byId("addPremCheck").isChecked()) {
            unieap.byId("healthCheck").setChecked(true);
            unieap.byId("jobCheck").setChecked(true);
            unieap.byId("healthCheck").onChange(true);
            unieap.byId("jobCheck").onChange(true);
        }
        else {
            unieap.byId("healthCheck").setChecked(false);
            unieap.byId("jobCheck").setChecked(false);
            unieap.byId("healthCheck").onChange(false);
            unieap.byId("jobCheck").onChange(false);
        }
    }

    function healthCheck_onClick(event) {
        //加费定义多选框js方法

        if (unieap.byId("healthCheck").isChecked()) {
            unieap.byId("addPremCheck").setChecked(true);
        }
    }

    function healthCheck_onChange(checked) {
        if (checked) {
            unieap.byId("addpremAlgoIdh").setRequired(true);
        }
        else {
            unieap.byId("addpremAlgoIdh").setRequired(false);
        }
    }

    function jobCheck_onClick(event) {
        if (unieap.byId("jobCheck").isChecked()) {
            unieap.byId("addPremCheck").setChecked(true);
        }
    }

    function jobCheck_onChange(checked) {
        if (checked) {
            unieap.byId("addpremAlgoIdj").setRequired(true);
        }
        else {
            unieap.byId("addpremAlgoIdj").setRequired(false);
        }
    }

    function saveliab_onClick(event) {
        if (!unieap.byId("liab").validate(false)) {
            return;
        }


        //获取险种id
        var insurtypeId = basic.rowSet.primary[0].insurtypeId;
        //获取险种代码
        var insurtypeCode = basic.rowSet.primary[0].insurtypeCode;

        //缴费定义复选框状态
        var parmntCheck = unieap.byId("parmntCheck").isChecked();

        //扣费定义复选框状态
        var feeCheck = unieap.byId("feeCheck").isChecked();

        //加费定义复选框状态
        var addpremCheck = unieap.byId("addPremCheck").isChecked();

        //定义多多选框标识
        var feeOpt = "no";
        var addPremOpt = "no";

        //获取4个表单数据
        var parmnt = view.form.getDataStore("liab");
        var feeform = view.form.getDataStore("form_fee");
        parmnt.rowSet.primary[0].amntPremUnit = unieap.byId("amntPremUnit").getValue();
        var addpremform = new unieap.ds.DataStore();
        var rowSet = new unieap.ds.RowSet();
        addpremform.setRowSetName("com.neusoft.abclife.productfactory.entity.TLiabFeeDef");
        //var addpremform =view.form.getDataStore("form_addprem");
        //var addpremform2 = view.form.getDataStore("form_addprem2");

        parmnt.rowSet.primary[0].insurtypeId = insurtypeId;
        //缴费定义框
        if (parmntCheck) {
            var direct = unieap.byId("calcDirection").getValue();
            var amnt = unieap.byId("suminsurAlgoId").getValue();
            var prem = unieap.byId("premAlgoId").getValue();
            parmnt.rowSet.primary[0].calcDirection = direct;
            parmnt.rowSet.primary[0].suminsurAlgoId = amnt;
            parmnt.rowSet.primary[0].premAlgoId = prem;
        }
        else {
            parmnt.rowSet.primary[0].calcDirection = null;
            parmnt.rowSet.primary[0].suminsurAlgoId = null;
            parmnt.rowSet.primary[0].premAlgoId = null;
        }

        //扣费定义
        if (feeCheck) {
            feeOpt = "yes";
            feeform.rowSet.primary[0].insurtypeId = insurtypeId;
            feeform.rowSet.primary[0].feeType = "B0";
            feeform.rowSet.primary[0].feeCalcFormulaId = unieap.byId("feeCalcFormulaId").getValue();
        }
        //加费定义赋值
        var jobCheck = unieap.byId("jobCheck").isChecked();
        var healthCheck = unieap.byId("healthCheck").isChecked();
        if (addpremCheck) {
            if (jobCheck) {
                addPremOpt = "yes";
                var data = {
                    "insurtypeId": insurtypeId,
                    addpremType: "02",
                    addpremAlgoId: unieap.byId("addpremAlgoIdj").getValue()
                }
                rowSet.addRow(data);
            }
            if (healthCheck) {
                addPremOpt = "yes";
                var data = {
                    "insurtypeId": insurtypeId,
                    addpremType: "01",
                    addpremAlgoId: unieap.byId("addpremAlgoIdh").getValue()
                }
                rowSet.addRow(data);
            }
            addpremform.setRowSet(rowSet);
        }

        //传递标识来保存数据
        var ds = new unieap.ds.DataStore([{
            "fee": feeOpt,
            "addprem": addPremOpt,
            "opt": opt
        }]);
        ds.rowSetName = "com.neusoft.abclife.productfactory.dto.MapDto";

        //var parttenName = /^[u4e00-u9fa5]{1,}$/;
        //if(parttenName.test(parmnt.rowSet.primary[0].pricingLiabName)){
        //	MessageBox.autoCloseAlert({
        //		title:"提示",
        //		message:"请输入汉字的定价名称！"
        //	});
        //	return;
        //}

        var waiveType = unieap.byId("waiveType").getValue();
        var incremWay = unieap.byId("incremWay").getValue();
        var increm_Freq = unieap.byId("increm_Freq").getValue();
        var increm_Propor = unieap.byId("increm_Propor").getValue();
        //责任代码
        var pricingLiabCode = parmnt.rowSet.primary[0].pricingLiabCode;

        if (unieap.byId("isWaive").getValue() == "1" && waiveType == null) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "豁免类型必填 ！ "
            });
            return;
        }
        if (unieap.byId("isAmntIncrem").getValue() == "1") {
            if (incremWay == null) {
                MessageBox.autoCloseAlert({
                    title: "提示",
                    message: "递增方式必选 ！ "
                });
                return;
            }
            if (increm_Freq == "") {
                MessageBox.autoCloseAlert({
                    title: "提示",
                    message: "递增频率必填 ！ "
                });
                return;
            }
            if (parseInt(increm_Freq) < 1 || parseInt(increm_Freq) > 99) {
                MessageBox.autoCloseAlert({
                    title: "提示",
                    message: "请正确填写递增频率 ！ "
                });
                return;
            }
            if (increm_Propor == "") {
                MessageBox.autoCloseAlert({
                    title: "提示",
                    message: "递增比例必填 ！ "
                });
                return;
            }
        }

        var tWaiveLiab = new unieap.ds.DataStore("tWaiveLiab", [{
            "insurtypeId": insurtypeId,
            "insurtypeCode": insurtypeCode,
            "liabCode": pricingLiabCode,
            "waiveObj": "投保人",
            "waiveType": waiveType
        }]);
        tWaiveLiab.setRowSetName("com.neusoft.abclife.productfactory.entity.TWaiveLiab");

        var tSuminsurIncrem = new unieap.ds.DataStore("tSuminsurIncrem", [{
            "insurtypeId": insurtypeId,
            "insurtypeCode": insurtypeCode,
            "liabCode": pricingLiabCode,
            "incremWay": incremWay,
            "incremFreq": increm_Freq,
            "incremPropor": increm_Propor
        }]);
        tSuminsurIncrem.setRowSetName("com.neusoft.abclife.productfactory.entity.TSuminsurIncrem");
        view.processor.addAupdate(feeform, addpremform, parmnt, ds, basic, tWaiveLiab, tSuminsurIncrem);

    }

    var view = new _factoryabclife.risk.pfPriceDutyDialog.View();
    view.init();

    return view;
})