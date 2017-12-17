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
@Entity(name = "T_PRODUCT_PARAM_DEF")
@ModelFile(value = "tProductParamDef.entity")
public class TProductParamDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRODUCT_PARAM_ID")
    private Long productParamId;

    /**
     * 实体ID
     */
    @Column(name = "ENTITY_ID")
    private Long entityId;

    /**
     * 00-系统层 01-定价层 02-险种层 03-产品层
     */
    @Column(name = "ASCRIB_HIERAR")
    private String ascribHierar;

    /**
     * 01：交费期间 02：保险期间 03：领取期间 04：交费频率
     */
    @Column(name = "PARAM_TYPE")
    private String paramType;

    /**
     * 参数值
     */
    @Column(name = "PARAM_VAL")
    private Integer paramVal;

    /**
     * 年 月 日
     */
    @Column(name = "PARAM_UNIT")
    private String paramUnit;

    /**
     * 是否默认
     */
    @Column(name = "IS_DEFAULT")
    private String isDefault;

    /**
     * 参数描述
     */
    @Column(name = "PARAM_DESC")
    private String paramDesc;

    public void setProductParamId(Long productParamId) {
        this.productParamId = productParamId;
    }

    public Long getProductParamId() {
        return productParamId;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public Long getEntityId() {
        return entityId;
    }

    public void setAscribHierar(String ascribHierar) {
        this.ascribHierar = ascribHierar;
    }

    public String getAscribHierar() {
        return ascribHierar;
    }

    public void setParamType(String paramType) {
        this.paramType = paramType;
    }

    public String getParamType() {
        return paramType;
    }

    public void setParamVal(Integer paramVal) {
        this.paramVal = paramVal;
    }

    public Integer getParamVal() {
        return paramVal;
    }

    public void setParamUnit(String paramUnit) {
        this.paramUnit = paramUnit;
    }

    public String getParamUnit() {
        return paramUnit;
    }

    public void setIsDefault(String isDefault) {
        this.isDefault = isDefault;
    }

    public String getIsDefault() {
        return isDefault;
    }

    public void setParamDesc(String paramDesc) {
        this.paramDesc = paramDesc;
    }

    public String getParamDesc() {
        return paramDesc;
    }
}
