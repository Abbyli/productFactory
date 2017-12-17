dojo.provide("unieap.form.calendarYM");
dojo.require("unieap.form.FormWidget");
dojo.declare("unieap.form.calendarYM",unieap.form.FormWidget,
				{
		// 用户属性配置接口
		month:null,
		year:null,
		DateYMTextBox:null,
		widget:null,
		giYear:null,
		giMonth:null,
		gdCtrl: null,
		dates: new Date(),	
		select:null,
		currentMonthNode:null,
		currentYearNode:null,
		dateFormat : "%Y-%m-%d",
		UserInterfaces : dojo.mixin( {},
		unieap.form.FormWidget.prototype.UserInterfaces),

		templateString : "<div class=\"DateTextBox_div\">"
				+ "<table   class=\"DateTextBox_table\" >"
				+ "<tr>"
				+ "<td class=\"DateTextBox_tds\">"
				+ "<table dojoAttachPoint=\"tableMonth\" id=\"monthT\" class=\"monthT\">"
				+ "<tr>"
				+ "<td  dojoAttachPoint=\"td1\" dojoAttachEvent=\"onclick:ChangeMonth\"  class ='DateTextBox_td'>1月</td>"
				+ "<td  dojoAttachPoint=\"td2\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>2月</td>"
				+ "</tr>"
				+ "<td  dojoAttachPoint=\"td3\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>3月</td>"
				+ "<td  dojoAttachPoint=\"td4\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>4月</td>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"td5\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>5月</td>"
				+ "<td dojoAttachPoint=\"td6\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>6月</td>"
				+ "</tr>"
				+ "<td dojoAttachPoint=\"td7\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>7月</td>"
				+ "<td dojoAttachPoint=\"td8\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>8月</td>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"td9\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>9月</td>"
				+ "<td dojoAttachPoint=\"td10\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>10月</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"td11\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>11月</td>"
				+ "<td dojoAttachPoint=\"td12\" dojoAttachEvent=\"onclick:ChangeMonth\" class ='DateTextBox_td'>12月</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "<td class=\"DateTextBox_tds\">"
				+ "<table dojoAttachPoint=\"tableYear\" id=\"yearT\" class=\"yearT\">"
				+ "<tr class=\"DateTextBox_tr\">"
				+ "<td  class=\"preTenYear\" dojoAttachPoint='preTenYear' dojoAttachEvent=\"onclick:DelYear\"></td>"
				+ "<td  class=\"nextTenYear\" dojoAttachPoint='nextTenYear' dojoAttachEvent=\"onclick:AddYear\"></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"tdy0\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2009</td>"
				+ "<td dojoAttachPoint=\"tdy1\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2010</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"tdy2\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2011</td>"
				+ "<td dojoAttachPoint=\"tdy3\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2012</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"tdy4\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2013</td>"
				+ "<td dojoAttachPoint=\"tdy5\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2014</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"tdy6\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2015</td>"
				+ "<td dojoAttachPoint=\"tdy7\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2016</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td dojoAttachPoint=\"tdy8\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2017</td>"
				+ "<td dojoAttachPoint=\"tdy9\" dojoAttachEvent=\"onclick:ChangeYear\" class ='DateTextBox_td'>2018</td>"
				+ "</tr>"
				+ "</table>"
				+ "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td class=\"DateTextBox_tdright\">"
				+ "<button class=\"DateTextBox_button\" dojoAttachPoint=\"DateTextBox_button\" dojoAttachEvent=\"onclick:fSetDate\" >确定</button>"
				+ "</td>"
				+ "<td class=\"DateTextBox_tdleft\">"
				+ "<button class=\"DateTextBox_button\" dojoAttachPoint=\"DateTextBox_button\" dojoAttachEvent=\"onclick:fHideCalendar\" >取消</button>"
				+ "</td>" + "</tr>" + "</table>" + "</div>",

		postCreate : function() {					
			this.inherited(arguments);
		},				
		ChangeMonth : function(evt) {
			
			var node = evt.target || evt.srcElement;	
		
			if(this.currentMonthNode!=null){		
				this.currentMonthNode.style.background="#ffffff";
			}	   	 				
		    node.style.background = "#E0E9F0";				                   											
	        	giMonth = "0"+node.innerHTML.substring(0, 1);
			if (node.innerHTML.length > 2) {
				giMonth = node.innerHTML.substring(0, 2);
			}
			this.dates.setMonth(giMonth-1);
			this.currentMonthNode=node;			
		},
		ChangeYear : function(evt) {
			var node = evt.target || evt.srcElement;
			
			if(this.currentYearNode!=null){		
				this.currentYearNode.style.background="#ffffff";
			}	
			node.style.background = "#E0E9F0";
			giYear = node.innerHTML.substring(0, 4);						
			this.dates.setFullYear(giYear);
			this.currentYearNode=node;	
		},

		fSetDate : function() {				
			this.callHandler();
			this.fHideCalendar();
		},
				
		fHideCalendar : function() {
		
			this.DateYMTextBox.close();						
		},
		fSetYearMon : function(date) {
			giYear=date.getFullYear();
			giMonth=date.getMonth()+1;	
			_this=this;
			var nodes=null;				
            dojo.query("td ",this.tableMonth).forEach(function(node,i){
	         	var month;
	         	if(node.innerHTML.length>2){
	         		month=node.innerHTML.substring(0,2);
	         	}else{
	         		month=node.innerHTML.substring(0,1);
	         	}
	         	if(month==giMonth){
	         	   node.style.background="#E0E9F0";
	         	   _this.currentMonthNode=node;	         	  	         
	         	}else{         		
	         		node.style.background="#ffffff";
	         	}
           });
           var sub=null;    
           dojo.query("td ",this.tableYear).forEach(function(node,i){
			 	if(i>1){
		         	var year = node.innerHTML.substring(3,4);			         			         	     	
		         	if(year==(giYear%10)){
		         		sub=giYear-parseInt(node.innerHTML);
		         	   node.style.background="#E0E9F0";
		         	   _this.currentYearNode=node;	         	  	         
		         	}else{         		
		         		node.style.background="#ffffff";
		         	}
			 	}
           });               
			 dojo.query("td ",this.tableYear).forEach(function(node,i){
			 	if(i>1){
		         	node.innerHTML=parseInt(node.innerHTML)+sub;
			 	}
           });	
			
			if(this.widget.getDisplayFormatter().getFormat()!=null){					
			    this.dateFormat = this.widget._parseDateFormat(this.widget.getDisplayFormatter().getFormat())											
			}
			dates = date;						
		},
		AddYear : function() {
			 dojo.query("td ",this.tableYear).forEach(function(node,i){
			 	if(i>1){
		         	node.innerHTML=parseInt(node.innerHTML)+10;
		         	node.style.background="#ffffff";
			 	}
           });
		},
		DelYear : function() {
			dojo.query("td ",this.tableYear).forEach(function(node,i){
			 	if(i>1){
		         	node.innerHTML=parseInt(node.innerHTML)-10;
		         	node.style.background="#ffffff";
			 	}
           });
		},
		callHandler :function () {												
			this.DateYMTextBox._selected(this, this.print(this.dateFormat));						
		},
		print : function (str) {
			var m = this.dates.getMonth();
			var d = this.dates.getDate();
			var y = this.dates.getFullYear();
		
			var w = this.dates.getDay();
			var s = {};
			var hr = this.dates.getHours();
	
			s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
		
			s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
		
			s["%Y"] = y;		// year with the century
			s["%%"] = "%";		// a literal '%' character

			var re = /%./g;
		
			var a = str.match(re);
			
			for (var i = 0; i < a.length; i++) {
				var tmp = s[a[i]];
				if (tmp) {
					re = new RegExp(a[i], 'g');
					str = str.replace(re, tmp);
				}
			}		    
			return str;
		}					
});

