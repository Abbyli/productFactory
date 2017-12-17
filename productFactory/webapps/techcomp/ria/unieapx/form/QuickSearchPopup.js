dojo.provide("unieapx.form.QuickSearchPopup");
dojo.require("unieap.form.ComboBoxPopup");
dojo.declare("unieapx.form.QuickSearchPopup", unieap.form.ComboBoxPopup, {

	onSelect : function(item, widget) {
		var ds = new unieap.ds.DataStore( {
			pageSize : 10,
			pageNumber : 1,
			recordCount : 1, 
			name : "qs_result",
			rowSetName : this.widget.getDataProvider().store.rowSetName,
			rowSet : [ item ]
		});
		var me = this.widget;
//		me.setValue(item[me.getBinding().name]);
		me.setValue(item[me.getDecoder().valueAttr]);
		me._selectStore = ds;
		me.onComplete(ds);
		me._toogleIcon();
		me._selectedText = this._getSelectedText();
//		me._isClearing=true;
		me._hasValue = true;
//		if (!me.bindable) {
//			me.clear();
//		}
//		setTimeout(function(){
////			dijit.byId((this._rootID||"")+this.nextFocusId)||dijit.byId(this.nextFocusId)?this.processNextFocusId():dojo.byId("unieap_for_focus").focus();
//			me._isClearing = false;
//		},200);
		if(!me.textValidate)
			me.getDataProvider().setDataStore(null);
	},
	
	_onClick: function(evt) {
		var me = this.widget;
		me._isClick = true;
		setTimeout(function(){
			me._isClick = false;
		},200);
		this.inherited(arguments);
	},
	
	_getSelectedText: function(){
		var selectedText = '',me = this.widget;
		selectedText =  this._selection?me.getDecoder().decode(this._selection[0]):me.getText();
		if(selectedText == '' ||selectedText ==null )selectedText=me.getText();
		return selectedText;
	},
	
	_clearSelection: function(){
		if(this._selection) {
			this._selection[0] = null;
			this._selection = null;
			this.widget._selectedText = '';
			this.widget._isSetText=false;
		}
	},
	
	_isSelecting: function(){
		if (this._selection && this._selection[0]){
			return true;
		}else{
			return false;
		}
	},
	
	open: function(items, selection, callback) {
		if(!this.widget._isClick){
			this._clearSelection();
		}
		if(this.isOpen() || (('undefined' == typeof this.widget.getDataProvider().store) || !this.widget.getDataProvider().store)) return;
		this.widget._oldValue = this.widget.getText();
		this.inherited(arguments);
	},
	
	/**
	 * @summary:
	 * 		关闭下拉框
	 */
	close: function(callback) {
		if (this.isOpen()) {
			var me = this.widget;
			if(this.animation&&this.animation.status() == "playing"){
				this.animation.stop();
			}
			if (this._isShowingNow) {
				this._isShowingNow = false;
				dojo.style(this.popupcontainer, "display", "none");
				var iframe = this._iframe;
				if (iframe) {
					iframe.style.width = "0px";
					iframe.style.height = "0px";
				}
			}
			if (me.bindable) {
				if(this._isSelecting()){
					if(me._selectedText == '') me._selectedText = this._getSelectedText();
					me.setText(me._selectedText);
				}else{
					if(me.onlySelect){
						if(!me._isDelayQuery){
							me.setValue('');
							this.widget._oldValue = '';
						}
					}else{
						me.setValue(this.widget._oldValue);
					}
				}
			}else{
				if(!me._isDelayQuery){
					me.setValue("");
				}
				me._tooglePrompt();
			}
			if(!me.textValidate)
				me.getDataProvider().setDataStore(null);
		}
	}

});