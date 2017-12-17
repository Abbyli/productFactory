package com.neusoft.unieap.core.di;

import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;

public interface DISession {
	public static final int PERSISTENT = 0;
	public static final int TRANSIENT = 1;
	public static final int DETACHED = 2;
	public static final int DELETED = 3;

	public static final String DOContextKeyPrefix = "DOContextKey_";

	/**
	 * 根据加载层次规则加载DO对象
	 * 
	 * @param doHierarchy
	 * @param params
	 * @return
	 */
	public Object loadDO(String doHierarchy, Map<String, Object> params);

	/**
	 * 根据加载层次规则加载DO对象列表
	 * 
	 * @param doHierarchy
	 * @param params
	 * @return
	 */
	public List loadDOs(String doHierarchy, Map<String, Object> params);

	/**
	 * 根据加载层次加载DO层级，并且与非持久化DO对象进行合并
	 * <p>
	 * 自动检测加载层级中指定对象是否加载过，加载过则不会再进行sql查询
	 * 
	 * @param doHierarchy
	 * @param doObject
	 */
	/*public void merge(String doHierarchy, Object doObject);*/

	/**
	 * 根据加载层次加载DO层级，并且与非持久化DO对象进行合并
	 * <p>
	 * 自动检测加载层级中指定对象是否加载过，加载过则不会再进行sql查询
	 * 
	 * @param doHierarchy
	 * @param doObject
	 * @param params
	 */
	public void merge(String doHierarchy, Object doObject,
			Map<String, Object> params);

	/**
	 * 持久化DO，根据DO的数据状态自动进行save或update
	 * 
	 * @param doHierarchy
	 * @param doObject
	 */
	public void persist(String doHierarchy, Object doObject);
	/**
	 * 持久化DO，根据DO的数据状态自动进行save或update
	 * 
	 * @param doHierarchy
	 * @param doObject
	 */
	public void persistDOs(String doHierarchy, List<Object> doObjects);
	
	/**
	 * 分页查询
	 * @param doHierarchy
	 * @param params
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Object loadDOsByPage(String doHierarchy, Map<String, Object> params,
			int pageNumber, int pageSize);
	public Session getCurrentSession();
	public HibernateTemplate getHibernateTemplate();
}
