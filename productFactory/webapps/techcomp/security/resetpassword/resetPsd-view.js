/**
 *
 * @author user
 * @creationTime 2014-09-28 10:32:37
 * @modificationTime 2014-10-09 16:58:14
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("resetPsd", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.resetpassword.resetPsd.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                resetPasswordSuccess: resetPasswordSuccess,
                passwo_onBlur: passwo_onBlur,
                form1_saveButton_onClick: form1_saveButton_onClick
            });

            this.processor = new _security.resetpassword.resetPsd.Processor(this);

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
        },

        page_initEvents: function () {

            this.connect(unieap.byId("passwo"), "onBlur", this.passwo_onBlur);

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        }


    });
    /**
     * @description:resetPassword方法的成功回调。
     *
     */

    function resetPasswordSuccess(dc) {
        var differenceFlag = dc.getParameter("differenceFlag");
        if (differenceFlag == 1) {
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else if (differenceFlag == -1) {
            MessageBox.alert({
                title: '提示信息',
                message: '新密码不能与默认密码一致，请重新修改！'
            });
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '系统出错，修改失败！'
            });
        }
    }

    function passwo_onBlur(event) {
        var passwobox = unieap.byId("passwo");
        var passwo = passwobox.getText();
        var reg = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,}$/;
        if (reg.test(passwo)) {
            return;
        }
        else {
            alert('新密码必须有数字和字母组成，且长度不小于6位，请重新修改！');
            return;
        }
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改

        //校验form
        //保存form中的数据
        var passwobox = unieap.byId("passwo");
        var passwo = passwobox.getText();
        var newpswbox = unieap.byId("newpsw");
        var newpsw = newpswbox.getText();
        if (passwo == '' && newpsw == '') {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
        else if (passwo == newpsw) {
            view.processor.resetPassword(passwo);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '两次输入的密码不一致!'
            });
        }
        //if (!(/[A-Za-z]/g.test(passwo))) {
        //	alert("需要包含字母");
        //	return;
        //}
        //if (!(/[0-9]/g.test(passwo))) {
        //	alert("需要包含数字");
        //	return;
        //}
        //if (passwo.length<6) {
        //	alert("最少6个字符");
        //	return;
        //}


        //	unieap.debug(rowset);
        //	view.processor.addUser(conditionDs);



    }

    var view = new _security.resetpassword.resetPsd.View();
    view.init();

    return view;
})