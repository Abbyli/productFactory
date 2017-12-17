/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskAmntTypeDaoImpl;
import com.neusoft.abclife.productfactory.entity.TRiskamntTypeDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskAmntTypeBo_bo")
@ModelFile(value = "pfRiskAmntTypeBo.bo")
public class PfRiskAmntTypeBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskAmntTypeDao_dao")
	private PfRiskAmntTypeDaoImpl pfRiskAmntTypeDaoImpl;
	
	public PfRiskAmntTypeBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 保存风险保额类型
	 * @param tfRiskamntType
	 * @param opt
	 * @return
	 */
	public String saveTfRiskamntType(TRiskamntTypeDef tfRiskamntType,String opt){
	
		String message="";
		if("add".equals(opt)){
			if(this.pfRiskAmntTypeDaoImpl.checkCodeAndName_add(tfRiskamntType)){
				this.pfRiskAmntTypeDaoImpl.addPfRiskAmntTypeDaoImpl(tfRiskamntType);
			}else{
				message="名称或者类型重复";
			}
			
		}
		if("update".equals(opt)){
			if(this.pfRiskAmntTypeDaoImpl.checkCodeAndName(tfRiskamntType)){
				this.pfRiskAmntTypeDaoImpl.updatePfRiskAmntTypeDaoImpl(tfRiskamntType);
			}else{
				message="名称或者类型重复";
			}
			
		}
		
		return message;
	}
	/**
	 * 删除风险保额类型
	 * @param tfRiskamntType
	 */
	public void delTfRiskamntType(TRiskamntTypeDef tfRiskamntType){
		
		this.pfRiskAmntTypeDaoImpl.delPfRiskAmntTypeDaoImpl(tfRiskamntType);
	}
	/**
	 * 包含翻页的查询风险保额
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getAllPfRiskAmntTypeDaoImpl(int pageNumber,int pageSize){
	
		return this.pfRiskAmntTypeDaoImpl.getAllPfRiskAmntTypeDaoImpl(pageNumber, pageSize);
	}
	/**
	 * 查询所有风险保额类型
	 * @return
	 */
	
	public List<TRiskamntTypeDef> getAllRiskAmntType(){
		return this.pfRiskAmntTypeDaoImpl.getAllRiskAmntType();
	}
}
