dojo.provide("unieapx.form.QuickSearch");
dojo.require("unieap.form.ComboBox");
dojo.declare("unieapx.form.QuickSearch", unieap.form.ComboBox, {

	UserInterfaces : dojo.mixin( {
		config : "string",
		autoDialog:"boolean",
		detailDialog : "string",
		onClear : "function",
		onBeforeQuery : "function",
		onComplete : "function",
		bindable : "boolean",
		onlySelect: "boolean",
		onBeforeSendQuery : "function"
	}, unieap.form.ComboBox.prototype.UserInterfaces),

	popupClass : "unieapx.form.QuickSearchPopup",
	width : "300px",
	/**
	 * @summary:
	 * 		选择选中的值后是否不清空控件
	 * @description:
	 * 		如果设置为false时，可以在onSelect事件中处理业务逻辑，而控件实际的值会被清空
	 * @type：
	 * 		{boolean}
	 */
	bindable : true,
	
	//是否支持手动输入
	onlySelect: true,
	
	/**
	 * @summary:
	 * 		自定义查询对话框id
	 * @description:
	 * 		可以自定义查询对话框，精确查找数据，该项为配置自定义查询对话框id
	 * @type：
	 * 		{string}
	 */
	detailDialog:"",
	
	iconClass : "quicksearchIcon",
	textValidate : false,
	comboShowSelect : false,
	
	//弹出窗口Dialog对象
	_dlg : null,
	//是否是用鼠标点击选中
	_isClick: false,
	//通过绑定数据和quicksearch查询只有一条数据直接赋值时，设置_isSetText为true
	_isSetText: false,
	//标示控件是否是通过选择得到的值，非选择得到的值在onBlur时清空控件的值
	_hasValue: false,
	
	
//	_isClearing: false,
	_selectedText: '',
	_oldValue:'',
	
	//--------------------------王凡--------------------------------------------
	autoDialog:true,
	_autoDialogModel:"formQuery",
	_autoDialogContent:null,
	quicksearchConfig:null,
	quicksearchStore:null,
	_autoDialog:null,
	_autoDialogGrid:null,
	_autoDialogQuery:null,
	_autoDialogGridPane:null,
	_autoDialogQueryPane:null,
	_autoDialogQueryButton:null,
	_autoDialogSelectButton:null,
	_autoDialogToolbar:null,
	_autoDialogPageSize:10,
	_autoDialogDataFormat:"yyyy-MM-dd",
	
	
	
	constructor: function(inView) {
		this.inherited(arguments);
	},

	postCreate : function() {
		this.connects = [];
		this._tooglePrompt();
		this._toogleIcon();
		this.connects.push(dojo.connect(this.getBinding(),'bind',this,'_bindText'));
		if(!this.bindable) this.onlySelect = false;
		this.inherited(arguments);
		this.autoDialog && this._getQuicksearchConfig();
	},
	
	_bindText: function(row){
		if(!row) return;
		this._onBindChange(row, true);
		if(0 == row.getRowSet().getRowCount()){
			this.getPopup()._clearSelection();
		}
	},
	
	_onBindChange: function(row, isbindText){
		var self = this;
		if(row.isItemChanged(self.getBinding().name) || ('undefined' != typeof isbindText) && true == isbindText){
			setTimeout(function(){
				var items = self.getDataProvider().getItems();
				if(self.onlySelect &&row.getItemValue(self.getBinding().name)&&self.inputNode && self.getText() ){
					//通过绑定数据和quicksearch查询只有一条数据直接赋值时，设置_isSetText为true
					self._isSetText = true;
				}else{
					self._isSetText = false;
				}
			},0);
		}
	},
	
	/*--------------------------wu.zb-------------------------------------*/
	_timeOut:null,//延迟发送数据请求的setTimeout处理
	_isDialogType:true,//是否是弹窗查询类型

	_isDelayQuery:true,
	_selectStore:null,
	delayTime:1,
	
	getSelectStore:function(){
		var displayAttr = this.getDecoder().displayAttr;
		var textValue = this.getText();
		if(textValue!=""){
			if(this._selectStore){
				var storeValue = this._selectStore.getRowSet().getItemValue(0,displayAttr);
				if(storeValue == textValue){
					return this._selectStore;
				}
			}
			return null;
		}else{
			return null;
		}
	},
	
	_openAutoQueryFlag:function(value,evt){
		var _self = this;
		var keyCode = evt.keyCode;
		if(keyCode != dojo.keys.ENTER && keyCode!=dojo.keys.DOWN_ARROW && keyCode!=dojo.keys.UP_ARROW && keyCode!=dojo.keys.TAB){
			this._timeOut = setTimeout(function(){
							_self._doAutoQuery(value);
					}, _self.delayTime*1000);
		}
	},
	
	_closeAutoQueryFlag:function(){
		clearTimeout(this._timeOut);
	},
	
	_doAutoQuery:function(value){
			this.getAutoCompleter()._sendQuery(value);
	},
	
	_onKeyUp:function(evt){
		if(this.disabled){
			dojo.stopEvent(evt);
			return;
		}
		if(this.onlySelect){
			var keyCode = evt.keyCode;
			if( ((this._isSetText && this.getText()!="" && !this.getPopup().isOpen()) || 
			    (keyCode != dojo.keys.ENTER &&this.getPopup()._isSelecting())) && 
			    ( keyCode!=dojo.keys.DOWN_ARROW && keyCode!=dojo.keys.UP_ARROW && keyCode!=dojo.keys.TAB)
					){
				dojo.stopEvent(evt);
				return ;
			}
		}
		if(this._isDelayQuery && this.getText() != ""){
			this._openAutoQueryFlag(this.getText(),evt);
		}
		
		this.inherited(arguments);
	},
	
	_onKeyDown: function(evt) {
		if(this.disabled){
			dojo.stopEvent(evt);
			return;
		}
		if(this.onlySelect){
			var keyCode = evt.keyCode;
			if( ((keyCode==dojo.keys.BACKSPACE && this.iconClass == "lemis-icon-formqsdel") || (this._isSetText && this.getText()!="" && !this.getPopup().isOpen()) || 
				    (keyCode != dojo.keys.ENTER &&this.getPopup()._isSelecting())) && 
				    ( keyCode!=dojo.keys.DOWN_ARROW && keyCode!=dojo.keys.UP_ARROW && keyCode!=dojo.keys.TAB)
						){
				dojo.stopEvent(evt);
				return ;
			}
			if(keyCode == dojo.keys.ENTER){
				this.getPopup()._handleKeyDown(evt);
				if(unieap.fireEvent(this,this.onEnter,[evt])==false) return;
				this._keyPressed = true;
				this._hasBlur = false;
				return;
			}
		}
		if(this._isDelayQuery){
			this._closeAutoQueryFlag();
		}
		this.inherited(arguments);
	},

	_interestInKeyCode : function(evt) {
		var keyCode = evt.keyCode;
		var popUpWidget = this.getPopup()
		if(popUpWidget.isOpen() && keyCode!=dojo.keys.DOWN_ARROW && keyCode!=dojo.keys.UP_ARROW && keyCode!=dojo.keys.ENTER ){
				if(!this._isDelayQuery){
					popUpWidget._clearSelection();
				}
				this._oldValue = this.getText();
				popUpWidget.close();
		}
		if(keyCode = dojo.keys.ENTER){
			return null;
		}else{
			return !((keyCode<2 && keyCode!=dojo.keys.BACKSPACE)
					|| (keyCode>=33 && keyCode<=46) 
					|| (keyCode>=112 && keyCode<=123)
					|| (evt.ctrlKey&&keyCode==65));
		}
	},

	setValue: function(value){
		if ((value === "" || value ===undefined)&& !this._isClick) {
			value = null;
			this.getPopup()._clearSelection();
		}
		if(this.getDecoder().valueAttr != this.getDecoder().displayAttr && this.getDataProvider().getDataStore() == null && value!=null){
			this.getAutoCompleter()._sendQuery(value,true,true);
		}else{
			this._setValue(value);
			!this.readOnly && this.getValidator().validate();
		}
	},
	
	onEnter : function(evt) {
		dojo.stopEvent(evt);
		if(this.disabled) return;
		if(this.iconClass == "lemis-icon-formqsdel") return false;
		if (this.readOnly || ((this.onlySelect) && this.getPopup()._isSelecting() && this.inputNode && this.getText()))
			return true;
		var p = this.getPopup();
		if (!p._selection || p._selection.length == 0 || p._selection[0][this.getDecoder().displayAttr] != this.getText() || this.getDataProvider().getDataStore() == null){
			if(this.autoDialog && !this.quicksearchConfig){
				this._getQuicksearchConfig("popup");
				return false
			}else{
				this._closeAutoQueryFlag();
				this.getAutoCompleter()._sendQuery(this.getText());
				return false
			}
		}
		return true;
	},

	_onFocus : function(evt) {
		if(this.disabled){
			dojo.stopEvent(evt);
			return;
		}
		this._tooglePrompt();
		this._hasBlur = false;
	},

	_onBlur : function(evt) {
		if (this.bindable) {
			this.inherited(arguments);
//			this.setValue(this.getText());
//			this.fireDataChange();
		}else{//不绑定数据的quicksearch当焦点离开的时候要设置为“”，然后在_tooglePrompt中改为提示信息
			this.setText("");
		}
//		if(this._hasBlur) return;
		if(this.onlySelect){
			if(this.getPopup()._isSelecting() || this._isSetText){
//				alert(" 保留 ");
			}else{
				if(this.getText()!='' &&  !this._hasValue && !this._isDelayQuery)	{
					this.setValue("");
				}
			}
		}
		this._tooglePrompt();
		if (!this.readOnly && this._interestInBlur(evt)) {
			 this.getValidator().validate();
		}
		this._hasBlur = true;

	},
	
	onBeforeShowDialog : function(dlg){
		return true;
	},

	getAutoCompleter : function() {
		return unieap.getModuleInstance(this, "autoCompleter", "unieapx.form.QuickSearchAutoCompleter");
	},

//	getValue : function() {
//		return this.getText();
//	},

	_onIconClick : function(evt) {
		if(this.disabled || this.readOnly){
			dojo.stopEvent(evt);
			return;
		}
		if(this.getPopup().isOpen()) {
			dojo.stopEvent(evt);
			return;
		}
		if (this.iconClass == "lemis-icon-formqsdel") {
			if (this.onClear)
				this.onClear(evt);
			this.clear();
			/////////////////sun
			this.getPopup()._clearSelection();
		} else if (this.detailDialog) {
			var dlg = this._getDialog();
			if(dlg && this.onBeforeShowDialog && this.onBeforeShowDialog(dlg))
				this._getDialog().show();
		}else if(this.autoDialog){
			if(!this.quicksearchConfig)
				this.quicksearchConfig = this._getQuicksearchConfig("dialog");
			else{
				this._createAutoDialog(this.quicksearchConfig,this.config);
			}
		}
	},

	_changeValue: function(value,isBind) {
		this.values = value==null?[]:value.toString().split(this.separator);
		this._updateText();
		this.fireDataChange();
		if(!isBind){
			this.getCascade().cascade();
		}
	},
	

	setText : function(value) {
		this.inherited(arguments);
		this._toogleIcon();
	},

	_toogleIcon : function() {
		if(this.bindable){
			if (this.getText() == "" || (this.getPromptManager() && this.getPromptManager().promptMsg && this.getText() == this.getPromptManager().promptMsg)) {
				this.setIconClass((this.autoDialog && (this.detailDialog || this._isDialogType))?"lemis-icon-formqsfind":"lemis-icon-formqsfind-dis");
			} else {
				this.setIconClass("lemis-icon-formqsdel");
			}
		}
		else
			this.setIconClass((this.autoDialog && (this.detailDialog || this._isDialogType))?"lemis-icon-formqsfind":"lemis-icon-formqsfind-dis");	
	},

	_tooglePrompt : function(widget) {
		if(!widget)
			widget=this;
		if (!widget.bindable && widget.getPromptManager() && widget.getPromptManager().promptMsg) {
			if (widget.focused) {
				if (widget.getText() == widget.getPromptManager().promptMsg) {
					dojo.removeClass(widget.inputNode, "quicksearchPrompt");
					widget.setText("");
				}
			} else {
				if (widget.getText() == "" && !widget.getPopup().isOpen()) {
					dojo.addClass(widget.inputNode, "quicksearchPrompt");
					widget.setText(widget.getPromptManager().promptMsg);
				}
			}
		}
	},
	
	clear : function() {
		this.setValue(null);
		this.setText(null);
		this._isSetText = false;
		this._hasValue = false;
	},

	_getDialog : function() {
		if (!this._dlg) {
			this._dlg = unieap.byId(this._rootID ? this._rootID + this.detailDialog : this.detailDialog);
			if(this._dlg == undefined && _currentNodeOfSingleFrame && _currentNodeOfSingleFrame.id){
				this._dlg = unieap.byId(_currentNodeOfSingleFrame.id + this.detailDialog);
				this._dlg.domNode.notApplyWidget=true;
			}
			var me = this;
			this._dlg.onComplete = function(ds) {
				if (ds) {
					if(!(ds instanceof unieap.ds.DataStore)) ds = unieap.fromJson(ds);
					me.setText(ds.getRowSet().getItemValue(0, me.getDecoder().displayAttr));
					me.setValue(ds.getRowSet().getItemValue(0, me.getDecoder().valueAttr));
//					!me.readOnly && me.getValidator().validate();
					me.onComplete(ds);
					if (!me.bindable) {
						me.clear();
					}
					me._tooglePrompt();
				}
			}
		}
		return this._dlg;
	},
	
	onComplete: function(){
	},
	destroy: function(){
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
		if(this.autoDialog){
			this.destroyAutoDialog();
		}
		this.inherited(arguments);
	},
	
	
	destroyAutoDialog:function(){
		if(this._autoDialogGrid){
			this._autoDialogGrid.destroy();
			this._autoDialogGrid=null;
		}
		if(this._autoDialogQuery){
			this._autoDialogQuery.destroy();
			this._autoDialogQuery=null;
		}
		if(this._autoDialogGridPane){
			this._autoDialogGridPane.destroy();
			this._autoDialogGridPane=null;
		}
		if(this._autoDialogQueryPane){
			this._autoDialogQueryPane.destroy();
			this._autoDialogQueryPane=null;
		}
		if(this._autoDialogQueryButton){
			this._autoDialogQueryButton.destroy();
			this._autoDialogQueryButton=null;
		}
		if(this._autoDialogSelectButton){
			this._autoDialogSelectButton.destroy();
			this._autoDialogSelectButton=null;
		}
		if(this._autoDialogToolbar){
			this._autoDialogToolbar.destroy();
			this._autoDialogToolbar=null;
		}
		if(this._autoDialog){
			this._autoDialog.destroy();
			this._autoDialog=null;
		}
	},
	
	//王凡添加
	_getQuicksearchConfig:function(type,sQuery,unBindStore){
		var config = this.config;
		if(!config) return;
		var _self = this;
		var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
	    var dc=new unieap.ds.DataCenter();
		dc.setParameter("_boId", "ria_quicksearch.business.xml_bo");
		dc.setParameter("_methodName", "fdframework.unieap.ria.getQuickSearchConfig");
		dc.setParameter("_methodParameterTypes", "java.lang.String");
		dc.setParameter("id", config);
	    dc.setParameter("_parameters", "id");
	    dc.setParameter("_parameterTypes", "string");
	    unieap.Action.requestData({
	    	url:url,
	    	sync:false,
	    	load:function(dc){
			    if(_self._isQuerySucceed(dc)){
			    	_self.quicksearchStore = dc.getSingleDataStore();
			    	var row = dc.getSingleDataStore().getRowSet().getRow(0);
			    	if(row){
				    	var max = row.getItemValue("max");
				    	var dialogMax = row.getItemValue("dialogMax");
				    	var structure = row.getItemValue("structure");
				    	var queryConfig = row.getItemValue("queryConfig");
				    	var valueAttr = row.getItemValue("valueAttr");
				    	var displayAttr = row.getItemValue("codeAttr");
				    	var queryMode = row.getItemValue("queryMode");
				    	var dialogType = row.getItemValue("dialogType");
				    	var dataSource = row.getItemValue("dataSource");
				    	var popupWidth = row.getItemValue("popupWidth");
//				    	var queryHql = row.getItemValue("queryHql");
//				    	var querySql = row.getItemValue("querySql");
				    	var businessId = row.getItemValue("businessId");
//				    	
//				    	if(queryHql){
//				    		if(!_self.quicksearchConfig){
//				    			_self.quicksearchConfig = {};
//				    		}
//				    		_self.quicksearchConfig["queryHql"] = queryHql;
//				    	}else if(querySql){
//				    		if(!_self.quicksearchConfig){
//				    			_self.quicksearchConfig = {};
//				    		}
//				    		_self.quicksearchConfig["querySql"] = querySql;
//				    	}
				    	
				    	//展现模式：form或者advanceQuery
				    	var model = row.getItemValue("dialogType") || "formQuery";
				    	if(businessId){
				    		if(!_self.quicksearchConfig){
				    			_self.quicksearchConfig = {};
				    		}
				    		_self.quicksearchConfig["businessId"] = businessId;
				    	}
				    	if(max){
				    		if(!_self.quicksearchConfig){
				    			_self.quicksearchConfig = {};
				    		}
				    		_self.quicksearchConfig["max"] = max;
				    	}
				    	if(dataSource){
				    		if(!_self.quicksearchConfig){
				    			_self.quicksearchConfig = {};
				    		}
				    		_self.quicksearchConfig["dataSource"] = dataSource;
				    	}
				    	if(dialogMax){
				    		_self._autoDialogPageSize = dialogMax;
				    	}
				    	if(structure){
				    		try{
				    			structure = dojo.fromJson(structure);
				    			if(!_self.quicksearchConfig){
				    				_self.quicksearchConfig = {};
				    			}
				    			_self.quicksearchConfig["structure"] = structure;
				    			_self.getPopup().setStructure(structure);
				    		}catch(e){
				    		}
				    	}
				    	if(popupWidth){
				    		_self.getPopup().width = popupWidth;
				    	}
				    	if(queryConfig){
				    		try{
				    			queryConfig = dojo.fromJson(queryConfig);
				    			if(!_self.quicksearchConfig){
				    				_self.quicksearchConfig = {};
				    			}
				    			_self.quicksearchConfig["queryConfig"] = queryConfig;
				    		}catch(e){
				    		}
				    	}
				    	if(model){
				    		_self.quicksearchConfig["model"] = model;
				    		_self._autoDialogModel = model;
				    	}
				    	_self._isDialogType = dialogType == null?false:true;
				    	_self._toogleIcon();
				    	if(queryMode){
				    		_self.quicksearchConfig["queryMode"] = queryMode;
				    		_self._isDelayQuery = queryMode=="enterQuery"?false:true;
				    	}
				    	if(valueAttr&&displayAttr){
				    		var d = _self.getDecoder();
				    		d.valueAttr= valueAttr;
				    		d.displayAttr= displayAttr;
				    	}
				    	if(type=="dialog"){
				    		_self._createAutoDialog(_self.quicksearchConfig,_self.config);
				    	}else if(type=="popup"){
				    		_self.getAutoCompleter()._sendQuery(_self.getText());
				    	}else if(type=="setValue"){
				    		_self.getAutoCompleter()._getQueryResult(sQuery,unBindStore,_self.quicksearchStore,dataSource,true);
				    	}
			    	}
				}
	    	}
	    },dc,false);
	},
	
	
	_getAutoDialogGrid:function(advanceQueryConfig){
		if(!this._autoDialogGrid){
			//显示行号
			var vm = {rowNumber: true,onRowClick:dojo.hitch(this,this._selectRow),onRowDblClick :dojo.hitch(this,this._doubleSelectRow)};
			//单选
			var selection={selectType:'single'};
			var binding = {rpc:dojo.hitch(this,this._bindingRpc)};
			var columns = [];
			//cell宽度
			var width = "150px";
			for(var key in advanceQueryConfig){
				if(advanceQueryConfig[key]["displayItem"]){
					var cellConfig = {};
					cellConfig["name"] = advanceQueryConfig[key]["sqlAttr"] || key||"";
					cellConfig["label"] = advanceQueryConfig[key]["label"]||"";
					cellConfig["width"] = advanceQueryConfig[key]["width"]||width;
					columns.push(cellConfig);
				}
			}
	        var header={rows:[columns]}
			var layout = [header];
			var grid = new unieap.xgrid.Grid({
				views: vm,
				selection:selection,
				binding:binding,
				height:"100%",
				layout: {structure:layout}
			});
			this._autoDialogGrid = grid;
		}
		return this._autoDialogGrid;
	},
	
	_getAutoDialogGridPane:function(config,boId,grid,advanceQuery){
		if(!this._autoDialogGridPane){
			var pane = new unieap.layout.TitlePane({
				title:"查询结果",
				height:"100%",
				flexible:false
			});
			this._autoDialogGridPane = pane;
		}
		if(!this._autoDialogSelectButton){
			this._autoDialogSelectButton = new unieap.form.Button({
				label:"选择",
				onClick:dojo.hitch(this,this._autoDialogSelect),
				config:boId,
				pageSize:config["max"]
			});
			dojo.place(this._autoDialogSelectButton.domNode,this._autoDialogGridPane.buttonContainerNode,0);
		}
		return this._autoDialogGridPane;
	},
	
	_getAutoDialogQueryPane:function(grid,advanceQuery,quicksearch,model){
		if(!this._autoDialogQueryPane){
			var pane = new unieap.layout.TitlePane({
				title:"查询条件",
				flexible:false
			});
			this._autoDialogQueryPane = pane;
		}
		if(!this._autoDialogQueryButton){
			this._autoDialogQueryButton = new unieap.form.Button({
				label:"查询",
				onClick:dojo.hitch(this,this._autoDialogQueryFun)
			});
			dojo.place(this._autoDialogQueryButton.domNode,this._autoDialogQueryPane.buttonContainerNode,0);
		}
		return this._autoDialogQueryPane;
	},
	
	_getAutoDialogQuery:function(advanceQueryConfig,model){
		if(!this._autoDialogQuery){
			if(model=="formQuery"){
				this._autoDialogQuery = this._createFormQuery(advanceQueryConfig);
			}else{
				var config = {};
				for(var name in advanceQueryConfig){
					if(advanceQueryConfig[name].queryItem){
						config[name]=advanceQueryConfig[name];
					}
				}
				this._autoDialogQuery = new unieapx.query.AdvancedQuery({
					config:config,
					showQueryToolBar:false
				});
			}
		}
		return this._autoDialogQuery;
	},
	
	
	
	
	
	_createWidget:function(name,config){
		var str="<td width=\"20%\">" + config["label"]+"</td><td width=\"30%\">";
		var store = config.store;
		var dateType = config.dateType;
		// 下拉列表和下拉树
		if(store != null && store != ""){
			widget = this._createSelectedWidget(name,config);
		}else{
			switch(dateType){
				case unieap.DATATYPES.BIGINT :
					widget = this._createIntegerWidget(name,config);
					break;
				case unieap.DATATYPES.BOOLEAN :
					widget = this._createSelectedWidget(name,config);
					break;
				case unieap.DATATYPES.DATE :
					widget = this._createDateWidget(name,config);
					break;
				case unieap.DATATYPES.DECIMAL :
					widget = this._createNumberWidget(name,config);
					break;
				case unieap.DATATYPES.DOUBLE :
					widget = this._createNumberWidget(name,config);
					break;
				case unieap.DATATYPES.FLOAT :
					widget = this._createNumberWidget(name,config);
					break;
				case unieap.DATATYPES.INTEGER :
					widget = this._createIntegerWidget(name,config);
					break;
				case unieap.DATATYPES.LONGVARCHAR :
					widget = this._createStringWidget(name,config);
					break;
				case unieap.DATATYPES.NUMERIC :
					widget = this._createNumberWidget(name,config);
					break;
				case unieap.DATATYPES.REAL :
					widget = this._createNumberWidget(name,config);
					break;
				case unieap.DATATYPES.SMALLINT :
					widget = this._createIntegerWidget(name,config);
					break;			
				case unieap.DATATYPES.STRING :
					widget = this._createStringWidget(name,config);
					break;
				case unieap.DATATYPES.TIME :
					widget = this._createDateWidget(name,config);
					break;		
				case unieap.DATATYPES.TIMESTAMP :
					widget = this._createTimestampWidget(name,config);
					break;
				case unieap.DATATYPES.TINYINT :
					widget = this._createIntegerWidget(name,config);
					break;
				case unieap.DATATYPES.VARCHAR :
					widget = this._createStringWidget(name,config);
					break;
				default :
					widget = this._createStringWidget(name,config);
			}
		}
		str+= widget + "</td>";
		return str;
	},
	
	_createNumberWidget:function(name,config){
		return "<div dojoType='unieap.form.NumberTextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\"></div>"
	},
	_createIntegerWidget:function(name,config){
		return "<div dojoType='unieap.form.NumberTextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\" rang=\"{allowDecimal:false}\"></div>"
	},
	_createStringWidget:function(name,config){
		return "<div dojoType='unieap.form.TextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\"></div>"
	},
	_createTimestampWidget:function(name,config){
		return "<div dojoType='unieap.form.DateTextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\" popup=\"{showsTime:24}\" displayFormatter=\"{dataFormat:"+ this._autoDialogDataFormat+"}\"></div>"
	},
	_createDateWidget:function(name,config){
		return "<div dojoType='unieap.form.DateTextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\"></div>"
	},
	// 构造下拉列表类型组件。
	_createSelectedWidget:function(name,config){
		var displayAttr = config.displayAttr||"CODENAME";
		var valueAttr = config.valueAttr||"CODEVALUE";
		return "<div dojoType='unieap.form.DateTextBox' width=\"100%\" binding=\"{name:'"+ name +"'}\" decoder=\"{displayAttr:'" + displayAttr +"',valueAttr:'" + valueAttr +"'}\" dataProvider=\"{store:'"+config.store+"'}\"></div>"
	},
	
	
	_createFormStore:function(advanceQueryConfig){
		var store = new unieap.ds.DataStore("_autoDialogFormDataStore");
	    var data = {};
	    var result={};
	    var count = 0;
		for(var name in advanceQueryConfig){
			if(advanceQueryConfig[name].queryItem){
				var alias = advanceQueryConfig[name].alias;
				if(alias){
					name = alias +"." + name;
					
				}
				data[name] = ""
				count++
			}
		}
		store.getRowSet().addRow(data);
		result.store =store;
		result.count = count;
		return result;
	},
	_createFormQuery:function(advanceQueryConfig){
		var result = this._createFormStore(advanceQueryConfig);
		var store = result.store;
		var count = result.count;
		var form = new unieap.form.Form({});
		var index = 0;
		var formHtml ="<table width=\"100%\">" ;
		for(var name in advanceQueryConfig){
			if(advanceQueryConfig[name].queryItem){
				index++;
				if(index == 1){
					formHtml+="<tr>";
				}
				var alias = advanceQueryConfig[name].alias;
				var allName = name;
				if(alias){
					allName = alias +"." + name;
					
				}
				formHtml += this._createWidget(allName,advanceQueryConfig[name]);
				if(index == 2){
					formHtml+="</tr>";
					index=0;
				}
			}
		}
		formHtml +="</table>";
		var formNode = form.domNode;
		formNode.innerHTML = formHtml;
		dojo.parser.parse(formNode);
		form.getBinding().setDataStore(store);
		return form;
	},
	
	_getAutoDialogTool:function(grid){
		if(!this._autoDialogToolbar){
			dojo.require("unieap.xgrid.core.toolbar");
			this._autoDialogToolbar = new unieap.xgrid.toolbar({
				grid:grid
			});
		}
		return this._autoDialogToolbar;
	},
	
	_createAutoDialog:function(config,boId){
		var _this = this;
		this.destroyAutoDialog();
		if(!this._autoDialog){
			if(!config) return;
			var advanceQueryConfig = config["queryConfig"];
			if(!advanceQueryConfig) return;
			var autoDialogHeight = "530";
			this._autoDialog = new unieap.xdialog.Dialog({
				id:"_quicksearchAutoXDialogId",
				title:"快速搜索",
				iconCloseComplete: true,
				height:autoDialogHeight,
				width:"600",
				onComplete : function(){
					_this.focus();
				}
			});
			this._autoDialog.show();
			var adaptiveContainer = new unieap.layout.AdaptiveContainer();
			var queryPane = new unieap.layout.AdaptivePane();
			var gridPane = new unieap.layout.AdaptivePane({
				autoHeight:true
			});
			var advanceQuery = this._getAutoDialogQuery(advanceQueryConfig,this._autoDialogModel);
			var queryTitle = this._getAutoDialogQueryPane(grid,advanceQuery,this,this._autoDialogModel);
			queryTitle.addChild(advanceQuery);
			var grid = this._getAutoDialogGrid(advanceQueryConfig);
			var gridTitle = this._getAutoDialogGridPane(config,boId,grid,advanceQuery);
			var toolbar = this._getAutoDialogTool(grid);
			grid.advanceQuery = advanceQuery;
			grid.toolBar = toolbar;
			gridTitle.addChild(grid);
			queryPane.addChild(queryTitle);
			gridPane.addChild(gridTitle);
			adaptiveContainer.addChild(queryPane);
			adaptiveContainer.addChild(gridPane);
			adaptiveContainer.placeAt(this._autoDialog.dialogMainContent);
			adaptiveContainer.notifyResize();
		}else{
			this._autoDialog.show();
		}
	},
	
	_selectRow:function(evt){
		this._getAutoDialogGrid().getManager("SelectionManager").setSelect(evt.rowIndex,true);
	},
	_doubleSelectRow:function(evt){
		this._getAutoDialogGrid().getManager("SelectionManager").setSelect(evt.rowIndex,true);
		this._autoDialogSelect();
	},
	
	_bindingRpc:function(store,load,grid){
		var pageNumber = store.getPageNumber();
		var pageSize = store.getPageSize();
		this._setAutoDialogGridStore(this,pageNumber,pageSize);
	},
	
	_autoDialogSelect:function(){
		var selectedRows=this._getAutoDialogGrid().getManager('SelectionManager').getSelectedRows();
		if(selectedRows && selectedRows[0]){
			var value = selectedRows[0].getItemValue(this.getDecoder().valueAttr);
			if(value){
				var store = new unieap.ds.DataStore('quicksearch_autoDialog_datastore');
				store.getRowSet().addRow(selectedRows[0].getData());
				this.getDataProvider().setDataStore(store);
				//获取选中行数据；
				this._selectStore = store;
				this.setValue(value);
				this._isSetText = true;
				this.onComplete(store);
			}
		}
		if (!this.bindable) {
			this.clear();
		}
		this._tooglePrompt();
		this.focus();
		this._autoDialog.close();
		this.getDataProvider().setDataStore(null);
	},
	
	_autoDialogQueryFun:function(){
		this._setAutoDialogGridStore(this,1,this._autoDialogPageSize);
	},
	
	_setAutoDialogGridStore:function(quicksearch,pageNumber,pageSize){
		var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
	    var dc=new unieap.ds.DataCenter();
	    var advanceQuery = this._autoDialogQuery;
	    var dataSource = this.quicksearchConfig["dataSource"]
	    if(advanceQuery){
	    	if(this._autoDialogModel =="formQuery"){
	    		var store = advanceQuery.getBinding().getDataStore();
				dc.setParameter("_boId", "ria_quickSearchBO_bo");
				dc.setParameter("_methodName", "queryByFormCondition");
				dc.setParameter("_methodParameterTypes", "com.neusoft.unieap.techcomp.ria.quicksearch.dto.QuickSearch,java.util.Map,int,int");
				dc.addDataStore("_autoDialogFormQueryStore", store);
				dc.setParameter("pageNumber",pageNumber);
				dc.setParameter("pageSize",pageSize);
				dc.addDataStore("config", this.quicksearchStore);
			    dc.setParameter("_parameters", "config,_autoDialogFormQueryStore,pageNumber,pageSize");
			    dc.setParameter("_parameterTypes", "pojo,pojo,string,string");
     			if(dataSource && dataSource != ""){
     				dc.setParameter("_dataSourceID", dataSource);
     			}
			    unieap.Action.requestData({
			    	url:url,
			    	sync:false,
			    	load:function(dc){
					    if(quicksearch._isQuerySucceed(dc)){
					    	quicksearch._getAutoDialogGrid().getBinding().setDataStore(dc.getSingleDataStore());
						}
			    	}
			    },dc,false);
	    	}else{
			    var store = advanceQuery._queryGrid.getBinding().getDataStore();
				var conditionDS = advanceQuery._transformCondition(store);
			    dc.addDataStore(conditionDS);
				dc.setParameter("_boId", "ria_quickSearchBO_bo");
				dc.setParameter("_methodName", "queryByAdvanceCondition");
				dc.setParameter("_methodParameterTypes", "com.neusoft.unieap.techcomp.ria.quicksearch.dto.QuickSearch,int,int");
				dc.setParameter("pageNumber",pageNumber);
				dc.setParameter("pageSize",pageSize);
				dc.addDataStore("config", this.quicksearchStore);
			    dc.setParameter("_parameters", "config,pageNumber,pageSize");
			    dc.setParameter("_parameterTypes", "pojo,string,string");
			    if(dataSource && dataSource != ""){
     				dc.setParameter("_dataSourceID", dataSource);
     			}
			    unieap.Action.requestData({
			    	url:url,
			    	sync:false,
			    	load:function(dc){
					    if(quicksearch._isQuerySucceed(dc)){
					    	quicksearch._getAutoDialogGrid().getBinding().setDataStore(dc.getSingleDataStore());
						}
			    	}
			    },dc,false);
	    	}
	    }

	},
	
	_isQuerySucceed:function(dc){
		if (dc && dc.declaredClass == "unieap.ds.DataCenter"&& dc.getCode() >= 0) {
			return true;
		}else{
			var _this = this;
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({
				// 错误提示
				title : "错误提示",
				// "查询失败" ,
				message : "查询失败",
				onComplete : function(){
					_this.clear();
					_this.focus();
				}
			});
			return false;
		}
	}

});