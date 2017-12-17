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
import com.neusoft.abclife.productfactory.entity.TRiskamntTypeDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskAmntTypeDao_dao")
@ModelFile(value = "pfRiskAmntTypeDao.dao")
public class PfRiskAmntTypeDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskAmntTypeDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	//添加风险保额类型
	public void addPfRiskAmntTypeDaoImpl(TRiskamntTypeDef tRiskamntTypeDef){
		Long seq = Long.parseLong(this.getSeq("SEQ_RISKAMNT_TYPE_DEF"));
		tRiskamntTypeDef.setId(seq);
		this.saveNew(tRiskamntTypeDef);
	}
	//翻页查询所有风险保额
	public QueryResult getAllPfRiskAmntTypeDaoImpl(int pageNumber,int pageSize){
		String sql="select * from T_RISKAMNT_TYPE_DEF";
		QueryResult qr = this.queryForPageList(TRiskamntTypeDef.class, pageNumber, pageSize, sql);
		return qr;
	}
	//修改风险保额类型
	public void updatePfRiskAmntTypeDaoImpl(TRiskamntTypeDef tRiskamntTypeDef){
		this.saveUpdate(tRiskamntTypeDef);
	}
	//删除风险保额类型
	public void delPfRiskAmntTypeDaoImpl(TRiskamntTypeDef tRiskamntTypeDef){
		this.saveRemove(tRiskamntTypeDef);
	}
	//查询所有风险保额类型
	public List<TRiskamntTypeDef> getAllRiskAmntType(){
		String sql="select * from T_RISKAMNT_TYPE_DEF order by riskamnt_type";
		List<TRiskamntTypeDef> list = this.queryForList(TRiskamntTypeDef.class, sql);
		
		return list;
	}
	
	/**
	 * 检查修改
	 * @param tRiskamntTypeDef
	 * @return
	 */
	public boolean checkCodeAndName(TRiskamntTypeDef tRiskamntTypeDef){
		//根据参数查询信息
		StringBuilder sql = new StringBuilder( "select * from T_RISKAMNT_TYPE_DEF where 1=1");
		List<Object> params = new ArrayList<Object>();
		if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntName()) && !StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntType())){
			sql.append(" and (riskamnt_name=? or riskamnt_type=?)");
			params.add(tRiskamntTypeDef.getRiskamntName());
			params.add(tRiskamntTypeDef.getRiskamntType());
			
		}else if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntType())){
			sql.append(" and riskamnt_type = ?");
			params.add(tRiskamntTypeDef.getRiskamntType());
		}else if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntName())){
			sql.append(" and riskamnt_name = ?");
			params.add(tRiskamntTypeDef.getRiskamntName());
		}
		
		
		List<TRiskamntTypeDef> list = this.queryForList(TRiskamntTypeDef.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		//大于1数据重复
		if(list.size()>1){
			flag = false;
		}
		//等于1数据可能本身则不重复
		if(list.size()==1){
			if(list.get(0).getId().toString().equals(tRiskamntTypeDef.getId().toString())){
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
	/**
	 * 检查添加
	 * @param tRiskamntTypeDef
	 * @return
	 */
	public boolean checkCodeAndName_add(TRiskamntTypeDef tRiskamntTypeDef){
		//根据参数查询数据
		StringBuilder sql = new StringBuilder( "select * from T_RISKAMNT_TYPE_DEF where 1=1");
		List<Object> params = new ArrayList<Object>();
		if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntName()) && !StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntType())){
			sql.append(" and (riskamnt_name=? or riskamnt_type=?)");
			params.add(tRiskamntTypeDef.getRiskamntName());
			params.add(tRiskamntTypeDef.getRiskamntType());
			
		}else if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntType())){
			sql.append(" and riskamnt_type = ?");
			params.add(tRiskamntTypeDef.getRiskamntType());
		}else if(!StringUtils.isEmpty(tRiskamntTypeDef.getRiskamntName())){
			sql.append(" and riskamnt_name = ?");
			params.add(tRiskamntTypeDef.getRiskamntName());
		}
		
		
		List<TRiskamntTypeDef> list = this.queryForList(TRiskamntTypeDef.class, sql.toString(), params.toArray());
		//小于1不重复
		if(list.size()<1){
			return true;
		}else{
			return false;
		}
		
	}
	
	
}
