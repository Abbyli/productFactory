/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TComboAttrib;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboAttriDao_dao")
@ModelFile(value = "pfComboAttriDao.dao")
public class PfComboAttriDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboAttriDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public void addComboAttri(TComboAttrib comboAtt){
		Long seq = Long.parseLong(this.getSeq("SEQ_COMBO_ATTRIB"));
		comboAtt.setComboAttribId(seq);
		this.saveNew(comboAtt);
	}
	
	public void updComboAttri(TComboAttrib comboAtt){
		this.saveUpdate(comboAtt);
	}
	
	
	public TComboAttrib queryComboAttrib(TComboInf comboInf){
		String sql = "select * from t_combo_attrib where combo_id = ? ";
		return this.queryForObject(TComboAttrib.class, sql, new Object[]{comboInf.getComboId()});
	}
	
	public List<TComboInsurtype> getTComboInsurtype(TComboInf comboInf){
		String sql = "select * from t_combo_insurtype where combo_id=? ";
		return this.queryForList(TComboInsurtype.class, sql, new Object[]{comboInf.getComboId()});
	}
	public TInsurtypeBasicInf getInsurInf(Long id){
		String sql = "select * from t_insurtype_basic_inf where insurtype_id = ? ";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{id});
	}
}
