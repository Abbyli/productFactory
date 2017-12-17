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
@Entity(name = "T_ITEM_DETAIL_DEF")
@ModelFile(value = "tItemDetailDef.entity")
public class TItemDetailDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ITEM_DETAIL_ID")
    private Long itemDetailId;

    /**
     * 赔付项目代码
     */
    @Column(name = "CLAIM_PAY_ITEM_CODE")
    private String claimPayItemCode;

    /**
     * 赔付项目名称
     */
    @Column(name = "CLAIM_PAY_ITEM_NAME")
    private String claimPayItemName;

    /**
     * 00-取默认值 01-录入 02-使用计算公式
     */
    @Column(name = "CLAIM_PAY_CALC_WAY")
    private String claimPayCalcWay;

    public void setItemDetailId(Long itemDetailId) {
        this.itemDetailId = itemDetailId;
    }

    public Long getItemDetailId() {
        return itemDetailId;
    }

    public void setClaimPayItemCode(String claimPayItemCode) {
        this.claimPayItemCode = claimPayItemCode;
    }

    public String getClaimPayItemCode() {
        return claimPayItemCode;
    }

    public void setClaimPayItemName(String claimPayItemName) {
        this.claimPayItemName = claimPayItemName;
    }

    public String getClaimPayItemName() {
        return claimPayItemName;
    }

    public void setClaimPayCalcWay(String claimPayCalcWay) {
        this.claimPayCalcWay = claimPayCalcWay;
    }

    public String getClaimPayCalcWay() {
        return claimPayCalcWay;
    }
}
