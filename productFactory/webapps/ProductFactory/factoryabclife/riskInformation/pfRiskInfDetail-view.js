/**
 *
 * @author Administrator
 * @creationTime 2016-10-10 10:56:32
 * @modificationTime 2016-10-11 15:48:48
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskInfDetail", function () {
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskInfDetail_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.riskInformation.pfRiskInfDetail.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter

            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.riskInformation.pfRiskInfDetail.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_check_form')) {
                var tInsurtypeBasicInf_check_form = new unieap.ds.DataStore('tInsurtypeBasicInf_check_form');
                tInsurtypeBasicInf_check_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_check_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);


            navigateButton.activeNavigateButton("base");

            view.navigator.receiveData("审核险种信息", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                view.form.setDataStore("form1", tInsurtypeBasicInf);
                //navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            })
        },
        page_init: function () {
            //设计类型
            var ds_designType = new unieap.ds.DataStore("ds_designType", [{
                CODENAME: "普通",
                CODEVALUE: "01"
            }, {
                CODENAME: "分红",
                CODEVALUE: "02"
            }, {
                CODENAME: "万能",
                CODEVALUE: "03"
            }, {
                CODENAME: "投连",
                CODEVALUE: "04"
            }]);
            dataCenter.addDataStore(ds_designType);

            //一级分类
            var ds_level01 = new unieap.ds.DataStore("ds_level01", [{
                CODENAME: "人寿保险",
                CODEVALUE: "1a"
            }, {
                CODENAME: "意外伤害险",
                CODEVALUE: "1b"
            }, {
                CODENAME: "健康保险",
                CODEVALUE: "1c"
            }, {
                CODENAME: "健康保障委托管理产品",
                CODEVALUE: "1d"
            }]);
            dataCenter.addDataStore(ds_level01);

            //二级分类
            var ds_level02 = new unieap.ds.DataStore("ds_level02", [{
                CODENAME: "定期寿险",
                CODEVALUE: "2a",
                P: "1a"
            }, {
                CODENAME: "两全保险",
                CODEVALUE: "2b",
                P: "1a"
            }, {
                CODENAME: "年金保险",
                CODEVALUE: "2c",
                P: "1a"
            }, {
                CODENAME: "终身寿险",
                CODEVALUE: "2d",
                P: "1a"
            }, {
                CODENAME: "养老年金保险",
                CODEVALUE: "2e",
                P: "1a"
            }, {
                CODENAME: "",
                CODEVALUE: "2f",
                P: "1b"
            }, {
                CODENAME: "建工险",
                CODEVALUE: "2g",
                P: "1b"
            }, {
                CODENAME: "借款人意外险",
                CODEVALUE: "2h",
                P: "1b"
            }, {
                CODENAME: "疾病保险",
                CODEVALUE: "2i",
                P: "1c"
            }, {
                CODENAME: "医疗保险",
                CODEVALUE: "2j",
                P: "1c"
            }, {
                CODENAME: "账户医疗",
                CODEVALUE: "2k",
                P: "1d"
            }]);
            dataCenter.addDataStore(ds_level02);

            //三级分类
            var ds_level03 = new unieap.ds.DataStore("ds_level03", [{
                CODENAME: "",
                CODEVALUE: "3f",
                P: "2i"
            }, {
                CODENAME: "重大疾病",
                CODEVALUE: "3a",
                P: "2i"
            }, {
                CODENAME: "防癌保险",
                CODEVALUE: "3b",
                P: "2i"
            }, {
                CODENAME: "定额给付型医疗保险",
                CODEVALUE: "3c",
                P: "2j"
            }, {
                CODENAME: "费用补偿型医疗保险",
                CODEVALUE: "3d",
                P: "2j"
            }]);
            dataCenter.addDataStore(ds_level03);

            //四级分类
            var ds_level04 = new unieap.ds.DataStore("ds_level04", [{
                CODENAME: "",
                CODEVALUE: "4a",
                P: "3c"
            }, {
                CODENAME: "意外医疗",
                CODEVALUE: "4b",
                P: "3c"
            }, {
                CODENAME: "",
                CODEVALUE: "4c",
                P: "3d"
            }, {
                CODENAME: "意外医疗",
                CODEVALUE: "4d",
                P: "3d"
            }, {
                CODENAME: "企补医疗",
                CODEVALUE: "4e",
                P: "3d"
            }]);
            dataCenter.addDataStore(ds_level04);

            //主附险
            var ds_mainsub = new unieap.ds.DataStore("ds_mainsub", [{
                CODENAME: "主险",
                CODEVALUE: "01"
            }, {
                CODENAME: "附加险",
                CODEVALUE: "02"
            }]);
            dataCenter.addDataStore(ds_mainsub);

            //期限类型
            var ds_term = new unieap.ds.DataStore("ds_term", [{
                CODENAME: "短期",
                CODEVALUE: "01"
            }, {
                CODENAME: "极短期",
                CODEVALUE: "02"
            }, {
                CODENAME: "长期",
                CODEVALUE: "03"
            }]);
            dataCenter.addDataStore(ds_term);

            //是否
            var ds_yesNo = new unieap.ds.DataStore("ds_yesNo", [{
                CODENAME: "是",
                CODEVALUE: "1"
            }, {
                CODENAME: "否",
                CODEVALUE: "0"
            }]);
            dataCenter.addDataStore(ds_yesNo);

        }

    });

    var view = new _factoryabclife.riskInformation.pfRiskInfDetail.View();
    view.init();

    return view;
})