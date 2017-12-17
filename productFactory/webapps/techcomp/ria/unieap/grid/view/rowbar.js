dojo.provide('unieap.grid.view.rowbar');
dojo.require('unieap.grid.view.view');

dojo.declare('unieap.grid.RowView', unieap.grid.View, {
	
	rowClassTag: 'u-grid-rowbar',
	
	noscroll: true,
	isRowBar: true,
	cellWidth: true,
	
	_keyEventHandle:{},
	_keyEventHeaderHandle:null,
	
	postCreate: function() {
		this.inherited(arguments);
		this.headerEvtHandler = [];
		this.contentEvtHandler = [];
		this._fs = parseInt(dojo.style(this.grid.domNode,"fontSize"))/2 || 6 ;
	},
	
	setStructure: function(inStructure) {
		this.structure = inStructure;
		this.cellWidth = this.structure.width || 20;
		
		dojo.style(this.scrollboxNode,"overflow", "hidden"); 
		//绑定自动扩展rowbar的事件
		if(this.rowNumber){
			var viewManager = this.grid.managers.get("ViewManager");			
			this.connect(viewManager, "render", "_resizeNumberWidth");
			this.connect(viewManager, "setScrollTop", "_resizeNumberWidth");
		}
	},
	_resizeNumberWidth : function() {
		if(!this.rowNumber) return ;	
		var viewManager = this.grid.managers.get("ViewManager");						
		var number = viewManager.scroller.lastVisibleRow;
		var store = this.grid.getBinding().getDataStore();
		number += (store.getPageNumber()-1) * store.getPageSize();	
		var	width = String(number).length*this._fs+6;	
		if(width<=20) width = 20;													  
		this.resizeContentWidth(width);
		//调整滚动条
		var viewManager = this.grid.managers.get("ViewManager");
		viewManager.adjustScrollBar();
	},
	
	resizeContentWidth: function(inWidth) {
		var width = this.getRowBarWidth(inWidth);		
		if(this.originWidth == width) return ;
		this.originWidth = width;
		dojo.style(this.headerNode,"width",width);
		dojo.style(this.headerContentNode.firstChild,"width",width);
		dojo.style(this.domNode,"width",width);
		this.lockedNode&&dojo.style(this.lockedNode,"width",width);
	},
	
	prepareHtml: function() {
		var html = [];
		html.push('<table class="u-grid-rowbar-table" style="height:');
		//html[1]: rowHeight
		html.push('');
		html.push('px;" cellspacing=0 cellpadding=0>');
		
		html.push('<tr>');
		//html[4]: cells
		html.push('');
		html.push('</tr></table>')
		return html;
	},
	
	renderHeader: function() {
		var html = this.prepareHtml();
		html[1] = this.headerHeight;
		html[4] = this.generateRowCells(-1);
		this.headerContentNode.innerHTML = html.join('');
		
		if(this.grid.edit){
			dojo.disconnect(this._keyEventHeaderHandle);
			this._keyEventHeaderHandle= null;
			var widgets = dojo.query("input[type^=checkbox]", this.headerContentNode);
			if(widgets && widgets[0]){
				this._keyEventHeaderHandle=(dojo.connect(widgets[0],"onkeydown",this,function(evt){
					if(evt.keyCode == dojo.keys.DOWN_ARROW){
						if(this.grid.managers.managers.EditManager.focusRowBarByIndex(0))
							dojo.stopEvent(evt);
					}else if(evt.keyCode == dojo.keys.SPACE){
						unieap.fep(widgets[0]);
					}
				}));
			}
		}
		
		this.originWidth = 0;
		this.resizeContentWidth();
	},
	
	renderRow: function(inRowNode, inRowIndex,isFocus) {
		if (!inRowNode) return;
		var html = this.prepareHtml();
		html[1] = this.rowHeight;
		html[4] = this.generateRowCells(inRowIndex);
		inRowNode.innerHTML = html.join('');
		if(this.grid.edit && this.grid.edit.editType != "readonly"){
			this._editRowBarEvent(inRowNode, inRowIndex, isFocus);
		}
		unieap.grid.notify(this, "onRowRender", [inRowNode, inRowIndex,this]);
	},
	
	_editRowBarEvent:function(inRowNode, inRowIndex,isFocus){
		dojo.disconnect(this._keyEventHandle[inRowIndex]);
		this._keyEventHandle[inRowIndex]= null;
		var widgets = dojo.query("input", inRowNode);
		if(widgets && widgets[0]){
			if(isFocus) widgets[0].focus();
			this._keyEventHandle[inRowIndex]=(dojo.connect(widgets[0],"onkeydown",this,function(evt){
				if(evt.keyCode == dojo.keys.TAB&&!evt.shiftKey){
					var editManager = this.grid.managers.managers.EditManager;
					editManager.gerNextEditorCellWithRowBar(inRowIndex,"next");
					dojo.stopEvent(evt);
				}
				else if(evt.keyCode == dojo.keys.DOWN_ARROW){
					this.grid.managers.managers.EditManager.gerNextEditorCellWithRowBar(inRowIndex+1,"down");
					dojo.stopEvent(evt);
				}
				else if(evt.keyCode == dojo.keys.UP_ARROW){
					if(inRowIndex-1 > -1){
						this.grid.managers.managers.EditManager.gerNextEditorCellWithRowBar(inRowIndex-1,"up");
					}else{
						var widget = dojo.query("input", this.grid.headerNode)[0];
						if(widget){
							widget.focus();
						}
					}
					dojo.stopEvent(evt);
				}
				else if(evt.keyCode == dojo.keys.TAB&&evt.shiftKey){
					if(this.grid.managers.managers.EditManager.gerNextEditorCellWithRowBar(inRowIndex-1,"up")){
						dojo.stopEvent(evt);
					}
				}
				else if(evt.keyCode == dojo.keys.LEFT_ARROW || evt.keyCode == dojo.keys.RIGHT_ARROW){
					dojo.stopEvent(evt);
				}
			}));
		}
	},
	
	destroy: function() {
		dojo.destroy(this.domNode);
		dojo.destroy(this.headerNode);
		for(index in this._keyEventHandle){
			dojo.disconnect(this._keyEventHandle[index]);
		}
		this._keyEventHandle = null;
		dojo.disconnect(this._keyEventHeaderHandle);
		this._keyEventHeaderHandle = null;
		this.inherited(arguments);
	},
	
	generateLockedRow:function(node,data) {
		var _html = '<div class="u-grid-rowbar"><table class="u-grid-rowbar-table" style="width:100%;height:' + this.rowHeight + 'px;" cellspacing=0 cellpadding=0><tr>';
		var html_='</tr></table></div>';
		var cell,inner=[];
		 dojo.forEach(data,function(d,index){
	    
	       var value=d['_BAR']||'';
		    var gclass="";
		   
            if(value.cls){
		       gclass=value.cls;
		    }
		    if(value.value){
		     value=value.value;
		   }
		    cell = "<td class='u-grid-rowbar-cell'><nobr class='"+gclass+"'>"+value+"</nobr></td>";
			inner.push(_html,cell,html_);
	        
		},this)
		node.innerHTML=inner.join('');
	},
	
	generateRowNumberCell: function(inRowIndex) {
		if(inRowIndex<0){ 
			return this.generateBlankCell(false);
		}
		var result = [];
		var store = this.grid.getBinding().getDataStore();
		inRowIndex += (store.getPageNumber()-1) * store.getPageSize();
		result.push('<td class="u-grid-rowbar-cell">');
		result.push(inRowIndex+1);
		result.push('</td>');
		return result;
	},
	generateBlankCell : function(bool){
		var result = [];
		if(!bool){
			result.push('<td class="u-grid-rowbar-cell">');
			result.push('&nbsp;');
			result.push('</td>');
		}
		return result;
	},
	
	//may be override by selection module
//	generateColGroup: function() {
//		return '<colgroup><col style="width: ' + this.cellWidth + 'px"></col></colgroup>';
//	},
	//may be override by selection module
	generateRowCells: function(inRowIndex) {	
		var viewManager = this.grid.managers.get("ViewManager");
		var plusCells=this.grid.managers.getPlus(viewManager,'generateRowBarCells');
		var cells= this.rowNumber ?  this.generateRowNumberCell(inRowIndex) : [];
//		var cells= this.rowNumber ?  this.generateRowNumberCell(inRowIndex) : this.generateBlankCell(plusCells && plusCells.length);
		if(plusCells){
			var td;
			dojo.forEach(plusCells,function(_g){
				td=_g.call(this,inRowIndex);
				td && cells.push(td);
//				cells.push(_g.call(this,inRowIndex));
			})
		}
		if (cells.length==0) {
			cells = this.generateBlankCell(false);
		}
		return cells.join('');
	},
	
	getRowBarWidth: function(inWidth) {	
		var width=inWidth   || (this.cellWidth);
		var viewManager = this.grid.managers.get("ViewManager");
		var widths=this.grid.managers.getPlus(viewManager,'getRowBarWidth');
		var _twidth=1;
		if(widths&&widths.length>0){
		 	for(var i=0;i<widths.length;i++){
				var _mw=widths[i];
				if(typeof _mw =="function"){
					_twidth+=_mw.call();
				}else if(typeof _mw =="number"){
					_twidth+=_m;
				}
			}
		 }
		 if(!this.rowNumber&&_twidth!=1){
		 	return _twidth+"px";
		 }
		 return (width+_twidth)+"px";
	},
	
	dispatchHeaderEvent: function(e) {
		if (this.headerEvtHandler.length>0) {
    		for (var i=0, p; p=this.headerEvtHandler[i]; i++) {
    			p.apply(this, [e]);
    		}
    	} else {
    		this.inherited(arguments);
    	}
	},
	
	dispatchContentEvent: function(e) {
		//this.contentEvtHandler的修改见SelectionPatch.js中的doPatch方法
		if (this.contentEvtHandler.length>0) {
			for (var i=0, p; p=this.contentEvtHandler[i]; i++) {
    			p.apply(this, [e]);
    		}
		}
		var index=Number(e.rowIndex);
		if(e.type == "mouseover" && typeof(index)!='undefined'){
			this.grid.managers.get('RowManager').setOverRow(index);
		}
		//返回为true,见Grid.js中的dispatchContentEvent方法
		//这样就只执行e.sourceView.dispatchContentEvent(e)不执行this._dispatch(e.dispatch, e);
		return true;
	}
});