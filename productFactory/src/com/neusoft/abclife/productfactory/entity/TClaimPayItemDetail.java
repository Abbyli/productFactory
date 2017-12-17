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
@Entity(name = "T_CLAIM_PAY_ITEM_DETAIL")
@ModelFile(value = "tClaimPayItemDetail.entity")
public class TClaimPayItemDetail extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PAY_ITEM_DETAIL_ID")
    private Long payItemDetailId;

    /**
     * 理赔给付ID
     */
    @Column(name = "CLAIM_GIVEPAY_ID")
    private Long claimGivepayId;

    /**
     * X01--身故金
    X02--高残
    X03--重大疾病
    X04--残疾金
    X05--豁免
    X06--医疗
    X07--特殊疾病
    X为1，指疾病；X为2，指意外
    001--临时保单意外死亡
     */
    @Column(name = "CLAIM_TYPE")
    private String claimType;

    /**
     * 赔付项目代码
     */
    @Column(name = "CLAIM_PAY_ITEM_CODE")
    private String claimPayItemCode;

    /**
     * 00-取默认值 01-录入 02-使用计算公式
     */
    @Column(name = "CLAIM_PAY_CALC_WAY")
    private String claimPayCalcWay;

    /**
     * 数值型 字符型 日期型
     */
    @Column(name = "DEFAULT_VAL_TYPE")
    private String defaultValType;

    /**
     * 赔付项目名称
     */
    @Column(name = "CLAIM_PAY_ITEM_NAME")
    private String claimPayItemName;

    /**
     * 默认值
     */
    @Column(name = "DEFAULT_VAL")
    private String defaultVal;

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

    public void setPayItemDetailId(Long payItemDetailId) {
        this.payItemDetailId = payItemDetailId;
    }

    public Long getPayItemDetailId() {
        return payItemDetailId;
    }

    public void setClaimGivepayId(Long claimGivepayId) {
        this.claimGivepayId = claimGivepayId;
    }

    public Long getClaimGivepayId() {
        return claimGivepayId;
    }

    public void setClaimType(String claimType) {
        this.claimType = claimType;
    }

    public String getClaimType() {
        return claimType;
    }

    public void setClaimPayItemCode(String claimPayItemCode) {
        this.claimPayItemCode = claimPayItemCode;
    }

    public String getClaimPayItemCode() {
        return claimPayItemCode;
    }

    public void setClaimPayCalcWay(String claimPayCalcWay) {
        this.claimPayCalcWay = claimPayCalcWay;
    }

    public String getClaimPayCalcWay() {
        return claimPayCalcWay;
    }

    public void setDefaultValType(String defaultValType) {
        this.defaultValType = defaultValType;
    }

    public String getDefaultValType() {
        return defaultValType;
    }

    public void setClaimPayItemName(String claimPayItemName) {
        this.claimPayItemName = claimPayItemName;
    }

    public String getClaimPayItemName() {
        return claimPayItemName;
    }

    public void setDefaultVal(String defaultVal) {
        this.defaultVal = defaultVal;
    }

    public String getDefaultVal() {
        return defaultVal;
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
