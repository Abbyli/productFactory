/**
 *
 * @author user
 * @creationTime 2014-09-10 15:09:30
 * @modificationTime 2014-09-10 15:19:53
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("tabPane", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.menu.tabPane.View", unieap.view.View, {



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

            this.processor = new _security.menu.tabPane.Processor(this);

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

    var view = new _security.menu.tabPane.View();
    view.init();

    return view;
})