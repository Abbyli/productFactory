(function($) {
	$.fn.sweetPages = function(opts) {
		if (!opts)
			opts = {};
		var resultsPerPage = opts.perPage || 3;
		var ul = this;
		var li = ul.find('li');

		li.each(function() {
			// Calculating the height of each li element, and storing it with
				// the data method:
				var el = $(this);
				el.data('height', el.outerHeight(true));
			});

		// Calculating the total number of pages:
		var pagesNumber = Math.ceil(li.length / resultsPerPage);

		// If the pages are less than two, do nothing:
		if (pagesNumber < 2) {
			ul.height("100%");
			return this;
		}

		// Creating the controls div:
		var swControls = $('<div class="swControls">');
		
		for ( var i = 0; i < pagesNumber; i++) {
			li.slice(i * resultsPerPage, (i + 1) * resultsPerPage).wrapAll(
					'<div class="swPage" />');
		}
		
		// 添加分页栏
		var currentPage = 1;
		
		swControls
		.append('<a id="lzPrev" style="cursor: pointer;color: blue;">上一页 </a>')
		.append('<span id="lzCurrentPage" data-current=" ' + currentPage + '">' + currentPage + '</span>')
		.append('<span> / ' + pagesNumber + ' 页</span>')
		.append('<a id="lzNext" style="cursor: pointer;color: blue;"> 下一页</a>');
		
		ul.append(swControls);
		var maxHeight = 0;
		var totalWidth = 0;
		var swPage = ul.find('.swPage');
		swPage.each(function() {
			var elem = $(this);
			var tmpHeight = 0;
			elem.find('li').each(function() {
				tmpHeight += 165;
			});

			if (tmpHeight > maxHeight)
				maxHeight = tmpHeight;

			totalWidth += elem.outerWidth();

			elem.css('float', 'left').width(ul.width());
		});

		swPage.wrapAll('<div class="swSlider" />');

		// Setting the height of the ul to the height of the tallest page:
		ul.height(maxHeight);

		var swSlider = ul.find('.swSlider');
		swSlider.append('<div class="clear" />').width(totalWidth);

		var prevPage = ul.find('#lzPrev');
		var nextPage = ul.find('#lzNext');
		// 上一页 click 事件
		prevPage.bind('click', function (event) {
			$currentPage = $("#lzCurrentPage");
			var index = parseInt($currentPage.attr('data-current'));
			if (index > 1) {
				
				if (index == pagesNumber) {
					nextPage.css("color", "blue");
				}
				
				--index;
				
				if (index == 1) {
					prevPage.css("color", "grey");
				}
				
				swSlider.stop().animate( {
					'margin-left' : -(index - 1) * ul.width()
				}, 'slow');
				
				$currentPage.attr('data-current', index);
				$currentPage.text(index);
			}
			
			event.preventDefault();
		});
		
		// 下一页 click 事件
		nextPage.bind('click', function (event) {
			$currentPage = $("#lzCurrentPage");
			var index = parseInt($currentPage.attr('data-current'));
			if (index < pagesNumber) {
				if (index == 1) {
					prevPage.css("color", "blue");
				}
				
				++index;
				
				if (index == pagesNumber) {
					nextPage.css("color", "grey");
				}
				
				swSlider.stop().animate( {
					'margin-left' : -(index - 1) * ul.width()
				}, 'slow');
				
				$currentPage.attr('data-current', index);
				$currentPage.text(index);
			}
			
			event.preventDefault();
		});
		
		swControls.css( {
			'left' : '50%',
			'margin-left' : -swControls.width() / 2
		});

		return this;

	}
})(jQuery);

unieap.define("addWidgetDialog", function() {
			dojo.addOnLoad(function() {
				var dialogData = unieap.getXDialog().getObject().result;
				var treeStorePart = new unieap.ds.DataStore("treeStorePart");
				var treeRowSet = treeStorePart.getRowSet();
				for ( var data in dialogData) {
					treeRowSet.addRow(dialogData[data]);
				}
				var root = unieap.byId("basicTree").getRootNode();
				unieap.byId("basicTree").getBinding().setDataStore(root,
						treeStorePart);

			});

			var alignNum = 3;
			var valignNum = 3;
			var showFlag = false;
			var data;
			var _self = this;
			
			function mainHTML(align, datas) {
				datas = data;
				var resultStr = "";
				var size = getResultLength(datas);
				for ( var i = 0; i < Math.ceil(size / align); i++) {
					resultStr += "<li><table width=\"100%\"><tr>"
					var widthPer = 100 / align+"%";
					for ( var j = i * align; j < (i + 1) * align; j++) {
						resultStr += "<td width=" + widthPer
								+ " align=\"center\">";
						resultStr += createWiget(datas[j]);
						resultStr += "</td>";
					}
					resultStr += "</tr></table></li>";
				}
				return resultStr;
			}
				this.afterNodeClick = function(node) {
					$('#lzPrev').unbind();
					$('#lzNext').unbind();
					$(".swControls").detach();
					
					unieap.widget.requestData( {
						url : unieap.widget.url.GETWIDGETBYCATEGORYID,
						parameters : {
							categoryId : node.getData().id
						},
						headers : {
							ajax : true
						},
						sync : false,
						load : dojo.hitch(this, function(result) {
							data = result;
							var holder = getElementById("holder");
							holder.innerHTML = mainHTML(alignNum);
							$('#' + unieap.getRealId('holder')).sweetPages( {
								perPage : valignNum
							});
							var controls = $('.swControls').detach();
							controls.appendTo('#' + unieap.getRealId('main'));
						})
					}, false)

				}

				function getResultLength(result) {
					var num = 0;
					for ( var rs in result) {
						if (result[rs].id) {
							num++;
						}
					}
					return num;
				}
				

				function createWiget(data) {
					if (data) {
						// 处理描述信息为 undefined 的情况  
						// by l_zhen@neusoft.com
						var description = data.description;
						if(description == undefined) {
							description = "没有描述信息";
						}
						return "<span class=\"icon thumbnail\"><img src=\""
								+ data.icon + "\"/></span><div><p style=\"font-size:1.2em;font-weight: bold;color:#3087b3\">"
								+ data.name + "</p><p><span class=\"icon\"><img src=\"" 
								+ unieap.WEB_APP_NAME + "/techcomp/ria/unieapx/widget/addWidgetDialog/icon/add.png\"></img></span><a onClick=\"javascript:addWidgetDialog.imgDBClick('"
								+ data.id + "');\" style=\"color:#76b327;cursor:pointer;\">添加到桌面<a></p><p>" 
								+ description + "</p></div>";
					} else {
						return "";
					}
				}

				this.imgDBClick = function(id){
					var obj = {};
					obj.id = id;
					var len = data.length;
					for(var i = 0; i < len; i++){
						if(id == data[i].id){
							obj.content = data[i].content;
							break;
						}
					}
					var dialog = unieap.getXDialog();
					if(dialog !=null){
						dialog.setReturn(obj);
						dialog.close();
					}
				}
				this.onContainerResize = function() {
					var paneHeight = dojo.style(this.domNode, "height");
					var paneWidth = dojo.style(this.domNode, "width");
					var newAlign = Math.floor(paneWidth / 160) - 1;
					var newValign = Math.floor((paneHeight - 100) / 123);
					if (newAlign < 1) {
						newAlign = 1;
					}
					if (newValign < 1) {
						newValign = 1;
					}
					if (!showFlag) {
						alignNum = newAlign;
						valignNum = newValign;
						showFlag = true;
						var holder = getElementById("holder");
						dojo.style(holder, "width", (paneWidth - 4) + "px");
						holder.innerHTML = mainHTML(alignNum);
						$('#' + unieap.getRealId('holder')).sweetPages( {
							perPage : valignNum
						});
						var controls = $('.swControls').detach();
						controls.appendTo('#' + unieap.getRealId('main'));
					} else if (newValign != valignNum || newAlign != alignNum) {
						var holder = getElementById("holder");
						var main = getElementById("main");
						dojo.empty(holder);
						dojo.destroy(dojo.query('.swControls',
								getElementById("main"))[0]);
						alignNum = newAlign;
						valignNum = newValign;
						dojo.style(holder, "width", (paneWidth - 4) + "px");
						getElementById("holder").innerHTML = mainHTML(alignNum);
						$('#' + unieap.getRealId('holder')).sweetPages( {
							perPage : valignNum
						});
						var controls = $('.swControls').detach();
						controls.appendTo('#' + unieap.getRealId('main'));
					}
				}
			});
