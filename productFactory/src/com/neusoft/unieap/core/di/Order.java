package com.neusoft.unieap.core.di;

public class Order implements Comparable<Order> {
	/**
	 * 排序的顺序
	 */
	private int order;
	/**
	 * 为了排序生成方便，冗余一个alias
	 */
	private String alias;

	/**
	 * 排序的列
	 */
	private String property;

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public int compareTo(Order o) {
		return this.order - o.getOrder();
	}

}
