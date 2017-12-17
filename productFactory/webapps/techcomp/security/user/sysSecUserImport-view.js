/**
 *
 * @author dong-yw
 * @creationTime 2014-07-01 13:29:42
 * @modificationTime 2014-08-13 14:12:25
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUserImport", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.user.sysSecUserImport.View", unieap.view.View, {



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

            this.processor = new _security.user.sysSecUserImport.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {},

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });

    var view = new _security.user.sysSecUserImport.View();
    view.init();

    return view;
})