/**
 *
 * @author shify
 * @creationTime 2014-06-30 12:48:38
 * @modificationTime 2014-08-15 18:31:15
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("page_add_unieap", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page.page_add_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                add_pageSuccess: add_pageSuccess,
                getEnabledAppListSuccess: getEnabledAppListSuccess,
                add_pageError: add_pageError,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.page.page_add_unieap.Processor(this);

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
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_resetButton"), "onClick", this.form1_resetButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.getEnabledAppList();
        }


    });
    /**
     * @description:add_page方法的成功回调。
     *
     */

    function add_pageSuccess(dc) {
        var returnFlag = dc.getParameter("affectRows");
        if (returnFlag > 0) {
            unieap.getXDialog().close()
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！'
            });
        }
        else if (returnFlag == -1) {
            alert("已经存在相同页面地址的配置信息");
        }
    }
    /**
     * @description:getEnabledAppList方法的成功回调。
     *
     */

    function getEnabledAppListSuccess(dc) {

    }
    /**
     * @description:add_page方法的失败回调。
     *
     */

    function add_pageError(xhr) {
        alert("新增时出错");
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
        view.processor.add_page(conditionDs);
    }

    function form1_resetButton_onClick(event) {
        //var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        //formRowSet.discardUpdate(0);
        //formRowSet.resetUpdate();
        unieap.getXDialog().close();
    }

    var view = new _security.page.page_add_unieap.View();
    view.init();

    return view;
})