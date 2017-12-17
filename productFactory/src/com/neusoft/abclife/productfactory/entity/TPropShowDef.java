package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.math.BigDecimal;


/**
 */
@Entity(name = "T_PROP_SHOW_DEF")
@ModelFile(value = "tPropShowDef.entity")
public class TPropShowDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 关联属性ID
     */
    @Column(name = "OBJ_ID")
    private Long objId;

    /**
     * 编辑器类型
     */
    @Column(name = "EDITOR_TYPE")
    private String editorType;

    /**
     * 展现顺序
     */
    @Column(name = "ORDER_NUM")
    private BigDecimal orderNum;

    /**
     * 默认值
     */
    @Column(name = "DEFAULT_VAL")
    private String defaultVal;

    /**
     * 0:非必填 1:必填
     */
    @Column(name = "REQUIRED")
    private BigDecimal required;

    /**
     * 要素定义ID
     */
    @Column(name = "SKELEMENT_ID")
    private Long skelementId;

    /**
     * 最小长度
     */
    @Column(name = "MIN_LENGTH")
    private BigDecimal minLength;

    /**
     * 最大长度
     */
    @Column(name = "MAX_LENGTH")
    private BigDecimal maxLength;

    /**
     * 描述
     */
    @Column(name = "DESCRIPTION")
    private String description;

    /**
     * 数据字典
     */
    @Column(name = "DICTIONARY")
    private String dictionary;

    /**
     * 0:非只读 1:只读
     */
    @Column(name = "READONLY")
    private BigDecimal readonly;

    /**
     * 最小值
     */
    @Column(name = "MIN_VAL")
    private BigDecimal minVal;

    /**
     * 最大值
     */
    @Column(name = "MAX_VAL")
    private BigDecimal maxVal;

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

    public void setEditorType(String editorType) {
        this.editorType = editorType;
    }

    public String getEditorType() {
        return editorType;
    }

    public void setOrderNum(BigDecimal orderNum) {
        this.orderNum = orderNum;
    }

    public BigDecimal getOrderNum() {
        return orderNum;
    }

    public void setDefaultVal(String defaultVal) {
        this.defaultVal = defaultVal;
    }

    public String getDefaultVal() {
        return defaultVal;
    }

    public void setRequired(BigDecimal required) {
        this.required = required;
    }

    public BigDecimal getRequired() {
        return required;
    }

    public void setSkelementId(Long skelementId) {
        this.skelementId = skelementId;
    }

    public Long getSkelementId() {
        return skelementId;
    }

    public void setMinLength(BigDecimal minLength) {
        this.minLength = minLength;
    }

    public BigDecimal getMinLength() {
        return minLength;
    }

    public void setMaxLength(BigDecimal maxLength) {
        this.maxLength = maxLength;
    }

    public BigDecimal getMaxLength() {
        return maxLength;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDictionary(String dictionary) {
        this.dictionary = dictionary;
    }

    public String getDictionary() {
        return dictionary;
    }

    public void setReadonly(BigDecimal readonly) {
        this.readonly = readonly;
    }

    public BigDecimal getReadonly() {
        return readonly;
    }

    public void setMinVal(BigDecimal minVal) {
        this.minVal = minVal;
    }

    public BigDecimal getMinVal() {
        return minVal;
    }

    public void setMaxVal(BigDecimal maxVal) {
        this.maxVal = maxVal;
    }

    public BigDecimal getMaxVal() {
        return maxVal;
    }
}
