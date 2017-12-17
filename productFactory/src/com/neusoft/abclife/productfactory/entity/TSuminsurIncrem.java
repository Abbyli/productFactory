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
@Entity(name = "T_SUMINSUR_INCREM")
@ModelFile(value = "tSuminsurIncrem.entity")
public class TSuminsurIncrem extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

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
     * 责任代码
     */
    @Column(name = "LIAB_CODE")
    private String liabCode;

    /**
     * 递增方式 1-期间内 2-续期
     */
    @Column(name = "INCREM_WAY")
    private String incremWay;

    /**
     * 递增频率 （几年一增）
     */
    @Column(name = "INCREM_FREQ")
    private String incremFreq;

    /**
     * 递增比例
     */
    @Column(name = "INCREM_PROPOR")
    private BigDecimal incremPropor;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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

    public void setLiabCode(String liabCode) {
        this.liabCode = liabCode;
    }

    public String getLiabCode() {
        return liabCode;
    }

    public void setIncremWay(String incremWay) {
        this.incremWay = incremWay;
    }

    public String getIncremWay() {
        return incremWay;
    }

    public void setIncremFreq(String incremFreq) {
        this.incremFreq = incremFreq;
    }

    public String getIncremFreq() {
        return incremFreq;
    }

    public void setIncremPropor(BigDecimal incremPropor) {
        this.incremPropor = incremPropor;
    }

    public BigDecimal getIncremPropor() {
        return incremPropor;
    }
}
