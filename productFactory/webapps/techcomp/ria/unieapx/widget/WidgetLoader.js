dojo.provide("unieapx.widget.WidgetLoader");

dojo.declare("unieapx.widget.WidgetLoader", null,{
	/**
	 * @summary:
	 * 		widget 控件加载内容控制器
	 * @description：
	 * 		TODO 待补充
	 */
	
	
	widget:null,
	
	
	/**
	 * content：{
	 * 		"src" : "normal.jsp"
	 * 		"load-pattern" : "ifame"
	 * }
	 * 
	 */
	constructor:function(parameters){
		dojo.mixin(this,parameters);
	},
	
	startup:function(){
//		if(this.widget.header[unieap.widget.state]==null||this.widget.header[unieap.widget.state]=='undefined'){
//			var me = this;
//				dojo.xhrGet({
//		            url :  unieap.getContextPath()+"/widgetAction!getWidgetState.action?widgetId="+this.widget.wid,
//		            headers : {ajax : true},
//		            preventCache : true,
//		            sync:true,
//		            load: dojo.hitch(this,function(response){ 
//			    		//根据workspaceId调用后台，获取页面的数据
//		            	var result = dojo.fromJson(response);
//		            	me.widget.header[unieap.widget.state] = result.state;
//					}),
//					error:function(e){
//						alert("请求后台数据出错")
//					}
//				});
//		}
		if(this.widget.header[unieap.widget.state]==unieap.widget.unusable){
			//bundle已经停止，widget不可用
			this.src = "/components/widget/pages/error/widgetStopped.jsp";
		}else if(this.widget.header[unieap.widget.state]==unieap.widget.noprivilege){
			//没有权限
			this.src = "/components/widget/pages/error/widgetNoPrivilege.jsp";
		}
		if("xhr"==this["load-pattern"]){
			//xhr
			this._loadXHR();
		}else{
			//iframe
			this._loadIframes();
		}
	},
	
	/*
	 * @summary:
	 * 		加载XHR部分内容
	 */
	_loadXHR:function(){
		dojo.require("unieap.patch.loader");
		dojo.require("unieap.util.util");
		this.rootNode= dojo.create("div",{id:this.widget.id+"_root",'class':'unieap'},this.widget.containerNode,'first');
		if("auto"!=this.widget.height){
			dojo.style(this.rootNode,"height","100%");
		}
		//unieap.showLoading = unieap.widget.showLoading;
		unieap.loader.load({
			url : this._getURL(this.src),
			node : this.rootNode,
			showLoading : true,
			injectTemplate : "unieap/widget/WidgetContext.template"
		})
	},
	
	/*
	 * @summary:
	 * 		加载iframe
	 */
	_loadIframes:function(){
		this.iframes={};
		var _self = this;
		if(this.src){
			var url = this._getURL(this.src,true);
			var  fn= dojo.create("iframe");
			// add by lugj  增加loading条
			fn.onreadystatechange = fn.onload = function(evt){
				if (!this.readyState || 
					this.readyState == "loaded" || 
					this.readyState == "complete") {
					_self._showLoading(_self.widget.containerNode,loadingMask,false);
				}
			};
			fn.setAttribute('frameborder', '0', 0);
			fn.style.width="100%";
			fn.src=url;
			// add by lugj  增加loading条
			var loadingMask = null;
			loadingMask = this._showLoading(this.widget.containerNode,loadingMask,true);
			if(this.widget._fixHeight){
				fn.style.height="100%";
			}else{
				fn.setAttribute('scrolling', 'no', 0);
			}
			//add by xiexq, iframe内部出滚动条 
			fn.setAttribute('scrolling', 'yes', 0);

			this.widget.containerNode.appendChild(fn);
			this.iframes['normal']=fn;
			
//			this._showLoading(this.widget.containerNode,loadingMask,false);
		}
	},
	
	// add by lugj  增加loading条
	_showLoading:function(node,loadingMask,isShow){
		if(null==loadingMask){
			var html = ["<div class='loading-alpha'></div>"];
			html.push("<div class='loading-p'>");
			html.push("<div id= '"+ node.id +"loadingContent' class='loading-content'>");
			html.push("<div class='loading-text'>");
			html.push(RIA_I18N.util.util.loading);
			html.push("</div>");
			html.push("<div class='loading-img'></div>");
			html.push("<div class='loading-cancel'></div>");
			html.push("</div>");
			html.push("</div>");
			loadingMask = dojo.create("div");
			loadingMask.className = "loading";
			loadingMask.innerHTML = html.join("");
			var cancel = dojo.query(".loading-cancel",loadingMask)[0];
			dojo.connect(cancel,"onclick",function(){
				dojo.style(loadingMask,"display","none");
			});
			node &&	node.appendChild(loadingMask);
			var loadingContent = document.getElementById(node.id + "loadingContent");
			loadingContent.style.left = "-" + Math.floor(dojo.contentBox(loadingContent).w/2);
			loadingContent.style.top = "-" + Math.floor(dojo.contentBox(loadingContent).h/2);
		}
		dojo.style(loadingMask,"display",isShow==false ? "none" : "block");
		return loadingMask;
	},
	
	/**
	 * 重新加载Widget的内容
	 */
	reload:function(){
		if("xhr"==this["load-pattern"]){
			if(this.widget.widgetContext){
				this.widget.widgetContext.destroy();
			}
			//xhr
			unieap.loader.load({
				url : this._getURL(this.src),
				node : this.rootNode,
				showLoading : true,
				injectTemplate : "unieap/widget/WidgetContext.template"
			})
		}else{
			//iframe
			this.iframes['normal'].src=this._getURL(this.src,true);
		}
	},
	
	//设置widget高度
	setContentHeight:function(height){
		dojo.style(this.iframes['normal'],'height',height+"px");
	},
	
	destroy:function(){
		if("xhr"==this["load-pattern"]){
			dojo.require("unieap.global");
			unieap.destroyWidgets(this.rootNode);
			if(this.widget.widgetContext){
				this.widget.widgetContext.destroy();
			}
		}
		else{
			dojo.isIE && (this.iframes['normal'].src="about:blank");
		}
	},
	
	_getURL:function(url,bool){
		var contextPath = unieap.getContextPath();
		var myurl = url;
		if(myurl.indexOf("http")!=0){
			myurl = contextPath + (((myurl.indexOf("/")==0)?"":"/")+myurl);
		}
		if(window['getWidgetParameters']){
			myurl = myurl.concat(myurl.lastIndexOf("?")>0?"&":"?" ).concat(window['getWidgetParameters']());  
		}
		return myurl + (bool?("#"+this.widget.id):"");
	}
});