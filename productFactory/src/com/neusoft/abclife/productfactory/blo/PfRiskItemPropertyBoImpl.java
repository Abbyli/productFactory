/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskItemPropertyDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef;
import com.neusoft.abclife.productfactory.entity.TPsItemDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskItemPropertyBo_bo")
@ModelFile(value = "pfRiskItemPropertyBo.bo")
public class PfRiskItemPropertyBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskItemPropertyDao_dao")
	private PfRiskItemPropertyDaoImpl pfRiskItemPropertyDaoImpl;
	
	public PfRiskItemPropertyBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 查询险种下有公式的保全项
	 * @param insurtypeId
	 * @return
	 */
	public List<TInsurtypePsItemDef> getPsItemDef(Long insurtypeId){
		return this.pfRiskItemPropertyDaoImpl.getPsItemDef(insurtypeId);
	}
	/**
	 * 保存险种下保全项
	 * @param tInsurtypePsItemDefs
	 * @param insurtype
	 */
	public void savePsItemDefs(List<TInsurtypePsItemDef> tInsurtypePsItemDefs,TInsurtypeBasicInf insurtype){
		for(int i=0;i<tInsurtypePsItemDefs.size();i++){
			this.pfRiskItemPropertyDaoImpl.savePsItemDef(tInsurtypePsItemDefs.get(i), insurtype);
		}
	} 
	
	public List<TPsItemDef> getPsItemchange(){
		return this.pfRiskItemPropertyDaoImpl.getTPsItemDefs("I");
	}
	

}
