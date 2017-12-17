package com.neusoft.unieap.core.di.format;

public interface IFormat {
	/**
	 * 格式化接口
	 * 
	 * @param obj
	 * @param pattern
	 * @return
	 */
	public String format(Object obj, String pattern);
}
