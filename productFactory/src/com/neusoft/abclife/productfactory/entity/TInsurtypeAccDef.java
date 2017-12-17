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
@Entity(name = "T_INSURTYPE_ACC_DEF")
@ModelFile(value = "tInsurtypeAccDef.entity")
public class TInsurtypeAccDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_ACC_ID")
    private Long insurtypeAccId;

    /**
     * 险种账户代码
     */
    @Column(name = "INSURTYPE_ACC_CODE")
    private String insurtypeAccCode;

    /**
     * 险种账户名称
     */
    @Column(name = "INSURTYPE_ACC_NAME")
    private String insurtypeAccName;

    /**
     * 所有人类型 1-投保人
    2-被保人
     */
    @Column(name = "INSURTYPE_ACC_OWNER")
    private String insurtypeAccOwner;

    /**
     * 利率类型 1-固定利率
    2-利率表
     */
    @Column(name = "RATE_TYPE")
    private String rateType;

    /**
     * 固定利率值
     */
    @Column(name = "FIX_RATE")
    private BigDecimal fixRate;

    /**
     * 计息类型 1-不计息?
    2-活期(天单利)
    3-活期(天复利)?
    4-1年定期?
    5-1月定期?
    6-6月定期
     */
    @Column(name = "ACCRUAL_TYPE")
    private String accrualType;

    /**
     * 计息方法 1-积数计息法
    2-逐笔计息法
     */
    @Column(name = "ACCRUAL_METHOD")
    private String accrualMethod;

    /**
     * 结算周期 ?单位为月
     */
    @Column(name = "SETTLE_CYC")
    private String settleCyc;

    /**
     * 账户类型 002万能账户 004 红利账户 005 生存金账户
     */
    @Column(name = "INSURTYPE_ACC_TYPE")
    private String insurtypeAccType;

    /**
     * 结算类型 1-结算后计入本金
    2-结算后不计入本金
     */
    @Column(name = "SETTLE_TYPE")
    private String settleType;

    /**
     * 是否计提 ?0-否
    1-是
     */
    @Column(name = "IS_PROVISION")
    private String isProvision;

    /**
     * 计提周期 单位为月
     */
    @Column(name = "PROVISION_CYC")
    private String provisionCyc;

    /**
     * 结算时点 1-每月一日
    2-保单周年日
     */
    @Column(name = "SETTLE_TIMEPOINT")
    private String settleTimepoint;

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

    public void setInsurtypeAccId(Long insurtypeAccId) {
        this.insurtypeAccId = insurtypeAccId;
    }

    public Long getInsurtypeAccId() {
        return insurtypeAccId;
    }

    public void setInsurtypeAccCode(String insurtypeAccCode) {
        this.insurtypeAccCode = insurtypeAccCode;
    }

    public String getInsurtypeAccCode() {
        return insurtypeAccCode;
    }

    public void setInsurtypeAccName(String insurtypeAccName) {
        this.insurtypeAccName = insurtypeAccName;
    }

    public String getInsurtypeAccName() {
        return insurtypeAccName;
    }

    public void setInsurtypeAccOwner(String insurtypeAccOwner) {
        this.insurtypeAccOwner = insurtypeAccOwner;
    }

    public String getInsurtypeAccOwner() {
        return insurtypeAccOwner;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public String getRateType() {
        return rateType;
    }

    public void setFixRate(BigDecimal fixRate) {
        this.fixRate = fixRate;
    }

    public BigDecimal getFixRate() {
        return fixRate;
    }

    public void setAccrualType(String accrualType) {
        this.accrualType = accrualType;
    }

    public String getAccrualType() {
        return accrualType;
    }

    public void setAccrualMethod(String accrualMethod) {
        this.accrualMethod = accrualMethod;
    }

    public String getAccrualMethod() {
        return accrualMethod;
    }

    public void setSettleCyc(String settleCyc) {
        this.settleCyc = settleCyc;
    }

    public String getSettleCyc() {
        return settleCyc;
    }

    public void setInsurtypeAccType(String insurtypeAccType) {
        this.insurtypeAccType = insurtypeAccType;
    }

    public String getInsurtypeAccType() {
        return insurtypeAccType;
    }

    public void setSettleType(String settleType) {
        this.settleType = settleType;
    }

    public String getSettleType() {
        return settleType;
    }

    public void setIsProvision(String isProvision) {
        this.isProvision = isProvision;
    }

    public String getIsProvision() {
        return isProvision;
    }

    public void setProvisionCyc(String provisionCyc) {
        this.provisionCyc = provisionCyc;
    }

    public String getProvisionCyc() {
        return provisionCyc;
    }

    public void setSettleTimepoint(String settleTimepoint) {
        this.settleTimepoint = settleTimepoint;
    }

    public String getSettleTimepoint() {
        return settleTimepoint;
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
