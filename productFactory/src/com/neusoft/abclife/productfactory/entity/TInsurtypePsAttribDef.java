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
@Entity(name = "T_INSURTYPE_PS_ATTRIB_DEF")
@ModelFile(value = "tInsurtypePsAttribDef.entity")
public class TInsurtypePsAttribDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_PS_ATTRIB_ID")
    private Long insurtypePsAttribId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 是否允许加保
     */
    @Column(name = "IS_PERMIT_ADDINSUR")
    private String isPermitAddinsur;

    /**
     * 是否允许减保
     */
    @Column(name = "IS_PERMIT_ADDPREM")
    private String isPermitAddprem;

    /**
     * 是否允许退保
     */
    @Column(name = "IS_PERMIT_SURRENDER")
    private String isPermitSurrender;

    /**
     * 是否允许保单贷款
     */
    @Column(name = "IS_PERMIT_POL_LOAN")
    private String isPermitPolLoan;

    /**
     * 是否允许自垫
     */
    @Column(name = "IS_PERMIT_AUTO_PAY")
    private String isPermitAutoPay;

    /**
     * 是否允许减额交清
     */
    @Column(name = "IS_PERMIT_REDUC_AMT_PAYCLR")
    private String isPermitReducAmtPayclr;

    /**
     * 是否允许续保
     */
    @Column(name = "IS_PERMIT_INSUR_RENEW")
    private String isPermitInsurRenew;

    /**
     * 是否有满期责任
     */
    @Column(name = "IS_MATURE_LIAB")
    private String isMatureLiab;

    /**
     * 是否允许追加保费
     */
    @Column(name = "IS_PERMIT_ADDFEE")
    private String isPermitAddfee;

    /**
     * 是否有分红
     */
    @Column(name = "IS_DIVIDEND")
    private String isDividend;

    /**
     * 分红方式
     */
    @Column(name = "DIVIDEND_WAY")
    private String dividendWay;

    /**
     * 分红时是否账户结算
     */
    @Column(name = "DIVIDEND_IS_ACC_SETTLE")
    private String dividendIsAccSettle;

    /**
     * 期交是否允许通融退保
     */
    @Column(name = "REGUL_PAY_ALLOW_EXCEPT_SURRND")
    private String regulPayAllowExceptSurrnd;

    /**
     * 趸交是否允许通融退保
     */
    @Column(name = "SINGLE_PAY_ALLOW_EXCEPT_SURRND")
    private String singlePayAllowExceptSurrnd;

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

    public void setInsurtypePsAttribId(Long insurtypePsAttribId) {
        this.insurtypePsAttribId = insurtypePsAttribId;
    }

    public Long getInsurtypePsAttribId() {
        return insurtypePsAttribId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setIsPermitAddinsur(String isPermitAddinsur) {
        this.isPermitAddinsur = isPermitAddinsur;
    }

    public String getIsPermitAddinsur() {
        return isPermitAddinsur;
    }

    public void setIsPermitAddprem(String isPermitAddprem) {
        this.isPermitAddprem = isPermitAddprem;
    }

    public String getIsPermitAddprem() {
        return isPermitAddprem;
    }

    public void setIsPermitSurrender(String isPermitSurrender) {
        this.isPermitSurrender = isPermitSurrender;
    }

    public String getIsPermitSurrender() {
        return isPermitSurrender;
    }

    public void setIsPermitPolLoan(String isPermitPolLoan) {
        this.isPermitPolLoan = isPermitPolLoan;
    }

    public String getIsPermitPolLoan() {
        return isPermitPolLoan;
    }

    public void setIsPermitAutoPay(String isPermitAutoPay) {
        this.isPermitAutoPay = isPermitAutoPay;
    }

    public String getIsPermitAutoPay() {
        return isPermitAutoPay;
    }

    public void setIsPermitReducAmtPayclr(String isPermitReducAmtPayclr) {
        this.isPermitReducAmtPayclr = isPermitReducAmtPayclr;
    }

    public String getIsPermitReducAmtPayclr() {
        return isPermitReducAmtPayclr;
    }

    public void setIsPermitInsurRenew(String isPermitInsurRenew) {
        this.isPermitInsurRenew = isPermitInsurRenew;
    }

    public String getIsPermitInsurRenew() {
        return isPermitInsurRenew;
    }

    public void setIsMatureLiab(String isMatureLiab) {
        this.isMatureLiab = isMatureLiab;
    }

    public String getIsMatureLiab() {
        return isMatureLiab;
    }

    public void setIsPermitAddfee(String isPermitAddfee) {
        this.isPermitAddfee = isPermitAddfee;
    }

    public String getIsPermitAddfee() {
        return isPermitAddfee;
    }

    public void setIsDividend(String isDividend) {
        this.isDividend = isDividend;
    }

    public String getIsDividend() {
        return isDividend;
    }

    public void setDividendWay(String dividendWay) {
        this.dividendWay = dividendWay;
    }

    public String getDividendWay() {
        return dividendWay;
    }

    public void setDividendIsAccSettle(String dividendIsAccSettle) {
        this.dividendIsAccSettle = dividendIsAccSettle;
    }

    public String getDividendIsAccSettle() {
        return dividendIsAccSettle;
    }

    public void setRegulPayAllowExceptSurrnd(String regulPayAllowExceptSurrnd) {
        this.regulPayAllowExceptSurrnd = regulPayAllowExceptSurrnd;
    }

    public String getRegulPayAllowExceptSurrnd() {
        return regulPayAllowExceptSurrnd;
    }

    public void setSinglePayAllowExceptSurrnd(String singlePayAllowExceptSurrnd) {
        this.singlePayAllowExceptSurrnd = singlePayAllowExceptSurrnd;
    }

    public String getSinglePayAllowExceptSurrnd() {
        return singlePayAllowExceptSurrnd;
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
