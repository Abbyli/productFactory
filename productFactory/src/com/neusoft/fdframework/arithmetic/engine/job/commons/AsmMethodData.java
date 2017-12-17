package com.neusoft.fdframework.arithmetic.engine.job.commons;

import com.esotericsoftware.reflectasm.MethodAccess;

public class AsmMethodData {
    private Class<?> destClass;
    private Object instance;
    private MethodAccess access;
    
    /**
     * 生成的getter方法
     * @return the access.
     */
    public MethodAccess getAccess() {
        return access;
    }
    /**
     * 生成的setter方法
     * @param access the access to set
     */
    public void setAccess(MethodAccess access) {
        this.access = access;
    }
    /**
     * 生成的getter方法
     * @return the destClass.
     */
    public Class<?> getDestClass() {
        return destClass;
    }
    /**
     * 生成的setter方法
     * @param destClass the destClass to set
     */
    public void setDestClass(Class<?> destClass) {
        this.destClass = destClass;
    }
    /**
     * 生成的getter方法
     * @return the instance.
     */
    public Object getInstance() {
        return instance;
    }
    /**
     * 生成的setter方法
     * @param instance the instance to set
     */
    public void setInstance(Object instance) {
        this.instance = instance;
    }
    
}
