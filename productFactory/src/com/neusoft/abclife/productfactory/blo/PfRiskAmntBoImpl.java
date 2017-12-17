/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskAmntDaoImpl;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskAmntBo_bo")
@ModelFile(value = "pfRiskAmntBo.bo")
public class PfRiskAmntBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskAmntDao_dao")
	private PfRiskAmntDaoImpl pfRiskAmntDaoImpl;
	
	public PfRiskAmntBoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 保存对象公式
	 * @param tObjFormula
	 * @return
	 */
	public String addTObjFormula(TObjFormula tObjFormula){
		String message="";
		String type = tObjFormula.getType();
		String[] types = type.split(",");
		for(String t:types){
			t="E1#"+t;
			tObjFormula.setType(t);
			String objSeq = this.pfRiskAmntDaoImpl.getUUId();
			tObjFormula.setObjSeq(objSeq);
				if(this.pfRiskAmntDaoImpl.checkCodeAndName_add(tObjFormula)){
					this.pfRiskAmntDaoImpl.addTObjFormula(tObjFormula);
				}
		}
		return message;
	}
	/**
	 * 翻页查询对象公式
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getTObjFormulas(Long id,int pageNumber,int pageSize){
		return this.pfRiskAmntDaoImpl.getTObjFormulas(id, pageNumber, pageSize);
	}

}
