/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfInsurtypeAccDefImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_PfInsurtypeAccDefBo_bo")
@ModelFile(value = "PfInsurtypeAccDefBo.bo")
public class PfInsurtypeAccDefBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_PfInsurtypeAccDef_dao")
	private PfInsurtypeAccDefImpl insurtypeAccDef;
	
	public PfInsurtypeAccDefBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 包含翻页的查询
	 * @param insurtypebasciinf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getPfInsurtypeAccDefs(TInsurtypeBasicInf insurtypebasciinf,int pageNumber,int pageSize){
		return this.insurtypeAccDef.getPfInsurtypeAccDefs(insurtypebasciinf, pageNumber, pageSize);
		
		
	}
	/**
	 * 通过页面传opt不同调用添加和修改的方法并有数据库重复校验
	 * @param basic
	 * @param insurtypeAccDef
	 * @param opt
	 * @return
	 */
	public String addPfInsurtypeAccDef(TInsurtypeBasicInf basic,TInsurtypeAccDef insurtypeAccDef,String opt){
		String message="";
		if("add".equals(opt)){
			if(this.insurtypeAccDef.checkCodeAndName_add(insurtypeAccDef,basic)){
				this.insurtypeAccDef.addPfInsurtypeAccDef(basic,insurtypeAccDef);
			}else{
				if(insurtypeAccDef.getInsurtypeAccCode()==null){
					message="账户编码或名称不为空";
				}else{
					message="编码或名称重复";
				}
				
			}
			
			
		}else if("update".equals(opt)){
			if(this.insurtypeAccDef.checkCodeAndName(insurtypeAccDef,basic)){
				if("002".equals(insurtypeAccDef.getInsurtypeAccType())){
					this.insurtypeAccDef.updatePfInsurtypeAccDef(insurtypeAccDef);
				}
			}else{
				message="编码或名称重复";
			}
		}
		return message;
	}
	
	/**
	 * 删除账户信息
	 * @param basic
	 * @param insurtypeAccDef
	 * @return
	 */
	public String delPfInsurtypeAccDef(TInsurtypeBasicInf basic,TInsurtypeAccDef insurtypeAccDef){
		this.insurtypeAccDef.delPfInsurtypeAccDef(basic, insurtypeAccDef);
		return "";
	}
	/**
	 * 查询红利或生存账户信息
	 * @param type
	 * @return
	 */
	
	public TInsurtypeAccDef queryTInsurtypeAccDefByType(String type){
		return this.insurtypeAccDef.queryTInsurtypeAccDefByType(type);
	}

}
