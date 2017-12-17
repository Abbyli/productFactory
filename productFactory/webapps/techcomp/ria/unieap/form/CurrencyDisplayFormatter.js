dojo.provide("unieap.form.CurrencyDisplayFormatter");
dojo.require("unieap.form.NumberDisplayFormatter");

dojo.declare("unieap.form.CurrencyDisplayFormatter", unieap.form.NumberDisplayFormatter, {
	
	/**
	 * @summary:
	 * 		格式化字符串
	 * @type:
	 * 		{string}
	 * @description:
	 * 		数字格式化字符串，默认是#,000.00，数值逗号分隔，可以设置成CHN，表示大写中文显示
	 * @example:
	 * |<div dojoType="unieap.form.CurrencyTextBox" value="1234567.8910" displayFormatter="{dataFormat:'CHN'}"></div>
	 * @img:
     * 		images/form/numberformat.png
	 */
	dataFormat:"#,000.00",
	
	constructor: function(params){
		dojo.mixin(this, params);
	},
		
    format: function(value){
    	var dataType = "";
    	if(this.dataType){
    		dojo.require("unieap.util.util");
			dataType = unieap.getDataType(this.dataType);
    	}
    	else{
    		//如果不在form中使用，不存在getbinding方法
    		if(this.widget.getBinding){
	    		var binding = this.widget.getBinding();
		    	if(binding){
		    		dataType = binding.getDataType();
		    	}
    		}
    	}
    	var widget = this.widget;
    	//isNaN("")返回的是false,isNaN("333")返回的也是false,isNaN('char')为true
    	if(!isNaN(value)&&value!==""){
    		if(this.dataFormat == "CHN"){
    			if(widget.declaredClass=="unieap.form.CurrencyTextBox"){
		    		widget._currencyOrginValue = value;
		    		value = Math.round(value * Math.pow(10, 2))/Math.pow(10, 2);//四舍五入处理
		    		value = value.toString();
		    		value = this._manageMmaximum(widget,value);
		    		widget._beforeToChinaNum = value;
		    		value = widget._chinaNum = this._numberToChinaType(value);
		    	}else{//grid可编辑状态需要format时就不需要保留初始值了
		    		value = Math.round(value * Math.pow(10, 2))/Math.pow(10, 2);//四舍五入处理
					value = value.toString();
					value = this._manageMmaximum(widget,value);
		    		value = widget._chinaNum = this._numberToChinaType(value);
		    	}
    		}else{
    			if(widget.declaredClass=="unieap.form.CurrencyTextBox"){
    				widget._currencyOrginValue = value;
    			}
	    		value = this.dataFormat ? dojo.number.format(value, {
					pattern: this.dataFormat
				}) : value;
	    	}
    	}else{
    		widget._currencyOrginValue = "";
    	}
    	
		return value;		
    },
    
    _manageMmaximum:function(widget,value){
    	var eindex = value.indexOf("e+");
    	if(eindex>-1){//处理最大长度,过长的话就0，数值计算只能是16位数字，模仿dojo.number
			value = Math.round(value.substring(0,eindex) * Math.pow(10, 2))/Math.pow(10, 2);
			widget._currencyOrginValue = value;
		}
		return value;
    },
    
    
    _numberToChinaType:function(number,isBigPart){
    	var numberValue;
    	if(number<1){
    		numberValue = new String(number * Math.pow(10, 2));
    	}else{
    		numberValue=new String(number);
    		var decimalNum = numberValue.indexOf('.');
    		if(decimalNum==-1 && (typeof(isBigPart)=="undefined" || isBigPart==true)){
    			numberValue = numberValue + "00";
    		}else if(decimalNum>-1 && decimalNum == numberValue.length-2){
    			numberValue = numberValue.replace('.','')+"0";
    		}else if(decimalNum>-1 && decimalNum == numberValue.length-3){
    			numberValue = numberValue.replace('.','');
    		}
    	}
		var chineseValue=""; // 转换后的汉字金额
		var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
		var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
		var len=numberValue.length; // numberValue 的字符串长度
		var Ch1; // 数字的汉语读法
		var Ch2; // 数字位的汉字读法
		var nZero=0; // 用来计算连续的零值的个数
		var String3; // 指定位置的数值
		if(len>14){
			chineseValue = this._numberToChinaType(numberValue.substring(0,len-14),true)+this._numberToChinaType(numberValue.substring(len-14,len),false);
			return chineseValue;
		}
		if (numberValue==0){
			chineseValue = "零元整";
			return chineseValue;
		}
		String2 = String2.substr(String2.length-len, len); // 取出对应位数的STRING2的值
		for(var i=0; i<len; i++){
			String3 = parseInt(numberValue.substr(i, 1),10); // 取出需转换的某一位的值
			if ( i != (len - 3) && i != (len - 7) && i != (len - 11) && i !=(len - 15) ){
				if ( String3 == 0 ){
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				}
				else if ( String3 != 0 && nZero != 0 ){
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
				else{
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
			}
			else{ // 该位是万亿，亿，万，元位等关键位
				if( String3 != 0 && nZero != 0 ){
					Ch1 = "零" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
				else if ( String3 != 0 && nZero == 0 ){
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
				else if( String3 == 0 && nZero >= 3 ){
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				}
				else{
					Ch1 = "";
					Ch2 = String2.substr(i, 1);
					nZero = nZero + 1;
				}
				if( i == (len - 11) || i == (len - 3)){ // 如果该位是亿位或元位，则必须写上
					if(isBigPart){
						Ch2 = "万";
					}else{
						Ch2 = String2.substr(i, 1);
					}
				}
			}
			chineseValue = chineseValue + Ch1 + Ch2;
		}
		if ( String3 == 0 && !isBigPart ){ // 最后一位（分）为0时，加上“整”
			chineseValue = chineseValue + "整";
		}
		return chineseValue;
	}
});