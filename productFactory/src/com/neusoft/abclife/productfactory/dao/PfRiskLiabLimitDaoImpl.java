/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskLiabLimitDao_dao")
@ModelFile(value = "pfRiskLiabLimitDao.dao")
public class PfRiskLiabLimitDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskLiabLimitDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	//添加责任限额
	public void addLiabLimit(TLiabLimit tLiabLimit){
		Long seq = Long.parseLong(this.getSeq("SEQ_LIAB_LIMIT"));
		tLiabLimit.setId(seq);
		this.saveNew(tLiabLimit);
	}
	//修改责任限额
	public void updateLiabLimit(TLiabLimit tLiabLimit){
		this.saveUpdate(tLiabLimit);
	}
	//查询责任限额
	public List<TLiabLimit> queryTLiabLimit(String protecLiabCode,String limitType,Long riskVer){
		String sql = "select * from t_liab_limit where limit_type=? and protec_liab_code=? and risk_ver=?";
		List<TLiabLimit> list = this.queryForList(TLiabLimit.class, sql, new Object[]{limitType,protecLiabCode,riskVer});
		
		return list;
	}
	
	public void delTLiabLimit(TLiabLimit tLiabLimit){
		this.saveRemove(tLiabLimit);
	}
	
	
	 /* 检查添加重复
	 * @param tLiabLimit
	 * @return
	 */
	public boolean checkCodeAndName_add(TLiabLimit tLiabLimit){
		//根据参数来查询定价信息
		StringBuilder sql =new StringBuilder( "select * from t_liab_limit  where  limit_type=? and protec_liab_code=? and risk_ver=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tLiabLimit.getLimitType());
		params.add(tLiabLimit.getProtecLiabCode());
		params.add(tLiabLimit.getRiskVer());
		if(!StringUtils.isEmpty(tLiabLimit.getLimitTimeType())){
			sql.append(" and limit_time_type=? ");
			params.add(tLiabLimit.getLimitTimeType());
		}
		if(!StringUtils.isEmpty(tLiabLimit.getRefProtecLiabCode())){
			sql.append(" and ref_protec_liab_code=? ");
			params.add(tLiabLimit.getRefProtecLiabCode());
		}
		
		List<TLiabLimit> list = this.queryForList(TLiabLimit.class, sql.toString(), params.toArray());
		//如果小于1则不重复
		if(list.size()<1){
			return true;
		}else{
			return false;
		}
		
	}
	/**
	 * 检查修改重复
	 * @param tLiabLimit
	 * @return
	 */
	public boolean checkCodeAndName(TLiabLimit tLiabLimit){
		//根据参数来查询定价信息
		StringBuilder sql =new StringBuilder( "select * from t_liab_limit  where  limit_type=? and protec_liab_code=? and risk_ver=?");
		List<Object> params = new ArrayList<Object>();
		params.add(tLiabLimit.getLimitType());
		params.add(tLiabLimit.getProtecLiabCode());
		params.add(tLiabLimit.getRiskVer());
		if(!StringUtils.isEmpty(tLiabLimit.getLimitTimeType())){
			sql.append(" and limit_time_type=? ");
			params.add(tLiabLimit.getLimitTimeType());
		}
		if(!StringUtils.isEmpty(tLiabLimit.getRefProtecLiabCode())){
			sql.append(" and ref_protec_liab_code=? ");
			params.add(tLiabLimit.getRefProtecLiabCode());
		}
		List<TLiabLimit> list = this.queryForList(TLiabLimit.class, sql.toString(), params.toArray());
		boolean flag = false;
		//大于1重复
		if(list.size()>1){
			flag = false;
		}
		//等于1可能本身则不重复
		if(list.size()==1){
			if(list.get(0).getId().toString().equals(tLiabLimit.getId().toString())){
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
	
	
	
}
