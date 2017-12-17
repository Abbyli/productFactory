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
@Entity(name = "T_OBJ_ENTRANCE_COMBINE")
@ModelFile(value = "tObjEntranceCombine.entity")
public class TObjEntranceCombine extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 组合代码
     */
    @Column(name = "COMBINE_CODE")
    private String combineCode;

    /**
     * 组合版本
     */
    @Column(name = "COMBINE_VER")
    private Long combineVer;

    /**
     * 组合要素主键/组合险种要素主键
     */
    @Column(name = "COMBINE_ELEM_ID")
    private Long combineElemId;

    /**
     * 业务分类(不传)
     */
    @Column(name = "BUSI_TYPE")
    private String busiType;

    /**
     * 对象分类
     */
    @Column(name = "ALGO_TYPE")
    private String algoType;

    /**
     * 子分类1
     */
    @Column(name = "SUB_TYPE1")
    private String subType1;

    /**
     * 子分类2
     */
    @Column(name = "SUB_TYPE2")
    private String subType2;

    /**
     * 同一对象标识
     */
    @Column(name = "OBJ_SEQ")
    private String objSeq;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setCombineCode(String combineCode) {
        this.combineCode = combineCode;
    }

    public String getCombineCode() {
        return combineCode;
    }

    public void setCombineVer(Long combineVer) {
        this.combineVer = combineVer;
    }

    public Long getCombineVer() {
        return combineVer;
    }

    public void setCombineElemId(Long combineElemId) {
        this.combineElemId = combineElemId;
    }

    public Long getCombineElemId() {
        return combineElemId;
    }

    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    public String getBusiType() {
        return busiType;
    }

    public void setAlgoType(String algoType) {
        this.algoType = algoType;
    }

    public String getAlgoType() {
        return algoType;
    }

    public void setSubType1(String subType1) {
        this.subType1 = subType1;
    }

    public String getSubType1() {
        return subType1;
    }

    public void setSubType2(String subType2) {
        this.subType2 = subType2;
    }

    public String getSubType2() {
        return subType2;
    }

    public void setObjSeq(String objSeq) {
        this.objSeq = objSeq;
    }

    public String getObjSeq() {
        return objSeq;
    }
}
