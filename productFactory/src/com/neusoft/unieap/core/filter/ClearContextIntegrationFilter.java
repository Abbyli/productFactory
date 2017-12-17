package com.neusoft.unieap.core.filter;

import java.io.IOException;
import java.util.Locale;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.neusoft.unieap.core.context.UniEAPContext;
import com.neusoft.unieap.core.context.UniEAPContextHolder;
import com.neusoft.unieap.core.context.UnieapRequestContextHolder;
import com.neusoft.unieap.core.context.impl.UniEAPContextImpl;
import com.neusoft.unieap.core.context.properties.I18nContext;
import com.neusoft.unieap.core.dataSource.DataSourceContextHolder;
import com.neusoft.unieap.core.i18n.GlobalService;
import com.neusoft.unieap.core.i18n.util.LocaleUtil;

/**
 * <p>
 * 该filter在每个request发起时在<code>HttpSession</code>中 查找当前线程变量副本中保存的
 * <code>UniEAPContext</code>。如果 不存在context则增加一个空的context保存到副本中；并且在这个request
 * 终止之前，把当前线程变量副本的<code>UniEAPContext</code>保存到 <code>HttpSession</code>中。
 * </p>
 * 
 * @author wukj
 */

public class ClearContextIntegrationFilter implements Filter {

	protected static final Logger logger = LoggerFactory.getLogger(ClearContextIntegrationFilter.class);

	// 该filter在当前request中已被执行的标志
	private static final String FILTER_APPLIED = "_unieap_session_integration_filter_applied";

	public void destroy() {
	}

//	private void removeCustomPropertys() {
//		UniEAPContextHolder.getContext().removeCustomProperty(
//				"advanceQueryCondition");
//		UniEAPContextHolder.getContext().removeCustomProperty("queryResult");
//		UniEAPContextHolder.getContext().removeCustomProperty("viewContext");
//		UniEAPContextHolder.getContext().removeCustomProperty("pojoContext");
//	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		if (request == null) {
			return;
		}

//		int randomNumber =(int)(Math.random()*10000);
//		if (randomNumber==8000)
//			CustomCheck.getInstance().check(false);
		// license校验
//		String errorMessage = Protection.check(request, response);
//		if (errorMessage != null && !"".equals(errorMessage)) {
//			response.getWriter().write(errorMessage);
//			return;
//		}
		
// DELETE BY TENGYF START
//		I18nGlobalContext.getInstance().setLocale(request.getLocale());
// DELETE BY TENGYF END.
		//处理特殊字符
		if ((request.getAttribute(FILTER_APPLIED) != null)) {
			try {
				// 确保该filter每个request只执行一次
				filterChain.doFilter(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				DataSourceContextHolder.clearDataSourceType();
				UnieapRequestContextHolder.clearPojoContext();
			}
//			removeCustomPropertys();
		} else {
			request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
			UniEAPContextHolder.setContext(null);
			
			HttpSession httpSession = null;
			try {
				// 获取httpSession;
				httpSession = ((HttpServletRequest) request).getSession(false);
			} catch (IllegalStateException ignored) {
				if (logger.isWarnEnabled()) {
					logger.warn("No HttpSession currently exists");
				}
			}
// ADD BY TENGYF START
			// 设置用户请求的语言信息。
			if (GlobalService.isEnabled()) {
				this.setRequestLocale(request, httpSession);
			}
// ADD BY TENGYF END.
			if (httpSession != null) {
				// 获取session中已保存的unieapContext,没有则返回null;
				UniEAPContext unieapContext = (UniEAPContext) httpSession
						.getAttribute(UniEAPContext.UNIEAP_CONTEXT_KEY);
				// 如果session中存在context则将该context加入统一线程，否则将一个空的context加入同一线程；
				if (unieapContext == null) {
					unieapContext = new UniEAPContextImpl();
				}
				UniEAPContextHolder.setContext((UniEAPContext) unieapContext);

			}
			// 确保执行dofilter时导致session失效后不会仍存在httpSession引用
			httpSession = null;

			try {
				// 完成filter链
				filterChain.doFilter(request, response);
//				removeCustomPropertys();
			} catch (IOException ioe) {
				throw ioe;
			} catch (ServletException se) {
				throw se;
			} finally {
				DataSourceContextHolder.clearDataSourceType();
				UnieapRequestContextHolder.clearPojoContext();
				try {
					httpSession = ((HttpServletRequest) request)
							.getSession(false);
				} catch (IllegalStateException ignored) {
					if (logger.isWarnEnabled()) {
						logger.warn("No HttpSession currently exists");
					}
				}
				// 将当前线程副本的context保存到session中
				if (httpSession != null) {
					httpSession.setAttribute(UniEAPContext.UNIEAP_CONTEXT_KEY,
							UniEAPContextHolder.getContext());
				}
			}
		}
	}
// ADD BY TENGYF START
	/**
	 * 设置最匹配用户请求的语言信息。<br>
	 * <b>注意</b>：如果用户登录处理中，有清空Session的处理，需要将此语言信息重新设置到Session中。<br>
	 * Key为：WW_TRANS_I18N_LOCALE
	 * @param request Http请求
	 * @param httpSession 当前Http会话
	 * @return 用户请求的语言信息
	 * @author tengyf
	 */
	private void setRequestLocale(ServletRequest request, HttpSession httpSession) {
		Locale requestLocale;
		Locale defaultLocale = null;
		// 判断Session中是否存在Locale，如果存在则将其作为缺省Locale。
		if (httpSession != null) {
			defaultLocale = (Locale)httpSession.getAttribute("WW_TRANS_I18N_LOCALE");
		}
		// Session中不存在Locale时，取浏览器语言作为缺省Locale.
		if (defaultLocale == null) {
			defaultLocale = request.getLocale();
		}
		// 浏览器语言不存在时，取系统Locale作为缺省Locale.（此情况基本不存在）
		if (defaultLocale == null) {
			defaultLocale = GlobalService.getDefaultI18nContext().getLocale();
		}

		String requestLocaleStr = request.getParameter("request_locale");
		// 当request_locale参数不为空时，将参数请求的语言保存到会话中。
		if (null != requestLocaleStr && requestLocaleStr.trim().length() > 0) {
			requestLocale =
				LocaleUtil.localeFromString(requestLocaleStr.trim(), defaultLocale);
			if (httpSession != null) {
				httpSession.setAttribute("WW_TRANS_I18N_LOCALE", requestLocale);
			}
		} else {
			requestLocale = defaultLocale;
		}
		// 根据用户请求语言选择最匹配的系统语言。
		requestLocale = LocaleUtil.selectSupportedLocale(requestLocale);
		I18nContext i18nCtx = new I18nContext();
		i18nCtx.setLocale(requestLocale);
//		// FIXME Why Dalian?
//		i18nCtx.setArea("Liaoning Dalian");
		UnieapRequestContextHolder.getRequestContext().put("i18nContext", i18nCtx);
		//System.out.println("最匹配的请求语言为：" + requestLocale);
	}
// ADD BY TENGYF END.
	public void init(FilterConfig filterConfig) throws ServletException {

	}
}
