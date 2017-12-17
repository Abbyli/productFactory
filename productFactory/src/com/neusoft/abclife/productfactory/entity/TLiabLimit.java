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
@Entity(name = "T_LIAB_LIMIT")
@ModelFile(value = "tLiabLimit.entity")
public class TLiabLimit extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 01-限额 02-限天 03-限次
     */
    @Column(name = "LIMIT_TYPE")
    private String limitType;

    /**
     * 值
     */
    @Column(name = "LIMIT_VALUE")
    private Long limitValue;

    /**
     * 险种编码
     */
    @Column(name = "RISK_CODE")
    private String riskCode;

    /**
     * 01-保单年度内 02-保险期间内
     */
    @Column(name = "LIMIT_TIME_TYPE")
    private String limitTimeType;

    /**
     * 险种版本
     */
    @Column(name = "RISK_VER")
    private Long riskVer;

    /**
     * 定价责任编码
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 保障责任编码
     */
    @Column(name = "PROTEC_LIAB_CODE")
    private String protecLiabCode;

    /**
     * 相关保障责任编码 多个用 ，隔开
     */
    @Column(name = "REF_PROTEC_LIAB_CODE")
    private String refProtecLiabCode;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setLimitType(String limitType) {
        this.limitType = limitType;
    }

    public String getLimitType() {
        return limitType;
    }

    public void setLimitValue(Long limitValue) {
        this.limitValue = limitValue;
    }

    public Long getLimitValue() {
        return limitValue;
    }

    public void setRiskCode(String riskCode) {
        this.riskCode = riskCode;
    }

    public String getRiskCode() {
        return riskCode;
    }

    public void setLimitTimeType(String limitTimeType) {
        this.limitTimeType = limitTimeType;
    }

    public String getLimitTimeType() {
        return limitTimeType;
    }

    public void setRiskVer(Long riskVer) {
        this.riskVer = riskVer;
    }

    public Long getRiskVer() {
        return riskVer;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setProtecLiabCode(String protecLiabCode) {
        this.protecLiabCode = protecLiabCode;
    }

    public String getProtecLiabCode() {
        return protecLiabCode;
    }

    public void setRefProtecLiabCode(String refProtecLiabCode) {
        this.refProtecLiabCode = refProtecLiabCode;
    }

    public String getRefProtecLiabCode() {
        return refProtecLiabCode;
    }
}
