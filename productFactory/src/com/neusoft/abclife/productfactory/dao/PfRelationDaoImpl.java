/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRelation;
import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRelationDao_dao")
@ModelFile(value = "pfRelationDao.dao")
public class PfRelationDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRelationDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	//获取相关性标准化数据
	public List<TRelationDef> getTRelationDef(){
		String sql= "select * from T_RELATION_DEF";
		List<TRelationDef> list = this.queryForList(TRelationDef.class, sql);
		return list;
	}
	
	
	//添加对象相关性
	public void addTObjRelation(TObjRelation tObjRelation){
		Long seq =Long.parseLong(this.getSeq("SEQ_OBJ_RELATION"));
		tObjRelation.setId(seq);
		this.saveNew(tObjRelation);
	}
	//删除对象相关性
	public void delTObjRelation(TObjRelation tObjRelation){
		this.saveRemove(tObjRelation);
	}
	//添加对象公式
	public void addTObjFormula(TObjFormula tobjFormula){
		Long seq =Long.parseLong(this.getSeq("SEQ_OBJ_Formula"));
		tobjFormula.setId(seq);
		this.saveNew(tobjFormula);
	}
	//删除对象公式
	public void delTObjFormula(TObjFormula tobjFormula){
		this.saveRemove(tobjFormula);
	}
	//获取公式参数标准化
	public List<TFormulaParamRef> queryTFormulaParamRef(Long id){
		
		String sql = "select * from T_FORMULA_PARAM_REF t where t.formula_id=? and t.param_type='1'";
		
		List<TFormulaParamRef> list = this.queryForList(TFormulaParamRef.class, sql, new Object[]{id});
		
		return list;
	}
	//添加对象参数
	public void addTObjParam(TObjParam tObjParam){
		
		Long seq =Long.parseLong(this.getSeq("SEQ_OBJ_PARAM"));
		tObjParam.setId(seq);
		this.saveNew(tObjParam);
	}
	//删除对象参数
	public void delTObjParam(TObjParam tObjParam){
		
		this.saveRemove(tObjParam);
	}
	
	/**
	 * 删除对象参数,公式,相关性,入口对象信息
	 * @param objSeq
	 */
	public void delParamFormulaRelation(String objSeq){
		String sql1 = "delete from t_obj_param where obj_seq = ?";
		String sql2 = "delete from t_obj_formula where obj_seq = ?";
		String sql3 = "delete from t_obj_relation where obj_seq = ?";
		String sql4 = "delete from T_OBJ_ENTRANCE t where t.OBJ_SEQ = ?";
		Object[] obj = new Object[]{objSeq};
		this.executeSQL(sql1, obj);
		this.executeSQL(sql2, obj);
		this.executeSQL(sql3, obj);
		this.executeSQL(sql4, obj);
	}
	/**
	 * 查询对象参数将数据转为公式参数在页面加载
	 * @param tObjFormula
	 * @return
	 */
	public List<TFormulaParamRef> getTObjParam(TObjFormula tObjFormula){
		String sql = "select * from t_obj_param where obj_seq = ?";
		List<TObjParam> list = this.queryForList(TObjParam.class, sql, new Object[]{tObjFormula.getObjSeq()});
		
		List<TFormulaParamRef> list2 = new ArrayList<TFormulaParamRef>();
		for(TObjParam tObjParam : list){
			String sql2 = "select * from T_Formula_PARAM_REF where id=?";
			TFormulaParamRef t = this.queryForObject(TFormulaParamRef.class, sql2, new Object[]{tObjParam.getParamId()});
			t.setRefValue(tObjParam.getParamValue());
			list2.add(t);
		}		
		return list2;
	}
	/**
	 * 通过同一对象标识查询对象相关性数据
	 * @param tObjFormula
	 * @return
	 */
	public List<TObjRelation> getTObjRelation(String objSeq){
		String sql = "select * from t_obj_relation where obj_seq=?";
		List<TObjRelation> list = this.queryForList(TObjRelation.class, sql, new Object[]{objSeq});		
		return list;
	}
	/**
	 * 删除同一对象标识下所有对象相关性
	 * @param tObjFormula
	 */
	public void delAllTObjRelation(TObjFormula tObjFormula){
		String sql = "delete from t_obj_relation where obj_seq=?";
		this.executeSQL(sql, new Object[]{tObjFormula.getObjSeq()});
	}
	/**
	 * 删除同一对象标识下所有对象参数
	 * @param tObjFormula
	 */
	public void delAllTObjParams(TObjFormula tObjFormula){
		String sql = "delete from t_obj_param where obj_seq = ?";
		this.executeSQL(sql, new Object[]{tObjFormula.getObjSeq()});
	}
	/**
	 * 删除同一对象标识下对象入口表  add by qyt 20160716
	 * @param tObjFormula
	 */
	public void delTObjEntrance(TObjFormula tObjFormula){
		String sql = "delete from T_OBJ_ENTRANCE t where t.OBJ_SEQ = ?";
		this.executeSQL(sql, new Object[]{tObjFormula.getObjSeq()});
	}
	
	/**
	 * 插入TObjEntrance数据  add by qyt 20160716
	 * @param tObjEntrance
	 */
	public void addTObjEntrance(TObjEntrance tObjEntrance) {
		Long seq =Long.parseLong(this.getSeq("SEQ_OBJ_ENTRANCE"));
		tObjEntrance.setId(seq);
		this.saveNew(tObjEntrance);		
	}
	
	public Boolean isExist(TObjFormula tObjFormula){
		Boolean flag = false;
		String sql = "select * from t_obj_formula where obj_seq = ?";
		List<TObjFormula> list =  this.queryForList(TObjFormula.class, sql, new Object[]{tObjFormula.getObjSeq()});
		if(list.size()>0){
			flag=false;
		}else{
			flag = true;
		}
		
		return flag;
	}
	
}
