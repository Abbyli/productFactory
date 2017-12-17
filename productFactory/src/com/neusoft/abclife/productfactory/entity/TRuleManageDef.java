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
@Entity(name = "T_RULE_MANAGE_DEF")
@ModelFile(value = "tRuleManageDef.entity")
public class TRuleManageDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "RULE_MANAGE_ID")
    private Long ruleManageId;

    /**
     * 产品主键
     */
    @Column(name = "PRODUCT_ID")
    private Long productId;

    /**
     * 产品类型 01-险种 02-组合
     */
    @Column(name = "PRODUCT_TYPE")
    private String productType;

    /**
     * 条款名称
     */
    @Column(name = "RULE_NAME")
    private String ruleName;

    /**
     * 上传时间
     */
    @Column(name = "UPLOAD_TIME")
    private Date uploadTime;

    /**
     * 下载路径
     */
    @Column(name = "DOWNLOAD_PATH")
    private String downloadPath;

    public void setRuleManageId(Long ruleManageId) {
        this.ruleManageId = ruleManageId;
    }

    public Long getRuleManageId() {
        return ruleManageId;
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

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Date getUploadTime() {
        return uploadTime;
    }

    public void setDownloadPath(String downloadPath) {
        this.downloadPath = downloadPath;
    }

    public String getDownloadPath() {
        return downloadPath;
    }
}
