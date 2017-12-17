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
@Entity(name = "T_OBJ_SKELEMENT")
@ModelFile(value = "tObjSkelement.entity")
public class TObjSkelement extends DomainObject implements Serializable {
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
     * 1 定价责任, 2保障责任给付项
     */
    @Column(name = "TYPE")
    private String type;

    /**
     * 是否与计算相关
     */
    @Column(name = "IS_CAL_REF")
    private String isCalRef;

    /**
     * 责任ID
     */
    @Column(name = "DUTY_ID")
    private Long dutyId;

    /**
     * 关键字
     */
    @Column(name = "KEY_WORD")
    private String keyWord;

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

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setIsCalRef(String isCalRef) {
        this.isCalRef = isCalRef;
    }

    public String getIsCalRef() {
        return isCalRef;
    }

    public void setDutyId(Long dutyId) {
        this.dutyId = dutyId;
    }

    public Long getDutyId() {
        return dutyId;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public String getKeyWord() {
        return keyWord;
    }
}
