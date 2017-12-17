package com.neusoft.unieap.techcomp.ria.common.action;

import java.io.ByteArrayOutputStream;

import org.apache.commons.io.IOUtils;
//import org.hibernate.SessionFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.neusoft.unieap.core.CoreConstants;
import com.neusoft.unieap.core.context.UnieapRequestContextHolder;
import com.neusoft.unieap.core.dataSource.DataSourceContextHolder;
import com.neusoft.unieap.core.protection.Protection;
import com.neusoft.unieap.core.util.BeanUtil;
import com.neusoft.unieap.techcomp.ria.RIAException;
import com.neusoft.unieap.techcomp.ria.action.BaseProcessor;
import com.neusoft.unieap.techcomp.ria.common.util.CommonUtil;
import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.ds.DataCenter;
import com.neusoft.unieap.techcomp.ria.ds.DataCenterFactory;
import com.neusoft.unieap.techcomp.ria.io.CommonWriter;
import com.neusoft.unieap.techcomp.ria.io.DataCenterIOManager;
import com.neusoft.unieap.techcomp.ria.io.DataCenterWriter;

public class CommonProcessor extends BaseProcessor implements
		ApplicationContextAware {

	private static final long serialVersionUID = 1L;

	private ApplicationContext applicationContext;

//	private SessionFactory sessionFactory;

	public void setApplicationContext(ApplicationContext appContext)
			throws BeansException {
		this.applicationContext = appContext;
	}

	/**
	 * 统一的后台处理 通过参数反射调用对应的BO方法
	 * 
	 * @throws Exception
	 */
	public void commonMethod() throws Exception {

		ViewContext context = generateContext();
		DataCenter dataCenter = DataCenterFactory.getInstance()
				.createDataCenter();

		// int randomNumber =(int)(Math.random()*10000);
		// if (randomNumber==5000)
		// CustomCheck.getInstance().check(false);
		// license校验
//		String errorMessage = Protection.check(getRequest(), getResponse());
//		if (errorMessage != null && !"".equals(errorMessage)) {
//			dataCenter.setCode(-1);
//			dataCenter.setTitle(errorMessage);
//			dataCenter.setDetail(errorMessage);
//			write(dataCenter);
//			return;
//		}

		UnieapRequestContextHolder.getRequestContext().put("viewContext",
				context);
		// 获取调用的命名查询方法
//		String namedQuery = context.getString(CommonUtil.NAMED_QUERY);
//		if (namedQuery != null) {
//			CommonUtil.invokeNamedQuery(context, dataCenter, sessionFactory);
//			write(dataCenter);
//			return;
//		}
//		// 获取调用的statement查询方法
//		String statement = context.getString(CommonUtil.STATEMENT);
//		if (statement != null) {
//			CommonUtil.invokeStatement(context, dataCenter);
//			write(dataCenter);
//			return;
//		}
//		String boId = context.getString(CommonUtil.BOID);
//		if (boId == null) {
//			throw new RIAException("EAPTECH008011", null);
//		}

		// 录制脚本
//		if (context.containsKey("_methodId")) {
//			UnieapRequestContextHolder.getRequestContext().put("_methodId",
//					true);
//			UnieapRequestContextHolder.getRequestContext().put("_boId", boId);
//		}

		// 获取调用的BO方法
//		Object bo = applicationContext.getBean(boId);
//		if (bo == null) {
//			throw new RIAException("EAPTECH008012", new Object[] { boId });
//		}
		CommonUtil.invokeBoMethod(context, dataCenter);

		// 录制脚本
		if (UnieapRequestContextHolder.getRequestContext().containsKey(
				"_testMethodId")) {
			dataCenter.addParameter("_methodId", UnieapRequestContextHolder
					.getRequestContext().get("_testMethodId"));
			dataCenter.addParameter("_sessionVarString",
					UnieapRequestContextHolder.getRequestContext().get(
							"_sessionVarString"));
			dataCenter.addParameter("_requestVarString",
					UnieapRequestContextHolder.getRequestContext().get(
							"_requestVarString"));
		}
		if (!"true".equals(getRequest().getAttribute(
				CoreConstants.EAP_NON_JSON_RETURN_TYPE))) {
			write(dataCenter);
		}
		UnieapRequestContextHolder.clearPojoContext();//清除线程变量中关于disession的内容
		DataSourceContextHolder.clearDataSourceType();

	}

	// 用于通过工登录系统具
	public void login() throws Exception {
	}

//	public void setSessionFactory(SessionFactory sessionFactory) {
//		this.sessionFactory = sessionFactory;
//	}
//
//	public SessionFactory getSessionFactory() {
//		return sessionFactory;
//	}

	@SuppressWarnings("deprecation")
	@Override
	protected void write(DataCenter dc) throws Exception {
		ByteArrayOutputStream byteArrayOutputStream = null;
		String result = "";
		try {
			byteArrayOutputStream = new ByteArrayOutputStream();
			DataCenterWriter writer = DataCenterIOManager
					.createWriter(byteArrayOutputStream);
			writer.write(dc);
			writer.close();
			result = IOUtils.toString(byteArrayOutputStream.toByteArray(),
					"UTF-8");
		} catch (Exception e) {
		} finally {
			byteArrayOutputStream.close();
		}

		ViewContext viewContext = (ViewContext) UnieapRequestContextHolder
				.getRequestContext().get("viewContext");
		if (viewContext.getString(CommonUtil.METHODPARAMETERTYPES).contains(
				CommonUtil.FORM_PARAMETER_TYPE)) {
			result = "<textarea>" + result + "</textarea>";
		}
		try {
			Object bean = BeanUtil.getBean("commonWriter");
			((CommonWriter) bean).parseStream(this.getResponse().getWriter(),
					getRequest(), result);
		} catch (Exception e) {
			this.getResponse().getWriter().write(result);
		}
	}

}
