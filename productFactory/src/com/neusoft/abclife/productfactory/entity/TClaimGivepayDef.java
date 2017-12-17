package com.neusoft.abclife.productfactory.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.math.BigDecimal;


/**
 */
@Entity(name = "T_CLAIM_GIVEPAY_DEF")
@ModelFile(value = "tClaimGivepayDef.entity")
public class TClaimGivepayDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "CLAIM_GIVEPAY_ID")
    private Long claimGivepayId;

    /**
     * 定价责任代码
     */
    @Column(name = "PRICING_LIAB_CODE")
    private String pricingLiabCode;

    /**
     * 保障责任代码
     */
    @Column(name = "PROTEC_LIAB_CODE")
    private String protecLiabCode;

    /**
     * 理赔给付代码
     */
    @Column(name = "CLAIM_GIVEPAY_CODE")
    private String claimGivepayCode;

    /**
     * 理赔给付名称
     */
    @Column(name = "CLAIM_GIVEPAY_NAME")
    private String claimGivepayName;

    /**
     * '01-身故
    02-高残
    03-重大疾病
    04-伤残
    05-豁免
    06-医疗
    07-特种疾病
    08-护理
    09-失能'
    
     */
    @Column(name = "CLAIM_CLAIM_PAY_TYPE")
    private String claimClaimPayType;

    /**
     * '01-飞机
    02-火车
    03-轮船
    04-公共交通
    05-出租车
    06-市内公交车
    07-长途汽车
    08-自驾车
    09-公务车'
    
     */
    @Column(name = "CLAIM_SUBTYPE")
    private String claimSubtype;

    /**
     * 保障责任ID
     */
    @Column(name = "PROTEC_LIAB_ID")
    private Long protecLiabId;

    /**
     * 1疾病 2 意外 3 无关
     */
    @Column(name = "ACCID_OCCUR_REASON")
    private String accidOccurReason;

    /**
     * 码表
     */
    @Column(name = "CLAIM_LIAB_START_DATE_ALGO")
    private String claimLiabStartDateAlgo;

    /**
     * 码表
     */
    @Column(name = "CLAIM_LIAB_END_DATE_ALGO")
    private String claimLiabEndDateAlgo;

    /**
     * 码表 拒陪后，后续如何处理
     */
    @Column(name = "LIAB_EXEMP_PROCESS_ACTION_ALGO")
    private String liabExempProcessActionAlgo;

    /**
     * 'Y-是 N-否 标注为是，免赔信息实体需要配置'
     */
    @Column(name = "INDEM_EXEMPT_ID")
    private String indemExemptId;

    /**
     * 以天为单位
     */
    @Column(name = "OBSRVPERIOD_DAYS")
    private BigDecimal obsrvperiodDays;

    /**
     * 等待期天数
     */
    @Column(name = "WAIT_PERIOD_DAYS")
    private BigDecimal waitPeriodDays;

    /**
     * 延长期天数
     */
    @Column(name = "EXT_PERIOD_DAYS")
    private BigDecimal extPeriodDays;

    public void setClaimGivepayId(Long claimGivepayId) {
        this.claimGivepayId = claimGivepayId;
    }

    public Long getClaimGivepayId() {
        return claimGivepayId;
    }

    public void setPricingLiabCode(String pricingLiabCode) {
        this.pricingLiabCode = pricingLiabCode;
    }

    public String getPricingLiabCode() {
        return pricingLiabCode;
    }

    public void setProtecLiabCode(String protecLiabCode) {
        this.protecLiabCode = protecLiabCode;
    }

    public String getProtecLiabCode() {
        return protecLiabCode;
    }

    public void setClaimGivepayCode(String claimGivepayCode) {
        this.claimGivepayCode = claimGivepayCode;
    }

    public String getClaimGivepayCode() {
        return claimGivepayCode;
    }

    public void setClaimGivepayName(String claimGivepayName) {
        this.claimGivepayName = claimGivepayName;
    }

    public String getClaimGivepayName() {
        return claimGivepayName;
    }

    public void setClaimClaimPayType(String claimClaimPayType) {
        this.claimClaimPayType = claimClaimPayType;
    }

    public String getClaimClaimPayType() {
        return claimClaimPayType;
    }

    public void setClaimSubtype(String claimSubtype) {
        this.claimSubtype = claimSubtype;
    }

    public String getClaimSubtype() {
        return claimSubtype;
    }

    public void setProtecLiabId(Long protecLiabId) {
        this.protecLiabId = protecLiabId;
    }

    public Long getProtecLiabId() {
        return protecLiabId;
    }

    public void setAccidOccurReason(String accidOccurReason) {
        this.accidOccurReason = accidOccurReason;
    }

    public String getAccidOccurReason() {
        return accidOccurReason;
    }

    public void setClaimLiabStartDateAlgo(String claimLiabStartDateAlgo) {
        this.claimLiabStartDateAlgo = claimLiabStartDateAlgo;
    }

    public String getClaimLiabStartDateAlgo() {
        return claimLiabStartDateAlgo;
    }

    public void setClaimLiabEndDateAlgo(String claimLiabEndDateAlgo) {
        this.claimLiabEndDateAlgo = claimLiabEndDateAlgo;
    }

    public String getClaimLiabEndDateAlgo() {
        return claimLiabEndDateAlgo;
    }

    public void setLiabExempProcessActionAlgo(String liabExempProcessActionAlgo) {
        this.liabExempProcessActionAlgo = liabExempProcessActionAlgo;
    }

    public String getLiabExempProcessActionAlgo() {
        return liabExempProcessActionAlgo;
    }

    public void setIndemExemptId(String indemExemptId) {
        this.indemExemptId = indemExemptId;
    }

    public String getIndemExemptId() {
        return indemExemptId;
    }

    public void setObsrvperiodDays(BigDecimal obsrvperiodDays) {
        this.obsrvperiodDays = obsrvperiodDays;
    }

    public BigDecimal getObsrvperiodDays() {
        return obsrvperiodDays;
    }

    public void setWaitPeriodDays(BigDecimal waitPeriodDays) {
        this.waitPeriodDays = waitPeriodDays;
    }

    public BigDecimal getWaitPeriodDays() {
        return waitPeriodDays;
    }

    public void setExtPeriodDays(BigDecimal extPeriodDays) {
        this.extPeriodDays = extPeriodDays;
    }

    public BigDecimal getExtPeriodDays() {
        return extPeriodDays;
    }
}
