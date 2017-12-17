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
@Entity(name = "T_OBJ_FORMULA")
@ModelFile(value = "tObjFormula.entity")
public class TObjFormula extends DomainObject implements Serializable {
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
     * 公式主键
     */
    @Column(name = "FORMULA_ID")
    private Long formulaId;

    /**
     * 公式描述
     */
    @Column(name = "DESCRIPTION")
    private String description;

    /**
     * 是否存在相关性
     */
    @Column(name = "HAS_RELATION")
    private String hasRelation;

    /**
     * 冗余公式对应的相关性描述
     */
    @Column(name = "RELATION_CONTENT")
    private String relationContent;

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

    public void setFormulaId(Long formulaId) {
        this.formulaId = formulaId;
    }

    public Long getFormulaId() {
        return formulaId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setHasRelation(String hasRelation) {
        this.hasRelation = hasRelation;
    }

    public String getHasRelation() {
        return hasRelation;
    }

    public void setRelationContent(String relationContent) {
        this.relationContent = relationContent;
    }

    public String getRelationContent() {
        return relationContent;
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
