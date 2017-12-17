package com.neusoft.unieap.core.di;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * many to one没有condition
 * <p>
 * one to many可以设置condition
 * 
 * @author hcq
 * 
 */
public class Hierarchy extends DOHierarchy {
	/**
	 * 外键键字段名
	 */
	private String foreignKey;
	/**
	 * 属性名
	 */
	private String propertyName;
	/**
	 * 关联类型
	 */
	private String joinType;
	/**
	 * 表示是否懒加载
	 */
	private boolean lazy;

	/**
	 * 是否是集合
	 */
	private boolean collection;

	public boolean isCollection() {
		return collection;
	}

	public void setCollection(boolean collection) {
		this.collection = collection;
	}

	public String getJoinType() {
		return joinType;
	}

	public void setJoinType(String joinType) {
		this.joinType = joinType;
	}

	public boolean isLazy() {
		return lazy;
	}

	public void setLazy(boolean lazy) {
		this.lazy = lazy;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getForeignKey() {
		return foreignKey;
	}

	public void setForeignKey(String foreignKey) {
		this.foreignKey = foreignKey;
	}

	/**
	 * 
	 * @param alias
	 *            ：主表的别名
	 * @return
	 */
	public String getHQL(String alias) {
		StringBuilder sb = new StringBuilder();
		sb.append("left join fetch ").append(alias).append(".").append(
				propertyName).append(" ").append(getAlias()).append(" ");
		return sb.toString();
	}

	/**
	 * 集合懒加载时带条件的HQL语句，如果返回""
	 * 
	 * @param id
	 *            ：主表的id字段名
	 * @return
	 */
	public HqlPlan getLazyHQL(String id, Map<String, Object> params) {
		HqlPlan hqlPlan = new HqlPlan();
		List<String> paramkeys = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();
		String alias = getAlias();
		sb.append("from " + getClazz() + " " + alias + " ");

		List<Condition> conditionList = new ArrayList<Condition>();
		List<Condition> conditions = getConditions();
		List<Orderby> orderbys = getOrderbys();
		// 先加入根节点的查询条件
		if (conditions != null && conditions.size() > 0) {
			conditionList.addAll(conditions);
		}
		List<Orderby> orderbyList = new ArrayList<Orderby>();
		// 先加入根节点的排序
		if (orderbys != null && orderbys.size() > 0) {
			orderbyList.addAll(orderbys);
		}

		List<Hierarchy> hierarchies = getHierarchies();
		if (hierarchies != null && hierarchies.size() > 0) {
			for (Hierarchy h : hierarchies) {
				getHierarchyHSQL(sb, h, alias);
				getHierarchyInfo(conditionList, orderbyList, h);
			}
		}
		// Collection要用foreign key
		// many to one用key
		if (collection) {
			sb.append(" where ").append(alias + "." + foreignKey + "." + id)
					.append(" = :" + getLazyParamKey() + " ");
		} else {
			sb.append(" where ").append(alias + "." + getId()).append(
					" = :" + getLazyParamKey() + " ");
		}

		if (conditionList.size() > 0) {
			// 按顺序生成查询条件
			conditionList = sortOrder(conditionList);
			sb.append(getConditions(conditionList, paramkeys, params));
		}

		if (orderbyList.size() > 0) {
			// 按顺序生成排序条件
			orderbyList = sortOrder(orderbyList);
			sb.append(" ").append("order").append(" ").append("by").append(" ")
					.append(getOrderbys(orderbyList));
		}

		// 加入外键关联的id命名key
		paramkeys.add(getLazyParamKey());

		hqlPlan.setHql(sb.toString());
		hqlPlan.setParamkeys(paramkeys);
		return hqlPlan;
	}

	public String getLazyParamKey() {
		if (collection) {
			return getAlias() + "_" + foreignKey + DOHierarchy.NAME_PARAM_ID;
		} else {
			return getAlias() + DOHierarchy.NAME_PARAM_ID;
		}
	}
}
