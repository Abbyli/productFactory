/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-11 16:07:29
 * @modificationTime 2014-08-18 17:44:01
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("stationEdit", function () {

    var dialogData;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station.stationEdit.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                updateStationSuccess: updateStationSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_closeButton_onClick: form1_closeButton_onClick,
                dialogData: dialogData
            });

            this.processor = new _security.station.stationEdit.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysSecStation')) {
                var sysSecStation = new unieap.ds.DataStore('sysSecStation');
                sysSecStation.setRowSetName("com.neusoft.fdframework.security.entity.SysSecStation");

                dataCenter.addDataStore(sysSecStation);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_closeButton"), "onClick", this.form1_closeButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            dialogData = unieap.getXDialog().dialogData;
            view.form.setDataStore("form1", dialogData);
        }


    });
    /**
     * @description:updateStation方法的成功回调。
     *
     */

    function updateStationSuccess(dc) {
        var affectRows = dc.getParameter("affectRows");
        if (affectRows > 0) {
            MessageBox.alert({
                title: '提示信息',
                message: '修改成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else if (affectRows == -1) {
            MessageBox.alert({
                title: '提示信息',
                message: '岗位编号已存在！'
            });
        }
        else {
            MessageBox.alert({
                title: '提示信息',
                message: '系统出错，修改失败！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
    }

    function form1_saveButton_onClick(event) {
        //判断数据是否发生修改
        var form = unieap.byId('form1');
        //校验form
        if (!form.validate(true)) {
            return;
        }
        if (form.isModified()) {
            var conditionDs = view.form.getDataStore("form1");
            var rowset = conditionDs.getRowSet();
            var name = rowset.getItemValue(0, "name");
            var code = rowset.getItemValue(0, "code");
            if (name == null || code == null) {
                MessageBox.alert({
                    title: "提示信息",
                    message: "岗位名称和岗位编号为必填项！"
                });
                return;
            }
            else {
                //保存form中的数据
                view.processor.updateStation(conditionDs);
            }
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

    var view = new _security.station.stationEdit.View();
    view.init();

    return view;
})