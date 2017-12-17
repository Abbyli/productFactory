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
@Entity(name = "T_PROTEC_LIAB_DEF")
@ModelFile(value = "tProtecLiabDef.entity")
public class TProtecLiabDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PROTEC_LIAB_ID")
    private Long protecLiabId;

    /**
     * 定价责任ID
     */
    @Column(name = "PRICING_LIAB_ID")
    private Long pricingLiabId;

    /**
     * 保障责任代码
     */
    @Column(name = "PROTEC_LIAB_CODE")
    private String protecLiabCode;

    /**
     * 保障责任名称
     */
    @Column(name = "PROTEC_LIAB_NAME")
    private String protecLiabName;

    /**
     * 定价责任代码
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 0-生存领取 1-理赔给付
     */
    @Column(name = "PROTEC_LIAB_TYPE")
    private String protecLiabType;

    /**
     * I-被保险人 A-投保人 N-无限制 默认N
     */
    @Column(name = "BNFCRY_TYPE")
    private String bnfcryType;

    /**
     * 超过多少钱进行赔付，是否为该含义，待确认
     */
    @Column(name = "START_PAY_LIMIT")
    private BigDecimal startPayLimit;

    /**
     * 'Y-是 N-否'
     */
    @Column(name = "IS_CORREL_TO_ACC")
    private String isCorrelToAcc;

    public void setProtecLiabId(Long protecLiabId) {
        this.protecLiabId = protecLiabId;
    }

    public Long getProtecLiabId() {
        return protecLiabId;
    }

    public void setPricingLiabId(Long pricingLiabId) {
        this.pricingLiabId = pricingLiabId;
    }

    public Long getPricingLiabId() {
        return pricingLiabId;
    }

    public void setProtecLiabCode(String protecLiabCode) {
        this.protecLiabCode = protecLiabCode;
    }

    public String getProtecLiabCode() {
        return protecLiabCode;
    }

    public void setProtecLiabName(String protecLiabName) {
        this.protecLiabName = protecLiabName;
    }

    public String getProtecLiabName() {
        return protecLiabName;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setProtecLiabType(String protecLiabType) {
        this.protecLiabType = protecLiabType;
    }

    public String getProtecLiabType() {
        return protecLiabType;
    }

    public void setBnfcryType(String bnfcryType) {
        this.bnfcryType = bnfcryType;
    }

    public String getBnfcryType() {
        return bnfcryType;
    }

    public void setStartPayLimit(BigDecimal startPayLimit) {
        this.startPayLimit = startPayLimit;
    }

    public BigDecimal getStartPayLimit() {
        return startPayLimit;
    }

    public void setIsCorrelToAcc(String isCorrelToAcc) {
        this.isCorrelToAcc = isCorrelToAcc;
    }

    public String getIsCorrelToAcc() {
        return isCorrelToAcc;
    }
}
