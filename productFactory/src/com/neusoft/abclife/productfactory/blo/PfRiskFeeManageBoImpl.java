/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskFeeManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.TFeeRate;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskFeeManageBo_bo")
@ModelFile(value = "pfRiskFeeManageBo.bo")
public class PfRiskFeeManageBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_pfRiskFeeManageDao_dao")
	private PfRiskFeeManageDaoImpl pfRiskFeeManageDaoImpl;
	
	public PfRiskFeeManageBoImpl() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 保存费用管理数据的方法 每次均是删除所有再添加
	 * @param tFeeRate
	 * @param tInsurtypeFeeDef
	 * @return
	 */
	public String saveRiskFeeManage(List<TFeeRate> tFeeRate,TInsurtypeFeeDef tInsurtypeFeeDef,
			TInsurtypeBasicInf tInsurtypeBasicinf){
		String message="";
		//删除对象公式和对象入口信息
		this.pfRiskFeeManageDaoImpl.delTobjEntance(tInsurtypeFeeDef);
		
		//添加对象公式和对象入口信息
		String objSeq = this.pfRiskFeeManageDaoImpl.getUUId();
		TObjFormula tof = this.newTobjFormula(tInsurtypeFeeDef.getFeeType(), tInsurtypeFeeDef.getFeeCalcFormulaId(), tInsurtypeBasicinf, objSeq);
		TObjEntrance toe = this.newTobjEntrance(tInsurtypeFeeDef.getFeeType(), tInsurtypeBasicinf, objSeq);
		this.pfRiskFeeManageDaoImpl.addTObjEntrance(toe);
		this.pfRiskFeeManageDaoImpl.addTObjFormula(tof);
		
		//根据判断主键有无进行费用管理的添加修改
		if(tInsurtypeFeeDef.getInsurtypeFeeId()==null || "".equals(tInsurtypeFeeDef.getInsurtypeFeeId()) || tInsurtypeFeeDef.getInsurtypeFeeId()==0L){
			if(this.pfRiskFeeManageDaoImpl.checkCodeAndName_add(tInsurtypeFeeDef)){
				this.pfRiskFeeManageDaoImpl.addTInsurtypeFeeDef(tInsurtypeFeeDef);
			}else{
				message="费用代码重复";
			}
			
		}else{
			if(this.pfRiskFeeManageDaoImpl.checkCodeAndName(tInsurtypeFeeDef)){
				this.pfRiskFeeManageDaoImpl.updateTInsurtypeFeeDef(tInsurtypeFeeDef);
			}else{
				message="费用代码重复";
			}
			
		}
		//删添费率信息
		String feeType = tInsurtypeFeeDef.getFeeType();
		Long insurtypeId = tInsurtypeFeeDef.getInsurtypeId();
		this.pfRiskFeeManageDaoImpl.deleteAllTFeeRate(feeType, insurtypeId);
		String uuid = this.pfRiskFeeManageDaoImpl.getUUId();
		for(TFeeRate t:tFeeRate){
			t.setFeeFlag(uuid);
			this.pfRiskFeeManageDaoImpl.addTFeeRate(t);
		}
		
		
		
		
		return message;
	}
	//new一个新的对象公式
	public TObjFormula newTobjFormula(String algoType,Long algoId,TInsurtypeBasicInf tInsurtypeBasicinf,String objSeq){
		TObjFormula t = new TObjFormula();
		t.setType(algoType);
		t.setFormulaId(algoId);
		t.setHasRelation("0");
		t.setObjSeq(objSeq);
		t.setObjId(tInsurtypeBasicinf.getInsurtypeId());
		return t;
	}
	//new一个新的对象入口
	public TObjEntrance newTobjEntrance(String algoType,TInsurtypeBasicInf tInsurtypeBasicinf,String objSeq){
		TObjEntrance t = new TObjEntrance();
		t.setAlgoType(algoType);
		t.setRiskCode(tInsurtypeBasicinf.getInsurtypeCode());
		t.setRiskVer(tInsurtypeBasicinf.getVerNo());
		t.setObjSeq(objSeq);
		t.setBusiType("01");
		if("B5".equals(algoType)||"B6".equals(algoType)){
			t.setBusiType("03");
		}
		return t;
	}
	
	/**
	 * 根据险种和费用类型来查询费用定义表唯一数据
	 * @param feeType
	 * @param insurtypeId
	 * @return
	 */
	public TInsurtypeFeeDef queryTInsurtypeFeeDef(String feeType,Long insurtypeId){
		return this.pfRiskFeeManageDaoImpl.queryTInsurtypeFeeDef(feeType, insurtypeId);
	}
	/**
	 * 根据险种和费用类型来查询费率信息
	 * @param feeType
	 * @param insurtypeId
	 * @return
	 */
	public List<TFeeRate> queryTFeeRate(String feeType,Long insurtypeId){
		return this.pfRiskFeeManageDaoImpl.queryTFeeRate(feeType, insurtypeId);
	}
	
	/**
	 * 删除费率信息
	 * @param tFeeRate
	 */
	public void deleteTFeeRate(TFeeRate tFeeRate){
		this.pfRiskFeeManageDaoImpl.deleteTFeeRate(tFeeRate);
	}
	/**
	 * 清空费用
	 * @param tInsurtypeFeeDef
	 */
	
	public void clear(TInsurtypeFeeDef tInsurtypeFeeDef){
		this.pfRiskFeeManageDaoImpl.delTobjEntance(tInsurtypeFeeDef);
		this.pfRiskFeeManageDaoImpl.deleteAllTFeeRate(tInsurtypeFeeDef);
		this.pfRiskFeeManageDaoImpl.saveRemove(tInsurtypeFeeDef);
	}
	
}
