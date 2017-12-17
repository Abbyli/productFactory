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
@Entity(name = "T_SURVV_BENE_ACCUM_INTBE_INTRA")
@ModelFile(value = "tSurvvBeneAccumIntbeIntra.entity")
public class TSurvvBeneAccumIntbeIntra extends DomainObject
    implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "SURVV_ID")
    private Long survvId;

    /**
     * 险种编码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

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
     * 开始日期
     */
    @Column(name = "START_DATE")
    private Date startDate;

    /**
     * 结束日期
     */
    @Column(name = "END_DATE")
    private Date endDate;

    /**
     * 利率
     */
    @Column(name = "INTRATE")
    private Double intrate;

    public void setSurvvId(Long survvId) {
        this.survvId = survvId;
    }

    public Long getSurvvId() {
        return survvId;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
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

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getStartDate() {
        return startDate;
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
