package com.neusoft.fdframework.arithmetic.engine.job.commons;

import java.io.UnsupportedEncodingException;

import org.apache.commons.codec.binary.Base64;

public class EncryptUtil {
	private static final String ENCODE="UTF-8";
    /** 
     * 解密 
     *  
     * @param pwd 
     * @return 
     * @see [类、类#方法、类#成员] 
     */  
    public static String decodeStr(String pwd)  
    {  
        byte[] encryptBytes;
		try 
		{
			if(pwd!=null)
			{
				encryptBytes = pwd.getBytes(ENCODE);
				byte[] debytes = Base64.decodeBase64(encryptBytes); 
				return new String(debytes,ENCODE); 
			}
		} 
		catch (UnsupportedEncodingException e) 
		{
			e.printStackTrace();
		}
		return null; 
    }  
  
    /** 
     * 加密 
     *  
     * @param pwd 
     * @return 
     * @see [类、类#方法、类#成员] 
     */  
    public static String encodeStr(String pwd)  
    {  
        byte[] orgBytes;
        try 
		{
			if(pwd!=null)
			{
				orgBytes = pwd.getBytes(ENCODE);
				byte[] debytes = Base64.encodeBase64Chunked(orgBytes); 
				return new String(debytes,ENCODE); 
			}
		} 
		catch (UnsupportedEncodingException e) 
		{
			e.printStackTrace();
		}
        return null;  
    }  
//    
//    public static void main(String[] args) {
//		String str1=EncryptUtil.encodeStr("大家好大家好大家好");
//		System.out.println("加密后："+str1);
//		String str2=EncryptUtil.decodeStr(str1);
//		System.out.println("解密后："+str2);
//	}
}
