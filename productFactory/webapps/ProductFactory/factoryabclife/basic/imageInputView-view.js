/**
 * 新影像扫描页面, view页面集成activeX组件
 * @author user
 * @creationTime 2014-05-06 16:22:48
 * @modificationTime 2017-01-13 10:52:25
 * @version 1.0.0
 * @generated
 */
dojo.require("unieap.view.View");
unieap.define("imageInputView", function () {

    var root = "";

    var scan = null;

    dojo.addOnLoad(function () {

    });

    dojo.declare("_factoryabclife.basic.imageInputView.View", unieap.view.View, {



        create: function () {
            if (typeof (_scribeHandles) != "undefined") {
                dojo.mixin(this, {
                    _scribeHandles: _scribeHandles
                });
            }

            dojo.mixin(this, {
                _rootNodeId: (unieap instanceof UnieapDecorate) ? rootId : '',
                dataCenter: dataCenter,
                UploadImgData: UploadImgData,
                saveJsonSuccess: saveJsonSuccess,
                saveJsonError: saveJsonError,
                getBillCardTypeSuccess: getBillCardTypeSuccess,
                root: root,
                scan: scan
            });

            this.processor = new _factoryabclife.basic.imageInputView.Processor(this);

            this.controls = new unieap.view.Controls(this);
            this.form = new unieap.view.Form(this);
            this.grid = new unieap.view.Grid(this);
            this.tree = new unieap.view.Tree(this);
        },

        init: function () {

            this.page_init();
        },

        page_initEvents: function () {

        },



        page_load: function () {
            this.inherited(arguments);

            root = this._rootNodeId;
            //获取单证码表 和当前登陆人机构代码
            view.processor.getBillCardType("");


        },
        page_init: function () {
            //1. <!-- codebase="../../install/setup.exe#version=1,0,0,0" --> ,配访问权限 .*lifeCore/install/WebScannerSetup.msi				
            //2. <!-- codebase="../../install/WebScannerX.CAB#version=1,0,0,0"-->



            //var imginfo = {"imginfo":[
            //{"OrgCode":"100","MainSheetTypeId":"031","FileCode":"001","FileSeqNum":"1","ImageTypeId":"031","PolicyId":"","UploadedPath":"\\20140630\\1404111100641.jpg"},
            //{"OrgCode":"100","MainSheetTypeId":"031","FileCode":"001","FileSeqNum":"2","ImageTypeId":"031","PolicyId":"","UploadedPath":"\\20140630\\1404111101532.jpg"}]};
            //view.processor.saveJson(imginfo);



        }

    });
    /**
     * @description:
     *
     * @param: {参数类型} jsonObj 参数描述
     * @return:
     *
     */

    function UploadImgData(jsonObj) {
        //alert(jsonObj);
        view.processor.saveJson(jsonObj);
    }
    /**
     * @description:saveJson方法的成功回调。
     *
     */

    function saveJsonSuccess(dc) {
        var pid = dc.getParameter("pid");
        if (pid == -1) {
            scan.CallbackUploadImgData("false", "error");
        }
        else {
            scan.CallbackUploadImgData('true', '');
        }
    }
    /**
     * @description:saveJson方法的失败回调。
     *
     */

    function saveJsonError(xhr) {
        scan.CallbackUploadImgData("false", "error");
        alert("业务执行失败！");
    }
    /**
     * @description:getBillCardType方法的成功回调。
     *
     */

    function getBillCardTypeSuccess(dc) {
        var ds_listMST = dc.getDataStore("listMST");
        var ds_listIT = dc.getDataStore("listIT");
        var ds_listMST_primary = ds_listMST.rowSet.primary;
        var ds_listIT_primary = ds_listIT.rowSet.primary;
        var Mst_json = unieap.toJson(ds_listMST_primary);
        var IT_json = unieap.toJson(ds_listIT_primary);
        var org = dc.getParameter("org");
        var orgArray = new Array();
        orgArray = org.split("#");
        var orgCode = orgArray[0];
        var url = dc.getParameter("rtnURL");
        //插件
        if (url == "" || url == null) {
            alert("文件上传地址不能为空！");
        }
        else {
            scan = document.getElementById(root + "webScan");
            if (scan != null) {
                var check = scan.UploadFileService;
                if (check == undefined) {
                    //			while(check == undefined)
                    //			{
                    //				check = scan.UploadFileService;
                    //				if(check != undefined)
                    //				{
                    //					scan.UploadFileService = url;
                    //					scan.MainSheetType = Mst_json.substring(0,Mst_json.indexOf("]")+1)+"}";
                    //					scan.ImageType = IT_json.substring(0,IT_json.indexOf("]")+1)+"}";
                    //					scan.OrgCode = OrgCode;
                    //					scan.SetHtml(window);
                    //				}
                    //			}						
                }
                else {
                    scan.UploadFileService = url;
                    scan.MainSheetType = Mst_json.substring(0, Mst_json.indexOf("]") + 1) + "}";
                    scan.ImageType = IT_json.substring(0, IT_json.indexOf("]") + 1) + "}";
                    scan.OrgCode = orgCode;
                    scan.SetHtml(window);
                }
            }
        }
    }

    var view = new _factoryabclife.basic.imageInputView.View();
    view.init();

    return view;
})