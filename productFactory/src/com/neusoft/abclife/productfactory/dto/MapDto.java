package com.neusoft.abclife.productfactory.dto;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
  *
  * @author Administrator
  * @creationTime 2016-06-29 10:34:58
  * @modificationTime
  * @version 1.0.0
  * @generated
  */
public class MapDto implements Serializable {
    /**
     * @generated
     */
    private static final long serialVersionUID = 1L;

    /**
    *
    * @generated
    */
    private String fee;

    /**
    *
    * @generated
    */
    private String addprem;

    /**
    *
    * @generated
    */
    private String opt;

    /**
     * @generated
     */
    public void setFee(String fee) {
        this.fee = fee;
    }

    /**
     * @generated
     */
    public String getFee() {
        return this.fee;
    }

    /**
     * @generated
     */
    public void setAddprem(String addprem) {
        this.addprem = addprem;
    }

    /**
     * @generated
     */
    public String getAddprem() {
        return this.addprem;
    }

    /**
     * @generated
     */
    public void setOpt(String opt) {
        this.opt = opt;
    }

    /**
     * @generated
     */
    public String getOpt() {
        return this.opt;
    }
}
