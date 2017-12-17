/**
 *
 * @author dong-yw
 * @creationTime 2014-06-30 17:11:39
 * @modificationTime 2014-09-24 15:54:35
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("sysSecUserEdit", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.user.sysSecUserEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                editUserSuccess: editUserSuccess,
                checkBirthDate: checkBirthDate,
                checkCredentialsNumbers: checkCredentialsNumbers,
                checkEmail: checkEmail,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.user.sysSecUserEdit.Processor(this);

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

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        },
        page_init: function () {
            var sexDs = new unieap.ds.DataStore("sexDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
                CODEVALUE: "1",
                CODENAME: "男"
            }, {
                CODEVALUE: "0",
                CODENAME: "女"
            }]);

            dataCenter.addDataStore("sexDs", sexDs);

            var credentialsTypeDs = new unieap.ds.DataStore("credentialsTypeDs", [{
                CODEVALUE: "",
                CODENAME: ""
            }, {
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

    function checkBirthDate() {
        var flag = true;
        var birthDate = unieap.byId("birthdate").getText();

        var datePattern = "yyyyMMdd";

        birthDate = unieap.dateFormat(birthDate, datePattern, {
            dataType: "string",
            valueFormat: 'yyyy-MM-dd'
        });

        var date = unieap.dateFormat(new Date(), datePattern, {
            dataType: "string",
            valueFormat: 'yyyyMMdd'
        });

        if (birthDate > date) {
            alert("输入不合法，出生日期不能大于当前日期");
            flag = false;
        }
        return flag;
    }

    function checkCredentialsNumbers() {
        var result = true;
        var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        var value = unieap.byId("credentialsNumber").getValue();
        if (value != null && value != "") {
            //判断是身份证还是军官证
            if (unieap.byId("credentialsType").getValue() == "1") {
                result = reg.test(value);
            }
            if (!result) {
                alert("证件号码输入不合法");
                unieap.byId("credentialsNumber").focus();
            }
        }
        return result;
    }

    function checkEmail() {
        var result = true;
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var value = unieap.byId("email").getValue();
        if (value != null && value != "") {
            result = reg.test(value);
            if (!result) {
                alert("邮箱输入不合法");
                unieap.byId("email").focus();
            }
        }
        return result;
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (!checkBirthDate()) {
            return;
        }
        if (!checkEmail()) {
            return;
        }
        if (!checkCredentialsNumbers()) {
            return;
        }
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form1');
            //	unieap.debug(conditionDs);
            view.processor.editUser(conditionDs);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    function form1_resetButton_onClick(event) {
        var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        formRowSet.discardUpdate(0);
        formRowSet.resetUpdate();
    }

    var view = new _security.user.sysSecUserEdit.View();
    view.init();

    return view;
})