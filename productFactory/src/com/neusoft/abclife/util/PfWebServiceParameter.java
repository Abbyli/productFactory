package com.neusoft.abclife.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class PfWebServiceParameter {
	
    /**
    *
    * @generated
    */
    public String getNowTime(){
    	return new SimpleDateFormat(
    	"yyyy-MM-dd HH:mm:ss.mmm").format(new Date());
    }
    /**
    *
    * @generated
    */
    public String getUId(){
    	return UUID.randomUUID().toString().replaceAll("-", "");
    }

    /**
     *
     * @generated
     */
    public String returncode = "000000";
    

}
