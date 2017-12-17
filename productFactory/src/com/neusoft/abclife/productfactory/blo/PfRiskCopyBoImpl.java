/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfInsurtypeAccDefImpl;
import com.neusoft.abclife.productfactory.dao.PfPrestDutyDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfPriceDutyDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRelationDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskAttribDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskCopyDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskDAOImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskElementDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskFeeManageDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskItemDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskLiabLimitDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskParamDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskPrestAccDetailDaoImpl;
import com.neusoft.abclife.productfactory.dao.PfRiskRateManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TClaimPayItemDetail;
import com.neusoft.abclife.productfactory.entity.TFeeRate;
import com.neusoft.abclife.productfactory.entity.TGivepaidProcessDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypeCustElemCtrl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeFeeDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsItemDef;
import com.neusoft.abclife.productfactory.entity.TLiabFeeDef;
import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjRateDimenRef;
import com.neusoft.abclife.productfactory.entity.TObjRelation;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfRiskCopyBo_bo")
@ModelFile(value = "pfRiskCopyBo.bo")
public class PfRiskCopyBoImpl {

	/**
	 * 
	 */
	private final int SUBNUNBER = 4;
	
	@Resource(name="factoryabclife_pfRiskCopyDao_dao")
	private PfRiskCopyDaoImpl copyDao;
	
	@Resource(name="factoryabclife_pfRiskDAO_dao")
	private PfRiskDAOImpl pfRiskDAOImpl;
	
	@Resource(name="factoryabclife_PfPriceDutyDao_dao")
	private PfPriceDutyDaoImpl pfPriceDutyDaoImpl;
	
	@Resource(name = "factoryabclife_PfRiskParamDao_dao")
	private PfRiskParamDaoImpl pfRiskParamDaoImpl;
	
	@Resource(name = "factoryabclife_pfPrestDutyDao_dao")
	private PfPrestDutyDaoImpl prestationDuty;
	
	@Resource(name="factoryabclife_pfRelationDao_dao")
	private PfRelationDaoImpl pfRelationDaoImpl;
	
	@Resource(name="factoryabclife_pfRiskPrestAccDetailDao_dao")
	private PfRiskPrestAccDetailDaoImpl accDetail;
	
	@Resource(name="factoryabclife_pfRiskRateManageDao_dao")
	private PfRiskRateManageDaoImpl pfRiskRateManageDaoImpl;
	
	@Resource(name="factoryabclife_pfRiskLiabLimitDao_dao")
	private PfRiskLiabLimitDaoImpl liabLimitDaoImpl;
	
	@Resource(name="factoryabclife_pfRiskFeeManageDao_dao")
	private PfRiskFeeManageDaoImpl pfRiskFeeManageDaoImpl;
	
	@Resource(name="factoryabclife_PfInsurtypeAccDef_dao")
	private PfInsurtypeAccDefImpl insurtypeAccDef;
	
	@Resource(name = "factoryabclife_pfRiskAttribDao_dao")
	private PfRiskAttribDaoImpl pfRiskAttrib;
	
	@Resource(name = "factoryabclife_pfRiskItemDao_dao")
	private PfRiskItemDaoImpl pfRiskItem;
	
	@Resource(name="factoryabclife_pfRiskElementDao_dao")
	private PfRiskElementDaoImpl  pfRiskElementDaoImpl;
	
	public PfRiskCopyBoImpl() {
		
		
	}
	
	@SuppressWarnings("deprecation")
	public String Copy(TInsurtypeBasicInf newInsur,String code,String riskVerNo){
		String message = "";
		//险种
		Long verNo = Long.parseLong(riskVerNo);
		TInsurtypeBasicInf oldInsur = this.copyDao.getOnlyInsur(code, verNo);
		this.oldToNewInsur(newInsur, oldInsur);
		this.pfRiskDAOImpl.addRisk(newInsur);
		Long newInsurtypeId = newInsur.getInsurtypeId();
		//定价 A1 A2
		List<TPricingLiabDef> pricingLiabDefs = this.copyDao.getTPricingLiabDefs(oldInsur);
		for(int i=0;i<pricingLiabDefs.size();i++){
			TPricingLiabDef pricingLiabDef = pricingLiabDefs.get(i);
			Long oldPricingLiabDefId = pricingLiabDef.getPricingLiabId();
			Long newPricingLiabDefId = Long.parseLong(this.copyDao.getSeq("SEQ_PRICING_LIAB_DEF"));
			pricingLiabDef.setInsurtypeId(newInsurtypeId);
			pricingLiabDef.setPricingLiabId(newPricingLiabDefId);
			String oldPricingCode = pricingLiabDef.getPricingLiabCode();
			String newPricingCode = newInsur.getInsurtypeCode()+ oldPricingCode.substring(SUBNUNBER);
			pricingLiabDef.setPricingLiabCode(newPricingCode);
			this.pfPriceDutyDaoImpl.addTPricingLiabDef(pricingLiabDef);
			
			
			//风险扣费  B3
			List<TInsurtypeFeeDef> tInsurtypeFeeDefs = this.copyDao.getTInsurtypeFeeDefs(oldPricingLiabDefId);
			for(int j = 0;j<tInsurtypeFeeDefs.size();j++){
				tInsurtypeFeeDefs.get(j).setInsurtypeId(newInsurtypeId);
				tInsurtypeFeeDefs.get(j).setPricingLiabId(newPricingLiabDefId);
				this.pfPriceDutyDaoImpl.addFeeDefALiabFeeDefALiabDef(tInsurtypeFeeDefs.get(j));
			}
			
			//责任加费 C1 C2
			List<TLiabFeeDef> tLiabFeeDefs = this.copyDao.getTLiabFeeDefs(oldPricingLiabDefId);
			for(int j = 0 ;j<tLiabFeeDefs.size() ; j++){
				Long feeId = Long.parseLong(this.copyDao.getSeq("SEQ_LIAB_FEE_DEF"));
				tLiabFeeDefs.get(j).setLiabAddpremId(feeId);
				tLiabFeeDefs.get(j).setInsurtypeId(newInsurtypeId);
				tLiabFeeDefs.get(j).setPricingLiabId(newPricingLiabDefId);
				this.copyDao.saveNew(tLiabFeeDefs.get(j));
			}
			
			//定价中的对象公式
			List<TObjFormula> pricingFormulas = this.copyDao.getPrcingFormulas(oldPricingLiabDefId);
				for(int j=0;j<pricingFormulas.size();j++){
					String pricingObjSeq = this.copyDao.getUUId();
					String oldPricingObjSeq = pricingFormulas.get(j).getObjSeq();
					pricingFormulas.get(j).setObjId(newPricingLiabDefId);
					pricingFormulas.get(j).setObjSeq(pricingObjSeq);
					this.pfPriceDutyDaoImpl.addTObjFormula(pricingFormulas.get(j));
				
					//入口
					List<TObjEntrance> pricingEntrances = this.copyDao.getTObjEntrances(oldPricingObjSeq);
					for(int k=0 ; k<pricingEntrances.size();k++){
						TObjEntrance entrance= pricingEntrances.get(k);
						entrance.setPricingLiabCode(newPricingCode);
						entrance.setRiskVer(newInsur.getVerNo());
						entrance.setRiskCode(newInsur.getInsurtypeCode());
						entrance.setObjSeq(pricingObjSeq);
						this.pfPriceDutyDaoImpl.addTObjEntrance(entrance);
					}
				}
				
			//投保要素	
				List<TObjSkelement> pricingElements = this.copyDao.queryElement(oldPricingLiabDefId, "1");
				for(TObjSkelement element:pricingElements){
					element.setDutyId(newPricingLiabDefId);
					TPropShowDef show = this.copyDao.queryshow(element.getId());
					Long seq = Long.parseLong(this.pfRiskElementDaoImpl.getSeq("SEQ_OBJ_SKELEMENT"));
					element.setId(seq);
					show.setObjId(seq);
					this.pfRiskElementDaoImpl.addTObjSkelement(element);
					this.pfRiskElementDaoImpl.addTPropShowDef(show);
				}	
			
			//保障责任
			List<TProtecLiabDef> tProtecLiabDefs = this.copyDao.getTProtecLiabDefs(oldPricingLiabDefId);
			if(tProtecLiabDefs == null){
				tProtecLiabDefs = new ArrayList<TProtecLiabDef>();
			}
			for(int j=0;j<tProtecLiabDefs.size();j++){
				TProtecLiabDef protecLiabDef = tProtecLiabDefs.get(j);
				Long oldProtecId = protecLiabDef.getProtecLiabId();
				String oldProtecCode = protecLiabDef.getProtecLiabCode();
				String newProtecCode = newInsur.getInsurtypeCode()+protecLiabDef.getProtecLiabCode().substring(SUBNUNBER);
				protecLiabDef.setProtecLiabCode(newProtecCode);
				protecLiabDef.setPricingLiabCode(newPricingCode);
				protecLiabDef.setPricingLiabId(newPricingLiabDefId);
				this.prestationDuty.addPrest(protecLiabDef);
				//理赔给付
				if("1".equals(protecLiabDef.getProtecLiabType())){
					List<TClaimGivepayDef> tClaimGivepayDefs = this.prestationDuty.queryClaim(oldProtecId);
					for(int k=0;k<tClaimGivepayDefs.size();k++){
						TClaimGivepayDef tClaimGivepayDef = tClaimGivepayDefs.get(k);
						Long oldClaimId = tClaimGivepayDef.getClaimGivepayId();
						String oldclaminpayCode = tClaimGivepayDef.getClaimGivepayCode();
						String newclaminpayCode = newInsur.getInsurtypeCode()+ oldclaminpayCode.substring(SUBNUNBER);
						
						tClaimGivepayDef.setProtecLiabId(protecLiabDef.getProtecLiabId());
						tClaimGivepayDef.setPricingLiabCode(newPricingCode);
						tClaimGivepayDef.setProtecLiabCode(newProtecCode);
						tClaimGivepayDef.setClaimGivepayCode(newclaminpayCode);
						Long claimId = Long.parseLong(this.copyDao.getSeq("SEQ_CLAIM_GIVEPAY_DEF"));
						tClaimGivepayDef.setClaimGivepayId(claimId);
						this.prestationDuty.saveNew(tClaimGivepayDef);
						
						this.copyFormulas(oldClaimId, "D1#1", tClaimGivepayDef.getClaimGivepayId(), newPricingCode, newInsur);
						//账单
						if("06".equals(tClaimGivepayDef.getClaimClaimPayType())){
							List<TClaimPayItemDetail> tClaimPayItemDetails = this.copyDao.getTClaimPayItemDetails(oldClaimId);
							for(int l=0;l<tClaimPayItemDetails.size();l++){
								TClaimPayItemDetail tClaimPayItemDetail = tClaimPayItemDetails.get(l);
								Long oldDetailId = tClaimPayItemDetail.getPayItemDetailId();
								tClaimPayItemDetail.setClaimGivepayId(tClaimGivepayDef.getClaimGivepayId());
								this.accDetail.addAccDetail(tClaimPayItemDetail);
								//录入公式
								if("02".equals(tClaimPayItemDetail.getClaimPayCalcWay())){
									this.copyFormulas(oldDetailId, "D3", tClaimPayItemDetail.getPayItemDetailId(), newPricingCode, newInsur);
								}
							}
						}
						//理赔要素
						List<TObjSkelement> protecElements = this.copyDao.queryElement(oldClaimId, "2");
						if(protecElements == null){
							protecElements = new ArrayList<TObjSkelement>();
						}
						for(TObjSkelement element:protecElements){
							element.setDutyId(newPricingLiabDefId);
							TPropShowDef show = this.copyDao.queryshow(element.getId());
							Long seq = Long.parseLong(this.pfRiskElementDaoImpl.getSeq("SEQ_OBJ_SKELEMENT"));
							element.setId(seq);
							show.setObjId(seq);
							this.pfRiskElementDaoImpl.addTObjSkelement(element);
							this.pfRiskElementDaoImpl.addTPropShowDef(show);
						}
						//赔付后动作
						List<TGivepaidProcessDef> givepays = this.copyDao.queryGivepaid(oldClaimId);
						if(givepays == null){
							givepays = new ArrayList<TGivepaidProcessDef>();
						}
						for(TGivepaidProcessDef givepaid:givepays){
							givepaid.setGivepayId(tClaimGivepayDef.getClaimGivepayId());
							givepaid.setProtecLiabCode(tClaimGivepayDef.getProtecLiabCode());
							givepaid.setGivepayCode(tClaimGivepayDef.getClaimGivepayCode());
							this.copyDao.addGivepaid(givepaid);
						}
					}
				}
				//生存给付
				if("0".equals(protecLiabDef.getProtecLiabType())){
					List<TSurvvGivepayDef> tSurvvGivepayDefs = this.prestationDuty.queryTSurvvGivepayDef(oldProtecId);
					for(int k=0;k<tSurvvGivepayDefs.size();k++){
						TSurvvGivepayDef tSurvvGivepayDef = tSurvvGivepayDefs.get(k);
						String oldsurvvGivepayCode = tSurvvGivepayDef.getSurvvGivepayCode();
						String newsurvvGivepayCode = newInsur.getInsurtypeCode()+ oldsurvvGivepayCode.substring(SUBNUNBER);
						Long oldSurvvId = tSurvvGivepayDef.getSurvvGivepayId();
						tSurvvGivepayDef.setProtecLiabId(protecLiabDef.getProtecLiabId());
						tSurvvGivepayDef.setPricingLiabCode(newPricingCode);
						tSurvvGivepayDef.setProtecLiabCode(newProtecCode);
						tSurvvGivepayDef.setSurvvGivepayCode(newsurvvGivepayCode);
						this.prestationDuty.addTSurvvGivepayDef(tSurvvGivepayDef);
						
						this.copyFormulas(oldSurvvId, "D1#0", tSurvvGivepayDef.getSurvvGivepayId(), newPricingCode, newInsur);
					}
				}
				//责任限额
				List<TLiabLimit> tLiabLimits = this.copyDao.getTLiabLimit(code, verNo, oldProtecCode);
				if(tLiabLimits == null){
					tLiabLimits = new ArrayList<TLiabLimit>();
				}
				for(int k = 0;k<tLiabLimits.size();k++){
					TLiabLimit tLiabLimit = tLiabLimits.get(k);
					tLiabLimit.setProtecLiabCode(newProtecCode);
					tLiabLimit.setPricingLiabCode(newPricingCode);
					tLiabLimit.setRiskVer(newInsur.getVerNo());
					String refProectLiab = tLiabLimit.getRefProtecLiabCode();
					String[] ref = refProectLiab.split(",");
					String newRefProtec = "";
					for(int l = 0;l<ref.length;l++){
						newRefProtec += ","+newInsur.getInsurtypeCode()+ref[l].substring(SUBNUNBER);
					}
					newRefProtec = newRefProtec.substring(1);
					tLiabLimit.setRefProtecLiabCode(newRefProtec);
					Long oldLimitId = tLiabLimit.getId();
					this.liabLimitDaoImpl.addLiabLimit(tLiabLimit);
					copyFormulas(oldLimitId,"D2",tLiabLimit.getId(),newPricingCode,newInsur);
					
				}
				
			}
			
			//风险保额
			this.copyFormulas(oldPricingLiabDefId, "E1#__", newPricingLiabDefId, newPricingCode, newInsur);
			
			//精算数据
			List<TObjRate> tObjRates = this.copyDao.getTObjRate(code, verNo, oldPricingCode);
			if(tObjRates == null){
				tObjRates = new ArrayList<TObjRate>();
			}
			for(int j=0;j<tObjRates.size();j++){
				TObjRate tObjRate = tObjRates.get(j);
				tObjRate.setInsurtypeCode(newInsur.getInsurtypeCode());
				tObjRate.setVerNo(newInsur.getVerNo());
				tObjRate.setPricingLiabCode(newPricingCode);
				
				tObjRate.setTableName("R_"+tObjRate.getRateType()+"_"+tObjRate.getPricingLiabCode()+"_"+tObjRate.getVerNo());
				
				List<TObjRateDimenRef> tObjRateDimenRefs = this.copyDao.getTObjRateDimenRef(tObjRate.getId());
				this.pfRiskRateManageDaoImpl.saveTObjRate(tObjRate);
				for(int k = 0;k<tObjRateDimenRefs.size();k++){
					TObjRateDimenRef tObjRateDimenRef = tObjRateDimenRefs.get(k);
					tObjRateDimenRef.setObjRateId(tObjRate.getId());
					this.copyDao.saveTObjRateDimenRef(tObjRateDimenRef);
				}
				String SQL = createTableSQL(tObjRateDimenRefs,tObjRate);
				pfRiskRateManageDaoImpl.saveTable(SQL);
			}
			
			
		
		}
		
		//参数定义
		List<TProductParamDef> tProductParamDefs = this.copyDao.getTProductParamDefs(oldInsur);
		if(tProductParamDefs == null){
			tProductParamDefs = new ArrayList<TProductParamDef>();
		}
		for(int i = 0;i<tProductParamDefs.size();i++){
			tProductParamDefs.get(i).setEntityId(newInsurtypeId);
			this.pfRiskParamDaoImpl.addPfRiskParamDef(tProductParamDefs.get(i));
		}
		
		//人员定义
		List<TInsurtypeCustElemCtrl> insuCusts = this.copyDao.queryTInsurtypeCustElemCtrl(oldInsur.getInsurtypeId());
		if(insuCusts == null){
			insuCusts = new ArrayList<TInsurtypeCustElemCtrl>();
		}
		for(int i = 0;i<insuCusts.size();i++){
			insuCusts.get(i).setInsurtypeId(newInsurtypeId);
			this.pfRiskParamDaoImpl.addPersonnel(insuCusts.get(i));
		}
		//费用管理
		List<TInsurtypeFeeDef> tInsurtypeFeeDefs = this.copyDao.getTInsurtypeFeeDef(oldInsur.getInsurtypeId());
		for(int i = 0;i<tInsurtypeFeeDefs.size();i++){
			TInsurtypeFeeDef tInsurtypeFeeDef = tInsurtypeFeeDefs.get(i);
			tInsurtypeFeeDef.setInsurtypeId(newInsur.getInsurtypeId());
			tInsurtypeFeeDef.setFeeCode(newInsur.getInsurtypeCode()+tInsurtypeFeeDef.getFeeCode().substring(SUBNUNBER));
			pfRiskFeeManageDaoImpl.addTInsurtypeFeeDef(tInsurtypeFeeDef);
			List<TFeeRate> tFeeRates = this.copyDao.getTFeeRate(oldInsur.getInsurtypeId(), tInsurtypeFeeDef.getFeeType());
			String feeFlag = this.copyDao.getUUId();
			for(int j = 0;j<tFeeRates.size();j++){
				TFeeRate tFeeRate = tFeeRates.get(j);
				tFeeRate.setFeeFlag(feeFlag);
				tFeeRate.setInsurtypeCode(newInsur.getInsurtypeCode());
				tFeeRate.setInsurtypeId(newInsurtypeId);
				if(tFeeRate.getPricingLiabCode()==null || "".equals(tFeeRate.getPricingLiabCode())){
				}else{
					tFeeRate.setPricingLiabCode(newInsur.getInsurtypeCode()+
							tFeeRate.getPricingLiabCode().substring(SUBNUNBER));
				}
				pfRiskFeeManageDaoImpl.addTFeeRate(tFeeRate);
				
			}
		}
		
		
		//账户定义
		List<TInsurtypeAccDef> tInsurtypeAccDefs = this.copyDao.getTInsurtypeAccDef(oldInsur.getInsurtypeId());
		for(int i = 0;i<tInsurtypeAccDefs.size();i++){
			tInsurtypeAccDefs.get(i).setInsurtypeAccCode(newInsur.getInsurtypeCode()+
					tInsurtypeAccDefs.get(i).getInsurtypeAccCode().substring(SUBNUNBER));
			insurtypeAccDef.addPfInsurtypeAccDef(newInsur, tInsurtypeAccDefs.get(i));
		}
		
		
		//保全
		List<TInsurtypePsItemDef> tInsurtypePsItemDefs = pfRiskItem.queryRiskItem(oldInsur);
		for(int i = 0;i<tInsurtypePsItemDefs.size();i++){
			tInsurtypePsItemDefs.get(i).setInsurtypeId(newInsurtypeId);
			pfRiskItem.saveItem(tInsurtypePsItemDefs.get(i));
		}
		
		List<TInsurtypePsAttribDef> tInsurtypePsAttribDefs = pfRiskAttrib.queryAttrib(oldInsur);
		for(int i = 0;i<tInsurtypePsAttribDefs.size();i++){
			tInsurtypePsAttribDefs.get(i).setInsurtypeId(newInsurtypeId);
			pfRiskAttrib.saveAttrib(newInsur, tInsurtypePsAttribDefs.get(i));
		}
		 
		
		
		return message;
	}
	/**
	 * 生成建表sql语句
	 * */
	private String createTableSQL(List<TObjRateDimenRef> conditionCol, TObjRate tObjRate) {
		String TAB = "\t";
		String LINE = "\r\n";
		StringBuilder sb = new StringBuilder();
		sb.append("create table ").append(tObjRate.getTableName()).append("(").append(LINE);
		for(int i = 0; i < conditionCol.size(); i++){
			TObjRateDimenRef dimenRef = conditionCol.get(i);
			sb.append(TAB).append(dimenRef.getDimensionProperty()).append(TAB).append("VARCHAR2(255),").append(LINE);			
		}
		sb.append(TAB).append("val").append(TAB).append("NUMBER").append(LINE);
		sb.append(")");
		return sb.toString();
	}
	
	
	
	
	
	//将老险种信息赋予新险种
	private void oldToNewInsur(TInsurtypeBasicInf newInsur,TInsurtypeBasicInf oldInsur){
		newInsur.setInsurtypeLevel1Cat(oldInsur.getInsurtypeLevel1Cat());
		newInsur.setInsurtypeLevel2Cat(oldInsur.getInsurtypeLevel2Cat());
		newInsur.setInsurtypeLevel3Cat(oldInsur.getInsurtypeLevel3Cat());
		newInsur.setDesignType(oldInsur.getDesignType());
		newInsur.setInsurtypeStatus(oldInsur.getInsurtypeStatus());
		newInsur.setIsDividendInsur(oldInsur.getIsDividendInsur());
		newInsur.setIsAccType(oldInsur.getIsAccType());
		newInsur.setIsAnnuityType(oldInsur.getIsAnnuityType());
		newInsur.setMainCovRiderFlg(oldInsur.getMainCovRiderFlg());
		newInsur.setTermType(oldInsur.getTermType());
		newInsur.setIsPermitInsurRenew(oldInsur.getIsPermitInsurRenew());
		newInsur.setIsMatureLiab(oldInsur.getIsMatureLiab());
		newInsur.setIsWaive(oldInsur.getIsWaive());
//		newInsur.setInsurtypeDesc(oldInsur.getInsurtypeDesc());
	}
	//通过代码查询非定义中的险种
	public List<TInsurtypeBasicInf> getCodeInsur(String code){
		return this.copyDao.getCodeInsur(code);
	}
	//复制公式 入口 相关性 参数
	@SuppressWarnings("deprecation")
	private void copyFormulas(Long oldObjId,String type,Long newObjId,String newPricingCode,TInsurtypeBasicInf newInsur){
		//公式
		List<TObjFormula> claimFormulas = this.prestationDuty.getTObjFormula(oldObjId, type);
		for(int l=0;l<claimFormulas.size();l++){
			String claimSeq = this.copyDao.getUUId();
			String oldClaimFormulaSeq = claimFormulas.get(l).getObjSeq();
			claimFormulas.get(l).setObjId(newObjId);
			claimFormulas.get(l).setObjSeq(claimSeq);
			this.pfPriceDutyDaoImpl.addTObjFormula(claimFormulas.get(l));
		
			//入口
			List<TObjEntrance> claimEntrances = this.copyDao.getTObjEntrances(oldClaimFormulaSeq);
			for(int o=0 ; o<claimEntrances.size();o++){
				TObjEntrance entrance= claimEntrances.get(o);
				entrance.setPricingLiabCode(newPricingCode);
				entrance.setRiskVer(newInsur.getVerNo());
				entrance.setRiskCode(newInsur.getInsurtypeCode());
				entrance.setObjSeq(claimSeq);
				this.pfPriceDutyDaoImpl.addTObjEntrance(entrance);
			}
			
			//相关性
			List<TObjRelation> tObjRelations = this.pfRelationDaoImpl.getTObjRelation(oldClaimFormulaSeq);
			for(int o=0;o<tObjRelations.size();o++){
				TObjRelation tObjRelation = tObjRelations.get(o);
				tObjRelation.setObjId(newObjId);
				tObjRelation.setObjSeq(claimSeq);
				this.pfRelationDaoImpl.addTObjRelation(tObjRelation);
				
			}
			
			//参数
			List<TObjParam> tObjParams = this.copyDao.getTObjParams(oldClaimFormulaSeq);
			for(int o=0;o<tObjParams.size();o++){
				TObjParam tObjParam = tObjParams.get(o);
				tObjParam.setObjId(newObjId);
				tObjParam.setObjSeq(claimSeq);
				this.pfRelationDaoImpl.addTObjParam(tObjParam);
			}
		}
	}
}
