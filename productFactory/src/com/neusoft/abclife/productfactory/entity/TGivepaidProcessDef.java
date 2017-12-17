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
@Entity(name = "T_GIVEPAID_PROCESS_DEF")
@ModelFile(value = "tGivepaidProcessDef.entity")
public class TGivepaidProcessDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "GIVEPAID_PROCESS_ID")
    private Long givepaidProcessId;

    /**
     * 给付ID
     */
    @Column(name = "GIVEPAY_ID")
    private Long givepayId;

    /**
     * 保障责任代码
     */
    @Column(name = "PROTEC_LIAB_CODE")
    private String protecLiabCode;

    /**
     * '0-生存领取 1-理赔给付'
     */
    @Column(name = "PROTEC_LIAB_TYPE")
    private String protecLiabType;

    /**
     * 给付代码
     */
    @Column(name = "GIVEPAY_CODE")
    private String givepayCode;

    /**
     * 01-本险种终止 02-本责任终止 03-削减主险合同基本保额 04-险种其他责任终止 05-保单终止 06-无条件销户 07-最后一次给付销户 08 本责任继续有效
     */
    @Column(name = "GIVEPAID_ACTION_TYPE")
    private String givepaidActionType;

    public void setGivepaidProcessId(Long givepaidProcessId) {
        this.givepaidProcessId = givepaidProcessId;
    }

    public Long getGivepaidProcessId() {
        return givepaidProcessId;
    }

    public void setGivepayId(Long givepayId) {
        this.givepayId = givepayId;
    }

    public Long getGivepayId() {
        return givepayId;
    }

    public void setProtecLiabCode(String protecLiabCode) {
        this.protecLiabCode = protecLiabCode;
    }

    public String getProtecLiabCode() {
        return protecLiabCode;
    }

    public void setProtecLiabType(String protecLiabType) {
        this.protecLiabType = protecLiabType;
    }

    public String getProtecLiabType() {
        return protecLiabType;
    }

    public void setGivepayCode(String givepayCode) {
        this.givepayCode = givepayCode;
    }

    public String getGivepayCode() {
        return givepayCode;
    }

    public void setGivepaidActionType(String givepaidActionType) {
        this.givepaidActionType = givepaidActionType;
    }

    public String getGivepaidActionType() {
        return givepaidActionType;
    }
}
