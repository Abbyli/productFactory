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
@Entity(name = "T_PRODUCT_DEF_APPROVE")
@ModelFile(value = "tProductDefApprove.entity")
public class TProductDefApprove extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "PROD_ASSESS_ID")
    private Long prodAssessId;

    /**
     * 管理机构ID
     */
    @Column(name = "MNGORG_ID")
    private Long mngorgId;

    /**
     * 部门ID
     */
    @Column(name = "DEPT_ID")
    private Long deptId;

    /**
     * 审核机构ID
     */
    @Column(name = "ASSESS_MNGORG_ID")
    private Long assessMngorgId;

    /**
     * 审核部门ID
     */
    @Column(name = "ASSESS_DEPT_ID")
    private Long assessDeptId;

    /**
     * 审核对象ID
     */
    @Column(name = "ASSESS_OBJ_ID")
    private Long assessObjId;

    /**
     * 01-险种 02-产品
     */
    @Column(name = "ASSESS_TYPE")
    private String assessType;

    /**
     * 01 已审批 02 未审批
     */
    @Column(name = "ASSESS_STATUS")
    private String assessStatus;

    /**
     * 01-险种设计期 02-险种运行期 03-产品设计期 04-产品运行期
     */
    @Column(name = "PRODUCT_STATUS_TYPE")
    private String productStatusType;

    /**
     * 险种状态 01-险种定义 02-险种审核 03-审核回退 04-发布测试 05-测试回退 06-待发布 07-正式发布 08-正式回退  产品状态 01-产品定义 02-产品审核 03-审核回退 04-发布测试 05-测试回退 06-待发布 07-正式发布 08-正式回退
     */
    @Column(name = "PRODUCT_STATUS")
    private String productStatus;

    /**
     * 01 审批不通过 02 审批通过
     */
    @Column(name = "ASSESS_CONCLUSION")
    private String assessConclusion;

    /**
     * 审核人员ID
     */
    @Column(name = "ASSESS_PSNNL_ID")
    private Long assessPsnnlId;

    /**
     * 审核完成日期
     */
    @Column(name = "ASSESS_FINISH_DATE")
    private Date assessFinishDate;

    /**
     * 提交审核日期
     */
    @Column(name = "SUBMIT_ASSESS_DATE")
    private Date submitAssessDate;

    /**
     * 提交审核人ID
     */
    @Column(name = "SUBMIT_APPROVER_ID")
    private Long submitApproverId;

    /**
     * 考核审批、 薪资审批、 变更申请审批 雇员（特殊年龄入司审批、二次入司审批、正常增员审批、职级调整审批） 组织（团队调整审批、主管任命审批） 新增中介机构
     */
    @Column(name = "SUBMIT_ASSESS_REASON")
    private String submitAssessReason;

    /**
     * 01 信息保存 02 提交审核 03 险种审核 04 险种测试 05 险种审批 06 险种发布
     */
    @Column(name = "FLOW_NODE_CODE")
    private String flowNodeCode;

    /**
     * 审核意见
     */
    @Column(name = "APPROVE_OPINION")
    private String approveOpinion;

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

    public void setProdAssessId(Long prodAssessId) {
        this.prodAssessId = prodAssessId;
    }

    public Long getProdAssessId() {
        return prodAssessId;
    }

    public void setMngorgId(Long mngorgId) {
        this.mngorgId = mngorgId;
    }

    public Long getMngorgId() {
        return mngorgId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setAssessMngorgId(Long assessMngorgId) {
        this.assessMngorgId = assessMngorgId;
    }

    public Long getAssessMngorgId() {
        return assessMngorgId;
    }

    public void setAssessDeptId(Long assessDeptId) {
        this.assessDeptId = assessDeptId;
    }

    public Long getAssessDeptId() {
        return assessDeptId;
    }

    public void setAssessObjId(Long assessObjId) {
        this.assessObjId = assessObjId;
    }

    public Long getAssessObjId() {
        return assessObjId;
    }

    public void setAssessType(String assessType) {
        this.assessType = assessType;
    }

    public String getAssessType() {
        return assessType;
    }

    public void setAssessStatus(String assessStatus) {
        this.assessStatus = assessStatus;
    }

    public String getAssessStatus() {
        return assessStatus;
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

    public void setAssessConclusion(String assessConclusion) {
        this.assessConclusion = assessConclusion;
    }

    public String getAssessConclusion() {
        return assessConclusion;
    }

    public void setAssessPsnnlId(Long assessPsnnlId) {
        this.assessPsnnlId = assessPsnnlId;
    }

    public Long getAssessPsnnlId() {
        return assessPsnnlId;
    }

    public void setAssessFinishDate(Date assessFinishDate) {
        this.assessFinishDate = assessFinishDate;
    }

    public Date getAssessFinishDate() {
        return assessFinishDate;
    }

    public void setSubmitAssessDate(Date submitAssessDate) {
        this.submitAssessDate = submitAssessDate;
    }

    public Date getSubmitAssessDate() {
        return submitAssessDate;
    }

    public void setSubmitApproverId(Long submitApproverId) {
        this.submitApproverId = submitApproverId;
    }

    public Long getSubmitApproverId() {
        return submitApproverId;
    }

    public void setSubmitAssessReason(String submitAssessReason) {
        this.submitAssessReason = submitAssessReason;
    }

    public String getSubmitAssessReason() {
        return submitAssessReason;
    }

    public void setFlowNodeCode(String flowNodeCode) {
        this.flowNodeCode = flowNodeCode;
    }

    public String getFlowNodeCode() {
        return flowNodeCode;
    }

    public void setApproveOpinion(String approveOpinion) {
        this.approveOpinion = approveOpinion;
    }

    public String getApproveOpinion() {
        return approveOpinion;
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
