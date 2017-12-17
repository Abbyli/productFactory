/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfFormulaDaoImpl;
import com.neusoft.abclife.productfactory.entity.TFormulaDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfFormulaBo_bo")
@ModelFile(value = "pfFormulaBo.bo")
public class PfFormulaBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfFormulaDao_dao")
	private PfFormulaDaoImpl pfFormulaDaoImpl;
	
	
	public PfFormulaBoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 定价责任公式
	 * @return
	 */
	public List<TFormulaDef> getFormulaA1(){
		return this.pfFormulaDaoImpl.getFormulaPricing("A1");
	}
	public List<TFormulaDef> getFormulaA2(){
		return this.pfFormulaDaoImpl.getFormulaPricing("A2");
	}
	public List<TFormulaDef> getFormulaB3(){
		return this.pfFormulaDaoImpl.getFormula("B0");
	}
	public List<TFormulaDef> getFormulaC1(){
		return this.pfFormulaDaoImpl.getFormula("C1");
	}
	public List<TFormulaDef> getFormulaC2(){
		return this.pfFormulaDaoImpl.getFormula("C2");
	}
	
	/**
	 * 费用管理公式
	 * @return
	 */
	
	public List<TFormulaDef> getFormulaB4(){
		return this.pfFormulaDaoImpl.getFormula("B1");
	}
	public List<TFormulaDef> getFormulaB7(){
		return this.pfFormulaDaoImpl.getFormula("B2");
	}
	public List<TFormulaDef> getFormulaB1(){
		return this.pfFormulaDaoImpl.getFormula("B3");
	}
	public List<TFormulaDef> getFormulaB5(){
		return this.pfFormulaDaoImpl.getFormula("B4");
	}
	public List<TFormulaDef> getFormulaB8(){
		return this.pfFormulaDaoImpl.getFormula("B5");
	}
	public List<TFormulaDef> getFormulaB9(){
		return this.pfFormulaDaoImpl.getFormula("B6");
	}
	
	/**
	 * 给付算法公式
	 * @return
	 */
	
	public List<TFormulaDef> getFormulaD1(){
		return this.pfFormulaDaoImpl.getFormula("D1");
	}
	/**
	 * 风险保额公式
	 * @return
	 */
	public List<TFormulaDef> getFormulaE1(){
		return this.pfFormulaDaoImpl.getFormula("E1");
	}
	/**
	 * 账单明细公式
	 * @return
	 */
	public List<TFormulaDef> getFormulaD3(){
		return this.pfFormulaDaoImpl.getFormula("D3");
	}
	/**
	 * 保全属性公式
	 * @return
	 */
	public List<TFormulaDef> getFormulaG(){
		return this.pfFormulaDaoImpl.getFormula("G");
	}
	/**|
	 * 责任限额公式
	 * @return
	 */
	public List<TFormulaDef> getFormulaD2(){
		return this.pfFormulaDaoImpl.getFormula("D2");
	}
	
	//组合保额算法
	public List<TFormulaDef> getFormulaComboAmnt(){
		return this.pfFormulaDaoImpl.getFormula("COMBOAMNT");
	}
	//组合保费算法
	public List<TFormulaDef> getFormulaComboPrem(){
		return this.pfFormulaDaoImpl.getFormula("COMBOPREM");
	}
	//组合拆分
	public List<TFormulaDef> getFormulaSplit(){
		return this.pfFormulaDaoImpl.getFormula("SPLIT");
	}
	//按份数
	public List<TFormulaDef> getFormulaMultA1(){
		return this.pfFormulaDaoImpl.getFormulaMult("A1");
	}
	public List<TFormulaDef> getFormulaMultA2(){
		return this.pfFormulaDaoImpl.getFormulaMult("A2");
	}

}
