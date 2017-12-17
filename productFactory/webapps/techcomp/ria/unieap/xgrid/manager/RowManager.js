dojo.provide('unieap.xgrid.manager.RowManager');
dojo.require('unieap.xgrid.core.builder');
dojo.declare("unieap.xgrid.manager.RowManager", unieap.xgrid.manager.Manager, {
	/**
	 * @declaredClass:
	 * 		unieap.xgrid.manager.RowManager
	 * @summary:
	 * 		行控制器
	 * @description:
	 * 		行控制器，可配置表头和每行的高度。
	 * 		默认状态下，表格行高为23px。
	 * 		用户可通过设置相应的属性值。
	 * 		行控制器还提供：
	 * 			取得表格的“当前行”行号（注意，当前行一般为鼠标最后点击的行，而不是选中行）的方法:getCurrentRowIndex；
	 * 			取得总行数方法:getRowCount；
	 */
	
	/**
	 * @summary:
	 * 		每行的默认高度
	 * @type:
	 * 		{number}
	 * @example:
	 *| <div id="grid" id="grid" dojoType="unieap.xgrid.Grid" width="80%" height="250px" binding="{store:'empDataStore'}" rows="{defaultRowHeight:40}" 
     *|		views="{rowBar:true}">  
	 *| </div> 
	 */
	defaultRowHeight: 30,
	
	/**
	 * @summary:
	 * 		表头的默认高度
	 * @type:
	 * 		{number}
	 * @example:
	 *|  <div dojoType="unieap.xgrid.Grid" rows="{defaultHeaderHeight:30}"></div>
	 */
	defaultHeaderHeight: 30,
	
	
	/**
	 * @summary:
	 * 		设置鼠标滑过控件中的一行时是否给该行加上背景色
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		{true}
	 * @example:
	 *|<div dojoType="unieap.xgrid.Grid" rows="{mouseEffect:false}"></div>
	 */
	mouseEffect: true,
	
	overRow: -2,
	//currentRowIndex值的改变要调用updateCurrentRow(),不要直接赋值。（行样式）
	currentRowIndex: -1,
	
	highlightRowIndexs: [],
	
	managerRowBarWidth: null,
	
	create: function(){
		var params = this.grid.rows || {};
		this.subscribe("resize",this,"updateCurrentRow");
		this.subscribe("resize",this,"updateSelectRow");
		this.subscribe("resize",this,"showHighlight");
		dojo.mixin(this, params);
	},
	
	forEachView: function(inFunc) {
		var vm = this.grid.ViewManager;
		vm.forEach(dojo.hitch(this, inFunc));
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

	/**
	 * @summary:
	 * 		更新当前行
	 * @param:
	 * 		{number} inRowIndex
	 */
	updateCurrentRow: function(inRowIndex){
		//通过事件resize事件监听调用此方法时，inRowIndex为undefined
		if(!inRowIndex && 0 != inRowIndex) inRowIndex = this.currentRowIndex;
		this.currentRowIndex = inRowIndex;
		this.updateCurrentStyles(this.currentRowIndex);
		unieap.fireEvent4Widget(this, this.grid,this.onUpdateCurrentRow,[inRowIndex]);
	},
	
	showHighlight: function(){
		var highlightRowIndexs = this.highlightRowIndexs;
		if(highlightRowIndexs.length>0){
			var inRowIndex = 0;
			for(var i=0,l=highlightRowIndexs.length;i<l;i++){
				inRowIndex = highlightRowIndexs[i];
				dojo.query('table.u-xgrid-table [gridrowindex="'+inRowIndex+'"]',this.grid.viewsNode).forEach(function(node){
					dojo.style(node,"backgroundColor","");
					dojo.addClass(node,"u-xgrid-row-highlight");
				});
			}
		}
	},
	
	_clearAllHighlight: function(){
		var len = this.highlightRowIndexs.length;
		for(var i = 0; i<len; i++){
			var rowIndex = this.highlightRowIndexs[i];
			dojo.query('table.u-xgrid-table [gridrowindex="'+rowIndex+'"]',this.grid.viewsNode).forEach(function(node){
				dojo.removeClass(node,"u-xgrid-row-highlight");
			});
		}
		this.highlightRowIndexs = [];
	},
	
	_isThisRowNeedHighlight: function(inRowIndex){
		var len = this.highlightRowIndexs.length;
		for(var j=0;j<len;j++){
			if(this.highlightRowIndexs[j]==inRowIndex){
				return false;
			}
		}
		return true;
	},
	
	updateHighlightRow: function(inRowIndex,reset){
		if(reset){
			this._clearAllHighlight();
		}
		if(inRowIndex!=null){
			dojo.query('table.u-xgrid-table [gridrowindex="'+inRowIndex+'"]',this.grid.viewsNode).forEach(function(node){
				dojo.style(node,"backgroundColor","");
				dojo.addClass(node,"u-xgrid-row-highlight");
			});
			if(this._isThisRowNeedHighlight(inRowIndex)) 
				this.highlightRowIndexs.push(inRowIndex);
		}
	},	
	
	updateCurrentStyles: function(inRowIndex){
		//debugger;
		!this.currentRows && (this.currentRows = []);
		var currentRows = this.currentRows;
		for(var i = 0,l = currentRows.length; i<l; ++i){
			dojo.removeClass(currentRows.pop(),"u-xgrid-row-current");
		}
		dojo.query('table.u-xgrid-table [gridrowindex="'+inRowIndex+'"]',this.grid.viewsNode).forEach(function(node){
			dojo.style(node,"backgroundColor","");
			dojo.addClass(node,"u-xgrid-row-current");
			currentRows.push(node);
		});
	},
	
	//U_EAP00027811 当鼠标移出xgrid时，清除当前行的样式
	removeRowOverStyles: function(inRowIndex){
		if(inRowIndex == this.currentRowIndex) return;
		!this.overRows && (this.overRows = []);
		var size = this.overRows.length,
			overRows = this.overRows;
		for(var i = 0; i < size; i++){
			dojo.removeClass(overRows.pop(),"u-xgrid-row-over");
		}
	},
	
	updateStyles: function(inRowIndex){
		if(inRowIndex == this.currentRowIndex) return;
		!this.overRows && (this.overRows = []);
		var size = this.overRows.length,
			overRows = this.overRows;
		for(var i = 0; i < size; i++){
			dojo.removeClass(overRows.pop(),"u-xgrid-row-over");
		}
		dojo.query('table.u-xgrid-table [gridrowindex="'+inRowIndex+'"]',this.grid.viewsNode).forEach(function(node){
			dojo.addClass(node,"u-xgrid-row-over");
			overRows.push(node);
		});
		if(-1 == inRowIndex){
			this.overRow = inRowIndex;
		}
	},
	
	updateSelectRow: function(inRowIndex){
		if(!this.grid.selection) return;
		//如果当前行成为选中行，取消此行为当前行
		if(inRowIndex == this.currentRowIndex){
			this.currentRowIndex = -1;
			this.updateCurrentStyles(this.currentRowIndex);
		}
		this.updateSelectRowStyles(inRowIndex);
	},
	
	updateSelectRowStyles: function(inRowIndex){
		!this.selectRows && (this.selectRows = []);
		var snapshot = this.grid.getViewManager().getScrollView().snapshot,
			beginRowIndex = snapshot.beginRowIndex,
			row = null,
			selectRows = this.selectRows,
			rowSet = this.grid.getBinding().getRowSet();
		for(var i = 0,l = selectRows.length; i<l; ++i){
				dojo.removeClass(selectRows.pop(),"u-xgrid-row-selected");
		}
		for (var i = beginRowIndex,l = beginRowIndex+snapshot.showRows ; i<l; ++i){
			row = rowSet.getRow(i);
			if(row && row.data && row.isRowSelected()){ //U_EAP00028153
				dojo.query('table.u-xgrid-table [gridrowindex="'+i+'"]',this.grid.viewsNode).forEach(function(node){
					dojo.addClass(node,"u-xgrid-row-selected");
					selectRows.push(node);
				});
			}
		}
	},
	
	//当拖动表格滚动条渲染数据时,重新应用样式
//	styleCustomRowNode: function(rowNode,styleObj,layoutManager){
//		if(!styleObj) return;
//		var rowStyle=styleObj["row"]&&dojo.fromJson(styleObj["row"]),
//			cellStyle=styleObj["cell"],
//			priority=styleObj["priority"],
//			//多标题情况下seq是不存在的，注意判断
//			seq=layoutManager.customStructure;//解决个性化列次序发生变化后渲染问题
//		if(priority=="row"){
//			if(cellStyle){
//				for(var item in cellStyle){
//					var index = item,
//					currentIndex=seq?dojo.indexOf(seq.seq,index):index;
//					if(currentIndex==-1) return;
//					var style = dojo.fromJson(cellStyle[item]);
//					var node=dojo.query("[idx="+currentIndex+"]",rowNode);
//					node&&node[0]&&dojo.style(node[0],style);				
//				}					
//			}			 
//			dojo.query('.u-grid-cell',rowNode).forEach(function(node){
//				dojo.style(node,rowStyle);
//			});
//			
//		}else if(priority=="cell"){
//			rowStyle&&dojo.query('.u-grid-cell',rowNode).forEach(function(node){
//				dojo.style(node,rowStyle);
//			});
//			for(var item in cellStyle){
//				var index = item,
//				currentIndex=seq?dojo.indexOf(seq.seq,index):index;
//				if(currentIndex==-1) return;
//				var style = dojo.fromJson(cellStyle[item]);
//				var node=dojo.query("[idx="+currentIndex+"]",rowNode);
//				node&&node[0]&&dojo.style(node[0],style);				
//			}
//		}
//	},
	
	onRowRemoved: function(inRowIndex){
		
	},

	/**
	 * @summary:
	 * 		取得表格总行数
	 * @return:
	 * 		{number}
	 */
	getRowCount: function() {
		return this.grid.getBinding().getRowCount();
	},
	
	/**
	 * @summary:
	 * 		设置当前行
	 * @param：
	 * 	{number} inRowIndex行号
	 */
	setCurrentRow: function(inRowIndex) {
		if (isNaN(inRowIndex)) return;
		this.currentRowIndex = inRowIndex;
		this.grid.getViewManager().refreshPage();
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
	 * @return {Boolean}
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
	 * 		更新当前行回调方法
	 * @example:
	 *|<div dojoType="unieap.xgrid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" rows="{onUpdateCurrentRow:test}">
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
	 */
	onUpdateCurrentRow: function(inRowIndex) {
		
	}
});