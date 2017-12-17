/**
 *
 * @author dongzl
 * @creationTime 2017-04-05 14:19:53
 * @modificationTime 2017-04-06 09:14:46
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("tTxDef", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_clmtest.tTxDef.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTxDefSuccess: queryTxDefSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                grid1_binding_rpc: grid1_binding_rpc
            });

            this.processor = new _clmtest.tTxDef.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tTxDef')) {
                var tTxDef = new unieap.ds.DataStore('tTxDef');
                tTxDef.setRowSetName("dzltest.clmtest.entity.TTxDef");

                dataCenter.addDataStore(tTxDef);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });
    /**
     * @description:queryTxDef方法的成功回调。
     *
     */

    function queryTxDefSuccess(dc) {
        var ds = dc.getDataStore("TTxDef");
        //view.grid.setDataStore("grid1", ds);
        unieap.byId("grid1").getBinding().setDataStore(ds);
    }

    function form1_saveButton_onClick(event) {
        var d = view.form.getDataStore("form1");
        view.processor.queryTxDef(d, "1", "10");
    }

    function grid1_binding_rpc(store, load) {
        var conditionDs = view.form.getDataStore('form1');
        view.processor.queryTxDef(conditionDs, store.getPageNumber(), store.getPageSize());

    }

    var view = new _clmtest.tTxDef.View();
    view.init();

    return view;
})