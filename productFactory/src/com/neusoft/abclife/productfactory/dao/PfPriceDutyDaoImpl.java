/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TLiabFeeDef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TSuminsurIncrem;
import com.neusoft.abclife.productfactory.entity.TWaiveLiab;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_PfPriceDutyDao_dao")
@ModelFile(value = "PfPriceDutyDao.dao")
public class PfPriceDutyDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfPriceDutyDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 添加费用定义表
	 * @param feedef
	 */
	public void addFeeDefALiabFeeDefALiabDef(TInsurtypeFeeDef feedef){
		Long seqFeeDef = Long.parseLong(this.getSeq("SEQ_INSURTYPE_FEE_DEF"));
		feedef.setInsurtypeFeeId(seqFeeDef);
		this.saveNew(feedef);
	}
	/**
	 * 添加责任加费定义表
	 * @param liabFeeDef
	 */
	public void addTLiabFeeDef(List<TLiabFeeDef> liabFeeDef){
		for(TLiabFeeDef t:liabFeeDef){
			Long seqLiabFeeDef = Long.parseLong(this.getSeq("SEQ_LIAB_FEE_DEF"));
			t.setLiabAddpremId(seqLiabFeeDef);
			this.saveNew(t);
		}
		
	}
	
	/**
	 * 添加定价责任表
	 * @param liabDef
	 */
	public void addTPricingLiabDef(TPricingLiabDef liabDef){
		
		this.saveNew(liabDef);
	}
	/**
	 * 添加对象入口信息
	 * @param tObjEntrance
	 */
	public void addTObjEntrance(TObjEntrance tObjEntrance){
		Long seq = Long.parseLong(this.getSeq("SEQ_OBJ_ENTRANCE"));
		tObjEntrance.setId(seq);
		this.saveNew(tObjEntrance);
	}
	/**
	 * 添加对象公式信息
	 * @param tObjFormula
	 */
	public void addTObjFormula(TObjFormula tObjFormula){
		Long seq = Long.parseLong(this.getSeq("SEQ_OBJ_FORMULA"));
		tObjFormula.setId(seq);
		this.saveNew(tObjFormula);
	}
	
	/**
	 * 包含翻页的定价责任信息查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryPricingLiabDef(TInsurtypeBasicInf tInsurtypeBasicInf,int pageNumber,int pageSize){
		String sql = "select * from T_PRICING_LIAB_DEF where insurtype_id=? order by pricing_liab_code";
		QueryResult qr = this.queryForPageList(TPricingLiabDef.class, pageNumber, pageSize, sql, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		return qr;
	}
	
	/**
	 * 删除加费 费用信息
	 * @param tPricingLiabDef
	 */
	public void delFeeDef(TPricingLiabDef tPricingLiabDef){
		//删除责任加费表
		String sql1 = "delete from t_liab_fee_def  where insurtype_id=? and  pricing_liab_id=?";
		this.executeSQL(sql1, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabId()});
		//删除险种费用表
		String sql2 = "delete from t_insurtype_fee_def  where insurtype_id=? and pricing_liab_id=?";
		this.executeSQL(sql2,new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabId()});
		
		
	}
	
	public void delTObjSkelement(TPricingLiabDef tPricingLiabDef){
		//删除与要素相关的展现表
		String sql4 = "select * from t_obj_skelement where duty_id=?";
		List<TObjSkelement> list = this.queryForList(TObjSkelement.class, sql4,  new Object[]{tPricingLiabDef.getPricingLiabId()});
		for(TObjSkelement obj:list){
			String sql5 = "delete from t_prop_show_def where obj_id=?";
			this.executeSQL(sql5, new Object[]{obj.getId()});
		}
		
		//删除要素表
		String sql3 = "delete from t_obj_skelement  where  duty_id=?";
		this.executeSQL(sql3, new Object[]{tPricingLiabDef.getPricingLiabId()});
	}
	//删除对象入口和对象公式信息
	public void delTobjEntance(TPricingLiabDef tPricingLiabDef){
		String sql = "select * from T_OBJ_FORMULA t where obj_id=? and (type='A1' or type='A2' or type='B0' or type='C1' or type='C2')";
		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql, new Object[]{tPricingLiabDef.getPricingLiabId()});
		String sql2 = "select * from T_OBJ_ENTRANCE t where obj_seq = ?";
		if(list.size()>0){
		List<TObjEntrance> list2 = this.queryForList(TObjEntrance.class, sql2, new Object[]{list.get(0).getObjSeq()});
		for(int i=0;i<list2.size();i++){
			this.saveRemove(list2.get(i));
		}
		}
		for(int i=0;i<list.size();i++){
			this.saveRemove(list.get(i));
		}
		
	}
	
	public void delTPricingLiabDef(TPricingLiabDef tPricingLiabDef){
		//删除定价责任表
		this.saveRemove(tPricingLiabDef);
	}
	
	public void updatePrcingLiabDef(TPricingLiabDef tPricingLiabDef){
		this.saveUpdate(tPricingLiabDef);
	}
	
	/**
	 * 查询责任加费定义表数据
	 * @param tPricingLiabDef
	 * @return
	 */
	public List<TLiabFeeDef> queryLiabFeeDef(TPricingLiabDef tPricingLiabDef){
		String sql = "select * from t_liab_fee_def where insurtype_id=? and  pricing_liab_id=?";
		List<TLiabFeeDef> list =  this.queryForList(TLiabFeeDef.class, sql, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabId()});
		return list;
	}
	
	
	/**
	 * 查询单个责任加费定义表数据
	 * @param tPricingLiabDef
	 * @return
	 */
	public TLiabFeeDef queryOneLiabFeeDef(TPricingLiabDef tPricingLiabDef,String type){
		String sql = "select * from t_liab_fee_def where insurtype_id=? and  pricing_liab_id=? and addprem_type=? ";
		TLiabFeeDef list =  this.queryForObject(TLiabFeeDef.class, sql, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabId(),type});
		if(list==null){
			return new TLiabFeeDef();
		}
		
		return list;
	}
	
	
	
	
	/**
	 * 查询费用定义表
	 * @param tPricingLiabDef
	 * @return
	 */
	public TInsurtypeFeeDef queryInsurtypeFeeDef(TPricingLiabDef tPricingLiabDef){
		String sql="select * from t_insurtype_fee_def where insurtype_id=? and  pricing_liab_id=?";
		TInsurtypeFeeDef t = this.queryForObject(TInsurtypeFeeDef.class, sql, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabId()});
		if(t==null){
			return new TInsurtypeFeeDef();
		}else{
			return t;
		}
		
	}
	
	
	/**
	 * 检查添加定价编码或者定价名称重复
	 * @param tPricingLiabDef
	 * @return
	 */
	public boolean checkCodeAndName_add(TPricingLiabDef tPricingLiabDef){
		//根据参数来查询定价信息
		StringBuilder sql = new StringBuilder( "select * from t_pricing_liab_def  where insurtype_id=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tPricingLiabDef.getInsurtypeId());
		if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabCode()) && !StringUtils.isEmpty(tPricingLiabDef.getPricingLiabName())){
			sql.append(" and (pricing_liab_code = ? or pricing_liab_name = ?)");
			params.add(tPricingLiabDef.getPricingLiabCode());
			params.add(tPricingLiabDef.getPricingLiabName());
			
		}else if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabCode())){
			sql.append(" and pricing_liab_code = ?");
			params.add(tPricingLiabDef.getPricingLiabName());
		}else if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabName())){
			sql.append(" and pricing_liab_name = ?");
			params.add(tPricingLiabDef.getPricingLiabName());
		}
		
		
		List<TPricingLiabDef> list = this.queryForList(TPricingLiabDef.class, sql.toString(), params.toArray());
		//如果小于1则不重复
		if(list.size()<1){
			return true;
		}else{
			return false;
		}
		
	}
	/**
	 * 检查修改定价编码或者定价名称重复
	 * @param tPricingLiabDef
	 * @return
	 */
	public boolean checkCodeAndName(TPricingLiabDef tPricingLiabDef){
		//根据参数来查询定价信息
		StringBuilder sql = new StringBuilder( "select * from t_pricing_liab_def  where insurtype_id=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tPricingLiabDef.getInsurtypeId());
		if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabCode()) && !StringUtils.isEmpty(tPricingLiabDef.getPricingLiabName())){
			sql.append(" and (pricing_liab_code = ? or pricing_liab_name = ?)");
			params.add(tPricingLiabDef.getPricingLiabCode());
			params.add(tPricingLiabDef.getPricingLiabName());
			
		}else if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabCode())){
			sql.append(" and pricing_liab_code = ?");
			params.add(tPricingLiabDef.getPricingLiabName());
		}else if(!StringUtils.isEmpty(tPricingLiabDef.getPricingLiabName())){
			sql.append(" and pricing_liab_name = ?");
			params.add(tPricingLiabDef.getPricingLiabName());
		}
		
		
		
		List<TPricingLiabDef> list = this.queryForList(TPricingLiabDef.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		//大于1重复
		if(list.size()>1){
			flag = false;
		}
		//等于1可能本身则不重复
		if(list.size()==1){
			if(list.get(0).getPricingLiabId().toString().equals(tPricingLiabDef.getPricingLiabId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		//小于1不重复
		if(list.size()<1){
			flag = true;
		}
		return flag;
	}

	public void addTWaiveLiab(TWaiveLiab tWaiveLiab) {
		tWaiveLiab.setId(Long.parseLong(this.getSeq("SEQ_WAIVE_LIAB")));
		this.saveNew(tWaiveLiab);
	}

	public void addTSuminsurIncrem(TSuminsurIncrem tSuminsurIncrem) {
		tSuminsurIncrem.setId(Long.parseLong(this.getSeq("SEQ_SUMINSUR_INCREM")));
		this.saveNew(tSuminsurIncrem);
	}

	public TWaiveLiab queryTWaiveLiab(TPricingLiabDef tPricingLiabDef) {
		String sql="select * from T_WAIVE_LIAB t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		return this.queryForObject(TWaiveLiab.class, sql, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabCode()});
	}

	public TSuminsurIncrem queryTSuminsurIncrem(TPricingLiabDef tPricingLiabDef) {
		String sql="select * from T_SUMINSUR_INCREM t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		return this.queryForObject(TSuminsurIncrem.class, sql, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabCode()});

	}
	
	public TWaiveLiab queryTWaiveLiab(TWaiveLiab tWaiveLiab) {
		String sql="select * from T_WAIVE_LIAB t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		return this.queryForObject(TWaiveLiab.class, sql, new Object[]{tWaiveLiab.getInsurtypeId(),tWaiveLiab.getLiabCode()});
	}

	public TSuminsurIncrem queryTSuminsurIncrem(TSuminsurIncrem tSuminsurIncrem) {
		String sql="select * from T_SUMINSUR_INCREM t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		return this.queryForObject(TSuminsurIncrem.class, sql, new Object[]{tSuminsurIncrem.getInsurtypeId(),tSuminsurIncrem.getLiabCode()});

	}

	public void upTWaiveLiab(TWaiveLiab tWaiveLiab) {
		//String sql = "update T_WAIVE_LIAB set INSURTYPE_CODE=?,WAIVE_OBJ=?,WAIVE_TYPE=? where INSURTYPE_ID=? and LIAB_CODE =?";
		TWaiveLiab tWaiveLiabN = this.queryTWaiveLiab(tWaiveLiab);
		if(tWaiveLiabN == null){
			this.addTWaiveLiab(tWaiveLiab);
		}else{
			tWaiveLiab.setId(tWaiveLiabN.getId());
			this.saveUpdate(tWaiveLiab);
		}
	}

	public void upTSuminsurIncrem(TSuminsurIncrem tSuminsurIncrem) {
		//String sql = "update T_SUMINSUR_INCREM set INSURTYPE_CODE=?,INCREM_WAY =?,INCREM_FREQ=?,INCREM_PROPOR=? where INSURTYPE_ID=? and LIAB_CODE =?";
		TSuminsurIncrem tSuminsurIncremN = this.queryTSuminsurIncrem(tSuminsurIncrem);
		if(tSuminsurIncremN == null){
			this.addTSuminsurIncrem(tSuminsurIncrem);
		}else{
			tSuminsurIncrem.setId(tSuminsurIncremN.getId());
			this.saveUpdate(tSuminsurIncrem);	
		}
	}

	public void delTWaiveLiab(TWaiveLiab tWaiveLiab) {
		String sql = "DELETE from T_WAIVE_LIAB t where t.INSURTYPE_ID=? and  t.LIAB_CODE=?";
		this.executeSQL(sql, new Object[]{tWaiveLiab.getInsurtypeId(),tWaiveLiab.getLiabCode()});
	}
	
	public void delTSuminsurIncrem(TSuminsurIncrem tSuminsurIncrem) {
		String sql = "DELETE from T_SUMINSUR_INCREM t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		this.executeSQL(sql,new Object[]{tSuminsurIncrem.getInsurtypeId(),tSuminsurIncrem.getLiabCode()});
	}

	/**
	 * 删除豁免责任表、保额递增表
	 * @param tPricingLiabDef
	 */
	public void delTwaTsum(TPricingLiabDef tPricingLiabDef) {
		
		String sql1 = "DELETE from T_WAIVE_LIAB t where t.INSURTYPE_ID=? and  t.LIAB_CODE=?";
		this.executeSQL(sql1, new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabCode()});
		
		String sql2 = "DELETE from T_SUMINSUR_INCREM t where t.INSURTYPE_ID=? and t.LIAB_CODE=?";
		this.executeSQL(sql2,new Object[]{tPricingLiabDef.getInsurtypeId(),tPricingLiabDef.getPricingLiabCode()});
	}	
	
}
