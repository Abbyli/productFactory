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
@Entity(name = "T_PRODUCT_SALE_CHNL")
@ModelFile(value = "tProductSaleChnl.entity")
public class TProductSaleChnl extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRODUCT_SALE_ID")
    private Long productSaleId;

    /**
     * 产品ID
     */
    @Column(name = "PRODUCT_ID")
    private Long productId;

    /**
     * 产品代码
     */
    @Column(name = "PRODUCT_CODE")
    private String productCode;

    /**
     * 产品版本
     */
    @Column(name = "PRODUCT_VER")
    private Long productVer;

    /**
     * 销售渠道 01-个人营销;03-银行代理;04-中介渠道;05-电话销售;06-网络销售;07-财富渠道
     */
    @Column(name = "SALE_CHNL")
    private String saleChnl;

    /**
     * 销售机构
     */
    @Column(name = "SALE_MNGCOM")
    private String saleMngcom;

    /**
     * 银行代码
     */
    @Column(name = "BANK_CODE")
    private String bankCode;

    /**
     * 销售状态 1-起售；0-停售
     */
    @Column(name = "SALE_STATE")
    private String saleState;

    /**
     * 起售日期
     */
    @Column(name = "STARTDATE")
    private Date startdate;

    /**
     * 停售日期
     */
    @Column(name = "ENDDATE")
    private Date enddate;

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

    public void setProductSaleId(Long productSaleId) {
        this.productSaleId = productSaleId;
    }

    public Long getProductSaleId() {
        return productSaleId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductVer(Long productVer) {
        this.productVer = productVer;
    }

    public Long getProductVer() {
        return productVer;
    }

    public void setSaleChnl(String saleChnl) {
        this.saleChnl = saleChnl;
    }

    public String getSaleChnl() {
        return saleChnl;
    }

    public void setSaleMngcom(String saleMngcom) {
        this.saleMngcom = saleMngcom;
    }

    public String getSaleMngcom() {
        return saleMngcom;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setSaleState(String saleState) {
        this.saleState = saleState;
    }

    public String getSaleState() {
        return saleState;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public Date getEnddate() {
        return enddate;
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
