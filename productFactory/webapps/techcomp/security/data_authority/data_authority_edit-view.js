/**
 *
 * @author user
 * @creationTime 2014-07-28 15:05:57
 * @modificationTime 2014-08-14 09:42:29
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("data_authority_edit", function () {

    var insert = true;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.data_authority.data_authority_edit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                applicationListSuccess: applicationListSuccess,
                updataSuccess: updataSuccess,
                insertSuccess: insertSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick,
                insert: insert
            });

            this.processor = new _security.data_authority.data_authority_edit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecDataAuthority')) {
                var sysSecDataAuthority = new unieap.ds.DataStore('sysSecDataAuthority');
                sysSecDataAuthority.setRowSetName("com.neusoft.fdframework.security.entity.SysSecDataAuthority");

                dataCenter.addDataStore(sysSecDataAuthority);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.applicationList();
        },
        page_init: function () {
            var isEnabledDs = new unieap.ds.DataStore("isEnabled", [{
                CODEVALUE: "1",
                CODENAME: "启用"
            }, {
                CODEVALUE: "0",
                CODENAME: "停用"
            }]);
            dataCenter.addDataStore("isEnabledDs", isEnabledDs);
        }

    });
    /**
     * @description:applicationList方法的成功回调。
     *
     */

    function applicationListSuccess(dc) {
        var result = dataCenter.getDataStore('application');
        dataCenter.addDataStore("applicationDS", result);
        var dialogData = unieap.getXDialog().dialogData;
        if (dialogData != null && dialogData.getRealRecordCount() != 0) {
            insert = false;
            view.form.setDataStore("form1", dialogData);
        }
        else {
            unieap.byId("isEnabled").setValue("1");
        }
    }
    /**
     * @description:updata方法的成功回调。
     *
     */

    function updataSuccess(dc) {
        var result = dc.getParameter("affectRows");

        if (result == 1) {
            MessageBox.alert({
                title: '提示信息',
                message: '修改成功！'
            });
            unieap.getXDialog().close();
        }
        else if (result == -1) {
            alert("编号已经存在");
        }
        else if (result == -2) {
            alert("数据权限已经关联使用，不能修改所属应用");
        }
        else {
            alert("保存失败");
        }
    }
    /**
     * @description:insert方法的成功回调。
     *
     */

    function insertSuccess(dc) {
        var result = dc.getParameter("affectRows");

        if (result == 1) {
            MessageBox.alert({
                title: '提示信息',
                message: '新增成功！'
            });
            unieap.getXDialog().close();
        }
        else if (result == -1) {
            alert("编号已经存在");
        }
        else if (result == -2) {
            alert("数据权限已经关联使用，不能修改所属应用");
        }
        else {
            alert("保存失败");
        }
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改

        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (insert) {
            var conditionDs = view.form.getDataStore('form1');
            view.processor.insert(conditionDs);
        }
        else {
            if (form.isModified()) {
                //保存form中的数据
                var conditionDs = view.form.getDataStore('form1');
                view.processor.updata(conditionDs);
            }
            else {
                MessageBox.alert({
                    title: '确认框',
                    message: '数据未发生改变。'
                });
            }
        }




    }

    function form1_resetButton_onClick(event) {
        unieap.getXDialog().close();
    }

    var view = new _security.data_authority.data_authority_edit.View();
    view.init();

    return view;
})