dojo.provide("unieapx.widget.Workspace");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieapx.widget.Layout");
dojo.require("unieapx.widget.WorkspacePopup");
dojo.require("unieap.dialog.MessageBox");
dojo.require("unieap.dialog.Dialog");
dojo.require("dojo.dnd.Source")
dojo.require("unieapx.widget.WorkspaceAddWidget");
dojo.declare("unieapx.widget.Workspace",[dijit._Widget, dijit._Templated],{
	
	templateString:
		"<div class=\"workspaceContainer\">"+
			"<div class=\"workspaceTitle\" dojoAttachPoint=\"workspaceTitleNode\">"+
				"<div class=\"workspaceTitlePathArea\" dojoAttachPoint=\"workspacePathArea\"></div>"+
				"<div class=\"workspaceTitleIconArea\" dojoAttachPoint=\"workspaceIconArea\">"+
					"<div dojoAttachPoint=\"showLayoutNode\" class=\"workspaceIcon workspaceIconLayout\" ></div>"+
					"<div dojoAttachPoint=\"addWidget\" class=\"workspaceIcon workspaceIconAddWidget\" ></div>"+
					"<div dojoAttachPoint=\"recoverNode\" class=\"workspaceIcon workspaceIconRecover\"></div>"+
					//"<div dojoAttachPoint=\"saveNode\" class=\"workspaceIcon workspaceIconSaveAs\"></div>"+
					"<div dojoAttachPoint=\"refreshNode\" class=\"workspaceIcon workspaceIconRefresh\" ></div>"+
					"<div dojoAttachPoint=\"containerNode\" class=\"customerArea\"></div>"+
				"</div>"+
			"</div>"+
			"<div class=\"workspaceContent\" dojoAttachPoint=\"workspaceContent\">"+
				"<div  class=\"workspaceLayout\" dojoAttachPoint=\"workspaceLayout\"></div>"+
			"</div>"+
			"<div style=\"clear:both\"></div>"+
		"</div>",
					
	/**
	 * 页面要展现的数据
	*/
	_workSpaceData:null,
	
	popup:null,//对弹出选择布局的引用
	
	//页面初始化时的数据，要保存的时候，需要将新数据与此数据进行对比，以确定数据是否发生过修改
	_oldWorkSpaceData : null,
	
	// modify by lugj 之前选中的layoutId
	_oldLayoutId : null,
	
	/**
	 * 要展现页面的唯一标识，要根据此标识获取后台数据
	 */
	workspaceId:"page2",
	/**
	 * 没空白
	 */
	nospace : false,
	/**
	 * 没边框
	 */
	noborder : false,
	
	/**
	 * 可添加那些组件的widget，默认显示所有组件的
	 */
	components:"",
	
	defaultTitle:{
			"refresh":unieap.getText("workspace.refresh"),
			"restore":unieap.getText("workspace.restore"),
			"addWidget":unieap.getText("workspace.addWidget"),
			"switchLayout":unieap.getText("workspace.switchLayout")
	},
	
	
	//选择布局界面上，各个表格的id前缀
	_chooseTablePrefix:"chooseTable",
	
	//支持的所有布局，在第一次选择布局时，通过请求后台得到数据
	layouts:null,
	
	//已有的所有widget数组，用于进行展现，只包含基本信息，用于进行树的展现
	widgets:null,
	
	//已有的所有widget分类
	widgetsCategory:null,
	
	//添加widget的区域是否处于显示的状态
	_addWidgetIsShow:false,
	
	//选择布局的弹出区域是否处于显示状态
	_chooseLayoutIsShow:false,
	
	//对页面中acap.widget.Layout对象的引用
	_layoutRef:null,
	
	//layouts的数据是否已经初始化
	_layoutInit:false,
	
	_dragManager:null,
	
	//添加widget区域当前的样式
	initAddWidgetStyle:"tree",
	
	showAddWidget:true,
	
	showChooseLayout:true,
	
	showUndo:true,
	
	showRefresh:true,
	
	//showSave:true,
	
	_addWidgetArea:null,
	
	showToolbar:true,
	
	postCreate:function(){
		if(this.nospace){
			dojo.addClass(this.domNode,"nospace");
		}
		if(this.noborder){
			dojo.addClass(this.domNode,"noborder");
		}
		
		//通过ajax请求得到该workspaceId的数据和布局信息
		this.connect(this.workspaceIconArea,'onclick','_iconAreaClick');
		this.connect(dojo.body(),'onclick','_hidePanel');//在body上点击时会将弹出的选择区域隐藏
		dojo.addOnUnload(dojo.hitch(this,this._save));//离开界面时自动保存
		//用于显示选择布局的弹出框，进行初始化
		this.popup = new unieapx.widget.WorkspacePopup({'targetDomNode':this.showLayoutNode,height:"auto",width:"auto"});
		this._addWidgetArea = new unieapx.widget.WorkspaceAddWidget();
		this._addWidgetArea.workspace = this;
		this._addWidgetArea._initStyle = this.initAddWidgetStyle;
		this._addWidgetArea.placeAt(this.workspaceContent,"first");
		
		//请求页面对应的数据，并进行渲染
		if(this.showToolbar){
			if(!this.showAddWidget){
				dojo.destroy(this.addWidget);
			}else{
				dojo.attr(this.addWidget,"title",this.defaultTitle['addWidget']);
			}
			
			if(!this.showChooseLayout){
				dojo.destroy(this.showLayoutNode);
			}else{
				dojo.attr(this.showLayoutNode,"title",this.defaultTitle['switchLayout']);
			}
			
			if(!this.showUndo){
				dojo.destroy(this.recoverNode);
			}else{
				dojo.attr(this.recoverNode,"title",this.defaultTitle['restore']);
			}
			
			if(!this.showRefresh){
				dojo.destroy(this.refreshNode); 
			}else{
				dojo.attr(this.refreshNode,"title",this.defaultTitle['refresh']);
			}
			
//			if(!this.showSave){
//				dojo.destroy(this.saveNode);
//			}
		}else{
			dojo.style(this.workspaceTitleNode,"display","none");
			
		}

		var content = this.getPathContent();
		if(content){
			dojo.place(content,this.workspacePathArea,"first");
		}
		
		unieap.widget.requestData({
			url:unieap.widget.url.GETWORKSPACE,
			parameters:{workspaceId:this.workspaceId},
            load: dojo.hitch(this,function(result){
				if(!this.domNode || !this.domNode.offsetWidth){
            		return;
            	}
            	//根据workspaceId调用后台，获取页面的数据
                if(result&&!result.failure&&!result.none){
                	this._workSpaceData = result;
        	    	this._oldWorkSpaceData = dojo.toJson(this._workSpaceData[unieap.workspace.id]);
        	    	this._layoutRef = new unieapx.widget.Layout();
        	    	this._dragManager = this._layoutRef.dragManager;
        	    	this._layoutRef.placeAt(this.workspaceLayout);
        	    	this._layoutRef.setStructure(this._workSpaceData);
        	    	if(!this.showToolbar){
        	    		dojo.style(this._layoutRef.layoutContainerDiv,"paddingTop","0px")
        	    	}
        	    	this.resize();
                }else if(result.none){
                	alert("您无权限请求该页面！");
                }else{
                	alert("请求数据出错！");
                }
			})
		},false)
		
//		dojo.xhrGet({
//            url :  unieap.getContextPath()+"/widgetAction!getWorkspace.action?workspaceId="+this.workspaceId,
//            headers : {ajax : true},
//            preventCache : true,
//            load: dojo.hitch(this,function(response){
//            	if(response.endWith("to_exception_page")){
//            		window.location.href="error.jsp";
//            	}else{
//            		//根据workspaceId调用后台，获取页面的数据
//                	var result = dojo.fromJson(response);
//                	if(result&&!result.failure){
//                		this._workSpaceData = result;
//        	    		this._oldWorkSpaceData = dojo.toJson(this._workSpaceData[unieap.workspace.id]);
//        	    		this._layoutRef = new unieap.widget.Layout();
//        	    		this._dragManager = this._layoutRef.dragManager;
//        	    		this._layoutRef.placeAt(this.workspaceLayout);
//        	    		this._layoutRef.setStructure(this._workSpaceData);
//        	    		if(!this.showToolbar){
//        	    			dojo.style(this._layoutRef.layoutContainerDiv,"paddingTop","0px")
//        	    		}
//        	    		this.resize();
//                	}else{
//                		alert("请求数据出错！");
//                	}
//            	}
//			})
//		});
		this.subscribe("widget-before-max",function(){
			dojo.style(this.domNode,"visibility","hidden");
		});
		this.subscribe("widget-before-normal",function(){
			dojo.style(this.domNode,"visibility","visible");
		});
		this.subscribe("widget-before-min",function(){
			dojo.style(this.domNode,"visibility","visible");
		});
		
		this.subscribe("widget-closed",function(){
			dojo.style(this.domNode,"visibility","visible");
		});
		
		if(this.showToolbar){
			//dojo.style(this.workspaceContent,"height",(dojo.coords(this.domNode).h-28)+"px");
		}else{
			dojo.style(this.workspaceContent,"height","100%");
		}
		
		this.connect(dojo.global,"resize","resize");
		if(top.dojo){
			top.dojo.publish("workspaceActive",[this]);
		}
	},
	
	
	
	resize:function(){
		if(this.showToolbar){
			//add by lugj 增加判断，避免偶尔报参数无效的错误
			dojo.style(this.workspaceContent,"height",dojo.coords(this.domNode).h > 23 ? (dojo.coords(this.domNode).h-23)+"px" : "0px");
		}else{
			dojo.style(this.workspaceContent,"height","100%");
		}
		var ch = dojo.contentBox(this.workspaceContent).h;
		this._layoutRef&&this._layoutRef.resize(ch,this.showToolbar);
	},

	_iconAreaClick:function(evt){
		var elem = evt.target;
		if(elem==this.showLayoutNode){
			this._showChooseLayoutPanel(evt);
		}else if(elem==this.addWidget){
			this._addWidgetClick(evt);
		}else if(elem==this.recoverNode){
			this._recover(evt);
		}else if(elem==this.refreshNode){
			this.refresh();
			dojo.stopEvent(evt);
		}
//		else if(elem==this.saveNode){
//			this._saveAs();
//		}
	},
	
	
	//点击添加widget按钮时的响应事件
	_addWidgetClick:function(evt){
//		this._addWidgetArea.handleClick(this._addWidgetIsShow);
		this._addWidgetArea.handleClick();
		dojo.stopEvent(evt);
	},
	
	/**
	 * 选择一个布局后触发的事件
	 * @param evt
	 */
	_onSelectLayout:function(evt){
		var elem = evt.target;

		var id = elem.id;
		var index = id.substring(this._chooseTablePrefix.length);//选中布局的唯一标识
		
		var currentWorkSpace = this._workSpaceData[unieap.workspace.id];
		var currentLayoutIndex = currentWorkSpace[unieap.workspace.layoutId];
		
		if(index == currentLayoutIndex){
			return ;
		}
		
		var targetLayout = this.layouts[index];//得到布局对象
		var table = targetLayout.table;
		var cellCount=0;//用来计算新布局的单元格数量
		for(var i=0,l=table.length;i<l;i++){
			cellCount+=table[i].length;
		}
		var cells = new Array(cellCount);//新建
		var workspace = this._workSpaceData[unieap.workspace.id];
		var initCell = workspace[unieap.workspace.cells];
		var initCount = initCell.length;
		if(cellCount>=initCount){//新的单元格数大于等于现在的单元格数
			//处理逻辑是新增出来的单元格为空
			for(var i=0,l=initCount;i<l;i++){
				cells[i] = initCell[i];//单元格相同的进行复制
			}
			for(var i=initCount,l=cellCount;i<l;i++){
				cells[i] = [];//多出来的单元格为空了
			}
			
		}else{//新的单元格数小于现在的单元格数
			//处理逻辑是将要删除单元格的数据全部移到最后一个单元格中
			for(var i=0,l=cellCount;i<l;i++){
				cells[i] = initCell[i];//单元格相同的进行复制
			}
			for(var i=cellCount,l=initCount;i<l;i++){//将剩余单元格里面的widget全部放到最后一个单元格中
				for(j=0,cl=initCell[i].length;j<cl;j++)
					cells[cellCount-1].push(initCell[i][j]);//
			}
		}
		workspace[unieap.workspace.cells] = cells;
		workspace[unieap.workspace.layoutId] = index;
		var _layouts = this._workSpaceData[unieap.layouts.id] = {};//处理全局数据的layouts节点
		var current = _layouts[index] = {};
		current[unieap.layouts.ration] = targetLayout.ration;
		current[unieap.layouts.table] = targetLayout.table;
		this._layoutRef.setStructure(this._workSpaceData);
	},
	
	/**
	 * 点击选择布局按钮时，要显示出选择布局的容器或将已弹出的区域隐藏
	 */
	_showChooseLayoutPanel:function(evt){
		// modify by lugj
		var currentLayoutId = this._workSpaceData.workspace.layoutId;
		if(this._chooseLayoutIsShow==false){
			//此时选择布局的弹出部分没有显示，要显示选择布局界面
			if(this._addWidgetIsShow){
				//如果添加widget的区域正在显示，现将其隐藏
				this._addWidgetArea._hideAddWidgetPane();
			}
			if(this._layoutInit==false){
				// modify by lugj
				var arr = dojo.query(".workspaceChooseLayoutArea",dojo.body());
				if(arr && arr.length > 0){
					arr[0].parentNode.removeChild(arr[0]);
				}
				//如果layouts对象尚没有初始化，调用后台数据初始化
//				dojo.xhrGet({
//		            url :  unieap.getContextPath()+"/widgetAction!getLayouts.action",
//		            headers : {ajax : true},
//		            preventCache : true,
//		            sync:true,
//		            load: dojo.hitch(this,function(response){ 
//			    		//根据workspaceId调用后台，获取页面的数据
//		            	this.layouts = dojo.fromJson(response);
//					}),
//					error:function(e){
//						alert("请求后台数据出错")
//					}
//				});
				
				
				unieap.widget.requestData({
					url:unieap.widget.url.GETLAYOUTS,
					sync:true,
					load: dojo.hitch(this,function(response){ 
				    		//根据workspaceId调用后台，获取页面的数据
			            this.layouts = response;
			            if(this.layouts == ""){
			            	MessageBox.alert({title:'确认框',message:'未查询到任何布局信息，请检查数据库中布局表数据。'});
			            	return;
			            }
						var container = dojo.create("div",{'class':'workspaceChooseLayoutArea'},dojo.body(),"last");
						for(var elem in this.layouts){						
//							var table = dojo.create("table",{'class':'chooseLayoutTable',id:this._chooseTablePrefix+elem,cellPadding:0,cellSpacing:0},container,"last");
//							dojo.connect(table,'click',this,this._onSelectLayout);
//							var colgroup = dojo.create("colgroup",{},table,"first");
//							var tbody = dojo.create("tbody",{},table,"last");
//							var rationArray = 	this.layouts[elem].ration.split(",");			
//							dojo.forEach(rationArray,function(item,index){
//								colgroup.appendChild(dojo.create('col',{width:item}));
//							},this);
//							//生成表格中的单元格(td)
//							var fragment=document.createDocumentFragment(),
//								tdIndex=0;
//							dojo.forEach(this.layouts[elem].table,function(rowMetadata,rowIndex){
//								var tr=dojo.create('tr');
//								dojo.forEach(rowMetadata,function(colMetadata,colIndex){
//									var td=dojo.create('td',{'class':'chooseLayoutTD'},tr);
//									colMetadata.rs&&colMetadata.rs>1&&td.setAttribute('rowspan',colMetadata.rs,0);
//									colMetadata.cs&&colMetadata.cs>1&&td.setAttribute('colspan',colMetadata.cs,0);
//									tdIndex++;
//								});
//								fragment.appendChild(tr);
//							},this);
//							tbody.appendChild(fragment);
							
							var icon = this.layouts[elem].icon;
							var description = this.layouts[elem].description;
							if(!description){
								description = "";
							}
							var layoutelem = dojo.create("div",{title:description,'class':'layoutElement',id:this._chooseTablePrefix+elem,cellPadding:0,cellSpacing:0},
									container,"last");
							// modify by lugj
							if(elem == this._workSpaceData.workspace.layoutId){
								dojo.removeClass(layoutelem, "layoutElement");
								dojo.addClass(layoutelem, "chooseLayoutElement");
								this._oldLayoutId = elem;
						    }
							dojo.connect(layoutelem,'click',this,this._onSelectLayout);
							if(icon){
								dojo.style(layoutelem,"background","url("+unieap.getContextPath()+icon+") no-repeat");
							}else{
								dojo.style(layoutelem,"background","url("+unieap.getContextPath()+"/components/widget/resource/images/layouts/fixed.png) no-repeat");
								
							}
						}
						this.popup.appendNode(container);
						this._layoutInit = true;
						this.popup.open();
						this._chooseLayoutIsShow = true;
						dojo.stopEvent(evt);
					}),
					error:function(e){
						alert("请求后台数据出错")
					}
				});	
			}else{
				// modify by lugj
				if(currentLayoutId != this._oldLayoutId){
					if(this._oldLayoutId){
						var oldElem = this._chooseTablePrefix+this._oldLayoutId;
						dojo.removeClass(oldElem, "chooseLayoutElement");
						dojo.addClass(oldElem, "layoutElement");
					}
					var newElem = this._chooseTablePrefix+currentLayoutId;
					dojo.removeClass(newElem, "layoutElement");
					dojo.addClass(newElem, "chooseLayoutElement");
					this._oldLayoutId = currentLayoutId;
				}
				this.popup.open();
				this._chooseLayoutIsShow = true;
				dojo.stopEvent(evt);
			}
		}else{
			//处于显示状态再次点击将会把选择布局的界面隐藏
			this.popup.close();
			this._chooseLayoutIsShow = false;
			dojo.stopEvent(evt);
		}
	},
	
	
	_hidePanel:function(){
		//隐藏选择布局的弹出框
		if(this._chooseLayoutIsShow){
			this.popup.close();
			this._chooseLayoutIsShow = false;
		}
	},
	
	/**
	 * 要保存当前的workspace
	 */
	save:function(value){
		value = value.replace("undefined,","");
		value = value.replace("undefined","");
		
		unieap.widget.requestData({
			url:unieap.widget.url.SAVEWORKSPACE,
			parameters:{workspaceId:this.workspaceId},
			headers : {ajax : true},
			sync:true,
	        preventCache : true,
	        content:{workspaceJson:value},
			load : function(text, args){
	        	MessageBox.autoCloseAlert({title:'确认框', message:'保存成功。'});
			}
		});	
		
//		dojo.xhrPost({
//            url :  unieap.getContextPath()+"/widgetAction!saveWorkspace.action?workspaceId="+this.workspaceId,
//            headers : {ajax : true},
//            content:{workspaceJson:value},
//            sync:true,
//            preventCache : true,
//            load: dojo.hitch(this,function(response){ 
//			})
//		});
		
		
	},
	
	_save:function(){
		if(!this._workSpaceData ||!this._workSpaceData[unieap.workspace.id]){
			return;
		}
		var newWorkspaceData = dojo.toJson(this._workSpaceData[unieap.workspace.id]);
		if(newWorkspaceData!=this._oldWorkSpaceData){
			this.save(newWorkspaceData);//要保存页面的数据
		}
	},
	
	
//	_saveAs:function(value){
//		var newWorkspaceData = dojo.toJson(this._workSpaceData[unieap.workspace.id]);
//		newWorkspaceData = newWorkspaceData.replace("undefined,","");
//		newWorkspaceData = newWorkspaceData.replace("undefined","");
//		dojo.xhrPost({
//            url :  unieap.getContextPath()+"/widgetAction!saveAsWorkspace.action",
//            headers : {ajax : true},
//            content:{workspaceJson:newWorkspaceData},
//            sync:true,
//            preventCache : true,
//            load: dojo.hitch(this,function(response){ 
//            	this.onAfterSaveAs(response);
//			})
//		});
//	},
//	
//	onAfterSaveAs:function(response){
//		
//	},
	
	_recover:function(evt){
		var workspace = dojo.fromJson(this._oldWorkSpaceData);
		this._workSpaceData[unieap.workspace.id] = workspace;
		if(this._layoutInit){
			//如果layout的数据还没有初始化，用户肯定没有更改布局，所以不管
			//找到原来对应的layout
			var oldLayoutId = workspace[unieap.workspace.layoutId];
			var oldLayout = this.layouts[oldLayoutId];
			
			var _layouts = this._workSpaceData[unieap.layouts.id] = {};//处理全局数据的layouts节点
			var current = _layouts[oldLayoutId] = {};
			current[unieap.layouts.ration] = oldLayout.ration;
			current[unieap.layouts.table] = oldLayout.table;
		}
		
		this._layoutRef.resumeLayout(this._workSpaceData);
		this.resize();
		dojo.stopEvent(evt);
	},
	
	/*
	 * 指定导航区域的显示内容，返回的值为一段HTML的字符串
	 */
	getPathContent:function(){

	},
	
	/*
	 * 指定导航区域的显示内容，返回的值为一段HTML的字符串
	 */
	setPathContent:function(content){
		this.workspacePathArea.innerHTML = "";
		dojo.place(content,this.workspacePathArea,"first");
	},
	
	refresh:function(){
		this._layoutRef.refresh();
	},
	
	//得到所有widget组成的数组
	getWidgets:function(){
		var result = [];
		if(this._layoutRef){
			 dojo.query(">tr>td>[widgetId]",this._layoutRef.tbodyNode).map(dijit.byNode).forEach(function(widget){
				 result.push(widget);
			 });
		}
		return result;
	},
	
	setShowToolbar:function(result){
		if(this.showToolbar==result){
			return ;
		}
		this.showToolbar = result;
		if(result == true){
			dojo.style(this.workspaceTitleNode,"display","block");
			//要显示标题栏，并且初始不显示
			if(this.addWidget){
				if(!this.showAddWidget){
					dojo.destroy(this.addWidget);
				}else{
					dojo.attr(this.addWidget,"title",this.defaultTitle['addWidget']);
				}
			}
			if(this.showLayoutNode){
				if(!this.showChooseLayout){
					dojo.destroy(this.showLayoutNode);
				}else{
					dojo.attr(this.showLayoutNode,"title",this.defaultTitle['switchLayout']);
				}
			}
			
			if(this.recoverNode){
				if(!this.showUndo){
					dojo.destroy(this.recoverNode);
				}else{
					dojo.attr(this.recoverNode,"title",this.defaultTitle['restore']);
				}
			}
			if(this.showRefresh){
				if(!this.showRefresh){
					dojo.destroy(this.refreshNode); 
				}else{
					dojo.attr(this.refreshNode,"title",this.defaultTitle['refresh']);
				}
			}
		}else{
			//要隐藏标题栏，并且初始是显示的
			dojo.style(this.workspaceTitleNode,"display","none");
		}
		this.resize();
	}
	
	
	
})