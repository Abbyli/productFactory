package com.neusoft.fdframework.arithmetic.engine.job.commons;

import java.io.File;
import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;

//import com.neusoft.fdframework.arithmetic.engine.jdbc.sequence.DBDialectService;
import com.neusoft.fdframework.core.SpringServiceFactory;
import com.neusoft.fdframework.jdbc.DBType;

public class Util {
    /**
     * 取得不重复的随机码
     * @return
     */
    public static String getUUID()
    {
        UUID uuid = UUID.randomUUID();
        return StringUtils.replace(uuid.toString(), "-", "");
    }
    
    public static String getRootDirectoryPath(){
    	return new File("").getAbsolutePath() ;
    }
    
    public static String md5(String key)
    {
    	return DigestUtils.md5Hex(key);
    }
    
	
//	public static DBType getDBType()
//	{
//		DBDialectService dbDialectService=SpringServiceFactory.getBean("arijdbc_DBDialectService");
//		return dbDialectService.getDBType();
//	}
//	public static String getSqlEncode()
//	{
//		return " ESCAPE '"+getEscapeString()+"' ";
//	}
//	public static String getEscapeString()
//	{
//		if(DBType.MySQL.equals(Util.getDBType()))
//    	{
//			return "\\\\";
//    	}
//		else
//		{
//			return "\\";
//		}
//	}
}
