package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.math.BigDecimal;


/**
 */
@Entity(name = "T_FUNCTION_ARG_REF")
@ModelFile(value = "tFunctionArgRef.entity")
public class TFunctionArgRef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 函数ID
     */
    @Column(name = "FUNC_ID")
    private String funcId;

    /**
     * 参数名
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 参数顺序
     */
    @Column(name = "ORDER_NUM")
    private BigDecimal orderNum;

    /**
     * 参数类型(2引用BOM的属性,3引用属性)
     */
    @Column(name = "ARG_TYPE")
    private String argType;

    /**
     * 返回类型string,number
     */
    @Column(name = "RETURN_TYPE")
    private String returnType;

    /**
     * 引用值
     */
    @Column(name = "REF_VALUE")
    private String refValue;

    /**
     * 标记(inner,outter)
     */
    @Column(name = "FLAG")
    private String flag;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setFuncId(String funcId) {
        this.funcId = funcId;
    }

    public String getFuncId() {
        return funcId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setOrderNum(BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public BigDecimal getOrderNum() {
        return orderNum;
    }

    public void setArgType(String argType) {
        this.argType = argType;
    }

    public String getArgType() {
        return argType;
    }

    public void setReturnType(String returnType) {
        this.returnType = returnType;
    }

    public String getReturnType() {
        return returnType;
    }

    public void setRefValue(String refValue) {
        this.refValue = refValue;
    }

    public String getRefValue() {
        return refValue;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getFlag() {
        return flag;
    }
}
