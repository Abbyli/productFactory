package com.neusoft.fdframework.arithmetic.engine.job.commons;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
/**
 * 
 * <p>Title: 金融软件开发平台</p>.
 * <p>Description:日期工具类</p>
 * <p>Copyright: Copyright (c) 2014</p>
 * @author 张阳
 * 2015年1月6日
 */
public class DateUtil
{
    private static String[] DATA_FORMAT = { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss" ,"yyyy-MM"};
    /**
     * 
     * {取得开始时间}
     * 
     * @param date
     * @return
     * @author:张阳
     */
    public static Date getStartTime(Date date)
    {
        if (date != null)
        {
            String dateStr=date2String(date,0);
            dateStr+=" 00:00:00";
            return string2Date(dateStr, 1);
        }
        return null;
    }
    /**
     * 
     * {取得结束时间}
     * 
     * @param date
     * @return
     * @author:张阳
     */
    public static Date getEndTime(Date date)
    {
        if (date != null)
        {
            String dateStr=date2String(date,0);
            dateStr+=" 23:59:59";
            return string2Date(dateStr, 1);
        }
        return null;
    }

    /**
     * 
     * {日期字符串转化为日期对象}
     * 
     * @param dateStr
     * @param index
     * @return
     * @author:张阳
     */
    public static Date string2Date(String dateStr, int index)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(DATA_FORMAT[index]);
        try
        {
            return formatter.parse(dateStr);
        }
        catch (ParseException e)
        {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 
     * {日期字符串转化为日期对象}
     * 
     * @param dateStr
     * @param index
     * @return
     * @author:张阳
     */
    public static String date2String(Date date, int index)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(DATA_FORMAT[index]);
        return formatter.format(date);
    }
    
    /**
     * 计算一年中第几天、第几周第一天、第几月是几月几号
     * @param inputNum
     * @return
     */
    public static String getDateStringByNum(String inputYear,String passDays,String pattern){
    		if("0".equals(pattern)){ //按日统计，将inputNum格式化为具体日期，返回yyyy-MM-dd格式日期
	    		Calendar c = Calendar.getInstance();
	    		c.setTime(string2Date(inputYear+"-01-01",0));
	    		c.add(Calendar.DAY_OF_MONTH, Integer.parseInt(passDays)-1);
	    		return date2String(c.getTime(),0);
    		}else if("1".equals(pattern)){//按周统计，将inputNum格式化为每周第一天，返回yyyy-MM-dd格式日期
    			String week = passDays;
    			Calendar c = Calendar.getInstance();
    			c.setTime(string2Date(inputYear+"-01-01",0));
    			//int days = (Integer.parseInt(week)-1)*7+1+(7-c.get(Calendar.WEEK_OF_YEAR))-6;
    			int days = (Integer.parseInt(week)-1)*7-c.get(Calendar.DAY_OF_WEEK)+3;
    			return getDateStringByNum(inputYear,String.valueOf(days),"0");
    		}else if("2".equals(pattern)){//按月统计，返回yyyy-MM格式日期
    			return inputYear+passDays;
    		}
    		return null;
    }
    
    /**
     * 通过日期yyyy-MM-dd得到是本年底多少天、多少周、多少月
     * @param inputDate
     * @param pattern
     * @return
     */
    public static String parseDaysToNum(String inputDate, String pattern)
	{
		java.text.SimpleDateFormat sf = new java.text.SimpleDateFormat("w");
		String year = inputDate.substring(0,4);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		c1.setTime(DateUtil.string2Date(inputDate, 0));
		c2.setTime(DateUtil.string2Date(year+"-01-01",0));
		if("0".equals(pattern)){//返回yyyyddd
			return year+(c1.get(Calendar.DAY_OF_YEAR)- c2.get(Calendar.DAY_OF_YEAR)+1);
		}
		else if ("1".equals(pattern)){//返回yyyyw
			String weeksOfYear = sf.format(c1.getTime());
			if(c2.get(Calendar.DAY_OF_WEEK)==1){
				weeksOfYear = String.valueOf(Integer.parseInt(weeksOfYear)+1);
			}
			if(c1.get(Calendar.DAY_OF_WEEK)==1){
				weeksOfYear = String.valueOf(Integer.parseInt(weeksOfYear)-1);
			}
			return year+weeksOfYear;
		}else if ("2".equals(pattern)){//返回yyyymm
			return inputDate.replaceAll("-", "").substring(0,6);
		}
		return null;
	}
    /**
     * {得到月开始日期}
     * @param date
     * @return
     * @author: 韩永旭
     */
	public static Date getMonthFirstDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int value = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
		cal.set(Calendar.DAY_OF_MONTH, value);
		return getStartTime(cal.getTime());
	}

    /**
     * {得到月结束日期}
     * @param date
     * @return
     * @author: 韩永旭
     */
	public static Date getMonthLastDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		cal.set(Calendar.DAY_OF_MONTH, value);
		return getEndTime(cal.getTime());
	}

    /**
     * {得到周开始日期}
     * @param date
     * @return
     * @author: 韩永旭
     */
	public static Date getWeekFirstDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
		int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
		if (1 == dayWeek) {
			cal.add(Calendar.DAY_OF_MONTH, -1);
		}
		cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
		int day = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
		cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
		return getStartTime(cal.getTime());
	}

    /**
     * {得到周结束日期}
     * @param date
     * @return
     * @author: 韩永旭
     */
	public static Date getWeekLasttDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
		int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
		if (1 == dayWeek) {
			cal.add(Calendar.DAY_OF_MONTH, -1);
		}
		cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
		cal.add(Calendar.DATE, 6);
		return getEndTime(cal.getTime());
	}
}
