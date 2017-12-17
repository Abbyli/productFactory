/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfSKElementDAOImpl;
import com.neusoft.abclife.productfactory.dto.PfSKElementsDTO;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TSkelementDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think.
 *
 */
@Service("factoryabclife_pfSKElementBO_bo")
@ModelFile(value = "pfSKElementBO.bo")
public class PfSKElementBOImpl {

	public PfSKElementBOImpl() {}
	
	@Resource(name = "factoryabclife_pfSKElementDAO_dao")
	private PfSKElementDAOImpl pfSKElementDAOImpl;
	/**
	 * 翻页查询要素定义表
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getPfSkelements(int pageNumber, int pageSize){
		QueryResult qr = pfSKElementDAOImpl.getPfSkelements(pageNumber, pageSize);
		return qr;
	}
	/**
	 * 查询要素定义表
	 * @return
	 */
	public List<TSkelementDef> getPfSkelementsNoPage(){
		List<TSkelementDef> list = pfSKElementDAOImpl.getPfSkelementsNoPage();
		return list;	
	}
	/**
	 * 添加要素
	 * @param tSkelementDef
	 * @param show
	 * @param opt
	 * @return
	 */
	public String addPfSkelement(TSkelementDef tSkelementDef,TPropShowDef show, String opt){
		String message = checkPfSkelement(tSkelementDef, opt);
		if("".equals(message)){
			pfSKElementDAOImpl.addPfSkelement(tSkelementDef,show);
		}
		return message;	
	}
	/**
	 * 获取要素展现表
	 * @param tSkelementDef
	 * @return
	 */
	public List<TPropShowDef> getTPropShowDef(TSkelementDef tSkelementDef){
		return pfSKElementDAOImpl.getTPropShowDef(tSkelementDef);	
	}
	/**
	 * 修改要素
	 * @param tSkelementDef
	 * @param show
	 * @param opt
	 * @return
	 */
	public String updPfSkelement(TSkelementDef tSkelementDef,TPropShowDef show, String opt){
		String message = checkPfSkelement(tSkelementDef, opt);
		if("".equals(message)){
			pfSKElementDAOImpl.updPfSkelement(tSkelementDef,show);
			
		}
		return message;
	}
	
	/**
	 * 校验type下标准化中文是否重复
	 * */
	public String checkPfSkelement(TSkelementDef tSkelementDef, String opt){
		String message = "";
		List<TSkelementDef> list = pfSKElementDAOImpl.checkPfSkelement(tSkelementDef);
		if(list.size() > 1){
			message = "要素中文已存在！";
			
		}else if(list.size() == 1){
			if("add".equals(opt)){
				message = "要素中文已存在！";
				
			}else if("upd".equals(opt)){
				String id_db = list.get(0).getId().toString();
				String id = tSkelementDef.getId().toString();
				if(!id_db.equals(id)){
					message = "要素中文已存在！";	
					
				}
			}			
		}	
		return message;
	}
	/**
	 *删除要素
	 * @param tSkelementDef
	 */
	public void delPfSkelement(PfSKElementsDTO pfSKElementsDTO){
		pfSKElementDAOImpl.delPfSkelement(pfSKElementsDTO);		
	}
	/**
	 * 获取定价要素定义表
	 * @return
	 */
	public List<TSkelementDef> getPricingTSkelementDef(){
		return this.pfSKElementDAOImpl.getTSkelementDef("1");
	}
	/**
	 * 获取保障要素定义表
	 * @return
	 */
	public List<TSkelementDef> getPrestTSkelementDef(){
		return this.pfSKElementDAOImpl.getTSkelementDef("2");
	}

}
