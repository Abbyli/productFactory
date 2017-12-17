package com.neusoft.unieap.techcomp.ria.util;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.EntityMode;
import org.hibernate.collection.AbstractPersistentCollection;
import org.hibernate.engine.EntityEntry;
import org.hibernate.engine.Status;
import org.hibernate.impl.SessionImpl;
import org.hibernate.intercept.LazyPropertyInitializer;
import org.hibernate.persister.entity.EntityPersister;
import org.hibernate.tuple.StandardProperty;
import org.hibernate.tuple.entity.EntityMetamodel;
import org.hibernate.type.CollectionType;
import org.hibernate.type.ComponentType;
import org.hibernate.type.Type;
import org.hibernate.util.IdentityMap;

import com.neusoft.unieap.core.exception.UniEAPSystemException;
import com.neusoft.unieap.techcomp.ria.context.util.ContextUtil;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.MetaData;
import com.neusoft.unieap.techcomp.ria.ds.Row;

public class PojoContextUtil {
	private final static Map pojoEntiyProperty = new ConcurrentHashMap();

	public static List createPojoList() {
		com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = new com.neusoft.unieap.techcomp.ria.context.util.ArrayList();
		return pojoList;

	}

	/**
	 * 获取对象某属性的旧值
	 * 
	 * @param pojo
	 *            当传入pojo为集合类时，默认取第一个元素
	 * @param colName
	 *            属性名称
	 *            <p>
	 *            <strong>示例代码:</strong> <blockquote>
	 * 
	 *            <pre>
	 * boolean modify = PojoContextUtil.getOldValue(pojo, &quot;name&quot;);
	 * </pre>
	 * 
	 *            </blockquote>
	 */
	public static Object getOldValue(Object pojo, String colName) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			Object oldObj = pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO);
			if (oldObj instanceof EntityEntry) {
				// 后台
				Map<String, Object> previousProperties = new HashMap<String, Object>();
				Map<String, Object> currentProperties = new HashMap<String, Object>();
				EntityEntry entry = (EntityEntry) oldObj;

				generatePropertiesWithEntityEntry(entry, pojo,
						(SessionImpl) pojoContextMap
								.get(ContextUtil.ORIGIN_DATA_SESSION),
						pojoContext, previousProperties, currentProperties,
						new HashMap(), "");
				if (previousProperties.containsKey(colName)) {
					return previousProperties.get(colName);
				}
			} else {
				// 前台
				return PojoUtil.getValue(oldObj, colName);
			}
		}
		return null;
	}

	/**
	 * 收集属性值
	 * 
	 * @param entry
	 * @param pojo
	 * @param session
	 * @param pojoContext
	 * @param currentStates
	 * @param previousStates
	 * @param context
	 * @param prefix
	 *            上一个属性的名字
	 */
	private static void generatePropertiesWithEntityEntry(EntityEntry entry,
			Object pojo, SessionImpl session, Map pojoContext,
			Map<String, Object> previousProperties,
			Map<String, Object> currentProperties, Map context, String prefix) {
		EntityPersister persister = entry.getPersister();
		// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
		// 添加比较主对象
		context.put(pojo, pojo);
		// 放入主键字段
		String idName = entry.getPersister().getIdentifierPropertyName();
		String keyName = idName;
		if (prefix.length() > 0) {
			keyName = prefix + "." + idName;
		}
		previousProperties.put(keyName, entry.getId());
		try {
			currentProperties.put(keyName, PropertyUtils.getProperty(pojo,
					idName));
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		generateProperties(entry.getLoadedState(), persister.getPropertyValues(
				pojo, session.getEntityMode()), persister.getEntityMetamodel()
				.getProperties(), session, previousProperties,
				currentProperties, pojoContext, context, prefix);
		// 移除比较主对象
		context.remove(pojo);
	}

	/**
	 * 收集属性值的原子类
	 * 
	 * @param previousState
	 * @param currentState
	 * @param properties
	 * @param session
	 * @param propertyStates
	 * @param pojoContext
	 * @param context
	 * @param prefix
	 */
	private static void generateProperties(Object[] previousState,
			Object[] currentState, StandardProperty[] properties,
			SessionImpl session, Map<String, Object> previousProperties,
			Map<String, Object> currentProperties, Map pojoContext,
			Map context, String prefix) {
		int span = properties.length;
		for (int i = 0; i < span; i++) {
			StandardProperty standardProperty = properties[i];
			String name = standardProperty.getName();
			if (prefix.length() > 0) {
				name = prefix + "." + name;
			}
			Type type = standardProperty.getType();
			Object x = previousState[i];
			Object y = currentState[i];
			if (type.isComponentType()) {
				// 对于component类型不想比较两次，直接参照hibernate源码进行搜集状态
				EntityMode entityMode = session.getEntityMode();
				String[] propertyNames = ((ComponentType) type)
						.getPropertyNames();
				Object[] xvalues = null;
				Object[] yvalues = null;
				if (x != null) {
					xvalues = ((ComponentType) type).getPropertyValues(x,
							entityMode);
				} else {
					xvalues = new String[propertyNames.length];
				}
				if (y != null) {
					yvalues = ((ComponentType) type).getPropertyValues(y,
							entityMode);
				} else {
					yvalues = new String[propertyNames.length];
				}
				for (int index = 0; index < xvalues.length; index++) {
					String propertyName = propertyNames[index];
					if (name.length() > 0) {
						propertyName = name + "." + propertyName;
					}
					currentProperties.put(propertyName, yvalues[index]);
					previousProperties.put(propertyName, xvalues[index]);
				}
			} else {
				if (type.isCollectionType() && !isInstrumented(y)) {

				} else if (type.isAssociationType() && !isInstrumented(x)) {
					if (context.containsKey(x)) {
						continue;
					}
					// manyToOne类型处理或者one to one类型处理，除了id相同以外，还需要判断属性是否一致
					Map pojoContextMap = (Map) pojoContext.get(x);
					generatePropertiesWithEntityEntry(
							(EntityEntry) pojoContextMap
									.get(ContextUtil.ORIGIN_DATA_INFO), x,
							(SessionImpl) pojoContextMap
									.get(ContextUtil.ORIGIN_DATA_SESSION),
							pojoContext, previousProperties, currentProperties,
							context, name);
				}
				currentProperties.put(name, y);
				previousProperties.put(name, x);
			}
		}
	}

	/**
	 * 取消所有删除的pojo，策略：如果是modify的直接加到List中即可
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelAllPojoDeleted(List pojoList) {
		if (pojoList == null) {
			return;
		}
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList srcList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoList;
			List deletedObjects = srcList.getDeletedObjects();
			if (deletedObjects.size() > 0) {
				Iterator it = deletedObjects.iterator();
				while (it.hasNext()) {
					Object pojo = it.next();
					it.remove();
					srcList._add(pojo);
				}
			}
		} else {
			for (Object pojo : pojoList) {
				cancelDeleted(pojo);
			}
		}
	}

	/**
	 * 取消所有删除的pojo，策略：如果是modify的直接加到List中即可
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelDeleted(Object pojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList == null) {
				return;
			}
			List deletedObjects = pojoList.getDeletedObjects();
			if (deletedObjects.size() > 0) {
				Iterator it = deletedObjects.iterator();
				while (it.hasNext()) {
					Object o = it.next();
					if (o == pojo) {
						it.remove();
						// 直接加到该list中
						pojoList._add(o);
						break;
					}
				}
			}
		}
	}

	/**
	 * 取消所有新插入的pojo，策略：直接加到该List中即可
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelAllPojoInserted(List pojoList) {
		if (pojoList == null) {
			return;
		}
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList srcList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoList;
			List newObjects = srcList.getNewObjects();
			Map pojoContext = ContextUtil.getPojoContext();
			if (newObjects.size() > 0) {
				Iterator it = newObjects.iterator();
				while (it.hasNext()) {
					Object pojo = it.next();
					// 清空pojo线程变量的缓存
					Object pojoContextMap = pojoContext.get(pojo);
					if (pojoContextMap instanceof Map) {
						((HashMap) pojoContextMap)
								.remove(ContextUtil.ORIGIN_DATA_CONTEXT);
						((HashMap) pojoContextMap)
								.remove(ContextUtil.ORIGIN_DATA_DATASTORE);
						((HashMap) pojoContextMap)
								.remove(ContextUtil.ORIGIN_DATA_DATASTORE_INDEX);
					}
					// 删除新增的pojo
					it.remove();
				}
			}
		} else {
			for (Object pojo : pojoList) {
				cancelInserted(pojo);
			}
		}
	}

	/**
	 * 取消所有新插入的pojo，策略：直接加到该List中即可
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelInserted(Object pojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList == null) {
				return;
			}
			List newObjects = pojoList.getNewObjects();
			if (newObjects.size() > 0) {
				Iterator it = newObjects.iterator();
				while (it.hasNext()) {
					Object o = it.next();
					if (o == pojo) {
						it.remove();
						break;
					}
					// // 直接加到该list中
					// pojoList._add(o);
				}
			}
		}
	}

	/**
	 * 取消所有修改的pojo，策略：还原修改的值
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelAllModifys(List pojoList) {
		if (pojoList == null) {
			return;
		}
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			List modifiedPojoList = getModifiedPojoList(pojoList);
			if (modifiedPojoList.size() > 0) {
				for (Object pojo : modifiedPojoList) {
					cancelModify(pojo);
				}
			}
			List deletedPojoList = getDeletedPojoList(pojoList);
			if (deletedPojoList.size() > 0) {
				for (Object pojo : deletedPojoList) {
					cancelModify(pojo);
				}
			}
		} else {
			for (Object pojo : pojoList) {
				cancelModify(pojo);
			}
		}
	}

	/**
	 * 取消修改的pojo，策略：还原修改的值
	 * 
	 * @param pojoList
	 * @return
	 */
	public static void cancelModify(Object pojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			Object oldObj = pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				// 后台对象
				if (oldObj instanceof EntityEntry) {
					SessionImpl session = (SessionImpl) pojoContextMap
							.get(ContextUtil.ORIGIN_DATA_SESSION);
					cancelModifyWithEntityEntry(session, pojoContext,
							(EntityEntry) oldObj, pojo, new HashMap());
				} else {
					// 前台对象
					try {
						PojoUtil.cancelModidiedProperties(oldObj, pojo);
					} catch (Exception e) {
						e.printStackTrace();
						Throwable cause = e.getCause();
						throw new UniEAPSystemException("", cause, null);
					}
				}
			}
		}
	}

	/**
	 * 取消修改的原子操作，首先从context中取出原始对象的entityEntry，然后再比较还原该对象的每一个属性
	 * 
	 * @param session
	 * @param pojoContext
	 * @param compareContext
	 * @param x
	 * @param y
	 * @return
	 */
	private static void cancelModifyWithEntityEntry(SessionImpl session,
			Map pojoContext, Object oldObj, Object newObj,
			Map<Object, Object> compareContext) {
		if (oldObj != null && oldObj instanceof EntityEntry) {
			EntityEntry entry = (EntityEntry) oldObj;
			EntityPersister persister = entry.getPersister();
			// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
			// 添加比较主对象
			compareContext.put(newObj, newObj);
			EntityMode entityMode = session.getEntityMode();
			EntityMetamodel entityMetamodel = persister.getEntityMetamodel();
			cancelModify(entry.getLoadedState(), persister.getPropertyValues(
					newObj, entityMode), entityMetamodel.getProperties(),
					session, pojoContext, compareContext, entityMetamodel,
					entityMode, newObj);
			// 移除比较主对象
			compareContext.remove(newObj);
		}
	}

	private static void cancelModify(Object[] previousState,
			Object[] currentState, StandardProperty[] properties,
			SessionImpl session, Map pojoContext,
			Map<Object, Object> compareContext,
			EntityMetamodel entityMetamodel, EntityMode entityMode,
			Object newObj) {
		boolean isSame = true;
		int span = properties.length;
		for (int i = 0; i < span; i++) {
			StandardProperty standardProperty = properties[i];
			Type type = standardProperty.getType();
			Object x = previousState[i];
			Object y = currentState[i];
			isSame = !(y != LazyPropertyInitializer.UNFETCHED_PROPERTY
					&& standardProperty.isDirtyCheckable(false) && type
					.isDirty(x, y, session));
			if (type.isCollectionType() && isSame && !isInstrumented(y)) {
				// 集合类型在前面处理，因为它也是一种关联类型
				Iterator elementsIterator = ((CollectionType) type)
						.getElementsIterator(y, session);
				// 首先判断集合中的对象是否已经在比较的上下文中了，如果已经存在，那么说明不需要递归比较集合中的元素了
				boolean needToCascade = true;
				while (elementsIterator.hasNext()) {
					Object o = elementsIterator.next();
					// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
					if (compareContext.containsKey(o)) {
						needToCascade = false;
						break;
					}
				}
				// 如果需要级联比较
				if (needToCascade) {
					elementsIterator = ((CollectionType) type)
							.getElementsIterator(y, session);
					while (elementsIterator.hasNext()) {
						Object o = elementsIterator.next();
						// 这里默认认为是Set或者List类型了，如果是Map类型未考虑
						Map pojoContextMap = (Map) pojoContext.get(o);
						if (!compareObjWithEntityEntry(
								(SessionImpl) pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_SESSION),
								pojoContext, pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_INFO), o,
								compareContext)) {
							cancelModifyWithEntityEntry(
									(SessionImpl) pojoContextMap
											.get(ContextUtil.ORIGIN_DATA_SESSION),
									pojoContext, pojoContextMap
											.get(ContextUtil.ORIGIN_DATA_INFO),
									o, compareContext);
						}
					}

				}

			} else if (type.isAssociationType() && isSame && !isInstrumented(x)) {
				if (compareContext.containsKey(x)) {
					continue;
				}
				// manyToOne类型处理或者one to one类型处理，除了id相同以外，还需要判断属性是否一致
				Map pojoContextMap = (Map) pojoContext.get(x);
				if (!compareObjWithEntityEntry((SessionImpl) pojoContextMap
						.get(ContextUtil.ORIGIN_DATA_SESSION), pojoContext,
						pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO), x,
						compareContext)) {
					cancelModifyWithEntityEntry((SessionImpl) pojoContextMap
							.get(ContextUtil.ORIGIN_DATA_SESSION), pojoContext,
							pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO),
							x, compareContext);
				}

			} else if (!isSame) {
				// 还原旧值
				// component类型不知道好用不好用，需要测试
				entityMetamodel.getTuplizer(entityMode).setPropertyValue(
						newObj, i, x);
			}
		}
	}

	/**
	 * 判断该List是否有删除的Pojo
	 * 
	 * @param pojoList
	 * @return
	 */
	public static boolean hasDeletePojos(List pojoList) {
		List deletedPojoList = getDeletedPojoList(pojoList);
		boolean hasDeletePojos = false;
		if (deletedPojoList.size() > 0) {
			hasDeletePojos = true;
		}
		return hasDeletePojos;
	}

	/**
	 * 获得传入对象列表的新增的Pojo对象
	 * 
	 * @param pojoList
	 * @return List 新增列表
	 */
	public static List getNewPOJOList(List pojoList) {
		List newList = new ArrayList();
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			newList
					.addAll(((com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoList)
							.getNewObjects());
		}
		return newList;
	}

	/**
	 * 返回传入对象列表中被修改的对象集合
	 * 
	 * @param pojoList
	 *            对象列表
	 * @return List 被修改的对象列表
	 * @throws Exception
	 */
	public static List getModifiedPojoList(List pojoList) {
		Map pojoContext = ContextUtil.getPojoContext();
		List modifiedPojoList = new ArrayList();
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList tPojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoList;
			if (pojoContext != null && pojoContext.size() > 0) {
				Map<Object, Object> compareContext = new HashMap<Object, Object>();
				for (int i = 0; i < tPojoList.size(); i++) {
					Object newObj = tPojoList.get(i);
					// 不在新增缓冲区中才进行判断
					if (!tPojoList.contains(tPojoList.getNewObjects(), newObj)) {
						Object pojoContextMap = pojoContext.get(newObj);
						if (pojoContextMap instanceof Map) {
							Object oldObj = ((Map) pojoContextMap)
									.get(ContextUtil.ORIGIN_DATA_INFO);
							if (oldObj != null && newObj != null) {
								try {
									// 后台对象
									if (oldObj instanceof EntityEntry) {
										SessionImpl session = (SessionImpl) ((Map) pojoContextMap)
												.get(ContextUtil.ORIGIN_DATA_SESSION);
										if (!compareObjWithEntityEntry(session,
												pojoContext, oldObj, newObj,
												compareContext)) {
											modifiedPojoList.add(newObj);
										}
									} else {
										// 前台对象
										if (!PojoUtil
												.compareObj(oldObj, newObj)) {
											modifiedPojoList.add(newObj);
										}
									}
								} catch (Exception e) {
									e.printStackTrace();
									Throwable cause = e.getCause();
									throw new UniEAPSystemException("", cause,
											null);
								}
							}
						}
					}
				}
			}
		}
		return modifiedPojoList;
	}

	/**
	 * 如果List中的对象many-to-one中的many端，则不需要比较其one端的collection中的对象，如果是one端的对象，
	 * 则不需要比较其many端的引用对象。
	 * 
	 * @param previousState
	 * @param currentState
	 * @param properties
	 * @param session
	 * @param pojoContext
	 * @param compareContext
	 * @return
	 */
	private static boolean compareObj(Object[] previousState,
			Object[] currentState, StandardProperty[] properties,
			SessionImpl session, Map pojoContext,
			Map<Object, Object> compareContext) {
		boolean isSame = true;
		int span = properties.length;
		for (int i = 0; i < span; i++) {
			StandardProperty standardProperty = properties[i];
			Type type = standardProperty.getType();
			Object x = previousState[i];
			Object y = currentState[i];
			isSame = !(y != LazyPropertyInitializer.UNFETCHED_PROPERTY
					&& standardProperty.isDirtyCheckable(false) && type
					.isDirty(x, y, session));
			if (type.isCollectionType() && isSame && !isInstrumented(y)) {
				// 集合类型在前面处理，因为它也是一种关联类型
				Iterator elementsIterator = ((CollectionType) type)
						.getElementsIterator(y, session);
				// 首先判断集合中的对象是否已经在比较的上下文中了，如果已经存在，那么说明不需要递归比较集合中的元素了
				boolean needToCascade = true;
				while (elementsIterator.hasNext()) {
					Object o = elementsIterator.next();
					// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
					if (compareContext.containsKey(o)) {
						needToCascade = false;
						break;
					}
				}
				// 如果需要级联比较
				if (needToCascade) {
					elementsIterator = ((CollectionType) type)
							.getElementsIterator(y, session);
					while (elementsIterator.hasNext()) {
						Object o = elementsIterator.next();
						// 这里默认认为是Set或者List类型了，如果是Map类型未考虑
						Map pojoContextMap = (Map) pojoContext.get(o);
						if (!compareObjWithEntityEntry(
								(SessionImpl) pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_SESSION),
								pojoContext, pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_INFO), o,
								compareContext)) {
							isSame = false;
							break;
						}
					}

				}

			} else if (type.isAssociationType() && isSame && !isInstrumented(x)) {
				if (compareContext.containsKey(x) || x == null) {
					continue;
				}
				// manyToOne类型处理或者one to one类型处理，除了id相同以外，还需要判断属性是否一致
				Map pojoContextMap = (Map) pojoContext.get(x);
				isSame = compareObjWithEntityEntry((SessionImpl) pojoContextMap
						.get(ContextUtil.ORIGIN_DATA_SESSION), pojoContext,
						pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO), x,
						compareContext);
			}
			if (!isSame) {
				break;
			}
		}
		if (isSame) {
			// 对非持久化属性进行判断暂不比较，因为不涉及到存储数据库
		}
		return isSame;
	}

	/**
	 * 判断一个集合是否是代理类，并且没有初始化
	 * 
	 * @param entityClass
	 * @return
	 */
	public static boolean isCollectionInstrumented(Object entity) {
		if (entity instanceof AbstractPersistentCollection
				&& !((AbstractPersistentCollection) entity).wasInitialized()) {
			return true;
		}
		return false;
	}

	/**
	 * 判断一个对象是否是cglib代理
	 * 
	 * @param entityClass
	 * @return
	 */
	public static boolean isInstrumented(Object entity) {
		return entity != null && isInstrumented(entity.getClass());
	}

	/**
	 * 判断一个类是否是cglib代理
	 * 
	 * @param entityClass
	 * @return
	 */
	public static boolean isInstrumented(Class entityClass) {
		Class[] definedInterfaces = entityClass.getInterfaces();
		for (int i = 0; i < definedInterfaces.length; i++) {
			if ("org.hibernate.proxy.HibernateProxy"
					.equals(definedInterfaces[i].getName())) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 比较对象的原子操作，首先从context中取出原始对象的entityEntry，然后再比较该对象的每一个属性
	 * 
	 * @param session
	 * @param pojoContext
	 * @param compareContext
	 * @param x
	 * @param y
	 * @return
	 */
	private static boolean compareObjWithEntityEntry(SessionImpl session,
			Map pojoContext, Object oldObj, Object newObj,
			Map<Object, Object> compareContext) {
		boolean isSame = false;
		if (oldObj != null && oldObj instanceof EntityEntry) {
			EntityEntry entry = (EntityEntry) oldObj;
			EntityPersister persister = entry.getPersister();
			// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
			// 添加比较主对象
			compareContext.put(newObj, newObj);
			isSame = compareObj(entry.getLoadedState(), persister
					.getPropertyValues(newObj, session.getEntityMode()),
					persister.getEntityMetamodel().getProperties(), session,
					pojoContext, compareContext);
			// 移除比较主对象
			compareContext.remove(newObj);
		}
		return isSame;
	}

	/**
	 * 获得被删除的对象列表
	 * 
	 * @param pojoList
	 *            所有对象列表
	 * @return List 被删除的对象列表
	 */
	public static List getDeletedPojoList(List pojoList) {
		List deletedList = new ArrayList();
		if (pojoList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			deletedList
					.addAll(((com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoList)
							.getDeletedObjects());
		}
		return deletedList;
	}

	/**
	 * 获得当前PojoList排序信息 对应DataStore的conditionValues属性
	 * 
	 * @param pojoList
	 * @return
	 */
	public static List getConditionValues(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return null;
		return ds.getConditionValues();
	}

	/**
	 * 获得当前PojoList排序信息 对应DataStore的condition属性
	 * 
	 * @param pojoList
	 * @return
	 */
	public static String getCondition(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return null;
		return ds.getCondition();
	}

	/**
	 * 获得当前PojoList排序信息 对应DataStore的order属性
	 * 
	 * @param pojoList
	 * @return
	 */
	public static String getOrder(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return null;
		return ds.getOrder();
	}

	/**
	 * 获得当前显示的页数 对应DataStore的pageNumber属性
	 * 
	 * @param pojoList
	 * @return int
	 */
	public static int getPageNumber(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return 1;
		return ds.getPageNumber();
	}

	/**
	 * 获得每页显示的行数 对应DataStore的pageSize属性
	 * 
	 * @param pojoList
	 * @return
	 */
	public static int getPageSize(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return 2147483647;
		return ds.getPageSize();
	}

	/**
	 * 获得当前Pojo对象的元数据信息（DataStore中的元数据信息）
	 * 
	 * @param pojo
	 * @return
	 */
	public static MetaData getMetaData(Object pojoOrList) {
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null)
			return null;
		return ds.getMetaData();
	}

	/**
	 * 返回传入对象的原始数据对象???????
	 * 
	 * @param pojo
	 *            当前对象
	 * @return
	 */
	public static Object getOriginPojo(Object pojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				Object oldObj = ((Map) pojoContextMap)
						.get(ContextUtil.ORIGIN_DATA_INFO);
				return oldObj;
			}
		}
		return null;
	}

	/**
	 * 当前台数据状态和后台状态混用时，有的前台未加载的对象，到后台加载以后，需要同时更新前台状态，否则会出现错误的脏状态
	 * 
	 * @param pojo
	 * @return
	 */
	public static void setOriginPojo(Object pojo, Object newOriginPojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				((Map) pojoContextMap).put(ContextUtil.ORIGIN_DATA_INFO,
						newOriginPojo);
			}
		}
	}

	/**
	 * 获得Pojo参数集合
	 * 
	 * @param pojoOrList
	 * @return
	 */
	public static Map getParameters(Object pojoOrList) {
		if (pojoOrList == null)
			return null;
		DataStore ds = getPojoDataStore(pojoOrList);
		Map parameters = ds.getParameters();
		if (parameters == null) {
			return null;
		}
		Iterator it = parameters.entrySet().iterator();
		Map map = new HashMap();
		while (it.hasNext()) {
			Entry entry = (Entry) it.next();
			Object value = entry.getValue();
			if (value instanceof JSONArray) {
				map.put(entry.getKey().toString(), ((JSONArray) value)
						.toArray());
				continue;
			}
			if (value instanceof JSONObject) {
				Set entrySet = ((JSONObject) value).entrySet();
				Iterator ite = entrySet.iterator();
				Map parMap = new HashMap();
				while (ite.hasNext()) {
					Entry en = (Entry) ite.next();
					parMap.put(en.getKey().toString(), en.getValue());
				}
				map.put(entry.getKey().toString(), parMap);
				continue;
			}
			map.put(entry.getKey().toString(), value);
		}
		return parameters;
	}

	/**
	 * 获得Pojo对象中名为parName的参数
	 * 
	 * @param pojo
	 * @param parName
	 * @return Object
	 */
	public static Object getParameter(Object pojoOrList, String parName) {
		if (pojoOrList == null)
			return null;
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds == null) {
			return null;
		}
		Map parameters = ds.getParameters();
		if (parameters != null) {
			return parameters.get(parName);
		}
		return null;
	}

	/**
	 * 判断对象是否未被修改。
	 * 
	 * @param pojo
	 *            对象
	 * @return boolean
	 *         <p>
	 *         <strong>示例代码:</strong> <blockquote>
	 * 
	 *         <pre>
	 * boolean modify = PojoContextUtil.isNotModify(pojo);
	 * pojo数据被修改返回false，未被修改返回true
	 * </pre>
	 * 
	 *         </blockquote>
	 */
	public static boolean isNotModified(Object pojo) {
		boolean isModified = false;
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				Object oldObj = ((Map) pojoContextMap)
						.get(ContextUtil.ORIGIN_DATA_INFO);
				if (oldObj != null && pojo != null) {
					try {
						if (oldObj instanceof EntityEntry) {
							SessionImpl session = (SessionImpl) ((Map) pojoContextMap)
									.get(ContextUtil.ORIGIN_DATA_SESSION);
							isModified = !compareObjWithEntityEntry(session,
									pojoContext, oldObj, pojo, new HashMap());
						} else {
							isModified = !PojoUtil.compareObj(oldObj, pojo);
						}
					} catch (Exception e) {
						e.printStackTrace();
						Throwable cause = e.getCause();
						throw new UniEAPSystemException("", cause, null);
					}
				}
			}
		}
		return !isModified;
	}

	private static Row getRowByPojoContext(Object pojo, DataStore ds) {
		Row row = null;
		Object pojoIndex = getPojoDataStoreIndex(pojo);
		if (pojoIndex != null) {
			int parseInt = Integer.parseInt(pojoIndex.toString());
			if (parseInt < 0) {
				parseInt = -1 - parseInt;
				row = (Row) ds.getRowSet().getDeleteRows().get(parseInt);
			}
			row = ds.getRowSet().getRow(parseInt);
		}
		return row;
	}

	/**
	 * 判断对象是否为删除对象
	 * 
	 * @param pojo
	 * @return boolean
	 *         <p>
	 *         <strong>示例代码:</strong> <blockquote>
	 * 
	 *         <pre>
	 * boolean delete = PojoContextUtil.isNewModified(pojo);
	 * pojo为删除对象返回true，否则返回false
	 * </pre>
	 * 
	 *         </blockquote>
	 */
	public static boolean isDeleted(Object pojo) {
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			boolean isDeleted = false;
			if (pojoList != null
					&& pojoList.contains(pojoList.getDeletedObjects(), pojo)) {
				isDeleted = true;
			}
			return isDeleted;
		} else {
			// 判断对象是否是从前台传来的对象
			return false;
		}
	}

	/**
	 * 判断对象是否为新建对象
	 * 
	 * @param pojo
	 * @return boolean
	 *         <p>
	 *         <strong>示例代码:</strong> <blockquote>
	 * 
	 *         <pre>
	 * boolean modify = PojoContextUtil.isNewModified(pojo);
	 * pojo为新增对象返回true，否则返回false
	 * </pre>
	 * 
	 *         </blockquote>
	 */
	public static boolean isNewModified(Object pojo) {
		boolean isNewModified = false;
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& pojoList.contains(pojoList.getNewObjects(), pojo)) {
				isNewModified = true;
			}
		}
		return isNewModified;
	}

	/**
	 * 任意Pojo对象是否被选择
	 * 
	 * @param pojo
	 *            当传入pojo为集合类时，默认取第一个元素
	 * @return boolean
	 */
	public static boolean isSelected(Object pojo) {
		DataStore ds = getPojoDataStore(pojo);
		Object index = getPojoDataStoreIndex(pojo);
		if (ds != null && index != null) {
			int parseInt = Integer.parseInt(index.toString());
			if (ds.getRowSet().getRows().size() > parseInt) {
				Row row = ds.getRowSet().getRow(parseInt);
				return row.isSeleted();
			}
		}
		return false;
	}

	/**
	 * 判断传入对象是否被修改
	 * 
	 * @param pojo
	 *            当传入pojo为集合类时，默认取第一个元素
	 * @return boolean
	 *         <p>
	 *         <strong>示例代码:</strong> <blockquote>
	 * 
	 *         <pre>
	 * boolean modify = PojoContextUtil.isDataModified(pojo);
	 * pojo被修改返回true，否则返回false
	 * </pre>
	 * 
	 *         </blockquote>
	 */
	public static boolean isDataModified(Object pojo) {
		boolean isDataModified = false;
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				Object oldObj = pojoContextMap
						.get(ContextUtil.ORIGIN_DATA_INFO);
				if (oldObj != null && pojo != null) {
					try {
						// 后台
						if (oldObj instanceof EntityEntry) {
							SessionImpl session = (SessionImpl) pojoContextMap
									.get(ContextUtil.ORIGIN_DATA_SESSION);
							isDataModified = !compareObjWithEntityEntry(
									session, pojoContext, oldObj, pojo,
									new HashMap());
						} else {
							// 前台
							isDataModified = !PojoUtil.compareObj(oldObj, pojo);
						}
					} catch (Exception e) {
						e.printStackTrace();
						Throwable cause = e.getCause();
						throw new UniEAPSystemException("", cause, null);
					}
				}
			}
		}
		return isDataModified;
	}

	/**
	 * 判断对象某属性是否被修改
	 * 
	 * @param pojo
	 *            当传入pojo为集合类时，默认取第一个元素
	 * @param colName
	 *            属性名称
	 *            <p>
	 *            <strong>示例代码:</strong> <blockquote>
	 * 
	 *            <pre>
	 * boolean modify = PojoContextUtil.isDirty(pojo,"name");
	 * pojo对象name属性被修改则返回true，否则返回false
	 * </pre>
	 * 
	 *            </blockquote>
	 */
	public static boolean isDirty(Object pojo, String colName) {
		Map pojoContext = ContextUtil.getPojoContext();
		boolean isModified = false;
		if (pojoContext.containsKey(pojo)) {
			Map pojoContextMap = (Map) pojoContext.get(pojo);
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoContextMap
					.get(ContextUtil.ORIGIN_DATA_CONTEXT);
			if (pojoList != null
					&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
				Object oldObj = ((Map) pojoContextMap)
						.get(ContextUtil.ORIGIN_DATA_INFO);
				if (oldObj != null && pojo != null) {
					// 后台
					if (oldObj instanceof EntityEntry) {
						isModified = isDirty(pojoContext,
								(SessionImpl) pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_SESSION),
								pojo, (EntityEntry) pojoContextMap
										.get(ContextUtil.ORIGIN_DATA_INFO),
								colName);
					} else {
						try {
							isModified = !PojoUtil.compareObj(oldObj, pojo,
									colName);
						} catch (Exception e) {
							e.printStackTrace();
							Throwable cause = e.getCause();
							throw new UniEAPSystemException("", cause, null);
						}
					}
				}
			}
		}

		return isModified;
	}

	/**
	 * 获取传入对象被修改属性的列表.
	 * 
	 * @param pojo
	 *            当传入pojo为集合类时，默认取第一个元素
	 * @return List
	 */
	public static List getModifiedProperties(Object pojo) {
		List modifiedList = new ArrayList();
		Map pojoContext = ContextUtil.getPojoContext();
		if (pojoContext != null && pojoContext.size() > 0) {
			Object pojoContextMap = pojoContext.get(pojo);
			if (pojoContextMap != null && pojoContextMap instanceof Map) {
				Map map = (Map) pojoContextMap;
				Object oldObj = map.get(ContextUtil.ORIGIN_DATA_INFO);
				com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) map
						.get(ContextUtil.ORIGIN_DATA_CONTEXT);
				if (pojoList != null
						&& !pojoList.contains(pojoList.getNewObjects(), pojo)) {
					if (oldObj != null && pojo != null) {
						// 后台
						if (oldObj instanceof EntityEntry) {
							Map<String, Boolean> propertyStates = new HashMap<String, Boolean>();
							generatePropertiesStatesWithEntityEntry(
									(EntityEntry) oldObj,
									pojo,
									(SessionImpl) map
											.get(ContextUtil.ORIGIN_DATA_SESSION),
									pojoContext, propertyStates, new HashMap(),
									"");
							if (propertyStates.size() > 0) {
								Iterator<Entry<String, Boolean>> it = propertyStates
										.entrySet().iterator();
								while (it.hasNext()) {
									Entry<String, Boolean> next = it.next();
									if (next.getValue()) {
										modifiedList.add(next.getKey());
									}
								}
							}
						} else {
							// 前台
							try {
								modifiedList = PojoUtil.getModidiedProperties(
										oldObj, pojo, map);
							} catch (Exception e) {
								e.printStackTrace();
								Throwable cause = e.getCause();
								throw new UniEAPSystemException("", cause, null);
							}
						}
					}
				}
			}
		}
		return modifiedList;
	}

	// /**
	// * 判断pojo对象是否为Entity 判断依据：是否包含成员pojoContext。
	// *
	// * @param pojo
	// * @return
	// */
	// public static Boolean isEntityPojo(Object pojo) {
	// if (pojo == null) {
	// return false;
	// }
	// Field field;
	// try {
	// field = FieldUtils.getField(pojo.getClass(),
	// CommonUtil.POJO_CONTEXT, true);
	// if (field != null) {
	// return true;
	// }
	// } catch (Exception e) {
	// return false;
	// }
	// return false;
	// }

	/**
	 * 返回对象类名，当传入对象为List时，返回List中第一个元素的类名。
	 * 
	 * @param pojoOrList
	 * @return
	 */
	public static String getPojoClassName(Object pojoOrList) {
		if (pojoOrList == null)
			return "";
		DataStore ds = getPojoDataStore(pojoOrList);
		if (ds != null) {
			return ds.getRowSetName();
		} else {
			if (pojoOrList instanceof List && ((List) pojoOrList).size() > 0) {
				return ((List) pojoOrList).get(0).getClass().getName();
			}
			return pojoOrList.getClass().getName();
		}
	}

	/**
	 * 清空list的状态，并保存通过hibernate查询出来的实体的初始值，并将list变为包装类型（可以监听新增，删除状态）
	 * 
	 * @param pojoOrList
	 * @param session
	 */
	public static void resetUpdate(List pojoOrList, SessionImpl session) {
		if (pojoOrList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoOrList;
			pojoList.resetUpdate();
			setPojoContext(pojoList, session);
		}
	}

	/**
	 * 保存通过hibernate查询出来的实体的初始值，并将list变为包装类型（可以监听新增，删除状态）,只保存list中对象以及关联对象的状态
	 * 
	 * @param pojoOrList
	 * @param session
	 */
	public static List setPojoContext(List pojoOrList, SessionImpl session) {
		com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList = null;
		if (pojoOrList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			pojoList = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoOrList;
		} else {
			pojoList = new com.neusoft.unieap.techcomp.ria.context.util.ArrayList();
			pojoList._addAll(pojoOrList);
		}
		Map pojoContext = ContextUtil.getPojoContext();
		Object pojo = null;
		if (pojoList != null && pojoList.size() > 0) {
			pojo = pojoList.get(0);
		}
		if (session != null && pojo != null && !(pojo instanceof Map)) {
			Set properties = null;
			final IdentityMap entryMap = (IdentityMap) session
					.getPersistenceContext().getEntityEntries();
			// 或缺pojo的所有属性
			try {
				properties = getEntityProperties(pojo.getClass());
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (properties != null) {
				for (Object entity : pojoList) {
					// 首先设置该pojo的状态
					setPojoContext(session, pojoList, pojoContext, entryMap,
							entity);
					// 设置pojo关联属性的状态
					String name, pName;
					String[] names;
					Object context;
					for (Iterator iterator = properties.iterator(); iterator
							.hasNext();) {
						pName = name = (String) iterator.next();
						context = entity;
						if (name.indexOf(".") > 0) {
							names = name.split("\\.");
							for (int k = 0; k < names.length - 1; k++) {
								try {
									context = PropertyUtils.getProperty(
											context, names[k]);
								} catch (IllegalAccessException e) {
									e.printStackTrace();
								} catch (InvocationTargetException e) {
									e.printStackTrace();
								} catch (NoSuchMethodException e) {
									e.printStackTrace();
								}
								if (context == null || isInstrumented(context)) {
									break;
								} else {
									setPojoContext(session, pojoList,
											pojoContext, entryMap, context);
									if (context instanceof Collection
											&& !isCollectionInstrumented(context)) {
										setCollectionContext(session, pojoList,
												pojoContext, entryMap, context);
									}
								}
							}
							pName = names[names.length - 1];
						}
						if (context != null && !isInstrumented(context)) {
							try {
								Object value = PropertyUtils.getProperty(
										context, pName);
								if (value != null) {
									setPojoContext(session, pojoList,
											pojoContext, entryMap, value);
									if (value instanceof Collection
											&& !isCollectionInstrumented(value)) {
										setCollectionContext(session, pojoList,
												pojoContext, entryMap, value);
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
					}
				}
			}
		}
		return pojoList;
	}

	private static Object getPropertyValue(Map pojoContext,
			SessionImpl session, Object pojo, EntityEntry entry,
			String propertyName) {
		EntityPersister persister = entry.getPersister();
		Object[] currentState = persister.getPropertyValues(pojo, session
				.getEntityMode());
		StandardProperty[] properties = persister.getEntityMetamodel()
				.getProperties();
		int span = properties.length;
		for (int i = 0; i < span; i++) {
			StandardProperty standardProperty = properties[i];
			String name = standardProperty.getName();
			if (name.equals(propertyName)) {
				return currentState[i];
			}
		}
		return null;
	}

	private static boolean isDirty(Map pojoContext, SessionImpl session,
			Object pojo, EntityEntry entry, String colName) {
		Map context = new HashMap();
		Map<String, Boolean> propertyStates = new HashMap<String, Boolean>();
		generatePropertiesStatesWithEntityEntry(entry, pojo, session,
				pojoContext, propertyStates, context, "");
		if (propertyStates.containsKey(colName)) {
			return propertyStates.get(colName);
		} else if (colName.indexOf(".") > 0) {
			String[] names = colName.split("\\.");
			String name = "";
			for (int k = 0; k < names.length - 1; k++) {
				if (name.length() > 0) {
					name = name + ".";
				}
				name = name + names[k];
				if (propertyStates.containsKey(name)) {
					Boolean isDirty = propertyStates.get(name);
					if (!isDirty) {
						return isDirty;
					}
				}
			}
		}
		return false;
	}

	/**
	 * 收集属性的状态
	 * 
	 * @param entry
	 * @param pojo
	 * @param session
	 * @param pojoContext
	 * @param currentStates
	 * @param previousStates
	 * @param context
	 * @param prefix
	 *            上一个属性的名字
	 */
	private static void generatePropertiesStatesWithEntityEntry(
			EntityEntry entry, Object pojo, SessionImpl session,
			Map pojoContext, Map<String, Boolean> propertyStates, Map context,
			String prefix) {
		EntityPersister persister = entry.getPersister();
		// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
		// 添加比较主对象
		context.put(pojo, pojo);
		Serializable oid = entry.getId();
		String idName = persister.getIdentifierPropertyName();
		if (prefix.length() > 0) {
			idName = prefix + "." + idName;
		}
		EntityMode entityMode = session.getEntityMode();
		Serializable id = persister.getIdentifier(pojo, entityMode);
		propertyStates.put(idName, !persister.getIdentifierType().isEqual(oid,
				id, entityMode));
		generatePropertiesStates(entry.getLoadedState(), persister
				.getPropertyValues(pojo, entityMode), persister
				.getEntityMetamodel().getProperties(), session, propertyStates,
				pojoContext, context, prefix);
		// 移除比较主对象
		context.remove(pojo);
	}

	/**
	 * 收集属性状态的原子类
	 * 
	 * @param previousState
	 * @param currentState
	 * @param properties
	 * @param session
	 * @param propertyStates
	 * @param pojoContext
	 * @param context
	 * @param prefix
	 */
	private static void generatePropertiesStates(Object[] previousState,
			Object[] currentState, StandardProperty[] properties,
			SessionImpl session, Map<String, Boolean> propertyStates,
			Map pojoContext, Map context, String prefix) {
		boolean isSame = true;
		int span = properties.length;
		for (int i = 0; i < span; i++) {
			StandardProperty standardProperty = properties[i];
			String name = standardProperty.getName();
			if (prefix.length() > 0) {
				name = prefix + "." + name;
			}
			Type type = standardProperty.getType();
			Object x = previousState[i];
			Object y = currentState[i];
			if (type.isComponentType()) {
				// 对于component类型不想比较两次，直接参照hibernate源码进行搜集状态
				EntityMode entityMode = session.getEntityMode();
				String[] propertyNames = ((ComponentType) type)
						.getPropertyNames();
				Object[] xvalues = null;
				Object[] yvalues = null;
				if (x != null) {
					xvalues = ((ComponentType) type).getPropertyValues(x,
							entityMode);
				} else {
					xvalues = new String[propertyNames.length];
				}
				if (y != null) {
					yvalues = ((ComponentType) type).getPropertyValues(y,
							entityMode);
				} else {
					yvalues = new String[propertyNames.length];
				}
				Type[] subtypes = ((ComponentType) type).getSubtypes();
				for (int index = 0; index < xvalues.length; index++) {
					String propertyName = propertyNames[index];
					if (name.length() > 0) {
						propertyName = name + "." + propertyName;
					}
					propertyStates.put(propertyName, subtypes[index].isDirty(
							xvalues[index], yvalues[index], session));
				}
			} else {
				isSame = !(y != LazyPropertyInitializer.UNFETCHED_PROPERTY
						&& standardProperty.isDirtyCheckable(false) && type
						.isDirty(x, y, session));
				// 如果引用相等才继续往下找
				if (type.isCollectionType() && !isInstrumented(y) && isSame) {
					// 对于集合类型，只判断它这一层就结束，不再往下判断
					Iterator elementsIterator = ((CollectionType) type)
							.getElementsIterator(y, session);
					// 首先判断集合中的对象是否已经在比较的上下文中了，如果已经存在，那么说明不需要递归比较集合中的元素了
					boolean needToCascade = true;
					while (elementsIterator.hasNext()) {
						Object o = elementsIterator.next();
						// many-to-one和one-to-many同时存在时，会造成循环比较，所以如果id和引用没有变化，就不再比较了
						if (context.containsKey(o)) {
							needToCascade = false;
							break;
						}
					}
					// 如果需要级联比较
					if (needToCascade) {
						elementsIterator = ((CollectionType) type)
								.getElementsIterator(y, session);
						while (elementsIterator.hasNext()) {
							Object o = elementsIterator.next();
							// 这里默认认为是Set或者List类型了，如果是Map类型未考虑
							Map pojoContextMap = (Map) pojoContext.get(o);
							if (!compareObjWithEntityEntry(
									(SessionImpl) pojoContextMap
											.get(ContextUtil.ORIGIN_DATA_SESSION),
									pojoContext, pojoContextMap
											.get(ContextUtil.ORIGIN_DATA_INFO),
									o, context)) {
								break;
							}
						}

					}

				}
				// 如果引用相等才继续往下找
				else if (type.isAssociationType() && !isInstrumented(x)
						&& isSame) {
					if (context.containsKey(x) || x == null) {
						continue;
					}
					// manyToOne类型处理或者one to one类型处理，除了id相同以外，还需要判断属性是否一致
					Map pojoContextMap = (Map) pojoContext.get(x);
					compareObjWithEntityEntry((SessionImpl) pojoContextMap
							.get(ContextUtil.ORIGIN_DATA_SESSION), pojoContext,
							pojoContextMap.get(ContextUtil.ORIGIN_DATA_INFO),
							x, context);
					generatePropertiesStatesWithEntityEntry(
							(EntityEntry) pojoContextMap
									.get(ContextUtil.ORIGIN_DATA_INFO), x,
							(SessionImpl) pojoContextMap
									.get(ContextUtil.ORIGIN_DATA_SESSION),
							pojoContext, propertyStates, context, name);
				}
				propertyStates.put(name, !isSame);
			}
		}
	}

	private static void setCollectionContext(SessionImpl session,
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList,
			Map pojoContext, final IdentityMap entryMap, Object context) {
		Iterator it = ((Collection) context).iterator();
		while (it.hasNext()) {
			Object next = it.next();
			setPojoContext(session, pojoList, pojoContext, entryMap, next);
			if (next instanceof Collection && !isCollectionInstrumented(next)) {
				setCollectionContext(session, pojoList, pojoContext, entryMap,
						next);
			}
		}
	}

	/**
	 * 设置hibernate状态的原子方法
	 * 
	 * @param session
	 * @param pojoList
	 * @param pojoContext
	 * @param entryMap
	 * @param entitySet
	 * @param entity
	 */
	private static void setPojoContext(SessionImpl session,
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList pojoList,
			Map pojoContext, final Map entryMap, Object entity) {
		if (entryMap.containsKey(entity)) {
			EntityEntry entry = (EntityEntry) entryMap.get(entity);
			Status status = entry.getStatus();
			if (status != Status.LOADING && status != Status.GONE) {
				if (!pojoContext.containsKey(entity)) {
					Map pojoContextMap = new HashMap();
					pojoContextMap
							.put(ContextUtil.ORIGIN_DATA_SESSION, session);
					pojoContextMap.put(ContextUtil.ORIGIN_DATA_INFO, entry);
					pojoContextMap.put(ContextUtil.ORIGIN_DATA_CONTEXT,
							pojoList);
					pojoContext.put(entity, pojoContextMap);
				}
			}
		}
	}

	/**
	 * 得到所有属性，包含集合类型
	 * 
	 * @param obj
	 * @return Set
	 * @throws Exception
	 */
	private static Set getEntityProperties(Class clazz) throws Exception {
		if (pojoEntiyProperty.containsKey(clazz)) {
			return (Set) pojoEntiyProperty.get(clazz);
		}
		Set properties = Collections.synchronizedSet(new HashSet());
		pojoEntiyProperty.put(clazz, properties);
		Set t = new HashSet();
		Method[] methods = clazz.getMethods();
		for (int i = 0, l = methods.length; i < l; i++) {
			String methodName = methods[i].getName();
			t.add(methodName);
		}
		List fieldsResult = new ArrayList();
		Class tmpClazz = clazz;
		// 解决entity中有接口实现的时候报错
		while (tmpClazz != null && tmpClazz != Object.class) {
			fieldsResult.add(tmpClazz.getDeclaredFields());
			tmpClazz = tmpClazz.getSuperclass();
		}
		for (int j = 0; j < fieldsResult.size(); j++) {
			Field[] fields = (Field[]) fieldsResult.get(j);
			for (int i = 0, l = fields.length; i < l; i++) {
				String fieldName = fields[i].getName();
				String standardFieldName = PojoUtil
						.getStandardBeanName(fieldName);
				// 只需拥有get方法就转换，有的属性可能是构造以后就再改变，不对外公开set方法
				if ((t.contains("get".concat(standardFieldName)) || t
						.contains("is".concat(standardFieldName)))) {
					Class typeClazz = fields[i].getType();
					String typeName = typeClazz.getName();
					// 如果包名不是以java开头的类并且不是基本类型
					if (!typeName.startsWith("java.")
							&& !typeClazz.isPrimitive()
							&& !PojoUtil.isCodeType(typeClazz)) {
						Set props = getEntityProperties(typeClazz);
						Set tmp = new HashSet();
						for (Iterator iterator = props.iterator(); iterator
								.hasNext();) {
							String pName = (String) iterator.next();
							tmp.add(fieldName.concat(".").concat(pName));
						}
						properties.addAll(tmp);

					} else {
						properties.add(fieldName);
					}
				}
			}
		}
		return properties;
	}

	private static DataStore getPojoDataStore(Object pojoOrList) {
		if (pojoOrList == null)
			return null;
		if (pojoOrList instanceof com.neusoft.unieap.techcomp.ria.context.util.ArrayList) {
			com.neusoft.unieap.techcomp.ria.context.util.ArrayList list = (com.neusoft.unieap.techcomp.ria.context.util.ArrayList) pojoOrList;
			return list.getDataStore();
		} else {
			if (pojoOrList instanceof Map
					|| pojoOrList instanceof java.util.ArrayList) {
				return getMapPojoDataStore(pojoOrList);
			} else {
				Map pojoContext = ContextUtil.getPojoContext();
				Object pojoContextMap = pojoContext.get(pojoOrList);
				if (pojoContextMap instanceof Map) {
					Object ds = ((Map) pojoContextMap)
							.get(ContextUtil.ORIGIN_DATA_DATASTORE);
					if (ds != null && ds instanceof DataStore) {
						return (DataStore) ds;
					}
				}
			}
		}
		return null;
	}

	private static DataStore getMapPojoDataStore(Object pojoOrList) {
		Map pojoContext = ContextUtil.getPojoContext();
		Object dsContext = pojoContext.get(ContextUtil.MAP_DATA_CONTEXT);
		Object ds = null;
		if (dsContext instanceof Map) {
			Map dsContextMap = (Map) dsContext;
			Object value = null;
			Iterator it = dsContextMap.entrySet().iterator();
			while (it.hasNext()) {
				Entry entry = (Entry) it.next();
				Object key = entry.getKey();
				if (key == pojoOrList) {
					value = entry.getValue();
					break;
				}
			}
			if (value instanceof Map) {
				Map valueMap = (Map) value;
				ds = valueMap.get(ContextUtil.ORIGIN_DATA_DATASTORE);
				if (ds instanceof DataStore) {
					return (DataStore) ds;
				}
			}
		}
		return null;
	}

	private static Object getPojoDataStoreIndex(Object pojo) {
		if (pojo == null)
			return null;
		if (pojo instanceof Map) {
			Map pojoContext = ContextUtil.getPojoContext();
			Object dsContext = pojoContext.get(ContextUtil.MAP_DATA_CONTEXT);
			Object index = null;
			if (dsContext instanceof Map) {
				Map dsContextMap = (Map) dsContext;
				Object value = null;
				Iterator it = dsContextMap.entrySet().iterator();
				while (it.hasNext()) {
					Entry entry = (Entry) it.next();
					Object key = entry.getKey();
					if (key == pojo) {
						value = entry.getValue();
						break;
					}
				}
				if (value instanceof Map) {
					Map valueMap = (Map) value;
					index = valueMap
							.get(ContextUtil.ORIGIN_DATA_DATASTORE_INDEX);
					return index;
				}
			}
			return null;
		} else {
			Map pojoContext = ContextUtil.getPojoContext();
			Object pojoContextMap = pojoContext.get(pojo);
			if (pojoContextMap != null && pojoContextMap instanceof Map) {
				Object index = ((Map) pojoContextMap)
						.get(ContextUtil.ORIGIN_DATA_DATASTORE_INDEX);
				if (index != null) {
					int parseInt = Integer.parseInt(index.toString());
					return parseInt;
				}
			}
		}
		return null;
	}

}
