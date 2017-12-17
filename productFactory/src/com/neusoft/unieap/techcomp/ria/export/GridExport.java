package com.neusoft.unieap.techcomp.ria.export;

import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;

import com.neusoft.unieap.core.context.UniEAPContextHolder;
import com.neusoft.unieap.core.dataSource.DataSourceContextHolder;
import com.neusoft.unieap.core.page.PageContext;
import com.neusoft.unieap.core.util.BeanUtil;
import com.neusoft.unieap.techcomp.cache.EAPCacheManager;
import com.neusoft.unieap.techcomp.ria.common.util.CommonUtil;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataCenterFactory;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.export.util.ExportUtil;

public class GridExport {

	/**
	 * 导出全部
	 * 
	 * @param context
	 * @param out
	 * @param bo
	 * @throws Exception
	 */
	public static void doServerExport(ViewContext context, OutputStream out,
			Object bo, String exportType) throws Exception {

		// 获取标题信息
		List headersInfo = ExportUtil.getHeadersInfo(context);

		// 反射BO方法获取GridStore
		DataCenter dataCenter = DataCenterFactory.getInstance()
				.createDataCenter();
		// 自动分页查询
		String pageKey = (String) context.get("_pageKey");
		if (pageKey != null) {
			String userAccount = UniEAPContextHolder.getContext()
					.getCurrentUser().getAccount();
			Map map = (Map) ((EAPCacheManager) BeanUtil
					.getBean("eapCacheManager")).getCache("pageContext")
					.getObject(userAccount);
			if (map != null && map.size() > 0) {
				PageContext pageContext = (PageContext) map.get(pageKey);
				Object result = null;
				if (pageContext != null) {
					String dataSourceID = pageContext.getDataSourceID();
					if (dataSourceID != null && !"".equals(dataSourceID)) {
						DataSourceContextHolder.setDataSourceType(dataSourceID);
					}
					String sessionFactoryId = pageContext.getSessionFactoryId();
					if (sessionFactoryId != null
							&& sessionFactoryId.length() > 0) {
						PropertyUtils.setProperty(PropertyUtils.getProperty(
								BeanUtil.getBean("ria_pageQueryBO_bo"),
								"pageQueryDAO"), "sessionFactory", BeanUtil
								.getBean(sessionFactoryId));
					}
					Method[] methods = bo.getClass().getMethods();
					for (int i = 0; i < methods.length; i++) {
						if (methods[i].getName().equals("query")) {
							result = methods[i].invoke(bo, pageContext);
							Class returnType = methods[i].getReturnType();
							CommonUtil.handleBoMethodReturn(dataCenter, result,
									returnType);
							break;
						}
					}
				}
			}
		} else {
			// 传统processor
			CommonUtil.invokeBoMethod(context, dataCenter);
		}

		DataStore gridStore = null;
		List<DataStore> dataStores = dataCenter.getDataStores();
		if (dataStores.size() == 1) {
			gridStore = dataStores.get(0);
		} else {
			DataStore oldGridDS = (DataStore) context.getDataCenter()
					.getDataStores().get(0);
			for (DataStore ds : dataStores) {
				if (ds.getRowSetName().equals(oldGridDS.getRowSetName())) {
					gridStore = ds;
					break;
				} else if (oldGridDS.getParameters().get("_pageKey") != null
						&& oldGridDS.getParameters().get("_pageKey").equals(
								ds.getParameters().get("_pageKey"))) {
					gridStore = ds;
					break;
				}
			}
		}
		DataStore lockedStore = context.getDataStore("lockedStore");
		String footer = context.getString("footer");

		if (exportType.equalsIgnoreCase("csv")) {
			OutputStreamWriter writer = new OutputStreamWriter(out, "GBK");
			// 输出头信息
			ExportUtil.outputHeaders(headersInfo, writer);

			// 输出列数据
			if (gridStore != null) {
				ExportUtil.outputColumns(headersInfo, gridStore.getRowDatas(),
						writer);
			}

			// 输出锁定列数据
			if (lockedStore != null) {
				ExportUtil.outputColumns(headersInfo,
						lockedStore.getRowDatas(), writer);
			}

			// 输出footer
			ExportUtil.outputFooter(footer, writer);

			writer.close();
		} else {
			ExportUtil.exportExcel(headersInfo, gridStore, lockedStore, footer,
					out);
		}

	}

	/**
	 * 导出当页和导出选中
	 * 
	 * @param context
	 * @param out
	 * @throws Exception
	 */
	public static void doClientExport(ViewContext context, OutputStream out,
			String exportType) throws Exception {

		List headersInfo = ExportUtil.getHeadersInfo(context);
		String gridStoreName = context.getString("dsName");
		DataStore gridStore = context.getDataStore(gridStoreName);
		DataStore lockedStore = context.getDataStore("lockedStore");
		String footer = context.getString("footer");

		// 自定义导出
		DataStore _exportDS = context.getDataStore("_exportDS");
		if (_exportDS != null) {
			gridStore = _exportDS;
			lockedStore = null;
		}
		if (exportType.equalsIgnoreCase("csv")) {
			OutputStreamWriter writer = new OutputStreamWriter(out, "GBK");

			// 输出头信息
			ExportUtil.outputHeaders(headersInfo, writer);

			// 输出列数据
			if (gridStore != null) {
				ExportUtil.outputColumns(headersInfo, gridStore.getRowDatas(),
						writer);
			}

			// 输出锁定列数据
			if (lockedStore != null) {
				ExportUtil.outputColumns(headersInfo,
						lockedStore.getRowDatas(), writer);
			}

			// 输出footer
			ExportUtil.outputFooter(footer, writer);

			writer.close();
		} else {
			ExportUtil.exportExcel(headersInfo, gridStore, lockedStore, footer,
					out);
		}
	}
}
