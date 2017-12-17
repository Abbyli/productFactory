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
@Entity(name = "T_LIAB_FEE_DEF")
@ModelFile(value = "tLiabFeeDef.entity")
public class TLiabFeeDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "LIAB_ADDPREM_ID")
    private Long liabAddpremId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 定价责任ID
     */
    @Column(name = "PRICING_LIAB_ID")
    private Long pricingLiabId;

    /**
     * 01 健康 02 职业 03 其他
     */
    @Column(name = "ADDPREM_TYPE")
    private String addpremType;

    /**
     * 等高老师确认 01投保人 02单一被保险人 03多被保险人 默认02
     */
    @Column(name = "ADDPREM_OBJ")
    private String addpremObj;

    /**
     * 加费算法ID
     */
    @Column(name = "ADDPREM_ALGO_ID")
    private Long addpremAlgoId;

    /**
     * 整数
     */
    @Column(name = "ADDPREM_EVAL_POINT_MAX_VAL")
    private BigDecimal addpremEvalPointMaxVal;

    public void setLiabAddpremId(Long liabAddpremId) {
        this.liabAddpremId = liabAddpremId;
    }

    public Long getLiabAddpremId() {
        return liabAddpremId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setPricingLiabId(Long pricingLiabId) {
        this.pricingLiabId = pricingLiabId;
    }

    public Long getPricingLiabId() {
        return pricingLiabId;
    }

    public void setAddpremType(String addpremType) {
        this.addpremType = addpremType;
    }

    public String getAddpremType() {
        return addpremType;
    }

    public void setAddpremObj(String addpremObj) {
        this.addpremObj = addpremObj;
    }

    public String getAddpremObj() {
        return addpremObj;
    }

    public void setAddpremAlgoId(Long addpremAlgoId) {
        this.addpremAlgoId = addpremAlgoId;
    }

    public Long getAddpremAlgoId() {
        return addpremAlgoId;
    }

    public void setAddpremEvalPointMaxVal(BigDecimal addpremEvalPointMaxVal) {
        this.addpremEvalPointMaxVal = addpremEvalPointMaxVal;
    }

    public BigDecimal getAddpremEvalPointMaxVal() {
        return addpremEvalPointMaxVal;
    }
}
