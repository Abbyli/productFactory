/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TRuleManageDef;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Neusoft
 *
 */
@Component("factoryabclife_PfTermManagementDao_dao")
@ModelFile(value = "PfTermManagementDao.dao")
public class PfTermManagementDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfTermManagementDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	public QueryResult queryApprove(TInsurtypeBasicInf tInsurtypeBasicInf,
			int pageNumber, int pageSize) {
		// 查询险种状态
		String sql = "select * from T_INSURTYPE_BASIC_INF b "
				+ "where b.insurtype_status= 1 and b.insurtype_id in "
				+ "(select t.assess_obj_id from T_PRODUCT_DEF_APPROVE t "
				+ "where t.assess_type='01' and t.flow_node_code='02') ";
		if (!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeCode())) {
			sql += "and b.INSURTYPE_CODE like '%"
					+ tInsurtypeBasicInf.getInsurtypeCode() + "%' ";
		}
		if (tInsurtypeBasicInf.getVerNo()!=null) {
			sql += "and b.VER_NO like '%"
					+ tInsurtypeBasicInf.getVerNo() + "%' ";

		}
		sql += "order by b.INSURTYPE_CODE, b.VER_NO asc";
		QueryResult qr = this.queryForPageList(TInsurtypeBasicInf.class,
				pageNumber, pageSize, sql, new Object[] {});
		return qr;
	}

	public QueryResult getTRuleManageDef(
			TInsurtypeBasicInf tInsurtypeBasicInf,int pageNumber, int pageSize) {
		String sql="select * from T_RULE_MANAGE_DEF b where b.PRODUCT_ID = ? ";
		sql += "order by b.PRODUCT_ID ";
		QueryResult qr = this.queryForPageList(TRuleManageDef.class,
				pageNumber, pageSize, sql, new Object[] {tInsurtypeBasicInf.getInsurtypeId()});
		return qr;
	}

	
	public int delTRuleManageDef(TRuleManageDef tRuleManageDef) {
		return this.saveRemove(tRuleManageDef);
	}

	public int saveTRuleManageDef(String fileName, TInsurtypeBasicInf tInsurtypeBasicInf) {
		TRuleManageDef tRuleManageDef = new TRuleManageDef();
		tRuleManageDef.setRuleManageId(Long.parseLong(this.getSeq("SEQ_RULE_MANAGE_DEF")));
		tRuleManageDef.setProductId(tInsurtypeBasicInf.getInsurtypeId());
		tRuleManageDef.setProductType("01");
		tRuleManageDef.setRuleName(fileName);
		tRuleManageDef.setUploadTime(new Date());
		tRuleManageDef.setDownloadPath(tInsurtypeBasicInf.getInsurtypeId().toString());
		return this.saveNew(tRuleManageDef);
	}	
	
	
}
