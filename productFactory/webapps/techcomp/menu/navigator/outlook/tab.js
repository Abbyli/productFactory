var currentMenuId = null;
var menuInstance=null;
var currentMenuIndex = null;
var lockid = null;
var treeNodeMessage = [];
function getCurrentMenuId(){
	return currentMenuId;
}
function refresh(){
	if(currentMenuId!=null){
		addTab.apply(this,treeNodeMessage);
	}
}
//添加某个菜单节点
function addTab(id,label,src,index){
	var menu = dojo.byId(id);
	if(!menu && dojo.byId("unieap_menus").childNodes.length == 6){
		//alert("打开菜单超过最大数。");
		alert(RIA_UNIEAPX_I18N.menu.theMenuNumOverMax);
		throw new Error("max menu");
	}	
	if(arguments.length==1 && id==currentMenuId){
	     return;
	}
	currentMenuIndex = index;
	if(currentMenuId){
	 	var orignMenu = dojo.byId(currentMenuId);
	 	orignMenu.className = "Tab_off";
	 	dojo.style(dojo.byId("page_"+currentMenuId),"display","none");
	}
	currentMenuId = id;
	treeNodeMessage = [];
	treeNodeMessage.push.apply(treeNodeMessage,arguments);
	if(menu){
		menu.className = "Tab_on";
		var frm = dojo.byId("page_"+id);
		dojo.style(frm,"display","block");
		//重新加载
		if(arguments.length>1){
			frm.src = src;
		}
		currentMenuIndex = menu.getAttribute('currentMenuIndex');
	}else{
		menu = dojo.create("td",{
			id : id,
			currentMenuIndex : index
		});
		menu.className = "Tab_on";		
		var result = ["<table class=\"table\" cellpadding=0 cellspacing=0 border=0>"];
		result.push("<tr>");
		result.push("<td class=\"left\">&nbsp;</td>");
		result.push("<td class=\"img\"><img src=\"./themes/images/tab/desktop.gif\"></img></td>");
		result.push("<td class=\"text\" ><nobr>");
		result.push(label);
		result.push("</nobr></td>");
		//result.push("<td class=\"right\" title=\"关闭\">&nbsp;</td>");
		result.push("<td class=\"right\" title=\"+RIA_UNIEAPX_I18N.menu.close+\">&nbsp;</td>");
		result.push("</tr>");
		result.push("</table>");		
		menu.innerHTML =result.join("");
		dojo.byId("unieap_menus").appendChild(menu);	
		createMenu(id); //绑定菜单
		lockid = id;
		var frm = dojo.create("iframe",{
			id : "page_"+id,
			scrolling :"yes",
			noresize : "true",
			height : "100%",
			width : "100%" ,
			frameborder:"0", 
			frameSpacing:"0"	,
			onreadystatechange : function(){
				if(frm.readyState=="complete"){
					lockid= null;
				}
			},
			onload : function(){
				lockid= null;
			}	
		});
		dojo.byId("unieap_pages").appendChild(frm);
		frm.src = src;	
		
	}
}
//删除菜单节点
function deleteMenu(id){
	if(lockid==id) return;
	var menu = dojo.byId(id);
	if(!menu) return;
	menuInstance&&menuInstance.unBindDomNode(id); //解除节点与菜单的绑定
	if(currentMenuId == id){
		var brother = menu.nextSibling ;
		if(!brother){
			brother = menu.previousSibling;
		}
		if(brother){
			addTab(brother.id);
		}
		else{
			currentMenuId = null;
			currentMenuIndex = null;
		}
	}
	dojo.byId("unieap_menus").removeChild(menu);
	var frm = dojo.byId("page_"+id);
	frm.onreadystatechange = frm.onload = null;
	frm.contentWindow.document.write("");
	frm.src = "javascript:false";
	dojo.byId("unieap_pages").removeChild(frm);
}
//删除所有的或除去本身的
function closeAll(id){
	var nodes = dojo.byId("unieap_menus").childNodes;
	var ids=[];
	for(var i=0;i<nodes.length;i++){
		if(id==nodes[i].id) continue;
		ids.push(nodes[i].id);
	}
	dojo.forEach(ids,function(_id){
		deleteMenu(_id);
	});
	
}


//菜单点击事件
function menuClick(evt){
	evt = dojo.fixEvent(evt);
	var target = evt.target;
	var id = getId(target);
	//见bug U_EAP00012712
	if(id == "unieap_menus") return;
	if(!target.nextSibling && target.nodeName.toUpperCase()=="TD"){ //关闭按钮
		deleteMenu(id);
	}
	else{ //选择按钮
		addTab(id);
	}
}


document.oncontextmenu = function(){ return false;};

dojo.addOnUnload(function(){
	document.oncontextmenu = null;
});



//获取操作的菜单项
function getId(target){
	var p = target.parentNode;
	for(;!p.id;){
		p = p.parentNode;
	}
	return p.id;
}

//绑定菜单到指定的dom节点
function createMenu(id){
	if(menuInstance){
		menuInstance.bindDomNode(id);
	}else{
		dojo.require("unieap.menu.Menu");
		menuInstance = new unieap.menu.Menu({onOpen:function(){
			var len=dojo.byId("unieap_menus").childNodes.length;
			if(len==1){
				dijit.byId('closeAotherMenuItem').setDisabled(true);
			}else{
				dijit.byId('closeAotherMenuItem').setDisabled(false);
			}
		}});
		//var item= new unieap.menu.MenuItem({label:"关闭当前",onClick:function(){
		var item= new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.closeCurrent,onClick:function(){
			deleteMenu(currentMenuId);
		}});
		menuInstance.addChild(item);
		//item= new unieap.menu.MenuItem({label:"关闭其它",onClick:function(){
		item= new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.closeOther,onClick:function(){
			closeAll(currentMenuId);
		},id:'closeAotherMenuItem'});
		menuInstance.addChild(item);
		//item= new unieap.menu.MenuItem({label:"关闭所有",onClick:function(){
		item= new unieap.menu.MenuItem({label:RIA_UNIEAPX_I18N.menu.closeAll,onClick:function(){
			closeAll();
		}});
		menuInstance.addChild(item);
		menuInstance.startup();
		menuInstance.bindDomNode(dojo.byId(id));
	}
}
