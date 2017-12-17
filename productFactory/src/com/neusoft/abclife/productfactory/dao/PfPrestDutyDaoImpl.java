/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TGivepaidProcessDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
/**
 * @author neusoft
 *
 */
@Component("factoryabclife_pfPrestDutyDao_dao")
@ModelFile(value = "pfPrestDutyDao.dao")
public class PfPrestDutyDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfPrestDutyDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 定价责任查询
	 * @param insurtypebasciinf
	 * @return
	 */
	public List<TPricingLiabDef> getPfInsurtypePrest(
			TInsurtypeBasicInf insurtypebasciinf) {
		String sql = "select * from T_PRICING_LIAB_DEF where insurtype_id=? order by pricing_liab_code";

		List<TPricingLiabDef> list = this.queryForList(
				TPricingLiabDef.class, sql, new Object[] { insurtypebasciinf
						.getInsurtypeId() });
		return list;
	}

	/**
	 * 保障责任查询 分页
	 * @param priceDutyId
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryPriceDutyId(Long priceDutyId, int pageNumber,
			int pageSize) {
		String sql = "select * from t_protec_liab_def where pricing_liab_id=? order by protec_liab_code ";
		QueryResult qr = this.queryForPageList(TProtecLiabDef.class,
				pageNumber, pageSize, sql, new Object[] {priceDutyId});
		return qr;
	}
	
	/**
	 * 保障责任查询 无分页
	 * @param priceDutyId
	 * @return
	 */
	public List<TProtecLiabDef> queryPriceDutyIdNoPage(Long priceDutyId) {
		String sql = "select * from t_protec_liab_def where pricing_liab_id=? order by protec_liab_code ";
		List<TProtecLiabDef> list = this.queryForList(TProtecLiabDef.class, sql, new Object[] {priceDutyId});
		return list;
	}
	
	public List<TClaimGivepayDef> queryClaim(Long tqueryClaim) {
		String sql = "select * from t_claim_givepay_def where protec_liab_id=? order by accid_occur_reason,claim_claim_pay_type ";
		List<TClaimGivepayDef> qr = this.queryForList(TClaimGivepayDef.class, sql, new Object[] {tqueryClaim});
		return qr;
	}

	/**
	 * 保障责任添加
	 * @param prest
	 */
	public void addPrest(TProtecLiabDef prest) {
		Long seq = Long.parseLong(this.getSeq("SEQ_PROTEC_LIAB_DEF"));
		prest.setProtecLiabId(seq);
		this.saveNew(prest);
	}
	
	/**
	 * 校验数据库数据重复
	 * @param prest
	 * @return
	 */
	public boolean checkValue(TProtecLiabDef prest){
		String sql ="select * from t_protec_liab_def where pricing_liab_id=? and(protec_Liab_code=? or protec_Liab_name=?)";
		List<Object> params = new ArrayList<Object>();
		params.add(prest.getPricingLiabId());
		params.add(prest.getProtecLiabCode());
		params.add(prest.getProtecLiabName());
		List<TProtecLiabDef> list = this.queryForList(TProtecLiabDef.class, sql,params.toArray());
		if(list.size()==0){
			return true;
		}
		return false;
	}
	
	//理赔处理后的多条添加
	public void prestClaimdual(TClaimGivepayDef prestClaim,List<String> givePaid,String protecLiabType){
		for(int i=0,j=givePaid.size();i<j;i++){
			Long seq1 = Long.parseLong(this.getSeq("SEQ_GIVEPAID_PROCESS_DEF"));
			TGivepaidProcessDef prestGivePaid =new TGivepaidProcessDef();
			prestGivePaid.setGivepaidProcessId(seq1);
			prestGivePaid.setGivepaidActionType(givePaid.get(i));
			prestGivePaid.setGivepayId(prestClaim.getClaimGivepayId());
			prestGivePaid.setProtecLiabType(protecLiabType);
			prestGivePaid.setProtecLiabCode(prestClaim.getProtecLiabCode());
			prestGivePaid.setGivepayCode(prestClaim.getClaimGivepayCode());
			this.saveNew(prestGivePaid);
		}
	}

	//理赔重复性校验
	public int checkClaimParam(TClaimGivepayDef prestClaim) {
		String sql = "select * from t_claim_givepay_def " +
		"where protec_Liab_id =? and claim_claim_pay_type=? and accid_occur_reason=? ";
		int claimParam = this.executeSQL(sql,
		new Object[] { prestClaim.getProtecLiabId(),
				prestClaim.getClaimClaimPayType(),prestClaim.getAccidOccurReason() });
		
		
		return claimParam;
	}
	public int checkClaimParam2(TClaimGivepayDef prestClaim) {
	String sql2 = "select * from t_claim_givepay_def " +
	"where protec_Liab_id =?  and claim_givepay_name=?";
	int claimCode = this.executeSQL(sql2, new Object[]{prestClaim.getProtecLiabId(),prestClaim.getClaimGivepayName()});
	return claimCode;
	}
	
	public int checkClaimParam3(TClaimGivepayDef prestClaim) {
		String sql2 = "select * from t_claim_givepay_def " +
		"where protec_Liab_id =?  and claim_givepay_code=?";
		int claimCode = this.executeSQL(sql2, new Object[]{prestClaim.getProtecLiabId(),prestClaim.getClaimGivepayCode()});
		return claimCode;
		}
	
	/**
	 * 理赔给付添加
	 * @param prestClaim
	 * @param givePaid
	 * @param protecLiabType
	 */
	public void addPrestClaim(TClaimGivepayDef prestClaim,List<String> givePaid,String protecLiabType){
		Long seq = Long.parseLong(this.getSeq("SEQ_CLAIM_GIVEPAY_DEF"));
		prestClaim.setClaimGivepayId(seq);
		this.saveNew(prestClaim);
		prestClaimdual(prestClaim,givePaid,protecLiabType);

	}

	/**
	 * 理赔给付修改
	 * @param prestClaim
	 * @param givePaid
	 * @param protecLiabType
	 */
	public void updatePrestClaim(TClaimGivepayDef prestClaim,List<String> givePaid,String protecLiabType){
		this.saveUpdate(prestClaim);
		
		//删除理赔处理后动作
		TGivepaidProcessDef prestGivePaid =new TGivepaidProcessDef();
		String sql = "delete from T_GIVEPAID_PROCESS_DEF where givepay_id=?";
		this.executeSQL(sql, new Object[]{prestClaim.getClaimGivepayId()});
		this.saveRemove(prestGivePaid);
		prestClaimdual(prestClaim,givePaid,protecLiabType);
	}
	
	/**
	 * 给付后查询
	 * @param givepatId
	 * @return
	 */
	public List<TGivepaidProcessDef> queryGivePaid(String givepatId){
		String sql = "select * from T_GIVEPAID_PROCESS_DEF where givepay_id=?";
		List<TGivepaidProcessDef> qr = this.queryForList(TGivepaidProcessDef.class, sql, givepatId);
		return qr;
		
	}
	
	/**
	 * 添加生存给付信息
	 * @param tSurvvGivepayDef
	 */
	
	public void addTSurvvGivepayDef(TSurvvGivepayDef tSurvvGivepayDef){
		Long seq = Long.parseLong(this.getSeq("SEQ_SURVV_GIVEPAY_DEF"));
		tSurvvGivepayDef.setSurvvGivepayId(seq);
		this.saveNew(tSurvvGivepayDef);
	}
	
	/**
	 * 理赔和给付后删除
	 * @param tdelClaim
	 */
	public void delPrestClaim(TClaimGivepayDef tdelClaim){
		this.saveRemove(tdelClaim);
		
		TGivepaidProcessDef prestGivePaid =new TGivepaidProcessDef();
		String sql = "delete from T_GIVEPAID_PROCESS_DEF where givepay_id=?";
		this.executeSQL(sql, new Object[]{tdelClaim.getClaimGivepayId()});
		this.saveRemove(prestGivePaid);

	}
	/**
	 * 生存给付信息查询
	 * @param tProtecLiabDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TSurvvGivepayDef> queryTSurvvGivepayDef(Long id){
		String sql="select * from T_SURVV_GIVEPAY_DEF g where g.protec_liab_id=? order by g.survv_givepay_type ";
		List<TSurvvGivepayDef> list = this.queryForList(TSurvvGivepayDef.class, sql, new Object[]{id});
		return list;
	}
	/**
	 * 删除生存给付信息
	 * @param tSurvvGivepayDef
	 */
	public void delTSurvvGivepayDef(TSurvvGivepayDef tSurvvGivepayDef){
		this.saveRemove(tSurvvGivepayDef);
	}
	
	/**
	 * 修改生存给付信息
	 * @param tSurvvGivepayDef
	 */
	public void updateTSurvvGivepayDef(TSurvvGivepayDef tSurvvGivepayDef){
		this.saveUpdate(tSurvvGivepayDef);
	}
	
	/**
	 * 保障责任删除
	 * @param tProtecLiabDef
	 */
	public void delTProtecLiabDef(TProtecLiabDef tProtecLiabDef){
		String sql="";
		
		if("1".equals(tProtecLiabDef.getProtecLiabType())){
			sql="delete from t_claim_givepay_def  where protec_liab_id = ?";
		}
		if("0".equals(tProtecLiabDef.getProtecLiabType())){
			sql="delete from T_SURVV_GIVEPAY_DEF g where g.protec_liab_id=?";
		}
		this.executeSQL(sql, new Object[]{tProtecLiabDef.getProtecLiabId()});
		
		this.saveRemove(tProtecLiabDef);
	}
	/**
	 * 对象公式数据查询
	 * @param id
	 * @param type
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TObjFormula> getTObjFormula(Long id,String type){
		String sql="select * from t_obj_formula where obj_id=? and type like ?";
		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql, new Object[]{id,type});
		return list;
	}
	/**
	 * 删除对象公式 参数 相关性 入口对象数据
	 * @param objId
	 * @param type
	 */
	public void delAllformulaparamrelation(Long objId, String type){
		//删除入口对象 
		String sql4 = "delete from T_OBJ_ENTRANCE t where t.OBJ_SEQ " +
			"in (select f.OBJ_SEQ from T_OBJ_FORMULA f where f.OBJ_ID = ? and f.TYPE = ? )";
		this.executeSQL(sql4, new Object[]{objId,type});
		//删除对象公式信息
		String sql1 = "delete from t_obj_formula where obj_id=? and type=?";
		//删除对象参数信息
		String sql2 = "delete from t_obj_param where obj_id=? and type=?"; 
		//删除对象相关性信息
		String sql3 = "delete from t_obj_relation where obj_id=? and type=?";
		this.executeSQL(sql1, new Object[]{objId,type});
		this.executeSQL(sql2, new Object[]{objId,type});
		this.executeSQL(sql3, new Object[]{objId,type});
		
	}
	//删除所有账单明细
	public void delAllAccDetail(Long objId){
		String sql = "delete from T_CLAIM_PAY_ITEM_DETAIL t where t.claim_givepay_id = ?";
		this.executeSQL(sql, new Object[]{objId});
	}
	
	public List<TProtecLiabDef> getAllProtecLiab(){
		String sql = "select * from t_protec_liab_def ";
		return this.queryForList(TProtecLiabDef.class, sql);
	}
	
	
	/**
	 * 检查修改
	 * @param tSurvvGivepayDef
	 * @return
	 */
	public boolean checkTSurvvGivepayDefNameUpdate(TSurvvGivepayDef tSurvvGivepayDef){
		//根据参数来查询账户信息
		StringBuilder sql = new StringBuilder("select * from t_survv_givepay_def s where s.protec_liab_id=?");
		StringBuilder sql3 = new StringBuilder("select * from t_survv_givepay_def s where s.protec_liab_id=?");
		List<Object> params = new ArrayList<Object>();
		List<Object> params3 = new ArrayList<Object>();
		params.add(tSurvvGivepayDef.getProtecLiabId());
		params3.add(tSurvvGivepayDef.getProtecLiabId());
		if(!StringUtils.isEmpty(tSurvvGivepayDef.getSurvvGivepayName())){
			sql.append("  and s.survv_givepay_name=?");
			params.add(tSurvvGivepayDef.getSurvvGivepayName());
		}
		if(!StringUtils.isEmpty(tSurvvGivepayDef.getSurvvGivepayCode())){
			sql3.append(" and s.survv_givepay_code=? ");
			params3.add(tSurvvGivepayDef.getSurvvGivepayCode());
		}
		
		List<TSurvvGivepayDef> list = this.queryForList(TSurvvGivepayDef.class, sql.toString(), params.toArray());
		List<TSurvvGivepayDef> list3 = this.queryForList(TSurvvGivepayDef.class, sql3.toString(), params3.toArray());
		
		boolean flag = false;
		//如果大于1账户重复
		if(list.size()>1||list3.size()>1){
			flag = false;
		}
		//如果等于1可能重复可能是本身
		else if(list.size()==1&& list3.size()==1){
			if(list.get(0).getSurvvGivepayId().toString().equals(tSurvvGivepayDef.getSurvvGivepayId().toString())
					&& list3.get(0).getSurvvGivepayId().toString().equals(tSurvvGivepayDef.getSurvvGivepayId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		else if(list.size()==1){
			if(list.get(0).getSurvvGivepayId().toString().equals(tSurvvGivepayDef.getSurvvGivepayId().toString())
					&& list3.size() <1){
				flag=true;
			}else{
				flag = false;
			}
		}
		else if(list3.size()==1){
			if(list.size() <1
					&& list3.get(0).getSurvvGivepayId().toString().equals(tSurvvGivepayDef.getSurvvGivepayId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		//如果小于1肯定不重复
		else if(list.size()<1  && list3.size()<1){
			flag = true;
		}
		
		return flag;
		
	}
	/**
	 * 检查添加
	 * @param tSurvvGivepayDef
	 * @return
	 */
	public boolean checkTSurvvGivepayDefNameAdd(TSurvvGivepayDef tSurvvGivepayDef){
		//根据参数来查询账户信息
		StringBuilder sql = new StringBuilder("select * from t_survv_givepay_def s where s.protec_liab_id=?");
		StringBuilder sql3 = new StringBuilder("select * from t_survv_givepay_def s where s.protec_liab_id=?");
		List<Object> params = new ArrayList<Object>();
		List<Object> params3 = new ArrayList<Object>();
		params.add(tSurvvGivepayDef.getProtecLiabId());
		params3.add(tSurvvGivepayDef.getProtecLiabId());
		if(!StringUtils.isEmpty(tSurvvGivepayDef.getSurvvGivepayName())){
			sql.append("  and s.survv_givepay_name=?");
			params.add(tSurvvGivepayDef.getSurvvGivepayName());
		}
		if(!StringUtils.isEmpty(tSurvvGivepayDef.getSurvvGivepayCode())){
			sql3.append(" and s.survv_givepay_code=? ");
			params3.add(tSurvvGivepayDef.getSurvvGivepayCode());
		}
		
		List<TSurvvGivepayDef> list = this.queryForList(TSurvvGivepayDef.class, sql.toString(), params.toArray());
		List<TSurvvGivepayDef> list3 = this.queryForList(TSurvvGivepayDef.class, sql3.toString(), params3.toArray());
		
		if(list.size()<1 && list3.size()<1){
			return true;
		}else{
			return false;
		}
		
		
		
	}
	
	
}
