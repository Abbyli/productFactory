/**
acap.test={
		layouts:{
			someLayoutId:{
				ration:"50%,30%,20%",
				table:[[{cs:3,rs:1}],[{},{},{}]]
				}
			},
		widgets:{widget1:{},widget2:{}},
		workspace:{
			layoutId:'someLayoutId',
			cells:[[{widgetId:'widget1',individual:{title:'测试1'}}],[{widgetId:'widget2',individual:{title:'测试2'}}],[{widgetId:'widget1',individual:{title:'测试3'}}],[{widgetId:'widget1',individual:{title:'测试4'}}]]
		}
};
*/
;;
(function(){
	/**
	 * 定义控件常量信息
	 */

	
//!dojo.isObject('acap')&&(acap={});
if(!unieap){
	unieap={};
}

acap = unieap;

//定义国际化信息变量
unieap['i18n']={};

//	数据结构key名称
//		整体结构：{layouts:{someLayoutId:{}},widgets:{someWidgetId:{}},workspace:{layoutId:'',cells:{}}}

//	layouts内部结构
//		{layouts:{someLayoutId:{ration:"30%,20%,50%",table:[[{cs:3,rs:1}],[{},{},{}]]}}}
unieap.layouts={
	id : 'layouts', 
	ration : 'ration',
	table : 'table',
	cs : 'cs',
	rs : 'rs',
	autoHeight:'autoHeight'
};

unieap.widgets={
	id : 'widgets'
};

if(!unieap.widget){
	unieap.widget = {};
}
/**
 * 用来标识widget状态的常量
 */
dojo.mixin(unieap.widget,{
	state:"state",
	normal:0,//widget可以正常访问
	unusable:1,//widget对应的bundle已经停止，该widget不可用
	noprivilege:2//当前用户对于该widget没有访问的权限
});
//unieap.widget={
//	state:"state",
//	normal:0,//widget可以正常访问
//	unusable:1,//widget对应的bundle已经停止，该widget不可用
//	noprivilege:2//当前用户对于该widget没有访问的权限
//};

//	workspace内部结构
//		{workspace:{layoutId:'',cells:[[{widgetId:'',individual:{}}],[]]}}
unieap.workspace={
	id : 'workspace',
	cells : 'cells',
	layoutId : 'layoutId',
	widgetId : 'widgetId',
	individual : 'individual'
};
//定义发布和订阅事件
//unieap.publish = dojo.publish;
//unieap.subscribe = dojo.subscribe;
//unieap.unsubscribe = dojo.unsubscribe;

//获取contextpath
unieap.getContextPath = function(){
	var head = document.getElementsByTagName("head")[0] || document.documentElement;
	var scripts = head.getElementsByTagName("script");
	for(var i=0;i<scripts.length;i++){
		if(scripts[i].src){
			if(!window.location.contextPath && /\/dojo\/dojo\.js$/g.test(scripts[i].src)){
				var startIndex = window.location.href.lastIndexOf(window.location.pathname),
					src = scripts[i].src,
					endIndex = src.lastIndexOf("/components/"),
					hostname = window.location.href.substring(0,startIndex);
				window.location.contextPath = src.substring(src.indexOf(hostname)==0 ? hostname.length : 0,endIndex);
			}
		}
	}
	return window.location.contextPath||"";
};


unieap.baseUrl=unieap.getContextPath();



unieap.transformTemplate = function(templateString){
	/**
	 * var template = "<div class='#{className}'><lable>#{content}</label></div>";
	 * var transform = $.transformTemplate(template);
	 * var html = transform({className : "welcome",content:"hello world."});  
	 * 
	 * 		or
	 * var template = "<div class='#{0}'><lable>#{1}</label></div>";
	 * var transform = $.transformTemplate(template);
	 * var html = transform([ "welcome","hello world."]);  
	 */
	var str = templateString, 
		expression = /#\{[<>a-zA-Z0-9]+\}/,
		substitute =  /(#\{)|(\})/g,
		markup = [],
		mapping =[]
		r = null;
	while(r = str.match(expression)){
		var index = r.index;
		if(index!=0){
			markup.push(str.substring(0,index));
		}
		mapping.push([markup.length,r[0].replace(substitute,"")]);
		markup.push(r[0]);
		str = str.substring(index+r[0].length);
	}
	str!="" && markup.push(str);
	return function(data){
			var html = [];
			for(var i=0,map;map =mapping[i];i++){
				var index = map[0],
			  	name = map[1],
			  	value = data[name]!=null ? String(data[name]) : "&nbsp;";
				markup[index] = value;
			}	
			html.push(markup.join(""));
			return html.join("");
		}
};


//根据widget唯一标示获得widget的信息
unieap.getWidgetInfoById=function(widgetId,sync,callback){
	var widgetInfo=null;
	if(arguments.length==2){
		dojo.isFunction(sync)?(callback=sync):(sync=sync);
	}
	typeof(sync)=='undefined'&&(sync=false);
	// dojo.xhrGet({
	    // url :  unieap.baseUrl+"/widgetAction!getWidget.action?widgetId="+widgetId,
	    // headers : {ajax : true},
		// sync:sync,
	    // preventCache:true,
		    // load: function(res){ 
				// widgetInfo=dojo.fromJson(res);
				// callback&&callback(obj);
			// }
		// });
	
	unieap.widget.requestData({
			url:unieap.widget.url.GETWIDGET,
			parameters:{widgetId:widgetId},
		    headers : {ajax : true},
		    sync:sync,
            load: dojo.hitch(this,function(result){
            	widgetInfo = result;
				callback&&callback(obj);
			})
	},false)
	return widgetInfo;
}

/**
 * 将array中index索引除插入某个数据
 */
unieap.append=function(array,index,value){
	if(!dojo.isArray(array)) return;
	index<=-1&&(index=0);
	if(index>=array.length){
		array.push(value);
		return array;
	}
	array.splice(index,0,value);
	return array;
}

/**
 * 获得国际化信息
 * @example:
 * |	var refreshTitle=acap.getText("widget.refresh"),
 * |		addWidgetTitle=acap.getText("workspace.addWidget");
 */
unieap.getText=function(key,scope){
	!scope&&(scope=unieap.i18n);
	if(!dojo.isObject(scope)) return "";
	return dojo.getObject(key,false,scope)||"";
}


/**
 * widget中与后台请求相关的属性和方法
 */
unieap.widget.url = {
	GETWORKSPACE:unieap.getContextPath()+"/widgetAction!getWorkspace.action",
	GETLAYOUTS:unieap.getContextPath()+"/widgetAction!getLayouts.action",
	SAVEWORKSPACE:unieap.getContextPath()+"/widgetAction!saveWorkspace.action",
	LAYOUTDEFAULTURL:unieap.getContextPath()+"/resource/images/layouts/fixed.png",
	GETWIDGETCATEGORY:unieap.getContextPath()+"/widgetAction!getAccoutWidgetCategory.action",
	GETWIDGET:unieap.getContextPath()+"/widgetAction!getWidget.action",
	GETWIDGETDEFAULTBUTTONICON:unieap.getContextPath()+"/components/widget/resource/images/widgets/widget_default_button_icon.png",
	GETWIDGETDEFAULTICON:unieap.getContextPath()+"/components/widget/resource/images/widgets/widget_default.png"
}

unieap.widget.requestData = function(data,showLoading){
	var requestURL =  unieap.widget.buildRequestPath(data.url,data.parameters);
	var content = data.content&&dojo.isObject(data.content)?data.content:null; 
     if(!data.sync&&showLoading!=false){ //异步
     	unieap.showLoading(true);
     }
     var result = null;
     dojo.rawXhrPost({
         url: requestURL,
         sync: data.sync,
         preventCache: (data.preventCache ? data.preventCache : true),
         timeout: ((data.timeout) ? data.timeout : 120*1000),
         headers : dojo.mixin({ajaxRequest:true}),
         content: content,
         load: function(text, args){ 
         	result = text;    
         	if(!data.sync&&showLoading!=false){ //异步显示进度条
	            	unieap.showLoading(false);
	            }
	            try{
	            	result = dojo.fromJson(text);
	            }catch(e){
	            }
	            //超时处理
            	if(_timeoutProcess(result,data,showLoading)) 
            		return;
            		
            	//帐号被踢出的处理(用于v4)
            	if(_accountKickedProcess(result))
            		return;
				function complete(){
				   if (data.load) {	
							try{
								data.context?data.load.call(data.context, result, args.xhr):data.load( result, args.xhr);
							}catch(e){
								//alert("请求数据成功！但回调方法出错；请检查自定义load回调函数。\n "+dojo.toJson(e,true));
								alert(e);
								alert("请求数据成功，调用回调方法时出现错误！");
							}
					}
				}
				complete();
         },
		error: function(text, args) {
			result = text.responseText;
			if(!data.sync&&showLoading!=false){ //异步
	            unieap.showLoading(false);
	         }
		     if(_timeoutProcess(result,data,showLoading)) 
	            	return;
	            //帐号被踢出的处理(用于v4)
         	if(_accountKickedProcess(result))
         		return;
			if (data.error) {
				data.context?data.error.call(data.context, result, args.xhr):data.error(result, args.xhr)
			}
		}
     });
     //同步返回
     if(data.sync){ 
     	return result; 
     } 
}

unieap.widget.buildRequestPath = function(url,parameters){
	 var path = [];
	 for(var name in parameters){
			path.push(name+"="+encodeURIComponent(parameters[name]));
		 }
		 if(path.length==0){
			return url;
		 }
		 path = path.join("&");
		 return url.concat(url.lastIndexOf("?")>0?"&":"?" ).concat(path);  
}
})();



