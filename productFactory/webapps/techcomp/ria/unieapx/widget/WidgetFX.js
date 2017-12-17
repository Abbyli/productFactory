dojo.provide("unieapx.widget.WidgetFX");
dojo.declare("unieapx.widget.WidgetFX",null,{
	/**
	 * @summary:
	 * 		这个类实现了Widget的动画效果
	 * 
	 */

	widget:null,
	
	duration:300,
	
	constructor:function(parameters){
		dojo.mixin(this,parameters);
		this._animations={};
		this.createFX();
	},
	
	getAnimations:function(){
		return this._animations;
	},
	
	_resizeHeight:function(){
		this.och=this.widget.containerNode.style.height,
		this.odh=this.widget.domNode.style.height;
	},
	
	createFX:function(){
		
		var hideNode = this.widget.hideNode, 
			wipeNode = this.widget.wipeNode,
			domNode=this.widget.domNode,
			containerNode= this.widget.containerNode,
			titleBarNode=this.widget.titleBarNode,
			self1 = this,
			o={};
		this.och=containerNode.style.height;
		this.odw=domNode.style.width;
		this.odh=domNode.style.height;
		
		this._animations["normal-min"]=dojo.fx.wipeOut({
			node: wipeNode,
			duration: this.duration,
			onEnd: function(){
				hideNode.style.display="none";
				domNode.style.height="";
			}
		});
		var toMin1=dojo.animateProperty({
			node: domNode,
			duration: this.duration,
			properties:{
				top:function(){
					return o.y;
				},
				left:function(){
					return o.x;
				},
				width:function(){
					return o.w;
				},
				height:function(){
					return o.h;
				}
			}
		});
		var toMin2=dojo.animateProperty({
			node:containerNode,
			duration: this.duration,
			properties:{
				height:{
					start:function(){
						return dojo.contentBox(containerNode).h;
					},
					end:function(){
						return (isNaN(parseInt(self1.och))?1:parseInt(self1.och));
					}
				}
			},
			onEnd:function(){
				containerNode.style.height=self1.och;
				domNode.style.height=self1.odh;
			}
		});
		var toMin3 = dojo.animateProperty({
			node:containerNode,
			duration: this.duration,
			properties:{
				height:function(){
					return 1;
				}
			},
			onEnd:function(){
				containerNode.style.height="";
				hideNode.style.display="none";
			}
		});
		
		this._animations["max-min"] = dojo.fx.combine([toMin1,toMin3]);
		this._animations["max-normal"]=dojo.fx.combine([toMin1,toMin2]);
		dojo.forEach([this._animations["max-min"],this._animations["max-normal"]],function(anim){
			self1.widget.connect(anim,'onEnd',function(){
				if(self1._tempNode){
					self1._tempNode.parentNode.removeChild(self1._tempNode);
					self1._tempNode = null;
				}
				domNode.style.position='';
				domNode.style.left='';
				domNode.style.top='';
				domNode.style.width=self1.odw;
				domNode.style.height='';
			});
		});

		this._animations["min-normal"] = dojo.fx.wipeIn({
			node: wipeNode,
			duration: this.duration,
			beforeBegin: function(){
				wipeNode.style.display="none";
				hideNode.style.display="";
				if(self1.odh&&self1.och){
					containerNode.style.height=self1.och;
					domNode.style.height=self1.odh;
				}
			}
		});
		
		var toMax1 = dojo.animateProperty({
				node:domNode,
				duration: this.duration,
				properties:{
					top:function(node){
							return dijit.getViewport().t;
					},
					left:function(node){
							return dijit.getViewport().l;
					},
					height:function(node){
						var h = null;
						//查找workspace容器，如果找到判断是否包含当前节点
						dojo.query(".workspaceContainer").forEach(function(content){
							if(content.contains(node))
//								h = dojo.style(content, "height");
								// modify by lugj
								h = dojo.contentBox(content).h;
							if(h != null && h < dojo.contentBox(node).h){
								h = dojo.contentBox(node).h;
							}
						});
						var contentHeight = h==null?dijit.getViewport().h:h;
						var _h=contentHeight-(dojo.marginBox(node).h-dojo.contentBox(node).h);
						return _h;
					},
					width:function(node){
						var w = null;
						//查找workspace容器，如果找到判断是否包含当前节点
						dojo.query(".workspaceContainer").forEach(function(content){
							if(content.contains(node))
//								w = dojo.style(content, "width");
								// modify by lugj
								w = dojo.contentBox(content).w;
							if(w != null && w < dojo.contentBox(node).w){
								w = dojo.contentBox(node).w;
							}
						});
						var contentWidth = w==null?dijit.getViewport().w:w;
						var _w = contentWidth-(dojo.marginBox(node).w-dojo.contentBox(node).w);
						return _w;
					}
				},
				beforeBegin:function(){
					var cs = dojo.getComputedStyle(domNode);
					var _o=dojo.coords(domNode,true);
					o.x=_o.x-(isNaN(parseInt(cs.marginLeft))?0:parseInt(cs.marginLeft));
					o.y=_o.y-(isNaN(parseInt(cs.marginTop))?0:parseInt(cs.marginTop));
					o.w=dojo.contentBox(domNode).w;
					o.h=dojo.contentBox(domNode).h;
					hideNode.style.display='';
					wipeNode.style.display='';
					dojo.style(domNode,"width",o.w+"px");
					dojo.style(domNode,'left',o.x+"px");
					dojo.style(domNode,'top',o.y+"px");
					dojo.style(domNode,'position','absolute');
					if(!self1._tempNode ){
						self1._tempNode = dojo.create("div");
					}
					dojo.style(self1._tempNode,'height',_o.h+"px");
					dojo.place(self1._tempNode,domNode,"before");
				}
		});
		
		var toMax3 = dojo.animateProperty({
			node:domNode,
			duration: this.duration,
			properties:{
				top:function(node){
						return dijit.getViewport().t;
				},
				left:function(node){
						return dijit.getViewport().l;
				},
				height:function(node){
					var _h=dijit.getViewport().h-(dojo.marginBox(node).h-dojo.contentBox(node).h);
					return _h;
				},
				width:function(node){
					var _w = dijit.getViewport().w-(dojo.marginBox(node).w-dojo.contentBox(node).w);
					return _w;
				}
			}
		});
		var toMax2 = dojo.animateProperty({
			node:containerNode,
			duration: this.duration,
			properties:{
				height:function(node){
					var h = null;
					//查找workspace容器，如果找到判断是否包含当前节点
					dojo.query(".workspaceContainer").forEach(function(content){
						if(content.contains(node))
//							h = dojo.style(content, "height");
							// modify by lugj
							h = dojo.contentBox(content).h;
						if(h != null && h < dojo.contentBox(node).h){
							h = dojo.contentBox(node).h;
						}
					});
					var contentHeight = h==null?dijit.getViewport().h:h;
					var h = contentHeight-(dojo.marginBox(domNode).h-dojo.contentBox(domNode).h);
					var th = 0;
					if(!dojo.hasClass(domNode,"widgetPaneTitleHidden")){
						th = dojo.marginBox(titleBarNode).h;
					}
					h=h-th-(dojo.marginBox(node).h-dojo.contentBox(node).h)-2;
					return h;
				}
			}
		});
		this._animations["normal-max"] = dojo.fx.combine([toMax1,toMax2]);
		
		this._animations["min-max"] = dojo.fx.combine([toMax1,toMax2]);
		
		this._animations["max-max"] = dojo.fx.combine([toMax3,toMax2]);
		
		this._initPublish();                                                                                                                                                                                                            
	},
	
	_initPublish:function(){
		for(animation in this._animations){
			var anim = this._animations[animation];
			var _from = animation.split("-")[0];
			var _to = animation.split("-")[1];
			var self1=this;
			(function(from,to,widget){
				widget.connect(anim,'beforeBegin',function(){
					dojo.publish("widget-before-"+to,[widget]);
				});
				widget.connect(anim,'onEnd',function(){
					unieap.fireContainerResize(widget.containerNode);
					dojo.publish("widget-after-"+to,[widget]);
				});
			})(_from,_to,self1.widget);
		}
	},

	_doFX:function(fstate,toState){
		for(animation in this._animations){
			var _a = this._animations[animation];
			if(_a&&_a.status&&_a.status()=="playing"){
				_a.stop&&_a.stop();
			}
		}
		if(this._animations[fstate+"-"+toState]){
			this._animations[fstate+"-"+toState].play();
		}
	},
	
	destroy:function(){
		if(this._tempNode){
			this._tempNode.parentNode.removeChild(this._tempNode);
			this._tempNode=null;
		}
		this.inherited(arguments);
	}
});