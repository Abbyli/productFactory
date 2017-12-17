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
@Entity(name = "T_OBJ_PARAM")
@ModelFile(value = "tObjParam.entity")
public class TObjParam extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * obj主键
     */
    @Column(name = "OBJ_ID")
    private Long objId;

    /**
     * 参数主键
     */
    @Column(name = "PARAM_ID")
    private Long paramId;

    /**
     * 参数值
     */
    @Column(name = "PARAM_VALUE")
    private String paramValue;

    /**
     * 同一对象标识
     */
    @Column(name = "OBJ_SEQ")
    private String objSeq;

    /**
     * D1#0生存给付，D1#1理赔给付
     */
    @Column(name = "TYPE")
    private String type;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setObjId(Long objId) {
        this.objId = objId;
    }

    public Long getObjId() {
        return objId;
    }

    public void setParamId(Long paramId) {
        this.paramId = paramId;
    }

    public Long getParamId() {
        return paramId;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue;
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setObjSeq(String objSeq) {
        this.objSeq = objSeq;
    }

    public String getObjSeq() {
        return objSeq;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
