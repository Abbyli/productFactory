package com.neusoft.fdframework.security.filter;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.neusoft.fdframework.core.CoreParameterEntity;
import com.neusoft.fdframework.core.CoreResultEntity;
import com.neusoft.fdframework.core.SystemConst;
import com.neusoft.fdframework.proxy.service.Dispatcher;
import com.neusoft.fdframework.security.common.base.UserContext;
import com.neusoft.fdframework.security.common.constant.SecurityConst;
import com.neusoft.fdframework.security.common.util.MD5Util;
import com.neusoft.fdframework.security.common.util.PropertyCacheUtil;
import com.neusoft.fdframework.security.dto.SysSecUserDTO;
import com.neusoft.fdframework.web.WebApplicationConst;

/**
 * <b>Application name:</b>保险基础框架<br>
 * <b>Application describing:</b>基本认证过滤器，实现本地认证<br>
 * <b>Copyright:</b>Copyright &copy; 东软集团股份有限公司 金融事业部版权所有。<br>
 * <b>Company:</b>Neusoft<br>
 * @author
 */
public class DefaultAuthenticationProcessingFilter implements Filter {
    public static final String REQUEST_URL = "login.action";
    private String loginPageUrl;
    private String loginSuccessUrl;
    private FilterConfig fc;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession();
        if (session != null && (session.getAttribute(SecurityConst.USER_CONTEXT) == null)) {
            if (request.getParameter("userName") == null || validateCode(request, response)) {
                if (request.getParameter("userName") == null) {
//                    response.sendRedirect(request.getContextPath() + this.getLoginPageUrl());
                    //不使用response.sendRedirect的方法是为了解决首页是单页的时候，登录页面变成嵌入的方式，如果使用iframe的方式则不需要如此。
                    String url=request.getContextPath() + this.getLoginPageUrl();
                    response.getWriter().write("<script>//<!-- THE-NODE-OF-SESSION-TIMEOUT -->\n if(window.top!=null) {window.top.location='"+url+"'}else {window.top.location='"+url+"';} </script>");
                }
                return;
            } else {
                login(request, response);
            }

        }else if (session != null && (session.getAttribute(SecurityConst.USER_CONTEXT) != null))
        {
            session.removeAttribute(SecurityConst.USER_CONTEXT);
            session.invalidate();
            login(request, response);
        }
        chain.doFilter(request, response);
    }
    /**
     * {校验验证码}
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @return boolean
     * @author:金志明
     */
    private boolean validateCode(HttpServletRequest request, HttpServletResponse response) {
        boolean flag = false;
        String validationCode = (String) request.getSession().getAttribute(SecurityConst.VALIDATION_CODE);
        String uValidationCode = request.getParameter("validationCode");
        if (validationCode != null && (uValidationCode == null || !uValidationCode.equals(validationCode))) {
            CoreResultEntity result = new CoreResultEntity();
            result.setSuccessFlag("1");
            Map<String, Object> resultMap = new HashMap<String, Object>();
            resultMap.put("validationCode", "-1"); //验证码错误
            result.setContent(resultMap);
            try {
                response.getOutputStream().write(JSON.toJSONString(result).getBytes());
            } catch (IOException e) {
                throw new SecurityException("验证码写入失败", e);
            }
            flag = true;
        }
        return flag;
    }

    /**
     * 登录
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     */
    @SuppressWarnings("unchecked")
    private void login(HttpServletRequest request, HttpServletResponse response) {
        String content = request.getParameter("content");
        String userName = "";
        String passWord = "";
        if (content == null) {
            userName = request.getParameter("userName");
            passWord = request.getParameter("passWord");
            Map param = new HashMap();
            param.put("username", userName);
            content = JSON.toJSONString(param);
        }
        CoreParameterEntity entity = new CoreParameterEntity();
        entity.setProcessID("security.user.validUser");
        entity.setContent(content);
        entity.setCurrentUserAccount("");
        entity.setCurrentUserIp(request.getRemoteAddr());
        CoreResultEntity result = Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType),
                WebApplicationConst.requestRemoteUrl + REQUEST_URL);
        if (result != null && result.getSuccessFlag().equalsIgnoreCase("1")) {
            SysSecUserDTO rt = (SysSecUserDTO) result.getContent().get("user");
            if (rt == null) { //用户不存在
                result = new CoreResultEntity();
                result.setSuccessFlag("1");
                Map<String, Object> resultMap = new HashMap<String, Object>();
                resultMap.put("errorCode", SecurityConst.ERROR_CODE_NAMEORPASSWO_ERROR); //用户不存在
                resultMap.put("message", SecurityConst.USERNAMEORPASSWORDERROR);
                result.setContent(resultMap);
            } else { //存在该用户  //判断用户是不是超级管理员权限用户
                Map param = new HashMap();
                param.put("userId", rt.getId());
                entity.setProcessID("security.role.isAdminUser");
                entity.setContent(JSON.toJSONString(param));
                entity.setCurrentUserAccount("");
                entity.setCurrentUserIp(request.getRemoteAddr());
                CoreResultEntity cre = Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                boolean flag = (Boolean) cre.getContent().get("isAdmin"); //true表示是超级管理员权限用户
                if (flag) { //是超级管理员
                    if (MD5Util.getMD5Code(passWord).equals(rt.getPasswo())) { //密码相同登录成功
                        param = (Map) JSON.parse(content);
                        UserContext userContext = new UserContext();
//                        userContext.setId(rt.getId());
//                        userContext.setAccount(param.get("username").toString());
                        userContext.setUser(rt);
                        userContext.setAdmin(flag);
                        //清空session
                        HttpSession session = request.getSession();
                        session.invalidate();
                        session = request.getSession();
                        if (session != null) {
                            session.setAttribute(SecurityConst.USER_LOGIN_TIME, rt.getLoginTime());
                            session.setAttribute(SecurityConst.USER_CONTEXT, userContext);
                            session.setAttribute(SystemConst.KEY_CURRENT_USER, userContext.getAccount());
                        }
                        //保存登录时间
                        param = new HashMap();
                        param.put("userId", rt.getId());
                        entity.setProcessID("security.user.updateUserLoginTime");
                        entity.setContent(JSON.toJSONString(param));
                        entity.setCurrentUserAccount("");
                        entity.setCurrentUserIp(request.getRemoteAddr());
                        Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                        //返回给页面信息 登录成功
                        result = new CoreResultEntity();
                        result.setSuccessFlag("1");
                        Map<String, Object> resultMap = new HashMap<String, Object>();
                        resultMap.put("errorCode", SecurityConst.LOGIN_SUCCESS);
                        result.setContent(resultMap);
                    } else { //密码错误
                        result = new CoreResultEntity();
                        result.setSuccessFlag("1");
                        Map<String, Object> resultMap = new HashMap<String, Object>();
                        resultMap.put("errorCode", SecurityConst.ERROR_CODE_NAMEORPASSWO_ERROR); //密码错误
                        resultMap.put("message", SecurityConst.USERNAMEORPASSWORDERROR);
                        result.setContent(resultMap);
                    }
                } else { //不是超级管理员
                    if (SecurityConst.ACCOUNT_LOCKED.equals(rt.getAccountLocked())) { //账号锁定
                        result = new CoreResultEntity();
                        result.setSuccessFlag("1");
                        Map<String, Object> resultMap = new HashMap<String, Object>();
                        resultMap.put("errorCode", SecurityConst.ERROR_CODE_LOCKUSER); //账号锁定
                        resultMap.put("message", SecurityConst.LOCKUSER);
                        result.setContent(resultMap);
                    } else { //账号还没有锁定
                        if (MD5Util.getMD5Code(passWord).equals(rt.getPasswo())) { //密码相同登录成功
                            param = (Map) JSON.parse(content);
                            UserContext userContext = new UserContext();
//                            userContext.setId(rt.getId());
//                            userContext.setAccount(param.get("username").toString());
                            userContext.setUser(rt);
                            userContext.setAdmin(flag);
                            HttpSession session = request.getSession();
                            if (session != null) {
                                session.setAttribute(SecurityConst.USER_LOGIN_TIME, rt.getLoginTime());
                                session.setAttribute(SecurityConst.USER_CONTEXT, userContext);
                                session.setAttribute(SystemConst.KEY_CURRENT_USER, userContext.getAccount());
                            }
                            //保存登录时间
                            param = new HashMap();
                            param.put("userId", rt.getId());
                            entity.setProcessID("security.user.updateUserLoginTime");
                            entity.setContent(JSON.toJSONString(param));
                            entity.setCurrentUserAccount("");
                            entity.setCurrentUserIp(request.getRemoteAddr());
                            Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                            //清空 密码错误次数
                            param = new HashMap();
                            param.put("userId", rt.getId());
                            param.put("loginErrorPasswoNum", 0);
                            entity.setProcessID("security.user.updatePasswoErrorNum");
                            entity.setContent(JSON.toJSONString(param));
                            entity.setCurrentUserAccount("");
                            entity.setCurrentUserIp(request.getRemoteAddr());
                            Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                            //返回给页面信息 登录成功
                            result = new CoreResultEntity();
                            result.setSuccessFlag("1");
                            Map<String, Object> resultMap = new HashMap<String, Object>();
                            resultMap.put("errorCode", SecurityConst.LOGIN_SUCCESS);
                            result.setContent(resultMap);
                        } else { //密码错误
                            result = new CoreResultEntity();
                            result.setSuccessFlag("1");
                            Map<String, Object> resultMap = new HashMap<String, Object>();
                            resultMap.put("errorCode", SecurityConst.ERROR_CODE_NAMEORPASSWO_ERROR); //密码错误
                            resultMap.put("message", SecurityConst.USERNAMEORPASSWORDERROR);
                            result.setContent(resultMap);
                            int count = 1; //密码错误次数  之前错误次数+1
                            //获得账号锁定密码错误次数
                            String errTime = PropertyCacheUtil.getProperty(SecurityConst.LOGIN_PROPERTIES_FILE_NAME,
                                    SecurityConst.ERRORNUM_LOCK_USER);
                            Date d = rt.getLoginErrorPasswoTime();
                            if (d != null) { //有错误时间
                                //判断第一次密码错误时间是否已经经过 错误时间范围
                                Calendar cal = Calendar.getInstance();
                                Calendar nCal = Calendar.getInstance();
                                cal.setTime(d); //设置第一次错误时间
                                //获得密码错误允许时间范围
                                String time = PropertyCacheUtil.getProperty(SecurityConst.LOGIN_PROPERTIES_FILE_NAME,
                                        SecurityConst.ERROR_TIME_AREA);
                                cal.add(Calendar.MINUTE, Integer.parseInt(time));
                                if (cal.compareTo(nCal) >= 1) { //第一次错误时间+错误时间范围后大于当前时间说明 错误时间范围还没有超过   需要继续累加错误次数
                                    count = rt.getLoginErrorPasswoNum() + 1;
                                    if (Integer.parseInt(errTime) < count) { //判断+1后密码错误次数已经大于锁定密码次数 count设置成1
                                        count = 1;
                                    }
                                }
                            }
                            //记录密码错误次数
                            param = new HashMap();
                            param.put("userId", rt.getId());
                            param.put("loginErrorPasswoNum", count);
                            entity.setProcessID("security.user.updatePasswoErrorNum");
                            entity.setContent(JSON.toJSONString(param));
                            entity.setCurrentUserAccount("");
                            entity.setCurrentUserIp(request.getRemoteAddr());
                            Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                            //密码错误次数到达锁定账号次数 即 锁定账号
                            if (Integer.parseInt(errTime) <= count) {
                                param = new HashMap();
                                param.put("userId", rt.getId());
                                entity.setProcessID("security.user.lockUser");
                                entity.setContent(JSON.toJSONString(param));
                                entity.setCurrentUserAccount("");
                                entity.setCurrentUserIp(request.getRemoteAddr());
                                Dispatcher.runCall(entity, getSenderType(WebApplicationConst.requestType), null);
                            }
                        }
                    }
                }
            }
        }
        try {
            response.getOutputStream().write(JSON.toJSONString(result).getBytes());
        } catch (IOException e) {
            throw new SecurityException("登录信息写入失败", e);
        }
    }

    /**
     * 获取发送类型
     * @param typeName String
     * @return int
     */
    public int getSenderType(String typeName) {
        int senderType = 0;
        if ("Local".equalsIgnoreCase(typeName)) {
            senderType = Dispatcher.LOCAL_SENDER_MARK;
        } else if ("HTTP".equalsIgnoreCase(typeName)) {
            senderType = Dispatcher.HTTP_SENDER_MARK;
        } else if ("Socket".equalsIgnoreCase(typeName)) {
            senderType = Dispatcher.SOCKET_SENDER_MARK;
        } else if ("Webservice".equalsIgnoreCase(typeName)) {
            senderType = Dispatcher.WEBSERVICE_SENDER_MARK;
        } else {
            senderType = Dispatcher.LOCAL_SENDER_MARK;
        }
        return senderType;
    }

    @Override
    public void destroy() {

    }

    @Override
    public void init(FilterConfig fc) throws ServletException {
        this.fc = fc;
    }

    /**
     * 获取登陆url
     * @return String
     */
    public String getLoginPageUrl() {
        if (loginPageUrl == null) {
            loginPageUrl = fc.getInitParameter("loginPageUrl");
        }
        return loginPageUrl;
    }

    /**
     * 设置登录url
     * @param loginPageUrl String
     */
    public void setLoginPageUrl(String loginPageUrl) {
        this.loginPageUrl = loginPageUrl;
    }

    /**
     * 获取登录成功url
     * @return String
     */
    public String getLoginSuccessUrl() {
        if (loginSuccessUrl == null) {
            loginSuccessUrl = fc.getInitParameter("loginSuccessUrl");
        }
        return loginSuccessUrl;
    }

    /**
     * 设置登录成功url
     * @param loginSuccessUrl String
     */
    public void setLoginSuccessUrl(String loginSuccessUrl) {
        this.loginSuccessUrl = loginSuccessUrl;
    }

}