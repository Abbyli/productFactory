/**
 * 条款展示信息
 * @author Neusoft
 * @creationTime 2016-10-17 16:19:48
 * @modificationTime 2017-01-20 13:44:11
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfTermManagementShow", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.docuManage.pfTermManagementShow.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getTRuleManageDefSuccess: getTRuleManageDefSuccess,
                dloadTRuleManageDef: dloadTRuleManageDef,
                deleteTRuleManageDef: deleteTRuleManageDef,
                delTRuleManageDefSuccess: delTRuleManageDefSuccess,
                downloadSuccess: downloadSuccess,
                xdialog1_onComplete: xdialog1_onComplete,
                button1_onClick: button1_onClick,
                cell_operation_formatter: cell_operation_formatter
            });

            this.processor = new _factoryabclife.docuManage.pfTermManagementShow.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tRuleManageDef')) {
                var tRuleManageDef = new unieap.ds.DataStore('tRuleManageDef');
                tRuleManageDef.setRowSetName("com.neusoft.abclife.productfactory.entity.TRuleManageDef");

                dataCenter.addDataStore(tRuleManageDef);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_from')) {
                var tInsurtypeBasicInf_from = new unieap.ds.DataStore('tInsurtypeBasicInf_from');
                tInsurtypeBasicInf_from.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_from);
            }
        },

        page_initEvents: function () {

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            view.navigator.receiveData("条款详情", function (dc) {
                var tInsurtypeBasicInf = dc.getDataStore("tInsurtypeBasicInf");
                dataCenter.addDataStore("tInsurtypeBasicInf", tInsurtypeBasicInf);

                view.form.setDataStore("form1", tInsurtypeBasicInf);

                //查询数据
                view.processor.getTRuleManageDef(tInsurtypeBasicInf, 1, 10);
            });


            dojo.provide("unieap.long_date");
            dojo.require("unieap.form.SimpleFormatter");
            dojo.declare("unieap.long_date", unieap.form.SimpleFormatter, {
                format: function (value) {
                    var da = new Date();
                    da.setTime(value);

                    var ret = da.format('yyyy-MM-dd HH:mm:ss');
                    return ret;
                }
            });

            Date.prototype.format = function (fmt) {

                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
                    "H+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };

                var week = {
                    "0": "\u65e5",
                    "1": "\u4e00",
                    "2": "\u4e8c",
                    "3": "\u4e09",
                    "4": "\u56db",
                    "5": "\u4e94",
                    "6": "\u516d",
                };

                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                if (/(E+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.lenth > 1) ? (RegExp.$1.lenth > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.lenth == 1) ? (o[k]) : (("" + o[k]).substr(("" + o[k]).lenth)));
                    }
                }
                return fmt;
            }

        }


    });
    /**
     * @description:getTRuleManageDef方法的成功回调。
     *
     */

    function getTRuleManageDefSuccess(dc) {
        //unieap.byId("grid1").getBinding().setDataStore(null);
        unieap.byId("grid1").getBinding().getDataStore().getRowSet().deleteAllRows();
        if (dc.getDataStore("reTRuleManageDef").getRowSet().getRow(0) != null) {
            view.grid.setDataStore("grid1", dc.getDataStore("reTRuleManageDef"));
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function dloadTRuleManageDef(inRowIndex) {
        var tRuleManageDef = view.grid.getRow("grid1", inRowIndex);
        view.processor.download("formId4Download", tRuleManageDef);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function deleteTRuleManageDef(inRowIndex) {
        var tRuleManageDef = view.grid.getRow("grid1", inRowIndex);
        MessageBox.confirm({
            message: "是否删除？",
            yesStr: "是",
            noStr: "否",
            //关闭右上角的"X"按钮时执行onComplete函数
            iconCloseComplete: false,
            onComplete: function (value) {
                if (value) {
                    view.processor.delTRuleManageDef(tRuleManageDef);
                }
            }
        })
    }
    /**
     * @description:delTRuleManageDef方法的成功回调。
     *
     */

    function delTRuleManageDefSuccess(dc) {
        var info = dc.getParameter("redel");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '删除成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
            view.processor.getTRuleManageDef(view.form.getDataStore("form1"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:download方法的成功回调。
     *
     */

    function downloadSuccess(dc) {

    }

    function xdialog1_onComplete(returnObj) {
        //查询数据
        view.processor.getTRuleManageDef(dataCenter.getDataStore("tInsurtypeBasicInf"), 1, 10);

    }

    function button1_onClick(event) {
        var row = view.grid.getDataStore("grid1").getRowSet().getRowCount();
        if (row > 0) {
            MessageBox.alert({
                title: "提示",
                message: "请删除老条款再上传"
            })
            return;
        }

        var dialog = unieap.byId("xdialog1");
        var gridDS = view.form.getDataStore("form1");
        dialog.dialogData = {
            "gridDS": gridDS
        };
        dialog.show();


    }

    function cell_operation_formatter(inValue, inRowIndex) {
        var deletePn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete_h.png";
        var loadPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/download.png"; //load.png 

        var dloadBtn = "<img src='" + loadPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"下载\" " +
            "onclick=\"pfTermManagementShow.dloadTRuleManageDef('" + inRowIndex + "')\" />";

        var deleteBtn = "<img src='" + deletePn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfTermManagementShow.deleteTRuleManageDef('" + inRowIndex + "')\" />";


        return dloadBtn + deleteBtn;
    }

    var view = new _factoryabclife.docuManage.pfTermManagementShow.View();
    view.init();

    return view;
})