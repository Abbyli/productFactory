package com.neusoft.unieap.core.sql;

import java.util.Map;

public class SqlMapping {

	public SqlMapping(String name, String sql, String clazz, Map mappingMap) {
		this.name = name;
		this.sql = sql;
		this.clazz = clazz;
		this.mappingMap = mappingMap;
	}

	/**
	 * 命名查询的名字
	 */
	private String name;
	/**
	 * sql语句
	 */
	private String sql;
	/**
	 * 字段和属性的映射
	 */
	private Map<String, Property> mappingMap;
	/**
	 * dto的类名
	 */
	private String clazz;

	public String getName() {
		return name;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Map<String, Property> getMappingMap() {
		return mappingMap;
	}

	public void setMappingMap(Map<String, Property> mappingMap) {
		this.mappingMap = mappingMap;
	}

	public String getClazz() {
		return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}

}
