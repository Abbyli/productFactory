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
@Entity(name = "T_SKELEMENT_DEF")
@ModelFile(value = "tSkelementDef.entity")
public class TSkelementDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 要素名称
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 是否与相关计算
     */
    @Column(name = "IS_CAL_REF")
    private String isCalRef;

    /**
     * 要素属性
     */
    @Column(name = "PROPERTY")
    private String property;

    /**
     * 业务场景
     */
    @Column(name = "BUSI_TYPE")
    private String busiType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setIsCalRef(String isCalRef) {
        this.isCalRef = isCalRef;
    }

    public String getIsCalRef() {
        return isCalRef;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getProperty() {
        return property;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }
}
