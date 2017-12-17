/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboParamDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboParamBo_bo")
@ModelFile(value = "pfComboParamBo.bo")
public class PfComboParamBoImpl {

	/**
	 * 
	 */
	public PfComboParamBoImpl() {
	}
	@Resource(name="factoryabclife_pfComboParamDao_dao")
	private PfComboParamDaoImpl pfComboParamDao;
	//查询险种参数
	public List<TProductParamDef> queryComboParam(TComboInf comboInf,String type){
		List<TComboInsurtype> comboInsurs = pfComboParamDao.queryComboInsurtype(comboInf);
		return pfComboParamDao.queryComboParam(comboInsurs, type);
	}
	//保存组合参数
	public String saveComboParam(List<TProductParamDef> params,TComboInf comboInf,String type){
		pfComboParamDao.delComboParam(comboInf, type);
		if(params != null ){
			for(TProductParamDef t:params){
				t.setAscribHierar("04");
				t.setEntityId(comboInf.getComboId());
				pfComboParamDao.saveComboParam(t);
			}
		}
		return "";
	}
	//查询组合参数
	public List<TProductParamDef> queryComboParams(TComboInf comboInf,String type){
		return pfComboParamDao.queryComboParams(comboInf, type);
	}

}
