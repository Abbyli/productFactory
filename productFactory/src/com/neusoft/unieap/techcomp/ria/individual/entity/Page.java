package com.neusoft.unieap.techcomp.ria.individual.entity;

import com.neusoft.fdframework.core.annotation.Column;
import com.neusoft.fdframework.core.annotation.Entity;
import com.neusoft.fdframework.core.annotation.ID;
import com.neusoft.fdframework.core.annotation.Transient;

import com.neusoft.unieap.core.annotation.ModelFile;

import org.hibernate.validator.constraints.Length;

import java.io.Serializable;


/**
 */
@Entity(name = "UP_PAGE")
@ModelFile(value = "page.entity")
public class Page implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;
    @ID
    @Column(name = "ID")
    private String id;

    /**
     * ${techcomp.ria/techcomp.ria.entity.page.circumstanceId.label}
     */
    @Column(name = "CIRCUMSTANCE_ID")
    private String circumstanceId;

    /**
     * ${techcomp.ria/techcomp.ria.entity.page.description.label}
     */
    @Column(name = "DESCRIPTION")
    private String description;

    /**
     * ${techcomp.ria/techcomp.ria.entity.page.url.label}
     */
    @Column(name = "URL")
    private String url;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setCircumstanceId(String circumstanceId) {
        this.circumstanceId = circumstanceId;
    }

    @Length(max = 32, message = "${techcomp.ria/techcomp.ria.entity.page.circumstanceId.length.message}")
    public String getCircumstanceId() {
        return circumstanceId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
