/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfApproveDaoImpl;
import com.neusoft.abclife.productfactory.dto.ProApproveDTO;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 *
 */
@Service("factoryabclife_pfApproveBo_bo")
@ModelFile(value = "pfApproveBo.bo")
public class PfApproveBoImpl {
	@Resource(name="factoryabclife_pfApproveDao_dao")
	private PfApproveDaoImpl pfApprove;
	/**
	 * 
	 */
	public PfApproveBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 审核查询
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryApprove(ProApproveDTO tInsurtypeBasicInf, int pageNumber, int pageSize){
		QueryResult qr = null;
		//01查险种
		if("01".equals(tInsurtypeBasicInf.getProType())){
			qr = this.pfApprove.queryApproveByInsur(tInsurtypeBasicInf,pageNumber,pageSize);
		}
		//02查组合
		if("02".equals(tInsurtypeBasicInf.getProType())){
			qr = this.pfApprove.queryApproveByCombo(tInsurtypeBasicInf, pageNumber, pageSize);
		}
		
		return qr;
	}
	//审核通过与否
	public String saveApprove(ProApproveDTO tInsurtypeBasicInf, String opt){
		String message="";
		if("true".equals(opt)){
			this.pfApprove.saveApproveTrue(tInsurtypeBasicInf);
		}
		
		if("false".equals(opt)){
			this.pfApprove.saveApproveFalse(tInsurtypeBasicInf);
		}
		
		return message;
	}
	//查询险种ById
	public TInsurtypeBasicInf queryInsurById(ProApproveDTO dto){
		return this.pfApprove.queryInsurById(dto);
	}
	//查询组合ById
	public TComboInf queryComboById(ProApproveDTO dto){
		return this.pfApprove.queryComboById(dto);
	}
}
