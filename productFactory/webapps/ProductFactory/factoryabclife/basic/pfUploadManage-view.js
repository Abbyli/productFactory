/**
 *
 * @author Administrator
 * @creationTime 2016-08-31 11:40:06
 * @modificationTime 2016-08-31 18:16:02
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfUploadManage", function () {

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.pfUploadManage.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryAllSuccess: queryAllSuccess,
                grid1_detail_getMasterDetail: grid1_detail_getMasterDetail
            });

            this.processor = new _factoryabclife.basic.pfUploadManage.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('sysAsyncExecuteResult_info')) {
                var sysAsyncExecuteResult_info = new unieap.ds.DataStore('sysAsyncExecuteResult_info');
                sysAsyncExecuteResult_info.setRowSetName("com.neusoft.abclife.productfactory.entity.SysAsyncExecuteResult");

                dataCenter.addDataStore(sysAsyncExecuteResult_info);
            }

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            view.processor.queryAll();
        },
        page_init: function () {
            var ds = unieap.ds.DataStore("ds_status_upload", [{
                    CODEVALUE: "1",
                    CODENAME: "成功"
                }, {
                    CODEVALUE: "-1",
                    CODENAME: "失败"
                }, {
                    CODEVALUE: "99",
                    CODENAME: "待处理"
                }

            ]);

            dataCenter.addDataStore(ds);
        }

    });
    /**
     * @description:queryAll方法的成功回调。
     *
     */

    function queryAllSuccess(dc) {
        view.grid.setDataStore("grid1", dc.getDataStore("getAllSysAsyncExecuteResult"));
    }

    function grid1_detail_getMasterDetail(inRowIndex) {
        var row = view.grid.getRow("grid1", inRowIndex);
        var result = "<div>";
        result += "<table>";
        result += "<tr>";
        result += "<td>"
        result += row.getRowSet().getRow(0).getItemValue("errorStack");
        result += "</td>";
        result += "</tr>";
        result += "</table>";
        result += "</div>";

        return result;
    }

    var view = new _factoryabclife.basic.pfUploadManage.View();
    view.init();

    return view;
})