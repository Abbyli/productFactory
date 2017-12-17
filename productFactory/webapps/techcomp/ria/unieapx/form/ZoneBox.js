dojo.provide('unieapx.form.ZoneBox');
dojo.declare("unieapx.form.ZoneBox",unieap.form.FormWidget, {
	// 用户属性配置接口
		// 用户属性配置接口
	UserInterfaces: dojo.mixin({
		readOnly : "boolean",
		dataProvider: "object",
		decoder: "object",
		popup: "object",
		getCityCascadeStore: "function",
		getDistrictCascadeStore: "function"
	},
	unieap.form.FormWidget.prototype.UserInterfaces),
	
	width: "200px",
	
	//行政区划的位数
	bits : 12,
	
	//自动注入dataCenter
	Autowired : "dataCenter",
	
	dataProvider: null,
	
	decoder: null,
	
	popup: null,
	
	pOldValue : null,
	
	cOldValue : null,
	
	dOldValue : null,
	
	readOnly:false,
	
	templateString: "<div dojoAttachPoint='containerNode' style='overflow:visible;' ></div>",
	
	postCreate : function() {
		var _decoder = {displayAttr: "CODENAME",valueAttr: "CODEVALUE"},
			decoder = this.decoder,
			popup = this.popup,
			tabIndex = this.tabIndex;
		if(decoder){
			if(decoder.displayAttr){
				_decoder["displayAttr"] = decoder.displayAttr;
			}
			if(decoder.valueAttr){
				_decoder["valueAttr"] = decoder.valueAttr;
			}
		}
		
		this._setWidthAndHeigth();
		
		var id = this.id,_rootID = this._rootID,dataCenter = this.dataCenter || (unieap.Action.getViewContext(this) || window).dataCenter,rootNode=this.rootNode,height = this.height;
		var provinceComboId = id + "_" + "provinceCombo",
			provinceCombo = new unieap.form.ComboBox({
				onChange:dojo.hitch(this,this._provinceComboOnChange),
				width:"35%",
				height:height,
				decoder:_decoder,
				popup: popup,
				id : provinceComboId,
				_rootID: _rootID,
				dataCenter : dataCenter,
				rootNode : rootNode,
				tabIndex : tabIndex
			}),
			cityComboId = id + "_" + "cityCombo",
			cityCombo = new unieap.form.ComboBox({
				onChange:dojo.hitch(this,this._cityComboOnChange),
				width:"30%",
				height:height,
				decoder:_decoder,
				popup: popup,
				id : cityComboId,
				_rootID: _rootID,
				dataCenter : dataCenter,
				rootNode : rootNode,
				cascade : {
					defaultSelect:false,
					primary:provinceComboId,
					getCascadeStore:dojo.hitch(this,this.getCityCascadeStore)
				},
				tabIndex : tabIndex
			}),
			districtCombo = new unieap.form.ComboBox({
				onChange:dojo.hitch(this,this._districtComboOnChange),
				width:"35%",
				height:height,
				decoder:_decoder,
				popup: popup,
				id : id + "_" + "districtCombo",
				_rootID: _rootID,
				dataCenter : dataCenter,
				rootNode : rootNode,
				cascade : {
					defaultSelect:false,
					primary:cityComboId,
					getCascadeStore:dojo.hitch(this,this.getDistrictCascadeStore)
				},
				tabIndex : tabIndex
			}),
			containerNode = this.containerNode;
		
		dojo.place(provinceCombo.domNode, containerNode);
		dojo.place(cityCombo.domNode, containerNode);
		dojo.place(districtCombo.domNode, containerNode);
		
		this.provinceCombo = provinceCombo;
		this.cityCombo = cityCombo;
		this.districtCombo = districtCombo;
		
		//设置disabled属性
		this.disabled && this.setDisabled(this.disabled);	
		//设置必填属性
		this.required && this._setRequired(this.required);
		//设置readOnly属性
		this.readOnly && this.setReadOnly(this.readOnly);
		
		if(this.dataProvider && this.dataProvider.store){
			this.provinceCombo.getDataProvider().setDataStore(this.getDataProviderStore());
		}else{
			this.provinceCombo.getDataProvider().setDataStore(this._loadZoneCodeList(this._getCacheKey("province",""),""));
		}
	},
	
	_getCacheKey: function(type,zoneCode){
		return "UniEAP_AAB301_" + type + "_" + zoneCode;
	},
	
	_loadZoneCodeList : function(cacheKey,zoneCode){
		var resultStore = globalDataCenter.getDataStore(cacheKey);
		if(!resultStore){
			var dc = new unieap.ds.DataCenter();
	        dc.setParameter('dcID', 'ria');
	        dc.setParameter("zoneCode", zoneCode);
	        dc.setParameter("_parameters", "zoneCode");
	        dc.setParameter("_parameterTypes", "string");
	        dc.setParameter("_boId", "ria_ZoneCodeListBO_bo");
	        dc.setParameter("_methodName", "getZoneCodeList");
	        dc.setParameter("_methodParameterTypes", "String");
	        var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";
            unieap.Action.requestData({
                url: path,
                sync: true,
                load: function (dc) {
                    	resultStore = dc.getDataStore("result");
                    	globalDataCenter.addDataStore(cacheKey,resultStore);
                },
                error: function (xhr) {
                }
           }, dc);
        }
        return resultStore;
	},
	
	getDataProviderStore: function() {
		var store = this.dataProvider.store,
			dc = this.dataCenter || (unieap.Action.getViewContext(this) || window).dataCenter,
			ds = unieap.getDataStore(store, dc, true);
		if (!ds) {
			dojo.require("unieap.rpc");
			ds = unieap.Action.getCodeList(store);
		}
		return ds;
	},
	
	setReadOnly: function(readOnly) {
		this.provinceCombo.setReadOnly(readOnly);
		this.cityCombo.setReadOnly(readOnly);
		this.districtCombo.setReadOnly(readOnly);
	},
	
	setDisabled: function(disabled) {
		this.provinceCombo.setDisabled(disabled);
		this.cityCombo.setDisabled(disabled);
		this.districtCombo.setDisabled(disabled);
	},
	setRequired: function(required) {
		this.provinceCombo.setRequired(required);
		this.cityCombo.setRequired(required);
		this.districtCombo.setRequired(required);
	},
	_setRequired: function(required) {
		this.provinceCombo._setRequired(required);
		this.cityCombo._setRequired(required);
		this.districtCombo._setRequired(required);
	},
	
	getProvinceCombo: function() {
		return this.provinceCombo;
	},
	
	setValue: function(value){
		var provinceCombo = this.provinceCombo;
		if(!value || value == ""){
			provinceCombo.setValue(value);
		}else if(typeof(value) == "number"){
			var districtCombo = this.districtCombo,
				cityCombo = this.cityCombo;
				provinceValue = provinceCombo.getValue(),
				cityValue = cityCombo.getValue(),
				districtValue = districtCombo.getValue(),
				valueStr = new String(value),
				provinceStr = "",
				markDirty = this.getBinding()?this.getBinding().markDirty:true,
				bits = this.bits,
				valueLength = valueStr.length;
			if(valueLength < bits){
				valueStr = this._getValidValue(valueStr,bits-valueLength)
			}else if(valueLength > bits){
				valueStr = valueStr.substring(0,bits);
			}
			provinceStr = valueStr.substring(0,2);
			if(provinceStr != "00"){
				var targetValue = new Number(this._getValidValue(provinceStr,bits-2));
				provinceCombo.setValue(targetValue);
				markDirty&&provinceCombo.setModified(targetValue !== provinceValue);
				this.pOldValue = targetValue;
				var cityStr = valueStr.substring(2,4);
				if(cityStr != "00"){
					targetValue = new Number(this._getValidValue(provinceStr + cityStr,bits-4));
					cityCombo.setValue(targetValue);
					markDirty&&cityCombo.setModified(targetValue !== cityValue);
					this.cOldValue = targetValue;
					var districtStr = valueStr.substring(4,6);
					if(districtStr != "00"){
						targetValue = new Number(valueStr);
						districtCombo.setValue(targetValue);
						markDirty&&districtCombo.setModified(targetValue !== districtValue);
						this.dOldValue = targetValue;
					}
				}
			}
		}
	},
	_getValidValue: function(valueStr,bits){
		for(var i = 0; i < bits; i++){
			valueStr += '0';
		}
		return valueStr;
	},
	
	getValue: function(){
		var zoneCode = this.districtCombo.getValue();
		if(!zoneCode){
			zoneCode = this.cityCombo.getValue();
		}
		if(!zoneCode){
			zoneCode = this.provinceCombo.getValue();
		}
		return zoneCode;
	},
	getCityCascadeStore: function(zoneCode){
		if(zoneCode){
			return this._loadZoneCodeList(this._getCacheKey("city",zoneCode),zoneCode);
		}
		return null;
	},
	getDistrictCascadeStore: function(zoneCode){
		if(zoneCode){
			return this._loadZoneCodeList(this._getCacheKey("district",zoneCode),zoneCode);
		}
		return null;
	},
	
	_districtComboOnChange: function(value){
		this._comboOnChange(value);
		var binding = this.getBinding(),
			markDirty = true;
		if(binding){
			markDirty = binding.markDirty;
		}
		markDirty&&markDirty&&this._setModified(this.districtCombo,this.dOldValue,value);
		this.dOldValue = value;
	},
	
	_cityComboOnChange: function(value){
		this._comboOnChange(value);
		var binding = this.getBinding(),
			markDirty = true;
		if(binding){
			markDirty = binding.markDirty;
		}
		markDirty&&this._setModified(this.cityCombo,this.cOldValue,value);
		this.cOldValue = value;
	},
	
	_provinceComboOnChange: function(value){
		this._comboOnChange(value);
		var binding = this.getBinding(),
			markDirty = true;
		if(binding){
			markDirty = binding.markDirty;
		}
		markDirty&&this._setModified(this.provinceCombo,this.pOldValue,value);
		this.pOldValue = value;
	},
	
	_setModified: function(widget,oldValue,value){
		widget.setModified(oldValue !== value);
	},
	
	_comboOnChange: function(value){
		this.fireDataChange();
	}
});