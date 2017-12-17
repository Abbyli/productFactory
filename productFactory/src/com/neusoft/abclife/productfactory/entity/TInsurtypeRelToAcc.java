package com.neusoft.abclife.productfactory.entity;

import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.annotation.Sequence;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;


/**
 */
@Entity(name = "T_INSURTYPE_REL_TO_ACC")
@ModelFile(value = "tInsurtypeRelToAcc.entity")
public class TInsurtypeRelToAcc extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_ACC_ASSOC_ID")
    private Long insurtypeAccAssocId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 险种账号ID
     */
    @Column(name = "INSURTYPE_ACCNO_ID")
    private Long insurtypeAccnoId;
    @Column(name = "INSURTYPE_ID")
    private TInsurtypeBasicInf insurtypeObj;
    @Column(name = "INSURTYPE_ACCNO_ID")
    private TInsurtypeAccDef insurtypeAccnoObj;

    public void setInsurtypeAccAssocId(Long insurtypeAccAssocId) {
        this.insurtypeAccAssocId = insurtypeAccAssocId;
    }

    public Long getInsurtypeAccAssocId() {
        return insurtypeAccAssocId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setInsurtypeAccnoId(Long insurtypeAccnoId) {
        this.insurtypeAccnoId = insurtypeAccnoId;
    }

    public Long getInsurtypeAccnoId() {
        return insurtypeAccnoId;
    }

    public void setInsurtypeObj(TInsurtypeBasicInf insurtypeObj) {
        this.insurtypeObj = insurtypeObj;
    }

    public TInsurtypeBasicInf getInsurtypeObj() {
        return insurtypeObj;
    }

    public void setInsurtypeAccnoObj(TInsurtypeAccDef insurtypeAccnoObj) {
        this.insurtypeAccnoObj = insurtypeAccnoObj;
    }

    public TInsurtypeAccDef getInsurtypeAccnoObj() {
        return insurtypeAccnoObj;
    }
}
