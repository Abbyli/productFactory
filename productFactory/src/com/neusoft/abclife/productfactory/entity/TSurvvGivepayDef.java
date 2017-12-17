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
@Entity(name = "T_SURVV_GIVEPAY_DEF")
@ModelFile(value = "tSurvvGivepayDef.entity")
public class TSurvvGivepayDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "SURVV_GIVEPAY_ID")
    private Long survvGivepayId;

    /**
     * 保障责任ID
     */
    @Column(name = "PROTEC_LIAB_ID")
    private Long protecLiabId;

    /**
     * 定价责任代码
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 保障责任代码
     */
    @Column(name = "PROTEC_LIAB_CODE")
    private String protecLiabCode;

    /**
     * 生存给付代码
     */
    @Column(name = "SURVV_GIVEPAY_CODE")
    private String survvGivepayCode;

    /**
     * 生存给付名称
     */
    @Column(name = "SURVV_GIVEPAY_NAME")
    private String survvGivepayName;

    /**
     * 01-生存金 02-满期金 03-年金
     */
    @Column(name = "SURVV_GIVEPAY_TYPE")
    private String survvGivepayType;

    /**
     * 'I-受益人是被保险人 A-是投保人 N-无限制'
     */
    @Column(name = "BNFCRY_TYPE")
    private String bnfcryType;

    /**
     * 给付间隔
     */
    @Column(name = "GIVEPAY_INTV")
    private BigDecimal givepayIntv;

    /**
     * 起领期间
     */
    @Column(name = "START_DRAW_DATE")
    private Integer startDrawDate;

    /**
     * 起领期间单位 Y-年  M—月 D-天 A-岁
     */
    @Column(name = "START_DRAW_DATE_UNIT")
    private String startDrawDateUnit;

    /**
     * 止领期间
     */
    @Column(name = "STOP_DRAW_DATE")
    private Integer stopDrawDate;

    /**
     * 起领期间单位 Y-年  M—月 D-天 A-岁
     */
    @Column(name = "STOP_DRAW_DATE_UNIT")
    private String stopDrawDateUnit;

    /**
     * '一次发放 年 月 日'
     */
    @Column(name = "GIVEPAY_INTV_UNIT")
    private String givepayIntvUnit;

    /**
     * 01 保单生效日
     */
    @Column(name = "START_DRAW_DATE_CALC_REF")
    private String startDrawDateCalcRef;

    /**
     * 0-以计算为准 1-取计算后当月一号 2-取计算后当年一号 3-取缴费终止日期
     */
    @Column(name = "START_DRAW_DATE_CALC_WAY")
    private String startDrawDateCalcWay;

    /**
     * 'S-起保日期对应日 B-出生日期对应日 C-参考保单选择'
     */
    @Column(name = "STOP_DRAW_DATE_CALC_REF")
    private String stopDrawDateCalcRef;

    /**
     * 0-以计算为准 1-取计算后当月一号 2-取计算后当年一号 3-取缴费终止日期
     */
    @Column(name = "STOP_DRAW_DATE_CALC_WAY")
    private String stopDrawDateCalcWay;

    /**
     * Y--发催收 N--不发催收 相当于是否提醒
     */
    @Column(name = "URG_PAY_ID")
    private String urgPayId;

    /**
     * 给付最大次数
     */
    @Column(name = "GIVEPAY_MAX_TIMES")
    private Long givepayMaxTimes;

    /**
     * Y-是 N-否
     */
    @Column(name = "GUARANT_GIVEPAY_ID")
    private String guarantGivepayId;

    /**
     * 保证给付期间
     */
    @Column(name = "GUARANT_GIVEPAY_PERIOD")
    private Long guarantGivepayPeriod;

    /**
     * '年 月 日 年龄'
     */
    @Column(name = "GUARANT_GIVEPAY_PERIOD_UNIT")
    private String guarantGivepayPeriodUnit;

    public void setSurvvGivepayId(Long survvGivepayId) {
        this.survvGivepayId = survvGivepayId;
    }

    public Long getSurvvGivepayId() {
        return survvGivepayId;
    }

    public void setProtecLiabId(Long protecLiabId) {
        this.protecLiabId = protecLiabId;
    }

    public Long getProtecLiabId() {
        return protecLiabId;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setProtecLiabCode(String protecLiabCode) {
        this.protecLiabCode = protecLiabCode;
    }

    public String getProtecLiabCode() {
        return protecLiabCode;
    }

    public void setSurvvGivepayCode(String survvGivepayCode) {
        this.survvGivepayCode = survvGivepayCode;
    }

    public String getSurvvGivepayCode() {
        return survvGivepayCode;
    }

    public void setSurvvGivepayName(String survvGivepayName) {
        this.survvGivepayName = survvGivepayName;
    }

    public String getSurvvGivepayName() {
        return survvGivepayName;
    }

    public void setSurvvGivepayType(String survvGivepayType) {
        this.survvGivepayType = survvGivepayType;
    }

    public String getSurvvGivepayType() {
        return survvGivepayType;
    }

    public void setBnfcryType(String bnfcryType) {
        this.bnfcryType = bnfcryType;
    }

    public String getBnfcryType() {
        return bnfcryType;
    }

    public void setGivepayIntv(BigDecimal givepayIntv) {
        this.givepayIntv = givepayIntv;
    }

    public BigDecimal getGivepayIntv() {
        return givepayIntv;
    }

    public void setStartDrawDate(Integer startDrawDate) {
        this.startDrawDate = startDrawDate;
    }

    public Integer getStartDrawDate() {
        return startDrawDate;
    }

    public void setStartDrawDateUnit(String startDrawDateUnit) {
        this.startDrawDateUnit = startDrawDateUnit;
    }

    public String getStartDrawDateUnit() {
        return startDrawDateUnit;
    }

    public void setStopDrawDate(Integer stopDrawDate) {
        this.stopDrawDate = stopDrawDate;
    }

    public Integer getStopDrawDate() {
        return stopDrawDate;
    }

    public void setStopDrawDateUnit(String stopDrawDateUnit) {
        this.stopDrawDateUnit = stopDrawDateUnit;
    }

    public String getStopDrawDateUnit() {
        return stopDrawDateUnit;
    }

    public void setGivepayIntvUnit(String givepayIntvUnit) {
        this.givepayIntvUnit = givepayIntvUnit;
    }

    public String getGivepayIntvUnit() {
        return givepayIntvUnit;
    }

    public void setStartDrawDateCalcRef(String startDrawDateCalcRef) {
        this.startDrawDateCalcRef = startDrawDateCalcRef;
    }

    public String getStartDrawDateCalcRef() {
        return startDrawDateCalcRef;
    }

    public void setStartDrawDateCalcWay(String startDrawDateCalcWay) {
        this.startDrawDateCalcWay = startDrawDateCalcWay;
    }

    public String getStartDrawDateCalcWay() {
        return startDrawDateCalcWay;
    }

    public void setStopDrawDateCalcRef(String stopDrawDateCalcRef) {
        this.stopDrawDateCalcRef = stopDrawDateCalcRef;
    }

    public String getStopDrawDateCalcRef() {
        return stopDrawDateCalcRef;
    }

    public void setStopDrawDateCalcWay(String stopDrawDateCalcWay) {
        this.stopDrawDateCalcWay = stopDrawDateCalcWay;
    }

    public String getStopDrawDateCalcWay() {
        return stopDrawDateCalcWay;
    }

    public void setUrgPayId(String urgPayId) {
        this.urgPayId = urgPayId;
    }

    public String getUrgPayId() {
        return urgPayId;
    }

    public void setGivepayMaxTimes(Long givepayMaxTimes) {
        this.givepayMaxTimes = givepayMaxTimes;
    }

    public Long getGivepayMaxTimes() {
        return givepayMaxTimes;
    }

    public void setGuarantGivepayId(String guarantGivepayId) {
        this.guarantGivepayId = guarantGivepayId;
    }

    public String getGuarantGivepayId() {
        return guarantGivepayId;
    }

    public void setGuarantGivepayPeriod(Long guarantGivepayPeriod) {
        this.guarantGivepayPeriod = guarantGivepayPeriod;
    }

    public Long getGuarantGivepayPeriod() {
        return guarantGivepayPeriod;
    }

    public void setGuarantGivepayPeriodUnit(String guarantGivepayPeriodUnit) {
        this.guarantGivepayPeriodUnit = guarantGivepayPeriodUnit;
    }

    public String getGuarantGivepayPeriodUnit() {
        return guarantGivepayPeriodUnit;
    }
}
