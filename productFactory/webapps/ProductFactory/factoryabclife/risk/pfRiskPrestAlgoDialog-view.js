/**
 * 给付算法弹窗
 * @author Administrator
 * @creationTime 2016-07-12 09:06:34
 * @modificationTime 2017-02-15 10:42:27
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("pfRiskPrestAlgoDialog", function () {

    var result = null;
    //对象ID
    var objId = "";
    //对象类型
    var type = "";
    //公式信息
    var formulainfo = null;
    //险种基本信息
    var tInsurtypeBasicInf = null;
    //给付项信息
    var selectRow = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.risk.pfRiskPrestAlgoDialog.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                getTRelationDefSuccess: getTRelationDefSuccess,
                saveTObjRelationSuccess: saveTObjRelationSuccess,
                getFormulaPrestSuccess: getFormulaPrestSuccess,
                cyc: cyc,
                queryTFormulaParamRefSuccess: queryTFormulaParamRefSuccess,
                getTObjParamSuccess: getTObjParamSuccess,
                getTObjRelationSuccess: getTObjRelationSuccess,
                del: del,
                delTObjRelationSuccess: delTObjRelationSuccess,
                validaterelation: validaterelation,
                validateparam: validateparam,
                getFormulaE1Success: getFormulaE1Success,
                getFormulaAccDetailSuccess: getFormulaAccDetailSuccess,
                getFormulaLimitSuccess: getFormulaLimitSuccess,
                dtoToEntity: dtoToEntity,
                addRelation_onClick: addRelation_onClick,
                cell_control_formatter: cell_control_formatter,
                formulaId_onChange: formulaId_onChange,
                save_onClick: save_onClick,
                result: result,
                objId: objId,
                type: type,
                formulainfo: formulainfo,
                tInsurtypeBasicInf: tInsurtypeBasicInf,
                selectRow: selectRow
            });

            this.processor = new _factoryabclife.risk.pfRiskPrestAlgoDialog.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            if (!dataCenter.getDataStore('tObjFormula_prestAlgo_form')) {
                var tObjFormula_prestAlgo_form = new unieap.ds.DataStore('tObjFormula_prestAlgo_form');
                tObjFormula_prestAlgo_form.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjFormula");

                dataCenter.addDataStore(tObjFormula_prestAlgo_form);
            }

            if (!dataCenter.getDataStore('tFormulaParamRef_prestAlgo_grid')) {
                var tFormulaParamRef_prestAlgo_grid = new unieap.ds.DataStore('tFormulaParamRef_prestAlgo_grid');
                tFormulaParamRef_prestAlgo_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TFormulaParamRef");

                dataCenter.addDataStore(tFormulaParamRef_prestAlgo_grid);
            }

            if (!dataCenter.getDataStore('tObjParam_forSave')) {
                var tObjParam_forSave = new unieap.ds.DataStore('tObjParam_forSave');
                tObjParam_forSave.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjParam");

                dataCenter.addDataStore(tObjParam_forSave);
            }

            if (!dataCenter.getDataStore('tObjRelationDTO')) {
                var tObjRelationDTO = new unieap.ds.DataStore('tObjRelationDTO');
                tObjRelationDTO.setRowSetName("com.neusoft.abclife.productfactory.dto.TObjRelationDTO");

                dataCenter.addDataStore(tObjRelationDTO);
            }

            if (!dataCenter.getDataStore('tObjRelation_prestAlgo_grid')) {
                var tObjRelation_prestAlgo_grid = new unieap.ds.DataStore('tObjRelation_prestAlgo_grid');
                tObjRelation_prestAlgo_grid.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRelation");

                dataCenter.addDataStore(tObjRelation_prestAlgo_grid);
            }

            if (!dataCenter.getDataStore('tObjEntrance_forSave')) {
                var tObjEntrance_forSave = new unieap.ds.DataStore('tObjEntrance_forSave');
                tObjEntrance_forSave.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjEntrance");

                dataCenter.addDataStore(tObjEntrance_forSave);
            }

            this.page_init();
        },

        page_initEvents: function () {

            this.connect(unieap.byId("addRelation"), "onClick", this.addRelation_onClick);

            this.connect(unieap.byId("formulaId"), "onChange", this.formulaId_onChange);

            this.connect(unieap.byId("save"), "onClick", this.save_onClick);

        },



        page_load: function () {
            this.inherited(arguments);

            var datas = unieap.getXDialog().dialogData;

            //险种基本信息
            tInsurtypeBasicInf = datas.tInsurtypeBasicInf;
            //给付项对象
            selectRow = datas.selectRow;
            if (datas.opt == "live") {
                objId = selectRow.rowSet.primary[0].survvGivepayId;
                //type = "1"; 
                type = "D1#0"; //生存给付
                //查询公式下拉框
                view.processor.getFormulaPrest();
            }
            if (datas.opt == "claim") {

                objId = selectRow.rowSet.primary[0].claimGivepayId;
                //type = "2"; 
                type = "D1#1"; //理赔给付
                //查询公式下拉框
                view.processor.getFormulaPrest();
            }
            if (datas.opt == "riskamnt") {
                //查询公式下拉框
                view.processor.getFormulaE1();
                objId = datas.row_formulainfo.rowSet.primary[0].objId;
                type = datas.row_formulainfo.rowSet.primary[0].type;
            }

            if (datas.opt == "liabLimit") {
                view.processor.getFormulaLimit();
                objId = selectRow.rowSet.primary[0].id;
                type = "D2";
            }

            if (datas.opt == "accDetail") {
                view.processor.getFormulaAccDetail();
                objId = selectRow.rowSet.primary[0].payItemDetailId;
                type = "D3";
            }

            if (datas.seq == "update") {
                formulainfo = datas.row_formulainfo;
                view.form.setDataStore("form_formulaInfo", formulainfo);
                view.processor.getTObjParam(formulainfo);
                view.processor.getTObjRelation(formulainfo);
            }

        },
        page_init: function () {
            var ds = new unieap.ds.DataStore("ds_opt", [{
                    id: "gt",
                    name: "大于"
                }, {
                    id: "lt",
                    name: "小于"
                }, {
                    id: "eq",
                    name: "等于"
                }, {
                    id: "ge",
                    name: "大于等于"
                }, {
                    id: "le",
                    name: "小于等于"
                }

            ]);

            var ds1 = new unieap.ds.DataStore("ds_opt1", [{
                id: "gt",
                name: "大于"
            }, {
                id: "lt",
                name: "小于"
            }, {
                id: "eq",
                name: "等于"
            }, {
                id: "ge",
                name: "大于等于"
            }, {
                id: "le",
                name: "小于等于"
            }]);


            dataCenter.addDataStore(ds);
            dataCenter.addDataStore(ds1);
            view.processor.getTRelationDef();
            dataCenter.addDataStore("ds_result", result);
            //窗口顶端空白
            var dialog = unieap.getXDialog();
            dialog.topNode.style.marginBottom = "0px";


        }

    });
    /**
     * @description:getTRelationDef方法的成功回调。
     *
     */

    function getTRelationDefSuccess(dc) {
        result = dc.getDataStore("getTRelationDef");
        //dataCenter.addDataStore("ds_result", result);
        //var ds = new unieap.ds.DataStore("ds_result",result);
        //dataCenter.addDataStore(ds);

        //var edit = unieap.byId("grid_obj_relate").getLayoutManager().getCell("relaDefId").getEditor();
        //edit.decoder = {valueAttr:'id',displayAttr:'name'};
        //edit.getDataProvider().setDataStore(result);
        //
        //var edit = unieap.byId("grid_obj_relate").getLayoutManager().getCell("relaDefId").decoder = 
        //{store:result,valueAttr:'id',displayAttr:'name'};			
    }
    /**
     * @description:saveTObjRelation方法的成功回调。
     *
     */

    function saveTObjRelationSuccess(dc) {
        var info = dc.getParameter("saveTObjRelation");


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
     * @description:getFormulaPrest方法的成功回调。
     *
     */

    function getFormulaPrestSuccess(dc) {
        unieap.byId("formulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaD1"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function cyc(data, id) {
        count = data.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            if (data.rowSet.primary[i].id == id) {
                return data.rowSet.primary[i].name;
            }
        }
    }
    /**
     * @description:queryTFormulaParamRef方法的成功回调。
     *
     */

    function queryTFormulaParamRefSuccess(dc) {
        view.grid.setDataStore("grid_formula_params", dc.getDataStore("queryTFormulaParamRef"));
    }
    /**
     * @description:getTObjParam方法的成功回调。
     *
     */

    function getTObjParamSuccess(dc) {
        view.grid.setDataStore("grid_formula_params", dc.getDataStore("getTObjParam"));
    }
    /**
     * @description:getTObjRelation方法的成功回调。
     *
     */

    function getTObjRelationSuccess(dc) {
        var result = dc.getDataStore("getTObjRelation");
        var ds = new unieap.ds.DataStore("ds", result);
        ds.setRowSetName("com.neusoft.abclife.productfactory.dto.TObjRelationDTO");
        var count = ds.getRowSet().getRowCount();

        for (var i = 0; i < count; i++) {
            if (ds.rowSet.primary[i].relaDefType == "2") {
                var value = ds.rowSet.primary[i].relaDefValue;
                ds.rowSet.primary[i].relaDefValue_rela = value;
                ds.rowSet.primary[i].relaDefValue = null;
            }
        }
        view.grid.setDataStore("grid_obj_relate", ds);
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg1参数描述
     * @return:
     *
     */

    function del(inRowIndex) {
        var data = view.grid.getRow("grid_obj_relate", inRowIndex);

        if (data && data.rowSet && data.rowSet.primary && data.rowSet.primary.length == 1) {

            MessageBox.confirm({
                message: "是否删除？",
                yesStr: "是",
                noStr: "否",
                //关闭右上角的"X"按钮时执行onComplete函数
                iconCloseComplete: false,
                onComplete: function (value) {
                    if (value) {
                        //            	if(data.rowSet.primary[0].objSeq != null){
                        //            		var row = pfRiskPrestAlgoDialog.dtoToEntity(data);
                        //            		view.processor.delTObjRelation(row);
                        //            	}
                        //先退出行编辑再删除行
                        unieap.byId("grid_obj_relate").getManager("RowEditManager").apply();
                        view.grid.deleteRow("grid_obj_relate", inRowIndex);

                    }
                }
            }, dojo.byId("confirm"));
        }
    }
    /**
     * @description:delTObjRelation方法的成功回调。
     *
     */

    function delTObjRelationSuccess(dc) {
        //view.processor.getTObjRelation(formulainfo);			
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function validaterelation(data) {
        var count = data.getRowSet().getRowCount();
        for (var i = 0; i < count; i++) {
            var j = data.rowSet.primary[i];
            if (j.relaDefId == null || j.relaDefId == "" || j.relaDefId == undefined) {
                return "相关性不为空";
            }

            if (j.relaDefOpt == null || j.relaDefOpt == "" || j.relaDefOpt == undefined) {
                return "操作符不为空";
            }

            if ((j.relaDefValue == null || j.relaDefValue == "" || j.relaDefValue == undefined) &&
                (j.relaDefValue_rela == null || j.relaDefValue_rela == "" || j.relaDefValue_rela == undefined)) {
                return "相关性值或相关性参数不为空";
            }
            if (j.relaDefValue != null && j.relaDefValue != "" && j.relaDefValue_rela != null && j.relaDefValue_rela != "") {
                return "相关性值或相关性参数只能填其一";
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

    function validateparam(param) {
        var count2 = param.getRowSet().getRowCount();
        var flag = true;
        for (var i = 0; i < count2; i++) {
            var j = param.rowSet.primary[i];
            if (j.refValue == null || j.refValue == "" || j.refValue == undefined) {
                flag = false;
            }
        }

        return flag;
    }
    /**
     * @description:getFormulaE1方法的成功回调。
     *
     */

    function getFormulaE1Success(dc) {
        unieap.byId("formulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaE1"));
    }
    /**
     * @description:getFormulaAccDetail方法的成功回调。
     *
     */

    function getFormulaAccDetailSuccess(dc) {
        unieap.byId("formulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaD3"));
    }
    /**
     * @description:getFormulaLimit方法的成功回调。
     *
     */

    function getFormulaLimitSuccess(dc) {
        unieap.byId("formulaId").getDataProvider().setDataStore(dc.getDataStore("getFormulaD2"));
    }
    /**
     * @description:
     *
     * @param: {参数类型} arg0参数描述
     * @return:
     *
     */

    function dtoToEntity(ds) {
        var count = ds.getRowSet().getRowCount();
        var ds_entity = new unieap.ds.DataStore();
        var rowSet = new unieap.ds.RowSet();
        for (var i = 0; i < count; i++) {
            if (ds.rowSet.primary[i].relaDefValue != "" && ds.rowSet.primary[i].relaDefValue != null) {
                ds.rowSet.primary[i].relaDefType = "1";
            }
            else if (ds.rowSet.primary[i].relaDefValue_rela != "" && ds.rowSet.primary[i].relaDefValue_rela != null) {
                ds.rowSet.primary[i].relaDefType = "2";
                ds.rowSet.primary[i].relaDefValue = ds.rowSet.primary[i].relaDefValue_rela;
            }
            rowSet.addRow({
                id: ds.rowSet.primary[i].id,
                objId: ds.rowSet.primary[i].objId,
                relaDefId: ds.rowSet.primary[i].relaDefId,
                relaDefOpt: ds.rowSet.primary[i].relaDefOpt,
                relaDefValue: ds.rowSet.primary[i].relaDefValue,
                objSeq: ds.rowSet.primary[i].objSeq,
                type: ds.rowSet.primary[i].type,
                relaDefType: ds.rowSet.primary[i].relaDefType
            });

        }

        ds_entity.setRowSet(rowSet);
        ds_entity.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjRelation");
        return ds_entity;
    }

    function addRelation_onClick(event) {


        var rowData = {
            "objId": objId,
            "type": type
        };

        view.grid.insertRow("grid_obj_relate", rowData);
    }

    function cell_control_formatter(inValue, inRowIndex) {
        var delImg = unieap.WEB_APP_NAME + "/ProductFactory/factoryabclife/gridBtn/ui/btn_delete.png";


        var delBtn = "<img src='" + delImg + "' " +
            "style=\"cursor:pointer\" title=\"删除\" " +
            "onclick=\"pfRiskPrestAlgoDialog.del('" + inRowIndex + "')\" />";

        return delBtn;
    }

    function formulaId_onChange(value) {
        if (value) {
            view.processor.queryTFormulaParamRef(value);
        }

    }

    function save_onClick(event) {
        if (!unieap.byId("form_formulaInfo").validate(false)) {
            return;
        }
        if (!unieap.byId("grid_obj_relate").validate(false)) {
            return;
        }
        if (!unieap.byId("grid_formula_params").validate(false)) {
            return;
        }


        var datas = unieap.getXDialog().dialogData;
        //获取对象相关性数据
        var data = view.grid.getDataStore("grid_obj_relate");
        var message = pfRiskPrestAlgoDialog.validaterelation(data);
        if (message != null) {
            MessageBox.alert({
                title: "提示",
                message: message
            });
            return;
        }

        data = pfRiskPrestAlgoDialog.dtoToEntity(data);


        //获取对象公式数据
        var formulaInfo = view.form.getDataStore("form_formulaInfo");
        formulaInfo.rowSet.primary[0].type = type;
        formulaInfo.rowSet.primary[0].objId = objId;
        var count = data.getRowSet().getRowCount();
        var content = "";
        if (count > 0) {
            formulaInfo.rowSet.primary[0].hasRelation = "1";
            //用于运算符的数据转码
            var is_opt = dataCenter.getDataStore("ds_opt");

            //通过公共方法cyc进行id与name之间进行转码
            for (var i = 0; i < count; i++) {

                if (data.rowSet.primary[i].relaDefType == "1") {

                    var id = data.rowSet.primary[i].relaDefId;
                    var opt = data.rowSet.primary[i].relaDefOpt;
                    var value = data.rowSet.primary[i].relaDefValue;
                    var relaDefName = pfRiskPrestAlgoDialog.cyc(result, id);
                    var relaDefOpt = pfRiskPrestAlgoDialog.cyc(is_opt, opt);
                    //relation单位拼接160823zhy
                    var countUnit = result.getRowSet().getRowCount();
                    var uintParam = "";
                    for (var j = 0; j < countUnit; j++) {
                        if (result.rowSet.primary[j].name == relaDefName) {
                            uintParam = result.rowSet.primary[j].relationUint;
                            if (uintParam == "A") {
                                uintParam = "岁"
                            }
                            else if (uintParam == "Y") {
                                uintParam = "年"
                            }
                            else if (uintParam == "D") {
                                uintParam = "天"
                            }
                            else {
                                uintParam = ""
                            }
                        }
                    }
                    content = content + relaDefName + relaDefOpt + value + uintParam + " ";
                }
                else {
                    var id = data.rowSet.primary[i].relaDefId;
                    var opt = data.rowSet.primary[i].relaDefOpt;
                    var relaId = data.rowSet.primary[i].relaDefValue;
                    var relaDefName = pfRiskPrestAlgoDialog.cyc(result, id);
                    var relaDefOpt = pfRiskPrestAlgoDialog.cyc(is_opt, opt);
                    var value = pfRiskPrestAlgoDialog.cyc(result, relaId);
                    content = content + relaDefName + relaDefOpt + value + " ";
                }
            }

        }
        else {
            formulaInfo.rowSet.primary[0].hasRelation = "0";
        }
        formulaInfo.rowSet.primary[0].relationContent = content;
        //创建对象参数dataStore
        var objParam = new unieap.ds.DataStore();
        objParam.setRowSetName("com.neusoft.abclife.productfactory.entity.TObjParam");
        //获取通用参数数据
        var param = view.grid.getDataStore("grid_formula_params");
        var paramCount = param.getRowSet().getRowCount();
        objParam.setRecordCount(paramCount);
        //将通用参数数据放入一个rowSet
        var rowset = new unieap.ds.RowSet();
        var objParams = [];
        for (var i = 0; i < paramCount; i++) {
            objParams.push({
                "objId": objId,
                "paramId": param.rowSet.primary[i].id,
                "paramValue": param.rowSet.primary[i].refValue,
                "type": type
            });
        }
        rowset.addRows(objParams);
        objParam.setRowSet(rowset);

        if (!pfRiskPrestAlgoDialog.validateparam(param)) {
            MessageBox.alert({
                title: "提示",
                message: "请输入参数"
            });
            return;
        }


        //生成TObjEntrance对象  add by qyt 20160716
        var ds_entrance = new unieap.ds.DataStore("ds_entrance", [{
            "riskCode": tInsurtypeBasicInf.getRowSet().getRow(0).getItemValue("insurtypeCode"),
            "riskVer": tInsurtypeBasicInf.getRowSet().getRow(0).getItemValue("verNo"),
            "pricingLiabCode": "",
            "protecLiabCode": "",
            "busiType": "",
            "algoType": type,
            "subType1": "",
            "subType2": ""
        }]);
        ds_entrance.rowSetName = "com.neusoft.abclife.productfactory.entity.TObjEntrance";


        if (type == "D1#0") {
            //生存给付 
            ds_entrance.getRowSet().getRow(0).setItemValue("pricingLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("pricingLiabCode")); //定价代码
            ds_entrance.getRowSet().getRow(0).setItemValue("protecLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("protecLiabCode")); //保障代码
            ds_entrance.getRowSet().getRow(0).setItemValue("busiType", "02"); //业务分类  02理赔

            ds_entrance.getRowSet().getRow(0).setItemValue("algoType", "D1"); //对象分类
            ds_entrance.getRowSet().getRow(0).setItemValue("subGetdutyCode",
                selectRow.getRowSet().getRow(0).getItemValue("survvGivepayCode")); //给付类型 survvGivepayType
            //subType1 和subType2 确认后添加

        }
        else if (type == "D1#1") {
            //理赔给付
            ds_entrance.getRowSet().getRow(0).setItemValue("pricingLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("pricingLiabCode")); //定价代码
            ds_entrance.getRowSet().getRow(0).setItemValue("protecLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("protecLiabCode")); //保障代码
            ds_entrance.getRowSet().getRow(0).setItemValue("busiType", "02"); //业务分类  02理赔

            ds_entrance.getRowSet().getRow(0).setItemValue("algoType", "D1"); //对象分类
            ds_entrance.getRowSet().getRow(0).setItemValue("subType1",
                selectRow.getRowSet().getRow(0).getItemValue("accidOccurReason")); //出险原因 accidOccurReason
            ds_entrance.getRowSet().getRow(0).setItemValue("subType2",
                selectRow.getRowSet().getRow(0).getItemValue("claimClaimPayType")); //赔付类型 claimClaimPayType
        }
        else if (type.split("#")[0] == "E1") {
            ds_entrance.getRowSet().getRow(0).setItemValue("pricingLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("pricingLiabCode")); //定价责任代码
            ds_entrance.getRowSet().getRow(0).setItemValue("algoType", "E1"); //公式类型
            ds_entrance.getRowSet().getRow(0).setItemValue("busiType", "05"); //业务分类 05核保
            ds_entrance.getRowSet().getRow(0).setItemValue("subType2", type.split("#")[1]); //风险保额类型

        }
        else if (type == "D2") {
            ds_entrance.getRowSet().getRow(0).setItemValue("pricingLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("pricingLiabCode")); //定价代码
            ds_entrance.getRowSet().getRow(0).setItemValue("protecLiabCode",
                selectRow.getRowSet().getRow(0).getItemValue("protecLiabCode")); //保障代码
            ds_entrance.getRowSet().getRow(0).setItemValue("busiType", "02"); //业务分类  02理赔
            ds_entrance.getRowSet().getRow(0).setItemValue("subType1",
                selectRow.getRowSet().getRow(0).getItemValue("limitType")); //子分类
        }

        view.processor.saveTObjRelation(data, formulaInfo, objParam, ds_entrance);

    }

    var view = new _factoryabclife.risk.pfRiskPrestAlgoDialog.View();
    view.init();

    return view;
})