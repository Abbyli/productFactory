dojo.provide("unieap.form.CurrencyTextBox")
dojo.require("unieap.form.NumberTextBox");
dojo.declare("unieap.form.CurrencyTextBox",unieap.form.NumberTextBox,{
	/**
	 * @declaredClass:
	 * 		unieap.form.CurrencyTextBox
	 * @superClass:
	 * 		unieap.form.NumberTextBox
	 * @summary:
	 * 		金额输入框,只能输入数字和小数点。
	 * @description:
	 * 		在默认情况下,金额输入框会对输入的字符进行及时校验,您可以设置validator="{realTime:false}"来关闭。
	 * 		关闭后,只有在金额输入框失去焦点时才进行校验
	 * 
	 */
	
	
	UserInterfaces : dojo.mixin({
	},
	unieap.form.NumberTextBox.prototype.UserInterfaces),
	
	displayFormatterClass:'unieap.form.CurrencyDisplayFormatter',
	
	validatorClass:'unieap.form.NumberTextBoxValidator',
	
	inputFilter : {filterRule:/[\.\d]/},
	
	_currencyOrginValue:"",//记录金额四舍五入之前得值
	_beforeToChinaNum:"",//记录中文大写之前得数值，这样避免了中文-->数字的转变过程
	_chinaNum:"",//记录中文大写用于输出
	
	postMixInProperties:function(){
		this.inherited(arguments);
		this.scale = "2";//sacle必须是2，不可以修改
		!this.displayFormatter&&(this.displayFormatter={		
			dataFormat:"#,000.00"
		});
	},
	
	postCreate:function(){
		this.inherited(arguments);
	},
	
	//获得中文大写的方法
	getChinaNum:function(){
		if(this._isCHNFormatter()){
			return this._chinaNum;
		}else{
			return this.displayFormatter._numberToChinaType(Math.round(this._currencyOrginValue * Math.pow(10, 2))/Math.pow(10, 2));
		}
	},
	
	//getValue()方法
	getValue : function(){
		//金额控件getValue()获得的是四舍五入之前得值
		var currencyOrginValue = this._currencyOrginValue;
		var value;
		var formatFlag = false;
		var realValue = this._currencyOrginValue == ""?this.getText():this._currencyOrginValue;
		if(this._isCHNFormatter()){
			if(currencyOrginValue !== '' && realValue == this.getDisplayFormatter().format(currencyOrginValue)){
				formatFlag = true;
				value = currencyOrginValue ;
			}else{
				value = realValue;
			}
		}else{
			value = realValue;
		}
		value = this.getDisplayFormatter().parse(value);
		value = this.getValueFormatter().parse(value);
		if(value!=''&& value!=null && !formatFlag){
			value = Number(value);
			if(isNaN(value)){
				this.setValue('');
				this.focus();
				return '';
			}
			return value;
		}
		else
			return value;
	},
	
	_isCHNFormatter:function(){
		if(this.displayFormatter.dataFormat == "CHN"){
			return true;
		}
		return false;
	},
	
	//执行inputNode的onchange事件
	_onKeyUp:function(evt){
		var isValid = this._lengthCheck();
		if(!isValid){
			 this.focusNode.value=this._subString(this.focusNode.value,this.maxLength);
		}
		this._currencyOrginValue = this.focusNode.value;
		//如果realTime为true则进行及时校验
		var validator=this.getValidator();
		//延时校验
		validator.realTime&&this._job(validator,"validate");
		unieap.fireEvent(this,this.onKeyUp,[evt]);
	},
	
	_cancelHeadZero:function(value){
		if(value=="" || value==null){
			return "";
		}
		if(Number(value) == 0){
			return "0.00";
		}
		if(value.startWith("0") && value.indexOf(".")!=1){
			value = value.substring(1,value.length);
			return this._cancelHeadZero(value);
		}else{
			return value;
		}
	},
	
	_onBlur:function(evt){
		if (!evt||typeof(evt)=="string")  return ;
		var value = this._currencyOrginValue == ""?this.getText():this._currencyOrginValue,
		nowValue=value;
		value = this.getEditFormatter().parse(value);
		value = this.getDisplayFormatter().format(value);
		if(!this._isCHNFormatter()){
			value = this._cancelHeadZero(value);
		}
		this.inputNode.value = value;
		//失去焦点时进行校验
//		//如果只读，不校验
		!this.readOnly && this.getValidator().validate();
//		this.fireDataChange();
//		this._showPromptMsg(false);
		unieap.fireEvent(this,this.onBlur,[evt]);
	},
	
	//仿照textbox的onfocus事件
	_onFocus:function(evt){
		if (!evt||typeof(evt)=="string")  return ;
		var validator=this.getValidator();

		if (!unieap.widget.form.alwaysShowErrMssage) { 
		  validator.handleError&&validator.handleError(true);
		}
		var value = this._currencyOrginValue == ""?this.getText():this._currencyOrginValue;
		if( value != ""){
			if(!this._isCHNFormatter()){
				value = this.getDisplayFormatter().parse(value);
				value = this.getEditFormatter().format(value);
				if(this.inputNode.value!=value){
					this.inputNode.value = value;
				}
				this._showPromptMsg(true);
			}else{
				this.inputNode.value=this._currencyOrginValue;
			}
			//显示promptMsg信息
			this.select();
		}
		
		unieap.fireEvent(this,this.onFocus,[evt]);
	}

});