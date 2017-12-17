/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-12 09:04:24
 * @modificationTime 2014-08-13 13:31:26
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("unit_userEdit", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.unit_user.unit_userEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                updateUnitUserSuccess: updateUnitUserSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_closeButton_onClick: form1_closeButton_onClick
            });

            this.processor = new _security.unit_user.unit_userEdit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUnitUser')) {
                var sysSecUnitUser = new unieap.ds.DataStore('sysSecUnitUser');
                sysSecUnitUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUnitUser");

                dataCenter.addDataStore(sysSecUnitUser);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_closeButton"), "onClick", this.form1_closeButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        },
        page_init: function () {
            var isEnableDs = new unieap.ds.DataStore("isEnableDs", [{
                CODENAME: '是',
                CODEVALUE: '1'
            }, {
                CODENAME: '否',
                CODEVALUE: '0'
            }]);
            dataCenter.addDataStore("isEnableDs", isEnableDs);
        }

    });
    /**
     * @description:updateUnitUser方法的成功回调。
     *
     */

    function updateUnitUserSuccess(dc) {
        MessageBox.alert({
            title: "提示信息",
            message: "操作成功",
            onComplete: function () {
                unieap.getXDialog().close(true);
            }
        });
    }

    function form1_saveButton_onClick(event) {
        var form = unieap.byId("form1");
        if (form.isModified()) {
            var conditionDs = view.form.getDataStore("form1");
            view.processor.updateUnitUser(conditionDs);
        }
        else {
            MessageBox.alert({
                title: "提示信息",
                message: "人员信息没有改变"
            });
        }
    }

    function form1_closeButton_onClick(event) {
        unieap.getXDialog().close(true);
    }

    var view = new _security.unit_user.unit_userEdit.View();
    view.init();

    return view;
})