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
@Entity(name = "T_FEE_RATE")
@ModelFile(value = "tFeeRate.entity")
public class TFeeRate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 险种代码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 起始年度
     */
    @Column(name = "BEGIN_YEAR")
    private Long beginYear;

    /**
     * 费用标识
     */
    @Column(name = "FEE_FLAG")
    private String feeFlag;

    /**
     * 责任代码
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 缴费频率 0-趸交 12-年交 6-半年交 3-季交 1-月交 -1-不定期交
     */
    @Column(name = "PAY_INTV")
    private String payIntv;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 费用类型
     */
    @Column(name = "FEE_TYPE")
    private String feeType;

    /**
     * 终止年度
     */
    @Column(name = "END_YEAR")
    private Long endYear;

    /**
     * 最低金额
     */
    @Column(name = "MIN_AMOUNT")
    private BigDecimal minAmount;

    /**
     * 最高金额
     */
    @Column(name = "MAX_AMOUNT")
    private BigDecimal maxAmount;

    /**
     * 费率
     */
    @Column(name = "RATE")
    private Double rate;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setBeginYear(Long beginYear) {
        this.beginYear = beginYear;
    }

    public Long getBeginYear() {
        return beginYear;
    }

    public void setFeeFlag(String feeFlag) {
        this.feeFlag = feeFlag;
    }

    public String getFeeFlag() {
        return feeFlag;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setPayIntv(String payIntv) {
        this.payIntv = payIntv;
    }

    public String getPayIntv() {
        return payIntv;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setEndYear(Long endYear) {
        this.endYear = endYear;
    }

    public Long getEndYear() {
        return endYear;
    }

    public void setMinAmount(BigDecimal minAmount) {
        this.minAmount = minAmount;
    }

    public BigDecimal getMinAmount() {
        return minAmount;
    }

    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }

    public BigDecimal getMaxAmount() {
        return maxAmount;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Double getRate() {
        return rate;
    }
}
