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
@Entity(name = "T_OBJ_RATE_DIMEN_REF")
@ModelFile(value = "tObjRateDimenRef.entity")
public class TObjRateDimenRef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 险种精算费率表定义表ID
     */
    @Column(name = "OBJ_RATE_ID")
    private Long objRateId;

    /**
     * 维度表属性(冗余)
     */
    @Column(name = "DIMENSION_PROPERTY")
    private String dimensionProperty;

    /**
     * 维度表名称(冗余)
     */
    @Column(name = "DIMENSION_NAME")
    private String dimensionName;

    /**
     * 维度表ID
     */
    @Column(name = "DIMENSION_ID")
    private Long dimensionId;

    /**
     * 排序
     */
    @Column(name = "ORDER_NUM")
    private Long orderNum;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setObjRateId(Long objRateId) {
        this.objRateId = objRateId;
    }

    public Long getObjRateId() {
        return objRateId;
    }

    public void setDimensionProperty(String dimensionProperty) {
        this.dimensionProperty = dimensionProperty;
    }

    public String getDimensionProperty() {
        return dimensionProperty;
    }

    public void setDimensionName(String dimensionName) {
        this.dimensionName = dimensionName;
    }

    public String getDimensionName() {
        return dimensionName;
    }

    public void setDimensionId(Long dimensionId) {
        this.dimensionId = dimensionId;
    }

    public Long getDimensionId() {
        return dimensionId;
    }

    public void setOrderNum(Long orderNum) {
        this.orderNum = orderNum;
    }

    public Long getOrderNum() {
        return orderNum;
    }
}
