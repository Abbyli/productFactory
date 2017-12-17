(function(){
	if(window.widgetContext) return;
	
	try{
		parent.dijit;
		
		widgetContext = {
			_subscribe : [],	
			_events : [],
			publish : function(/*String*/ topic, /*Array*/ args){
				parent.dojo.publish(topic,args);
			},
			subscribe : function(/*String*/ topic, /*Object|null*/ context, /*String|Function*/ method){
				var handle = parent.dojo.subscribe(topic,context,method);
				this._subscribe.push(handle);
				return handle;
			},
			unsubscribe : function(/*Handle*/ handle){
				parent.dojo.unsubscribe(handle);
			},
			getWidget : function(){
				if(null==this.widget){
					var node = window.frameElement;
					while(node){
						if(node.getAttribute && (this.widget = parent.dijit.byNode(node))){
							break;
						}
						node = node.parentNode;
					}
				}
				return this.widget;
			},
			startup : function(){
				var self = this;
				//监听放大事件
				this.subscribe("widget-after-max", null, function(widget) {
					if (widget != self.getWidget()) {
						return;
					}
					if(window.onMax){
						onMax();
					}
				});
				//监听恢复事件
				this.subscribe("widget-after-normal", null, function(widget) {
					if (widget != self.getWidget()) {
						return;
					}
					if(window.onNormal){
						onNormal();
					}
				});
				//监听缩小事件
				this.subscribe("widget-after-min", null, function(widget) {
					if (widget != self.getWidget()) {
						return;
					}
					if(window.onMin){
						onMin();
					}
				});
				
				this.getWidget()&&this._events.push(this.getWidget().addEvent('iconMenuEvent',null,function(eventName){
					if(eventName == 'config'){
						self.openSetting();
					}
					if(window[eventName]){
						window[eventName]();
					}
				}));
				this.getWidget()&&this._events.push(this.getWidget().addEvent('customButtonEvent',null,function(eventName){
					//自定义按钮的响应事件
					if(window[eventName]){
						window[eventName]();
					}
				}));
				this.getWidget()&&this._events.push(this.getWidget().addEvent('refresh',null,
						function(){
							self.refresh();
						}
				));
				this.getWidget()&&this._events.push(this.getWidget().addEvent('resize',null,
						function(){
							self.resize();
						}
				));
			},
			onHeightResize : function(/*Number*/height){
				if(this.getWidget()){
					this.getWidget().setContentHeight(height);				
				}
			},
			setIndividualValue : function(/*String*/key,/*Object*/value){
				if(this.getWidget()){
					this.getWidget().setIndividualValue(key,value);
				}
			},
			getIndividualValue : function(key){
				if(this.getWidget()){
					return this.getWidget().getIndividualValue(key);
				}else{
					return {};
				}
			},
			getRoot : function(){
				return document.body;
			},
			resizeWidgetHeight : function(){
//				var newHeight = document.body.offsetHeight;
				var newHeight = document.documentElement.scrollHeight;//modified by xiexq
				this.onHeightResize(newHeight);
			},
			openSetting : function(){
				var node = parent.dojo.query(">.widget-setting",this.getRoot())[0];
				if(node){
					node.style.display = "block";
					this.resizeWidgetHeight();
				}
			},
			closeSetting : function(){
				var node = parent.dojo.query(">.widget-setting",this.getRoot())[0];
				if(node){
					node.style.display = "none";
					this.resizeWidgetHeight();
				}
			},
			destroy : function(){
				if(this.getWidget()){
					parent.dojo.forEach(this._events,this.getWidget().removeEvent,this.getWidget());
					parent.dojo.forEach(this._subscribe,this.unsubscribe);
				}
				if(window["destroy"]){
					window["destroy"]();
				}
			},
			refresh:function(){
				if(window["refresh"]){
					window["refresh"]();
				}
			},
			resize : function(){
				if(window["resize"]){
					window["resize"]();
				}
			}
		};
	}catch(e){
		//如果是跨域访问
		widgetContext = {
			startup : function(){
				var iframe = this.iframe = document.createElement("iframe");
				iframe.style.position = "absolute";
				iframe.style.width = "1px";
				iframe.style.left = "-100px";
				document.body.appendChild(iframe);
				var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement,
					scripts = head.getElementsByTagName("script");
				for(var i=0,src,script;script= scripts[i];i++){
					if(/acap\/widget\/domain\/interaction.js$/ig.test(src=script.src)){
						var widgetId = window.location.hash;
						this.href = src.substring(0,src.lastIndexOf("/")) + "/interaction.html?widgetId=" + widgetId.substring(1) ;
						//iframe.src = this.href; 
						break;
					}
				}
				
			},
			resizeWidgetHeight : function(){
				var newHeight = document.body.offsetHeight;
				this.onHeightResize(newHeight);
			},
			onHeightResize : function(height){
				this.iframe.src = this.href+"&time=" + new Date().getTime() + "#{height:"+height+"}";
			},
			destroy : function(){
				delete this.iframe;
			}
		};
	}

	//页面的onreize事件
	var oldWidth ;
	function windowResize(){
		var newWidth = document.body.offsetWidth;
		if(oldWidth == newWidth) return;
		oldWidth = newWidth;
		var newHeight = document.body.scrollHeight;
		widgetContext.onHeightResize(newHeight);
	}
	
	
	//页面加载事件
	function windowLoad(){
		//设置高度为auto
		var bstyle = document.body.style;
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		if("auto"==widgetContext.getWidget().height){
			document.body.style.height = "auto";
		}
		oldWidth = document.body.offsetWidth;
		window.attachEvent ? 
		window.attachEvent("onresize", windowResize) : 
		window.addEventListener("resize", windowResize, false);
		//初始化方法
		widgetContext.startup();
		//主动触发执行resize操作
		setTimeout(function(){
			widgetContext.resizeWidgetHeight();
		},0);
	}
	//卸载页面
	function windowUnLoad(){
		widgetContext.destroy();
		if(window.attachEvent){
			window.detachEvent("onresize", windowResize);
			window.detachEvent("onload", windowLoad);
			window.detachEvent("onbeforeunload", windowUnLoad);
		} 
		else{
			window.removeEventListener("resize", windowResize, false);
			window.removeEventListener("load", windowLoad, false);
			window.removeEventListener("beforeunload", windowUnLoad, false);
		}
	}
	//添加load事件
	if(window.attachEvent){
		window.attachEvent("onload", windowLoad);
		window.attachEvent("onbeforeunload", windowUnLoad);
	} 
	else{
		window.addEventListener("load", windowLoad, false);
		window.addEventListener("beforeunload", windowUnLoad, false);
		
		//在firfox中，拖拽widget会刷新iframe，此时不会执行 beforeunload事件，故增加以下事件，以保证事件正常释放
		window.addEventListener("unload", windowUnLoad, false);
	}
})();