package com.neusoft.fdframework.arithmetic.engine.job.commons;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

import com.esotericsoftware.reflectasm.MethodAccess;
import com.neusoft.abclife.productfactory.entity.PfDynamicBean;
import com.neusoft.abclife.productfactory.entity.TFunctionArgRef;
import com.neusoft.abclife.util.PfIndicatorContextHolder;
import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;

public class ReflectUtil {
    private static final Logger log = LoggerFactory.getLogger(ReflectUtil.class);
    private static Map<String,Integer> paramCountMap=new HashMap<String,Integer>();
    private static Map<String,AsmMethodData> asmMethodCache=new HashMap<String,AsmMethodData>();
    public static Method getMethod(Class<?> c,String methodName) throws ClassNotFoundException, SecurityException, NoSuchMethodException
    {
        log.debug("获取方法:"+methodName);
        Method[] methods = c.getDeclaredMethods();
        if (methods != null) {
            for (int i = 0; i < methods.length; i++) {
                Method method = methods[i];
                if(method.getName().equals(methodName))
                {
                    return method;
                }
            }
        }
        return null;
    }
    private static AsmMethodData getAsmMethod(String className)
    {
        AsmMethodData asmMethodData=asmMethodCache.get(className);
        if(asmMethodData==null)
        {
            try {
                log.debug("初始化类:"+className);
                Class<?> c=Class.forName(className);
                Object instance=c.newInstance();
                MethodAccess access=MethodAccess.get(c);
                Method[] declaredMethods = c.getDeclaredMethods();
                String cacheKey=className+"_";
                for (int i = 0, n = declaredMethods.length; i < n; i++) {
                    Method method = declaredMethods[i];
                    paramCountMap.put(cacheKey+method.getName(), method.getParameterTypes()==null?0:method.getParameterTypes().length);
                }
                asmMethodData=new AsmMethodData();
                asmMethodData.setDestClass(c);
                asmMethodData.setInstance(instance);
                asmMethodData.setAccess(access);
                asmMethodCache.put(className, asmMethodData);
            } catch (Exception e) {
                throw new EngineException("10018",new String[]{className,""},e);
            }
        }
        return asmMethodData;
    }
    
    public static int getParameterCount(String className,String methodName)
    {
        String cacheKey=className+"_"+methodName;
        getAsmMethod(className);
        return paramCountMap.get(cacheKey);
    }
//    public static Object executeMethod(String className,String methodName,Object... param) throws Throwable
    public static Object executeMethod(String className,String methodName,List<Object> param) throws Throwable
    {
        AsmMethodData asmMethodData=getAsmMethod(className);
        Object ret=null;
        if(asmMethodData!=null)
        {
            Object instance=asmMethodData.getInstance();
            ExpressionParser parser = new SpelExpressionParser();
    		StandardEvaluationContext sc = new StandardEvaluationContext();
    		sc.setVariable("instance",instance);
    		List<String> parmList=new ArrayList<String>();
            if(param!=null&&param.size()>0)
            {
            	for(int i=0,n=param.size();i<n;i++)
        		{
            		String paramStr="param"+i;
        			parmList.add("#"+paramStr);
        			sc.setVariable(paramStr,param.get(i));
        		}
            }
//            ret=asmMethodData.getAccess().invoke(instance, methodName, param);
            String expression="#instance."+methodName+"("+StringUtils.join(parmList,",")+")";
            //System.out.println(expression);
            //System.out.println(sc);
    		ret = parser.parseExpression(expression).getValue(sc, Object.class);
        }
        return ret; 
    }
	
    public static void main(String[] args) throws Throwable {
        //System.out.println(executeStaticMethod("com.neusoft.sfzj.jr.TestMa","chengfang","1"));
    }
}
