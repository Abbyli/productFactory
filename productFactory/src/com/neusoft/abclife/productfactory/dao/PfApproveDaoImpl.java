/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.dto.ProApproveDTO;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TProductDefApply;
import com.neusoft.abclife.productfactory.entity.TProductDefApprove;
import com.neusoft.abclife.productfactory.entity.TProductStatusInf;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_pfApproveDao_dao")
@ModelFile(value = "pfApproveDao.dao")
public class PfApproveDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfApproveDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 审核查询
	 * 
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryApproveByInsur(ProApproveDTO insur,
			int pageNumber, int pageSize) {
		// 查询险种状态处于险种定义 update by shi.chl
		String sql = "select insurtype_id as proId,insurtype_code as proCode,ver_no as proVer,insurtype_name as proName,'01' as proType " 
				+ "from t_insurtype_basic_inf b "
				+ "where b.insurtype_status= 1 and b.insurtype_id in "
				+ "(select t.assess_obj_id from T_PRODUCT_DEF_APPROVE t "
				+ "where t.assess_type='01' and t.flow_node_code='02') ";
		if (!StringUtil.isEmpty(insur.getProName())) {
			sql += "and b.INSURTYPE_NAME like '%"
					+ insur.getProName() + "%' ";

		}
		if(!StringUtil.isEmpty(insur.getProCode())){
			sql += "and b.INSURTYPE_CODE like '%"
				+ insur.getProCode() + "%' ";
		}
		if(insur.getProVer()!=null && !"".equals(insur.getProVer())){
			sql += "and b.ver_no like '%"
				+ insur.getProVer() + "%' ";
		}
		
		sql += "order by b.INSURTYPE_CODE, b.VER_NO asc";
		QueryResult qr = this.queryForPageList(ProApproveDTO.class,
				pageNumber, pageSize, sql, new Object[] {});
		return qr;
	}
	
	
	public QueryResult queryApproveByCombo(ProApproveDTO comboInf,
			int pageNumber, int pageSize){
		String sql = "select combo_id as proId,combo_code as proCode,combo_ver as proVer,combo_name as proName,'02' as proType "
			+ "from t_combo_inf b "
			+ "where b.combo_statu= 1 and b.combo_id in "
			+ "(select t.assess_obj_id from T_PRODUCT_DEF_APPROVE t "
			+ "where t.assess_type='02' and t.flow_node_code='02') ";
		
		if (!StringUtil.isEmpty(comboInf.getProName())) {
			sql += "and b.combo_name like '%"
					+ comboInf.getProName() + "%' ";

		}
		if(!StringUtil.isEmpty(comboInf.getProCode())){
			sql += "and b.combo_CODE like '%"
				+ comboInf.getProCode() + "%' ";
		}
		if(comboInf.getProVer()!=null && !"".equals(comboInf.getProVer())){
			sql += "and b.combo_ver like '%"
				+ comboInf.getProVer() + "%' ";
		}
		
		sql += "order by b.combo_CODE, b.combo_ver asc";
		QueryResult qr = this.queryForPageList(ProApproveDTO.class,
				pageNumber, pageSize, sql, new Object[] {});
		return qr;
	}

	/**
	 * 审核通过
	 * @param tInsurtypeBasicInf
	 */
	public void saveApproveTrue(ProApproveDTO tInsurtypeBasicInf) {
		String sql = "select *  from T_PRODUCT_STATUS_INF where product_id=? and product_type=01";
		TProductStatusInf status = this.queryForObject(TProductStatusInf.class,
				sql, new Object[] { tInsurtypeBasicInf.getProId() });
		status.setProductStatus("04");

		String sql1 = "select *  from T_PRODUCT_DEF_APPLY  where apply_object_id=? and apply_type=01";
		TProductDefApply apply = this.queryForObject(TProductDefApply.class,
				sql1, tInsurtypeBasicInf.getProId());
		apply.setFlowNodeCode("03");
		
		String sql2 = "select *  from T_PRODUCT_DEF_APPROVE where assess_obj_id=? and assess_type=01";
		TProductDefApprove approve = this.queryForObject(TProductDefApprove.class,
				sql2, tInsurtypeBasicInf.getProId());
		approve.setAssessStatus("01");
		approve.setProductStatus("04");
		approve.setAssessConclusion("02");	
		approve.setAssessFinishDate(new Date());
		approve.setFlowNodeCode("03");
		
		this.saveUpdate(status);
		this.saveUpdate(apply);
		this.saveUpdate(approve);
	}

	/**
	 * 审核不通过
	 * @param tInsurtypeBasicInf
	 */
	public void saveApproveFalse(ProApproveDTO tInsurtypeBasicInf) {
		String sql = "select *  from T_PRODUCT_STATUS_INF where product_id=? and product_type=01";
		TProductStatusInf status = this.queryForObject(TProductStatusInf.class,
				sql, new Object[] { tInsurtypeBasicInf.getProId() });
		status.setProductStatus("03");
		
		String sql1 = "select *  from T_PRODUCT_DEF_APPLY  where apply_object_id=? and apply_type=01";
		TProductDefApply apply = this.queryForObject(TProductDefApply.class,
				sql1, tInsurtypeBasicInf.getProId());
		apply.setFlowNodeCode("01");
		
		String sql2 = "select *  from T_PRODUCT_DEF_APPROVE where assess_obj_id=? and assess_type=01";
		TProductDefApprove approve = this.queryForObject(TProductDefApprove.class,
				sql2, tInsurtypeBasicInf.getProId());
		approve.setAssessStatus("01");
		approve.setProductStatus("03");
		approve.setAssessConclusion("01");
		approve.setAssessFinishDate(new Date());
		approve.setFlowNodeCode("01");
		
		this.saveUpdate(status);
		this.saveUpdate(apply);
		this.saveUpdate(approve);
	}
	
	public TInsurtypeBasicInf queryInsurById(ProApproveDTO dto){
		String sql = "select * from t_insurtype_basic_inf where insurtype_id = ? ";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{dto.getProId()});
	}
	
	public TComboInf queryComboById(ProApproveDTO dto){
		String sql = "select * from t_combo_inf where combo_id = ? ";
		return this.queryForObject(TComboInf.class, sql, new Object[]{dto.getProId()});
	}
}
