package com.neusoft.unieap.techcomp.ria.individual.bo.impl;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.base.model.DCRepository;
import com.neusoft.unieap.core.base.model.DevelopmentComponent;
import com.neusoft.unieap.core.base.model.SCActivator;
import com.neusoft.unieap.core.base.model.SCRepository;
import com.neusoft.unieap.core.base.model.SoftwareComponent;
import com.neusoft.unieap.core.exception.UniEAPBusinessException;
import com.neusoft.unieap.core.validation.i18n.I18nGlobalContext;
import com.neusoft.unieap.techcomp.ria.individual.bo.PageIndividualBO;
import com.neusoft.unieap.techcomp.ria.individual.dao.PageIndividualDAO;
import com.neusoft.unieap.techcomp.ria.individual.dto.PageDTO;
import com.neusoft.unieap.techcomp.ria.individual.entity.Page;
import com.neusoft.unieap.techcomp.ria.individual.entity.PageIndividual;
import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.FileFilterUtils;

@ModelFile("pageIndividualBO.bo")
public class PageIndividualBOImpl
  implements PageIndividualBO
{
  private PageIndividualDAO pageIndividualDAO;

  public void setPageIndividualDAO(PageIndividualDAO paramPageIndividualDAO)
  {
    this.pageIndividualDAO = paramPageIndividualDAO;
  }

  public Page savePage(Page paramPage)
  {
    String str = paramPage.getCircumstanceId();

    if (this.pageIndividualDAO.isCircumstanceExist(str)) {
      throw new UniEAPBusinessException("EAPTECHRIA1003", 
        new Object[] { str });
    }
    return this.pageIndividualDAO.savePage(paramPage);
  }

  public Page updatePage(Page paramPage)
  {
    String str1 = paramPage.getCircumstanceId();
    String str2 = paramPage.getId();

    if (this.pageIndividualDAO.isCircumstanceExistExceptCurrId(str2, 
      str1)) {
      throw new UniEAPBusinessException("EAPTECHRIA1003", 
        new Object[] { str1 });
    }
    Page localPage = getPageById(str2);
    if (localPage != null) {
      if (!(localPage.getCircumstanceId().equals(str1)))
      {
        this.pageIndividualDAO.updatePageIndividualInfo(localPage
          .getCircumstanceId(), str1);
      }
      localPage.setCircumstanceId(str1);
      localPage.setDescription(paramPage.getDescription());
    }
    return this.pageIndividualDAO.updatePage(localPage);
  }

  public void deletePage(String paramString)
  {
    this.pageIndividualDAO.deletePage(paramString);
    this.pageIndividualDAO.deletePageIndividualInfo(paramString);
  }

  public List getSCs()
  {
    List localList = SCRepository.getSoftwareComponents();
    ArrayList localArrayList = new ArrayList();
    if ((localList != null) && (localList.size() > 0)) {
      for (int i = 0; i < localList.size(); ++i) {
        PageDTO localPageDTO = new PageDTO();
        localPageDTO.setId(((SCActivator)localList.get(i)).getId());
        localPageDTO.setLabel(((SCActivator)localList.get(i)).getId());
        localPageDTO.setParentID("-1");
        localPageDTO.setUrl("");
        localPageDTO.setType("SC");
        localArrayList.add(localPageDTO);
      }
    }
    return localArrayList;
  }

  public List getDCsBySCId(String paramString)
  {
    List localList = DCRepository.getAvailableDevelopmentComponent();
    ArrayList localArrayList = new ArrayList();
    if ((localList != null) && (localList.size() > 0)) {
      DevelopmentComponent localDevelopmentComponent = null;
      for (int i = 0; i < localList.size(); ++i) {
        localDevelopmentComponent = (DevelopmentComponent)localList.get(i);
        if (paramString.equals(localDevelopmentComponent.getSoftwareComponent().getId())) {
          PageDTO localPageDTO = new PageDTO();
          localPageDTO.setId(localDevelopmentComponent.getId());
          localPageDTO.setLabel(localDevelopmentComponent.getId());
          localPageDTO.setParentID(paramString);
          localPageDTO.setUrl("");
          localPageDTO.setType("DC");
          localArrayList.add(localPageDTO);
        }
      }
    }
    return localArrayList;
  }

  public List getChildFilesByDCId(String paramString)
  {
    if (DCRepository.getDevelopmentComponent(paramString) == null)
      return null;
    String str1 = DCRepository.getDevelopmentComponent(paramString)
      .getSoftwareComponent().getId();
    String str2 = I18nGlobalContext.getInstance()
      .getServletContext().getRealPath(File.separator);
    str2 = 
      str2 + File.separator;
    File localFile1 = new File(str2 + str1 + File.separator + paramString);
    ArrayList localArrayList = new ArrayList();
    if (localFile1.isDirectory()) {
      File[] arrayOfFile2;
      File[] arrayOfFile1 = localFile1.listFiles();
      int j = (arrayOfFile2 = arrayOfFile1).length; for (int i = 0; i < j; ++i) { Object localObject;
        File localFile2 = arrayOfFile2[i];
        if (localFile2.isDirectory()) {
          localObject = FileUtils.listFiles(localFile2, 
            FileFilterUtils.suffixFileFilter("-view.jsp"), 
            FileFilterUtils.directoryFileFilter());
          if ((localObject != null) && (((Collection)localObject).size() > 0)) {
            PageDTO localPageDTO = new PageDTO();
            localPageDTO.setId(UUID.randomUUID().toString());
            localPageDTO.setLabel(localFile2.getName());
            localPageDTO.setParentID(paramString);
            localPageDTO.setType("Folder");
            localPageDTO.setUrl(localFile2.getPath().substring(
              str2.length() - 1).replace(
              File.separator, "/"));
            localArrayList.add(localPageDTO);
          }
        } else if (localFile2.getName().endsWith("-view.jsp")) {
          localObject = new PageDTO();
          ((PageDTO)localObject).setId(UUID.randomUUID().toString());
          ((PageDTO)localObject).setLabel(localFile2.getName());
          ((PageDTO)localObject).setParentID(paramString);
          ((PageDTO)localObject).setType("Page");
          ((PageDTO)localObject).setUrl(localFile2.getPath().substring(
            str2.length() - 1).replace(File.separator, 
            "/"));
          localArrayList.add(localObject);
        }
      }
    }
    return ((List)localArrayList);
  }

  public List getChildFilesByFolder(String paramString1, String paramString2)
  {
    String str = I18nGlobalContext.getInstance()
      .getServletContext().getRealPath(File.separator);
    str = 
      str + File.separator;
    File localFile1 = new File(str + paramString2.replace("/", File.separator));
    ArrayList localArrayList = new ArrayList();
    if (localFile1.isDirectory()) {
      File[] arrayOfFile2;
      File[] arrayOfFile1 = localFile1.listFiles();
      int j = (arrayOfFile2 = arrayOfFile1).length; for (int i = 0; i < j; ++i) { Object localObject;
        File localFile2 = arrayOfFile2[i];
        if (localFile2.isDirectory()) {
          localObject = FileUtils.listFiles(localFile2, 
            FileFilterUtils.suffixFileFilter("-view.jsp"), 
            FileFilterUtils.directoryFileFilter());
          if ((localObject != null) && (((Collection)localObject).size() > 0)) {
            PageDTO localPageDTO = new PageDTO();
            localPageDTO.setId(UUID.randomUUID().toString());
            localPageDTO.setLabel(localFile2.getName());
            localPageDTO.setParentID(paramString1);
            localPageDTO.setType("Folder");
            localPageDTO.setUrl(localFile2.getPath().substring(
              str.length() - 1).replace(
              File.separator, "/"));
            localArrayList.add(localPageDTO);
          }
        } else if (localFile2.getName().endsWith("-view.jsp")) {
          localObject = new PageDTO();
          ((PageDTO)localObject).setId(UUID.randomUUID().toString());
          ((PageDTO)localObject).setLabel(localFile2.getName());
          ((PageDTO)localObject).setParentID(paramString1);
          ((PageDTO)localObject).setType("Page");
          ((PageDTO)localObject).setUrl(localFile2.getPath().substring(
            str.length() - 1).replace(File.separator, 
            "/"));
          localArrayList.add(localObject);
        }
      }
    }
    return ((List)localArrayList);
  }

  public List getCircumstancesByPage(String paramString1, String paramString2)
  {
    List localList = this.pageIndividualDAO.getPagesByURL(paramString2);
    ArrayList localArrayList = new ArrayList();
    if ((localList != null) && (localList.size() > 0)) {
      for (int i = 0; i < localList.size(); ++i) {
        PageDTO localPageDTO = new PageDTO();
        localPageDTO.setId(((Page)localList.get(i)).getId());
        localPageDTO.setLabel(((Page)localList.get(i)).getCircumstanceId());
        localPageDTO.setParentID(paramString1);
        localPageDTO.setUrl(((Page)localList.get(i)).getUrl());
        localPageDTO.setType("Circumstance");
        localPageDTO.setIsLeaf(Boolean.valueOf(true));
        localArrayList.add(localPageDTO);
      }
    }
    return localArrayList;
  }

  public Page getPageById(String paramString)
  {
    return this.pageIndividualDAO.getPageById(paramString);
  }

  public List getPageIndividualList(String paramString1, String paramString2)
  {
    return this.pageIndividualDAO.getPageIndividualList(paramString1, 
      paramString2);
  }

  public List savePageIndividualList(List paramList)
  {
    ArrayList localArrayList = new ArrayList();
    if (paramList != null) {
      for (Iterator localIterator = paramList.iterator(); localIterator.hasNext(); ) { Object localObject = localIterator.next();
        PageIndividual localPageIndividual = (PageIndividual)localObject;
        String str1 = localPageIndividual.getId();
        String str2 = localPageIndividual.getIndividualType();
        if (str1 == null) {
          if (!(str2.equals("writely"))) {
            localPageIndividual = this.pageIndividualDAO
              .savePageIndividual(localPageIndividual);
          }
        }
        else if (str2.equals("writely"))
          localArrayList.add(localPageIndividual);
        else {
          this.pageIndividualDAO.updatePageIndividual(localPageIndividual);
        }
      }
    }

    if (localArrayList.size() > 0) {
      this.pageIndividualDAO.deletePageIndividualList(localArrayList);
      paramList.removeAll(localArrayList);
    }
    return paramList;
  }

  public String getSCIds()
  {
    StringBuilder localStringBuilder = new StringBuilder();
    List localList = SCRepository.getSoftwareComponents();
    if ((localList == null) || (localList.size() == 0)) {
      return "";
    }
    int i = localList.size();
    for (int j = 0; j < i; ++j) {
      localStringBuilder.append(((SoftwareComponent)localList.get(j)).getId());
      if (j != i - 1) {
        localStringBuilder.append(",");
      }
    }
    return localStringBuilder.toString();
  }
}