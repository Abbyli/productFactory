dojo.provide("unieapx.chart.FusionChart");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("unieapx.chart.FusionChart", [ dijit._Widget, dijit._Templated ], {

	templateString : "<div dojoAttachPoint='containerNode'>" + "</div>",
	
	// 配置属性接口
	UserInterfaces : {
		id : "string",
		width : "string",
		height : "string",
		xaxis : "string",
		dataClick : "string",
		animation : "boolean",
		dimension : "string",
		caption : "string",
		subCaption: "string",
		numberFormat: "string",
		divisionalLines: "string",
		background: "string",
		border: "string",
		canvas: "string",
		font: "string",
		legend: "string",
		display: "string",
		xAxis: "string",
		xAxisProperty: "string",
		yAxis: "string",
		pyAxis: "string",
		syAxis: "string",
		bar: "string",
		trendLines: "string",
		palette: "string",
		paletteColors: "string"
	},
	
	//自动注入dataCenter
	Autowired : "dataCenter",
	
	datas : null,
	
	xaxis : null,
	
	chartInfo : null,
	
	width : "100%",
	
	height : "300px",
	
	srcPrefix : unieap.WEB_APP_NAME + "/techcomp/ria/unieapx/chart/",
	
	src : "",
	
	//是否动画显示数据，默认为 1(True)、0(False)
	animation : true,
	
	//图类型，如果使用3d复合图，主Y轴为柱形图，从Y轴为线形图
	dimension : "2d",
	
	numberFormat : "",
	
	divisionalLines : "",
	
	background : "",
	
	border : "",
	
	canvas : "",
	
	font : "",
	
	legend : "",
	
	display : "",
	
	xAxis : "",
	
	xAxisProperty : "",
	
	yAxis : "",
	
	pyAxis : "",
	
	syAxis : "",
	
	bar : "",
	
	trendLines : "",

	datasets : null,
	
	chartReference : null,
	
	dataClick : null,
	
	isPie : false,
	
	//------默认值补丁区------
	
	//是否格式化精度，如1000 ->1K 1000 K->1M ，默认为1(True)、0(False)
	formatNumberScale : 1,
	
	//是否使用默认水平分割线 ，默认为1(True)、0(False)
	adjustDiv : 1,
	
	//是否显示图例，默认为0(False) ，1(True)、
	showLegend : 0,
	
	//是否显示Label，默认为1(True),0(False)
	showLabels : 1,
	
	//是否显示值，默认为1(True),0(False)
	showValues : 1,
	
	//Y轴名称垂直放置，默认为1(True),0(False)（默认Y轴名称为垂直放置）
	rotateYAxisName : 1,
	
	//是否显示Y坐标值，默认为1(True),0(False)
	showYAxisValues : 1,
	
	//是否y轴极限值，默认为1(True),0(False)
	showLimits : 1,
	
	//是否显示Y轴除上下限值外的其他值，默认为1(True),0(False)
	showDivLineValues : 1,
		
	//自动调节Y轴最小值，默认为1(True)，0(False)
	setAdaptiveYMin : 1,
	
	//使用柱形图，是否显示柱子的边框，默认为1(True)、0(False)
	showPlotBorder : 1,
	
	//是否显示0值的饼，默认为1(True)，0(False)
	showZeroPies : 1,
	
	//是否显示百分数，默认为1(True)，0(False)
	showPercentValues : 1,
	
	//在鼠标移动到数据点上的时候是否显示百分数，默认为1(True)，0(False)
	showPercentInToolTip : 1,
	
	//-----------------------
	
	constructor : function() {

	},

	postCreate : function() {
		var self=this;
		var xaxis = self.xAxis;
		var category = [],
			datasets = [],
			datas = [],
			chartInfo = {
				formatNumberScale : this.formatNumberScale,
				adjustDiv : this.adjustDiv,
				showLegend : this.showLegend,
				showLabels : this.showLabels,
				showValues : this.showValues,
				rotateYAxisName : this.rotateYAxisName,
				showYAxisValues : this.showYAxisValues,
				showLimits : this.showLimits,
				showDivLineValues : this.showDivLineValues,
				setAdaptiveYMin : this.setAdaptiveYMin,
				showPlotBorder : this.showPlotBorder,
				showZeroPies : this.showZeroPies,
				showPercentValues : this.showPercentValues,
				showPercentInToolTip : this.showPercentInToolTip
			},
			src = self.src,
			dimension = self.dimension,
			dataClick = self.dataClick,
			isPie = self.isPie,
			dataCenter = self.dataCenter || (unieap.Action.getViewContext(self) || window).dataCenter;
		dojo.query("> [chartType]", self.containerNode).forEach(function(node,index) {
			var dataset = {},
				data = [],
				serie = {},
				bindingStr = dojo.attr(node, "binding"),
				parentYAxis =  dojo.attr(node, "parentYAxis"),
				seriesname = dojo.attr(node, "seriesname"),
				dataStoreName = '',
				charType = dojo.attr(node, "chartType"),
				showZeroPies = dojo.attr(node, "showZeroPies"),
				showPercentValues = dojo.attr(node, "showPercentValues"),
				showPercentInToolTip = dojo.attr(node, "showPercentInToolTip"),
				buildAxis = false;
			if(charType == "unieapx.chart.FusionLine" || charType == "unieapx.chart.FusionBar"){
				// 没有设置x轴，以第一个图的坐标作为x轴
				if(index == 0 && !xaxis){
					buildAxis = true;
				}
			}
			if(bindingStr && bindingStr != null && bindingStr != ''){
				dataStoreName = window.eval('(' + bindingStr + ')')["store"];
				var dataStore = dataCenter.getDataStore(dataStoreName);
				if(dataStore){
					var rowSet = dataStore.getRowSet();
					for ( var i = 0; i < rowSet.getRowCount(); i++) {
						var row = rowSet.getRow(i).getData(),
							dataLabel = row["label"],
							dataValue = row["value"];
						if(dataClick && dataClick != ""){
							data.push({
								"label" : dataLabel,
								"value" : dataValue,
								"link" : "j-" + dataClick + "-" + dojo.toJson({seriesIndex : index,pointIndex : i,data : {"label" : dataLabel,"value" : dataValue}})
							});
						}else{
							data.push({
								"label" : dataLabel,
								"value" : dataValue
							});
						}
						// 如果没配置xaxis，就以第一条Line或者Bar构建x轴
						if (buildAxis){
							category.push({
								"label" : row["label"]
							});
						}
					}
				}
			}			
			if(seriesname && seriesname != ""){//系列名称
				dataset["seriesname"] = seriesname;
			}
			// 是否需要双Y轴
			if(parentYAxis && parentYAxis == "s"){
				dataset["ParentYAxis"] = parentYAxis;//主从Y轴标识，p:主Y轴、s:从Y轴，如果使用3d复合图，主Y轴为柱形图，从Y轴为线形图
				if(dimension == "2d"){
					src = "MSCombiDY2D.swf";
				}else if(dimension == "3d"){
					src = "MSColumn3DLineDY.swf";
				}
			}
			if(charType == "unieapx.chart.FusionLine"){
				dataset["renderAs"] = "Line";
				dataset["data"] = data;
				datasets.push(dataset);
			}else if(charType == "unieapx.chart.FusionBar"){
				dataset["renderAs"] = "Colum";
				dataset["data"] = data;
				datasets.push(dataset);
			}else if(charType == "unieapx.chart.FusionPie"){
				isPie = true;
				chartInfo["data"] = data;
				if(dimension == "2d"){
					src = "Pie2D.swf";
				}else if(dimension == "3d"){
					src = "Pie3D.swf";
				}
			}
			datas.push({"binding" : dataStoreName,"data" : data});
			//fusionPie			
			if(showZeroPies != null ){//是否显示0值的饼，默认为1(True)，0(False)	
				if(showPercentInToolTip=="true"){
					chartInfo["showZeroPies"] = 1;
				}else{
					chartInfo["showZeroPies"] = 0;
				}			
			}
			if(showPercentValues != null ){//是否显示百分数，默认为1(True)，0(False)
				if(showPercentValues=="true"){
					chartInfo["showPercentValues"] = 1;
				}else{
					chartInfo["showPercentValues"] = 0;
				}
			}
			if(showPercentInToolTip != null ){//在鼠标移动到数据点上的时候是否显示百分数，默认1(True)，0(False)
				if(showPercentInToolTip=="true"){
					chartInfo["showPercentInToolTip"] = 1;
				}else{
					chartInfo["showPercentInToolTip"] = 0;
				}
			}			
		});
		self.datas = datas;	
		self.datasets = datasets; 
		if(datasets.length > 0){
			chartInfo["dataset"] = datasets;
		}
		self.isPie = isPie;
		self.src = src
		if(self.src == ""){
			if(dimension == "2d"){
				self.src = "MSCombi2D.swf";
			}else if(dimension == "3d"){
				self.src = "MSCombi3D.swf";
			}
		}
		// 根据配置的xaxis构建x坐标轴
		if(category.length == 0){
			if(xaxis && xaxis != ""){
				var axisItems = xaxis.split(",");
				for(var index = 0, length = axisItems.length; index < length; index++ ){
					category.push({
						"label" : axisItems[index]
					});
				}
			}
		}
		var categories = [];
		categories.push({
			"category" : category
		});
		chartInfo["categories"] = categories;
		if(typeof(self.animation) != 'undefined'){
			chartInfo["animation"] = Number(self.animation);
		}
		if(self.caption != ""){//图表主标题
			chartInfo["caption"] = self.caption;
		}
		if(self.subCaption != ""){//图表副标题
			chartInfo["subCaption"] = self.subCaption;
		}	
		//numberFormat
		if(self.numberFormat != ""){
			var dataObj = window.eval('(' + self.numberFormat + ')');
			$.each(dataObj, function (name, value) {
				if(name == "decimals"){//主Y轴，设置保留小数的位数，四舍五入
					chartInfo["decimals"] = value;
				}             
				if(name == "forceDecimals"){//强制保留小数的位数
					chartInfo["forceDecimals"] = Number(value);
				}
				if(name == "formatNumberScale"){//是否格式化精度，如1000 ->1K 1000 K->1M ，默认为是，1(True)、0(False)
					chartInfo["formatNumberScale"] = Number(value);
				}
				if(name == "numberPrefix"){//主Y轴，数字前缀
					chartInfo["numberPrefix"] = value;
				}
				if(name == "numberSuffix"){//主Y轴，数字后缀（说明前缀和后缀如果要使用%等符号时，需要用 URL 编码值 % -> %25）
					chartInfo["numberSuffix"] = value;
				}
				if(name == "sDecimals"){//从Y轴，设置保留小数的位数，四舍五入
					chartInfo["sDecimals"] = value;
				}
				if(name == "sNumberPrefix"){//从Y轴，数字前缀
					chartInfo["sNumberPrefix"] = value;
				}
				if(name == "sNumberSuffix"){//从Y轴，数字后缀（说明前缀和后缀如果要使用%等符号时，需要用 URL 编码值 % -> %25）
					chartInfo["sNumberSuffix"] = value;
				}
			}); 
		}
		//divisionalLines
		if(self.divisionalLines != ""){
			var dataObj = window.eval('(' + self.divisionalLines + ')');
			$.each(dataObj, function (name, value) {
				if(name == "divLineColor"){//水平分割线的颜色
					chartInfo["divLineColor"] = value;
				}
				if(name == "showAlternateHGridColor"){//水平分割线之间的颜色是否交替，1(True)、0(False)
					chartInfo["showAlternateHGridColor"] = Number(value);
				}
				if(name == "adjustDiv"){//是否使用默认水平分割线 ，默认为使用，1(True)、0(False)
					chartInfo["adjustDiv"] = Number(value);
				}
				if(name == "numDivLines"){//在adjustDiv =’0’时使用，水平分割线的条数
					chartInfo["numDivLines"] = value;
				}
			});
		}		
		//background
		if(self.background != ""){
			var dataObj = window.eval('(' + self.background + ')');
			$.each(dataObj, function (name, value) {
				if(name == "bgColor"){//设置背景颜色
					chartInfo["bgColor"] = value;	
				}
				if(name == "bgSWF"){//设置背景图片，可以是图片或者swf的flash ，图片必须和表在同一域名下
					chartInfo["bgSWF"] = value;
				}
				if(name == "bgSWFAlpha"){
					chartInfo["bgSWFAlpha"] = value;
				}
			});
		}
		//border
		if(self.border != ""){
			var dataObj = window.eval('(' + self.border + ')');
			$.each(dataObj, function (name, value) {
				if(name == "showBorder"){//设置是否显示边框 ，默认2D类图表显示边框 ， 3D类图表不显示，1(True)、0(False)
					chartInfo["showBorder"] = Number(value);
				}
				if(name == "borderColor"){//边框颜色
					chartInfo["borderColor"] = value;	
				}
				if(name == "borderThickness"){//边框宽度，单位为像素
					chartInfo["borderThickness"] = value;
				}
			});
		}
		//canvas
		if(self.canvas != ""){
			var dataObj = window.eval('(' + self.canvas + ')');
			$.each(dataObj, function (name, value) {
				if(name == "canvasbgColor"){//画布背景色（多个颜色用逗号隔开，表示渐变）
					chartInfo["canvasbgColor"] = value;
				}
				if(name == "canvasbgAlpha"){//画布边框颜色
					chartInfo["canvasbgAlpha"] = value;
				}
				if(name == "canvasBorderColor"){//画布边框的宽度，单位为像素
					chartInfo["canvasBorderColor"] = value;	
				}
				if(name == "canvasBorderThickness"){
					chartInfo["canvasBorderThickness"] = value;
				}
			});
		}	
		//font
		if(self.font != ""){
			var dataObj = window.eval('(' + self.font + ')');
			$.each(dataObj, function (name, value) {
				if(name == "outCnvbaseFont"){//画布外字体，对画布外的所有元素起作用
					chartInfo["outCnvbaseFont"] = value;
				}
				if(name == "outCnvbaseFontSize"){//画布外字体大小
					chartInfo["outCnvbaseFontSize"] = value;
				}
				if(name == "outCnvbaseFontColor"){//画布外字体颜色
					chartInfo["outCnvbaseFontColor"] = value;
				}
				if(name == "baseFont"){//图表上所有文本的字体
					chartInfo["baseFont"] = value;	
				}
				if(name == "baseFontSize"){//图表上所有文本的字体大小
					chartInfo["baseFontSize"] = value;
				}
				if(name == "baseFontColor"){//图表上所有文本的字体颜色
					chartInfo["baseFontColor"] = value;	
				}
			});
		}	
		//legend
		if(self.legend != ""){
			var dataObj = window.eval('(' + self.legend + ')');
			$.each(dataObj, function (name, value) {
				if(name == "showLegend"){//是否显示图例，默认是0 ，1(True)、0(False)
					chartInfo["showLegend"] = Number(value);
				}
				if(name == "legendPosition"){//图例的位置：RIGHT （右侧）、 BOTTOM（底部）
					chartInfo["legendPosition"] = value;	
				}
				if(name == "legendBgColor"){//图例背景色
					chartInfo["legendBgColor"] = value;	
				}
				if(name == "legendBorderColor"){//图例边框颜色
					chartInfo["legendBorderColor"] = value;
				}
				if(name == "legendBorderThickness"){//图例边框线的宽度
					chartInfo["legendBorderThickness"] = value;
				}
			});
		}
		//display
		if(self.display != ""){
			var dataObj = window.eval('(' + self.display + ')');
			$.each(dataObj, function (name, value) {
				if(name == "showLabels"){//是否显示Label，默认为1(True),0(False)
					chartInfo["showLabels"] = Number(value);
				}
				if(name == "labelDisplay"){//标签的呈现方式（AUTO：超长屏蔽、WRAP：折行、STAGGER：倾斜、ROTATE：旋转、NONE：不显示）
					chartInfo["labelDisplay"] = value;
				}
				if(name == "rotateLabels"){//是否旋转显示Label，1(True),0(False)
					chartInfo["rotateLabels"] = Number(value);
				}
				if(name == "showValues"){//是否显示值，默认为1(True),0(False)
					chartInfo["showValues"] = Number(value);
				}
				if(name == "valuePosition"){//值显示位置
					chartInfo["valuePosition"] = value;
				}
				if(name == "rotateValues"){//是否旋转显示值，1(True),0(False)
					chartInfo["rotateValues"] = Number(value);
				}
			});
		}
		//xAxisProperty
		if(self.xAxisProperty != ""){
			var dataObj = window.eval('(' + self.xAxisProperty + ')');
			$.each(dataObj, function (name, value) {
				if(name == "xAxisName"){//X轴标题
					chartInfo["xAxisName"] = value;
				}
				if(name == "labelStep"){//X轴步长，每隔指定个柱子显示一个X坐标值
					chartInfo["labelStep"] = value;
				}
			});
		}
		//yAxis
		if(self.yAxis != ""){
			var dataObj = window.eval('(' + self.yAxis + ')');
			$.each(dataObj, function (name, value) {
				if(name == "yAxisName"){//Y轴标题
					chartInfo["yAxisName"] = value;
				}
				if(name == "rotateYAxisName"){//Y轴名称垂直放置，默认为1(True),0(False)（默认Y轴名称为垂直放置）
					chartInfo["rotateYAxisName"] = Number(value);
				}
				if(name == "showYAxisValues"){//是否显示Y坐标值，默认为1(True),0(False)
					chartInfo["showYAxisValues"] = Number(value);
				}
				if(name == "showLimits"){//是否y轴极限值，默认为1(True),0(False)
					chartInfo["showLimits"] = Number(value);
				}
				if(name == "showDivLineValues"){//是否显示Y轴除上下限值外的其他值，默认为1(True),0(False)
					chartInfo["showDivLineValues"] = Number(value);
				}
				if(name == "yAxisValuesStep"){//Y轴步长，每隔指定个值域显示一个Y坐标值
					chartInfo["yAxisValuesStep"] = value;
				}
				if(name == "yAxisMaxValue"){//指定Y轴最大值，数字
					chartInfo["yAxisMaxValue"] = value;
				}
				if(name == "yAxisMinValue"){//指定Y轴最小值，数字
					chartInfo["yAxisMinValue"] = value;
				}
				if(name == "setAdaptiveYMin"){//自动调节Y轴最小值，默认为 1(True)，0(False)
					chartInfo["setAdaptiveYMin"] = Number(value);
				}
			});
		}
		//pyAxis
		if(self.pyAxis != ""){
			var dataObj = window.eval('(' + self.pyAxis + ')');
			$.each(dataObj, function (name, value) {
				if(name == "pyAxisName"){//主Y轴标题
					chartInfo["pyAxisName"] = value;
				}
				if(name == "PYAxisMaxValue"){
					chartInfo["PYAxisMaxValue"] = value;
				}
				if(name == "PYAxisMinValue"){
					chartInfo["PYAxisMinValue"] = value;
				}
			});
		}
		//syAxis
		if(self.syAxis != ""){
			chartInfo["sdecimalPrecision"] = "0";//SYAxisMinValue不起作用
//			chartInfo["sformatNumberScale"] = "0";//SYAxisMinValue不起作用
			var dataObj = window.eval('(' + self.syAxis + ')');
			$.each(dataObj, function (name, value) {
				if(name == "sYaxisName"){//从Y轴标题
					chartInfo["sYaxisName"] = value;
				}
				if(name == "SYAxisMaxValue"){
					chartInfo["SYAxisMaxValue"] = value;
				}
				if(name == "SYAxisMinValue"){
					chartInfo["SYAxisMinValue"] = value;
				}
				if(name == "showDivLineSecondaryValue"){
					chartInfo["showDivLineSecondaryValue"] = Number(value);
				}
			});
		}		
		
		//bar
		if(self.bar != ""){
			var dataObj = window.eval('(' + self.bar + ')');
			$.each(dataObj, function (name, value) {
				if(name == "showPlotBorder"){//使用柱形图，是否显示柱子的边框，默认为1(True)、0(False)
					chartInfo["showPlotBorder"] = Number(value);
				}
				if(name == "useRoundEdges"){//使用柱形图，是否用圆角矩形和玻璃效果，1(True)、0(False)
					chartInfo["useRoundEdges"] = Number(value);
				}
				if(name == "placeValuesInside"){//使用柱形图，在showValues=1时将值内嵌在柱子中，1(True)、0(False)
					chartInfo["placeValuesInside"] = Number(value);
				}
			});
		}
		//trendLines
		if(self.trendLines != ''){
			var startValue = "";
			var endValue = "";
			var color = "";
			var displayValue = "";
			var dataObj = window.eval('(' + self.trendLines + ')');
			$.each(dataObj, function (name, value) {
				if(name == "startValue"){//使用柱形图或线形图，趋势线起始值
					startValue = value;
				}
				if(name == "endValue"){//使用柱形图或线形图，趋势线结束值
					endValue = value;
				}
				if(name == "color"){//使用柱形图或线形图，趋势线颜色
					color = value;
				}
				if(name == "displayValue"){//使用柱形图或线形图，趋势线显示值
					displayValue = value;
				}
			});
			chartInfo["trendLines"] = {				   
					"line":[{        
						"startValue":startValue,
						"endValue":endValue,
						"color":color,        
						"displayValue":displayValue}]
					
			};
		}	
		//palette
		if(self.palette != ""){
			chartInfo["palette"] = self.palette;
		}
		//paletteColors
		if(self.paletteColors != ""){
			chartInfo["paletteColors"] = self.paletteColors;
		}
		chartInfo["unescapeLinks"] = 0;
		self.chartInfo = chartInfo;
		self.containerNode.innerHTML = "";
		self._draw(self);
	},
	
	startup : function() {

	},
	
	destroy : function(){
		try{
//			var chartReference = this.chartReference;
//			if(chartReference && chartReference != null){
//				chartReference.dispose();
//				dijit.registry.remove(this.id);
//			}
			var chartReference = FusionCharts(this.id + "_chart");
			if(chartReference!=null){
				FusionCharts(this.id + "_chart").dispose();
				dijit.registry.remove(this.id);
			}
		}catch(e){
			console.log(e.message);				
		}
	},
	
	_draw : function(chart) {
		dojo.addOnLoad(function(){
			try{
//				var chartReference = chart.chartReference;
//				chartReference && chartReference.dispose();
//				var chartReference = new FusionCharts(chart.srcPrefix + chart.src, chart.id + "_chart", chart.width,chart.height, "0", "1");
//				chartReference.setJSONData (chart.chartInfo);
//				chart.containerNode.id = this.id + "_chart";
//				chartReference.render(chart.containerNode);
//				chart.chartReference = chartReference;
				
				var chartReference = FusionCharts(chart.id + "_chart");
				if(chartReference==null){
					chartReference = new FusionCharts(chart.srcPrefix + chart.src, chart.id + "_chart", chart.width,chart.height, "0", "1");
					chart.containerNode.id = chart.id + "_chartContainer";
				}				
				chartReference.setJSONData (chart.chartInfo);
				chartReference.render(chart.containerNode);
			}catch(e){
				console.log(e.message);				
			}
		});
	},
	
//	setDataStore : function(binding,dataStore) {
//		if(dataStore && binding && binding != null && binding != ''){
//			var index = this._getDataIndex(binding);
//			if(index >= 0){
//				this._setDataStore(index,dataStore);
//				this._draw(this);
//			}
//		}
//	},
	
	setDataStore : function(index,dataStore) {
		if(index >= 0){
			this._setDataStore(index,dataStore);
			this._draw(this);
		}	
		
	},
	
	setCaption : function(caption) {
		this.caption = caption;
		this.chartInfo["caption"] = caption;
	},
	
	_setDataStore : function(index,dataStore) {
		var data = [];
		if(dataStore!=null){
			var rowSet = dataStore.getRowSet(),
			category = [],
			buildAxis = true,
			dataClick = this.dataClick;
//			重构X轴
//			if(this.chartInfo["categories"]!=null){
//				buildAxis = (this.chartInfo["categories"][0]["category"].length > 0)?false:true;
//			}
			for ( var i = 0; i < rowSet.getRowCount(); i++) {
				var row = rowSet.getRow(i).getData(),
					dataLabel = row["label"],
					dataValue = row["value"];
				if(dataClick && dataClick != ""){
					data.push({
						"label" : dataLabel,
						"value" : dataValue,
						"link" : "j-" + dataClick + "-" + dojo.toJson({seriesIndex : index,pointIndex : i,data : {"label" : dataLabel,"value" : dataValue}})
					});
				}else{
					data.push({
						"label" : dataLabel,
						"value" : dataValue
					});
				}
				if(buildAxis){
					category.push({
						"label" : row["label"]
					});
				}
			}			
			if(buildAxis){
				var categories = [];
				categories.push({
					"category" : category
				});
				this.chartInfo["categories"] = categories;
			}	
		}else{
			//当只有一个图时，dataStore为空，则no data to display
			if(this.datasets.length == 1){
				this.chartInfo["categories"] = null;
			}			
		}
		if(this.isPie){
			this.chartInfo["data"] = data;
		}else{
			this.datasets[index]["data"]=data;
		}
		if(this.datasets.length > 0){			
			this.chartInfo["dataset"] = this.datasets;
		}
	},
	
	setDataStores : function(dataCenter) {
		var dataLength = -1;
		if(this.isPie){
			dataLength = 1;//饼图只能绘制一个
		}else{
			dataLength = this.datasets.length;
		}
		if(dataCenter){
			if(this.datas && this.datas.length > 0){
				var needReDraw = false;				
				for(var index = 0;index < this.datas.length; index++){
					var binding = this.datas[index]["binding"];
					if(binding != ''){
						var dataStore = dataCenter.getDataStore(binding);
						if(dataStore && dataStore != null){
							this._setDataStore(index,dataStore);
							needReDraw = true;
						}
					}
				}
				//如果没有binding则按dataCenter中dataStore的顺序绑定数据集
				if(!needReDraw){
					var dataStores = dataCenter.getDataStores();
					var index = 0;
					for(var key in dataStores){
						if(index>=dataLength){
							break;
						}
						var dataStore = dataCenter.getDataStore(key);
						if(dataStore && dataStore != null){
							this._setDataStore(index,dataStore);
							needReDraw = true;
							index++;							
						}
					}				
				}
				if(needReDraw){
					this._draw(this);
				}
			}
		}else{
			//如果dataCenter为空，相当于重置功能
			
			this._setNoData(dataLength);
			this._draw(this);
			
		}
	},
	
	_setNoData : function(dataLength) {
		var data = [];
		this.chartInfo["categories"] = null;
		if(this.isPie){
			this.chartInfo["data"] = data;
		}else{
			for(var index=0;index<dataLength;index++){
				this.datasets[index]["data"]=data;
			}			
		}
		if(this.datasets.length > 0){			
			this.chartInfo["dataset"] = this.datasets;
		}
	},
	
	_getDataIndex : function(binding){
		if(this.datas && this.datas.length > 0){
			for(var index = 0;index < this.datas.length; index++){
				var bindingStr = this.datas[index]["binding"];
				if(bindingStr != '' && bindingStr == binding){
					return index;
				}
			}
		}
		return -1;
	},
	
	_getDatas : function(){
		var datas = [];
		if(this.datas && this.datas.length > 0){
			for(var index = 0;index < this.datas.length; index++){
				datas.push(this.datas[index]["data"]);
			}
		}
		return datas;
	}
});
