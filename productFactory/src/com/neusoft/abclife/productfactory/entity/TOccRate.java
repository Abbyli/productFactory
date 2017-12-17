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
@Entity(name = "T_OCC_RATE")
@ModelFile(value = "tOccRate.entity")
public class TOccRate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 交费频率
     */
    @Column(name = "PAYINTV")
    private BigDecimal payintv;

    /**
     * 职业类型
     */
    @Column(name = "OCCUPATIONTYPE")
    private BigDecimal occupationtype;

    /**
     * SUPPRISKSCORE
     */
    @Column(name = "SUPPRISKSCORE")
    private BigDecimal suppriskscore;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setPayintv(BigDecimal payintv) {
        this.payintv = payintv;
    }

    public BigDecimal getPayintv() {
        return payintv;
    }

    public void setOccupationtype(BigDecimal occupationtype) {
        this.occupationtype = occupationtype;
    }

    public BigDecimal getOccupationtype() {
        return occupationtype;
    }

    public void setSuppriskscore(BigDecimal suppriskscore) {
        this.suppriskscore = suppriskscore;
    }

    public BigDecimal getSuppriskscore() {
        return suppriskscore;
    }
}
