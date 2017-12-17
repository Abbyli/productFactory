/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfPrestDutyDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskLiabLimitDaoImpl;
import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskLiabLimitBo_bo")
@ModelFile(value = "pfRiskLiabLimitBo.bo")
public class PfRiskLiabLimitBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskLiabLimitDao_dao")
	private PfRiskLiabLimitDaoImpl liabLimitDaoImpl;
	@Resource(name="factoryabclife_pfPrestDutyDao_dao")
	private PfPrestDutyDaoImpl prestDutyDao;
	
	public PfRiskLiabLimitBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 保存责任限额
	 * @param tLiabLimit
	 * @return
	 */
	public String saveLiabLimit(TLiabLimit tLiabLimit){
		String message="";
		if(null == tLiabLimit.getId()||"".equals(tLiabLimit.getId())){
			if(liabLimitDaoImpl.checkCodeAndName_add(tLiabLimit)){
				this.liabLimitDaoImpl.addLiabLimit(tLiabLimit);
			}else{
				message="数据重复";
			}
			
		}else{
			if(liabLimitDaoImpl.checkCodeAndName(tLiabLimit)){
				this.liabLimitDaoImpl.updateLiabLimit(tLiabLimit);
			}else{
				message="数据重复";
			}
			
		}
		
		
		return message;
	}
	/**
	 * 查询责任限额
	 * @param protecLiabCode
	 * @param limitType
	 * @param riskVer
	 * @return
	 */
	public List<TLiabLimit> queryTLiabLimit(String protecLiabCode,String limitType,Long riskVer){
		return this.liabLimitDaoImpl.queryTLiabLimit(protecLiabCode, limitType, riskVer);
	}
	/**
	 * 删除责任限额
	 * @param tLiabLimit
	 */
	public void delTLiabLimit(TLiabLimit tLiabLimit){
		this.prestDutyDao.delAllformulaparamrelation(tLiabLimit.getId(),"D2");
		this.liabLimitDaoImpl.delTLiabLimit(tLiabLimit);
	}
	
	

}
