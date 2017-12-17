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
@Entity(name = "T_COMBO_INF")
@ModelFile(value = "tComboInf.entity")
public class TComboInf extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "COMBO_ID")
    private Long comboId;

    /**
     * 组合编码
     */
    @Column(name = "COMBO_CODE")
    private String comboCode;

    /**
     * 组合版本
     */
    @Column(name = "COMBO_VER")
    private Long comboVer;

    /**
     * 组合状态
     */
    @Column(name = "COMBO_STATU")
    private String comboStatu;

    /**
     * 组合名称
     */
    @Column(name = "COMBO_NAME")
    private String comboName;

    /**
     * 组合简称
     */
    @Column(name = "COMBO_ABBR")
    private String comboAbbr;

    /**
     * 备注
     */
    @Column(name = "REMARK")
    private String remark;

    public void setComboId(Long comboId) {
        this.comboId = comboId;
    }

    public Long getComboId() {
        return comboId;
    }

    public void setComboCode(String comboCode) {
        this.comboCode = comboCode;
    }

    public String getComboCode() {
        return comboCode;
    }

    public void setComboVer(Long comboVer) {
        this.comboVer = comboVer;
    }

    public Long getComboVer() {
        return comboVer;
    }

    public void setComboStatu(String comboStatu) {
        this.comboStatu = comboStatu;
    }

    public String getComboStatu() {
        return comboStatu;
    }

    public void setComboName(String comboName) {
        this.comboName = comboName;
    }

    public String getComboName() {
        return comboName;
    }

    public void setComboAbbr(String comboAbbr) {
        this.comboAbbr = comboAbbr;
    }

    public String getComboAbbr() {
        return comboAbbr;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getRemark() {
        return remark;
    }
}
