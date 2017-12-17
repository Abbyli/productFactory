package com.neusoft.fdframework.arithmetic.engine.job.expressions;

import java.util.Map;


public class Context {
    private static Context ourInstance = new Context();
    private static ThreadLocal<CalThreadData> local = new ThreadLocal<CalThreadData>();
    
    public static Context getInstance() {
        return ourInstance;
    }

    private Context() {
    }
    
    public Map<String, Object> getMap(){  	
    	makeSureExist();
    	return local.get().getMap();
    }
    
    public Object getValue(String key) {
        makeSureExist();
        Object d = local.get().getMap().get(key);
        return d == null ? null : d;
    }

    public void setContext(String key, Object value) {
        makeSureExist();
        local.get().getMap().put(key, value);
    }

    public void pushStack(Object d) {
        makeSureExist();
        local.get().getStack().push(d);
    }

    public Object popStack() {
        makeSureExist();
        return local.get().getStack().pop();
    }
    
    private void makeSureExist()
    {
        if(local.get()==null)
        {
            CalThreadData calThreadData=new CalThreadData();
            local.set(calThreadData);
        }
    }
    
    public void clear()
    {
        local.remove();
    }
}
