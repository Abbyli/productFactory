dojo.provide("unieapx.form.QuickSearchAutoCompleter");
dojo.require("unieap.form.AutoCompleter");
dojo.declare("unieapx.form.QuickSearchAutoCompleter", unieap.form.AutoCompleter, {

	UserInterfaces : dojo.mixin( {
		url : "string"
	}, unieap.form.AutoCompleter.prototype.UserInterfaces),

	onBeforeSendQuery : function(params, dc) {
		if(this.widget.onBeforeSendQuery){
			var params = this.widget.onBeforeSendQuery(dc);
			if(params && this._isJson(params)){
				return  params;
			}
		}
		return {};
	},
	
	_sendQuery:function(sQuery,unBindStore,isSetValue){
		var me=this;
	    if(this._canSendQuery(sQuery)){
	    	var quicksearchStore = me.widget.quicksearchStore;
	    	var quicksearchConfig = me.widget.quicksearchConfig;
	    	if(quicksearchStore && quicksearchConfig){
    			var dataSource = me.widget.quicksearchConfig["dataSource"];
    			this._getQueryResult(sQuery,unBindStore,quicksearchStore,dataSource,isSetValue);
	    	}else{
	    		me.widget._getQuicksearchConfig("setValue",sQuery,unBindStore,isSetValue);
	    	}
	    }
	},
	
	_getQueryResult:function(sQuery,unBindStore,quicksearchStore,dataSource,isSetValue){
		var me=this;
		if(isSetValue && me.widget.getDecoder().valueAttr == me.widget.getDecoder().displayAttr){
			me.widget._setValue(sQuery);
			!me.widget.readOnly && me.widget.getValidator().validate();
		}else {
			var row = quicksearchStore.getRowSet().getRow(0);
			if(row && row.getItemValue("businessId")){
				var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
				var dc=new unieap.ds.DataCenter();
				dc.setParameter("_boId", "ria_quicksearch.business.xml_bo");
				dc.setParameter("_methodName", row.getItemValue("businessId"));
				dc.setParameter("_methodParameterTypes", "java.lang.String,boolean");
				dc.setParameter("keyword", sQuery);
				if(isSetValue){
					dc.setParameter("isSetValue", true);
				}else{
					dc.setParameter("isSetValue", false);
				}
				dc.setParameter("_parameters", "keyword,isSetValue");
				dc.setParameter("_parameterTypes", "string,string");
				unieap.Action.requestData({
					url:url,
					sync:false,
					load:function(dc){
					if(me.widget._isQuerySucceed(dc)){
						me._showResult(dc,unBindStore,sQuery);
						me.onAfterSendQuery(dc);
					}
				}
				},dc,false);//fasle表示不显示loading
			}else{
				var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
				var dc=new unieap.ds.DataCenter();
				dc.setParameter("_boId", "ria_quickSearchBO_bo");
				dc.setParameter("_methodName", "query");
				dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String,com.neusoft.unieap.techcomp.ria.quicksearch.dto.QuickSearch,boolean,java.util.Map");
				dc.setParameter("id", me.widget.config);
				dc.setParameter("keyword", sQuery);
				
	//		var quicksearchStore = me.widget.quicksearchStore;
				dc.addDataStore("config", quicksearchStore);
				if(isSetValue){
					dc.setParameter("isSetValue", true);
				}else{
					dc.setParameter("isSetValue", false);
				}
	//		var dataSource = me.widget.quicksearchConfig["dataSource"];
				if(dataSource && dataSource != ""){
					dc.setParameter("_dataSourceID", dataSource);
				}
				//可以在此回调方法中重新修改已有参数或者增加其他参数
				var params = me.onBeforeSendQuery(me.params,dc);
				dc.setParameter("params", params);
				var p1 = "",p2 = "";
				for(var key  in params){
					p1+=(","+key);
					p2+=",string";
					dc.setParameter(key, params[key]);
				}
				if(p1.length>1)
					p1 = p1.substr(1);
				if(p2.length>1)
					p2 = p2.substr(1);
				dc.setParameter("_parameters", "id,keyword,config,isSetValue,params("+p1+")");
				dc.setParameter("_parameterTypes", "string,string,pojo,string,map("+p2+")");
				unieap.Action.requestData({
					url:url,
					sync:false,
					load:function(dc){
					if(me.widget._isQuerySucceed(dc)){
						me._showResult(dc,unBindStore,sQuery);
						me.onAfterSendQuery(dc);
					}
				}
				},dc,false);//fasle表示不显示loading
			}
		}
	},

	_showResult : function(dc,unBindStore,sQuery) {
		var store = dc.getSingleDataStore();
		var rowCount = store.getRowSet().getRowCount("primary");
		if (rowCount == 0) {
			var _widget = this.widget;
			this.widget.onComplete(null);
//			if(!this.widget._isDelayQuery){
				MessageBox.alert( {
//					title : "提示信息", // MODIFY BY TENGYF
					title : RIA_UNIEAPX_I18N.form.infoTilte,
//					message : "未查询到数据!"
					message : RIA_UNIEAPX_I18N.form.notFoundData,
					onComplete : function(){
						_widget.clear();
						_widget.focus();
					}
				});
//			}
			return;
		}
		if (store.getRowSet().getRowCount("primary") > 1)
			return this.inherited(arguments);
		this.widget.getDataProvider().setDataStore(store);
		//获取选中行数据；
		this.widget._selectStore = store;
		this.widget._isSetText = true;
		if(unBindStore){
			this.widget._setValue(sQuery);
			!this.widget.readOnly && this.widget.getValidator().validate();
			this.widget.getDataProvider().setDataStore(null);
		}else{
			this.widget.setSelectedIndex([0]);
			var item = dc.getSingleDataStore().rowSet.getData()[0];
			this.widget.setValue(item[this.widget.decoder.valueAttr]);
			this.widget.getPopup().onSelect(item, this.widget);
			this.widget.getPopup().close();
		}
	},

	_canSendQuery : function(value) {
		if (value == "")
			return true;
		if (value)
			return true;
		return false;
	},
	
	_isJson :function(obj){ 
	    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	    return isjson; 
	} 


});
