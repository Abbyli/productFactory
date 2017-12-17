/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskAmntDao_dao")
@ModelFile(value = "pfRiskAmntDao.dao")
public class PfRiskAmntDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskAmntDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 添加对象公式
	 * @param tObjFormula
	 */
	public void addTObjFormula(TObjFormula tObjFormula){
		Long seq = Long.parseLong(this.getSeq("SEQ_OBJ_FORMULA"));
		tObjFormula.setId(seq);
		this.saveNew(tObjFormula);
	}
	
	/**
	 * 通过定价id翻页查询对象公式
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getTObjFormulas(Long id,int pageNumber,int pageSize){
		String sql="select * from T_OBJ_FORMULA t where t.obj_id = ? and t.type like 'E1#__' order by t.type";
		QueryResult qr = this.queryForPageList(TObjFormula.class, pageNumber, pageSize, sql, new Object[]{id});
	
		return qr;
	}
	/**
	 * 检查添加
	 * @param tObjFormula
	 * @return
	 */
	public boolean checkCodeAndName_add(TObjFormula tObjFormula){
		//根据参数查询公式信息
		StringBuilder sql = new StringBuilder( "select *  from T_OBJ_FORMULA t where obj_id=? and type=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tObjFormula.getObjId());
		params.add(tObjFormula.getType());
		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql.toString(), params.toArray());
		//小于1不重复
		if(list.size()<1){
			return true;
		}else{
			return false;
		}
		
	}
	
}
