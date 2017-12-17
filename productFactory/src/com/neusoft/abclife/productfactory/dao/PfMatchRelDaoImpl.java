/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.dto.ProMatchDto;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TProductInsurtypeMatchRel;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_pfMatchRelDao_dao")
@ModelFile(value = "pfMatchRelDao.dao")
public class PfMatchRelDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfMatchRelDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 分页查询产品搭配列表
	 * @param dto
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryProMatch(ProMatchDto dto,int pageNumber,int pageSize){
		String riskSql = "select distinct insurtype_code as proCode,insurtype_name as proName,main_cov_rider_flg as proType "+
				"from T_INSURTYPE_BASIC_INF b where main_cov_rider_flg is not null and insurtype_id in "+
				"(select assess_obj_id from T_PRODUCT_DEF_APPROVE t where flow_node_code not in 01  and assess_type=01) "+
				"and insurtype_status=1 ";
		String comboSql = "select distinct combo_code as proCode,combo_Name as proName,'03' as proType from t_combo_inf where 1=1 ";
		
		String type = dto.getProType();
		List<String> list = new ArrayList<String>();
		QueryResult qr = null;
		if("01".equals(type) || "02".equals(type)){
			if(!StringUtil.isEmpty(dto.getProCode())){
				riskSql += " and insurtype_code like '%"+dto.getProCode()+"%' ";
			}
			if(!StringUtil.isEmpty(dto.getProName())){
				riskSql += " and insurtype_name like '%"+dto.getProName()+"%'";
			}
			riskSql += " and main_cov_rider_flg = ? order by insurtype_code ";
			
			list.add(type);
			qr = this.queryForPageList(ProMatchDto.class, pageNumber, pageSize, riskSql, list.toArray());
		}
		if("03".equals(type)){
			if(!StringUtil.isEmpty(dto.getProCode())){
				comboSql += " and combo_code like '%"+dto.getProCode()+"%'";
			}
			if(!StringUtil.isEmpty(dto.getProName())){
				comboSql += " and combo_name like '%"+dto.getProName()+"%'";
			}
			comboSql += " order by combo_code ";
			qr = this.queryForPageList(ProMatchDto.class, pageNumber, pageSize, comboSql, list.toArray());
		}
		
		return qr;
		
	}
	
	

	/**
	 * 有效险种查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryMatchRel(TInsurtypeBasicInf tInsurtypeBasicInf,
			int pageNumber, int pageSize) {
		String sql = "select distinct insurtype_code,insurtype_name,insurtype_abbr,main_cov_rider_flg " + 
				"from T_INSURTYPE_BASIC_INF b where main_cov_rider_flg is not null and insurtype_id in " +
				"(select assess_obj_id from T_PRODUCT_DEF_APPROVE t where flow_node_code not in 01  and assess_type=01) " +
				"and insurtype_status=1";
		if (!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeCode())) {
			sql += "and b.insurtype_code like '%"
					+ tInsurtypeBasicInf.getInsurtypeCode() + "%' ";
		}
		if (!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeName())) {
			sql += "and b.insurtype_name like '%"
					+ tInsurtypeBasicInf.getInsurtypeName() + "%' ";
		}
		if (!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeAbbr())) {
			sql += "and b.insurtype_abbr like '%"
					+ tInsurtypeBasicInf.getInsurtypeAbbr() + "%' ";
		}
		if (!StringUtil.isEmpty(tInsurtypeBasicInf.getMainCovRiderFlg())) {
			sql += "and b.main_cov_rider_flg like '%"
					+ tInsurtypeBasicInf.getMainCovRiderFlg() + "%' ";
		}
		QueryResult qr = this.queryForPageList(TInsurtypeBasicInf.class,
				pageNumber, pageSize, sql, new Object[] {});

		return qr;
	}

	/**
	 * 主附险查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryAddition(ProMatchDto tInsurtypeBasicInf,String matchRel,
			int pageNumber, int pageSize) {
		QueryResult qr =null;
		if("01".equals(matchRel) || "03".equals(matchRel)){
			String sql = "select distinct insurtype_code,insurtype_name,insurtype_abbr,main_cov_rider_flg " +
					"from T_INSURTYPE_BASIC_INF where insurtype_code in "
				+ "(select assoc_product_code from T_PRODUCT_INSURTYPE_MATCH_REL where product_code=? ) ";
			qr = this.queryForPageList(TInsurtypeBasicInf.class,
				pageNumber, pageSize, sql, new Object[] { tInsurtypeBasicInf.getProCode()});
		}
		
		if("02".equals(matchRel)){
			String sql = "select distinct insurtype_code,insurtype_name,insurtype_abbr,main_cov_rider_flg " +
					"from T_INSURTYPE_BASIC_INF where insurtype_code in " +
					"(select assoc_product_code from T_PRODUCT_INSURTYPE_MATCH_REL where product_code=? )";
			qr = this.queryForPageList(TInsurtypeBasicInf.class,
				pageNumber, pageSize, sql, new Object[] { tInsurtypeBasicInf.getProCode() });
		}
		return qr;
		

	}

	/**
	 * 搭配表查一条
	 * @param basic
	 * @param addition
	 * @return
	 */
	public List<TProductInsurtypeMatchRel> queryMatchRow(String basic,
			String addition) {
		String sql = "select * from T_PRODUCT_INSURTYPE_MATCH_REL where"
				+ " product_code=? and assoc_product_code=?";
		List<TProductInsurtypeMatchRel> qr = this.queryForList(
				TProductInsurtypeMatchRel.class, sql, new Object[] { basic,
						addition });
		return qr;
	}

	/**
	 * 险种名称查询
	 * @param riskcode
	 * @return
	 */
	public QueryResult queryRiskName(String riskcode){
		String sql = "select distinct insurtype_code,insurtype_name from T_INSURTYPE_BASIC_INF " +
				"where insurtype_code=?";
		QueryResult qr = this.queryForPageList(TInsurtypeBasicInf.class, 1, 10, sql, new Object[]{riskcode});
		return qr;
	}
	
	/**
	 * 搭配信息添加
	 * @param pfMatchRel
	 * @param basic
	 */
	public void addAddition(TProductInsurtypeMatchRel pfMatchRel, String basic) {
		Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_MATCH_REL"));
		pfMatchRel.setProductInsurtypeMatchId(seq);
		pfMatchRel.setProductCode(basic);
		this.saveNew(pfMatchRel);
	}

	/**
	 * 搭配信息修改
	 * @param pfMatchRel
	 * @param basic
	 */
	public void updateAddition(TProductInsurtypeMatchRel pfMatchRel,
			String basic) {
		pfMatchRel.setProductCode(basic);
		this.saveUpdate(pfMatchRel);
	}

	/**
	 * 搭配信息删除
	 * @param basic
	 * @param addition
	 */
	public void delAddition(String basic, String addition) {
		String sql = "delete from T_PRODUCT_INSURTYPE_MATCH_REL where"
				+ " PRODUCT_CODE=? and ASSOC_PRODUCT_CODE=?";
		this.executeSQL(sql, new Object[] { basic, addition });
	}

	/**
	 * 数据校验
	 * @param pfMatchRel
	 * @param basic
	 * @return
	 */
	public String checkValue(TProductInsurtypeMatchRel pfMatchRel, String basic) {
		String sql = "select * from T_PRODUCT_INSURTYPE_MATCH_REL where"
				+ " PRODUCT_CODE=? and ASSOC_PRODUCT_CODE=?";
		List<Object> params = new ArrayList<Object>();
		params.add(basic);
		params.add(pfMatchRel.getAssocProductCode());
		List<TProductInsurtypeMatchRel> list = this.queryForList(
				TProductInsurtypeMatchRel.class, sql, params.toArray());
		if (list.size() > 0) {
			return "输入险种重复";
		}
		
		List<Object> params1 = new ArrayList<Object>();
		params1.add(pfMatchRel.getAssocProductCode());
		String sql1 = "select * from T_INSURTYPE_BASIC_INF where insurtype_id in " +
				"(select assess_obj_id from T_PRODUCT_DEF_APPROVE t where " +
				"flow_node_code not in 01  and assess_type=01) and " +
				"insurtype_status=1 and insurtype_code=?";
		List<TInsurtypeBasicInf> list1 = this.queryForList(
				TInsurtypeBasicInf.class, sql1, params1.toArray());
		if (list1.size() <1 ) {
			return "险种不存在";
		}
		
		String sql2 = "select * from T_INSURTYPE_BASIC_INF where " +
		"main_cov_rider_flg = '01' and insurtype_status=1 and insurtype_code=?";
		List<TInsurtypeBasicInf> list2 = this.queryForList(
				TInsurtypeBasicInf.class, sql2, params1.toArray());
		if (list2.size() > 0 ) {
			return "不能是主险";
		}	
		
		return "";
	}
}
