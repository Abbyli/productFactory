/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_pfRelationDefDao_dao")
@ModelFile(value = "pfRelationDefDao.dao")
public class PfRelationDefDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRelationDefDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 相关性定义查询
	 * 
	 * @param relationDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryRelationDef(int pageNumber, int pageSize) {

		String sql = "select * from T_RELATION_DEF where 1=1";
		QueryResult qr = this.queryForPageList(TRelationDef.class, pageNumber,
				pageSize, sql, new Object[] {});
		return qr;
	}
	
	/**
	 * 相关性定义添加
	 * @param relationDef
	 * @return
	 */
	public void addRelationDef(TRelationDef relationDef){
		Long seq = Long.parseLong(this.getSeq("SEQ_RELATION_DEF"));
		relationDef.setId(seq);
		this.saveNew(relationDef);
	}
	
	/**
	 * 相关性定义修改
	 * @param relationDef
	 * @return
	 */
	public void updateRelationDef(TRelationDef relationDef){
		this.saveUpdate(relationDef);
	}
	
	/**
	 * 相关性定义删除
	 * @param relationDef
	 * @return
	 */
	public void delRelationDef(TRelationDef relationDef){
		this.saveRemove(relationDef);
	}
}
