dojo.provide('unieap.grid.manager.XTreeManager');

dojo.declare("unieap.grid.manager.XTreeManager", null, {

//平面化的treeGrid，暂命名为xTreeGrid
	
	ui: {
		id: true,
		parent: true,
		label: true,
		leaf: true,
		query: true,
		isLazyTree: true,
		expandOnLoad: true,
		_baseRS: true,
		setDataStore: true,
		 
		events: {
			getLeafIconClass: true,
			rpc: true
		}
	},
	
	
	
	/**
	 * @summary:
	 * 		treeGrid中对应数据的标识字段
	 * @type:
	 * 		{string}
	 * @default:
	 * 		null
	 */
	id: null,
	
	/**
	 * @summary:
	 * 		treeGrid中标识父节点的字段名 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		null
	 */	
	parent: null,
	
	/**
	 * @summary:
	 * 		treeGrid中显示为树节点的字段名，建议选择第一列 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		null
	 */	
	label: 'label',
	
	/**
	 * @summary:
	 * 		treeGrid中标识叶子节点的字段名 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		null
	 */	
	leaf: null,
	
	/**
	 * @summary:
	 * 		treeGrid中构建第一层节点的查询条件 
	 * @type:
	 * 		{object}
	 * @default:
	 * 		{
	 * 			name: null,
	 *	     	relation: '=',
	 *			value: null
	 * 		}
	 */	
	query: {
		name: 'parentId',
		relation: '=',
		value: null
	},
	
	/**
	 * @summary:
	 * 		treeGrid是否为懒加载 
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 */	
	isLazyTree: false,
		
	/**
	 * @summary:
	 * 		treeGrid加载后是否全展开,懒加载模式无效 
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 */	
	expandOnLoad: false,
	
	/**
	 * @summary:
	 * 		treeGrid中非叶子节点的展开状态图标 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		'u-grid-treegrid-openedIcon-default'
	 */	
	openNodeIconClass: 'u-grid-treegrid-openedIcon-default',
	
	/**
	 * @summary:
	 * 		treeGrid中非叶子节点的收起状态图标 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		'u-grid-treegrid-closedIcon-default'
	 */	
	closeNodeIconClass: 'u-grid-treegrid-closedIcon-default',
	
	/**
	 * @summary:
	 * 		treeGrid中叶子节点的默认图标 
	 * @type:
	 * 		{string}
	 * @default:
	 * 		'u-grid-treegrid-leafIcon-default'
	 */		
	leafNodeIconClass: 'u-grid-treegrid-leafIcon-default',

	/**
	 * @summary:
	 * 		自定义叶子节点的图标 
	 * @param:
	 * 		{object} rowData 当前行的数据
	 * @return:
	 * 		{string}
	 */		
	getLeafIconClass: function(rowData){
	},
	
	/**
	 * @summary:
	 * 		懒加载时，自定义查询子节点的请求 
	 */		
	rpc:null,
	
	//用于缓存数据，现行的是rowSet对象，注意要clone！
	_baseRS: null,
	
	constructor: function(param) {

		dojo.mixin(this, param);
		this.connects = [];

		this.connects.push(dojo.connect(this.grid.managers.get("ViewManager"), "_doClick", this, "_doExpand"));

	},
	


	/**
	 * @summary：
	 * 		动态设置叶子节点的图标class
	 * @param:
	 * 		{object} rowData 当前行的数据
	 * @return:
	 * 		{string}
	 */
	getLeafIconClass: function(rowData){
		
	},
	
	/**
	 * @summary：
	 * 		为xTreeGrid设置数据源
	 * @param:
	 * 		{object} ds 新数据源
	 */
	setDataStore: function(ds){
		this._baseRS = null;
		if(this.isLazyTree){
				this._baseRS = ds.getRowSet().clone();
				this.grid.getBinding().setDataStore(ds);
		}else{
			if (this.expandOnLoad) {
				var newDS = this._getAllExpandedDataStore(ds);
				this.grid.getBinding().setDataStore(newDS);
			} else {
				var newDataStore = this._getRootsDataStore(ds);
				this.grid.getBinding().setDataStore(newDataStore);
			}
		}
		this.grid.managers.get("ViewManager").refresh();
	},
	
	//根据行号获取该行的数据
	_getRowDataByRowIndex: function(inRowIndex){
		return this.grid.getBinding().getRowSet().getRowData(inRowIndex) || null;
	},
	
	//根据rowData得到深度,根节点的depth为1
	_getDepthByRowData: function(rowData){
		var relation = this.query.relation;
        var itemName = this.query.name;
        var itemValue = this.query.value;

        var parentId = rowData[itemName];
        var depth = 1;

        if (relation == '=') {
            while (parentId != itemValue) {
                var rowData = this._getRowDataByNodeId(parentId);
                parentId = rowData[itemName];
                depth++;
            }
            return depth;
        }
        else {
            while (parentId.indexOf(itemValue) == -1) {
                var rowData = this._getRowDataByNodeId(parentId);
                parentId = rowData[itemName];
                depth++;
            }
            return depth;
        }
	},
	
	//根据节点ID获得rowData
	_getRowDataByNodeId: function(nodeId){
		var rowSet = this.grid.getBinding().getRowSet();
        var result = null;
        for (var i = 0, count = rowSet.getRowCount(); i < count; i++) {
            if (rowSet.getItemValue(i, this.id) == nodeId) {
                result = rowSet.getRowData(i);
                break;
            }
        }
        return result;
	},
	
	//判断当前行是否已经展开
	_isNodeExpanded: function(rowData, inRowIndex){
		if (rowData[this.leaf]) {
            return false;
        }
        else {
            var rowCount = this.grid.getBinding().getRowSet().getRowCount() - 1;
            if (inRowIndex == rowCount) {
                return false;
            }
            else {
                var nextRowData = this._getRowDataByRowIndex(inRowIndex + 1);
                if (rowData[this.id] == nextRowData[this.parent]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
	},
	
	//根据节点的ID获取其子节点的数据
	_getChildrenRowDatasByNodeId: function(nodeId) {
        var result = [];
        var rowCount = this._baseRS.getRowCount();
        var row = null;
        for (var i = 0; i < rowCount; i++) {
            rowData = this._baseRS.getRowData(i);
            if (nodeId == rowData[this.parent]) {
                result.push(rowData);
            }
        }
        return result;
    },
    
    //展开节点后的插入数据操作
	_insertRows: function(rows, inRowIndex) {
        var rowIndex = inRowIndex || this.grid.getRowManager().getCurrentRowIndex();
        var treeGridDS = this.grid.getBinding().getDataStore();
        var rowSet = new unieap.ds.RowSet(treeGridDS.getRowSet().getData());
        for (var i = 0, count = rows.length; i < count; i++) {
            rowSet.insertRow(rows.pop(), rowIndex);
        }
        treeGridDS.setRowSet(rowSet);
		var views = this.grid.managers.get("ViewManager");
		views.render(views.scrollTop);
    },
    
    //收起节点时删除子孙节点
	_deleteRows: function(rowData, inRowIndex) {
        var rowIndex = inRowIndex || this.grid.getRowManager().getCurrentRowIndex();
        var parentId = rowData[this.parent];
        var delRowIndexs = this._getRowIndexsToDeleteByparentId(parentId, rowIndex);
        this.grid.getBinding().deleteRows(delRowIndexs);
		var views = this.grid.managers.get("ViewManager");
		views.render(views.scrollTop);
    },
    
    //根据parentId获得需要删除的rowIndexs，为安全起见是倒叙的index
    //删除逻辑共有三个 详情请见下文
	_getRowIndexsToDeleteByparentId: function (parentId, inRowIndex) {
        var treeGridRS = this.grid.getBinding().getRowSet();
        var result = 0;
        var results = [];
        var relation = this.query.relation;
        var itemName = this.query.name;
        var itemValue = this.query.value;
        //情况1：收起的节点有nextBrother，则选择当前节点的下一个同父节点
        for (var i = inRowIndex + 1,count = treeGridRS.getRowCount(); i < count; i++) {
            if (treeGridRS.getItemValue(i, this.parent) == parentId) {
                result = i;
                break;
            }
        }
        //情况2：当情况1没有找到时，收起节点可能为“幺节点”（兄弟中最小一个），这时寻找下一个根节点
        if (result == 0) {
            if (relation == "=") {
                for (var i = inRowIndex + 1, count = treeGridRS.getRowCount(); i < count; i++) {
                    if (treeGridRS.getItemValue(i, itemName) == itemValue) {
                        result = i;
                        break;
                    }
                }
            }
            else {
                for (var i = inRowIndex + 1, count = treeGridRS.getRowCount(); i < count; i++) {
                    if (treeGridRS.getItemValue(i, itemName).indexOf(itemValue) > -1) {
                        result = i;
                        break;
                    }
                }
            }
        }
        //情况3：情况1和2都不满足 证明它是“幺根”的“幺节点” 一删到底
        if (result == 0) {
            result = treeGridRS.getRowCount();
        }
        //倒叙防错删
        for (var i = result - 1; i > inRowIndex; i--) {
            results.push(i);
        }
        return results;
    },
    
    //全加载时，用于取得根节点的DS
	_getRootsDataStore: function(ds) {
        this._baseRS = ds.getRowSet();
        var rowSet = ds.getRowSet();
        var relation = this.query.relation;
        var itemName = this.query.name;
        var itemValue = this.query.value;
        var newDataStore = ds.clone(this.grid.getBinding().getDataStore().getName());
        var newRowSet = newDataStore.getRowSet();
        newRowSet.deleteAllRows();
        newRowSet.resetUpdate();
        if (relation == "=") {
            for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
                if (rowSet.getItemValue(i, itemName) == itemValue) {
                    newRowSet.insertRow(rowSet.getRowData(i));
                }
            }
        }
        else {
            for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
                if (rowSet.getItemValue(i, itemName).indexOf(itemValue) > -1) {
                    newRowSet.insertRow(rowSet.getRowData(i));
                }
            }
        }
        return newDataStore;
    },
    
    //根据节点的ID得到节点的当前行号
	_getRowIndexByNodeId: function(nodeId){
        var result = null;
        var rowSet = this.grid.getBinding().getRowSet();
        for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
            if (rowSet.getRowData(i)[this.id] == nodeId) {
                result = i;
                break;
            }
        }
        return result;
    },
    
    //判断是否为叶子节点，懒加载时不可用
	_isLeaf: function(rowData){
        var rowSet = this._baseRS;
        var nodeId = rowData[this.id];
        var childParentId = null;
        var result = true;
        for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
            childParentId = rowSet.getRowData(i)[this.parent];
            if (childParentId == nodeId) {
                result = false;
                break;
            }
        }
        return result;
    },
    
    //懒加载时用于更新叶子节点的状态
    _updateIsLeaf: function(nodeId){
    	 var rowSet = this._baseRS;
    	 for(var i = 0,count = rowSet.getRowCount();i<count;i++){
    	 	if(rowSet.getItemValue(i,this.id)==nodeId){
    	 		rowSet.setItemValue(i,"_treeGridIsLeaf",true);
    	 		break;
    	 	}
    	 }
    },
//----------关键区:开始--------------------

	_doExpand: function (e) {
		if (!e.cell || isNaN(e.rowIndex) || e.rowIndex == null) {
			return;
		}
        var rowIndex = this.grid.getRowManager().getCurrentRowIndex();
        var rowData = this._getRowDataByRowIndex(rowIndex);
        var nodeId = rowData[this.id];
        var insertRows = null;
        var _self = this;
        //成功回调
        var callback = function(a,b){
        	var ds,dc;
			if(arguments.length==2){
				ds=a;
				dc=b;
			}else if(arguments.length==1){
				dc=a;
			}else{
				return;
			}
			!ds && (ds = dc.getSingleDataStore());
			//懒加载成功回调的逻辑
			var relation = _self.query.relation;
	        var itemName = _self.query.name;
	        var itemValue = _self.query.value;
	        var rowSet = ds.getRowSet();
	        var rowDatas = [];
	        if (rowSet.getRowCount() > 0) {
	            if (itemValue == rowSet.getRowData(0)[itemName] || rowSet.getRowData(0)[itemName].indexOf(itemValue) > -1) {
	                _self._baseRS = rowSet.clone();
	                _self.grid.setDataStore(ds);
	            } else {
	                rowDatas = rowSet.getData(unieap.ds.Buffer.PRIMARY);
	                for (var i = 0, count = rowDatas.length; i < count; i++) {
	                    _self._baseRS.addRow(rowDatas[i]);
	                }
	                var nodeIdX = rowDatas[0][_self.parent];
	                var rowIndexX = _self._getRowIndexByNodeId(nodeIdX);
	                _self._insertRows(rowDatas, rowIndexX + 1);
	            }
	        }else{
	        	_self.grid.getBinding().getDataStore().getRowSet().setItemValue(rowIndex,"_treeGridIsLeaf",true);
	        	_self.grid.getManager('ViewManager').refreshRow(rowIndex);
	        	_self._updateIsLeaf(nodeId);
	        }	
        }       
        try {
            switch (e.target.className) {
	            case 'u-grid-treegrid-plus':{
	                    insertRows = this._getChildrenRowDatasByNodeId(nodeId);
	                    if (insertRows.length == 0 && this.isLazyTree) {
	                        //发请求 this.rpc
	                       if(dojo.isFunction(this.rpc)){
	                       		this.rpc(rowData,callback,this.grid);
	                       }
	                    } else {
	                        this._insertRows(insertRows, rowIndex + 1);
	                    }
	                    break;
	                }
	            case 'u-grid-treegrid-minus':{
	                    this._deleteRows(rowData, rowIndex);
	                    break;
	                }
            }
        }
        catch (e) {}
    },
    
	_formatNode: function (inValue, inRowIndex) {
        var rowData = this._getRowDataByRowIndex(inRowIndex);
        var table = "<table cellspacing='0' cellpadding='0' class='u-grid-treegrid-celltable'><tr>",
            _table = "</tr></table>";
        var level = this._getDepthByRowData(rowData);
        //expand node
        var isLeaf = false;
        if(this.isLazyTree){
        	isLeaf = this.leaf ? rowData[this.leaf] : (rowData['_treeGridIsLeaf'] || false);
        }else{
        	isLeaf = this.leaf ? rowData[this.leaf] : this._isLeaf(rowData);
        }
        var isExpanded = this._isNodeExpanded(rowData, inRowIndex);
        var expandNode = "<td style='width:" + level*16 + "px;height:100%;' align='right'>";
        if (!isLeaf) {
            if (isExpanded) {
                expandNode += "<div class='u-grid-treegrid-minus' style='float:right;'></div></td>";
            }
            else {
                expandNode += "<div class='u-grid-treegrid-plus'  style='float:right;'></div></td>";
            }
        }
        else {
            expandNode = "";
        }
        //icon
        level++;
        var leafIcon = this.getLeafIconClass(rowData) || this.leafNodeIconClass;
        var iconNode = expandNode == "" ? ("<td style='width:" + level * 16 + "px;height:100%;' align='right'>") : "<td style='width:16px' align='left'>";
        if (isLeaf) {
            iconNode += "<div class='" + leafIcon + "' style='float:right;'></div></td>";
        }
        else if (isExpanded) {
            iconNode += "<div class='" + this.openNodeIconClass + "' style='float:right;'></div></td>";
        }
        else {
            iconNode += "<div class='" + this.closeNodeIconClass + "' style='float:right;'></div></td>";
        }
//        这块需要再处理一下
        var lineHeight = this.grid.managers.get('RowManager').defaultRowHeight-1;
        var css = "line-height:" + lineHeight + "px";
        var value = "<td>" +
        				"<div class='u-grid-text' style='" + css + "'>" +
        					"<div class='u-grid-text2'>" + inValue + "" +
        					"</div>" +
        				"</div>" +
        			"</td>";
        return table + expandNode + iconNode + value + _table;
    },
    
//----------关键区:结束-------------------

//----------默认全展开代码区：开始---------
    
    //记录从层次化转换到平面化时的数据
	_transResult: [],
    
    //默认全展开，用于构造全展开的DataStore
	_getAllExpandedDataStore: function(ds) {
        this._baseRS = ds.getRowSet().clone();
        var rootRowDatas = this._getRootRowDatas(ds);
        var result = this._addChildrenRowDatas(rootRowDatas);
        var resultRowDatas = this._transformRowDatas(result);
        var newDS = this.grid.getBinding().getDataStore();
        var newRowSet = new unieap.ds.RowSet(resultRowDatas);
        newDS.setRowSet(newRowSet);
        this._transResult = [];
        return newDS;
    },
    
    //获取roots的数据 返回值为[rowData,...]
	_getRootRowDatas: function(ds) {
        var rowSet = ds.getRowSet();
        var relation = this.query.relation;
        var itemName = this.query.name;
        var itemValue = this.query.value;
        var result = [];
        if (relation == "=") {
            for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
                if (rowSet.getItemValue(i, itemName) == itemValue) {
                    result.push(rowSet.getRowData(i));
                }
            }
        }
        else {
            for (var i = 0,count = rowSet.getRowCount(); i < count; i++) {
                if (rowSet.getItemValue(i, itemName).indexOf(itemValue) > -1) {
                    result.push(rowSet.getRowData(i));
                }
            }
        }
        return result;
    },
    
    //递归，为父节点数组逐个增加子节点数组
	_addChildrenRowDatas: function(parentRowDatas){
        var result = [];
        var children = [];
        var rowData = null;
        for (var i = 0,count = parentRowDatas.length; i < count; i++) {
            rowData = parentRowDatas[i];
            children = this._getChildrenRowDatasByNodeId(rowData[this.id]);
            rowData._treeGridChildren = children;
            if (children.length > 0) {
                children = this._addChildrenRowDatas(children);
            }
            result.push(rowData);
        }
        return result;
    },
    
    //递归，将层次化的rowDatas翻译成平面化的rowDatas
	_transformRowDatas: function(rowDatas){
        var result = this._transResult;
        var rowData = null;
        var children = [];
        for (var i = 0,count = rowDatas.length; i < count; i++) {
            rowData = rowDatas[i];
            children = rowData._treeGridChildren;
            result.push(rowData);
            if (children.length > 0) {
                children = this._transformRowDatas(children);
            }
            result.concat(children);
        }
        return result;
    }
    
//----------默认全展开代码区：结束---------
    
//----------------------------------------------------------------------------------------------------------	
	
});


