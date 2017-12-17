package com.neusoft.unieap.techcomp.ria.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
 */
@Entity(name = "UP_RIA_CUSTOM")
@ModelFile(value = "custom.entity")
public class Custom implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private String id;

    /**
     * ${techcomp.ria/techcomp.ria.entity.custom.userId.label}
     */
    @Column(name = "USER_ID")
    private String userId;

    /**
     * ${techcomp.ria/techcomp.ria.entity.custom.path.label}
     */
    @Column(name = "PATH")
    private String path;

    /**
     * ${techcomp.ria/techcomp.ria.entity.custom.cmpId.label}
     */
    @Column(name = "CMP_ID")
    private String cmpId;

    /**
     * ${techcomp.ria/techcomp.ria.entity.custom.content.label}
     */
    @Column(name = "CONTENT")
    private String content;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public void setCmpId(String cmpId) {
        this.cmpId = cmpId;
    }

    public String getCmpId() {
        return cmpId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
