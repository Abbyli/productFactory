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
@Entity(name = "T_PRO_INTERFACE_REF")
@ModelFile(value = "tProInterfaceRef.entity")
public class TProInterfaceRef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRO_ID")
    private Long proId;

    /**
     * 产品代码
     */
    @Column(name = "PRO_CODE")
    private String proCode;

    /**
     * 产品名称
     */
    @Column(name = "PRO_NAME")
    private String proName;

    /**
     * 产品类型
     */
    @Column(name = "PRO_TYPE")
    private String proType;

    /**
     * 产品状态
     */
    @Column(name = "PRO_STATUS")
    private String proStatus;

    public void setProId(Long proId) {
        this.proId = proId;
    }

    public Long getProId() {
        return proId;
    }

    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    public String getProCode() {
        return proCode;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getProName() {
        return proName;
    }

    public void setProType(String proType) {
        this.proType = proType;
    }

    public String getProType() {
        return proType;
    }

    public void setProStatus(String proStatus) {
        this.proStatus = proStatus;
    }

    public String getProStatus() {
        return proStatus;
    }
}
