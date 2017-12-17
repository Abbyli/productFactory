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
@Entity(name = "T_DIVID_PARAM")
@ModelFile(value = "tDividParam.entity")
public class TDividParam extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "DIVID_ID")
    private Long dividId;

    /**
     * 会计年度
     */
    @Column(name = "ACCOUNTING_YEAR")
    private BigDecimal accountingYear;

    /**
     * 分红业务盈余
     */
    @Column(name = "DIVID_BIZ_SURPLUS")
    private BigDecimal dividBizSurplus;

    /**
     * 可分配盈余
     */
    @Column(name = "ALLOCABL_SURPLUS")
    private BigDecimal allocablSurplus;

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

    /**
     * 派发红利金额
     */
    @Column(name = "PAYOUT_DIVID_AMT")
    private BigDecimal payoutDividAmt;

    /**
     * 累积生息利率
     */
    @Column(name = "ACCUM_INTBEAR_INTRATE")
    private BigDecimal accumIntbearIntrate;

    /**
     * 支付红利的比例
     */
    @Column(name = "PAY_DIVID_PROPOR")
    private BigDecimal payDividPropor;

    /**
     * 红利公布日
     */
    @Column(name = "DIVID_ANNOUNCE_DATE")
    private Date dividAnnounceDate;

    public void setDividId(Long dividId) {
        this.dividId = dividId;
    }

    public Long getDividId() {
        return dividId;
    }

    public void setAccountingYear(BigDecimal accountingYear) {
        this.accountingYear = accountingYear;
    }

    public BigDecimal getAccountingYear() {
        return accountingYear;
    }

    public void setDividBizSurplus(BigDecimal dividBizSurplus) {
        this.dividBizSurplus = dividBizSurplus;
    }

    public BigDecimal getDividBizSurplus() {
        return dividBizSurplus;
    }

    public void setAllocablSurplus(BigDecimal allocablSurplus) {
        this.allocablSurplus = allocablSurplus;
    }

    public BigDecimal getAllocablSurplus() {
        return allocablSurplus;
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

    public void setPayoutDividAmt(BigDecimal payoutDividAmt) {
        this.payoutDividAmt = payoutDividAmt;
    }

    public BigDecimal getPayoutDividAmt() {
        return payoutDividAmt;
    }

    public void setAccumIntbearIntrate(BigDecimal accumIntbearIntrate) {
        this.accumIntbearIntrate = accumIntbearIntrate;
    }

    public BigDecimal getAccumIntbearIntrate() {
        return accumIntbearIntrate;
    }

    public void setPayDividPropor(BigDecimal payDividPropor) {
        this.payDividPropor = payDividPropor;
    }

    public BigDecimal getPayDividPropor() {
        return payDividPropor;
    }

    public void setDividAnnounceDate(Date dividAnnounceDate) {
        this.dividAnnounceDate = dividAnnounceDate;
    }

    public Date getDividAnnounceDate() {
        return dividAnnounceDate;
    }
}
