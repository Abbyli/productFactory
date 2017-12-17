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
@Entity(name = "T_LOAN_AUTO_PAY_INTRATE")
@ModelFile(value = "tLoanAutoPayIntrate.entity")
public class TLoanAutoPayIntrate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "LOAN_ID")
    private Long loanId;

    /**
     * 期间
     */
    @Column(name = "PERIOD")
    private BigDecimal period;

    /**
     * 期间标记Y-年 M-月
     */
    @Column(name = "PERIOD_FLG")
    private String periodFlg;

    /**
     * 利率类型C -活期 F-定期
     */
    @Column(name = "INTRATE_TYPE")
    private String intrateType;

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
     * 存贷标记L-贷款 D-存款
     */
    @Column(name = "DEPOSIT_LOAN_FLG")
    private String depositLoanFlg;

    /**
     * 公布日期
     */
    @Column(name = "ANNOUNCE_DATE")
    private Date announceDate;

    /**
     * 止期
     */
    @Column(name = "END_DATE")
    private Date endDate;

    /**
     * 利率
     */
    @Column(name = "INTRATE")
    private Double intrate;

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public Long getLoanId() {
        return loanId;
    }

    public void setPeriod(BigDecimal period) {
        this.period = period;
    }

    public BigDecimal getPeriod() {
        return period;
    }

    public void setPeriodFlg(String periodFlg) {
        this.periodFlg = periodFlg;
    }

    public String getPeriodFlg() {
        return periodFlg;
    }

    public void setIntrateType(String intrateType) {
        this.intrateType = intrateType;
    }

    public String getIntrateType() {
        return intrateType;
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

    public void setDepositLoanFlg(String depositLoanFlg) {
        this.depositLoanFlg = depositLoanFlg;
    }

    public String getDepositLoanFlg() {
        return depositLoanFlg;
    }

    public void setAnnounceDate(Date announceDate) {
        this.announceDate = announceDate;
    }

    public Date getAnnounceDate() {
        return announceDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setIntrate(Double intrate) {
        this.intrate = intrate;
    }

    public Double getIntrate() {
        return intrate;
    }
}
