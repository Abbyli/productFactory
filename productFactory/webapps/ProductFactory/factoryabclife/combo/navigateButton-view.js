/**
 *
 * @author liu.w
 * @creationTime 2016-01-22 08:48:26
 * @modificationTime 2016-12-07 15:05:47
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

    dojo.declare("_factoryabclife.combo.navigateButton.View", unieap.view.View, {


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
                choose_onClick: choose_onClick,
                comboAttr_onClick: comboAttr_onClick,
                comboParam_onClick: comboParam_onClick,
                comboElement_onClick: comboElement_onClick,
                elementRef_onClick: elementRef_onClick,
                comboRateManage_onClick: comboRateManage_onClick
            });

            this.processor = new _factoryabclife.combo.navigateButton.Processor(this);

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

            this.connect(unieap.byId("choose"), "onClick", this.choose_onClick);

            this.connect(unieap.byId("comboAttr"), "onClick", this.comboAttr_onClick);

            this.connect(unieap.byId("comboParam"), "onClick", this.comboParam_onClick);

            this.connect(unieap.byId("comboElement"), "onClick", this.comboElement_onClick);

            this.connect(unieap.byId("elementRef"), "onClick", this.elementRef_onClick);

            this.connect(unieap.byId("comboRateManage"), "onClick", this.comboRateManage_onClick);

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
            if (navigatorList[i].title == "组合定义") {
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
        newDC.addDataStore("comboInf", dataCenter.getDataStore("comboInf"));
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
        //if(ds.rowSet.primary[0].designType == "03"){
        //	unieap.byId("account").setDisplay("block");
        //	unieap.byId("feemanage").setDisplay("block");
        //	}else{
        //	unieap.byId("account").setDisplay("none");
        //	unieap.byId("feemanage").setDisplay("none");
        //	}			
    }

    function button_back_onClick(event) {
        var rtnDc = new unieap.ds.DataStore();
        view.navigator.prePage("返回", rtnDc);
    }

    function choose_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "选择险种") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);

        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboChoose", "选择险种", newDC);

    }

    function comboAttr_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "组合属性") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboAttrib", "组合属性", newDC);
    }

    function comboParam_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "组合参数定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboParam", "组合参数定义", newDC);

    }

    function comboElement_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "组合要素定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboElement", "组合要素定义", newDC);
    }

    function elementRef_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "险种要素关系") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboInsurtypeRef", "险种要素关系", newDC);
    }

    function comboRateManage_onClick(event) {
        var navigatorContainer = view.navigator._getNavigatorContainer();
        if (navigatorContainer.title == "组合精算数据定义") {
            return;
        }
        var newDC = view.prepareDCParameter();
        view.backToRiskConfig(navigatorContainer);
        view.navigator.forward("ProductFactory", "factoryabclife", "combo/pfComboRateManage", "组合精算数据定义", newDC);
    }

    var view = new _factoryabclife.combo.navigateButton.View();
    view.init();

    return view;
})