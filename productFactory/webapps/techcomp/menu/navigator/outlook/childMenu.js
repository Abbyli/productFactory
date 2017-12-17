var _currentNodeOfSingleFrame, _currentNodesOfSingleFrame;
var _currentClickMenuNode;//add 
function onAfterCloseChild(container) {
	if (container.getChildren().length == 0) {
		_currentNodeOfSingleFrame = null;
	}
}
// 保存当前的viewContext
// 1.清空当前的发布订阅。
function _saveCurrentViewContext(viewContext) {
	// 首先清空之前topics
	delete viewContext.topics;
	// 如果当前viewContext的topic缓存为null的话在解除订阅之前，首先缓存topic
	var topics = viewContext.topics = {};
	dojo
			.forEach(
					viewContext.instances,
					function(elem) {
						var _scribeHandles = window[elem[0]]._scribeHandles, contextTopic;
						if (topics[elem[0]] == null) {
							contextTopic = topics[elem[0]] = {};
						}
						if (_scribeHandles != null && _scribeHandles.length > 0) {
							_scribeHandles.reverse();
							while (_scribeHandles.length > 0) {
								var handle = _scribeHandles.pop();
								var topic = handle[0], listenerIndex = handle[1], f = (dojo._topics || dojo.global)[topic];
								if (!contextTopic[topic]) {
									contextTopic[topic] = [];
								}
								if (f && f._listeners && listenerIndex--) {
									contextTopic[topic]
											.push(f._listeners[listenerIndex]);
								}
								unieap.unsubscribe(handle);
							}
						}
					});
}
// 还原当前的viewContext
// 1.重新绑定当前页面发布订阅。
function _restoreCurrentViewContext(viewContext) {
	if (viewContext.topics != null) {
		var topics = viewContext.topics;
		for ( var context in topics) {
			var contextTopic = topics[context], _scribeHandles = window[context]._scribeHandles
			for ( var topic in contextTopic) {
				var listeners = contextTopic[topic];
				if (listeners != null && listeners.length > 0) {
					for ( var index = 0; index < listeners.length; index++) {
						_scribeHandles.push(unieap.subscribe(topic,
								listeners[index]));
					}
				}
			}
		}
	}
}
function onSelectNavigatorPane(/* Widget */page) {
	if (typeof (_currentNodeOfSingleFrame) !== "undefined"
			&& _currentNodeOfSingleFrame != null
			&& _currentNodeOfSingleFrame.id != page.id) {
//		var navigatorContainer = _currentNodeOfSingleFrame.getParentContainer();
//		// 非单帧情况不用走
//		if (typeof (navigatorContainer) != "undefined"
//				&& navigatorContainer != null
//				&& navigatorContainer.getChildren().length > 0) {
//			// 解除发布订阅之前页面的发布订阅
			var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
			if (viewContext) {
				_saveCurrentViewContext(viewContext);
			}
//		}
	}
	// 该数组为了存在XDialog的时候使用，记录当前的选中Tab页，以及弹出的多个Dialog
	// 能切换Tab页的时候，XDialog肯定已经关闭了,_currentNodesOfSingleFrame[0]记录当前选中的Tab页
	_currentNodesOfSingleFrame = [];
	_currentNodesOfSingleFrame.push(page);
	_currentNodeOfSingleFrame = page;
//	var navigatorContainer = _currentNodeOfSingleFrame.getParentContainer();
//	if (typeof (navigatorContainer) != "undefined") {
//		// 非单帧情况不用走
//		if (typeof (navigatorContainer) != "undefined"
//				&& navigatorContainer != null
//				&& navigatorContainer.getChildren().length > 0) {
			var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
			// 如果viewContext不存在，那么说明这个tab页刚打开
			if (viewContext) {
				_restoreCurrentViewContext(viewContext);
			}
//		}  
//	}
}
dojo
		.addOnLoad(function() {
			var appDeskTop = {
				id : unieap.appPath + "-" + "DeskTop",
				path : unieap.appPath + "/pages/desktop/desktop.jsp",
				//label : "桌面"
				label : RIA_UNIEAPX_I18N.menu.desktop
			}, maxPage = 20, frameMenuContainer = unieap
					.byId("frameMenuContainer"), framePageContainer = unieap
					.byId("framePageContainer");
			navigatorContainerList = [];

			function loadMenus() {
				var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";
				unieap.Action
						.requestData(
								{
									url : (path),
									parameters : {
									appId :"all",
									isSecond:"false",
									_methodName:"security.menu.getAuthorityMenus",
									_boId:"ria_menuAuthBO_bo",
									_methodParameterTypes:"string,string",
									_parameters:"appId,isSecond",
									_methodParameterTypes:"string,string",
									_parameterTypes:"string,string"
									},
									dc: dataCenter,
									load : function(dc) {
										try {
											dataCenter.addDataStore(dc
													.getDataStore("menu"));
											createMenuList();
											// createMyMenuList();
										} catch (e) {
										}
									}
								}, null, false);
			}
			
			//针对手风琴的默认显示
			function showDefaultPane(pane){
				setTimeout(function() {
					if (pane.selected) frameMenuContainer.selectChild(pane);
				}, 0)
			}
			//lianggh 修改为金融开发平台的请求方式
			function createMenuList() {
				var store = dataCenter.getDataStore("menu");
				store
						.getRowSet()
						.forEach(
								function(row, index) {
									var accordPane = new unieap.layout.AccordionPane(
											{
												title : row
														.getItemValue("name"),
												selected:row.getItemValue("isDefault"),
												iconClass : row
														.getItemValue("logoClass") || 'u-ngt-logo',
												onSelected : createMenuTree(row),
												onShow: showDefaultPane
											});
									var image = row.getItemValue("image");
									frameMenuContainer.addChild(accordPane);
									if (image!=null)
										accordPane.setIcon(unieap.WEB_APP_NAME+image);
								});
			}
			//lianggh 修改为金融开发平台的请求方式
			function createMenuTree(row) {
				var id = row.getItemValue("id");
				var rootID = row.getItemValue("id");
				var isDefault = row.getItemValue("isDefault");
				return function() {
					var menuPane = this;
					if (globalDataCenter.getDataStore(id)) {
						// 已经有这样的store
						var tree = unieap.byId(id);
						var ds = globalDataCenter.getDataStore(id);
						var rootNode = tree.getRootNode();
						var childNodes;
						
						if (rootNode){
							//defaultMenuClick(tree,rootNode);
						}
					} else {
						var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";
						unieap.Action
								.requestData( {
									url : (path),
									parameters : {
											appId : "all",
											menuId:id,
											_methodName:"security.menu.getAuthoritySubMenus",
											_boId:"ria_menuAuthBO_bo",
											_methodParameterTypes:"string,string",
											_parameters:"appId,menuId",
											_methodParameterTypes:"string,string",
											_parameterTypes:"string,string"
									},
									load : function(dc) {
										var dss=dc.getDataStore("submenu").clone(id);
										globalDataCenter.addDataStore(dss);
										var tree = new unieap.tree.Tree( {
											binding : {
												'store' : globalDataCenter.getDataStore(id),
												'parent' : 'parentId',
												'label' : 'name',
												query : {
													name : 'parentId',
													relation : '=',
													value : rootID
												}
											},
											id : id,
											getIconStyle:getIconStyle,
											onClick : clickMenuNode,
											expandByOnClickLabel: true
										});
										menuPane.containerNode
												.appendChild(tree.domNode);
										
										var ds = globalDataCenter.getDataStore(id);
										var rootNode = tree.getRootNode();
										
										if (rootNode&&isDefault){
											//defaultMenuClick(tree,rootNode);
										}
									}
								});
					}
				}
			}
			
			//菜单节点图标样式
			function getIconStyle(item,opened,isExpandable){
				var image = item.data.image;
				if (image!=null&&image!='')
					return {backgroundImage: "url('"+unieap.WEB_APP_NAME+image+"')"};
				return false;
			}
			
			//菜单默认显示
			function defaultMenuClick(tree,parentNode){
				var childNodes = parentNode.getChildren();
				var childNode;
				//lianggh 添加空判断
				if(childNodes==null) return ;
				for (var i=0;i<childNodes.length;i++){
					childNode = childNodes[i];
					if (childNode.getData().isDefault){
						if (childNode.isLeaf()){
							tree.setCurrentNode(childNode);
							tree.onClick(childNode);
						}
						else{
							tree.expandNode(childNode);
							defaultMenuClick(tree,childNode);
						}
					}
				}
			}
			
			// //创建自定义菜单
			// function createMyMenuList(){
			// frameMenuContainer.addChild(new unieap.layout.AccordionPane({
			// title: "单帧XHR加载页面",
			// iconClass: 'u-ngt-logo',
			// onSelected: function(){
			// var menuPane = this;
			// if(dataCenter.getDataStore("MyMenuList")){
			// //已经有这样的store
			// }else{
			// var ds = new unieap.ds.DataStore('MyMenuList',[{
			// parentID :'',leaf:true,label:'V4
			// view模型',id:'20111227v4',location:'/ria33demo/pages/xhrsamples/etbgk/etbgk-view.jsp'
			// }])
			// dataCenter.addDataStore(ds);
			// var tree = new unieap.tree.Tree({
			// binding:{
			// 'leaf':'leaf',
			// 'store':dataCenter.getDataStore("MyMenuList"),
			// 'label':'label',
			// 'parent':'parentID',
			// query:{name:'parentID',relation:'=',value:''}
			// },
			// onClick:clickMenuNode
			// });
			// menuPane.containerNode.appendChild(tree.domNode);
			// }
			// }
			// }));
			// }

			function onSelectTabPane(/* Widget */page) {
				_currentClickMenuNode = page.pageId.substr(5);
				if (typeof (_currentNodeOfSingleFrame) !== "undefined"
						&& _currentNodeOfSingleFrame != null
						&& _currentNodeOfSingleFrame.id != page.id) {
//					var navigatorContainer = _currentNodeOfSingleFrame.NavigatorContainer;
//					// 非单帧情况不用走
//					if (typeof (navigatorContainer) != "undefined"
//							&& navigatorContainer != null
//							&& navigatorContainer.getChildren().length > 0) {
						// 解除发布订阅之前页面的发布订阅
						var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
						if (viewContext) {
							_saveCurrentViewContext(viewContext);
						}
//					}
				}
				// 该数组为了存在XDialog的时候使用，记录当前的选中Tab页，以及弹出的多个Dialog
				// 能切换Tab页的时候，XDialog肯定已经关闭了,_currentNodesOfSingleFrame[0]记录当前选中的Tab页
				_currentNodesOfSingleFrame = [];
				_currentNodesOfSingleFrame.push(page);
				_currentNodeOfSingleFrame = page;
//				if (typeof (_currentNodeOfSingleFrame.NavigatorContainer) != "undefined") {
//					var navigatorContainer = _currentNodeOfSingleFrame.NavigatorContainer;
//					// 非单帧情况不用走
//					if (typeof (navigatorContainer) != "undefined"
//							&& navigatorContainer != null
//							&& navigatorContainer.getChildren().length > 0) {
						var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
						// 如果viewContext不存在，那么说明这个tab页刚打开
						if (viewContext) {
							_restoreCurrentViewContext(viewContext);
						}
//					}
//				}
				dojo.forEach(navigatorContainerList, function(
						navigatorContainer) {
					navigatorContainer.hide();
				}, this);
				if(page.NavigatorContainer){
					page.NavigatorContainer.show();
			        onSelectNavigatorPane(page.NavigatorContainer.getSelectedTab());
			    }
			}

			function clickMenuNode(node) {
			
				if (framePageContainer.getChildren().length >= maxPage) {
					MessageBox.alert( {
						//message : "打开菜单超过最大数！"
						message : RIA_UNIEAPX_I18N.menu.theMenuNumOverMax
					});
					return;
				} 
				var time = new Date();
				beginTime = time.getTime();
				_currentClickMenuNode = node.item.data.id; //add 
				var data = node.item.data;
				//lianggh 将data["location"]改为data["url"];
				var menuPath = data["url"];
				var id = data["id"];
				if (!menuPath || menuPath == "null") {
					return;
				}
				;

				var pagePane = null;
				var children = framePageContainer.getChildren();
				if (dojo.some(children, function(child) {
					if (child.pageId == "page_" + id) {
						pagePane = child;
						framePageContainer.selectChild(pagePane);
						// pagePane.NavigatorContainer.show();
						return true;
					}
				}))
					return;
				var menuFlag = false;
				if (!pagePane) {
					pagePane = new unieap.layout.ContentPane( {
					//lianggh 将data["label"]修改为data["name"]
						title : data["name"],
						onClose : closeFun,
						onShow : onSelectTabPane,
						closable : true
					})
					pagePane.pageId = "page_" + id;
					menuFlag = true;
				}
				var url;
				//lianggh 判断是否是unieap页面如果不是，那么就采用iframe的方式进行展现
				if(menuPath.indexOf("isUnieap=0")>-1)
				{
					menuPath="/techcomp/w2ui/pages/frameMain.jsp?iframe=true&pageURL="+encodeURI(menuPath)
				}
				if (menuPath.indexOf("http://")==0||menuPath.indexOf("https://")==0)
					url = menuPath;
				else
					url = unieap.WEB_APP_NAME + menuPath;
				var re = /(iframe\s*=\s*true\s*($|&))/ig;
				var r = url.search(re);
				// 非单帧
				if (r != -1) {
//					pagePane.href = url;
				//修改iframe下加载穿�?
					dojo.require("unieapx.layout.NavigatorPane");
					dojo.require("unieapx.layout.NavigatorContainer");
					var navigatorContainer = new unieapx.layout.NavigatorContainer(
							{
								id : "navigatorContainer" + data["id"],
								showNavigator:false,
								currentTitle:data["name"],
								style : {
									height : '100%',
									width : '100%'
								}
							})
					navigatorContainer.placeAt(pagePane.containerNode, 'first')
							.startup();
					pagePane.navigatorContainerId = navigatorContainer.id;

					var navigatorPane = new unieapx.layout.NavigatorPane( {
						title : data["name"],
						onShow : onSelectNavigatorPane
					// closable : true
							})
					navigatorContainer.addChild(navigatorPane);
					navigatorPane.setHref(url + (menuPath.indexOf("?") == -1 ? "?unieapMenuId=" + data["id"]: "&unieapMenuId=" + data["id"]));
//					unieap.loader.load( {
//						node : navigatorPane.containerNode,
//						url : url + (menuPath.indexOf("?") == -1 ? "?unieapMenuId=" + data["id"]: "&unieapMenuId=" + data["id"]),
//						method:method,
//						_afterPageLoad:initHelpTipCase
//					});
					navigatorContainerList.push(navigatorContainer);
					pagePane.NavigatorContainer = navigatorContainer;
				}
				framePageContainer.addChild(pagePane);

				// 单帧
				if (r == -1) {
					UNIEAP_WIDGET_CONTEXT = "page_" + id;

					// ///////////////////////////
					dojo.require("unieapx.layout.NavigatorPane");
					dojo.require("unieapx.layout.NavigatorContainer");
					var navigatorContainer = new unieapx.layout.NavigatorContainer(
							{
								id : "navigatorContainer" + data["id"],
								style : {
									height : '100%',
									width : '100%'
								}
							})
					navigatorContainer.placeAt(pagePane.containerNode, 'first')
							.startup();
					pagePane.navigatorContainerId = navigatorContainer.id;

					var navigatorPane = new unieapx.layout.NavigatorPane( {
						title : data["name"],
						onShow : onSelectNavigatorPane,
						href : url
					// closable : true
							})
					navigatorContainer.addChild(navigatorPane);

					unieap.loader.load( {
						node : navigatorPane.containerNode,
						url : url
					});
					navigatorContainerList.push(navigatorContainer);
					pagePane.NavigatorContainer = navigatorContainer;
				}
				// unieap.loader.load({
				// node : pagePane.containerNode,
				// url : unieap.WEB_APP_NAME + menuPath
				// });
				if (menuFlag) {
					bindMenu(pagePane.controlButton.id);
				}
			}

			var menuInstance;

			function bindMenu(domNode) {
				if (menuInstance) {
					menuInstance.bindDomNode(domNode);
				} else {
					dojo.require("unieap.menu.Menu");
					menuInstance = new unieap.menu.Menu({
						isSystemMenu:true
					});
					var item = new unieap.menu.MenuItem(
							{
								//label : "关闭当前",
								label : RIA_UNIEAPX_I18N.menu.closeCurrent,
								onClick : function() {
									var currentPane = framePageContainer.selectedChildWidget;
									menuInstance
											.unBindDomNode(currentPane.controlButton.id);
									framePageContainer.closeChild(currentPane);
								}
							});
					menuInstance.addChild(item);
					item = new unieap.menu.MenuItem(
							{
								//label : "关闭其他",
								label : RIA_UNIEAPX_I18N.menu.closeOther,
								onClick : function() {
									var children = framePageContainer
											.getChildren();
									var currentPane = framePageContainer.selectedChildWidget;
									for ( var i = 0, child = children[0]; child = children[i]; i++) {
										if (child != currentPane) {
											menuInstance
													.unBindDomNode(child.controlButton.id);
											framePageContainer
													.closeChild(child);
										}
									}
								}
							});
					menuInstance.addChild(item);
					item = new unieap.menu.MenuItem(
							{
								//label : "关闭所有",
								label : RIA_UNIEAPX_I18N.menu.closeAll,
								onClick : function() {
									var children = framePageContainer
											.getChildren();
									for ( var i = 0, child = children[0]; child = children[i]; i++) {
										menuInstance
												.unBindDomNode(child.controlButton.id);
										framePageContainer.closeChild(child);
									}
								}
							});
					menuInstance.addChild(item);
					menuInstance.startup();
					menuInstance.bindDomNode(domNode);
				}
			}

			function addMyDeskTop() {
				var appPage = new unieap.layout.ContentPane( {
					title : appDeskTop.label
				})
				framePageContainer.addChild(appPage);
				setTimeout(function() {
					UNIEAP_WIDGET_CONTEXT = "page_" + appPage.id;
					unieap.loader.load( {
						node : appPage.containerNode,
						url : appDeskTop.path
					});
				}, 1000)
			}

			function updataNavigatorContainerList() {
				var tempList = [];
				while (navigatorContainerList.length > 0) {
					var navigaer = navigatorContainerList.shift();
					if (navigaer.domNode)
						tempList.push(navigaer);
				}
				while (tempList.length > 0) {
					navigatorContainerList.push(tempList.shift());
				}
			}

			function closeFun(tab, pane) {
				menuInstance.unBindDomNode(pane.controlButton.id);
				// 菜单导航
				var isNavigator = pane.NavigatorContainer;
				if (isNavigator) {
					var children = pane.NavigatorContainer.getChildren();
					dojo.forEach(children, function(navigatorPane) {
						var containerNode = navigatorPane.containerNode;
						unieap.destroyWidgets(containerNode);
						unieap.destroyDialogAndMenu(containerNode);
					});
					var closedChildren = pane.NavigatorContainer.closedNavigatorList;
					dojo.forEach(closedChildren, function(navigatorPane) {
						var containerNode = navigatorPane.containerNode;
						unieap.destroyWidgets(containerNode);
						unieap.destroyDialogAndMenu(containerNode);
					});
				}
				var node = this.containerNode;
				unieap.destroyWidgets(node);
				unieap.destroyDialogAndMenu(pane);
				unieap.clearHelpSubscribe && unieap.clearHelpSubscribe(pane);
				if (isNavigator) {
					unieap.destroyWidget(pane.NavigatorContainer.id);
					updataNavigatorContainerList();
				}
				delete pane;
				return true;
			}
			loadMenus();

			//addMyDeskTop(); //在这个环境下 wwf框架存在问题
		});