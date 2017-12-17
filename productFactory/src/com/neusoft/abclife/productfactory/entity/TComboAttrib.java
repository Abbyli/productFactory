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
@Entity(name = "T_COMBO_ATTRIB")
@ModelFile(value = "tComboAttrib.entity")
public class TComboAttrib extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "COMBO_ATTRIB_ID")
    private Long comboAttribId;

    /**
     * 组合主键
     */
    @Column(name = "COMBO_ID")
    private Long comboId;

    /**
     * 组合销售方式 P-按保费方式销售 G-按保额方式销售 I-按保额保费方式销售
     */
    @Column(name = "COMBO_SALES_WAY")
    private String comboSalesWay;

    /**
     * 是否按份数销售 1-是 0-否
     */
    @Column(name = "IS_BY_COPIES_SALES")
    private String isByCopiesSales;

    /**
     * 红利进万能账户标识
     */
    @Column(name = "BONUS_TO_ACC_FLAG")
    private String bonusToAccFlag;

    /**
     * 是否允许自垫
     */
    @Column(name = "IS_PERMIT_AUTO_PAY")
    private String isPermitAutoPay;

    /**
     * 是否允许续保
     */
    @Column(name = "IS_PERMIT_INSUR_RENEW")
    private String isPermitInsurRenew;

    /**
     * 生存金进万能账户
     */
    @Column(name = "LIVE_TO_ACC_FLAG")
    private String liveToAccFlag;

    /**
     * 是否有独立费率
     */
    @Column(name = "IS_HAVE_INDEPEND_RATE")
    private String isHaveIndependRate;

    /**
     * 保费算法ID
     */
    @Column(name = "PREM_ALGO_ID")
    private Long premAlgoId;

    /**
     * 保额算法ID
     */
    @Column(name = "SUMINSUR_ALGO_ID")
    private Long suminsurAlgoId;

    public void setComboAttribId(Long comboAttribId) {
        this.comboAttribId = comboAttribId;
    }

    public Long getComboAttribId() {
        return comboAttribId;
    }

    public void setComboId(Long comboId) {
        this.comboId = comboId;
    }

    public Long getComboId() {
        return comboId;
    }

    public void setComboSalesWay(String comboSalesWay) {
        this.comboSalesWay = comboSalesWay;
    }

    public String getComboSalesWay() {
        return comboSalesWay;
    }

    public void setIsByCopiesSales(String isByCopiesSales) {
        this.isByCopiesSales = isByCopiesSales;
    }

    public String getIsByCopiesSales() {
        return isByCopiesSales;
    }

    public void setBonusToAccFlag(String bonusToAccFlag) {
        this.bonusToAccFlag = bonusToAccFlag;
    }

    public String getBonusToAccFlag() {
        return bonusToAccFlag;
    }

    public void setIsPermitAutoPay(String isPermitAutoPay) {
        this.isPermitAutoPay = isPermitAutoPay;
    }

    public String getIsPermitAutoPay() {
        return isPermitAutoPay;
    }

    public void setIsPermitInsurRenew(String isPermitInsurRenew) {
        this.isPermitInsurRenew = isPermitInsurRenew;
    }

    public String getIsPermitInsurRenew() {
        return isPermitInsurRenew;
    }

    public void setLiveToAccFlag(String liveToAccFlag) {
        this.liveToAccFlag = liveToAccFlag;
    }

    public String getLiveToAccFlag() {
        return liveToAccFlag;
    }

    public void setIsHaveIndependRate(String isHaveIndependRate) {
        this.isHaveIndependRate = isHaveIndependRate;
    }

    public String getIsHaveIndependRate() {
        return isHaveIndependRate;
    }

    public void setPremAlgoId(Long premAlgoId) {
        this.premAlgoId = premAlgoId;
    }

    public Long getPremAlgoId() {
        return premAlgoId;
    }

    public void setSuminsurAlgoId(Long suminsurAlgoId) {
        this.suminsurAlgoId = suminsurAlgoId;
    }

    public Long getSuminsurAlgoId() {
        return suminsurAlgoId;
    }
}
