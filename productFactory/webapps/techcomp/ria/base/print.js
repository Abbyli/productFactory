/**
 * 作者：何昌钦
 * 套打直接打印的JS，供需要使用的View模型引入后调用，需要配合复杂表单模式控件生成的套打方法一起使用！
 */
function getLodop(){
	 var oOBJECT = document.getElementById('LODOP'),
		 oEMBED = document.getElementById('LODOP_EM');
	 if(!oOBJECT && !oEMBED){
		  oOBJECT = document.createElement('object'); 
		  oOBJECT.setAttribute('classid',"clsid:2105C259-1E0C-4534-8141-A753534CB4CA"); 
		  oOBJECT.setAttribute('id',"LODOP"); 
		  oOBJECT.setAttribute('width',"0px"); 
		  oOBJECT.setAttribute('height',"0px"); 
		  oOBJECT.setAttribute('style',"width: 0px; height: 0px;"); 
		  
	      oEMBED = document.createElement('embed'); 
		  oEMBED.setAttribute('id','LODOP_EM'); 
		  oEMBED.setAttribute('TYPE','application/x-print-lodop'); 
		  oEMBED.setAttribute('width',"0px"); 
		  oEMBED.setAttribute('height',"0px"); 
		  oEMBED.setAttribute('style',"width: 0px; height: 0px;"); 
		  oEMBED.setAttribute('PLUGINSPAGE',"install_lodop.exe"); 
	 }
	  
	/**************************
	 本函数根据浏览器类型决定采用哪个对象作为控件实例：
	 IE系列、IE内核系列的浏览器采用oOBJECT，
	 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED。
	**************************/
	var strHtml1 = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
	var strHtml2 = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop.exe'>执行升级</a>,升级后请重新进入。</font>";
	var strHtml3 = "<br><br><font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它;<br>2：如果浏览器表现出停滞不动等异常，建议关闭其“plugin-container”(网上搜关闭方法)功能;</font>";
	var LODOP = oEMBED;
	try {
		if (navigator.appVersion.indexOf("MSIE") >= 0)
			LODOP = oOBJECT;
		
		if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
			if (navigator.userAgent.indexOf('Firefox') >= 0)
				document.documentElement.innerHTML = strHtml3
						+ document.documentElement.innerHTML;
			if (navigator.appVersion.indexOf("MSIE") >= 0)
				document.write(strHtml1);
			else
				document.documentElement.innerHTML = strHtml1
						+ document.documentElement.innerHTML;
			return LODOP;
		} else if (LODOP.VERSION < "6.0.5.6") {
			if (navigator.appVersion.indexOf("MSIE") >= 0)
				document.write(strHtml2);
			else
				document.documentElement.innerHTML = strHtml2
						+ document.documentElement.innerHTML;
			return LODOP;
		}
		//*****如下空白位置适合调用统一功能:*********	     
		
		//*******************************************
		return LODOP;
	} catch (err) {
		document.documentElement.innerHTML = "Error:" + strHtml1
				+ document.documentElement.innerHTML;
		return LODOP;
	}
}

function getPrinters(){
	var LODOP = getLodop(),
		printerCount = LODOP.GET_PRINTER_COUNT(),
		printers = [];
	for(var index = 0; index < printerCount; index++){
		printers.push({
			index : index,
			name : LODOP.GET_PRINTER_NAME(index)
		});
	}
	return printers;
}

/**
 * 直接在页面打印，不弹出打印预览
 * @return
 */
function doLodopPrint(metadatas,dynamicImg){
	var LODOP = getLodop(),
		metadatas,
		dynamicImg,
		headerfooters = [],
		currentIndex = 0,
		currentCount = metadatas.length;
	if (currentCount > 0) {
		for ( var index = 0; index < currentCount; index++) {
			var headerfooterInfo = metadatas[index]["headerfooterInfo"];
			if (headerfooterInfo.length > 0) {
				headerfooters = metadatas[index]["headerfooterInfo"];
				break;
			}
		}
	}

	for ( var index = 0; index < currentCount; index++) {
		doPrint(index + 1, index);
	}
	
	function getDynamicUrl(name){
		if (dynamicImg && dynamicImg != null && name && name != null && name.length > 0) {
			var dynamicImgRowset = dynamicImg.getRowSet();
			if (dynamicImgRowset != null && dynamicImgRowset.getRowCount() > 0) {
				var rowCount = dynamicImgRowset.getRowCount();
				for ( var index = 0; index < rowCount; index++) {
					var row = dynamicImgRowset.getRow(index);
					var nameStr = row.getItemValue("name");
					if (nameStr == name) {
						return row.getItemValue("url");
					}
				}
			}
		}
	}
	
	function doPrint(pageNumber,index){
		var pageNumber = pageNumber,
			pageCount = currentCount,
			metadata = metadatas[index],
			pageWidth = metadata["pageWidth"],
			pageHeight = metadata["pageHeight"],
			printerIndex = metadata["printerIndex"],
			dynamicImgs = [],
			printTaskName = metadata["printTaskName"],
			//是否是套打
			chromatographyMode = metadata["chromatographyMode"];
		//如果是套打并且设置了打印项的名字，有可能是通过打印维护进行过手动调整坐标，需要通过打印项名字载入打印坐标配置
		if(chromatographyMode && printTaskName){
			LODOP.PRINT_INIT(printTaskName);
		}else{
			LODOP.PRINT_INIT("");
		}
		if(pageWidth && pageHeight && pageWidth != "" && pageHeight != ""){
			LODOP.SET_PRINT_PAGESIZE(metadata["intOrient"], pageWidth, pageHeight, "");
		}else{
			LODOP.SET_PRINT_PAGESIZE(metadata["intOrient"], 0, 0, metadata["strPageName"]);
		}
		var imgInfo = metadata["imgInfo"];
		if (imgInfo.length > 0) {
			for ( var imgIndex = 0; imgIndex < imgInfo.length; imgIndex++) {
				var imgStr = "<img style='z-index: -10; position: absolute; top: 0px; left: 0px;' border='0'";
				var isDynamic = imgInfo[imgIndex]["isDynamic"];
				var transcolor = imgInfo[imgIndex]["transcolor"];
				var urlVal = imgInfo[imgIndex]["url"], dImgStr;
				if (transcolor.length > 0) {
					imgStr += " transcolor='" + transcolor + "'";
				}
				if (isDynamic == "true") {
					//去dynamicImg中获取打印url
					var dynamicUrl = getDynamicUrl(urlVal);
					if (dynamicUrl && dynamicUrl != null && dynamicUrl.length > 0) {
						dImgStr = imgStr + " src='" + urlVal + "'" + "></img>";
						urlVal = dynamicUrl;
					}
				} else {
					urlVal = unieap.WEB_APP_NAME + urlVal;
				}
				imgStr += " src='" + urlVal + "'" + "></img>";
				//如果不是套打的话，输出水印
				if (!chromatographyMode) {
					LODOP.ADD_PRINT_IMAGE(imgInfo[imgIndex]["top"],
							imgInfo[imgIndex]["left"], imgInfo[imgIndex]["width"],
							imgInfo[imgIndex]["height"], imgStr);
				}
				//否则是套打的话记录动态图片url
				else if (isDynamic == "true") {
					dynamicImgs.push( {
						key : dImgStr,
						value : imgStr
					});
				}
			}
		}
		
		//页面的上边距和左边距
		var top = metadata["top"],
			left = metadata["left"];
		//如果是套打直接执行代码
		if (chromatographyMode) {
			var printHtml =  metadata["printHtml"],
				binding = metadata["binding"];
			if(printHtml){
				printHtml = dojo.trim(printHtml);
				//首先截取打印的水印图片代码
				var printStr = "", printItems = printHtml.split("\n"), printTextTag = "LODOP.ADD_PRINT_TEXT";
				for ( var i = 0; i < printItems.length; i++) {
					var printItem = printItems[i];
					if (printItem.indexOf("LODOP.ADD_PRINT_TEXT(") > -1) {
						//是打印项，并且不是设计模式，需要绑定数据
						if (printItem.indexOf("binding[") > -1) {
							printItem = printItem.replace(/"/gm, "");
						}
						printItem = printItem.substring(printItem.indexOf("(") + 1,
								printItem.indexOf(")")), printInfo = printItem
								.split(",");
						printItem = printTextTag + "("
								+ (new Number(printInfo[0]) + top) + ","
								+ (new Number(printInfo[1]) + left) + ","
								+ printInfo[2] + "," + printInfo[3] + ","
								+ printInfo[4] + ");\n"
					} else if (printItem.indexOf("LODOP.ADD_PRINT_IMAGE(") > -1) {
						//如果是套打水印，替换动态水印的url
						//如果有动态图片，替换
						var isDynamicImg = false;
						if (dynamicImgs.length > 0) {
							for ( var j = 0; j < dynamicImgs.length; j++) {
								var dynamicImg = dynamicImgs[j], key = dynamicImg["key"], value = dynamicImg["value"];
								//如果是动态图片，用正则替换
								if (printItem.indexOf(key) > -1) {
									var dynamicImgRe = new RegExp(key, "");
									printItem = printItem.replace(dynamicImgRe, value);
									isDynamicImg = true;
									break;
								}
							}
						}
						if (!isDynamicImg) {
							//不是动态水印替换unieap.WEB_APP_NAME
							printItem = printItem.replace(/unieap.WEB_APP_NAME/gm,
									unieap.WEB_APP_NAME);
						}
					}
					printStr += printItem + "\n";
				}
				eval(printStr);
			}
		} else {
			LODOP.ADD_PRINT_HTM(top, left, metadata["width"],
					metadata["height"], metadata["printHtml"]);
		}
		//输出页眉页脚
		if (headerfooters && headerfooters.length > 0) {
			for ( var index = 0; index < headerfooters.length; index++) {
				var headerfooter = headerfooters[index];
				var pageIndex = headerfooter["PageIndex"];
				var pageUnIndex = headerfooter["PageUnIndex"];
				var isPrintHeader = false;
				if (pageIndex && pageIndex != "") {
					//奇偶页或者首尾页
					if (isNaN(pageIndex)) {
						if (pageIndex == "first" && pageNumber == 1) {
							isPrintHeader = true;
						} else if (pageIndex == "last" && pageNumber == pageCount) {
							isPrintHeader = true;
						} else if (pageIndex == "odd" && (pageNumber % 2) > 0) {
							isPrintHeader = true;
						} else if (pageIndex == "even" && (pageNumber % 2) == 0) {
							isPrintHeader = true;
						}
					} else if (pageNumber == pageIndex) {
						isPrintHeader = true;
					}
				}
				if (pageUnIndex && pageUnIndex != "") {
					//奇偶页或者首尾页
					if (isNaN(pageUnIndex)) {
						if (pageUnIndex == "first" && pageNumber == 1) {
							isPrintHeader = false;
						} else if (pageUnIndex == "last" && pageNumber == pageCount) {
							isPrintHeader = false;
						} else if (pageUnIndex == "odd" && (pageNumber % 2) > 0) {
							isPrintHeader = false;
						} else if (pageUnIndex == "even" && (pageNumber % 2) == 0) {
							isPrintHeader = false;
						}
					} else if (pageNumber == pageUnIndex) {
						isPrintHeader = false;
					}
				}
				
				//如果没配只在n页显示和不在n页显示，默认在所有页都显示页眉，页脚，页码
				if(!pageUnIndex && !pageIndex){
					isPrintHeader = true;
				}
				
				//如果是页码的话看是否需要打印
				var itemType = headerfooter["ItemType"];
				var itemText = headerfooter["itemText"];
				if (isPrintHeader && itemType == 2) {
					//首先计算页号和页数
					var vPageIndex;
					var vPageCount;
					var numberStartPage = headerfooter["NumberStartPage"];
					var startNumberValue = headerfooter["startNumberValue"];
					if (!startNumberValue) {
						startNumberValue = 1;
					}
					if (numberStartPage && numberStartPage != "") {
						if (pageNumber < numberStartPage) {
							isPrintHeader = false;
						} else {
							vPageIndex = pageNumber - numberStartPage
									+ startNumberValue;
							vPageCount = pageCount - numberStartPage + 1;
						}
					}
					if (isPrintHeader) {
						itemText = itemText.replace(/#/g, vPageIndex);
						itemText = itemText.replace(/&/g, vPageCount);
					}
				}

				//如果打印页眉页脚，才会计算值
				if (isPrintHeader) {
					var top = headerfooter["top"];
					var left = headerfooter["left"];
					var width = headerfooter["width"];
					var height = headerfooter["height"];
					LODOP.ADD_PRINT_TEXT(top, left, width, height, itemText);
					var fontSize = headerfooter["FontSize"];
					var fontColor = headerfooter["FontColor"];
					var fontFamlily = headerfooter["FontName"];
					if (fontSize && fontSize != "") {
						LODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize);
					}
					if (fontColor && fontColor != "") {
						LODOP.SET_PRINT_STYLEA(0, "FontColor", fontColor);
					}
					if (fontFamlily && fontFamlily != "") {
						LODOP.SET_PRINT_STYLEA(0, "FontName", fontFamlily);
					}
				}
			}
		}
		if (printerIndex >= 0){
			LODOP.SET_PRINTER_INDEX(printerIndex);
		}
		LODOP.PRINT();
	}
}
