/**
 * 销售管理
 * @author Neusoft
 * @creationTime 2017-03-01 16:43:46
 * @modificationTime 2017-03-17 14:32:07
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfMarketManage", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfMarketManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryTProductSaleChnlSuccess: queryTProductSaleChnlSuccess,
                upTProductSaleChnl: upTProductSaleChnl,
                addTProductSaleChnlSuccess: addTProductSaleChnlSuccess,
                upTProductSaleChnlSuccess: upTProductSaleChnlSuccess,
                select_onClick: select_onClick,
                add_onClick: add_onClick,
                cell_editor_formatter: cell_editor_formatter,
                xdialog1_onComplete: xdialog1_onComplete
            });

            this.processor = new _factoryabclife.risk.pfMarketManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('form_tProductSaleChnl')) {
                var form_tProductSaleChnl = new unieap.ds.DataStore('form_tProductSaleChnl');
                form_tProductSaleChnl.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductSaleChnl");

                dataCenter.addDataStore(form_tProductSaleChnl);
            }

            if (!dataCenter.getDataStore('grid_tProductSaleChnl')) {
                var grid_tProductSaleChnl = new unieap.ds.DataStore('grid_tProductSaleChnl');
                grid_tProductSaleChnl.setRowSetName("com.neusoft.abclife.productfactory.entity.TProductSaleChnl");

                dataCenter.addDataStore(grid_tProductSaleChnl);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("select"), "onClick", this.select_onClick);

            this.connect(unieap.byId("add"), "onClick", this.add_onClick);

            this.connect(unieap.byId("xdialog1"), "onComplete", this.xdialog1_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryTProductSaleChnl(view.form.getDataStore("form"), 1, 10);

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("saleState", [{
                CODENAME: "停售",
                CODEVALUE: "0"
            }, {
                CODENAME: "启售",
                CODEVALUE: "1"
            }])
            var ds1 = new unieap.ds.DataStore("saleChnl", [{
                CODENAME: "个险",
                CODEVALUE: "01"
            }, {
                CODENAME: "银代",
                CODEVALUE: "03"
            }, {
                CODENAME: "电销",
                CODEVALUE: "05"
            }, {
                CODENAME: "网销",
                CODEVALUE: "06"
            }, {
                CODENAME: "中介",
                CODEVALUE: "07"
            }, {
                CODENAME: "财富",
                CODEVALUE: "08"
            }, {
                CODENAME: "税优",
                CODEVALUE: "09"
            }])
            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);

            dojo.provide("unieap.long_date");
            dojo.require("unieap.form.SimpleFormatter");
            dojo.declare("unieap.long_date", unieap.form.SimpleFormatter, {
                format: function (value) {
                    var da = new Date();
                    da.setTime(value);
                    var ret = da.format('yyyy-MM-dd');
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
     * @description:queryTProductSaleChnl方法的成功回调。
     *
     */

    function queryTProductSaleChnlSuccess(dc) {
        view.grid.setDataStore("grid", dc.getDataStore("reTProductSaleChnl"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function upTProductSaleChnl(inRowIndex) {
        var row = view.grid.getRow("grid", inRowIndex);
        view.processor.upTProductSaleChnl(row);
    }
    /**
     * @description:addTProductSaleChnl方法的成功回调。
     *
     */

    function addTProductSaleChnlSuccess(dc) {
        var info = dc.getParameter("reAddTProductSaleChnl");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！',
                onComplete: function () {
                    unieap.getXDialog().close(true);
                }
            });
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }
    /**
     * @description:upTProductSaleChnl方法的成功回调。
     *
     */

    function upTProductSaleChnlSuccess(dc) {
        var info = dc.getParameter("reUpTProductSaleChnl");
        if (info == "") {
            MessageBox.autoCloseAlert({
                title: '提示',
                message: '保存成功！'
            });
            view.processor.queryTProductSaleChnl(view.form.getDataStore("form"), 1, 10);
        }
        else {
            MessageBox.alert({
                title: '提示',
                message: info
            });
        }
    }

    function select_onClick(event) {
        var saleMngcom = unieap.byId("saleMngcom").getValue();
        if (saleMngcom != null && saleMngcom != "") {
            if (saleMngcom.substr(0, 2) != "86") {
                MessageBox.alert({
                    title: '提示',
                    message: "请输入正确的销售机构！"
                });
                return;
            }
        }
        view.processor.queryTProductSaleChnl(view.form.getDataStore("form"), 1, 10);
    }

    function add_onClick(event) {
        var dialog = unieap.byId("xdialog1");
        dialog.dialogData = {
            "opt": "add"
        };
        dialog.title = "新增-产品";
        dialog.show();
    }

    function cell_editor_formatter(inValue, inRowIndex) {
        var upPn = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_Start-Stop.png";
        return "<img src='" + upPn + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"启/停售\" " +
            "onclick=\"pfMarketManage.upTProductSaleChnl('" + inRowIndex + "')\" />";
    }

    function xdialog1_onComplete(returnObj) {
        view.processor.queryTProductSaleChnl(view.form.getDataStore("form"), 1, 10);
    }

    var view = new _factoryabclife.risk.pfMarketManage.View();
    view.init();

    return view;
})