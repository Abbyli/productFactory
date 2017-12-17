/**
 *
 * @author zhyu.neu
 * @creationTime 2014-08-11 16:07:11
 * @modificationTime 2014-08-12 17:26:10
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("stationAdd", function () {

    var data;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_security.station.stationAdd.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                insertStationSuccess: insertStationSuccess,
                form1_saveButton_onClick: form1_saveButton_onClick,
                form1_closeButton_onClick: form1_closeButton_onClick,
                data: data
            });

            this.processor = new _security.station.stationAdd.Processor(this);

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

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("form1_saveButton"), "onClick", this.form1_saveButton_onClick);

            this.connect(unieap.byId("form1_closeButton"), "onClick", this.form1_closeButton_onClick);

        },



        page_load: function () {
            this.inherited(arguments);


        },
        page_init: function () {
            data = unieap.getXDialog().dialogData;
        }

    });
    /**
     * @description:insertStation方法的成功回调。
     *
     */

    function insertStationSuccess(dc) {
        var insertstr = dc.getParameter("id");
        if (insertstr != "-1") {
            MessageBox.alert({
                title: '提示信息',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close();
                }
            });
        }
        else {
            if (insertstr == "-1") {
                MessageBox.alert({
                    title: '提示信息',
                    message: '编号已经存在！'
                });

            }
            else {
                MessageBox.alert({
                    title: '提示信息',
                    message: '保存失败！',
                    onComplete: function () {
                        unieap.getXDialog().close();
                    }
                });
            }
        }
    }

    function form1_saveButton_onClick(event) {
        var conditionDs = view.form.getDataStore("form1");
        var rowset = conditionDs.getRowSet();
        rowset.setItemValue(0, "unitId", data.queryId);
        rowset.setItemValue(0, "isEnabled", "1");
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
            view.processor.insertStation(conditionDs, "1");
        }

    }

    function form1_closeButton_onClick(event) {
        unieap.getXDialog().close(true);
    }

    var view = new _security.station.stationAdd.View();
    view.init();

    return view;
})