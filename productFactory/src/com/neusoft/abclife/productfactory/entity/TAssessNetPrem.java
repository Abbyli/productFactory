package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.math.BigDecimal;

import java.util.Date;


/**
 */
@Entity(name = "T_ASSESS_NET_PREM")
@ModelFile(value = "tAssessNetPrem.entity")
public class TAssessNetPrem extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ASSESS_ID")
    private Long assessId;

    /**
     * 险种编码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 趸/期交
     */
    @Column(name = "SINGLE_PAY_OR_REGUL_PAY")
    private String singlePayOrRegulPay;

    /**
     * 交费期间
     */
    @Column(name = "PAYMNT_PERIOD")
    private Long paymntPeriod;

    /**
     * 保险期间
     */
    @Column(name = "INSURPERIOD")
    private Long insurperiod;

    /**
     * 被保险人性别
     */
    @Column(name = "INSURD_GENDER")
    private String insurdGender;

    /**
     * 投保年龄
     */
    @Column(name = "APPLY_AGE")
    private Integer applyAge;

    /**
     * 年金开始领取年龄
     */
    @Column(name = "ANNUITY_START_DRAW_AGE")
    private Integer annuityStartDrawAge;

    /**
     * 首/续期
     */
    @Column(name = "FIRSTPERIOD_RENEW")
    private String firstperiodRenew;

    /**
     * 评估净保费
     */
    @Column(name = "ASSESS_NET_PREM")
    private BigDecimal assessNetPrem;

    /**
     * 评估净保费类型
     */
    @Column(name = "ASSESS_NET_PREM_TYPE")
    private String assessNetPremType;

    /**
     * 基本保额
     */
    @Column(name = "BASIC_SUM")
    private BigDecimal basicSum;

    /**
     * 插入操作员
     */
    @Column(name = "INSERT_OPER")
    private String insertOper;

    /**
     * 插入时间
     */
    @Column(name = "INSERT_TIME")
    private Date insertTime;

    /**
     * 更新操作员
     */
    @Column(name = "UPDATE_OPER")
    private String updateOper;

    /**
     * 更新时间
     */
    @Column(name = "UPDATE_TIME")
    private Date updateTime;

    /**
     * 插入委托人
     */
    @Column(name = "INSERT_CONSIGNOR")
    private String insertConsignor;

    /**
     * 更新委托人
     */
    @Column(name = "UPDATE_CONSIGNOR")
    private String updateConsignor;

    public void setAssessId(Long assessId) {
        this.assessId = assessId;
    }

    public Long getAssessId() {
        return assessId;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setSinglePayOrRegulPay(String singlePayOrRegulPay) {
        this.singlePayOrRegulPay = singlePayOrRegulPay;
    }

    public String getSinglePayOrRegulPay() {
        return singlePayOrRegulPay;
    }

    public void setPaymntPeriod(Long paymntPeriod) {
        this.paymntPeriod = paymntPeriod;
    }

    public Long getPaymntPeriod() {
        return paymntPeriod;
    }

    public void setInsurperiod(Long insurperiod) {
        this.insurperiod = insurperiod;
    }

    public Long getInsurperiod() {
        return insurperiod;
    }

    public void setInsurdGender(String insurdGender) {
        this.insurdGender = insurdGender;
    }

    public String getInsurdGender() {
        return insurdGender;
    }

    public void setApplyAge(Integer applyAge) {
        this.applyAge = applyAge;
    }

    public Integer getApplyAge() {
        return applyAge;
    }

    public void setAnnuityStartDrawAge(Integer annuityStartDrawAge) {
        this.annuityStartDrawAge = annuityStartDrawAge;
    }

    public Integer getAnnuityStartDrawAge() {
        return annuityStartDrawAge;
    }

    public void setFirstperiodRenew(String firstperiodRenew) {
        this.firstperiodRenew = firstperiodRenew;
    }

    public String getFirstperiodRenew() {
        return firstperiodRenew;
    }

    public void setAssessNetPrem(BigDecimal assessNetPrem) {
        this.assessNetPrem = assessNetPrem;
    }

    public BigDecimal getAssessNetPrem() {
        return assessNetPrem;
    }

    public void setAssessNetPremType(String assessNetPremType) {
        this.assessNetPremType = assessNetPremType;
    }

    public String getAssessNetPremType() {
        return assessNetPremType;
    }

    public void setBasicSum(BigDecimal basicSum) {
        this.basicSum = basicSum;
    }

    public BigDecimal getBasicSum() {
        return basicSum;
    }

    public void setInsertOper(String insertOper) {
        this.insertOper = insertOper;
    }

    public String getInsertOper() {
        return insertOper;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setUpdateOper(String updateOper) {
        this.updateOper = updateOper;
    }

    public String getUpdateOper() {
        return updateOper;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setInsertConsignor(String insertConsignor) {
        this.insertConsignor = insertConsignor;
    }

    public String getInsertConsignor() {
        return insertConsignor;
    }

    public void setUpdateConsignor(String updateConsignor) {
        this.updateConsignor = updateConsignor;
    }

    public String getUpdateConsignor() {
        return updateConsignor;
    }
}
