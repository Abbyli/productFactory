/**
 *
 * @author zhyu.neu
 * @creationTime 2014-07-22 16:16:20
 * @modificationTime 2014-07-23 17:22:29
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("selectTest", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.authority.role.selectTest.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getAllEnableSysSecRoleSuccess: getAllEnableSysSecRoleSuccess
            });

            this.processor = new _security.authority.role.selectTest.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecRole')) {
                var sysSecRole = new unieap.ds.DataStore('sysSecRole');
                sysSecRole.setRowSetName("com.neusoft.fdframework.security.entity.SysSecRole");

                dataCenter.addDataStore(sysSecRole);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);


        },
        page_init: function () {
            view.processor.getAllEnableSysSecRole();
        }

    });
    /**
     * @description:getAllEnableSysSecRole方法的成功回调。
     *
     */

    function getAllEnableSysSecRoleSuccess(dc) {
        var result = dc.getDataStore('roles');
        var rowSet = new unieap.ds.RowSet();
        var rowset = result.getRowSet();
        var data = rowset.getData();
        //unieap.debug(data);
        //for(var i = 0; i < data.length; i++){
        //	
        //}
        //view.grid.setDataStore('tree1', result);			
    }

    var view = new _security.authority.role.selectTest.View();
    view.init();

    return view;
})