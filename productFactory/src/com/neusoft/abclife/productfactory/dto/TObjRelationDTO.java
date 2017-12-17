package com.neusoft.abclife.productfactory.dto;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
  *
  * @author Administrator
  * @creationTime 2016-09-02 13:42:32
  * @modificationTime
  * @version 1.0.0
  * @generated
  */
public class TObjRelationDTO implements Serializable {
    /**
     * @generated
     */
    private static final long serialVersionUID = 1L;

    /**
    *
    * @generated
    */
    private Long id;

    /**
    *
    * @generated
    */
    private Long objId;

    /**
    *
    * @generated
    */
    private Long relaDefId;

    /**
    *
    * @generated
    */
    private String relaDefType;

    /**
    *
    * @generated
    */
    private String relaDefOpt;

    /**
    *
    * @generated
    */
    private String relaDefValue;

    /**
    *
    * @generated
    */
    private String objSeq;

    /**
    *
    * @generated
    */
    private String type;

    /**
    *
    * @generated
    */
    private Long relaDefValue_rela;

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
    public void setObjId(Long objId) {
        this.objId = objId;
    }

    /**
     * @generated
     */
    public Long getObjId() {
        return this.objId;
    }

    /**
     * @generated
     */
    public void setRelaDefId(Long relaDefId) {
        this.relaDefId = relaDefId;
    }

    /**
     * @generated
     */
    public Long getRelaDefId() {
        return this.relaDefId;
    }

    /**
     * @generated
     */
    public void setRelaDefType(String relaDefType) {
        this.relaDefType = relaDefType;
    }

    /**
     * @generated
     */
    public String getRelaDefType() {
        return this.relaDefType;
    }

    /**
     * @generated
     */
    public void setRelaDefOpt(String relaDefOpt) {
        this.relaDefOpt = relaDefOpt;
    }

    /**
     * @generated
     */
    public String getRelaDefOpt() {
        return this.relaDefOpt;
    }

    /**
     * @generated
     */
    public void setRelaDefValue(String relaDefValue) {
        this.relaDefValue = relaDefValue;
    }

    /**
     * @generated
     */
    public String getRelaDefValue() {
        return this.relaDefValue;
    }

    /**
     * @generated
     */
    public void setObjSeq(String objSeq) {
        this.objSeq = objSeq;
    }

    /**
     * @generated
     */
    public String getObjSeq() {
        return this.objSeq;
    }

    /**
     * @generated
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @generated
     */
    public String getType() {
        return this.type;
    }

    /**
     * @generated
     */
    public void setRelaDefValue_rela(Long relaDefValue_rela) {
        this.relaDefValue_rela = relaDefValue_rela;
    }

    /**
     * @generated
     */
    public Long getRelaDefValue_rela() {
        return this.relaDefValue_rela;
    }
}
