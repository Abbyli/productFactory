dojo.provide('unieap.grid.view.toolbar');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare('unieap.grid.view.toolbar', [dijit._Widget, dijit._Templated], {
	/**
	 * @summary:
	 * 		Grid的工具条
	 * @declaredClass:
	 * 		unieap.grid.view.toolbar
	 * @classDescription：
	 * 		可进行翻页,打印,导出,个性化等操作的工具条
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<header>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	${1}<toolbar ${2}print='{}' paging='{}' export='{}' individual='{}'>
	 * |		<button>自定义按钮</button>
	 * |	</toolbar>
	 * |</div>
	 * ${1}Grid中定义toolbar标签,通过grid.getToolBar()得到Grid的toolbar
	 * ${2}print,paging,export,individual分别传递相关信息。
	 * @img:
	 * 		images/grid/toolbar.png	
	 */

    grid: null,
    
	/**
	 * @summary：
	 * 		翻页相关信息
	 * @description:
	 * 		toolbar默认初始化翻页信息
	 * @type:
	 * 		{object}
	 * @see:
	 * 		unieap.grid.manager.PagingManager
	 */
    paging: null,
    
	/**
	 * @summary:
	 * 		打印相关信息
	 * @description：
	 * 		配置print属性才初始化打印相关的功能
	 * @type：
	 * 		{object}
	 * @example：
	 * |	<toolbar print='{...}'>
	 * |	</toolbar>
	 * 		toolbar上会出现一个打印按钮
	 * @see:
	 * 		unieap.grid.manager.PrintManager
	 */
    print: null,
	
	
	
	/**
	 * @summary:
	 * 		导出相关信息
	 * @description:
	 * 		配置export属性才初始化导出相关的功能
	 * @type:
	 * 		{object}
	 * @example：
	 * |	<toolbar export='{defaultType:"client"}'>
	 * |	</toolbar>
	 * 		export的defaultType信息表示导出方式,可为client server
	 * @see:
	 * 		unieap.grid.manager.ExportManager
	 */		
    'export': null,
    
    /**
	 * @summary:
	 * 		导入相关信息
	 * @description:
	 * 		配置import属性才初始化导出相关的功能
	 * @type:
	 * 		{object}
	 * @example：
	 * |	<toolbar import='{pageURL:"XXX"}'>
	 * |	</toolbar>
	 * @see:
	 * 		unieap.grid.manager.ImportManager
	 */	
    'import': null,
    
	_destroyWidgets: null,
	
	/**
	 * @summary:
	 * 		个性化相关信息
	 * @description
	 * 		配置individual属性才初始化个性化相关的功能
	 * 		通过个性化对话框可以配置列的显示、锁定、位置
	 * @type:
	 * 		{object}
	 * @see:
	 * 		unieap.grid.manager.Individual
	 */
    individual: null,
    
    templateString: "<div class='u-grid-master-toolbar'>" +
						//翻页条
					    "<div class='u-grid-page left'>" +
						    "<table cellPadding='0' cellSpacing='0'><tbody><tr>" +
								    "<td><span dojoAttachPoint='firstImageNode' class='ico u-grid-page-first'></span></td>" +
								    "<td><span dojoAttachPoint='prevImageNode' class='ico u-grid-page-prev'></span></td>" +
								    "<td><span dojoAttachPoint='nextImageNode' class='ico u-grid-page-next'></span></td>" +
								    "<td><span dojoAttachPoint='lastImageNode' class='ico u-grid-page-last'></span></td>" +
								    "<td><div class='sep'></div></td>" +
								    "<td><span dojoAttachPoint='pageNoStart' class='u-grid-page-totalPage'></span></td>" +
								    "<td><input dojoAttachPoint='pageNoNode' class='u-grid-page-pageNo'></td>" +
								    "<td><span dojoAttachPoint='totalPageNoNode' class='u-grid-page-totalPage'></span></td>" +
//								    "<td><div class='sep'></div></td>" +
							"</tr></tbody></table>" +
						"</div>" +
						
						//动态改变每页显示数据条数
						"<div class='u-grid-page left' style='display:none'>"+
							"<table cellPadding='0' cellSpacing='0'><tbody><tr>"+
							"<td><span class='u-grid-cpagesize-left' dojoAttachPoint='perPageNode'></span></td>"+
							"<td dojoAttachPoint='customPageSizeNode'></td>"+
							"<td><span class='u-grid-cpagesize-right' dojoAttachPoint='rowsNode'></span></td>"+
							"<td><div class='sep'></div></td>" +
							"</tr></tbody></table>"+
						"</div>"+
						
						//导出、打印、个性化
						"<div  class='u-grid-page left' style='display:none' >" +
							"<table cellPadding='0' cellSpacing='0'><tbody><tr>" +
								"<td><span class='u-grid-export' dojoAttachPoint='exportNode' ></span></td>" +
								"<td><span class='u-grid-import' dojoAttachPoint='importNode'></span></td>" +
								"<td><span class='u-grid-individual' dojoAttachPoint='individualNode'></span></td>" +
								"<td><span class='u-grid-print' dojoAttachPoint='printNode'></span></td>" +
							"</tr></tbody></table>" +
						"</div>" +
						
						//用户在toolbar上自定义显示
						"<div  class='u-grid-page left'>" +
							"<table cellPadding='0' cellSpacing='0'><tbody><tr><td dojoAttachPoint='containerNode' height='100%'>" +
							"</td></tr></tbody></table>" +
						"</div>" +
						
						//翻页信息显示(本页多少条记录、共多少条记录)
						"<div class='u-grid-page right' >" +
							"<table cellPadding='0' cellSpacing='0'><tbody><tr><td>" +
							    "<span dojoAttachPoint='pageInfoNode'></span>" +
						    "</td></tr></tbody></table>" +
					    "</div>" +
    				"</div>",
					
	//本页共{0}条记录  共{1}条记录				
    _pageInfoTemplate: RIA_I18N.grid.paging.template,
    
	_fillContent: function() {
		var source=this.grid.toolbarSrcNode;
		var dest = this.containerNode;
		if (source && dest) {
			while(source.hasChildNodes()) {
				dest.appendChild(source.firstChild);
			}
		}
	},
	
    postCreate: function() {
        this.grid.domNode.appendChild(this.domNode);
        this.perPageNode.innerHTML = RIA_I18N.grid.toolbar.perPage;
        this.rowsNode.innerHTML=RIA_I18N.grid.toolbar.items;
		dojo.attr(this.firstImageNode,'title',RIA_I18N.grid.paging.firstPage);
		dojo.attr(this.prevImageNode,'title',RIA_I18N.grid.paging.prevPage);
		dojo.attr(this.nextImageNode,'title',RIA_I18N.grid.paging.nextPage);
		dojo.attr(this.lastImageNode,'title',RIA_I18N.grid.paging.lastPage);
		
		dojo.attr(this.individualNode,'title',RIA_I18N.grid.toolbar.individual);
		dojo.attr(this.printNode,'title',RIA_I18N.grid.toolbar.print);
		
        this._configPaging();
        //导入设置
       	if (this['import'] && this['import'].enable) {
            this.domNode.childNodes[2].style.display = 'block';
            this.importNode.style.display = 'block';
            this._configImport();
//            var uniqueCell = this['import'].uniqueCell;
//            this.connect(this.importNode,"onclick",this.doImportOnClick);
        }
        
        if (this['export']) {
            this.domNode.childNodes[2].style.display = 'block';
            this.exportNode.style.display = 'block';
            this._configExport();
            setTimeout(dojo.hitch(this,function(){
	            var tooltipMessage = this.grid.managers.managers.ExportManager.tooltipMessage;
	        	if(tooltipMessage!=null&&tooltipMessage!=''){
		            this.connect(this.domNode.childNodes[2],"onmouseover",this._onExportMouseOver);
		            this.connect(this.domNode.childNodes[2],"onmouseout",this._onExportMouseOut);
	        	}
            }),0);
        }
        if (this['print']) {
            this.domNode.childNodes[2].style.display = 'block';
            this.printNode.style.display = 'block';
            this._configPrint();
        }
        if (this['individual']) {
            this.domNode.childNodes[2].style.display = 'block';
            this.individualNode.style.display = 'block';
            this._configIndividual();
        }
		
        this.update();
    },
    
    /**
     * @summary:
     * 		更新toolbar的翻页信息
     * @description:
     * 		在数据发生变化时更新翻页相关的信息
     * @example：
     * |	grid.getToolBar().update();
     * 		更新toolbar上的信息
     */
    update: function() {
		this._displayPagingBar && this._updatePagingStatus();
		var combox=this._comboBox;
		//如果下拉框只有一条数据就清空下拉框的值，否则不清空
		//对应问题 U_EAP00021024
		combox && combox.getDataProvider().getItems().length ==1 && combox.setValue('');
    },
    
    
	//grid导出显示提示信息
	 _onExportMouseOver: function(){
    	unieap.showTooltip({inner:this.grid.managers.managers.ExportManager.tooltipMessage},this.exportNode);
   },
   //grid导出隐藏提示信息
   _onExportMouseOut: function(){
   		unieap.showTooltip(this.exportNode);
   },
    
    //------------------------------------翻页-----------------------------------
	
	//	display可选值为"none"或者"block"
	_hideOrShowPagingBar: function(display) {
		var children=this.domNode.childNodes;
		dojo.style(children[0],'display',display);
		if (this._userPageSize) {
			dojo.style(children[1],'display',display);
		}
		dojo.style(children[4],'display',display);
	},
	

	//显示toolbar上的翻页条
	_showPagingBar: function() {
		if (!this._displayPagingBar) {
			this._displayPagingBar=true;
			this._hideOrShowPagingBar("block");
			//如果没有配置过翻页相关设置
			if (!this._haveConfigedPaging) {
				this._configPaging();
				this.update();
			}
		}
	},
	
	//隐藏toolbar上翻页条
	_hidePagingBar:function(){
		if (this._displayPagingBar) {
			this._displayPagingBar = false;
			this._hideOrShowPagingBar("none");
		}
	},

    //配置翻页相关
    _configPaging: function() {
		!this._displayPagingBar && (this._displayPagingBar = this.paging && this.paging['display']);
		//默认显示翻页条,如果用户不配置就为true

		if (this._displayPagingBar==null|this._displayPagingBar==undefined) {
			this._displayPagingBar=true;
		}
		
		var userPageSize=this.paging && this.paging['userPageSize'];
		
		//用户如果设置了userPageSize属性（无论是true还是false)，就用用户的设置，否则走系统统一的属性
		this._userPageSize=this.paging && (typeof(userPageSize) !="undefined" ? userPageSize : unieap.widget.grid.userPageSize);
		
        if (!this.grid.managers.params['PagingManager']) {
            this.grid.managers.params['PagingManager'] = this.paging || {};
        }
		if (!this._displayPagingBar) {
			this._hideOrShowPagingBar("none");
			return;
		}

		setTimeout(dojo.hitch(this, function() {
			this._configUserPageSize();
		}),0);
		//已经完成翻页的相关设置
		this._haveConfigedPaging=true;
        this.connect(this.firstImageNode, 'onclick', '_onFirstClick');
        this.connect(this.prevImageNode, 'onclick', '_onPrevClick');
        this.connect(this.nextImageNode, 'onclick', '_onNextClick');
        this.connect(this.lastImageNode, 'onclick', '_onLastClick');
        this.connect(this.pageNoNode, 'onkeyup', '_onPageNoClick');
        
        //以下非UI事件 需要使用dojo.connect
        this.connects = [];
        this.connects.push(dojo.connect(this.grid, 'onStoreChanged', this, 'update'));
        this.connects.push(dojo.connect(this.grid, 'onRowSetChanged', this, 'update'));
//        this.connects.push(dojo.connect(this.grid, 'onItemChanged', this, 'update'));
        
        this._buttonList = [this.firstImageNode, this.prevImageNode, this.nextImageNode, this.lastImageNode];
		
    },
    
    //更新翻页状态信息
    _updatePagingStatus: function(){
        var manager = this.grid.managers.get('PagingManager');
        var binding = this.grid.getBinding();
        if(manager && manager.asyncPageCount && manager.asyncPageCountFinish){
        	var store = binding.store;
        	binding.store.setRecordCount(manager.totalCount);
        }
        var info = manager.getPageInfo();
        var pageSize = info.pageSize;
        if(!(binding._supportClientPaging() && binding.getDataStore().getName().indexOf(this._pagingStoreName)==-1)){
        	info.totalCount += info.totalPageCount-info.initialPageCount;
        }
        var	totalPage = pageSize==0?0:pageSize>0?Math.ceil(info.totalCount / pageSize):0;
        
        //更新buttons状态
        dojo.forEach(this._buttonList, function(node, index){
            var array = ['first', 'prev', 'next', 'last'];
            dojo.addClass(node, 'u-grid-page-' + array[index]);
            dojo.removeClass(node, 'u-grid-page-' + array[index] + '-disabled');
        }, this)
        if (info.pageNumber == 1) {
            if(!dojo.hasClass(this._buttonList[0],'u-grid-page-first-disabled')){
            dojo.addClass(this._buttonList[0], 'u-grid-page-first-disabled');
            	dojo.removeClass(this._buttonList[0], 'u-grid-page-first');
            }
            if(!dojo.hasClass(this._buttonList[1],'u-grid-page-prev-disabled')){
            dojo.addClass(this._buttonList[1], 'u-grid-page-prev-disabled');
            	dojo.removeClass(this._buttonList[1], 'u-grid-page-prev');
            }
        }
        if (info.pageNumber >= totalPage) {
            if(!dojo.hasClass(this._buttonList[2],'u-grid-page-next-disabled')){
            dojo.addClass(this._buttonList[2], 'u-grid-page-next-disabled');
            	dojo.removeClass(this._buttonList[2], 'u-grid-page-next');
            }
            if(!dojo.hasClass(this._buttonList[3],'u-grid-page-last-disabled')){
            dojo.addClass(this._buttonList[3], 'u-grid-page-last-disabled');
            	dojo.removeClass(this._buttonList[3], 'u-grid-page-last');
            }
        }
		if (totalPage < info.pageNumber) {
			totalPage = info.pageNumber;
		}
		
        if(info.totalCount < 0){
        	info.totalCount = 0;
        }
        //更新信息
        this.pageNoNode.value = info.pageNumber;
//        this.pageInfoNode.innerHTML = this._pageInfoTemplate.replace('{0}', info.pageCount).replace('{1}', info.totalCount);
        
        
        if(manager && manager.asyncPageCount && !manager.asyncPageCountFinish){
        	this.pageInfoNode.innerHTML = this._pageInfoTemplate.replace('{0}', info.pageCount).replace('{1}', "<div class='grid-pagecount-wait-img'></div>");
        	this.totalPageNoNode.innerHTML = "/" + "<div class='grid-pagecount-wait-img'></div>" + RIA_I18N.grid.paging.page;
        }
        else{	
        	this.pageInfoNode.innerHTML = this._pageInfoTemplate.replace('{0}', info.pageCount).replace('{1}', info.totalCount);
        	this.totalPageNoNode.innerHTML = "/" + totalPage + RIA_I18N.grid.paging.page;
        }
        
        //RIA_I18N.grid.paging.pagePrefix的值，中文为"第"，英文为"Page"
        this.pageNoStart.innerHTML = RIA_I18N.grid.paging.pagePrefix;
		//RIA_I18N.grid.paging.page的值，中文为"页"，英文为""
//        this.totalPageNoNode.innerHTML = "/" + totalPage + RIA_I18N.grid.paging.page;
    },
    //第一页
    _onFirstClick: function(){
        var manager = this.grid.managers.get('PagingManager');
        if (manager.getPageNumber() > 1) {
            manager.firstPage();
        }
    },
    //上一页
    _onPrevClick: function(){
        var manager = this.grid.managers.get('PagingManager');
        if (manager.getPageNumber() > 1) {
            manager.prevPage();
        }
    },
    //下一页
    _onNextClick: function(){
        var manager = this.grid.managers.get('PagingManager');
        if (manager.getPageNumber() < manager.getTotalPage()) {
            manager.nextPage();
        }
    },
    //最后一页
    _onLastClick: function(){
        var manager = this.grid.managers.get('PagingManager');
        if (manager.getPageNumber() < manager.getTotalPage()) {
            manager.lastPage();
        }
    },
    _onPageNoClick: function(e){
        var manager = this.grid.managers.get('PagingManager');
        if (e.keyCode == dojo.keys.ENTER) {
            var n = this.pageNoNode.value;
            n = n.replace(/[^0-9-]/g, '');
            n = Number(n);
            if (n > manager.getTotalPage()) {
                n = manager.getTotalPage();
            } else {
            	n = Math.max(n, 1);
            }
            if (n > 0 && n <= manager.getTotalPage() && n != manager.getPageNumber()) {
                manager.setPageNumber(n);
            }
        }
    },
	
	
	//-------------------------自定义每页显示的数据条数--------------------------------
	
	_configUserPageSize:function(){
		//只有当翻页条显示时才显示
		if(this._userPageSize&&this._displayPagingBar){
			dojo.style(this.domNode.childNodes[1],'display','block');
			this._userPageSize=dojo.isArray(this._userPageSize)?this._userPageSize:[5,10,20,50,100,200];
			var defaultValue,
				size=this.grid.managers.get('PagingManager').getPageInfo().pageSize;
			if(dojo.indexOf(this._userPageSize,size)>-1){
				defaultValue=size;
			}
			this._createComboBox(this._userPageSize,defaultValue);
		}
	},
	

	//构建下拉框
	_createComboBox: function(options,defaultValue) {
		if(!dojo.isArray(options)) return;
		dojo.require("unieap.form.ComboBox");
		this._comboBox&&this._comboBox.destroy();
		dojo.empty(this.customPageSizeNode);
		var html=[],_temp,_grid=this.grid,_gridId=_grid.id,_rootID=(_grid._rootID||""),_id = "customPageSizeComboBox";
		if(_rootID.length > 0){
			_gridId = _gridId.substring(_gridId.indexOf(_rootID) + _rootID.length);
		}
		_id = _gridId + "_" + _id;
		if(options.length > 0){
			var maxValue = options[0];
			for(var i=1,len=options.length;i<len;i++){
				if(maxValue < options[i])
					maxValue = options[i];
			} 
			var widthValue = (String(maxValue).length * 10 + 33) + "px";
		}else{
			var widthValue = '55px';
		}
		html.push("<select width='"+widthValue+"' id='" + _id + "' dojoType='unieap.form.ComboBox' popup='{displayStyle:\"list\"}' comboShowSelect='false' dataProvider='{staticData:true}'>");
		dojo.isArray(options)&&dojo.forEach(options,function(item){
			item==-1?(_temp="---"):(_temp=item);
			html.push("<option value="+item+">"+_temp+"</option>");
		});
		html.push("</select>");
		this.customPageSizeNode.innerHTML=html.join('');
		dojo.parser.parse(this.customPageSizeNode);
		this._comboBox=dijit.byNode(this.customPageSizeNode.childNodes[0]);
		defaultValue&&this._comboBox.setValue(defaultValue);
		dojo.addClass(this._comboBox.fieldNode, "u-form-readOnly");
		dojo.addClass(this._comboBox.inputNode, "u-form-textbox-input-readonly");
		this._comboBox.inputNode.readOnly = true;
		this.connect(this._comboBox,"onChange",function() {
			var value = this._comboBox.getValue();
			if(!value){return;}
			this._setPageSize(value);
		});
	},
	
	getComboBox: function() {
		return this._comboBox;
	},
	
	//触发onChange事件
	_setPageSize: function(pageSize) {
		this.grid.managers.get('PagingManager').clearPageData();
		var store=this.grid.getBinding().getDataStore();
		store.getRowSet().reset();
		store.setPageSize(pageSize);
		this.grid.managers.get('PagingManager').setPageNumber(1);
		
	},
	
	//导入
	_configImport: function() {
		this._createImportNode();
		if (!this.grid['ImportManager']) {
			var importParams = this['import'] || {};
			dojo.require("unieap.grid.manager.ImportManager");
			this.grid['ImportManager'] = new unieap.grid.manager.ImportManager(dojo.mixin(importParams,{grid:this.grid}));
			this.grid.managers.params['ImportManager'] = importParams;
        }
    },
    _createImportNode:function(){
    	dojo.require('unieap.form.Button');
    	var importButton = new unieap.form.Button({
        	id: this.grid.id + "_unieapGridImportButton",
			iconClass:'u-grid-import-button'
        }).placeAt(this.importNode); 
    	dojo.style(importButton.btnNode, "padding", "0px");
    	this.connect(importButton,"onClick",this.doImportOnClick);
    },
	
    //------------------------------------导出-----------------------------------
    
    //配置导出相关信息
    _configExport: function() {
        this._createExportNode();
		if (!this.grid.managers.params['ExportManager']) {
            this.grid.managers.params['ExportManager'] = this['export'] || {};
        }
    },
    _createExportNode: function(){
        dojo.require('unieap.menu.Menu');
        dojo.require('unieap.form.DropDownButton');
        var exportNode = this.exportNode, menu, ddbutton,
			options=this['export']['options']||['server','client','checked'],
			type=this['export']['defaultType']||'server';
		menu = new unieap.menu.Menu();
		options&&dojo.isArray(options)&&dojo.forEach(options,function(option){
			if(option=='server'){
				menu.addChild(new unieap.menu.MenuItem({
					//服务端导出
					label: RIA_I18N.grid['export'].serverExport,
					iconClass: "export-s",
					onClick: dojo.hitch(this, this.doServerExport)
				}));
			}else if(option=='client'){
		        menu.addChild(new unieap.menu.MenuItem({
			        //客户端导出
		            label: RIA_I18N.grid['export'].clientExport,
		            iconClass: "export-c",
		            onClick: dojo.hitch(this, this.doClientExport)
		        }));
			}else if(option=='checked'){
				menu.addChild(new unieap.menu.MenuItem({
				    //导出选中记录
					label:RIA_I18N.grid['export'].selectedExport,
					iconClass:'export-checked',
					onClick:dojo.hitch(this,this.exportSelectedData)
				}));
			}
		},this);
        
        ddbutton = new unieap.form.DropDownButton({
        	id: this.grid.id + "_unieapGridExportButton",
            dropDown: menu,
			width:'38px'
        }).placeAt(exportNode);
        if (type == 'client') {
            ddbutton.setIconClass('default-export-c');
			this.connect(ddbutton,'onClick','doClientExport');
        } else if(type=='checked') {
			ddbutton.setIconClass('default-export-checked');
			this.connect(ddbutton,'onClick','exportSelectedData');
        } else if(type=='server') {
			ddbutton.setIconClass('default-export-s');
			this.connect(ddbutton,'onClick','doServerExport');
		}
		if(!this._destroyWidgets) {
			this._destroyWidgets=[];
		}
		this._destroyWidgets.push(menu);
		this._destroyWidgets.push(ddbutton);
    },
	

    doServerExport: function() {
		this.grid.managers.get('ExportManager').doServerExport();
    },
	

    doClientExport: function() {
		this.grid.managers.get('ExportManager').doClientExport();
    },
	

	exportSelectedData: function() {
		this.grid.managers.get('ExportManager').exportSelectedData();
	},
	
	doImportOnClick:function(){
    	this.grid.managers.get('ImportManager')._openImportXDialog();
    },
    
    //------------------------------------打印-----------------------------------
    _configPrint: function() {
		if (!this.grid.managers.params['PrintManager']) {
            this.grid.managers.params['PrintManager'] = this['print'] || {};
        }
		this.connect(this.printNode,'onclick','doPrint');
    },
	

	doPrint:function(){
		this.grid.managers.get('PrintManager').doPrint();
	},
	
    
    //------------------------------------个性化-----------------------------------
    _configIndividual: function(){
        if (!this.grid.managers.params['Individual']) {
            this.grid.managers.params['Individual'] = this.individual;
        }
        this.individual && this._updateIndividual();

    },
    _updateIndividual: function(){
        var manager = this.grid.managers.get("Individual");
        if (!manager) {
            return;
        }
        dojo.require('unieap.menu.Menu');
        dojo.require('unieap.form.DropDownButton');
        var individualNode = this.individualNode, menu, button;
        manager.setSource(individualNode);
        menu = new unieap.menu.Menu();
		//设置
        menu.addChild(new unieap.menu.MenuItem({
            label: RIA_I18N.grid.individual.settings,
            iconClass: "individual",
            onClick: dojo.hitch(manager, "showDialog")
        }));
		//重置
        menu.addChild(new unieap.menu.MenuItem({
            label: RIA_I18N.grid.individual.reset,
            iconClass: "individual-reset",
            onClick: dojo.hitch(manager, "resetIndividual")
        }));
		//个性化
        button = new unieap.form.DropDownButton({
            title: RIA_I18N.grid.toolbar.individual,
            dropDown: menu,
			width:'38px',
			iconClass:'default-individual',
            onClick: dojo.hitch(manager, "showDialog")
        }).placeAt(individualNode);
		if (!this._destroyWidgets) {
			this._destroyWidgets = [];
		}
		this._destroyWidgets.push(menu);
		this._destroyWidgets.push(button);
    },
	
	destroy:function(){
		if (this.connects) {
			while (this.connects.length) {
				dojo.disconnect(this.connects.pop());
			}
		}
		this.destroyDescendants();
		this._comboBox&&this._comboBox.destroy();
		this.inherited(arguments);
		this._destroyWidgets && this._destroyWidgets.length>0 
			&& dojo.forEach(this._destroyWidgets, function(w){
			//w&&w.destroyDescendants&&w.destroyDescendants();
			w&&w.destroy&&w.destroy();
		});
	},
	
	getHeight: function() { 
		var height = dojo.style(this.domNode,"height");
		return height;
	}
});