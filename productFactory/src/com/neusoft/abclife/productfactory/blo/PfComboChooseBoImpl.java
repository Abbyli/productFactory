/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboChooseDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboChooseBo_bo")
@ModelFile(value = "pfComboChooseBo.bo")
public class PfComboChooseBoImpl {

	/**
	 * 
	 */
	public PfComboChooseBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboChooseDao_dao")
	private PfComboChooseDaoImpl comboChoose;

	//保存组合险种
	public String saveComboInsurtype(List<TComboInsurtype> comboInsur){
		String message="";
		for(TComboInsurtype comboInsu : comboInsur){
			if(comboChoose.checkTComboInsurtypeAdd(comboInsu)<1){
				this.comboChoose.saveComboInsurtype(comboInsu);
				List<TComboInsurtypeElemRel> list = comboChoose.querycomboInsurElem(comboInsu);
				for(TComboInsurtypeElemRel t:list){
					comboChoose.saveComboInsurElem(t);
				}
			}else{
				message = "添加重复";
			}
		}
		
		return message;
	}
	//翻页查询组合险种
	public QueryResult queryComboInsurtypeForPage(TComboInf comboInf,int pageNumber,int pageSize){
		return comboChoose.queryComboInsurtypeForPage(comboInf, pageNumber, pageSize);
	}
	//删除组合险种
	public void delComboInsurtype(TComboInsurtype comboInsur){
		comboChoose.delComboParam(comboInsur);
		comboChoose.delComboInsurElem(comboInsur);
		comboChoose.delComboInsurtype(comboInsur);
	}
	
}
