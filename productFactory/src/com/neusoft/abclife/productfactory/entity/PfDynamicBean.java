package com.neusoft.abclife.productfactory.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;
import com.neusoft.fdframework.arithmetic.engine.job.commons.DateUtil;
import com.neusoft.fdframework.arithmetic.engine.job.models.TypeConverter;

/**
 * 
 * <p>Title: 金融软件开发平台</p>.
 * <p>Description:动态Bean，用于传递公式和规则参数</p>
 * <p>Copyright: Copyright (c) 2014</p>
 * @author 张阳
 * 2015年6月1日
 */
public class PfDynamicBean implements Serializable, Cloneable{
    /**
     * 说明：.
     */
    private static final long serialVersionUID = -5775829989067131629L;
    
    private Map<String,Serializable> map=new HashMap<String,Serializable>();
    
    
    public void addAll(PfDynamicBean dynamicBean)
    {
        if(dynamicBean!=null)
        {
            Set<Entry<String, Serializable>> entrySet=dynamicBean.entrySet();
            if(entrySet!=null&&!entrySet.isEmpty())
            {
                for(Map.Entry<String,Serializable> entry:entrySet)
                {
                        this.map.put(entry.getKey(), entry.getValue());
                }
            }
        }
    }
    
    public void addProperties( Map<String,Object> map)
    {
        if(map!=null&&!map.isEmpty())
        {
            addProperties(map.entrySet());
        }
    }
    private void addProperties(Set<Entry<String, Object>> entrySet)
    {
        if(entrySet!=null&&!entrySet.isEmpty())
        {
            for(Map.Entry<String,Object> entry:entrySet)
            {
                Serializable value=(Serializable)entry.getValue() ;
                this.map.put(entry.getKey(), value);
            }
        }
    }
    /**
     * Key列表 
     * @return
     */
    public Set<String> keySet() {
        return map.keySet();
    }
    public boolean contains(String key)
    {
        return map.containsKey(key);
    }
    /**
     * 值列表
     * @return
     */
    public Set<Map.Entry<String, Serializable>> entrySet() {
        return map.entrySet();
    }
        
    /**
     * 设置日期型参数
     * @param key
     * @param value
     */
    public void put(String key,Date value)
    {
        map.put(key, value);
    }
    
    public void put(String key,Serializable value)
    {
        map.put(key, value);
    }
    /**
     * 设置字符串型参数
     * @param key
     * @param value
     */
    public void put(String key,String value)
    {
        map.put(key, value);
    }
    /**
     * 设置数值型参数
     * @param key
     * @param value
     */
    public void put(String key,BigDecimal value)
    {
        map.put(key, value);
    }
    public Object getObject(String key)
    {
    	Object ret=null;
        if(map.get(key)!=null)
        {
             ret=map.get(key);
        }
        return ret;
    }
    
    public Object getObject(String key,String destType)
    {
    	Object ret=null;
        if(map.get(key)!=null)
        {
            ret=map.get(key);
            if(!ret.getClass().getName().equals(destType))
            {
            	throw new EngineException("10005",new String[]{key,destType,map.get(key).getClass().getName()},null);
            }
        }
        return ret;
    }
    
    public String getString(String key)
    {
        String ret=null;
        if(map.get(key)!=null)
        {
            try
            {
                ret=(String)map.get(key);
            }
            catch(Exception e)
            {
                throw new EngineException("10005",new String[]{key,"java.lang.String",map.get(key).getClass().getName()},e);
            }
        }
        return ret;
    }
    
    public Date getDate(String key)
    {
        Date ret=null;
        if(map.get(key)!=null)
        {
            try
            {
                ret=(Date)map.get(key);
            }
            catch(Exception e)
            {
                throw new EngineException("10005",new String[]{key,"java.util.Date",map.get(key).getClass().getName()},e);
            }
        }
        return ret;
    }
    public BigDecimal getBigDecimal(String key)
    {
        BigDecimal ret=null;
        if(map.get(key)!=null)
        {
            try
            {
            	ret=TypeConverter.convert(map.get(key), BigDecimal.class);
            }
            catch(Exception e)
            {
                throw new EngineException("10005",new String[]{key,"java.math.BigDecimal",map.get(key).getClass().getName()},e);
            }
        }
        return ret;
    }
    
    /** 
     * 参考父类或接口的注解.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        StringBuilder stringBuilder=new StringBuilder(128);
        if(!map.isEmpty())
        {
            for(Map.Entry<String,Serializable> entry:map.entrySet())
            {
                stringBuilder.append(entry.getKey());
                stringBuilder.append("=");
                if(entry.getValue()!=null)
                {
                    if(entry.getValue() instanceof Date)
                    {
                        stringBuilder.append(DateUtil.date2String((Date)entry.getValue(), 1));
                    }
                    else if(entry.getValue() instanceof BigDecimal)
                    {
                        stringBuilder.append(((BigDecimal)entry.getValue()).toPlainString());
                    }
                    else
                    {
                        stringBuilder.append(entry.getValue().toString());
                    }
                }
                stringBuilder.append(";");
            }
        }
        return stringBuilder.toString();
    }
    @Override
    public Object clone() throws CloneNotSupportedException {
        PfDynamicBean cloned = new PfDynamicBean();
        cloned.map = new HashMap<String, Serializable>();
        if (map != null) {
            cloned.map.putAll(map);
        }
        return cloned;
    }
    
}
