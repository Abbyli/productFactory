dojo.provide('unieap.xgrid.manager.ExportManager');
dojo.declare("unieap.xgrid.manager.ExportManager", null, {
	/**
	 * @summary:
	 * 		导出控制器
	 * @classDescription：
	 * 		控制Grid的导出功能
	 * @declaredClass:
	 * 		unieap.xgrid.manager.ExportManager
	 * @example:
	 * |var manager=grid.getManager('ExportManager');
	 * |//进行服务端导出
	 * |manager.doServerExport();
	 * |//进行客户端导出
	 * |manager.doClientExport();
	 * |//导出选中记录
	 * |manager.exportSelectedData();
	 *  @img:
	 * 		images/grid/export.png
	 */
	
	/**
	 * @summary:
	 * 		导出所需的url
	 * @description:
	 * 		默认导出url为"/rpc.do?method=doExport"
	 * @type:
	 * 		{string}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid' binding="{store:'emp'}">
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar export="{url:'test.do'}" >
	 * |	</toolbar>
	 * |</div>
	 * 		用户可在toolbar标签上的export定义url
	 * @example:
	 * |var manager=grid.getManager('ExportManager');
	 * |//可以通过setInfo方法改变打印控制器的url
	 * |manager.setInfo({url:'test.do'});
	 */
    url: null,
    
	/**
	 * @summary:
	 * 		导出按钮的提示信息
	 * @description:
	 * 		默认提示信息为空（null）
	 * @type:
	 * 		{string}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid' binding="{store:'emp'}">
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar export="{tooltipMessage:'导出EXCEL'}" >
	 * |	</toolbar>
	 * |</div>
	 *  		
	 */
    tooltipMessage:null,
    
	/**
	 * @summary:
	 * 		导出所需的parameters
	 * @type:
	 * 		{object}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid'>
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar export="{parameters:{info:'我来自基础软件'}}" >
	 * |	</toolbar>
	 * |</div>
	 * 		可在toolbar标签上的export定义parameters
	 * @example:
	 * |var manager=grid.getManager('ExportManager');
	 * |//也可以通过setInfo方法设置打印控制器的parameters
	 * |manager.setInfo({parameters:{info:'我来自基础软件'}});
	 * 		
	 */
    parameters: null,
	
	
	/**
	 * @summary:
	 * 		设置导出选项
	 * @description:
	 * 		传入一个数组，控件会根据传入的数组自动生成下拉菜单。默认会生成"服务端导出"、"客户端导出"以及"导出选中数据"三个菜单项。
	 * @type:
	 * 		{array}
	 * @default:
	 * 		['server','client','checked']
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid">
	 * |	<header>
	 * |		<cell name="empno" label="编号"></cell>
	 * |	</header>
	 * |	<toolbar export="{options:['server','checked']}"></toolbar>
	 * |</div>
	 */
	options: null,
	
	
	/**
	 * @summary:
	 * 		设置当点击导出下拉按钮(非右侧下拉箭头)时，执行什么操作。默认为服务端导出
	 * @description:
	 * 		Grid控件导出功能会导出显示区、锁定行以及ToolBar上的数据信息，导出的结构可以参考rpc.js中unieap.Action.doExport方法。
	 * 		如果用户想自定义后台实现导出，可以参考com.neusoft.unieap.ria33demo.action.export.ExportPojoAction类的实现
	 * @type:
	 * 		{string}
	 * @enum:
	 * 		{"server"|"client"|"checked"}
	 * @default:
	 * 		"server"
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid">
	 * |	<header>
	 * |		<cell name="empno" label="编号"></cell>
	 * |	</header>
	 * |	<toolbar export="{defaultType:'client'}"></toolbar>
	 * |</div>
	 */
	defaultType: '',
	
	/**
	 * @summary:
	 * 		设置导出的文件类型
	 * @description:
	 * 		fileType属性为excel、csv或者all。,当display为all时，支持在界面上选择文件类型。
	 * 		
	 * @type:
	 * 		{string}
	 * @enum:
	 * 		{"csv"|"excel"|"all"}
	 * @default:
	 * 		""
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid">
	 * |	<header>
	 * |		<cell name="empno" label="编号"></cell>
	 * |	</header>
	 * |	<toolbar export="{fileType:'csv'}"></toolbar>
	 * |</div>
	 */
	fileType : '',
	
	/**
	 * @summary:
	 * 		导出配置页面
	 * @description:
	 * 		导出时以xDialog形式弹出pageURL关联的页面。
	 * 		
	 * @type:
	 * 		{string}
	 * @default:
	 * 		"XXXX.jsp"
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid">
	 * |	<header>
	 * |		<cell name="empno" label="编号"></cell>
	 * |	</header>
	 * |	<toolbar export="{pageURL:'XXXX.jsp'}"></toolbar>
	 * |</div>
	 */
	pageURL : '',
    
    constructor: function(param){
        dojo.mixin(this, param);
    },
	
	/**
	 * @summary:
	 * 		设置导出信息
	 * @param:
	 * 		{object} exportInfo 导出信息
	 * @example:
	 * |var manager=grid.getManager('ExportManager');
	 * |var exportInfo={
	 * |	url:'test',
	 * |	parameters:{user:'chen',password:'s'}
	 * |}
	 * |manager.setInfo(exportInfo);
	 */
	setInfo: function(exportInfo){
		 dojo.mixin(this, exportInfo||{});
	},
	
	/**
	 * @summary:
	 * 		服务端导出
	 * @param：
	 * 		{object|null} exportInfo 导出信息
	 * @example:
	 * |//通过ExportManager进行服务端导出操作
	 * |grid.getManager("ExportManager").doServerExport();
	 * @example:
	 * |var exportInfo={url:'exportInfo.do',parameters:'{}'}
	 * |grid.getManager("ExportManager").doServerExport(exportInfo);
	 */
	doServerExport: function(exportInfo,removeHidden){
		var exportData = this._removeHiddenGridData(this.grid.getGridData());
		if(exportData.store.getRowSet().getRowCount()>0){
			exportInfo=exportInfo||{};
			dojo.mixin(exportInfo,{url:this.url,parameters:this.parameters,type:"server"});
			dojo.mixin(exportData,exportInfo);
			this.fileType = this.fileType ? this.fileType : unieap.widget.grid.exportFileType;
			if(this.fileType == 'all'){
				this._openExportXDialog(exportData);
			}else{
				dojo.mixin(exportData, {
					'exportType' : this.fileType
				});
				unieap.Action.doExport(exportData);
			}
		}else{
		     MessageBox.alert({
//					title : "提示信息", // MODIFY BY TENGYF
					title : RIA_I18N.xgrid['export'].info,
//					message : '无可导出数据，请重新设置查询条件后再导出!'
					message : RIA_I18N.xgrid['export'].noDataByQuery
				});
		}
	},
	
	/**
	 * @summary:
	 * 		客户端端导出
	 * @param：
	 * 		{object|null} exportInfo 导出信息
	 * @example:
	 * |//通过ExportManager进行客户端导出操作
	 * |grid.getManager("ExportManager").doClientExport();
	 * @example:
	 * |var exportInfo={url:'exportInfo.do',parameters:'{}'}
	 * |grid.getManager("ExportManager").doClientExport(exportInfo);
	 */
	doClientExport: function(exportInfo){
		var exportData = this._removeHiddenGridData(this.grid.getGridData());
		if(exportData.store.getRowSet().getRowCount()>0){
			exportInfo=exportInfo||{};
			dojo.mixin(exportInfo,{url:this.url,parameters:this.parameters,type:"client"});
			dojo.mixin(exportData,exportInfo);
			this.fileType = this.fileType ? this.fileType : unieap.widget.grid.exportFileType;
			if(this.fileType == 'all'){
				this._openExportXDialog(exportData);
			}else{
				dojo.mixin(exportData, {
					'exportType' : this.fileType
				});
				unieap.Action.doExport(exportData);
			}
		}else{
		     MessageBox.alert({
//					title : "提示信息",
					title : RIA_I18N.xgrid['export'].info,
//					message : '无可导出数据，请重新设置查询条件后再导出!'
					message : RIA_I18N.xgrid['export'].noDataByChoice
				});
		}
	},
	
	
	/**
	 * @summary:
	 * 		导出所有选中的数据
	 * @description:
	 * 		如果用户在toolbar上设置了paging的pageCache为true,则导出缓存的所有选中数据。
	 * @param:
	 * 		{Object} exportInfo
	 * @example:
	 * |//通过ExportManager导出所有选中的数据
	 * |grid.getManager("ExportManager").exportSelectedData();
	 * @example:
	 * |var exportInfo={url:'exportInfo.do'};
	 * |grid.getManager("ExportManager").exportSelectedData(exportInfo);
	 */
	exportSelectedData: function(exportInfo){
		var pagingManager=this.grid["PagingManager"],
			data=pagingManager.getSelectedCachedData();
		var gridData=this._removeHiddenGridData(this.grid.getGridData()),
			store=this.grid.getBinding().getDataStore(),
			dsName=gridData['store'].getName();
		delete gridData['store'];
		exportInfo=exportInfo||{};
		dojo.mixin(exportInfo,{url:this.url,parameters:this.parameters,type:'client'});
//		dojo.mixin(gridData,exportInfo,{
//			store:new unieap.ds.DataStore(dsName,data)
//		});
		if(data.length>0){
			var rowSet = new unieap.ds.RowSet();
			for(var i=0;i<data.length;i++){
				rowSet.insertRow(data[i],i);
			}
			var store = new unieap.ds.DataStore(dsName);
			store.setRowSet(rowSet);
			dojo.mixin(gridData,exportInfo,{type:'client'},{
				store:store
			});
			this.fileType = this.fileType ? this.fileType : unieap.widget.grid.exportFileType;
			if(this.fileType == 'all'){
				this._openExportXDialog(gridData);
			}else{
				dojo.mixin(gridData, {
					'exportType' : this.fileType
				});
				unieap.Action.doExport(gridData);
			}
		}else{
		     MessageBox.alert({
//					title : "提示信息",
					title : RIA_I18N.xgrid['export'].info,
//					message : '无可导出数据，请先选择数据再导出!'
					message : RIA_I18N.xgrid['export'].noDataByChoice
				});
			}
	},
	
	// 弹出导出设置对话框
	_openExportXDialog: function(exportData){
		var _this = this;
		exportData["_this"] = this;
		var dialog = new unieap.xdialog.Dialog({
			url: unieap.WEB_APP_NAME + (this.pageURL ? this.pageURL : unieap.widget.grid.exportPageURL),
			title:RIA_I18N.xgrid['export'].exportSetting,
			height:"180",
			width:"563"
		});
		dialog.dialogData = exportData;
		dialog.show();
	},
	
	//获得选中的记录，包括primary和filter缓冲区中的数据
	_getSelectedData: function(store){
		var data=[],rowset=store.getRowSet(),
			totalData=rowset.getData(unieap.ds.Buffer.PRIMARY).concat(rowset.getData(unieap.ds.Buffer.FILTER));
		dojo.forEach(totalData,function(item){
			var row = new unieap.ds.Row(rowset,item);
			//item["_s"]==true&&data.push(item);
			row.isRowSelected()&&data.push(item);
		});
		return data;
	},
	
	_removeHiddenGridData:function(exportData){
		var structures = exportData['layout'];
		dojo.forEach(structures,function(structure){
			if(!structure.type){
				var index = 0;
				while(structure[0][index]){
					var cell = structure[0][index];
					cell.hidden?structure[0].splice(index,1):index++;
				}
			}
		});
		return exportData;
	}
	
	
});
