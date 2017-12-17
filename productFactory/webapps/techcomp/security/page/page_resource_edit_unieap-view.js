/**
 *
 * @author shify
 * @creationTime 2014-07-01 16:43:44
 * @modificationTime 2014-08-15 18:34:19
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("page_resource_edit_unieap", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page.page_resource_edit_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                editPageResourceSuccess: editPageResourceSuccess,
                editPageResourceError: editPageResourceError,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.page.page_resource_edit_unieap.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecPageResource')) {
                var sysSecPageResource = new unieap.ds.DataStore('sysSecPageResource');
                sysSecPageResource.setRowSetName("com.neusoft.fdframework.security.entity.SysSecPageResource");

                dataCenter.addDataStore(sysSecPageResource);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var ds = unieap.getXDialog().dialogData;
            //unieap.debug(ds)
            view.form.setDataStore("form1", ds);
        }


    });
    /**
     * @description:editPageResource方法的成功回调。
     *
     */

    function editPageResourceSuccess(dc) {
        var returnFlag = dc.getParameter("affectRows");
        if (returnFlag > 0) {
            unieap.getXDialog().close()
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！'
            });
        }
        else if (returnFlag == -1) {
            alert("已经存在相同页面控件ID的页面资源信息");
        }
    }
    /**
     * @description:editPageResource方法的失败回调。
     *
     */

    function editPageResourceError(xhr) {
        alert("修改时出错");
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }

        //保存form中的数据
        var conditionDs = view.form.getDataStore('form1');
        //	unieap.debug(conditionDs)
        view.processor.editPageResource(conditionDs);
    }

    function form1_resetButton_onClick(event) {
        //var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        //formRowSet.discardUpdate(0);
        //formRowSet.resetUpdate();
        unieap.getXDialog().close();
    }

    var view = new _security.page.page_resource_edit_unieap.View();
    view.init();

    return view;
})