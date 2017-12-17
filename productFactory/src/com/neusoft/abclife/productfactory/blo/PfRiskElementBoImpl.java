/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskElementDaoImpl;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl.
 *
 */
@Service("factoryabclife_pfRiskElementBo_bo")
@ModelFile(value = "pfRiskElementBo.bo")
public class PfRiskElementBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskElementDao_dao")
	private PfRiskElementDaoImpl  pfRiskElementDaoImpl;
	
	public PfRiskElementBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 要素根据opt来添加或者修改 并带有数据库重复校验.
	 * @param obj
	 * @param show
	 * @param opt
	 * @return
	 */
	public String addAndupdateElement(TObjSkelement obj,TPropShowDef show,String opt){

		String message = "";
			if("add".equals(opt)){
				if(this.pfRiskElementDaoImpl.checkCodeAndName_add(obj)){
					Long seq = Long.parseLong(this.pfRiskElementDaoImpl.getSeq("SEQ_OBJ_SKELEMENT"));
					obj.setId(seq);
					this.pfRiskElementDaoImpl.addTObjSkelement(obj);
					show.setObjId(seq);
					this.pfRiskElementDaoImpl.addTPropShowDef(show);
				}else{
					message="要素名称或关键字重复";
				}
				
			}
			if("update".equals(opt)){
				if(this.pfRiskElementDaoImpl.checkCodeAndName(obj)){
					this.pfRiskElementDaoImpl.updateObjskelement(obj, show);
				}else{
					message="要素名称或关键字重复";
				}
			}
		
		return message;
	}
	/**
	 * 包含翻页的对象要素信息查询
	 * @param tPricingLiabDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getObjSkelement(Long dutyId,String type,int pageNumber,int pageSize){
		return this.pfRiskElementDaoImpl.getObjSkelement(dutyId, type,pageNumber, pageSize);
	}
	
	/**
	 * 删除对象要素信息
	 * @param obj
	 */
	public void delObjSkelement(TObjSkelement obj){
		this.pfRiskElementDaoImpl.delObjSkelement(obj);
	}
	/**
	 * 查询展现表信息
	 * @param obj
	 * @return
	 */
	public TPropShowDef getTPropShowDef(TObjSkelement obj){
	 	return this.pfRiskElementDaoImpl.getTPropShowDef(obj);
	}
	
	/**
	 * 查询展现表默认信息
	 * @param obj
	 * @return
	 */
	public List<TPropShowDef> getDefTPropShowDef(String text){
 	 	return this.pfRiskElementDaoImpl.getDefTPropShowDef(text);
	}
}
