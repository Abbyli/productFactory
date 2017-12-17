/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.WebServiceDaoImpl;
import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TComboAttrib;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtype;
import com.neusoft.abclife.productfactory.entity.TInsurtypeAccDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef;
import com.neusoft.abclife.productfactory.entity.TLiabLimit;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProInterfaceRef;
import com.neusoft.abclife.productfactory.entity.TProductInsurtypeMatchRel;
import com.neusoft.abclife.productfactory.entity.TProductParamDef;
import com.neusoft.abclife.productfactory.entity.TPropShowDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TSurvvGivepayDef;
import com.neusoft.abclife.productfactory.entity.TWaiveLiab;
import com.neusoft.abclife.util.DateUtil;
import com.neusoft.abclife.util.GlobalVariable;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.SpringServiceFactory;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author Administrator
 *
 */
@Service("factoryabclife_WebServiceDom4jBo_bo")
@ModelFile(value = "WebServiceDom4jBo.bo")
public class WebServiceDom4jBoImpl {

	/**
	 * 
	 */
	public WebServiceDom4jBoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	private static final Logger Logger = LoggerFactory.getLogger(WebServiceDom4jBoImpl.class);
    
    @Resource(name = "factoryabclife_testDao_dao")
	private WebServiceDaoImpl testDaoImpl;

	
	//附加险
	public String getAddRiskList(String paramXML){	
		StringBuilder rtn = new StringBuilder("<message><body><addRisks>");
		try {
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			String mainProCode = body.elementText("mainProCode");
//			TInsurtypeBasicInf basic = this.testDaoImpl.queryRiskByCode(mainProCode);
//			if(basic == null){
//				return "<message><body>" +
//						"<errorCode>10001</errorCode>"+
//						"<errorMessage>没有此主险</errorMessage>"+
//						"</body><head></head></message>";
//			}
			List<TProductInsurtypeMatchRel> risk = this.testDaoImpl.getMatch(mainProCode);
			if(risk != null){
				for(int i = 0,j=risk.size();i<j;i++){
					TInsurtypeBasicInf addRisk = this.testDaoImpl.queryAddRisk(risk.get(i).getAssocProductCode());
					//获取附加险
					rtn.append("<addRisk>");
					rtn.append("<riskID>"+addRisk.getInsurtypeId()+"</riskID>");
					rtn.append("<riskCode>"+addRisk.getInsurtypeCode()+"</riskCode>");
					rtn.append("<riskName>"+addRisk.getInsurtypeName()+"</riskName>");
					rtn.append("</addRisk>");
				}
			}else{
				rtn.append("<addRisk>");
				rtn.append("<riskID/>");
				rtn.append("<riskCode/>");
				rtn.append("<riskName/>");
				rtn.append("</addRisk>");
			}
			
			rtn.append("</addRisks></body><head></head></message>");	
			Logger.info(rtn.toString());
		}catch(Exception e){
			Logger.info("获取附加险异常",e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		return rtn.toString();	
	}
	//获取产品信息
	public String getProInfo(String paramXML)throws DocumentException{
		String path= "<message><body>"+
					"<type>1</type>"+
					"<proID>237</proID>"+
					"<proCode>产品代码</proCode>"+
					"<saleDate>销售日期</saleDate>"+
				 "</body><head></head></message>";
		Logger.info(paramXML);			
		Document doc = DocumentHelper.parseText(paramXML);
		Element message = doc.getRootElement();
		Element body = message.element("body");
		String proID = body.element("proID").getText();
		TProInterfaceRef proInter = testDaoImpl.getProInter(proID);
		if("1".equals(proInter.getProType())  || "3".equals(proInter.getProType())){
			return getRiskXml(proID);
		}
		if("2".equals(proInter.getProType())){
			return getTComboInf(proID);
		}
		return "<message><body>" +
		"<errorCode>10002</errorCode>"+
		"<errorMessage>此产品未发布</errorMessage>"+
		"</body><head></head></message>";
	}
	
	//险种信息
	private String getRiskXml(String proID) throws DocumentException{	
		try {
			TInsurtypeBasicInf risk = this.testDaoImpl.queryRisk(Long.parseLong(proID));
			List<TPricingLiabDef> price = this.testDaoImpl.priceDuty(risk.getInsurtypeId());
			//String
			StringBuilder riskInfo_xml = new StringBuilder();
			riskInfo_xml.append("<message>");
			riskInfo_xml.append("<body>");
			riskInfo_xml.append("<risk>");
			riskInfo_xml.append("<waiveFlag>"+risk.getIsWaive()+"</waiveFlag>");
			riskInfo_xml.append("<riskID>"+risk.getInsurtypeId()+"</riskID>");
			riskInfo_xml.append("<riskCode>"+risk.getInsurtypeCode()+"</riskCode>");
			riskInfo_xml.append("<riskName>"+risk.getInsurtypeName()+"</riskName>");
			riskInfo_xml.append("<riskVer>"+risk.getVerNo()+"</riskVer>");
			riskInfo_xml.append("<riskKind>"+risk.getDesignType()+"</riskKind>");
			riskInfo_xml.append("<riskPeriod>"+risk.getTermType()+"</riskPeriod>");
			riskInfo_xml.append("<riskShortName>"+risk.getInsurtypeAbbr()+"</riskShortName>");
			riskInfo_xml.append("<riskType>"+risk.getInsurtypeLevel1Cat()+"</riskType>");
			riskInfo_xml.append("<subRiskFlag>"+risk.getMainCovRiderFlg()+"</subRiskFlag>");
			riskInfo_xml.append("<hesitation>15</hesitation>");
			riskInfo_xml.append("<gracePeriod>68</gracePeriod>");
			riskInfo_xml.append("<termType>"+risk.getTermType()+"</termType>");
			//账户
			List<TInsurtypeAccDef> accs = this.testDaoImpl.getInsurToAcc(proID);
			riskInfo_xml.append("<accs>");
			for(TInsurtypeAccDef acc : accs){
				riskInfo_xml.append("<acc>");
				riskInfo_xml.append("<accType>"+acc.getInsurtypeAccType()+"</accType>");
				riskInfo_xml.append("<accName>"+acc.getInsurtypeAccName()+"</accName>");
				riskInfo_xml.append("<accCode>"+acc.getInsurtypeAccCode()+"</accCode>");
				riskInfo_xml.append("<accOwner>"+acc.getInsurtypeAccOwner()+"</accOwner>");
				riskInfo_xml.append("<rateType>"+acc.getRateType()+"</rateType>");
				riskInfo_xml.append("<fixRate>"+acc.getFixRate()+"</fixRate>");
				riskInfo_xml.append("<accrualType>"+acc.getAccrualType()+"</accrualType>");
				riskInfo_xml.append("<accrualMethod>"+acc.getAccrualMethod()+"</accrualMethod>");
				riskInfo_xml.append("<settleCyc>"+acc.getSettleCyc()+"</settleCyc>");
				riskInfo_xml.append("<settleTimepoint>"+acc.getSettleTimepoint()+"</settleTimepoint>");
				riskInfo_xml.append("<settleType>"+acc.getSettleType()+"</settleType>");
				riskInfo_xml.append("<isProvision>"+acc.getIsProvision()+"</isProvision>");
				riskInfo_xml.append("<provisionCyc>"+acc.getProvisionCyc()+"</provisionCyc>");
				riskInfo_xml.append("</acc>");
			}
			riskInfo_xml.append("</accs>");
			TInsurtypePsAttribDef psAttrib = this.testDaoImpl.getPsAttrib(proID);
			riskInfo_xml.append("<preserveAttrib>");
			if(psAttrib != null){
				riskInfo_xml.append("<isPermitAddinsur>");
				riskInfo_xml.append(psAttrib.getIsPermitAddinsur());
				riskInfo_xml.append("</isPermitAddinsur>");
				
				riskInfo_xml.append("<isPermitAddprem>");
				riskInfo_xml.append(psAttrib.getIsPermitAddprem());
				riskInfo_xml.append("</isPermitAddprem>");
				
				riskInfo_xml.append("<isPermitAutoPay>");
				riskInfo_xml.append(psAttrib.getIsPermitAutoPay());
				riskInfo_xml.append("</isPermitAutoPay>");
				
				riskInfo_xml.append("<isPermitPolLoan>");
				riskInfo_xml.append(psAttrib.getIsPermitPolLoan());
				riskInfo_xml.append("</isPermitPolLoan>");
				
				riskInfo_xml.append("<isPermitReducAmtPayclr>");
				riskInfo_xml.append(psAttrib.getIsPermitReducAmtPayclr());
				riskInfo_xml.append("</isPermitReducAmtPayclr>");
				
				riskInfo_xml.append("<isPermitInsurRenew>");
				riskInfo_xml.append(psAttrib.getIsPermitInsurRenew());
				riskInfo_xml.append("</isPermitInsurRenew>");
				
				riskInfo_xml.append("<isMatureLiab>");
				riskInfo_xml.append(psAttrib.getIsMatureLiab());
				riskInfo_xml.append("</isMatureLiab>");
				
				riskInfo_xml.append("<isPermitAddfee>");
				riskInfo_xml.append(psAttrib.getIsPermitAddfee());
				riskInfo_xml.append("</isPermitAddfee>");
				
				riskInfo_xml.append("<isDividend>");
				riskInfo_xml.append(psAttrib.getIsDividend());
				riskInfo_xml.append("</isDividend>");
				
				riskInfo_xml.append("<dividendWay>");
				riskInfo_xml.append(psAttrib.getDividendWay());
				riskInfo_xml.append("</dividendWay>");
				
				riskInfo_xml.append("<dividendIsAccSettle>");
				riskInfo_xml.append(psAttrib.getDividendIsAccSettle());
				riskInfo_xml.append("</dividendIsAccSettle>");
				
				riskInfo_xml.append("<regulPayAllowExceptSurrnd>");
				riskInfo_xml.append(psAttrib.getRegulPayAllowExceptSurrnd());
				riskInfo_xml.append("</regulPayAllowExceptSurrnd>");
				
				riskInfo_xml.append("<singlePayAllowExceptSurrnd>");
				riskInfo_xml.append(psAttrib.getSinglePayAllowExceptSurrnd());
				riskInfo_xml.append("</singlePayAllowExceptSurrnd>");
			}else{
				riskInfo_xml.append("<isPermitAddinsur/>");
				riskInfo_xml.append("<isPermitAddprem/>");
				riskInfo_xml.append("<isPermitPolLoan/>");
				riskInfo_xml.append("<isPermitAutoPay/>");
				riskInfo_xml.append("<isPermitReducAmtPayclr/>");
				riskInfo_xml.append("<isPermitInsurRenew/>");
				riskInfo_xml.append("<isMatureLiab/>");
				riskInfo_xml.append("<isPermitAddfee/>");
				riskInfo_xml.append("<isDividend/>");
				riskInfo_xml.append("<dividendWay/>");
				riskInfo_xml.append("<dividendIsAccSettle/>");
				riskInfo_xml.append("<regulPayAllowExceptSurrnd/>");
				riskInfo_xml.append("<singlePayAllowExceptSurrnd/>");
			}
			riskInfo_xml.append("</preserveAttrib>");
			//定价
			riskInfo_xml.append("<dutys>");
			for(int i = 0;i<price.size();i++){
				TPricingLiabDef priceDuty = price.get(i);
				riskInfo_xml.append("<duty>");
				riskInfo_xml.append("<calcDirection>"+priceDuty.getCalcDirection()+"</calcDirection>");
				riskInfo_xml.append("<choFlag>"+priceDuty.getIsOpt()+"</choFlag>");
				riskInfo_xml.append("<dutyCode>"+priceDuty.getPricingLiabCode()+"</dutyCode>");
				riskInfo_xml.append("<dutyName>"+priceDuty.getPricingLiabName()+"</dutyName>");
				riskInfo_xml.append("<uniDutyType>"+priceDuty.getUniDutyType()+"</uniDutyType>");
				if(priceDuty.getCalcDirection()==null||"".equals(priceDuty.getCalcDirection())){
					riskInfo_xml.append("<payFlag>0</payFlag>");
				}else{
					riskInfo_xml.append("<payFlag>1</payFlag>");
				}
				int a = this.testDaoImpl.getFeeFlag(priceDuty.getPricingLiabId());
				if(a>0){
					riskInfo_xml.append("<feeFlag>1</feeFlag>");
				}else{
					riskInfo_xml.append("<feeFlag>0</feeFlag>");
				}
				riskInfo_xml.append("<isWaive>"+priceDuty.getIsWaive()+"</isWaive>");
				if("1".equals(priceDuty.getIsWaive())){
					TWaiveLiab waive = this.testDaoImpl.getWaiveLiab(proID, priceDuty.getPricingLiabCode());
					riskInfo_xml.append("<waiveObj>"+waive.getWaiveObj()+"</waiveObj>");
					riskInfo_xml.append("<waiveType>"+waive.getWaiveType()+"</waiveType>");
				}else{
					riskInfo_xml.append("<waiveObj></waiveObj>");
					riskInfo_xml.append("<waiveType></waiveType>");
				}
				
				//要素项
				riskInfo_xml.append("<elemnts>");
				List<TObjSkelement> priceElement = this.testDaoImpl.getPriceElement(priceDuty.getPricingLiabId(),"1");
				int para = 0;
				for(;para<priceElement.size();para++){
					TObjSkelement element = priceElement.get(para);
					//获取属性展示信息
					TPropShowDef property = this.testDaoImpl.getProperty(element.getId());
					riskInfo_xml.append("<elemnt>");
					riskInfo_xml.append("<l>"+element.getName()+"</l>");
					riskInfo_xml.append("<f>"+element.getKeyWord()+"</f>");
					riskInfo_xml.append("<c>"+element.getIsCalRef()+"</c>");
					riskInfo_xml.append("<t>"+property.getEditorType()+"</t>");
					riskInfo_xml.append("<o>"+property.getOrderNum()+"</o>");
					riskInfo_xml.append("<v>"+property.getDefaultVal()+"</v>");
					riskInfo_xml.append("<n>"+property.getRequired()+"</n>");
					riskInfo_xml.append("<lv>"+property.getMinVal()+"</lv>");
					riskInfo_xml.append("<hv>"+property.getMaxVal()+"</hv>");
					riskInfo_xml.append("<ll>"+property.getMinLength()+"</ll>");
					riskInfo_xml.append("<hl>"+property.getMaxLength()+"</hl>");
					riskInfo_xml.append("<r>"+property.getReadonly()+"</r>");
					riskInfo_xml.append("<d>"+property.getDescription()+"</d>");
					//字典表特殊处理
					if("保险期间".equals(element.getName()) || "交费期间".equals(element.getName()) ||
							"交费频率".equals(element.getName()) || "红利领取方式".equals(element.getName())){
						String paramType = "";
						if("保险期间".equals(element.getName())){
							paramType = "02";
						}
						if("交费期间".equals(element.getName())){
							paramType = "01";
						}
						if("交费频率".equals(element.getName())){
							paramType = "04";
						}
						if("红利领取方式".equals(element.getName())){
							paramType = "05";
						}
						//获取参数定义
						List<TProductParamDef> getParam = this.testDaoImpl.getParam(proID,paramType,"02");
						if("04".equals(paramType)){
							riskInfo_xml.append("<b>");
							for(int x = 0;x<getParam.size();x++){
								TProductParamDef paramValue = getParam.get(x);
								riskInfo_xml.append("<code><name>"+GlobalVariable.PAYINTV.get(paramValue.getParamVal())+"</name>"+
										"<value>"+paramValue.getParamVal()+"</value></code>");
							}
							riskInfo_xml.append("</b>");
						}else if("05".equals(paramType)){
							riskInfo_xml.append("<b>");
							for(int x = 0;x<getParam.size();x++){
								TProductParamDef paramValue = getParam.get(x);
								riskInfo_xml.append("<code><name>"+paramValue.getParamDesc()+"</name>"+
										"<value>"+paramValue.getParamVal()+"</value></code>");
							}
							riskInfo_xml.append("</b>");
						}else{
							riskInfo_xml.append("<b>");
							for(int x = 0;x<getParam.size();x++){
								TProductParamDef paramValue = getParam.get(x);
								riskInfo_xml.append("<code><name>"+paramValue.getParamDesc()+"</name>"+
										"<value>"+paramValue.getParamVal()+"-"+paramValue.getParamUnit()+"</value></code>");
							}
							riskInfo_xml.append("</b>");
						}
						
					}else{
						if(property.getDictionary()!=null && !"".equals(property.getDictionary())){
							riskInfo_xml.append("<b>");
							String dic[] = property.getDictionary().split("\n");
							for(int j = 0;j<dic.length;j++){
								String[] d = dic[j].split("-");
								riskInfo_xml.append("<code><name>"+d[1]+"</name>"+
										"<value>"+d[0]+"</value></code>");
							}
							riskInfo_xml.append("</b>");
						}else{
						riskInfo_xml.append("<b>"+property.getDictionary()+"</b>");
						}
					}
					riskInfo_xml.append("</elemnt>");
				}
				if(para==0){
					riskInfo_xml.append("<elemnt>");
					riskInfo_xml.append("<l/>");
					riskInfo_xml.append("<f/>");
					riskInfo_xml.append("<c/>");
					riskInfo_xml.append("<t/>");
					riskInfo_xml.append("<o/>");
					riskInfo_xml.append("<v/>");
					riskInfo_xml.append("<n/>");
					riskInfo_xml.append("<lv/>");
					riskInfo_xml.append("<hv/>");
					riskInfo_xml.append("<ll/>");
					riskInfo_xml.append("<hl/>");
					riskInfo_xml.append("<r/>");
					riskInfo_xml.append("<d/>");
					riskInfo_xml.append("<b/>");
					riskInfo_xml.append("</elemnt>");
				}
				riskInfo_xml.append("</elemnts>");
				//保障
				riskInfo_xml.append("<dutyGets>");
				List<TProtecLiabDef> prest = this.testDaoImpl.prestDuty(priceDuty.getPricingLiabId());
				for(int j = 0;j<prest.size();j++){
					TProtecLiabDef prestDuty = prest.get(j);
					riskInfo_xml.append("<dutyGet>");
					riskInfo_xml.append(this.getLiabLimitXml(risk.getInsurtypeCode(), risk.getVerNo().toString(), priceDuty.getPricingLiabCode(), prestDuty.getProtecLiabCode(), prestDuty.getProtecLiabCode()));
					riskInfo_xml.append("<dutyGetCode>"+prestDuty.getProtecLiabCode()+"</dutyGetCode>");
					riskInfo_xml.append("<dutyGetName>"+prestDuty.getProtecLiabName()+"</dutyGetName>");
					riskInfo_xml.append("<dutyGetType>"+prestDuty.getProtecLiabType()+"</dutyGetType>");
					//理赔给付
					List<TClaimGivepayDef> getClaim = this.testDaoImpl.getClaimPay(prestDuty.getProtecLiabId());
					riskInfo_xml.append("<subDutyGets>");
					int y = 0;
					for(;y<getClaim.size();y++){
						TClaimGivepayDef claim = getClaim.get(y);
						riskInfo_xml.append("<subDutyGet>");
						riskInfo_xml.append("<subDutyGetCode>"+claim.getClaimGivepayCode()+"</subDutyGetCode>");
						riskInfo_xml.append("<subDutyGetName>"+claim.getClaimGivepayName()+"</subDutyGetName>");
						riskInfo_xml.append("<getDutyKind>"+claim.getClaimClaimPayType()+"</getDutyKind>");
						riskInfo_xml.append("<getDutyReason>"+claim.getAccidOccurReason()+"</getDutyReason>");
						riskInfo_xml.append("</subDutyGet>");
					}
					
					//生存给付
					List<TSurvvGivepayDef> getLive = this.testDaoImpl.getLivePay(prestDuty.getProtecLiabId());
					int z = 0;
					for(;z<getLive.size();z++){
						TSurvvGivepayDef live = getLive.get(z);
						riskInfo_xml.append("<subDutyGet>");
						riskInfo_xml.append("<subDutyGetCode>"+live.getSurvvGivepayCode()+"</subDutyGetCode>");
						riskInfo_xml.append("<subDutyGetType>"+live.getSurvvGivepayType()+"</subDutyGetType>");
						riskInfo_xml.append("<subDutyGetName>"+live.getSurvvGivepayName()+"</subDutyGetName>");
						riskInfo_xml.append("<getIntv>"+live.getGivepayIntv()+"</getIntv>");
						riskInfo_xml.append("<getYear>"+live.getStartDrawDate()+"-"+live.getStartDrawDateUnit()+"</getYear>");
						riskInfo_xml.append("<getEndYear>"+live.getStopDrawDate()+"-"+live.getStopDrawDateUnit()+"</getEndYear>");
						riskInfo_xml.append("<startCalRef>"+live.getStartDrawDateCalcRef()+"</startCalRef>");
						riskInfo_xml.append("<startCalWay>"+live.getStartDrawDateCalcWay()+"</startCalWay>");
						riskInfo_xml.append("<stopCalRef>"+live.getStopDrawDateCalcRef()+"</stopCalRef>");
						riskInfo_xml.append("<stopCalWay>"+live.getStopDrawDateCalcWay()+"</stopCalWay>");
						riskInfo_xml.append("</subDutyGet>");
					}
					if(y == 0 && z == 0 ){
						riskInfo_xml.append("<subDutyGet>");
						riskInfo_xml.append("<subDutyGetCode/>");
						riskInfo_xml.append("<subDutyGetType/>");
						riskInfo_xml.append("<subDutyGetName/>");
						riskInfo_xml.append("<getIntv/>");
						riskInfo_xml.append("<getYear/>");
						riskInfo_xml.append("<getEndYear/>");
						riskInfo_xml.append("<startCalRef/>");
						riskInfo_xml.append("<startCalWay/>");
						riskInfo_xml.append("<stopCalRef/>");
						riskInfo_xml.append("<stopCalWay/>");
						riskInfo_xml.append("</subDutyGet>");
					}
					riskInfo_xml.append("</subDutyGets>");
					riskInfo_xml.append("</dutyGet>");
				}
				riskInfo_xml.append("</dutyGets>");
				
				riskInfo_xml.append("</duty>");
			}
			riskInfo_xml.append("</dutys>");
			riskInfo_xml.append("</risk>");
			riskInfo_xml.append("</body>");
			riskInfo_xml.append("<head></head>");
			riskInfo_xml.append("</message>");
			String xmlstring =riskInfo_xml.toString();
			Logger.info(xmlstring.replaceAll("null", ""));
			return xmlstring;
			
		} catch (Exception e) {
			Logger.info("获取险种信息异常",e);
			return "<message><body>" +
			"<errorCode>10003</errorCode>"+
			"<errorMessage>险种异常</errorMessage>"+
			"</body><head></head></message>";
		}
	}
	
	private StringBuilder getLiabLimitXml(String riskCode,String riskVer,String pricingLiabCode,
			String protecLiabCode,String refProtecLiabCode){
		List<TLiabLimit> list1 = this.testDaoImpl.queryLiabLimit("01", riskCode, riskVer, pricingLiabCode, "", refProtecLiabCode);
		List<TLiabLimit> list2 = this.testDaoImpl.queryLiabLimit("02", riskCode, riskVer, pricingLiabCode, protecLiabCode, refProtecLiabCode);
		List<TLiabLimit> list3 = this.testDaoImpl.queryLiabLimit("03", riskCode, riskVer, pricingLiabCode, protecLiabCode, refProtecLiabCode);
		StringBuilder sb = new StringBuilder();
		sb.append("<limitMoney>");
		if(list1.size()>0){
			sb.append("<limitMoneyFlag>1</limitMoneyFlag>");
			String str = "";
			Map<String,String> map = new HashMap<String,String>();
			for(int i=0;i<list1.size();i++){
				if("01".equals(list1.get(i).getLimitTimeType())){
					map.put("01", "01");
				}
				if("02".equals(list1.get(i).getLimitTimeType())){
					map.put("02", "02");
				}
			}
			for(Map.Entry<String, String> entry:map.entrySet()){
				str += entry.getValue()+",";
			}
			if(StringUtil.isNotEmpty(str)){
				sb.append("<limitMoneyCyc>"+str.substring(0, str.lastIndexOf(","))+"</limitMoneyCyc>");
			}else{
				sb.append("<limitMoneyCyc></limitMoneyCyc>");
			}
			
		}else{
			sb.append("<limitMoneyFlag>0</limitMoneyFlag>");
			sb.append("<limitMoneyCyc></limitMoneyCyc>");
		}
		sb.append("</limitMoney>");
		
		sb.append("<limitDay>");
			if(list2.size()>0){
				sb.append("<limitDayFlag>1</limitDayFlag>");
				String str = "";
				for(int i=0;i<list2.size();i++){
					str += list2.get(i).getLimitTimeType()+",";
				}
				sb.append("<limitDayCyc>"+str.substring(0, str.lastIndexOf(","))+"</limitDayCyc>");
			}else{
				sb.append("<limitDayFlag>0</limitDayFlag>");
				sb.append("<limitDayCyc></limitDayCyc>");
			}
		sb.append("</limitDay>");
		
		sb.append("<limitTimes>");
		if(list3.size()>0){
			sb.append("<limitTimesFlag>1</limitTimesFlag>");
			String str = "";
			for(int i=0;i<list3.size();i++){
				str += list3.get(i).getLimitTimeType()+",";
			}
			sb.append("<limitTimesCyc>"+str.substring(0, str.lastIndexOf(","))+"</limitTimesCyc>");
		}else{
			sb.append("<limitTimesFlag>0</limitTimesFlag>");
			sb.append("<limitTimesCyc></limitTimesCyc>");
		}
		sb.append("</limitTimes>");
		
		
		return sb;
	}
	
	
	
//	获取组合信息
	private String getTComboInf(String id){
		StringBuilder rtn = new StringBuilder();
		try{
		TComboInf comboInf = this.testDaoImpl.getComboInf(id);
		TComboAttrib comboAttrib = this.testDaoImpl.getComboInfAttrib(id);
		rtn.append("<message><body><com>");
		rtn.append("<comId>"+comboInf.getComboId()+"</comId>");
		rtn.append("<comCode>"+comboInf.getComboCode()+"</comCode>");
		rtn.append("<comName>"+comboInf.getComboName()+"</comName>");
		rtn.append("<comVer>"+comboInf.getComboVer()+"</comVer>");
		rtn.append("<comCalcDirection>");
		rtn.append(comboAttrib.getComboSalesWay());
		rtn.append("</comCalcDirection>");
		
		rtn.append("<isPermitAutoPay>");
		rtn.append(comboAttrib.getIsPermitAutoPay());
		rtn.append("</isPermitAutoPay>");
		
		rtn.append("<isPermitInsurRenew>");
		rtn.append(comboAttrib.getIsPermitInsurRenew());
		rtn.append("</isPermitInsurRenew>");
		
		rtn.append("<elemnts>");
		List<TObjSkelement> list = testDaoImpl.getPriceElement(Long.parseLong(id), "3");
		int para = 0;
		for(;para<list.size();para++){
			TObjSkelement element = list.get(para);
			//获取属性展示信息
			TPropShowDef property = this.testDaoImpl.getProperty(element.getId());
			rtn.append("<elemnt>");
			rtn.append("<l>"+element.getName()+"</l>");
			rtn.append("<f>"+element.getKeyWord()+"</f>");
			rtn.append("<c>"+element.getIsCalRef()+"</c>");
			rtn.append("<t>"+property.getEditorType()+"</t>");
			rtn.append("<o>"+property.getOrderNum()+"</o>");
			rtn.append("<v>"+property.getDefaultVal()+"</v>");
			rtn.append("<n>"+property.getRequired()+"</n>");
			rtn.append("<lv>"+property.getMinVal()+"</lv>");
			rtn.append("<hv>"+property.getMaxVal()+"</hv>");
			rtn.append("<ll>"+property.getMinLength()+"</ll>");
			rtn.append("<hl>"+property.getMaxLength()+"</hl>");
			rtn.append("<r>"+property.getReadonly()+"</r>");
			rtn.append("<d>"+property.getDescription()+"</d>");
			//字典表特殊处理
			if("保险期间".equals(element.getName()) || "交费期间".equals(element.getName()) ||
					"交费频率".equals(element.getName())){
				String paramType = "";
				if("保险期间".equals(element.getName())){
					paramType = "02";
				}
				if("交费期间".equals(element.getName())){
					paramType = "01";
				}
				if("交费频率".equals(element.getName())){
					paramType = "04";
				}
				//获取参数定义
				List<TProductParamDef> getParam = this.testDaoImpl.getParam(id,paramType,"04");
				if("04".equals(paramType)){
					rtn.append("<b>");
					for(int x = 0;x<getParam.size();x++){
						TProductParamDef paramValue = getParam.get(x);
						rtn.append("<code><name>"+GlobalVariable.PAYINTV.get(paramValue.getParamVal())+"</name>"+
								"<value>"+paramValue.getParamVal()+"</value></code>");
					}
					rtn.append("</b>");
				}else{
					rtn.append("<b>");
					for(int x = 0;x<getParam.size();x++){
						TProductParamDef paramValue = getParam.get(x);
						rtn.append("<code><name>"+paramValue.getParamDesc()+"</name>"+
								"<value>"+paramValue.getParamVal()+"-"+paramValue.getParamUnit()+"</value></code>");
					}
					rtn.append("</b>");
				}
				
			}else{
				if(property.getDictionary()!=null && !"".equals(property.getDictionary())){
					rtn.append("<b>");
					String dic[] = property.getDictionary().split("\n");
					for(int j = 0;j<dic.length;j++){
						String[] d = dic[j].split("-");
						rtn.append("<code><name>"+d[1]+"</name>"+
								"<value>"+d[0]+"</value></code>");
					}
					rtn.append("</b>");
				}else{
					rtn.append("<b>"+property.getDictionary()+"</b>");
				}
			}
			rtn.append("</elemnt>");
		}
		if(para==0){
			rtn.append("<elemnt>");
			rtn.append("<l/>");
			rtn.append("<f/>");
			rtn.append("<c/>");
			rtn.append("<t/>");
			rtn.append("<o/>");
			rtn.append("<v/>");
			rtn.append("<n/>");
			rtn.append("<lv/>");
			rtn.append("<hv/>");
			rtn.append("<ll/>");
			rtn.append("<hl/>");
			rtn.append("<r/>");
			rtn.append("<d/>");
			rtn.append("<b/>");
			rtn.append("</elemnt>");
		}
		rtn.append("</elemnts>");
		rtn.append("<risks>");
		List<TInsurtypeBasicInf> risks = this.testDaoImpl.getComboInsur(id);
		for(TInsurtypeBasicInf risk:risks){
			rtn.append("<risk>");
			rtn.append("<riskID>"+risk.getInsurtypeId()+"</riskID>");
			rtn.append("<riskCode>"+risk.getInsurtypeCode()+"</riskCode>");
			rtn.append("<riskName>"+risk.getInsurtypeName()+"</riskName>");
			rtn.append("<riskVer>"+risk.getVerNo()+"</riskVer>");
			rtn.append("<subRiskFlag>"+risk.getMainCovRiderFlg()+"</subRiskFlag>");
			rtn.append("<waiveFlag>"+risk.getIsWaive()+"</waiveFlag>");
			
			TInsurtypePsAttribDef psAttrib = this.testDaoImpl.getPsAttrib(risk.getInsurtypeId().toString());
			rtn.append("<isPermitAutoPay>");
			rtn.append(psAttrib.getIsPermitAutoPay());
			rtn.append("</isPermitAutoPay>");
			
			rtn.append("<isPermitInsurRenew>");
			rtn.append(psAttrib.getIsPermitInsurRenew());
			rtn.append("</isPermitInsurRenew>");
			rtn.append("<dutys>");
			
			List<TPricingLiabDef> dutys = this.testDaoImpl.getComboPricing(risk.getInsurtypeId(), id);
			for(TPricingLiabDef duty : dutys){
				rtn.append("<duty>");
				rtn.append("<calcDirection>"+duty.getCalcDirection()+"</calcDirection>");
				rtn.append("<choFlag>"+duty.getIsOpt()+"</choFlag>");
				rtn.append("<dutyCode>"+duty.getPricingLiabCode()+"</dutyCode>");
				rtn.append("<dutyName>"+duty.getPricingLiabName()+"</dutyName>");
				rtn.append("</duty>");
			}
			rtn.append("</dutys>");
			rtn.append("</risk>");
		}
		rtn.append("</risks>");
		rtn.append("</com>");
		rtn.append("</body><head></head></message>");
		Logger.info(rtn.toString());
		return rtn.toString().replace("null", "");
		}catch(Exception e){
			Logger.info("获取组合信息异常",e);
			return "<message><body>" +
			"<errorCode>10004</errorCode>"+
			"<errorMessage>组合异常</errorMessage>"+
			"</body><head></head></message>";
		}
	}
	
	
	
	//险种保费计算 String paramXML
	@SuppressWarnings("unchecked")
	public String calPremAmnt(String paramXML) throws DocumentException{
		String xml = "<message><body>"+
						"<risks>"+
							"<risk>"+
								"<riskID>191</riskID>"+
								"<riskCode>1018</riskCode>"+
								"<dutys>"+
									"<duty>"+
										"<dutyCode>101801</dutyCode>"+
										"<insuSex >1</insuSex >" +
										"<insuAge >18</insuAge >" +
										"<insuJob >1</insuJob >" +
										"<amnt></amnt>" +
										"<prem></prem>" +
										"<mult>1</mult>" +
										"<payEndYear>10</payEndYear>" +
										"<insuYearFlag>Y</insuYearFlag>" +
										"<insuYear>20</insuYear>" +
										"<payEndYearFlag>Y</payEndYearFlag>" +
										"<payIntv>12</payIntv>" +
									"</duty>"+
								"</dutys>"+
							"</risk>"+
						"</risks>"+
					"</body></message>";
		StringBuilder rtn = new StringBuilder("<message><body><risks>");
		Logger.info(paramXML);
		try{
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			
			Element type = body.element("risks");
			List<Element> risks = type.elements("risk");
			for(int j = 0;j<risks.size();j++){
				Element risk = risks.get(j);
				Long id = Long.parseLong(risk.element("riskID").getText());
				String riskCode = risk.element("riskCode").getText();
				Element dutys = risk.element("dutys");
				List<Element> duty = dutys.elements("duty");
				BigDecimal allPrem = BigDecimal.ZERO;
				BigDecimal allAmnt = BigDecimal.ZERO;
				StringBuilder anduty = new StringBuilder("<dutys>");
				for(int i=0;i<duty.size();i++){
//					PolicyDTO dto = new PolicyDTO();
					Element dy = duty.get(i);
					List<Element> params = dy.elements();
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("unit", "1");
					for(int k = 0;k<params.size();k++){
						Element param = params.get(k);
						String key = param.getName();
						String value = param.getText();
						if("dutyCode".equals(key)){
							key = "pricingLiabCode";
						}
						if("insuAge".equals(key)){
							key = "appAge";
						}
						if("insuSex".equals(key)){
							key = "sex";
						}
						if("insuJob".equals(key)){
							key = "job";
						}
						map.put(key, value);
					}
					if(map.get("payEndDate") != null && map.get("payToDate") != null){
						int needPayYears = DateUtil.yearBetween(map.get("payToDate").toString(), map.get("payEndDate").toString());
						map.put("needPayYears", String.valueOf(needPayYears));
					}
					
					String dutyCode = dy.elementText("dutyCode");
					TPricingLiabDef pricing = this.testDaoImpl.getTPricingLiabDef(id, dutyCode);
					if("1".equals(pricing.getIsWaive())){
						map.put("sex", map.get("appSex"));
						map.put("job", map.get("appJob"));
						map.put("appAge", map.get("appAge"));
					}
//					dto.setSex(dy.element("insuSex").getText());
//					dto.setAppAge(dy.element("insuAge").getText());
//					dto.setJob(dy.element("insuJob").getText());
//					if(!"".equals(dy.element("amnt").getText())&&dy.elementText("amnt")!=null){
//						dto.setAmnt(new BigDecimal(dy.element("amnt").getText()));
//					}
//					if(!"".equals(dy.element("prem").getText())&&dy.element("prem").getText()!=null){
//						dto.setPrem(new BigDecimal(dy.element("prem").getText()));
//					}
//					if(!"".equals(dy.element("mult").getText())&&dy.element("mult").getText()!=null){
//						dto.setMult(Integer.parseInt(dy.element("mult").getText()));
//					}
//					dto.setPayEndYear(dy.element("payEndYear").getText());
//					dto.setPayEndYearFlag(dy.element("payEndYearFlag").getText());
//					dto.setInsuYear(dy.element("insuYear").getText());
//					dto.setInsuYearFlag(dy.element("insuYearFlag").getText());
//					dto.setPayIntv(dy.element("payIntv").getText());
//					dto.setAmntPremUnit(null);
//					dto.setPricingLiabCode(dutyCode);
//					dto.setUnit("1");
					PfwebServiceOutterBoImpl webServiceCoreBo = SpringServiceFactory.getBean("factoryabclife_pfwebServiceOutterBo_bo");
					Map<String,BigDecimal> result = webServiceCoreBo.calPremAmnt(id, dutyCode, map);
					allPrem = allPrem.add(result.get("prem"));
					allAmnt = allAmnt.add(result.get("amnt"));
					anduty.append("<duty>");
					anduty.append("<dutyCode>"+dutyCode+"</dutyCode>");
					anduty.append("<amnt>"+result.get("amnt")+"</amnt>");
					anduty.append("<prem>"+result.get("prem")+"</prem>");
					anduty.append("</duty>");
				}
				anduty.append("</dutys>");
				
				
				rtn.append("<risk>");
				rtn.append("<riskID>"+id+"</riskID>");
				rtn.append("<riskCode>"+riskCode+"</riskCode>");
				rtn.append("<amnt>"+allAmnt+"</amnt>");
				rtn.append("<prem>"+allPrem+"</prem>");
				rtn.append(anduty);
				rtn.append("</risk>");
			}
			
			rtn.append("</risks></body><head></head></message>");
			Logger.info(rtn.toString());
		}catch(Exception e){
			Logger.info("保费计算异常",e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		return rtn.toString().replace("null", "");
	}
//	
	//在售主险列表
	public String getMainRiskList(String paramXML) throws DocumentException{
							//查询险种信息
							StringBuilder entity_xml = new StringBuilder();	
							List<TProInterfaceRef> pros = this.testDaoImpl.getAllProInter();
							
							entity_xml.append("<message><body>");
							for(TProInterfaceRef pro : pros){
								entity_xml.append("<product>");
						    	entity_xml.append("<proID>"+pro.getProId()+"</proID><proCode>"+pro.getProCode()+"</proCode><proName>"+pro.getProName()+"</proName><proType>"+pro.getProType()+"</proType>");
						    	entity_xml.append("</product>");
							}
					    	entity_xml.append("</body><head></head></message>");
					    	String massage = "";
					    	massage=entity_xml.toString().replace("null", "");
					    	Logger.info(massage);
							return massage;
	}
	
	//校验
	public String validatePro(String paramXML){
		
		System.out.println(paramXML);
		
		String rtn = "<message><body>";
		rtn += "<result>true</result>";
		rtn += "</body><head></head></message>";
		return rtn;
	}
	
	//组合保额保费计算
	@SuppressWarnings("unchecked")
	public String calComboPremAmnt(String paramXML){
		String xml = "<message><body>"+
			"<com>"+
				"<comID>120</comID>"+
				"<comCode>C077</comCode>"+
				"<sex >1</sex >" +
				"<appAge >18</appAge >" +
				"<job >1</job >" +
				"<amnt>10000</amnt>" +
				"<prem>100</prem>" +
				"<mult></mult>" +
				"<payEndYear>5</payEndYear>" +
				"<insuYearFlag>Y</insuYearFlag>" +
				"<insuYear>10</insuYear>" +
				"<payEndYearFlag>Y</payEndYearFlag>" +
				"<payIntv>12</payIntv>" +
			"</com>"+
	"</body></message>";
		
		
		Logger.info(paramXML);
		StringBuilder rtn = new StringBuilder();
		try{
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			Element com = body.element("com");
			String comID = com.elementText("comID");
			String comCode = com.elementText("comCode");
			List<Element> params = com.elements();
			Map<String,Object> paramMap = new HashMap<String,Object>();
			paramMap.put("unit", "1");
			for(int k = 0;k<params.size();k++){
				Element param = params.get(k);
				String key = param.getName();
				String value = param.getText();
				if("dutyCode".equals(key)){
					key = "pricingLiabCode";
				}
				if("insuAge".equals(key)){
					key = "appAge";
				}
				if("insuSex".equals(key)){
					key = "sex";
				}
				if("insuJob".equals(key)){
					key = "job";
				}
				paramMap.put(key, value);
			}
//			PolicyDTO dto = new PolicyDTO();
			/*dto.setSex(com.element("insuSex").getText());
			dto.setAppAge(com.element("insuAge").getText());
			dto.setJob(com.element("insuJob").getText());
			if(!"".equals(com.element("amnt").getText())&&com.elementText("amnt")!=null){
				dto.setAmnt(new BigDecimal(com.element("amnt").getText()));
			}
			if(!"".equals(com.element("prem").getText())&&com.element("prem").getText()!=null){
				dto.setPrem(new BigDecimal(com.element("prem").getText()));
			}
			if(!"".equals(com.element("mult").getText())&&com.element("mult").getText()!=null){
				dto.setMult(Integer.parseInt(com.element("mult").getText()));
			}
			dto.setPayEndYear(com.element("payEndYear").getText());
			dto.setPayEndYearFlag(com.element("payEndYearFlag").getText());
			dto.setInsuYear(com.element("insuYear").getText());
			dto.setInsuYearFlag(com.element("insuYearFlag").getText());
			dto.setPayIntv(com.element("payIntv").getText());
			dto.setAmntPremUnit(null);
			dto.setUnit("1");*/
			PfwebServiceOutterBoImpl webServiceCoreBo = SpringServiceFactory.getBean("factoryabclife_pfwebServiceOutterBo_bo");
			Map<String,Map<String,BigDecimal>> map = webServiceCoreBo.comboCal(comID, paramMap);
			Map<String,Map<String,String>> map2 =  webServiceCoreBo.splitElemValue(comID);
			List<TComboInsurtype> insurs = this.testDaoImpl.getComboInsurtypeByid(comID);
			
			BigDecimal comboAmntCount = BigDecimal.ZERO;
			BigDecimal comboPremCount = BigDecimal.ZERO;
			
			rtn.append("<message><body><com>");
			
			rtn.append("<risks>");
			for(TComboInsurtype insur:insurs){
//				StringBuilder pricingrtn = new StringBuilder();
				List<TComboInsurtype> pricings = this.testDaoImpl.getComboInsurtypeByInsurId(comID, insur.getInsurtypeId());
				BigDecimal riskAmntCount = BigDecimal.ZERO;
				BigDecimal riskPremCount = BigDecimal.ZERO;
				rtn.append("<risk>");
				rtn.append("<dutys>");
				for(TComboInsurtype pricing:pricings){
					Map<String,BigDecimal> pricingMap = map.get(pricing.getPricingCode());
					Map<String,String> s = map2.get(pricing.getPricingCode());
					BigDecimal amnt = pricingMap.get("amnt");
					BigDecimal prem = pricingMap.get("prem");
					riskAmntCount = riskAmntCount.add(amnt);
					riskPremCount = riskPremCount.add(prem);
					rtn.append("<duty>");
					rtn.append("<dutyCode>"+pricing.getPricingCode()+"</dutyCode>");
					rtn.append("<amnt>"+amnt+"</amnt>");
					rtn.append("<prem>"+prem+"</prem>");
					String insuYear = s.get("insuYear");
					String insuYearFlag = "";
					if(insuYear==null||"".equals(insuYear)){
						insuYear = (String) paramMap.get("insuYear");
						insuYearFlag = (String) paramMap.get("insuYearFlag");
					}else{
						insuYear = s.get("insuYear").split("-")[0];
						insuYearFlag = s.get("insuYear").split("-")[1];
					}
					String payEndYear = s.get("payEndYear");
					String payEndYearFlag = "";
					if(payEndYear == null || "".equals(payEndYear)){
						payEndYear = (String) paramMap.get("payEndYear");
						payEndYearFlag = (String) paramMap.get("payEndYearFlag");
					}else{
						payEndYear = s.get("payEndYear").split("-")[0];
						payEndYearFlag = s.get("payEndYear").split("-")[1];
					}
					String payIntv = s.get("payIntv");
					if(payIntv == null || "".equals(payIntv)){
						payIntv = (String) paramMap.get("payIntv");
					}
					String mult = s.get("mult");
					if(mult == null || "".equals(mult)){
						mult = (String) paramMap.get("mult");
					}
					rtn.append("<mult>"+mult+"</mult>");
					rtn.append("<insuYear>"+insuYear+"</insuYear>");
					rtn.append("<insuYearFlag>"+insuYearFlag+"</insuYearFlag>");
					rtn.append("<payEndYear>"+payEndYear+"</payEndYear>");
					rtn.append("<payEndYearFlag>"+payEndYearFlag+"</payEndYearFlag>");
					rtn.append("<payIntv>"+payIntv+"</payIntv>");
					
					rtn.append("</duty>");
				}
				rtn.append("</dutys>");
				
				rtn.append("<riskID>"+insur.getInsurtypeId()+"</riskID>");
				rtn.append("<riskCode>"+insur.getInsurtypeCode()+"</riskCode>");
				rtn.append("<amnt>"+riskAmntCount+"</amnt>");
				rtn.append("<prem>"+riskPremCount+"</prem>");
				rtn.append("</risk>");
				comboAmntCount = comboAmntCount.add(riskAmntCount);
				comboPremCount = comboPremCount.add(riskPremCount);
				
			}
			
			rtn.append("</risks>");
			rtn.append("<comID>"+comID+"</comID>");
			rtn.append("<comCode>"+comCode+"</comCode>");
			rtn.append("<amnt>"+comboAmntCount+"</amnt>");
			rtn.append("<prem>"+comboPremCount+"</prem>");
			rtn.append("</com></body><head></head></message>");
			Logger.info(rtn.toString());
		}catch(Exception e){
			Logger.info("计算组合保额保费异常",e);
			rtn.append("<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>");
		}
		return rtn.toString();
	}
	
	//年末现价
	@SuppressWarnings("unchecked")
	public String getCashValue(String paramXML){
		String xml = "<message><body>" +
				"<risk>"+
					"<riskID>199</riskID>"+
					"<riskCode>1025</riskCode>"+
					"<dutys>"+
						"<duty>"+
							"<dutyCode>102501</dutyCode>"+
							"<insYearFrom>1</insYearFrom>"+
							"<insYearTo>5</insYearTo>"+
							"<sex>1</sex>"+
							"<appAge>18</appAge>"+
							"<job>1</job>"+
							"<payEndYear>3</payEndYear>"+
							"<insuYearFlag>A</insuYearFlag>"+
							"<insuYear>80</insuYear>"+
							"<payEndYearFlag>Y</payEndYearFlag>"+
							"<payIntv>12</payIntv>"+
							"<getYear>70</getYear>"+
							"<amnt>1000</amnt>"+
						"</duty>" +
					"</dutys>"+
				"</risk></body><head></head></message>";
		Logger.info(paramXML);
		StringBuilder rtn = new StringBuilder("<message><body><risk>");
		try{
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			
			Element risk = body.element("risk");
			String riskID = risk.elementText("riskID");
			String riskCode = risk.elementText("riskCode");
			Element dutys = risk.element("dutys");
			List<Element> duty = dutys.elements("duty");
			TInsurtypeBasicInf insur = this.testDaoImpl.queryRisk(Long.parseLong(riskID));
			
			rtn.append("<riskID>"+riskID+"</riskID>");
			rtn.append("<riskCode>"+riskCode+"</riskCode>");
			rtn.append("<dutys>");
			for(int i = 0;i<duty.size();i++){
				Element dy = duty.get(i);
				String dutyCode = dy.elementText("dutyCode");
				rtn.append("<duty>");
				rtn.append("<dutyCode>"+dutyCode+"</dutyCode>");
				rtn.append("<values>");
				int insYearFrom = Integer.parseInt(dy.elementText("insYearFrom"));
				int insYearTo = Integer.parseInt(dy.elementText("insYearTo"));
//				PolicyDTO dto = new PolicyDTO();
				
				List<Element> params = dy.elements();
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("unit", "1");
				for(int k = 0;k<params.size();k++){
					Element param = params.get(k);
					String key = param.getName();
					String value = param.getText();
					if("dutyCode".equals(key)){
						key = "pricingLiabCode";
					}
					if("insuAge".equals(key)){
						key = "appAge";
					}
					if("insuSex".equals(key)){
						key = "sex";
					}
					if("insuJob".equals(key)){
						key = "job";
					}
					map.put(key, value);
				}
				
				map.put("riskVer", insur.getVerNo());
//				dto.setInsurtypeCode(riskCode);
//				dto.setUnit("1");
//				dto.setSex(dy.elementText("sex"));
//				dto.setPricingLiabCode(dutyCode);
//				dto.setRiskVer(insur.getVerNo());
//				dto.setAppAge(dy.elementText("age"));
//				dto.setJob(dy.elementText("job"));
//				dto.setPayEndYear(dy.elementText("payEndYear"));
//				dto.setPayEndYearFlag(dy.elementText("payEndYearFlag"));
//				dto.setInsuYear(dy.elementText("insuYear"));
//				dto.setInsuYearFlag(dy.elementText("insuYearFlag"));
//				dto.setPayIntv(dy.elementText("payIntv"));
//				dto.setGetYear(dy.elementText("getYear"));
//				if(dy.elementText("amnt") != null){
//					dto.setAmnt(new BigDecimal(dy.elementText("amnt")));
//				}
				
				WebServiceCoreBoImpl webServiceCoreBo = SpringServiceFactory.getBean("factoryabclife_webServiceCoreBo_bo");
				while(insYearFrom <= insYearTo){
//					dto.setInsYear(String.valueOf(insYearFrom));
					map.put("insYear", String.valueOf(insYearFrom));
					if("1".equals(insur.getTermType())){
						BigDecimal value = webServiceCoreBo.cal("0000", "3", "000000", "000000", "CASHVA", "", "", "", map);
						rtn.append("<value>");
						rtn.append("<insYear>"+insYearFrom+"</insYear>");
						rtn.append("<value>"+value+"</value>");
						rtn.append("</value>");
					}else{
						rtn.append("<value>");
						rtn.append("<insYear>"+insYearFrom+"</insYear>");
						rtn.append("<value>0</value>");
						rtn.append("</value>");
					}
					insYearFrom++;
				}
				rtn.append("</values>");
				rtn.append("</duty>");
			}
			rtn.append("</dutys></risk></body><head></head></message>");
			Logger.info(rtn.toString());
		}catch(Exception e){
			Logger.info("计算年末现价异常",e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		
		return rtn.toString().replace("null", "");
	}
	
	//风险保额返回带保单类型以及客户号
	@SuppressWarnings("unchecked")
	public String getRiskAmnts(String paramXML)throws DocumentException{
		String xml = "<message><body>"+
				"<reqs>"+
					"<req>"+
						"<riskAccumRange>风险累计范围：01/本投保单；02/本投保单+历史保单</riskAccumRange>"+
						"<custnoInfos>"+
							"<custnoInfo>"+
								"<custno>客户号</custno>"+
								"<risks>"+
									"<risk>"+
									"<riskID>1</riskID>" +
									"<riskCode>6801</riskCode>"+
									"<dutys>"+
										"<duty>" +
											"<riskAmntType>ALL</riskAmntType>"+
											"<dutyCode>680101</dutyCode>"+
											"<insuAge>18</insuAge>" +
											"<amnt>10000</amnt>" +
											"<prem>10</prem>" +
											"<insYear>2</insYear>" +
											"<payEndYear>3</payEndYear>"+
										"</duty>"+
									"</dutys>"+
									"</risk>"+
								"</risks>"+
							"</custnoInfo>"+
						"</custnoInfos>"+
					"</req>"+
				"</reqs>"+
			"</body></message>";
		StringBuilder rtn = new StringBuilder("<message><body><resps>");
		Logger.info(paramXML);
		try {
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			Element reqs = body.element("reqs");
			List<Element> reqList = reqs.elements();
			for(Element req : reqList){
				rtn.append("<resp>");
				rtn.append("<riskAccumRange>"+req.elementText("riskAccumRange")+"</riskAccumRange>");
				Element custnoInfos = req.element("custnoInfos");
				List<Element> custnoInfoList = custnoInfos.elements();
				rtn.append("<resultInfs>");
				for(Element custnoInfo:custnoInfoList){
					rtn.append("<resultInf>");
					rtn.append("<custno>"+custnoInfo.elementText("custno")+"</custno>");
					Element risks = custnoInfo.element("risks");
					rtn.append("<risks>");
					List<Element> risk = risks.elements("risk");
					for(int j = 0;j<risk.size();j++){
						Element rk = risk.get(j);
						
						Long id = Long.parseLong(rk.elementText("riskID"));
						TInsurtypeBasicInf insur = this.testDaoImpl.queryRisk(id);
						String riskCode = rk.elementText("riskCode");
						Element dutys = rk.element("dutys");
						List<Element> duty = dutys.elements("duty");
						StringBuilder anduty = new StringBuilder("<dutys>");
						
						for(int i=0;i<duty.size();i++){
//							PolicyDTO dto = new PolicyDTO();
							Element dy = duty.get(i);
							String dutyCode = dy.elementText("dutyCode");
							String riskAmntType = dy.elementText("riskAmntType");
							
							List<Element> params = dy.elements();
							Map<String,Object> map = new HashMap<String,Object>();
							map.put("unit", "1");
							for(int k = 0;k<params.size();k++){
								Element param = params.get(k);
								String key = param.getName();
								String value = param.getText();
								if("dutyCode".equals(key)){
									key = "pricingLiabCode";
								}
								if("insuAge".equals(key)){
									key = "appAge";
								}
								if("insuSex".equals(key)){
									key = "sex";
								}
								if("insuJob".equals(key)){
									key = "job";
								}
								map.put(key, value);
							}
							
							anduty.append("<duty>");
							
							anduty.append("<dutyCode>"+dutyCode+"</dutyCode>");
							anduty.append("<riskAmnts>");
							TPricingLiabDef pricingLiab = this.testDaoImpl.getTPricingLiabDef(id, dutyCode);
//							dto.setAppAge(dy.elementText("insuAge"));
//							if(!"".equals(dy.elementText("amnt"))&&dy.elementText("amnt")!=null){
//								dto.setAmnt(new BigDecimal(dy.elementText("amnt")));
//							}
//							if(!"".equals(dy.elementText("prem"))&&dy.elementText("prem")!=null){
//								dto.setPrem(new BigDecimal(dy.elementText("prem")));
//							}
//							dto.setPayEndYear(dy.elementText("payEndYear"));
//							dto.setInsYear(dy.elementText("insYear"));
//							dto.setPricingLiabCode(dutyCode);
//							dto.setUnit("1");
							WebServiceCoreBoImpl webServiceCoreBo = SpringServiceFactory.getBean("factoryabclife_webServiceCoreBo_bo");
							if("ALL".equals(riskAmntType)){
							List<TObjFormula> riskamnts = this.testDaoImpl.getTObjFormula(pricingLiab.getPricingLiabId());
							for(TObjFormula t:riskamnts){
								String risktype = t.getType().substring(3);
								BigDecimal result = webServiceCoreBo.cal(riskCode, insur.getVerNo().toString(), dutyCode, "", "E1", "", risktype,"", map);
								anduty.append("<riskamnt>");
								anduty.append("<type>"+risktype+"</type>");
								anduty.append("<value>"+result+"</value>");
								anduty.append("</riskamnt>");
								
							}
							}else{
								String[] strs = riskAmntType.split("-");
								for(String str:strs){
									BigDecimal result = webServiceCoreBo.cal(riskCode, insur.getVerNo().toString(), dutyCode, "", "E1", "", str,"", map);
									anduty.append("<riskamnt>");
									anduty.append("<type>"+riskAmntType+"</type>");
									anduty.append("<value>"+result+"</value>");
									anduty.append("</riskamnt>");
									
								}
							}
							anduty.append("</riskAmnts>");
							anduty.append("</duty>");
						}
						
						anduty.append("</dutys>");
						rtn.append("<risk>");
						rtn.append("<riskID>"+id+"</riskID>");
						rtn.append("<riskCode>"+riskCode+"</riskCode>");
						rtn.append("<riskName>"+insur.getInsurtypeName()+"</riskName>");
						rtn.append("<isWaive>"+insur.getIsWaive()+"</isWaive>");
						rtn.append(anduty);
						rtn.append("</risk>");
					}
					rtn.append("</risks>");
					rtn.append("</resultInf>");
				}
				rtn.append("</resultInfs>");
				rtn.append("</resp>");
			}
			rtn.append("</resps></body></message>");
			Logger.info(rtn.toString());
		} catch (Exception e) {
			Logger.info("计算风险保额异常", e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		return rtn.toString().replace("null", "");
	}
	
	
	
	//加费加费
	@SuppressWarnings("unchecked")
	public String getAddPrem(String paramXML){
		String xml="<message>" +
						"<body>"+   
							"<risks>"+
								"<risk>"+
									"<riskID>1</riskID>"+
									"<riskCode>6801</riskCode>"+
									"<dutys>"+
										"<duty>"+
											"<dutyCode>680101</dutyCode>"+
											"<insuAge>18</insuAge>"+
											"<insuSex>1</insuSex>"+
											"<insuJob>5</insuJob>"+
											"<addpremType>C2</addpremType>"+
											"<addpremWay></addpremWay>"+
											"<amnt>10000</amnt>"+
											"<prem>10</prem>"+
											"<emVal></emVal>"+
											"<payIntv>12</payIntv>"+
									"</duty>"+
								"</dutys>"+
							"</risk>"+
						"</risks>"+
					"</body>" +
					"</message>";
		
		Logger.info(paramXML);
		StringBuilder rtn = new StringBuilder("<message><body><risks>");
		try{
			Document doc = DocumentHelper.parseText(paramXML);
			Element message = doc.getRootElement();
			Element body = message.element("body");
			Element risks = body.element("risks");
			List<Element> risk = risks.elements("risk");
			for(int j = 0;j<risk.size();j++){
				Element rk = risk.get(j);
				Long id = Long.parseLong(rk.elementText("riskID"));
				TInsurtypeBasicInf insur = this.testDaoImpl.queryRisk(id);
				String riskCode = (rk.elementText("riskCode"));
				Element dutys = rk.element("dutys");
				List<Element> duty = dutys.elements("duty");
				StringBuilder anduty = new StringBuilder("<dutys>");
				for(int i=0;i<duty.size();i++){
//					PolicyDTO dto = new PolicyDTO();
					Element dy = duty.get(i);
					String dutyCode = dy.elementText("dutyCode");
					
					List<Element> params = dy.elements();
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("unit", "1");
					for(int k = 0;k<params.size();k++){
						Element param = params.get(k);
						String key = param.getName();
						String value = param.getText();
						if("dutyCode".equals(key)){
							key = "pricingLiabCode";
						}
						if("insuAge".equals(key)){
							key = "appAge";
						}
						if("insuSex".equals(key)){
							key = "sex";
						}
						if("insuJob".equals(key)){
							key = "job";
						}
						map.put(key, value);
					}
					
//					dto.setAppAge(dy.elementText("insurAge"));
//					if(!"".equals(dy.elementText("amnt"))&&dy.elementText("amnt")!=null){
//						dto.setAmnt(new BigDecimal(dy.elementText("amnt")));
//					}
//					if(!"".equals(dy.elementText("prem"))&&dy.elementText("prem")!=null){
//						dto.setPrem(new BigDecimal(dy.elementText("prem")));
//					}
//					dto.setSex(dy.elementText("insurSex"));
//					dto.setPoint(dy.elementText("emVal"));
//					dto.setPayIntv(dy.elementText("payIntv"));
//					dto.setJob(dy.elementText("insurJob"));
//					dto.setPricingLiabCode(dutyCode);
//					dto.setUnit("1");
					String addpremType = dy.elementText("addpremType");
					WebServiceCoreBoImpl webServiceCoreBo = SpringServiceFactory.getBean("factoryabclife_webServiceCoreBo_bo");
					BigDecimal result = webServiceCoreBo.cal(riskCode, insur.getVerNo().toString(), dutyCode, "", addpremType, "", "", "",map);
					
					anduty.append("<duty>");
					anduty.append("<dutyCode>"+dutyCode+"</dutyCode>");
					anduty.append("<addpremType>"+addpremType+"</addpremType>");
					anduty.append("<value>"+result+"</value>");
					anduty.append("</duty>");
				}
				anduty.append("</dutys>");
				rtn.append("<risk>");
				rtn.append("<riskID>"+id+"</riskID>");
				rtn.append("<riskCode>"+riskCode+"</riskCode>");
				rtn.append(anduty);
				rtn.append("</risk>");
			}
			
			rtn.append("</risks></body></message>");
			
			Logger.info(rtn.toString());

		}catch(Exception e){
			Logger.info("计算责任加费", e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		
		return rtn.toString().replace("null", "");
	}
	//计算万能费用
	public String calUniversalFee(String paramXML){
		String xml = "<message><body>"+
						"<risk>"+
						"<riskID>险种ID</riskID>"+
						"<riskCode>险种代码</riskCode>"+
						"<feeType>费用类型</feeType>"+
						"<dutyCode>责任代码</dutyCode>"+
						"<payIntv>交费频率</payIntv>"+
						"<insuYear>保单年度</insuYear>"+
						"<param>入参金额</param>"+
						"</risk>"+
					"</body><head></head></message>";

		Logger.info(paramXML);
		StringBuilder rtn = new StringBuilder("<message><body><risk>");
		try{
			Document doc = DocumentHelper.parseText(paramXML);
			if(doc==null){
				return "请求报文数据异常";
			}
			/*Element message = doc.getRootElement();
			Element body = message.element("body");
			Element risk = body.element("risk");
			String riskId = risk.elementText("riskID");
			String riskCode = risk.elementText("riskCode");
			String feeType = risk.elementText("feeType");
			String dutyCode = risk.elementText("dutyCode");
			String payIntv = risk.elementText("payIntv");
			String insuYear = risk.elementText("insuYear");
			String param = risk.elementText("param");*/
			
			
			rtn.append("<riskID>1</riskID>");
			rtn.append("<riskCode>1012</riskCode>");
			rtn.append("<feeType>B1</feeType>");
			rtn.append("<dutyCode>101201</dutyCode>");
			rtn.append("<feePropor>0.1</feePropor>");
			rtn.append("<fee>9500</fee>");
			rtn.append("</risk>");
			rtn.append("</body><head></head></message>");
			
			
		}catch(Exception e){
			Logger.info("计算万能费用异常",e);
			return "<message><body>" +
			"<errorCode>11111</errorCode>"+
			"<errorMessage>报文处理异常</errorMessage>"+
			"</body><head></head></message>";
		}
		
		return rtn.toString().replace("null", "");
	}
	
}
