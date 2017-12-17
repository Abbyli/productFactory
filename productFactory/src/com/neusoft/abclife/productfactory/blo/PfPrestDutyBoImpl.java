/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;


import com.neusoft.abclife.productfactory.dao.PfPrestDutyDaoImpl;
import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TGivepaidProcessDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 *
 */

@Service("factoryabclife_pfPrestDutyBo_bo")
@ModelFile(value = "pfPrestDutyBo.bo")
public class PfPrestDutyBoImpl {
	@Resource(name = "factoryabclife_pfPrestDutyDao_dao")
	private PfPrestDutyDaoImpl prestationDuty;
	/**
	 * 
	 */
	public PfPrestDutyBoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 定价责任查询
	 * @param insurtypebasciinf
	 * @return
	 */
	public List<TPricingLiabDef> getPfInsurtypePrest(TInsurtypeBasicInf insurtypebasciinf){
		return this.prestationDuty.getPfInsurtypePrest(insurtypebasciinf);
	}	

	/**
	 * 保障责任查询 分页
	 * @param priceDutyId
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryPriceDutyId(Long priceDutyId, int pageNumber,
			int pageSize){
		return this.prestationDuty.queryPriceDutyId(priceDutyId, pageNumber, pageSize);
	}	
	
	/**
	 * 保障责任查询 无分页
	 * @param priceDutyId
	 * @return
	 */
	public List<TProtecLiabDef> queryPriceDutyIdNoPage(Long priceDutyId){
		return this.prestationDuty.queryPriceDutyIdNoPage(priceDutyId);
	}
	
	/**
	 * 理赔给付查询
	 * @param tqueryClaim
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TClaimGivepayDef> queryClaim(Long tqueryClaim){
		return this.prestationDuty.queryClaim(tqueryClaim);
	}	

	/**
	 * 保障责任添加
	 * @param prest
	 * @return
	 */
	public String addPrest(TProtecLiabDef prest) {
		String message = "";
		if(prestationDuty.checkValue(prest)){
			this.prestationDuty.addPrest(prest);
		}else{
			message="输入值重复";
		};
		return message;
	}

	/**
	 * 理赔给付保存
	 * @param prestClaim
	 * @param givePaid
	 * @param protecLiabType
	 * @param opt
	 * @return
	 */
	public String addPrestClaim(TClaimGivepayDef prestClaim,List<String> givePaid,String protecLiabType,String opt){
		String message="";
		int claimParam = this.prestationDuty.checkClaimParam(prestClaim);
		int claimParam2 = this.prestationDuty.checkClaimParam2(prestClaim);
		int claimParam3 = this.prestationDuty.checkClaimParam3(prestClaim);
		if("add".equals(opt)){
			if(claimParam+claimParam2+claimParam3>0){
				return "理赔给付项重复";
			}
			this.prestationDuty.addPrestClaim(prestClaim,givePaid,protecLiabType);
		}
		if("update".equals(opt)){
			if(claimParam2+claimParam3>0){
				return "理赔给付项重复";
			}
			this.prestationDuty.updatePrestClaim(prestClaim,givePaid,protecLiabType);		
		}
		if("original".equals(opt)){
			if(claimParam2>0){
				return "理赔给付项重复";
			}
			this.prestationDuty.updatePrestClaim(prestClaim,givePaid,protecLiabType);
		}
		if("original2".equals(opt)){
			if(claimParam3>0){
				return "理赔给付项重复";
			}
			this.prestationDuty.updatePrestClaim(prestClaim,givePaid,protecLiabType);
		}
		if("no".equals(opt)){
			this.prestationDuty.updatePrestClaim(prestClaim,givePaid,protecLiabType);
		}
		return message;

	}

	/**
	 *  理赔和给付后删除
	 * @param tdelClaim
	 * @param type
	 */
	public void delPrestClaim(TClaimGivepayDef tdelClaim, String type){
		this.prestationDuty.delAllformulaparamrelation(tdelClaim.getClaimGivepayId(), type);
		this.prestationDuty.delAllAccDetail(tdelClaim.getClaimGivepayId());
		this.prestationDuty.delPrestClaim(tdelClaim);
	}
	
	/**
	 * 给付后处理查询
	 * @param givepatId
	 * @return
	 */
	public List<TGivepaidProcessDef> queryGivePaid(String givepatId){
		return this.prestationDuty.queryGivePaid(givepatId);
	}
	/**
	 * 保存生存给付信息
	 * @param tSurvvGivepayDef
	 * @param opt
	 * @return
	 */
	public String saveTSurvvGivepayDef(TSurvvGivepayDef tSurvvGivepayDef,String opt){
		String message="";
		if("add".equals(opt)){
			if(this.prestationDuty.checkTSurvvGivepayDefNameAdd(tSurvvGivepayDef)){
				this.prestationDuty.addTSurvvGivepayDef(tSurvvGivepayDef);
			}else{
				message="给付项重复";
			}
			
		}
		if("update".equals(opt)){
			if(this.prestationDuty.checkTSurvvGivepayDefNameUpdate(tSurvvGivepayDef)){
				this.prestationDuty.updateTSurvvGivepayDef(tSurvvGivepayDef);
			}else{
				message="给付项重复";
			}
			
		}
		
		return message;
	}
	/**
	 * 查询生存给付信息
	 * @param tProtecLiabDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TSurvvGivepayDef> queryTSurvvGivepayDef(TProtecLiabDef tProtecLiabDef){
		return this.prestationDuty.queryTSurvvGivepayDef(tProtecLiabDef.getProtecLiabId());
	}
	/**
	 * 删除生存给付信息
	 * @param tSurvvGivepayDef
	 */
	public void delTSurvvGivepayDef(TSurvvGivepayDef tSurvvGivepayDef,String type){
		this.prestationDuty.delAllformulaparamrelation(tSurvvGivepayDef.getSurvvGivepayId(), type);
		this.prestationDuty.delTSurvvGivepayDef(tSurvvGivepayDef);
	}
	/**
	 * 保障责任删除
	 * @param tProtecLiabDef
	 */
	public void delTProtecLiabDef(TProtecLiabDef tProtecLiabDef){
		this.prestationDuty.delTProtecLiabDef(tProtecLiabDef);
	}
	/**
	 * 查询对象公式数据
	 * @param id
	 * @param type
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public List<TObjFormula> getTObjFormula(Long id,String type){
		
		return this.prestationDuty.getTObjFormula(id, type);
	}
	/**
	 * 获取所有的保障责任
	 * @return
	 */
	public List<TProtecLiabDef> getAllProtecLiab(){
		return this.prestationDuty.getAllProtecLiab();
	}
	
}
