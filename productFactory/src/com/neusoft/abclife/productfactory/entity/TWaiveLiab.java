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
@Entity(name = "T_WAIVE_LIAB")
@ModelFile(value = "tWaiveLiab.entity")
public class TWaiveLiab extends DomainObject implements Serializable {
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
     * 豁免对象
     */
    @Column(name = "WAIVE_OBJ")
    private String waiveObj;

    /**
     * 豁免类型 1-豁免主险合同 2-豁免保单合同 3-豁免长期主附险合同
     */
    @Column(name = "WAIVE_TYPE")
    private String waiveType;

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

    public void setWaiveObj(String waiveObj) {
        this.waiveObj = waiveObj;
    }

    public String getWaiveObj() {
        return waiveObj;
    }

    public void setWaiveType(String waiveType) {
        this.waiveType = waiveType;
    }

    public String getWaiveType() {
        return waiveType;
    }
}
