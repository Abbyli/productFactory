/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-12 10:07:19
 * @modificationTime 2014-08-14 17:26:33
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("station_userEdit", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station_user.station_userEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                updateStationUsersSuccess: updateStationUsersSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_closeButton_onClick: form1_closeButton_onClick
            });

            this.processor = new _security.station_user.station_userEdit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecStationUser')) {
                var sysSecStationUser = new unieap.ds.DataStore('sysSecStationUser');
                sysSecStationUser.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStationUser");

                dataCenter.addDataStore(sysSecStationUser);
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
            var isMajorDs = new unieap.ds.DataStore("isMajorDs", [{
                CODEVALUE: "1",
                CODENAME: "是"
            }, {
                CODEVALUE: "0",
                CODENAME: "否"
            }]);

            dataCenter.addDataStore("isMajorDs", isMajorDs);
        }

    });
    /**
     * @description:updateStationUsers方法的成功回调。
     *
     */

    function updateStationUsersSuccess(dc) {
        MessageBox.alert({
            title: '提示信息',
            message: '保存成功！',
            onComplete: function () {
                unieap.getXDialog().close();
            }
        });
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (form.isModified()) {
            //保存form中的数据
            var conditionDs = view.form.getDataStore('form1');
            view.processor.updateStationUsers(conditionDs);
        }
        else {
            MessageBox.alert({
                title: '确认框',
                message: '数据未发生改变。'
            });
        }
    }

    function form1_closeButton_onClick(event) {
        unieap.getXDialog().close(true);
    }

    var view = new _security.station_user.station_userEdit.View();
    view.init();

    return view;
})