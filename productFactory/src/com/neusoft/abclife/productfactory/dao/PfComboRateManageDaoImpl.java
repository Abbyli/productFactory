/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboRateManageDao_dao")
@ModelFile(value = "pfComboRateManageDao.dao")
public class PfComboRateManageDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboRateManageDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TObjRate> getTObjRate(String comboCode,String verNo){
		String sql = "select * from T_OBJ_RATE r where r.INSURTYPE_CODE = ? and r.VER_NO = ? and r.PRICING_LIAB_CODE is null";
		return this.queryForList(TObjRate.class, sql, new Object[]{comboCode,verNo});
	}
}
