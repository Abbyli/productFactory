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
@Entity(name = "T_INSURTYPE_BASIC_INF")
@ModelFile(value = "tInsurtypeBasicInf.entity")
public class TInsurtypeBasicInf extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 险种编码
     */
    @Column(name = "INSURTYPE_CODE")
    private String insurtypeCode;

    /**
     * 险种名称
     */
    @Column(name = "INSURTYPE_NAME")
    private String insurtypeName;

    /**
     * 同一时刻只有一个版本起售
     */
    @Column(name = "VER_NO")
    private Long verNo;

    /**
     * 险种简称
     */
    @Column(name = "INSURTYPE_ABBR")
    private String insurtypeAbbr;

    /**
     * 险种英文名称
     */
    @Column(name = "INSURTYPE_ENG_NAME")
    private String insurtypeEngName;

    /**
     * 险种英文简称
     */
    @Column(name = "INSURTYPE_ENG_ABBR")
    private String insurtypeEngAbbr;

    /**
     * 普通 分红 万能 投连
     */
    @Column(name = "DESIGN_TYPE")
    private String designType;

    /**
     * 有效 无效
     */
    @Column(name = "INSURTYPE_STATUS")
    private String insurtypeStatus;

    /**
     * 一级分类：
    人寿保险
    年金保险
    意外险
    健康险
    委托管理业务
     */
    @Column(name = "INSURTYPE_LEVEL_1_CAT")
    private String insurtypeLevel1Cat;

    /**
     * 险种二级分类
     */
    @Column(name = "INSURTYPE_LEVEL_2_CAT")
    private String insurtypeLevel2Cat;

    /**
     * 险种三级分类
     */
    @Column(name = "INSURTYPE_LEVEL_3_CAT")
    private String insurtypeLevel3Cat;

    /**
     * 险种四级分类
     */
    @Column(name = "INSURTYPE_LEVEL_4_CAT")
    private String insurtypeLevel4Cat;

    /**
     * 险种五级分类
     */
    @Column(name = "INSURTYPE_LEVEL_5_CAT")
    private String insurtypeLevel5Cat;

    /**
     * 是否豁免
     */
    @Column(name = "IS_WAIVE")
    private String isWaive;

    /**
     * 同一时刻只有一个版本起售
     */
    @Column(name = "IS_DIVIDEND_INSUR")
    private String isDividendInsur;

    /**
     * 是否万能险
     */
    @Column(name = "IS_UNIVERSAL_INSUR")
    private String isUniversalInsur;

    /**
     * 是否投连险
     */
    @Column(name = "IS_UNIT_LINKED_INSUR")
    private String isUnitLinkedInsur;

    /**
     * 是否应缴税
    
     */
    @Column(name = "IS_TAXABLE")
    private String isTaxable;

    /**
     * 是否允许单独销售
     */
    @Column(name = "IS_PERMIT_SEPARATE_SELL")
    private String isPermitSeparateSell;

    /**
     * 是否有满期责任
     */
    @Column(name = "IS_MATURE_LIAB")
    private String isMatureLiab;

    /**
     * 是否账户类型
     */
    @Column(name = "IS_ACC_TYPE")
    private String isAccType;

    /**
     * 是否年金类型
     */
    @Column(name = "IS_ANNUITY_TYPE")
    private String isAnnuityType;

    /**
     * 主险 附加险
     */
    @Column(name = "MAIN_COV_RIDER_FLG")
    private String mainCovRiderFlg;

    /**
     * 长期 短期 极短期
     */
    @Column(name = "TERM_TYPE")
    private String termType;

    /**
     * 是否允许续保
     */
    @Column(name = "IS_PERMIT_INSUR_RENEW")
    private String isPermitInsurRenew;

    /**
     * 是否通过重大风险评测
     */
    @Column(name = "IS_PASS_MATERIAL_RISK_ASSESS")
    private String isPassMaterialRiskAssess;

    /**
     * 险种描述
     */
    @Column(name = "INSURTYPE_DESC")
    private String insurtypeDesc;

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setInsurtypeCode(String insurtypeCode) {
        this.insurtypeCode = insurtypeCode;
    }

    public String getInsurtypeCode() {
        return insurtypeCode;
    }

    public void setInsurtypeName(String insurtypeName) {
        this.insurtypeName = insurtypeName;
    }

    public String getInsurtypeName() {
        return insurtypeName;
    }

    public void setVerNo(Long verNo) {
        this.verNo = verNo;
    }

    public Long getVerNo() {
        return verNo;
    }

    public void setInsurtypeAbbr(String insurtypeAbbr) {
        this.insurtypeAbbr = insurtypeAbbr;
    }

    public String getInsurtypeAbbr() {
        return insurtypeAbbr;
    }

    public void setInsurtypeEngName(String insurtypeEngName) {
        this.insurtypeEngName = insurtypeEngName;
    }

    public String getInsurtypeEngName() {
        return insurtypeEngName;
    }

    public void setInsurtypeEngAbbr(String insurtypeEngAbbr) {
        this.insurtypeEngAbbr = insurtypeEngAbbr;
    }

    public String getInsurtypeEngAbbr() {
        return insurtypeEngAbbr;
    }

    public void setDesignType(String designType) {
        this.designType = designType;
    }

    public String getDesignType() {
        return designType;
    }

    public void setInsurtypeStatus(String insurtypeStatus) {
        this.insurtypeStatus = insurtypeStatus;
    }

    public String getInsurtypeStatus() {
        return insurtypeStatus;
    }

    public void setInsurtypeLevel1Cat(String insurtypeLevel1Cat) {
        this.insurtypeLevel1Cat = insurtypeLevel1Cat;
    }

    public String getInsurtypeLevel1Cat() {
        return insurtypeLevel1Cat;
    }

    public void setInsurtypeLevel2Cat(String insurtypeLevel2Cat) {
        this.insurtypeLevel2Cat = insurtypeLevel2Cat;
    }

    public String getInsurtypeLevel2Cat() {
        return insurtypeLevel2Cat;
    }

    public void setInsurtypeLevel3Cat(String insurtypeLevel3Cat) {
        this.insurtypeLevel3Cat = insurtypeLevel3Cat;
    }

    public String getInsurtypeLevel3Cat() {
        return insurtypeLevel3Cat;
    }

    public void setInsurtypeLevel4Cat(String insurtypeLevel4Cat) {
        this.insurtypeLevel4Cat = insurtypeLevel4Cat;
    }

    public String getInsurtypeLevel4Cat() {
        return insurtypeLevel4Cat;
    }

    public void setInsurtypeLevel5Cat(String insurtypeLevel5Cat) {
        this.insurtypeLevel5Cat = insurtypeLevel5Cat;
    }

    public String getInsurtypeLevel5Cat() {
        return insurtypeLevel5Cat;
    }

    public void setIsWaive(String isWaive) {
        this.isWaive = isWaive;
    }

    public String getIsWaive() {
        return isWaive;
    }

    public void setIsDividendInsur(String isDividendInsur) {
        this.isDividendInsur = isDividendInsur;
    }

    public String getIsDividendInsur() {
        return isDividendInsur;
    }

    public void setIsUniversalInsur(String isUniversalInsur) {
        this.isUniversalInsur = isUniversalInsur;
    }

    public String getIsUniversalInsur() {
        return isUniversalInsur;
    }

    public void setIsUnitLinkedInsur(String isUnitLinkedInsur) {
        this.isUnitLinkedInsur = isUnitLinkedInsur;
    }

    public String getIsUnitLinkedInsur() {
        return isUnitLinkedInsur;
    }

    public void setIsTaxable(String isTaxable) {
        this.isTaxable = isTaxable;
    }

    public String getIsTaxable() {
        return isTaxable;
    }

    public void setIsPermitSeparateSell(String isPermitSeparateSell) {
        this.isPermitSeparateSell = isPermitSeparateSell;
    }

    public String getIsPermitSeparateSell() {
        return isPermitSeparateSell;
    }

    public void setIsMatureLiab(String isMatureLiab) {
        this.isMatureLiab = isMatureLiab;
    }

    public String getIsMatureLiab() {
        return isMatureLiab;
    }

    public void setIsAccType(String isAccType) {
        this.isAccType = isAccType;
    }

    public String getIsAccType() {
        return isAccType;
    }

    public void setIsAnnuityType(String isAnnuityType) {
        this.isAnnuityType = isAnnuityType;
    }

    public String getIsAnnuityType() {
        return isAnnuityType;
    }

    public void setMainCovRiderFlg(String mainCovRiderFlg) {
        this.mainCovRiderFlg = mainCovRiderFlg;
    }

    public String getMainCovRiderFlg() {
        return mainCovRiderFlg;
    }

    public void setTermType(String termType) {
        this.termType = termType;
    }

    public String getTermType() {
        return termType;
    }

    public void setIsPermitInsurRenew(String isPermitInsurRenew) {
        this.isPermitInsurRenew = isPermitInsurRenew;
    }

    public String getIsPermitInsurRenew() {
        return isPermitInsurRenew;
    }

    public void setIsPassMaterialRiskAssess(String isPassMaterialRiskAssess) {
        this.isPassMaterialRiskAssess = isPassMaterialRiskAssess;
    }

    public String getIsPassMaterialRiskAssess() {
        return isPassMaterialRiskAssess;
    }

    public void setInsurtypeDesc(String insurtypeDesc) {
        this.insurtypeDesc = insurtypeDesc;
    }

    public String getInsurtypeDesc() {
        return insurtypeDesc;
    }
}
