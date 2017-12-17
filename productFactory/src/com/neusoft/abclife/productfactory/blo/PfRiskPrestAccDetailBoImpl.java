/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfPrestDutyDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskPrestAccDetailDaoImpl;
import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskPrestAccDetailBo_bo")
@ModelFile(value = "pfRiskPrestAccDetailBo.bo")
public class PfRiskPrestAccDetailBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskPrestAccDetailDao_dao")
	private PfRiskPrestAccDetailDaoImpl accDetail;
	
	@Resource(name="factoryabclife_pfPrestDutyDao_dao")
	private PfPrestDutyDaoImpl pfPrestDutyDaoImpl;
	
	public PfRiskPrestAccDetailBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 保存账户明细
	 * @param tClaimPayItemDetail
	 * @param opt
	 * @return
	 */
	public String saveAccDetail(TClaimPayItemDetail tClaimPayItemDetail,String opt){
		String message = "";
		if("add".equals(opt)){
			if(this.accDetail.checkCode_add(tClaimPayItemDetail)){
				this.accDetail.addAccDetail(tClaimPayItemDetail);
			}else{
				message="账户明细代码重复";
			}
			
		}
		if("update".equals(opt)){
			if(this.accDetail.checkCode(tClaimPayItemDetail)){
				//如果修改类型从使用公式到其他时删除其相关公式
				if(!"02".equals(tClaimPayItemDetail.getClaimPayCalcWay())){
					pfPrestDutyDaoImpl.delAllformulaparamrelation(tClaimPayItemDetail.getPayItemDetailId(), "D3");
				}
				this.accDetail.updateAccDetail(tClaimPayItemDetail);
			}else{
				message="账户明细代码重复";
			}
			
		}
		return message;
	}
	/**
	 * 翻页查询账户明细
	 * @param tClaimGivepayDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult getAccDetail(TClaimGivepayDef tClaimGivepayDef,TClaimPayItemDetail tClaimPayItemDetail,int pageNumber,int pageSize){
		return this.accDetail.getAccDetail(tClaimGivepayDef,tClaimPayItemDetail, pageNumber, pageSize);
	}
	/**
	 * 添加默认数据
	 * @param tClaimGivepayDef
	 */
	public void addDefautValue(TClaimGivepayDef tClaimGivepayDef){
		List<TClaimPayItemDetail> list = this.accDetail.createDatas(tClaimGivepayDef);
		for(int i=0;i<list.size();i++){
			if(this.accDetail.checkCode_add(list.get(i))){
				this.accDetail.addAccDetail(list.get(i));
			}
		}
		
	}
	/**
	 * 删除账户明细数据
	 * @param tClaimPayItemDetail
	 */
	
	public void delAccDetail(TClaimPayItemDetail tClaimPayItemDetail){
		pfPrestDutyDaoImpl.delAllformulaparamrelation(tClaimPayItemDetail.getPayItemDetailId(), "D3");
		this.accDetail.delAccDetail(tClaimPayItemDetail);
	}
}
