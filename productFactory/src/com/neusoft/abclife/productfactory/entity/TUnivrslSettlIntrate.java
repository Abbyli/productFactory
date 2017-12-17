package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.util.Date;


/**
 */
@Entity(name = "T_UNIVRSL_SETTL_INTRATE")
@ModelFile(value = "tUnivrslSettlIntrate.entity")
public class TUnivrslSettlIntrate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "UNIVRSL_ID")
    private Long univrslId;

    /**
     * 险种编码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 账户编码
     */
    @Column(name = "ACC_CODE")
    private String accCode;

    /**
     * 会计年度
     */
    @Column(name = "ACCOUNTING_YEAR")
    private Long accountingYear;

    /**
     * 结算日期
     */
    @Column(name = "SETTL_DATE")
    private Date settlDate;

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
     * 利率应公布日期
     */
    @Column(name = "INTRATE_SHOULD_ANNOUNCE_DATE")
    private Date intrateShouldAnnounceDate;

    /**
     * 利率实际公布日期
     */
    @Column(name = "INTRATE_ACTUAL_ANNOUNCE_DATE")
    private Date intrateActualAnnounceDate;

    /**
     * 利率类型
    Y-年利率
    M-月利率
     */
    @Column(name = "INTRATE_TYPE")
    private String intrateType;

    /**
     * 利率
     */
    @Column(name = "INTRATE")
    private Double intrate;

    /**
     * 利率应用开始日期
     */
    @Column(name = "INTRATE_APPLICATION_START_DATE")
    private Date intrateApplicationStartDate;

    /**
     * 利率应用结束日期
     */
    @Column(name = "INTRATE_APPLICATION_END_DATE")
    private Date intrateApplicationEndDate;

    public void setUnivrslId(Long univrslId) {
        this.univrslId = univrslId;
    }

    public Long getUnivrslId() {
        return univrslId;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccountingYear(Long accountingYear) {
        this.accountingYear = accountingYear;
    }

    public Long getAccountingYear() {
        return accountingYear;
    }

    public void setSettlDate(Date settlDate) {
        this.settlDate = settlDate;
    }

    public Date getSettlDate() {
        return settlDate;
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

    public void setIntrateShouldAnnounceDate(Date intrateShouldAnnounceDate) {
        this.intrateShouldAnnounceDate = intrateShouldAnnounceDate;
    }

    public Date getIntrateShouldAnnounceDate() {
        return intrateShouldAnnounceDate;
    }

    public void setIntrateActualAnnounceDate(Date intrateActualAnnounceDate) {
        this.intrateActualAnnounceDate = intrateActualAnnounceDate;
    }

    public Date getIntrateActualAnnounceDate() {
        return intrateActualAnnounceDate;
    }

    public void setIntrateType(String intrateType) {
        this.intrateType = intrateType;
    }

    public String getIntrateType() {
        return intrateType;
    }

    public void setIntrate(Double intrate) {
        this.intrate = intrate;
    }

    public Double getIntrate() {
        return intrate;
    }

    public void setIntrateApplicationStartDate(Date intrateApplicationStartDate) {
        this.intrateApplicationStartDate = intrateApplicationStartDate;
    }

    public Date getIntrateApplicationStartDate() {
        return intrateApplicationStartDate;
    }

    public void setIntrateApplicationEndDate(Date intrateApplicationEndDate) {
        this.intrateApplicationEndDate = intrateApplicationEndDate;
    }

    public Date getIntrateApplicationEndDate() {
        return intrateApplicationEndDate;
    }
}
