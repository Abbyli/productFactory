/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TComboAttrib;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeRelToAcc;
import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProInterfaceRef;
import com.neusoft.abclife.productfactory.entity.TProductInsurtypeMatchRel;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.abclife.productfactory.entity.TWaiveLiab;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 *
 */
@SuppressWarnings("deprecation")
@Component("factoryabclife_testDao_dao")
@ModelFile(value = "testDao.dao")
public class WebServiceDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public WebServiceDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 获取险种信息
	 * @param riskID
	 * @return
	 */
	public TInsurtypeBasicInf queryRisk(Long riskID){
		String sql = "select * from T_INSURTYPE_BASIC_INF where insurtype_id=? order by ver_no desc";
		TInsurtypeBasicInf risk = this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{riskID});
		return risk;
	}
	public TInsurtypeBasicInf queryRiskByCode(String riskCode){
		String sql = "select * from T_INSURTYPE_BASIC_INF where insurtype_code=? order by ver_no desc";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{riskCode});
	}
	/**
	 * 获取搭配险种信息
	 * @param riskID
	 * @return
	 */
	public TInsurtypeBasicInf queryAddRisk(String riskCode){
		String sql = "select * from t_insurtype_basic_inf t where t.insurtype_status=1 " +
				"and insurtype_code = ? " +
//				"and insurtype_id in" +
//				"(select product_id from t_product_status_inf f where product_status not in (01,02,03)) " +
				"order by ver_no desc";
		TInsurtypeBasicInf risk = this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{riskCode});
		
		return risk;
	}
	
	/**
	 * 获取定价责任信息
	 * @param priceDuty
	 * @return
	 */
	public List<TPricingLiabDef> priceDuty(Long priceDuty){
		String sql = "select * from T_PRICING_LIAB_DEF t where insurtype_id=?";	
		List<TPricingLiabDef> price =this.queryForList(TPricingLiabDef.class, sql, new Object[]{priceDuty});
		
		return price;
	}

	/**
	 * 获取定价要素基本信息
	 * @param riskId
	 * @return
	 */
	public List<TObjSkelement> getPriceElement(Long priceId,String type){
		String sql = "select * from t_obj_skelement where duty_id=? and type=?";
		List<TObjSkelement> list = this.queryForList(TObjSkelement.class, sql, new Object[]{priceId,type});
		
		return list;
	}
	
	/**
	 * 获取属性展示信息
	 * @param riskId
	 * @return
	 */
	public TPropShowDef getProperty(Long property){
		String sql = "select * from t_prop_show_def where obj_id=?";
		TPropShowDef param = this.queryForObject(TPropShowDef.class, sql, new Object[]{property});
		
		return param;
	}
	
	/**
	 * 获取保障责任
	 * @param priceId
	 * @return
	 */
	public List<TProtecLiabDef> prestDuty(Long priceId){
		String sql = "select * from t_protec_liab_def t where pricing_liab_id=?";	
		List<TProtecLiabDef> prest =this.queryForList(TProtecLiabDef.class, sql, new Object[]{priceId});
		
		return prest;
	}
	
	/**
	 * 获取理赔给付信息
	 * @param priceId
	 * @return
	 */
	public List<TClaimGivepayDef> getClaimPay(Long protecId){
		String sql = "select * from t_claim_givepay_def t where protec_liab_id=?";	
		List<TClaimGivepayDef> prest =this.queryForList(TClaimGivepayDef.class, sql, new Object[]{protecId});
		
		return prest;
	}
	
	/**
	 * 获取生存给付信息
	 * @param priceId
	 * @return
	 */
	public List<TSurvvGivepayDef> getLivePay(Long protecId){
		String sql = "select * from t_survv_givepay_def where protec_liab_id=?";	
		List<TSurvvGivepayDef> prest =this.queryForList(TSurvvGivepayDef.class, sql, new Object[]{protecId});
		
		return prest;
	}
	
	/**
	 * 获取搭配信息
	 * @param priceId
	 * @return
	 */
	public List<TProductInsurtypeMatchRel> getMatch(String match){
		String sql = "select * from T_PRODUCT_INSURTYPE_MATCH_REL where PRODUCT_CODE=?";	
		List<TProductInsurtypeMatchRel> prest =this.queryForList(TProductInsurtypeMatchRel.class, sql, new Object[]{match});
		
		return prest;
	}
	
	/**
	 * 获取参数定义信息
	 * @param priceId
	 * @return
	 */
	public List<TProductParamDef> getParam(String riskId,String paramType,String ascrib){
		String sql = "select * from t_product_param_def where entity_id=? and param_type=? and ascrib_hierar=? ";	
		List<TProductParamDef> prest =this.queryForList(TProductParamDef.class, sql, new Object[]{riskId,paramType,ascrib});
		
		return prest;
	}
	/**
	 * 查定价责任
	 * @param riskId
	 * @param dutyCode
	 * @return
	 */
	public TPricingLiabDef getTPricingLiabDef(Long riskId,String dutyCode){
		String sql = "select * from t_pricing_liab_def d where d.insurtype_id=? and d.pricing_liab_code=? ";
		return this.queryForObject(TPricingLiabDef.class, sql, new Object[]{riskId,dutyCode});
	}
	public List<TObjFormula> getTObjFormula(Long dutyId){
		String sql = "select * from t_obj_formula where type like 'E1%' and obj_id=? ";
		return this.queryForList(TObjFormula.class, sql, new Object[]{dutyId});
	}
	//获取所有险种
	public List<TInsurtypeBasicInf> getAllInsurtypeBasicInf(){
		String sql = "select * from t_insurtype_basic_inf t where t.main_cov_rider_flg='01' ";
		return this.queryForList(TInsurtypeBasicInf.class, sql);
	}
	//获取所有组合
	public List<TComboInf> getAllComboInf(){
		String sql = "select * from t_combo_inf where 1=1 ";
		return this.queryForList(TComboInf.class, sql);
	}
	//根据ID查某个组合
	public TComboInf getComboInf(String id){
		String sql = "select * from t_combo_inf where combo_id=? ";
		return this.queryForObject(TComboInf.class, sql, new Object[]{id});
	}
	
	
	//根据ID查询在售列表
	public TProInterfaceRef getProInter(String id){
		String sql = "select * from t_pro_interface_ref where pro_id = ? ";
		return this.queryForObject(TProInterfaceRef.class, sql, new Object[]{id});
	}
	
	//查询有效的产品列表
	public List<TProInterfaceRef> getAllProInter(){
		String sql = "select * from t_pro_interface_ref where pro_type not in ('3') and pro_status = '1' order by pro_code";
		return this.queryForList(TProInterfaceRef.class, sql);
	}
	//获取组合下的险种信息
	public List<TInsurtypeBasicInf> getComboInsur(String comboId){
		String sql = "select * from t_insurtype_basic_inf where insurtype_id in "+
		"(select distinct(insurtype_id) from t_combo_insurtype t where combo_id=? )";
		return this.queryForList(TInsurtypeBasicInf.class, sql, new Object[]{comboId});
	}
	//获取组合下的定价
	public List<TPricingLiabDef> getComboPricing(Long riskId,String comboId){
		String sql = "select * from t_pricing_liab_def where insurtype_id = ? and pricing_liab_code in "+
			"(select pricing_code from t_combo_insurtype where insurtype_id=? and combo_id=?)";
		return this.queryForList(TPricingLiabDef.class, sql, new Object[]{riskId,riskId,comboId});
	}
	//获取组合下险种
	public List<TComboInsurtype> getComboInsurtypeByid(String comboID){
		String sql = "select distinct insurtype_id,insurtype_code from t_combo_insurtype where combo_id = ? ";
		return this.queryForList(TComboInsurtype.class, sql, new Object[]{comboID});
	}
	//获取组合下的定价
	public List<TComboInsurtype> getComboInsurtypeByInsurId(String comboID,Long insurtypeId){
		String sql = "select * from t_combo_insurtype where combo_id=? and insurtype_id=? ";
		return this.queryForList(TComboInsurtype.class,sql, new Object[]{comboID,insurtypeId});
	}
	//查询组合属性
	public TComboAttrib getComboInfAttrib(String comboID){
		String sql = "select * from t_combo_attrib where combo_id = ? ";
		return this.queryForObject(TComboAttrib.class, sql, new Object[]{comboID});
	}
	
	//获取险种下账户中间表
	public List<TInsurtypeAccDef> getInsurToAcc(String insurtypeId){
		String sql = "select * from t_insurtype_acc_def where insurtype_acc_id in "+
					"(select insurtype_accno_id from t_insurtype_rel_to_acc where insurtype_id = ?)";
		return this.queryForList(TInsurtypeAccDef.class, sql, new Object[]{insurtypeId});
	}
	/**
	 * 表外费率用从大到小
	 * @return
	 */
	public  SqlRowSet queryRateMax(String tableName,Set<Entry<String, Object>> set){
		String sql = getRateMaxSQL(tableName,set);
		Object[] param = getRateQuerySQLAttr(set);
		return this.queryForRowSet(sql, param);
	}
	/**
	 * 表外费率用从小到大
	 * @return
	 */
	public  SqlRowSet queryRateMin(String tableName,Set<Entry<String, Object>> set){
		String sql = getRateMinSQL(tableName,set);
		Object[] param = getRateQuerySQLAttr(set);
		return this.queryForRowSet(sql, param);
	}
	/**
	 * 从大到小查
	 * @param tableName
	 * @param set
	 * @return
	 */
	private String getRateMaxSQL(String tableName,Set<Entry<String, Object>> set){
		String sql = "select * from "+tableName+" r where 1=1";
		for(Map.Entry<String, Object> entry: set){
			String key = entry.getKey();
			Object value = entry.getValue();
			if(value != null && !"appAge".equals(key)){
				sql += " and r."+key+" = ?";
			}
			
		}
		sql +=" order by to_number(appage) desc";
		return sql;
	}
	
	
	/**
	 * 从小到大查
	 * @param tableName
	 * @param set
	 * @return
	 */
	private String getRateMinSQL(String tableName,Set<Entry<String, Object>> set){
		String sql = "select * from "+tableName+" r where 1=1";
		for(Map.Entry<String, Object> entry: set){
			String key = entry.getKey();
			Object value = entry.getValue();
			if(value != null && !"appAge".equals(key)){
				sql += " and r."+key+" = ?";
			}
			
		}
		sql +=" order by to_number(appage) asc";
		return sql;
	}
	/**
	 * 参数
	 * @param set
	 * @return
	 */
	private Object[] getRateQuerySQLAttr(Set<Entry<String, Object>> set) {
		List<Object> list = new ArrayList<Object>();
		for(Map.Entry<String, Object> entry: set){
			Object value = entry.getValue();
			String key = entry.getKey();
			if(value != null && !key.equals("appAge")){
				list.add(value);
			}
		}	
		return list.toArray();
	}
	/**
	 * 查询责任限额
	 */
	public List<TLiabLimit> queryLiabLimit(String limitType,String riskCode,String riskVer,String pricingLiabCode,
			String protecLiabCode,String refProtecLiabCode){
		StringBuilder sql = new StringBuilder("select * from t_liab_limit where limit_type=? ");
		List<Object> list = new ArrayList<Object>();
		list.add(limitType);
		if(StringUtil.isNotEmpty(riskCode)){
			sql.append(" and risk_code=? ");
			list.add(riskCode);
		}
		if(StringUtil.isNotEmpty(riskVer)){
			sql.append(" and risk_ver=? ");
			list.add(riskVer);
		}
		if(StringUtil.isNotEmpty(pricingLiabCode)){
			sql.append(" and pricing_liab_code=? ");
			list.add(pricingLiabCode);
		}
		if(StringUtil.isNotEmpty(protecLiabCode)){
			sql.append(" and protec_liab_code=?");
			list.add(protecLiabCode);
		}
		if(StringUtil.isNotEmpty(refProtecLiabCode)){
			sql.append(" and ref_protec_liab_code like '%"+refProtecLiabCode+"%' ");
		}
		return this.queryForList(TLiabLimit.class, sql.toString(), list.toArray());
	}
	/**
	 * 是否扣费
	 * @param pricingLiabId
	 * @return
	 */
	public int getFeeFlag (Long pricingLiabId){
		String sql = "select * from t_insurtype_fee_def where fee_type='B0'and pricing_liab_id=? ";
		return this.executeSQL(sql, new Object[]{pricingLiabId});
	}
	/**
	 * 豁免责任
	 * @param riskId
	 * @param dutyCode
	 * @return
	 */
	public TWaiveLiab getWaiveLiab(String riskId,String dutyCode){
		String sql = "select * from t_waive_liab where insurtype_id=? and liab_code=? ";
		return this.queryForObject(TWaiveLiab.class, sql, new Object[]{riskId,dutyCode});
	}
	/**
	 * 保全属性
	 */
	public TInsurtypePsAttribDef getPsAttrib(String riskId){
		String sql = "select * from t_insurtype_ps_attrib_def where insurtype_id = ? ";
		return this.queryForObject(TInsurtypePsAttribDef.class, sql, new Object[]{riskId});
	}
}
