package com.neusoft.unieap.core.di.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.neusoft.unieap.core.di.Condition;
import com.neusoft.unieap.core.di.DOHierarchy;
import com.neusoft.unieap.core.di.Hierarchy;
import com.neusoft.unieap.core.di.Orderby;
import com.neusoft.unieap.core.util.DomUtil;

/**
 * 解析生成的分层文件
 * 
 */
public class ParserHierarchy {

	// 节点类型
	private static final String HIERARCHY_DOHIERARCHY = "dohierarchy";
	private static final String HIERARCHY_HIERARCHY = "hierarchy";
	private static final String HIERARCHY_CONDITION = "condition";
	private static final String HIERARCHY_ORDERBY = "orderby";

	// conditon节点属性
	private static final String ATTR_ORDER = "order";
	private static final String ATTR_PROPERTY = "property";

	private static final String HIERARCHY_CONDITION_OPERATION = "operation";
	private static final String HIERARCHY_CONDITION_PARAMKEY = "paramkey";
	private static final String HIERARCHY_CONDITION_VALUE = "value";
	// orderby节点属性
	private static final String HIERARCHY_ORDERBY_TYPE = "type";

	// DOHIERARCHY节点属性
	private static final String HIERARCHY_DOHIERARCHY_NAME = "name";
	private static final String HIERARCHY_DOHIERARCHY_CLAZZ = "class";
	private static final String HIERARCHY_DOHIERARCHY_ALIAS = "alias";
	private static final String HIERARCHY_DOHIERARCHY_ID = "id";

	// HIERARCHY节点属性
	private static final String HIERARCHY_HIERARCHY_CLAZZ = "class";
	private static final String HIERARCHY_HIERARCHY_ALIAS = "alias";
	private static final String HIERARCHY_HIERARCHY_ID = "id";
	private static final String HIERARCHY_HIERARCHY_FOREIGNKEY = "foreignKey";
	private static final String HIERARCHY_HIERARCHY_PROPERTYNAME = "propertyName";
	private static final String HIERARCHY_HIERARCHY_JOINTYPE = "joinType";
	private static final String HIERARCHY_HIERARCHY_LAZY = "lazy";
	private static final String HIERARCHY_HIERARCHY_COLLECTION = "collection";
	private static final String HIERARCHY_HIERARCHY_PERSIST = "persist";

	public static List<DOHierarchy> parserHierarchy(File file) {
		Document doc = DomUtil.parse(file);
		Element dohierarchies = doc.getRootElement();

		String classStr = dohierarchies
				.attributeValue(HIERARCHY_DOHIERARCHY_CLAZZ);
		String idStr = dohierarchies.attributeValue(HIERARCHY_DOHIERARCHY_ID);
		List<DOHierarchy> dohierarchyList = new ArrayList<DOHierarchy>();
		if (classStr != null && classStr.length() > 0) {
			List<Element> dohierarchyNodeList = DomUtil.getChildElements(
					dohierarchies, HIERARCHY_DOHIERARCHY);
			if (dohierarchyNodeList != null && dohierarchyNodeList.size() > 0) {
				for (Element e : dohierarchyNodeList) {
					DOHierarchy doHierarchy = new DOHierarchy();
					doHierarchy.setId(idStr);
					doHierarchy.setClazz(classStr);
					dohierarchyList.add(constructDOHierarchy(doHierarchy, e));
					doHierarchy.setConditions(constructConditions(DomUtil
							.getChildElements(e, HIERARCHY_CONDITION),
							doHierarchy.getAlias()));
					doHierarchy.setOrderbys(constructOrderbys(DomUtil
							.getChildElements(e, HIERARCHY_ORDERBY),
							doHierarchy.getAlias()));
				}
			}
		}
		return dohierarchyList;
	}

	private static List<Orderby> constructOrderbys(List<Element> elems,
			String alias) {
		if (elems != null && elems.size() > 0) {
			List<Orderby> orderbys = new ArrayList<Orderby>();
			for (Element e : elems) {
				Orderby orderby = new Orderby();
				orderby.setAlias(alias);
				String order = e.attributeValue(ATTR_ORDER);
				if (order != null && order.length() > 0) {
					orderby.setOrder(Integer.valueOf(order));
				}
				orderby.setProperty(e.attributeValue(ATTR_PROPERTY));
				orderby.setType(e.attributeValue(HIERARCHY_ORDERBY_TYPE));
				orderbys.add(orderby);
			}
			return orderbys;
		}
		return null;
	}

	private static List<Condition> constructConditions(List<Element> elems,
			String alias) {
		if (elems != null && elems.size() > 0) {
			List<Condition> conditions = new ArrayList<Condition>();
			for (Element e : elems) {
				Condition condition = new Condition();
				String script = e.getText();
				if (script != null && script.trim().length() > 0) {
					condition.setScript(script);
				}
				condition.setAlias(alias);
				String order = e.attributeValue(ATTR_ORDER);
				if (order != null && order.length() > 0) {
					condition.setOrder(Integer.valueOf(order));
				}
				condition.setProperty(e.attributeValue(ATTR_PROPERTY));
				condition.setOperation(e
						.attributeValue(HIERARCHY_CONDITION_OPERATION));
				condition.setValue(e.attributeValue(HIERARCHY_CONDITION_VALUE));
				condition.setParamkey(e
						.attributeValue(HIERARCHY_CONDITION_PARAMKEY));
				conditions.add(condition);
			}
			return conditions;
		}
		return null;
	}

	private static DOHierarchy constructDOHierarchy(DOHierarchy doHierarchy,
			Element elem) {
		// 取得DOHierarchy的基本属性
		String name = elem.attributeValue(HIERARCHY_DOHIERARCHY_NAME);
		String alias = elem.attributeValue(HIERARCHY_DOHIERARCHY_ALIAS);
		doHierarchy.setName(name);
		doHierarchy.setAlias(alias);
		// 解析第一级hierarchy标签
		List<Element> hierarchyNodes = DomUtil.getChildElements(elem,
				HIERARCHY_HIERARCHY);
		if (CollectionUtils.isNotEmpty(hierarchyNodes)) {
			List<Hierarchy> hierarchies = new ArrayList<Hierarchy>();
			int size = hierarchyNodes.size();
			for (int i = 0; i < size; i++) {
				Element e = hierarchyNodes.get(i);
				Hierarchy hierarchy = constructHierarchy(e);
				hierarchies.add(hierarchy);
				hierarchy.setConditions(constructConditions(DomUtil
						.getChildElements(e, HIERARCHY_CONDITION), hierarchy
						.getAlias()));
				hierarchy.setOrderbys(constructOrderbys(DomUtil
						.getChildElements(e, HIERARCHY_ORDERBY), hierarchy
						.getAlias()));

			}
			doHierarchy.setHierarchies(hierarchies);
		}
		return doHierarchy;
	}

	/**
	 * 构造Hierarchy对象
	 */
	private static Hierarchy constructHierarchy(Element elem) {
		Hierarchy hierarchy = new Hierarchy();
		String id = elem.attributeValue(HIERARCHY_HIERARCHY_ID);
		String foreignKey = elem.attributeValue(HIERARCHY_HIERARCHY_FOREIGNKEY);
		String clazz = elem.attributeValue(HIERARCHY_HIERARCHY_CLAZZ);
		String alias = elem.attributeValue(HIERARCHY_HIERARCHY_ALIAS);
		String propertyName = elem
				.attributeValue(HIERARCHY_HIERARCHY_PROPERTYNAME);
		String joinType = elem.attributeValue(HIERARCHY_HIERARCHY_JOINTYPE);
		String lazy = elem.attributeValue(HIERARCHY_HIERARCHY_LAZY);
		String collection = elem.attributeValue(HIERARCHY_HIERARCHY_COLLECTION);
		String persist = elem.attributeValue(HIERARCHY_HIERARCHY_PERSIST);

		hierarchy.setId(id);
		hierarchy.setForeignKey(foreignKey);
		hierarchy.setClazz(clazz);
		hierarchy.setAlias(alias);
		hierarchy.setPropertyName(propertyName);
		hierarchy.setJoinType(joinType);
		hierarchy.setLazy(Boolean.parseBoolean(lazy));
		if (collection != null) {
			hierarchy.setCollection(!collection.equals(""));
		}
		if (persist != null && persist.length() > 0) {
			hierarchy.setPersist(Boolean.valueOf(persist));
		}
		// 加载下一层hierarchy节点
		List<Element> hierarchyNodes = DomUtil.getChildElements(elem,
				HIERARCHY_HIERARCHY);
		if (CollectionUtils.isNotEmpty(hierarchyNodes)) {
			List<Hierarchy> hierarchies = new ArrayList<Hierarchy>();
			int size = hierarchyNodes.size();
			for (int i = 0; i < size; i++) {
				Element e = hierarchyNodes.get(i);
				Hierarchy ch = constructHierarchy(e);
				hierarchies.add(ch);
				ch.setConditions(constructConditions(DomUtil.getChildElements(
						e, HIERARCHY_CONDITION), ch.getAlias()));
				ch.setOrderbys(constructOrderbys(DomUtil.getChildElements(e,
						HIERARCHY_ORDERBY), ch.getAlias()));
			}
			hierarchy.setHierarchies(hierarchies);
		}
		return hierarchy;
	}
}
