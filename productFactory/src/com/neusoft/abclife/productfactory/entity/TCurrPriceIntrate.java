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
@Entity(name = "T_CURR_PRICE_INTRATE")
@ModelFile(value = "tCurrPriceIntrate.entity")
public class TCurrPriceIntrate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "CURR_ID")
    private Long currId;

    /**
     * 交费频率
     */
    @Column(name = "PAYMNT_FREQ")
    private String paymntFreq;

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
     * 险种编码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

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
     * 起始年期
     */
    @Column(name = "START_YEARTERM")
    private BigDecimal startYearterm;

    /**
     * 终止年期
     */
    @Column(name = "END_YEARTERM")
    private BigDecimal endYearterm;

    /**
     * 利率
     */
    @Column(name = "INTRATE")
    private Double intrate;

    public void setCurrId(Long currId) {
        this.currId = currId;
    }

    public Long getCurrId() {
        return currId;
    }

    public void setPaymntFreq(String paymntFreq) {
        this.paymntFreq = paymntFreq;
    }

    public String getPaymntFreq() {
        return paymntFreq;
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

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
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

    public void setStartYearterm(BigDecimal startYearterm) {
        this.startYearterm = startYearterm;
    }

    public BigDecimal getStartYearterm() {
        return startYearterm;
    }

    public void setEndYearterm(BigDecimal endYearterm) {
        this.endYearterm = endYearterm;
    }

    public BigDecimal getEndYearterm() {
        return endYearterm;
    }

    public void setIntrate(Double intrate) {
        this.intrate = intrate;
    }

    public Double getIntrate() {
        return intrate;
    }
}
