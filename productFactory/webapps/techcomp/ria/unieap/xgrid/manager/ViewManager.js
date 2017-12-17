dojo.provide('unieap.xgrid.manager.ViewManager');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require("unieap.xgrid.core.view");
dojo.require("unieap.xgrid.core.scroller");
dojo.declare("unieap.xgrid.manager.ViewManager", unieap.xgrid.manager.Manager, {
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否在初始化时渲染
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{autoRender:true}">
     * |	...
     * |</div>
     */
    autoRender: true,
    
    /**
	 * @summary:
	 * 		设置当鼠标移动单元格上时，是否以tooltip的形式来显示单元格内容
	 * @description:
	 * 		只有当拖动表头使得单元的内容显示不全时tooltip才展现出来
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid" id="grid" views="{enableTooltip:true}">
	 * |	<header>
	 * |		<cell name="attr_empno" label="编号"></cell>
	 * |		<cell name="attr_ename" label="姓名"></cell>
	 * |	</header>
	 * |</div>
	 */
	enableTooltip:false,
    
	/**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示rowBar
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{rowBar:true}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/views/rowbar.png
     */
    rowBar: false,
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示行号
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{rowNumber:true}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/rownumber.png
     */
    rowNumber: false,
    /**
     * @type:
     * 		{string}
     * @summary:
     * 		设置点击Grid表头的排序方式
     * @enum:
     * 		{client|server|none}
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{orderType:'none'}">
     * |	...
     * |</div>
     * |上述代码表明点击Grid表头时不排序
     */
    orderType: 'client',
    
    isHideHeader: false,
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示修改标记
     * @default:
     * 		true
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" views="{markDirty:false}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/markdirty.png
     */
    markDirty: true,
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否严格区分grid的行单双击事件
     * @default:
     * 		global.js中的unieap.widget.grid.distinguishDblclick属性
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" views="{distinguishDblclick:true}">
     * |	...
     * |</div>
     */
    distinguishDblclick: unieap.widget.grid.distinguishDblclick,
    
    create: function() {
		this.views = [];
        this.subscribe("structureChanged",this,"structureChanged");
        if(this.isHideHeader){
	        dojo.style(this.grid.headersNode,"height","0px");
        }
    },
    
    doContentEvent : function(e){
    	var node = e.target;
    	while(node && node!=this.grid.viewsNode){
    		if(dojo.hasClass(node,"u-xgrid-view")){
    			var view = this.grid.ViewManager.views[dojo.query(">.u-xgrid-view",this.grid.viewsNode).indexOf(node)];
    			view&&view.doContentEvent(e);
    			return;
    		}
    		node = node.parentNode;
    	}
    },
    
    doHeaderEvent : function(e){
    	var node = e.target;
    	while(node && node!=this.grid.headersNode){
    		if(dojo.hasClass(node,"u-xgrid-header")){
    			var view = this.grid.ViewManager.views[dojo.query(">.u-xgrid-header",this.grid.headersNode).indexOf(node)];
    			view.doHeaderEvent(e);
    			return;
    		}
    		node = node.parentNode;
    	}
    },
        
    startup: function(){
    	var rowManager = this.grid.RowManager;
    	this.scroller = new unieap.xgrid.Scroller(this);
    },
    structureChanged: function(flag) {
		this.destroyViews();
		this.buildViews();
		this.scroller && (this.scroller.scrollView = this.getScrollView());
        this.render();
     	if(!flag){
    		this.refreshPage();
        }
    },
    buildViews: function() {
        var nodes = [], layout = this.grid.LayoutManager;
        for (var i = 0, vs; (vs = layout.structure[i]); i++) {
            var v = this.createView(vs.type || "unieap.xgrid.View");
            v.isRowBar && (v.rowNumber = this.rowNumber);
            v.setStructure(vs);
            nodes.push(v.contentNode);
        }
    },
    createView: function(inClass) {
        var clazz = dojo.getObject(inClass);
        var view = new clazz({
            grid: this.grid
        });
        this.addView(view);
        unieap.xgrid.addObserver(view, this);
        return view;
    },
    addView: function(inView) {
        inView.idx = this.views.length;
        this.views.push(inView);
        this.grid.headersNode.appendChild(inView.headerNode);
        this.grid.viewsNode.appendChild(inView.viewNode);
    },
	
	//根据cell对象来获得该cell所在的view
    getViewByCell: function(inCell) {
        for (var i = 0, v; v = this.views[i]; i++) {
			if(v.hasCell && v.hasCell(inCell)){
				return v;
			}
        }
        return null;
    },
 	render: function(){
    	var layout = this.grid.LayoutManager,
		storeList = [];
		for (var i=0, c; c=layout.cells[i]; i++) {
        	if (c.decoder&&c.decoder.store) {
        		unieap.getDataStore(c.decoder.store,this.grid.dataCenter,true) || (storeList.push(c.decoder.store));
        	}
        }
        var self = this;
        if(0 == storeList.length){
        	dojo.forEach(self.views,function(view){
	    		view.render();
	    	});
        }else{
        	unieap.Action.getMultiCodeList(storeList,function(dc){
				dojo.forEach(self.views,function(view){
		    		view.render();
		    	});
			});
        }
    },
    renderLockedRow: function(flag){
    	var data = this.grid.getBinding().getLockedRowData();
        if (!data || data.length == 0) {
      		//因为表格编辑时焦点移出编辑器会触发onItemChange，会调用这个方法，这个方法刷新表格使事件丢失，故移到resize中。
//        	this.scroller.resize();
            return;
        }
    	this.forEach(function(view){
    		view.renderLockedRow(data,flag);
    	});
    	this.scroller.updateContentHeight(data.length,flag);
    },
    destroyViews: function() {
  		for (var i = 0, v; v = this.views[i]; i++) 
            v.destroy();
        this.views = [];
    },
    destroy: function(){
    	this.destroyViews();
    },
    
    getHeaderHeight: function(){
    	return this.grid.getManager("RowManager").defaultHeaderHeight * this.getScrollView().structure.rows.length;
    },
    
    resize: function(width,height){
    	var toolHeight = 0;
		if (this.grid.toolBar) {
			toolHeight = this.grid.getToolBar().getHeight();
		}
		if (this.grid.foot) {
			toolHeight += this.grid.getFoot().getHeight() + 3;
		}
		var scrollView = this.getScrollView(),
    	hh = this.getHeaderHeight(),vh;
    	if(this.isHideHeader) hh=0;
    	if(toolHeight > 0){
    		vh = height -  hh - toolHeight - 3;
    	}else{
    		vh = height -  hh -2 ;
    	}
    	if(vh < 1){
    		return;
    	}
    	//在非锁定视图中存储Grid的宽度和高度	
    	scrollView.snapshot.gridWidth = width;
    	scrollView.snapshot.gridHeight = height;
    	//设置表头和视图区域的高度
    	dojo.style(this.grid.headersNode,"height",hh + "px");
    	dojo.style(this.grid.viewsNode,"height",vh + "px");
    	//调整各视图中的记录
    	for (var i = 0,left = 0, view; view = this.views[i]; i++) {
    		view.setViewLeftPosition(left);
    		if(view.noscroll){
    			var vw = view.getRealWidth();
    			left += vw;    			
    			width= width - vw;
    			dojo.style(view.headerNode,"width",vw+"px");
    			dojo.style(view.contentNode,{"width": vw+"px","height": vh+"px"});
    			continue;
    		}
    		view.resize(width,vh);
    	}
    	for (var i = 0, view; view = this.views[i]; i++) {
    		if(view.noscroll){
    			dojo.style(view.contentNode,"height",scrollView.snapshot.viewContentHeight +"px");
    		}
    	}
		this.scroller.resize();
    	this.publish("resize");
    	this.renderLockedRow(true);
    	//如果有行编辑，并且窗口可显示的列数比原来的多，则关闭编辑器，并重新渲染,如果是移动滚动横向滚动条不重新渲染
    	if(this.grid.rowEdit && this.grid.rowEdit.clickScroll != true){
    		var	snaphotCells = scrollView.snapshot.showCells,
    			rowEdit = this.grid.rowEdit;
    		//关于锁定列解锁锁定、调整列位置
    		var notifyEdit = this.grid.notifyEdit;
    		if(!notifyEdit || 1 != notifyEdit){
	    		if((rowEdit.editShowCells != snaphotCells ) || (notifyEdit && 2 == notifyEdit)){
	    		    this.grid.notifyEdit = 0;
	    		    rowEdit.editShowCells = snaphotCells;
	    		    var setIndex = rowEdit.styleIndex;
	    		    //var editIndex = setIndex+rowEdit.beginRowIndex;
	    		    var editIndex = rowEdit.index;
	    		    if(editIndex >= scrollView.snapshot.rowCount) editIndex = scrollView.snapshot.rowCount-1;
	    			rowEdit.refreshEditTextBox(editIndex);
	    		    rowEdit.applyEdit();
	    		    scrollView.contentBuilder.getRowEdit(editIndex);
	    		}else{
	   				var tempIndex = rowEdit.index;
	    			rowEdit.refreshEditTextBox(rowEdit.index);
	    			if(rowEdit.updateCellWidth){
	    				rowEdit.updateCellWidth = false;
	    			}
	    			!rowEdit.noRefreshEdit && rowEdit.initEdit();
	    			//如果用TAB/Enter快捷键换行时，重新initEdit这时index变回原来的，需要重新设置回原来的index
	    			tempIndex != rowEdit.index && rowEdit.setEdit(tempIndex);
	    		}
    		}
		}
    	unieap.fireEvent4Widget(this, this.grid, this.onAfterResize,[]);
    },
   
	forEach: function(inCallback) {
	    for (var i = 0, v; v = this.views[i]; i++) {
	        inCallback(v, i);
	    }
    },
    getScrollView: function(){
    	return this.views[this.views.length-1];
    },
    doYScroll: function(){
    	var scrollView = this.getScrollView(),
    		snapshot = scrollView.snapshot;
    	dojo.forEach(this.views,function(view){
    		view.snapshot.beginRowIndex = snapshot.beginRowIndex;
    		view.snapshot.viewContentHeight = snapshot.viewContentHeight;
    		view.snapshot.showRows = snapshot.showRows;
    		view.snapshot.lastRow = snapshot.lastRow;
    		view.renderContent();
    	});
    },
    
    /**
     * @summary:
     * 		刷新某一行
     * @param:
     * 		{number} index
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refreshRow(0) //刷新grid中的第一行
     */
    refreshRow: function(index){
    	var snapshot = this.getScrollView().snapshot;
		var viewName = "",
			temp = 0,
		 	cellInnerHTMLList = [];
		for(var i = 0 ; i<this.views.length; ++i){
			if(this.views[i].isRowBar) {
				viewName = this.views[i].id;
				var rowbar = dojo.query("tr",viewName);
				var binding = this.grid.getBinding();
				var data = binding.getRow(index);
				var row = new unieap.ds.Row(binding.getRowSet(),data);
				var checkBox = dojo.query("input", rowbar[index-snapshot.beginRowIndex]);
				if(checkBox[0]){
	            	checkBox[0].checked = row.isRowSelected();
					if (true == row.getIdentifier("uncheckabled")) {
						dojo.attr(checkBox[0],"disabled","true");
					} else {
						dojo.removeAttr(checkBox[0],"disabled");
					}
				}
				continue;
			}
			temp = this.views[i].noscroll?1:0;
			viewName = this.views[i].id;
			var trNodeList = dojo.query("tr",viewName);
			cellInnerHTMLList = dojo.query("div.u-xgrid-cell",trNodeList[index-snapshot.beginRowIndex]);
			var cellListLength = Math.min(cellInnerHTMLList.length,dojo.query("div.u-xgrid-cell",trNodeList[0]).length,dojo.query("col",viewName));
			var unShowNow = 0;
			for(var j = 0; j<cellListLength;j++){
				var rowsRealIndex = temp?j + unShowNow:j + snapshot.beginCellIndex + unShowNow;
				if(this.views[i].contentStructure.rows[0][rowsRealIndex].hidden){
					j--;
					unShowNow++;
					continue;
				}
				cellInnerHTMLList[j].innerHTML = this.views[i].contentStructure.rows[0][rowsRealIndex].format(index);
			}
		}
	},
	
	/**
     * @summary:
     * 		刷新某个单元格
     * @param:
     * 		{number} index
     * @param:
     * 		{unieap.grid.Cell} cell
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refreshCell(0,cell) //刷新第一列第一行的cell
     */
	refreshCell: function(index,cell){
		if(!cell) return;
		var snapshot = this.getScrollView().snapshot;
    		//realIndex = index+snapshot.beginRowIndex;
		var viewName = "",
		 	cells = [],
		 	cellIndex = cell.mulTitleIndex,
		 	lockingColNo = 0;
		for(var i = 0 ; i<this.views.length; ++i){
			if(this.views[i].isRowBar) continue;
			if(this.views[i].noscroll){
				lockingColNo = this.views[i].cells.length;
			}
			viewName = this.views[i].id;
			var trNodeList = dojo.query("tr",viewName);
			//U_EAP00027958
			if(trNodeList.length == undefined || trNodeList.length == 0){
				continue;
			}
			cells = dojo.query("div.u-xgrid-cell",trNodeList[index-snapshot.beginRowIndex]);
			//cell在锁定列范围内
			if(cellIndex<lockingColNo){
				var hiddenCellNo = 0,
					rows = this.views[i].contentStructure.rows[0];
				for(var j=0; j<cellIndex; j++){
					if(rows[j].hidden && rows[j].editor){
						hiddenCellNo++;
					}
				}
//				cells[cellIndex-hiddenCellNo].innerHTML = this.views[i].contentStructure.rows[0][cellIndex].format(index);
				var cellNode = cells[cellIndex-hiddenCellNo];
				if(cellNode){
					cellNode.innerHTML = this.views[i].contentStructure.rows[0][cellIndex].format(index);
					if(this.markDirty){
						var rowItem = new unieap.ds.Row(this.grid.getBinding().getRowSet(),this.grid.getBinding().getRow(index));;
						var cellChangeNode = cellNode.nextSibling;
						if(cellChangeNode){
						dojo.style(cellChangeNode,"display",(cell["name"]&& rowItem && rowItem.isItemChanged(cell["name"]))?"block":"none");
						}
					}
				}
				return;
			}else
			if(this.views[i].noscroll){
				continue;
			}else{
				//非锁定列
				//cellIndex-lockingColNo-snapshot.beginCellIndex-hiddenCellNo为可编辑的第几个，因为是dojo.query得到的，所以应该是可见的序号
				//cellNoInRows 为cell在rows[0]中的需要，需要去掉锁定列的列数
				//uneditedCellNo为不可编辑的列数，如cell上没有配置编辑类型
				var hiddenCellNo = 0,
					uneditedCellNo = 0,
					rows = this.views[i].contentStructure.rows[0],
					cellNoInRows = cellIndex-lockingColNo;
				for(var j=0; j<cellNoInRows ; ++j){
					if(rows[j].hidden && rows[j].editor){
						hiddenCellNo++;
					}
				}
				var beginCellIndex = snapshot.beginCellIndex;
				if(this.views[i].originalSnapshotBeginCellIndex){
					beginCellIndex = this.views[i].originalSnapshotBeginCellIndex;
				}
				//刷新表格时串格
//				for(var j=beginCellIndex; j<cellNoInRows ; ++j){
//					if(!rows[j].editor){
//						uneditedCellNo++;
//					}
//				}
//				var tempIndex = cellIndex-lockingColNo-beginCellIndex-hiddenCellNo-uneditedCellNo;
				var tempIndex = cellIndex-lockingColNo-beginCellIndex-hiddenCellNo;
				//当cell不显示的时候，不需要刷新，tempIndex可能小于0或者大于cells的长度
				var cellNode = cells[tempIndex];
				if(cellNode){
					cellNode.innerHTML = rows[cellNoInRows].format(index);
					if(this.markDirty){
						var rowItem = new unieap.ds.Row(this.grid.getBinding().getRowSet(),this.grid.getBinding().getRow(index));;
						var cellChangeNode = cellNode.nextSibling;
						if(cellChangeNode){
//							if (cell["name"]&& rowItem && rowItem.isItemChanged(cell["name"])){
//								dojo.style(cellChangeNode,"display","block");
//							}
//							else{
//								dojo.style(cellChangeNode,"display","none");
//							}
						dojo.style(cellChangeNode,"display",(cell["name"]&& rowItem && rowItem.isItemChanged(cell["name"]))?"block":"none");
						}
					}
				}
			}
		}
	},
    
    /**
     * @summary:
     * 		刷新表格可视区域，不改变滚动条的位置
     * @description:
     * 		本方法会重新渲染Grid控件
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refresh()
     */
    refreshPage: function(){
		var rowCount = this.grid.getBinding().getRowCount();
		var scrollView = this.getScrollView();
		scrollView.snapshot.rowCount = rowCount;
		dojo.forEach(this.views,function(view){
	    	view.renderHeader();
	    });
		this.grid.resizeContainer();
    },
     /**
     * @summary:
     * 		刷新表格视图
     * @description:
     * 		本方法会重新渲染Grid控件
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refresh()
     */
    refresh: function(autoHeight) {
    	unieap.fireEvent4Widget(this, this.grid, this.onBeforeRefresh,[]);
    	dojo.forEach(this.views,function(view){
    		delete view.snapshot;
    		view.snapshot = {
    			beginRowIndex : 0,
    			beginCellIndex : 0,
    			viewHeight : this.yScrollHeight,
    			gridWidth : this.xScrollWidth
    		};
    	});
    	autoHeight?this.grid.resizeContainer(true):this.grid.resizeContainer();
    },
    
    /**
     * @summary:
     * 		设置表格是否自动渲染
     * @param:
     * 		{boolean} render
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" id="grid" views="{autoRender:false}">
     * |	...
     * |</div>
     * |var viewMan=unieap.byId("grid").getManager("ViewManager");
     * |viewMan.setAutoRender(true);
     */
    setAutoRender: function(render) {
        this.autoRender = render;
        if(!render){
        	dojo.forEach(this.views,function(view){
	    		view.contentNode.innerHTML = "";
	    	});
        }
        this.refresh();
    },
    
     /**
     * @summary:
     * 		设置列标题值
     * @param:
     * 		{string|number} cell
     * @param:
     * 		{string} customName
	 * @example:
	 * |var viewMan=unieap.byId('grid').getManager('ViewManager');
	 * |var label=viewMan.setHeaderName('attr_sal','最新工资');//列标题值变为"最新工资"
     */
    setHeaderName: function(inCell, customName) {
		var cell = this.grid.getLayoutManager().getCell(inCell);
		if (!cell) {
			return;
		};
		var n = dojo.isString(customName)?customName:cell.name,
			th = dojo.query("TH", this.getViewByCell(cell).headerNode)[cell.layoutIndex],
		 	headerDiv = th.firstChild;
//		 	divInnerHTML = headerDiv.innerHTML,
//			headerDivIndex = divInnerHTML.indexOf("<div");
//		if(-1 == headerDivIndex){
//			headerDivIndex = divInnerHTML.indexOf("<DIV");
//		}
//		var oldName = divInnerHTML.slice(0,headerDivIndex);
//		if(oldName){
//			headerDiv.innerHTML = headerDiv.innerHTML.replace(oldName,n);
//		}else{
//			return;
//		}
		if (dojo.isIE) {
			headerDiv.innerText = n;
		} else {
			headerDiv.textContent = n;
		}
		 cell.label = n;
		 this.publish("headerNameChanged");
    },
    
    /**
	 * @summary:
	 * 		获得列标题值
	 * @param:
	 * 		{string|number} inCell Cell的序号或者name属性
	 * @example:
	 * |var viewMan=unieap.byId('grid').getManager('ViewManager');
	 * |var label=viewMan.getHeaderName('attr_sal');//获得标签值为"工资"
	 */
	getHeaderName: function(inCell){
		var cell = this.grid.getLayoutManager().getCell(inCell);
		return cell?cell.label:null;
		
	},
    
    /**
     * @summary:
     * 		将指定行滚动到可显示页面
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getViewManager().scrollToRow(30); //第30行滚动到可显示区域
     */
    scrollToRow: function(inRowIndex) {
    	if (isNaN(inRowIndex) || inRowIndex<0) return;
    	this.scroller.visualizeRow(inRowIndex);
    },
    
    /**
	 * @summary:
	 * 		获得指定单元格的内容
	 * @param:
	 * 		{string|number} inCell 列绑定名称或者列索引号
	 * @param:
	 * 		{number} inRowIndex 单元格所在的行索引
	 * @param：
	 * 		{boolean} isOrigin 是否获得格式化前的值
	 * @example:
	 * |var grid=unieap.byId('grid');
	 * |//获得第一行、第一列单元格中的数据
	 * |var text=grid.getManager('ViewManager').getItemText(0,0);
	 * |//获得第一行行中列绑定名为attr_sal的单元格的值
	 * |var text1=grid.getManager('ViewManager').getItemText("attr_sal",0);
	 * @example:
	 * |var txt=manager.getItemText("attr_sal",0);
	 * |var txt1=manager.getItemText("attr_sal",0,true);
	 * |比如单元格的显示值格式化成'5,000.00',txt的值就为'5,000.00',而txt1为'5000'.
	 */
    getItemText: function(inCell, inRowIndex,isOrigin) {
		if(inCell.declaredClass!='unieap.grid.Cell'){
			inCell=this.grid.getLayoutManager().getCell(inCell);
		}
    	if (!inCell) {
    		return null;
    	}
    	var value = inCell._get(inRowIndex);
		isOrigin!=true && (value=inCell._format(value,inRowIndex));
    	return value;
    },
    
    /**
	 * @summary:
	 * 		设置指单元格样式(合并单元格暂不支持该方法设置样式)
	 * @param:
	 * 		{number} inRowIndex  单元格所在的行索引 
	 * @param:
	 * 		{string|number} cell 列绑定名称或者列索引号
	 * @param:
	 * 		{object} styles 样式对象
	 * @example:
	 * |var viewMan=unieap.byId("grid").getManager("ViewManager");
	 * |//设置Grid中第一行中列绑定名为attr_sal的单元格的样式
	 * |viewMan.setCellStyles(0,"attr_sal",{"color":"red","text-align":"left"});
	 */
	setCellStyles: function(inRowIndex, inCell, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowCount=this.grid.getBinding().getRowCount(),
			cell = this.grid.getLayoutManager().getCell(inCell);
		if(inRowIndex>rowCount||!cell) return;
		var style,
			tempStyles = '',
			cellIndex = cell.mulTitleIndex,
			rowNodes = [];
		if(!cellIndex && 0 != cellIndex) return;
		cell.changeStyle = true;
		var row = this.grid.getBinding().getRowSet().getRow(inRowIndex);
		if(!row.getIdentifier("identifierNO")){
			row.setIdentifier("identifierNO",{});
		}
		if(!row.getIdentifier("_styles")){
			row.setIdentifier("_styles",{});
		}
//		rowDatas[inRowIndex].identifierNO = rowDatas[inRowIndex].identifierNO || [];
//		rowDatas[inRowIndex]._styles = 	rowDatas[inRowIndex]._styles || [];
		for(style in styles) {
			if("undefined" != typeof(style) ){
				tempStyles += style+":"+styles[style]+";";
			}
		}
//		rowDatas[inRowIndex]._styles[cellIndex] = tempStyles;
//		rowDatas[inRowIndex].identifierNO[cellIndex] = cellIndex;

		var _style = row.getIdentifier("_styles");
		_style[cellIndex] = tempStyles;
		row.setIdentifier("_styles",_style);
		
		var _identifierNO = row.getIdentifier("identifierNO");
		_identifierNO[cellIndex] = cellIndex;
		row.setIdentifier("identifierNO",_identifierNO);
		
		//刷新行样式
		var scrollView = this.getScrollView();
		if(scrollView.snapshot.beginRowIndex > inRowIndex) return;
		inRowIndex -= scrollView.snapshot.beginRowIndex; 
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			if(rowNode){	//U_EAP00028110
				dojo.forEach(rowNode.childNodes,function(cellNode){
					rowNodes.push(cellNode);
				});
			}
		}
		if (rowNodes.length==0) return;
		var cellNode = rowNodes[cellIndex];
		if(!cell.hidden){
			for(style in styles) {
				if("undefined" != typeof(style) ){
					if(!dojo.isIE){
						cellNode.attributes.style.value += ";"+style+":"+styles[style];
					}else{
						cellNode.style.cssText += ";"+style+":"+styles[style];
					}
				}
			}
		}
	},
	
	/**
	 * @summary:
	 * 		设置指定行样式(合并单元格暂不支持该方法设置样式)
	 * @param：
	 * 		{number} inRowIndex 行索引号
	 * @param:
	 * 		{object} styles 样式对象
	 * @example:
	 * |var viewMan=unieap.byId("grid").getManager("ViewManager");
	 * |//设置Grid中第一行的样式
	 * |viewMan.setRowStyles(0,{"color":"red","text-align":"left"});
	 */

	setRowStyles: function(inRowIndex, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowNodes = [],
			rowCount=this.grid.getBinding().getRowCount();
//		rowDatas[inRowIndex].identifierNO = rowDatas[inRowIndex].identifierNO || [];
//		rowDatas[inRowIndex]._styles = 	rowDatas[inRowIndex]._styles || [];
		var rowObject = this.grid.getBinding().getRowSet().getRow(inRowIndex);
		if(!rowObject.getIdentifier("identifierNO")){
			rowObject.setIdentifier("identifierNO",{});
		}
		if(!rowObject.getIdentifier("_styles")){
			rowObject.setIdentifier("_styles",{});
		}
		//保存样式
		var tempStyles = '';
		for(style in styles) {
			if("undefined" != typeof(style) ){
				tempStyles += ";"+style+":"+styles[style];
			}
		}
		if(inRowIndex>rowCount) return;
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rows = view.contentStructure.rows;
			var row = rows[0];
			for(var j=0, cell; (cell=row[j]); j++) {
				cell.changeStyle = true;
//				rowDatas[inRowIndex].identifierNO[cell.mulTitleIndex] = cell.mulTitleIndex;
//				rowDatas[inRowIndex]._styles[cell.mulTitleIndex] = tempStyles;
				var _style = rowObject.getIdentifier("_styles");
				_style[cell.mulTitleIndex] = tempStyles;
				rowObject.setIdentifier("_styles",_style);
		
				var _identifierNO = rowObject.getIdentifier("identifierNO");
				_identifierNO[cell.mulTitleIndex] = cell.mulTitleIndex;
				rowObject.setIdentifier("identifierNO",_identifierNO);
			}
		}
		//刷新行样式
		var scrollView = this.getScrollView();
		if(scrollView.snapshot.beginRowIndex > inRowIndex) return;
		inRowIndex -= scrollView.snapshot.beginRowIndex; 
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			rowNode && rowNodes.push(rowNode);
		}
		if (rowNodes.length==0) return;
		dojo.forEach(rowNodes,function(node){
			dojo.forEach(node.childNodes,function(cellNode){
				dojo.forEach(cellNode.childNodes,function(textNode){
					dojo.forEach(textNode.childNodes,function(cellTextNode){
						for(style in styles) {
							if("undefined" != typeof(style) ){
								if(!dojo.isIE){
									cellTextNode.attributes.style.value += ";"+style+":"+styles[style];
								}else{
									cellTextNode.style.cssText += ";"+style+":"+styles[style];
								}
							}
						}
					});
				});
			});
		});
	},
    
    /**
     * @summary:
     * 		判断表格是否有rowBar
     * @return:
     * 		{boolean}
     * @example:
     * |var viewMan=unieap.byId('grid').getManager('ViewManager');
     * |var rowBar=viewMan.hasRowBar();
     */
    hasRowBar: function() {
        var sm = this.grid.SelectionManager;
        return this.rowBar || this.rowNumber || sm && sm.getSelectType();
    },
  	/**   
   	 * @summary:
     * 		grid视图刷新前事件
     * @example:
     * |function fn(){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onBeforeRefresh:fn}"></div>
     */
	onBeforeRefresh: function() {
	},
	/**
	 * @summary:
	 * 		在单元格上鼠标释放事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseup:fn}"></div>
	 */
    onCellMouseup: function(inCell, inRowIndex) {
    },
    _doHeaderClick: function(e) {
    	if (e.cell) {
    		if (this.canSort(e.cell)) {
                this.grid.rowEdit && this.grid.rowEdit.applyEdit();
                this.grid.getBinding().sort(e.cell, -e.cell.asc);
            }
    		unieap.fireEvent4Widget(this, this.grid,this.onHeaderCellClick,[e.cell]);
    	}
    	unieap.fireEvent4Widget(this, this.grid,this.onHeaderClick,[e]);
    },
    _doHeaderMousedown: function(e) {
    	if (e.cell) {
    		unieap.fireEvent4Widget(this, this.grid,this.onHeaderCellMousedown,[e.cell]);
    	}
    	unieap.fireEvent4Widget(this, this.grid,this.onHeaderMousedown,[e]);
    },
     /**
	 * @summary:
	 * 		设置表格是否可排序
	 */
    canSort: function(inCell) {
        return this.orderType != "none" && inCell.canSort != false && inCell.isMulTitle != true;
    },
    
    onMouseOverRow: function(e) {
        var rows = this.grid.RowManager;
        if (!rows.isOver(e.rowIndex)) {
            rows.setOverRow(e.rowIndex);
            unieap.fireEvent4Widget(this, this.grid,(e.rowIndex == -1 ?this.onHeaderMouseOver:this.onRowMouseOver),[e]);
        }
    },
    
    onMouseOutRow: function(e) {
        var rows = this.grid.RowManager;
        if (rows.isOver(-1)) {
        	unieap.fireEvent4Widget(this, this.grid,this.onHeaderMouseOut,[e]);
        } else if (!rows.isOver(-2)) {
        	unieap.fireEvent4Widget(this, this.grid,this.onRowMouseOut,[e]);
        }
    },
    
	onMouseOver: function(e){
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._enableTooltip(e);
			unieap.fireEvent4Widget(this, this.grid,this.onCellMouseOver,[e.cell, e.rowIndex, e]);
    	}
    },
    
    _enableTooltip: function(e){
		this._toolTipTimer=setTimeout(dojo.hitch(this,function(){
			if(!this._globalSpan&&!dojo.byId('_globalSpan_')){
				this._globalSpan=dojo.create("span",{style: {
					visibility: 'hidden',
					position: 'absolute'
				},id:'_globalSpan_'},dojo.body(),"first");
			}
			this._globalSpan = dojo.byId('_globalSpan_');
			if(dojo.isIE == 6){
			 	dojo.style(this._globalSpan,'display','');
			};
			var cellNode,
				fontSize="12px",
				paddingRight=0;
			try{
				cellNode=e.cellNode;
				fontSize=dojo.style(cellNode,'fontSize');
			}catch(ex){
			}
			this._globalSpan.style.fontSize=fontSize;
			//在配置了filter的情况下不判断会报错
			if(!cellNode||!cellNode.childNodes[0]) return;
			var innerHTML,
				tooltipHTML = innerHTML = cellNode.childNodes[0].childNodes[0].innerHTML;
			innerHTML=cellNode.childNodes[0].childNodes[0].innerHTML;
			innerHTML = "<DIV class=\"u-grid-text\">" +innerHTML+ "</DIV>";
			this._globalSpan.innerHTML = innerHTML;
			paddingRight=parseInt(dojo.getComputedStyle(cellNode.childNodes[0]).paddingRight);//火狐下tooltip报脚本错误问题 见U_EAP00008619
			var cellNodeWidth = dojo.contentBox(cellNode).w;
			var showToolTip = dojo.contentBox(this._globalSpan).w-paddingRight>=cellNodeWidth;//U_EAP00028357
			//解决IE6下显示tooltip出现滚动条的问题 见U_EAP00008377
			dojo.isIE==6&&dojo.style(this._globalSpan,"display","none");
			//判断cellNodeWidth是否为0，解决新表格在滚动鼠标滑轮时cellNode宽度为0出现toolTip的bug 见U_EAP00021303
			if(showToolTip && 0 != cellNodeWidth){
				tooltipHTML = "<DIV style='padding: 0 5px 0 5px;vertical-align: middle;word-wrap: break-word;overflow: hidden;height:100%;'>" +tooltipHTML+ "</DIV>";
				unieap.showTooltip(tooltipHTML,cellNode);
			}
			
		}),150);
	},
	
	_doContextMenu: function(e){
		if(isNaN(e.rowIndex) || null == e.rowIndex) return;
		this.onContextMenu(e.cell,e.cellNode,e.rowIndex);
		if(dojo.isIE){
			e.cellNode.oncontextmenu&&e.cellNode.fireEvent('oncontextmenu');
		}else{
			var evt=document.createEvent('HTMLEvents');
			evt.initEvent("contextmenu", false, false);
			e.cellNode.dispatchEvent(evt);
		}
	},
    
	onMouseOut: function(e){
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._disableTooltip(e);
			unieap.fireEvent4Widget(this, this.grid,this.onCellMouseOut,[e.cell, e.rowIndex, e]);
    	}
    	var rowManager = this.grid.RowManager;
    	//U_EAP00027811 当鼠标移出xgrid时，清除当前行的样式
    	rowManager.removeRowOverStyles(e.rowIndex);
    },
    
    _disableTooltip: function(e){
		clearTimeout(this._toolTipTimer);
		this._globalSpan&&unieap.hideTooltip(e.cellNode);
	},
    
	//鼠标按下事件
	_onMousedown: function(e) {
		if (e.cell) {
			unieap.fireEvent4Widget(this, this.grid,this.onCellMousedown,[e.cell, e.rowIndex, e]);
		}
		if (e.rowIndex == null || isNaN(e.rowIndex)) {
			return;
		}
		unieap.fireEvent4Widget(this, this.grid,this.onRowMousedown,[e]);
		var rowManager = this.grid.RowManager;
		rowManager.updateCurrentRow(Number(e.rowIndex));
		if(e.rowIndex == null){
			rowManager.updateHighlightRow(null,true);
		}else{
			if(e.ctrlKey){
				rowManager.updateHighlightRow(Number(e.rowIndex),false);
			}else{
				rowManager.updateHighlightRow(Number(e.rowIndex),true);
			}
		}
		
	},
	//鼠标释放事件
	_onMouseup: function(e) {
		if (e.cell) {
			unieap.fireEvent4Widget(this, this.grid,this.onCellMouseup,[e.cell, e.rowIndex, e]);
		}
		if (e.rowIndex == null || isNaN(e.rowIndex)) {
			return;
		}
		unieap.fireEvent4Widget(this, this.grid,this.onRowMouseup,[e]);
	},
	
	//暂存单击事件，防止在双击时误入单击事件
	_intervalTimer : null,
	
	//单双击辨别时延，官方推荐值为300（毫秒）
	_doubleClickDelay : 300,
	 
	//鼠标点击事件；注：为点击附加的事件请放在_onMousedown中
	_doClick: function(e) {
		if(this.distinguishDblclick){
			clearTimeout(this._intervalTimer); //取消上次延时未执行的方法 
			this._intervalTimer = setTimeout(dojo.hitch(this,function(){
				if (e.cell) {
					unieap.fireEvent4Widget(this, this.grid,this.onCellClick,[e.cell, e.rowIndex, e]);
				}
				var rowManager = this.grid.RowManager;
				if (isNaN(e.rowIndex) || null == e.rowIndex) {
					return;
				}
				unieap.fireEvent4Widget(this, this.grid,this.onRowClick,[e]);
				rowManager.updateCurrentRow(Number(e.rowIndex));
			}),this._doubleClickDelay);
		}else{
			if (e.cell) {
					unieap.fireEvent4Widget(this, this.grid,this.onCellClick,[e.cell, e.rowIndex, e]);
				}
				var rowManager = this.grid.RowManager;
				if (isNaN(e.rowIndex) || null == e.rowIndex) {
					return;
				}
				unieap.fireEvent4Widget(this, this.grid,this.onRowClick,[e]);
				rowManager.updateCurrentRow(Number(e.rowIndex));
		}
	},
	//鼠标双击事件
	_doDbClick: function(e) {
		if(this.distinguishDblclick){
			clearTimeout(this._intervalTimer); 
		}
		if (e.cell) {
			unieap.fireEvent4Widget(this, this.grid,this.onCellDblClick,[e.cell, e.rowIndex, e]);
		}
		if (e.rowIndex == null || isNaN(e.rowIndex)) {
			return;
		}
		unieap.fireEvent4Widget(this, this.grid,this.onRowDblClick,[e]);
	},
	/**
	 * @summary:
	 * 		在单元格上点击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellClick属性
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellClick:fn}"></div>
	 */
    onCellClick: function(inCell, inRowIndex) {
    },
	/**
	 * @summary:
	 * 		在单元格上双击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellDblClick属性
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellDblClick:fn}"></div>
	 */
    onCellDblClick: function(inCell, inRowIndex) {
    },
	 /**
     * @summary:
     * 		单元格上鼠标按下事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMousedown:fn}"></div>
     */
    onCellMousedown: function(inCell, inRowIndex) {
    },
     /**
     * @summary:
     * 		单元格上鼠标经过事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseOver:fn}"></div>
     */
    onCellMouseOver: function(inCell,rowIndex) {
    },
    /**
     * @summary:
     * 		单元格上鼠标移出事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(cell,index,evt){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseOut:fn}"></div>
     */
    onCellMouseOut: function(inCell,rowIndex) {
    },
    /**
	 * @summary:
	 * 		鼠标移出Grid表头事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderMouseOut:fn}"></div>
	 */
    onHeaderMouseOut: function(evt) {
    },
    /**
	 * @summary:
	 * 		鼠标移出Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseOut:fn}"></div>
	 */
    onRowMouseOut: function(evt) {
    },
    /**
	 * @summary:
	 * 		鼠标滑过Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseOver:fn}"></div>
	 */
    onRowMouseOver: function(evt) {
    },
    /**
	 * @summary:
	 * 		在Grid的某一行上鼠标按下事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMousedown:fn}"></div>
	 */
    onRowMousedown: function(evt) {
    },
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标释放事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseup:fn}"></div>
	 */
    onRowMouseup: function(evt) {
    },
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标点击事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowClick:fn}"></div>
	 */
    onRowClick: function(evt) {
    },
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标双击事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowDblClick:fn}"></div>
	 */
    onRowDblClick: function(evt) {
    },
	/**
	 * @summary:
	 * 		列表头鼠标点击事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderCellClick:fn}"></div>
	 */
    onHeaderCellClick: function(inCell) {
    },
	/**
	 * @summary:
	 * 		表头鼠标点击事件
	 * @description:
	 * 		如果同时配置了onHeaderCellClick和onHeaderClick,会先执行前者再执行后者
	 * @param:
	 * 		{event} evt 
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderClick:fn}"></div>
	 */
    onHeaderClick: function(evt) {
    },
	/**
	 * @summary:
	 * 		列表头鼠标按下事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderCellMousedown:fn}"></div>
	 */
    onHeaderCellMousedown: function(inCell) {
    },
    /**
	 * @summary:
	 * 		渲染表头的回调方法
	 * @param:
	 * 		{HTMLDomNode} node 标头结点
	 * @param:
	 * 		{unieap.grid.View} inView 视图对象
	 * @example:
	 * |function fn(node ,view){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderRender:fn}"></div>
	 */
    onHeaderRender : function(node ,inView){
    },
	/**
	 * @summary:
	 * 		表头鼠标按下事件
	 * @param:
	 * 		{event} evt 
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderMousedown:fn}"></div>
	 */
    onHeaderMousedown: function(e) {
    },
    /**
     * @summary:
     * 		在单元格上点击右键时触发
     * @param:
     * 		{unieap.grid.Cell} cell
     * @param:
     * 		{domNode} cellNode
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" views="{onContextMenu:fn}">
     * |	...
     * |</div>
     * |<script type="text/javascript">
     * |	var menu;
     * |	function fn(cell,cellNode,inRowIndex){
     * |		if(!menu){
     * |			menu=new unieap.menu.Menu({style:'display:none'});
     * |			menu.addChild(new unieap.menu.MenuItem({label:'你好'}));
     * |			menu.addChild(new unieap.menu.MenuItem({label:'基础软件'}));
     * |			menu.startup();
     * |			menu.popup();
     * |		}
     * |		menu.bindDomNode(cellNode);
     * |	}
     * |</script>
     * @img:
     * 		images/grid/views/contextmenu.png
     */
	onContextMenu:function(cell,cellNode,inRowIndex){
	},
	
	onAfterResize : function(){
    }
});