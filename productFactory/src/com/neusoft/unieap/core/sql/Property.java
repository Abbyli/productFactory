package com.neusoft.unieap.core.sql;

public class Property {

	public Property(String name, String type) {
		this.name = name;
		this.type = type;
	}

	/**
	 * 字段名
	 */
	private String name;
	/**
	 * java type名
	 */
	private String type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
