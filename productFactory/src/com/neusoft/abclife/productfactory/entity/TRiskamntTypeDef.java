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
@Entity(name = "T_RISKAMNT_TYPE_DEF")
@ModelFile(value = "tRiskamntTypeDef.entity")
public class TRiskamntTypeDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 风险保额名称
     */
    @Column(name = "RISKAMNT_NAME")
    private String riskamntName;

    /**
     * 风险保额类型
     */
    @Column(name = "RISKAMNT_TYPE")
    private String riskamntType;

    /**
     * 场景业务分类
     */
    @Column(name = "BUSI_TYPE")
    private String busiType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setRiskamntName(String riskamntName) {
        this.riskamntName = riskamntName;
    }

    public String getRiskamntName() {
        return riskamntName;
    }

    public void setRiskamntType(String riskamntType) {
        this.riskamntType = riskamntType;
    }

    public String getRiskamntType() {
        return riskamntType;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }
}
