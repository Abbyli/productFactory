package com.neusoft.unieap.techcomp.ria.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.ClassUtils;
//import org.hibernate.proxy.HibernateProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.neusoft.unieap.core.codelist.usertype.CodeType;
import com.neusoft.unieap.techcomp.ria.RIAException;
import com.neusoft.unieap.techcomp.ria.RIAExceptionCode;
import com.neusoft.unieap.techcomp.ria.context.util.ContextUtil;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.Row;
import com.neusoft.unieap.techcomp.ria.ds.impl.DataStoreImpl;
import com.neusoft.unieap.techcomp.ria.ds.impl.RowImpl;
import com.neusoft.unieap.techcomp.ria.pojo.PojoEntity;
import com.neusoft.unieap.techcomp.ria.pojo.PojoList;
import com.neusoft.unieap.techcomp.ria.util.proxy.ProxyObjHandler;
import com.neusoft.unieap.techcomp.ria.util.proxy.ProxyObjHandlerFactory;

/**
 * 
 *根据类名转换为PojoEntity，及设置其属性等信息的工具类
 */
public class PojoUtil_for_yf {

	private final static Map pojoEntiyProperty = new ConcurrentHashMap();
	private static ProxyObjHandler pojoProxyHandler = ProxyObjHandlerFactory
			.getHandler();

	private static final Logger logger = LoggerFactory.getLogger(PojoUtil_for_yf.class);

	/**
	 * 转换DataStore对象为Pojo对象
	 * 
	 * @param ds
	 * @return
	 */
	public static PojoList toPojoList(DataStore ds) {
		String pojoClassName = ds.getRowSetName();
		PojoList pojoList = new PojoList(pojoClassName);
		try {
			List rows = ds.getRowSet().getRows();
			for (int i = 0, l = rows.size(); i < l; i++) {
				Row row = (Row) rows.get(i);
				pojoList.addPojo(PojoUtil_for_yf.createPojoEntity(pojoClassName, row));
			}
			rows = ds.getRowSet().getFilterRows();
			for (int i = 0, l = rows.size(); i < l; i++) {
				Row row = (Row) rows.get(i);
				pojoList.addPojo(PojoUtil_for_yf.createPojoEntity(pojoClassName, row));
			}
			rows = ds.getRowSet().getDeleteRows();
			for (int i = 0, l = rows.size(); i < l; i++) {
				Row row = (Row) rows.get(i);
				pojoList.addDeletePojo(PojoUtil_for_yf.createPojoEntity(pojoClassName,
						row));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pojoList;
	}

	/**
	 * 根据行对象JSONObject和pojo javaBean类名转为PojoEntity对象
	 * 
	 * @param pojoClassName
	 *            类名
	 * @param Row
	 *            行对象
	 * @return PojoEntity
	 * @throws Exception
	 */
	public static PojoEntity createPojoEntity(String pojoClassName, Row row)
			throws Exception {
		JSONObject rowObj = ((RowImpl) row).getJSONObject();
		Object obj = Class.forName(pojoClassName).newInstance();
		PojoEntity entity = new PojoEntity(obj);
		// 不知道下面这行代码是做什么的，暂时注释掉
		// setFileProperty(entity.getPojoObj());
		entity.setRow(row);
		Map orignValue = null;
		Iterator items = rowObj.entrySet().iterator();
		Entry entry;
		String key;
		Object value;
		Set emptyPojoKey = getKeySetValueIsNull(rowObj.entrySet());
		for (; items.hasNext();) {
			entry = (Entry) items.next();
			key = (String) entry.getKey();

			value = entry.getValue();
			// 属性对应pojo的所有属性均为空，该属性不做处理。
			if (emptyPojoKey.contains(key)) {
				continue;
			}

			if (Row.STATUS.equals(key)) {
				entity.setStatus(Integer.parseInt(value.toString()));
				continue;
			}
			if (Row.SELECTED.equals(key)) {
				entity.setSelected("true".equals(value));
				continue;
			}
			if (Row.ORIGIN.equals(key)) {
				orignValue = (Map) value;
				continue;
			}
			if (value instanceof JSONObject) {
				if (((JSONObject) value).isNullObject()) {
					value = null;
				}
			}
			setProperty(entity.getPojoObj(), key, value);
		}
		if (orignValue != null) {
			Object orignObj = depthClone(entity.getPojoObj());
			entity.setOrignPojoObj(orignObj);
			items = orignValue.entrySet().iterator();
			for (; items.hasNext();) {
				entry = (Entry) items.next();
				key = (String) entry.getKey();
				value = entry.getValue();
				// 属性对应pojo的所有属性均为空，该属性不做处理。
				if (emptyPojoKey.contains(key)) {
					continue;
				}

				if (value instanceof JSONObject) {
					if (((JSONObject) value).isNullObject()) {
						value = null;
					}
				}
				setProperty(orignObj, key, value);
			}
		}

		// // 后端校验 后端校验,liu.w添加了前后台校验，所以注释了该代码，否则会采用这部分带阿玛
		// BeanValidatorFactory.getBeanValidator().validate(
		// entity.getPojoObj());

		return entity;
	}

	// private static void setFileProperty(Object obj) {
	// Map fileMap = sortFile();
	// if (fileMap != null) {
	// Iterator entrySet = fileMap.entrySet().iterator();
	// while (entrySet.hasNext()) {
	// try {
	// Entry entry = (Entry) entrySet.next();
	// String inputName = (String) entry.getKey();
	// Vector files = (Vector) entry.getValue();
	// Object tempObj = obj;
	// int size = files.size();
	// Object value = null;
	// if (inputName.indexOf(".") > -1) {
	// String[] pathArray = inputName.split("\\.");
	// for (int i = 0; i < pathArray.length - 1; i++) {
	// Object tempProperty = PropertyUtils.getProperty(
	// tempObj, pathArray[i]);
	// if (tempProperty == null) {
	// Field[] fields = tempObj.getClass()
	// .getDeclaredFields();
	// Field field = getMatchField(pathArray[i],
	// fields);
	// if (field != null) {
	// Class claz = field.getType();
	// Object newValue = claz.newInstance();
	// PropertyUtils.setProperty(tempObj,
	// pathArray[i], newValue);
	// tempObj = newValue;
	// } else {
	// tempObj = null;
	// break;
	// }
	// } else {
	// tempObj = tempProperty;
	// }
	// }
	// if (tempObj == null) {
	// continue;
	// }
	// inputName = pathArray[pathArray.length - 1];
	// }
	// if (size > 1) {
	// File[] fileArray = new File[size];
	// for (int i = 0; i < size; i++) {
	// fileArray[i] = (File) files.get(i);
	// }
	// value = fileArray;
	// } else if (size == 1) {
	// Field[] fields = tempObj.getClass().getDeclaredFields();
	// Field field = getMatchField(inputName, fields);
	// if (field != null && field.getType() == File[].class) {
	// value = new File[] { (File) files.get(0) };
	// } else {
	// value = files.get(0);
	// }
	// }
	// PropertyUtils.setProperty(tempObj, inputName, value);
	// } catch (Exception e) {
	// logger.warn(e.getMessage());
	// }
	// }
	//
	// }
	// }

	private static Field getMatchField(String propertyName,
			Field[] declaredFields) {
		int fieldLength = declaredFields.length;
		for (int i = 0; i < fieldLength; i++) {
			Field field = declaredFields[i];
			if (propertyName.equals(field.getName())) {
				return field;
			}
		}
		return null;
	}

	// private static Map sortFile() {
	// List fileAttachments = (List) UniEAPContextHolder.getContext()
	// .getCustomProperty(FileAttachment.REQUEST_ATTRIBUTE_NAME);
	// if (fileAttachments == null || fileAttachments.size() == 0) {
	// return null;
	// }
	// Map fileMap = new HashMap();
	// for (int i = 0; i < fileAttachments.size(); i++) {
	// FileAttachment fileAttachment = (FileAttachment) fileAttachments
	// .get(i);
	// String inputName = fileAttachment.getName();
	// if (fileMap.get(inputName) == null) {
	// fileMap.put(inputName, new Vector());
	// }
	// Vector files = (Vector) fileMap.get(inputName);
	// files.add(new File(fileAttachment.getPath()));
	// }
	// return fileMap;
	// }

	/**
	 * 深度clone
	 * 
	 * @param srcObj
	 *            克隆的对象，需要实现序列化
	 * @return Object
	 */
	public static Object depthClone(Object srcObj) {
		if (!(srcObj instanceof Serializable)) {
			throw new RIAException(
					RIAExceptionCode.REQUIRED_SERIALIZABLE_OBJECT_EXP,
					new Object[] { srcObj.getClass().getName() });
		}
		Object cloneObj = null;
		try {
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			ObjectOutputStream oo = new ObjectOutputStream(out);
			oo.writeObject(srcObj);
			ByteArrayInputStream in = new ByteArrayInputStream(out
					.toByteArray());
			ObjectInputStream oi = new ObjectInputStream(in);
			cloneObj = oi.readObject();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cloneObj;
	}

	/**
	 * 设置pojo对象属性值，支持多层嵌套属性
	 * 
	 * @param obj
	 *            pojo对象
	 * @param name
	 *            属性名
	 * @param value
	 *            属性值
	 * @throws Exception
	 */
	public static void setProperty(Object obj, String name, Object value)
			throws Exception {
		Class clazz = obj.getClass();
		Set properties = PojoUtil_for_yf.getEntityProperties(clazz);
		if (!properties.contains(name)) {
			return;
		}
		Object context = obj;
		String pName = name;
		if (name.indexOf(".") > 0) {
			String[] names = name.split("\\.");
			for (int k = 0; k < names.length - 1; k++) {
				// 获得嵌套pojo
				Object subContext = PropertyUtils
						.getProperty(context, names[k]);
				if (subContext == null) {
					Class cls = context.getClass().getDeclaredField(names[k])
							.getType();
					subContext = cls.newInstance();
					PropertyUtils.setProperty(context, names[k], subContext);
				}
				context = subContext;
			}
			pName = names[names.length - 1];
		}
		Class temp = context.getClass(), cls = null;
		while (temp != Object.class) {
			try {
				Field field = temp.getDeclaredField(pName);
				cls = field.getType();
				break;
			} catch (Exception e) {
				temp = temp.getSuperclass();
			}
		}
		if (cls == null)
			return;
		// 如果是日期类型
		if (cls == Date.class || cls.getSuperclass() == Date.class) {
			if (value != null && !"".equals(value.toString())) {
				value = cls.getConstructor(new Class[] { long.class })
						.newInstance(
								new Object[] { Long.valueOf(GMT.fromGMTToCST(
										((Long.valueOf(value.toString())))
												.longValue()).getTime()) });
			} else {
				value = null;
			}
		}
		// 基本类型
		else if (cls.isPrimitive()) {
			if (value == null || "".equals(value.toString())) {
				return;
			}
			value = getPrimitiveConstructor(cls).getConstructor(
					new Class[] { String.class }).newInstance(
					new Object[] { value.toString() });
		}
		// 常数类型
		else if (isCodeType(cls)) {
			if (value != null && !"".equals(value.toString())) {
				Method method = cls.getMethod("getInstance", new Class[] {
						Class.class, String.class });
				value = method.invoke(null, new Object[] { cls,
						value.toString() });
			} else {
				value = null;
			}
		}
		// 其他非字符串类型
		else if (clazzMapping.containsValue(cls)) {
			if (value != null && !"".equals(value.toString())) {
				value = cls.getConstructor(new Class[] { String.class })
						.newInstance(new Object[] { value.toString() });
			} else {
				value = null;
			}
		}
		PropertyUtils.setProperty(context, pName, value);
	}

	private static Map clazzMapping = new HashMap();
	static {
		clazzMapping.put(int.class, Integer.class);
		clazzMapping.put(float.class, Float.class);
		clazzMapping.put(double.class, Double.class);
		clazzMapping.put(long.class, Long.class);
		clazzMapping.put(boolean.class, Boolean.class);
		clazzMapping.put(byte.class, Byte.class);
		clazzMapping.put(BigDecimal.class, BigDecimal.class);

	}

	private static Class getPrimitiveConstructor(Class cls) {
		Class clazz = (Class) clazzMapping.get(cls);
		if (clazz != null)
			return clazz;
		throw new RuntimeException("do not support class " + cls);
	}

	/**
	 * 得到所有属性
	 * 
	 * @param obj
	 * @return Set
	 * @throws Exception
	 */
	public static Set getEntityProperties(Class clazz) throws Exception {
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
				String standardFieldName = getStandardBeanName(fieldName);
				// 只需拥有get方法就转换，有的属性可能是构造以后就再改变，不对外公开set方法
				if ((t.contains("get".concat(standardFieldName)) || t
						.contains("is".concat(standardFieldName)))) {
					Class typeClazz = fields[i].getType();
					String typeName = typeClazz.getName();
					// 如果包名不是以java开头的类并且不是基本类型
					if (!typeName.startsWith("java.")
							&& !typeClazz.isPrimitive()
							&& !isCodeType(typeClazz)) {
						Set props = PojoUtil_for_yf.getEntityProperties(typeClazz);
						Set tmp = new HashSet();
						for (Iterator iterator = props.iterator(); iterator
								.hasNext();) {
							String pName = (String) iterator.next();
							tmp.add(fieldName.concat(".").concat(pName));
						}
						properties.addAll(tmp);

					} else {
						if (!isCollectionOrMap(typeClazz)) {
							properties.add(fieldName);
						}
					}
				}
			}
		}
		return properties;
	}

	/**
	 * 判断类是否为集合对象
	 * 
	 * @param cls
	 * @return
	 */
	public static boolean isCollectionOrMap(Class cls) {
		if (cls == Collection.class || cls == Map.class) {
			return true;
		}
		Class[] temp = cls.getInterfaces();
		if (temp != null) {
			for (int i = 0; i < temp.length; i++) {
				if (isCollectionOrMap(temp[i])) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 判断类是否为常数代码类型
	 * 
	 * @param cls
	 * @return
	 */
	public static boolean isCodeType(Class cls) {
		List interfaceList = ClassUtils.getAllInterfaces(cls);
		if (interfaceList != null && interfaceList.contains(CodeType.class)) {
			return true;
		}
		return false;
	}

	/**
	 * 获取标准的javaBean属性名
	 * 
	 * @param name
	 * @return
	 */
	public static String getStandardBeanName(String name) {
		if (name.length() > 1) {
			char secondCha = name.charAt(1);
			if ('A' <= secondCha && secondCha <= 'Z') {
				return name;
			}
		}
		return String.valueOf(name.charAt(0)).toUpperCase().concat(
				name.substring(1));
	}

	/**
	 * 根据pojo对象集返回DataStore对象<br/>
	 * 默认RowSetName为POJO对象的类路径
	 * 
	 * @param list
	 * @return
	 */
	public static DataStore toDataStore(List list) {
		if (list == null) {
			return null;
		}
		String name = "";
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i) != null) {
				name = list.get(i).getClass().getName();
				break;
			}
		}
		DataStore ds = new DataStoreImpl(name);
		ds.setRowSetName(name);
		assemblePojoToDataStore(list, ds);
		return ds;
	}

	/**
	 * 复制查询的DataStore对象，并把Pojo结果集加入其中<br/>
	 * 如果传入DataStore没有RowSetName，则将POJO对象的类路径设置为默认值，否则维持原值
	 * 
	 * @param list
	 * @param ds
	 * @return
	 */
	public static DataStore toDataStore(List list, final DataStore ds) {
		DataStore dsClose = getQueryDataStore(ds);
		String rowSetName = dsClose.getRowSetName();
		Object obj = null;
		if (rowSetName == null || rowSetName.trim().equals("")) {
			if (list == null) {
				return null;
			}
			String className = "";
			for (int i = 0; i < list.size(); i++) {
				if (list.get(i) != null) {
					className = list.get(i).getClass().getName();
					obj = list.get(i);
					break;
				}
			}
			dsClose.setRowSetName(className);
		}
		// 增加对map类型的处理
		if (list.size() > 0 && obj != null && obj instanceof Map) {
			dsClose.setRowSetName("");
			for (int i = 0; i < list.size(); i++) {
				Iterator it = ((Map) list.get(i)).entrySet().iterator();
				Row row = new RowImpl();
				while (it.hasNext()) {
					Entry entry = (Entry) it.next();
					row.setItemValue((String) entry.getKey(), entry.getValue());
				}
				dsClose.getRowSet().addRow(row);
			}
			return dsClose;
		}
		assemblePojoToDataStore(list, dsClose);
		return dsClose;
	}

	/**
	 * 复制查询的DataStore对象，并把Pojo结果集加入其中<br/>
	 * 如果传入DataStore没有RowSetName，则将POJO对象的类路径设置为默认值，否则维持原值
	 * 通过SQL查询出来的，将字段命名按相应策略修改
	 * 
	 * @param list
	 * @param ds
	 * @return
	 */
	public static DataStore toDataStore4SQL(List list, final DataStore ds) {
		DataStore dsClose = getQueryDataStore(ds);
		String rowSetName = dsClose.getRowSetName();
		Object obj = null;
		if (rowSetName == null || rowSetName.trim().equals("")) {
			if (list == null) {
				return null;
			}
			String className = "";
			for (int i = 0; i < list.size(); i++) {
				if (list.get(i) != null) {
					className = list.get(i).getClass().getName();
					obj = list.get(i);
					break;
				}
			}
			dsClose.setRowSetName(className);
		}
		// 增加对map类型的处理
		if (list.size() > 0 && obj != null && obj instanceof Map) {
			dsClose.setRowSetName("");
			for (int i = 0; i < list.size(); i++) {
				Iterator it = ((Map) list.get(i)).entrySet().iterator();
				Row row = new RowImpl();
				while (it.hasNext()) {
					Entry entry = (Entry) it.next();
					row.setItemValue(HSUtil
							.getJavaName((String) entry.getKey()), entry
							.getValue());
				}
				dsClose.getRowSet().addRow(row);
			}
			return dsClose;
		}
		assemblePojoToDataStore(list, dsClose);
		return dsClose;
	}

	/**
	 * 根据map类型构造DataStore。key和value必须为java基本类型
	 * 
	 * @param map
	 * @param ds
	 * @return
	 */
	public static DataStore toDataStore(Map map, final DataStore ds) {
		DataStore dsClose = getQueryDataStore(ds);
		dsClose.setRowSetName("");
		Iterator it = map.entrySet().iterator();
		Row row = new RowImpl();
		while (it.hasNext()) {
			Entry entry = (Entry) it.next();
			row.setItemValue((String) entry.getKey(), entry.getValue());
		}
		dsClose.getRowSet().addRow(row);
		return dsClose;
	}

	/**
	 * 获取用于查询的DataStore对象，不包含任何记录
	 * 
	 * @param ds
	 * @return
	 */
	public static DataStore getQueryDataStore(final DataStore ds) {
		DataStore ds2 = (DataStore) ds.clone();
		ds2.getRowSet().clear();
		return ds2;
	}

	/**
	 * 装载记录
	 */
	private static void assemblePojoToDataStore(List list, DataStore ds) {
		Object obj = null;
		try {
			for (int i = 0, l = list.size(); i < l; i++) {
				obj = list.get(i);
				ds.getRowSet().addRow(createRow(obj));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 组装统计信息
	 * 
	 * @param ds
	 * @param statistics
	 */
	public static void assembleStatistics(DataStore ds, Object[] statistics) {
		// 设置总记录
		if (statistics == null || statistics.length == 0
				|| statistics[0] == null)
			return;
		int recordCount = Integer.parseInt(statistics[0].toString());
		ds.setRecordCount(recordCount);
		int index = 1;
		for (Iterator iterator = ds.getStatisticsPatterns().entrySet()
				.iterator(); iterator.hasNext();) {
			Entry entry = (Entry) iterator.next();
			String name = (String) entry.getKey();
			Set patterns = (Set) entry.getValue();
			for (Iterator items = patterns.iterator(); items.hasNext();) {
				String pattern = (String) items.next();
				Number value = (Number) statistics[index];
				ds.addStatistics(name, pattern, value);
				index++;
			}
		}
	}

	/**
	 * 根据实体对象转换成Row对象
	 * 
	 * @param entity
	 * @return
	 * @throws Exception
	 */
	public static Row createRow(Object entity) throws Exception {
		Row row = new RowImpl();
		Set properties = null;
		// 判断entity自身和成员变量，是否含有代理对象
//		if (pojoProxyHandler != null && pojoProxyHandler.isProxy(entity)) {
//			properties = pojoProxyHandler.getEntityProperties(entity);
//		} else {
			properties = getEntityProperties(entity.getClass());
//		}
		String name, pName;
		String[] names;
		Object context;
		for (Iterator iterator = properties.iterator(); iterator.hasNext();) {
			pName = name = (String) iterator.next();
			context = entity;
			if (name.indexOf(".") > 0) {
				names = name.split("\\.");
				for (int k = 0; k < names.length - 1; k++) {
					context = PropertyUtils.getProperty(context, names[k]);
					if (context == null)
						break;
				}
				pName = names[names.length - 1];
			}
			if (context != null) {
				Object pValue = null;
//				if (context instanceof HibernateProxy) {
//					pValue = ((HibernateProxy) context)
//							.getHibernateLazyInitializer().getIdentifier();
//				} else {
					pValue = PropertyUtils.getProperty(context, pName);
					// 属性是常数代码类型
					if (pValue != null && (pValue instanceof CodeType)) {
						pValue = ((CodeType) pValue).getCode();
					}
//				}
				row.setItemValue(name, pValue);
			}

		}
		return row;
	}

	/**
	 * 获取属性值
	 * 
	 * @param obj
	 * @param name
	 * @return
	 */
	public static Object getValue(Object obj, String name) {
		if (obj == null) {
			return null;
		}
		Object context = obj;
		String pName = name;
		try {
			if (name.indexOf(".") > 0) {
				String[] names = name.split("\\.");
				for (int k = 0; k < names.length - 1; k++) {
					context = PropertyUtils.getProperty(context, names[k]);
					if (context == null) {
						return null;
					}
				}
				pName = names[names.length - 1];
			}
			return PropertyUtils.getProperty(context, pName);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 获取值为null的属性key
	 * 
	 * @param entrySet
	 * @return
	 */
	public static Set getKeySetValueIsNull(Set entrySet) {
		Iterator items = entrySet.iterator();
		Entry entry = null;
		String key = null;
		Object value = null;
		Set pojoNameValueNotNull = new HashSet();
		Set keySetValueisNull = new HashSet();
		// 对pojo和属性值进行分类。查找出含有属性值不为空的pojo和属性值为空的属性key
		for (; items.hasNext();) {
			entry = (Entry) items.next();
			key = (String) entry.getKey();
			value = entry.getValue();
			if (key.indexOf(".") > 0) {
				String tempKey = key.substring(0, key.lastIndexOf("."));
				if (pojoNameValueNotNull.contains(tempKey)) {
					continue;
				}
				if (value instanceof JSONObject
						&& ((JSONObject) value).isNullObject()) {
					keySetValueisNull.add(key);
				} else {
					pojoNameValueNotNull.add(tempKey);
				}

			}
		}
		// pojo有些属性不为空，有些属性为空。需要从keySetValueisNull中移除这类pojo对应的属性key
		Iterator ite = pojoNameValueNotNull.iterator();
		for (; ite.hasNext();) {
			String pojoName = (String) ite.next();
			Iterator keyIte = keySetValueisNull.iterator();
			Set removeProPertySet = new HashSet();
			for (; keyIte.hasNext();) {
				String keyValueIsNull = (String) keyIte.next();
				String tempPojoName = keyValueIsNull.substring(0,
						keyValueIsNull.lastIndexOf("."));
				if (tempPojoName.endsWith(pojoName)) {
					removeProPertySet.add(keyValueIsNull);
				}
			}
			if (!removeProPertySet.isEmpty()) {
				keySetValueisNull.removeAll(removeProPertySet);
			}

		}

		return keySetValueisNull;
	}

	/**
	 * 根据Row对象创建Map对象 忽略row的状态信息，只将属性转换到Map中
	 * 
	 * @param row
	 * @return
	 */
	public static Map createMap(Row row) {
		Map rowMap = new HashMap();
		JSONObject rowObj = ((RowImpl) row).getJSONObject();
		Set entrySet = rowObj.entrySet();
		Iterator it = entrySet.iterator();
		Entry entry;
		String key;
		Object value;
		Set emptyPojoKey = PojoUtil_for_yf.getKeySetValueIsNull(entrySet);
		for (; it.hasNext();) {
			entry = (Entry) it.next();
			key = (String) entry.getKey();
			value = entry.getValue();
			// 属性对应pojo的所有属性均为空，该属性不做处理。
			if (emptyPojoKey.contains(key)) {
				continue;
			}
			if (Row.STATUS.equals(key)) {
				continue;
			}
			if (Row.SELECTED.equals(key)) {
				continue;
			}
			if (Row.ORIGIN.equals(key)) {
				continue;
			}
			if (value instanceof JSONObject) {
				if (((JSONObject) value).isNullObject()) {
					value = null;
				}
			}
			if (value == null) {
				rowMap.put(key, null);
			} else {
				rowMap.put(key, value.toString());
			}
		}
		return rowMap;
	}

	/**
	 * 比较两个对象某一个属性值是否相同 相同返回true，否则返回false
	 * 
	 * @param orignPojo
	 * @param obj
	 * @param colName
	 * @return
	 * @throws Exception
	 */
	public static boolean compareObj(Object orignPojo, Object obj,
			String colName) {
		if (orignPojo == null && obj == null) {
			return true;
		}
		if (orignPojo == null || obj == null) {
			return false;
		}
		if (!orignPojo.getClass().getName().equals(obj.getClass().getName())) {
			return false;
		}
		// if (orignPojo instanceof Map && obj instanceof Map) {
		// Map oMap = (Map) orignPojo;
		// Map tMap = (Map) obj;
		// Object tValue = tMap.get(colName);
		// Object oValue = oMap.get(colName);
		// if (oValue == null && tValue == null) {
		// return true;
		// }
		// if (oValue == null || tValue == null) {
		// return false;
		// }
		// String oClazzName = oValue.getClass().getName();
		// String tClazzName = tValue.getClass().getName();
		// if (!oClazzName.equals(tClazzName)) {
		// return false;
		// }
		// if (!oClazzName.toString().startsWith("java.")
		// && !oValue.getClass().isPrimitive()) {
		// return compareObj(oValue, tValue);
		// }
		// if (!oValue.equals(tValue)) {
		// return false;
		// }
		// } else {
		// }
		try {
			Object oldValue = PropertyUtils.getProperty(orignPojo, colName);
			Object newValue = PropertyUtils.getProperty(obj, colName);
			if (oldValue == null || newValue == null) {
				if (oldValue != null || newValue != null) {
					return false;
				}
			} else {
				if (!oldValue.equals(newValue)) {
					return false;
				}
			}
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	/**
	 * 比较两个对象是否内容相同 相同返回false，否则返回true
	 * 
	 * @param orignPojo
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static boolean compareObj(Object orignPojo, Object obj)
			throws Exception {
		Set properties = null;
		if (!orignPojo.getClass().getName().equals(obj.getClass().getName())) {
			return false;
		}
		// // Map对象比较
		// if (orignPojo instanceof Map && obj instanceof Map) {
		// Map oMap = (Map) orignPojo;
		// Map tMap = (Map) obj;
		// Iterator it = tMap.entrySet().iterator();
		// while (it.hasNext()) {
		// Entry entry = (Entry) it.next();
		// Object key = entry.getKey();
		// Object value = entry.getValue();
		// Object oValue = oMap.get(key);
		// if (oValue == null && value == null) {
		// continue;
		// }
		// if (oValue == null || value == null) {
		// return false;
		// }
		// String oClazzName = oValue.getClass().getName();
		// String tClazzName = value.getClass().getName();
		// if (!oClazzName.equals(tClazzName)) {
		// return false;
		// }
		// if (!oClazzName.toString().startsWith("java.")
		// && !oValue.getClass().isPrimitive()) {
		// return compareObj(oValue, value);
		// }
		// if (!oValue.equals(value)) {
		// return false;
		// }
		// }
		// return true;
		// }
		// Pojo对象比较
		// 原始对象包含代理类
		if (pojoProxyHandler != null && pojoProxyHandler.isProxy(orignPojo)) {
			properties = pojoProxyHandler.getEntityProperties(orignPojo);
			Set objProperties = pojoProxyHandler.getEntityProperties(obj);
			if (properties.size() != objProperties.size()) {
				return false;
			}
		} else {
			properties = getEntityProperties(orignPojo.getClass());
		}
		String name, pName;
		String[] names;
		Object oldContext, newContext;
		for (Iterator iterator = properties.iterator(); iterator.hasNext();) {
			pName = name = (String) iterator.next();
			oldContext = orignPojo;
			newContext = obj;
			if (name.indexOf(".") > 0) {
				names = name.split("\\.");
				for (int k = 0; k < names.length - 1; k++) {
					oldContext = PropertyUtils
							.getProperty(oldContext, names[k]);
					newContext = PropertyUtils
							.getProperty(newContext, names[k]);
					if (oldContext == null || newContext == null) {
						if (oldContext != null || newContext != null) {
							return false;
						}
						break;
					}
				}
				pName = names[names.length - 1];
			}
			if (oldContext != null && newContext != null) {
				Object oldValue = PropertyUtils.getProperty(oldContext, pName);
				Object newValue = PropertyUtils.getProperty(newContext, pName);
				if (oldValue == null) {
					if (newValue != null) {
						return false;
					}
				} else {
					if (!oldValue.equals(newValue)) {
						return false;
					}
				}
			}

		}
		return true;
	}

	/**
	 * 返回目前对象修改的属性列表
	 * 
	 * @param orignPojo
	 *            原始对象
	 * @param obj
	 *            目标对象
	 * @return
	 * @throws Exception
	 */
	public static void cancelModidiedProperties(Object orignPojo, Object obj)
			throws Exception {
		if (orignPojo == null || obj == null) {
			return;
		}
		Set properties = null;
		if (!orignPojo.getClass().getName().equals(obj.getClass().getName())) {
			return;
		}
		if (pojoProxyHandler != null && pojoProxyHandler.isProxy(orignPojo)) {
			properties = pojoProxyHandler.getEntityProperties(orignPojo);
		} else {
			properties = getEntityProperties(orignPojo.getClass());
		}
		String name, pName;
		String[] names;
		Object oldContext, newContext;
		for (Iterator iterator = properties.iterator(); iterator.hasNext();) {
			pName = name = (String) iterator.next();
			oldContext = orignPojo;
			newContext = obj;
			if (name.indexOf(".") > 0) {
				names = name.split("\\.");
				for (int k = 0; k < names.length - 1; k++) {
					oldContext = PropertyUtils
							.getProperty(oldContext, names[k]);
					newContext = PropertyUtils
							.getProperty(newContext, names[k]);
					if (oldContext == null || newContext == null) {
						if (oldContext != null || newContext != null) {
							// if (!modifiedList.contains(names[k])) {
							// modifiedList.add(names[k]);
							// }
							PropertyUtils
									.setProperty(obj, names[k], oldContext);
						}
						break;
					}
				}
				pName = names[names.length - 1];
			}
			if (oldContext != null && newContext != null) {
				Object oldValue = PropertyUtils.getProperty(oldContext, pName);
				Object newValue = PropertyUtils.getProperty(newContext, pName);
				if (oldValue == null) {
					if (newValue != null) {
						// modifiedList.add(name);
						PropertyUtils.setProperty(newContext, pName, null);
					}
				} else {
					if (!oldValue.equals(newValue)) {
						// modifiedList.add(name);
						PropertyUtils.setProperty(newContext, pName, oldValue);
					}
				}
			}
		}
	}

	/**
	 * 返回目前对象修改的属性列表
	 * 
	 * @param orignPojo
	 *            原始对象
	 * @param obj
	 *            目标对象
	 * @param contextMap
	 * @return
	 * @throws Exception
	 */
	public static List getModidiedProperties(Object orignPojo, Object obj,
			Map contextMap) throws Exception {
		Set properties = null;
		if (!orignPojo.getClass().getName().equals(obj.getClass().getName())) {
			return null;
		}
		List modifiedList = new ArrayList();
		if (pojoProxyHandler != null && pojoProxyHandler.isProxy(orignPojo)) {
			properties = pojoProxyHandler.getEntityProperties(orignPojo);
		} else {
			properties = getEntityProperties(orignPojo.getClass());
		}
		String name, pName;
		String[] names;
		Object oldContext, newContext;
		Object refInfo = contextMap
				.get(ContextUtil.ORIGIN_DATA_INFO_CASCADE_REFERENCE);
		Map refMap = null;
		if (refInfo instanceof Map) {
			refMap = (Map) refInfo;
		}
		for (Iterator iterator = properties.iterator(); iterator.hasNext();) {
			pName = name = (String) iterator.next();
			oldContext = orignPojo;
			newContext = obj;
			boolean isPojoModified = false;
			if (name.indexOf(".") > 0) {
				names = name.split("\\.");
				for (int k = 0; k < names.length - 1; k++) {
					oldContext = PropertyUtils
							.getProperty(oldContext, names[k]);
					newContext = PropertyUtils
							.getProperty(newContext, names[k]);
					if (newContext != refMap.get(names[k])
							|| ((oldContext == null || newContext == null) && (oldContext != null || newContext != null))) {
						String refName = "";
						for (int refIndex = 0; refIndex <= k; refIndex++) {
							refName += names[refIndex];
							if (refIndex != k) {
								refName += ".";
							}
						}
						if (!modifiedList.contains(refName)) {
							modifiedList.add(refName);
						}
						isPojoModified = true;
						break;
					}
				}
				pName = names[names.length - 1];
			}
			if (oldContext != null && newContext != null && !isPojoModified) {
				Object oldValue = PropertyUtils.getProperty(oldContext, pName);
				Object newValue = PropertyUtils.getProperty(newContext, pName);
				if (oldValue == null) {
					if (newValue != null) {
						modifiedList.add(name);
					}
				} else {
					if (!oldValue.equals(newValue)) {
						modifiedList.add(name);
					}
				}
			}
		}
		return modifiedList;
	}

}
