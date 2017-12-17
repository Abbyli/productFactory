dojo.provide("unieapx.widget.Layout");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieapx.widget.Widget");
dojo.require("unieapx.widget.drag.AreaManager");
dojo.require("unieapx.widget.drag.DropIndicator");
//dojo.require("unieap.widget.drag.VerticalDropMode");
dojo.require("unieapx.widget.drag.OverDropMode");
dojo.require("unieapx.widget.drag.AutoScroll");
dojo.declare("unieapx.widget.Layout",[dijit._Widget,dijit._Templated],{
	
	templateString:
		"<div class='layoutContainer'>"+
			"<div class='layoutContainerDiv' dojoAttachPoint='layoutContainerDiv'>"+
			"</div>"+
		"</div>",	
	
	//引用数据结构中workspace下的cells
	cells:null,
	
	originCells:'',
	
	disabled:true,
	
	
	
	//保存单元格内widget控件的唯一标识
	widgetIdMap:null,
	
	dragHandleClass:'widgetPaneTitle',
		
	postCreate:function(){
		this.inherited(arguments);
		this.subscribeHandler=[];
		this.widgetIdMap={};
		//注册widget事件
		this._subscribeWidget();
		//注册拖拽事件
		this._subscribeDnd();
		
	},	
	
	_subscribeWidget:function(){
		//监听widget事件
		this.subscribeHandler.push(this.subscribe("widget-closed",this._destorySelectedWidget));
		//widget控件要最大化前触发
		this.subscribeHandler.push(this.subscribe("widget-before-max",function(widget){
			this.disableDnd();
			dojo.style(this.domNode,'visibility','hidden');
			dojo.style(widget.domNode,'visibility','visible');
			
		}));
		//widget控件从最大化变为最小化时触发
		this.subscribeHandler.push(this.subscribe("widget-before-min",function(widget){
			this.enableDnd();
			dojo.style(this.domNode,'visibility','');
			dojo.style(widget.domNode,'visibility','');
		}));
		//widget控件从最大化变为最小化时触发
		this.subscribeHandler.push(this.subscribe("widget-before-normal",function(widget){
			this.enableDnd();
			dojo.style(this.domNode,'visibility','');
			dojo.style(widget.domNode,'visibility','');
		}));
		
		//widget控件动画结束后需要重新计算高度
		this.subscribeHandler.push(this.subscribe("widget-after-max",this._resizeWidgetAfterFX));
		this.subscribeHandler.push(this.subscribe("widget-after-min",this._resizeWidgetAfterFX));
		this.subscribeHandler.push(this.subscribe("widget-after-normal",this._resizeWidgetAfterFX));
		
		//widget控件自定义属性发生变化时触发
		this.subscribeHandler.push(this.subscribe("widget-individual-changed",this._updateWidgetIndividual));
		
		//传入widgetId,并动态生成widget控件
		this.subscribeHandler.push(this.subscribe("layout-dragdrop-addwidget",this._addWidgetDynamically));
	},
	
	
	_subscribeDnd:function(){
		this.subscribeHandler.push(this.subscribe("layout-drag-start", "_resizeWidgetAfterDragStart"));
		this.subscribeHandler.push(this.subscribe("layout-drag-drop", "_resizeWidgetAfterDrop"));
		this.dragManager = unieapx.widget.drag.areaManager();
		this.dragManager.dragHandleClass=this.dragHandleClass;
	},

	setStructure:function(structure){
		if(!dojo.isObject(structure)) return;
		
		//重新设置table布局
		this._resetLayout();
		
		//layouts=structure["layouts"]
		//widgets=structure["widgets"]
		//workspace=structure["workspace"]
		//layout=layouts[workspace["layoutId"]]
		var layouts=structure[unieap.layouts.id],
			widgetsInfo=structure[unieap.widgets.id],
			workspace=structure[unieap.workspace.id];
		
		this.widgetsInfo=widgetsInfo;
			
		//layout={someLayoutId:{ration:'',table:[]}}
		//cells=[[{widgetId:'',individual:{}}]]
		var layout=layouts[workspace[unieap.workspace.layoutId]],
			cells=workspace[unieap.workspace.cells];
		//创建布局
		if(layout){
			this._createLayout(layout);
		}
		//如果this.cells存在说明是重新调整了布局
		if(this.cells){
			this._adjustWidgets(this.cells,cells);
		}else{
			//将widget控件插入layout中
			this._insertWidget(cells,widgetsInfo);
		}
		this.cells=cells;
		this.originCells=dojo.toJson(this.cells);
		this.startup();
		
	},
	
	
	/**
	 * 恢复到初始布局
	 * @param {Object} structure
	 */
	resumeLayout:function(structure){
		if(!dojo.isObject(structure)||!this.cells) return;
		this.cells=null;
		this._destroyElement();
		this.setStructure(structure);
	},
	
	//传入widget获得widget的索引号
	getIndexByWidget:function(widget){
		var widget=widget.declaredClass?widget:dijit.byNode(widget),
			widgetNode=widget&&widget.domNode;
		if(widgetNode){
			return dojo.attr(widgetNode.parentNode,'index');
		}
		return -1;
	},
	
	//重置Layout布局
	_resetLayout:function(){
		//清除拖拽
		this.disableDnd();
		if(this.tbodyNode){
			!this._div&&(this._div=dojo.create('div',{style:'display:none'},dojo.body()));
			var div=this._div;
			dojo.query(">tr>td>div[widgetId]",this.tbodyNode).forEach(function(widgetNode){
				div.appendChild(widgetNode);
			},this);
		}
		
		this.layoutContainerDiv.innerHTML = "";
		this.colgroupNode = null;
		this.tbodyNode = null;
		
		var tabelNode = dojo.create("table",{cellspacing:0,cellpadding:0,"class":"layoutTable"},this.layoutContainerDiv);
		this.colgroupNode = dojo.create("colgroup",null,tabelNode);
		this.tbodyNode = dojo.create("tbody",null,tabelNode);
	},
	
	
//	/*
//	 *	当layout中有 autoHeight属性时，页面支持自适应布局。
//	 *	目前对autoHeight的值没有做任何限制。
//	 */
//	_setAutoHeight:function(autoHeight){
//		this.autoHeight = autoHeight;
//	},
	
	//计算高度	高度自适应,由workspace的变化触发
	resize:function(totalHeight,showToolbar){
		if(totalHeight){
			this.totalHeight = totalHeight;
		}else{
			totalHeight = this.totalHeight;
		}
		// modify by lugj  
		if(showToolbar){
			this.totalHeight = this.totalHeight - 2;//layoutContainerDiv 这个div 有 padding
		}else{
			this.totalHeight = this.totalHeight;//layoutContainerDiv 这个div 有 padding
		}
		
		var newHeight = this.totalHeight;
		if(!newHeight){
			return;
		}
//		if(this.autoHeight){
			var tboyNode=this.tbodyNode,
			self=this;
			dojo.query(">tr>td",tboyNode).forEach(function(td,index){
				self._resizeTD(index,newHeight);
			});
//		}else{
//			return;
//		}
	},
	
	//动画后的重新计算高度
	_resizeWidgetAfterFX:function(widget){
		var index = this.getIndexByWidget(widget);
		this._resizeTD(index);
	},
	
	//增加 删除  移动 widget后触发 当前 td内的widget布局
	_resizeTD:function(index,totalHeight){
		var newHeight = totalHeight||this.totalHeight,
			self=this;
		var widgetsArray = self.widgetIdMap[index];
		var widgets = dojo.map(widgetsArray,dijit.byId);
		var _height = parseInt(newHeight),
			leftHeight = _height,
			autoHeightWidgets = [],
			autoHeights = 0;
		dojo.forEach(widgets,function(widget){
			if(!widget)return;
			if(widget.height.indexOf("%")>0 && widget.getState()=="normal"){
				//百分比高度  Widget 处于正常状态
					autoHeightWidgets.push(widget);
					autoHeights+=parseInt(widget.height);
			}
			else{
				leftHeight = leftHeight - widget.getHeight();
			}
			unieap.fireContainerResize(widget.containerNode);
		});
		if(leftHeight<=0) return;
		dojo.forEach(autoHeightWidgets,function(widget){
			var h = parseInt(widget.height);
			var nh =  Math.floor(leftHeight*h/autoHeights);
			widget.setHeight(nh);
		});
	},
	
	//创建布局
	_createLayout:function(layout){
		//设置表格中列的宽度
		//	ration=layout["ration"]
		//	table=layout["table"]
		var ration=layout[unieap.layouts.ration],
			table=layout[unieap.layouts.table];
		
//		autoHeight = layout[unieap.layouts.autoHeight];
//		this._setAutoHeight(autoHeight);
		
		dojo.forEach(ration.split(","),function(item,index){
			this.colgroupNode.appendChild(dojo.create('col',{width:item}));
		},this);
		
		//生成表格中的单元格(td)
		var fragment=document.createDocumentFragment(),
			tdIndex=0;
		dojo.forEach(table,function(rowMetadata,rowIndex){
			var tr=dojo.create('tr');
			dojo.forEach(rowMetadata,function(colMetadata){
				var td=dojo.create('td',{index:tdIndex++,'class': 'td-height'},tr);
				//dojo.attr给td设置colspan和rowspan，在IE<8下存在问题,setAttribute的第三个参数表示不区分大小写
				colMetadata.rs&&colMetadata.rs>1&&td.setAttribute('rowspan',colMetadata.rs,0);
				colMetadata.cs&&colMetadata.cs>1&&td.setAttribute('colspan',colMetadata.cs,0);
			});
			fragment.appendChild(tr);
		},this);
		this.tbodyNode.appendChild(fragment);
	},
	
	_addWidgetDynamically:function(widgetId,targetArea,widgetIndex){
		if(widgetIndex==-1) return;
		var widgetInfo;
		if(!this.widgetsInfo[widgetId]){
			widgetInfo=unieap.getWidgetInfoById(widgetId,true);
			this.widgetsInfo[widgetId]=widgetInfo;
		}else{
			widgetInfo=this.widgetsInfo[widgetId];
		}
		widgetInfo.wid = widgetId;
		delete widgetInfo.id;
		var widget=new unieapx.widget.Widget(widgetInfo),
			area,cellIndex=0;
		cellIndex=dojo.attr(targetArea.node,"index");
		dojo.query(">tr>td[index="+cellIndex+"]",this.tbodyNode).forEach(function(td){
			var node=td.childNodes[widgetIndex];
			area=td;
			node?dojo.place(widget.domNode,td.childNodes[widgetIndex],'before'):widget.placeAt(td);
			widget.startup();
		});
		var array=this.widgetIdMap[cellIndex];
		if(!array){
			this.widgetIdMap[cellIndex]=[];
		}else{
			this.widgetIdMap[cellIndex]=unieap.append(array,widgetIndex,widget.id);
		}
		var cell=this.cells[cellIndex];
		this.cells[cellIndex]=unieap.append(cell,widgetIndex,{widgetId:widgetId});
		this._resizeTD(cellIndex);
		//给新添加的widget增加拖拽功能，如果这个widget没有拖拽约束的话
		if(!widget.dragRestriction){
			this.dragManager.addDragItem(area,widget.domNode,widgetIndex,true);
		}
	},
	
	//插入widget控件
	_insertWidget:function(cells,widgetsInfo){
		var tboyNode=this.tbodyNode,
			self=this;
		dojo.query(">tr>td",tboyNode).forEach(function(td,index){
			var cell=cells[index];
			//property的结构为{widgetId:'',individual:{}}
			self.widgetIdMap[index]=[]
			dojo.forEach(cell,function(property){
				var widgetId=property[unieap.workspace.widgetId],
					individual=property[unieap.workspace.individual]||{},
					params=dojo.mixin({},widgetsInfo[widgetId],{"individual":individual});
					
				params.wid = widgetId;
				delete params.id;
				
				var widget=new unieapx.widget.Widget(params);
				widget.placeAt(td);
				self.widgetIdMap[index].push(widget.id);
			});
		});
		
	},
	
	//调整widgets的位置
	_adjustWidgets:function(oldCells,newCells){
		var oldCellsLen=oldCells.length,
			newCellsLen=newCells.length;
		var nodes=dojo.query(">tr>td",this.tbodyNode),
			map=this.widgetIdMap,
			newWidgetIdMap={};
		//调整widgets的位置
		//如果旧单元格的个数少于新的单元格的个数，将旧单元格填充到新单元格即可
		//如果旧单元格的个数多余新的单元格的个数，将旧单元格中前N-1个(N为新单元格的个数)单元格填充到新单元格中，剩下的单元格填充到新单元格的最后一格
		if(oldCellsLen<=newCellsLen){
			nodes.forEach(function(td,index){
				var ids=map[index];
				if(ids){
					newWidgetIdMap[index]=ids;
					dojo.forEach(ids,function(id){
						td.appendChild(dojo.byId(id));
					});
				}else{
					newWidgetIdMap[index]=[];
				}
			});
		}else{
			nodes.forEach(function(td,index){
				if(index!=newCellsLen-1){
					var ids=map[index];
					delete map[index];
					newWidgetIdMap[index]=ids;
					dojo.forEach(ids,function(id){
						td.appendChild(dojo.byId(id));
					});
				}else{
					var ids=[]
					for(var key in map){
						ids=ids.concat(map[key]);
					}
					newWidgetIdMap[index]=ids;
					dojo.forEach(ids,function(id){
						td.appendChild(dojo.byId(id));
					});
				}
			});

		}
		this.widgetIdMap=newWidgetIdMap;
	},
	
	//发布widget位置发生了变化的事件
	_publishEvents:function(){
//		console.debug(dojo.toJson(this.cells));
//		console.debug(this.originCells);
		if(dojo.toJson(this.cells) != this.originCells){
			dojo.publish("layout-widget-changed",[this]);
		}
	},
	
	//拖拽开始时触发
	 _resizeWidgetAfterDragStart:function(/*Node*/node, /*Object*/sourceArea, /*Integer*/indexChild){
		if(this.diabled){
			return false;
		}
		var sourceNode=sourceArea.node,
			widget=dijit.byNode(node);
		if(dijit.getEnclosingWidget(sourceNode) == this){
			this._spliceNode(sourceNode,indexChild);
			//更新保存widget id的内存结构
			var tdIndex=dojo.attr(sourceNode,'index'),
				array=this.widgetIdMap[tdIndex];
			array.splice(indexChild,1);
			this.widgetIdMap[tdIndex]=array;
			this._resizeTD(tdIndex);
			return true;
		}
		return false;
	},
	
	
	//拖拽结束时触发
	_resizeWidgetAfterDrop:function(/*Node*/node, /*Object*/targetArea, /*Integer*/indexChild){
		if(this.diabled){
			return false;
		}
		var targetNode=targetArea.node;
		if(dijit.getEnclosingWidget(targetNode) == this){
			this._spliceNode(targetNode,indexChild,true);
			var widget = dijit.byNode(node);
			var tdIndex=dojo.attr(targetNode,'index');
			var array=this.widgetIdMap[tdIndex];
			//更新保存widget id的内存对象
			if(!array||array.length==0){
				this.widgetIdMap[tdIndex]=[widget.id];
			}else{
				this.widgetIdMap[tdIndex]=unieap.append(array,indexChild,widget.id);
			}
			if(widget.resize && dojo.isFunction(widget.resize)){
				widget.resize();
			}
			this._resizeTD(tdIndex);
			//发布widget发生了变化的事件
			this._publishEvents();
			return true;
		}
		return false;
	},
	

		
	//更新this.cells对象
	//如果是拖拽开始，将this.cells中的对象删除并返回该数据
	//如果是拖拽结束，将this.cells中增加新的数据
	_spliceNode:function(parentNode,widgetIndex,bool){
		var children=parentNode.childNodes,
			cellIndex=dojo.attr(parentNode,'index');
		if(!bool){
			this._orginWidgetProperty=this.cells[cellIndex].splice(widgetIndex,1)[0];
		}else{
			this.cells[cellIndex].splice(widgetIndex,0,this._orginWidgetProperty);
		}
	},
	//开启拖拽
	enableDnd: function(){
		var m = this.dragManager;
		dojo.query(">tr>td",this.tbodyNode).forEach(function(node){
			m.registerByNode(node);
		});
		m._dropMode.updateAreas(m._areaList);
		this.diabled=false;
	
	},
	
	//关闭退拽
	disableDnd: function(){
		if(this.tbodyNode){
			var m = this.dragManager;
			dojo.query(">tr>td",this.tbodyNode).forEach(function(node){
				m.unregister(node);
			});
			m._dropMode.updateAreas(m._areaList);
		}
		this.diabled=true;
	},
	
	//判断控件是否隐藏
	_isShown: function(){
		var node = this.domNode;
		return (node.style.display != 'none') && (node.style.visibility != 'hidden') && !dojo.hasClass(node, "dijitHidden"); 
	},
	
	
	_getIndex:function(widget){
		var parentNode=widget.domNode.parentNode,
			cellIndex=dojo.attr(parentNode,'index'),
			children=parentNode.childNodes,
			widgetIndex=0;
		for(var i=0,l=children.length;i<l;i++){
			if (children[i] == widget.domNode) {
				widgetIndex = i;
				break;
			}
		}
		return [cellIndex,widgetIndex];
		
	},
	
	//点击widget的关闭按钮时出发
	_destorySelectedWidget:function(widget){
		var info=this._getIndex(widget),
			cellIndex=info[0],
			widgetIndex=info[1];
		this.cells[cellIndex].splice(widgetIndex,1);
		this.widgetIdMap[cellIndex].splice(widgetIndex,1);
		//如果widget控件最大化时点击了关闭按钮
		if(widget.getState()=="max"){
			dojo.style(this.domNode,'visibility','');
			this.enableDnd();
		}
		this._resizeTD(cellIndex);
		this._publishEvents();
		
	},
	
	//更新widget控件个性化信息
	_updateWidgetIndividual:function(widget){
		var info=this._getIndex(widget),
			cellIndex=info[0],
			widgetIndex=info[1];
		//获得个性化信息
		var individual=widget.getIndividual();
		dojo.mixin(this.cells[cellIndex][widgetIndex],{
			"individual": individual
		});
		this._publishEvents();
	},

	startup:function(){
		dojo.query("[widgetId]",this.tbodyNode).map(dijit.byNode).forEach(function(widget){
			widget.startup();
		});
		this._isShown()&&this.enableDnd();
		this.inherited(arguments);
	},
	
	_destroyElement:function(){
		//清除td中的widget信息
		dojo.query("[widgetId]",this.tbodyNode).map(dijit.byNode).forEach(function(widget){
			widget.destroy();
		});
		this.disableDnd();
		dojo.destroy(this._div);
		this._div=null;
	},
	
	//控件销毁
	destroy:function(){
		this._destroyElement();
		this.inherited(arguments);
	},
	
	refresh:function(){
		 dojo.query(">tr>td>[widgetId]",this.tbodyNode).map(dijit.byNode).forEach(function(widget){
			 widget.fireEvent("refresh");
		 });
	}
});
