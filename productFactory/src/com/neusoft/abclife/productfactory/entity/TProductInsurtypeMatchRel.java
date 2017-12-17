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
@Entity(name = "T_PRODUCT_INSURTYPE_MATCH_REL")
@ModelFile(value = "tProductInsurtypeMatchRel.entity")
public class TProductInsurtypeMatchRel extends DomainObject
    implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRODUCT_INSURTYPE_MATCH_ID")
    private Long productInsurtypeMatchId;

    /**
     * 产品类型
     */
    @Column(name = "PRODUCT_TYPE")
    private String productType;

    /**
     * 如果是主主搭配，此字段为主险代码
     */
    @Column(name = "PRODUCT_CODE")
    private String productCode;

    /**
     * 关联产品类型
     */
    @Column(name = "ASSOC_PRODUCT_TYPE")
    private String assocProductType;

    /**
     * 关联产品代码
     */
    @Column(name = "ASSOC_PRODUCT_CODE")
    private String assocProductCode;

    /**
     * 01 产品险种搭配 02 险种险种搭配
     */
    @Column(name = "MATCH_TYPE")
    private String matchType;

    /**
     * 01-主附 02-主主 03-附附
     */
    @Column(name = "MATCH_REL")
    private String matchRel;

    /**
     * 代扣费标志
     */
    @Column(name = "AGENT_FEE_DEDUC_FLG")
    private String agentFeeDeducFlg;

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

    public void setProductInsurtypeMatchId(Long productInsurtypeMatchId) {
        this.productInsurtypeMatchId = productInsurtypeMatchId;
    }

    public Long getProductInsurtypeMatchId() {
        return productInsurtypeMatchId;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setAssocProductType(String assocProductType) {
        this.assocProductType = assocProductType;
    }

    public String getAssocProductType() {
        return assocProductType;
    }

    public void setAssocProductCode(String assocProductCode) {
        this.assocProductCode = assocProductCode;
    }

    public String getAssocProductCode() {
        return assocProductCode;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchRel(String matchRel) {
        this.matchRel = matchRel;
    }

    public String getMatchRel() {
        return matchRel;
    }

    public void setAgentFeeDeducFlg(String agentFeeDeducFlg) {
        this.agentFeeDeducFlg = agentFeeDeducFlg;
    }

    public String getAgentFeeDeducFlg() {
        return agentFeeDeducFlg;
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
