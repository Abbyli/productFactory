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
@Entity(name = "T_INSURTYPE_PS_ITEM_DEF")
@ModelFile(value = "tInsurtypePsItemDef.entity")
public class TInsurtypePsItemDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "INSURTYPE_PS_ITEM_ID")
    private Long insurtypePsItemId;

    /**
     * 险种ID
     */
    @Column(name = "INSURTYPE_ID")
    private Long insurtypeId;

    /**
     * 保全项ID
     */
    @Column(name = "PS_ITEM_ID")
    private Long psItemId;

    /**
     * 财务处理类型
     */
    @Column(name = "FINAN_PROCESS_TYPE")
    private String finanProcessType;

    /**
     * 保全项目属性
     */
    @Column(name = "PS_ITEM_ATTRIB")
    private String psItemAttrib;

    /**
     * 保全公式ID
     */
    @Column(name = "PS_ITEM_FORMULA_ID")
    private Long psItemFormulaId;

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

    public void setInsurtypePsItemId(Long insurtypePsItemId) {
        this.insurtypePsItemId = insurtypePsItemId;
    }

    public Long getInsurtypePsItemId() {
        return insurtypePsItemId;
    }

    public void setInsurtypeId(Long insurtypeId) {
        this.insurtypeId = insurtypeId;
    }

    public Long getInsurtypeId() {
        return insurtypeId;
    }

    public void setPsItemId(Long psItemId) {
        this.psItemId = psItemId;
    }

    public Long getPsItemId() {
        return psItemId;
    }

    public void setFinanProcessType(String finanProcessType) {
        this.finanProcessType = finanProcessType;
    }

    public String getFinanProcessType() {
        return finanProcessType;
    }

    public void setPsItemAttrib(String psItemAttrib) {
        this.psItemAttrib = psItemAttrib;
    }

    public String getPsItemAttrib() {
        return psItemAttrib;
    }

    public void setPsItemFormulaId(Long psItemFormulaId) {
        this.psItemFormulaId = psItemFormulaId;
    }

    public Long getPsItemFormulaId() {
        return psItemFormulaId;
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
