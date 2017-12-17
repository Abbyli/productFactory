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
@Entity(name = "T_OBJ_RELATION")
@ModelFile(value = "tObjRelation.entity")
public class TObjRelation extends DomainObject implements Serializable {
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
     * 相关性主键
     */
    @Column(name = "RELA_DEF_ID")
    private Long relaDefId;

    /**
     * 1默认值2取bom
     */
    @Column(name = "RELA_DEF_TYPE")
    private String relaDefType;

    /**
     * 操作符
     */
    @Column(name = "RELA_DEF_OPT")
    private String relaDefOpt;

    /**
     * 相关性值
     */
    @Column(name = "RELA_DEF_VALUE")
    private String relaDefValue;

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

    public void setRelaDefId(Long relaDefId) {
        this.relaDefId = relaDefId;
    }

    public Long getRelaDefId() {
        return relaDefId;
    }

    public void setRelaDefType(String relaDefType) {
        this.relaDefType = relaDefType;
    }

    public String getRelaDefType() {
        return relaDefType;
    }

    public void setRelaDefOpt(String relaDefOpt) {
        this.relaDefOpt = relaDefOpt;
    }

    public String getRelaDefOpt() {
        return relaDefOpt;
    }

    public void setRelaDefValue(String relaDefValue) {
        this.relaDefValue = relaDefValue;
    }

    public String getRelaDefValue() {
        return relaDefValue;
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
