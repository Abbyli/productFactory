package com.neusoft.abclife.util;

public class StringUtil {

    /**
     * isEmpty
     * @param str
     * @return
     */
    public static boolean isEmpty(String str) {
        
        if (str == null || "".equals(str)) {
            return true;
        }
        
        return false;
    }
    /**
     * isNotEmpty
     * @param str
     * @return
     */
    public static boolean isNotEmpty(String str) {
        
        if (str != null && !"".equals(str)) {
            return true;
        }
        
        return false;
    }
    
   
}
