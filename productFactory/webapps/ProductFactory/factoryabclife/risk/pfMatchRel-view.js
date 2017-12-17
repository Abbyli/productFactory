/**
 * 产品搭配
 * @author zhy
 * @creationTime 2016-07-29 09:36:06
 * @modificationTime 2017-03-24 15:09:59
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfMatchRel", function () {

    var basic = "";

    var data = null;

    var matchRel = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfMatchRel.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                queryMatchSuccess: queryMatchSuccess,
                queryAdditionSuccess: queryAdditionSuccess,
                update_addition: update_addition,
                del_addition: del_addition,
                del_additionSuccess: del_additionSuccess,
                button1_onClick: button1_onClick,
                grid_MatchRel_binding_rpc: grid_MatchRel_binding_rpc,
                grid_MatchRel_selection_onAfterSelect: grid_MatchRel_selection_onAfterSelect,
                button3_onClick: button3_onClick,
                cell_name1__basic_formatter: cell_name1__basic_formatter,
                grid_basic_binding_rpc: grid_basic_binding_rpc,
                add_MatchRel_onComplete: add_MatchRel_onComplete,
                update_MatchRel_onComplete: update_MatchRel_onComplete,
                basic: basic,
                data: data,
                matchRel: matchRel
            });

            this.processor = new _factoryabclife.risk.pfMatchRel.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_form')) {
                var tInsurtypeBasicInf_form = new unieap.ds.DataStore('tInsurtypeBasicInf_form');
                tInsurtypeBasicInf_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_form);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_grid')) {
                var tInsurtypeBasicInf_grid = new unieap.ds.DataStore('tInsurtypeBasicInf_grid');
                tInsurtypeBasicInf_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_grid);
            }

            if (!dataCenter.getDataStore('tInsurtypeBasicInf_grid_basic')) {
                var tInsurtypeBasicInf_grid_basic = new unieap.ds.DataStore('tInsurtypeBasicInf_grid_basic');
                tInsurtypeBasicInf_grid_basic.setRowSetName("com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf");

                dataCenter.addDataStore(tInsurtypeBasicInf_grid_basic);
            }

            if (!dataCenter.getDataStore('proMatchDto_form')) {
                var proMatchDto_form = new unieap.ds.DataStore('proMatchDto_form');
                proMatchDto_form.setRowSetName("com.neusoft.abclife.productfactory.dto.ProMatchDto");

                dataCenter.addDataStore(proMatchDto_form);
            }

            if (!dataCenter.getDataStore('proMatchDto_grid')) {
                var proMatchDto_grid = new unieap.ds.DataStore('proMatchDto_grid');
                proMatchDto_grid.setRowSetName("com.neusoft.abclife.productfactory.dto.ProMatchDto");

                dataCenter.addDataStore(proMatchDto_grid);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("button1"), "onClick", this.button1_onClick);

            this.connect(unieap.byId("button3"), "onClick", this.button3_onClick);

            this.connect(unieap.byId("add_MatchRel"), "onComplete", this.add_MatchRel_onComplete);

            this.connect(unieap.byId("update_MatchRel"), "onComplete", this.update_MatchRel_onComplete);

        },



        page_load: function () {
            this.inherited(arguments);

            unieap.byId("proType__MatchRel").setValue("01");
            view.processor.queryMatch(view.form.getDataStore("form_MatchRel"), 1, 10);
        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_risk", [{
                CODEVALUE: "01",
                CODENAME: "主险"
            }, {
                CODEVALUE: "02",
                CODENAME: "附险"
            }, {
                CODEVALUE: "03",
                CODENAME: "组合"
            }]);

            var ds1 = new unieap.ds.DataStore("ds_risk_query", [{
                CODEVALUE: "01",
                CODENAME: "主险"
            }, {
                CODEVALUE: "03",
                CODENAME: "组合"
            }, {
                CODEVALUE: "02",
                CODENAME: "附险"
            }]);

            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
        }

    });
    /**
     * @description:queryMatch方法的成功回调。
     *
     */

    function queryMatchSuccess(dc) {
        var result = dc.getDataStore("queryMatchRelResult");
        view.grid.setDataStore("grid_MatchRel", result);
    }
    /**
     * @description:queryAddition方法的成功回调。
     *
     */

    function queryAdditionSuccess(dc) {
        var result = dc.getDataStore("queryAdditionResult");
        view.grid.setDataStore("grid_basic", result);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function update_addition(inRowIndex) {
        var row = view.grid.getRow("grid_basic", inRowIndex);
        if (row && row.rowSet && row.rowSet.primary && row.rowSet.primary.length == 1) {

            var status = row.rowSet.primary[0].status;
            //20160309改, -1状态不可用
            if (status == -1) {
                return;
            }
            else {
                var dialog = unieap.byId("update_MatchRel");
                dialog.dialogData = {
                    "basic": basic,
                    "opt": "update",
                    "selectRow": row
                };
                dialog.show();
            }
        }
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function del_addition(inRowIndex) {
        var selectRow = view.grid.getRow("grid_basic", inRowIndex);
        MessageBox.confirm({
            title: "提示",
            message: "确认删除！",
            onComplete: function (value) {
                if (value == true) {
                    var addition = selectRow.rowSet.primary[0].insurtypeCode;
                    view.processor.del_addition(basic, addition);
                }
            }
        });
    }
    /**
     * @description:del_addition方法的成功回调。
     *
     */

    function del_additionSuccess(dc) {
        var data = view.grid.getRow("grid_MatchRel");
        view.processor.queryAddition(data, matchRel, 1, 10);
    }

    function button1_onClick(event) {
        if (!unieap.byId("form_MatchRel").validate(false)) {
            return;
        }

        view.processor.queryMatch(view.form.getDataStore("form_MatchRel"), 1, 10);
    }

    function grid_MatchRel_binding_rpc(store, load) {
        view.processor.queryMatch(view.form.getDataStore("form_MatchRel"), store.getPageNumber(), store.getPageSize());
    }

    function grid_MatchRel_selection_onAfterSelect(inRowIndex) {
        data = view.grid.getRow("grid_MatchRel", inRowIndex);
        basic = data.rowSet.primary[0].proCode;
        matchRel = data.rowSet.primary[0].proType;
        //if(matchRel=="01"){
        //unieap.byId("titlePane3").setTitle("可搭配的附险");
        //}
        //if(matchRel=="02"){
        //unieap.byId("titlePane3").setTitle("可搭配的主险");
        //}
        view.processor.queryAddition(data, matchRel, 1, 10);
    }

    function button3_onClick(event) {
        if (view.grid.getRow("grid_MatchRel") == null) {
            MessageBox.alert({
                title: "提示",
                message: "请选择一条险种"
            });
            return;
        }
        //主险判断
        var matchRel = data.rowSet.primary[0].proType;
        //if(basic!="" && (matchRel=="01" || matchRel == "03")){
        var dialog = unieap.byId("add_MatchRel");
        dialog.dialogData = {
            "basic": basic,
            "opt": "add",
            "matchRel": matchRel
        };
        dialog.show();
        //}else{
        //	MessageBox.alert({title:"提示",
        //	message:"请选择一条主险或组合"});
        //}

    }

    function cell_name1__basic_formatter(inValue, inRowIndex) {
        var editImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_edit.png";
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";



        var updateBtn = "<img src='" + editImg + "' " +
            "style=\"margin-right:10px; cursor:pointer\" title=\"修改\" " +
            "onclick=\"pfMatchRel.update_addition('" + inRowIndex + "')\" />";

        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfMatchRel.del_addition('" + inRowIndex + "')\" />";
        if (matchRel == "02") {
            return "";
        }
        return updateBtn + delBtn;


    }

    function grid_basic_binding_rpc(store, load) {
        view.processor.queryAddition(view.grid.getRow("grid_MatchRel"), store.getPageNumber(), store.getPageSize());
    }

    function add_MatchRel_onComplete(returnObj) {
        view.processor.queryAddition(data, matchRel, 1, 10);
    }

    function update_MatchRel_onComplete(returnObj) {
        view.processor.queryAddition(data, matchRel, 1, 10);
    }

    var view = new _factoryabclife.risk.pfMatchRel.View();
    view.init();

    return view;
})