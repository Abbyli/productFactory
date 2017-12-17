package com.neusoft.fdframework.arithmetic.engine.job.commons;

//import com.neusoft.fdframework.arithmetic.engine.cache.IConfigCache;
import java.util.List;

import com.neusoft.abclife.productfactory.dao.WebServiceCoreDaoImpl;
import com.neusoft.abclife.productfactory.entity.TFunctionArgRef;
import com.neusoft.abclife.productfactory.entity.TFunctionDef;
import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;
//import com.neusoft.fdframework.arithmetic.engine.job.models.FunctionModel;
import com.neusoft.fdframework.core.SpringServiceFactory;

public class ExtMethodExecutor {
    public static boolean contains(String extMethodKey)
    {
//    	String version=VersionHolder.get();
//        IConfigCache configCache=SpringServiceFactory.getBean("configCache");
//        if(configCache.getFunction(version,extMethodKey)!=null)
//        {
//            return true;
//        }
        return false;
    }
    public static int getParameterCount(String extMethodKey)
    {
//    	String version=VersionHolder.get();
        int parameterCount=0;
//        IConfigCache configCache=SpringServiceFactory.getBean("configCache");
//        FunctionModel functionModel =configCache.getFunction(version,extMethodKey);
//        if(functionModel!=null)
//        {
//            parameterCount=functionModel.getArgList()==null?0:functionModel.getArgList().size();
//        }
////        return ReflectUtil.getParameterCount(className, methodName);
        return parameterCount;
    }
    
//    public static FunctionModel getFunctionModel(String extMethodKey)
//    {
//    	String version=VersionHolder.get();
//        IConfigCache configCache=SpringServiceFactory.getBean("configCache");
//        FunctionModel functionModel =configCache.getFunction(version,extMethodKey);
//        return functionModel;
//    }
    /**
     * add by qyt
     * */
	public static TFunctionDef getFunctionModel(String name)
	{
		WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
		TFunctionDef tFunctionDef =pfTestCalDAOImpl.queryTFunctionDef(name);
	    return tFunctionDef;
	}
	
	/**
     * add by qyt
     * */
	public static List<TFunctionArgRef> getFunctionModelArg(String funcId, String flag)
	{
		WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
		List<TFunctionArgRef> list = pfTestCalDAOImpl.queryTFunctionDefArg(funcId, flag);
	    return list;
	}
//    public static Object executeMethod(String extMethodKey,Object... param)
//    {
//    	String version=VersionHolder.get();
//        IConfigCache configCache=SpringServiceFactory.getBean("configCache");
//        FunctionModel functionModel =configCache.getFunction(version,extMethodKey);
//        if(functionModel!=null)
//        {
//            String className=functionModel.getClassName();
//            String methodName=functionModel.getMethodName();
//            try
//            {
//                Object obj=ReflectUtil.executeMethod(className,methodName,param);
//                return obj;
////                if(obj!=null)
////                {
////                    if(obj instanceof BigDecimal)
////                    {
////                        return ((BigDecimal) obj).toPlainString();
////                    }
////                    else
////                    {
////                        return obj.toString();
////                    }
////                }
//            }
//            catch(Throwable e)
//            {
//                throw new EngineException("10017",new String[]{className,methodName},e);
//            }
//        }
//        return null;
//    }
	  /**
       * add by qyt
       * */
	  public static Object executeMethod(TFunctionDef tFunctionDef, List<Object> param)
	  {	      
          String className = tFunctionDef.getClassName();
          String methodName = tFunctionDef.getMethodName();
          try
          {
              Object obj = ReflectUtil.executeMethod(className,methodName,param);
              return obj;
          }
          catch(Throwable e)
          {
              throw new EngineException("10017",new String[]{className,methodName},e);
          }
	  }
}
