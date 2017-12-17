/**
 *
 * @author liu.w
 * @creationTime 2016-01-22 08:48:26
 * @modificationTime 2016-12-22 10:00:45
 * @version 1.0.0
 * @generated
 */
/*------------------------Message相关代码 Begin-------------------------*/
//该段代码是临时放置在此的，原本需要参照Processor相关代码的处理方式单独放置
dojo.provide("factoryabclife.navigateButton.MessageTrigger");
dojo.declare("factoryabclife.navigateButton.MessageTrigger", unieap.view.MessageTrigger, {
    messageMetaInfo: {
        from: "factoryabclife.navigateButton.MessageTrigger"
    }
});

dojo.provide("factoryabclife.navigateButton.MessageListener");
dojo.declare("factoryabclife.navigateButton.MessageListener", unieap.view.MessageListener, {

});
/*------------------------Message相关代码 End-------------------------*/

dojo.require("unieap.view.View");
unieap.define(navigateButtonContext, function () {

    function getViewcContext() {
        return view._viewcContext;
    }

    dojo.declare("_factoryabclife.risk.navigateButton.View", unieap.view.View, {


        _viewcContext: "",

        getViewcContext: function () {
            return this._viewcContext;
        },
        setViewcContext: function (viewcContext) {
            this._viewcContext = viewcContext;
        },


        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                backToRiskConfig: backToRiskConfig,
                prepareDCParameter: prepareDCParameter,
                activeNavigateButton: activeNavigateButton,
                showBtn: showBtn,
                button_back_onClick: button_back_onClick,
                base_onClick: base_onClick,
                param_onClick: param_onClick,
                duty_onClick: duty_onClick,
                get_onClick: get_onClick,
                liablimit_onClick: liablimit_onClick,
                account_onClick: account_onClick,
                feemanage_onClick: feemanage_onClick,
                Attrib_onClick: Attrib_onClick,
                item_onClick: item_onClick,
                itemProperty_onClick: itemProperty_onClick,
                ratemanage_onClick: ratemanage_onClick,
                riskamnt_onClick: riskamnt_onClick
            });

            this.processor = new _factoryabclife.risk.navigateButton.Processor(this);

            this.messageTrigger = new factoryabclife.navigateButton.MessageTrigger(this);
            this.messageListener = new factoryabclife.navigateButton.MessageListener(this);
            this.message = this.messageTrigger; //同义词变量，方便使用

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {},

        page_initEvents: function () {

            this.connect(unieap.byId("button_back"), "onClick", this.button_back_onClick);

            this.connect(unieap.byId("base"), "onClick", this.base_onClick);

            this.connect(unieap.byId("param"), "onClick", this.param_onClick);

            this.connect(unieap.byId("duty"), "onClick", this.duty_onClick);

            this.connect(unieap.byId("get"), "onClick", this.get_onClick);

            this.connect(unieap.byId("liablimit"), "onClick", this.liablimit_onClick);

            this.connect(unieap.byId("account"), "onClick", this.account_onClick);

            this.connect(unieap.byId("feemanage"), "onClick", this.feemanage_onClick);

            this.connect(unieap.byId("Attrib"), "onClick", this.Attrib_onClick);

            this.connect(unieap.byId("item"), "onClick", this.item_onClick);

            this.connect(unieap.byId("itemProperty"), "onClick", this.itemProperty_onClick);

            this.connect(unieap.byId("ratemanage"), "onClick", this.ratemanage_onClick);

            this.connect(unieap.byId("riskamnt"), "onClick", this.riskamnt_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function backToRiskConfig(navigatorContainer) {
        //navigatorContainer.tablistContainer.style.display="none";
        var navigatorList = navigatorContainer.navigatorList;
        var page = null;
        for (var i = 0; i < navigatorList.length; i++) {
            if (navigatorList[i].title == "个险定义") {
                page = navigatorList[i];
                break;
            }
        }
        if (page) {
            navigatorContainer.tablist.onButtonClick(page);
        }
    }

    function prepareDCParameter() {
        var newDC = new unieap.ds.DataCenter();
        newDC.addDataStore("tInsurtypeBasicInf", dataCenter.getDataStore("tInsurtypeBasicInf"));
        return newDC;
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function activeNavigateButton(id) {
        var navbtn = unieap.byId(id);
        navbtn.setIconClass("navBtn-icon navBtn-active-icon");
        dojo.addClass(navbtn.domNode, "navBtn-active")
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function showBtn(ds) {
        if (ds.rowSet.primary[0].designType == "03") {
            unieap.byId("feemanage").setDisplay("block");
        }
        else {
            unieap.byId("feemanage").setDisplay("none");
        }
        if (ds.rowSet.primary[0].isAccType == "1") {
            unieap.byId("account").setDisplay("block");
        }
        else {
            unieap.byId("account").setDisplay("none");
        }
    }

    function button_back_onClick(event) {
        var rtnDc = new unieap.ds.DataStore();
        view.navigator.prePage("返回", rtnDc);
    }

    function base_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种基本信息") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);

        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskBaseInfo", "险种基本信息", newDC);

    }

    function param_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种参数定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskParamTab", "险种参数定义", newDC);
    }

    function duty_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种定价责任") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfPriceDuty", "险种定价责任", newDC);
    }

    function get_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "保障责任定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskPrest", "保障责任定义", newDC);

    }

    function liablimit_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种责任限额定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskLiabLimit", "险种责任限额定义", newDC);
    }

    function account_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种账户定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);

        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskAcc", "险种账户定义", newDC);

    }

    function feemanage_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种费用管理") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfFeeManage", "险种费用管理", newDC);
    }

    function Attrib_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "保全属性定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskAttrib", "保全属性定义", newDC);
    }

    function item_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种保全项定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskItem", "险种保全项定义", newDC);
    }

    function itemProperty_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种保全属性定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskItemProperty", "险种保全属性定义", newDC);
    }

    function ratemanage_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种精算数据") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskRateManage", "险种精算数据", newDC);
    }

    function riskamnt_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种风险保额定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "risk/pfRiskAmnt", "险种风险保额定义", newDC);
    }

    var view = new _factoryabclife.risk.navigateButton.View();
    view.init();

    return view;
})