package com.neusoft.unieap.core.sql;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections.map.HashedMap;

public class SqlMappingContext {

	private SqlMappingContext() {

	}

	private static SqlMappingContext context = new SqlMappingContext();

	private Map<String, SqlMapping> mappingMap = new HashedMap();

	private Map<String, Map<String, String>> realColumnsMap = new HashedMap();

	public static SqlMappingContext getSqlMappingContext() {
		return context;
	}

	/**
	 * 通过sqlMapping名字获取mapping对象
	 * 
	 * @param name
	 * @return
	 */
	public SqlMapping getSqlMappingByName(String name) {
		return mappingMap.get(name);
	}

	/**
	 * 通过sqlMapping名字获取mapping的sql语句
	 * 
	 * @param name
	 * @return
	 */
	public String getSqlByName(String name) {
		SqlMapping sqlMapping = mappingMap.get(name);
		if (sqlMapping != null) {
			return sqlMapping.getSql();
		}
		return null;
	}

	/**
	 * 通过Dto属性名获取真实column名字
	 * 
	 * @param sqlMappingName
	 * @param propertyName
	 * @return
	 */
	public Column getColumnByProperty(String sqlMappingName, String propertyName) {
		Column column = null;
		String columnStr = "";
		String type = "";
		if (sqlMappingName != null && sqlMappingName.length() > 0
				&& propertyName != null && propertyName.length() > 0) {
			//
			SqlMapping sqlMapping = getSqlMappingByName(sqlMappingName);
			if (sqlMapping != null) {
				Map<String, Property> mappingMap = sqlMapping.getMappingMap();
				if (mappingMap != null && mappingMap.size() > 0) {
					Iterator<Entry<String, Property>> it = mappingMap
							.entrySet().iterator();
					while (it.hasNext()) {
						Entry<String, Property> entry = it.next();
						if (entry.getValue().getName().equals(propertyName)) {
							columnStr = entry.getKey();
							type = entry.getValue().getType();
							break;
						}
					}
				}
				if (columnStr != null && columnStr.length() > 0) {
					if (realColumnsMap.containsKey(sqlMappingName)) {
						Map<String, String> realColumnMap = realColumnsMap
								.get(sqlMappingName);
						if (realColumnMap.containsKey(columnStr)) {
							return new Column(realColumnMap.get(columnStr),
									type);
						}
					}
				}
			}
		}
		return new Column(columnStr, type);
	}

	public Map<String, SqlMapping> getMappingMap() {
		return mappingMap;
	}

	public Map<String, Map<String, String>> getRealColumnsMap() {
		return realColumnsMap;
	}
}
