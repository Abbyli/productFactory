package com.neusoft.abclife.productfactory.dto;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
  *
  * @author Administrator
  * @creationTime 2016-12-16 09:47:57
  * @modificationTime
  * @version 1.0.0
  * @generated
  */
public class ProMatchDto implements Serializable {
    /**
     * @generated
     */
    private static final long serialVersionUID = 1L;

    /**
    *
    * @generated
    */
    private String proCode;

    /**
    *
    * @generated
    */
    private String proName;

    /**
    *
    * @generated
    */
    private String proType;

    /**
     * @generated
     */
    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    /**
     * @generated
     */
    public String getProCode() {
        return this.proCode;
    }

    /**
     * @generated
     */
    public void setProName(String proName) {
        this.proName = proName;
    }

    /**
     * @generated
     */
    public String getProName() {
        return this.proName;
    }

    /**
     * @generated
     */
    public void setProType(String proType) {
        this.proType = proType;
    }

    /**
     * @generated
     */
    public String getProType() {
        return this.proType;
    }
}
