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
@Entity(name = "T_COMBO_INSURTYPE_ELEM_REL")
@ModelFile(value = "tComboInsurtypeElemRel.entity")
public class TComboInsurtypeElemRel extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "COMBO_INSURTYPE_ELEM_REL_ID")
    private Long comboInsurtypeElemRelId;

    /**
     * 组合主键
     */
    @Column(name = "COMBO_ID")
    private Long comboId;

    /**
     * 险种主键
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 险种代码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 险种名称
     */
    @Column(name = "INSURTYPE_NAME")
    private String insurtypeName;

    /**
     * 险种版本
     */
    @Column(name = "INSURTYPE_VER")
    private String insurtypeVer;

    /**
     * 定价主键
     */
    @Column(name = "PRICING_ID")
    private Long pricingId;

    /**
     * 定价代码
     */
    @Column(name = "PRICING_CODE")
    private String pricingCode;

    /**
     * 要素名称
     */
    @Column(name = "ELEM_NAME")
    private String elemName;

    /**
     * 固定值
     */
    @Column(name = "FIX_VAL")
    private String fixVal;

    /**
     * 要素主键
     */
    @Column(name = "ELEM_ID")
    private Long elemId;

    public void setComboInsurtypeElemRelId(Long comboInsurtypeElemRelId) {
        this.comboInsurtypeElemRelId = comboInsurtypeElemRelId;
    }

    public Long getComboInsurtypeElemRelId() {
        return comboInsurtypeElemRelId;
    }

    public void setComboId(Long comboId) {
        this.comboId = comboId;
    }

    public Long getComboId() {
        return comboId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setInsurtypeName(String insurtypeName) {
        this.insurtypeName = insurtypeName;
    }

    public String getInsurtypeName() {
        return insurtypeName;
    }

    public void setInsurtypeVer(String insurtypeVer) {
        this.insurtypeVer = insurtypeVer;
    }

    public String getInsurtypeVer() {
        return insurtypeVer;
    }

    public void setPricingId(Long pricingId) {
        this.pricingId = pricingId;
    }

    public Long getPricingId() {
        return pricingId;
    }

    public void setPricingCode(String pricingCode) {
        this.pricingCode = pricingCode;
    }

    public String getPricingCode() {
        return pricingCode;
    }

    public void setElemName(String elemName) {
        this.elemName = elemName;
    }

    public String getElemName() {
        return elemName;
    }

    public void setFixVal(String fixVal) {
        this.fixVal = fixVal;
    }

    public String getFixVal() {
        return fixVal;
    }

    public void setElemId(Long elemId) {
        this.elemId = elemId;
    }

    public Long getElemId() {
        return elemId;
    }
}
