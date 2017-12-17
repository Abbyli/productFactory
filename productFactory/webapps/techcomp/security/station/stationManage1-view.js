/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-11 10:55:24
 * @modificationTime 2014-08-11 13:57:35
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("stationManage1", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station.stationManage1.View", unieap.view.View, {



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

            this.processor = new _security.station.stationManage1.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUnit')) {
                var sysSecUnit = new unieap.ds.DataStore('sysSecUnit');
                sysSecUnit.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnit");

                dataCenter.addDataStore(sysSecUnit);
            }

            if (!dataCenter.getDataStore('sysSecStation')) {
                var sysSecStation = new unieap.ds.DataStore('sysSecStation');
                sysSecStation.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStation");

                dataCenter.addDataStore(sysSecStation);
            }
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });

    var view = new _security.station.stationManage1.View();
    view.init();

    return view;
})