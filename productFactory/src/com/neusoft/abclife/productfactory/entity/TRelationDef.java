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
@Entity(name = "T_RELATION_DEF")
@ModelFile(value = "tRelationDef.entity")
public class TRelationDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 相关性名称
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 相关性属性
     */
    @Column(name = "PROPERTY")
    private String property;

    /**
     * 单位
     */
    @Column(name = "RELATION_UINT")
    private String relationUint;

    /**
     * 相关性类型(2引用BOM的属性,3引用属性)
     */
    @Column(name = "RELATION_TYPE")
    private String relationType;

    /**
     * 相关性类型string,number,date
     */
    @Column(name = "RETURN_TYPE")
    private String returnType;

    /**
     * 引用值
     */
    @Column(name = "REF_VALUE")
    private String refValue;

    /**
     * 业务分类
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

    public void setProperty(String property) {
        this.property = property;
    }

    public String getProperty() {
        return property;
    }

    public void setRelationUint(String relationUint) {
        this.relationUint = relationUint;
    }

    public String getRelationUint() {
        return relationUint;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setReturnType(String returnType) {
        this.returnType = returnType;
    }

    public String getReturnType() {
        return returnType;
    }

    public void setRefValue(String refValue) {
        this.refValue = refValue;
    }

    public String getRefValue() {
        return refValue;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }
}
