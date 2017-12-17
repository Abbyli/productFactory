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
@Entity(name = "T_PRODUCT_DEF_APPLY")
@ModelFile(value = "tProductDefApply.entity")
public class TProductDefApply extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "CHANGE_APPLY_ID")
    private Long changeApplyId;

    /**
     * 变更申请号
     */
    @Column(name = "CHANGE_APPLY_NO")
    private String changeApplyNo;

    /**
     * 申请对象ID
     */
    @Column(name = "APPLY_OBJECT_ID")
    private Long applyObjectId;

    /**
     * 01.险种定义 02.产品定义
     */
    @Column(name = "APPLY_TYPE")
    private String applyType;

    /**
     * 申请日期
     */
    @Column(name = "APPLY_DATE")
    private Date applyDate;

    /**
     * 01 未生效 02 已生效 03 已撤销
     */
    @Column(name = "APPLY_STATUS")
    private String applyStatus;

    /**
     * 申请人ID
     */
    @Column(name = "APPLICANT_ID")
    private Long applicantId;

    /**
     * 申请机构ID
     */
    @Column(name = "APPORG_ID")
    private Long apporgId;

    /**
     * 生效日期
     */
    @Column(name = "CHANGE_DATE")
    private Date changeDate;

    /**
     * 流程节点代码
     */
    @Column(name = "FLOW_NODE_CODE")
    private String flowNodeCode;

    /**
     * 申请说明
     */
    @Column(name = "APPLY_INSTRUCTION")
    private String applyInstruction;

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

    public void setChangeApplyId(Long changeApplyId) {
        this.changeApplyId = changeApplyId;
    }

    public Long getChangeApplyId() {
        return changeApplyId;
    }

    public void setChangeApplyNo(String changeApplyNo) {
        this.changeApplyNo = changeApplyNo;
    }

    public String getChangeApplyNo() {
        return changeApplyNo;
    }

    public void setApplyObjectId(Long applyObjectId) {
        this.applyObjectId = applyObjectId;
    }

    public Long getApplyObjectId() {
        return applyObjectId;
    }

    public void setApplyType(String applyType) {
        this.applyType = applyType;
    }

    public String getApplyType() {
        return applyType;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }

    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyStatus(String applyStatus) {
        this.applyStatus = applyStatus;
    }

    public String getApplyStatus() {
        return applyStatus;
    }

    public void setApplicantId(Long applicantId) {
        this.applicantId = applicantId;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public void setApporgId(Long apporgId) {
        this.apporgId = apporgId;
    }

    public Long getApporgId() {
        return apporgId;
    }

    public void setChangeDate(Date changeDate) {
        this.changeDate = changeDate;
    }

    public Date getChangeDate() {
        return changeDate;
    }

    public void setFlowNodeCode(String flowNodeCode) {
        this.flowNodeCode = flowNodeCode;
    }

    public String getFlowNodeCode() {
        return flowNodeCode;
    }

    public void setApplyInstruction(String applyInstruction) {
        this.applyInstruction = applyInstruction;
    }

    public String getApplyInstruction() {
        return applyInstruction;
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
