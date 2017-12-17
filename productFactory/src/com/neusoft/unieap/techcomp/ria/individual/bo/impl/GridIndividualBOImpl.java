package com.neusoft.unieap.techcomp.ria.individual.bo.impl;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.techcomp.ria.individual.bo.GridIndividualBO;
import com.neusoft.unieap.techcomp.ria.individual.dao.GridIndividualDAO;
import java.util.List;

@ModelFile("gridIndividualBO.bo")
public class GridIndividualBOImpl
  implements GridIndividualBO
{
  private GridIndividualDAO dao;

  public GridIndividualDAO getDao()
  {
    return this.dao;
  }

  public void setDao(GridIndividualDAO paramGridIndividualDAO) {
    this.dao = paramGridIndividualDAO;
  }

  public List getIndividual(String paramString1, String paramString2)
  {
    return this.dao.getIndividual(paramString1, paramString2);
  }

  public List getIndividualByUser(String paramString) {
    return this.dao.getIndividualByUser(paramString);
  }

  public void delIndividual(String paramString1, String paramString2, String paramString3) {
    this.dao.delIndividual(paramString1, paramString2, paramString3);
  }

  public void saveIndividual(Object paramObject) {
    this.dao.saveIndividual(paramObject);
  }

  public void updateIndividual(String paramString1, String paramString2, String paramString3, String paramString4)
  {
    this.dao.updateIndividual(paramString1, paramString2, paramString3, paramString4);
  }
}