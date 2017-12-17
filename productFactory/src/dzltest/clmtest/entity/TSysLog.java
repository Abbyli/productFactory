package dzltest.clmtest.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.di.DomainObject;

import java.io.Serializable;

import java.sql.Timestamp;


/**
 */
@Entity(name = "T_SYS_LOG")
@ModelFile(value = "tSysLog.entity")
public class TSysLog extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "SYS_LOG_ID")
    private Long sysLogId;

    /**
     * 系统流水号
     */
    @Column(name = "SYS_SN")
    private Long sysSn;

    /**
     * 网关ID
     */
    @Column(name = "GATEWAY_ID")
    private Long gatewayId;

    /**
     * 网关编码
     */
    @Column(name = "GATEWAY_CODE")
    private String gatewayCode;

    /**
     * 服务器节点名称
     */
    @Column(name = "SERVER_NODE_NAME")
    private String serverNodeName;

    /**
     * 渠道ID
     */
    @Column(name = "CHANNEL_ID")
    private Long channelId;

    /**
     * 渠道编码
     */
    @Column(name = "CHANNEL_CODE")
    private String channelCode;

    /**
     * 业务流水号
     */
    @Column(name = "BIZ_SN")
    private String bizSn;

    /**
     * 交易编码
     */
    @Column(name = "TX_CODE")
    private String txCode;

    /**
     * 内部编码
     */
    @Column(name = "INTER_CODE")
    private String interCode;

    /**
     * 交易用户
     */
    @Column(name = "TX_USER")
    private String txUser;

    /**
     * 交易机构
     */
    @Column(name = "TX_ORG")
    private String txOrg;

    /**
     * 交易发起方类型
     */
    @Column(name = "TX_INITIATOR_TYPE")
    private String txInitiatorType;

    /**
     * 01 发送 02 接收
     */
    @Column(name = "LOG_TYPE")
    private String logType;

    /**
     * 日志时间
     */
    @Column(name = "LOG_TIME")
    private Timestamp logTime;

    /**
     * 01 成功 02 失败 03 超时
     */
    @Column(name = "TX_STATUS")
    private String txStatus;

    /**
     * 交易异常时，备注记录异常信息； 交易成功时，备注不记录信息
     */
    @Column(name = "REMARK")
    private String remark;

    public void setSysLogId(Long sysLogId) {
        this.sysLogId = sysLogId;
    }

    public Long getSysLogId() {
        return sysLogId;
    }

    public void setSysSn(Long sysSn) {
        this.sysSn = sysSn;
    }

    public Long getSysSn() {
        return sysSn;
    }

    public void setGatewayId(Long gatewayId) {
        this.gatewayId = gatewayId;
    }

    public Long getGatewayId() {
        return gatewayId;
    }

    public void setGatewayCode(String gatewayCode) {
        this.gatewayCode = gatewayCode;
    }

    public String getGatewayCode() {
        return gatewayCode;
    }

    public void setServerNodeName(String serverNodeName) {
        this.serverNodeName = serverNodeName;
    }

    public String getServerNodeName() {
        return serverNodeName;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelCode(String channelCode) {
        this.channelCode = channelCode;
    }

    public String getChannelCode() {
        return channelCode;
    }

    public void setBizSn(String bizSn) {
        this.bizSn = bizSn;
    }

    public String getBizSn() {
        return bizSn;
    }

    public void setTxCode(String txCode) {
        this.txCode = txCode;
    }

    public String getTxCode() {
        return txCode;
    }

    public void setInterCode(String interCode) {
        this.interCode = interCode;
    }

    public String getInterCode() {
        return interCode;
    }

    public void setTxUser(String txUser) {
        this.txUser = txUser;
    }

    public String getTxUser() {
        return txUser;
    }

    public void setTxOrg(String txOrg) {
        this.txOrg = txOrg;
    }

    public String getTxOrg() {
        return txOrg;
    }

    public void setTxInitiatorType(String txInitiatorType) {
        this.txInitiatorType = txInitiatorType;
    }

    public String getTxInitiatorType() {
        return txInitiatorType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    public Timestamp getLogTime() {
        return logTime;
    }

    public void setTxStatus(String txStatus) {
        this.txStatus = txStatus;
    }

    public String getTxStatus() {
        return txStatus;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getRemark() {
        return remark;
    }
}
