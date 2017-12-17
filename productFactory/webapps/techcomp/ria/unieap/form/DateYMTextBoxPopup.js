dojo.provide("unieap.form.DateYMTextBoxPopup");
dojo.require("unieap.form.Popup");
dojo.require("unieap.form.calendarYM");

dojo.declare("unieap.form.DateYMTextBoxPopup", unieap.form.Popup, {
    /**
	 * @summary:
	 * 		弹出popup下拉内容
	 */
	calendarbox:null,
	giYear:null,
	giMonth:null,
    gdCurDate:null ,

	
    open: function(){
		this.domNode.style.background='transparent';
        if (this._isShowingNow) {
            this.close();
            return;
        }
        else {
    		if(!this.widget._canPopOpen()){
    			return;
    		}
    		
			dojo.style(this.popupcontainer,"borderWidth","0px");
			if(!this.calendarbox){
				var el = this.widget.inputNode;
				this.calendarbox = new unieap.form.calendarYM({DateYMTextBox:this});
				this.calendarbox.widget = this.widget;
				this.calendarbox.select = this._selected;
				this.calendarbox.sel = el;					
				this.popupcontainer.appendChild(this.calendarbox.domNode);								 			
			}
			
			var date;				
			if (this.widget.inputNode.value) {
				date = this.widget.getDisplayFormatter().parse(this.widget.inputNode.value);			
	
			}
			else{
				date = (new Date()).getTime();
			}								                
            this.calendarbox.fSetYearMon(new Date(date));            
            this.inherited(arguments);
            if(!this.animate){                  
				dojo.style(this.domNode,'overflow','');				
			}   
            
        }
    },   
    _selected: function(cal, date){    	
        cal.sel.value = date;    	
    },
	
	destroy : function(){
	} 
});


