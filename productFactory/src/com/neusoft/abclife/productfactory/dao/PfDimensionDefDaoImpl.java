/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 *
 */
@Component("factoryabclife_pfDimensionDefDao_dao")
@ModelFile(value = "pfDimensionDefDao.dao")
public class PfDimensionDefDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfDimensionDefDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 维度定义查询
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryDimensionDef(TDimensionDef dimensionDef,int pageNumber, int pageSize) {

		String sql = "select * from T_DIMENSION_DEF where 1=1 ";
		if (!StringUtil.isEmpty(dimensionDef.getRateType())) {
			sql += "and rate_type = '"+dimensionDef.getRateType()+"' ";
		}
		sql += " order by order_num";
		QueryResult qr = this.queryForPageList(TDimensionDef.class, pageNumber,
				pageSize, sql, new Object[] {});
		return qr;
	}

	/**
	 * 维度定义添加
	 * @param dimensionDef
	 */
	public void addDimensionDef(TDimensionDef dimensionDef){
		Long seq = Long.parseLong(this.getSeq("SEQ_DIMENSION_DEF"));
		dimensionDef.setId(seq);
		this.saveNew(dimensionDef);
	}
	
	/**
	 * 维度定义修改
	 * @param dimensionDef
	 */
	public void updateDimensionDef(TDimensionDef dimensionDef){
		this.saveUpdate(dimensionDef);
	}
	
	/**
	 * 维度定义删除
	 * @param dimensionDef
	 */
	public void delDimensionDef(TDimensionDef dimensionDef){
		this.saveRemove(dimensionDef);
	}
	/**
	 * 获取当前最大排序号
	 * @return
	 */
	public int dimensionMaxNum(){
		String sql = "select max(order_num) as order_num from t_dimension_def ";
		TDimensionDef dimensionDef = this.queryForObject(TDimensionDef.class, sql);
		return dimensionDef.getOrderNum();
	}
	/**
	 * 不分页查询
	 */
	public List<TDimensionDef> getDimensionDefNoPage(TDimensionDef dimensionDef){
		String sql = "select * from T_DIMENSION_DEF where 1=1 ";
		if (!StringUtil.isEmpty(dimensionDef.getRateType())) {
			sql += "and rate_type = '"+dimensionDef.getRateType()+"' ";
		}
		sql += " order by order_num";
		
		return this.queryForList(TDimensionDef.class, sql);
	}
}
