package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.util.Date;


/**
 */
@Entity(name = "T_PS_ITEM_DEF")
@ModelFile(value = "tPsItemDef.entity")
public class TPsItemDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PS_ITEM_ID")
    private Long psItemId;

    /**
     * 保全项目编码
     */
    @Column(name = "PS_ITEM_CODE")
    private String psItemCode;

    /**
     * 保全项目名称
     */
    @Column(name = "PS_ITEM_NAME")
    private String psItemName;

    /**
     * G-团险 I-个险 B-通用
     */
    @Column(name = "PS_TYPE")
    private String psType;

    /**
     * Y 是 N 否
     */
    @Column(name = "IS_CALC_ITEM")
    private String isCalcItem;

    /**
     * 保全层级
     */
    @Column(name = "PS_HIERAR")
    private String psHierar;

    /**
     * 跳转控制
     */
    @Column(name = "TRANSIN_CTRL")
    private String transinCtrl;

    /**
     * 权限控制
     */
    @Column(name = "AUTHORITY_CTRL")
    private String authorityCtrl;

    /**
     * 插入操作员
     */
    @Column(name = "INSERT_OPER")
    private String insertOper;

    /**
     * 插入时间
     */
    @Column(name = "INSERT_TIME")
    private Date insertTime;

    /**
     * 更新操作员
     */
    @Column(name = "UPDATE_OPER")
    private String updateOper;

    /**
     * 更新时间
     */
    @Column(name = "UPDATE_TIME")
    private Date updateTime;

    /**
     * 插入委托人
     */
    @Column(name = "INSERT_CONSIGNOR")
    private String insertConsignor;

    /**
     * 更新委托人
     */
    @Column(name = "UPDATE_CONSIGNOR")
    private String updateConsignor;

    public void setPsItemId(Long psItemId) {
        this.psItemId = psItemId;
    }

    public Long getPsItemId() {
        return psItemId;
    }

    public void setPsItemCode(String psItemCode) {
        this.psItemCode = psItemCode;
    }

    public String getPsItemCode() {
        return psItemCode;
    }

    public void setPsItemName(String psItemName) {
        this.psItemName = psItemName;
    }

    public String getPsItemName() {
        return psItemName;
    }

    public void setPsType(String psType) {
        this.psType = psType;
    }

    public String getPsType() {
        return psType;
    }

    public void setIsCalcItem(String isCalcItem) {
        this.isCalcItem = isCalcItem;
    }

    public String getIsCalcItem() {
        return isCalcItem;
    }

    public void setPsHierar(String psHierar) {
        this.psHierar = psHierar;
    }

    public String getPsHierar() {
        return psHierar;
    }

    public void setTransinCtrl(String transinCtrl) {
        this.transinCtrl = transinCtrl;
    }

    public String getTransinCtrl() {
        return transinCtrl;
    }

    public void setAuthorityCtrl(String authorityCtrl) {
        this.authorityCtrl = authorityCtrl;
    }

    public String getAuthorityCtrl() {
        return authorityCtrl;
    }

    public void setInsertOper(String insertOper) {
        this.insertOper = insertOper;
    }

    public String getInsertOper() {
        return insertOper;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setUpdateOper(String updateOper) {
        this.updateOper = updateOper;
    }

    public String getUpdateOper() {
        return updateOper;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setInsertConsignor(String insertConsignor) {
        this.insertConsignor = insertConsignor;
    }

    public String getInsertConsignor() {
        return insertConsignor;
    }

    public void setUpdateConsignor(String updateConsignor) {
        this.updateConsignor = updateConsignor;
    }

    public String getUpdateConsignor() {
        return updateConsignor;
    }
}
