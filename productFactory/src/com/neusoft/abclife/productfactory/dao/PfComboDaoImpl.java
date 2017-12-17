/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

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
 * @author Administrator
 *
 */
@Component("factoryabclife_pfComboDao_dao")
@ModelFile(value = "pfComboDao.dao")
public class PfComboDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfComboDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	//新增组合
	public void addComboInf(TComboInf comboInf){
		Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_BASIC_INF"));
		comboInf.setComboId(seq);
		this.saveNew(comboInf);
		
		//添加产品状态信息表   add by shi.chl
		TProductStatusInf tProductStatusInf = new TProductStatusInf();
		Long seq1 = Long.parseLong(this.getSeq("SEQ_PRODUCT_STATUS_INF"));
		tProductStatusInf.setProductStatusId(seq1);
		tProductStatusInf.setProductId(seq);
		tProductStatusInf.setInsertTime(new Date());
		tProductStatusInf.setProductType("02");
		tProductStatusInf.setProductStatusType("01");
		tProductStatusInf.setProductStatus("01");
		this.saveNew(tProductStatusInf);
		
		//添加产品定义申请表 add by shi.chl
		TProductDefApply tProductDefApply = new TProductDefApply();
		Long seq2 = Long.parseLong(this.getSeq("SEQ_PRODUCT_DEF_APPLY"));
		tProductDefApply.setApplyObjectId(seq);
		tProductDefApply.setChangeApplyId(seq2);
		tProductDefApply.setApplyType("02");
		tProductDefApply.setApplyDate(new Date());
		tProductDefApply.setFlowNodeCode("01");
		tProductDefApply.setInsertTime(tProductStatusInf.getInsertTime());
		this.saveNew(tProductDefApply);
		
		
		
		
		
	}
	//修改组合
	public void updateComboInf(TComboInf comboInf){
		this.saveUpdate(comboInf);
	}
	//用编码查询组合
	public List<TComboInf> getComboInfByCode(String code){
		String sql = "select * from t_combo_inf where combo_code =? order by combo_ver desc";
		return this.queryForList(TComboInf.class, sql, new Object[]{code});
	}
	
	public QueryResult getComboInf(TComboInf comboInf,int pageNumber,int pageSize){
		String sql = "select * from t_combo_inf where combo_statu = '1' ";
		if(!StringUtil.isEmpty(comboInf.getComboCode())){
			sql += " and combo_code like '%"+comboInf.getComboCode()+"%'";
		}
		return this.queryForPageList(TComboInf.class, pageNumber, pageSize, sql);
	}
	//提交审核 修改信息表产品状态，修改申请表流程节点代码 添加审核表
	public void submitReview(TComboInf comboInf){
		
		//修改产品状态信息表   add by shi.chl
		String sql1= "select * from T_PRODUCT_STATUS_INF where product_id=? and product_type='02'";
		TProductStatusInf tProductStatusInf = this.queryForObject(TProductStatusInf.class, sql1, new Object[]{comboInf.getComboId()});
		tProductStatusInf.setProductStatus("02");
		
		
		//修改产品定义申请表 add by shi.chl
		String sql2 = "select * from T_PRODUCT_DEF_APPLY where apply_object_id = ? and apply_type='02'";
		TProductDefApply tProductDefApply = this.queryForObject(TProductDefApply.class, sql2, new Object[]{comboInf.getComboId()});
		tProductDefApply.setFlowNodeCode("02");
		
		String sql3 = "select * from T_PRODUCT_DEF_APPROVE t where assess_obj_id=? and assess_type='02'";
		TProductDefApprove tProductDefApprove = this.queryForObject(TProductDefApprove.class, sql3, new Object[]{comboInf.getComboId()});
		if(tProductDefApprove == null){
			//添加产品定义审核表 add by shi.chl
			tProductDefApprove = new TProductDefApprove();
			Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_DEF_APPROVE"));
			tProductDefApprove.setProdAssessId(seq);
			tProductDefApprove.setAssessObjId(comboInf.getComboId());
			tProductDefApprove.setAssessType("02");
			tProductDefApprove.setAssessStatus("02");
			tProductDefApprove.setProductStatus("02");
			tProductDefApprove.setProductStatusType("01");
			tProductDefApprove.setSubmitAssessDate(new Date());
			tProductDefApprove.setFlowNodeCode("02");
			tProductDefApprove.setInsertTime(tProductDefApply.getInsertTime());
			tProductDefApprove.setUpdateTime(tProductDefApply.getUpdateTime());
			this.saveNew(tProductDefApprove);
		}else{
			tProductDefApprove.setAssessStatus("02");
			tProductDefApprove.setProductStatus("02");
			tProductDefApprove.setFlowNodeCode("02");
			tProductDefApprove.setSubmitAssessDate(new Date());
			tProductDefApprove.setAssessFinishDate(null);
			tProductDefApprove.setUpdateTime(tProductDefApply.getUpdateTime());
			this.saveUpdate(tProductDefApprove);
		}
		
		this.saveUpdate(tProductStatusInf);
		this.saveUpdate(tProductDefApply);
		
	}
	
	public Boolean check(TComboInf comboInf){
		String sql = "select * from t_combo_inf where combo_code = ? and combo_ver=? ";
		int a = this.executeSQL(sql, new Object[]{comboInf.getComboCode(),comboInf.getComboVer()});
		Boolean flag = false;
		if(a<1){
			flag = true;
		}
		return flag;
	}
	
}
