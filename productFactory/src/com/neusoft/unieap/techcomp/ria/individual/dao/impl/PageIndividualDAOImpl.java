package com.neusoft.unieap.techcomp.ria.individual.dao.impl;

import java.util.List;

import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.techcomp.ria.individual.dao.PageIndividualDAO;
import com.neusoft.unieap.techcomp.ria.individual.entity.Page;
import com.neusoft.unieap.techcomp.ria.individual.entity.PageIndividual;

@ModelFile("pageIndividualDAO.dao")
public class PageIndividualDAOImpl extends BaseDao implements PageIndividualDAO{
	public Page savePage(Page paramPage) {
		this.saveNew(paramPage);
		return paramPage;
	}

	public Page updatePage(Page paramPage) {
		this.saveUpdate(paramPage);
		return paramPage;
	}

	public void deletePage(String paramString) {
		this.executeSQL("delete from UP_PAGE page where page.CIRCUMSTANCE_ID = ?", paramString);
	}

	public List getPagesByURL(String paramString) {
		String str = "select * from UP_PAGE page where page.url = ?";
		return this.queryForList(Page.class, str, paramString);
	}

	public Page getPageById(String paramString) {
		String str = "select * from UP_PAGE page where page.id = ?";
		List localList = this.queryForList(Page.class, str, paramString);
		if ((localList == null) || (localList.size() == 0)) {
			return null;
		}
		return ((Page) localList.get(0));
	}

	public boolean isCircumstanceExist(String paramString) {
		String str = "select * from Page page where page.page.CIRCUMSTANCE_ID = ?";
		List localList = this.queryForList(Page.class, str, paramString);

		return ((localList == null) || (localList.size() == 0));
	}

	public boolean isCircumstanceExistExceptCurrId(String paramString1, String paramString2) {
		String str = "select * from Page page where page.page.CIRCUMSTANCE_ID = ? and page.id <> ? ";
		List localList = this.queryForList(Page.class, str, new Object[] { paramString2, paramString1 });

		return ((localList == null) || (localList.size() == 0));
	}

	public List getPageIndividualList(String paramString1, String paramString2) {

		// List localList = (List)getHibernateTemplate().execute(
		// new HibernateCallback(paramString1, paramString2)
		// {
		// public Object doInHibernate(Session paramSession) throws
		// HibernateException, SQLException {
		// String str =
		// "select * from UP_PAGE_INDIVIDUAL pageIndividual where pageIndividual.RESOURCE_ID like ? and pageIndividual.CIRCUMSTANCE_ID = ? ";
		//
		// Query localQuery = paramSession.createQuery(str);
		// localQuery.setParameter(0, this.val$viewModelId + "%");
		// localQuery.setParameter(1, this.val$circumstanceId);
		// return localQuery.list();
		// }
		// });
		String str = "select * from UP_PAGE_INDIVIDUAL pageIndividual where pageIndividual.RESOURCE_ID like ? and pageIndividual.CIRCUMSTANCE_ID = ? ";
		List localList = this.queryForList(PageIndividual.class, str, new Object[] { paramString2, paramString1 });
		return localList;
	}

	public void deletePageIndividualList(List paramList) {
		String sql = "delete from UP_PAGE_INDIVIDUAL pageIndividual where";
		StringBuffer ids = new StringBuffer();
		for (int j = 0; j < paramList.size(); j++) {
			ids.append(((PageIndividual) (paramList.get(j))).getId());
			if (j + 1 < paramList.size()) {
				ids.append(",");
			}
		}
		sql = sql + " pageIndividual.id in (" + ids.toString() + ")";
		this.executeSQL(sql, null);
		// getHibernateTemplate().execute(new HibernateCallback(paramList)
		// {
		// public Object doInHibernate(Session paramSession) throws
		// HibernateException, SQLException {
		// String str = "delete from PageIndividual pageIndividual where";
		// str = str + " pageIndividual.id in (:ids)";
		// int i = this.val$pageIndividualList.size();
		// ArrayList localArrayList = new ArrayList();
		// for (int j = 0; j < i; ++j) {
		// PageIndividual localPageIndividual =
		// (PageIndividual)this.val$pageIndividualList
		// .get(j);
		// localArrayList.add(localPageIndividual.getId());
		// }
		// Query localQuery =
		// PageIndividualDAOImpl.this.getSession().createQuery(str);
		// localQuery.setParameterList("ids", localArrayList);
		// localQuery.executeUpdate();
		// return null;
		// }
		// });
	}

	public PageIndividual savePageIndividual(PageIndividual paramPageIndividual) {
		this.saveNew(paramPageIndividual);
		return paramPageIndividual;
	}

	public void updatePageIndividual(PageIndividual paramPageIndividual) {
		this.saveUpdate(paramPageIndividual);
	}

	public void deletePageIndividualInfo(String paramString) {
		String sql = "delete from PageIndividual pageIndividual where";
		sql = sql + " pageIndividual.CIRCUMSTANCE_ID = ?";
		this.executeSQL(sql, null);

		// getHibernateTemplate().execute(new HibernateCallback(paramString)
		// {
		// public Object doInHibernate(Session paramSession) throws
		// HibernateException, SQLException {
		// String str = "delete from PageIndividual pageIndividual where";
		// str = str + " pageIndividual.circumstanceId = ?";
		// Query localQuery =
		// PageIndividualDAOImpl.this.getSession().createQuery(str);
		// localQuery.setParameter(0, this.val$circumstanceId);
		// localQuery.executeUpdate();
		// return null;
		// }
		// });
	}

	public void updatePageIndividualInfo(String paramString1, String paramString2) {
		String sql = "update PageIndividual pageIndividual  set pageIndividual.CIRCUMSTANCE_ID = ? where pageIndividual.CIRCUMSTANCE_ID = ? ";
		this.executeSQL(sql, paramString1, paramString2);

		// getHibernateTemplate().execute(new HibernateCallback(paramString2,
		// paramString1)
		// {
		// public Object doInHibernate(Session paramSession) throws
		// HibernateException, SQLException {
		// String str =
		// "update PageIndividual pageIndividual  set pageIndividual.circumstanceId = ? where pageIndividual.circumstanceId = ? ";
		//
		// Query localQuery =
		// PageIndividualDAOImpl.this.getSession().createQuery(str);
		// localQuery.setParameter(0, this.val$newCircumstanceId);
		// localQuery.setParameter(1, this.val$oldCircumstanceId);
		// localQuery.executeUpdate();
		// return null;
		// }
		// });
	}
}