/**
 *
 * @author dong-yw
 * @creationTime 2014-06-30 17:11:39
 * @modificationTime 2014-08-14 14:48:55
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUserDtl", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.user.sysSecUserDtl.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                editUserSuccess: editUserSuccess
            });

            this.processor = new _security.user.sysSecUserDtl.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecUser')) {
                var sysSecUser = new unieap.ds.DataStore('sysSecUser');
                sysSecUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecUser");

                dataCenter.addDataStore(sysSecUser);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        },
        page_init: function () {
            var sexDs = new unieap.ds.DataStore("sexDs", [{
                CODEVALUE: "1",
                CODENAME: "男"
            }, {
                CODEVALUE: "0",
                CODENAME: "女"
            }]);

            dataCenter.addDataStore("sexDs", sexDs);

            var credentialsTypeDs = new unieap.ds.DataStore("credentialsTypeDs", [{
                CODEVALUE: "1",
                CODENAME: "身份证"
            }, {
                CODEVALUE: "3",
                CODENAME: "护照"
            }, {
                CODEVALUE: "2",
                CODENAME: "军官证"
            }]);

            dataCenter.addDataStore("credentialsTypeDs", credentialsTypeDs);

        }

    });
    /**
     * @description:editUser方法的成功回调。
     *
     */

    function editUserSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows == 1) {
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else if (affectRows == 0) {
            MessageBox.alert({
                title: '提示信息',
                message: '该用户数据已经不存在！'
            });
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '系统出错，修改失败！'
            });
        }
    }

    var view = new _security.user.sysSecUserDtl.View();
    view.init();

    return view;
})