package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;


/**
 */
@Entity(name = "T_FUNCTION_DEF")
@ModelFile(value = "tFunctionDef.entity")
public class TFunctionDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 函数标志
     */
    @Column(name = "FUNC_PROPERTY")
    private String funcProperty;

    /**
     * 函数名
     */
    @Column(name = "FUNC_NAME")
    private String funcName;

    /**
     * 类名
     */
    @Column(name = "CLASS_NAME")
    private String className;

    /**
     * 方法名
     */
    @Column(name = "METHOD_NAME")
    private String methodName;

    /**
     * 函数类型(static, dynamic)
     */
    @Column(name = "FUNC_TYPE")
    private String funcType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setFuncProperty(String funcProperty) {
        this.funcProperty = funcProperty;
    }

    public String getFuncProperty() {
        return funcProperty;
    }

    public void setFuncName(String funcName) {
        this.funcName = funcName;
    }

    public String getFuncName() {
        return funcName;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassName() {
        return className;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setFuncType(String funcType) {
        this.funcType = funcType;
    }

    public String getFuncType() {
        return funcType;
    }
}
