package com.neusoft.unieap.techcomp.ria.export.action;

import java.io.OutputStream;
import java.lang.reflect.Array;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.neusoft.unieap.core.page.PageUtil;
import com.neusoft.unieap.techcomp.ria.RIAException;
import com.neusoft.unieap.techcomp.ria.common.util.CommonUtil;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.context.impl.ViewContextImpl;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.impl.DataStoreImpl;
import com.neusoft.unieap.techcomp.ria.export.GridExport;
import com.neusoft.unieap.techcomp.ria.io.DataCenterIOManager;
import com.neusoft.unieap.techcomp.ria.util.Base64;
import com.opensymphony.xwork2.ActionSupport;

public class CsvExportAction extends ActionSupport implements
		ServletRequestAware, ServletResponseAware, ApplicationContextAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5190096257036218733L;

	private static final String EXPORT_CSV = "csv";
	private static final String EXPORT_EXCEL = "excel";
	/**
	 * request请求对象
	 */
	private HttpServletRequest request;
	/**
	 * response相应对象
	 */
	private HttpServletResponse response;

	private ApplicationContext applicationContext;

	// 服务端导出最大数量限制
	private int serverExportMaxCount = -1;

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;

	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setApplicationContext(ApplicationContext appContext)
			throws BeansException {
		this.applicationContext = appContext;
	}

	public void setServerExportMaxCount(int serverExportMaxCount) {
		this.serverExportMaxCount = serverExportMaxCount;
	}

	/**
	 * 获取上下文对象
	 * 
	 * @return
	 * @throws Exception
	 */
	protected final ViewContext generateContext(String data) throws Exception {
		ViewContext context = new ViewContextImpl();
		//request.setCharacterEncoding("GBK");
		DataCenter dataCenter = DataCenterIOManager.createReader(
				request.getParameter(data)).parse();

		Map parameters = dataCenter.getParameters();
		((ViewContextImpl) context).setDc(dataCenter);
		context.putAll(parameters);

		Map parameterMap = request.getParameterMap();
		Iterator it = parameterMap.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry entry = (Map.Entry) it.next();
			String key = entry.getKey().toString();
			Object value = entry.getValue();
			if (value.getClass().isArray()) {
				if (Array.getLength(value) == 1) {
					context.put(key, request.getParameter(key));
				} else {
					context.put(key, value);
				}
			}
		}
		List dataStores = dataCenter.getDataStores();
		for (int i = 0; i < dataStores.size(); i++) {
			DataStore dataStore = (DataStore) dataStores.get(i);
			String storeName = dataStore.getStoreName();
			context.put(storeName, dataStore);
		}

		String type = context.getString("type");
		if (type.equals("server")) {
			int maxExportCount = -1;
			// 以Grid导出parameter中设置的最大导出数量优先
			String maxCount = context.getString("count");
			if (maxCount != null) {
				maxExportCount = Integer.valueOf(maxCount);
			} else {
				// 当未设置parameter，则走bean中配置的最大导出数量
				maxExportCount = serverExportMaxCount;
			}
			// 针对自动分页
			if (maxExportCount != -1) {
				PageUtil.setPageNumber(1);
				PageUtil.setPageSize(maxExportCount);
				PageUtil.setAutoCalcCount(true);
			} else {
				PageUtil.setPageNumber(1);
				PageUtil.setPageSize(serverExportMaxCount);
				PageUtil.setAutoCalcCount(true);
			}
			// 对于服务端导出来说，需取出gridstore的parameters
			String gridStoreName = context.getString("dsName");
			DataStore gridStore = context.getDataStore(gridStoreName);

			// 将查询条件store解析出来放入context中
			if (gridStore != null) {
				Map gridParas = gridStore.getParameters();
				if (gridParas != null && !gridParas.isEmpty()) {
					context.putAll(gridParas);
					DataStore condition = null;
					Set keySet = gridParas.keySet();
					for (Object obj : keySet) {
						if (obj.toString().equalsIgnoreCase("_exportDS")) {
							continue;
						}
						String jsonStr = gridParas.get(obj).toString();
						if (jsonStr.equals("null")) {
							context.put(obj.toString(), null);
							continue;
						}
						if (jsonStr.trim().equals("")) {
							context.put(obj.toString(), "");
							continue;
						}
						if (JSONUtils.mayBeJSON(jsonStr)) {
							if (jsonStr.contains("rowSet")) {
								JSONObject jsonObj = JSONObject
										.fromObject(jsonStr);
								condition = new DataStoreImpl(obj.toString(),
										jsonObj);
								context.put(obj.toString(), condition);
								context.getDataCenter().addDataStore(condition);
							}
						}
						if (obj.toString().equals("pageSize")) {
							int pageSize = Integer.valueOf(gridParas.get(
									"pageSize").toString());
							pageSize = gridStore.getRecordCount();
							if (maxExportCount != -1) {
								context.put("pageSize", maxExportCount);
							} else {
								context.put("pageSize", pageSize);
							}
						}
					}
				}
			}
		} else if (type.equals("client")) {
			// 允许加入自定义导出的ds
			String gridStoreName = context.getString("dsName");
			DataStore gridStore = context.getDataStore(gridStoreName);
			if (gridStore != null) {
				Map gridParas = gridStore.getParameters();
				if (gridParas != null && !gridParas.isEmpty()) {
					DataStore _exportDS = null;
					Set keySet = gridParas.keySet();
					for (Object obj : keySet) {
						if (obj.toString().equals("_exportDS")) {
							String jsonStr = gridParas.get(obj).toString();
							if (jsonStr.equals("null")
									|| jsonStr.trim().equals("")) {
								break;
							}
							if (JSONUtils.mayBeJSON(jsonStr)) {
								if (jsonStr.contains("rowSet")) {
									JSONObject jsonObj = JSONObject
											.fromObject(jsonStr);
									_exportDS = new DataStoreImpl("_exportDS",
											jsonObj);
									context.getDataCenter().addDataStore(
											_exportDS);
									break;
								} else {
									throw new RIAException("EAPTECH008013",
											null);
								}
							}
						}
					}
				}
			}
		}
		return context;
	}

	/**
	 * 导出csv的统一入口
	 * 
	 * @return
	 * @throws Exception
	 */
	public String export() throws Exception {
		ViewContext context = generateContext("data");
		String exportType = (String) context.getDataCenter().getParameter(
				"exportType");
		if (EXPORT_EXCEL.equals(exportType)) {
			return exportGrid(context, EXPORT_EXCEL);
		}
		return exportGrid(context, EXPORT_CSV);
	}

	/**
	 * 导出excel的统一入口
	 * 
	 * @return
	 * @throws Exception
	 */
	public String exportExcel() throws Exception {
		ViewContext context = generateContext("data");
		return exportGrid(context, EXPORT_EXCEL);
	}

	/**
	 * 导出Grid
	 * @param context
	 * @param exportType
	 * @return
	 * @throws Exception
	 */
	private String exportGrid(ViewContext context, String exportType)
			throws Exception{
		String exportName = (String) context.getDataCenter().getParameter(
				"name");
		if (exportName == null || exportName.trim().length() == 0) {
			exportName = "export";
		} else {
			String agent = (String) request.getHeader("USER-AGENT");
			if(agent != null){
				if(agent.indexOf("Firefox") > 0){
					// FF
					exportName = "=?UTF-8?B?" + (new String(Base64.encodeBase64(exportName.getBytes("UTF-8")))) + "?=";
				}else{
					// IE and Chrome
					exportName = new String(exportName.getBytes("GBK"), "ISO-8859-1");
				}
			}
		}
		ServletOutputStream out = null;
		try {
			response.setContentType("application/octet-stream");
			if (EXPORT_EXCEL.equals(exportType)) {
				response.setHeader("Content-Disposition",
						"attachment;filename=" + exportName + ".xls");
			} else {
				response.setHeader("Content-Disposition",
						"attachment;filename=" + exportName + ".csv");
			}
			out = response.getOutputStream();
			doExport(context, out, exportType);
			out.flush();
			out.close();
		} catch (Exception e) {
			// 当弹出导出对话框时，点取消会报ClientAbortException，临时解决方案是直接返回null。
			String name = e.getClass().getCanonicalName();
			if (name
					.endsWith("org.apache.catalina.connector.ClientAbortException")) {
				return NONE;
			}else{
				e.printStackTrace();
			}
		} finally {
			if (out != null) {
				out.close();
			}
		}

		return NONE;
	}

	/**
	 * 根据导出类型选择跳转相应的导出方法
	 * 
	 * @param context
	 * @param out
	 * @throws Exception
	 */
	private void doExport(ViewContext context, OutputStream out,
			String exportType) throws Exception {
		String type = context.getString("type");
		if (type == null || type.equals(""))
			return;
		if (type.equals("client")) {
			doClientExport(context, out, exportType);
		}
		if (type.equals("server")) {
			doServerExport(context, out, exportType);
		}
	}

	/**
	 * 服务端导出（导出全部）
	 * 
	 * @param context
	 * @param out
	 * @throws Exception
	 */
	private void doServerExport(ViewContext context, OutputStream out,
			String exportType) throws Exception {

		// 获取GridStore，当GridStore的总记录数为0时，直接按客户端输出，避免后台报异常
		// String gridStoreName = context.getString("dsName");
		// DataStore gridStore = context.getDataStore(gridStoreName);
		// if (gridStore.getRowSet().getRowCount("primary") <= 0) {
		// doClientExport(context, out, exportType);
		// return;
		// }

		Object bo = null;
		// 自动分页查询(包括statement查询)
		String pageKey = (String) context.get("_pageKey");
//		if (pageKey != null) {
//			bo = applicationContext.getBean("ria_pageQueryBO_bo");
//			if (bo == null) {
//				throw new RIAException("EAPTECH008012",
//						new Object[] { "ria_pageQueryBO_bo" });
//			}
//		} else {
//			String boId = context.getString(CommonUtil.BOID);
//			if (boId == null) {
//				throw new RIAException("EAPTECH008011", null);
//			}
//
//			// 获取调用的BO方法
//			bo = applicationContext.getBean(boId);
//			if (bo == null) {
//				throw new RIAException("EAPTECH008012", new Object[] { boId });
//			}
//		}
		GridExport.doServerExport(context, out, bo, exportType);

	}

	/**
	 * 客户端导出（包含导出当页和导出选中）
	 * 
	 * @param context
	 * @param out
	 * @throws Exception
	 */
	private void doClientExport(ViewContext context, OutputStream out,
			String exportType) throws Exception {
		GridExport.doClientExport(context, out, exportType);
	}
}
