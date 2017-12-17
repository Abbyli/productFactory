package com.neusoft.abclife.productfactory.dto;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
  *
  * @author Administrator
  * @creationTime 2016-12-26 10:04:27
  * @modificationTime
  * @version 1.0.0
  * @generated
  */
public class ProApproveDTO implements Serializable {
    /**
     * @generated
     */
    private static final long serialVersionUID = 1L;

    /**
    *
    * @generated
    */
    private Long proId;

    /**
    *
    * @generated
    */
    private String proCode;

    /**
    *
    * @generated
    */
    private Long proVer;

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
    public void setProId(Long proId) {
        this.proId = proId;
    }

    /**
     * @generated
     */
    public Long getProId() {
        return this.proId;
    }

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
    public void setProVer(Long proVer) {
        this.proVer = proVer;
    }

    /**
     * @generated
     */
    public Long getProVer() {
        return this.proVer;
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
