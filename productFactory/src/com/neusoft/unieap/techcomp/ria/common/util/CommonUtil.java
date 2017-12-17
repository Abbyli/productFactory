package com.neusoft.unieap.techcomp.ria.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.struts2.ServletActionContext;

import com.neusoft.fdframework.core.CoreParameterEntity;
import com.neusoft.fdframework.core.CoreResultEntity;
import com.neusoft.fdframework.core.SystemConst;
import com.neusoft.fdframework.proxy.service.Dispatcher;
import com.neusoft.fdframework.web.WebApplicationConst;
import com.neusoft.unieap.core.base.model.DCRepository;
import com.neusoft.unieap.core.base.model.DevelopmentComponent;
import com.neusoft.unieap.core.common.bo.CommonBO;
import com.neusoft.unieap.core.common.bo.QueryResult.QueryResult;
import com.neusoft.unieap.core.common.bo.context.BOContext;
import com.neusoft.unieap.core.common.bo.context.impl.BOContextImpl;
import com.neusoft.unieap.core.common.form.Form;
import com.neusoft.unieap.core.context.UniEAPContextHolder;
import com.neusoft.unieap.core.context.UnieapRequestContextHolder;
import com.neusoft.unieap.core.dataSource.DataSourceContextHolder;
import com.neusoft.unieap.core.exception.UniEAPException;
import com.neusoft.unieap.core.fileupload.FileAttachment;
import com.neusoft.unieap.core.page.PageContext;
import com.neusoft.unieap.core.page.PageUtil;
import com.neusoft.unieap.core.statement.Statement;
import com.neusoft.unieap.core.statement.impl.StatementImpl;
import com.neusoft.unieap.core.util.BeanUtil;
import com.neusoft.unieap.techcomp.cache.EAPCacheManager;
import com.neusoft.unieap.techcomp.cache.cachesynchronize.util.CacheTaskUtil;
import com.neusoft.unieap.techcomp.ria.RIAException;
import com.neusoft.unieap.techcomp.ria.RIAExceptionCode;
import com.neusoft.unieap.techcomp.ria.codelist.CodeList;
import com.neusoft.unieap.techcomp.ria.codelist.entity.Code;
import com.neusoft.unieap.techcomp.ria.common.query.pojo.QueryCondition;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.context.util.ContextUtil;
import com.neusoft.unieap.techcomp.ria.ds.Column;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataCenterFactory;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.ds.MetaData;
import com.neusoft.unieap.techcomp.ria.ds.Row;
import com.neusoft.unieap.techcomp.ria.ds.RowSet;
import com.neusoft.unieap.techcomp.ria.ds.impl.DataStoreImpl;
import com.neusoft.unieap.techcomp.ria.ds.impl.MetaDataImpl;
import com.neusoft.unieap.techcomp.ria.ds.impl.RowImpl;
import com.neusoft.unieap.techcomp.ria.io.DataCenterIOManager;
import com.neusoft.unieap.techcomp.ria.util.Base64;
import com.neusoft.unieap.techcomp.ria.util.MetaDataUtil;
import com.neusoft.unieap.techcomp.ria.util.PojoUtil;
import com.neusoft.unieap.techcomp.ria.util.ViewContextUtil;

public class CommonUtil {

	public static final String POJO_INDEX_IN_CONTEXT = "_pojoIndexInContext";

	public static final String DATASTORE = "dataStore";

	public static final String MAP = "map";

	public static final String BOID = "_boId";

	public static final String METHODNAME = "_methodName";

	public static final String PARAMETERS = "_parameters";

	public static final String PARAMETERTYPES = "_parameterTypes";

	public static final String DATASOURCEID = "_dataSourceID";

	public static final String METHODPARAMETERTYPES = "_methodParameterTypes";

	public static final String RESULT = "result";

	public static final String DATASTORE_PRIMARY = "primary";

	public static final String FORM_PARAMETER_TYPE = "com.neusoft.unieap.core.common.form.Form";

	public static final String DATACENTER_PARAMETER_TYPE = "com.neusoft.unieap.techcomp.ria.ds.DataCenter";

	public static final String UPLOAD_FORM_STORE = "_uploadFormStore";

	public static final String PAGENUMBER = "_pageNumber";

	public static final String PAGESIZE = "_pageSize";

	public static final String CALCCOUNT = "_calcRecordCount";

	public static final String NAMED_QUERY = "_namedQuery";

	public static final String QUERYPARAMETERTYPES = "_queryParameterTypes";

	public static final String STATEMENT = "_statement";

	public static final String STATEMENT_REF = "_statementRef";

	public static final String STATEMENT_PAGESIZE = "_statementPageSize";

	public static final String STATEMENT_PAGENUMBER = "_statementPageNumber";

	public static final String DCID = "_dcId";

	public static final String POJO_CONTEXT = "pojoContext";
	
	public static final String EAP_NON_JSON_RETURN_TYPE = "eap_non_Json_Return_Type";
	
	public static final String[] PrimitiveTypes = { "int", "float", "double",
			"boolean", "short", "byte", "char", "long" };

	public static boolean isBaseDataType(String type) {
		for (int i = 0; i < PrimitiveTypes.length; i++) {
			if (PrimitiveTypes[i].equals(type)) {
				return true;
			}
		}
		return false;
	}

	public static Class[] convertToClassTypes(String[] queryParameters) {
		List<Class> clazzList = new ArrayList<Class>();
		if (queryParameters != null) {
			for (int i = 0; i < queryParameters.length; i++) {
				if (queryParameters[i].equals("string")) {
					clazzList.add(String.class);
				} else if (queryParameters[i].equals("int")) {
					clazzList.add(Integer.class);
				} else if (queryParameters[i].equals("long")) {
					clazzList.add(Long.class);
				} else if (queryParameters[i].equals("float")) {
					clazzList.add(Float.class);
				} else if (queryParameters[i].equals("double")) {
					clazzList.add(Double.class);
				} else {
					try {
						Class para = Class.forName(queryParameters[i]);
						if (para != null) {
							clazzList.add(para);
						}
					} catch (ClassNotFoundException e) {
					}
				}
			}
		}
		return clazzList.toArray(new Class[clazzList.size()]);
	}

	/**
	 * 反射调用BO方法
	 * 
	 * @param context
	 * @param dataCenter
	 * @param bo
	 * @throws Exception
	 */
	public static void invokeBoMethod(ViewContext context,
			DataCenter dataCenter) throws Exception {

		// 获得调用BO参数
		String boId = context.getString(CommonUtil.BOID);
		String methodName = context.getString(CommonUtil.METHODNAME);
		String methodParameterTypes = context
				.getString(CommonUtil.METHODPARAMETERTYPES);

		if (methodName == null) {
			throw new RIAException("EAPTECH008010", null);
		}

		// 获取数据源ID
		String dataSourceID = context.getString(CommonUtil.DATASOURCEID);

		// 获取分页信息
		if (context.getString(CommonUtil.PAGENUMBER) != null
				&& context.getString(CommonUtil.PAGESIZE) != null) {
			QueryResult qResult = new QueryResult();
			qResult.setPageNumber(Integer.valueOf(context
					.getString(CommonUtil.PAGENUMBER)));
			qResult.setPageSize(Integer.valueOf(context
					.getString(CommonUtil.PAGESIZE)));
			if (context.getString(CommonUtil.CALCCOUNT) != null) {
				qResult.setAutoCalcCount(Boolean.valueOf(context
						.getString(CommonUtil.CALCCOUNT)));
			}
			UnieapRequestContextHolder.getRequestContext().put("queryResult",
					qResult);
		}

		// 获取AdvanceQuery查询条件
		List conditions = context.getPOJOList("_advancedQueryConditionStore");
		if (conditions != null) {
			QueryCondition qConditon = new QueryCondition();
			qConditon.setConditions(conditions);
			UnieapRequestContextHolder.getRequestContext().put(
					"advanceQueryCondition", qConditon);
		}

		String[] mParTypes = null;
		if (methodParameterTypes != null
				&& !methodParameterTypes.trim().equals("")) {
			mParTypes = methodParameterTypes.split(",");
		}

		// 加入sc和dc的名称
		if (ViewContextUtil.getViewContext() != null) {
			String dcID = ViewContextUtil.getViewContext().getString("dcID");
			if (dcID != null
					&& DCRepository.getDevelopmentComponent(dcID) != null) {
				String scID = DCRepository.getDevelopmentComponent(dcID)
						.getSoftwareComponent().getId();
				if (scID != null) {
					ViewContextUtil.getViewContext().put("scID", scID);
				}
			}
		}
		
		//add by czy 2014-01-10 组织向后台传递的参数对象
		CoreParameterEntity entity = new CoreParameterEntity();
		
		entity.setProcessID(methodName);
		String user = ServletActionContext.getRequest().getParameter(SystemConst.KEY_CURRENT_USER);
		if (StringUtils.isEmpty(user)) {
			entity.setCurrentUserAccount((String) ServletActionContext.getContext().getSession().get(SystemConst.KEY_CURRENT_USER));
			entity.setCurrentUserIp(ServletActionContext.getRequest().getRemoteAddr());
		} else {
			entity.setCurrentUserAccount(user);
			entity.setCurrentUserIp(ServletActionContext.getRequest().getParameter(SystemConst.KEY_CURRENT_IP));
		}
		entity.setClientAgent(ServletActionContext.getRequest().getHeader("User-agent"));
		entity.setMenuId(context.getString(SystemConst.KEY_MENU_ID));

		// 获取方法参数值
		String parameters = context.getString(CommonUtil.PARAMETERS);
		String[] methodPraTypes = methodParameterTypes.split(",");
		//modify by czy 2014-03-10  begin
		Map<String,Object> parameterObjects = new HashMap<String,Object>();
		//modify by czy 2014-03-10  end
		if (parameters != null && !parameters.equals("")) {
			parameterObjects = initParameters(context, parameters);
		}
		entity.setContentMap(parameterObjects);

		String remoteActionUrl = WebApplicationConst.requestRemoteUrl.trim() + "commonManageAction!commonRun.action";
		CoreResultEntity result = Dispatcher.runCall4Object(entity, getSenderType(WebApplicationConst.requestType),
				remoteActionUrl);
		if("-1".equals(result.getSuccessFlag())){
		    UniEAPException exception=new UniEAPException(result.getErrorCode(),null);
		    exception.setExceptionMessage(result.getMessages());
			throw exception;
		}
		// 处理返回值
		BOContext boResult = new BOContextImpl();
		Iterator it = result.getContent().entrySet().iterator();
		Row row = new RowImpl();
		while (it.hasNext()) {
			Entry entry = (Entry) it.next();
			boResult.put(entry.getKey().toString(), entry.getValue());
		}
		
		handleBoMethodReturn(dataCenter,boResult, boResult.getClass());
		// 处理默认的请求响应结果
		handleDefaultResponseResult(dataCenter, context);
	}

	private static Object initFormParameters(ViewContext context)
			throws Exception {
		Form form = new Form();
		// 获取所有上传文件
		List fileAttachments = context.getFileAttachments();
		if (fileAttachments != null && fileAttachments.size() > 0)
			form.setFiles(fileAttachments);
		// 获取form绑定的datastore
		DataStore ds = context.getDataStore(CommonUtil.UPLOAD_FORM_STORE);
		Object obj = null;
		if (ds != null) {
			String rowSetName = ds.getRowSetName();
			if (rowSetName == null || rowSetName.trim().length() == 0) {
				obj = context.getPojoWithContext(CommonUtil.UPLOAD_FORM_STORE);
			} else {
				obj = context.getPOJO(CommonUtil.UPLOAD_FORM_STORE);
			}
		}
		form.setObject(obj);

		return form;
	}

	/**
	 * 为社保增值行业线增加匹配DataCenter类型形参
	 * 
	 * @param value
	 * @return
	 * @throws Exception
	 */
	private static Object initDataCenterParameters(String value)
			throws Exception {
		if (JSONUtils.mayBeJSON(value)) {
			DataCenter dc = DataCenterIOManager.createReader(value).parse();
			return dc;
		}
		return null;
	}

	/**
	 * 判断传入对象是否为基本类型
	 * 
	 * @param result
	 * @return
	 */
	public static boolean isPrimitiveType(Object result) {

		if (result instanceof String) {
			return true;
		}
		if (result instanceof Number) {
			return true;
		}
		if (result instanceof Character) {
			return true;
		}
		if (result instanceof Boolean) {
			return true;
		}
		return false;
	}

	/**
	 * 判断传入对象是否为常用类型
	 * 
	 * @param result
	 * @return
	 */
	public static boolean isCommonType(Object result) {
		if (isPrimitiveType(result)) {
			return true;
		}
		if (result instanceof BigDecimal) {
			return true;
		}
		if (result instanceof Date) {
			return true;
		}
		return false;
	}

	/**
	 * 获取不同类型的参数
	 * 
	 * @param type
	 * @param parameter
	 * @param context
	 * @return
	 */
	public static Object getParam(String type, String parameter,
			ViewContext context) {
		Object obj = context.get(parameter);
		if (isBaseDataType(type) && (obj == null)) {
			throw new IllegalArgumentException("The parameter of " + parameter
					+ " is null.");
		}
		if (obj == null) {
			return null;
		}
		String par = context.getString(parameter);
		try {
			if (type.equals(String.class.getName())) {
				return String.valueOf(par);
			}
			if (type.equals(Integer.class.getName()) || type.equals("int")) {
				return Integer.valueOf(par);
			}
			if (type.equals(Float.class.getName()) || type.equals("float")) {
				return Float.valueOf(par);
			}
			if (type.equals(Double.class.getName()) || type.equals("double")) {
				return Double.valueOf(par);
			}
			if (type.equals(Boolean.class.getName()) || type.equals("boolean")) {
				return Boolean.valueOf(par);
			}
			if (type.equals(Short.class.getName()) || type.equals("short")) {
				return Short.valueOf(par);
			}
			if (type.equals(Long.class.getName()) || type.equals("long")) {
				return Long.valueOf(par);
			}
			if (type.equals(BigDecimal.class.getName())) {
				return new BigDecimal(par);
			}
		} catch (NumberFormatException ex) {
			throw new RIAException(RIAExceptionCode.RIA_ARGUMENT_CONVERT_EXP,
					new String[] { parameter });
		}
		return obj;
	}

	/**
	 * 处理请求默认的响应结果，例如可能在拦截器中加入一些默认的返回值，该默认响应结果类型为BOContext
	 * 
	 * @param dataCenter
	 * @param context
	 * @throws Exception 
	 */
	public static void handleDefaultResponseResult(DataCenter dataCenter,
			ViewContext context) throws Exception {
		if (context.containsKey(ViewContext.DEFAULT_RESPONSE_RESULT)) {
			Object result = context.get(ViewContext.DEFAULT_RESPONSE_RESULT);
			if (result != null) {
				handleBoContextType(dataCenter, result);
			}
		}
	}

	/**
	 * 处理BO返回值
	 * 
	 * @param dataCenter
	 * @param result
	 *            方法返回值
	 * @param returnType
	 *            方法返回值类型
	 * @throws Exception
	 */
	public static void handleBoMethodReturn(DataCenter dataCenter,
			Object result, Class returnType) throws Exception {
		if (void.class.equals(returnType)) {
			return;
		}
		if (result == null) {
			dataCenter.addParameter(CommonUtil.RESULT, null);
			DataStore ds = DataCenterFactory.getInstance().createDataStore(
					CommonUtil.RESULT);
			dataCenter.addDataStore(ds);
			return;
		}
		// add by lugj 对workbook对象做特殊处理(导出excel)
		if (result instanceof org.apache.poi.ss.usermodel.Workbook) {
			// 设置该请求不走AttachTipFilter
			ServletActionContext.getRequest().setAttribute(EAP_NON_JSON_RETURN_TYPE, "true");
			Workbook workbook = (Workbook) result;
			HttpServletResponse response = ServletActionContext.getResponse();
			ServletOutputStream out = null;
			try {
				response.setContentType("application/msexcel;charset=UTF-8");
				response.setHeader("Content-Disposition",
						"attachment;filename=export.xls");
				out = response.getOutputStream();
				workbook.write(out);
				out.flush();
			} catch (Exception e) {
				// 当弹出导出对话框时，点取消会报ClientAbortException，临时解决方案是直接返回null。
				String name = e.getClass().getCanonicalName();
				if (name
						.endsWith("org.apache.catalina.connector.ClientAbortException")) {
					return;
				}
			} finally {
				out.close();
			}
			return;
		}
		// add by lugj 对File对象做特殊处理(数据库文件下载)
		if (result instanceof File) {
			File file = (File) result;
			HttpServletResponse response = ServletActionContext.getResponse();
			HttpServletRequest request = ServletActionContext.getRequest();
			// 设置该请求不走AttachTipFilter
			request.setAttribute(EAP_NON_JSON_RETURN_TYPE, "true");
			ServletOutputStream out = response.getOutputStream();
			if (!file.exists()) {
				// 若文件不存在则弹出提示对话框
				String js = "<script>window.parent.top.MessageBox.alert({title:\"提示信息\",message:\"文件不存在!\"});</script>";
				out.write(js.getBytes("UTF-8"));
				out.flush();
				out.close();
				return;
			}
			String fileName = file.getName();
			String agent = (String) request.getHeader("USER-AGENT");
			if(agent.indexOf("Firefox") > 0 || agent.indexOf("Chrome") > 0){
				// FF
				fileName = "=?UTF-8?B?"
						+ (new String(Base64.encodeBase64(fileName
								.getBytes("UTF-8")))) + "?=";
			} else {
				// IE
				fileName = new String(fileName.getBytes("GBK"), "ISO-8859-1");
			}
			FileInputStream in = null;
			try {
				response.setContentType("application/x-msdownload");
				response.setHeader("Content-Disposition",
						"attachment;filename=" + fileName);
				if (file.length() < Integer.MAX_VALUE) {
					response.setContentLength((int) file.length());
				}
				in = new FileInputStream(file);
				byte[] bb = new byte[1024 * 10];
				int a = -1;
				while ((a = in.read(bb)) != -1) {
					out.write(bb, 0, a);
				}
				out.flush();
			} catch (Exception e) {
				return;
			} finally {
				out.close();
				in.close();
			}
			return;
		}
		// add by lugj 对FileAttachment对象做特殊处理(数据库文件下载)
		if (result instanceof FileAttachment) {
			FileAttachment fileAttachment = (FileAttachment) result;
			HttpServletResponse response = ServletActionContext.getResponse();
			HttpServletRequest request = ServletActionContext.getRequest();
			// 设置该请求不走AttachTipFilter
			request.setAttribute(EAP_NON_JSON_RETURN_TYPE, "true");
			ServletOutputStream out = response.getOutputStream();
			InputStream in = fileAttachment.getInputStream();
			if (in == null) {
				// 若文件不存在则弹出提示对话框
				String js = "<script>window.parent.top.MessageBox.alert({title:\"提示信息\",message:\"文件不存在!\"});</script>";
				out.write(js.getBytes("UTF-8"));
				out.flush();
				out.close();
				return;
			}
			String fileName = fileAttachment.getFileName();
			String agent = (String) request.getHeader("USER-AGENT");
			if (agent != null && agent.indexOf("MSIE") == -1) {
				// FF
				fileName = "=?UTF-8?B?"
						+ (new String(Base64.encodeBase64(fileName
								.getBytes("UTF-8")))) + "?=";
			} else {
				// IE
				fileName = new String(fileName.getBytes("GBK"), "ISO-8859-1");
			}

			try {
				if (fileAttachment.getContextType() != null) {
					// 文件预览
					response.setContentType(fileAttachment.getContextType());
					response.setHeader("Content-Disposition",
							"inline;filename=" + fileName);
					in = fileAttachment.getInputStream();
					byte[] bb = new byte[1024 * 10];
					int a = -1;
					while ((a = in.read(bb)) != -1) {
						out.write(bb, 0, a);
					}
					out.flush();
				} else {
					// 直接下载
					response.setContentType("application/x-msdownload");
					response.setHeader("Content-Disposition",
							"attachment;filename=" + fileName);
					in = fileAttachment.getInputStream();
					byte[] bb = new byte[1024 * 10];
					int a = -1;
					while ((a = in.read(bb)) != -1) {
						out.write(bb, 0, a);
					}
					out.flush();
				}
			} catch (Exception e) {
			} finally {
				out.close();
				in.close();
			}
			return;
		}
		// 对于CodeList情况特殊处理
		if (result instanceof com.neusoft.unieap.techcomp.ria.codelist.CodeList) {
			CodeList codeList = (CodeList) result;
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
				map.put("ID", code.getCodeValue());
				map.put("CODENAME", code.getCodeName());
				map.put("CODEVALUE", code.getCodeValue());
				map.put("PARENTID", code.getParent());
				rs.addRowData(map);
			}
			dataCenter.addDataStore(ds);
			Long timestamp = CacheTaskUtil.getTimeStamp(codeList.getName(),
					"codelist");
			if (timestamp != null) {
				dataCenter.addParameter(codeList.getName(), timestamp);
			}
			return;

		}
		if (CommonUtil.isCommonType(result)) {
			dataCenter.addParameter(CommonUtil.RESULT, result);
		} else if (result instanceof BOContext) {
			handleBoContextType(dataCenter, result);
		} else {
			DataStore ds = DataCenterFactory.getInstance().createDataStore(
					CommonUtil.RESULT);
			if (result instanceof QueryResult) {
				QueryResult qResult = (QueryResult) result;
				boolean isSqlQuery = false;
				PageContext pageContext = qResult.getPageContext();
				if (pageContext != null) {
					String type = pageContext.getType();
					if (type != null
							&& (type.equals("SQL") || type.equals("Statement"))) {
						isSqlQuery = true;
					}
				}
				List qResultList = qResult.getResult();
				if (qResultList != null) {
					if (isSqlQuery) {
						// 如果是SQL查询的话，需要将字段名按相应的命名策略处理
						ds = PojoUtil.toDataStore4SQL(qResultList, ds);
					} else {
						ds = PojoUtil.toDataStore(qResultList, ds);
					}
				}
				ds.setRecordCount(qResult.getRecordCount());
				if (qResult.getPageNumber() != 0) {
					ds.setPageNumber(qResult.getPageNumber());
				}
				if (qResult.getPageSize() != 0) {
					ds.setPageSize(qResult.getPageSize());
				}
				// 解析分页上下文对象
				handlePageContext(ds, qResult);
				generateQueryMetaData(ds, qResultList);
				dataCenter.addDataStore(ds);
			} else {
				// 返回List
				if (result instanceof List) {
					List resultList = (List) result;
					handleReturnList(dataCenter, resultList, CommonUtil.RESULT);

				} else if (result.getClass().isArray()) {
					// 返回一维数组
					List resultList = new ArrayList();
					for (int i = 0; i < Array.getLength(result); i++) {
						Object obj = Array.get(result, i);
						resultList.add(obj);
					}
					handleReturnList(dataCenter, resultList, CommonUtil.RESULT);
				} else if (result instanceof Map) {
					// 返回map
					Map resultMap = (Map) result;
					handleReturnMap(dataCenter, resultMap, CommonUtil.RESULT);
				} else {
					List pojoList = new ArrayList();
					pojoList.add(result);
					ds = PojoUtil.toDataStore(pojoList, ds);
					dataCenter.addDataStore(ds);
				}
			}
		}
	}

	private static void handleBoContextType(DataCenter dataCenter, Object result) throws Exception{
		BOContext boContext = (BOContext) result;
		if (boContext != null) {
			Iterator it = boContext.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry entry = (Map.Entry) it.next();
				Object key = entry.getKey();
				Object value = entry.getValue();
				if (value == null) {
					dataCenter.addParameter(key.toString(), null);
					DataStore ds = DataCenterFactory.getInstance()
							.createDataStore(key.toString());
					dataCenter.addDataStore(ds);
					continue;
				}
				
				// add by czy 对File对象做特殊处理(数据库文件下载)
				if (value instanceof File) {
					File file = (File) value;
					HttpServletResponse response = ServletActionContext.getResponse();
					HttpServletRequest request = ServletActionContext.getRequest();
					// 设置该请求不走AttachTipFilter
					request.setAttribute(EAP_NON_JSON_RETURN_TYPE, "true");
					ServletOutputStream out = response.getOutputStream();
					if (!file.exists()) {
						// 若文件不存在则弹出提示对话框
						String js = "<script>window.parent.top.MessageBox.alert({title:\"提示信息\",message:\"文件不存在!\"});</script>";
						out.write(js.getBytes("UTF-8"));
						out.flush();
						out.close();
						return;
					}
					String fileName = file.getName();
					String agent = (String) request.getHeader("USER-AGENT");
					if (agent != null && agent.indexOf("MSIE") == -1) {
						// FF
						fileName = "=?UTF-8?B?"
								+ (new String(Base64.encodeBase64(fileName
										.getBytes("UTF-8")))) + "?=";
					} else {
						// IE
						fileName = new String(fileName.getBytes("GBK"), "ISO-8859-1");
					}
					FileInputStream in = null;
					try {
						response.setContentType("application/x-msdownload");
						response.setHeader("Content-Disposition",
								"attachment;filename=" + fileName);
						if (file.length() < Integer.MAX_VALUE) {
							response.setContentLength((int) file.length());
						}
						in = new FileInputStream(file);
						byte[] bb = new byte[1024 * 10];
						int a = -1;
						while ((a = in.read(bb)) != -1) {
							out.write(bb, 0, a);
						}
						out.flush();
					} catch (Exception e) {
						return;
					} finally {
						out.close();
						in.close();
					}
					return;
				}
				
				
				if (CommonUtil.isCommonType(value)) {
					dataCenter.addParameter(key.toString(), value);
				} else {
					DataStore ds = DataCenterFactory.getInstance()
							.createDataStore(key.toString());
					if (value instanceof List) {
						List resultList = (List) value;
						handleReturnList(dataCenter, resultList, key.toString());
					} else if (value.getClass().isArray()) {
						// 返回一维数组
						List resultList = new ArrayList();
						for (int i = 0; i < Array.getLength(value); i++) {
							Object obj = Array.get(value, i);
							resultList.add(obj);
						}
						handleReturnList(dataCenter, resultList, key.toString());
					}else if (value instanceof BOContext) {
			            handleBoContextType(dataCenter, value);
			        } 
					else if (value instanceof Map) {
						// 返回map
						Map resultMap = (Map) value;
						handleReturnMap(dataCenter, resultMap, key.toString());
					} else if (value instanceof com.neusoft.fdframework.core.base.QueryResult) {
						com.neusoft.fdframework.core.base.QueryResult qt = (com.neusoft.fdframework.core.base.QueryResult)value;
						QueryResult qResult = (QueryResult) UnieapRequestContextHolder.getRequestContext().get("queryResult");
						if(qResult == null){
							throw new Exception("调用翻页方法异常,原因：【过程调用】中未点击自动分页复选框");
						}
						qResult.setResult(qt.getResultList());
						qResult.setRecordCount(qt.getTotalCount());
						qResult.setPageNumber(qt.getPageNumber());
						qResult.setPageSize(qt.getPageSize());
						boolean isSqlQuery = false;
						PageContext pageContext = qResult.getPageContext();
						if (pageContext != null) {
							String type = pageContext.getType();
							if (type != null
									&& (type.equals("SQL") || type
											.equals("Statement"))) {
								isSqlQuery = true;
							}
						}
						List qResultList = qResult.getResult();
						if (qResultList != null) {
							if (isSqlQuery) {
								// 如果是SQL查询的话，需要将字段名按相应的命名策略处理
								ds = PojoUtil.toDataStore4SQL(qResultList, ds);
							} else {
								ds = PojoUtil.toDataStore(qResultList, ds);
							}
						}
						ds.setRecordCount(qResult.getRecordCount());
						if (qResult.getPageNumber() != 0) {
							ds.setPageNumber(qResult.getPageNumber());
						}
						if (qResult.getPageSize() != 0) {
							ds.setPageSize(qResult.getPageSize());
						}
						// 解析分页上下文对象
						handlePageContext(ds, qResult);
						generateQueryMetaData(ds, qResultList);
						dataCenter.addDataStore(ds);
					} else if (value instanceof com.neusoft.fdframework.core.base.dto.BaseDTO) {
					    com.neusoft.fdframework.core.base.dto.BaseDTO bdto = (com.neusoft.fdframework.core.base.dto.BaseDTO)value;
                        QueryResult qResult = (QueryResult) UnieapRequestContextHolder.getRequestContext().get("queryResult");
                        if(qResult == null){
                            throw new Exception("调用翻页方法异常,原因：【过程调用】中未点击自动分页复选框");
                        }
                        qResult.setResult(bdto.getResultlist());
                        qResult.setRecordCount((int) bdto.getPageDTO().getTotalCount());
                        qResult.setPageNumber((int) bdto.getPageDTO().getPageNo());
                        qResult.setPageSize((int) bdto.getPageDTO().getPageSize());
                        boolean isSqlQuery = false;
                        PageContext pageContext = qResult.getPageContext();
                        if (pageContext != null) {
                            String type = pageContext.getType();
                            if (type != null
                                    && (type.equals("SQL") || type
                                            .equals("Statement"))) {
                                isSqlQuery = true;
                            }
                        }
                        List qResultList = qResult.getResult();
                        if (qResultList != null) {
                            if (isSqlQuery) {
                                // 如果是SQL查询的话，需要将字段名按相应的命名策略处理
                                ds = PojoUtil.toDataStore4SQL(qResultList, ds);
                            } else {
                                ds = PojoUtil.toDataStore(qResultList, ds);
                            }
                        }
                        ds.setRecordCount(qResult.getRecordCount());
                        if (qResult.getPageNumber() != 0) {
                            ds.setPageNumber(qResult.getPageNumber());
                        }
                        if (qResult.getPageSize() != 0) {
                            ds.setPageSize(qResult.getPageSize());
                        }
                        // 解析分页上下文对象
                        handlePageContext(ds, qResult);
                        generateQueryMetaData(ds, qResultList);
                        dataCenter.addDataStore(ds);
                    } else {
						List pojoList = new ArrayList();
						if (value != null) {
							pojoList.add(value);
						}
						ds = PojoUtil.toDataStore(pojoList, ds);
						dataCenter.addDataStore(ds);
					}
				}
			}
		}
	}

	/**
	 * 生成查询的元数据信息
	 * 
	 * @param ds
	 * @param qResultList
	 */
	private static void generateQueryMetaData(DataStore ds, List qResultList) {
		if (qResultList != null) {
			List<Column> metaDataInfo = MetaDataUtil
					.getMetaDataInfo(qResultList);
			if (metaDataInfo != null) {
				MetaData metaData = ds.getMetaData();
				if (metaData == null) {
					metaData = new MetaDataImpl();
				}
				for (Column column : metaDataInfo) {
					metaData.addColumn(column);
				}
				ds.setMetaData(metaData);
			}
		}
	}

	/**
	 * Bo方法返回值为List时 构造返回数据
	 * 
	 * @param dataCenter
	 * @param resultList
	 * @param key
	 *            dataStore名或参数名
	 */
	private static void handleReturnList(DataCenter dataCenter,
			List resultList, String key) {
		DataStore ds = DataCenterFactory.getInstance().createDataStore(key);
		if (resultList.size() > 0) {
			Object obj = resultList.get(0);
			if (CommonUtil.isCommonType(obj)) {
				JSONArray jsonArray = JSONArray.fromObject(resultList);
				dataCenter.addParameter(key, jsonArray);
			} else {
				ds = PojoUtil.toDataStore(resultList, ds);
				dataCenter.addDataStore(ds);
			}
		} else {
			dataCenter.addParameter(key, "");
			ds = PojoUtil.toDataStore(resultList, ds);
			dataCenter.addDataStore(ds);
		}
	}

	/**
	 * Bo方法返回值为Map时 构造返回数据
	 * 
	 * @param dataCenter
	 * @param resultMap
	 * @param dsName
	 *            dataStore名
	 */
	private static void handleReturnMap(DataCenter dataCenter, Map resultMap,
			String dsName) {
		DataStore ds = DataCenterFactory.getInstance().createDataStore(dsName);
		if (resultMap.size() > 0) {
			ds = PojoUtil.toDataStore(resultMap, ds);
			dataCenter.addDataStore(ds);
		}
	}

	/**
	 * 处理分页上下文对象
	 * 
	 * @param ds
	 * @param qResult
	 */
	private static void handlePageContext(DataStore ds, QueryResult qResult) {
		PageContext pageContext = qResult.getPageContext();
		if (pageContext != null) {
			String userAccount = UniEAPContextHolder.getContext()
					.getCurrentUser().getAccount();
			ds.addParameter("_pageKey", pageContext.getKey());
			Object obj = ((EAPCacheManager) BeanUtil.getBean("eapCacheManager"))
					.getCache("pageContext").getObject(userAccount);
			Map map = new HashMap();
			if (obj != null) {
				map = (Map) obj;
			}
			map.put(pageContext.getKey(), pageContext);
			((EAPCacheManager) BeanUtil.getBean("eapCacheManager")).getCache(
					"pageContext").putObject(userAccount, map);
		}
	}

	/**
	 * 获得调用的BO方法
	 * 
	 * @param bo
	 *            BO对象
	 * @param methodName
	 *            调用BO的方法名
	 * @param parameterTypes
	 *            BO方法参数
	 * @return
	 * @throws Exception
	 */
	private static Method getBOMethod(Object bo, String methodName,
			String[] mParTypes) throws Exception {
		Method[] methods = bo.getClass().getMethods();
		List methodList = new ArrayList();
		for (int i = 0; i < methods.length; i++) {
			if (methodName.equals(methods[i].getName())) {
				methodList.add(methods[i]);
			}
		}
		Method method = null;
		for (int i = 0; i < methodList.size(); i++) {
			Method m = (Method) methodList.get(i);
			Class[] mParameterTypes = m.getParameterTypes();
			if (mParTypes == null && mParameterTypes.length != 0) {
				continue;
			}
			if (mParTypes == null && mParameterTypes.length == 0) {
				method = m;
				break;
			} else if (mParTypes != null
					&& mParameterTypes.length == mParTypes.length) {
				if (compareParametersType(mParTypes, mParameterTypes)) {
					method = m;
					break;
				}
			}
		}
		return method;
	}

	/**
	 * 初始化方法参数
	 * 
	 * @param context
	 *            页面请求上下文
	 * @param parameters
	 *            参数顺序列表
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private static Map<String, Object> initParameters(ViewContext context,
			String parameters) throws Exception {
		Map<String, Object> objects = new HashMap<String, Object>();
		String parTypes = context.getString(CommonUtil.PARAMETERTYPES);
		boolean isSettedUpload=false;//是否已经设置过上传
		if (parTypes != null && !parTypes.equals("")) {
			List<String> parameterNames = getProcessorParameterInfo(parameters);
			List<String> parameterTypes = getProcessorParameterInfo(parTypes);
			for (int i = 0; i < parameterTypes.size(); i++) {
				String parameterType = parameterTypes.get(i);
				String parameter = parameterNames.get(i);
				if ("pojoList".equals(parameterType)) {
					objects.put(parameter, context
							.getPojoListWithContext(parameter));
				} else if ("pojo".equals(parameterType)) {
					objects.put(parameter, context
							.getPojoWithContext(parameter));
				} else if ("string".equals(parameterType)) {
					// 获取所有上传文件
					List fileAttachments = context.getFileAttachments();
					// 获取form绑定的datastore
					DataStore ds = context.getDataStore(CommonUtil.UPLOAD_FORM_STORE);
					Object obj = null;
					//判断前台是否有文件上传控件，进行文件上传
					if ((!isSettedUpload) && fileAttachments != null && fileAttachments.size() > 0){
						isSettedUpload=true;
						Form form = new Form();
						form.setFiles(fileAttachments);
						//上传form中包含ds获取到
						if(ds != null){
							String rowSetName = ds.getRowSetName();
							if (rowSetName == null || rowSetName.trim().length() == 0) {
								obj = context.getPojoWithContext(CommonUtil.UPLOAD_FORM_STORE);
							} else {
								obj = context.getPOJO(CommonUtil.UPLOAD_FORM_STORE);
							}
							form.setObject(obj);
						}
						objects.put(parameter, form);
					}else{
						objects.put(parameter, context.get(parameter));
					}
					
				} else if (parameterType.startsWith(MAP)) {
					String tmpType = parameterType.substring(4, parameterType
							.length() - 1);
					String[] mapParTypes = tmpType.split(",");
					String[] tmpNames = parameter.split("[(]");
					if (tmpNames.length > 0) {
						String mapName = tmpNames[0];
						String[] mapParNames = tmpNames[1].substring(0,
								tmpNames[1].length() - 1).split(",");
						objects.put(parameter, initMapParameter(context,
								mapName, mapParTypes, mapParNames));
					} else {
						objects.put(parameter, null);
					}
				}
			}
		}
		return objects;
	}

	/**
	 * 根据上下文信息获得Map类型参数值
	 * 
	 * @param context
	 * @param mapName
	 * @param mapParTypes
	 * @param mapParNames
	 * @return
	 * @throws Exception
	 */
	private static Map initMapParameter(ViewContext context, String mapName,
			String[] mapParTypes, String[] mapParNames) throws Exception {
		String mapDataJson = context.getString(mapName);
		if (mapDataJson == null) {
			return null;
		}
		JSONObject mapJsonObject = JSONObject.fromObject(mapDataJson);
		if (mapJsonObject == null || mapJsonObject.isNullObject()) {
			return null;
		}
		Map map = new HashMap();
		for (int k = 0; k < mapParNames.length; k++) {
			Object mapParJsonObject = mapJsonObject.get(mapParNames[k]);
			Object mapParameterObject = getMapParameterObject(mapParTypes[k],
					mapParJsonObject);
			map.put(mapParNames[k], mapParameterObject);
		}
		return map;
	}

	/**
	 * 根据类型获得Map中Value值
	 * 
	 * @param type
	 * @param mapParJsonObject
	 * @return
	 * @throws Exception
	 */
	private static Object getMapParameterObject(String type,
			Object mapParJsonObject) throws Exception {
		if (type == null || mapParJsonObject == null) {
			return null;
		}
		if ("pojoList".equals(type)) {
			return getPojoListWithContext(mapParJsonObject);
		}
		if ("pojo".equals(type)) {
			Object obj = getPojoWithContext(mapParJsonObject);
			if (obj == null) {
				return null;
			} else {
				return obj;
			}
		}
		if ("string".equals(type)) {
			if (mapParJsonObject instanceof JSONObject
					&& ((JSONObject) mapParJsonObject).isNullObject()) {
				return null;
			} else {
				return String.valueOf(mapParJsonObject);
			}
		}
		return null;
	}

	private static List getPojoListWithContext(Object mapParJsonObject)
			throws Exception {
		JSONObject fromObject = null;
		if (!(mapParJsonObject instanceof JSONObject)) {
			fromObject = JSONObject.fromObject(mapParJsonObject);
		} else {
			fromObject = (JSONObject) mapParJsonObject;
		}
		DataStore ds = new DataStoreImpl("", fromObject);
		List pojoList = ContextUtil.getPojoListWithContext(ds);
		return pojoList;
	}

	private static Object getPojoWithContext(Object mapParJsonObject)
			throws Exception {
		JSONObject fromObject = null;
		if (!(mapParJsonObject instanceof JSONObject)) {
			fromObject = JSONObject.fromObject(mapParJsonObject);
		} else {
			fromObject = (JSONObject) mapParJsonObject;
		}
		DataStore ds = new DataStoreImpl("", fromObject);
		Object pojo = ContextUtil.getPojoWithContext(ds);
		return pojo;
	}

	/**
	 * 获得Processor参数信息列表
	 * 
	 * @param parString
	 * @return
	 */
	private static List getProcessorParameterInfo(String parString) {
		String[] tmpPars = parString.split(",");
		List parameters = new ArrayList();
		for (int i = 0; i < tmpPars.length; i++) {
			String tmpPar = tmpPars[i];
			if (tmpPar.indexOf("(") != -1) {
				int j = i + 1;
				for (; j < tmpPars.length; j++) {
					tmpPar = tmpPar.concat(",").concat(tmpPars[j]);
					if (tmpPars[j].indexOf(")") != -1) {
						break;
					}
				}
				i = j;
			}
			parameters.add(tmpPar);
		}
		return parameters;
	}

	/**
	 * 判断两个参数列表中，参数个数和类型是否匹配
	 * 
	 * @param mParTypesClazzs
	 *            参数列表
	 * @param mParameterTypes
	 *            参数列表
	 * @return
	 */
	private static boolean compareParametersType(String[] mParTypes,
			Class[] mParameterTypes) {
		int j = 0;
		for (; j < mParameterTypes.length; j++) {
			if (mParTypes[j] == null) {
				return false;
			}
			// 目前不支持数组
			// if (mParameterTypes[j].isArray()) {
			// int endIndex = mParTypes[j].indexOf('[');
			// String type = mParTypes[j].substring(0, endIndex);
			// if
			// (mParameterTypes[j].getComponentType().getName().equals(type.trim()))
			// {
			// continue;
			// }
			// }
			String mType = mParTypes[j].trim();
			if (mParameterTypes[j].getName().equals(mType)) {
				continue;
			} else {
				if (mType.equals("Integer")
						&& mParameterTypes[j].equals(Integer.class)) {
					continue;
				}
				if (mType.equals("Float")
						&& mParameterTypes[j].equals(Float.class)) {
					continue;
				}
				if (mType.equals("Double")
						&& mParameterTypes[j].equals(Double.class)) {
					continue;
				}
				if (mType.equals("Boolean")
						&& mParameterTypes[j].equals(Boolean.class)) {
					continue;
				}
				if (mType.equals("Byte")
						&& mParameterTypes[j].equals(Byte.class)) {
					continue;
				}
				if (mType.equals("Character")
						&& mParameterTypes[j].equals(Character.class)) {
					continue;
				}
				if (mType.equals("Long")
						&& mParameterTypes[j].equals(Long.class)) {
					continue;
				}
				if (mType.equals("Short")
						&& mParameterTypes[j].equals(Short.class)) {
					continue;
				}
				if (mType.equals("String")
						&& mParameterTypes[j].equals(String.class)) {
					continue;
				}
				if (mType.equals("Object")
						&& mParameterTypes[j].equals(Object.class)) {
					continue;
				}
				break;
			}
		}
		if (j == mParameterTypes.length) {
			return true;
		}
		return false;
	}

	/**
	 * 调用CommonBO的statement查询方法
	 * 
	 * @param context
	 * @param dataCenter
	 * @param bo
	 * @throws Exception
	 */
	public static void invokeStatement(ViewContext context,
			DataCenter dataCenter) throws Exception {
		// 获得statement信息
		String[] statementNames = context.getString(CommonUtil.STATEMENT)
				.split(",");
		String[] statementRefs = context.getString(CommonUtil.STATEMENT_REF)
				.split(",");
		String[] dcIds = context.getString(CommonUtil.DCID).split(",");
		String[] pageNumbers = null;
		String[] pageSizes = null;
		if (context.getString(CommonUtil.STATEMENT_PAGENUMBER) != null) {
			pageNumbers = context.getString(CommonUtil.STATEMENT_PAGENUMBER)
					.split(",");
		}
		if (context.getString(CommonUtil.STATEMENT_PAGESIZE) != null) {
			pageSizes = context.getString(CommonUtil.STATEMENT_PAGESIZE).split(
					",");
		}

		// 获得commonBO
		CommonBO commonBO = (CommonBO) BeanUtil.getBean("core_commonBO_bo");

		// 获取AdvanceQuery查询条件
		List conditions = context.getPOJOList("_advancedQueryConditionStore");
		if (conditions != null) {
			QueryCondition qConditon = new QueryCondition();
			qConditon.setConditions(conditions);
			UnieapRequestContextHolder.getRequestContext().put(
					"advanceQueryCondition", qConditon);
		}

		// 获取分页信息
		if (context.getString(CommonUtil.PAGENUMBER) != null
				&& context.getString(CommonUtil.PAGESIZE) != null) {
			QueryResult qResult = new QueryResult();
			qResult.setPageNumber(Integer.valueOf(context
					.getString(CommonUtil.PAGENUMBER)));
			qResult.setPageSize(Integer.valueOf(context
					.getString(CommonUtil.PAGESIZE)));
			if (context.getString(CommonUtil.CALCCOUNT) != null) {
				qResult.setAutoCalcCount(Boolean.valueOf(context
						.getString(CommonUtil.CALCCOUNT)));
			}
			UnieapRequestContextHolder.getRequestContext().put("queryResult",
					qResult);
		} else {
			QueryResult qResult = new QueryResult();
			qResult.setAutoCalcCount(true);
			UnieapRequestContextHolder.getRequestContext().put("queryResult",
					qResult);
		}
		BOContext bc = new BOContextImpl();

		String parameterTypes = context.getString(CommonUtil.PARAMETERTYPES);

		for (int i = 0; i < statementNames.length; i++) {
			String statementPath = "";
			DevelopmentComponent dc = DCRepository
					.getDevelopmentComponent(dcIds[i]);
			if (dc == null) {
				// patch工程
				statementPath = dcIds[i] + File.separator + "statement"
						+ File.separator + statementRefs[i] + ".xml";
			} else {
				// dc工程
				statementPath = dc.getSoftwareComponent().getId()
						+ File.separator + dcIds[i] + File.separator
						+ "statement" + File.separator + statementRefs[i]
						+ ".xml";
			}
			if (statementRefs[i].contains("/")) {
				statementRefs[i] = statementRefs[i].replace("/", ".");
			}
			String ref = dcIds[i] + "." + statementRefs[i];
			Statement statement = new StatementImpl(statementPath);
			String dataSourceID = statement.getDataSourceID();
			if (dataSourceID != null && !"".equals(dataSourceID)) {
				DataSourceContextHolder.setDataSourceType(dataSourceID);
			}

			Map map = new HashMap();
			if (parameterTypes != null && parameterTypes.contains("map")) {
				String mapDataJson = context.getString(statementNames[i]);
				if (mapDataJson == null) {
					map = null;
				} else {
					JSONObject mapJsonObject = JSONObject
							.fromObject(mapDataJson);
					if (mapJsonObject == null || mapJsonObject.isNullObject()) {
						map = null;
					} else {
						Iterator<?> it = mapJsonObject.keys();
						while (it.hasNext()) {
							String key = it.next().toString();
							Object value = mapJsonObject.get(key);
							if (value instanceof JSONObject
									&& ((JSONObject) value).isNullObject()) {
								continue;
							}
							map.put(key, value);
						}
					}
				}
			} else {
				String parameters = context.getString(CommonUtil.PARAMETERS);
				if (parameters != null) {
					String[] paras = parameters.split(",");
					for (int k = 0; k < paras.length; k++) {
						map.put(paras[k], context.getString(paras[k]));
					}
				}
			}

			if (pageNumbers != null && pageSizes != null
					&& (pageNumbers.length != 0 || pageSizes.length != 0)) {
				// 这个判断没看懂，后台报错
				if (pageNumbers[i].length() == 0 || pageNumbers[i].equals("''")) {
					if (context.getString(CommonUtil.PAGENUMBER) != null) {
						PageUtil.setPageNumber(Integer.valueOf(context
								.getString(CommonUtil.PAGENUMBER)));
					} else {
						PageUtil.setPageNumber(1);
					}
				} else {
					PageUtil.setPageNumber(Integer.valueOf(pageNumbers[i]));
				}
				// 这个判断没看懂，后台报错
				if (pageNumbers[i].length() == 0 || pageSizes[i].equals("''")) {
					if (context.getString(CommonUtil.PAGESIZE) != null) {
						PageUtil.setPageSize(Integer.valueOf(context
								.getString(CommonUtil.PAGESIZE)));
					} else {
						PageUtil.setPageSize(-1);
					}
				} else {
					PageUtil.setPageSize(Integer.valueOf(pageSizes[i]));
				}
			}

			// 调用statement方法
			QueryResult result = commonBO.findByStatement(ref, map);
			if (statementNames.length == 1) {
				bc.put("result", result);
			} else {
				bc.put(statementNames[i], result);
			}
		}
		// 处理返回值
		Class returnType = bc.getClass();
		handleBoMethodReturn(dataCenter, bc, returnType);
	}
	
	public static int getSenderType(String typeName){
		if("Local".equalsIgnoreCase(typeName)){
			return Dispatcher.LOCAL_SENDER_MARK;
		}else if("HTTP".equalsIgnoreCase(typeName)){
			return Dispatcher.HTTP_SENDER_MARK;
		}else if("Socket".equalsIgnoreCase(typeName)){
			return Dispatcher.SOCKET_SENDER_MARK;
		}else if("Webservice".equalsIgnoreCase(typeName)){
			return Dispatcher.WEBSERVICE_SENDER_MARK;
		}else{
			return Dispatcher.LOCAL_SENDER_MARK;
		}
	}
}
