/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfComboRateManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfComboRateManageBo_bo")
@ModelFile(value = "pfComboRateManageBo.bo")
public class PfComboRateManageBoImpl {

	/**
	 * 
	 */
	public PfComboRateManageBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfComboRateManageDao_dao")
	private PfComboRateManageDaoImpl comboRate;
	/**
	 * 查询组合精算数据表
	 * @param comboInf
	 * @return
	 */
	public List<TObjRate> getTObjRate(TComboInf comboInf){
		return comboRate.getTObjRate(comboInf.getComboCode(), comboInf.getComboVer().toString());
	}

}
