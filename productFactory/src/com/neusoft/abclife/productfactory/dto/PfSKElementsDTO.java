package com.neusoft.abclife.productfactory.dto;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.annotation.Property;

import java.io.Serializable;


/**
  * 要素定义展示
  * @author Neusoft
  * @creationTime 2017-02-09 17:04:02
  * @modificationTime
  * @version 1.0.0
  * @generated
  */
public class PfSKElementsDTO implements Serializable {
    /**
     * @generated
     */
    private static final long serialVersionUID = 1L;

    /**
     *
     * @generated
     */
    @Property(name = "busiType", clazz = "com.neusoft.abclife.productfactory.entity.TSkelementDef")
    private String busiType;

    /**
     *
     * @generated
     */
    @Property(name = "isCalRef", clazz = "com.neusoft.abclife.productfactory.entity.TSkelementDef")
    private String isCalRef;

    /**
     *
     * @generated
     */
    @Property(name = "id", clazz = "com.neusoft.abclife.productfactory.entity.TSkelementDef")
    private Long id;

    /**
     *
     * @generated
     */
    @Property(name = "name", clazz = "com.neusoft.abclife.productfactory.entity.TSkelementDef")
    private String name;

    /**
     *
     * @generated
     */
    @Property(name = "editorType", clazz = "com.neusoft.abclife.productfactory.entity.TPropShowDef")
    private String editorType;

    /**
     *
     * @generated
     */
    @Property(name = "property", clazz = "com.neusoft.abclife.productfactory.entity.TSkelementDef")
    private String property;

    /**
     * @generated
     */
    public void setBusiType(String busiType) {
        this.busiType = busiType;
    }

    /**
     * @generated
     */
    public String getBusiType() {
        return this.busiType;
    }

    /**
     * @generated
     */
    public void setIsCalRef(String isCalRef) {
        this.isCalRef = isCalRef;
    }

    /**
     * @generated
     */
    public String getIsCalRef() {
        return this.isCalRef;
    }

    /**
     * @generated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @generated
     */
    public Long getId() {
        return this.id;
    }

    /**
     * @generated
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @generated
     */
    public String getName() {
        return this.name;
    }

    /**
     * @generated
     */
    public void setEditorType(String editorType) {
        this.editorType = editorType;
    }

    /**
     * @generated
     */
    public String getEditorType() {
        return this.editorType;
    }

    /**
     * @generated
     */
    public void setProperty(String property) {
        this.property = property;
    }

    /**
     * @generated
     */
    public String getProperty() {
        return this.property;
    }
}
