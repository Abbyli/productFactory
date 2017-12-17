/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TProductDefApply;
import com.neusoft.abclife.productfactory.entity.TProductDefApprove;
import com.neusoft.abclife.productfactory.entity.TProductStatusInf;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Component("factoryabclife_pfRiskDAO_dao")
@ModelFile(value = "pfRiskDAO.dao")
public class PfRiskDAOImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	public PfRiskDAOImpl() {}

	public List<TInsurtypeBasicInf> checkRisk(
			TInsurtypeBasicInf tInsurtypeBasicInf) {
		String sql = "select * from T_INSURTYPE_BASIC_INF b where b.INSURTYPE_CODE= ? and b.VER_NO = ? and b.INSURTYPE_STATUS = 1";
		Object[] params = new Object[2];
		params[0] = tInsurtypeBasicInf.getInsurtypeCode();
		params[1] = tInsurtypeBasicInf.getVerNo();
		List<TInsurtypeBasicInf> lists = this.queryForList(TInsurtypeBasicInf.class, sql, params);
		return lists;
	}

	public void addRisk(TInsurtypeBasicInf tInsurtypeBasicInf) {
		Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_BASIC_INF"));
		tInsurtypeBasicInf.setInsurtypeId(seq);
		this.saveNew(tInsurtypeBasicInf);
		
		//添加产品状态信息表   add by shi.chl
		TProductStatusInf tProductStatusInf = new TProductStatusInf();
		Long seq1 = Long.parseLong(this.getSeq("SEQ_PRODUCT_STATUS_INF"));
		tProductStatusInf.setProductStatusId(seq1);
		tProductStatusInf.setProductId(seq);
		tProductStatusInf.setInsertTime(new Date());
		tProductStatusInf.setProductType("01");
		tProductStatusInf.setProductStatusType("01");
		tProductStatusInf.setProductStatus("01");
		this.saveNew(tProductStatusInf);
		
		//添加产品定义申请表 add by shi.chl
		TProductDefApply tProductDefApply = new TProductDefApply();
		Long seq2 = Long.parseLong(this.getSeq("SEQ_PRODUCT_DEF_APPLY"));
		tProductDefApply.setApplyObjectId(seq);
		tProductDefApply.setChangeApplyId(seq2);
		tProductDefApply.setApplyType("01");
		tProductDefApply.setApplyDate(new Date());
		tProductDefApply.setFlowNodeCode("01");
		tProductDefApply.setInsertTime(tProductStatusInf.getInsertTime());
		this.saveNew(tProductDefApply);
	}
	
	public void updateRisk(TInsurtypeBasicInf tInsurtypeBasicInf) {
		this.saveUpdate(tInsurtypeBasicInf);
		
		//修改产品状态信息表   add by shi.chl
		String sql1= "select * from T_PRODUCT_STATUS_INF where product_id=? and product_type='01'";
		TProductStatusInf tProductStatusInf = this.queryForObject(TProductStatusInf.class, sql1, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		tProductStatusInf.setUpdateTime(new Date());
		this.saveUpdate(tProductStatusInf);
		
		//修改产品定义申请表 add by shi.chl
		String sql2 = "select * from T_PRODUCT_DEF_APPLY where apply_object_id = ? and apply_type='01'";
		TProductDefApply tProductDefApply = this.queryForObject(TProductDefApply.class, sql2, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		tProductDefApply.setUpdateTime(tProductStatusInf.getUpdateTime());
		this.saveUpdate(tProductDefApply);
	}

	public List<TInsurtypeBasicInf> queryRisk(TInsurtypeBasicInf riskCode){
		String sql = "select * from T_INSURTYPE_BASIC_INF where insurtype_code=? order by ver_no desc";
		List<TInsurtypeBasicInf> qr = this.queryForList(TInsurtypeBasicInf.class, sql, new Object[]{riskCode.getInsurtypeCode()});
		return qr;
	}
	public QueryResult getRisksByCondition(
			TInsurtypeBasicInf tInsurtypeBasicInf, int pageNumber, int pageSize) {
		//查询险种状态处于险种定义   update by shi.chl
		String sql = "select * from T_INSURTYPE_BASIC_INF b " +
				"where b.insurtype_status= 1 and b.insurtype_id in " +
				"(select t.apply_object_id from t_product_def_apply t " +
				"where t.apply_type='01' and t.flow_node_code='01') ";
		if(!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeName())){
			sql += "and b.INSURTYPE_NAME like '%"+tInsurtypeBasicInf.getInsurtypeName()+"%' ";
			
		}
		if(!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeCode())){
			sql += "and b.INSURTYPE_CODE like '%"+tInsurtypeBasicInf.getInsurtypeCode()+"%' ";
			
		}
		if(null!=tInsurtypeBasicInf.getVerNo()&&(!"".equals(tInsurtypeBasicInf.getVerNo()))){
			sql +="and b.VER_NO like '%"+tInsurtypeBasicInf.getVerNo()+"%' ";
		}
		if(!StringUtil.isEmpty(tInsurtypeBasicInf.getInsurtypeAbbr())){
			sql +="and b.insurtype_abbr like '%"+tInsurtypeBasicInf.getInsurtypeAbbr()+"%' ";
		}
		sql += "order by b.INSURTYPE_CODE, b.VER_NO asc";
		QueryResult qr = this.queryForPageList(TInsurtypeBasicInf.class, pageNumber, pageSize, sql, new Object[]{});
		return qr;
	}
	
	//提交审核 修改信息表产品状态，修改申请表流程节点代码 添加审核表
	public void submitReview(TInsurtypeBasicInf tInsurtypeBasicInf){
		
		//修改产品状态信息表   add by shi.chl
		String sql1= "select * from T_PRODUCT_STATUS_INF where product_id=? and product_type='01'";
		TProductStatusInf tProductStatusInf = this.queryForObject(TProductStatusInf.class, sql1, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		tProductStatusInf.setProductStatus("02");
		
		
		//修改产品定义申请表 add by shi.chl
		String sql2 = "select * from T_PRODUCT_DEF_APPLY where apply_object_id = ? and apply_type='01'";
		TProductDefApply tProductDefApply = this.queryForObject(TProductDefApply.class, sql2, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		tProductDefApply.setFlowNodeCode("02");
		
		String sql3 = "select * from T_PRODUCT_DEF_APPROVE t where assess_obj_id=? and assess_type='01'";
		TProductDefApprove tProductDefApprove = this.queryForObject(TProductDefApprove.class, sql3, new Object[]{tInsurtypeBasicInf.getInsurtypeId()});
		if(tProductDefApprove == null){
			//添加产品定义审核表 add by shi.chl
			tProductDefApprove = new TProductDefApprove();
			Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_DEF_APPROVE"));
			tProductDefApprove.setProdAssessId(seq);
			tProductDefApprove.setAssessObjId(tInsurtypeBasicInf.getInsurtypeId());
			tProductDefApprove.setAssessType("01");
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
	/**
	 * 清空该险种下账户定义和费用定义所有信息
	 * @param insurtypeId
	 */
	
	public void clearAcc(Long insurtypeId){
		//删除账户信息sql
		String sql1 = "delete from t_insurtype_acc_def where insurtype_acc_id in " +
				"(select r.insurtype_accno_id from t_insurtype_rel_to_acc r where r.insurtype_id = ?) and insurtype_acc_type not in ('005','004')";
		//删除险种账户中间表信息sql
		String sql2 = "delete from t_insurtype_rel_to_acc r where r.insurtype_id = ?";
		//执行sql
		this.executeSQL(sql1, new Object[]{insurtypeId});
		this.executeSQL(sql2, new Object[]{insurtypeId});
		
	}
	
	public void clearFee(Long insurtypeId){
		//删除扣费费率表信息sql
		String sql3 = "delete from t_fee_rate where insurtype_id =?";
		//删除费用定义公式入口表信息sql
		String sql4 = "delete from t_obj_entrance where obj_seq in " +
				"(select obj_seq from t_obj_formula where obj_id = ? and type in ('B1','B4','B5','B7','B8','B9'))";
		//删除对象公式表信息sql
		String sql5 = "delete from t_obj_formula where obj_id = ? and type in ('B1','B4','B5','B7','B8','B9')";
		//删除费用定义表信息sql
		String sql6 = "delete from t_insurtype_fee_def where insurtype_id = ? and fee_type <> 'B3'";
		this.executeSQL(sql3, new Object[]{insurtypeId});
		this.executeSQL(sql4, new Object[]{insurtypeId});
		this.executeSQL(sql5, new Object[]{insurtypeId});
		this.executeSQL(sql6, new Object[]{insurtypeId});
	}

}
