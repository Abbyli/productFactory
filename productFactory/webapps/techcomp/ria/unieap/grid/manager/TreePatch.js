dojo.provide("unieap.grid.manager.TreePatch");
dojo.declare("unieap.grid.manager.TreePatch", null, {
	constructor: function(inGrid) {
		this.grid = inGrid;
	},
	
	doPatch: function(inComponent) {
		if (inComponent.declaredClass=="unieap.grid.manager.ViewManager") {
			for (func in this.patches[inComponent.declaredClass]) {
				if (func=="refreshRow") {
					inComponent[func] = dojo.hitch(inComponent, this.patches[inComponent.declaredClass][func]);
				} else {
					inComponent[func+"List"].push(this.patches[inComponent.declaredClass][func]);
				}
			}
		} else {
			dojo.mixin(inComponent, this.patches[inComponent.declaredClass])
		}
		
	},
	
	patches: {
		"unieap.grid.manager.ViewManager": {
			prerender: function() {
				var tree = this.grid.managers.get("TreeManager");
				var rowData = tree.toRowData();
				this.grid.getBinding().setRowData(rowData);
				this.grid.getBinding().getInternalRowSet().reset();
				this.grid.getBinding().getInternalRowSet().addRows(rowData,null,true);
		    }
		},
		
		"unieap.grid.Cell": {
			
			format: function(inRowIndex, data) {
				if(data){
					//如果有数据 则不需要通过inRowIndex去取,用于锁定行
					value=(this.name in data)?data[this.name]:'';
				}else{
					var value = this.get ? unieap.fireEvent4Widget(this,this.grid,this.get,[inRowIndex]) : this._get(inRowIndex);
				}
				
				value = this._format(value, inRowIndex);
				return value;
			},
			
			extraFormat: function(inRowIndex, inValue) {
				var value = inValue;
				var row = this.grid.getBinding().getRow(inRowIndex);
				if(row){
					var tree = this.grid.managers.get("TreeManager");
					value = tree.formatNode(row, value);
				}

				return value;
			}
		}
		
	}
});