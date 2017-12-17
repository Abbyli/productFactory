/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboElementDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboElementBo_bo")
@ModelFile(value = "pfComboElementBo.bo")
public class PfComboElementBoImpl {

	/**
	 * 
	 */
	public PfComboElementBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboElementDao_dao")
	private PfComboElementDaoImpl comboElement;
	//分页查询对象要素表
	public QueryResult getTObjSkElement(TComboInf comboInf,int pageNumber,int pageSize){
		return comboElement.getTObjSkElement(comboInf, pageNumber, pageSize);
	}

}
