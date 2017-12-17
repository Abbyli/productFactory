/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TFeeRate;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskFeeManageDao_dao")
@ModelFile(value = "pfRiskFeeManageDao.dao")
public class PfRiskFeeManageDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskFeeManageDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 添加费率信息
	 * @param tFeeRate
	 */
	public void addTFeeRate(TFeeRate tFeeRate){
		Long seqFeeDef = Long.parseLong(this.getSeq("SEQ_FEE_RATE"));
		tFeeRate.setId(seqFeeDef);
		this.saveNew(tFeeRate);
	}
	
	/**
	 * 添加费用定义
	 * @param tInsurtypeFeeDef
	 */
	
	public void addTInsurtypeFeeDef(TInsurtypeFeeDef tInsurtypeFeeDef){
		Long seqFeeDef = Long.parseLong(this.getSeq("SEQ_INSURTYPE_FEE_DEF"));
		tInsurtypeFeeDef.setInsurtypeFeeId(seqFeeDef);
		this.saveNew(tInsurtypeFeeDef);
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
	 * 修改费用定义
	 * @param tInsurtypeFeeDef
	 */
	public void updateTInsurtypeFeeDef(TInsurtypeFeeDef tInsurtypeFeeDef){
		this.saveUpdate(tInsurtypeFeeDef);
	}
	
	/**
	 * 删除所有费率信息
	 * @param feeType
	 * @param insurtypeId
	 */
	public void deleteAllTFeeRate(String feeType,Long insurtypeId){
		String sql = "delete from t_fee_rate  where fee_type=? and insurtype_id=?";
		this.executeSQL(sql, new Object[]{feeType,insurtypeId});
	}
	
	//删除对象入口和对象公式信息
	public void delTobjEntance(TInsurtypeFeeDef tInsurtypeFeeDef){
		String sql = "select * from T_OBJ_FORMULA t where obj_id=? and type=?";
		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql,
				new Object[]{tInsurtypeFeeDef.getInsurtypeId(),tInsurtypeFeeDef.getFeeType()});
		String sql2 = "select * from T_OBJ_ENTRANCE t where obj_seq = ?";
		if(list.size()>0){
		List<TObjEntrance> list2 = this.queryForList(TObjEntrance.class, sql2,
				new Object[]{list.get(0).getObjSeq()});
		for(int i=0;i<list2.size();i++){
			this.saveRemove(list2.get(i));
		}
		}
		for(int i=0;i<list.size();i++){
			this.saveRemove(list.get(i));
		}
		
	}
	
	/**
	 * 查询费用定义
	 * @param feeType
	 * @param insurtypeId
	 * @return
	 */
	public TInsurtypeFeeDef queryTInsurtypeFeeDef(String feeType,Long insurtypeId){
		String sql = "select * from t_insurtype_fee_def where fee_type=? and insurtype_id=?";
		TInsurtypeFeeDef list = this.queryForObject(TInsurtypeFeeDef.class, sql, new Object[]{feeType,insurtypeId});
		return list;
	}
	/**
	 * 查询费率信息
	 * @param feeType
	 * @param insurtypeId
	 * @return
	 */
	public List<TFeeRate> queryTFeeRate(String feeType,Long insurtypeId){
		
		String sql = "select * from t_fee_rate  where fee_type=? and insurtype_id=? order by pricing_liab_code,begin_year";
		List<TFeeRate> list=this.queryForList(TFeeRate.class, sql, new Object[]{feeType,insurtypeId});
		return list;
		
	}
	
	/**
	 * 删除费率信息
	 * @param tFeeRate
	 */
	public void deleteTFeeRate(TFeeRate tFeeRate){
		this.saveRemove(tFeeRate);
	}
	/**
	 * 删除所有费率信息
	 * @param tInsurtypeFeeDef
	 */
	public void deleteAllTFeeRate(TInsurtypeFeeDef tInsurtypeFeeDef){
		String sql = "delete from t_fee_rate where fee_type = ? and insurtype_id=? ";
		this.executeSQL(sql, new Object[]{tInsurtypeFeeDef.getFeeType(),tInsurtypeFeeDef.getInsurtypeId()});
	}
	
	/**
	 * 检查修改
	 * @param tInsurtypeFeeDef
	 * @return
	 */
	public boolean checkCodeAndName(TInsurtypeFeeDef tInsurtypeFeeDef){
		StringBuilder sql =new StringBuilder( "select * from T_INSURTYPE_FEE_DEF t where t.insurtype_id = ?");
		List<Object> params = new ArrayList<Object>();
		params.add(tInsurtypeFeeDef.getInsurtypeId());
		
		if(!StringUtils.isEmpty(tInsurtypeFeeDef.getFeeCode())){
			sql.append("and t.fee_code = ?");
			params.add(tInsurtypeFeeDef.getFeeCode());
		}
		
		List<TInsurtypeFeeDef> list = this.queryForList(TInsurtypeFeeDef.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		if(list.size()>1){
			flag = false;
		}
		if(list.size()==1){
			if(list.get(0).getInsurtypeFeeId().toString().equals(tInsurtypeFeeDef.getInsurtypeFeeId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		
		if(list.size()<1){
			flag = true;
		}
		
		return flag;
		
	}
	/**
	 * 检查添加
	 * @param tInsurtypeFeeDef
	 * @return
	 */
	public boolean checkCodeAndName_add(TInsurtypeFeeDef tInsurtypeFeeDef){
		StringBuilder sql =new StringBuilder( "select * from T_INSURTYPE_FEE_DEF t where t.insurtype_id = ?");
		List<Object> params = new ArrayList<Object>();
		params.add(tInsurtypeFeeDef.getInsurtypeId());
		
		if(!StringUtils.isEmpty(tInsurtypeFeeDef.getFeeCode())){
			sql.append("and t.fee_code = ?");
			params.add(tInsurtypeFeeDef.getFeeCode());
		}
		
		List<TInsurtypeFeeDef> list = this.queryForList(TInsurtypeFeeDef.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		if(list.size()<1){
			flag = true;
		}else{
			flag = false;
		}
		
		return flag;
	}
	
	
}

	
	
