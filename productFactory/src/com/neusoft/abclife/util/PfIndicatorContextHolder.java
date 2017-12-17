package com.neusoft.abclife.util;

import com.neusoft.abclife.productfactory.entity.PfDynamicBean;

public class PfIndicatorContextHolder {
	
	private static ThreadLocal<PfDynamicBean> local=new ThreadLocal<PfDynamicBean>();
	public static PfDynamicBean get()
	{
		return local.get();
	}
	public static void set(PfDynamicBean pfdynamicBean)
	{
		 local.set(pfdynamicBean);
	}
	public static void clear()
	{
		 local.remove();
	}
}
