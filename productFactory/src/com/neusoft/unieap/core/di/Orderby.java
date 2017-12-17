package com.neusoft.unieap.core.di;

public class Orderby extends Order {

	public static final String DESC_TYPE = "DESC";
	public static final String ASC_TYPE = "ASC";

	/**
	 * 排序类型
	 */
	private String type;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/**
	 * 获取需要排序的列
	 * 
	 * @return
	 */
	public String getOrderby() {
		return new StringBuilder(20).append(getAlias()).append(".").append(
				getProperty()).append(" ").append(type).toString();
	}
}
