dojo.provide("unieapx.widget.Widget");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.fx");
dojo.declare("unieapx.widget.Widget", [dijit._Widget,dijit._Templated],{
	/**
	 * @summary:
	 * 		widget 控件
	 * @description：
	 * 		TODO 待补充
	 * 
	 */
	
	templateString:
		"<div>"+
			"<div  class=\"widgetPaneTitle\" dojoAttachPoint=\"titleBarNode\">"+
				"<div class=\"widgetPaneTitleFocus\" dojoAttachPoint=\"focusNode\">"+
					"<table cellPadding=0 cellSpacing=0 style=\"table-layout: fixed;width:100%;height:18px;\"><tr>"+
						"<td class=\"widgetPaneTextNode\" style='height:18px;'>"+
							"<span dojoAttachPoint=\"titleNode\" ></span>"+
						"</td>"+
						"<td  align='right' dojoAttachPoint=\"iconsNode\" class=\"icons\" style=\"display:none\">"+
						"</td>"+
					"</tr></table>"+
				"</div>"+
			"</div>"+
			"<div class=\"widgetPaneContentOuter\" dojoAttachPoint=\"hideNode\" >"+
				"<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\" role=\"presentation\">"+
					"<div class=\"widgetPaneContentInner\" dojoAttachPoint=\"containerNode\" id=\"${id}_pane\">"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>",
	
		
		
	
	/**
	 * @summary:
	 * 		高度
	 */
	height:"",
	
	/**
	 * @summary:
	 * 		宽度
	 */
	width:"",
	
	
	/**
	 * @summary:
	 * 		Widget 头部信息
	 */
	header:null,
	
	/**
	 * @summary:
	 * 		个性化信息
	 */
	individual:null,

	/**
	 * @summary:
	 * 		widget 内容部分信息
	 * @description:
	 * {
	 * 	"content" : {
	 * 		"src" : "normal.jsp",
	 * 	    "load-pattern" : "ifame",
	 * 	},
	 * }
	 */
	body:null,
	
	
	
	/**
	 * @summary
	 * 		If true, the widget can not be draggable.
	 */
	dragRestriction:false,
	
	/*
	 *@summary:
	 * 		widget的状态信息
	 */
	_state:'normal',
	
	
	/*
	 *@summary:
	 *		是否为固定高度
	 */
	_fixHeight : false,
	/**
	 * @summary:
	 * 		自动刷新时间
	 */
	autoRefresh : 0,
					
	baseClass: "widgetPane",
	/**
	 * 是否可以编辑标题
	 */
	titleditable : false,
	
	defaultTitle:{
			"refresh":unieap.getText("widget.refresh"),
			"setting":unieap.getText("widget.configuration"),
			"min":unieap.getText("widget.min"),
			"max":unieap.getText("widget.max"),
			"close":unieap.getText("widget.close"),
			"restore":unieap.getText("widget.restore")
		},
	
	postMixInProperties: function(){
		this._events = {};
		if(this.height&&this.height=="auto"){
			this.height="";
		}
		if(this.width&&this.width=="auto"){
			this.width="";
		}
		this.inherited(arguments);
		
		if(this.header){
			if("hidden"==this.header.visible){
				this.header.visible=false;
				this.header.hideTitle=true;
			}
		}
	},
	
	
	postCreate:function(){
		dojo.addClass(this.domNode,this.baseClass);
		//创建标题栏
		this._createHeader();

		this._loadindividual();

		//创建内容加载器
		this._createLoader();
		
		if(this.header.noborder){
			dojo.addClass(this.domNode,"noborder");
		}
	},
	
	addWidgetContext : function(widgetContext){
		this.widgetContext = widgetContext;
	},	
	
	startup:function(){
		if(this._started){ return; }
		//固定高度处理
		this._FixHeightWidth();
		
		//创建动画效果
		this._createFX();

		//加载widget内容
		this.loader.startup();

		this.inherited(arguments);

		//当窗口大小改变(或滚动),且widget处于最大化时,需要重新计算高度
//		dojo.forEach(['onresize','onscroll'],function(event){
//			this.connect( dojo.global, event, function(){
//				this.resize();
//			});
//		},this);
		// modify by lugj
		dojo.forEach(['onresize'],function(event){
			this.connect( dojo.global, event, function(){
				this.resize();
			});
		},this);
		
		//自动刷新
		if(this.autoRefresh){
			var widget = this;
			setInterval(function(){
				widget.fireEvent("refresh");
			}, this.autoRefresh);
		}
	},
	
	setTitle:function(title){
		this.titleNode.innerHTML = title;
		dojo.attr(this.focusNode,"title",title);
	},
	

	resize:function(){
		if(this._state == "max"){
			var self1=this;
			if(this._timeoutjob){
				clearTimeout(this._timeoutjob);
			}
			this._timeoutjob = setTimeout(function(){
				self1._doFX("max","max");
			},300);
		}
	},
	

	/**
	 * @summary:
	 * 		设置容器内的内容高度
	 * @param height
	 */
	setContentHeight:function(height){
		if(!this._fixHeight){
			this.loader.setContentHeight(height);
		}
	},
	
	
	_loadindividual:function(){
		var title = this.getIndividualValue("title",false);
		title&&this.setTitle(title);
	},
	
	
	/**
	 * 
	 * @param key	属性名
	 * @param value	属性值
	 * @param isAttr	
	 * 		是否是用户自定义属性，如果是则存储在attributes节点下。
	 * 		默认是存储在attributes下。
	 */
	setIndividualValue:function(key,value,isAttr){
		this.individual = this.individual||{};
		if(arguments.length>2&&!isAttr){
			//当三个参数，且isAttr为false时，将个性化信息存储到individual上，否则存储到individual['attributes']中
			this.individual[key]=value;
		}else{
			this.individual['attributes']=this.individual['attributes']||{};
			this.individual['attributes'][key]=value;
		}
		dojo.publish("widget-individual-changed",[this]);
	},
	
	/**
	 * @summary:
	 * 		获取个性化属性的值
	 */
	getIndividualValue:function(key,isAttr){
		this.individual = this.individual||{};
		if(arguments.length>1&&!isAttr){
			//当两个参数，且isAttr为false时，读取个性化信息从individual上，否则从individual['attributes']中读取
			return this.individual[key];
		}
		this.individual['attributes']=this.individual['attributes']||{};
		return this.individual['attributes'][key];
	},
	
//	/**
//	 * @summary:
//	 * 		清楚个性化属性的值
//	 */
//	clearIndividualValue:function(key,isAttr){
//		this.individual = this.individual||{};
//		if(arguments.length>1&&!isAttr){
//			//当两个参数，且isAttr为false时，读取个性化信息从individual上，否则从individual['attributes']中读取
//			delete this.individual[key];
//		}else{
//			this.individual['attributes']=this.individual['attributes']||{};
//			delete this.individual['attributes'][key];
//		}
//	},
	
	/**
	 * @summary:
	 * 		获取个性化信息，返回的是个大对象
	 * 		{title:"",attributes:{key1:'value1'}}
	 * 		其中的attributes中的属性值是供用户自定义的。
	 */
	getIndividual:function(){
		return this.individual;
	},
	

	
	/**
	 * @summary:
	 * 		获取状态信息
	 */
	getState:function(){
		return this._state;
	},
	
	/*
	 * @summary:
	 * 		销毁控件
	 */
	destroy:function(){
		this.WidgetFXManager.destroy();
		this.fireEvent("destroy");
		if(this.__events){
			dojo.forEach(this.__events,this.removeEvent,this);
		}
		this.loader && this.loader.destroy();
		this.loade=null;
		this.inherited(arguments);
	},
	
	getWidth : function(){
		return dojo.marginBox(this.domNode).w;
	},
	
	getHeight : function(){
		return dojo.marginBox(this.domNode).h;
	},
	
	
	setHeight : function(height){
		var mh = dojo.marginBox(this.domNode).h,
		ch = dojo.contentBox(this.domNode).h;
		var nh = height -(mh-ch);
		if(this.getState() == "normal"){
			dojo.style(this.domNode,"height",nh+"px");
			this._resizeHeight();
		}
	},
	
	
	
	/*
	 *@summary:
	 *		处理固定高度 ,初始化时调用
	 */
	_FixHeightWidth:function(){
		if(this.height){
			this.domNode.style.height = this.height;
			this._fixHeight = true;
		}
		if(this.width){
			this.domNode.style.width = this.width;
		}
		if(this.domNode.style.height){
			var mb =dojo.marginBox(this.containerNode);
			var cb=dojo.contentBox(this.containerNode);
			var tb=	dojo.marginBox(this.titleBarNode);
			if(!this.header.visible){
				tb.h=0;
			}
			var dc=dojo.contentBox(this.domNode);
			var _h = dc.h-tb.h-(mb.h-cb.h);
			if(_h<=0){
				_h = 1;
			}
			dojo.style(this.containerNode,'height',_h+"px");
		}
	},
	
	/*
	 *	由layout调用 
	 */
	_resizeHeight:function(){
		if(this.domNode.style.height){
			var mb =dojo.marginBox(this.containerNode);
			var cb=dojo.contentBox(this.containerNode);
			var tb=	dojo.marginBox(this.titleBarNode);
			if(!this.header.visible){
				tb.h=0;
			}
			var dc=dojo.contentBox(this.domNode);
			var _h = dc.h-tb.h-(mb.h-cb.h);
			if(_h<=0){
				_h = 1;
			}
			dojo.style(this.containerNode,'height',_h+"px");
		}
		if(null!=this.WidgetFXManager){
			this.WidgetFXManager._resizeHeight();
			this.fireEvent("resize");
		}
	},
	
	/*
	 * @summary:
	 * 		创建头部信息，如：图标 标题等信息
	 */
	_createHeader:function(){
		this.icons={};
		//只有一个标示状态的信息
		//TODO：不应该将其放在header之中，应该在后台构建一个单独的字段
		if(!this.header){
			//没有头部将不可以拖拽
			this.dragRestriction = true;
			dojo.addClass(this.titleBarNode,"noTitle");
			this.header = {};
			return;
		}
		var buttons = this.header.buttons;
		if(!buttons){
			buttons  = [{type:"refresh"},{type:"setting"},{type:"min"},{type:"max"},{type:"close"}];
		}
		var self1 = this;
		dojo.forEach(buttons,function(iconobject){
			if(iconobject.type){
				//具有type属性，为已定义的按钮类型
				//创建按钮区域
				var icon = dojo.create("div",{
					"class": "widgetIcon " + "widgetIcon"+iconobject.type,
					"title":self1.defaultTitle[iconobject.type]||iconobject.type
				},self1.iconsNode,"first");
				self1.connect(icon, "onmouseover", function(){
					//dojo.addClass(icon, "widgetIconHover");
				});
				self1.connect(icon, "onmouseout", function(){
					//dojo.removeClass(icon, "widgetIconHover");
				});
				self1.icons[iconobject.type] = icon;
				self1.connect(icon,"onclick",dojo.hitch(self1,self1._iconClick));
				if(iconobject.menus){
					self1._createIconMenu(icon,iconobject);
				}
			}else{
				//没有type属性，说明是用户自定义的按钮
				var iconPath = iconobject.iconPath?unieap.getContextPath()+iconobject.iconPath:unieap.widget.url.GETWIDGETDEFAULTBUTTONICON;
				var title = iconobject.title||"";
				var icon = dojo.create("div",{
					"class": "widgetIcon ",
					"style": "background: url('"+iconPath+"') no-repeat",
					"title": title
				},self1.iconsNode,"first");
				
				//鼠标样式
				if(iconobject.iconHoverPath){
					//如果设置了鼠标移上去的样式
					self1.connect(icon, "onmouseover", function(){
						dojo.style(icon,"background"
								,"url('"+unieap.getContextPath()+iconobject.iconHoverPath+"') no-repeat");
						
					});
					self1.connect(icon, "onmouseout", function(){
						dojo.style(icon,"background"
								,"url('"+iconPath+"') no-repeat");
					});
				}
				
				
				self1.connect(icon,"onclick",function(){
					var event = iconobject.event;
					this.fireEvent('customButtonEvent',[event]);
				});
				
			}
			
			
			
		});
		dojo.style(self1.iconsNode,"width",(buttons.length*21)+"px");
		
		this.setTitle(this.header.title||this.title||"");
		
		//绑定事件
		this.connect(this.titleBarNode,"onmouseover","_titleBarMouseover");
		this.connect(this.titleBarNode,"onmouseout","_titleBarMouseout");
		if(this.titleditable){
			this.connect(this.titleNode,"ondblclick","_titleNodeDblClick");
		}
		if(!this.header.visible||this.header.visible=="false"){
			//header 不可见是
			dojo.addClass(this.domNode,'widgetPaneTitleHidden');
		}
		
		this.subscribe("layout-drag-drop", "_reSetWidgetAfterDrop");
		
	},
	
	_reSetWidgetAfterDrop:function(/*Node*/node, /*Object*/targetArea, /*Integer*/indexChild){
		var widget = dijit.byNode(node);
		if(widget == this){
			//在拖拽时会阻止事件的继续，为此在拖拽结束后需要手动触发titlebar的鼠标离开事件
			this._titleBarMouseout();
		}
	},
	
	_createIconMenu:function(icon,obj){
		if(obj.menus.length==1){
			dojo.attr(icon,"title",obj.menus[0].title);
			this.connect(icon,'onclick',function(){
				var event = obj.menus[0].event;
				this.fireEvent('iconMenuEvent',[event]);
			});
		}else{
			var outer = dojo.create("div",{
				'class':'widgetPaneMenuOuter'
			},icon);
			var inner = dojo.create("div",{
				'class':'widgetPaneMenuInner'
			},outer);
			dojo.forEach(obj.menus,function(menu){
				var menuItem = dojo.create("a",{
					'class':'widgetPaneMenuItem',
					'innerHTML':menu.title,
					'title':menu.title
				},inner);
				this.connect(menuItem,'onclick',function(){
					var event = menu.event;
					this.fireEvent('iconMenuEvent',[event]);
					dojo.style(outer,'display','none');
					dojo.removeClass(outer,'display');
				});
				return menuItem;
			},this);
		}
	},

	

	fireEvent:function(name,args){
		var event = this._events[name];
		if(event){
			event.apply(this, args||[]);
		}
	},
	
	addEvent:function(name,context,method){
		if(!this.__events){
			this.__events=[];
		}
		var h = [name, dojo._listener.add(this._events, name, dojo.hitch(context, method))];
		this.__events.push(h);
		return h;
	},
	
	removeEvent:function(handle){
		if(handle){
			dojo._listener.remove(this._events, handle[0], handle[1]);
		}
	},
	
	_createLoader:function(){
		dojo.require("unieapx.widget.WidgetLoader");
		this.loader = new unieapx.widget.WidgetLoader(dojo.mixin({
			widget:this
		},this.content||{}));
		
	},
	

	
	_createFX:function(){
		dojo.require("unieapx.widget.WidgetFX");
		if(!this.WidgetFXManager){
			this.WidgetFXManager = new unieapx.widget.WidgetFX({
				widget:this
			});
		}
	},
	
	
	_changeState:function(fstate,toState){
		for(animation in this.WidgetFXManager._animations){
			var _a = this.WidgetFXManager._animations[animation];
			if(_a&&_a.status&&_a.status()=="playing"){
				return;
			}
		}
		
		//记录临时变量
		this._state = toState;
		
		//处理样式
		this.icons['min']&&dojo.removeClass(this.icons['min'],"widgetIconrestore");
		this.icons['max']&&dojo.removeClass(this.icons['max'],"widgetIconrestore");
		this.icons['min']&&dojo.attr(this.icons['min'],"title",this.defaultTitle['min']);
		this.icons['max']&&dojo.attr(this.icons['max'],"title",this.defaultTitle['max']);
		if(toState == "max"){
			this.icons['max']&&dojo.addClass(this.icons['max'],"widgetIconrestore");
			this.icons['max']&&dojo.attr(this.icons['max'],"title",this.defaultTitle['restore']);
		}
		if(toState == "min"){
			this.icons['min']&&dojo.addClass(this.icons['min'],"widgetIconrestore");
			this.icons['min']&&dojo.attr(this.icons['min'],"title",this.defaultTitle['restore']);
		}
		dojo.removeClass(this.domNode,'min');
		dojo.removeClass(this.domNode,'normal');
		dojo.removeClass(this.domNode,'max');
		dojo.addClass(this.domNode,toState);
		this._doFX(fstate,toState);
	},
	
	_doFX:function(fstate,toState){
		this.WidgetFXManager._doFX(fstate,toState);
	},
	
	
	// 以下为事件处理
	_iconClick:function(e){
		var iconNode = e.target;
		if(iconNode == this.icons["min"]){
			this._minIconClick(e);
		}else if(iconNode == this.icons["max"]){
			this._maxIconClick(e);
		}else if(iconNode == this.icons["close"]){
			this._closeIconClick(e);
		}else if(iconNode == this.icons["refresh"]){
			this._refreshIconClick(e);
		}else if(iconNode ==this.icons["setting"]){
			this._settingIconClick(e);
		}
		
	},
	_minIconClick:function(e){
		if(dojo.hasClass(this.icons['min'],"widgetIconrestore")){
			this._changeState(this._state,"normal");
		}else{
			this._changeState(this._state,"min");
		}
	},
	_maxIconClick:function(e){
		if(dojo.hasClass(this.icons['max'],"widgetIconrestore")){
			this._changeState(this._state,"normal");
		}else{
			this._changeState(this._state,"max");
		}
	},
	
	_closeIconClick:function(e){
		dojo.publish("widget-closed",[this]);
		this.destroyRecursive();
	},
	
	_refreshIconClick:function(e){
		this.fireEvent("refresh");
	},
	
	_settingIconClick:function(e){
		//打开关闭菜单
		var menus = dojo.query(".widgetPaneMenuOuter",this.icons["setting"]);
		if(menus&&menus[0]){
			if(dojo.hasClass(menus[0],'display')){
				dojo.style(menus[0],'display','none');
				dojo.removeClass(menus[0],'display');
			}else{
				dojo.style(menus[0],'display','block');
				dojo.addClass(menus[0],'display');
			}
		}
	},
	
	_showIcons:function(){
		dojo.style(this.iconsNode,"display","");
	},
	
	_hiddenIcons:function(){
		//如果图标有下拉菜单，且下拉菜单显示时，不隐藏按钮
		var menus = dojo.query(".widgetPaneMenuOuter.display",this.iconsNode);
		if(menus&&menus.length>0&&this.header.visible){
			return;
		}
		dojo.style(this.iconsNode,"display","none");
	},
	
	_titleBarMouseover:function(){
		if(!this.header.hideTitle){
			dojo.addClass(this.titleBarNode, "widgetPaneTitleHover");
		}
		dojo.style(this.iconsNode,"display","");
	},
	
	_titleBarMouseout:function(){
		if(!this.header.hideTitle){
			dojo.removeClass(this.titleBarNode, "widgetPaneTitleHover");
		}
		this._hiddenIcons();
	},
	
	
	_titleBarMouse:function(e){
		if("mousedown" == e.type){
			if(e&&e.target&&dojo.hasClass(e.target,'widgetPaneTextNode')){
				dojo.removeClass(this.titleBarNode, "widgetPaneTitleHover");
				this._hiddenIcons();
			}
		}else if("mouseup" == e.type){
			if(e&&e.target&&dojo.hasClass(e.target,'widgetPaneTextNode')){
				dojo.addClass(this.titleBarNode, "widgetPaneTitleHover");
				this._showIcons();
			}
		}
	},
	
	_titleNodeDblClick:function(e){
		if(dojo.hasClass(this.titleNode,"edit")){
			return ;
		}
		dojo.addClass(this.titleNode,"edit");
		var titleNode = this.titleNode;
		var title = titleNode.innerHTML;
		titleNode.innerHTML = "";
		var bridge=[];
		var widget = this;
		var input = dojo.create("input",{value:title},titleNode);
		function changeTitle(){
			if(title!=input.value){
				widget.setTitle(input.value);
				widget.setIndividualValue("title",input.value,false);				
			}
			dojo.forEach(bridge,widget.disconnect,widget);
			dojo.removeClass(this.titleNode,"edit");
		}
		bridge.push(this.connect(input,'onblur',changeTitle));
	}
	
});