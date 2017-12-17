dojo.provide("unieapx.widget.WorkspaceAddWidget");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("unieapx.widget.WorkspaceAddWidget",[dijit._Widget, dijit._Templated],{
	templateString:
		"<div  class=\"workspaceAddWidgetArea\" dojoAttachPoint=\"workspaceAddWidget\">"+
			// modify by lugj  去掉切换样式节点
//			"<div  class=\"workspaceSwitchStyle\">"+
//				"<div  dojoAttachPoint=\"switchStyleNode\" class=\"switchStyle\"></div>"+
//				"<div  style=\"clear:both\"></div>"+
//			"</div>"+
			"<ul class=\"categoryUL\" dojoAttachPoint=\"treeStyleNode\" >"+
			"</ul>"+
//			"<div class=\"outlookStyle\" dojoAttachPoint=\"outlookStyleNode\">"+
//				"<table  width=\"90%\" style=\"margin-left:10px;margin-bottom:10px;\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\">"+
//					"<tr>"+
//						"<td dojoAttachPoint=\"navigator\" style=\"vertical-align:top\"></td>"+
//					"</tr>"+
//					"<tr>"+
//						"<td style=\"height:25px;vertical-align:bottom;padding-bottom:10px;\">"+
//							"<div style=\"display:block;\">"+
//								"<div class=\"u-ngt-up\" dojoAttachPoint=\"upBtn\" title=\"向上滚动\">"+
//									"<div class=\"icon\"></div>"+
//								"</div>"+
//								"<div dojoAttachPoint=\"ngttabmenus\" style=\"overflow:hidden;\"></div>"+
//								"<div dojoAttachPoint=\"downBtn\" class=\"u-ngt-down\"  title=\向下滚动\">"+
//									"<div class=\"icon\"></div>"+
//								"</div>"+
//							"</div>"+
//						"</td>"+
//					"</tr>"+
//				"</table>"+
//			"</div>"+
		"</div>",
		
		/*
		 * 对应的workspace对象的引用
		 */
		workspace:null,
		
		/*
		 * 当前的添加widget弹出区域的样式
		 */
		_currentAddWidgetStyle:"tree",
		
		_initStyle:"tree",
		
		/*
		 * 树风格是否已经初始化
		 */
		_treeInit:false,
		
		/*
		 * outlook风格是否已经初始化
		 */
		_outlookInit:false,
		
		_widgetInit:false,
		
		_currentCategory:null,
		
		maxCount:5,
		
		_outlookCategoryPrefix:"outlookCategory",
		
		categoryWidgetMap:null,
		
	    /*********add by lugj start********/
		/**
		 * @summary:
		 * 		tree中非叶子节点的展开状态图标 
		 * @type:
		 * 		{string}
		 * @default:
		 * 		'dijitFolderOpened'
		 */	
		openNodeIconClass: 'dijitFolderOpened',
		
		/**
		 * @summary:
		 * 		tree中非叶子节点的收起状态图标 
		 * @type:
		 * 		{string}
		 * @default:
		 * 		'dijitFolderClosed'
		 */	
		closeNodeIconClass: 'dijitFolderClosed',
		
		/**
		 * @summary:
		 * 		tree中叶子节点的默认图标 
		 * @type:
		 * 		{string}
		 * @default:
		 * 		'dijitLeaf'
		 */		
		leafNodeIconClass: 'dijitLeaf',
	 	/*********add by lugj end********/
		
		postCreate:function(){
			this.connect(this.upBtn,'onclick','scrollup');
			this.connect(this.downBtn,'onclick','scrolldown');
			// modify by lugj  去掉切换样式节点事件响应
//			this.connect(this.switchStyleNode,'onclick','_switchStyle');			
		},
		
		_switchStyle:function(evt){
			if(this._currentAddWidgetStyle=="tree"){
				//要切换到outlook视图
				if(this._outlookInit==false){
					this._initOutlookStyle();
					dojo.style(this.treeStyleNode,"display","none");
					dojo.style(this.outlookStyleNode,"display","block");
				}else{
					dojo.style(this.treeStyleNode,"display","none");
					dojo.style(this.outlookStyleNode,"display","block");
				}
				this._currentAddWidgetStyle="list";
			}else{
				//要切换到tree视图
				if(this._treeInit==false){
					this._initTreeStyle();
					dojo.style(this.outlookStyleNode,"display","none");
					dojo.style(this.treeStyleNode,"display","block");
				}else{
					dojo.style(this.treeStyleNode,"display","block");
					dojo.style(this.outlookStyleNode,"display","none");
				}
				this._currentAddWidgetStyle="tree";
			}
			dojo.stopEvent(evt);
		},
		
		/*
		 * 处理点击添加widget按钮的事件
		 */
		handleClick:function(){
			if(this.workspace._chooseLayoutIsShow){//如果选择布局的区域正在显示，将其隐藏
				this.workspace._hidePanel();
			}
			unieap.widget.requestData({
				url:unieap.widget.url.GETWIDGETCATEGORY,
	            headers : {ajax : true},
	            preventCache : true,
	            parameters:{components:this.workspace.components},
	            load: dojo.hitch(this,function(result){
	            	// modify by lugj 增加多级分类的处理
	            	this._handleRootNodes(result);
//		            	this._showAddWidgetPane();
	            	// 添加展开收起事件
//	            	dojo.query(".dijitTreeExpando", this.workspaceAddWidget).forEach(dojo.hitch(this,function(node){
//	            		this.connect(node,'onclick',"_switchExpandStyle");
//	            	}));
//					dojo.query(".titleContainer",this.workspaceAddWidget).forEach(dojo.hitch(this,function(node){
//						this.workspace._dragManager.registerByNode(node);
//					}));
//					this.workspace._dragManager._dropMode.updateAreas(this.workspace._dragManager._areaList);
//					this._treeInit = true;
				})
			},false);
			dojo.addClass(this.workspace.addWidget,"workspaceIconWidgetEdit");
			dojo.removeClass(this.workspace.addWidget,"workspaceIconAddWidget");
		},
		
		/*********add by lugj start********/
		//得到data的json后 先处理根节点 可能有多个根
		_handleRootNodes:function(result){
//			var root = null;
//			for(var i=0,len=result.length; i<len; i++){
//				root = result[i];
//				var rootNode = dojo.create("li",{
//					'class':"categoryLi",
//					'id':"categoryLi"+root.id
//				},this.treeStyleNode,"last");
//				var rootInnerHTML = [];
//				rootInnerHTML.push("<div class='dijitTreeExpando dijitTreeExpandoOpened' style='float:left;cursor:pointer' dojoAttachPoint='expandNode'></div>");
//				rootInnerHTML.push("<div class='dijitInline dijitTreeIcon "+this.openNodeIconClass+"' style='float:left;margin-right:5px;' dojoAttachPoint='iconNode'>"+"</div>");
//				rootInnerHTML.push("<div dojoAttachPoint='labelNode'>"+root.label+"</div>");
//				rootNode.innerHTML = rootInnerHTML.join("");
//				rootNode = this._addChildrenDomStructure(rootNode,root.children);
//			}
			if(result == ""){
				MessageBox.alert({title:'确认框',message:'未查询到widget分类，请先将widget关联分类后再添加。'});
				return;
			}
			var data = {'result':result,'parent':this.workspace};
			var self = this;
			var dialog = XDialogUtil.showDialog({
				url: unieap.WEB_APP_NAME + "/techcomp/ria/unieapx/widget/addWidgetDialog/addWidgetDialog.jsp",
				title:"新增Widget",
				dialogData:data,
				onComplete:function(dataJson){
					var id = dataJson.id;
					var content = dataJson.content;
					self.workspace._workSpaceData.widgets[id] = content;
					var cellData = {};
					cellData.widgetId = id;
					var cells = self.workspace._workSpaceData.workspace.cells;
					var mixLength = 0;
					var flag = false;
					for(var cell in cells){
						if(cells[cell].length == 0){
							cells[cell].push(cellData);
							flag = true;
							break;
						}else{
							if(mixLength>(cells[cell].length)){
								cells[cell].push(cellData);
								flag = true;
								break;
							}else{
								mixLength = cells[cell].length;
							}
						}
					}
					if(!flag){
						cells[0].push(cellData);
					}
//					self.workspace._workSpaceData.workspace.cells[0].push(cellData);
					self.workspace._layoutRef.cells = null;
					self.workspace._layoutRef.setStructure(self.workspace._workSpaceData);
					self.workspace.resize();
			},
				height:"600",
				width:"1000"
			});
		},
		
//		var OsObject = "";  
//		if(navigator.userAgent.indexOf("MSIE")>0) {  
//		    browserType = "MSIE";  //IE
//		}  
//		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
//			browserType = "Firefox";  //火狐
//		}  
//		if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
//			browserType = "Safari";  //Chrome
//		} 
		
		//为父节点增加子节点的dom结构 递归函数！
		//parentNode是要编写innerHTML的dom dataJson是这个对象的子节点数据json堆栈
		_addChildrenDomStructure:function(parentNode,childrenJson){
			var child = null;
			var childrenUL = dojo.create("ul",{
				dojoAttachPoint:"childrenNode",
				id:"childrenUL"+parentNode.id
			},parentNode,"last");
			for(var i=0,len=childrenJson.length;i<len;i++){
				child = childrenJson[i];
				var childNode = dojo.create("li",{
					'class':"widgetLi widgetTreeNode"
				},childrenUL,"last");
				if(i == len - 1){
					dojo.addClass(childNode,'widgetTreeNodeIsLast');
				}
				var childInnerHTML = [];
				if(child.isLeaf || child.children.length == 0){
					childInnerHTML.push("<div class='dijitTreeExpando dijitTreeExpandoLeaf' style='float:left;cursor:pointer' dojoAttachPoint='expandNode'></div>");
					childInnerHTML.push("<div class='dijitInline dijitTreeIcon "+ (child.isLeaf ? this.leafNodeIconClass : this.openNodeIconClass)+"' style='float:left;margin-right:5px;' dojoAttachPoint='iconNode'>"+"</div>");
					childInnerHTML.push("<div dojoAttachPoint='labelNode' style='display:inline' widget="+child.id+ (child.isLeaf ? "  class='dojoDndItem titleContainer' " : "")+"><span class='widgetContentSpan'>"+child.label+"</span></div>");	
					childNode.innerHTML = childInnerHTML.join("");				
				}else{
					childInnerHTML.push("<div class='dijitTreeExpando dijitTreeExpandoOpened' style='float:left;cursor:pointer' dojoAttachPoint='expandNode'></div>");
					childInnerHTML.push("<div class='dijitInline dijitTreeIcon "+this.openNodeIconClass+"' style='float:left;margin-right:5px;' dojoAttachPoint='iconNode'>"+"</div>");
					childInnerHTML.push("<div dojoAttachPoint='labelNode'>"+child.label+"</div>");	
					childNode.innerHTML = childInnerHTML.join("");
					childNode = this._addChildrenDomStructure(childNode,child.children);
				}
			}
			return parentNode;
		},
		
		_switchExpandStyle:function(evt){
			var domElement = evt.target;
			if(dojo.hasClass(domElement, 'dijitTreeExpandoOpened')){
				var parentNode = domElement.parentNode;
				if(parentNode.childNodes && parentNode.childNodes.length > 0){
					dojo.style(parentNode.childNodes[3],'display','none');
					dojo.removeClass(parentNode.childNodes[1],this.openNodeIconClass);
					dojo.addClass(parentNode.childNodes[1],this.closeNodeIconClass);
					dojo.removeClass(domElement, 'dijitTreeExpandoOpened');
					dojo.addClass(domElement, 'dijitTreeExpandoClosed');
				}
			}else if(dojo.hasClass(domElement, 'dijitTreeExpandoClosed')){
				var parentNode = domElement.parentNode;
				if(parentNode.childNodes && parentNode.childNodes.length > 0){
					dojo.style(parentNode.childNodes[3],'display','block');
					dojo.removeClass(parentNode.childNodes[1],this.closeNodeIconClass);
					dojo.addClass(parentNode.childNodes[1],this.openNodeIconClass);
					dojo.removeClass(domElement, 'dijitTreeExpandoClosed');
					dojo.addClass(domElement, 'dijitTreeExpandoOpened');
				}
			}
		},
		/*********add by lugj end********/
		
		_showAddWidgetPane:function(){
			dojo.style(this.workspaceAddWidget,"display","block");
			this.workspace.resize();
		},
		
		_hideAddWidgetPane:function(){
			dojo.style(this.workspaceAddWidget,"display","none");
			this.workspace._addWidgetIsShow = false;
			dojo.addClass(this.workspace.addWidget,"workspaceIconAddWidget");
			dojo.removeClass(this.workspace.addWidget,"workspaceIconWidgetEdit");
			this.workspace.resize();
		},
		
		
		_createTreeElement:function(categoryId,categoryName,categoryDescription){
			var widgets = this.categoryWidgetMap[categoryId];
			var categoryLi = dojo.create("li",{'class':"categoryLi",title:categoryDescription,id:"categoryLi"+categoryId},this.treeStyleNode,"last");//某个分类的li
			categoryLi.innerHTML = categoryName;
			var categoryUL = dojo.create("ul",{'class':"widgetUL",id:"categoryUl"+categoryId},categoryLi,"last");//该分类的ul
			var categoryWidgets = this.categoryWidgetMap[categoryId];
			for(var i=0,l=categoryWidgets.length;i<l;i++){
				var widgetLi = dojo.create("li",{'class':"widgetLi",title:categoryWidgets[i].description},categoryUL,"last");//最外层的li
				var iconPath = categoryWidgets[i].iconPath;
				var innerHTMLContent = [];
				if(iconPath){
					//设置了图标地址，使用设置的图标地址
					//background-image: url(http://localhost:8086/framework/components/navigator/styles/themes/mac/images/navigator/tree-leaf.png)
					innerHTMLContent.push("<span style='background:url("+unieap.getContextPath()+iconPath+") no-repeat'>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				}else{
					//没有设置，使用默认的图标
					innerHTMLContent.push("<span style='background:url("+unieap.widget.url.GETWIDGETDEFAULTICON+") no-repeat'>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				}
				innerHTMLContent.push("<div style='display:inline' widget="+categoryWidgets[i].id+"  class='dojoDndItem titleContainer'><span class='widgetContentSpan'>"+categoryWidgets[i].name+"</span></div>");
				//widgetLi.innerHTML = "<span style=''>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='widgetContentSpan'>"+categoryWidgets[i].name+"</span>";
				widgetLi.innerHTML = innerHTMLContent.join("");
				//dojo.attr(widgetLi,"widget",categoryWidgets[i].id);
			}
		}, 
		
		_initTreeStyle:function(){
			//this.widgetsCategory=[{id:"c1",name:"第一个分类"},{id:"c2",name:"第二个分类"}];
			for(var i=0,l=this.widgetsCategory.length;i<l;i++){//创建每个分类的树节点
				var categoryId = this.widgetsCategory[i].id;
				var categoryName = this.widgetsCategory[i].name;
				var categoryDescription = this.widgetsCategory[i].description;
				this._createTreeElement(categoryId,categoryName,categoryDescription);
			}
			//this._createTreeElement("categoryJustForOther","其它","其它分类");
			this._showAddWidgetPane();
			this._widgetInit = true;
			dojo.query(".titleContainer",this.workspaceAddWidget).forEach(dojo.hitch(this,function(node){
				this.workspace._dragManager.registerByNode(node);
			}));
			this.workspace._dragManager._dropMode.updateAreas(this.workspace._dragManager._areaList);
			this._treeInit = true;
		},
		
		_initOutlookStyle:function(){
			this.createCategoryList();
		},
		
		setCurrentCategory:function(categoryId,categoryName){
			var orignCategory = dojo.byId("parent".concat(this._currentCategory));
			if(orignCategory){
				if( categoryId== this._currentCategory){
					return;
				}
				dojo.style(orignCategory,"display","none");
			}

			this._currentCategory = categoryId;	
			var currentCategory = dojo.byId("parent".concat(categoryId));
			if(currentCategory){
				 dojo.style(currentCategory,"display","block");
			}else{
				this.createCategoryContent(categoryId,categoryName);
			}	
		},
		
		
		createCategoryContent:function(categoryId,categoryName){
			var menu = dojo.create("div",{
				id : "parent"+categoryId,
				'class' : "u-ngt-menu"		
			});
			this.navigator.appendChild(menu);
			var result = ['<table class="u-ngt-tab" cellspacing="0" cellpadding="0" style="table-layout:fixed">'];
			result.push('<tr>');
			result.push('<td class="u-ngt-title">');
			result.push('<div class="u-ngt-label">');
			result.push(categoryName);
			result.push('</div>');
			result.push('</td>');
			result.push('</tr>');	
			result.push('<tr>');
			result.push('<td style=\"vertical-align:top\"><div style=\"overflow:hidden;width:100%;height:100%;\">');	
			result.push('<div class="u-ngt-content"  id="');
			result.push('content'+categoryId);
			result.push('"></div>');
			result.push('</div></td>');	
			result.push('</tr>');	
			result.push('</table>');			
			menu.innerHTML = result.join('');
			var node = dojo.byId('content'+categoryId);
			
			var categoryWidgets = this.categoryWidgetMap[categoryId];
			
			for(var i=0,l=categoryWidgets.length;i<l;i++){
				var widgetLi = dojo.create("div",{"class":"widgetLi",title:categoryWidgets[i].description},node,"last");//最外层的li
				
				var iconPath = categoryWidgets[i].iconPath;
				var innerHTMLContent = [];
				if(iconPath){
					//设置了图标地址，使用设置的图标地址
					//background-image: url(http://localhost:8086/framework/components/navigator/styles/themes/mac/images/navigator/tree-leaf.png)
					innerHTMLContent.push("<span style='background:url("+unieap.getContextPath()+iconPath+") no-repeat'>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				}else{
					//没有设置，使用默认的图标
					innerHTMLContent.push("<span style='background:url("+unieap.getContextPath()+"/components/widget/resource/images/widgets/widget_default.png) no-repeat'>&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				}
				innerHTMLContent.push("<div style='display:inline;padding:0px' widget="+categoryWidgets[i].id+"  class='dojoDndItem titleContainer'><span class='widgetContentSpan'>"+categoryWidgets[i].name+"</span></div>");
				//widgetLi.innerHTML = "<span style=''>&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='widgetContentSpan'>"+categoryWidgets[i].name+"</span>";
				widgetLi.innerHTML = innerHTMLContent.join("");
				//dojo.attr(widgetLi,"widget",categoryWidgets[i].id);
				
				
				
				//widgetLi.innerHTML = "<span class=\"widgetContentSpan\">"+categoryWidgets[i].name+"</span>";
				//dojo.attr(widgetLi,"widget",categoryWidgets[i].id);
				
				dojo.query(".titleContainer",this.workspaceAddWidget).forEach(dojo.hitch(this,function(node){
					this.workspace._dragManager.registerByNode(node);
				}));
				this.workspace._dragManager._dropMode.updateAreas(this.workspace._dragManager._areaList);
			}
		},
		createCategoryList:function(){
			//this.widgets=[{id:"w1",name:"widget1",categoryId:"c1,c2"},{id:"w2",name:"widget2",categoryId:"c2"},{id:"w3",name:"widget3",categoryId:"c1"}];
			//this.widgetsCategory=[{id:"c1",name:"第一个分类"},{id:"c2",name:"第二个分类"}];
			var result = ['<table width="100%" cellspacing="0" cellpadding="0">'];
			for(var i=0,l=this.widgetsCategory.length;i<l;i++){
//				var name;
//				var id;
//				if(i==l){
//					name = "其它";
//					id="categoryJustForOther";
//				}else{
//					name = this.widgetsCategory[i].name;
//					id=this.widgetsCategory[i].id;
//				}
				
				var name = this.widgetsCategory[i].name;
				var id=this.widgetsCategory[i].id;
				
				result.push('<tr>');
				result.push('<td class="u-ngt-btm category-list-elem" name="'+name+'"  id="'+this._outlookCategoryPrefix+id+'">');
				result.push('<div class="u-ngt-label">');
				result.push(name);
				result.push('</div>');
				result.push('</td>');
				result.push('</tr>');		
			}
			result.push('</table>');	
			if(this.widgetsCategory.length+1 > this.maxCount){
				dojo.style(this.ngttabmenus,"height",this.maxCount * 25 +"px");
				dojo.style(this.upBtn,"display","block");
				dojo.style(this.downBtn,"display","block");
				this.keepScrollBtnStatus();
			}
			this.ngttabmenus.innerHTML = result.join("");
			
			
			dojo.query(".category-list-elem",this.ngttabmenus).forEach(dojo.hitch(this,function(elem){
				this.connect(elem,"onclick",function(evt){
					var domId = elem.id;
					var name = dojo.attr(elem,"name");
					var id = domId.substring(this._outlookCategoryPrefix.length);
					this.setCurrentCategory(id,name);
					dojo.stopEvent(evt);
				});
			}));
			this.setCurrentCategory(this.widgetsCategory[0].id,this.widgetsCategory[0].name);	
			this._showAddWidgetPane();
		},
		
		scrollup:function(){
			var tables = this.ngttabmenus;
			if(tables.scrollTop + tables.clientHeight +50 < tables.firstChild.offsetHeight){
				tables.scrollTop += 50;
			}
			else{
				tables.scrollTop += tables.firstChild.offsetHeight - tables.clientHeight;
			}
			this.keepScrollBtnStatus();
		},
		
		scrolldown:function(){
			var tables = this.ngttabmenus;
			if(tables.scrollTop >50){
				tables.scrollTop -= 50;
			}
			else{
				tables.scrollTop = 0;
			}
			this.keepScrollBtnStatus();
		},
		
		keepScrollBtnStatus:function(){ 
			var tables = this.ngttabmenus;
			if(!tables.scrollTop){
				this.downBtn.disabled = true;
				this.upBtn.disabled = false;
				return;
			}
			else{
				this.downBtn.disabled = false;
			}
			if(tables.scrollTop + tables.clientHeight>=tables.firstChild.offsetHeight){
				this.upBtn.disabled = true;
			}
			else{
				this.upBtn.disabled = false;
			}
		},
		
		//对得到的分类和widget进行处理，形成一个内部的结构
		//{c1:[{id:"w1",name:"widget1",categoryId:"c1,c2"},{id:"w2",name:"widget2",categoryId:"c1"}],c2:[{id:"w1",name:"widget1",categoryId:"c1,c2"}]}
		_initCategoryWidgetMap:function(){
			//this.widgets=[{id:"w1",name:"widget1",categoryId:"c1,c2"},{id:"w2",name:"widget2",categoryId:"c2"},{id:"w3",name:"widget3",categoryId:"c1"}];
			//this.widgetsCategory=[{id:"c1",name:"第一个分类"},{id:"c2",name:"第二个分类"}];
			this.categoryWidgetMap = {};
			for(var i=0,l=this.widgetsCategory.length;i<l;i++){//创建每个分类的树节点	
				this.categoryWidgetMap[this.widgetsCategory[i].id]=[];
			}
			this.categoryWidgetMap["categoryJustForOther"]=[];
			for(var i=0,l=this.widgets.length;i<l;i++){
				var categotyIds = this.widgets[i].categoryId.split(",");
				var hasInsert = false;
				if(categotyIds.length>0){
					for(var j=0,lid=categotyIds.length;j<lid;j++){
						var mapElement = this.categoryWidgetMap[categotyIds[j]]
						if(mapElement){
							mapElement.push(this.widgets[i]);
							hasInsert = true;
						}
					}
				}
				if(categotyIds.length==0||hasInsert==false){
					this.categoryWidgetMap["categoryJustForOther"].push(this.widgets[i]);
				}

			}
		}
		
})