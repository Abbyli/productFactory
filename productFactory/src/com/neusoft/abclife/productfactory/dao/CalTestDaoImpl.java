/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Component("factoryabclife_calTestDao_dao")
@ModelFile(value = "calTestDao.dao")
public class CalTestDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public CalTestDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	public TInsurtypeBasicInf getInsur(String code,String verNo){
		String sql = "select * from t_insurtype_basic_inf where insurtype_code=? and ver_no=? ";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{code,verNo});
	}
	public List<TPricingLiabDef> getTPricingLiabDefs(Long id){
		String sql = "select * from t_pricing_liab_def where insurtype_id = ? ";
		return this.queryForList(TPricingLiabDef.class, sql, new Object[]{id});
	}
	
	public List<TInsurtypeBasicInf> getInsurCode(String code){
		String sql = "select * from t_insurtype_basic_inf where insurtype_code=? and insurtype_status=1 order by ver_no desc ";
		return this.queryForList(TInsurtypeBasicInf.class, sql, new Object[]{code});
	}
	public List<TSurvvGivepayDef> getSurvvGivepay(Long id){
		String sql = "select * from t_survv_givepay_def where protec_liab_id = ? ";
		return this.queryForList(TSurvvGivepayDef.class, sql, new Object[]{id});
	}
}
