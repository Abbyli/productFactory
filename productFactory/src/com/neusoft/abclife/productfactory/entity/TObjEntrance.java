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
@Entity(name = "T_OBJ_ENTRANCE")
@ModelFile(value = "tObjEntrance.entity")
public class TObjEntrance extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 险种代码
     */
    @Column(name = "RISK_CODE")
    private String riskCode;

    /**
     * 险种版本
     */
    @Column(name = "RISK_VER")
    private Long riskVer;

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
     * SUB_GETDUTY_CODE
     */
    @Column(name = "SUB_GETDUTY_CODE")
    private String subGetdutyCode;

    /**
     * 业务分类(不传)
     */
    @Column(name = "BUSI_TYPE")
    private String busiType;

    /**
     * 公式分类
     */
    @Column(name = "ALGO_TYPE")
    private String algoType;

    /**
     * 子分类1
     */
    @Column(name = "SUB_TYPE1")
    private String subType1;

    /**
     * 子分类2
     */
    @Column(name = "SUB_TYPE2")
    private String subType2;

    /**
     * 同一对象标识
     */
    @Column(name = "OBJ_SEQ")
    private String objSeq;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setRiskCode(String riskCode) {
        this.riskCode = riskCode;
    }

    public String getRiskCode() {
        return riskCode;
    }

    public void setRiskVer(Long riskVer) {
        this.riskVer = riskVer;
    }

    public Long getRiskVer() {
        return riskVer;
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

    public void setSubGetdutyCode(String subGetdutyCode) {
        this.subGetdutyCode = subGetdutyCode;
    }

    public String getSubGetdutyCode() {
        return subGetdutyCode;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }

    public void setAlgoType(String algoType) {
        this.algoType = algoType;
    }

    public String getAlgoType() {
        return algoType;
    }

    public void setSubType1(String subType1) {
        this.subType1 = subType1;
    }

    public String getSubType1() {
        return subType1;
    }

    public void setSubType2(String subType2) {
        this.subType2 = subType2;
    }

    public String getSubType2() {
        return subType2;
    }

    public void setObjSeq(String objSeq) {
        this.objSeq = objSeq;
    }

    public String getObjSeq() {
        return objSeq;
    }
}
