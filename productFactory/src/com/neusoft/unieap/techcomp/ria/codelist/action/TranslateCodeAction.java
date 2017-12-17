package com.neusoft.unieap.techcomp.ria.codelist.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

//import com.alibaba.fastjson.JSONArray;
import com.neusoft.fdframework.codelist.entity.Code;
import com.neusoft.fdframework.codelist.util.CodeListActionUtil;
import com.neusoft.unieap.techcomp.cache.cachesynchronize.CacheSynchronizeManager;
import com.neusoft.unieap.techcomp.ria.action.BaseProcessor;
import com.neusoft.unieap.techcomp.ria.codelist.CodeListManager;
import com.neusoft.unieap.techcomp.ria.codelist.util.Util;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataCenterFactory;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.RowSet;

public class TranslateCodeAction extends BaseProcessor {

	private static final long serialVersionUID = -6305728536322552835L;
	private String STORE = "store";
	private static final String CODENAME = "CODENAME";
	private static final String CODEVALUE = "CODEVALUE";
	private static final String ID = "ID";
	private static final String PARENTID = "PARENTID";
	private static final String FILTER = "FILTER";

	private CodeListManager codeListManager = null;

	private CacheSynchronizeManager cacheSynchronizeManager = null;

	/**
	 * 注入代码表管理器
	 * 
	 * @param codeListManager
	 */
	public void setCodeListManager(CodeListManager codeListManager) {
		this.codeListManager = codeListManager;
	}

	/**
	 * 注入缓存同步管理器
	 * 
	 * @param cacheSynchronizeManager
	 */
	public void setCacheSynchronizeManager(CacheSynchronizeManager cacheSynchronizeManager) {
		this.cacheSynchronizeManager = cacheSynchronizeManager;
	}

	/**
	 * 通过RIA的<code>DataStore</code>请求的代码表唯一键获取有效代码集合，在集合中只包含代码唯一键及代码名称两个属性。 <br>
	 * 如果页面上只有一个控件需要绑定代码表，则调用此方法获取控件所需要的代码表数据。
	 * 
	 * @throws Exception
	 */
	public void getSingleCodeListByStore() throws Exception {
		ViewContext context = generateContext();
		String codeListKey = context.getString(STORE);
		DataCenterFactory instance = DataCenterFactory.getInstance();
		DataCenter dc = instance.createDataCenter();
		if (Util.isNullOrEmpty(codeListKey)) {
			write(dc);
			return;
		}
		com.neusoft.fdframework.codelist.entity.CodeList codeListTmp = CodeListActionUtil.getCodeList(codeListKey);
		List<Code> codeList = codeListTmp != null ? CodeListActionUtil.getCodeList(codeListKey).getCode() : null;
		if (codeList != null) {
			DataStore ds = instance.createDataStore(codeListKey.trim());
			RowSet rs = ds.getRowSet();
			Code code = null;
			List list = new ArrayList();
			if (codeList != null) {
				list.addAll(codeList);
			}
			for (int j = 0; j < list.size(); j++) {
				code = (Code) list.get(j);
				Map map = new HashMap();
				map.put(ID, code.getCodeValue());
				map.put(CODENAME, code.getCodeName());
				map.put(CODEVALUE, code.getCodeValue());
				map.put(PARENTID, code.getParent());
				map.put(FILTER, null);
				rs.addRowData(map);
			}
			dc.addDataStore(ds);
			Long timestamp = getCodeTimeStamp(codeListKey);
			if (timestamp != null) {
				dc.addParameter(codeListKey, timestamp);
			}
		}
		super.write(dc);
	}

	/**
	 * 通过RIA的<code>DataStore</code>请求的代码表唯一键获取所有代码集合，在集合中只包含代码唯一键及代码名称两个属性。
	 * 
	 * @throws Exception
	 */
	public void getAllCodesByCodelistKey() throws Exception {
		ViewContext context = generateContext();
		String codeListKey = context.getString(STORE);
		DataCenterFactory instance = DataCenterFactory.getInstance();
		DataCenter dc = instance.createDataCenter();
		if (Util.isNullOrEmpty(codeListKey)) {
			write(dc);
			return;
		}
		super.write(dc);
	}

	/**
	 * 通过request请求的代码表唯一键获取代码集合，在集合中只包含代码唯一键及代码名称两个属性。 <br>
	 * 如果页面上只有一个控件需要绑定代码表，则调用此方法获取控件所需要的代码表数据。
	 * 
	 * @throws Exception
	 */
	public void getSingleCodesListByParam() throws Exception {
		String codeListKey = super.generateContext().getString("codeListCoding");
		DataCenterFactory instance = DataCenterFactory.getInstance();
		DataCenter dc = instance.createDataCenter();
		if (Util.isNullOrEmpty(codeListKey)) {
			write(dc);
			return;
		}
		codeListKey = codeListKey.trim();
		
		com.neusoft.fdframework.codelist.entity.CodeList codeListTmp = CodeListActionUtil.getCodeList(codeListKey);
		List<Code> codeList = codeListTmp != null ? CodeListActionUtil.getCodeList(codeListKey).getCode() : null;
		if (codeList != null) {
			DataStore ds = instance.createDataStore(codeListKey);
			RowSet rs = ds.getRowSet();
			Code code = null;
			List list = new ArrayList();
			if (codeList != null) {
				list.addAll(codeList);
			}
			for (int j = 0; j < list.size(); j++) {
				code = (Code) list.get(j);
				Map map = new HashMap();
				map.put(ID, code.getCodeValue());
				map.put(CODENAME, code.getCodeName());
				map.put(CODEVALUE, code.getCodeValue());
				map.put(PARENTID, code.getParent());
				map.put(FILTER, null);
				rs.addRowData(map);
			}
			dc.addDataStore(ds);
			Long timestamp = getCodeTimeStamp(codeListKey);
			if (timestamp != null) {
				dc.addParameter(codeListKey, timestamp);
			}
		}
		super.write(dc);
	}

	/**
	 * 获取多个代码表及其包含的代码集合，集合中的代码只包含唯一键和代码名称两个属性。 <br>
	 * 如果页面上有多个控件需要绑定不同的代码表，则调用此方法获取所有控件所需要的代码表数据。
	 * 
	 * @throws Exception
	 */
	public void getMultiCodeList() throws Exception {
		getResponse().reset();
		ViewContext context = generateContext();
		JSONArray array = (JSONArray) context.get("stores");
		DataCenterFactory instance = DataCenterFactory.getInstance();
		DataCenter dc = instance.createDataCenter();
		if (array == null) {
			write(dc);
			return;
		}
		for (int i = 0; i < array.size(); i++) {
			String codeListKey = array.getString(i);
			if (!codeListKey.trim().equals("")) {
				com.neusoft.fdframework.codelist.entity.CodeList codeListTmp = CodeListActionUtil.getCodeList(codeListKey);
				List<Code> codeList = codeListTmp != null ? CodeListActionUtil.getCodeList(codeListKey).getCode() : null;
				if (codeList != null) {
					DataStore ds = instance.createDataStore(codeListKey);
					RowSet rs = ds.getRowSet();
					Code code = null;
					List list = new ArrayList();
					if (codeList != null) {
						list.addAll(codeList);
					}
					for (int j = 0; j < list.size(); j++) {
						code = (Code) list.get(j);
						Map map = new HashMap();
						map.put(ID, code.getCodeValue());
						map.put(CODENAME, code.getCodeName());
						map.put(CODEVALUE, code.getCodeValue());
						map.put(PARENTID, code.getParent());
						map.put(FILTER, null);
						rs.addRowData(map);
					}
					dc.addDataStore(ds);
					Long timestamp = getCodeTimeStamp(codeListKey);
					if (timestamp != null) {
						dc.addParameter(codeListKey, timestamp);
					}
				}
			}
		}
		super.write(dc);
	}

	private Long getCodeTimeStamp(String codelistKey) {
		// Map cacheStatus = cacheSynchronizeManager.getAllCacheStatus();
		// if(codelistKey != null && !codelistKey.equals("")){
		// String cacheType = CodeListCache.REGION_NAME + "_" + codelistKey;
		// if(cacheStatus != null){
		// CacheStatus cs = (CacheStatus)cacheStatus.get(cacheType);
		// if(cs !=null){
		// Date d = DateUtil.stringToDate(cs.getUpdateTime(),
		// "YYYY-MM-DD HH24:MI:SS");
		// if(d != null){
		// return Long.valueOf(d.getTime());
		// }
		// }
		// }
		// }
		return null;
	}
}
