/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfPriceDutyDaoImpl;
import com.neusoft.abclife.productfactory.dto.MapDto;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TLiabFeeDef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TSuminsurIncrem;
import com.neusoft.abclife.productfactory.entity.TWaiveLiab;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_PfPriceDutyBo_bo")
@ModelFile(value = "PfPriceDutyBo.bo")
public class PfPriceDutyBoImpl {

	/**
	 * 
	 */
	@Resource(name="factoryabclife_PfPriceDutyDao_dao")
	private PfPriceDutyDaoImpl pfPriceDutyDaoImpl;
	
	public PfPriceDutyBoImpl() {
	}
	/**
	 * 根据传入的值进行多种判定删除 添加
	 * @param feedef
	 * @param liabFeeDef
	 * @param liabDef
	 * @param map
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public String addAndUpdateThree(TInsurtypeFeeDef feedef,List<TLiabFeeDef> liabFeeDef,
		TPricingLiabDef liabDef,MapDto map,TInsurtypeBasicInf insurtypeinfo,TWaiveLiab tWaiveLiab,TSuminsurIncrem tSuminsurIncrem){
		String message="";
		String opt = map.getOpt();
		if("add".equals(opt)){
			if(this.pfPriceDutyDaoImpl.checkCodeAndName_add(liabDef)){
				Long seqLiabDef = Long.parseLong(this.pfPriceDutyDaoImpl.getSeq("SEQ_PRICING_LIAB_DEF"));
				liabDef.setPricingLiabId(seqLiabDef);
				//保存定价责任
				this.pfPriceDutyDaoImpl.addTPricingLiabDef(liabDef);
				//保存豁免责任信息
				this.pfPriceDutyDaoImpl.addTWaiveLiab(tWaiveLiab);
				//保存保额递增信息
				this.pfPriceDutyDaoImpl.addTSuminsurIncrem(tSuminsurIncrem);
				//保存定价相关
				this.add(feedef, liabFeeDef, liabDef, map, insurtypeinfo);
				
			}else{
				if(liabDef.getPricingLiabCode()==null){
					message="定价代码或名称不能为空";
				}else{
					message="代码或名称重复";
				}
			}
		}
		if("update".equals(opt)){
			if(this.pfPriceDutyDaoImpl.checkCodeAndName(liabDef)){
				//修改定价信息
				this.pfPriceDutyDaoImpl.updatePrcingLiabDef(liabDef);
				//删除定价相关除定价外
				this.pfPriceDutyDaoImpl.delTobjEntance(liabDef);
				this.pfPriceDutyDaoImpl.delFeeDef(liabDef);
				//保存定价相关
				this.add(feedef, liabFeeDef, liabDef, map, insurtypeinfo);
				//修改豁免责任信息、保额递增信息
				this.upOrDelTwaTsum(liabDef,tWaiveLiab,tSuminsurIncrem);
			}else{
				message= "代码或名称重复";
			}
		}
		return message;
	}
	
	/**
	 * 修改豁免责任信息、保额递增信息
	 * @param liabDef
	 * @param tWaiveLiab
	 * @param tSuminsurIncrem
	 */
	public void upOrDelTwaTsum(TPricingLiabDef liabDef, TWaiveLiab tWaiveLiab, TSuminsurIncrem tSuminsurIncrem){
		if(liabDef.getIsWaive().equals("0")){
			this.pfPriceDutyDaoImpl.delTWaiveLiab(tWaiveLiab);
		}else{
			this.pfPriceDutyDaoImpl.upTWaiveLiab(tWaiveLiab);
		}
		if(liabDef.getIsAmntIncrem().equals("0")){
			this.pfPriceDutyDaoImpl.delTSuminsurIncrem(tSuminsurIncrem);
		}else{
			this.pfPriceDutyDaoImpl.upTSuminsurIncrem(tSuminsurIncrem);
		}
	}
	
	
	//定义一个添加定价相关表的方法
	@SuppressWarnings("deprecation")
	public void add(TInsurtypeFeeDef feedef,List<TLiabFeeDef> liabFeeDef,
			TPricingLiabDef liabDef,MapDto map,TInsurtypeBasicInf insurtypeinfo){
		//new一个对象公式序列
		List<TObjFormula> objFormulas = new ArrayList<TObjFormula>();
		//new一个对象入口序列
		List<TObjEntrance> objEntrances = new ArrayList<TObjEntrance>();
		
		String fee = map.getFee();
		String addprem = map.getAddprem();
		
			if(liabDef.getPremAlgoId()!=null && !liabDef.getPremAlgoId().equals("")){
				String objSeq = this.pfPriceDutyDaoImpl.getUUId();
				objFormulas.add(this.newTobjFormula("A1",liabDef.getPremAlgoId(),liabDef, objSeq));
				objEntrances.add(this.newTobjEntrance("A1", insurtypeinfo, objSeq, liabDef));
			}
			
			if(liabDef.getSuminsurAlgoId()!=null && !liabDef.getSuminsurAlgoId().equals("")){
				String objSeq = this.pfPriceDutyDaoImpl.getUUId();
				objFormulas.add(this.newTobjFormula("A2",liabDef.getSuminsurAlgoId(),liabDef, objSeq));
				objEntrances.add(this.newTobjEntrance("A2", insurtypeinfo, objSeq, liabDef));
			}
			
			//保存风险扣费
			if("yes".equals(fee)){
				String objSeq = this.pfPriceDutyDaoImpl.getUUId();
				objFormulas.add(this.newTobjFormula("B0",feedef.getFeeCalcFormulaId(),liabDef, objSeq));
				objEntrances.add(this.newTobjEntrance("B0", insurtypeinfo, objSeq, liabDef));
				feedef.setPricingLiabId(liabDef.getPricingLiabId());
				this.pfPriceDutyDaoImpl.addFeeDefALiabFeeDefALiabDef(feedef);
			}
				
			//保存加费定义
			if("yes".equals(addprem)){
				for(TLiabFeeDef t:liabFeeDef){
					t.setPricingLiabId(liabDef.getPricingLiabId());
					String algoType ="";
					if(t.getAddpremType().equals("01")){
						algoType = "C1";
					}
					if(t.getAddpremType().equals("02")){
						algoType = "C2";
					}
					String objSeq = this.pfPriceDutyDaoImpl.getUUId();
					objFormulas.add(this.newTobjFormula(algoType,t.getAddpremAlgoId(),liabDef, objSeq));
					objEntrances.add(this.newTobjEntrance(algoType, insurtypeinfo, objSeq, liabDef));
				}
				this.pfPriceDutyDaoImpl.addTLiabFeeDef(liabFeeDef);
			}
			
			//保存对象公式信息
			for(int i= 0;i<objFormulas.size();i++){
				this.pfPriceDutyDaoImpl.addTObjFormula(objFormulas.get(i));
			}
				
			//保存对象入口信息
			for(int i=0;i<objEntrances.size();i++){
				this.pfPriceDutyDaoImpl.addTObjEntrance(objEntrances.get(i));
			}
			
	}
	
	//new一个新的对象公式
	public TObjFormula newTobjFormula(String algoType,Long algoId,TPricingLiabDef liabDef,String objSeq){
		TObjFormula t = new TObjFormula();
		t.setType(algoType);
		t.setFormulaId(algoId);
		t.setHasRelation("0");
		t.setObjSeq(objSeq);
		t.setObjId(liabDef.getPricingLiabId());
		return t;
	}
	//new一个新的对象入口
	public TObjEntrance newTobjEntrance(String algoType,TInsurtypeBasicInf insurtypeinfo,String objSeq,TPricingLiabDef liabDef){
		TObjEntrance t2 = new TObjEntrance();
		t2.setAlgoType(algoType);
		t2.setRiskCode(insurtypeinfo.getInsurtypeCode());
		t2.setRiskVer(insurtypeinfo.getVerNo());
		t2.setObjSeq(objSeq);
		t2.setPricingLiabCode(liabDef.getPricingLiabCode());
		t2.setBusiType("01");
		return t2;
	}
	//包含翻页的定价信息查询
	public QueryResult queryPricingLiabDef(TInsurtypeBasicInf tInsurtypeBasicInf,int pageNumber,int pageSize){
		return this.pfPriceDutyDaoImpl.queryPricingLiabDef(tInsurtypeBasicInf, pageNumber, pageSize);
	}
	
	/**
	 * 删除定价责任
	 * @param tPricingLiabDef
	 */
	public void delLiabFeeDef(TPricingLiabDef tPricingLiabDef){
		this.pfPriceDutyDaoImpl.delTObjSkelement(tPricingLiabDef);
		this.pfPriceDutyDaoImpl.delTobjEntance(tPricingLiabDef);
		this.pfPriceDutyDaoImpl.delFeeDef(tPricingLiabDef);
		this.pfPriceDutyDaoImpl.delTPricingLiabDef(tPricingLiabDef);
		this.pfPriceDutyDaoImpl.delTwaTsum(tPricingLiabDef);
	}
	
	//用于修改页面加载
	public List<TLiabFeeDef> queryLiabFeeDef(TPricingLiabDef tPricingLiabDef){
		return this.pfPriceDutyDaoImpl.queryLiabFeeDef(tPricingLiabDef);
	}
	//用于修改页面加载
	public TInsurtypeFeeDef queryInsurtypeFeeDef(TPricingLiabDef tPricingLiabDef){
		return this.pfPriceDutyDaoImpl.queryInsurtypeFeeDef(tPricingLiabDef);
	}
	/**
	 * 用于修改页面加载-豁免责任表
	 * @param tPricingLiabDef
	 * @return
	 */
	public TWaiveLiab queryTWaiveLiab(TPricingLiabDef tPricingLiabDef){
		return this.pfPriceDutyDaoImpl.queryTWaiveLiab(tPricingLiabDef);
	}
	/**
	 * 用于修改页面加载-保额递增表
	 * @param tPricingLiabDef
	 * @return
	 */
	public TSuminsurIncrem queryTSuminsurIncrem(TPricingLiabDef tPricingLiabDef){
		return this.pfPriceDutyDaoImpl.queryTSuminsurIncrem(tPricingLiabDef);
	}
	/**
	 * 查询唯一责任加费
	 * @param tPricingLiabDef
	 * @param type
	 * @return
	 */
	public TLiabFeeDef queryOneLiabFeeDef(TPricingLiabDef tPricingLiabDef,String type){
		return this.pfPriceDutyDaoImpl.queryOneLiabFeeDef(tPricingLiabDef, type);
	}
	
}
