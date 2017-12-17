package com.neusoft.unieap.techcomp.ria.individual.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;

import java.io.Serializable;


/**
 */
@Entity(name = "UP_PAGE_INDIVIDUAL")
@ModelFile(value = "pageIndividual.entity")
public class PageIndividual implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private String id;

    /**
     * ${techcomp.ria/techcomp.ria.entity.pageIndividual.circumstanceId.label}
     */
    @Column(name = "CIRCUMSTANCE_ID")
    private String circumstanceId;

    /**
     * ${techcomp.ria/techcomp.ria.entity.pageIndividual.resourceId.label}
     */
    @Column(name = "RESOURCE_ID")
    private String resourceId;

    /**
     * ${techcomp.ria/techcomp.ria.entity.pageIndividual.individualType.label}
     */
    @Column(name = "INDIVIDUAL_TYPE")
    private String individualType;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setCircumstanceId(String circumstanceId) {
        this.circumstanceId = circumstanceId;
    }

    public String getCircumstanceId() {
        return circumstanceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setIndividualType(String individualType) {
        this.individualType = individualType;
    }

    public String getIndividualType() {
        return individualType;
    }
}
