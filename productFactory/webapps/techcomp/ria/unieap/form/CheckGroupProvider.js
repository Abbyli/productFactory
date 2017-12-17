dojo.provide("unieap.form.CheckGroupProvider");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.CheckGroupProvider", null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.CheckGroupProvider
	 * @summary:
	 * 		按钮组数据源控制器
	 */
	 
	/**
	 * @summary:
	 * 		设置按钮组绑定的DataStore。
	 * @type:
	 * 		{string|unieap.ds.Datastore}
	 */
	store: null,
	
	dataCenter: null,
	
	constructor: function(params) {
		dojo.mixin(this, params);		
		//this.store = unieap.getDataStore(this.store,this.widget.dataCenter,true);
		this._initDataStore(this.store);
	},
	
	//公卫需求，如果dataCenter中不存在dataStore，去代码表中取
	_initDataStore: function(store) {
		if(!this.dataCenter){
				this.dataCenter = this.widget.dataCenter || (unieap.Action.getViewContext(this.widget) || window).dataCenter;
			}
		this.store = unieap.getDataStore(this.store,this.dataCenter,true);
		if (!this.store) {
			dojo.require("unieap.rpc");
			this.store = unieap.Action.getCodeList(store);
		}
	},
	
	/**
	  * @summary:
	  * 	取得数据源对象
	  * @return：
	  * 	unieap.ds.DataStore
	  */
	getDataStore: function() {
		return this.store;
	},
	
	/**
	  * @summary:
	  * 	设置数据源
	  * @param：
	  * 	{unieap.ds.DataStore|string} store
	  */
	setDataStore: function(store) {
		if(dojo.isString(store)){
			if(!this.dataCenter){
				this.dataCenter = this.widget.dataCenter || (unieap.Action.getViewContext(this.widget) || window).dataCenter;
			}
			this.store=unieap.getDataStore(store, this.dataCenter, false);
			if (!this.store) {
				dojo.require("unieap.rpc");
				this.store = unieap.Action.getCodeList(store);
			}
		}else{
			this.store = store;
		}
		this.widget.setLayout(this.store);		
	},
	
	/**
	 * @summary:
	 * 		取得指定条目的值
	 * @param:
	 * 		{string} name
	 * 		列名
	 * @param:
	 * 		{number} inRowIndex
	 * 		行号
	 */
	getItemValue: function(name,inRowIndex) {
		return this.store.getRowSet().getItemValue(inRowIndex,name);
	}
});
