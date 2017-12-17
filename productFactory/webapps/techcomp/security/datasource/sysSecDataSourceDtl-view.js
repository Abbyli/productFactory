/**
 *
 * @author dongyw
 * @creationTime 2014-07-02 16:21:46
 * @modificationTime 2014-08-15 10:16:57
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecDataSourceDtl", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.datasource.sysSecDataSourceDtl.View", unieap.view.View, {



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

            this.processor = new _security.datasource.sysSecDataSourceDtl.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataSource')) {
                var sysSecDataSource = new unieap.ds.DataStore('sysSecDataSource');
                sysSecDataSource.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataSource");

                dataCenter.addDataStore(sysSecDataSource);
            }
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        }


    });

    var view = new _security.datasource.sysSecDataSourceDtl.View();
    view.init();

    return view;
})