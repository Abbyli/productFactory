dojo.provide("unieap.tree.TreeEditor");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.form.TextBox");
dojo.declare("unieap.tree.TreeEditor",null,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.TreeEditor
	 * @summary:
	 * 		树编辑的实现类
	 * @classDescription:
	 *		虚拟根节点不能进行编辑
	 *     	提供了对树的文本区域进行编辑的实现
	 *     	支持编辑前后的监听
	 *     	支持设置是否允许显示字段为空
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false}" 
	 * |	binding = "{'leaf':'leaf','store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div>
	 */
	 
	/**
	 * @summary：
	 * 	     编辑的显示字段是否允许为空
	 * @type
	 * 		{boolean} 
	 * @default:
	 *      false
	 *  @description:
	 *      是否可以将编辑字段设为空字符串。
	 *      若设为false的话，在将编辑字段设置为空字符串的话，将会默认恢复为编辑前的值。
	 */
	allowBlank : false,
	
	/**
	 * @summary：
	 * 	     编辑的内容没能通过校验时的提示信息
	 * @type
	 * 		{string} 
	 * @default:
	 *      输入的内容没能通过校验！
	 *  @description:
	 *      当输入的内容没有通过用户自定义的校验函数时，通过tooltip的方式进行提醒。
	 */
	errorMsg : '输入的内容没能通过校验！',
	
	//用于编辑节点的文本框
	_textbox : null,
	 
	 //构造函数，将会生成一个文本框
	 constructor: function(params){
        dojo.mixin(this, params);
		this._textbox = new unieap.form.TextBox({'height':'18px'});
    },
    
    /**
	 * @summary:
	 *       节点在编辑后触发的校验函数
	 * @param  text
	 *       {string}
	 * @param  node
	 *       {unieap.tree.TreeNode}
	 * @description:
	 *       入参是用户输入的文本和当前的node对象
	 * 		 当返回true时说明输入的内容通过用户定义的校验
	 * 		 当返回false时则提示用户输入的内容没能通过校验，并阻止其继续编辑其他节点
	 * @example:
	 * |function doValidate(text,node){ 
	 * |	if(text.length > 9){
	 * |		return false;
	 * |    }else{
	 * |		return true;
	 * |	} 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false,getValidate:doValidate}" 
	 * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div>
	 */
	getValidate : function(text,node){
		return true;
	},
	
	/**
	 * @summary:
	 *       获得节点的校验提示信息
	 * @description:
	 *       获得节点在自定义的校验函数未能通过时的提示信息
	 */
	getErrorMsg : function(){
		return this.errorMsg;
	},
	
	/**
	 * @summary:
	 *       设置节点的校验提示信息
	 * @param  errorMessage
	 *       {string}
	 * @description:
	 *       设置节点在自定义的校验函数未能通过时的提示信息,入参是新的提示信息
	 */
	setErrorMsg : function(errorMessage){
		this.errorMsg = errorMessage;
	},
    
	editNode : function(node){
		if(!this.widget._validatePassed){
			return;
		}
		
		//根结点不能进行编辑
		if(node&&node.isRoot()){
			this.widget._editing = false;
			return;
		}
		//调用编辑前的事件
		if(false == unieap.fireEvent4Widget(this,this.widget,this.onBeforeEdit,[node])){
			this.widget._editing = false;
			return;
		}
		//记录初始值，并将文本框置于原树节点所在的位置
		var initValue = this.widget.getBinding().getLabel(node.getItem());
		this.widget.getLabelNode(node.domNode).innerHTML = "";
		this.widget.getLabelNode(node.domNode).appendChild(this._textbox.domNode);
		this._textbox.setValue(initValue);
		var _this = this;
		//定义文本框的焦点离开事件
		this._textbox.onBlur = function(evt){	  
			  var label = _this._textbox.getValue();
			  //是否通过了校验
			  if( _this.getValidate(label,node) ){
			  	  _this.widget._validatePassed = true;
			  	  var validator = _this._textbox.getValidator();
		  		  validator.handleError(true);
		  		  
		  		  //原有：处理非空text及回退代码
				  if(!label&&!_this.allowBlank){
				  	 label = initValue;
				  }
				  _this.widget.getLabelNode(node.domNode).removeChild(_this._textbox.domNode);
				  if (label != initValue) {
				  	_this.widget.getBinding().setLabel(node, label);
				  }
				  _this.widget.setLabelNode(node.domNode,label)
				  _this.widget._editing = false;
				  unieap.fireEvent4Widget(_this,_this.widget,_this.onAfterEdit,[node]);
			  }else{
		  		  _this.widget._validatePassed = false;
		  		  var validator = _this._textbox.getValidator();
		  		  validator.setErrorMsg(_this.errorMsg);
		  		  validator.handleError(false);
			  }
		   }
		this._textbox.focus();
	},
	
    /**
	 * @summary:
	 *       节点在编辑前触发的事件
	 * @param  node
	 *       {unieap.tree.TreeNode}
	 *  @description:
	 *       若返回false则不会进行编辑
	 *  @example:
	 * |function beforeEdit(node){ 
	 * |	return confirm("确定要进行编辑吗？"); 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false,onBeforeEdit:beforeEdit}" 
	 * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div>
	 */
	onBeforeEdit : function(node){
		return true;
	},
	
	/**
	 * @summary:
	 *       节点在编辑完成后触发的事件
	 * @param  node
	 *        {unieap.tree.TreeNode}
	 * @example:
	 * |function afterEdit(node){ 
	 * |	alert("节点"+node.getLabel()+"已经编辑完毕！"); 
	 * |}
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	 * |	treeEditor="{allowBlank:false,onAfterEdit:afterEdit}" 
	 * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	 * |</div> 
	 */
	onAfterEdit : function(node){
		
	},
	
	 destroy : function(){
	 	this._textbox.destroy();
	 }
	
})
