dojo.provide("unieap.form.ComboBoxLocationPopupList");
unieap.form.ComboBoxLocationPopup.list = {
	
	_initRowNum:1,
	_optionSize:5,//每行5个
	_initFlag:true,
	_initItems:null,//记录第一次加载的时候的全部的items
	_items:null,//每点击一次头部A-E就算一次得到的items，以便翻页使用
	_pageNum:1,//通过高度算出的总页数
	_onStatePageNum:1,//当前的页数
	
	//构造下拉框
	_createPopup: function(items, structure,unIconClick) {
		this._items = items;
		var _this = this;
		this._onStatePageNum = 1;
		dojo.connect(dojo.query(".u-comboboxloaction-list-close", this.listTipNode)[0],"onclick",function(evt){
			_this.close();
		});
		this._createHeader(structure ,unIconClick);
		this._createOptions(items, structure,unIconClick);
		this._createFooter();		
	},
	
	//下拉框头部
	_createHeader: function(structure, unIconClick) {
		var _this = this;
		dojo.empty(this.listHeaderNode);
		this.tipSpanNode.innerHTML = "支持拼音首字符输入";
		this.tipCloseNode.title ="全部";
		
		var ul = dojo.create("ul");
		var li = dojo.create("li", {innerHTML: "全部"}, ul);
		li.charNum = "a-z";
		dojo.addClass(li, "u-comboboxloaction-list-header-click");
		dojo.create("li", {innerHTML: "A-E"}, ul).charNum = "a-e";
		dojo.create("li", {innerHTML: "F-J"}, ul).charNum = "f-j";
		dojo.create("li", {innerHTML: "K-O"}, ul).charNum = "k-o";
		dojo.create("li", {innerHTML: "P-T"}, ul).charNum = "p-t";
		dojo.create("li", {innerHTML: "U-Z"}, ul).charNum = "u-z";
		dojo.query("li", ul).forEach(dojo.hitch(this, function(li){
			dojo.connect(li,'onclick',function(evt){
				dojo.removeClass(dojo.query(".u-comboboxloaction-list-header-click", ul)[0],"u-comboboxloaction-list-header-click");
				_this._headerOnClick(evt);
			});
		}));
		dojo.style(this.listHeaderNode, "display", "");
		this.listHeaderNode.appendChild(ul);
		var text = this.widget.getText();
		if (text && dojo.trim(text)!=="" && !unIconClick && this._selection.length == 0) {
			dojo.style(this.listHeaderNode, "display", "none");
			dojo.style(this.listTipNode, "display", "none");
			this.width = (dojo.style(this.widget.fieldNode,"width")-1)+"px";
		}else{
			dojo.style(this.listHeaderNode, "display", "");
			dojo.style(this.listTipNode, "display", "");
			this.width = "342px";
		}
		this.listHeaderNode.appendChild(ul);
	},
	
	//下拉框中部
	_createOptions: function(results, structure, unIconClick) {
		if(typeof(this._optionSize) == "undefined" || this._optionSize == null){
			this._optionSize = 5;
		}
		//根据高度计算可以容纳的行数
		var popupRealHeight = this.height;
		var textFlag = this.widget.getText();
		if(this._initFlag){
			this._initItems = results;
			var popupAutoHeight = 102;//auto情况下的高度是169px 头部和底部加起来是92px 中间是5*25px+2*5=135px
			if(popupRealHeight != "auto"){
				var orginRowNum = 1;//根据高度算出的行数，每行五个
				popupRealHeight = popupRealHeight.replace("px","");
				if(popupRealHeight - popupAutoHeight<=27){
					this.height = "127px";//只显示一行
				}else{
					orginRowNum = Math.round((popupRealHeight - popupAutoHeight)/27);
					this._initRowNum = Math.round(results.length/5)>rowNum?rowNum:Math.round(results.length/5);
					this.height = popupAutoHeight + this._initRowNum * 27 + "px" ;
				}
			}else{
				this._initRowNum = 5;
				this.height = popupAutoHeight + this._initRowNum * 27 + "px" ;
			}
		}
		var rowNum = this._initRowNum;
		if (textFlag && dojo.trim(textFlag)!=="" && !unIconClick && this._selection.length == 0) {	
				this._optionSize = 1;
				rowNum = rowNum + 2;
				
		}else{
				this._optionSize = 5;
		}
		this._pageNum = Math.ceil(results.length/(this._optionSize*rowNum));
		this._items = results;
		this._doCreateOptions(results,rowNum);
	},
	
	_doCreateOptions:function(results,rowNum){
		var _this = this;
		dojo.empty(this.listContainerNode);
		var ul = dojo.create("ul");
		var optimize = unieap.widget.form.comboBoxPopupOptimize;
		rowNum = !rowNum?this._initRowNum:rowNum;
		this._initFlag = false;
		for (var i=0,l=optimize?Math.min(results.length,this._optionSize*rowNum):results.length; i<l; i++) {
			var item = results[i];
			var value = item[this.widget.getDecoder().displayAttr]||"";
			if(this.widget.comboShowSelectValue == value){
				value = "";
			}
			var li = dojo.create("li", null, ul);
			li.innerHTML = value;
			dojo.connect(li,"onclick",function(evt){
				_this._onClick(evt);
			});
			li.item = item;
			if (this._optionSize == 1) {			
				dojo.addClass(li,"querylist");
			}else{
				dojo.removeClass(li,"querylist");
			}
			ul.appendChild(li);
		}
		this.listContainerNode.appendChild(ul);
	},
	
	//下拉框底部
	_createFooter:function(){
		var _this = this;
		dojo.empty(this.listFooterNode);
		var previous = dojo.create("a",{innerHTML:"«&nbsp;向前"},this.listFooterNode);
		previous.stateFlag = "previous";
		dojo.addClass(previous,"u-comboboxloaction-list-footer-Previous");
		dojo.connect(previous,'onmousedown',function(evt){
			_this._changeToPage(evt);
		});
		dojo.connect(previous,'onmouseover',function(evt){
			_this.widget.stopUpdateText = true;
		});dojo.connect(previous,'onmouseout',function(evt){
			_this.widget.stopUpdateText = false;
		});
		var next = dojo.create("a",{innerHTML:"向后&nbsp;»"},this.listFooterNode);
		next.stateFlag = "next";
		dojo.addClass(next,"u-comboboxloaction-list-footer-next");
		dojo.connect(next,'onmousedown',function(evt){
			_this._changeToPage(evt);
		});
		dojo.connect(next,'onmouseover',function(evt){
			_this.widget.stopUpdateText = true;
		});dojo.connect(next,'onmouseout',function(evt){
			_this.widget.stopUpdateText = false;
		});
		this._highlightFooterNode();
	},
	
	_highlightFooterNode:function(){
		if(this._onStatePageNum<this._pageNum){
			this._nextPageState = true;
		}else{
			this._nextPageState = false;
		}
		if(this._onStatePageNum>1){
			this._previousPageState = true;
		}else{
			this._previousPageState = false;
		}
		this._highlightPrevious(this.listFooterNode.firstChild);
		this._highlightNext(this.listFooterNode.lastChild);
	},
	
	//处理前一页高亮样式
	_highlightPrevious:function(previous){
		var previousPageState = this._previousPageState;
		if(previousPageState){
			dojo.addClass(previous,"u-comboboxloaction-list-footer-able");
		}else{
			dojo.removeClass(previous,"u-comboboxloaction-list-footer-able");
		}
	},
	
	//处理下一页高亮样式
	_highlightNext:function(next){
		var nextPageState = this._nextPageState;
		if(nextPageState){
			dojo.addClass(next,"u-comboboxloaction-list-footer-able");
		}else{
			dojo.removeClass(next,"u-comboboxloaction-list-footer-able");
		}
	},
	
	//翻页
	_changeToPage:function(evt){
		var t = evt.target || evt.srcElement;
		if(t.className.indexOf("u-comboboxloaction-list-footer-able")==-1){
			return;
		}
		while (!t.stateFlag) {
			t = t.parentNode;
			if (t === this.listFooterNode) {
				break;
			}
		}
		if(t.stateFlag == "previous"){
			this._onStatePageNum--;
			
		}else if(t.stateFlag == "next"){
			this._onStatePageNum++;
		}
		this._highlightFooterNode();
		var rowNum = this._initRowNum;
		if (this._optionSize == 1 && this._selection.length == 0) {	
			rowNum = rowNum + 2;
		}
		this._pageNum = Math.ceil(this._items.length/(this._optionSize*rowNum));
		var newItems = {};
		var initNum = this._optionSize*rowNum*(this._onStatePageNum-1);
		var newItemsLength = 0;
		var currentNum = this._optionSize*rowNum*this._onStatePageNum; 
		var lenghNum = this._items.length>currentNum?currentNum:this._items.length;
		for(var i= initNum;i<lenghNum;i++){
			newItems[i-initNum]=this._items[i];
			newItemsLength++;
		}
		newItems.length = newItemsLength;
		this._doCreateOptions(newItems,rowNum);
		this.widget.stopOnBlur = true;
	},
	
	_onSelect: function(evt, target) {
		this._selection = [target.item];
		unieap.fireEvent4Widget(this,this.widget,this.onSelect,[target.item]);
		this.close(this._callback);
	},
	
	//暂不支持键盘控制	
	_handleKeyDown: function(evt) {
		if (!this.isOpen())
			return;
		var kcode = evt.keyCode;
		if (kcode==dojo.keys.PAGE_DOWN || kcode==dojo.keys.DOWN_ARROW) {
			if (!this._highlighted) {
				this._focusOptionNode(this.listContainerNode.childNodes.item(0).childNodes.item(0));
			} else if (this._highlighted.nextSibling) {
				this._focusOptionNode(this._highlighted.nextSibling);
			}
			this._selection = [this._highlighted.item];
			this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
		} else if (kcode==dojo.keys.PAGE_UP || kcode==dojo.keys.UP_ARROW) {
			if (!this._highlighted) {
				this._focusOptionNode(this.listContainerNode.childNodes.item(0).childNodes.item(0));
			} else if (this._highlighted.previousSibling) {
				this._focusOptionNode(this._highlighted.previousSibling);
			}
			this._selection = [this._highlighted.item];
			this.widget.setText(this.widget.getDecoder().decode(this._selection[0]));
		} else if (kcode==dojo.keys.ENTER && this._highlighted) {
			this._onSelect(evt, this._highlighted);
		} else if (kcode==dojo.keys.ENTER && !this._highlighted 
					&& unieap.widget.form.comboSelectFirstValue) {
			this.widget._setFirstValueWhenTypeEnter();
		}
	}
}
