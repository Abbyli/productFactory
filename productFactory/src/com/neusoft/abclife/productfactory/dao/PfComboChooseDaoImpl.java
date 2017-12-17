/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboChooseDao_dao")
@ModelFile(value = "pfComboChooseDao.dao")
public class PfComboChooseDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboChooseDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public void saveComboInsurtype(TComboInsurtype comboInsur){
		Long seq = Long.parseLong(this.getSeq("SEQ_COMBO_INSURTYPE"));
		comboInsur.setComboInsurtypeId(seq);
		this.saveNew(comboInsur);
	}
	
	public QueryResult queryComboInsurtypeForPage(TComboInf comboInf,int pageNumber,int pageSize){
		String sql = "select * from t_combo_insurtype where combo_id=? ";
		return this.queryForPageList(TComboInsurtype.class, pageNumber, pageSize, sql, new Object[]{comboInf.getComboId()});
	}
	
	public void delComboInsurtype(TComboInsurtype comboInsur){
		this.saveRemove(comboInsur);
	}
	
	public List<TComboInsurtypeElemRel> querycomboInsurElem(TComboInsurtype comboInsur){
		String sql = "select b.combo_id,b.insurtype_id,b.insurtype_code," +
				"b.insurtype_name,b.insurtype_ver,b.pricing_id,b.pricing_code," +
				"a.name as ELEM_NAME,a.id as ELEM_ID "+
				"from t_obj_skelement a join t_combo_insurtype b on b.pricing_id=a.duty_id " +
				"where type=1 and combo_id=? and a.duty_id=? ";
		return this.queryForList(TComboInsurtypeElemRel.class, sql, new Object[]{comboInsur.getComboId(),comboInsur.getPricingId()});
	}
	
	public void saveComboInsurElem(TComboInsurtypeElemRel comboInsurElem){
		Long seq = Long.parseLong(this.getSeq("SEQ_COMBO_INSURTYPE_ELEM_REL"));
		comboInsurElem.setComboInsurtypeElemRelId(seq);
		this.saveNew(comboInsurElem);
	}
	
	public void delComboInsurElem(TComboInsurtype comboInsur){
		String sql = "delete from t_combo_insurtype_elem_rel where combo_id=? and insurtype_id=? ";
		this.executeSQL(sql, new Object[]{comboInsur.getComboId(),comboInsur.getInsurtypeId()});
	}
	public void delComboParam(TComboInsurtype comboInsur){
		String sql = "delete from t_product_param_def where ascrib_hierar=04 and entity_id=? ";
		this.executeSQL(sql, new Object[]{comboInsur.getComboId()});
	}
	
	public int checkTComboInsurtypeAdd(TComboInsurtype comboInsur){
		String sql = "select * from t_combo_insurtype where combo_id=? and pricing_id=? ";
		return this.executeSQL(sql, new Object[]{comboInsur.getComboId(),comboInsur.getPricingId()});
	}
}
