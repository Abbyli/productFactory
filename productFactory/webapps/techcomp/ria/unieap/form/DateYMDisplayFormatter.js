if (!dojo._hasResource["unieap.form.DateYMDisplayFormatter"]) {
    dojo._hasResource["unieap.form.DateYMDisplayFormatter"] = true;
    dojo.provide("unieap.form.DateYMDisplayFormatter");
    dojo.require("unieap.util.util")
    dojo.require("unieap.form.SimpleFormatter");
    
    dojo.declare("unieap.form.DateYMDisplayFormatter", unieap.form.SimpleFormatter, {
       /**
	    * @summary:
	    * 		显示格式
	    * @type：
	    * 		{string}
	    * @default:
	    * 		"yyyy-MM-dd"
	    * @example:
	    * |	<div dojoType="unieap.form.DateTextBox" displayFormatter="{dataFormat:${1}'yyyy/MM/dd'}">
	    * |	</div>
	    *	${1}日期的显示格式为'yyyy/MM/dd'
	    */
	   dataFormat:"yyyy-MM",
	   
	    /**
         * @summary
         * 		格式转换，从Date的long格式化成显示值
         * @param {number} value
         * @return {string}
         */
        format: function(value){
			if(!value){
				return value;
			}
            var date = new Date(Number(value));           
            return unieap.dateFormat(date.getTime(), this.getFormat());
        },
        /**
         * @summary
         * 		从显示值转换成Date的long值
         * @param {string} value
         * @return {number}
         */
        parse: function(value){
			if(!value){
				return value;
			}
            return unieap.dateParser(value, this.getFormat()).getTime();
        },
        
        /**
         * @summary
         *		修改日期控件format格式
         * @param:
         *		{String} dataFormat
         *  @example:
	     * |	<div dojoType="unieap.form.DateTextBox" id="date" displayFormatter="{dataFormat:yyyy/MM/dd'}">
	     * |	</div>
	     * |	unieap.byId("date").getDisplayFormatter().setFormat("yyyy-MM-dd");
	     * 将日期显示格式由yyyy/MM/dd转换为yyyy-MM-dd
         */
        setFormat: function(dataFormat){
			this.dataFormat = dataFormat;
			if (this.widget && (typeof this.widget.updateDisplayText=="function"))
				this.widget.updateDisplayText();
		}
    });
}