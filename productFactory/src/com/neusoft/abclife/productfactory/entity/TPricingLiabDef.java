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
@Entity(name = "T_PRICING_LIAB_DEF")
@ModelFile(value = "tPricingLiabDef.entity")
public class TPricingLiabDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRICING_LIAB_ID")
    private Long pricingLiabId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 财务缴费 账户扣费 不定期追加
     */
    @Column(name = "PRICING_LIAB_NAME")
    private String pricingLiabName;

    /**
     * 必选 可选
     */
    @Column(name = "IS_OPT")
    private String isOpt;

    /**
     * 相当与PayPlanCode
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 是否保额递增
     */
    @Column(name = "IS_AMNT_INCREM")
    private String isAmntIncrem;

    /**
     * UNI_DUTY_TYPE
     */
    @Column(name = "UNI_DUTY_TYPE")
    private String uniDutyType;

    /**
     * 单位保额/保费
     */
    @Column(name = "AMNT_PREM_UNIT")
    private Long amntPremUnit;

    /**
     * 保额算法ID
     */
    @Column(name = "SUMINSUR_ALGO_ID")
    private Long suminsurAlgoId;

    /**
     * 保费算法ID
     */
    @Column(name = "PREM_ALGO_ID")
    private Long premAlgoId;

    /**
     * 是否可豁免
     */
    @Column(name = "IS_WAIVE")
    private String isWaive;

    /**
     * P--保费算保额 G--保额算保费 A--保费保额互算 I--录入保费保额    按份数
     */
    @Column(name = "CALC_DIRECTION")
    private String calcDirection;

    /**
     * 01 缴费期满对应的保单周年日  默认01
     */
    @Column(name = "PAYMNT_END_DATE_CALC_WAY")
    private String paymntEndDateCalcWay;

    public void setPricingLiabId(Long pricingLiabId) {
        this.pricingLiabId = pricingLiabId;
    }

    public Long getPricingLiabId() {
        return pricingLiabId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setPricingLiabName(String pricingLiabName) {
        this.pricingLiabName = pricingLiabName;
    }

    public String getPricingLiabName() {
        return pricingLiabName;
    }

    public void setIsOpt(String isOpt) {
        this.isOpt = isOpt;
    }

    public String getIsOpt() {
        return isOpt;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setIsAmntIncrem(String isAmntIncrem) {
        this.isAmntIncrem = isAmntIncrem;
    }

    public String getIsAmntIncrem() {
        return isAmntIncrem;
    }

    public void setUniDutyType(String uniDutyType) {
        this.uniDutyType = uniDutyType;
    }

    public String getUniDutyType() {
        return uniDutyType;
    }

    public void setAmntPremUnit(Long amntPremUnit) {
        this.amntPremUnit = amntPremUnit;
    }

    public Long getAmntPremUnit() {
        return amntPremUnit;
    }

    public void setSuminsurAlgoId(Long suminsurAlgoId) {
        this.suminsurAlgoId = suminsurAlgoId;
    }

    public Long getSuminsurAlgoId() {
        return suminsurAlgoId;
    }

    public void setPremAlgoId(Long premAlgoId) {
        this.premAlgoId = premAlgoId;
    }

    public Long getPremAlgoId() {
        return premAlgoId;
    }

    public void setIsWaive(String isWaive) {
        this.isWaive = isWaive;
    }

    public String getIsWaive() {
        return isWaive;
    }

    public void setCalcDirection(String calcDirection) {
        this.calcDirection = calcDirection;
    }

    public String getCalcDirection() {
        return calcDirection;
    }

    public void setPaymntEndDateCalcWay(String paymntEndDateCalcWay) {
        this.paymntEndDateCalcWay = paymntEndDateCalcWay;
    }

    public String getPaymntEndDateCalcWay() {
        return paymntEndDateCalcWay;
    }
}
