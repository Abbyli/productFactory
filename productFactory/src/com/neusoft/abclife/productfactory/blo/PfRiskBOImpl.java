/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskDAOImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Service("factoryabclife_pfRiskBO_bo")
@ModelFile(value = "pfRiskBO.bo")
public class PfRiskBOImpl {

	public PfRiskBOImpl() {}
	@Resource(name="factoryabclife_pfRiskDAO_dao")
	private PfRiskDAOImpl pfRiskDAOImpl;
	
	public void setPfRiskDAOImpl(PfRiskDAOImpl pfRiskDAOImpl) {
		this.pfRiskDAOImpl = pfRiskDAOImpl;
	}
	/**
	 * 保存险种
	 * @param tInsurtypeBasicInf
	 * @param opt
	 * @return
	 */
	public String saveRisk(TInsurtypeBasicInf tInsurtypeBasicInf, String opt){
		String message = "";
		message = checkRisk(tInsurtypeBasicInf, opt);
		if("".equals(message)){
			if("add".equals(opt)){
				
				pfRiskDAOImpl.addRisk(tInsurtypeBasicInf);
			}else{
				
				pfRiskDAOImpl.updateRisk(tInsurtypeBasicInf);
			}			
		}
		return message;
	}
	/**
	 * 检查险种
	 * @param tInsurtypeBasicInf
	 * @param opt
	 * @return
	 */
	public String checkRisk(TInsurtypeBasicInf tInsurtypeBasicInf, String opt){
		String message = "";
		List<TInsurtypeBasicInf> lists = pfRiskDAOImpl.checkRisk(tInsurtypeBasicInf);
		int size = lists.size();
		if("add".equals(opt)){
			//新增
			if(size == 1){
				message = "险种版本重复！";
			}
		}else{
			//修改 险种代码和版本 只读不校验
			
		}
		return message;
	}
	/**
	 * 修改险种信息
	 * @param tInsurtypeBasicInf
	 * @return
	 */
	public String updateRiskBase(TInsurtypeBasicInf tInsurtypeBasicInf){
		String message = "";
		pfRiskDAOImpl.updateRisk(tInsurtypeBasicInf);
		if(!"03".equals(tInsurtypeBasicInf.getDesignType())){
			this.pfRiskDAOImpl.clearFee(tInsurtypeBasicInf.getInsurtypeId());
		}
		if(!"1".equals(tInsurtypeBasicInf.getIsAccType())){
			this.pfRiskDAOImpl.clearAcc(tInsurtypeBasicInf.getInsurtypeId());
		}
		return message;
	}
	/**
	 * 逻辑删除险种
	 * @param tInsurtypeBasicInf
	 * @return
	 */
	public String delRiskBase(TInsurtypeBasicInf tInsurtypeBasicInf){
		//险种状态置为不可用
		String message = "";
		tInsurtypeBasicInf.setInsurtypeStatus("0");
		pfRiskDAOImpl.updateRisk(tInsurtypeBasicInf);
		return message;
	}
	/**
	 * 通过条件获取险种
	 * @param tInsurtypeBasicInf
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getRisksByCondition(TInsurtypeBasicInf tInsurtypeBasicInf, int pageNumber, int pageSize){
		QueryResult qr = pfRiskDAOImpl.getRisksByCondition(tInsurtypeBasicInf,pageNumber,pageSize);
		return qr;
	}
	/**
	 * 通过code查险种
	 * @param riskCode
	 * @return
	 */
	public List<TInsurtypeBasicInf> queryRisk(TInsurtypeBasicInf riskCode){
		List<TInsurtypeBasicInf> qr = this.pfRiskDAOImpl.queryRisk(riskCode);
		return qr;
	}
	//提交审核 add by shi.chl
	public String submitReview(TInsurtypeBasicInf tInsurtypeBasicInf){
		String message = "";
		this.pfRiskDAOImpl.submitReview(tInsurtypeBasicInf);
		return message;
	}
	
}
