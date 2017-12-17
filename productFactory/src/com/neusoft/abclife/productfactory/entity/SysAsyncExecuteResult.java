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
@Entity(name = "SYS_ASYNC_EXECUTE_RESULT")
@ModelFile(value = "sysAsyncExecuteResult.entity")
public class SysAsyncExecuteResult extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private String id;

    /**
     * INSTANCE_ID
     */
    @Column(name = "INSTANCE_ID")
    private String instanceId;

    /**
     * BUSSINESS_ID
     */
    @Column(name = "BUSSINESS_ID")
    private String bussinessId;

    /**
     * BUSSINESS_DESC
     */
    @Column(name = "BUSSINESS_DESC")
    private String bussinessDesc;

    /**
     * USER_ID
     */
    @Column(name = "USER_ID")
    private String userId;

    /**
     * EXECUTE_TIME
     */
    @Column(name = "EXECUTE_TIME")
    private Date executeTime;

    /**
     * IP
     */
    @Column(name = "IP")
    private String ip;

    /**
     * STATUE
     */
    @Column(name = "STATUE")
    private String statue;

    /**
     * RESULT
     */
    @Column(name = "RESULT")
    private String result;

    /**
     * ERROR_CODE
     */
    @Column(name = "ERROR_CODE")
    private String errorCode;

    /**
     * ERROR_MSG
     */
    @Column(name = "ERROR_MSG")
    private String errorMsg;

    /**
     * ERROR_STACK
     */
    @Column(name = "ERROR_STACK")
    private String errorStack;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setInstanceId(String instanceId) {
        this.instanceId = instanceId;
    }

    public String getInstanceId() {
        return instanceId;
    }

    public void setBussinessId(String bussinessId) {
        this.bussinessId = bussinessId;
    }

    public String getBussinessId() {
        return bussinessId;
    }

    public void setBussinessDesc(String bussinessDesc) {
        this.bussinessDesc = bussinessDesc;
    }

    public String getBussinessDesc() {
        return bussinessDesc;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setExecuteTime(Date executeTime) {
        this.executeTime = executeTime;
    }

    public Date getExecuteTime() {
        return executeTime;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getIp() {
        return ip;
    }

    public void setStatue(String statue) {
        this.statue = statue;
    }

    public String getStatue() {
        return statue;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getResult() {
        return result;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorStack(String errorStack) {
        this.errorStack = errorStack;
    }

    public String getErrorStack() {
        return errorStack;
    }
}
