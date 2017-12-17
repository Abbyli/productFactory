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
@Entity(name = "T_DIMENSION_DEF")
@ModelFile(value = "tDimensionDef.entity")
public class TDimensionDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private Long id;

    /**
     * 维度名称
     */
    @Column(name = "NAME")
    private String name;

    /**
     * 维度属性
     */
    @Column(name = "PROPERTY")
    private String property;

    /**
     * string字符串,number数字
     */
    @Column(name = "COLUMN_TYPE")
    private String columnType;

    /**
     * ORDER_NUM
     */
    @Column(name = "ORDER_NUM")
    private Integer orderNum;

    /**
     * 0精确匹配，1范围匹配
     */
    @Column(name = "MATCH_FLAG")
    private String matchFlag;

    /**
     * 维度类型(1默认值,2引用BOM的属性,3引用属性)
     */
    @Column(name = "DIMENSION_TYPE")
    private String dimensionType;

    /**
     * 返回值(string,number)
     */
    @Column(name = "RETURN_TYPE")
    private String returnType;

    /**
     * 引用值
     */
    @Column(name = "REF_VALUE")
    private String refValue;

    /**
     * 费率表类型(rt费率表,v现价表,exp风险加费,hl健康加费,job职业加费)
     */
    @Column(name = "RATE_TYPE")
    private String rateType;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getProperty() {
        return property;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public String getColumnType() {
        return columnType;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setMatchFlag(String matchFlag) {
        this.matchFlag = matchFlag;
    }

    public String getMatchFlag() {
        return matchFlag;
    }

    public void setDimensionType(String dimensionType) {
        this.dimensionType = dimensionType;
    }

    public String getDimensionType() {
        return dimensionType;
    }

    public void setReturnType(String returnType) {
        this.returnType = returnType;
    }

    public String getReturnType() {
        return returnType;
    }

    public void setRefValue(String refValue) {
        this.refValue = refValue;
    }

    public String getRefValue() {
        return refValue;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public String getRateType() {
        return rateType;
    }
}
