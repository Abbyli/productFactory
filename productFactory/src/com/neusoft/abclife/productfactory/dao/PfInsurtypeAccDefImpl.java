/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeRelToAcc;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *对于账户业务
 */
@SuppressWarnings("deprecation")
@Component("factoryabclife_PfInsurtypeAccDef_dao")
@ModelFile(value = "PfInsurtypeAccDef.dao")
public class PfInsurtypeAccDefImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfInsurtypeAccDefImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 通过传入险种基本信息查询账户
	 * @param insurtypebasicinfid
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	
	public QueryResult getPfInsurtypeAccDefs(TInsurtypeBasicInf insurtypebasicinf,int pageNumber,int pageSize){
		String sql="select d.* from t_insurtype_acc_def d join t_insurtype_rel_to_acc r " +
				" on d.INSURTYPE_ACC_ID=r.insurtype_accno_id" 
				+" where r.insurtype_id=? order by INSURTYPE_ACC_CODE";
//		Long id=insurtypebasicinf.getInsurtypeId();
//		if(insurtypebasicinf==null){
//		id=0l;
//		}
		QueryResult qr = this.queryForPageList(TInsurtypeAccDef.class, pageNumber, pageSize, sql, new Object[]{insurtypebasicinf.getInsurtypeId()});
		
		return qr;
	}
	
	/**
	 * 通过哦险种信息和账户信息添加账户以及中间表
	 * @param basic
	 * @param insurtypeAccDef
	 */
	public void addPfInsurtypeAccDef(TInsurtypeBasicInf basic,TInsurtypeAccDef insurtypeAccDef){
		if("002".equals(insurtypeAccDef.getInsurtypeAccType())){
			Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_ACC_DEF"));
			insurtypeAccDef.setInsurtypeAccId(seq);
			insurtypeAccDef.setInsurtypeAccOwner("1");
			insurtypeAccDef.setRateType("2");
			insurtypeAccDef.setIsProvision("0");
			this.saveNew(insurtypeAccDef);
		}
		Long seq1 = Long.parseLong(this.getSeq("SEQ_INSURTYPE_REL_TO_ACC"));
		TInsurtypeRelToAcc reltoacc =new TInsurtypeRelToAcc();
		reltoacc.setInsurtypeAccAssocId(seq1);
		reltoacc.setInsurtypeAccnoId(insurtypeAccDef.getInsurtypeAccId());
		reltoacc.setInsurtypeId(basic.getInsurtypeId());
		this.saveNew(reltoacc);
	}
	/**
	 * 通过账户和险种信息 删除中间表与账户表中数据
	 * @param basic
	 * @param insurtypeAccDef
	 */
	@SuppressWarnings("unchecked")
	public void delPfInsurtypeAccDef(TInsurtypeBasicInf basic,TInsurtypeAccDef insurtypeAccDef){
		List params = new ArrayList();
		String sql="delete from t_insurtype_rel_to_acc r where r.insurtype_id=? and r.insurtype_accno_id=?";
		params.add(basic.getInsurtypeId());
		params.add(insurtypeAccDef.getInsurtypeAccId());
		this.executeSQL(sql, params.toArray());
		if("002".equals(insurtypeAccDef.getInsurtypeAccType())){
			this.saveRemove(insurtypeAccDef);
		}
		
	}
	/**
	 * 修改账户
	 * @param insurtypeAccDef
	 */
	
	public void updatePfInsurtypeAccDef(TInsurtypeAccDef insurtypeAccDef){
		this.saveUpdate(insurtypeAccDef);
	}
	
	/**
	 * 检查修改账户编码或者账户名称重复
	 * @param insurtypeAccDef
	 * @return
	 */
	public boolean checkCodeAndName(TInsurtypeAccDef insurtypeAccDef,TInsurtypeBasicInf basic){
		//根据参数来查询账户信息
		StringBuilder sql =new StringBuilder( "select d.* from t_insurtype_acc_def d join t_insurtype_rel_to_acc r on d.insurtype_acc_id=r.insurtype_accno_id where r.insurtype_id=?");
		List<Object> params = new ArrayList<Object>();
		params.add(basic.getInsurtypeId());
		if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccCode()) && !StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccName())){
			sql.append(" and (d.INSURTYPE_ACC_CODE = ? or d.INSURTYPE_ACC_NAME = ?)");
			params.add(insurtypeAccDef.getInsurtypeAccCode());
			params.add(insurtypeAccDef.getInsurtypeAccName());
			
		}else if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccCode())){
			sql.append(" and d.INSURTYPE_ACC_CODE = ?");
			params.add(insurtypeAccDef.getInsurtypeAccCode());
		}else if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccName())){
			sql.append(" and d.INSURTYPE_ACC_NAME = ?");
			params.add(insurtypeAccDef.getInsurtypeAccName());
		}
		
		
		List<TInsurtypeAccDef> list = this.queryForList(TInsurtypeAccDef.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		//如果大于1账户重复
		if(list.size()>1){
			flag = false;
		}
		//如果等于1可能重复可能是本身
		if(list.size()==1){
			if(list.get(0).getInsurtypeAccId().toString().equals(insurtypeAccDef.getInsurtypeAccId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		//如果小于1肯定不重复
		if(list.size()<1){
			flag = true;
		}
		
		return flag;
		
	}
	/**
	 * 检查添加账户编码或者账户名称重复
	 * @param insurtypeAccDef
	 * @return
	 */
	public boolean checkCodeAndName_add(TInsurtypeAccDef insurtypeAccDef,TInsurtypeBasicInf basic){
		StringBuilder sql =new StringBuilder( "select d.* from t_insurtype_acc_def d join t_insurtype_rel_to_acc r on d.insurtype_acc_id=r.insurtype_accno_id where r.insurtype_id=?");
		List<Object> params = new ArrayList<Object>();
		params.add(basic.getInsurtypeId());
		if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccCode()) && !StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccName())){
			sql.append(" and (d.INSURTYPE_ACC_CODE = ? or d.INSURTYPE_ACC_NAME = ?)");
			params.add(insurtypeAccDef.getInsurtypeAccCode());
			params.add(insurtypeAccDef.getInsurtypeAccName());
			
		}else if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccCode())){
			sql.append(" and d.INSURTYPE_ACC_CODE = ?");
			params.add(insurtypeAccDef.getInsurtypeAccCode());
		}else if(!StringUtils.isEmpty(insurtypeAccDef.getInsurtypeAccName())){
			sql.append(" and d.INSURTYPE_ACC_NAME = ?");
			params.add(insurtypeAccDef.getInsurtypeAccName());
		}
		
		List<TInsurtypeAccDef> list = this.queryForList(TInsurtypeAccDef.class, sql.toString(), params.toArray());
		
		if(list.size()<1){
			return true;
		}else{
			return false;
		}
		
	}
	
	public TInsurtypeAccDef queryTInsurtypeAccDefByType(String type){
		String sql = "select *  from t_insurtype_acc_def where insurtype_acc_type= ?";
		return this.queryForObject(TInsurtypeAccDef.class, sql, new Object[]{type});
	}
}
