dojo.provide('unieap.grid.manager.ImportManager');
dojo.declare("unieap.grid.manager.ImportManager", null, {
	
	/**
	 * @summary:
	 * 		导出控制器
	 * @classDescription：
	 * 		控制Grid的导入功能
	 * @declaredClass:
	 * 		unieap.grid.manager.ImportManager
	 * @example:
	 * |var manager=grid.getManager('ImportManager');
	 * |//进行服务端导出
	 * |manager.doServerExport();
	 * |//进行客户端导出
	 * |manager.doClientExport();
	 * |//导出选中记录
	 * |manager.exportSelectedData();
	 * @img:
	 * 		images/grid/export.png
	 */

	ui:{
		enable:true,
		pageURL:true,
		uniqueCell:true,
		import_maxLength:true,
		customBeanName:true,
		_dataPreview:true,
		_bindingExcelData:true,
		events: {
			onComplete:true
		}
	},
	/**
	 * @summary:
	 * 		是否支持导入功能
	 * @description:
	 * 		默认为false，可配置import="{enable:true}"
	 * @type:
	 * 		{boolean}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid' binding="{store:'emp'}">
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar import="{enable:true}" >
	 * |	</toolbar>
	 * |</div>
	 */
	enable : false,
	
	/**
	 * @summary:
	 * 		导入功能支持扩展的URL
	 * @description:
	 * 		默认为""，可配置pageURL:'/techcomp/ria/gridImportDemo-view.jsp'
	 *      gridImportDemo是view的名称，可以通过该URL定义自己的导入功能。
	 * @type:
	 * 		{string}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid' binding="{store:'emp'}">
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar import="{enable:true,pageURL:'/techcomp/ria/gridImportDemo-view.jsp'}" >
	 * |	</toolbar>
	 * |</div>
	 */
	pageURL : '',
	
	/**
	 * @summary:
	 * 		唯一性校验列
	 * @description:
	 * 		默认为空字符，可配置import="{uniqueCell:['attr_id']}"
	 *      如果是多列确定唯一性校验列可配置中间用逗号分隔：
	 * 		                 import="{uniqueCell:['attr_name,attr_emp']}"
	 * @type:
	 * 		{array}
	 * @example:
	 * |<div dojoType='unieap.xgrid.Grid' binding="{store:'emp'}">
	 * |	<header>
	 * |		<cell name="attr_name" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar import="{uniqueCell:['attr_name']}" >
	 * |	</toolbar>
	 * |</div>
	 */
	uniqueCell :null,
	
	/**
	 * @summary:
	 * 		是否支持导入功能
	 * @description:
	 * 		默认为false，可配置import="{customBeanName:'customValidateImpl'}"
	 * @type:
	 * 		{string}
	 */
	customBeanName : 'gridImportValidation',
    
    import_maxLength : 10000,
    //数据展示的xdialog
    _gridImportPreviewUrl:"/techcomp/ria/gridImportPreview-view.jsp",
    
   	constructor: function(param){
        dojo.mixin(this, param);
    },
	
	_ishighlight:false,//更新数据是否高亮显示
	_gridObject:null,//记录当前的grid
	_cmpPath:null,
	
	/**
	 * @summary:
	 * 		前台自定义校验用户接口
	 * @type：
	 * 		{function}
	 * @param:	
	 * 		data
	 * 		 excel中的数据
	 * @return：
	 * 		data 
	 * 		默认data
	 */
	onComplete: function(data) {
		return data;
	},
	
	// 弹出导出设置对话框
	_openImportXDialog: function(){
		this._cmpPath = this._cmpPath?this._cmpPath:unieap.cmpPath;
		var _this = this;
		this._gridObject = this.grid;
		var gridCells = this.grid.getLayoutManager().getCells();
		var uniqueCell = this.validation_uniqueCell;
		if(uniqueCell && uniqueCell!='' && dojo.isArray(uniqueCell)){
			for(var i in uniqueCell){
				if(!dojo.some(gridCells, function(item){return item['name'] == uniqueCell[i];})){
					MessageBox.alert(
			             {title: RIA_I18N.xgrid['import'].info, message:RIA_I18N.xgrid['import'].uniqueMessage + uniqueCell[i]}
			        );
			        return;
				}
			};
		}
		var url = this.pageURL != ""?this.pageURL
				:unieap.widget.grid.importPageURL;
		var dialog = new unieap.xdialog.Dialog({
			url: unieap.WEB_APP_NAME + url,
			id:'import_Xdialog_config',
			title:RIA_I18N.xgrid['import'].importSetting,
			height:"235",
			dialogData:{"_this":_this,"cmpPath":_this._cmpPath,"viewModelId":_this.customBeanName},
			width:"563"
		});
		dialog.show();
	},
	
	//Excel数据展示弹出框
	_dataPreview:function(ds){
		if(!ds){
			this._ishighlight = false;
			return;
		} 
		if(ds.ishighlight == 1){
			this._ishighlight = true;
		}
		if(typeof(ds.xlsData.getDataStore("pojoList"))=="undefined"){
			unieap.showXhrLoading(false);
			MessageBox.alert(
	             {title: RIA_I18N.xgrid['import'].info,message:RIA_I18N.xgrid['import'].backInterrupt}
	        );
	        return;
		}
		var _this = this;
		var url = this._gridImportPreviewUrl;
		var dialog = new unieap.xdialog.Dialog({
			url: unieap.WEB_APP_NAME + url,
			title:"Excel"+RIA_I18N.xgrid['import'].infoData,
			height:"430",
			dialogData:{"ds":ds},
			onImgClose:function(){
				_this._importXdialogClose();
			},
			onComplete:function(ds){
				_this._bindingExcelData(ds);
			},
			width:"700"
		});
		dialog.show();
		unieap.showXhrLoading(false);
	},
	
	//第一个dialog是以隐藏模式处理，最后要统一关闭
	_importXdialogClose:function(){
		var import_Xdialog_config = unieap.byId("import_Xdialog_config");
 		if(import_Xdialog_config){
			import_Xdialog_config.close();
		}
	},
	
	//第一个dialog展现
	_importXdialogShow:function(){
		var import_Xdialog_config = unieap.byId("import_Xdialog_config");
 		if(import_Xdialog_config){
			dojo.style(import_Xdialog_config.mainNode,'display','');
		}
	},
	
	//最后的数据导入
	_bindingExcelData:function(ds){
		if(!ds){
			this._importXdialogShow();
			this._ishighlight = false;
			return;
		} 
		this._importXdialogClose();
		var data = ds.xlsData;
		data = this.onComplete(data);
		var rowSet = this.grid.getBinding().getDataStore().getRowSet();
		var excelRowSet = data.getRowSet();
		var deleteRows = new Array();
		var num = 0;
		var stateMap = ds.stateMap;
		while(stateMap[num]){
			var message = stateMap[num];
			if( message == "cover"){
				deleteRows.push(num);
			}
			if(message=="error"){
				deleteRows.push(num);
			}
			num++;
		}
		if(this.grid.edit){
			var origin = ds.origin;
			var rowCount = rowSet.getRowCount();
			var excelToOrginId = ds.excelToOrginId;
			var k = 0;
			while(k<rowCount){//处理覆盖的数据
				var coverIndex = excelToOrginId[k];
	            if (coverIndex && coverIndex!=-1) {
	            	for(var j=0;j<origin.length;j++){
	            		if(origin[j].enable){
	            			rowSet.getRow(coverIndex).setItemValue(origin[j].name,excelRowSet.getRow(k).getItemValue(origin[j].name)||"");
	            		}
	            	}
	            }
				k++;
			}
			//处理新增数据中不可编辑列的值全部置为null
			var m = 0;
			while(m<excelRowSet.getRowCount()){
	        	for(var j=0;j<origin.length;j++){
	        		if(!origin[j].enable){
	        			excelRowSet.getRow(m).setItemValue(origin[j].name,null);
	        		}
	        	}
				m++;
			}
		}
		
		excelRowSet.deleteRows(deleteRows);
		
		rowSet.addRows(excelRowSet.getData());
		unieap.showXhrLoading(false);
		MessageBox.alert(
             {title: RIA_I18N.xgrid['import'].info,message:RIA_I18N.xgrid['import'].importSuccess}
        );
	}

});
