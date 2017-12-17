/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TSkelementDef;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfRiskElementDao_dao")
@ModelFile(value = "pfRiskElementDao.dao")
public class PfRiskElementDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfRiskElementDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 添加对象要素信息
	 * @param obj
	 */
	public void addTObjSkelement(TObjSkelement obj){
		
		this.saveNew(obj);
	}
	
	/**
	 * 添加展现表信息
	 * @param show
	 */
	public void addTPropShowDef(TPropShowDef show){
		Long seq = Long.parseLong(this.getSeq("SEQ_PROP_SHOW_DEF"));
		show.setId(seq);
		this.saveNew(show);
	}
	/**
	 * 修改对象要素和展现表信息
	 * @param obj
	 * @param show
	 */
	public void updateObjskelement(TObjSkelement obj,TPropShowDef show){
		this.saveUpdate(obj);
		this.saveUpdate(show);
		
	}
	/**
	 * 包含翻页的对象要素信息查询
	 * @param tPricingLiabDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getObjSkelement(Long dutyId,String type ,int pageNumber,int pageSize){
		String sql = "select * from t_obj_skelement where duty_id=? and type =?";
		QueryResult qr = this.queryForPageList(TObjSkelement.class, pageNumber, pageSize, sql, new Object[]{dutyId,type});
		return qr;
	}
	/**
	 * 删除对象要素信息
	 * @param obj
	 */
	public void delObjSkelement(TObjSkelement obj){
		TPropShowDef t = this.getTPropShowDef(obj);
		this.saveRemove(t);
		this.saveRemove(obj);
		
	}
	/**
	 * 查询展现信息
	 * @param obj
	 * @return
	 */
	public TPropShowDef getTPropShowDef(TObjSkelement obj){
		String sql="select * from t_prop_show_def where obj_id=?";
		TPropShowDef t = this.queryForObject(TPropShowDef.class, sql, new Object[]{obj.getId()});
		return t;
	}
	
	/**
	 * 检查修改要素名称或者关键字重复
	 * @param obj
	 * @return
	 */
	public boolean checkCodeAndName(TObjSkelement obj){
		StringBuilder sql = new StringBuilder( "select * from T_OBJ_SKELEMENT  where duty_id=? and name=? and type =?");
		List<Object> params = new ArrayList<Object>();
		params.add(obj.getDutyId());
		params.add(obj.getName());
		params.add(obj.getType());
		
		List<TObjSkelement> list = this.queryForList(TObjSkelement.class, sql.toString(), params.toArray());
		
		boolean flag = false;
		if(list.size()>1){
			flag = false;
		}
		if(list.size()==1){
			if(list.get(0).getId().toString().equals(obj.getId().toString())){
				flag=true;
			}else{
				flag = false;
			}
		}
		
		if(list.size()<1){
			flag = true;
		}
		
		return flag;
		
	}
	/**
	 * 检查添加要素名称或者关键字重复
	 * @param obj
	 * @return
	 */
	public boolean checkCodeAndName_add(TObjSkelement obj){
		StringBuilder sql = new StringBuilder( "select * from T_OBJ_SKELEMENT  where duty_id=? and name=? and type =?");
		List<Object> params = new ArrayList<Object>();
		params.add(obj.getDutyId());
		params.add(obj.getName());
		params.add(obj.getType());
		if(!StringUtils.isEmpty(obj.getName())){
			sql.append("and name=?");
			params.add(obj.getName());
		}
		
		List<TObjSkelement> list = this.queryForList(TObjSkelement.class, sql.toString(), params.toArray());
		boolean flag = false;
		if(list.size()<1){
			flag = true;
		}else{
			flag = false;
		}
		
		return flag;
	}

	public List<TPropShowDef> getDefTPropShowDef(String text) {
		String sql = "select * from T_PROP_SHOW_DEF s where s.OBJ_ID is null and s.SKELEMENT_ID = (select id from t_skelement_def where name = ? ) "; 	
		return this.queryForList(TPropShowDef.class, sql, new Object[]{text});
	}
	
	
}
