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
@Entity(name = "T_OBJ_RATE")
@ModelFile(value = "tObjRate.entity")
public class TObjRate extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * INSURTYPE_CODE
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * VER_NO
     */
    @Column(name = "VER_NO")
    private Long verNo;

    /**
     * PRICING_LIAB_CODE
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 表名称
     */
    @Column(name = "TABLE_NAME")
    private String tableName;

    /**
     * 费率表类型(rt费率表,v现价表,exp风险加费,hl健康加费,job职业加费)
     */
    @Column(name = "RATE_TYPE")
    private String rateType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setVerNo(Long verNo) {
        this.verNo = verNo;
    }

    public Long getVerNo() {
        return verNo;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public String getRateType() {
        return rateType;
    }
}
