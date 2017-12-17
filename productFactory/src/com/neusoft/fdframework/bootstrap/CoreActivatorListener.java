package com.neusoft.fdframework.bootstrap;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.ServletContextResource;

import com.neusoft.unieap.core.sql.Property;
import com.neusoft.unieap.core.sql.SqlMapping;
import com.neusoft.unieap.core.sql.SqlMappingContext;
import com.neusoft.unieap.core.util.DomUtil;

//import com.neusoft.unieap.core.model.DCActivator;

public class CoreActivatorListener implements ServletContextListener {

	private ServletContext servletContext;

	private PathMatcher pathMatcher = new AntPathMatcher();

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// 初始化sqlMappingContext
		this.setServletContext(arg0.getServletContext());
		initSqlMappingContext();
	}

	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	private void initSqlMappingContext() {
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		LogFactory
				.getLog(getClass())
				.info(
						"#################################################################");
		Set result = new LinkedHashSet(8);
		doRetrieveMatchingServletContextResources(servletContext,
				"/WEB-INF/conf/**/sdm", "/WEB-INF/conf", result);

		Iterator it = result.iterator();
		while (it.hasNext()) {
			ServletContextResource resource = (ServletContextResource) it
					.next();
			try {
				parseDirectory(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	protected void parseDirectory(File dir) {
		File[] files = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				parseDirectory(files[i]);
			} else if (files[i].getName().endsWith(".sdm.xml")) {
				parseFile(files[i]);
			}
		}
	}

	protected void parseFile(File xmlFile) {
		if (!xmlFile.exists()) {
		}
		Document doc = DomUtil.parse(xmlFile);
		Element sqlMappings = doc.getRootElement();
		String classStr = sqlMappings.attributeValue("class");
		if (classStr != null && classStr.length() > 0) {
			Class<?> clazz;
			try {
				clazz = Class.forName(classStr);
				Field[] fields = clazz.getDeclaredFields();
				List<Element> sqlMappingList = DomUtil.getChildElements(
						sqlMappings, "sql-mapping");
				if (sqlMappingList != null && sqlMappingList.size() > 0) {
					for (Element sqlMapping : sqlMappingList) {
						String name = sqlMapping.attributeValue("name");
						Map<String, String> realColumMap = null;
						if (name != null && name.length() > 0) {
							List content = sqlMapping.content();
							if (content != null && content.size() > 0) {
								String sql = "";
								Map<String, Property> mappingMap = new HashedMap();
								for (Object obj : content) {
									if (obj instanceof Element) {
										Element childNode = (Element) obj;
										String childName = childNode.getName();
										if (childName.equals("mapping")) {
											String propertyValue = childNode
													.attributeValue("property");
											String columnValue = childNode
													.attributeValue("column");
											String realColumnValue = childNode
													.attributeValue("realColumn");
											if (propertyValue != null
													&& propertyValue.length() > 0
													&& columnValue != null
													&& columnValue.length() > 0) {
												for (Field field : fields) {
													if (field.getName().equals(
															propertyValue)) {
														mappingMap
																.put(
																		columnValue,
																		new Property(
																				propertyValue,
																				field
																						.getType()
																						.getName()));
														break;
													}
												}
											}
											// 存储column和realColumn之间的关系
											if (realColumnValue != null
													&& realColumnValue.length() > 0) {
												if (realColumMap == null) {
													realColumMap = new HashedMap();
													SqlMappingContext
															.getSqlMappingContext()
															.getRealColumnsMap()
															.put(name,
																	realColumMap);
												}
												realColumMap.put(columnValue,
														realColumnValue);
											}
										} else if (childName.equals("sql")) {
											sql = childNode.getText();
										}
									}
								}
								SqlMappingContext.getSqlMappingContext()
										.getMappingMap().put(
												name,
												new SqlMapping(name, sql,
														classStr, mappingMap));
							}

						}
					}
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 获取servlet上下文中匹配的相应资源
	 * 
	 * @param servletContext
	 * @param fullPattern
	 * @param dir
	 * @param result
	 */
	protected void doRetrieveMatchingServletContextResources(
			ServletContext servletContext, String fullPattern, String dir,
			Set result) {

		Set candidates = servletContext.getResourcePaths(dir);
		if (candidates != null) {
			boolean dirDepthNotFixed = (fullPattern.indexOf("**") != -1);
			for (Iterator it = candidates.iterator(); it.hasNext();) {
				String currPath = (String) it.next();
				if (!currPath.startsWith(dir)) {
					int dirIndex = currPath.indexOf(dir);
					if (dirIndex != -1) {
						currPath = currPath.substring(dirIndex);
					}
				}
				if (currPath.endsWith("/")
						&& (dirDepthNotFixed || StringUtils.countOccurrencesOf(
								currPath, "/") <= StringUtils
								.countOccurrencesOf(fullPattern, "/"))) {
					doRetrieveMatchingServletContextResources(servletContext,
							fullPattern, currPath, result);
				}
				if (pathMatcher.match(fullPattern, currPath)) {
					result.add(new ServletContextResource(servletContext,
							currPath));
				}
			}
		}
	}


}
