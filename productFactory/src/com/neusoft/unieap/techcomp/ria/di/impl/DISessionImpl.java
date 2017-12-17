package com.neusoft.unieap.techcomp.ria.di.impl;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.collection.PersistentCollection;
import org.hibernate.engine.CollectionEntry;
import org.hibernate.engine.EntityEntry;
import org.hibernate.impl.SessionImpl;
import org.hibernate.persister.entity.EntityPersister;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.util.ReflectionUtils;

import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.base.dao.BaseHibernateDAO;
import com.neusoft.unieap.core.context.UnieapRequestContextHolder;
import com.neusoft.unieap.core.di.DISession;
import com.neusoft.unieap.core.di.DOHierarchy;
import com.neusoft.unieap.core.di.DOHierarchyContext;
import com.neusoft.unieap.core.di.DomainObject;
import com.neusoft.unieap.core.di.Hierarchy;
import com.neusoft.unieap.core.di.HqlPlan;
import com.neusoft.unieap.core.di.event.LogicDeleteEvent;
import com.neusoft.unieap.core.di.event.PhysicalDeleteEvent;
import com.neusoft.unieap.core.exception.UniEAPException;
import com.neusoft.unieap.techcomp.ria.hibernate.HibernateUtil;
import com.neusoft.unieap.techcomp.ria.util.PojoContextUtil;
import com.neusoft.unieap.techcomp.ria.util.PojoUtil;

public class DISessionImpl implements DISession, ApplicationListener {

	final Log logger = LogFactory.getLog(DISessionImpl.class);

	//	private BaseHibernateDAO dao;
	private HibernateTemplate hibernateTemplate;
//	public void setHibernateTemplate(HibernateTemplate hibernateTemplate)
//	{
//		this.hibernateTemplate=hibernateTemplate;
//		Map<String, DOHierarchy> hierarchyMap = DOHierarchyContext.getContext()
//		.getHierarchyMap();
//		if (hierarchyMap.size() > 0) {
//			Iterator<Entry<String, DOHierarchy>> it = hierarchyMap.entrySet()
//					.iterator();
//			while (it.hasNext()) {
//				DOHierarchy doHierarchy = it.next().getValue();
//				String clazz = doHierarchy.getClazz();
//				List<Hierarchy> hierarchies = doHierarchy.getHierarchies();
//				if (validLogicDelete(clazz)) {
//					doHierarchy.setLogicDelete(true, true);
//				}
//				if (hierarchies != null && hierarchies.size() > 0) {
//					for (Hierarchy h : hierarchies) {
//						parseHierarchyLogicDelete(h);
//					}
//				}
//			}
//		}
//	}
	public Session getCurrentSession() {
		
      return ((!(this.hibernateTemplate.isAllowCreate())) ? SessionFactoryUtils.getSession(hibernateTemplate.getSessionFactory(), false) : SessionFactoryUtils.getSession(hibernateTemplate.getSessionFactory(), this.hibernateTemplate.getEntityInterceptor(), this.hibernateTemplate.getJdbcExceptionTranslator()));
	}
	public HibernateTemplate getHibernateTemplate()
	{
		return this.hibernateTemplate;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
//		if (this.dao == null) {
//			this.dao = new BaseHibernateDAO();
//		}
//		this.dao.setSessionFactory(sessionFactory);
		if ((this.hibernateTemplate == null) || (sessionFactory != this.hibernateTemplate.getSessionFactory()))
		{
			this.hibernateTemplate = new HibernateTemplate(sessionFactory);
		}
		// 设置逻辑删除状态
		Map<String, DOHierarchy> hierarchyMap = DOHierarchyContext.getContext()
				.getHierarchyMap();
		if (hierarchyMap.size() > 0) {
			Iterator<Entry<String, DOHierarchy>> it = hierarchyMap.entrySet()
					.iterator();
			while (it.hasNext()) {
				DOHierarchy doHierarchy = it.next().getValue();
				String clazz = doHierarchy.getClazz();
				List<Hierarchy> hierarchies = doHierarchy.getHierarchies();
				if (validLogicDelete(clazz)) {
					doHierarchy.setLogicDelete(true, true);
				}
				try
				{
				if (hierarchies != null && hierarchies.size() > 0) {
					for (Hierarchy h : hierarchies) {
						parseHierarchyLogicDelete(h);
					}
				}
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 设置下面集合的逻辑删除状态
	 * 
	 * @param h
	 */
	private void parseHierarchyLogicDelete(Hierarchy h) {
		if (h.isPersist()) {
			if (validLogicDelete(h.getClazz())) {
				if (h.isCollection()) {
					h.setLogicDelete(true, true);
				} else {
					h.setLogicDelete(true, false);
				}
			}
			List<Hierarchy> hierarchies = h.getHierarchies();
			if (hierarchies != null && hierarchies.size() > 0) {
				for (Hierarchy ch : hierarchies) {
					parseHierarchyLogicDelete(ch);
				}
			}
		}
	}

	public Object loadDO(String doHierarchy, Map<String, Object> params) {
		Map<String, Object> tparams = new HashMap<String, Object>();
		if (params != null) {
			tparams.putAll(params);
		}
		String doContextKey = getDOContextKey(doHierarchy, params);
		Object doObject = UnieapRequestContextHolder.getRequestContext().get(
				doContextKey);
		DOHierarchy hierarchy = DOHierarchyContext.getContext()
				.getHierarchyByName(doHierarchy);
		if (doObject == null) {
			HqlPlan hqlPlan = hierarchy.getHQL(tparams,false);
			doObject = loadDO(hqlPlan.getParamkeys(), hierarchy
					.getHierarchies(), hierarchy.getId(), hqlPlan.getHql(),
					tparams);
			UnieapRequestContextHolder.getRequestContext().put(doContextKey,
					doObject);
		} else {
			logger.warn("重复加载领域对象：" + hierarchy.getClazz() + "!");
		}
		return doObject;
	}

	public List loadDOs(String doHierarchy, Map<String, Object> params) {
		Map<String, Object> tparams = new HashMap<String, Object>();
		if (params != null) {
			tparams.putAll(params);
		}
		String doContextKey = getDOContextKey(doHierarchy, params);
		List doList = (List) UnieapRequestContextHolder.getRequestContext()
				.get(doContextKey);
		final DOHierarchy hierarchy = DOHierarchyContext.getContext()
				.getHierarchyByName(doHierarchy);
		if (doList == null) {
			// load
			HqlPlan hqlPlan = hierarchy.getHQL(tparams,true);
			doList = loadDOs(hqlPlan.getParamkeys(),
					hierarchy.getHierarchies(), hierarchy.getId(), hqlPlan
							.getHql(), tparams);
			UnieapRequestContextHolder.getRequestContext().put(doContextKey,
					doList);
		} else {
			logger.warn("重复加载领域对象：" + hierarchy.getClazz() + "!");
		}
		return doList;
	}

	private List loadDOs(final List<String> paramKeyList,
			final List<Hierarchy> hierarchies, final String idStr,
			final String hql, final Map<String, Object> params) {
		return (List) hibernateTemplate.execute(
				new HibernateCallback() {
					public List doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						setParams(params, query, paramKeyList);
						List list = query.list();
						for (Object object : list) {
							loadHierarchies(session, object, idStr,
									hierarchies, params);
						}
						PojoContextUtil.setPojoContext(list, (SessionImpl) getCurrentSession());
						return list;
					}
				});
	}

	private void loadHierarchies(Session session, Object object, String idStr,
			List<Hierarchy> hierarchies, Map<String, Object> params) {
		if (hierarchies != null && hierarchies.size() > 0) {
			for (Hierarchy hierarchy : hierarchies) {
				loadDOHierarchy(session, object, idStr, hierarchy, params);

			}
		}
	}

	/**
	 * 通过集合加载的时候没有考虑condition
	 * 
	 * @param session
	 * @param object
	 * @param pidStr
	 * @param hierarchy
	 * @param params
	 */
	private void loadDOHierarchy(Session session, Object object, String pidStr,
			Hierarchy hierarchy, Map<String, Object> params) {
		String propertyName = hierarchy.getPropertyName();
		Object targetObject = null;
		try {
			targetObject = PropertyUtils.getProperty(object, propertyName);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		if (targetObject != null && hierarchy.isPersist()) {
			if (hierarchy.isLazy()) {
				HqlPlan hqlPlan = hierarchy.getLazyHQL(pidStr, params);
				String lazyHQL = hqlPlan.getHql();
				if (lazyHQL != null && lazyHQL.length() > 0) {
					try {
						Query query = session.createQuery(lazyHQL);
						// 设置命名参数的值，首先将外键关联id的key放入params中
						if (hierarchy.isCollection()) {
							params.put(hierarchy.getLazyParamKey(),
									PropertyUtils.getProperty(object, pidStr));
						} else {
							params.put(hierarchy.getLazyParamKey(),
									PropertyUtils.getProperty(targetObject,
											hierarchy.getId()));
						}
						setParams(params, query, hqlPlan.getParamkeys());
						if (hierarchy.isCollection()) {
							// 首先设置不让hibernate去自动加载，通过反射设置其私有属性
							Field initializedField = ReflectionUtils.findField(
									targetObject.getClass(), "initialized");
							initializedField.setAccessible(true);
							ReflectionUtils.setField(initializedField,
									targetObject, true);
							Field initializingField = ReflectionUtils
									.findField(targetObject.getClass(),
											"initializing");
							initializingField.setAccessible(true);
							ReflectionUtils.setField(initializingField,
									targetObject, false);
							Field setField = ReflectionUtils.findField(
									targetObject.getClass(), "set");
							setField.setAccessible(true);
							ReflectionUtils.setField(setField, targetObject,
									new LinkedHashSet());
							// 如果是集合,假设使用的是Set
							List list = query.list();
							PojoContextUtil.setPojoContext(list,
									(SessionImpl) getCurrentSession());
							((Set) targetObject).addAll(list);
							CollectionEntry collectionEntry = ((SessionImpl) getCurrentSession())
									.getPersistenceContext()
									.getCollectionEntryOrNull(targetObject);
							// 设置快照
							if (collectionEntry != null) {
								Serializable snapshot = ((PersistentCollection) targetObject)
										.getSnapshot(collectionEntry
												.getLoadedPersister());
								Field snapshotField = ReflectionUtils
										.findField(collectionEntry.getClass(),
												"snapshot");
								snapshotField.setAccessible(true);
								ReflectionUtils.setField(snapshotField,
										collectionEntry, snapshot);
								((PersistentCollection) targetObject)
										.setSnapshot(collectionEntry
												.getLoadedKey(),
												collectionEntry.getRole(),
												snapshot);
							}
							// 需要将其脏状态变为false，否则事务提交时会flush集合
							Field dirtyField = ReflectionUtils.findField(
									targetObject.getClass(), "dirty");
							dirtyField.setAccessible(true);
							ReflectionUtils.setField(dirtyField, targetObject,
									false);
						} else {
							// 首先清除1级缓存中的代理对象，否则查询之后的都是cglib代理
							session.evict(targetObject);
							targetObject = query.uniqueResult();
							// hibernate
							// FlushMode设置为AUTO时，非只读事务开启进行查询时，会将一级缓存的对象进行flush，这时候会将关联proxy
							// object重新reassociateProxy
							// 所以在非只读查询出来还是代理对象
							// if (targetObject instanceof HibernateProxy) {
							// targetObject = ((HibernateProxy) targetObject)
							// .getHibernateLazyInitializer()
							// .getImplementation();
							// }
							targetObject = ((SessionImpl) getCurrentSession())
									.getPersistenceContext()
									.unproxyAndReassociate(targetObject);
							List list = new ArrayList();
							list.add(targetObject);
							PojoContextUtil.setPojoContext(list,
									(SessionImpl) getCurrentSession());
							if (hierarchy.isLogicDelete()) {
								if ((Integer) PropertyUtils.getProperty(
										targetObject,
										DomainObject.Delete_Status_Property) == DomainObject.Logical_Deleted) {
									logger.warn("关联的领域对象："
											+ hierarchy.getClazz()
											+ "已经被逻辑删除，领域对象："
											+ object.getClass()
													.getCanonicalName()
											+ "是否也应该被逻辑删除" + "?");
								}
							}
						}
						PropertyUtils.setProperty(object, propertyName,
								targetObject);
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					} catch (NoSuchMethodException e) {
						e.printStackTrace();
					}
				}
			}
			if (hierarchy.isCollection()) {
				Iterator it = ((Set) targetObject).iterator();
				while (it.hasNext()) {
					List<Hierarchy> hierarchies = hierarchy.getHierarchies();
					targetObject = it.next();
					if (hierarchies != null && hierarchies.size() > 0) {
						for (Hierarchy h : hierarchies) {
							loadDOHierarchy(session, targetObject, hierarchy
									.getId(), h, params);
						}
					}
				}
			} else {
				List<Hierarchy> hierarchies = hierarchy.getHierarchies();
				if (hierarchies != null && hierarchies.size() > 0) {
					for (Hierarchy h : hierarchies) {
						loadDOHierarchy(session, targetObject, hierarchy
								.getId(), h, params);
					}
				}
			}
		}
	}

	/**
	 * 设置查询参数，如果是in或者not in这种形式，可以采用设置List或者Object[]来传递参数
	 * 
	 * @param params
	 * @param query
	 * @param paramKeyList
	 */
	private void setParams(Map<String, Object> params, Query query,
			List<String> paramKeyList) {
		if (paramKeyList != null && paramKeyList.size() > 0) {
			for (String paramKey : paramKeyList) {
				Object object = params.get(paramKey);
				if (object != null) {
					if (object instanceof Collection) {
						query.setParameterList(paramKey, (Collection) object);
					} else if (object instanceof Object[]) {
						query.setParameterList(paramKey, (Object[]) object);
					} else {
						query.setParameter(paramKey, object);
					}
				} else {
					query.setParameter(paramKey, object);
				}
			}
		}
	}

	private Object loadDO(final List<String> paramKeyList,
			final List<Hierarchy> hierarchies, final String idStr,
			final String hql, final Map<String, Object> params) {
		Object doObject = (Object) hibernateTemplate.execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						setParams(params, query, paramKeyList);
						Object uniqueResult = query.uniqueResult();
						if (uniqueResult != null) {
							loadHierarchies(session, uniqueResult, idStr,
									hierarchies, params);
							List list = new ArrayList();
							list.add(uniqueResult);
							PojoContextUtil.setPojoContext(list,
									(SessionImpl) getCurrentSession());
						}
						return uniqueResult;
					}
				});
		return doObject;
	}

	private String getDOContextKey(String doHierarchy,
			Map<String, Object> params) {
		StringBuilder sb = new StringBuilder();
		sb.append(DISession.DOContextKeyPrefix).append(doHierarchy);
		Iterator<Entry<String, Object>> it = params.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Object> entry = it.next();
			Object value = entry.getValue();
			sb.append(entry.getKey() + (value == null ? "" : value.toString()));
		}
		return sb.toString();
	}

	/**
	 * 1. merge方法根据当前前台组装的do对象的id以及加载层次进行加载持久态的do
	 * <p>
	 * 2. 取出前台变化的属性
	 * <p>
	 * 3. 将变化的属性赋值到持久态的do中去
	 * <p>
	 * 4. 将新增的对象，根据加载层次，合并到持久态的do中去
	 */
	/**public void merge(String doHierarchy, Object doObject) {
		merge(doHierarchy, doObject, null);
	}**/

	/**
	 * 1. merge方法根据当前前台组装的do对象的id以及加载层次进行加载持久态的do
	 * <p>
	 * 2. 取出前台变化的属性
	 * <p>
	 * 3. 将变化的属性赋值到持久态的do中去
	 * <p>
	 * 4. 将新增的对象，根据加载层次，合并到持久态的do中去
	 */
	public void merge(String doHierarchy, Object doObject,
			Map<String, Object> params) {
		DOHierarchy hierarchy = DOHierarchyContext.getContext()
				.getHierarchyByName(doHierarchy);
		if (params == null) {
			params = new HashMap<String, Object>();
		}
		List<Hierarchy> hierarchies = hierarchy.getHierarchies();
		if (hierarchies != null && hierarchies.size() > 0) {
			String idStr = hierarchy.getId();
			for (Hierarchy h : hierarchies) {
				mergeHierarchy(doObject, h, idStr, params);
			}
		}
	}

	/**
	 * 按照加载层次判断DO中每个对象的状态，如果是未加载状态，执行sql查询
	 * <p>
	 * 对于集合类型的处理：如果集合size为0或者其中的对象有一个没有加载，认为没有加载（不会为null）
	 * <p>
	 * 加载完成之后需要修改其旧值
	 * 
	 * @param object
	 * @param h
	 * @param pidStr
	 * @param params
	 */
	private void mergeHierarchy(Object object, Hierarchy h, String pidStr,
			Map<String, Object> params) {
		try {
			Object property = PropertyUtils.getProperty(object, h
					.getPropertyName());
			if (property != null) {
				String idStr = h.getId();
				String clazz = h.getClazz();
				boolean unload = false;
				Object targetId = null;
				// 如果是集合，需要判断集合里面的元素
				if (h.isCollection()) {
					if (((Set) property).size() > 0) {
						Iterator it = ((Set) property).iterator();
						while (it.hasNext()) {
							if (unload(it.next(), idStr, clazz)) {
								unload = true;
								break;
							}
						}
					} else {
						unload = true;
					}
					// one to many需要取one端的id
					targetId = PropertyUtils.getProperty(object, pidStr);
				} else if (unload(property, idStr, clazz)) {
					unload = true;
					// many to one对象直接根据当前懒加载对象加载即可
					targetId = PropertyUtils.getProperty(property, idStr);
				}
				List<Hierarchy> chs = h.getHierarchies();
				if (unload) {
					params.put(h.getLazyParamKey(), targetId);
					Object newDOObject = null;

					HqlPlan hqlPlan = h.getLazyHQL(pidStr, params);
					String lazyHQL = hqlPlan.getHql();
					List<String> paramkeys = hqlPlan.getParamkeys();
					if (h.isCollection()) {
						// 查询的时候已经更新过PojoContext
						List newDOList = loadDOs(paramkeys, chs, idStr,
								lazyHQL, params);
						if (((Set) property).size() > 0) {
							// Iterator oit = ((Set) property).iterator();
							// while (oit.hasNext()) {
							// Object oldObject = oit.next();
							// Object id = PropertyUtils.getProperty(
							// oldObject, idStr);
							// Iterator nit = newDOList.iterator();
							// while (nit.hasNext()) {
							// Object newObject = nit.next();
							// if (id.equals(PropertyUtils.getProperty(
							// newObject, idStr))) {
							// PojoContextUtil.setOriginPojo(
							// oldObject, newObject);
							// }
							// }
							// }
							// 清空原集合
							((Set) property).clear();
						}
						// 加入加载后的list
						((Set) property).addAll(newDOList);
						newDOObject = property;
					} else {
						// 同时也要更新旧值，否则认为是变化的，导致多执行了sql语句
						// 查询的时候已经更新过PojoContext
						newDOObject = loadDO(paramkeys, chs, idStr, lazyHQL,
								params);
						// PojoContextUtil.setOriginPojo(property, newDOObject);
						// PropertyUtils.setProperty(PojoContextUtil
						// .getOriginPojo(object), h.getPropertyName(),
						// newDOObject);
					}
					PropertyUtils.setProperty(object, h.getPropertyName(),
							newDOObject);
				} else {
					List<Hierarchy> hierarchies = chs;
					if (hierarchies != null && hierarchies.size() > 0) {
						for (Hierarchy hierarchy : hierarchies) {
							mergeHierarchy(property, hierarchy, idStr, params);
						}
					}
				}
			}
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 持久化do对象，只需要对其中的没有id字段的进行save即可，其他对象已经是持久态
	 * <p>
	 * 1. 判断是否是持久态
	 * <p>
	 * 2. 托管态的话比较是否是脏数据，是的话需要saveOrUpdate
	 * 
	 * 遍历加载层级，持久化没有id字段的对象
	 */
	public void persist(String doHierarchyStr, Object doObject) {
		DOHierarchy doHierarchy = DOHierarchyContext.getContext()
				.getHierarchyByName(doHierarchyStr);
		List<Hierarchy> hierarchies = doHierarchy.getHierarchies();
		persistDOAndHierarchies(doObject, doHierarchy, hierarchies);
	}

	/**
	 * 拆分成集合和基本层次，新增对象，应该先持久化one端，再将one端set到集合中，再持久化集合
	 * 
	 * @param doObject
	 * @param doHierarchy
	 * @param hierarchies
	 */
	private void persistDOAndHierarchies(Object doObject,
			DOHierarchy doHierarchy, List<Hierarchy> hierarchies) {
		String clazz = doHierarchy.getClazz();
		if (doHierarchy.isPersist()) {
			int entityState = HibernateUtil.getEntityState(getCurrentSession(), doObject, clazz);
			if (entityState == TRANSIENT) {
				List<Hierarchy> collectionHierarchies = new ArrayList<Hierarchy>();
				List<Hierarchy> firstPersistHierarchies = new ArrayList<Hierarchy>();
				if (hierarchies != null && hierarchies.size() > 0) {
					// 先save 非collection的hierarchy
					firstPersistHierarchies.addAll(hierarchies);
					Iterator<Hierarchy> it = firstPersistHierarchies.iterator();
					while (it.hasNext()) {
						Hierarchy hierarchy = it.next();
						if (hierarchy.isCollection()) {
							collectionHierarchies.add(hierarchy);
							it.remove();
						}
					}
				}
				persistHierarchies(firstPersistHierarchies, doObject);
				persistDO(doObject, entityState, doHierarchy.getId(),
						firstPersistHierarchies);
				if (collectionHierarchies != null
						&& collectionHierarchies.size() > 0) {
					// 给many端对象设置one端的id
					for (Hierarchy hierarchy : collectionHierarchies) {
						String foreignKey = hierarchy.getForeignKey();
						String propertyName = hierarchy.getPropertyName();
						try {
							Set set = (Set) PropertyUtils.getProperty(doObject,
									propertyName);
							Iterator iterator = set.iterator();
							while (iterator.hasNext()) {
								PropertyUtils.setProperty(iterator.next(),
										foreignKey, doObject);
							}
						} catch (IllegalAccessException e) {
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							e.printStackTrace();
						} catch (NoSuchMethodException e) {
							e.printStackTrace();
						}
					}
					persistHierarchies(collectionHierarchies, doObject);
				}
			} else {
				persistHierarchies(hierarchies, doObject);
				persistDO(doObject, entityState, doHierarchy.getId(),
						hierarchies);
			}
		}
	}

	private void persistDO(Object doObject, int entityState, String idStr,
			List<Hierarchy> hierarchies) {
		switch (entityState) {
		case DETACHED:
			// 如果是非托管态，并且修改过（级联对象除了id以外的属性被修改过，不应该保存），需要saveOrUpdate
			List<String> modifiedProperties = PojoContextUtil
					.getModifiedProperties(doObject);
			boolean modified = false;
			if (modifiedProperties != null && modifiedProperties.size() > 0) {
				String className = doObject.getClass().getCanonicalName();
				for (String modifiedProperty : modifiedProperties) {
					if (modified) {
						break;
					}
					String[] properties = modifiedProperty.split("\\.");
					String refObjName = properties[0];
					if (properties.length > 1) {
						// 如果该属性是component的属性变化
						if (isComponentType(className, refObjName)) {
							modified = true;
						}
						// 判断是否是关联属性的外键，通过加载层次来判断，修改的属性肯定在加载层次中，并且该层次必须为持久化的层次
						else if (hierarchies != null && hierarchies.size() > 0) {
							String refObjPropertyName = properties[1];
							for (Hierarchy hierarchy : hierarchies) {
								if (hierarchy.isPersist()
										&& hierarchy.getPropertyName().equals(
												refObjName)
										&& hierarchy.getId().equals(
												refObjPropertyName)) {
									modified = true;
									break;
								}
							}
						}
					} else {
						boolean isRefObj = false;
						if (hierarchies != null && hierarchies.size() > 0) {
							for (Hierarchy hierarchy : hierarchies) {
								if (hierarchy.getPropertyName().equals(
										refObjName)) {
									isRefObj = true;
									break;
								}
							}
						}
						// 非外键关联的属性变化了
						if (!isRefObj) {
							modified = true;
						}
					}
				}
			}
			if (modified) {
				// 如果用saveOrupdate接口，如果主键不是自动生成，那么会执行sql语句去查询
				hibernateTemplate.update(doObject);
			}
			return;
		case PERSISTENT:
			// 持久态的处理
			// 不显示调用save、saveOrUpdate、update则不会进入相应的listener
			// 而是通过一级缓存状态进行，在FlushEntityListener中进行的判断
			return;
		case TRANSIENT:
			// 瞬时对象处理
			hibernateTemplate.save(doObject);
			return;
		default: // DELETED
			return;
		}
	}

	private void persistHierarchy(Object doObject, Hierarchy hierarchy) {
		Object property = null;
		try {
			property = PropertyUtils.getProperty(doObject, hierarchy
					.getPropertyName());
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		if (property != null) {
			List<Hierarchy> hierarchies = hierarchy.getHierarchies();
			if (hierarchy.isCollection()) {
				// 遍历集合中属性
				Collection newCollection = (Collection) property;
				Iterator nit = newCollection.iterator();
				while (nit.hasNext()) {
					Object newObject = nit.next();
					persistDOAndHierarchies(newObject, hierarchy, hierarchies);
				}
			} else {
				persistDOAndHierarchies(property, hierarchy, hierarchies);
			}
		}

	}

	private void persistHierarchies(List<Hierarchy> hierarchies, Object object) {
		if (hierarchies != null && hierarchies.size() > 0) {
			for (Hierarchy h : hierarchies) {
				persistHierarchy(object, h);
			}
		}
	}

	/**
	 * 判断是否未加载状态
	 * <p>
	 * 1. 不在一级缓存中，并且id不为null
	 * <p>
	 * 2. 不是新增状态
	 * <p>
	 * 3. 不是修改状态
	 * <p>
	 * 4. 所有属性都是null
	 * <p>
	 * 5. original对象不为null并且不是EntityEntry这种类型，标识是从前台传过来的对象
	 * 
	 * @param entity
	 * @param entityName
	 * @return
	 */
	private boolean unload(Object entity, String idStr, String entityName) {
		int entityState = HibernateUtil.getEntityState(getCurrentSession(),
				entity, entityName);
		if (entityState == DETACHED && !PojoContextUtil.isNewModified(entity)
				&& !PojoContextUtil.isDataModified(entity)) {
			Object originPojo = PojoContextUtil.getOriginPojo(entity);
			if (originPojo != null) {
				if (!(originPojo instanceof EntityEntry)) {
					try {
						Set<String> entityProperties = PojoUtil
								.getEntityProperties(entity.getClass());
						Iterator<String> it = entityProperties.iterator();
						while (it.hasNext()) {
							String propertyName = it.next();
							if (propertyName.indexOf('.') > 0
									|| propertyName.equals(idStr)) {
								continue;
							}
							if (PropertyUtils.getProperty(entity, propertyName) != null) {
								return false;
							}
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					return true;
				}
			} else {
				return true;
			}
		}
		return false;
	}

	/**
	 * 领域对象删除事件监听
	 */
	public void onApplicationEvent(ApplicationEvent event) {
		if (event instanceof LogicDeleteEvent) {
			// 判断是否是合法的逻辑删除，否则不update
			Object entity = ((LogicDeleteEvent) event).getEntity();
			String className = entity.getClass().getCanonicalName();
			if (validLogicDelete(className)) {
				try {
					PropertyUtils.setProperty(entity, DomainObject.Delete_Status_Property, 1);
				} catch (Exception e) {
					logger.error("设置对象的逻辑删除标志位错误，请检查对应的对象是否有字段"+DomainObject.Delete_Status_Property);
					throw new RuntimeException(e.getCause());
				}
				hibernateTemplate.update(entity);
			} else {
				logger.warn("领域对象：" + className + "不支持逻辑删除操作，请增加持久化属性"
						+ DomainObject.Delete_Status_Property + "!");
			}
		} else if (event instanceof PhysicalDeleteEvent) {
			hibernateTemplate.delete(
					((PhysicalDeleteEvent) event).getEntity());
			this.getCurrentSession().flush();
		}
	}

	/**
	 * 判断是否是合法的逻辑删除
	 * 
	 * @param entity
	 * @param persister
	 * @return
	 */
	private boolean validLogicDelete(String className) {
		return isPersisterProperty(className,
				DomainObject.Delete_Status_Property);
	}

	/**
	 * 判断实体中某一属性是否为component
	 * 
	 * @param className
	 * @param propertyName
	 * @return
	 */
	private boolean isComponentType(String className, String propertyName) {
		if (isPersisterProperty(className, propertyName)
				&& getEntityPersister(className).getPropertyType(propertyName)
						.getName().startsWith("component[")) {
			return true;
		}
		return false;
	}

	/**
	 * 判断实体中某一属性是否为持久化属性
	 * 
	 * @param className
	 * @param propertyName
	 * @return
	 */
	private boolean isPersisterProperty(String className, String propertyName) {
		boolean persist = true;
		try {
			getEntityPersister(className).getPropertyType(propertyName);
		} catch (Exception e) {
			persist = false;
		}
		return persist;
	}

	private EntityPersister getEntityPersister(String className) {
		EntityPersister persister = (EntityPersister) hibernateTemplate.getSessionFactory()
				.getAllClassMetadata().get(className);
		return persister;
	}
	/**
	 * 分页查询出结果
	 * 
	 * @param doHierarchy
	 * @param params
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public Object loadDOsByPage(String doHierarchy, Map<String, Object> params,
			int pageNumber, int pageSize) {
		Map<String, Object> tparams = new HashMap<String, Object>();
		if (params != null) {
			tparams.putAll(params);
		}
		String doContextKey = getDOContextKey(doHierarchy, params);
		QueryResult result = (QueryResult) UnieapRequestContextHolder
				.getRequestContext().get(doContextKey);
		final DOHierarchy hierarchy = DOHierarchyContext.getContext()
				.getHierarchyByName(doHierarchy);
		if (result == null) {
			// load
			HqlPlan hqlPlan = hierarchy.getHQL(tparams,true);
			result = getPageContent(hqlPlan.getParamkeys(), hierarchy
					.getHierarchies(), hierarchy.getId(), hqlPlan.getHql(),
					tparams, pageNumber, pageSize);
			UnieapRequestContextHolder.getRequestContext().put(doContextKey,
					result);
		} else {
			logger.warn("重复加载领域对象：" + hierarchy.getClazz() + "!");
		}
		return result;
	}

	public void persistDOs(String doHierarchy, List<Object> doObjects) {
		if (doObjects != null && doObjects.size() > 0) {
			for (int i = 0; i < doObjects.size(); i++) {
				persist(doHierarchy, doObjects.get(i));
			}
		}
	}

	/**
	 * 分页查询出列表数据
	 * 
	 * @param paramKeyList
	 * @param hierarchies
	 * @param idStr
	 * @param hql
	 * @param params
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings( { "unchecked", "unused" })
	private <T> QueryResult getPageContent(final List<String> paramKeyList,
			final List<Hierarchy> hierarchies, final String idStr,
			final String hql, final Map<String, Object> params,
			final int pageNumber, final int pageSize) {
		int totalCount = (Integer) hibernateTemplate.execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
//						String totalSql = "select count(*) as recordCount "
//								+ hql.replaceAll("left\\s*join\\s*fetch",
//										" left join ");
						String tempquery = hql.toLowerCase();
						int fromSign = tempquery.indexOf("from");
						int selectSign = tempquery.indexOf("select");
						StringBuffer strBuf = new StringBuffer();
						if (selectSign >= 0 && selectSign < fromSign) {
							tempquery = hql.substring(selectSign, fromSign);
							int distinct = tempquery.indexOf("distinct");
							if (distinct >= 0) {
								tempquery = tempquery.replaceAll("\\(", "").replaceAll("\\)", "");
							}
							strBuf.append("select count(").append(
									tempquery.substring(selectSign + 6, tempquery.length())).append(") ");
						} else {
							strBuf.append("select count(*) ");
						}
						final String totalSql = strBuf.append(
								(hql.substring(fromSign)).replaceAll("(?i)fetch", ""))
								.toString();
						Query query = session.createQuery(totalSql);
						if (paramKeyList != null && paramKeyList.size() > 0) {
							setParams(params, query, paramKeyList);
						}
						return ((Long) query.uniqueResult()).intValue();
					}
				});
		List<T> rt = (List<T>) hibernateTemplate.execute(
				new HibernateCallback() {
					public List doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						if (pageSize > 0) {
							query.setMaxResults(pageSize);
							query.setFirstResult((pageNumber - 1) * pageSize);
						}
						if (paramKeyList != null && paramKeyList.size() > 0) {
							setParams(params, query, paramKeyList);
						}
						List list = query.list();
						for (Object object : list) {
							loadHierarchies(session, object, idStr,
									hierarchies, params);
						}
						return list;
					}
				});
		return new QueryResult(rt, totalCount, pageSize, pageNumber);
	}
}
