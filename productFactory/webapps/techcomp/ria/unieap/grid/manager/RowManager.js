dojo.provide('unieap.grid.manager.RowManager');
dojo.require('unieap.grid.view.builder');

dojo.declare("unieap.grid.manager.RowManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.RowManager
	 * @summary:
	 * 		行控制器
	 * @description:
	 * 		行控制器，可配置每页面渲染的行数、表格缓存的总行数及每行的高度。
	 * 		默认状态下，表格行高为23px，每个页面渲染25行数据，共缓存75行（三个页面）。
	 * 		用户可通过设置相应的属性值，根据业务需求优化表格的渲染速度。
	 * 		行控制器还提供：
	 * 			取得表格的“当前行”行号（注意，当前行一般为鼠标最后点击的行，而不是选中行）的方法:getCurrentRowIndex；
	 * 			取得当前页总行数方法:getRowCount；
	 * 			每行渲染后回调事件:onAfterRenderRow。
	 */
	
	ui: {
		rowsPerPage:true,
		keepRows:true,
		defaultRowHeight:true,
		defaultHeaderHeight:true,
		getRowCount:true,
		updateCurrnetRow:true,
		updateCurrentRow:true,
		getCurrentRowIndex:true,
		mouseEffect:true,
		setCurrentRow:true,
		hasLockedRow:true,
		getLockedRowHeight:true,
		events: {
			onAfterRenderRow:true,
			onUpdateCurrentRow:true
		}
	},
	
	/**
	 * @summary:
	 * 		设置控件每次渲染的行数，设置大的时候会导致grid渲染的性能问题，谨慎使用
	 * @type:
	 * 		{number}
	 * @default:
	 * 		25
	 */
	rowsPerPage: 25,
	
	/**
	 * @summary:
	 * 		缓存总行数
	 * @type:
	 * 		{number}
	 * @default:
	 * 		75
	 */
	keepRows: 75,
	
	/**
	 * @summary:
	 * 		每行的默认高度
	 * @type:
	 * 		{number}
	 * @default:
	 * 		23
	 * @example:
	 *| <div id="grid" id="grid" dojoType="unieap.grid.Grid" width="80%" height="250px" binding="{store:'empDataStore'}" rows="{defaultRowHeight:40}" 
     *|		views="{rowBar:true}">  
     *|  ......   ......   ......  ......
	 *| </div> 
	 */
	defaultRowHeight: 30,
	
	/**
	 * @summary:
	 * 		表头的默认高度
	 * @type:
	 * 		{number}
	 * @default:
	 * 		23
	 * @example:
	 *|  <div dojoType="unieap.grid.Grid" rows="{defaultHeaderHeight:30}"></div>
	 */
	defaultHeaderHeight : 30,
	
	
	/**
	 * @summary:
	 * 		设置鼠标滑过控件中的一行时是否给该行加上背景色
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		true
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" rows="{mouseEffect:false}"></div>
	 */
	mouseEffect:true,
	
	overRow: -2,
	currentRowIndex: -1,
	
	//已高亮的行号
	highlightRowIndexs: [],
	
	managerRowBarWidth:null,
	
	constructor: function(param) {
		dojo.mixin(this, param);

	},
	
	forEachView: function(inFunc) {
		var vm = this.grid.managers.get("ViewManager");
		vm.forEach(dojo.hitch(this, inFunc));
	},
	
	renderRow: function(inRowIndex, inNodes) {
		this._renderRow(inRowIndex, inNodes);
	},
	
	_renderRow : function(inRowIndex,inNodes) {
		var vm = this.grid.managers.get("ViewManager"),
			layout=this.grid.managers.get("LayoutManager"),
			rowNodes=[],
			rowData=this.grid.getBinding().getRow(inRowIndex);
		for(var i=0, n, v, rowNode; (v=vm.views[i])&&(n=inNodes[i]); i++) {
			rowNode = this.createRowNode(inRowIndex, v);
			if (dojo.isIE && dojo.isIE < 7) {
				n.appendChild(rowNode);
				v.renderRow(rowNode, inRowIndex);
			
			} else {
				v.renderRow(rowNode, inRowIndex);
				n.appendChild(rowNode);
			}
			
			this.styleRowNode(inRowIndex, rowNode, v);
			
			var row = new unieap.ds.Row(this.grid.getBinding().getRowSet(),rowData);
			//!v.isRowBar&&this.styleCustomRowNode(rowNode,rowData[inRowIndex]&&rowData[inRowIndex]["_style"],layout);
			!v.isRowBar&&this.styleCustomRowNode(rowNode,rowData&&row.getIdentifier("_style"),layout);
			rowNodes.push(rowNode);
		}
		this.updateStyles(inRowIndex);
		unieap.fireEvent4Widget(this,this.grid,this.onAfterRenderRow,[inRowIndex]);
	},
	
	createRowNode: function(inRowIndex, inView) {
		var node = document.createElement("div");
		node.className = inView.rowClassTag;
		node.setAttribute(unieap.grid.rowIndexTag,inRowIndex);
		node[unieap.grid.rowIndexTag] = inRowIndex;
		inView.rowNodes[inRowIndex] = node;
		return node;
	},
	
	rowRemoved: function(inRowIndex) {
		this.forEachView(function(inView) {
			var node = inView.rowNodes[inRowIndex];
			this.onRowRemoved(node,inRowIndex);
			delete inView.rowNodes[inRowIndex];
		});
	},
	
	setOverRow: function(inRowIndex) {
		//如果设置了rows="{mouseEffect:false}"当鼠标滑过Grid中的某一行时,不给该行增加背景样式
		var highlight=this.mouseEffect;
		if(!highlight) return;
		var last = this.overRow;
		this.overRow = inRowIndex;
		if((last!=this.overRow)&&(last >=0)){
			this.updateStyles(last);
		}
		this.updateStyles(this.overRow);
	},
	isOver: function(inRowIndex) {
		return (this.overRow == inRowIndex);
	},
	

	updateCurrnetRow: function(inRowIndex) {
		this.updateCurrentRow(inRowIndex);
	},
	
	/**
	 * @summary:
	 * 		更新当前行
	 * @param:
	 * 		{number} inRowIndex 行索引号
	 */
	updateCurrentRow:function(inRowIndex){
		if (inRowIndex>=0) {
			var rowIndex = this.currentRowIndex;
			this.currentRowIndex = inRowIndex;
			this.updateStyles(rowIndex);
			this.updateStyles(this.currentRowIndex);
			unieap.fireEvent4Widget(this,this.grid,this.onUpdateCurrentRow,[inRowIndex]);
		}
	},
	
	//是否需要将当前行加入 highlightRowIndexs ，
	//防止用户不停点击同一行而照成 highlightRowIndexs 有大量冗余
	_isThisRowNeedHighlight: function(inRowIndex){
		var len = this.highlightRowIndexs.length;
		if(len>0){
			for(var i=0; i<len; i++){
				if(this.highlightRowIndexs[i]==inRowIndex){
					return false;
				}
				return true;
			}
		}else{
			return true;
		}
	},	
	
	//当前行是不是在 highlightRowIndexs 中
	_isThisRowHighlighted: function(inRowIndex){
		!this.highlightRowIndexs && (this.highlightRowIndexs = []);
		var l = this.highlightRowIndexs.length;
		for(var j=0;j<l;j++){
			if(inRowIndex==this.highlightRowIndexs[j])
				return true;
			}
		return false;
	},
	
	//重置所有高亮行
	_clearAllHighlight: function(){
		var highlightRowIndexs = this.highlightRowIndexs;
		this.highlightRowIndexs = [];
		var len = highlightRowIndexs.length;
		if(len>0){
			this.forEachView(function(inView) {
				for(var i=0;i<len;i++){
				var rowNode = inView.getRowNode(highlightRowIndexs[i]);
					if (rowNode) {
						this.styleRowNode(highlightRowIndexs[i], rowNode, inView);
					}
				}
			});
		}
	},
	
	/**
	 * @summary:
	 * 		更新高亮行信息
	 * @param:
	 * 		{number} inRowIndex 行索引号
	 * 		{boolean} reset 是否重置高亮行信息
	 */
	updateHighlightRow: function(inRowIndex,reset){
		!this.highlightRowIndexs && (this.highlightRowIndexs = []);
		if(reset){ 
			this._clearAllHighlight();
		}
		if(this._isThisRowNeedHighlight(inRowIndex))
			this.highlightRowIndexs.push(inRowIndex);
	},
	
	// styles
	updateStyles: function(inRowIndex){
		this.forEachView(function(inView) {
			var rowNode = inView.getRowNode(inRowIndex);
			if (rowNode) {
				this.styleRowNode(inRowIndex, rowNode, inView);
			}
		});
	},
	prepareStylingRow: function(inRowIndex, inRowNode, inView) {
		return {
			index: inRowIndex, 
			node: inRowNode,
			odd: Boolean(inRowIndex&1),
			over: this.isOver(inRowIndex),
//			customStyles: "",
			highlight: this._isThisRowHighlighted(inRowIndex),
			customClasses: inView.isRowBar? "u-grid-rowbar":"u-grid-row"
		};
	},
	styleRowNode: function(inRowIndex, inRowNode, inView,style) {
		var row = this.prepareStylingRow(inRowIndex, inRowNode, inView);
		this.onStyleRow(row);
		this.applyStyles(row);
	},
	
	//当拖动表格滚动条渲染数据时,重新应用样式
	styleCustomRowNode:function(rowNode,styleObj,layoutManager){
		if(!styleObj) return;
		var rowStyle=styleObj["row"]&&dojo.fromJson(styleObj["row"]),
			cellStyle=styleObj["cell"],
			priority=styleObj["priority"],
			//多标题情况下seq是不存在的，注意判断
			seq=layoutManager.customStructure;//解决个性化列次序发生变化后渲染问题
		if(priority=="row"){
			if(cellStyle){
				for(var item in cellStyle){
					var index = item,
					currentIndex=seq?dojo.indexOf(seq.seq,index):index;
					if(currentIndex==-1) return;
					var style = dojo.fromJson(cellStyle[item]);
					var node=dojo.query("[idx="+currentIndex+"]",rowNode);
					node&&node[0]&&dojo.style(node[0],style);				
				}					
			}			 
			dojo.query('.u-grid-text',rowNode).forEach(function(node){
				dojo.style(node,rowStyle);
				dojo.isIE<8&&(node.style.cssText=node.style.cssText);
			});
			dojo.query('.u-grid-text2',rowNode).forEach(function(node2){
				dojo.style(node2,rowStyle);
				dojo.isIE<8&&(node2.style.cssText=node2.style.cssText);
			});
			
		}else if(priority=="cell"){
			rowStyle&&dojo.query('.u-grid-text',rowNode).forEach(function(node){
				dojo.style(node,rowStyle);
				dojo.isIE<8&&(node.style.cssText=node.style.cssText);
			});
			dojo.query('.u-grid-text2',rowNode).forEach(function(node2){
				dojo.style(node2,rowStyle);
				dojo.isIE<8&&(node2.style.cssText=node2.style.cssText);
			});
			for(var item in cellStyle){
				var index = item,
				currentIndex=seq?dojo.indexOf(seq.seq,index):index;
				if(currentIndex==-1) return;
				var style = dojo.fromJson(cellStyle[item]);
				var node=dojo.query("[idx="+currentIndex+"]",rowNode);
				node&&node[0]&&dojo.style(node[0],style);				
			}
		}
	},
	
	
	applyStyles: function(inRow) {
		with(inRow){
			node.className = customClasses;
			var h = node.style.height;
//			unieap.grid.setStyleText(node, customStyles + ';' + (node._style||''));
			node.style.height = h;
		}
	},
	onStyleRow: function(inRow) {
		with(inRow){
			customClasses += (odd?" u-grid-row-odd":"")  
			+ (over?" u-grid-row-over":"")
			+((index==this.currentRowIndex)?" u-grid-row-current":"")
			+(highlight?" u-grid-row-highlight":"");
		}
	},
	onRowRemoved : function(node,inRowIndex){
		
	},
	//user interface------------------------------------------------------
	/**
	 * @summary:
	 * 		取得表格当前页总行数
	 * @return:
	 * 		{number}
	 */
	getRowCount: function() {
		//nfc
		return this.grid.getBinding().getRowCount();
	},
	
	/**
	 * @summary:
	 * 		设置当前行
	 * @param：
	 * 	{number} inRowIndex 行号
	 */
	setCurrentRow: function(inRowIndex) {
		if (isNaN(inRowIndex)) return;
		this.currentRowIndex = inRowIndex;
		this.grid.managers.get("ViewManager").refreshPage();
	},
	
	/**
	 * @summary:
	 * 		取得当前行号
	 * @return:
	 * 		{number}
	 * @example:
	 *|	grid.getRowManager().getCurrentRowIndex(); 
	 */
	getCurrentRowIndex: function() {
		var gridBinding = this.grid.getBinding();
		var rowCount = (gridBinding==undefined || gridBinding==null)?-2:gridBinding.getDataStore().getRowSet().getRowCount();
		if(rowCount<=this.currentRowIndex){
			this.currentRowIndex = -1;
		}
		return this.currentRowIndex;
	},
	
	/**
	 * @summary:
	 * 		判断表格是否有锁定行
	 * @return:
	 * 		{boolean}
	 */
	hasLockedRow: function() {
		var data = this.grid.getBinding().getLockedRowData();
		if (!data||data.length==0) {
			return false;
		} else {
			return true;
		}
	},
	
	/**
	 * @summary:
	 * 		取得锁定行高度
	 * @return:
	 * 		{number}
	 */
	getLockedRowHeight: function() {
		if (this.hasLockedRow()) {
			var data = this.grid.getBinding().getLockedRowData();
			return data.length*this.defaultRowHeight;
		} else {
			return 0;
		}
	},
	
	/**
	 * @summary:
	 * 		行渲染后事件
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 *| <div id="grid" id="grid" dojoType="unieap.grid.Grid"
	 *|  rows="{onAfterRenderRow:test}" width="80%" height="180px" binding="{store:'empDataStore'}" >
   	 *| ......  ......  ......
	 *| </div>
	 *| <script>
	 *|		function test(rowIndex){
     *|		//令当前行的字体变成红色
     *|		grid.getViewManager().setRowStyles(rowIndex,{'color':'red'});
	 *|		}
 	 *| </script>
	 */
	onAfterRenderRow: function(inRowIndex) {
		
	},
	
	/**
	 * @summary:
	 * 		更新当前行回调方法
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" rows="{onUpdateCurrentRow:test}">
     *|		<header>
     *|		   <cell label="姓名" name="NAME"></cell>
     *|		   <cell label="部门" name="attr_empno"></cell>
     *|		   <cell label="职位" name="attr_job"></cell>
     *|		   <cell label="工资" name="attr_sal"></cell>
     *|		</header>
	 *|</div>
	 *|<script>
	 *|		function test(rowIndex){
     *|		//令当前行的字体变成红色
     *|		grid.getViewManager().setRowStyles(rowIndex,{'color':'red'});
	 *|		}
 	 *|</script>
 	 * @img:
 	 * 		images/grid/onupdatecurrentrow.png
	 */
	onUpdateCurrentRow: function(inRowIndex) {
		
	}
});