package dzltest.clmtest.entity;

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
@Entity(name = "T_TX_DEF")
@ModelFile(value = "tTxDef.entity")
public class TTxDef extends DomainObject implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "TX_ID")
    private Long txId;

    /**
     * 交易编码
     */
    @Column(name = "TX_CODE")
    private String txCode;

    /**
     * 交易名称
     */
    @Column(name = "TX_NAME")
    private String txName;

    /**
     * 内部编码
     */
    @Column(name = "INTER_CODE")
    private String interCode;

    /**
     * 冗余列
     */
    @Column(name = "GATEWAY_ID")
    private Long gatewayId;

    /**
     * 渠道ID
     */
    @Column(name = "CHANNEL_ID")
    private Long channelId;

    /**
     * 发送器ID
     */
    @Column(name = "SENDER_ID")
    private Long senderId;

    /**
     * 最大并发交易数
     */
    @Column(name = "MAX_CONCURR_TXS")
    private Long maxConcurrTxs;

    /**
     * 最大交易数
     */
    @Column(name = "MAX_TXS")
    private Long maxTxs;

    /**
     * 运行状态
     */
    @Column(name = "RUN_STATUS")
    private String runStatus;

    /**
     * 交易描述
     */
    @Column(name = "TX_DESC")
    private String txDesc;

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
     * 业务状态
     */
    @Column(name = "BIZ_STATUS")
    private String bizStatus;

    public void setTxId(Long txId) {
        this.txId = txId;
    }

    public Long getTxId() {
        return txId;
    }

    public void setTxCode(String txCode) {
        this.txCode = txCode;
    }

    public String getTxCode() {
        return txCode;
    }

    public void setTxName(String txName) {
        this.txName = txName;
    }

    public String getTxName() {
        return txName;
    }

    public void setInterCode(String interCode) {
        this.interCode = interCode;
    }

    public String getInterCode() {
        return interCode;
    }

    public void setGatewayId(Long gatewayId) {
        this.gatewayId = gatewayId;
    }

    public Long getGatewayId() {
        return gatewayId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setMaxConcurrTxs(Long maxConcurrTxs) {
        this.maxConcurrTxs = maxConcurrTxs;
    }

    public Long getMaxConcurrTxs() {
        return maxConcurrTxs;
    }

    public void setMaxTxs(Long maxTxs) {
        this.maxTxs = maxTxs;
    }

    public Long getMaxTxs() {
        return maxTxs;
    }

    public void setRunStatus(String runStatus) {
        this.runStatus = runStatus;
    }

    public String getRunStatus() {
        return runStatus;
    }

    public void setTxDesc(String txDesc) {
        this.txDesc = txDesc;
    }

    public String getTxDesc() {
        return txDesc;
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

    public void setBizStatus(String bizStatus) {
        this.bizStatus = bizStatus;
    }

    public String getBizStatus() {
        return bizStatus;
    }
}
