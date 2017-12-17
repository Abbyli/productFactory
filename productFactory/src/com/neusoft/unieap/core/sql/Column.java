package com.neusoft.unieap.core.sql;

public class Column {

	public Column(String name, String type) {
		this.name = name;
		this.type = type;
	}

	/**
	 * 真实的列名
	 */
	private String name;
	/**
	 * java type
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
