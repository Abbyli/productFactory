dojo.provide("unieap.Helptip");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieap.util.util");
dojo.declare("unieap.Helptip",[dijit._Widget, dijit._Templated],{
     	/**
		 * @declaredClass:
		 * 		unieap.Helptip
		 * @summary:
		 * 		Helptip的实现类
		 * @classDescription：
		 *		用于帮助提示
		 */
		 
		 
		/**
		 * @summary:
		 * 		设置helptip控件显示文字
		 * @type:
		 * 		{string}
		 * @example:
		 * |<div dojoType="unieap.Helptip"  label="帮助提示"></div>
		 */
		label:"帮助提示",
		/**
		 * @summary:
		 * 		通过改变css样式来设置helptip上的图标
		 * @type:
		 * 		{string}
		 * @example:
		 * |<style type="text/css">
		 * |		.iconBtn{
		 * |			display:inline-block;
		 * |			width:16px;
		 * |			height:16px;
		 * |			background:url("../images/find.gif") no-repeat;
		 * |		}
		 * |</style>
		 * |<div dojoType="unieap.Helptip" iconClass="iconBtn" label="设置图标"></div>
		 */
		iconClass:"",
		/**
		 * @summary:
		 * 		通过改变css样式来设置helptip上的文字
		 * @type:
		 * 		{string}
		 * @example:
		 * |<style type="text/css">
		 * |		.labelBtn{
		 * |			font-size:30px;
		 * |			font-color:blue;
		 * |		}
		 * |</style>
		 * |<div dojoType="unieap.Helptip" labelClass="labelBtn" label="设置文字"></div>
		 */
		labelClass:"",
		/**
		 * @summary:
		 * 		设置或获取对象的快捷键
		 * @type:
		 * 		{string}
		 * @example:
		 * |<div dojoType="unieap.Helptip" accessKey="j" label="J">
		 * |</div>
		 * 		在ie中按下Alt+j 触发这个按钮的onClick事件。
		 * 		其它浏览器需要使用各自的组合键。			
		 */
		accessKey: "",	
		
		/**
		 * @summary:
		 * 		设置helptip控件是否自动弹出
		 * @type:
		 * 		{string}
		 * @example:
		 * |<div dojoType="unieap.Helptip"  label="帮助提示" autoPopup="true"></div>
		 */
		autoPopup:false,
		
		toolTip:'',
		
		preview:false,
		
		topic:null,
		
		_subscribeHandle:null,
		
		disabled:false,
		
		helptips:null,
		
		startTip:null,
		
		endTip:null,
		
		helpTipNode:null,
		
		_rootID:null,
		
		cases:null,
		
		pageCount:0,
		tipCount:0,
		
		dialogIndex:0,
		
		/**
		 * @summary:
		 * 		点击“上一页”按钮之前事件
		 * @description:
		 * 		注意大返回值，返回true可以执行翻页，返回false将中断操作
		 * @param:
		 * 		{object} tip
		 * @example:
		 * |<div dojoType="unieap.Helptip" onBeforeProTip="hello()"></div>
		 * 		绑定hello方法到onBeforeProTip事件		
		 */
		onBeforeProTip:function(tip){
			return true;
		},
		
		/**
		 * @summary:
		 * 		点击“继续”按钮之前事件
		 * @description:
		 * 		注意大返回值，返回true可以执行翻页，返回false将中断操作
		 * @param:
		 * 		{object} tip
		 * @example:
		 * |<div dojoType="unieap.Helptip" onBeforeNextTip="hello()"></div>
		 * 		绑定hello方法到onBeforeNextTip事件		
		 */
		onBeforeNextTip:function(tip){
			return true;
		},
		
		noShowHelptipType:["isDialog","isCloseDialog","isTab","isSkip","isData"],
		
		templateString:
			"<a href='javascript:void(0);' class='u-helptip-btn-outer' tabindex='-1' style=\"text-decoration:none;vertical-align:middle;\">" +
				"<button type=\"button\"  class=\"u-form-btn\" dojoAttachPoint=\"focusNode, inputNode,btnNode\" onfocus=\"unieap.fep&&unieap.fep(this)\">" +
					"<table style=\"display:inline-block\">"+
						"<tr><td dojoAttachPoint=\"iconNode\"></td>" +
						"<td class=\"u-form-btn-txt\" dojoAttachPoint=\"labelNode\"></td></tr>" +
					"</table>"+
				"</button>"+
			"</a>",
			
		postMixInProperties:function(){
			this._parseNodeRef();
		},
		
		
		//用于判断是否弹出显示操作指引信息的节点
		_isShowHelptipType:function(helptip){
			var size = this.noShowHelptipType.length;
			for(var i=0;i<size;i++){
				if(helptip[this.noShowHelptipType[i]]){
					return false;
				}
			}
			return true;
		},
		
		postCreate:function(){
			this.inherited(arguments);
			this.inputNode.accessKey = this.accessKey;
			this.label&&this.setLabel(this.label);
			this.disabled&&this.setDisabled(this.disabled);
			this.labelClass&&this.setLabelClass(this.labelClass);
			this.iconClass&&this.setIconClass(this.iconClass);
			var flag = true;
			if("" != this.accessKey){
				flag = false;
			}
			this.connect(this.inputNode, "onclick", "_onButtonClick",flag);
			if(this.autoPopup){
				this.showHelpTip();
			}
			if(this.topic){
				var currentTabWin = unieap.getCurrentTabWin();
				if(currentTabWin){
					this._subscribeHandle = currentTabWin.unieap.subscribe(this.topic,dojo.hitch(this,function(){
						this.showHelpTip();
					}));
				}else{
					this._subscribeHandle = unieap.subscribe(this.topic,dojo.hitch(this,function(){
						this.showHelpTip();
					}));
				}
			}
			
			if(this.toolTip){
				this.inputNode.title = this.toolTip;
			}
		},
		
		/**
		 * @summary:
		 * 		显示帮助提示
		 * @description:
		 * 		提供一个方法，用户可以动态调用帮助提示信息显示
		 * @example:
		 * unieap.byId("helptip").showHelpTip();	
		 */
		showHelpTip:function(){
			if(this.helptips && this.helptips.length>0){
				var self = this;
				unieap.helpTipMode = true;
				var tab = this.getCurrentNavigatorContainer();
				if(tab){
					tab._afterPageLoad = function(){
						if(self.startTip){
							self._showHelpTip(self.startTip);
						}else{
							self._showNextTip(-1);
						}
					}
					this._selectFirstSelectPane(tab);
					tab.refresh(this.preview);
				}else{
				}
			}else{
				unieap.publish("_helpConsoleCloseHelptip",null);
			}
		},
		
		
		
		//初始化操作指引数据
		_initTips:function(tips){
			this.helptips = null;
			this.pageCount = 0;
			var size = tips.length;
			var pageNum = 0;
			this.autoPopup = false;
			this.startTip = null;
			this.endTip = null;
			if(size>0){
				tips.sort(function(tip1,tip2){
	    			return tip1.tipIndex-tip2.tipIndex;
	    		});
				this.helptips=[];
				for(var i=0;i<size;i++){
					var tip = {};
					var tipNode = tips[i];
					tip.id = tipNode.id;
					tip.noderefid = tipNode.noderefid;
					tip.title = tipNode.title;
					tip.isSkip = tipNode.isSkip=="T"?true:false;
					tip.isData = tipNode.isData=="T"?true:false;
					tip.isBind = tipNode.isBind=="T"?true:false;
					tip.isDialog = tipNode.isDialog=="T"?true:false;
					tip.isCloseDialog = tipNode.isCloseDialog=="T"?true:false;
					tip.isAuto = tipNode.isAuto=="T"?true:false;
					tip.isTab = tipNode.isTab=="T"?true:false;
					tip.isEnd = tipNode.isEnd=="T"?true:false;
					tip.isStart = tipNode.isStart=="T"?true:false;
					tip.isNoderef = tipNode.isNoderef=="T"?true:false;
					tip.content = tipNode.content;
					tip.controlType = tipNode.controlType;
					tip.helpData = tipNode.helpData;
					var image={};
//					image.url = tipNode.imgUrl;
					image.hasImage = tipNode.hasImage=="T"?true:false;
					image.width = tipNode.imgWidth;
					image.height = tipNode.imgHeight;
					tip.image = image;
					tip.width =  tipNode.tipWidth||"375px";
					if(i==0){
						if(tipNode.isAuto == "T"){
							this.autoPopup=true;
						}else{
							this.autoPopup=false;
						}
					}
					if(tip.isStart){
						tip.pageNum = 0;
//						tip.index = 0;
						tip.position = "below";
						this.startTip = tip;
//						this.helptips.push(tip);
					}else if(tip.isEnd){
						tip.position = "below";
//						tip.index = size-1;
						tip.pageNum = -1;
						this.endTip = tip;
					}else if(!this._isShowHelptipType(tip)){
						tip.pageNum = 0;
//						tip.index = this.helptips.length;
						this.helptips.push(tip);
					}else{
						pageNum++;
						this.pageCount++;
						tip.position = tip.noderefid?this._getPosition(tipNode.position):null;
						tip.pageNum = pageNum;
//						tip.index = this.helptips.length;
						this.helptips.push(tip);
					}
				}
				if(this.startTip){
					this.helptips.splice(0,0,this.startTip);
				}
				if(this.endTip){
					this.helptips.push(this.endTip);
				}
				for(var i=0; i<this.helptips.length;i++){
					this.helptips[i].index = i;
				}
			}
			this.tipCount = size;
		},
		
		_showHelpTip:function(helptip){
			if(helptip){
				var self = this;
				helptip["pageCount"] = this.pageCount;
				helptip["onProTip"] = this._onProTip;
				helptip["onNextTip"] = this._onNextTip;
				helptip["widget"] = this;
				if(this.helpTipNode){
					this.helpTipNode.destroy();
					this.helpTipNode = null;
				}
				this.helpTipNode = new unieap.HelptipNode(helptip);
				var node = null;
				if(helptip.controlType == "unieapCell" && helptip.helpData){
					try{
						var cellData = dojo.fromJson(helptip.helpData);
						var gridId = helptip.noderefid;
						var idx = cellData.idx;
						var grid = dijit.byId(unieap.getCurrentRootNodeId(this.preview)+gridId) || dijit.byId(gridId);
						if(grid){
							var cell = grid.getLayoutManager().getCell(idx);
							if (cell) {
								if(grid.declaredClass == "unieap.xgrid.Grid"){
									var th = dojo.query("TH", grid.getManager('ViewManager').getViewByCell(cell).headerNode)[cell.layoutIndex];
								 	node = th.firstChild;
								}else if(grid.declaredClass == "unieap.grid.Grid"){
									var th = dojo.query("TH", grid.managers.managers.ViewManager.getViewByCell(cell).headerNode)[cell.layoutIndex];
								 	node = th.firstChild;
								}
							}
						}
					}catch(e){
					}
				}else{
					node = dojo.byId(unieap.getCurrentRootNodeId(this.preview)+helptip.noderefid) || dojo.byId(helptip.noderefid);
				}
				this.showTooltip(this.helpTipNode.domNode,node,helptip["position"]);
				if(node && helptip.isBind && helptip.helpData){
					var unieapObj = dijit.byNode(node);
					if(unieapObj){
						try{
							var dc = unieap.fromJson(helptip.helpData);
							this._bindData(unieapObj,dc);
						}catch(e){}
					}
				}
			}else{
				this.refresh();
			}
		},
		
		//显示上一条操作指引
		_onProTip:function(tip){
			var pageNum = tip.pageNum;
			var index = tip.index;
			var pageCount = tip.pageCount;
			var tipContainer = tip.widget;
			tipContainer._showProTip(index);
		},
		
		_showProTip:function(index){
			this.hideTooltip();
			var tipCount = this.tipCount;
			var helptips = this.helptips;
			var tip = helptips[index];
			var helptip = helptips[index-1];
			if(helptip){
				if(unieap.fireEvent(this,this.onBeforeProTip,[helptips,index])){
					if(tip && tip.isEnd){
						this.closeDialog();
						this.showHelpTip();
					}else{
						this._showHelptipOption(helptips,helptip,index,"pro");
					}
				}
			}else{
				this.refresh();
			}
		},
		
		
		
		//显示下一条操作指引
		_onNextTip:function(tip){
			var pageNum = tip.pageNum;
			var index = tip.index;
			var pageCount = tip.pageCount;
			var tipContainer = tip.widget;
			tipContainer._showNextTip(index);
		},
		
		_showNextTip:function(index){
			this.hideTooltip();
			var helptips = this.helptips;
			var helptip = helptips[index+1];
			if(helptip){
				if(unieap.fireEvent(this,this.onBeforeNextTip,[helptips,index])){
					if(index == helptips.length-1){
						this.refresh(false);
					}else{
						this._showHelptipOption(helptips,helptip,index,"next");
					}
				}
			}else{
				this.refresh();
			}
		},
		
		
		//操作指引分类型显示中枢
		_showHelptipOption:function(helptips,helptip,index,option){
			if(helptip.isDialog){
				if(option == "pro"){
					this._closeDialogOption(helptips,helptip,index,option);
				}else if(option == "next"){
					this._openDialogOption(helptips,helptip,index,option);
				}
			}else if(helptip.isCloseDialog){
				if(option == "pro"){
					this._openDialogOption(helptips,helptip,index,option);
				}else if(option == "next"){
					this._closeDialogOption(helptips,helptip,index,option);
				}
			}else if(helptip.isTab){
				this._openTabOption(helptips,helptip,index,option);
			}else if(helptip.isSkip){
				this._openSkipOption(helptips,helptip,index,option);
			}else if(helptip.isData){
				this._openDataOption(helptips,helptip,index,option);
			}else{
				this._showHelpTip(helptip);
			}
		},
		
		//关闭对话框操作
		_closeDialogOption:function(helptips,helptip,index,option){
			unieap.getXDialog().close();
			if(!this.preview && typeof(_currentNodesOfSingleFrame) != "undefined" && _currentNodesOfSingleFrame.length > 1){
				_currentNodesOfSingleFrame.pop();
				_currentNodeOfSingleFrame = _currentNodesOfSingleFrame[_currentNodesOfSingleFrame.length - 1];
			}
			if(option == "next"){
				this._showNextTip(index+1);
			}else{
				this._showProTip(index-1);
			}
		},
		
		//绑定数据操作
		_bindData:function(unieapObj,dc){
			if(dc && dc.getSingleDataStore){
				if(dc.getParameter("declaredClass") == "unieap.tree.Tree"){
					unieapObj.getBinding().setDataStore(unieapObj.getRootNode(),dc.getSingleDataStore());
					unieapObj.expandAllNodes();
				}else if(dc.getParameter("declaredClass") == "unieap.form.Form"){
					dojo.require("unieap.form.FormHelper");
					var row = dc.getSingleDataStore().getRowSet().getRow(0);
					if(row){
						unieapObj.getHelper().applyTextData(row.getData());
					}
				}else{
					unieapObj.getBinding().setDataStore(dc.getSingleDataStore());
				}
			}
		},
		
		//清空数据操作
		_clearData:function(unieapObj,dc){
			if(dc && dc.getSingleDataStore){
				if(dc.getParameter("declaredClass") == "unieap.tree.Tree"){
					var store = dc.getSingleDataStore();
					store.getRowSet().deleteAllRows();
					unieapObj.getBinding().setDataStore(unieapObj.getRootNode(),store);
				}else{
					unieapObj.getBinding().setDataStore(null);
				}
			}
		},
		
		//数据节点操作
		_openDataOption:function(helptips,helptip,index,option){
			if(helptip.helpData){
				node = dojo.byId(unieap.getCurrentRootNodeId(this.preview)+helptip.noderefid) || dojo.byId(helptip.noderefid);
				if(node){
					var unieapObj = dijit.byNode(node);
					if(unieapObj){
						var dc = unieap.fromJson(helptip.helpData);
						if(option == "next"){
							try{
								this._bindData(unieapObj,dc);
							}catch(e){}
						}else{
							try{
								this._clearData(unieapObj,dc);
							}catch(e){}
						}
					}
				}
			}
			if(option == "next"){
				this._showNextTip(index+1);
			}else{
				this._showProTip(index-1);
			}
		},
		
		
		//跳转节点操作
		_openSkipOption:function(helptips,helptip,index,option){
			if(helptip.helpData){
				var _self = this;
				try{
					var data = dojo.fromJson(helptip.helpData);
					var href = unieap.WEB_APP_NAME + data.href;
					var title = data.title;
					var oldHref = unieap.WEB_APP_NAME + data.oldHref;
					var oldTitle = data.oldTitle;
					var isReturn = data.isReturn
					var view = new unieap.view.View();
					var tab = this.getCurrentNavigatorContainer();
					if(option == "next"){
						if(isReturn){
							view.navigator.prePage(title,null);
							this._showNextTip(index+1);
						}else{
							tab._afterPageLoad = function(){
								_self._showNextTip(index+1);
							}
							view.navigator.forward(null,null,href,title,null);
						}
					}else{
						if(isReturn){
							tab._afterPageLoad = function(){
								_self._showProTip(index-1);
							}
							view.navigator.forward(null,null,oldHref,oldTitle,null);
						}else{
							view.navigator.prePage(oldTitle,null);
							this._showProTip(index-1);
						}
					}
				}catch(e){
					if(option == "next"){
						this._showNextTip(index+1);
					}else{
						this._showProTip(index-1);
					}
				}
			}else{
				if(option == "next"){
					this._showNextTip(index+1);
				}else{
					this._showProTip(index-1);
				}
			}
		},
		
		
		//tab页显示操作
		_openTabOption:function(helptips,helptip,index,option){
			if(helptip.helpData){
				try{
					var data = dojo.fromJson(helptip.helpData);
					var _this = this;
					var showTabId = option=="next"?data.showTabId:data.curTabId;
					var unieapObj = dijit.byId(unieap.getCurrentRootNodeId(this.preview)+showTabId);
					if(unieapObj){
						unieapObj.parentContainer.selectChild(unieapObj);
					}
					setTimeout(function(){
						if(option == "next"){
							_this._showNextTip(index+1);
						}else{
							_this._showProTip(index-1);
						}
					},200);
				}catch(e){
					if(option == "next"){
						this._showNextTip(index+1);
					}else{
						this._showProTip(index-1);
					}
				}
			}else{
				if(option == "next"){
					this._showNextTip(index+1);
				}else{
					this._showProTip(index-1);
				}
			}
		},
		
		//弹出对话框操作
		_openDialogOption:function(helptips,helptip,index,option){
			if(helptip.helpData){
				try{
					var _self = this;
					var data = dojo.fromJson(helptip.helpData);
					var dialog = null;
					if(data.url){
						data.url = unieap.WEB_APP_NAME + data.url;
						data._rootID = data._rootID + this.dialogIndex;
						this.dialogIndex++;
						dialog = new unieap.xdialog.Dialog(data);
						dialog._afterPageLoad = function(){
							if(option == "next"){
								_self._showNextTip(index+1);
							}else{
								_self._showProTip(index-1);
							}
						}
						dialog.show();
					}else{
						dialog = dijit.byId(unieap.getCurrentRootNodeId(this.preview)+data.id) || dojo.byId(data.id);
						if(dialog){
							dialog.show();
						}
						if(option == "next"){
							this._showNextTip(index+1);
						}else{
							this._showProTip(index-1);
						}
					}
				}catch(e){
					if(option == "next"){
						this._showNextTip(index+1);
					}else{
						this._showProTip(index-1);
					}
				}
			}else{
				if(option == "next"){
					this._showNextTip(index+1);
				}else{
					this._showProTip(index-1);
				}
			}
		},
		
		
		//刷新导航容器，并显示第一页
		refreshNavigatorContainer:function(){
			var tab = this.getCurrentNavigatorContainer();
			if(tab){
				this._selectFirstSelectPane(tab);
				var closedChildren = tab.closedNavigatorList;
				for(var i = 0, l = closedChildren.length; i < l; ++i){
					var pane = closedChildren.pop();
					var containerNode = pane.containerNode;
					unieap.destroyWidgets(containerNode);
					unieap.destroyDialogAndMenu(containerNode);
					pane.destroy && pane.destroy();
				}
				tab.refresh(this.preview);
			}
		},
		
		_selectFirstSelectPane :function(tab){
			var navigatorList = tab.navigatorList;
			if(navigatorList){
				var size = navigatorList.length;
				for(var i=0;i<size;i++){
					if(navigatorList[i]){
						tab.selectChild(navigatorList[i]);
						return;
					}
				}
			}
		},
		
		
		getCurrentNavigatorContainer:function(){
			return unieap.getCurrentNavigatorContainer(this.preview);
		},
		
		setLabel:function(label){
			this.label=label;
			this.labelNode.innerHTML=label;
		},
		setLabelClass: function(className) {
			this.labelClass&&dojo.removeClass(this.labelNode,this.labelClass);
			dojo.addClass(this.labelNode,className);
			this.labelClass=className;
		},
		setIconClass: function(className) {
			this.iconClass&&dojo.removeClass(this.iconNode,this.iconClass);
			dojo.addClass(this.iconNode,className);
			this.iconClass=className;
		},
		destroy:function(){
			if(this.helpTipNode){
				this.helpTipNode.destroy();
			}
			if(this._subscribeHandle){
				var topWin = unieap.getTopWin();
				topWin.unieap.unsubscribe(this._subscribeHandle);
			}
			this.inherited(arguments);
		},
		
		
		_parseNodeRef:function(){
			if(this.srcNodeRef){
				var helpNode = this.srcNodeRef.getElementsByTagName('tip');
				var size = helpNode.length;
				this.tipCount = size;
				var pageNum = 0;
				if(size>0){
					this.helptips=[];
					for(var i=0;i<size;i++){
						var tip = {};
						var tipNode = helpNode[i];
						tip.nodeId = tipNode.getAttribute("nodeRef");
						tip.title = tipNode.getAttribute("title");
						tip.content = tipNode.innerHTML;
						tip.image = dojo.fromJson(tipNode.getAttribute("image"));
						tip.width = dojo.fromJson(tipNode.getAttribute("width"))||"375px";
						if(!tip.nodeId && i==0){
							tip.pageNum = 0;
							tip.index = 0;
							tip.start = true;
							tip.position = "below";
							this.startTip = tip;
						}else if(!tip.nodeId && i==size-1){
							tip.position = "below";
							tip.index = size-1;
							tip.pageNum = -1;
							tip.end = true;
							this.endTip = tip;
						}else{
							pageNum++;
							this.pageCount++;
							tip.position = tip.nodeId?(tipNode.getAttribute("position")||"above"):"below";
							tip.pageNum = pageNum;
							tip.index = i;
						}
						this.helptips.push(tip);
					}
				}
			}
		},
		
		
		setDisabled:function(disabled){
			if(disabled){
				dojo.style(this.labelNode,"color","#a7a6aa");
				dojo.removeClass(this.domNode,'u-helptip-btn-outer');
				dojo.addClass(this.domNode,'u-helptip-btn-outer-disabled');
			}else{
				dojo.style(this.labelNode,"color","");
				dojo.removeClass(this.domNode,'u-helptip-btn-outer-disabled');
				dojo.addClass(this.domNode,'u-helptip-btn-outer');
			}
			this.btnNode.disabled=disabled;
			this.disabled = disabled;
		},
		
		previewHelpTipByCaseId:function(caseId){
    		this.showHelpTipByCaseId(caseId);
		},
		
		
		showTooltip : function( innerHTML, aroundNode,position){
			if(!unieap._masterHT){ 
			   unieap._masterHT = new unieap._MasterHelptip(); 
			}
			return unieap._masterHT.show(innerHTML, aroundNode, position);
		},
		
		hideTooltip:function(aroundNode){
			if(dojo.isIE<9){
				var _modalDiv = dojo.byId("_helptipModalDiv");
				if(_modalDiv){
					dojo.style(_modalDiv,"display","none");
				}
			}
			var _bgMark = dojo.byId("_helptipBgMark");
			if(_bgMark){
				dojo.style(_bgMark,"display","none");
			}
			if(!unieap._masterHT){ 
				unieap._masterHT = new unieap._MasterHelptip(); 
			}
			return unieap._masterHT.hide(aroundNode);
		},
		
		
		
		refresh:function(isCase){
			this.hideTooltip();
			this.closeDialog();
			if(!isCase){
				var tab = this.getCurrentNavigatorContainer();
				unieap.helpTipMode = false;
				tab._afterPageLoad = null;
				this.refreshNavigatorContainer();
				unieap.publish("_helpConsoleCloseHelptip",null);
			}
		},
		
		closeDialog:function(){
			var dialog = unieap.getXDialog();
			while(dialog){
				dialog.close();
				dialog.dialogMainContent && unieap.destroyWidgets(dialog.dialogMainContent)
				dialog.destroy && dialog.destroy();
				dialog = unieap.getXDialog();
			}
		},
		
		
		
		
		_getPosition:function(position){
			if(position=="2"){
				return "BM";
			}else if(position=="3"){
				return "ML";
			}else if(position=="4"){
				return "MR";
			}else if(position=="5"){
				return "TL";
			}else if(position=="6"){
				return "BL";
			}else if(position=="7"){
				return "TR";
			}else if(position=="8"){
				return "BR";
			}else if(position=="9"){
				return "MM";
			}else{
				return "TM";
			}
		},
		
		onBeforeClick:function(e){
			return true;
		},
		
		//绑定click事件
		_onButtonClick: function(/*Event*/ e) {
			if(unieap.fireEvent(this,this.onBeforeClick,[e])){
				if(this.cases){
					if(this.cases.length==1){
						this._clickCase(this.cases[0].id);
					}else{
						this.showCases();
					}
				}else{
					this.showHelpTip();
				}
			}
			dojo.stopEvent(e);
		},	
		
		
		//显示操作指引目录
		showCases:function(){
			this.helpTipNode = new unieap.HelptipNode({
				title:"操作指引教程",
				isCase:true,
				widget:this,
				width:"300px"
			});
			var size = this.cases.length;
			for(var i=0;i<size;i++){
				var link = this._createCaseLink(this.cases[i]);
				this.helpTipNode.contentNode.appendChild(link);
			}
			this.showTooltip(this.helpTipNode.domNode);
		},
		
		_createCaseLink:function(caseTip){
			var link = dojo.create("a",{
							onclick:dojo.hitch(this,this._clickCase,caseTip.id),
							href:"#",
							classname:"u-helptip-index-link",
							name:caseTip.id
						});
			link.innerHTML = caseTip.title;
			return link;
		},
		
		_clickCase:function(caseId){
			this.hideTooltip();
			var win = unieap.getCurrentTabWin();
			if(!win.unieap.helpTipWidget){
				win.unieap.helpTipWidget = new win.unieap.Helptip();
			}
			win.unieap.helpTipWidget.showHelpTipByCaseId(caseId);
		},
		
		
		showHelpTipByCaseId:function(caseId){
			var _self = this;
			var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
		    var dc=new unieap.ds.DataCenter();
			dc.setParameter("_boId", "ria_helptipBO_bo");
			dc.setParameter("_methodName", "getAllTipsByCaseId");
			dc.setParameter("_methodParameterTypes", "java.lang.String");
			dc.setParameter("caseId", caseId);
		    dc.setParameter("_parameters", "caseId");
		    dc.setParameter("_parameterTypes", "string");
		    unieap.Action.requestData({
		    	url:url,
		    	sync:true,
		    	load:function(dc){
		    		if (dc && dc.declaredClass == "unieap.ds.DataCenter"&& dc.getCode() >= 0) {
			    		var ds = dc.getSingleDataStore();
			    		if(ds && ds.declaredClass == "unieap.ds.DataStore"){
				    		tips = ds.getRowSet().getData(unieap.ds.Buffer.PRIMARY);
				    		_self._initTips(tips);
			    		}
					}
		    		_self.showHelpTip();
		    	},
		       error:function(){
		       		unieap.publish("_helpConsoleCloseHelptip",null);
		       }
		    },dc,true);
		},
		// lianggh 帮助功能目前被注释掉。
		getAllCaseByMenuId:function(menuId,_load){
			/*var _self = this;
			var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
		    var dc=new unieap.ds.DataCenter();
			dc.setParameter("_boId", "ria_helptipCaseBO_bo");
			dc.setParameter("_methodName", "queryMenuAllHelptipCase");
			dc.setParameter("_methodParameterTypes", "java.lang.String");
			dc.setParameter("menuId", menuId);
		    dc.setParameter("_parameters", "menuId");
		    dc.setParameter("_parameterTypes", "string");
		    unieap.Action.requestData({
		    	url:url,
		    	sync:false,
		    	load:function(dc){
		    		if (dc && dc.declaredClass == "unieap.ds.DataCenter"&& dc.getCode() >= 0) {
			    		var ds = dc.getSingleDataStore();
			    		if(ds && ds.declaredClass == "unieap.ds.DataStore"){
		    				var cases = ds.getRowSet().getData(unieap.ds.Buffer.PRIMARY);
		    				if(cases.length==0){
		    					cases = null;
		    				}
			    		}
					}
					_load(cases);
					_self.cases = cases;
					_self.setDisabled(cases?false:true);
		    	}
		    },dc,true);*/
		}
	}
);


		


dojo.declare("unieap.HelptipNode",[dijit._Widget, dijit._Templated],{
		id:"",
		title:"",
		content:"",
		image:"",
		index:"",
		controlType:"",
		position:"above",
		pageNum:"",
		pageCount:"",
		width:"375px",
		upBtn :"上一步",
		downBtn : "继续",
		endBtn : "结束",
		startBtn : "开始教程",
		replayBtn : "重放",
		widget:null,
		isStart:false,
		isEnd:false,
		isData:false,
		isCase:false,
		isSkip:false,
		isDialog:false,
		isCloseDialog:false,
		isTab:false,
		helpData:null,
		pageSep:" of ",
		templateString:
			"<table class=\"helpTipBg\" dojoAttachPoint=\"bgNode\">" +
				"<tr>" +
					"<td colspan=\"2\">" +
						"<div class=\"helpTipTittle\" dojoAttachPoint=\"titleNode\"></div>" +
						"<a class=\"helpTipClose\" dojoAttachPoint=\"closeNode\" dojoAttachEvent=\"onclick:_onClose\"></a>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td valign=\"top\">" +
						"<div class=\"helpTipContent\" dojoAttachPoint=\"contentNode\"></div>" +
					"</td>" +
					"<td align=\"right\" valign=\"center\">" +
						"<img class=\"helpTipImg\" dojoAttachPoint=\"imageNode\"></img>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td colspan=\"2\">" +
						"<div class=\"helpTipPage\" dojoAttachPoint=\"pageNode\"></div>" +
						"<div class=\"helpTipBtnContent\" dojoAttachPoint=\"btnContentNode\">" +
							"<a href='javascript:void(0);' class='u-helptip-bbtn-outer' dojoAttachPoint=\"proBtnNode\" tabindex='-1' style=\"text-decoration:none;vertical-align:middle;\">" +
								"<button type=\"button\" class=\"u-helptip-btn-back u-helptip-btn-txt\" dojoAttachPoint=\"proButtonNode\"  dojoAttachEvent=\"onclick:_onProTip\" onfocus=\"unieap.fep&&unieap.fep(this)\">" +
									"<table style=\"display:inline-block\">"+
										"<tr>" +
											"<td dojoAttachPoint=\"proIconNode\"></td>" +
											"<td class=\"helpTipBtnBText\" dojoAttachPoint=\"proNode\"></td>" +
										"</tr>" +
									"</table>"+
								"</button>"+
							"</a>" +
							"<a href='javascript:void(0);' class='u-helptip-nbtn-outer u-helptip-nbtn' dojoAttachPoint=\"nextBtnNode\" tabindex='-1' style=\"text-decoration:none;vertical-align:middle;\">" +
								"<button type=\"button\"  class=\"u-helptip-btn-back\"  dojoAttachEvent=\"onclick:_onNextTip\" onfocus=\"unieap.fep&&unieap.fep(this)\">" +
									"<table style=\"display:inline-block\">"+
										"<tr>" +
											"<td class=\"helpTipBtnNText\" dojoAttachPoint=\"nextNode\"></td>" +
											"<td dojoAttachPoint=\"nextIconNode\"></td>" +
										"</tr>" +
									"</table>"+
								"</button>"+
							"</a>" +
						"</div>" +
					"</td>" +
				"</tr>"+
			"</table>",
		postCreate:function(){
			this.inherited(arguments);
			dojo.style(this.bgNode,"width",this.width);
			this.title&&this.setTitle(this.title);
			if(this.isCase){
				dojo.style(this.btnContentNode,"display","none");
				dojo.style(this.pageNode,"display","none");
			}else{
				this.content&&this.setContent(this.content);
				this.image&&this.setImage(this.image);
				var tipCount = this.widget.tipCount;
				if(!this.widget.endTip && this.pageNum == this.pageCount){
					this.pageNode.innerHTML=this.pageNum+this.pageSep + this.pageCount;
					this.nextNode.innerHTML=this.endBtn;
					if(this.pageCount == 1){
						dojo.style(this.proBtnNode,"display","none");
					}else{
						this.proNode.innerHTML=this.upBtn;
						dojo.addClass(this.proIconNode,"helpTipBtnBImg");
					}
				}else if(!this.widget.startTip && this.pageNum == 1){
					dojo.style(this.proBtnNode,"display","none");
					dojo.addClass(this.nextIconNode,"helpTipBtnNImg");
					this.pageNode.innerHTML=this.pageNum+this.pageSep + this.pageCount;
					this.nextNode.innerHTML=this.downBtn;
				}else if(this.isStart){
					dojo.style(this.proBtnNode,"display","none");
					dojo.addClass(this.nextIconNode,"helpTipBtnNImg");
					this.pageNode.innerHTML = "";
					if(this.pageCount == 0){
						this.nextNode.innerHTML=this.endBtn;
					}else{
						this.nextNode.innerHTML=this.startBtn;
						dojo.addClass(this.nextNode,"helpTipBtnSText");
					}
				}else if(this.isEnd){
					this.pageNode.innerHTML = "";
					this.nextNode.innerHTML=this.endBtn;
					this.proNode.innerHTML=this.replayBtn;
					dojo.addClass(this.proBtnNode,"u-helptip-nbtn");
					dojo.removeClass(this.proButtonNode,"u-helptip-btn-txt");
					dojo.addClass(this.proNode,"helpTipBtnBReplay");
					dojo.style(this.proBtnNode,"marginRight","6px");
				}else{
					this.pageNode.innerHTML=this.pageNum+this.pageSep + this.pageCount;
					this.proNode.innerHTML=this.upBtn;
					this.nextNode.innerHTML=this.downBtn;
					dojo.addClass(this.proIconNode,"helpTipBtnBImg");
					dojo.addClass(this.nextIconNode,"helpTipBtnNImg");
				}
			}
		},
		setTitle:function(title){
			this.title=title;
			this.titleNode.innerHTML=title;
		},
		setImage:function(image){
			this.image=image;
			if(image.hasImage){
				this.imageNode.src= unieap.WEB_APP_NAME + "/techcomp/ria/getHelpTipImageById.action?id=" + this.id;
				var imgWidth = this.image["width"]?this.image["width"] + "px" : "120px";
				var imgHeight= this.image["height"]?this.image["height"] + "px" : "80px";
				dojo.style(this.imageNode,{
					'width':imgWidth,
					'height':imgHeight,
					'display':"block"
				});
			}
		},
		setContent:function(content){
			this.content=content;
			this.contentNode.innerHTML=content;
		},
		_onProTip:function(e){
			unieap.fireEvent(this,this.onProTip,[this]);
			dojo.stopEvent(e);
		},
		_onNextTip:function(e){
			unieap.fireEvent(this,this.onNextTip,[this]);
			dojo.stopEvent(e);
		},
		_onClose:function(e){
			this.widget.refresh(this.isCase);
			dojo.stopEvent(e);
		},
		onProTip:function(widget){
			
		},
		onNextTip:function(widget){
			
		}
	}
);



dojo.declare("unieap._MasterHelptip",unieap._MasterTooltip,{
		
		templateString: "<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\">"+
	                         "<div class=\"dijitTooltipContainer dijitTooltipContents dijitHelptipContents\" dojoAttachPoint=\"containerNode\"></div>"+
	                         "<div class=\"dijitTooltipConnector\" dojoAttachPoint=\"ConnectorNode\"></div>"+
                        "</div>",
		
		
		show: function(/*String|object*/ config, /*DomNode*/ aroundNode, /*String[]?*/ position){
			if(this.aroundNode && this.aroundNode === aroundNode){
				return;
			}
			if(this.isShowingNow){
			   this.hide();
			}
			//支持通过domNode和事件两种方式确定tooltip显示位置
			if(aroundNode){
				if(aroundNode.tagName){
					this.aroundNode = aroundNode;
					this.isAroundnode = true;
				}
			}
			var inner=config;
			this.setAutoClose(false);
			if(inner){
			  if (typeof(inner) == "object") {
			  	 this.isDomNode = true;
                 this.inner = inner;
                 this.parenetNode = inner.parentNode;
                 this.containerNode.innerHTML="";
			  	 this.containerNode.appendChild(inner);
			  } else {
			    this.containerNode.innerHTML=inner;
		      }
                this._show(position);
			}
		},
		
		orientHelp: function(/* DomNode */ node, /* String */ aroundCorner, /* String */ tooltipCorner){
			node.className = "dijitTooltip " +
				{
					"TM-BM": "dijitHelpTipTop",
					"BM-TM": "dijitHelpTipBottom",
					"ML-MR": "dijitHelpTipLeft",
					"MR-ML": "dijitHelpTipRight",
					"TL-TR": "dijitHelpTipTopLeft",
					"BL-BR": "dijitHelpTipBottomLeft",
					"TR-TL": "dijitHelpTipTopRight",
					"BR-BL": "dijitHelpTipBottomRight"
				}[aroundCorner + "-" + tooltipCorner];
		},
		
		orientHelpMid: function(/* DomNode */ node, /* String */ aroundCorner, /* String */ tooltipCorner){
			node.className = "dijitTooltip " + "dijitHelpTipMid";
		},
		

         _show : function(position){
			this.domNode.style.top = (this.domNode.offsetTop + 1) + "px";
			var align = {};
			var ltr = this.isLeftToRight();
			switch(position){
				case "TR":				
					align["TR"] = "TL";
					break;
				case "BR":				
					align["BR"] = "BL";
					break;
				case "TL":
					align["TL"] = "TR";
					break;
				case "BL":
					align["BL"] = "BR";
					break;
				case "TM":
					align["TM"] = "BM";
					break;
				case "BM":
					align["BM"] = "TM";
					break;
				case "MR":
					align["BR"] = "BL";
					break;
				case "ML":
					align["ML"] = "MR";
					break;
				default:
					align[ltr ? "BL" : "BR"] = ltr ? "TL" : "TR";
					align[ltr ? "BR" : "BL"] = ltr ? "TR" : "TL";
					break;
			}
			if (this.isAroundnode) {
				var width = dojo.coords(this.containerNode).w;
				var aroundNodeW = null;
			    var aroundNodeH = null;
			    var aroundNodePos = null;
				if(this.aroundNode){
					aroundNodeW = this.aroundNode.offsetWidth; 
		            aroundNodeH = this.aroundNode.offsetHeight; 
				}
            	if(!this.aroundNode || position == "MM"){
            		aroundNodePos = dojo.coords(dojo.body(), true);
            		var containerNodePos = dojo.coords(this.containerNode)
            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
	                    aroundNodePos.w/2-containerNodePos.w/2, aroundNodePos.h/2-containerNodePos.h/2, aroundNodeW, aroundNodeH,	// rectangle
	                    align, dojo.hitch(this, "orientHelpMid"));
            	}else if(position == "TM"){
		            aroundNodePos = dojo.coords(this.aroundNode, true);
		            var bodyPos = dojo.coords(dojo.body(), true);
					var containerNodeWidth = dojo.style(this.domNode,"width");
					var containerNodeHeight = dojo.style(this.domNode,"height");
					if(containerNodeHeight-aroundNodeH/2 - aroundNodePos.y < 0 && containerNodeWidth/2  - aroundNodeW/2 - aroundNodePos.x < 0 && containerNodeWidth/2  + aroundNodeW/2 - (bodyPos.w -aroundNodePos.x) < 0){
	            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
			                    aroundNodePos.x-aroundNodeW/2+containerNodeWidth/2, aroundNodePos.y, aroundNodeW, aroundNodeH,	// rectangle
			                    align, dojo.hitch(this, "orientHelp"));
					}else if(containerNodeWidth - aroundNodeW/2 - aroundNodePos.x < 0){
						position = "TL";
						align = {};
						align["TL"] = "TR";
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y-15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
					}else if(containerNodeWidth + aroundNodeW/2 - (bodyPos.w - aroundNodePos.x)  < 0){
						position = "TR";
						align = {};
						align["TR"] = "TL";
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y-15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
					}else{
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
			                    aroundNodePos.x-aroundNodeW/2+containerNodeWidth/2, aroundNodePos.y, aroundNodeW, aroundNodeH,	// rectangle
			                    align, dojo.hitch(this, "orientHelp"));
					}
            	}else if( position == "BM"){
		            aroundNodePos = dojo.coords(this.aroundNode, true);
		            var bodyPos = dojo.coords(dojo.body(), true);
					var containerNodeWidth = dojo.style(this.domNode,"width");
					var containerNodeHeight = dojo.style(this.domNode,"height");
					if(containerNodeWidth/2  - aroundNodeW/2 - aroundNodePos.x < 0 && containerNodeWidth/2  + aroundNodeW/2 - (bodyPos.w -aroundNodePos.x) < 0){
	            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
			                    aroundNodePos.x-aroundNodeW/2+containerNodeWidth/2, aroundNodePos.y, aroundNodeW, aroundNodeH,	// rectangle
			                    align, dojo.hitch(this, "orientHelp"));
					}else if(containerNodeWidth - aroundNodePos.x < 0){
						position = "BL";
						align = {};
						align["BL"] = "BR";
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y +containerNodeHeight -15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
					}else if(containerNodeWidth  - (bodyPos.w -aroundNodePos.x) < 0){
						position = "BR";
						align = {};
						align["BR"] = "BL";
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y +containerNodeHeight -15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
					}else{
						var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
			                    aroundNodePos.x-aroundNodeW/2+containerNodeWidth/2, aroundNodePos.y, aroundNodeW, aroundNodeH,	// rectangle
			                    align, dojo.hitch(this, "orientHelp"));
					}
            	}else if(position == "MR" || position == "ML"){
		            aroundNodePos = dojo.coords(this.aroundNode, true);
					var containerNodeHeight = dojo.style(this.domNode,"height");
            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y-aroundNodeH/2+containerNodeHeight/2, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
            	}else if(position == "TR" || position == "TL"){
            		aroundNodePos = dojo.coords(this.aroundNode, true);
            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y-15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
            	}else if(position == "BR" || position == "BL"){
            		var containerNodeWidth = dojo.style(this.domNode,"width");
					var containerNodeHeight = dojo.style(this.domNode,"height");
            		aroundNodePos = dojo.coords(this.aroundNode, true);
            		var pos =  dijit._placeOnScreenAroundRect(this.domNode, 
		                    aroundNodePos.x, aroundNodePos.y +containerNodeHeight -15, aroundNodeW, aroundNodeH,	// rectangle
		                    align, dojo.hitch(this, "orientHelp"));
            	}
            	this._setConnectorNodeStyle(position);
				this._onShow();
			}
		 },
		 
		 _setConnectorNodeStyle:function(position){
		 	var connectorStyle = {top:"auto",bottom:"auto",left:"auto",right:"auto"};
		 	var containerNodeWidth = dojo.style(this.domNode,"width");
		 	var containerNodeHeight = dojo.style(this.domNode,"height");
		 	if(position == "TM"){
		 		connectorStyle.left = (containerNodeWidth/2-19)+"px";
		 		connectorStyle.bottom = "-35px";
		 	}else if(position == "BM"){
		 		connectorStyle.left = (containerNodeWidth/2-19)+"px";
		 		connectorStyle.top = "-35px";
		 	}else if(position == "MR"){
		 		connectorStyle.left = "0px";
		 		connectorStyle.bottom = (containerNodeHeight/2-19)+"px";
		 	}else if(position == "ML"){
		 		connectorStyle.right = "-27px";
		 		connectorStyle.bottom = (containerNodeHeight/2-19)+"px";
		 	}else if(position == "BR"){
		 		connectorStyle.top = "0px";
		 		connectorStyle.left = "0px";
		 	}else if(position == "BL"){
		 		connectorStyle.top = "0px";
		 		connectorStyle.right = "-27px";
		 	}else if(position == "TR"){
//		 		connectorStyle.bottom = "0px";
//		 		connectorStyle.left = "0px";
				connectorStyle.top = "0px";
		 		connectorStyle.left = "0px";
		 	}else if(position == "TL"){
//		 		connectorStyle.bottom = "0px";
//		 		connectorStyle.right = "-27px";
				connectorStyle.top = "0px";
		 		connectorStyle.right = "-27px";
		 	}
		 	dojo.style(this.ConnectorNode,connectorStyle);
		 },
		 
		 _onShow:function(){
		 	this._createModelDiv();
			if(dojo.isIE){
				this.domNode.style.filter="";
			}
			this.isShowingNow = true;
		 },
		 
 		_createModelDiv:function(){
 			if(dojo.isIE<9){
				var _modalDiv = dojo.byId("_helptipModalDiv"); 
				if(!_modalDiv){
					_modalDiv =dojo.create("div",{
						id:'_helptipModalDiv',
						className:'u-helpTip-modalDivIE'
					});
				}
				document.body.appendChild(_modalDiv);
				var helpPos = dojo.coords(this.containerNode,true);
				dojo.style(_modalDiv,{
					 left:  helpPos.x-10?((helpPos.x-10)+"px"):(helpPos.x+"px"),
					 top: helpPos.y-10?((helpPos.y-10)+"px"):(helpPos.y+"px"),
					 width:(helpPos.w + 10)+"px",
					 height:(helpPos.h + 10)+"px",
					 zIndex:dojo.style(this.domNode,"zIndex")-1,
					 display:'block'
				 });
 			}
 			var _bgMark = dojo.byId("_helptipBgMark"); 
			if(!_bgMark){
				_bgMark =dojo.create("div",{
					id:'_helptipBgMark',
					className:'u-helpTip-bgMarkIE'
				});
			}
			dojo.body().appendChild(_bgMark); 
			dojo.style(_bgMark,{
				 zIndex:dojo.style(this.domNode,"zIndex")-2,
				 display:'block'
			 });
		}
	}
);