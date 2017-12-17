package com.neusoft.unieap.techcomp.ria.individual.dao.impl;

import java.util.List;

import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.techcomp.ria.entity.Custom;
import com.neusoft.unieap.techcomp.ria.individual.dao.GridIndividualDAO;

@ModelFile("gridIndividualDAO.dao")
public class GridIndividualDAOImpl extends BaseDao implements GridIndividualDAO
{
  public List getIndividual(String paramString1, String paramString2)
  {
    String str = "select * from UP_RIA_CUSTOM custom where custom.USER_ID = ? and custom.path = ?";
    return this.queryForList(Custom.class,str, 
      new Object[] { paramString1, paramString2 }); }

  public List getIndividualByUser(String paramString) {
    String str = "select * from UP_RIA_CUSTOM custom where custom.USER_ID = ? ";
    return this.queryForList(Custom.class,str, 
      new Object[] { paramString }); }

  public void delIndividual(String paramString1, String paramString2, String paramString3) {
    String str = "delete from UP_RIA_CUSTOM custom where custom.USER_ID = ? and custom.path = ? and custom.CMP_ID = ?";
    this.executeSQL(str, 
      new Object[] { paramString1, paramString2, paramString3 });
  }

  public void updateIndividual(String paramString1, String paramString2, String paramString3, String paramString4)
  {
    String str = "update UP_RIA_CUSTOM custom set custom.content = ? where custom.USER_ID = ? and custom.path = ? and custom.CMP_ID = ? ";
    executeSQL(str, 
      new Object[] { paramString4, paramString1, paramString2, paramString3 });
  }

  public void saveIndividual(Object paramObject) {
    this.saveNew(paramObject);
  }
}