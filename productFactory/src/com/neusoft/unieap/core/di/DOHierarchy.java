package com.neusoft.unieap.core.di;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.engine.query.ParamLocationRecognizer;

public class DOHierarchy {

	public static final String NAME_PARAM_ID = "_id";

	/**
	 * 加载层次的命名
	 */
	private String name;

	/**
	 * do的类名
	 */
	private String clazz;
	/**
	 * 主键字段的属性
	 */
	private String id;

	private List<Hierarchy> hierarchies;

	/**
	 * 查询条件列表
	 */
	private List<Condition> conditions;
	/**
	 * 排序列表
	 */
	private List<Orderby> orderbys;
	/**
	 * 查询的别名
	 */
	private String alias;
	/**
	 * 是否是dto，默认是TRUE，表示是Entity
	 */
	private boolean persist = true;

	/**
	 * 是否是逻辑删除
	 */
	private boolean logicDelete = false;

	public boolean isLogicDelete() {
		return logicDelete;
	}

	public void setLogicDelete(boolean logicDelete, boolean addCondition) {
		setLogicDelete(logicDelete);
		if (addCondition && logicDelete) {
			// 如果是逻辑删除，那么加在id查询之后
			if (isLogicDelete()) {
				if (conditions == null) {
					conditions = new ArrayList<Condition>();
				}
				int i = 0, s = conditions.size();
				int order = 0;
				if (s > 0) {
					for (; i < s; i++) {
						Condition c = conditions.get(i);
						// 不是动态条件
						if (c.getScript() == null && c.getProperty().equals(id)) {
							order = c.getOrder();
							break;
						}
					}
					if (order > 0) {
						order--;
					}
				}
				Condition condition = new Condition();
				condition.setAlias(alias);
				condition.setOperation("=");
				condition.setProperty(DomainObject.Delete_Status_Property);
				condition.setValue("'" + DomainObject.Exist + "'");
				condition.setOrder(order);
				if (s == 0 || i == s - 1 || i == s) {
					conditions.add(condition);
				} else {
					conditions.add(i + 1, condition);
				}

			}
		}
	}

	public void setLogicDelete(boolean logicDelete) {
		this.logicDelete = logicDelete;
	}

	public boolean isPersist() {
		return persist;
	}

	public void setPersist(boolean persist) {
		this.persist = persist;
	}

	public String getAlias() {
		if (alias == null) {
			alias = DOHierarchyContext.getContext().getDOAlias(clazz);
		}
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public List<Hierarchy> getHierarchies() {
		return hierarchies;
	}

	public void setHierarchies(List<Hierarchy> hierarchies) {
		this.hierarchies = hierarchies;
	}

	public String getClazz() {
		return clazz;
	}

	public void setClazz(String clazz) {
		this.clazz = clazz;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}

	public List<Orderby> getOrderbys() {
		return orderbys;
	}

	public void setOrderbys(List<Orderby> orderbys) {
		this.orderbys = orderbys;
	}

	public HqlPlan getHQL(Map<String, Object> params, boolean listQuery) {
		HqlPlan hqlPlan = new HqlPlan();
		List<String> paramkeyList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();
		List<Condition> conditionList = new ArrayList<Condition>();
		// 先加入根节点的查询条件
		if (conditions != null && conditions.size() > 0) {
			conditionList.addAll(conditions);
		}
		List<Orderby> orderbyList = new ArrayList<Orderby>();
		// 先加入根节点的排序
		if (orderbys != null && orderbys.size() > 0) {
			orderbyList.addAll(orderbys);
		}
		String alias = getAlias();
		// one to many查询的时候，如果通过list()方法，会有冗余记录
		if (listQuery) {
			sb.append("select distinct " + alias + " ");
		}
		sb.append("from " + clazz + " " + alias + " ");
		if (hierarchies != null && hierarchies.size() > 0) {
			for (Hierarchy h : hierarchies) {
				getHierarchyHSQL(sb, h, alias);
				getHierarchyInfo(conditionList, orderbyList, h);
			}
		}

		if (conditionList.size() > 0) {
			// 按顺序生成查询条件
			conditionList = sortOrder(conditionList);
			String conditionStr = getConditions(conditionList, paramkeyList,
					params);
			if (conditionStr != null) {
				conditionStr = conditionStr.trim();
				if (conditionStr.length() > 0) {
					if (conditionStr.startsWith("and")) {
						sb.append(" ").append("where").append(" 1=1 ").append(
								conditionStr);
					} else {
						sb.append(" ").append("where").append(" ").append(
								conditionStr);
					}
				}
			}
		}

		if (orderbyList.size() > 0) {
			// 按顺序生成排序条件
			orderbyList = sortOrder(orderbyList);
			sb.append(" ").append("order").append(" ").append("by").append(" ")
					.append(getOrderbys(orderbyList));
		}

		hqlPlan.setParamkeys(paramkeyList);
		hqlPlan.setHql(sb.toString());
		return hqlPlan;
	}

	protected String getOrderbys(List<Orderby> orderbyList) {
		StringBuilder sb = new StringBuilder(30);
		for (int i = 0, j = orderbyList.size(); i < j; i++) {
			Orderby orderby = orderbyList.get(i);
			if (i > 0) {
				sb.append(",");
			}
			sb.append(orderby.getOrderby());
		}
		return sb.toString();
	}

	protected String getConditions(List<Condition> conditionList,
			List<String> paramkeyList, Map<String, Object> params) {
		StringBuilder sb = new StringBuilder(30);
		for (int i = 0, j = conditionList.size(); i < j; i++) {
			Condition condition = conditionList.get(i);
			if (i > 0) {
				sb.append(" ").append("and").append(" ");
			}
			String conditionStr = condition.getCondition(params);
			sb.append(conditionStr);
			String paramkey = condition.getParamkey();
			if (paramkey != null && paramkey.length() > 0) {
				paramkeyList.add(paramkey);
			} else {
				String script = condition.getScript();
				if (script != null && script.length() > 0) {
					ParamLocationRecognizer recognizer = ParamLocationRecognizer
							.parseLocations(conditionStr);
					Map paramKeyMap = recognizer
							.getNamedParameterDescriptionMap();
					if (paramKeyMap != null && paramKeyMap.size() > 0) {
						Set<String> paramKeySet = paramKeyMap.keySet();
						if (paramKeySet.size() > 0) {
							for (String pk : paramKeySet) {
								paramkeyList.add(pk);
							}
						}
					}
				}
			}
		}
		return sb.toString();
	}

	protected List sortOrder(List orderList) {
		Order[] orderArray = (Order[]) orderList.toArray(new Order[] {});
		Arrays.sort(orderArray);
		return Arrays.asList(orderArray);
	}

	protected void getHierarchyHSQL(StringBuilder sb, Hierarchy h, String alias) {
		if (h.isPersist() && !h.isLazy()) {
			sb.append(h.getHQL(alias));
			List<Hierarchy> hierarchies = h.getHierarchies();
			if (hierarchies != null && hierarchies.size() > 0) {
				for (Hierarchy ch : hierarchies) {
					getHierarchyHSQL(sb, ch, h.getAlias());
				}
			}
		}
	}

	protected void getHierarchyInfo(List<Condition> conditionList,
			List<Orderby> orderbyList, Hierarchy h) {
		if (h.isPersist() && !h.isLazy()) {
			List<Condition> conditions = h.getConditions();
			if (conditions != null) {
				conditionList.addAll(conditions);
			}
			List<Orderby> orderbys = h.getOrderbys();
			if (orderbys != null) {
				orderbyList.addAll(orderbys);
			}
			List<Hierarchy> hierarchies = h.getHierarchies();
			if (hierarchies != null && hierarchies.size() > 0) {
				for (Hierarchy ch : hierarchies) {
					getHierarchyInfo(conditionList, orderbyList, ch);
				}
			}
		}
	}
}
