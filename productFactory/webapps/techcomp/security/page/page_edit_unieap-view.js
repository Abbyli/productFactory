/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-18 13:54:26
 * @modificationTime 2014-08-22 15:37:34
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("page_edit_unieap", function () {

    var dialogData;

    var pageId;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page.page_edit_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPageSuccess: addPageSuccess,
                editPageSuccess: editPageSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_closeButton_onClick: form1_closeButton_onClick,
                dialogData: dialogData,
                pageId: pageId
            });

            this.processor = new _security.page.page_edit_unieap.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecPage')) {
                var sysSecPage = new unieap.ds.DataStore('sysSecPage');
                sysSecPage.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPage");

                dataCenter.addDataStore(sysSecPage);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_closeButton"), "onClick", this.form1_closeButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
            var rowset = dialogData.getRowSet();
            var data = rowset.getRowData(0, "primary");
            pageId = data["id"];

        },
        page_init: function () {
            var isEnableDs = new unieap.ds.DataStore("isEnableDs", [{
                CODENAME: '应用支撑平台',
                CODEVALUE: '1'
            }, {
                CODENAME: '页面权限测试',
                CODEVALUE: '0'
            }]);
            dataCenter.addDataStore("isEnableDs", isEnableDs);
        }

    });
    /**
     * @description:addPage方法的成功回调。
     *
     */

    function addPageSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows > 0) {
            MessageBox.alert({
                title: "提示信息",
                message: "新增成功"
            });
        }
        else if (affectRows == -1) {
            MessageBox.alert({
                title: "提示信息",
                message: "已经存在相同页面地址的配置信息"
            });
        }
        else {
            MessageBox.alert({
                title: "提示信息",
                message: "新增时出错"
            });
        }
    }
    /**
     * @description:editPage方法的成功回调。
     *
     */

    function editPageSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows > 0) {
            MessageBox.alert({
                title: "提示信息",
                message: "修改成功",
                onComplete: function () {
                    unieap.getXDialog().close(true)
                }
            });
        }
        else if (affectRows == -1) {
            MessageBox.alert({
                title: "提示信息",
                message: "已经存在相同页面地址的配置信息"
            });
        }
        else {
            MessageBox.alert({
                title: "提示信息",
                message: "修改时出错"
            });
        }
    }

    function form1_saveButton_onClick(event) {
        if (pageId && pageId != null && pageId != '') {
            view.processor.editPage(dialogData);
        }
        else {
            view.processor.addPage(dialogData);
        }
    }

    function form1_closeButton_onClick(event) {
        unieap.getXDialog().close(true);
    }

    var view = new _security.page.page_edit_unieap.View();
    view.init();

    return view;
})