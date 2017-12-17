/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.CalTestDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_calTestBo_bo")
@ModelFile(value = "calTestBo.bo")
public class CalTestBoImpl {

	/**
	 * 
	 */
	public CalTestBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_calTestDao_dao")
	private CalTestDaoImpl calTestDao;
	/**
	 * 通过险种代码和版本号查险种下定价责任
	 * @param code
	 * @param verNo
	 * @return
	 */
	public List<TPricingLiabDef> getTPricingLiabDefs(String code,String verNo){
		TInsurtypeBasicInf insur = calTestDao.getInsur(code, verNo);
		return calTestDao.getTPricingLiabDefs(insur.getInsurtypeId());
		
	}
	/**
	 * 通过代码查询有效险种
	 * @param code
	 * @return
	 */
	public List<TInsurtypeBasicInf> getInsurCode(String code){
		return calTestDao.getInsurCode(code);
	}

	/**
	 * 通过保障责任ID查询生存给付项
	 */
	public List<TSurvvGivepayDef> getSurvvGivepay(Long id){
		return calTestDao.getSurvvGivepay(id);
	}
}
