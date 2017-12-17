package com.neusoft.unieap.techcomp.ria.action;



import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.neusoft.unieap.core.CoreVariability;
import com.neusoft.unieap.core.base.bo.BaseBO;
import com.neusoft.unieap.core.base.model.DCRepository;
import com.neusoft.unieap.core.base.model.DevelopmentComponent;
import com.neusoft.unieap.core.context.UniEAPContextHolder;
import com.neusoft.unieap.core.fileupload.FileAttachment;
import com.neusoft.unieap.core.page.Page;
import com.neusoft.unieap.techcomp.cache.EAPCacheManager;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.context.impl.ViewContextImpl;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.OrderImpl;
import com.neusoft.unieap.techcomp.ria.ds.PageImpl;
import com.neusoft.unieap.techcomp.ria.ds.impl.DataCenterImpl;
import com.neusoft.unieap.techcomp.ria.ds.impl.DataStoreImpl;
import com.neusoft.unieap.techcomp.ria.entity.Custom;
import com.neusoft.unieap.techcomp.ria.individual.bo.GridIndividualBO;
import com.neusoft.unieap.techcomp.ria.io.DataCenterIOManager;
import com.neusoft.unieap.techcomp.ria.util.PojoUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 页面请求基础入口类
 */
public class BaseEntry extends ActionSupport implements ServletRequestAware,
		ServletResponseAware, SessionAware {

	private static final long serialVersionUID = -6878193283750803946L;

	/**
	 * dataCenter对应key标识
	 */
	public final static String DCTAG = "request-dc";
	/**
	 * 页面默认编码
	 */
	public final static String CONTENT_TYPE = "text/html;charset=UTF-8";
	/**
	 * request请求对象
	 */
	private HttpServletRequest request;
	/**
	 * response相应对象
	 */
	private HttpServletResponse response;
	/**
	 * session缓存
	 */
	private Map session;
	/**
	 * 基础BO对象
	 */
	private BaseBO baseBO;
	
	/**
	 * grid个性化BO
	 */
	private GridIndividualBO gridIndividualBO;
	
	private EAPCacheManager eapCacheManager;
	
	public static final String CACHE_NAME = "gridIndividual";


	public EAPCacheManager getEapCacheManager() {
		return eapCacheManager;
	}

	public void setEapCacheManager(EAPCacheManager eapCacheManager) {
		this.eapCacheManager = eapCacheManager;
	}

	public GridIndividualBO getGridIndividualBO() {
		return gridIndividualBO;
	}

	public void setGridIndividualBO(GridIndividualBO gridIndividualBO) {
		this.gridIndividualBO = gridIndividualBO;
	}

	/**
	 * 设置request请求对象实例
	 * 
	 * @param request
	 *            请求对象
	 */
	public final void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	/**
	 * 设置response相应对象实例
	 * 
	 * @param response
	 *            相应对象
	 */
	public final void setServletResponse(HttpServletResponse response) {
		this.response = response;
		response.setContentType(CONTENT_TYPE);
	}

	/**
	 * 设置session对象实例
	 * 
	 * @param session
	 *            session对象
	 */
	public final void setSession(Map session) {
		this.session = session;
	}

	/**
	 * 获取request对象实例
	 */
	public final HttpServletRequest getRequest() {
		return request;
	}

	/**
	 * 获取response对象实例
	 */
	public final HttpServletResponse getResponse() {
		return response;
	}

	/**
	 * 获取session对象实例
	 */
	public final Map getSession() {
		return session;
	}

	/**
	 * 判断key是否在context中
	 * 
	 * @param context
	 *            上下文对象
	 * @param key
	 *            参数键值
	 * @return
	 */
	private boolean isExistParameter(ViewContext context, Object key) {
		return context.containsKey(key);
	}

	/**
	 * 获取上下文对象
	 * 
	 * @return
	 * @throws Exception
	 */
	protected final ViewContext generateContext() throws Exception {
		ViewContext context = new ViewContextImpl();

		DataCenter dataCenter = DataCenterIOManager.createReader(
				request.getInputStream()).parse();

		// add by lugj 增加对form提交的处理(导出excel)
		if (request.getParameter("data") != null) {
			dataCenter = DataCenterIOManager.createReader(
					request.getParameter("data")).parse();
		}
		// add by lugj 增加对上传的支持
		if (request.getParameter("dc") != null) {
			dataCenter = DataCenterIOManager.createReader(
					request.getParameter("dc")).parse();
		}
		// add by wukj 增加view forward 传递datacenter的功能
		if (request.getParameter("_forwardDataCenter") != null) {
			dataCenter = DataCenterIOManager.createReader(
					request.getParameter("_forwardDataCenter")).parse();
		}
		// add end
		Map parameters = dataCenter.getParameters();
		((ViewContextImpl) context).setDc(dataCenter);
		context.putAll(parameters);
		Map parameterMap = request.getParameterMap();
		Iterator it = parameterMap.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String key = entry.getKey().toString();
			Object value = entry.getValue();
			if ("_forwardDataCenter".equals(key)) {
				continue;
			}
			if (value.getClass().isArray()) {
				if (Array.getLength(value) == 1) {
					context.put(key, request.getParameter(key));
				} else {
					context.put(key, value);
				}
			}
		}
		List dataStores = dataCenter.getDataStores();
		DataStore dataStoreToPage = null;
		boolean isToPage = false;
		for (int i = 0; i < dataStores.size(); i++) {
			DataStore dataStore = (DataStore) dataStores.get(i);
			String storeName = dataStore.getStoreName();
			// if (isExistParameter(context, storeName))
			// throw new RIAException(
			// RIAExceptionCode.RIA_REQUEST_PARAMETER_AND_DS_NAME_SAME,
			// new Object[] { storeName, storeName });
			JSONObject jsonObject = ((DataStoreImpl)dataStore).getJSONObject();
			//如果传入的是dataStore是null
			if(jsonObject.isNullObject()){
				context.put(storeName, null);
			}else{
				context.put(storeName, dataStore);
				if (!isToPage) {
					if (dataStore.getPageSize() > 0
							&& dataStore.getPageNumber() > 0) {
						dataStoreToPage = dataStore;
						if (dataStore.getPageSize() == Integer.MAX_VALUE) {
							DevelopmentComponent dc = DCRepository
									.getDevelopmentComponent(Page.class);
							int sizeFromVar = CoreVariability.getGridPageSize();
							dataStoreToPage.setPageSize(sizeFromVar);
						}
						Page page = this.createPage(dataStoreToPage);
						UniEAPContextHolder.getContext().addCustomProperty(
								Page.PAGE_CONTEXT_KEY, page);
						isToPage = true;
					}

				}
			}
		}
		// 设置上传附件的信息
		List fileAttachments = (List) request
				.getAttribute(FileAttachment.REQUEST_ATTRIBUTE_NAME);
		UniEAPContextHolder.getContext().addCustomProperty(
				FileAttachment.REQUEST_ATTRIBUTE_NAME, fileAttachments);
		((ViewContextImpl) context).setFileAttachmens(fileAttachments);
		return context;
	}

	/**
	 * 把DataCenter对象添加到Request的属性中
	 * 
	 * @param dc
	 *            DataCenter对象
	 */
	protected final void attach2Request(DataCenter dc) {
		request.setAttribute(DCTAG, dc);
	}

	/**
	 * 获取基础BO对象
	 */
	public final BaseBO getBaseBO() {
		return baseBO;
	}

	/**
	 * 设置基础BO对象
	 * 
	 * @param baseBO
	 *            基础BO对象
	 */
	public final void setBaseBO(BaseBO baseBO) {
		this.baseBO = baseBO;
	}

	/**
	 * 查询一个DataStore数据
	 * 
	 * @param ds
	 *            DataStore对象
	 * @return
	 */
	protected final DataStore queryDS(DataStore ds) {
		String pojoClassName = ds.getRowSetName();
		int pageNumber = ds.getPageNumber();
		int pageSize = ds.getPageSize();
		String condition = ds.getCondition();
		Object[] parameters = ds.getConditionValues().toArray();
		String order = ds.getOrder();
		List pojoList = baseBO.queryPOJOList(pojoClassName, condition,
				parameters, order, pageNumber, pageSize);
		return PojoUtil.toDataStore(pojoList, ds);
	}

	/**
	 * 查询DataCenter中所有的DataStore数据
	 * 
	 * @param dc
	 *            DataCenter对象
	 * @return
	 */
	protected final DataCenter queryDC(DataCenter dc) {
		DataCenter newdc = new DataCenterImpl();
		List list = dc.getDataStores();
		for (int i = 0, l = list.size(); i < l; i++) {
			DataStore ds = (DataStore) list.get(i);
			newdc.addDataStore(queryDS(ds));
		}
		return newdc;
	}

	/**
	 * 统计一个DataStore数据
	 * 
	 * @param ds
	 *            DataStore对象
	 */
	protected final void countDS(DataStore ds) {
		String pojoClassName = ds.getRowSetName();
		String condition = ds.getCondition();
		Object[] parameters = ds.getConditionValues().toArray();
		Map statistics = ds.getStatisticsPatterns();
		Object[] result = baseBO.queryPOJOListCount(pojoClassName, condition,
				parameters, statistics);
		PojoUtil.assembleStatistics(ds, result);
	}

	/**
	 * 统计DataCenter中所有的DataStore信息
	 * 
	 * @param dc
	 *            DataCenter对象
	 */
	protected final void countDC(DataCenter dc) {
		List list = dc.getDataStores();
		for (int i = 0, l = list.size(); i < l; i++) {
			DataStore ds = (DataStore) list.get(i);
			countDS(ds);
		}
	}

	/**
	 * 根据DataStore信息创建对应的Page信息
	 * 
	 * @param dataStoreToPage
	 *            传入的DataStore对象
	 * @return
	 */
	private Page createPage(DataStore dataStoreToPage) {
		PageImpl page = new PageImpl();
		page.setCondition(dataStoreToPage.getCondition());
		page.setConditionValues(dataStoreToPage.getConditionValues());
		page.setPageNumber(dataStoreToPage.getPageNumber());
		page.setSize(dataStoreToPage.getPageSize());
		page.setRowSetName(dataStoreToPage.getRowSetName());
		String orderStr = dataStoreToPage.getOrder();
		List orders = new ArrayList();
		if (orderStr != null && !"".equals(orderStr.trim())) {
			// 拆分order创建Order对象
			String[] orderArray = orderStr.split(",");
			for (int i = 0; i < orderArray.length; i++) {
				String tempOrder = orderArray[i].trim();
				String[] orderType = tempOrder.split(" ");
				OrderImpl order = new OrderImpl();
				order.setOrderStyle(orderType[orderType.length - 1]);
				order.setPropertyName(orderType[0]);
				orders.add(order);
			}
		}
		page.setOrders(orders);
		return page;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	protected final void getIndividual(DataCenter dc) {
		String path = (String) dc.getParameter("path");
		String userId = (String) dc.getParameter("userId");
		//lianggh:去掉对cache的依赖
//		Map<String, List> cache = (Map<String, List>) eapCacheManager.get(CACHE_NAME);
//		if (cache == null ) {
//			cache = new HashMap<String, List>();
//			eapCacheManager.put(CACHE_NAME,cache,  false);
//		}
//		List cachelist = cache.get(userId);
		List cachelist = null;
		if (cachelist==null) {
			cachelist = gridIndividualBO.getIndividualByUser(userId);
//			cache.put(userId, cachelist);
		}
		List list = new ArrayList();
		if (path == null) {
			path = "";
		}
		for (int j = 0; j < cachelist.size(); j++) {
			Custom c = (Custom) cachelist.get(j);
			if (path.equals(c.getPath())) {
				list.add(c);
			}
		}
		String content = "";
		JSONObject jsonObject = new JSONObject();
		if (list != null && list.size() > 0) {
			int len = list.size();
			for (int i = 0; i < len; i++) {
				jsonObject.put(((Custom) list.get(i)).getCmpId(),
						((Custom) list.get(i)).getContent());
			}
			content = jsonObject.toString();
		}
		dc.addParameter("individual", content);
	}

	protected final void setIndividual(DataCenter dc) {
		String path = (String) dc.getParameter("path");
		String userId = (String) dc.getParameter("userId");
		String content = (String) dc.getParameter("content").toString();
		String cmpId = (String) dc.getParameter("cmpId");
		if ("[]".equals(content)) { // 删除个性化信息
			gridIndividualBO.delIndividual(userId, path, cmpId);
		} else { // 更改个性化信息
			List list = gridIndividualBO.getIndividual(userId, path);
			if (list == null || list.size() == 0) {
				Custom custom = new Custom();
				custom.setCmpId(cmpId);
				custom.setContent(content);
				custom.setPath(path);
				custom.setUserId(userId);
				gridIndividualBO.saveIndividual(custom);
			} else {
				gridIndividualBO.updateIndividual(userId, path, cmpId, content);
			}
		}
		//更新缓存
		Map<String, List> cache = (Map<String, List>) eapCacheManager.get(CACHE_NAME);
		if (cache == null) {
			cache = new HashMap<String, List>();
			eapCacheManager.put(CACHE_NAME,cache,  false);
		}
		List cachelist = gridIndividualBO.getIndividualByUser(userId);
		cache.put(userId, cachelist);
	}
}
