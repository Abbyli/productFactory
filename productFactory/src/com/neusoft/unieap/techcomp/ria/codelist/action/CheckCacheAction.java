package com.neusoft.unieap.techcomp.ria.codelist.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

//import net.sf.json.JSONObject;

import com.alibaba.fastjson.JSONObject;
import com.neusoft.unieap.techcomp.cache.cachesynchronize.CacheStatus;
import com.neusoft.unieap.techcomp.cache.cachesynchronize.CacheSynchronizeManager;
import com.neusoft.unieap.techcomp.cache.cachesynchronize.util.DateUtil;
import com.neusoft.unieap.techcomp.ria.action.BaseProcessor;
import com.neusoft.unieap.techcomp.ria.codelist.CodeList;
import com.neusoft.unieap.techcomp.ria.codelist.CodeListManager;
import com.neusoft.unieap.techcomp.ria.codelist.entity.Code;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataCenterFactory;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.RowSet;
//import com.neusoft.unieap.techcomp.ria.util.JSONUtils;

public class CheckCacheAction extends BaseProcessor {

	private static final String CODENAME = "CODENAME";
	private static final String CODEVALUE = "CODEVALUE";
	private static final String ID = "ID";
	private static final String PARENTID = "PARENTID";
	private static final String FILTER = "FILTER";

	private CodeListManager codeListManager = null;

	private CacheSynchronizeManager cacheSynchronizeManager = null;

	/**
	 * 注入缓存同步管理器
	 * 
	 * @param cacheSynchronizeManager
	 */
	public void setCacheSynchronizeManager(
			CacheSynchronizeManager cacheSynchronizeManager) {
		this.cacheSynchronizeManager = cacheSynchronizeManager;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -1223163629283832802L;

	private Long getCodeTimeStamp(String codelistKey) {
		Map cacheStatus = cacheSynchronizeManager.getAllCacheStatus();
		if (codelistKey != null && !codelistKey.equals("")) {
			String cacheType = "codelist_" + codelistKey;
			if (cacheStatus != null) {
				CacheStatus cs = (CacheStatus) cacheStatus.get(cacheType);
				if (cs != null) {
					Date d = DateUtil.stringToDate(cs.getUpdateTime(),
							"YYYY-MM-DD HH24:MI:SS");
					if (d != null) {
						return Long.valueOf(d.getTime());
					}
				}
			}
		}
		return null;
	}

	public void checkCacheData() throws Exception {
		ViewContext context = generateContext();

		DataCenterFactory instance = DataCenterFactory.getInstance();
		DataCenter dc = instance.createDataCenter();
		String mode = (String) context.get("mode");
		if (mode.equals("check")) {
			// 检查时间戳
			JSONObject timeStamps;
			Object timeStampsObj = context.get("timeStamps");
			if (timeStampsObj instanceof String) {
				timeStamps = JSONObject.parseObject(timeStampsObj.toString());
			} else {
				timeStamps = (JSONObject) timeStampsObj;
			}
			if (timeStamps != null) {
				Iterator items = timeStamps.entrySet().iterator();
				JSONObject updateTimeStamps = new JSONObject();
				while (items.hasNext()) {
					Entry entry = (Entry) items.next();
					String key = (String) entry.getKey();
					Long value = (Long) entry.getValue();
					long clientTimeStamp = value.longValue();
					// 获取cacheSychronize中的数据
					Long serverTimeStamp = getCodeTimeStamp(key);
					// 如果客户端时间晚于服务端时间，更新客户端缓存数据
					if (serverTimeStamp == null) {
						updateTimeStamps.put(key, Long.valueOf(0));
					} else if (clientTimeStamp != serverTimeStamp.longValue()) {
						updateTimeStamps
								.put(key, Long.valueOf(serverTimeStamp));
					}
				}
				dc.addParameter("timeStamps", updateTimeStamps);
			}
		} else if (mode.equals("update")) {
			// update模式，如果时间戳不一致，则将最新的数据一起返回给客户端
			JSONObject timeStamps;
			Object timeStampsObj = context.get("timeStamps");
			if (timeStampsObj instanceof String) {
				timeStamps = JSONObject.parseObject(timeStampsObj.toString());
			} else {
				timeStamps = (JSONObject) timeStampsObj;
			}
			if (timeStamps != null) {
				Iterator items = timeStamps.entrySet().iterator();
				JSONObject updateTimeStamps = new JSONObject();
				if (timeStamps.size() > 0) {
					while (items.hasNext()) {
						Entry entry = (Entry) items.next();
						String key = (String) entry.getKey();
						Long value = (Long) entry.getValue();
						long clientTimeStamp = value.longValue();
						// 获取cacheSychronize中的数据
						Long serverTimeStamp = getCodeTimeStamp(key);
						// 如果客户端时间晚于服务端时间，更新客户端缓存数据
						if (serverTimeStamp == null) {
							DataStore ds = getCodeListDSByKey(key);
							if (ds != null) {
								updateTimeStamps.put(key, Long.valueOf(0));
								dc.addDataStore(ds);
							}
						} else if (clientTimeStamp != serverTimeStamp
								.longValue()) {
							DataStore ds = getCodeListDSByKey(key);
							if (ds != null) {
								updateTimeStamps.put(key, Long
										.valueOf(serverTimeStamp));
								dc.addDataStore(ds);
							}
						}
					}
				} else {
					// 获取所有时间codeList
					List<DataStore> allCodeListDS = getAllCodeListDS();
					for (DataStore ds : allCodeListDS) {
						String storeName = ds.getStoreName();
						Long serverTimeStamp = getCodeTimeStamp(storeName);
						dc.addDataStore(ds);
						updateTimeStamps.put(storeName, Long
								.valueOf(serverTimeStamp));
					}
				}
				dc.addParameter("timeStamps", updateTimeStamps);
			}
		}

		super.write(dc);
	}

	private List<DataStore> getAllCodeListDS() {
		List<DataStore> allCodeListDS = new ArrayList<DataStore>();
		List<CodeList> allCodeList = getCodeListManager().getAllCodeList();
		if (allCodeList != null && allCodeList.size() > 0) {
			for (CodeList codeList : allCodeList) {
				allCodeListDS.add(generateCodeListStore(codeList));
			}
		}
		return allCodeListDS;
	}

	private DataStore getCodeListDSByKey(String key) {
		CodeList codeList = getCodeListManager().getCodeList(key);
		if (codeList != null) {
			return generateCodeListStore(codeList);
		}
		return null;
	}

	private DataStore generateCodeListStore(CodeList codeList) {
		DataStore ds = DataCenterFactory.getInstance().createDataStore(
				codeList.getName());
		RowSet rs = ds.getRowSet();
		Code code = null;
		List list = new ArrayList();
		List temp = codeList.getSoleCodeList();
		if (temp != null) {
			list.addAll(temp);
		}
		for (int j = 0; j < list.size(); j++) {
			code = (Code) list.get(j);
			Map map = new HashMap();
			map.put(ID, code.getCodeValue());
			map.put(CODENAME, code.getCodeName());
			map.put(CODEVALUE, code.getCodeValue());
			map.put(PARENTID, code.getParent());
			map.put(FILTER, code.getFilter());
			rs.addRowData(map);
		}
		return ds;
	}

	public void setCodeListManager(CodeListManager codeListManager) {
		this.codeListManager = codeListManager;
	}

	public CodeListManager getCodeListManager() {
		return codeListManager;
	}

}
