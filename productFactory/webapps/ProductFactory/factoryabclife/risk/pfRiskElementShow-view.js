/**
 * 要素定义穿透新增修改
 * @author Administrator
 * @creationTime 2016-06-30 16:32:16
 * @modificationTime 2017-03-29 11:45:04
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskElementShow", function () {

    var opt = "";

    var dutyId = "";

    var showId = "";

    var type = "";
    var navigateButton;
    dojo.addOnLoad(function () {
        navigateButton = pfRiskElementShow_navigateButton;
    });
    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskElementShow.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addObjSkelementSuccess: addObjSkelementSuccess,
                getTPropShowDefSuccess: getTPropShowDefSuccess,
                getPfSKElementSuccess: getPfSKElementSuccess,
                getDefTPropShowDefSuccess: getDefTPropShowDefSuccess,
                save_onClick: save_onClick,
                name_element_onChange: name_element_onChange,
                isCalRef_onChange: isCalRef_onChange,
                editorType_onChange: editorType_onChange,
                opt: opt,
                dutyId: dutyId,
                showId: showId,
                type: type
            });
            dojo.mixin(this, {
                navigateButton: navigateButton
            });
            this.processor = new _factoryabclife.risk.pfRiskElementShow.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tPropShowDef_form')) {
                var tPropShowDef_form = new unieap.ds.DataStore('tPropShowDef_form');
                tPropShowDef_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TPropShowDef");

                dataCenter.addDataStore(tPropShowDef_form);
            }

            if (!dataCenter.getDataStore('tObjSkelement_form')) {
                var tObjSkelement_form = new unieap.ds.DataStore('tObjSkelement_form');
                tObjSkelement_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjSkelement");

                dataCenter.addDataStore(tObjSkelement_form);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("save"), "onClick", this.save_onClick);

            this.connect(unieap.byId("name_element"), "onChange", this.name_element_onChange);

            this.connect(unieap.byId("isCalRef"), "onChange", this.isCalRef_onChange);

            this.connect(unieap.byId("editorType"), "onChange", this.editorType_onChange);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("定价要素属性", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);
                dataCenter.addDataStore("duty", dc.getDataStore("duty"));
                opt = dc.getParameter("opt");
                dutyId = dc.getParameter("dutyId");
                type = dc.getParameter("type");
                dataCenter.setParameter("dutyId", dutyId);
                dataCenter.setParameter("type", type);
                unieap.byId("form_elementinfo").clear();
                unieap.byId("form_elementinfo").getBinding().getDataStore().getRowSet().clear(0);
                unieap.byId("form1").clear();
                unieap.byId("form1").getBinding().getDataStore().getRowSet().clear(0);



                view.processor.getPfSKElement();
                if (opt == "update") {

                    var selectRow = dc.getDataStore("selectRow");
                    view.form.setDataStore("form_elementinfo", selectRow);
                    unieap.byId("name_element").setText(selectRow.rowSet.primary[0].name);
                    view.processor.getTPropShowDef(selectRow);


                }
                else {
                    unieap.byId("dictionary").setDisabled(false);
                    unieap.byId("editorType").onChange(null);
                }


                if (dc.getDataStore("duty").rowSetName == "com.neusoft.abclife.productfactory.entity.TPricingLiabDef") {
                    navigateButton.activeNavigateButton("duty");
                }
                else {
                    navigateButton.activeNavigateButton("get");
                }
                navigateButton.showBtn(dc.getDataStore('tInsurtypeBasicInf'));
            });



        },
        page_init: function () {
            //combobox初始化
            var ds1 = new unieap.ds.DataStore("isEmptyData", [{
                CODEVALUE: "1",
                CODENAME: "必填"
            }, {
                CODEVALUE: "0",
                CODENAME: "非必填"
            }]);
            var ds2 = new unieap.ds.DataStore("isReadData", [{
                CODEVALUE: "1",
                CODENAME: "只读"
            }, {
                CODEVALUE: "0",
                CODENAME: "非只读"
            }]);

            var ds3 = new unieap.ds.DataStore("editTypeData", [{
                CODEVALUE: "TextBox",
                CODENAME: "文本框"
            }, {
                CODEVALUE: "DateTextBox",
                CODENAME: "日期框"
            }, {
                CODEVALUE: "Textarea",
                CODENAME: "大文本域"
            }, {
                CODEVALUE: "ComboBox",
                CODENAME: "单选下拉框"
            }, {
                CODEVALUE: "NumberTextBox",
                CODENAME: "数字文本框"
            }]);
            var ds4 = new unieap.ds.DataStore("isOpt", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);
            dataCenter.addDataStore(ds1);
            dataCenter.addDataStore(ds2);
            dataCenter.addDataStore(ds3);
            dataCenter.addDataStore(ds4);
        }

    });
    /**
     * @description:addObjSkelement方法的成功回调。
     *
     */

    function addObjSkelementSuccess(dc) {
        var info = dc.getParameter("addAndupdateElement");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    var dc = new unieap.ds.DataCenter();

                    view.navigator.prePage("定价要素属性", dc);
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
     * @description:getTPropShowDef方法的成功回调。
     *
     */

    function getTPropShowDefSuccess(dc) {
        var result = dc.getDataStore("getTPropShowDef");
        showId = result.rowSet.primary[0].id;

        unieap.byId("editorType").onChange(result.rowSet.primary[0].editorType);

        view.form.setDataStore("form1", result);
    }
    /**
     * @description:getPfSKElement方法的成功回调。
     *
     */

    function getPfSKElementSuccess(dc) {
        unieap.byId("name_element")
            .getDataProvider().setDataStore(dc.getDataStore("getPricingTSkelementDef"));
    }
    /**
     * @description:getDefTPropShowDef方法的成功回调。
     *
     */

    function getDefTPropShowDefSuccess(dc) {
        // alert(dc.getDataStore("getDefTPropShowDef").getRowSet().getRow(0));
        if (dc.getDataStore("getDefTPropShowDef").getRowSet().getRow(0) != null) {
            unieap.byId("editorType").onChange(dc.getDataStore("getDefTPropShowDef").getRowSet().getRow(0).getItemValue("editorType"));

            view.form.setDataStore("form1", dc.getDataStore("getDefTPropShowDef"));
        }
        else {
            unieap.byId("form1").clear();
            unieap.byId("form1").getBinding().getDataStore().getRowSet().getRow(0).clear();
        }
    }

    function save_onClick(event) {

        if (!unieap.byId("form_elementinfo").validate(false)) {
            return;
        }
        if (!unieap.byId("form1").validate(false)) {
            return;
        }
        if (unieap.byId("maxLength").getValue() < unieap.byId("minLength").getValue()) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "最大长度应大于最小长度"
            });
            return;
        }
        if (unieap.byId("maxVal").getValue() < unieap.byId("minVal").getValue()) {
            MessageBox.autoCloseAlert({
                title: "提示",
                message: "最大值应大于最小值"
            });
            return;
        }



        var obj = view.form.getDataStore("form_elementinfo");
        var show = view.form.getDataStore("form1");
        obj.rowSet.primary[0].dutyId = dutyId;
        obj.rowSet.primary[0].name = unieap.byId("name_element").getText();
        obj.rowSet.primary[0].type = type;
        show.rowSet.primary[0].id = showId;
        show.rowSet.primary[0].objId = obj.rowSet.primary[0].id;




        view.processor.addObjSkelement(obj, show, opt);
    }

    function name_element_onChange(value) {
        var text = unieap.byId("name_element").getText();
        var pfObjSKElem_ds = unieap.byId("form_elementinfo").getBinding().getDataStore();
        pfObjSKElem_ds.getRowSet().getRow(0).setItemValue("name", text);

        var tObjSkelement = unieap.byId("name_element").getDataProvider().getDataStore().getRowSet();
        for (var i = 0; i < tObjSkelement.getRowCount(); i++) {
            if (tObjSkelement.getRow(i).getItemValue("name") == text) {
                pfObjSKElem_ds.getRowSet().getRow(0).setItemValue("isCalRef", tObjSkelement.getRow(i).getItemValue("isCalRef"));
            }
        }

        //查询数据
        view.processor.getDefTPropShowDef(text);
    }

    function isCalRef_onChange(value) {



    }

    function editorType_onChange(value) {
        if (value == "ComboBox") {
            unieap.byId("dictionary").setDisabled(false);
            unieap.byId("maxLength").setDisabled(true);
            unieap.byId("minLength").setDisabled(true);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "TextBox" || value == "Textarea") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(false);
            unieap.byId("minLength").setDisabled(false);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "DateTextBox") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(true);
            unieap.byId("minLength").setDisabled(true);
            unieap.byId("maxVal").setDisabled(true);
            unieap.byId("minVal").setDisabled(true);
        }

        if (value == "NumberTextBox") {
            unieap.byId("dictionary").setDisabled(true);
            unieap.byId("maxLength").setDisabled(false);
            unieap.byId("minLength").setDisabled(false);
            unieap.byId("maxVal").setDisabled(false);
            unieap.byId("minVal").setDisabled(false);
        }

        //每次onchange清空值
        var nodes = dojo.query(".forDisabled");
        unieap.byId("form1").clear();
        unieap.byId("form1").getBinding().getDataStore().getRowSet().getRow(0).clear();
        unieap.byId("editorType").setValue(value);
        //value == null所有控件都可用
        if (!value) {
            for (var i = 0; i < nodes.length; i++) {
                dijit.byNode(nodes[i]).setDisabled(false);
            }
        }

    }

    var view = new _factoryabclife.risk.pfRiskElementShow.View();
    view.init();

    return view;
})