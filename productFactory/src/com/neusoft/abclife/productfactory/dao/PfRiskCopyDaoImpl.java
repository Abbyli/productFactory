/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail;
import com.neusoft.abclife.productfactory.entity.TFeeRate;
import com.neusoft.abclife.productfactory.entity.TGivepaidProcessDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeCustElemCtrl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TLiabFeeDef;
import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjRateDimenRef;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@SuppressWarnings("deprecation")
@Component("factoryabclife_pfRiskCopyDao_dao")
@ModelFile(value = "pfRiskCopyDao.dao")
public class PfRiskCopyDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskCopyDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	//获取定价
	public List<TPricingLiabDef> getTPricingLiabDefs(TInsurtypeBasicInf oldInsur){
		String sql = "select * from T_PRICING_LIAB_DEF where insurtype_id = ?";
		return this.queryForList(TPricingLiabDef.class, sql, new Object[]{oldInsur.getInsurtypeId()});
	}
	
	//获取风险扣费
	public List<TInsurtypeFeeDef> getTInsurtypeFeeDefs(Long id){
		String sql ="select * from T_INSURTYPE_FEE_DEF where pricing_liab_id=? ";
		return this.queryForList(TInsurtypeFeeDef.class, sql, new Object[]{id});
	}
	//获取责任加费
	public List<TLiabFeeDef> getTLiabFeeDefs(Long id){
		String sql = "select * from T_LIAB_FEE_DEF where pricing_liab_id=? ";
		return this.queryForList(TLiabFeeDef.class, sql, new Object[]{id});
	}
	//获取定价中的对象公式
	public List<TObjFormula> getPrcingFormulas(Long id){
		String sql = "select * from t_obj_formula where obj_id=? and type in ('A1','A2','B3','C1','C2')";
		return this.queryForList(TObjFormula.class, sql, new Object[]{id});
	}
	
	//获取对象入口
	public List<TObjEntrance> getTObjEntrances(String objSeq){
		String sql = "select * from t_obj_entrance where obj_seq=? ";
		return this.queryForList(TObjEntrance.class, sql, new Object[]{objSeq});
	}
	//获取对象参数
	public List<TObjParam> getTObjParams(String objSeq){
		String sql = "select * from t_obj_param where obj_seq = ? ";
		return this.queryForList(TObjParam.class, sql, new Object[]{objSeq});
	}
	
	
	//获取参数定义
	public List<TProductParamDef> getTProductParamDefs(TInsurtypeBasicInf oldInsur){
		String sql = "select * from t_product_param_def where entity_id=? ";
		return this.queryForList(TProductParamDef.class, sql, new Object[]{oldInsur.getInsurtypeId()});
	}
	//通过代码获取非定义状态险种
	public List<TInsurtypeBasicInf> getCodeInsur(String code){
		String sql= "select * from t_insurtype_basic_inf w" +
				"here insurtype_code =? and insurtype_id in " +
				"(select assess_obj_id from T_PRODUCT_DEF_APPROVE t " +
				"where flow_node_code not in 01 and assess_type=01) order by ver_no desc";
		return this.queryForList(TInsurtypeBasicInf.class, sql, new Object[]{code});
	}
	//通过代码和版本确定唯一险种
	public TInsurtypeBasicInf getOnlyInsur(String code,Long verNo){
		String sql = "select * from t_insurtype_basic_inf where insurtype_code = ? and ver_no = ?";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{code,verNo});
		
	}
	//保障责任
	public List<TProtecLiabDef> getTProtecLiabDefs(Long id){
		String sql = "select * from t_protec_liab_def where pricing_liab_id=? ";
		return this.queryForList(TProtecLiabDef.class, sql, new Object[]{id});
		
	}
	//账单明细
	public List<TClaimPayItemDetail> getTClaimPayItemDetails(Long id){
		String sql = "select * from T_CLAIM_PAY_ITEM_DETAIL where claim_givepay_id=? ";
		return this.queryForList(TClaimPayItemDetail.class, sql, new Object[]{id});
	}
	
	//精算数据定义表
	public List<TObjRate> getTObjRate(String oldInsurCode,Long verNo,String oldPricingLiabCode){
		String sql ="select * from t_obj_rate where insurtype_code=? and ver_no=? and pricing_liab_code=? ";
		return this.queryForList(TObjRate.class, sql, new Object[]{oldInsurCode,verNo,oldPricingLiabCode});
	}
	//精算维度表
	public List<TObjRateDimenRef> getTObjRateDimenRef(Long id){
		String sql =  "select * from t_obj_rate_dimen_ref where obj_rate_id=? order by order_num ";
		return this.queryForList(TObjRateDimenRef.class, sql, new Object[]{id});
	}
	//保存精算维度表
	public void saveTObjRateDimenRef(TObjRateDimenRef tObjRateDimenRef){
		Long seq = Long.parseLong(this.getSeq("SEQ_OBJ_RATE_DIMEN_REF"));
		tObjRateDimenRef.setId(seq);
		this.saveNew(tObjRateDimenRef);
	}
	//责任限额表
	public List<TLiabLimit> getTLiabLimit(String code,Long riskVer,String protecLiabCode){
		String sql = "select * from t_liab_limit where risk_code=? and risk_ver=? and protec_liab_code=? ";
		return this.queryForList(TLiabLimit.class, sql, new Object[]{code,riskVer,protecLiabCode});
	}
	//费用定义表
	public List<TInsurtypeFeeDef> getTInsurtypeFeeDef(Long insurtypeId){
		String sql = "select * from t_insurtype_fee_def where insurtype_id=? and fee_type not in 'B3' ";
		return this.queryForList(TInsurtypeFeeDef.class, sql, new Object[]{insurtypeId});
	}
	//费用费率表
	public List<TFeeRate> getTFeeRate(Long insurtypeId,String type){
		String sql = "select * from t_fee_rate where insurtype_id=? and fee_type=? ";
		return this.queryForList(TFeeRate.class, sql, new Object[]{insurtypeId,type});
		
	}
	//账户表
	public List<TInsurtypeAccDef> getTInsurtypeAccDef(Long insurtypeId){
		String sql = "select * from t_insurtype_acc_def s where s.insurtype_acc_id in " +
				"(select insurtype_accno_id from t_insurtype_rel_to_acc where insurtype_id=? )";
		return this.queryForList(TInsurtypeAccDef.class, sql, new Object[]{insurtypeId});
	}
	//投保要素
	public List<TObjSkelement> queryElement(Long pricingLiabId,String type){
		String sql = "select * from t_obj_skelement where duty_id = ? and type= ? ";
		return this.queryForList(TObjSkelement.class, sql, new Object[]{pricingLiabId,type});
	}
	//要素展现表
	public TPropShowDef queryshow(Long objId){
		String sql = "select * from t_prop_show_def where obj_id = ? ";
		return this.queryForObject(TPropShowDef.class, sql, new Object[]{objId});
	}
	//人员定义
	public List<TInsurtypeCustElemCtrl> queryTInsurtypeCustElemCtrl(Long riskId){
		String sql = "select * from t_insurtype_cust_elem_ctrl where insurtype_id=? ";
		return this.queryForList(TInsurtypeCustElemCtrl.class, sql, new Object[]{riskId});
	}
	//查询赔付后动作
	public List<TGivepaidProcessDef> queryGivepaid(Long givepayId){
		String sql = "select * from t_givepaid_process_def where givepay_id =? ";
		return this.queryForList(TGivepaidProcessDef.class, sql, new Object[]{givepayId});
	}
	//赔付后动作保存
	public void addGivepaid(TGivepaidProcessDef a){
		Long seq1 = Long.parseLong(this.getSeq("SEQ_GIVEPAID_PROCESS_DEF"));
		a.setGivepaidProcessId(seq1);
		this.saveNew(a);
	}
}
