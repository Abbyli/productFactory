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
@Entity(name = "T_FORMULA_PARAM_REF")
@ModelFile(value = "tFormulaParamRef.entity")
public class TFormulaParamRef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 公式主键
     */
    @Column(name = "FORMULA_ID")
    private Long formulaId;

    /**
     * 参数名称
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 参数属性
     */
    @Column(name = "PROPERTY")
    private String property;

    /**
     * 参数类型(1默认值,2引用BOM的属性,3引用属性)
     */
    @Column(name = "PARAM_TYPE")
    private String paramType;

    /**
     * 返回类型string,number,date,bom
     */
    @Column(name = "RETURN_TYPE")
    private String returnType;

    /**
     * Bom返回类型class
     */
    @Column(name = "RETURN_TYPE_CLASS")
    private String returnTypeClass;

    /**
     * 引用值
     */
    @Column(name = "REF_VALUE")
    private String refValue;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setFormulaId(Long formulaId) {
        this.formulaId = formulaId;
    }

    public Long getFormulaId() {
        return formulaId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getProperty() {
        return property;
    }

    public void setParamType(String paramType) {
        this.paramType = paramType;
    }

    public String getParamType() {
        return paramType;
    }

    public void setReturnType(String returnType) {
        this.returnType = returnType;
    }

    public String getReturnType() {
        return returnType;
    }

    public void setReturnTypeClass(String returnTypeClass) {
        this.returnTypeClass = returnTypeClass;
    }

    public String getReturnTypeClass() {
        return returnTypeClass;
    }

    public void setRefValue(String refValue) {
        this.refValue = refValue;
    }

    public String getRefValue() {
        return refValue;
    }
}
