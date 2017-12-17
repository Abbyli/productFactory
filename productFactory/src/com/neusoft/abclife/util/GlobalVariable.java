package com.neusoft.abclife.util;

import java.util.HashMap;
import java.util.Map;

/**
 * 全局变量
 * @author Neusoft
 *
 */
public class GlobalVariable {

	/**
	 * 伤残等级/给付比例
	 */
	public final static Map<String,Double> disable = new HashMap<String, Double>();
	
	public final static Map<Integer,String> PAYINTV = new HashMap<Integer,String>();
	static{
		disable.put("一", 1.0);
		disable.put("二", 0.9);
		disable.put("三", 0.8);
		disable.put("四", 0.7);
		disable.put("五", 0.6);
		disable.put("六", 0.5);
		disable.put("七", 0.4);
		disable.put("八", 0.3);
		disable.put("九", 0.2);
		disable.put("十", 0.1);
		
		PAYINTV.put(-1, "不定期交");
		PAYINTV.put(0, "一次交清");
		PAYINTV.put(1, "月交");
		PAYINTV.put(3, "季交");
		PAYINTV.put(6, "半年交");
		PAYINTV.put(12, "年交");
		
	}
}
