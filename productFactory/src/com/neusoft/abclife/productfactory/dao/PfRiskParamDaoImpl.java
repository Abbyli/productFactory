/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeCustElemCtrl;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Component("factoryabclife_PfRiskParamDao_dao")
@ModelFile(value = "PfRiskParamDao.dao")
public class PfRiskParamDaoImpl extends BaseDao {

	private static final Object[] Object = null;

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskParamDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 参数定义查询
	 * @param basic
	 * @param paramType
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TProductParamDef> getPfInsurtypeParam(TInsurtypeBasicInf basic, String paramType) {
		if(paramType.contains(",")){
			String[] split = paramType.split(",");
			String sql = "select * from t_product_param_def where param_type in (?,?) and entity_id =? and ascrib_hierar='02' order by  param_unit,param_val desc ";
			return this.queryForList(TProductParamDef.class,
					sql, new Object[] {split[0],split[1],basic.getInsurtypeId()});
		}else{
			String sql = "select * from t_product_param_def where param_type = ? and entity_id =? and ascrib_hierar='02' order by  param_unit,param_val desc ";
			return this.queryForList(TProductParamDef.class,
					sql, new Object[] {paramType,basic.getInsurtypeId()});
		}
	}
	
	/**
	 * 人员定义查询
	 * @param basic
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryPersonnel(TInsurtypeBasicInf basic, int pageNumber,
			int pageSize) {
		String sql = "select * from T_INSURTYPE_CUST_ELEM_CTRL where insurtype_id=?";
		QueryResult qr = this.queryForPageList(TInsurtypeCustElemCtrl.class,
				pageNumber, pageSize, sql, new Object[] { basic.getInsurtypeId()});
		return qr;
	}

	/**
	 * 添加人员定义信息
	 * @param personnel
	 */
	public void addPersonnel(TInsurtypeCustElemCtrl personnel) {
		Long seq = Long.parseLong(this.getSeq("SEQ_INSURTYPE_CUST_ELEM_CTRL"));
		personnel.setElemCtrlId(seq);
		this.saveNew(personnel);
	}
	
	/**
	 * 人员定义删除
	 * @param personnel
	 */
	public void deletePersonnel(TInsurtypeCustElemCtrl personnel){
		this.saveRemove(personnel);
	}

	/**
	 * 修改人员定义信息
	 * @param personnel
	 */
	public void updatePersonnel(TInsurtypeCustElemCtrl personnel) {
		this.saveUpdate(personnel);
	}
	
	/**
	 * 校验数据库数据重复
	 * @param paramDef
	 * @return
	 */
	public boolean checkValue(TProductParamDef paramDef){
		String sql ="select * from t_product_param_def where entity_id=? and param_type=? and param_val=? and param_unit=? and ascrib_hierar='02'";
		List<Object> params = new ArrayList<Object>();
		
		params.add(paramDef.getEntityId());
		params.add(paramDef.getParamType());
		params.add(paramDef.getParamVal());
		params.add(paramDef.getParamUnit());
		List<TProductParamDef> list = this.queryForList(TProductParamDef.class, sql,params.toArray());
		if(list.size()==0){
			return true;
		}
		return false;
	}
	
	/**
	 * 校验人员重复定义
	 * @param personnel
	 * @return
	 */
	public int checkPersonnel(TInsurtypeCustElemCtrl personnel){
		String sql = "select * from T_INSURTYPE_CUST_ELEM_CTRL where insurtype_id=? " +
				"and psnnl_type=? order by psnnl_type";
		int value = this.executeSQL(sql, new Object[]{
				personnel.getInsurtypeId(),personnel.getPsnnlType()});

		return value;
	}

	/**
	 * 参数定义添加
	 * @param paramDef
	 */
	public void addPfRiskParamDef(TProductParamDef paramDef) {
		Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_PARAM_DEF"));
		paramDef.setProductParamId(seq);
		this.saveNew(paramDef);
	}
	
	/**
	 * 参数定义修改
	 * @param paramDef
	 */
	public void updatePfRiskParamDef(TProductParamDef paramDef) {
		this.saveUpdate(paramDef);
	}

	/**
	 * 交费频率添加
	 * @param param
	 * @param paramDef
	 */
	public void addparam(String param, TProductParamDef paramDef) {
		List params = new ArrayList();
		String[] pay = param.split(",");
		for (int i = 0, j = pay.length; i < j; i++) {
			Long seq = Long.parseLong(this.getSeq("SEQ_PRODUCT_PARAM_DEF"));
			paramDef.setProductParamId(seq);
			if(Integer.parseInt(pay[i])==1){
				paramDef.setParamVal(Integer.parseInt(pay[i]));
				paramDef.setParamDesc("现金领取");
			}else if(Integer.parseInt(pay[i])==2){
				paramDef.setParamVal(Integer.parseInt(pay[i]));
				paramDef.setParamDesc("累积生息");
			}else if(Integer.parseInt(pay[i])==3){
				paramDef.setParamVal(Integer.parseInt(pay[i]));
				paramDef.setParamDesc("抵交保费");
			}else if(Integer.parseInt(pay[i])==4){
				paramDef.setParamVal(Integer.parseInt(pay[i]));
				paramDef.setParamDesc("交清增额");
			}
			paramDef.setParamVal(Integer.parseInt(pay[i]));
			this.saveNew(paramDef);
		}
	}

	public void updatePfInsurtypeAccDef(TProductParamDef paramDef) {
		this.saveUpdate(paramDef);
	}

	/**
	 * 参数定义删除
	 * @param paramDel
	 */
	public void delpfRiskParam(TProductParamDef paramDel) {
		this.saveRemove(paramDel);
	}

	/**
	 * 删除交费频率
	 * @param paramType
	 * @param insurtypeId
	 */
	public void delparamType(String paramType,String insurtypeId) {
		String sql = "delete from t_product_param_def where param_type=? and entity_id=? and ascrib_hierar=02 ";
		this.executeSQL(sql, new Object[]{paramType,insurtypeId});
	}

}
