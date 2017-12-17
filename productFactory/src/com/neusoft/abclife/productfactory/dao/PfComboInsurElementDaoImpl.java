/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TObjEntranceCombine;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboInsurElementDao_dao")
@ModelFile(value = "pfComboInsurElementDao.dao")
public class PfComboInsurElementDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboInsurElementDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TComboInsurtypeElemRel> queryInsurElem(TComboInf comboInf){
		String sql = "select * from t_combo_insurtype_elem_rel where combo_id=? ";
		return this.queryForList(TComboInsurtypeElemRel.class, sql, new Object[]{comboInf.getComboId()});
	}
	
	public void updComboInsurElem(TComboInsurtypeElemRel comInsurElem){
		this.saveUpdate(comInsurElem);
	}
	public List<TProductParamDef> queryTProductParamDef(TComboInsurtypeElemRel comInsurElem){
		String sql = "select * from t_product_param_def where ascrib_hierar= 02 and entity_id= ? and param_type = ? order by param_unit,param_val ";
		
		return this.queryForList(TProductParamDef.class, sql, new Object[]{comInsurElem.getInsurtypeId(),comInsurElem.getElemName()});
	}
	public void saveFormula(TObjParam param,TObjEntranceCombine entrance,TObjFormula formula){
		Long paramSeq = Long.parseLong(this.getSeq("SEQ_OBJ_PARAM"));
		Long entranceSeq = Long.parseLong(this.getSeq("SEQ_OBJ_ENTRANCE_COMBINE"));
		Long formulaSeq = Long.parseLong(this.getSeq("SEQ_OBJ_FORMULA"));
		String seq = this.getUUId();
		param.setObjSeq(seq);
		param.setId(paramSeq);
		this.saveNew(param);
		
		entrance.setObjSeq(seq);
		entrance.setId(entranceSeq);
		this.saveNew(entrance);
		
		formula.setObjSeq(seq);
		formula.setId(formulaSeq);
		this.saveNew(formula);
	}
	
	public void delFormula(TObjFormula formula){
		String sql1 = "delete from t_obj_formula where obj_seq = ? ";
		String sql2 = "delete from t_obj_entrance_combine where obj_seq = ? ";
		String sql3 = "delete from t_obj_param where obj_seq = ? ";
		this.executeSQL(sql1, new Object[]{formula.getObjSeq()});
		this.executeSQL(sql2, new Object[]{formula.getObjSeq()});
		this.executeSQL(sql3, new Object[]{formula.getObjSeq()});
		
	}
	
	public TObjFormula queryFormula(TComboInsurtypeElemRel elemRel){
		String sql = "select * from t_obj_formula where type = 'SPLIT' and obj_id = ? ";
		return this.queryForObject(TObjFormula.class, sql, new Object[]{elemRel.getComboInsurtypeElemRelId()});
	}
	
	public List<TObjParam> queryParam(TComboInsurtypeElemRel elemRel){
		String sql = "select * from t_obj_param where type = 'SPLIT' and obj_id = ? ";
		return this.queryForList(TObjParam.class, sql, new Object[]{elemRel.getComboInsurtypeElemRelId()});
	}
	
	public TFormulaParamRef getFormulaParam(TObjParam param){
		String sql = "select * from t_formula_param_ref where id = ? ";
		return this.queryForObject(TFormulaParamRef.class, sql, new Object[]{param.getParamId()});
	}
}
