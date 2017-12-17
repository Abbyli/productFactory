/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TFormulaDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TPsItemDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskItemPropertyDao_dao")
@ModelFile(value = "pfRiskItemPropertyDao.dao")
public class PfRiskItemPropertyDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskItemPropertyDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TInsurtypePsItemDef> getPsItemDef(Long insurtypeId){
		String sql = "select * from T_INSURTYPE_PS_ITEM_DEF " +
				"where insurtype_id = ? and ps_item_id in " +
				"(select ps_item_id from t_ps_item_def where is_calc_item = 'Y')";
		List<TInsurtypePsItemDef> list = this.queryForList(TInsurtypePsItemDef.class, sql, new Object[]{insurtypeId});
		return list;
	
	}
	/**
	 * 保存保全
	 * @param tInsurtypePsItemDef
	 * @param insurtype
	 */
	public void savePsItemDef(TInsurtypePsItemDef tInsurtypePsItemDef,TInsurtypeBasicInf insurtype){
		String sql1="delete from t_obj_entrance where obj_seq in " +
					"(select obj_seq from t_obj_formula where obj_id=? and type ='G')";
		this.executeSQL(sql1, new Object[]{tInsurtypePsItemDef.getPsItemId()});
		
		String sql2 = "delete from t_obj_formula where obj_id=? and type ='G'";
		this.executeSQL(sql2, new Object[]{tInsurtypePsItemDef.getPsItemId()});
				
		if(tInsurtypePsItemDef.getPsItemFormulaId()==null||"".equals(tInsurtypePsItemDef.getPsItemFormulaId())){
			
		}else{
			String objSeq = this.getUUId();
			//定义对象公式
			TObjFormula tObjFormula = new TObjFormula();
			Long seq1 = Long.parseLong(this.getSeq("SEQ_OBJ_FORMULA"));
			tObjFormula.setId(seq1);
			tObjFormula.setObjSeq(objSeq);
			tObjFormula.setObjId(tInsurtypePsItemDef.getPsItemId());
			tObjFormula.setType("G");	//公式分类G
			tObjFormula.setFormulaId(tInsurtypePsItemDef.getPsItemFormulaId());
			tObjFormula.setHasRelation("0"); //没有相关性
			//定义对象入口
			TObjEntrance tObjEntrance = new TObjEntrance();
			Long seq2 = Long.parseLong(this.getSeq("SEQ_OBJ_ENTRANCE"));
			tObjEntrance.setId(seq2);
			tObjEntrance.setObjSeq(objSeq);
			tObjEntrance.setRiskCode(insurtype.getInsurtypeCode());
			tObjEntrance.setRiskVer(insurtype.getVerNo());
			tObjEntrance.setBusiType("03"); //业务分类 保全03
			tObjEntrance.setAlgoType("G"); //公式分类G
			this.saveNew(tObjFormula);
			this.saveNew(tObjEntrance);
			
		}
		
		this.saveUpdate(tInsurtypePsItemDef);
	}
	
	public List<TPsItemDef> getTPsItemDefs(String flag){
		String sql = "select * from t_ps_item_def where ps_type in (?,'B')";
		List<TPsItemDef> list = this.queryForList(TPsItemDef.class, sql, new Object[]{flag});
		return list;
	}
	
}
