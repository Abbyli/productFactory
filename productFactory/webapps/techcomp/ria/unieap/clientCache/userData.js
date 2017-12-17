dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.clientCache.userData");
/**
 * @declaredClass:
 * 		unieap.cache
 * @summary:
 * 		缓存操作底层接口,用于操作userData
 * @example:
 * |<script type="text/javascript">
 * |	//判断UserData是否可用
 * |	var isCacheUsable=unieap.cache.isAvailable();
 * |	alert(isCacheUsable);
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//获得缓存在userData中的总记录数
 * |	var totalCount=unieap.cache.getCount();
 * |</script>
 * @example:
 * |<script type="text/javascript">
 * |	//删除userData中缓存的所有数据
 * |	unieap.cache.clear();
 * |</script>
 */	
dojo.declare("unieap.clientCache", null, {
	//userData中要创建的database的名字
	DB_NAME : unieap.defaultCacheDBName,
	
	constructor: function(param) {
		dojo.mixin(this, param);
	},
	
	userData : null,
	//userData中的key值集合
	userDataKeys: [],
	
	init:function(){
		if (!this.userData) {
			try {
				this.userData = document.createElement("INPUT");
				this.userData.type = "hidden";
				this.userData.style.display = "none";
				this.userData.addBehavior ("#default#userData");
				document.body.appendChild(this.userData);
				this.userDataKeys = [];
				var expires = new Date();
				expires.setDate(expires.getDate()+365);
				this.userData.expires = expires.toUTCString();
			} catch(e) {
				return false;
			}
		}
		return true;
	},

    setItem : function(key, value) {
        if(this.init()){
            this.userData.load(this.DB_NAME);
            this.userData.setAttribute(key, value);
            this.userDataKeys.push(key);
            this.userData.save(this.DB_NAME);
        }
    },

    getItem : function(key) {
        if(this.init()){
        	this.userData.load(this.DB_NAME);
       	 	return this.userData.getAttribute(key);
        }
    },

    removeItem : function(key) {
        if(this.init()){
	        this.userData.load(this.DB_NAME);
	        this.userData.removeAttribute(key);
	        this.userData.save(this.DB_NAME);
        }

    },
	
	
	/**
	 * @summary:
	 * 		判断当前浏览器是否支持UserData本地缓存
	 * @description:
	 * 		如果支持返回true，否则返回false
	 */
	isAvailable : function(){
		if(!dojo.isIE){
			return false;
		}
		return unieap.global.isUseClientCache;
	},
	
	
	/**
	 * @summary:
	 * 		清除缓存中所有记录
	 * @example:
	 * |<script>
	 * |	unieap.cache.clear();
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空	
	 */
	clear : function(){
		if(!this.isAvailable()){
			return;
		}
		var keys =  this.getKeys();
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			this.removeItem(key);
		}
	},
	
	/**
	 * @summary:
	 * 		往缓存中插入数据
	 * @param：
	 * 		{string} key  
	 * @param：
	 * 		{string} value 
	 * @param：
	 * 		{string} timestamp 
	 * @example:
	 * |<script>
	 * |	var value = "[
	 * |		{CODEVALUE:1,CODENAME:'汉族'},
	 * |		{CODEVALUE:2,CODENAME:'回族'},
	 * |		{CODEVALUE:3,CODENAME:'白族'}
	 * |	]";
	 * |	unieap.cache.put("dept",value,String(new Date().getTime()));
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	put : function(key,value,timestamp) {
		if(!this.isAvailable()){
			return;
		}
		var cacheKey,cacheValue = {};
		cacheValue.value = value;
		cacheValue.timestamp = timestamp || 1;
		cacheKey = this.DB_NAME+key;
		var value = dojo.toJson(cacheValue);//obj2Str(cacheValue);
		this.setItem(cacheKey,value);
	},
	
	
	/**
	 * @summary:
	 * 		将缓存中数据移除
	 * @param：
	 * 		{string} key  
	 * @example:
	 * |<script>
	 * |	unieap.cache.remove("key");
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	remove : function(key){
		var cacheKey = this.DB_NAME+key;
		this.removeItem(cacheKey);
	},
	
	
	/**
	 * @summary:
	 * 		往缓存中插入数据
	 * @param：
	 * 		{string} keys  
	 * @param：
	 * 		{string} values 
	 * @param：
	 * 		{string} timestamps 
	 */
	putMultiple : function(keys,values,timestamps) {
		if(!this.isAvailable()){
			return;
		}
		var key,value,timestamp;
		for(var i=j=k=0;i < keys.length; i++){
			key=keys[i];
			value=values[j];
			timestamp=timestamps&&timestamps[k]||1;
			this.put(key,value,timestamp);
			j++;
			k++;
		}
	},
	
	
	/**
	 * @summary:
	 * 		从缓存中获得数据
	 * @param：
	 * 		{string} key  
	 * @return：
	 * 		{string} value 
	 */
	get : function(key) {
		if(!this.isAvailable() || key == null){
			return;
		}
		var json,obj,cacheKey;
		cacheKey = this.DB_NAME+key;
		json = this.getItem(cacheKey);
		obj = dojo.fromJson(json)//str2Obj(value);
		return (obj == null ? null : obj.value);
	},
	
	
	/**
	 * @summary:
	 * 		从缓存中获得所有key值
	 * @return：
	 * 		{string[]} keys 
	 */
	getKeys : function(){
		if(!this.isAvailable()){
			return;
		}
		return this.userDataKeys;
	},
	
	
	/**
	 * @summary:
	 * 		获取缓存中记录总数
	 * @return：
	 * 		{string} count 
	 */
	getCount : function(){
		if(!this.isAvailable()){
			return;
		}
		return this.userDataKeys.length;
	},
	
	/**
	 * @summary:
	 * 		获取缓存中所有记录的timestamp
	 * @return：
	 * 		{string[]} timestamps 
	 */
	getAllTimeStamps : function(){
		if(!this.isAvailable()){
			return;
		}
		var key,json,obj,timestamp,timestamps = {};
		var keys = this.getKeys();
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			json = this.getItem(this.DB_NAME+key);
			obj = dojo.fromJson(json);
			timestamp = parseInt(obj.timestamp);
			if(timestamp > 2649600000){
				timestamps[key] = timestamp;
			}
		}
		return timestamps;
	}

});