/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboInsurElementDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TObjEntranceCombine;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboInsurElementBo_bo")
@ModelFile(value = "pfComboInsurElementBo.bo")
public class PfComboInsurElementBoImpl {

	/**
	 */
	public PfComboInsurElementBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboInsurElementDao_dao")
	private PfComboInsurElementDaoImpl insurElem;

	//查询组合险种要素
	public List<TComboInsurtypeElemRel> queryInsurElem(TComboInf comboInf){
		return insurElem.queryInsurElem(comboInf);
	}
	//保存险种要素
	public void updComboInsurElem(TComboInsurtypeElemRel comInsurElem){
		insurElem.updComboInsurElem(comInsurElem);
	}
	//查询指定险种要素
	public List<TProductParamDef> queryTProductParamDef(TComboInsurtypeElemRel comInsurElem){
		return insurElem.queryTProductParamDef(comInsurElem);
	}
	//保存拆分算法
	public String saveFormula(TObjParam param,TObjEntranceCombine entrance,TObjFormula formula){
		insurElem.delFormula(formula);
		insurElem.saveFormula(param, entrance, formula);
		return "";
	}
	//查询对象公式表
	public TObjFormula queryFormula(TComboInsurtypeElemRel elemRel){
		return insurElem.queryFormula(elemRel);
	}
	//查询对象参数表
	public List<TFormulaParamRef> queryParam(TComboInsurtypeElemRel elemRel){
		List<TObjParam> list =  insurElem.queryParam(elemRel);
		List<TFormulaParamRef> list2= new ArrayList<TFormulaParamRef>();
		for(TObjParam t :list){
			TFormulaParamRef s = insurElem.getFormulaParam(t);
			s.setRefValue(t.getParamValue());
			list2.add(s);
		}
		return list2;
	}
	
}
