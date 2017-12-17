unieap.define("menuManager", function () {
/**
 * 初始化是否默认显示的dataStore
 * @return
 */
function initDefaultShowDs(){
	  var defaultShow = new unieap.ds.DataStore('defaultShow_store', [
                        //{CODEVALUE:false,CODENAME:'否'},
                        {CODEVALUE:false,CODENAME:RIA_UNIEAPX_I18N.menu.isFalse},
                        //{CODEVALUE:true,CODENAME:'是'}
                        {CODEVALUE:true,CODENAME:RIA_UNIEAPX_I18N.menu.isTrue}
                        ]);
	  dataCenter.addDataStore(defaultShow);
}
initDefaultShowDs();
var selectedNodeId;
var isExistExtInfo = false;
/**
 * 如果往后台传递其他变量参数，可以重新写getPostData方法
 */
this.getPostData = function(item){
	var dc = new unieap.ds.DataCenter();
	var nodeType = item.data.nodeType;
	var nodeId=item.data.id;

	if(nodeType){
		dc.setParameter("nodeType",nodeType);
		dc.setParameter("currentId",nodeId);
    }
    else
    	dc.setParameter("nodeType","root");
    return dc;
}

dojo.addOnLoad(init);

//菜单树初始化
function init(){
	  url.focus();
	  dojo.require("unieap.menu.Menu");
	  //增加右键菜单
      var pMenu = new unieap.menu.Menu({contextMenuForWindow:false});
      //pMenu.addChild(new unieap.menu.MenuItem({label:"增加菜单", onClick:addMenu}));
      pMenu.addChild(new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.addMenuItem, onClick:addMenu}));
	  //pMenu.addChild(new unieap.menu.MenuItem({label:"删除菜单", onClick:menuDelete}));
      pMenu.addChild(new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.deleteMenuItem, onClick:menuDelete}));
	  //pMenu.addChild(new unieap.menu.MenuItem({label:"菜单上移", onClick:moveUp}));
      pMenu.addChild(new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.upMenuItem, onClick:moveUp}));
	  //pMenu.addChild(new unieap.menu.MenuItem({label:"菜单下移", onClick:moveDown}));
      pMenu.addChild(new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.downMenuItem, onClick:moveDown}));
	  pMenu.startup();
	  pMenu.bindDomNode(menuTree.domNode);
	  isExistMenuExtInfo();
}

function isExistMenuExtInfo(){
    unieap.Action.requestData({
		url : (unieap.WEB_APP_NAME +"/menuProcessor!isExistExtInfo.action"),
		load : function(dc){
	    	isExistExtInfo = dc.getParameter("isExistExtInfo");
	    	if (isExistExtInfo)
	    		getExtInfoHTML();
	    	else
	    		unieap.hideWidget(unieap.byId("extInfoFieldSet"));
		},
        error: function (xhr) {
            _error && _error(xhr);
            _exceptionProcess(xhr);

        }
    },null,false);	
}

function getExtInfoHTML(){
    unieap.Action.requestData({
		url : (unieap.WEB_APP_NAME +"/menuProcessor!getExtInfoHTML.action"),
		load : function(dc){
	    	var extInfoHTML = dc.getParameter("extInfoHTML");
	    	if (typeof extInfoHTML!='undefined'){
	    		var containerNode = unieap.byId("extInfoFieldSet").containerNode;
	    		containerNode.innerHTML = extInfoHTML;
	    		dojo.parser.parse(containerNode);
	    		unieap.byId("menuExtForm").getBinding().setDataStore(new unieap.ds.DataStore());
	    	}
		},
        error: function (xhr) {
            _error && _error(xhr);
            _exceptionProcess(xhr);
        }
    },null,false);	
}

this.onContextMenu = function(node){
	selectedNodeId = node.getData().id;
	var nodeType = node.getData().nodeType;
	if(nodeType == "application"){
		var titlePane = document.getElementById(getRealId("displayMenuInfo"));
		titlePane.style.display ="none";
		return;
	}
	menuTree.setCurrentNode(node);
	getMenuInfo();
}

//点击树节点时触发的事件
this.treeNodeClick = function(node){
	var nodeType = node.getData().nodeType;
	var menuInfoDiv = document.getElementById(getRealId("displayMenuInfo"));
	if(nodeType == "application"){
		menuInfoDiv.style.display ="none";
		return;
	}
	else{
		menuInfoDiv.style.display ="block";
	}
	selectedNodeId = node.getData().id;
	getMenuInfo();
}

//树展开后事件
this.onAfterMenuTreeExpand = function(node){
	if(!node.getData().hasExpand){
		node.getData().hasExpand=true;
	}
}

//获得菜单信息
function getMenuInfo(){
	var menuInfoDiv = document.getElementById(getRealId("displayMenuInfo"));
	if(menuInfoDiv.style.display == "none"){
		menuInfoDiv.style.display ="block";
	}
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	if(selectedNode && selectedNode.getData().nodeType =="menu"){
		var selectedRow =  getSelectedNodeRow(selectedNode);
		menuInfoForm.getBinding().bind(selectedRow);
		if (isExistExtInfo)
			menuExtForm.getBinding().bind(selectedRow);
	}
	else{
		menuInfoForm.clear();
		menuInfoForm.getBinding().unbind();
		if (isExistExtInfo){
			menuExtForm.clear();
			menuExtForm.getBinding().unbind();
		}
	}
}

this.customAddItemToLeaf = function(data,parentItem){
	 var node = menuTree.getNodeByItem(parentItem);
     if(this.leaf){
	    parentItem.data[this.leaf]=false;
     }
     var parentNodeDataSore;
     if (node.getData().nodeType=='application')
    	 parentNodeDataSore = dataCenter.getDataStore(node.getData().id);
     else
    	 parentNodeDataSore = parentItem.rs._dataStore;
     if(null == parentNodeDataSore){
    	 parentNodeDataSore = new unieap.ds.DataStore(node.getData().id);
    	 dataCenter.addDataStore(node.getData().id,parentNodeDataSore);
	 }
     //新建节点数据添加到parentNodeDataSore;
	 var parentNodeRowSet = parentNodeDataSore.getRowSet();
     parentNodeRowSet.addRow(data,false,false);
     var newItem = {data:data,rs:parentNodeRowSet,children:[],loaded:true};
     parentItem.children = [];
 	 parentItem.children.push(newItem);
	 return newItem;
}

/**
 * 增加菜单
 */
function addMenu(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
    var appId="";
    var parentId="";
    if(selectedNode.getData().nodeType=="application"){
    	appId = selectedNode.getData().id;
    	parentId="";
    }else if(selectedNode.getData().nodeType=="menu"){
    	appId = selectedNode.getData().appId;
    	parentId = selectedNode.getData().id;
    }
    unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/menuProcessor!saveMenu.action"),
			parameters:{"appId":appId,"parentId":parentId},
			load : function(dc){
               var detail = dc.getDetail().split(":")[0];
               var id=dc.getDetail().split(":")[1];
               var title = dc.getDetail().split(":")[2];
               var name = dc.getDetail().split(":")[3];
               if(detail=="success"){
               	  if(selectedNode.getData().hasExpand){
//	               	  var newNodeData = {"id":id, "label":title,"parentId":selectedNode.getData().id,"nodeType":"menu","leaf":true,"hasExpand":true,"name":name,"appId":appId,
//	               			       "title":title,"location":"","desciption":"",isDefault:false,"target":"pagearea"};
	               	  var newNodeData = {"id":id, "label":title,"parentId":selectedNode.getData().id,"nodeType":"menu","leaf":true,"hasExpand":true,"appId":appId,
	               			"name":name,"title":title,"location":"","description":"",isDefault:false};
//	               	  if (selectedNode.getData().id!=appId)
//	               		  dataCenter.getDataStore(appId).getRowSet().addRow(newNodeData);
	               	  menuTree.createNode(newNodeData,selectedNode);
	     			  menuTree.expandNode(selectedNode);
	     			 var createNode = menuTree.getNodeById(id);
     			  	  if(createNode){
     			  		  menuTree.setCurrentNode(createNode);
     			  		  selectedNodeId = id;
     			  	  }
     			     getMenuInfo();
               	  }else{
               	  	  menuTree.expandNode(selectedNode);
               	  }
               }else if(detail=="fail"){
               	    MessageBox.alert ({
						//title:"确认框",
               	    	title:RIA_UNIEAPX_I18N.menu.confirmTitle,
						//message:"增加菜单失败。",
               	    	message:RIA_UNIEAPX_I18N.menu.addMenuItemFail,
						icon:"info"
					});
               }
			}
	},null,false);
}

function menuDelete(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	if(!selectedNode){
       return;
    }
	var menuName = selectedNode.getData().label;
	MessageBox.confirm({
		//message:"确认删除“"+menuName +"”菜单？",
		message:RIA_UNIEAPX_I18N.menu.confirmDelete+menuName +RIA_UNIEAPX_I18N.menu.isMenu,
	    onComplete: confirmReturn,
	    iconCloseComplete:true },
	    dojo.byId("id"));
}

function confirmReturn(value){
   	if(value==true){
   		deleteMenu();
   	}
}
/**
 * 删除菜单
 */
function deleteMenu(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	if(!selectedNode){
       return;
    }else if(selectedNode.getData().nodeType=="application"){
        MessageBox.alert ({
			//title:"确认框",
        	title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"不能删除应用节点。",
        	message:RIA_UNIEAPX_I18N.menu.cantDeleteItem,
			icon:"info"
		});
    	return;
    }
    var appId = selectedNode.getData().appId;
    var id = selectedNode.getData().id;
    unieap.Action.requestData({
		url : (unieap.WEB_APP_NAME +"/menuProcessor!deleteMenus.action"),
		parameters:{"appId":appId,"id":id},
		load : function(dc){
			var detail = dc.getDetail();
			if(detail=="success"){
				menuTree.deleteNode(selectedNode);
				menuInfoForm.getBinding().unbind();
				menuInfoForm.clear();
            }else if(detail=="fail"){
            	MessageBox.alert ({
            		//title:"确认框",
            		title:RIA_UNIEAPX_I18N.menu.confirmTitle,
					//message:"菜单删除失败。",
            		message:RIA_UNIEAPX_I18N.menu.delteMenuFail,
					icon:"info"
				});
            }
		}
	},null,false);
}

/**
 * 保存菜单
 */
function updateMenu(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	var appId = selectedNode.getData().appId;
	var ds = menuInfoForm.getBinding().getDataStore();
	//var extDs = menuExtForm.getBinding().getDataStore();
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	//dc.addDataStore("extDs",extDs);
	var form=unieap.byId('menuInfoForm');
	var isValid;
	if (isExistExtInfo){
		var extForm=unieap.byId('menuExtForm');
		isValid=form.validate()&&extForm.validate();
	}
	else
		isValid=form.validate();
	
	if(!isValid){
		MessageBox.alert ({
			//title:"确认框",
			title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"请校验输入数据的格式是否正确。",
			message:RIA_UNIEAPX_I18N.menu.confirmData,
			icon:"info"
		});
		return;
	}
	unieap.Action.requestData({
			url : (unieap.WEB_APP_NAME +"/menuProcessor!updateMenu.action"),
			parameters:{appId:appId,id:selectedNodeId},
			load : function(datacenter){
				var detail = datacenter.getDetail();
				if(detail=="duplicate"){
					MessageBox.alert ({
						//title:"确认框",
						title:RIA_UNIEAPX_I18N.menu.confirmTitle,
						//message:"菜单名称有重复。",
						message:RIA_UNIEAPX_I18N.menu.menuRepeat,
						icon:"info"
					});
				}else if(detail=="fail"){
					MessageBox.alert ({
						//title:"确认框",
						title:RIA_UNIEAPX_I18N.menu.confirmTitle,
						//message:"菜单保存失败。",
						message:RIA_UNIEAPX_I18N.menu.menuSaveFail,
						icon:"info"
					});
				}else{
					var selectedRow =  getSelectedNodeRow(selectedNode)
					menuTree.getBinding().setLabel(selectedNode,selectedRow.getItemValue("title"));
					// 如果设置为默认菜单，则将同目录菜单默认置为false，保证同目录下只有一个默认菜单
					if (selectedNode.getData().isDefault && selectedNode.getData().isDefault == true){
						var parentNode = selectedNode.getParent();
						var parentNodeDataSore = dataCenter.getDataStore(parentNode.getData().appId);
						var parentRowSet = parentNodeDataSore.getRowSet();
						for( i = 0; i < parentRowSet.getRowCount();i++){
							var tempRow = parentRowSet.getRow(i);
							if(tempRow.getItemValue("isDefault") == true && tempRow.getItemValue("id") != selectedRow.getItemValue("id")){
								tempRow.setItemValue("isDefault",false);
								tempRow.resetUpdate();
							}
						}
					}
					if(selectedRow != null){
						 selectedRow.resetUpdate();
					}
					menuInfoForm.getBinding().bind(selectedRow);
					MessageBox.autoCloseAlert ({
						//title:"确认框",
						title:RIA_UNIEAPX_I18N.menu.confirmTitle,
						//message:"保存成功。",
						message:RIA_UNIEAPX_I18N.menu.saveSuccess,
						icon:"info"
					});
				}
			}
	},dc,false);
}

/**
 * 菜单上移
 */
function moveUp(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	if(selectedNode.getData().nodeType == "menu"){
		var appId = selectedNode.getData().appId;
		var sourceId = selectedNode.getData().id;
		var parentNode = selectedNode.getParent();
		var preNode = selectedNode.getPreviousChild();
		if(preNode){
			var preMenuId = preNode.getData().id;
			unieap.Action.requestData({
				url : (unieap.WEB_APP_NAME +"/menuProcessor!moveMenu.action"),
				parameters:{"appId":appId,"sourceId":sourceId,"targetId":preMenuId},
				load : function(datacenter){
					var text = datacenter.getDetail();
					if(text=="success"){
						moveItemDataUp(selectedNode,preNode);
						menuTree.getBinding().setDataStore(parentNode,selectedNode.item.rs.getDataStore());
					}else if(text=="fail"){
						MessageBox.alert ({
							//title:"确认框",
							title:RIA_UNIEAPX_I18N.menu.confirmTitle,
							//message:"上移菜单失败。"
							message:RIA_UNIEAPX_I18N.menu.upMenuFail
						});
					}
				}
			},null);
		}else{
			MessageBox.alert ({
				//title:"确认框",
				title:RIA_UNIEAPX_I18N.menu.confirmTitle,
				//message:"该菜单不能上移。",
				message:RIA_UNIEAPX_I18N.menu.cantUpMenu,
				icon:"info"
			});
		}
	}else if(selectedNode.getData().nodeType == "application"){
		MessageBox.alert ({
			//title:"确认框",
			title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"应用节点不能移动。",
			message:RIA_UNIEAPX_I18N.menu.cantMoveAppItem,
			icon:"info"
		});
	}
}

/**
 * 菜单下移
 */
function moveDown(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
	if(selectedNode.getData().nodeType == "menu"){
		var appId = selectedNode.getData().appId;
		var sourceId = selectedNode.getData().id;
		var parentNode = selectedNode.getParent();
		var nextNode = selectedNode.getNextChild();
		if(nextNode){
			var targetId = nextNode.getData().id;
			unieap.Action.requestData({
				url : (unieap.WEB_APP_NAME +"/menuProcessor!moveMenu.action"),
				parameters:{"appId":appId,"sourceId":sourceId,"targetId":targetId},
				load : function(datacenter){
					var text = datacenter.getDetail();
					if(text=="success"){
						moveItemDataDown(selectedNode,nextNode);
						menuTree.getBinding().setDataStore(parentNode,selectedNode.item.rs.getDataStore());
					}else if(text=="fail"){
						MessageBox.alert ({
							//title:"确认框",
							title:RIA_UNIEAPX_I18N.menu.confirmTitle,
							//message:"下移菜单失败。"
							message:RIA_UNIEAPX_I18N.menu.downMenuItemFail
						});
					}
				}
			},null);
		}else{
			MessageBox.alert ({
				//title:"确认框",
				title:RIA_UNIEAPX_I18N.menu.confirmTitle,
				//message:"该菜单不能下移。",
				message:RIA_UNIEAPX_I18N.menu.cantDownMenu,
				icon:"info"
			});
		}
	}else if(selectedNode.getData().nodeType == "application"){
		MessageBox.alert ({
			//title:"确认框",
			title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"应用节点不能移动。",
			message:RIA_UNIEAPX_I18N.menu.cantMoveAppItem,
			icon:"info"
		});
	}
}
//=================================================Detail====================================================================
//是否选择了一个菜单节点
function isSelectedNode(){
	var selectedNode = menuTree.getNodeById(selectedNodeId);
    if(selectedNode!=null && selectedNode.getData().nodeType=="menu"){
    	return true;
    }
    return false;
}

//检查菜单项的正确性
function checkMenuName(){
    if(!menuInfoForm.isModified()){
		MessageBox.alert ({
			//title:"确认框",
			title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"数据没有发生变化。",
			message:RIA_UNIEAPX_I18N.menu.dataNoChange,
			icon:"info"
		});
    	return false;
    }
   if (title.getValue()==""){
		MessageBox.alert ({
			//title:"确认框",
			title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"菜单项标题不能为空。",
			message:RIA_UNIEAPX_I18N.menu.menuTitleCantNull,
			icon:"info"
		});
		title.focus();
		return false;
	}
   return true;
}

//重置菜单信息
this.resetMenuInfo = function(){
	menuInfoForm.reset();
	unieap.byId("rbg").reset()
}

//保存菜单信息
this.saveMenuInfo = function(){
   if(!isSelectedNode()){
	    MessageBox.alert ({
			//title:"确认框",
	    	title:RIA_UNIEAPX_I18N.menu.confirmTitle,
			//message:"请选择菜单结点。",
	    	message:RIA_UNIEAPX_I18N.menu.selectMenuItem,
			icon:"info"
		});
        return ;
   }
   if(!checkMenuName()){
      return ;
   }
	updateMenu();
}

//交换上下节点位置
function moveItemDataDown(selectedNode,nextNode){
	var items = selectedNode.item.rs.primary;
	var selectedNodeTemp = null;
	var nextNodeTemp = null;
	var selectedNodeIndex = -1;
	var nextNodeIndex = -1;
	var temp = null;

	var selectedNodeIndex = items.length;
	for(var i=0;i<items.length;i++){
		if(selectedNode.getData().id==items[i].id){
			selectedNodeTemp = items[i];//找到要交换的数据
			selectedNodeIndex = i;
			break;
		}
	}
	for(var j=0;j<items.length;j++){
		if(nextNode.getData().id==items[j].id){
			nextNodeTemp = items[j];//找到要交换的数据
			nextNodeIndex = j;
			break;
		}
	}
	temp = items[nextNodeIndex];
	items[nextNodeIndex] = items[selectedNodeIndex];
	items[selectedNodeIndex] = temp;
	selectedNode.item.rs.primary = items;
}

function moveItemDataUp(selectedNode,preNode){
	var items = selectedNode.item.rs.primary;
	var selectedNodeTemp = null;
	var preNodeTemp = null;
	var selectedNodeIndex = -1;
	var preNodeIndex = -1;
	var temp = null;
	var preNodeId = preNode.getData().id;
	var selectedNodeId = selectedNode.getData().id;
	for(var i=0;i<items.length;i++){
		if(selectedNode.getData().id==items[i].id){
			selectedNodeTemp = items[i];//找到要交换的数据
			selectedNodeIndex = i;
			break;
		}
	}
	for(var j=0;j<items.length;j++){
		if(preNodeId == items[j].id){
			preNodeTemp = items[j];
			preNodeIndex = j;
			break;
		}
	}
	temp = items[preNodeIndex];
	items[preNodeIndex] = items[selectedNodeIndex];
	items[selectedNodeIndex] = temp;
	selectedNode.item.rs.primary = items;
}

/**
 * 根据输入的节点，获取节点对应的Row
 * @param selectedNode
 * @return
 */
function getSelectedNodeRow(selectedNode)
{
	var parentNode = selectedNode.getParent();
	var parentNodeDataSore = dataCenter.getDataStore(parentNode.getData().appId);
	var selectedRow = null;
	var parentRowSet = parentNodeDataSore.getRowSet();
	
	for( i = 0; i < parentRowSet.getRowCount();i++){
		var tempRow = parentRowSet.getRow(i);
		if(tempRow.getItemValue("id") == selectedNode.getData().id){
			selectedRow = tempRow;
			break;
	    }
	}
	return selectedRow;
}

/**
 * 根据输入的节点，获取节点对应的Row
 * @param selectedNode
 * @return
 */
function deletedSelectedNodeRow(selectedNode){
	var parentNode = selectedNode.getParent();
	var parentNodeDataSore = dataCenter.getDataStore(parentNode.getData().id);
	var selectedRow = null;
	var parentRowSet = parentNodeDataSore.getRowSet();
	for( i = 0; i < parentRowSet.getRowCount();i++){
		var tempRow = parentRowSet.getRow(i);
		if(tempRow.getItemValue("id") == selectedNode.getData().id){
			selectedRow = tempRow;
	    	parentRowSet.deleteRow(selectedRow.getIndex());
	    	break;
	    }
	}
}
/**
 * 判断菜单是否包含扩展属性
 */
function getIfExistExtInfo(){
	isExistExtInfo = true;
}
})
