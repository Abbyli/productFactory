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
@Entity(name = "T_PRODUCT_STATUS_INF")
@ModelFile(value = "tProductStatusInf.entity")
public class TProductStatusInf extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PRODUCT_STATUS_ID")
    private Long productStatusId;

    /**
     * 产品ID
     */
    @Column(name = "PRODUCT_ID")
    private Long productId;

    /**
     * 01-险种 02-产品
     */
    @Column(name = "PRODUCT_TYPE")
    private String productType;

    /**
     * 01-险种设计期 02-险种运行期 03-产品设计期 04-产品运行期
     */
    @Column(name = "PRODUCT_STATUS_TYPE")
    private String productStatusType;

    /**
     * 险种状态 01-险种定义 02-险种审核 03-审核回退 04-发布测试 05-测试回退 06-待发布 07-正式发布 08-正式回退  产品状态 01-产品定义 02-产品审核 03-审核回退 04-发布测试 05-测试回退 06-待发布 07-正式发布 08-正式回退  待补充险种和产品的运行期状态
     */
    @Column(name = "PRODUCT_STATUS")
    private String productStatus;

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

    public void setProductStatusId(Long productStatusId) {
        this.productStatusId = productStatusId;
    }

    public Long getProductStatusId() {
        return productStatusId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductStatusType(String productStatusType) {
        this.productStatusType = productStatusType;
    }

    public String getProductStatusType() {
        return productStatusType;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public String getProductStatus() {
        return productStatus;
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
