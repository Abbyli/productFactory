/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TFormulaDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfFormulaDao_dao")
@ModelFile(value = "pfFormulaDao.dao")
public class PfFormulaDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfFormulaDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 根据类型查询公式
	 * @param type
	 * @return
	 */
	public List<TFormulaDef> getFormula(String type){
		String sql="select * from t_formula_def where AlGO_TYPE = ? order by id ";
		List<TFormulaDef> list = this.queryForList(TFormulaDef.class, sql, new Object[]{type});
		return list;
	}
	
	/**
	 * 定价特殊算法查询方式
	 */
	public List<TFormulaDef> getFormulaPricing(String type){
		String sql = "select * from t_formula_def where expression not like '%mult%' and memo  not like '%份数%' and algo_type=? order by id";
		List<TFormulaDef> list = this.queryForList(TFormulaDef.class, sql, new Object[]{type});
		return list;
	}
	/**
	 * 定价查按份数算法
	 */
	public List<TFormulaDef> getFormulaMult(String type){
		String sql = "select * from t_formula_def where expression like '%mult%' and algo_type=? and memo  like '%份数%'";
		List<TFormulaDef> list = this.queryForList(TFormulaDef.class, sql, new Object[]{type});
		return list;
	}
}
