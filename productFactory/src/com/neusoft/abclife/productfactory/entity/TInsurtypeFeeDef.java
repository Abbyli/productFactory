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
@Entity(name = "T_INSURTYPE_FEE_DEF")
@ModelFile(value = "tInsurtypeFeeDef.entity")
public class TInsurtypeFeeDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_FEE_ID")
    private Long insurtypeFeeId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 险种费用定价责任代码为：000000
     */
    @Column(name = "PRICING_LIAB_ID")
    private Long pricingLiabId;

    /**
     * 费用代码
     */
    @Column(name = "FEE_CODE")
    private String feeCode;

    /**
     * 01-保单管理费 02-风险保费 03-风险加费 04-初始费用 05-持续奖励 06-账户管理费
     */
    @Column(name = "FEE_TYPE")
    private String feeType;

    /**
     * 险种 保单
     */
    @Column(name = "FEE_SRC")
    private String feeSrc;

    /**
     * 费用计算公式ID
     */
    @Column(name = "FEE_CALC_FORMULA_ID")
    private Long feeCalcFormulaId;

    /**
     * Y-年 M-月 D-日  费用周期由产品定义负责定义，不需要由业务部门选择
     */
    @Column(name = "FEE_OCCUR_CYC")
    private String feeOccurCyc;

    /**
     * 签单日 犹豫期次日 签单日次月1日 其他
     */
    @Column(name = "FEE_START_DATE_TYPE")
    private String feeStartDateType;

    /**
     * 费用起始日期其他算法
     */
    @Column(name = "FEE_START_DATE_OTHER_ALGO")
    private String feeStartDateOtherAlgo;

    /**
     * Y-是 N-否  否：账户编码为000000 默认为Y
     */
    @Column(name = "IS_CORREL_TO_ACC")
    private String isCorrelToAcc;

    /**
     * 默认9999
     */
    @Column(name = "FEE_DEDUCT_MAX_TIMES")
    private Integer feeDeductMaxTimes;

    public void setInsurtypeFeeId(Long insurtypeFeeId) {
        this.insurtypeFeeId = insurtypeFeeId;
    }

    public Long getInsurtypeFeeId() {
        return insurtypeFeeId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setPricingLiabId(Long pricingLiabId) {
        this.pricingLiabId = pricingLiabId;
    }

    public Long getPricingLiabId() {
        return pricingLiabId;
    }

    public void setFeeCode(String feeCode) {
        this.feeCode = feeCode;
    }

    public String getFeeCode() {
        return feeCode;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setFeeSrc(String feeSrc) {
        this.feeSrc = feeSrc;
    }

    public String getFeeSrc() {
        return feeSrc;
    }

    public void setFeeCalcFormulaId(Long feeCalcFormulaId) {
        this.feeCalcFormulaId = feeCalcFormulaId;
    }

    public Long getFeeCalcFormulaId() {
        return feeCalcFormulaId;
    }

    public void setFeeOccurCyc(String feeOccurCyc) {
        this.feeOccurCyc = feeOccurCyc;
    }

    public String getFeeOccurCyc() {
        return feeOccurCyc;
    }

    public void setFeeStartDateType(String feeStartDateType) {
        this.feeStartDateType = feeStartDateType;
    }

    public String getFeeStartDateType() {
        return feeStartDateType;
    }

    public void setFeeStartDateOtherAlgo(String feeStartDateOtherAlgo) {
        this.feeStartDateOtherAlgo = feeStartDateOtherAlgo;
    }

    public String getFeeStartDateOtherAlgo() {
        return feeStartDateOtherAlgo;
    }

    public void setIsCorrelToAcc(String isCorrelToAcc) {
        this.isCorrelToAcc = isCorrelToAcc;
    }

    public String getIsCorrelToAcc() {
        return isCorrelToAcc;
    }

    public void setFeeDeductMaxTimes(Integer feeDeductMaxTimes) {
        this.feeDeductMaxTimes = feeDeductMaxTimes;
    }

    public Integer getFeeDeductMaxTimes() {
        return feeDeductMaxTimes;
    }
}
