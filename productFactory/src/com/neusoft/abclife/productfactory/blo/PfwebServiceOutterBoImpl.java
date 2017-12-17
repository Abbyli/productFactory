/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.WebServiceCoreDaoImpl;
import com.neusoft.abclife.productfactory.dto.PolicyDTO;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_pfwebServiceOutterBo_bo")
@ModelFile(value = "pfwebServiceOutterBo.bo")
public class PfwebServiceOutterBoImpl {

	/**
	 * 
	 */
	public PfwebServiceOutterBoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	private static final Logger Logger = LoggerFactory.getLogger(PfwebServiceOutterBoImpl.class);
	
	@Resource(name = "factoryabclife_webServiceCoreDAO_dao")
	private WebServiceCoreDaoImpl webServiceCoreDaoImpl;
	
	public WebServiceCoreDaoImpl getWebServiceCoreDaoImpl() {
		return webServiceCoreDaoImpl;
	}

	public void setWebServiceCoreDaoImpl(WebServiceCoreDaoImpl webServiceCoreDaoImpl) {
		this.webServiceCoreDaoImpl = webServiceCoreDaoImpl;
	}
	
	@Resource(name="factoryabclife_webServiceCoreBo_bo")
	private WebServiceCoreBoImpl webServiceCoreBoImpl;
	/**
	 * 执行限额接口
	 */
	public Object limit(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2, Object paramObj) throws Exception
	{	
		return null;
	}
	
	/**
	 * 表外费率接口
	 * @throws Exception 
	 */
	public Map<String,BigDecimal> calExportRate(Long insurtypeId,String pricingLiabCode,int appAge,
			int newAppAge,String appSex,String newAppSex,Map<String,Object> paramObj) throws Exception{
		
		Map<String,BigDecimal> map = new HashMap<String,BigDecimal>();
		
		TInsurtypeBasicInf insur = webServiceCoreDaoImpl.getTInsurtypeBasicInf(insurtypeId);
		TPricingLiabDef liab = webServiceCoreDaoImpl.getTPricingLiabDef(insurtypeId, pricingLiabCode);
		List<TObjRate> rateTables = webServiceCoreDaoImpl.queryObjRate(pricingLiabCode, insur.getVerNo().toString());
		String calDirection = liab.getCalcDirection();
		if("01".equals(calDirection)){
			BigDecimal val = webServiceCoreBoImpl.cal("0000","1","000000","000000","EXPORT","","","", paramObj);
			map.put("prem", val);
		}else if("02".equals(calDirection)){
			BigDecimal val = webServiceCoreBoImpl.cal("0000","2","000000","000000","EXPORT","","","",paramObj);
			map.put("amnt", val);
		}else if("03".equals(calDirection)){
			for(TObjRate rate:rateTables){
				if("RT_A".equals(rate.getRateType())){
					BigDecimal val = webServiceCoreBoImpl.cal("0000","2","000000","000000","EXPORT","","","", paramObj);
					map.put("amnt", val);
				}else if("RT_P".equals(rate.getRateType())){
					BigDecimal val = webServiceCoreBoImpl.cal("0000","1","000000","000000","EXPORT","","","", paramObj);
					map.put("prem", val);
				}
			}
		}
		return map; 
	}
	
	/**
	 * 提供给新契约
	 * @param insurtypeId
	 * @param paramObj
	 * @return
	 * @throws Exception
	 */
	public Map<String,BigDecimal> calPremAmnt(Long insurtypeId,String pricingLiabCode,Map<String,Object> paramObj) throws Exception{
		Map<String,BigDecimal> map = new HashMap<String,BigDecimal>();
		/*Class<?> c = paramObj.getClass();
		Field[] f_s = c.getDeclaredFields();
		for(int i = 0; i < f_s.length; i++){			
			Field f = f_s[i];
			String f_name = f.getName();
			if("amntPremUnit".equals(f_name)){
				PropertyDescriptor pd = new PropertyDescriptor(f_name,c);
				Method writeM = pd.getWriteMethod();
				TPricingLiabDef pricing = this.webServiceCoreDaoImpl.getTPricingLiabDef(insurtypeId, pricingLiabCode);
				writeM.invoke(paramObj, pricing.getAmntPremUnit());
				break;
				}
			}*/
		
		TPricingLiabDef pricing = this.webServiceCoreDaoImpl.getTPricingLiabDef(insurtypeId, pricingLiabCode);
		paramObj.put("amntPremUnit", pricing.getAmntPremUnit());
		
		TInsurtypeBasicInf insurtypeBasicInf = this.webServiceCoreDaoImpl.getTInsurtypeBasicInf(insurtypeId);
		map.put("amnt", webServiceCoreBoImpl.cal(insurtypeBasicInf.getInsurtypeCode(),insurtypeBasicInf.getVerNo().toString(),pricingLiabCode,"","A1","","","",paramObj));
		map.put("prem", webServiceCoreBoImpl.cal(insurtypeBasicInf.getInsurtypeCode(),insurtypeBasicInf.getVerNo().toString(),pricingLiabCode,"","A2","","","",paramObj));	
		return map;
	}
	
	/**
	 * 投保费率测试
	 * @param insurtypeId
	 * @param paramObj
	 * @return
	 * @throws Exception
	 */
	public Map<String,BigDecimal> premiumRate(String insurtypeCode,String verNo,String pricingLiabCode,PolicyDTO paramObj) throws Exception{
		Map<String,BigDecimal> map = new HashMap<String,BigDecimal>();
		Map<String,Object> paramMap = new HashMap<String,Object>();
		this.invokeKey(paramMap, paramObj);
		//将amntPremUnit添加进参数  add by shi.chl
		TInsurtypeBasicInf insur = this.webServiceCoreDaoImpl.getTInsurtypeBasicInf(insurtypeCode, verNo);
		TPricingLiabDef pricing = this.webServiceCoreDaoImpl.getTPricingLiabDef(insur.getInsurtypeId(), pricingLiabCode);
//		Class<?> c = paramObj.getClass();
//		PropertyDescriptor pd = new PropertyDescriptor("amntPremUnit",c);
//		Method writeM = pd.getWriteMethod();
//		writeM.invoke(paramObj, pricing.getAmntPremUnit());
		paramMap.put("amntPremUnit", pricing.getAmntPremUnit());
		map.put("amnt", webServiceCoreBoImpl.cal(insurtypeCode,verNo,pricingLiabCode,"","A1","","","",paramMap));
		map.put("prem", webServiceCoreBoImpl.cal(insurtypeCode,verNo,pricingLiabCode,"","A2","","","",paramMap));	
		return map;
	}
	//测试页面用
	public BigDecimal calTest(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2,String subGetdutyCode, PolicyDTO paramObj) throws Exception{
		Map<String,Object> paramMap = new HashMap<String,Object>();
		this.invokeKey(paramMap, paramObj);
		return webServiceCoreBoImpl.cal(riskCode, riskVer, pricingLiabCode, protecLiabCode, algoType, subType1, subType2, subGetdutyCode, paramMap);
	}
	
	
	
	//组合保额保费计算
	public Map<String,Map<String,BigDecimal>> comboCal(String comboId,Map<String,Object> paramObj) throws Exception{
		TComboInf comboInf = this.webServiceCoreDaoImpl.queryComboInfById(comboId);
		List<TComboInsurtypeElemRel> list = this.webServiceCoreDaoImpl.getTComboInsurtype(comboId);
		Map<String,Map<String,BigDecimal>> map = new HashMap<String,Map<String,BigDecimal>>();
		for(TComboInsurtypeElemRel comboInsur:list){
			if("保额".equals(comboInsur.getElemName())){
				Map<String,Object> dto = new HashMap<String,Object>();
				dto.putAll(paramObj);
				dto.put("pricingLiabCode", comboInsur.getPricingCode());
				dto.put("insurtypeCode", comboInsur.getInsurtypeCode());
//				dto.setPricingLiabCode(comboInsur.getPricingCode());
//				dto.setInsurtypeCode(comboInsur.getInsurtypeCode());
				if(map.get(comboInsur.getPricingCode())!= null){
					continue;
				}
				TComboInsurtypeElemRel premElem = this.webServiceCoreDaoImpl.queryAnotherOneElem(comboId, comboInsur.getPricingCode(), "保费");
				BigDecimal amnt = webServiceCoreBoImpl.calCombo(comboInf.getComboCode(), String.valueOf(comboInf.getComboVer()), String.valueOf(comboInsur.getComboInsurtypeElemRelId()), "SPLIT", "", "", dto);
//				dto.setAmnt(amnt);
				if(amnt.compareTo(new BigDecimal("-1"))==0){
				}else{
				dto.put("amnt", amnt);
				}
				if(premElem != null){
					BigDecimal prem = webServiceCoreBoImpl.calCombo(comboInf.getComboCode(), String.valueOf(comboInf.getComboVer()), String.valueOf(premElem.getComboInsurtypeElemRelId()), "SPLIT", "", "", dto);
//					dto.setPrem(prem);
					if(prem.compareTo(new BigDecimal("-1"))==0){
					}else{
					dto.put("prem", prem);
					}
				}
//				else{
//					dto.setPrem(BigDecimal.ZERO);
//					dto.put("prem", BigDecimal.ZERO);
//				}
				Map<String,BigDecimal> result = this.calPremAmnt(comboInsur.getInsurtypeId(), comboInsur.getPricingCode(), dto);
				map.put(comboInsur.getPricingCode(), result);
				continue;
			}
			if("保费".equals(comboInsur.getElemName())){
//				PolicyDTO dto = paramObj;
//				dto.setPricingLiabCode(comboInsur.getPricingCode());
//				dto.setInsurtypeCode(comboInsur.getInsurtypeCode());
				Map<String,Object> dto = new HashMap<String,Object>();
				dto.putAll(paramObj);
				dto.put("pricingLiabCode", comboInsur.getPricingCode());
				dto.put("insurtypeCode", comboInsur.getInsurtypeCode());
				if(map.get(comboInsur.getPricingCode())!= null){
					continue;
				}
				TComboInsurtypeElemRel amntElem = this.webServiceCoreDaoImpl.queryAnotherOneElem(comboId, comboInsur.getPricingCode(), "保额");
				BigDecimal prem = webServiceCoreBoImpl.calCombo(comboInf.getComboCode(), String.valueOf(comboInf.getComboVer()), String.valueOf(comboInsur.getComboInsurtypeElemRelId()), "SPLIT", "", "", dto);
//				dto.setPrem(prem);
				if(prem.compareTo(new BigDecimal("-1"))==0){
				}else{
				dto.put("prem", prem);
				}
				if(amntElem != null){
					BigDecimal amnt = webServiceCoreBoImpl.calCombo(comboInf.getComboCode(), String.valueOf(comboInf.getComboVer()), String.valueOf(amntElem.getComboInsurtypeElemRelId()), "SPLIT", "", "", dto);
//					dto.setAmnt(amnt);
					if(amnt.compareTo(new BigDecimal("-1"))==0){
					}else{
					dto.put("amnt", amnt);
					}
				}
//				else{
//					dto.setAmnt(BigDecimal.ZERO);
//					dto.put("amnt", BigDecimal.ZERO);
//				}
				Map<String,BigDecimal> result = this.calPremAmnt(comboInsur.getInsurtypeId(), comboInsur.getPricingCode(), dto);
				map.put(comboInsur.getPricingCode(), result);
				continue;
			}
			
			if("份数".equals(comboInsur.getElemName())){
//				PolicyDTO dto = paramObj;
//				dto.setPricingLiabCode(comboInsur.getPricingCode());
//				dto.setInsurtypeCode(comboInsur.getInsurtypeCode());
				
				Map<String,Object> dto = new HashMap<String,Object>();
				dto.putAll(paramObj);
				dto.put("pricingLiabCode", comboInsur.getPricingCode());
				dto.put("insurtypeCode", comboInsur.getInsurtypeCode());
				if(map.get(comboInsur.getPricingCode())!= null){
					continue;
				}
				Map<String,BigDecimal> result = this.calPremAmnt(comboInsur.getInsurtypeId(), comboInsur.getPricingCode(), dto);
				map.put(comboInsur.getPricingCode(), result);
				continue;
			}
		}
		Logger.info(map.toString());
		return map;
	}
	
	
	//拆分要素值储存
	public Map<String,Map<String,String>> splitElemValue(String comboId) throws Exception{
		List<TComboInsurtypeElemRel> list = this.webServiceCoreDaoImpl.getTComboInsurtype(comboId);
		Map<String,Map<String,String>> map = new HashMap<String,Map<String,String>>();
		for(TComboInsurtypeElemRel comboInsur:list){
			Map<String,String> map2 = null;
			if(map.get(comboInsur.getPricingCode())== null){
				map2 = new HashMap<String,String>();
			}else{
				map2 = map.get(comboInsur.getPricingCode());
			}
			TObjSkelement elem = this.webServiceCoreDaoImpl.queryTObjSkelement(comboInsur.getElemId());
			String property = elem.getKeyWord();
			if("insurPeriod".equals(property)){
				property = "insuYear";
			}
			if("paymntPeriod".equals(property)){
				property = "payEndYear";
			}
			if("paymntFreq".equals(property)){
				property = "payIntv";
			}
			if(!"".equals(comboInsur.getFixVal())&&comboInsur.getFixVal()!=null){
				map2.put(property, comboInsur.getFixVal());
			}
			map.put(comboInsur.getPricingCode(), map2);
			
		}
		
		
		return map;
	}
	
	/**
	 * Object 转  Map
	 * @param paramMap
	 * @param paramObj
	 * @throws Exception
	 */
	private void invokeKey(Map<String,Object> paramMap, Object paramObj) throws Exception {
	
			Class<?> c = paramObj.getClass();
			Field[] f_s = c.getDeclaredFields();
			for(int i = 0; i < f_s.length; i++){			
				Field f = f_s[i];
				String f_name = f.getName();
				if(!f_name.equals("serialVersionUID")){
					PropertyDescriptor pd = new PropertyDescriptor(f_name, c);
					Method readM = pd.getReadMethod();
					Object value = readM.invoke(paramObj);
					if(value != null){
						paramMap.put(f_name, value);
					}
					
				}		
			}
		}
}
