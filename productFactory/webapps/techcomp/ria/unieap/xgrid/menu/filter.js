dojo.provide('unieap.xgrid.menu.filter');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require('unieap.menu.Menu');

dojo.declare("unieap.xgrid.menu.filter", unieap.xgrid.manager.Manager, {
	
	constructor: function(params){
		
		dojo.mixin(this,params)
		this.menuManager = this.grid.getManager("MenuManager");
		this.menu=this.menuManager.getMenu();
		this.initMenuItems();
		this.grid.connect(this.grid,'onStoreChanged',dojo.hitch(this,function(){
			this.onStoreChanged();
		}));
		this.subscribe("itemStatus",this,"filterItemStatus");
	  },
	  

	//初始化注入菜单的菜单项
	initMenuItems:function(){
		var self=this;
		this.filterItem = new unieap.menu.MenuItem({
        	'label': RIA_I18N.xgrid.filter.filter,
			'onClick':	function(e){
				self.onFilterClick(e);
			},
			'iconClass':'u-xgird-menu-filtericon'
 		});	
 		this.cancelFilterItem = new unieap.menu.MenuItem({
 			//清除本列过滤
        	'label': RIA_I18N.xgrid.filter.clearColumn,
			'onClick': function(e){
				self.onCancelFilterClick(e);
			}
 		});	
 		this.cancelGridFilterItem = new unieap.menu.MenuItem({
			//清除表格过滤
        	'label': RIA_I18N.xgrid.filter.clearGrid,
			'onClick':function(e){
				self.onCancelGridFilterClick(e);
			}
	     });			
	    this.publish("injectMenuItem",[[this.filterItem,this.cancelFilterItem,this.cancelGridFilterItem]]);
	},
	
	//更新过滤菜单状态
	filterItemStatus: function(){
		var pubCancelFilterItem = [],
			pubCancelGridFilterItem = [],
			pubFilterItem = [],
			layoutmanager = this.grid.getManager('LayoutManager'),
			cell=this.menuManager.getCell(),
			cells=layoutmanager.cells,
			filterManager = this.grid.getFilterManager();
		pubCancelFilterItem.menuItem = this.cancelFilterItem;
		pubCancelGridFilterItem.menuItem = this.cancelGridFilterItem;
		pubFilterItem.menuItem = this.filterItem;
		//过滤的状态
		if(cell&&cell.name&&!cell.isMulTitle && filterManager._validateMenu(cell)){
			pubFilterItem.flag = false;
			//如果以后还需要往menu内加元素，需要修改此处逻辑
			this.menu.addChild(this.cancelGridFilterItem,0);
			this.menu.addChild(this.cancelFilterItem,0);
			this.menu.addChild(this.filterItem,0);
		}else{
			pubFilterItem.flag = true;
			this.publish("reinjectMenuItem",[[this.filterItem,this.cancelFilterItem,this.cancelGridFilterItem]]);
		}
		//本列过滤的状态
		if(cell&&cell.filter&&cell.name&&!cell.isMulTitle && filterManager._validateMenu(cell)){
			pubCancelFilterItem.flag = false;
		}else{
			pubCancelFilterItem.flag = true;
		}
		//表格过滤的状态
		var cellsfilter=dojo.some(cells,function(cell){
			return !!cell.filter;
		})
		if(cellsfilter&&filterManager._validateMenu(cell)){
			pubCancelGridFilterItem.flag = false;
		}else{
			pubCancelGridFilterItem.flag = true;
		};
		
		this.publish("setItemStatus",[pubFilterItem]);
		this.publish("setItemStatus",[pubCancelFilterItem]);
		this.publish("setItemStatus",[pubCancelGridFilterItem]);
	},
	
	//datastore改变时取消当前的过滤
	onStoreChanged:function(){
		var layoutmanager=this.grid.getManager('LayoutManager');
		cells=layoutmanager.cells;
		dojo.forEach(cells,function(cell){
			cell.filter=null;
		})
		this.grid.getFilterManager()._updateCells();
	},

	//点击过滤菜单
	onFilterClick:function(e){
		dojo.require("unieap.dialog.Dialog");
        dojo.require("unieap.dialog.DialogUtil");
        var cell, dialog, title, filterDialog,self=this;
        cell = this.menu.cell;
        title = unieap.getText("xgrid.filter.configure",[cell.label]);
        filterDialog = this.getFilterDialog(cell);
        dialog = new unieap.dialog.Dialog({
			isExpand:false,
			resizable:false,
            inner: filterDialog.domNode,
            title: title,
			width:'420',
			height:'220',
			iocnCloseComplete:true,
			onComplete:function(){
				filterDialog.destroy();
			}
        });
		filterDialog.dialog=dialog;
        dialog.show(e.target)
        dijit.popup.close(this.menu);
	},
	
	//取消本列过滤
	onCancelFilterClick:function(){
		var cell = this.menuManager.getCell();
		this.grid.getFilterManager().cancelFilter(cell);
	},
	
	//取消grid过滤
	onCancelGridFilterClick:function(){
		this.grid.getFilterManager().cancelFilter();
	},

    
    //创建filter对话框
    getFilterDialog: function(cell){
       	return new unieap.xgrid.FilterDialog({cell:cell});
    },
	
	//销毁组件
	destroy:function(){
		this.filterItem.destroy();
		this.cancelFilterItem.destroy();
		this.cancelGridFilterItem.destroy();
	}	
});

dojo.declare("unieap.xgrid.FilterDialog", [dijit._Widget, dijit._Templated], {
    templateString: '<div class="u-xgrid-filter-body"><div class="u-xgrid-filter" >'+
						'<table class="u-xgrid-filter-table" cellPadding="0" cellSpacing="0">' +
							'<colgroup>'+
								'<col style="width: 80px;"/>' +
								'<col style="width: 180px;"/>' +
								'<col style="width: 40px;"/>' +
								'<col style="width: 20px;"/>' +
							'</colgroup>' +
	    					'<tbody dojoAttachPoint="tBodyNode,containerNode">'+
								'<tr dojoAttachPoint="separatorNode">'+
									'<td colspan="4">'+
										'<span class="u-menu-item-separator"></span>'+
									'</td>'+
								'</tr>'+
								'<tr>'+
									'<td colspan="4" align="right">'+
										'<span dojoAttachPoint="okBtn" class="u-xgrid-filter-ok"></span>'+
										'<span dojoAttachPoint="cancelBtn" class="u-xgrid-filter-cancel"></span>'+
									'</td>'+
								'</tr>'+
							'</tbody>' +
						'</table>'+
					'</div></div>',
	
	//所在的列				
	cell:null,
	
	//所在的dialog变量
	dialog:null,
	
	//本列的过滤条件
	conditions:null,
	
	//本列列名
	name:"",
	
	//本列编辑器class
	widget:'',
	
	//本列数据类型
	dataType:"",
	
	operators:[
				['=',RIA_I18N.xgrid.filter.eq,'number,date,string'], //等于
				['!=',RIA_I18N.xgrid.filter.neq,'number,date,string'], //不等于
				['>',RIA_I18N.xgrid.filter.gt,'number,date'],//大于
				['>=',RIA_I18N.xgrid.filter.gte,'number,date'],//大于等于
				['<',RIA_I18N.xgrid.filter.lt,'number,date'],//小于
				['<=',RIA_I18N.xgrid.filter.lte,'number,date'],//小于等于
				['like',RIA_I18N.xgrid.filter.include,'string'],//包含
				['not like',RIA_I18N.xgrid.filter.exclude,'string'],//不包含
				['is null',RIA_I18N.xgrid.filter.empty,'number,date,string'],//为空
				['is not null',RIA_I18N.xgrid.filter.notempty,'number,date,string'] //不为空
			],
	
	widgets:{
		'number':'unieap.form.NumberTextBox',
		'string':'unieap.form.TextBox',
		'boolean':null,
		'date':'unieap.form.DateTextBox'
	},
	
	/*
	 * 过虑对话框事件绑定的句柄
	 */
	_connectHandlers: null,
	
	postCreate:function(){
		this.init();
		dojo.attr(this.okBtn,'title',RIA_I18N.xgrid.filter.confirm);
		dojo.attr(this.cancelBtn,'title',RIA_I18N.xgrid.filter.cancel);
		this._connectHandlers.push(dojo.connect(this.okBtn,'onclick',this,'apply'));
		this._connectHandlers.push(dojo.connect(this.cancelBtn,'onclick',this,'cancel'));
	},
	getWidget:function(){
		if(this.cell&&this.cell.decoder){
			var decoder=this.cell.decoder;
			var displayAttr=decoder.displayAttr||"CODENAME";
			var valueAttr=decoder.valueAttr||"CODEVALUE";
			this.widgetParameter=" dataProvider=\"{store:'"+decoder.store+"'}\"  decoder=\"{displayAttr:'"+displayAttr+"',valueAttr:'"+valueAttr+"'}\""
			return "unieap.form.ComboBox";
		}
		return this.widgets[this.dataType];
	},
	//初始化
	init:function(){
		this._connectHandlers = [];
		this.conditions=this.cell['filter'];
		this.name=this.cell['name'];
		this.id=this.cell['id'];
		this.dataType=this.cell['dataType']||this.getDataType(this.name)||'string';
		this.widget=this.getWidget(this.dataType);
		if(this.widget){
			dojo.require(this.widget);
		}
		if(this.conditions){
			this.createConditions(this.conditions);
		}else{
			this.createCondition();
		}
	},
	
	//应用 收集过滤信息 关闭dialog
	apply:function(){
		var validate=dojo.query('[widgetId]', this.containerNode).every(function(widget) {
			widget=dijit.byNode(widget)||widget;
			if(widget.disabled){
				return true;
			}
			var validator = widget.getValidator();
			return validator?  validator.validate() : true;
		});
		if(!validate){
			return;
		}
		this.doFilter();
	},

	//取消,删除所有条件,并初始化第一个条件
	cancel:function(){
		while (this.separatorNode != this.containerNode.childNodes[1]) {
			//循环删除第二个条件
			this.deleteCondition(this.containerNode.childNodes[1]);
		}
		//初始化第一个条件
		var tr=this.containerNode.childNodes[0];
		var nodes=this.getNodesByTr(tr);
		nodes[0].value='=';
		nodes[1]&&!nodes[1].disabled&&nodes[1].setValue("");
		nodes[2].value="";
	},
	
	
	//从一个tr中取得由各个node组成的数组
	getNodesByTr:function(tr){
		var operatorNode=tr.childNodes[0].childNodes[0],
			widgetNode=tr.childNodes[1].childNodes[0],
			andorNode=tr.childNodes[2].childNodes[0],
			deleteNode=tr.childNodes[3].childNodes[0];
		return[operatorNode,dijit.byNode(widgetNode),andorNode,deleteNode];
	},
	
	
	//进行过滤
	doFilter:function(){
		//this.grid = this.cell.grid;
		var filter={},childrens=this.containerNode.childNodes;
		filter.condition={};
		filter.pattern="";
		for(var i=0,l=childrens.length;i<l&&i<(l-2);i++){
			var filterObject=this.getFilterObject(childrens[i]);
			filter.condition["condition"+(this.id||this.name)+i]=filterObject.condition;
			filter.pattern+=" ${condition"+(this.id||this.name)+i+"} ";
			if(i!=(l-3)){
				filter.pattern+=filterObject.andor;
			}
		}
		var grid=this.cell.grid;
		grid.getManager('FilterManager').setFilter(this.cell,filter);
		this.dialog.close();
		grid.getFilterManager().doFilter();
	},
	
	//根据条件 创建节点
	createCondition:function(condition){
		var tr=dojo.create('tr',null,this.separatorNode,'before');
		this.createTrNode(tr,condition);
		dojo.parser.parse(tr);
		var nodes=this.getNodesByTr(tr);
		
		var operatorChange=function(e){
			if(nodes[0].value=="is null"||nodes[0].value=="is not null"){
				//当nodes[0]的value值不是"is null"或者"is not null",focus到文本框然后再blur文本框
				//会出现红色叹号。当value值为"is null"时,需要清除红色叹号
				nodes[1]&&nodes[1]._setRequired(false)&&nodes[1].getValidator().validate()&&nodes[1].setDisabled(true);
			}else{
				nodes[1]&&nodes[1]._setRequired(true)&&nodes[1].setDisabled(false);
			}
		}
		operatorChange();
		this._connectHandlers.push(dojo.connect(nodes[0],'onchange',operatorChange));
		this._connectHandlers.push(dojo.connect(nodes[2],'onchange',dojo.hitch(this, function(e){
			this.addCondition(tr);
			nodes[2].childNodes.length>2&&nodes[2].removeChild(nodes[2].childNodes[0]);
		})));
		this._connectHandlers.push(dojo.connect(nodes[3],'onclick',dojo.hitch(this, function(){
			this.deleteCondition(tr);
		})));
	},
	
	//增加一个条件
	addCondition:function(conditionNode,condition){
		if(conditionNode&&conditionNode.nextSibling!=this.separatorNode){
			return;
		}
		if(this.containerNode.childNodes.length>6){
			return;
		}
		this.createCondition(condition);
	},
	
	//根据过滤条件创建
	createConditions:function(filter){
		var conditions=filter.condition;
	
		var patterns=filter.pattern.split(" ");
		patterns=dojo.filter(patterns,function(v){
			return v!=""
		});
		var andors={};
		dojo.forEach(patterns,function(v,index){
			if(v.indexOf('${')!=-1&&index+1<patterns.length){
				andors[v]=patterns[index+1]
			}
		})
		for(var condition in conditions){
			this.addCondition(null,{
				relation:conditions[condition].relation,
				value:conditions[condition].value||"",
				andor:andors["${"+condition+"}"]||" "
			})
		}
	},
	
	//删除一个条件 销毁对应的组件
	deleteCondition:function(conditionNode){
		if(this.containerNode.childNodes.length<=3){
			return;
		}
		dojo.query('[widgetId]', conditionNode).forEach(function(node){
			var w=dijit.byNode(node);
			w&&w.destroy();
		});
		dojo.destroy(conditionNode);
	},
	
	
	//收集过滤信息
	getFilterObject:function(conditionNode){
		var condition={},andor='and';
		var	relationNode= conditionNode.childNodes[0].childNodes[0],
			valueNode=conditionNode.childNodes[1].childNodes[0],
			andorNode=conditionNode.childNodes[2].childNodes[0];
		condition.name=this.name;
		condition.relation=relationNode.value;
		condition.value= (dijit.byNode(valueNode)&&dijit.byNode(valueNode).getValue());
		if(this.dataType=='number'){
			condition.value=Number(condition.value);
		}else if(this.dataType=="date"){
			if (this.cell.displayFormatter) {
				var dataFormat = this.cell.displayFormatter.dataFormat;
				condition.dataFormat=dataFormat;
			}else{
				condition.dataFormat="yyyy-MM-dd";
			}
		}
		andor=andorNode.value||" ";
		return {condition:condition,andor:andor};
	},

	
	//根据条件 创建一行组件
	createTrNode:function(tr,condition){
		dojo.create('td',{innerHTML:this.getOperatorInner(condition)},tr);
		dojo.create('td',{innerHTML:this.getWidgetInner(condition),'align':'left'},tr);
		dojo.create('td',{innerHTML:this.getAndorInner(condition)},tr);
		dojo.create('td',{innerHTML:this.getDelInner()},tr);
	},
	
	
	//创建删除按钮
	getDelInner:function(){
		return "<span class='u-xgrid-filter-del'></span>"
	},
	
	getOperatorInner:function(condition){
		var inner=[],dataType=this.dataType,self=this;
		inner.push("<select style='width:125px;margin-right:2px'>");
		dojo.forEach(this.operators,function(operator){
			if(operator[2].indexOf(dataType)!=-1&&self.isOperator(operator)){
				if(condition&&operator[0]==condition.relation){
					inner.push("<option SELECTED value='"+operator[0]+"'>"+operator[1]+"</option>");
				}else{
					inner.push("<option value='"+operator[0]+"'>"+operator[1]+"</option>");
				}
			}
		});
		inner.push("</select>");
		return inner.join("");
	},
	
	//合法的条件关系
	isOperator:function(operator){
		if(this.widget=='unieap.form.ComboBox'){
			//combobox没有 包含 不包含
			if(operator[0]=='link'||operator[0]=='not like'){
				return false;
			}
		}	
		return true;
	},
	
	getWidgetInner:function(condition){
		var inner='';
		if(this.widget){
			inner+="<div dojoType='"+this.widget+"' required='true'";
			if(condition&&condition.value){
				inner+=" value="+condition.value;
			}
			if(this.dataType=="date"){
				if (this.cell.displayFormatter) {
					var dataFormat = this.cell.displayFormatter.dataFormat;
					inner+=" displayFormatter=\"{dataFormat:'"+dataFormat+"'}\"";
				}
			}
			inner+=this.widgetParameter||"";
			inner+=" width='162px'></div>";
		}else{
			inner="<div  style='width:162px' ></div>";
		}
		return inner;
	},
	getAndorInner:function(condition){

		var inner=[];
		inner.push("<select style='width:48px;margin-left:2px'>");
		if(condition&&condition.andor=='||'){
			inner.push("<option  value='&&'>"+RIA_I18N.xgrid.filter.and+"</option>");
			inner.push("<option SELECTED value='||'>"+RIA_I18N.xgrid.filter.or+"</option>");
		}else if(condition&&condition.andor=='&&'){
			inner.push("<option  SELECTED value='&&'>"+RIA_I18N.xgrid.filter.and+"</option>");
			inner.push("<option  value='||'>"+RIA_I18N.xgrid.filter.or+"</option>");
		}else{
			inner.push("<option  value=' ' SELECTED></option>");
			inner.push("<option  value='&&'>"+RIA_I18N.xgrid.filter.and+"</option>");
			inner.push("<option  value='||'>"+RIA_I18N.xgrid.filter.or+"</option>");
		}
		inner.push("</select>");
		return inner.join("");
	},
	
	//得到数据类型
	getDataType:function(name){
		var metaData=this.cell.grid.getBinding().getRowSet().getMetaData(name);
		if(metaData) {
			var type=metaData.getDataType();
			dojo.require('unieap.util.util');
			return unieap.getDataType(type);
		}
	},
	
	//销毁组件
	destroy:function(){
		while(this._connectHandlers.length>0) {
			dojo.disconnect(this._connectHandlers.pop());
		}
		dojo.query('[widgetId]', this.containerNode).forEach(function(node){
			var w=dijit.byNode(node);
			w&&w.destroy();
		});
		this.inherited(arguments);
	}
});
