package com.neusoft.abclife.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DateUtil {

	private static final Logger Logger = LoggerFactory.getLogger(DateUtil.class);
	
	/**
	 * 计算两个日期相差天数
	 * @param smalldate
	 * @param bigdate
	 * @return
	 * @throws ParseException
	 */
	public static int daysBetween (Date smallDate,Date bigDate) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date smallerDate = sdf.parse(sdf.format(smallDate));
		Date biggerDate = sdf.parse(sdf.format(bigDate));
		Calendar sCal = Calendar.getInstance();
		Calendar bCal = Calendar.getInstance();
		
		sCal.setTime(smallerDate);
		bCal.setTime(biggerDate);
		
		Long sTime = sCal.getTimeInMillis();
		Long bTime = bCal.getTimeInMillis();
		
		int days = (int) ((bTime-sTime)/(1000*24*3600));
		return days;
	}
	/**
	 * 计算两个日期相差天数 
	 * @param smallDate "yyyy-MM-dd"
	 * @param bigDate "yyyy-MM-dd"
	 * @return
	 * @throws ParseException
	 */
	public static int daysBetween (String smallDate,String bigDate) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar sCal = Calendar.getInstance();
		Calendar bCal = Calendar.getInstance();
		
		sCal.setTime(sdf.parse(smallDate));
		bCal.setTime(sdf.parse(bigDate));
		
		Long sTime = sCal.getTimeInMillis();
		Long bTime = bCal.getTimeInMillis();
		
		int days = (int) ((bTime-sTime)/(1000*24*3600));
		return days;
	}
	/**
	 * 计算两个日期之间的年龄
	 * @param smallDate
	 * @param bigDate
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static int getAge(Date smallDate,Date bigDate){
		int age = 0;
		int smallYear = smallDate.getYear();
		int bigYear = bigDate.getYear();
		age = bigYear-smallYear;
		int smallMonth = smallDate.getMonth();
		int bigMonth = bigDate.getMonth();
		if(bigMonth < smallMonth){
			age--;
		}else if(bigMonth == smallMonth){
			int smallDay = smallDate.getDate();
			int bigDay = bigDate.getDate();
			if(bigDay < smallDay){
				age--;
			}
		}
		return age;
	}
	/**
	 * 计算两个日期之间的年龄
	 * @param smallDate "yyyy-MM-dd"
	 * @param bigDate "yyyy-MM-dd"
	 * @return
	 */
	public static int getAge(String smallDate,String bigDate){
		int age = 0;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date d1 = sdf.parse(smallDate);
			Date d2 = sdf.parse(bigDate);
			age = DateUtil.getAge(d1, d2);
		} catch (ParseException e) {
			Logger.info("日期类计算年龄异常",e);
		}
		return age;
	}
	/**
	 * 计算相差年数
	 * @param smallDate
	 * @param bigDate
	 * @return
	 * @throws ParseException
	 */
	public static int yearBetween(Date smallDate,Date bigDate) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date smallerDate = sdf.parse(sdf.format(smallDate));
		Date biggerDate = sdf.parse(sdf.format(bigDate));
		Calendar sCal = Calendar.getInstance();
		Calendar bCal = Calendar.getInstance();
		
		sCal.setTime(smallerDate);
		bCal.setTime(biggerDate);
		
		int s = sCal.get(Calendar.YEAR);
		int b = bCal.get(Calendar.YEAR);
		int years = b-s;
		return years == 0?1 : Math.abs(years);
	}
	/**
	 * 计算相差年数
	 * @param smallDate
	 * @param bigDate
	 * @return
	 * @throws ParseException
	 */
	public static int yearBetween(String smallDate,String bigDate) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar sCal = Calendar.getInstance();
		Calendar bCal = Calendar.getInstance();
		
		sCal.setTime(sdf.parse(smallDate));
		bCal.setTime(sdf.parse(bigDate));
		
		int s = sCal.get(Calendar.YEAR);
		int b = bCal.get(Calendar.YEAR);
		int years = b-s;
		return years == 0?1 : Math.abs(years);
	}
	/**
	 * 获取当前月的天数
	 * @throws ParseException 
	 */
	public static int getDaysFromMonth(String date) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calr = Calendar.getInstance();
		Date d = sdf.parse(date);
		calr.setTime(d);
		int days = calr.getActualMaximum(Calendar.DAY_OF_MONTH);
		return days;
	}
	
	/**
	 * 获取当前月的天数
	 * @throws ParseException 
	 */
	public static int getDaysFromMonth(Date date) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calr = Calendar.getInstance();
		Date d = sdf.parse(sdf.format(date));
		calr.setTime(d);
		int days = calr.getActualMaximum(Calendar.DAY_OF_MONTH);
		return days;
	}
	
}
