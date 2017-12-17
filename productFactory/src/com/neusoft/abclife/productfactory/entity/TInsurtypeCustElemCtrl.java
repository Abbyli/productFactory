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
@Entity(name = "T_INSURTYPE_CUST_ELEM_CTRL")
@ModelFile(value = "tInsurtypeCustElemCtrl.entity")
public class TInsurtypeCustElemCtrl extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ELEM_CTRL_ID")
    private Long elemCtrlId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 01-被保人
     */
    @Column(name = "PSNNL_TYPE")
    private String psnnlType;

    /**
     * '0-男； 1-女； 2-不限'
     */
    @Column(name = "GENDER")
    private String gender;

    /**
     * 投保最小年龄
     */
    @Column(name = "APPLY_MIN_AGE")
    private Integer applyMinAge;

    /**
     * 'Y-年 M-月 D-日 A-岁'
     */
    @Column(name = "APPLY_MIN_AGE_UNIT")
    private String applyMinAgeUnit;

    /**
     * 投保最大年龄
     */
    @Column(name = "APPLY_MAX_AGE")
    private Integer applyMaxAge;

    /**
     * 'Y-年 M-月 D-日 A-岁'
     */
    @Column(name = "APPLY_MAX_AGE_UNIT")
    private String applyMaxAgeUnit;

    /**
     * 续保最大年龄
     */
    @Column(name = "INSUR_RENEW_MAX_AGE")
    private Integer insurRenewMaxAge;

    /**
     * 续保最大年龄单位
     */
    @Column(name = "INSUR_RENEW_MAX_AGE_UNIT")
    private String insurRenewMaxAgeUnit;

    public void setElemCtrlId(Long elemCtrlId) {
        this.elemCtrlId = elemCtrlId;
    }

    public Long getElemCtrlId() {
        return elemCtrlId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setPsnnlType(String psnnlType) {
        this.psnnlType = psnnlType;
    }

    public String getPsnnlType() {
        return psnnlType;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setApplyMinAge(Integer applyMinAge) {
        this.applyMinAge = applyMinAge;
    }

    public Integer getApplyMinAge() {
        return applyMinAge;
    }

    public void setApplyMinAgeUnit(String applyMinAgeUnit) {
        this.applyMinAgeUnit = applyMinAgeUnit;
    }

    public String getApplyMinAgeUnit() {
        return applyMinAgeUnit;
    }

    public void setApplyMaxAge(Integer applyMaxAge) {
        this.applyMaxAge = applyMaxAge;
    }

    public Integer getApplyMaxAge() {
        return applyMaxAge;
    }

    public void setApplyMaxAgeUnit(String applyMaxAgeUnit) {
        this.applyMaxAgeUnit = applyMaxAgeUnit;
    }

    public String getApplyMaxAgeUnit() {
        return applyMaxAgeUnit;
    }

    public void setInsurRenewMaxAge(Integer insurRenewMaxAge) {
        this.insurRenewMaxAge = insurRenewMaxAge;
    }

    public Integer getInsurRenewMaxAge() {
        return insurRenewMaxAge;
    }

    public void setInsurRenewMaxAgeUnit(String insurRenewMaxAgeUnit) {
        this.insurRenewMaxAgeUnit = insurRenewMaxAgeUnit;
    }

    public String getInsurRenewMaxAgeUnit() {
        return insurRenewMaxAgeUnit;
    }
}
