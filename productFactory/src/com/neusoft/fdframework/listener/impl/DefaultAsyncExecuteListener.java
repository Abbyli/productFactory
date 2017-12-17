package com.neusoft.fdframework.listener.impl;

import ch.qos.logback.core.CoreConstants;
import ch.qos.logback.core.helpers.ThrowableToStringArray;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.neusoft.fdframework.core.ServiceException;
import com.neusoft.fdframework.core.SpringServiceFactory;
import com.neusoft.fdframework.core.businessflow.define.Business;
import com.neusoft.fdframework.core.businessflow.event.AsyncExecuteEvent;
import com.neusoft.fdframework.core.businessflow.event.AsyncExecuteListener;
import com.neusoft.fdframework.core.businessflow.runtime.BusinessEngine;
import com.neusoft.fdframework.core.businessflow.runtime.RuntimeContext;
import com.neusoft.fdframework.core.exception.CoreException;
import com.neusoft.fdframework.core.util.ObjectUtils;
import com.neusoft.fdframework.dao.AsynExecuteResultDao;
import com.neusoft.fdframework.entity.SysAsyncExecuteResult;
import java.util.Date;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DefaultAsyncExecuteListener
  implements AsyncExecuteListener
{
  private static Logger log = LoggerFactory.getLogger(DefaultAsyncExecuteListener.class);
  private AsynExecuteResultDao dao;

  private AsynExecuteResultDao getDao()
  {
    if (this.dao == null) {
      this.dao = ((AsynExecuteResultDao)SpringServiceFactory.getBean("fdframework.AsynExecuteResultDao"));
    }
    return this.dao;
  }

  public void prepare(AsyncExecuteEvent evt) {
    RuntimeContext context = evt.getContext();

    SysAsyncExecuteResult asynResult = new SysAsyncExecuteResult();
    asynResult.setId(evt.getInstanceId());
    Business business = evt.getBusiness();
    asynResult.setBussinessId(business.getId());
    asynResult.setBussinessDesc(business.getDesc());
    asynResult.setInstanceId(evt.getInstanceId());
    asynResult.setExecuteTime(new Date());
    asynResult.setIp((String)context.getParams().get("FD_CURRENT_USER_IP"));
    asynResult.setUserId(context.getUserId());
    asynResult.setStatue("99");
    getDao().saveToDoAsynExecuteResult(asynResult);
    log.info("waiting,instanceId={},business={},processid={}", new Object[] { evt.getInstanceId(), business, context.getBusinessId() });
  }

  public static String throwableToString(Throwable t) {
    if (t == null) {
      return null;
    }
    StringBuilder sb = new StringBuilder(10240);

    String[] stringRep = ThrowableToStringArray.convert(t);
    for (String s : stringRep) {
      if (!s.startsWith("Caused by: "))
      {
        if (Character.isDigit(s.charAt(0)))
        {
          sb.append("\t... ");
        }
        else
          sb.append("\tat ");
      }
      sb.append(s).append(CoreConstants.LINE_SEPARATOR);
    }

    return sb.toString();
  }

  public void done(AsyncExecuteEvent evt)
  {
    SysAsyncExecuteResult asynResult = getDao().getAsyncExecuteResult(evt.getInstanceId());
    asynResult.setResult(JSON.toJSONString(evt.getResult(), BusinessEngine.getJsonSerializeFilters(), new SerializerFeature[0]));
    Throwable t = evt.getEx();
    
    if (t == null) {
      asynResult.setStatue("1");
    } else {
      asynResult.setStatue("-1");
      if ((t instanceof CoreException)) {
        CoreException ex = (CoreException)t;
        asynResult.setErrorCode(ex.getErrorCode());
      } else if ((t instanceof ServiceException)) {
        ServiceException ex = (ServiceException)t;
        asynResult.setErrorCode(ex.getErrorCode());
      } else {
        asynResult.setErrorCode("00003");
      }
      //asynResult.setErrorMsg(t.getMessage());
      //asynResult.setErrorStack(throwableToString(t));
           
      String errorMsg = t.getMessage();
      if(errorMsg.length() > 256){  	  
    	  errorMsg = errorMsg.substring(0, 85);    	  
      }
      asynResult.setErrorMsg(errorMsg);
      
      Throwable real_t = t.getCause();
      String errorStack = "";
      if(real_t == null){
    	  errorStack = ObjectUtils.getThrowCaseString(t);   	  
      }else{
    	  errorStack = ObjectUtils.getThrowCaseString(real_t);     	  
      }
      if(errorStack.length() > 3000){  	  
    	  errorStack = errorStack.substring(0, 1000);  	  
      }
      asynResult.setErrorStack(errorStack);
    }
    getDao().saveDoneAsynExecuteResult(asynResult);
    log.info("done,{}", evt.getBusiness().getId());
  }
}