/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjRateDimenRef;
import com.neusoft.abclife.util.excelUpload;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Component("factoryabclife_pfRiskRateManageDao_dao")
@ModelFile(value = "pfRiskRateManageDao.dao")
public class PfRiskRateManageDaoImpl extends BaseDao implements excelUpload{

	protected String getTemplateName() {
		return "dataSource";
	}

	public PfRiskRateManageDaoImpl() {}
	
	/**
	 * 查询对象费率表
	 * */
	public List<TObjRate> queryRiskRateById(String insurtypeCode, String verNo, String pricingLiabCode) {
		String sql = "select * from T_OBJ_RATE r where r.INSURTYPE_CODE = ? and r.VER_NO = ? and r.PRICING_LIAB_CODE = ? ";
		List<TObjRate> list = this.queryForList(TObjRate.class, sql, new Object[]{insurtypeCode, verNo, pricingLiabCode});
		return list;
	}
	
	/**
	 * 查询对象费率表 维度数据
	 * */
	public List<TObjRateDimenRef> queryRiskRateDimenRefById(String objRateId) {
		String sql = "select * from T_OBJ_RATE_DIMEN_REF r where r.OBJ_RATE_ID = ? order by order_num ";
		List<TObjRateDimenRef> list = this.queryForList(TObjRateDimenRef.class, sql, new Object[]{objRateId});
		return list;
	}
	
	/**
	 * 查询维度表
	 * */
	public List<TDimensionDef> queryTDimensionDefs(String rateType, String matchFlag) {
		String sql = "select * from T_DIMENSION_DEF d where d.RATE_TYPE = ? and d.MATCH_FLAG = ? order by order_num";
		List<TDimensionDef> list = this.queryForList(TDimensionDef.class, sql, new Object[]{rateType, matchFlag});
		return list;
	}
	
	/**
	 * 校验对象费率表
	 * */
	public List<TObjRate> checkRiskRate(String insurtypeCode, String verNo,
			String pricingLiabCode, String rateType) {
		List<String> param = new ArrayList<String>();
		param.add(insurtypeCode);
		param.add(verNo);
		param.add(rateType);
		String sql = "select * from T_OBJ_RATE r where r.INSURTYPE_CODE = ? and r.VER_NO = ? " +
				" and r.RATE_TYPE = ? ";
		if(pricingLiabCode != null && !"".equals(pricingLiabCode)){
			sql +=" and r.PRICING_LIAB_CODE = ? ";
			param.add(pricingLiabCode);
		}
		
		List<TObjRate> list = this.queryForList(TObjRate.class, sql, 
				param.toArray());
		return list;
	}
	
	/**
	 * 保存对象费率表
	 * */
	public void saveTObjRate(TObjRate tObjRate) {
		tObjRate.setId(Long.parseLong(this.getSeq("SEQ_OBJ_RATE")));
		this.saveNew(tObjRate);		
	}
	
	/**
	 * 删除对象费率表
	 * */
	public void delTObjRate(TObjRate tObjRate) {	
		this.saveRemove(tObjRate);		
	}
	
	/**
	 * 保存对象费率表维度表
	 * */
	public void saveTObjRateDimenRef(List<TObjRateDimenRef> conditionCol,
			TObjRate tObjRate) {
		for(int i = 0; i < conditionCol.size(); i++){			
			TObjRateDimenRef dimenRef = conditionCol.get(i);
			dimenRef.setId(Long.parseLong(this.getSeq("SEQ_OBJ_RATE_DIMEN_REF")));
			dimenRef.setObjRateId(tObjRate.getId());
			this.saveNew(dimenRef);	
		}
	}
	
	/**
	 * 删除对象费率表维度表
	 * */
	public void delTObjRateDimenRef(TObjRate tObjRate) {
		String sql = "delete from T_OBJ_RATE_DIMEN_REF t where t.OBJ_RATE_ID = ?";
		this.executeSQL(sql, new Object[]{tObjRate.getId()});
	}
	
	/**
	 * 创建表
	 * */
	public void saveTable(String sql) {
		this.executeSQL(sql, new Object[]{});		
	}
	
	/**
	 * 删除表
	 * */
	public void delTable(TObjRate tObjRate) {
		String sql = "drop table "+tObjRate.getTableName();
		this.executeSQL(sql, new Object[]{});		
	}
	
	/**
	 * 删除表数据
	 * */
	public void delTableDatas(TObjRate tObjRate) {
		String sql = "delete from "+tObjRate.getTableName();
		this.executeSQL(sql, new Object[]{});		
	}
	
	/**
	 * 插入表数据  旧
	 * */
	public void saveTableDatas(String sql, List<Object[]> insertList) {
//		String sql = "insert into R_RT_680101 (XB, ZYLB, BXQJ, BXQJDW, VAL)values(?,?,?,?,?)";
//		List<Object[]> list = new ArrayList<Object[]>(){
//			{
//				add(new Object[]{"1","a","b","c","100"});
//				add(new Object[]{"1","a","b","c","200"});
//			}
//		};
		this.batchUpdate(sql, insertList);
	}
	
	/**
	 * 插入表数据 新 20161215
	 * */
	@Override
	public void saveTableDatasBatch(String sql, List<Object[]> insertList) {
		this.batchUpdate(sql, insertList);
	}
	
	/**
	 * 查询精算数据表信息
	 * @param tableName
	 * @return
	 */
	public SqlRowSet getRateTable(String tableName){
		String sql = "select * from "+tableName;
		SqlRowSet srs = this.queryForRowSet(sql);
		return srs;
	}
}
