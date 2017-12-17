package com.neusoft.fdframework.arithmetic.engine.job.models;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;
import com.neusoft.fdframework.arithmetic.engine.job.commons.ArithmeticEngineConst;
import com.neusoft.fdframework.arithmetic.engine.job.commons.DateUtil;
/**
 * 对象类型自动转化类
 * @author Administrator
 *
 */
public class TypeConverter {
	
	public static Object convert(Object srcObj,String returnType)
	{
		Object result=null;
		if(srcObj!=null)
		{
			if(ArithmeticEngineConst.PARAM_RETURN_TYPE_STRING.equalsIgnoreCase(returnType))
	        {
				result=TypeConverter.convert(srcObj, String.class);
	        }
	        else if(ArithmeticEngineConst.PARAM_RETURN_TYPE_DATE.equalsIgnoreCase(returnType))
	        {
	        	result=TypeConverter.convert(srcObj, Date.class);
	        }
	        else if(ArithmeticEngineConst.PARAM_RETURN_TYPE_NUMBER.equalsIgnoreCase(returnType))
	        {
	        	result=TypeConverter.convert(srcObj, BigDecimal.class);
	        }
	        else
	        {
	        	try {
					result=TypeConverter.convert(srcObj, Class.forName(returnType));
				} catch (ClassNotFoundException e) {
					throw new RuntimeException(e);
				}
	        }
		}
		return result;
	}
	@SuppressWarnings("unchecked")
	public static <T> T convert(Object srcObj,Class<T> dstType)
	{
		T ret=null;
		if(srcObj!=null&&dstType!=null)
		{
			try
			{
				if(srcObj.getClass().getName().equals(dstType.getName()))
				{//源和目标类型相同，无需转化
					ret=(T)srcObj;
				}
				else if(srcObj instanceof String)
				{
					String str=(String)srcObj;
					if(Number.class.isAssignableFrom(dstType))
					{
						ret=(T) string2BigDecimal(str);
					}
					else if(Date.class.isAssignableFrom(dstType))
					{
						ret=(T) string2Date(str);
					}
					else
					{
						throw new EngineException("10039",new String[]{srcObj.getClass().getName(),dstType.getName()},null);
					}
				}
				else if(srcObj instanceof Number)
				{
					Number num=(Number)srcObj;
					if(String.class.isAssignableFrom(dstType))
					{
						ret=(T) number2String(num);
					}
					else if(Date.class.isAssignableFrom(dstType))
					{
						ret=(T) number2Date(num);
					}
					else if(Number.class.isAssignableFrom(dstType))
					{
						ret=(T) number2BigDecimal(num);
					}
					else
					{
						throw new EngineException("10039",new String[]{srcObj.getClass().getName(),dstType.getName()},null);
					}
				}
				else if(srcObj instanceof Date)
				{
					Date date=(Date)srcObj;
					if(String.class.isAssignableFrom(dstType))
					{
						ret=(T) date2String(date);
					}
					else if(Number.class.isAssignableFrom(dstType))
					{
						ret=(T) date2Number(date);
					}
					else
					{
						throw new EngineException("10039",new String[]{srcObj.getClass().getName(),dstType.getName()},null);
					}
				}
				else
				{//复杂类型
					throw new EngineException("10039",new String[]{srcObj.getClass().getName(),dstType.getName()},null);
				}
			}
			catch(Exception e)
			{
				throw new EngineException("10038",new String[]{srcObj.getClass().getName(),dstType.getName()},e);
			}
		}
		return ret;
	}
	public static BigDecimal string2BigDecimal(String str)
	{
		BigDecimal ret=null;
		if(StringUtils.isNotEmpty(str))
		{
			ret=new BigDecimal(str);
		}
		return ret;
	}
	public static BigDecimal number2BigDecimal(Number num)
	{
		BigDecimal ret=null;
		if(num!=null)
		{
			if(num instanceof BigDecimal)
			{
				ret=(BigDecimal)num;
			}
			else
			{
				ret=new BigDecimal(num.toString());
			}
		}
		return ret;
	}
	public static String number2String(Number num)
	{
		String ret=null;
		if(num!=null)
		{
			if(num instanceof BigDecimal)
			{
				ret=((BigDecimal)num).toPlainString();
			}
			else
			{
				ret=num.toString();
			}
		}
		return ret;
	}
	
	public static Date string2Date(String str)
	{
		Date ret=null;
		if(str!=null)
		{
			if(str.length()==10)
			{
				ret=DateUtil.string2Date(str, 0);//yyyy-MM-dd
			}
			else
			{
				ret=DateUtil.string2Date(str, 1);//yyyy-MM-dd HH:mm:ss
			}
		}
		return ret;
	}
	public static String date2String(Date date)
	{
		String ret=null;
		if(date!=null)
		{
			ret=DateUtil.date2String(date, 1);
		}
		return ret;
	}
	
	public static BigDecimal date2Number(Date date)
	{
		BigDecimal ret=null;
		if(date!=null)
		{
			ret=new BigDecimal(String.valueOf(date.getTime()));
		}
		return ret;
	}
	public static Date number2Date(Number num)
	{
		Date ret=null;
		if(num!=null)
		{
			Calendar cal=Calendar.getInstance();
			if(num instanceof Long)
			{
				cal.setTimeInMillis((Long)num);
				ret=cal.getTime();
			}
			else if(num instanceof BigDecimal)
			{
				cal.setTimeInMillis(((BigDecimal)num).longValue());
				ret=cal.getTime();
			}
		}
		return ret;
	}
	
	public static void main(String[] args) {
//		System.out.println(new Long(0L) instanceof Number);
//		System.out.println(new Integer(0) instanceof Number);
//		System.out.println(new Float(12F) instanceof Number);
//		System.out.println(new Double(12D) instanceof Number);
//		System.out.println(new BigDecimal("12") instanceof Number);
//		System.out.println(new Byte("12") instanceof Number);
//		System.out.println(Number.class.isAssignableFrom( Long.class));
		
		BigDecimal r0=convert(new BigDecimal("12"), BigDecimal.class);
		System.out.println(r0);
		BigDecimal r1=convert("12", BigDecimal.class);
		System.out.println(r1);
		BigDecimal r2=convert(new Integer(12), BigDecimal.class);
		System.out.println(r2);
		BigDecimal r3=convert(new Long(12), BigDecimal.class);
		System.out.println(r3);
		BigDecimal r4=convert(new Double(12.12D), BigDecimal.class);
		System.out.println(r4);
		BigDecimal r5=convert(new Float(12.12F), BigDecimal.class);
		System.out.println(r5);
		BigDecimal r6=convert(new Byte("12"), BigDecimal.class);
		System.out.println(r6);
		
		String r7=convert(new Integer(12), String.class);
		System.out.println(r7);
		String r8=convert(new Long(12), String.class);
		System.out.println(r8);
		String r9=convert(new Double(12.12D), String.class);
		System.out.println(r9);
		String r10=convert(new Float(12.12F), String.class);
		System.out.println(r10);
		String r11=convert(new Byte("12"), String.class);
		System.out.println(r11);
		String r12=convert(new BigDecimal("12"), String.class);
		System.out.println(r12);
		String r13=convert(Calendar.getInstance().getTime(), String.class);
		System.out.println(r13);
		String r14=convert("abc", String.class);
		System.out.println(r14);
		
		
		Date r15=convert(Calendar.getInstance().getTime(), Date.class);
		System.out.println(r15);
		Date r16=convert("2015-11-12", Date.class);
		System.out.println(r16);
		Date r17=convert("2015-11-12 12:12:12", Date.class);
		System.out.println(r17);
		Date r18=convert(Calendar.getInstance().getTimeInMillis(), Date.class);
		System.out.println(r18);
		Date r19=convert(new BigDecimal(Calendar.getInstance().getTimeInMillis()), Date.class);
		System.out.println(r19);
		
	}
}
