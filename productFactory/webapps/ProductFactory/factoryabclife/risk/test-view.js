/**
 *
 * @author Administrator
 * @creationTime 2016-08-25 16:06:47
 * @modificationTime 2016-08-25 17:15:58
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("test", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.test.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                button2_onClick: button2_onClick,
                button1_onClick: button1_onClick
            });

            this.processor = new _factoryabclife.risk.test.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('policyDTO')) {
                var policyDTO = new unieap.ds.DataStore('policyDTO');
                policyDTO.setRowSetName("com.neusoft.abclife.productfactory.dto.PolicyDTO");

                dataCenter.addDataStore(policyDTO);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

        },



        page_load: function () {
            this.inherited(arguments);




            var policyDTO = new unieap.ds.DataStore("policyDTO", [{
                amnt: "10000",
                n: "1",
                insurtypeCode: "6801",
                pricingLiabCode: "680101",
                payIntv: "12",
                beginYear: "",
                endYear: "",
                minAmount: "",
                maxAmount: "",
                prem: "10",
                mult: "5",
                feeType: "",
                unit: "1",
                sex: "1",
                appAge: "18",
                insuYear: "3"
            }]);

            unieap.byId("formList1").getBinding().setDataStore(policyDTO);
        }


    });

    function button2_onClick(event) {
        for (var i = 0; i < unieap.byId("formList1").getChildren().length; i++) {
            if (unieap.byId("formList1").getChildren()[i].focused) {
                unieap.byId("formList1").getBinding().getDataStore().getRowSet().deleteRow(i);
            }

        }
    }

    function button1_onClick(event) {
        unieap.byId("formList1").getBinding().getDataStore().getRowSet().addRow();
    }

    var view = new _factoryabclife.risk.test.View();
    view.init();

    return view;
})