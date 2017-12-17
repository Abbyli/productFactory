/**
 * 理赔给付弹窗
 * @author zhy
 * @creationTime 2016-07-11 09:20:15
 * @modificationTime 2017-02-15 16:41:40
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestClaimDialog", function () {

    var opt = "";

    var original = null;

    var original2 = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestClaimDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPrestClaimSuccess: addPrestClaimSuccess,
                queryGivePaidSuccess: queryGivePaidSuccess,
                form_addClaim_saveButton_onClick: form_addClaim_saveButton_onClick,
                opt: opt,
                original: original,
                original2: original2
            });

            this.processor = new _factoryabclife.risk.pfRiskPrestClaimDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tGivepaidProcessDef_givepaid')) {
                var tGivepaidProcessDef_givepaid = new unieap.ds.DataStore('tGivepaidProcessDef_givepaid');
                tGivepaidProcessDef_givepaid.setRowSetName("com.neusoft.abclife.productfactory.entity.TGivepaidProcessDef");

                dataCenter.addDataStore(tGivepaidProcessDef_givepaid);
            }

            if (!dataCenter.getDataStore('tClaimGivepayDef_Claim')) {
                var tClaimGivepayDef_Claim = new unieap.ds.DataStore('tClaimGivepayDef_Claim');
                tClaimGivepayDef_Claim.setRowSetName("com.neusoft.abclife.productfactory.entity.TClaimGivepayDef");

                dataCenter.addDataStore(tClaimGivepayDef_Claim);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form_addClaim_saveButton"), "onClick", this.form_addClaim_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;
            opt = datas.opt;
            //默认给付代码  by scl 2016815
            unieap.byId("claimGivepayCode").setValue(datas.prestClaim.rowSet.primary[0].protecLiabCode);

            if (opt == "update") {
                original = (datas.live).rowSet.primary[0].claimGivepayCode;
                original2 = (datas.live).rowSet.primary[0].claimGivepayName;
                //禁用出险原因  赔付类型  by qyt 20160716
                unieap.byId("accidOccurReason__addClaim").setDisabled(true);
                unieap.byId("claimClaimPayType__addClaim").setDisabled(true);
                if (datas.live.rowSet.primary[0].waitPeriodDays > 0) {
                    unieap.byId("indemExemptId__addClaim").setValue("Y")
                }
                else {
                    unieap.byId("indemExemptId__addClaim").setValue("N")
                }
                view.form.setDataStore("form_addClaim", datas.live);
                //查询给付后信息
                var givepatId = datas.live.rowSet.primary[0].claimGivepayId;
                view.processor.queryGivePaid(givepatId);
            }
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
                },
                //{CODEVALUE:"10",CODENAME:"重大疾病（重症）"},
                //{CODEVALUE:"11",CODENAME:"重大疾病（轻症）"},
                {
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
                }
            ]);
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
                CODEVALUE: "09",
                CODENAME: "削减附加险合同基本保额"
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
                }
                //{CODEVALUE:"10",CODENAME:"轨道"},
                //{CODEVALUE:"11",CODENAME:"摆渡"}
            ]);

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
     * @description:addPrestClaim方法的成功回调。
     *
     */

    function addPrestClaimSuccess(dc) {
        var info = dc.getParameter("addPrestClaimResult");
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
     * @description:queryGivePaid方法的成功回调。
     *
     */

    function queryGivePaidSuccess(dc) {
        var result = dc.getDataStore("queryGivePaidResult");
        var Count = result.getRowSet().getRowCount();
        //下拉框多选赋值
        if (Count > 0) {
            var giveValue = result.rowSet.primary[0].givepaidActionType;
            for (var i = 1, j = Count; i < j; i++) {
                giveValue = giveValue + "," + result.rowSet.primary[i].givepaidActionType;
            }
            unieap.byId("comboBox_actionType").setValue(giveValue);
        }
    }

    function form_addClaim_saveButton_onClick(event) {
        if (!unieap.byId("form_addClaim").validate(false)) {
            return;
        }
        var datas = unieap.getXDialog().dialogData;
        var protecLiabId = datas.prestClaim.rowSet.primary[0].protecLiabId;
        var protecLiabType = datas.prestClaim.rowSet.primary[0].protecLiabType;
        var protecLiabCode = datas.prestClaim.rowSet.primary[0].protecLiabCode;
        var pricingLiabCode = datas.prestClaim.rowSet.primary[0].pricingLiabCode;
        var claimGivepayCode = unieap.byId("claimGivepayCode").getValue();
        //观察期
        var prestClaim = view.form.getDataStore("form_addClaim");
        if (unieap.byId("indemExemptId__addClaim").getValue() == "N") {
            prestClaim.rowSet.primary[0].waitPeriodDays = "";
        }
        if (unieap.byId("indemExemptId__addClaim").getValue() == "Y" && unieap.byId("textBox1").getValue() == "") {
            MessageBox.alert({
                title: "提示",
                message: "请填写天数"
            });
            return;
        }
        var entity = prestClaim.rowSet.primary[0];
        entity.protecLiabId = protecLiabId;
        entity.protecLiabCode = protecLiabCode;
        entity.pricingLiabCode = pricingLiabCode;
        entity.claimGivepayCode = claimGivepayCode;
        //给付后信息
        var givePaid = unieap.byId("comboBox_actionType").values;
        if (original == entity.claimGivepayCode) {
            opt = "original";
        }
        if (original2 == entity.claimGivepayName) {
            opt = "original2"
        }
        if (original == entity.claimGivepayCode && original2 == entity.claimGivepayName) {
            opt = "no";
        }
        view.processor.addPrestClaim(prestClaim, givePaid, protecLiabType, opt);
    }

    var view = new _factoryabclife.risk.pfRiskPrestClaimDialog.View();
    view.init();

    return view;
})