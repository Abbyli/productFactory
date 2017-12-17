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
@Entity(name = "T_FORMULA_DEF")
@ModelFile(value = "tFormulaDef.entity")
public class TFormulaDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 公式名称
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 公式表达式
     */
    @Column(name = "EXPRESSION")
    private String expression;

    /**
     * 公式描述
     */
    @Column(name = "MEMO")
    private String memo;

    /**
     * 返回类型StringNumberDateBom
     */
    @Column(name = "RETURN_TYPE")
    private String returnType;

    /**
     * 返回类型class
     */
    @Column(name = "RETURN_TYPE_CLASS")
    private String returnTypeClass;

    /**
     * 业务类型
     */
    @Column(name = "BUSI_TYPE")
    private String busiType;

    /**
     * 公式类型
     */
    @Column(name = "ALGO_TYPE")
    private String algoType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public String getExpression() {
        return expression;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getMemo() {
        return memo;
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

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }

    public void setAlgoType(String algoType) {
        this.algoType = algoType;
    }

    public String getAlgoType() {
        return algoType;
    }
}
