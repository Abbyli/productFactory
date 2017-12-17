/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboElementDao_dao")
@ModelFile(value = "pfComboElementDao.dao")
public class PfComboElementDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboElementDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public QueryResult getTObjSkElement(TComboInf comboInf,int pageNumber,int pageSize){
		String sql = "select * from t_obj_skelement where type=3 and duty_id = ? ";
		return this.queryForPageList(TObjSkelement.class, pageNumber, pageSize, sql, new Object[]{comboInf.getComboId()});
	}
}
