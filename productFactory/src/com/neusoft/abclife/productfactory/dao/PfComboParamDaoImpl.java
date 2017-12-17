/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboParamDao_dao")
@ModelFile(value = "pfComboParamDao.dao")
public class PfComboParamDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboParamDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TProductParamDef> queryComboParam(List<TComboInsurtype> comboInsurs,String type){
		String sql = "select  distinct param_val,param_unit,param_desc,param_type  from t_product_param_def where ascrib_hierar=02  and param_type=? ";
		String str = "";
		List<TProductParamDef> list = new ArrayList<TProductParamDef>();
		if(comboInsurs!=null && comboInsurs.size()>0){
			sql += "and entity_id in ";
			for(TComboInsurtype t:comboInsurs){
				str += ","+t.getInsurtypeId().toString();
			}
			sql += "("+str.substring(1)+") order by param_unit,param_val ";
			list = this.queryForList(TProductParamDef.class,sql, new Object[]{type});
		}
		return list;
	}
	
	public List<TComboInsurtype> queryComboInsurtype(TComboInf comboInf){
		String sql = "select * from t_combo_insurtype where combo_id=? ";
		return this.queryForList(TComboInsurtype.class, sql, new Object[]{comboInf.getComboId()});
	}
	
	public void saveComboParam(TProductParamDef param){
		Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_PARAM_DEF"));
		param.setProductParamId(seq);
		this.saveNew(param);
	}
	
	public void delComboParam(TComboInf comboInf,String type){
		String sql = "delete from t_product_param_def where ascrib_hierar=04 and param_type= ? and entity_id = ? ";
		this.executeSQL(sql, new Object[]{type,comboInf.getComboId()});
	}
	
	public List<TProductParamDef> queryComboParams(TComboInf comboInf,String type){
		String sql = "select * from t_product_param_def where ascrib_hierar=04 and param_type= ? and entity_id = ? ";
		return this.queryForList(TProductParamDef.class, sql, new Object[]{type,comboInf.getComboId()});
	}
	
}
