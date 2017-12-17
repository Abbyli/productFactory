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
@Entity(name = "T_COMBO_INSURTYPE")
@ModelFile(value = "tComboInsurtype.entity")
public class TComboInsurtype extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "COMBO_INSURTYPE_ID")
    private Long comboInsurtypeId;

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
     * 险种名称
     */
    @Column(name = "INSURTYPE_NAME")
    private String insurtypeName;

    /**
     * 险种代码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 险种版本
     */
    @Column(name = "INSURTYPE_VER")
    private String insurtypeVer;

    /**
     * 险种简称
     */
    @Column(name = "INSURTYPE_ABBR")
    private String insurtypeAbbr;

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
     * 定价名称
     */
    @Column(name = "PRICING_NAME")
    private String pricingName;

    public void setComboInsurtypeId(Long comboInsurtypeId) {
        this.comboInsurtypeId = comboInsurtypeId;
    }

    public Long getComboInsurtypeId() {
        return comboInsurtypeId;
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

    public void setInsurtypeName(String insurtypeName) {
        this.insurtypeName = insurtypeName;
    }

    public String getInsurtypeName() {
        return insurtypeName;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setInsurtypeVer(String insurtypeVer) {
        this.insurtypeVer = insurtypeVer;
    }

    public String getInsurtypeVer() {
        return insurtypeVer;
    }

    public void setInsurtypeAbbr(String insurtypeAbbr) {
        this.insurtypeAbbr = insurtypeAbbr;
    }

    public String getInsurtypeAbbr() {
        return insurtypeAbbr;
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

    public void setPricingName(String pricingName) {
        this.pricingName = pricingName;
    }

    public String getPricingName() {
        return pricingName;
    }
}
