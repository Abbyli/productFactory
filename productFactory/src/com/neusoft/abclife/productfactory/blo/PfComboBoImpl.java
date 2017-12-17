/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboBo_bo")
@ModelFile(value = "pfComboBo.bo")
public class PfComboBoImpl {

	/**
	 * 
	 */
	public PfComboBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboDao_dao")
	private PfComboDaoImpl pfComboDaoImpl;
	//保存组合
	public String saveComboInf(TComboInf comboInf,String opt){
		String message="";
		if("add".equals(opt)){
			if(pfComboDaoImpl.check(comboInf)){
				comboInf.setComboStatu("1");
				pfComboDaoImpl.addComboInf(comboInf);
			}else{
				message="此版本的这个组合已存在";
			}
		}
		if("update".equals(opt)){
			pfComboDaoImpl.updateComboInf(comboInf);
		}
		
		return message;
	}
	//用编码查组合
	public List<TComboInf> queryComboInfByCode(String code){
		return pfComboDaoImpl.getComboInfByCode(code);
	}
	//分页查询组合信息
	public QueryResult getComboInf(TComboInf comboInf,int pageNumber,int pageSize){
		return pfComboDaoImpl.getComboInf(comboInf, pageNumber, pageSize);
	}
	//删除组合信息
	public String delComboInf(TComboInf comboInf){
		comboInf.setComboStatu("0");
		pfComboDaoImpl.updateComboInf(comboInf);
		return "";
	}
	//提交审核
	public String submitCombo(TComboInf comboInf){
		pfComboDaoImpl.submitReview(comboInf);
		return "";
	}

}
