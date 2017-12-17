package com.neusoft.unieap.core.di;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DOHierarchyContext {

	private DOHierarchyContext() {

	}

	private static DOHierarchyContext context = new DOHierarchyContext();

	private Map<String, DOHierarchy> hierarchyMap = new HashMap<String, DOHierarchy>();

	public static DOHierarchyContext getContext() {
		return context;
	}

	/**
	 * 通过Hierarchy名字获取Hierarchy对象
	 * 
	 * @param name
	 * @return
	 */
	public DOHierarchy getHierarchyByName(String name) {
		return hierarchyMap.get(name);
	}

	public Map<String, DOHierarchy> getHierarchyMap() {
		return hierarchyMap;
	}

	/**
	 * 传入DO的类名，获得HQL中别名
	 * 
	 * @param name
	 * @return
	 */
	public String getDOAlias(String name) {
		if (name != null && name.length() > 0) {
			return "_"
					+ name.substring(name.lastIndexOf('.') + 1, name.length());
		}
		return "";
	}
}
