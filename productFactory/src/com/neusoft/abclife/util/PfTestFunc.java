package com.neusoft.abclife.util;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import com.neusoft.abclife.productfactory.blo.PfwebServiceOutterBoImpl;
import com.neusoft.abclife.productfactory.dao.WebServiceCoreDaoImpl;
import com.neusoft.abclife.productfactory.dao.WebServiceDaoImpl;
import com.neusoft.abclife.productfactory.entity.PfDynamicBean;
import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.abclife.productfactory.entity.TFunctionArgRef;
import com.neusoft.abclife.productfactory.entity.TFunctionDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TOccRate;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;
import com.neusoft.fdframework.arithmetic.engine.job.expressions.Context;
import com.neusoft.fdframework.core.SpringServiceFactory;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class PfTestFunc {
	
	private static final Pattern PATTERN = Pattern.compile("\\$\\{\\S+?\\}"); 
	/**
	 * 函数 取费用管理
	 * */
    public BigDecimal getFee(String feeType, String unit){
    	BigDecimal ret = null;
    	if(!StringUtil.isEmpty(feeType) && !StringUtil.isEmpty(unit)){
    	String feeTypeIn = "";
    	String unitIn = "";
    	//处理feeType和unit
    	if(StringUtils.isNotEmpty(feeType) && PATTERN.matcher(feeType) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(feeType); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				feeTypeIn = entry.getValue().toString();
			}   		
    	}
    	if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
    		Map<String,Serializable> valueMap2 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap2.entrySet())
			{
				unitIn = entry.getValue().toString();
			}
		}
    	PfDynamicBean paramBean = PfIndicatorContextHolder.get();  	
    	//查询函数
    	WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
    	TFunctionDef tFunctionDef = pfTestCalDAOImpl.queryTFunctionDef("getFee");
    	//查询inner参数 暂定从paramBean中取，之后改成从Context中取
		List<TFunctionArgRef> argListIn = pfTestCalDAOImpl.queryTFunctionDefArg(tFunctionDef.getId().toString(), "inner"); 
		//处理参数
		Map<String, Object> argMap = new HashMap<String, Object>();
		argMap.put("feeType", feeTypeIn);
		for(int i = 0; i < argListIn.size(); i++){
			TFunctionArgRef itemArg = argListIn.get(i);
			String returnType = itemArg.getReturnType();
			String propertyName = itemArg.getRefValue().substring(itemArg.getRefValue().lastIndexOf(".")+1);
			if(paramBean.contains(propertyName)){
				Object bomValue = getBomValue(propertyName, returnType, paramBean);
				argMap.put(propertyName, bomValue);
			}else{	
				throw new EngineException("91101",new String[]{"公式函数缺少入参"}, null);
			}			
		}
		ret = pfTestCalDAOImpl.queryFee(argMap.entrySet(),argMap);
		if(ret != null){
			ret = ret.divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);			
		}
//		else{
//			ret = new BigDecimal("0");
//		}   
    	}
    	return ret;
    }
    
    /**
	 * 函数 取现价表
	 * */
    public BigDecimal getValue(String pricingLiabCode,String riskVer ,String unit){
    	return getObjRate(pricingLiabCode,riskVer,unit,"V");
    }
               
    /**
	 * 函数 取保额费率表
	 * */
    public BigDecimal getAmntRate(String pricingLiabCode,String riskVer ,String unit){
    	return getObjRate(pricingLiabCode,riskVer,unit,"RT_A");
    }
    
    /**
	 * 函数 取保费费率表
	 * */
    public BigDecimal getPremRate(String pricingLiabCode,String riskVer ,String unit){
    	return getObjRate(pricingLiabCode,riskVer,unit,"RT_P");
    }
    
    /**
	 * 函数 取风险加费  每天的费率
	 * */
    public BigDecimal getRiskRate(String pricingLiabCode,String riskVer ,String unit){
    	BigDecimal rtn = getObjRate(pricingLiabCode,riskVer,unit,"EXP");
    	
    	return rtn.divide(new BigDecimal(365), 50, RoundingMode.HALF_UP);
    }
    
    /**
	 * 函数 取健康加费
	 * */
    public BigDecimal getHealthRate(String pricingLiabCode,String riskVer ,String unit){
    	return getObjRate(pricingLiabCode,riskVer,unit,"HL");
    }
    
    /**
	 * 函数 取减额缴清
	 * */
    public BigDecimal getRedctionRate(String pricingLiabCode,String riskVer ,String unit){
    	return getObjRate(pricingLiabCode,riskVer,unit,"PU");
    }
    
    /**
     * 函数 取职业加费
     */   
    public BigDecimal getOccRate(String payIntv,String job,String unit){
    	BigDecimal ret = BigDecimal.ZERO;
    	if(!StringUtil.isEmpty(payIntv) && !StringUtil.isEmpty(job) && !StringUtil.isEmpty(unit)){
    	String payIntvIn = "";
    	String jobIn = "";
    	String unitIn = "";
    	//处理参数
    	if(StringUtils.isNotEmpty(payIntv) && PATTERN.matcher(payIntv) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(payIntv); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				payIntvIn = entry.getValue().toString();
			}   		
    	}
    	
    	if(StringUtils.isNotEmpty(job) && PATTERN.matcher(job) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(job); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				jobIn = entry.getValue().toString();
			}   		
    	}
    	if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				unitIn = entry.getValue().toString();
			}   		
    	}
    	
    	WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
    	TOccRate tor = pfTestCalDAOImpl.getOccRate(payIntvIn, jobIn);
    	if(tor!=null){
    		ret = tor.getSuppriskscore();
    	}
    	if(ret != null){
			ret = ret.divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);			
		}
    	}
    	return ret;
    }
    
    /**
     * 获取精算数据
     * @param pricingLiabCode
     * @param riskVer
     * @param unit
     * @param rateType
     * @author shi
     * @return
     */
    private BigDecimal getObjRate(String pricingLiabCode,String riskVer ,String unit,String rateType){
    	BigDecimal ret = BigDecimal.ZERO;;
    	if(!StringUtil.isEmpty(pricingLiabCode) && !StringUtil.isEmpty(riskVer) && !StringUtil.isEmpty(unit)){
    	String pricingLiabCodeIn = "";
    	String riskVerIn = "";
    	String unitIn = "";
    	//处理参数
    	if(StringUtils.isNotEmpty(pricingLiabCode) && PATTERN.matcher(pricingLiabCode) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(pricingLiabCode); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				pricingLiabCodeIn = entry.getValue().toString();
			}   		
    	}
    	
    	if(StringUtils.isNotEmpty(riskVer) && PATTERN.matcher(riskVer) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(riskVer); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				riskVerIn = entry.getValue().toString();
			}   		
    	}
    	
    	if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				unitIn = entry.getValue().toString();
			}   		
    	}
    	WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");

		//处理参数
		Map<String, Object> argMap = new HashMap<String, Object>();
		argMap.put("pricingLiabCode", pricingLiabCodeIn);
		argMap.put("verNo", riskVerIn);
		argMap.put("rateType", rateType);
		PfDynamicBean paramBean = PfIndicatorContextHolder.get();  
		List<TDimensionDef> argListIn = pfTestCalDAOImpl.queryDemension(argMap.entrySet());
		//将维度入参
		Map<String,Object> paramMap = new HashMap<String,Object>();
		for(int i = 0; i < argListIn.size(); i++){
			TDimensionDef itemArg = argListIn.get(i);
			String returnType = itemArg.getReturnType();
			String propertyName = itemArg.getRefValue().substring(itemArg.getRefValue().lastIndexOf(".")+1).trim();
			
			if(paramBean.contains(propertyName)){
				if("1".equals(itemArg.getMatchFlag())){
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName+"$", bomValue);
				}else{
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName, bomValue);
				}
			}else{	
				throw new EngineException("91101",new String[]{"公式函数缺少入参"}, null);
			}
			
		}
		
		if(argListIn.size()!=0){
			ret = pfTestCalDAOImpl.queryRate(argMap.entrySet(), paramMap);
		}
	
		if(ret != null){
			ret = ret.divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);			
		}
    	}
    	return ret;
    }
    
    /**
	 * 函数 取缴费因子
	 * */
    public BigDecimal getPayIntv(String paymentFre){
    	String paymentFreIn = "";
    	if(StringUtils.isNotEmpty(paymentFre) && PATTERN.matcher(paymentFre) != null){
    		Map<String,Serializable> valueMap2 = executeSpringEL(paymentFre); 
			for(Entry<String,Serializable> entry : valueMap2.entrySet())
			{
				paymentFreIn = entry.getValue().toString();
			}   		
    	} 
    	BigDecimal bd = null;
    	if("12".equals(paymentFreIn)){
    		bd = new BigDecimal("1");
    	}else if("6".equals(paymentFreIn)){
    		bd = new BigDecimal("0.52");
    	}else if("3".equals(paymentFreIn)){
    		bd = new BigDecimal("0.265");
    	}else if("1".equals(paymentFreIn)){
    		bd = new BigDecimal("0.09");
    	}else{
    		bd = new BigDecimal("1");
    		//throw new EngineException("91109",new String[]{"缴费因子异常"},new Exception());
    	}
    	
    	return bd;
    	
    }
    
    /**
	 * 函数 取最大值 
	 * */
    public BigDecimal getMax(String param1, String param2){
    	System.out.println("getMax: "+param1 +", "+ param2);
    	BigDecimal ret = BigDecimal.ZERO;;
    	if(!StringUtil.isEmpty(param1) && !StringUtil.isEmpty(param2)){
    		String param1In = "";
        	String param2In = "";
    		if(StringUtils.isNotEmpty(param1) && PATTERN.matcher(param1) != null){
        		Map<String,Serializable> valueMap1 = executeSpringEL(param1); 
    			for(Entry<String,Serializable> entry : valueMap1.entrySet())
    			{
    				param1In = entry.getValue().toString();
    			}   		
        	}
    		if(StringUtils.isNotEmpty(param2) && PATTERN.matcher(param2) != null){
        		Map<String,Serializable> valueMap2 = executeSpringEL(param2); 
    			for(Entry<String,Serializable> entry : valueMap2.entrySet())
    			{
    				param2In = entry.getValue().toString();
    			}   		
        	}   		
    		ret = new BigDecimal(param1In).max(new BigDecimal(param2In));
    	}   	
    	return ret;	
    }
    
    /**
	 * 函数 取最小值 
	 * */
    public BigDecimal getMin(String param1, String param2){
    	System.out.println("getMin: "+param1 +", "+ param2);
    	BigDecimal ret = BigDecimal.ZERO;;
    	if(!StringUtil.isEmpty(param1) && !StringUtil.isEmpty(param2)){   
    		if(StringUtils.isNotEmpty(param1) && PATTERN.matcher(param1) != null){
        		Map<String,Serializable> valueMap1 = executeSpringEL(param1); 
    			for(Entry<String,Serializable> entry : valueMap1.entrySet())
    			{
    				param1 = entry.getValue().toString();
    			}   		
        	}
    		if(StringUtils.isNotEmpty(param2) && PATTERN.matcher(param2) != null){
        		Map<String,Serializable> valueMap2 = executeSpringEL(param2); 
    			for(Entry<String,Serializable> entry : valueMap2.entrySet())
    			{
    				param2 = entry.getValue().toString();
    			}   		
        	} 
    		ret = new BigDecimal(param1).min(new BigDecimal(param2));
    	}   	
    	return ret;	
    }
    
 
    /**
     * 返回默认值
     */
    public BigDecimal getDefault(String defaultVal){
    	String defaultValIn = "0";
    	if(!StringUtil.isEmpty(defaultVal)){
    		
    	if(StringUtils.isNotEmpty(defaultVal) && PATTERN.matcher(defaultVal) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(defaultVal); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				if(entry.getValue()==null){
//					defaultValIn = (String) entry.getValue();
				}else{
					defaultValIn = entry.getValue().toString();
				}
				
			}   		
    	}
    	}
    	return new BigDecimal(defaultValIn);
    }
    
    
    /**
	 * Bom获取参数
	 * */
	private Object getBomValue(String refValue, String returnType, PfDynamicBean paramBean) {
		Object rtnBomValue = null;
		String propertyName = refValue;
		//key是否存在
		if(paramBean.contains(propertyName)){
			if("number".equals(returnType)){					
				rtnBomValue = paramBean.getBigDecimal(propertyName);
			}else{
				rtnBomValue = paramBean.getString(propertyName);				
			}	
		}
		return rtnBomValue;
	}
	
	/**
	 * context获取参数
	 * */
	private Map<String,Serializable> executeSpringEL(String expression)
	{
		Map<String,Serializable> valueMap = new HashMap<String,Serializable>();
		int startIndex = expression.indexOf("${");
		String key = expression.substring(startIndex+2,expression.length()-1);
		expression = "#"+key;
		ExpressionParser parser = new SpelExpressionParser();
		StandardEvaluationContext sc = new StandardEvaluationContext();
		Map<String, Object> map = Context.getInstance().getMap();
		if(map != null){
    		for(Entry<String,Object> entry : map.entrySet()){
    			sc.setVariable(entry.getKey(),entry.getValue());
    		}
    	}
		Object result = null;
		try{
		    result = parser.parseExpression(expression).getValue(sc, Object.class);
		}
		catch(Exception e)
		{
			throw new RuntimeException("解析EL表达式异常",e);
		}
		valueMap.put(key, (Serializable)result);
		return valueMap;
	}
	
	/**
	 * 取月天数
	 * 
	 */
	public BigDecimal getDays(String balaDate)throws Exception {
		BigDecimal dateNum = BigDecimal.ZERO;
		if(!StringUtil.isEmpty(balaDate)){   		
    		if(StringUtils.isNotEmpty(balaDate) && PATTERN.matcher(balaDate) != null){
        		Map<String,Serializable> valueMap1 = executeSpringEL(balaDate); 
    			for(Entry<String,Serializable> entry : valueMap1.entrySet())
    			{
    				balaDate = entry.getValue().toString();
    			}   		
        	} 	
    		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");    		
    		Calendar birth = Calendar.getInstance();
    		birth.setTime(sdf.parse(balaDate));
    		birth.set(Calendar.DATE,1);
    		birth.roll(Calendar.DATE,-1);
    		dateNum = new BigDecimal(birth.get(Calendar.DATE));
    	}	
		return dateNum;
	}	
	
	/**
	 * 伤残比例
	 */
	public BigDecimal getDisableVal(String degreeOfDisability)throws Exception {
		BigDecimal disLvL = BigDecimal.ZERO;
		if(!StringUtil.isEmpty(degreeOfDisability)){   		
    		if(StringUtils.isNotEmpty(degreeOfDisability) && PATTERN.matcher(degreeOfDisability) != null){
        		Map<String,Serializable> valueMap1 = executeSpringEL(degreeOfDisability); 
    			for(Entry<String,Serializable> entry : valueMap1.entrySet())
    			{
    				degreeOfDisability = entry.getValue().toString();
    			}   		
        	} 
    		DecimalFormat df = new DecimalFormat("0.00"); 
    		   		
    		if(GlobalVariable.disable.get(degreeOfDisability)!=null){
    			disLvL = new BigDecimal(df.format(GlobalVariable.disable.get(degreeOfDisability)));
    		}
    	}		
		return disLvL;
	}
	/**
	 * 算年末现价
	 * @param pricingLiabCode
	 * @param riskVer
	 * @param unit
	 * @param insYear
	 * @return
	 */
	public BigDecimal getValueEnd(String pricingLiabCode,String riskVer,String unit,String insYear){
		BigDecimal ret = BigDecimal.ZERO;
		String pricingLiabCodeIn = "";
		String riskVerIn = "";
		String unitIn = "";
		String insYearIn  = "";
		if(StringUtils.isNotEmpty(pricingLiabCode) && PATTERN.matcher(pricingLiabCode) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(pricingLiabCode); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				pricingLiabCodeIn = entry.getValue().toString();
			}   		
    	}
		if(StringUtils.isNotEmpty(riskVer) && PATTERN.matcher(riskVer) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(riskVer); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				riskVerIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				unitIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(insYear) && PATTERN.matcher(insYear) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(insYear); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				insYearIn = entry.getValue().toString();
			}   		
		}
		
		WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
		Map<String, Object> argMap = new HashMap<String, Object>();
		argMap.put("pricingLiabCode", pricingLiabCodeIn);
		argMap.put("verNo",riskVerIn);
		argMap.put("rateType", "V");
		PfDynamicBean paramBean = PfIndicatorContextHolder.get();  
		List<TDimensionDef> argListIn = pfTestCalDAOImpl.queryDemension(argMap.entrySet());
		//将维度入参
		Map<String,Object> paramMap = new HashMap<String,Object>();
		for(int i = 0; i < argListIn.size(); i++){
			TDimensionDef itemArg = argListIn.get(i);
			String returnType = itemArg.getReturnType();
			String propertyName = itemArg.getRefValue().substring(itemArg.getRefValue().lastIndexOf(".")+1).trim();
			
			if(paramBean.contains(propertyName)){
				if("1".equals(itemArg.getMatchFlag())){
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName+"$", bomValue);
				}else{
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName, bomValue);
				}
			}else{	
				throw new EngineException("91101",new String[]{"公式函数缺少入参"}, null);
			}
			
		}
		paramMap.put("insYear", insYearIn);
		if(argListIn.size()!=0){
			ret = pfTestCalDAOImpl.queryRate(argMap.entrySet(), paramMap);
		}
	
		if(ret != null){
			ret = ret.divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);			
		}
		BigDecimal amnt = BigDecimal.ZERO;
		Map<String,Serializable> valueMap1 = executeSpringEL("{amnt}"); 
		for(Entry<String,Serializable> entry : valueMap1.entrySet())
		{
			amnt = new BigDecimal(entry.getValue().toString());
		}   		
	
	return amnt.divide(new BigDecimal("1000"), 50, RoundingMode.HALF_UP).multiply(ret);
	}
	
	/**
	 * 获取年末现价
	 * @param pricingLiabCode
	 * @param riskVer
	 * @param unit
	 * @param insYear
	 * @return
	 */
	private BigDecimal getValue(String pricingLiabCode,String riskId,String unit,String insYear){
		BigDecimal ret = BigDecimal.ZERO;;
    	if(!StringUtil.isEmpty(pricingLiabCode) && !StringUtil.isEmpty(riskId) && !StringUtil.isEmpty(unit) && !StringUtil.isEmpty(insYear)){
    	String pricingLiabCodeIn = "";
    	String riskIdIn = "";
    	String unitIn = "";
    	//处理参数
    	if(StringUtils.isNotEmpty(pricingLiabCode) && PATTERN.matcher(pricingLiabCode) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(pricingLiabCode); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				pricingLiabCodeIn = entry.getValue().toString();
			}   		
    	}
    	
    	if(StringUtils.isNotEmpty(riskId) && PATTERN.matcher(riskId) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(riskId); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				riskIdIn = entry.getValue().toString();
			}   		
    	}
    	
    	if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				unitIn = entry.getValue().toString();
			}   		
    	}
    	
    	WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");
    	TInsurtypeBasicInf insur = pfTestCalDAOImpl.getTInsurtypeBasicInf(Long.parseLong(riskIdIn));
		//处理参数
		Map<String, Object> argMap = new HashMap<String, Object>();
		argMap.put("pricingLiabCode", pricingLiabCodeIn);
		argMap.put("verNo",insur.getVerNo() );
		argMap.put("rateType", "V");
		PfDynamicBean paramBean = PfIndicatorContextHolder.get();  
		List<TDimensionDef> argListIn = pfTestCalDAOImpl.queryDemension(argMap.entrySet());
		//将维度入参
		Map<String,Object> paramMap = new HashMap<String,Object>();
		for(int i = 0; i < argListIn.size(); i++){
			TDimensionDef itemArg = argListIn.get(i);
			String returnType = itemArg.getReturnType();
			String propertyName = itemArg.getRefValue().substring(itemArg.getRefValue().lastIndexOf(".")+1).trim();
			
			if(paramBean.contains(propertyName)){
				if("1".equals(itemArg.getMatchFlag())){
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName+"$", bomValue);
				}else{
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName, bomValue);
				}
			}else{	
				throw new EngineException("91101",new String[]{"公式函数缺少入参"}, null);
			}
			
		}
		paramMap.put("insYear", insYear);
		if(argListIn.size()!=0){
			ret = pfTestCalDAOImpl.queryRate(argMap.entrySet(), paramMap);
		}
	
		if(ret != null){
			ret = ret.divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);			
		}
    	}
    	
    	BigDecimal amnt = BigDecimal.ZERO;
    		Map<String,Serializable> valueMap1 = executeSpringEL("{amnt}"); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				amnt = new BigDecimal(entry.getValue().toString());
			}   		
    	
    	return amnt.divide(new BigDecimal("1000"), 50, RoundingMode.HALF_UP).multiply(ret);
	}
	/**
	 * 获取当年年度现价
	 * @param pricingLiabCode
	 * @param riskVer
	 * @param unit
	 * @param insYear
	 * @return
	 */
	private BigDecimal getValueNow(String pricingLiabCode,String riskVer,String unit,String insYear){
//		String insYearIn = "";
//		if(StringUtils.isNotEmpty(insYear) && PATTERN.matcher(insYear) != null){
//    		Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
//			for(Entry<String,Serializable> entry : valueMap1.entrySet())
//			{
//				insYearIn = entry.getValue().toString();
//			}   		
//    	}
		return getValue(pricingLiabCode, riskVer, unit, insYear);
		
	}
	/**
	 * 上一年年度现价
	 * @param pricingLiabCode
	 * @param riskVer
	 * @param unit
	 * @param insYear
	 * @return
	 */
	private BigDecimal getValueBefore(String pricingLiabCode,String riskVer,String unit,String insYear){
//		String insYearIn = "";
//		if(StringUtils.isNotEmpty(insYear) && PATTERN.matcher(insYear) != null){
//    		Map<String,Serializable> valueMap1 = executeSpringEL(insYear); 
//			for(Entry<String,Serializable> entry : valueMap1.entrySet())
//			{
//				insYearIn = entry.getValue().toString();
//			}   		
//    	}
		int insYearInt = Integer.parseInt(insYear)-1;
		
		return getValue(pricingLiabCode, riskVer, unit,String.valueOf(insYearInt));
	}
	
	
	//退保时点现价=首年末现价*（1+现价年利率）的（上一交费日至解除合同天数-365）/365次幂
	private Double getYearValueA(String pricingLiabCode,String riskVer,String unit,
			String insYear,BigDecimal Rate,int days){
		
		Double e = Rate.doubleValue()+1;
		Double f = (days-365)/365.0;
		Double d = Math.pow(e,f);
		//return new BigDecimal(a*d);
		Double CV = getValueNow(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		System.out.println(CV*d);
		return CV*d;
	}
	
	//退保时点现价=上一年度末现价*（（365-上一交费日至解除合同天数）/365）+（本年度末现价+本年度末生存金）*（上一交费日至解除合同天数/365）
	private Double getYearValueB(String pricingLiabCode,String riskVer,String unit,
			String insYear,BigDecimal Rate,int days,Double SB){
		Double CV_1 = getValueBefore(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		Double CV = getValueNow(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		return CV_1*(365-days)/365+(CV+SB)*days/365;
	}
	//退保时点现价=(首年已缴费期数/首年应缴费期数)*首年末现价
	private Double getYearValueC(String pricingLiabCode,String riskVer,String unit,
			String insYear,String term,String payIntv){
			int terms = 0;
			int payIntvIn = 0;
    		Map<String,Serializable> valueMap1 = executeSpringEL(term); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				terms = Integer.parseInt(entry.getValue().toString());
			}   		
		
    		Map<String,Serializable> valueMap2 = executeSpringEL(payIntv); 
			for(Entry<String,Serializable> entry : valueMap2.entrySet())
			{
				payIntvIn =Integer.parseInt(entry.getValue().toString());
			}   		
		
		
		Double CV = getValueNow(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		
		return (terms*payIntvIn/12)*CV;
	}
	
	
	//退保时点现价=[上一年末现价*（1-已缴费期数/应缴费期数）+（本年末现价+本年末生存金）*已缴费期数/应缴费期数]*（1+半年现价利率）的（0-上一交费日至解除合同天数）/365次幂
	private Double getYearValueD(String pricingLiabCode,String riskVer,String unit,
			String insYear,String term,String payIntv,Double SB,Double rate,int days){
		int terms = 0;
		int payIntvIn = 0;
		Map<String,Serializable> valueMap1 = executeSpringEL(term); 
		for(Entry<String,Serializable> entry : valueMap1.entrySet())
		{
			terms = Integer.parseInt(entry.getValue().toString());
		} 
		Map<String,Serializable> valueMap2 = executeSpringEL(payIntv); 
		for(Entry<String,Serializable> entry : valueMap2.entrySet())
		{
			payIntvIn =Integer.parseInt(entry.getValue().toString());
		}
		Double CV_1 = getValueBefore(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		Double CV = getValueNow(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		
		return (CV*(1-(terms*payIntvIn)/(12*Double.valueOf(insYear)))+(CV_1+CV)*(terms*payIntvIn)/(12*Double.valueOf(insYear)))*Math.pow((1+rate), (0-days)/365);
	}
	
	//退保时点现价=上一年度末现价*（（365-上一交费日至解除合同天数）/365）+（本年度末现价+本年度末生存金）*（上一交费日至解除合同天数/365）
	private Double getYearValueE(String pricingLiabCode,String riskVer,String unit,
			String insYear,int days,Double SB){
		Double CV_1 = getValueBefore(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		Double CV = getValueNow(pricingLiabCode,riskVer,unit,insYear).doubleValue();
		return CV_1*(365-days)/365+(CV+SB)*days/365;
	}
	
	//退保
	public BigDecimal calCashValue(String payIntv,String insYear){
		BigDecimal rtn = BigDecimal.ZERO;
		String insYearIn = "";
		String payIntvIn = "";
		if(StringUtils.isNotEmpty(insYear) && PATTERN.matcher(insYear) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(insYear); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				insYearIn = entry.getValue().toString();
			}   		
    	}
		
		if(StringUtils.isNotEmpty(payIntv) && PATTERN.matcher(payIntv) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(payIntv); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				payIntvIn = entry.getValue().toString();
			}   		
    	}
		int days=0;
		Map<String,Serializable> valueMap1 = executeSpringEL("{days}"); 
		for(Entry<String,Serializable> entry : valueMap1.entrySet())
		{
			days = Integer.parseInt(entry.getValue().toString());
		}  
		
		if("0".equals(payIntvIn)){
			if(Integer.parseInt(insYearIn)<2){
				Double a = this.getYearValueA("{pricingLiabCode}", "{riskId}", "{unit}", insYearIn, new BigDecimal("0.03"), days);
				rtn = new BigDecimal(a);
			}else{
				Double a = this.getYearValueB("{pricingLiabCode}", "{riskId}", "{unit}", insYearIn, new BigDecimal("0.03"), days,1000.25);
				rtn = new BigDecimal(a);
			}
		}else{
			if(Integer.parseInt(insYearIn)<2){
				Double a = this.getYearValueC("{pricingLiabCode}", "{riskId}", "{unit}", insYearIn, "{term}", "{payIntv}");
				rtn = new BigDecimal(a);
			}else{
				//交费期内 
				//交费期外
				Boolean b = true;
				if(b){
					Double a = this.getYearValueD("{pricingLiabCode}", "{riskVer}", "{unit}", insYearIn, "{term}", payIntv, 1000.0, 1000.25, days);
					rtn = new BigDecimal(a);
				}else{
					Double a = this.getYearValueE("{pricingLiabCode}", "{riskVer}", "{unit}", insYearIn, days, 1000.0);
					rtn = new BigDecimal(a);
				}
			}
		}
		return rtn;
	} 
	/**
	 * 幂计算
	 * @param basic 增长系数
	 * @param pow	指数
	 * @param unit
	 * @return
	 */
	public BigDecimal calExp(String basic,String pow,String unit){
		BigDecimal rtn = BigDecimal.ZERO;
		String basicIn = "";
		String powIn = "";
		String unitIn = "";
		if(StringUtils.isNotEmpty(basic) && PATTERN.matcher(basic) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(basic); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				basicIn = entry.getValue().toString();
			}   		
    	}
		if(StringUtils.isNotEmpty(pow) && PATTERN.matcher(pow) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(pow); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				powIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(unit) && PATTERN.matcher(unit) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(unit); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				unitIn = entry.getValue().toString();
			}   		
		}
		
		Double a = Double.valueOf(basicIn)+1;
		Double b = Double.valueOf(powIn)-1;
		Double result = Math.pow(a, b);
		if(result!=null){
			rtn = new BigDecimal(result).divide(new BigDecimal(unitIn), 50, RoundingMode.HALF_UP);
		}
		
		return rtn;
	}
	
	/**
	 * 表外费率
	 * @param s
	 */
	public BigDecimal calExportRate(String appAge,String newAppAge,String sex,String newAppSex,
			String pricingLiabCode,String riskVer,String rateType){
		String appAgeIn = null;
		String newAppAgeIn = null;
		String sexIn = null;
		String newAppSexIn = null;
		String pricingLiabCodeIn = null;
		String riskVerIn = null;
		BigDecimal ret = null;
		if(StringUtils.isNotEmpty(appAge) && PATTERN.matcher(appAge) != null){
    		Map<String,Serializable> valueMap1 = executeSpringEL(appAge); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				appAgeIn = entry.getValue().toString();
			}   		
    	}
		if(StringUtils.isNotEmpty(newAppAge) && PATTERN.matcher(newAppAge) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(newAppAge); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				if(entry.getValue()==null){
					break;
				}
				newAppAgeIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(sex) && PATTERN.matcher(sex) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(sex); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				sexIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(newAppSex) && PATTERN.matcher(newAppSex) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(newAppSex); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				if(entry.getValue()==null){
					break;
				}
				newAppSexIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(pricingLiabCode) && PATTERN.matcher(pricingLiabCode) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(pricingLiabCode); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				pricingLiabCodeIn = entry.getValue().toString();
			}   		
		}
		if(StringUtils.isNotEmpty(riskVer) && PATTERN.matcher(riskVer) != null){
			Map<String,Serializable> valueMap1 = executeSpringEL(riskVer); 
			for(Entry<String,Serializable> entry : valueMap1.entrySet())
			{
				riskVerIn = entry.getValue().toString();
			}   		
		}
		
		
		if(StringUtil.isEmpty(newAppSexIn)){
			newAppSexIn = sexIn;
		}
		if(StringUtil.isEmpty(newAppAgeIn)){
			newAppAgeIn = appAgeIn;
		}
		
		WebServiceCoreDaoImpl pfTestCalDAOImpl = SpringServiceFactory.getBean("factoryabclife_webServiceCoreDAO_dao");

		//处理参数
		Map<String, Object> argMap = new HashMap<String, Object>();
		argMap.put("pricingLiabCode", pricingLiabCodeIn);
		argMap.put("verNo", riskVerIn);
		argMap.put("rateType", rateType);
		PfDynamicBean paramBean = PfIndicatorContextHolder.get();  
		List<TDimensionDef> argListIn = pfTestCalDAOImpl.queryDemension(argMap.entrySet());
		//将维度入参
		Map<String,Object> paramMap = new HashMap<String,Object>();
		for(int i = 0; i < argListIn.size(); i++){
			TDimensionDef itemArg = argListIn.get(i);
			String returnType = itemArg.getReturnType();
			String propertyName = itemArg.getRefValue().substring(itemArg.getRefValue().lastIndexOf(".")+1).trim();
			
			if(paramBean.contains(propertyName)){
				if("1".equals(itemArg.getMatchFlag())){
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName+"$", bomValue);
				}else{
					Object bomValue = getBomValue(propertyName, returnType, paramBean);
					paramMap.put(propertyName, bomValue);
				}
			}else{	
				throw new EngineException("91101",new String[]{"公式函数缺少入参"}, null);
			}
			
		}
		//查询最大 次大 最小 次小数据
		WebServiceDaoImpl webServiceDaoImpl = SpringServiceFactory.getBean("factoryabclife_testDao_dao");				
		String tableName = "R_"+rateType+"_"+pricingLiabCodeIn+"_"+riskVerIn;
		SqlRowSet rowSetMax = webServiceDaoImpl.queryRateMax(tableName, paramMap.entrySet());
		SqlRowSet rowSetMin = webServiceDaoImpl.queryRateMin(tableName, paramMap.entrySet());
		List<String> ageList = new ArrayList<String>();
		List<BigDecimal> valList = new ArrayList<BigDecimal>();
		int i=0;
		while(rowSetMax.next()){
			if(i>1){
				break;
			}
			ageList.add(rowSetMax.getString("appAge"));
			valList.add(rowSetMax.getBigDecimal("val"));
			i++;
		}
		while(rowSetMin.next()){
			if(i>3){
				break;
			}
			ageList.add(rowSetMin.getString("appAge"));
			valList.add(rowSetMin.getBigDecimal("val"));
			i++;
		}
		int newAge = Integer.parseInt(newAppAgeIn);
		int maxAge = Integer.parseInt(ageList.get(0));
		int minAge = Integer.parseInt(ageList.get(2));
		//如果变更后年龄 将新年龄替换bean中的年龄进行正常查表算法
		//年龄大于费率表最大年龄  
		//年龄小于费率表最小年龄
		if(newAge<maxAge && newAge>minAge){
			paramBean.put("appAge",newAppAgeIn);
			paramBean.put("sex", newAppSexIn);
			ret = this.getObjRate(pricingLiabCode, riskVer, "${unit}", rateType);
		}else if(newAge>maxAge){
			BigDecimal a = valList.get(0).subtract(valList.get(1));
			ret = new BigDecimal(newAge-maxAge).multiply(a).add(valList.get(0));
		}else if(newAge<minAge){
			BigDecimal a = valList.get(2).subtract(valList.get(3));
			ret = new BigDecimal(minAge-newAge).multiply(a).add(valList.get(2));
		}
		
		return ret;
	}
	
}
