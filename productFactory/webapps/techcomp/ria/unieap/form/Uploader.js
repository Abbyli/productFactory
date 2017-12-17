dojo.provide("unieap.form.Uploader");
dojo.require("unieap.xgrid.Grid");
dojo.require("unieap.progressbar.ProgressBar");
dojo.declare("unieap.form.Uploader", [dijit._Widget, dijit._Templated], {
	
	UserInterfaces : {
		width: "string",
		height: "string",
		path: "string",
		binding: "object",
		columns: "object",
		filters: "object",
		displayButtons: "object",
		uploadURL: "string",
		downloadURL: "string",
		deleteURL: "string",
		upload: "function",
		setFilters: "function",
		setDataStore: "function",
		getDataStore: "function",
		onBeforeUpload: "function",
		onUploadProgress: "function",
		onUploadComplete: "function"
	},
	
	/**
	 * @summary:
	 * 		设置控件的宽度,支持数字或者百分比
	 * @type:
	 * 		{number|string}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" width="40px"></div>
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" width="50%"></div>
	 */
	width: "100%",

	/**
	 * @summary:
	 * 		设置控件的高度,支持数字或者百分比
	 * @type:
	 * 		{number|string}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" height="40px"></div>
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" height="50%"></div>
	 */
	height: "auto",
	
	path: null,
	
	binding: null,
	
	columns: [
				{label: "文件名", name: "name", width: "50%", canSort: false},
				{label: "文件大小", name: "size", width: "15%", canSort: false},
				{label: "上传进度", name: "id", width: "35%", canSort: false, formatter: function(value, index) {
					var gridStore = this.grid.getBinding().getDataStore();
					var gridData = gridStore.getRowSet().getRow(index).getData();
					if(gridData["state"] == "complete") {
						return "<div id=\"" + value + "_background\" class=\"progress_background\" style=\"width:100%;\"></div><div id=\"" + value + "\" class=\"progress_value\" style=\"width:100%;\">上传完毕</div>";
					} else if(gridData["state"] == "error") {
						return "<div id=\"" + value + "_background\" class=\"progress_background\" style=\"width:100%;background-color:red;\"></div><div id=\"" + value + "\" class=\"progress_value\" style=\"width:100%;\">上传失败</div>";
					} else if(!gridData["state"]) {
						return "历史上传文件";
					} else {
						return "<div id=\"" + value + "_background\" class=\"progress_background\"></div><div id=\"" + value + "\" class=\"progress_value\"></div>";
					}
				}}
			],
	
	/**
	 * @summary:
	 * 		设置过滤器
	 * @description：
	 * 		mime_types MINE类型  max_file_size 文件最大大小
	 * @type:
	 * 		{object}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" filters="{mine_types: [{title: 'Image files', extensions: 'jpg,gif,png'}], max_file_size: '200kb'}"></div>
	 */
	filters: {
		max_file_size: 0
	},
	
	/**
	 * @summary:
	 * 		设置工具栏按钮展现
	 * @description：
	 * 		type 类型：值upload代表上传按钮，值download代表下载按钮，值delete代表删除按钮
	 *      visible 是否可见：值true为不可见，值false为不可见，没有该字段默认可见
	 * @type:
	 * 		{object}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" displayButtons="[{type: 'upload', visible: 'false'}]"></div>
	 */
	displayButtons: [],
	
	/**
	 * @summary:
	 * 		上传地址
	 * @type:
	 * 		{string}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" uploadURL="upload.action"></div>
	 */
	uploadURL: null,
	
	/**
	 * @summary:
	 * 		下载地址
	 * @type:
	 * 		{string}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" downloadURL="download.action"></div>
	 */
	downloadURL: null,
	
	/**
	 * @summary:
	 * 		删除地址
	 * @type:
	 * 		{string}
	 * @example:
	 * | <div id="id" dojoType="unieap.form.Uploader" deleteURL="delete.action"></div>
	 */
	deleteURL: null,
	
	/**
	 * @summary:
	 * 		上传
	 * @example:
	 * |var uploader = unieap.byId('uploader');
	 * |uploader.upload();
	 * 		上传文件
	 */
	upload: function() {
		this._uploader.start();
	},
	
	/**
	 * @summary:
	 * 		设置过滤器
	 * @param:
	 * 		{object} filters 过滤器
	 * @example:
	 * |var uploader = unieap.byId('uploader');
	 * |var filters = {mine_types: [{title: 'Image files', extensions: 'jpg,gif,png'}], max_file_size: '200kb'};
	 * |uploader.setFilters(filters);
	 */
	setFilters: function(filters) {
		this.filters = filters;
		this.setOption("filters", filters);
	},
	
	/**
	 * @summary:
	 * 		设置下载列表的 DataStore
	 * @param:
	 * 		{object} dataStore DataStore
	 * @example:
	 * |var uploader = unieap.byId('uploader');
	 * |var dataStore = new unieap.ds.DataStore("uploader", [{id: "myId", size: 1111111, name: "myFile"}]);
	 * |uploader.setDataStore(dataStore);
	 */
	setDataStore: function(dataStore) {
		if(dataStore) {
			this._grid.getBinding().setDataStore(dataStore);
			
			this._fitGridHeight();
		}
	},
	
	/**
	 * @summary:
	 * 		获取下载列表的 DataStore
	 * @param:
	 * 		{object} dataStore DataStore
	 * @example:
	 * |var uploader = unieap.byId('uploader');
	 * |var dataStore = new unieap.ds.DataStore("uploader", [{id: "myId", size: 1111111, name: "myFile"}]);
	 * |uploader.setDataStore(dataStore);
	 */
	getDataStore: function() {
		// 克隆一份当前 Grid 的 DataStore
		var result = this._grid.getBinding().getDataStore().clone();
		
		// 移除上传失败的数据
		var rowSet = result.getRowSet();
		for(var i = 0; i < rowSet.getRowCount(); i++) {
			var id = rowSet.getItemValue(i, "id");
			if(this._progress[id] == "error") {
				rowSet.deleteRow(i);				
			}
		}
		
		return result;
	},
	
	onBeforeUpload: function(uploader, file) { return true; },
	
	onUploadProgress: function(uploader, file, percent) {},
	
	onUploadComplete: function(uploader, files) {},
	
	_grid: null,
	_toolBar: null,
	_browseButton: null,
	_downloadButton: null,
	_deleteButton: null,
	
	_uploader: null,
	
	_max_file_size: 0,
	
	// 记录上传进度
	_progress: {},
	
	templateString: '<div class="uploader"></div>',
	
	
	postCreate: function() {
		this.inherited(arguments);
		
		var context = this;
		
		this._setWidthAndHeight();

		// 创建 Grid
		var grid = this._getGrid();
		
		// 创建工具栏
		var toolBar = this._getToolBar(grid);
		grid.toolbar = toolBar;
		
		// 添加 Grid
		this.domNode.appendChild(grid.domNode);

		// 绑定事件
		this._bindEvent();
		
		// 初始化路径下所有文件的信息
		// add 2014.11.06 by l_zhen 暂时不需要这个功能
		setTimeout(function() {
			context._initPathFiles();
		}, 1000);
		
		// 是否需要使用 PLUpload 上传？
		if(this._isButtonVisible("upload")) {
			// 延迟初始化 PLUpload
			var initUploader = this._initUploader;
			var bindUploaderEvent = this._bindUploaderEvent;
			setTimeout(function() {
				// 初始化 PLUpload
				initUploader.call(context);
				// 绑定 PLUpload 事件
				bindUploaderEvent.call(context);
				
				// 初始化上传文件最大值
				context._initMaxFileSize();
			}, 1000);
		}
	},
	
	startup: function() {
		this.inherited(arguments);
		
		this.resize();
	},
	
	resize: function() {
		var context = this;
		setTimeout(function() {
			context._setGridWidthAndHeight();
		}, 1000);
	},
	
	_setWidthAndHeight: function() {
		this.width && dojo.style(this.domNode, "width", isNaN(this.width)?this.width:(this.width+"px"));
		this.height && dojo.style(this.domNode, "height", isNaN(this.height)?this.height:(this.height+"px"));
	},
	
	_setGridWidthAndHeight: function() {
		this._grid.setWidth((this.domNode.offsetWidth - 5) + "px");
		this._grid.setHeight((this.domNode.offsetHeight - 40) + "px");
	},
	
	_fitGridHeight: function() {
		var ds = this._grid.getBinding().getDataStore();
		if(ds) {
			var rs = ds.getRowSet();
			if(rs) {
				var count = rs.getRowCount();
				
				var height = (28 + count * 23) + "px";
				this._grid.setHeight(height);
			}
		}
	},
	
	_getGrid: function() {
		if(!this._grid) {
			var columns = this.columns;
			var header = {rows:[columns]}
			var layout = [header];
			
			this._grid = new unieap.xgrid.Grid({
					id: this.id + "_grid",
					binding: this.binding,
					selection: {selectType: "m"},
					views: {rowNumber: true},
					layout: {structure: layout},
					height: "20px"  // 默认高度
			});
			this._grid.resizeContainer();
		}
		return this._grid;
	},
	
	_getToolBar:function(grid){
		if(!this._toolBar){
			dojo.require("unieap.xgrid.core.toolbar");
			this._toolBar = new unieap.xgrid.toolbar({
				grid:grid
			});
			
			// 隐藏翻页按钮
			dojo.style(this._toolBar.firstImageNode.parentNode.parentNode, {display: "none"});
			
			// 浏览按钮
			this._browseButton = this._createToolBarButton((this.id + "_unieapUploader" + "upload"), "上传");
			this._toolBar.containerNode.appendChild(this._browseButton.domNode);
			if(!this._isButtonVisible("upload")) {
				dojo.style(this._browseButton.domNode, {
					display: "none"
				});
			}
			
			// 下载按钮
			this._downloadButton = this._createToolBarButton((this.id + "_unieapUploader" + "download"), "下载");
			this._toolBar.containerNode.appendChild(this._downloadButton.domNode);
			if(!this._isButtonVisible("download")) {
				dojo.style(this._downloadButton.domNode, {
					display: "none"
				});
			}
			
			// 删除按钮
			this._deleteButton = this._createToolBarButton(((this.id + "_unieapUploader" + "delete")), "删除");
			this._toolBar.containerNode.appendChild(this._deleteButton.domNode);
			if(!this._isButtonVisible("delete")) {
				dojo.style(this._deleteButton.domNode, {
					display: "none"
				});
			}
		}
		return this._toolBar;
	},
	
	_createToolBarButton: function(id, label) {
		var button = null;
		
		dojo.require("unieap.form.Button");
		button = new unieap.form.Button({
			id: id,
			label: label
		});
//		buton = dojo.create('a', {
//			style: "minWidth:50px;width:auto;padding:0 5px;"
//		});
//		dojo.addClass(button, "u-form-file-btn");
//		if(dojo.isFF) {
//			button.text = label;
//		} else {
//			button.innerHTML = label;
//		}
		return button;
	},
	
	_initUploader: function() {
		// 构造 Uploader 选项
		var options = {};
		options["browse_button"] = this._browseButton.domNode;
		
		if(this.uploadURL) {
			options["url"] = this.uploadURL;
		} else {
			options["url"] = unieap.WEB_APP_NAME + "/techcomp/ria/uploader!upload.action";
		}
		
		// 添加路径
		if(this.path) {
			if(options["url"].indexOf('?') < 0) {
				options["url"] += ("?path=" + this.path);
			} else {
				options["url"] += ("&path=" + this.path);
			}
		}
		
		// 从 URL 获取参数 path 值
		if(this.uploadURL) {
			var path = this._getURLParam(this.uploadURL, "path");
			if(path) {
				this.path = path;
			}
		}
		
		if(this.filters) {
			options["filters"] = this.filters;
		}
		
		options["runtimes"] = "html5,flash,html4";
		
		options["flash_swf_url"] = unieap.WEB_APP_NAME + "/techcomp/ria/unieap/plupload/Moxie.swf";
		
		// 初始化uploader
		this._uploader = new plupload.Uploader(options);
		this._uploader.init();
	},
	
	_bindEvent: function() {
		var context = this;
		
		// 下载按钮是否可见？
		if(this._isButtonVisible("download")) {
			// 如果没有设置下载 URL，默认给一个URL
			if(!this.downloadURL) {
				this.downloadURL = unieap.WEB_APP_NAME + "/techcomp/ria/uploader!download.action";
			}
			// 绑定下载按钮事件
			this._downloadButton.onClick = function(event) {
				// 获取下载URL
				var url = context.downloadURL;
				
				// 添加文件列表参数
				var selectionManager = context._grid.getManager('SelectionManager');
				var rows = selectionManager.getSelectedRows();
				
				if(rows.length == 0) {
					MessageBox.alert(
							{title:"提示信息",message:'请选择需要下载的文件'}
					);
					return;
				}
				
				var fileName = "";
				for(var i= 0; i < rows.length; i++) {
					
					if(rows[i].getData()["state"] == "error") {
						MessageBox.alert(
								{title:"提示信息",message:'无法下载上传失败文件'}
						);
						return;
					}
					
					var name = rows[i].getData()["name"];
					if(i == 0) {
						fileName += name;
					} else {
						fileName += ("," + name);
					}
				}
				
				if(url.lastIndexOf("?") > -1) {
					url += ("&name=" + encodeURIComponent(fileName));
				} else {
					url += ("?name=" + encodeURIComponent(fileName));
				}
				
				// 添加路径
				if(context.path) {
					if(url.indexOf('?') < 0) {
						url += ("?path=" + context.path);
					} else {
						url += ("&path=" + context.path);
					}
				}
				
				// iframe下载文件
				var iframe = dojo.create("iframe", {
					width: "0px", 
					height: "0px"
				});
				iframe.src = url;
				context.domNode.appendChild(iframe);
				
			};
		}
		
		// 删除按钮是否可见？
		if(this._isButtonVisible("delete")) {
			// 如果没有设置删除 URL，默认给一个URL
			if(!this.deleteURL) {
				this.deleteURL = unieap.WEB_APP_NAME + "/techcomp/ria/uploader!delete.action";
			}
			// 绑定删除按钮事件
			this._deleteButton.onClick = function(event) {
				// 获取删除URL
				var url = context.deleteURL;
				
				// 获取删除文件列表
				var selectionManager = context._grid.getManager('SelectionManager');
				var rows = selectionManager.getSelectedRows();
				
				if(rows.length == 0) {
					MessageBox.alert({
						title:"提示信息", 
						message:'请选择需要删除的文件'});
					return;
				}
				
				// 添加参数
				var fileNames = [];
				for(var i= 0; i < rows.length; i++) {
					
					if(rows[i].getData()["state"] == "error") continue;
					
					var name = rows[i].getData()["name"];
					fileNames.push(name);
				}
				
				var params = {name: fileNames};
				if(context.path) {
					params["path"] = context.path;
				}
				
				MessageBox.confirm({
					message: "是否删除选中文件？",
					onComplete: function(returnVal) {
						if(returnVal) {
							// 删除
							unieap.Action.requestData({
								url: url,
								parameters: params,
								timeout:10000,
								load: function(dc, xhr) {
									selectionManager.deleteSelectedRows();
									
									// 删除同名文件
									try {
										var gridRowSet = context._grid.getBinding().getDataStore().getRowSet();
										for(var i = 0; i < gridRowSet.getRowCount(); i++) {
											console.log("i: " + i);
											console.log("rowCount: " + gridRowSet.getRowCount());
											var filename = gridRowSet.getItemValue(i, "name");
											
											for(var j= 0; j < rows.length; j++) {
												var name = rows[j].getData()["name"];
												
												if(filename == name) {
													gridRowSet.deleteRow(i);
													
													// bug fix 重新遍历 Grid 的 RowSet
													i = -1;
													break;
												}
											}
										}
									} catch (e) {
										// TODO: handle exception
									}
									
									context._refreshUploadState();
									
									MessageBox.autoCloseAlert({
										durationTime:'2000',
										message: "删除文件成功!",
										type: "info"
									});
									
									context._fitGridHeight();
								},
								error: function(responseText, xhr) {
									MessageBox.alert(
											{title:"提示信息",message:'删除文件失败!'}
									);
								}
							});
						}
					},
					iconCloseComplete: true
				});
			};
		}
		
		this._grid.getManager("SelectionManager").onAfterAllSelect = function() {
			context._refreshUploadState();
		}
	},
	
	_refreshUploadState: function() {
		var rowSet = context._grid.getBinding().getDataStore().getRowSet()
		for(var i = 0; i < rowSet.getRowCount(); i++) {
			var id = rowSet.getRow(i).getData()["id"];
			var state = this._progress[id];
			if("complete" == state) {
				var backgroundDiv = getElementById(id + "_background");
				if(backgroundDiv) {
					dojo.style(backgroundDiv, {
						width: "100%"
					});
					var valueDiv = getElementById(id);
					if(dojo.isFF) {
						valueDiv.innerHTML = "上传完毕";
					} else {
						valueDiv.innerText = "上传完毕";
					}
				}
			} else if("error" == state) {
				var backgroundDiv = getElementById(id + "_background");
				if(backgroundDiv) {
					dojo.style(backgroundDiv, {
						width: "100%",
						backgroundColor: "red"
					});
					var valueDiv = getElementById(id);
					if(dojo.isFF) {
						valueDiv.innerHTML = "上传失败";
					} else {
						valueDiv.innerText = "上传失败";
					}
				}
			}
		}
	},
	
	_doseFileExist: function(file) {
		var gridDataStore = this._grid.getBinding().getDataStore();
		
		for(var i = 0; i < gridDataStore.getRowSet().getRowCount(); i++) {
			var name = gridDataStore.getRowSet().getItemValue(i, "name");
			var state = gridDataStore.getRowSet().getItemValue(i, "state");
			
			if(name == file.name && (!state || state == "complete")) {
				return true;
			}
		}
		
		return false;
	},
	
	_bindUploaderEvent: function() {
		if(this._uploader) {
			context = this;
			
			// 绑定添加上传文件事件
			this._uploader.bind('FilesAdded', function(up, files) {
				
				var repeatCount = 0; // 重复上传的文件名的数量
				
				plupload.each(files, function(file) {
					var data = {
						id: file.id, 
						name: file.name, 
						size: plupload.formatSize(file.size), 
//						user: unieap.userAccount, 
//						date: (new Date()).getTime(),
						path: context.path,
						percent: 0,
						state: "ready"
					};
					
					if(context._doseFileExist(file)) {
						repeatCount++;
						
						MessageBox.confirm({
							message: "是否重新上传" + file.name + "？",
							onComplete: function(returnVal) {
								if(returnVal) {
									context._grid.getBinding().insertRow(data);
									
									context._fitGridHeight();
								} else {
									context._uploader.removeFile(file);
								}
								
								repeatCount--;
								
								// 处理完全部重复上传文件
								if(repeatCount === 0) {
									context._refreshUploadState();
									
									if(context.onBeforeUpload(context._uploader, files)) {
										context._uploader.start();
									}
								}
							},
							iconCloseComplete:true
						});
					} else {
						context._grid.getBinding().insertRow(data);
						
						context._fitGridHeight();
					}
				});
				
				if(repeatCount === 0) {
					context._refreshUploadState();
					
					if(context.onBeforeUpload(context._uploader, files)) {
						context._uploader.start();
					}
				}
				
			});
			
			// 绑定上传进度事件
			this._uploader.bind('UploadProgress', function(up, file) {
				var id = file.id;
				
				var backgroundDiv = getElementById(id + "_background");
				if(backgroundDiv) {
					dojo.style(backgroundDiv, {
						width: file.percent + "%"
					});
					var valueDiv = getElementById(id);
					if(dojo.isFF) {
						valueDiv.innerHTML = "正在上传  " + file.percent + "%";
					} else {
						valueDiv.innerText = "正在上传  " + file.percent + "%";
					}
				}
				
				context.onUploadProgress(context._uploader, file, file.percent);
			});
			
			// 绑定上传完成事件
			this._uploader.bind('UploadComplete', function(up, files) {
				for(var i = 0; i < files.length;  i++) {
					var id = files[i].id;
					// 排除发生错误的情况
					if(context._progress[id] != "error") {
						var backgroundDiv = getElementById(id + "_background");
						if(backgroundDiv) {
							dojo.style(backgroundDiv, {
								width: "100%"
							});
							var valueDiv = getElementById(id);
							if(dojo.isFF) {
								valueDiv.innerHTML = "上传完毕";
							} else {
								valueDiv.innerText = "上传完毕";
							}
						}
						
						// 记录
						context._recordState(id, "complete");
					}
				}
				
				context.onUploadComplete(context._uploader, files);
			});
			
			// 绑定上传错误事件
			this._uploader.bind('Error', function(up, err) {
				var id = err.file.id;
				
				if(err.message == "File size error.") {
					MessageBox.alert({
						title: "提示信息",
						message: "上传文件大小超出" + plupload.formatSize(context._max_file_size) + "最大限制!"
					});
				} else if(id) {
					var backgroundDiv = getElementById(id + "_background");
					dojo.style(backgroundDiv, {
						width: "100%",
						backgroundColor: "red"
					});
					var valueDiv = getElementById(id);
					if(dojo.isFF) {
						valueDiv.innerHTML = "上传失败";
					} else {
						valueDiv.innerText = "上传失败";
					}
					
					// 记录
					context._recordState(id, "error");
				}
				
			});
		}
	},
	
	_recordState: function(id, state) {
		this._progress[id] = state;
		
		var gridStore = this._grid.getBinding().getDataStore();
		if (!gridStore) {
			return;
		}
		for(var i = 0; i < gridStore.getRowSet().getRowCount(); i++) {
			var propertyId = gridStore.getRowSet().getRow(i).getItemValue("id");
			if(id == propertyId) {
				gridStore.getRowSet().getRow(i).setItemValue("percent", 100);
				gridStore.getRowSet().getRow(i).setItemValue("state", state);
				break;
			}
		}
		!unieap.global.notResetUpdate&&gridStore.getRowSet().resetUpdate();
	},
	
	_initMaxFileSize: function() {
		var context = this;
		var url = unieap.WEB_APP_NAME + "/techcomp/ria/uploader!getFileMaxSize.action";
		
		unieap.Action.requestData({
			url: url,
			timeout:10000,
			load: function(dc, xhr) {
				var uploader = context._uploader;
				if(uploader) {
					try {
						context._max_file_size = dc;
						uploader.setOption("max_file_size", parseInt(dc));
					} catch (e) {}
				}
			},
			error: function(responseText, xhr) {
				//TODO
			}
		});
	},
	
	_initPathFiles: function() {
		var context = this;
		var url = unieap.WEB_APP_NAME + "/techcomp/ria/uploader!getPathFiles.action";
		
		var params = {};
		if(context.path) {
			params["path"] = context.path;
		}
		
		unieap.Action.requestData({
			url: url,
			timeout:10000,
			parameters: params,
			load: function(dc, xhr) {
				if(dc) {
					// 格式化大小
					if(typeof dc == "object" || typeof dc == "array") {
						for(var i = 0; i < dc.length; i++) {
							dc[i]["size"] = plupload.formatSize(dc[i]["size"]);
						}
					}
					
					var ds = new unieap.ds.DataStore(dc);
					context.setDataStore(ds);
				}
			},
			error: function(responseText, xhr) {
				//TODO
			}
		});
	},
	    
	_getURLParam: function(url, name) {
		var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)","i");
		var r = url.match(reg);
		if (r != null) return (r[2]); 
		return null;
	},
	
	_isButtonVisible: function(btn) {
		if(this.displayButtons && btn) {
			for(var i = 0; i < this.displayButtons.length; i++) {
				var item = this.displayButtons[i];
				
				if(item["type"] == btn) {
					return (item["visible"] == "false" ? false : true);
				}
			}
		}
		
		// 默认可见
		return true;
	}
	
});