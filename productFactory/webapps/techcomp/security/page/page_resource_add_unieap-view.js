/**
 *
 * @author shify
 * @creationTime 2014-07-01 15:27:14
 * @modificationTime 2014-08-15 18:31:39
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("page_resource_add_unieap", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.page.page_resource_add_unieap.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                addPageResourceSuccess: addPageResourceSuccess,
                addPageResourceError: addPageResourceError,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_resetButton_onClick: form1_resetButton_onClick
            });

            this.processor = new _security.page.page_resource_add_unieap.Processor(this);

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

            // get selected page info
            var pageDs = unieap.getXDialog().dialogData;
            dataCenter.addDataStore("pageDs", pageDs);
        }


    });
    /**
     * @description:addPageResource方法的成功回调。
     *
     */

    function addPageResourceSuccess(dc) {
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
     * @description:addPageResource方法的失败回调。
     *
     */

    function addPageResourceError(xhr) {
        alert("新增时出错");
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }

        //get pageId and appId
        var pageDs = dataCenter.getDataStore("pageDs");
        var rs = pageDs.getRowSet();
        var r = rs.getRow(0);
        pageId = r.getItemValue("id");
        appId = r.getItemValue("appId");


        //取得form中的数据
        var conditionDs = view.form.getDataStore('form1');

        //get pageId and appId
        var rs = conditionDs.getRowSet();
        rs.setItemValue(0, "pageId", pageId);
        rs.setItemValue(0, "appId", appId);

        // save data
        view.processor.addPageResource(conditionDs);
    }

    function form1_resetButton_onClick(event) {
        //var formRowSet = unieap.byId('form1').getBinding().getDataStore().getRowSet();
        //formRowSet.discardUpdate(0);
        //formRowSet.resetUpdate();
        unieap.getXDialog().close();
    }

    var view = new _security.page.page_resource_add_unieap.View();
    view.init();

    return view;
})