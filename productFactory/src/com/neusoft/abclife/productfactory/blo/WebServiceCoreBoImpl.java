/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.WebServiceCoreDaoImpl;
import com.neusoft.abclife.productfactory.entity.PfDynamicBean;
import com.neusoft.abclife.productfactory.entity.TFormulaDef;
import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjEntranceCombine;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRelation;
import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.abclife.util.PfIndicatorContextHolder;
import com.neusoft.fdframework.arithmetic.engine.job.commons.Util;
import com.neusoft.fdframework.arithmetic.engine.job.expressions.Context;
import com.neusoft.fdframework.arithmetic.engine.job.expressions.ExpressionInterpreter;
import com.neusoft.fdframework.arithmetic.engine.job.models.TypeConverter;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Service("factoryabclife_webServiceCoreBo_bo")
@ModelFile(value = "webServiceCoreBo.bo")
public class WebServiceCoreBoImpl {

//	private static final Pattern p = Pattern.compile("\\#\\{\\S+?\\}\\#"); 
	
	public WebServiceCoreBoImpl() {}
	
	private static final Logger Logger = LoggerFactory.getLogger(WebServiceCoreBoImpl.class);
	
	@Resource(name = "factoryabclife_webServiceCoreDAO_dao")
	private WebServiceCoreDaoImpl webServiceCoreDaoImpl;
	
	public WebServiceCoreDaoImpl getWebServiceCoreDaoImpl() {
		return webServiceCoreDaoImpl;
	}

	public void setWebServiceCoreDaoImpl(WebServiceCoreDaoImpl webServiceCoreDaoImpl) {
		this.webServiceCoreDaoImpl = webServiceCoreDaoImpl;
	}
	
	/**
	 * 相关性 关系运算符
	 * */
	private static Map<String, String> optMap = new HashMap<String, String>(){			
		 /**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		//(==, eq)，不等于 (!=, ne)，小于 (<, lt),，小于等于(<= , le)，大于(>, gt)，大于等于 (>=, ge)
		{
			put("gt", ">");
			put("lt", "<");
			put("eq", "==");
			put("le", "<=");
			put("ge", ">=");
		}
	};

	
	
	/**
	 * 执行计算接口  core接口
	 * @throws Exception 
	 * */
	public BigDecimal cal(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2,String subGetdutyCode, Map<String,Object> paramObj) throws Exception
	{		
		PfDynamicBean paramBean = new PfDynamicBean();
		paramBean.addProperties(paramObj);
//		invokeObj(paramBean, paramObj);
		//Bom有险种版本取Bom没有取参数中的
		if(paramBean.getBigDecimal("riskVer")==null){
			paramBean.put("riskVer",riskVer);
		}
		//Bom有已赔偿费用取Bom没有取0
		if(paramBean.getBigDecimal("soInMo")==null){
			paramBean.put("soInMo", BigDecimal.ZERO);
		}
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String d = sdf.format(date);
		paramBean.put("appYear", d);
			Logger.info(paramBean.toString());
		PfIndicatorContextHolder.set(paramBean);
		BigDecimal rtnB = null;
		//查询对象入口表	
		List<TObjEntrance> list = webServiceCoreDaoImpl
			.queryObjEntrance(riskCode, riskVer, pricingLiabCode, protecLiabCode, algoType, subType1, subType2,subGetdutyCode);
		for(int i = 0; i < list.size(); i++){
			//查询对象公式表
			List<TObjFormula> list2 = webServiceCoreDaoImpl.queryDutyGetFormula(list.get(i).getObjSeq());
			/**
			 * 将obj_id放入context 待确定...
			 * */		
			for(int j = 0; j < list2.size(); j++){
				//start-------------------------------------------------------------------------------------------------
				//查询当前年龄相关性对象信息 以下代码放入外层接口中
				TRelationDef tRelationDef = webServiceCoreDaoImpl.queryRelationDef2("insuredBirthDayRela");
				//根据当前年龄相关性对象ID和对象公式ID, 查询对象想关性配置的范围值
				TObjRelation relaDef = webServiceCoreDaoImpl.getTObjRelation(tRelationDef.getId(), list2.get(j).getObjSeq());
				//计算多少岁后的首个保单周年日需要参数
//				TRelationDef tRelation = webServiceCoreDaoImpl.queryRelationDef2("insuredBirthDayX");
//				TObjRelation rela = webServiceCoreDaoImpl.getTObjRelation(tRelation.getId(), list2.get(j).getObjSeq());
				BigDecimal insuredBirthDayRela=null;
				if(relaDef!=null){
					insuredBirthDayRela =  new BigDecimal(relaDef.getRelaDefValue()); //当前年龄
				}
				Object bdsxr = paramBean.getString("bdsxr"); //保单生效日
				Object birthday = paramBean.getString("birthday"); //出生日期
				if(bdsxr!=null){
					//获取参数，出生日期，保单生效日期，首个保单周年日年龄,insuredBirthDay
					String insuredBirthDay = getInsuredBirthDay(insuredBirthDayRela,bdsxr,birthday);
					paramBean.put("insuredBirthDay", insuredBirthDay);
				}
				Logger.info(paramBean.toString());
				//end---------------------------------------------------------------------------------------------------
				//公式是否存在相关性
				TObjFormula itemFormula = list2.get(j);
				//每次只能执行 一个公式,如果执行多个throw Exception
				if(itemFormula.getHasRelation().equals("1")){
					//由相关性匹配公式
					boolean rtnFlag = prepareCheckObjRelation(itemFormula, paramBean);
					if(rtnFlag){
						//返回true 公式匹配成功
						rtnB = (BigDecimal)prepareObjFormula(itemFormula, paramBean);
						break;
					}				
				}else{
					//执行公式
					rtnB = (BigDecimal)prepareObjFormula(itemFormula, paramBean);
					break;
				}				
			}
		}			
	    //System.out.println(rtnB);	
		Context.getInstance().clear();
		PfIndicatorContextHolder.clear();
		//如果没算出值返回0
		if(rtnB == null){
			rtnB = new BigDecimal(-1);
		}
		return rtnB;
	}
	
	

	
	//组合计算
	public BigDecimal calCombo(String comboCode, String comboVer, String comboInsurelemrelId,
			String algoType, String subType1, String subType2, Map<String,Object> paramObj) throws Exception
	{		
		PfDynamicBean paramBean = new PfDynamicBean();
		paramBean.addProperties(paramObj);
//		invokeObj(paramBean, paramObj);
		paramBean.put("comboVer",comboVer);
		Logger.info(paramBean.toString());
		PfIndicatorContextHolder.set(paramBean);
		BigDecimal rtnB = null;
		//查询对象入口表	
		TObjEntranceCombine entrance = webServiceCoreDaoImpl
			.queryObjEntranceCombine(comboCode, comboVer, comboInsurelemrelId, algoType, subType1, subType2);
		if(entrance != null){
		
			//查询对象公式表
			TObjFormula itemFormula = webServiceCoreDaoImpl.queryTObjFormula(entrance.getObjSeq());
			if(itemFormula != null){
				//执行公式
				rtnB = (BigDecimal)prepareObjFormula(itemFormula, paramBean);
			}	
		
		}					
	    //System.out.println(rtnB);	
		Context.getInstance().clear();
		PfIndicatorContextHolder.clear();
		//如果没算出值返回-1
		if(rtnB == null){
			rtnB = new BigDecimal(-1);
		}
		return rtnB;
	}
	
	/**
	 * 解析公式，拆分步骤
	 * 解析"#n{}n#", "#n{}n#"内部的表达式优先执行, 生成1个uuid的key和公式结果放入context中, 
	 * eg: #{function} ---> ${uuid} {key:uuid,value:return function()}
	 * */
	private static Map<Integer, Map<String, String>> splitExpression(String expression, int order, Map<Integer, Map<String, String>> map){
		String pattern = "\\#p\\{\\S+?\\}p\\#";
		pattern = pattern.replace("p", String.valueOf(order));
		Pattern p = Pattern.compile(pattern); 
		Matcher m = p.matcher(expression);
			//System.out.println("init: "+ order +" "+expression);
		boolean hasChange = false;
		while(m.find()){
			hasChange = true;
				//System.out.println("matcher: "+m.group()+", "+m.start()+", "+m.end());
			String matchExpression = m.group();
			String matchKeyValue = "abc"+Util.getUUID();	
			int start = m.start();
			int end = m.end();
//			expression = expression.replace(matchExpression, "${"+matchKeyValue+"}" );
			expression = expression.substring(0, start)+"${"+matchKeyValue+"}"+expression.substring(end);
				//System.out.println(expression);				
			Map<String, String> subMap = map.get(order);	
			if(subMap == null){				
				subMap = new HashMap<String, String>();
				map.put(order, subMap);
			}
			subMap.put(matchKeyValue, matchExpression.replace("#"+order+"{", "").replace("}"+order+"#", ""));	
			m = p.matcher(expression);
		}
		String expressionKeyValue = Util.getUUID();
		if(hasChange){
			Map<String, String> expressionMap = map.get(order+1);	
			if(expressionMap == null){				
				expressionMap = new HashMap<String, String>();
				map.put(order+1, expressionMap);
			}
			//如果表达式中存在#n{}n#,不放入expressionMap中
			String patternCheck = "\\#[0-9]\\{\\S+?\\}[0-9]\\#";
			Pattern pCheck = Pattern.compile(patternCheck);
			Matcher mCheck = pCheck.matcher(expression);			
			if(!mCheck.find()){				
				expressionMap.put(expressionKeyValue, expression);
			}		
				//System.out.println(order+" map: "+map);	
			splitExpression(expression, order+1, map);
			
		}else{
			Map<String, String> subMap = map.get(order);	
			if(subMap == null){				
				subMap = new HashMap<String, String>();
				map.put(order, subMap);
			}
			subMap.put(expressionKeyValue, expression);	
			
		}
		return map;
	}
	
	public static void main(String[] asdf){
		//执行公式2
//	    String formula_expression2 = "#amnt*#n";
//	    ExpressionParser parser = new SpelExpressionParser();
//		StandardEvaluationContext sc = new StandardEvaluationContext();	
//		sc.setVariable("amnt", 10000);
//		sc.setVariable("n", 3);
//		int result2 = parser.parseExpression(formula_expression2).getValue(sc, int.class);
//			System.out.println(result2);
			
		//执行公式22 
//		String uuid = Util.getUUID();
//		String formula_expression22 = "#abc"+uuid;
//	    ExpressionParser parser22 = new SpelExpressionParser();
//		StandardEvaluationContext sc22 = new StandardEvaluationContext();	
//		sc22.setVariable("abc"+uuid, 10000);
//		int result22 = parser22.parseExpression(formula_expression22).getValue(sc22, int.class);
//			System.out.println(result22);
		
		//执行公式3	
//		String formula_expression3 = "#amnt*#wd*#dq/1000";
//	    ExpressionParser parser = new SpelExpressionParser();
//		StandardEvaluationContext sc = new StandardEvaluationContext();	
//		sc.setVariable("amnt", 3000000);
//		sc.setVariable("wd", 8);
//		sc.setVariable("dq", 0.14);
//		int result3 = parser.parseExpression(formula_expression3).getValue(sc, int.class);
//			System.out.println(result3);	
			
		//执行公式4
//	    String formula_expression4 = "amnt*n";
//		ExpressionInterpreter interp = new ExpressionInterpreter();	
//	    interp.set("amnt", 3000);
//	    interp.set("n", 3);
//	    interp.set("defaultVal", 3);
//	    Object result4 = interp.exec(formula_expression4);
//	    System.out.println(result4);
//		result4 = setScale(result4, 2, "UP");	//改可配置
//	    result4 = TypeConverter.convert(result4, "number");
//			System.out.println(result4);
		
		//执行公式5
//		String formula_expression5 = "getFee('${feeType}','${unit}')*n";
//	    ExpressionInterpreter interp = new ExpressionInterpreter();	
//	    //paramBean放入context
//	    Set<Entry<String, Serializable>> set = paramBean.entrySet();
//	    for(Entry<String, Serializable> entry : set){	    	
//	    	interp.set(entry.getKey(), entry.getValue());
//	    }
//	    Object result5 = interp.exec(formula_expression5);
//	    result5 = setScale(result5, 2, "UP");	//改可配置	    
//	    result5 = TypeConverter.convert(result5, "number");
//			System.out.println(result5);
				
		//测试解析表达式
//		Map<Integer, Map<String, String>> formula_expression_map = new HashMap<Integer, Map<String, String>>();		
//		//String formula_expression6 = "getMax('#0{getFee('${feeType}','${unit}')}0#','${amnt}')";			
//		//String formula_expression6 = "getMax('#0{getFee('${feeType}','${unit}')}0#','#0{getFee('${feeType}','${aaaaa}')}0#')";		
//		String formula_expression6 = "getMax('#1{getMax('#0{getFee()}0#','#0{getRate()}0#')}1#','#1{getMax('#0{getFee()}0#','#0{getJOB()}0#')}1#')";		
//		//解析"#n{}n#", "#n{}n#"内部的表达式优先执行, 生成1个uuid的key放入context中, eg: #{function} ---> ${uuid} {key:uuid,value:function}
//		formula_expression_map = splitExpression(formula_expression6, 0, formula_expression_map);
//		System.out.println("final map: "+formula_expression_map);
			
		//执行公式6,分步执行一个公式
//		Map<Integer, Map<String, String>> formula_expression_map = new HashMap<Integer, Map<String, String>>();		
//		String formula_expression6 = "getMax('#0{getFee('${feeType}','${unit}')}0#','${amnt}')";	
//		//解析"#n{}n#", "#n{}n#"内部的表达式优先执行, 生成1个uuid的key放入context中, eg: #{function} ---> ${uuid} {key:uuid,value:function}
//		formula_expression_map = splitExpression(formula_expression6, 0, formula_expression_map);
//			System.out.println(formula_expression_map);	
		//公式解析对象
//		ExpressionInterpreter interp = new ExpressionInterpreter();
//	    //paramBean放入context
//	    Set<Entry<String, Serializable>> paramSet = paramBean.entrySet();
//	    for(Entry<String, Serializable> entry : paramSet){	    	
//	    	interp.set(entry.getKey(), entry.getValue());
//	    }
	    //分步执行公式
//	    Set<Entry<Integer, Map<String, String>>> expressSet = formula_expression_map.entrySet();
//	    int size = expressSet.size();
//	    for(Entry<Integer, Map<String, String>> entry : expressSet){	    	
//	    	int key = entry.getKey();
//	    	Map<String, String> valueMap = entry.getValue();
//	    	Set<Entry<String, String>> expressSetSub = valueMap.entrySet();
//    		for(Entry<String, String> entrySub : expressSetSub){
//    			String keySub = entrySub.getKey();
//    			String expression = entrySub.getValue();
//    			Object stepResult = interp.exec(expression);    			
//    			if(key != size - 1){
//    				//放入缓存
//    				stepResult = TypeConverter.convert(stepResult, "number");
//        			interp.set(keySub, stepResult);				
//    			}else{
//    				stepResult = setScale(stepResult, 2, "UP");	//改可配置
//    				stepResult = TypeConverter.convert(stepResult, "number");
//    				rtnB = (BigDecimal) stepResult;
//    				break;
//    			}
//    		}	
//	    }	
	}

	/**
	 * 执行公式
	 * */
//	private Object prepareObjFormula(TObjFormula itemFormula, Object paramObj) throws Exception {
	private Object prepareObjFormula(TObjFormula itemFormula, PfDynamicBean paramBean) throws Exception {	
		Object result = null;
		String formulaId = itemFormula.getFormulaId().toString();
		//由formulaId查询T_FORMULA_DEF获取公式
		TFormulaDef tFormulaDef = webServiceCoreDaoImpl.queryFormulaDef(formulaId);
		String formula_expression = tFormulaDef.getExpression();//公式表达式	
//		String formula_returnType = tFormulaDef.getReturnType();//公式返回值
		System.out.println("Log formula_expression..................................................: "+formula_expression);
		ExpressionInterpreter interp = new ExpressionInterpreter();	 
		//参数paramBean放入context
	    Set<Entry<String, Serializable>> paramSet = paramBean.entrySet();
	    for(Entry<String, Serializable> entry : paramSet){	    	
	    	interp.set(entry.getKey(), entry.getValue());
	    }
	    //查询公式默认值
		Map<String, Object> map_param = new HashMap<String, Object>();
		prepareObjParam(map_param, itemFormula, paramBean);
		Set<Entry<String, Object>> set = map_param.entrySet();
		for(Entry<String, Object> entry : set){
			interp.set(entry.getKey(), entry.getValue());			
		}
		//解析公式
		Map<Integer, Map<String, String>> formula_expression_map = new HashMap<Integer, Map<String, String>>();		
		formula_expression_map = splitExpression(formula_expression, 0, formula_expression_map);
			System.out.println(formula_expression_map);	
	    //分步执行公式
	    Set<Entry<Integer, Map<String, String>>> expressSet = formula_expression_map.entrySet();
	    int size = expressSet.size();
	    for(Entry<Integer, Map<String, String>> entry : expressSet){	    	
	    	int key = entry.getKey();
	    	Map<String, String> valueMap = entry.getValue();
	    	Set<Entry<String, String>> expressSetSub = valueMap.entrySet();
    		for(Entry<String, String> entrySub : expressSetSub){
    			String keySub = entrySub.getKey();
    			String expression = entrySub.getValue();
    			Object stepResult = interp.exec(expression);    			
    			if(key != size - 1){
    				//放入缓存
    				stepResult = TypeConverter.convert(stepResult, "number");
        			interp.set(keySub, stepResult);				
    			}else{
    				stepResult = setScale(stepResult, 2, "UP");	//改可配置
    				stepResult = TypeConverter.convert(stepResult, "number");
    				result = (BigDecimal) stepResult;
    				break;
    			}
    		}	
	    }	
	    return result; 
	}
	
	/**
	 * 处理函数参数
	 * @throws Exception 
	 * */
//	private void prepareObjParam(Map<String, Object> mapParam, TObjFormula tObjFormula, Object paramObj) throws Exception {
	private void prepareObjParam(Map<String, Object> mapParam, TObjFormula tObjFormula, PfDynamicBean paramBean) throws Exception {
	
		//由objSeq查询T_OBJ_PARAM
		String objSeq = tObjFormula.getObjSeq();//同对象标识		
		List<TObjParam> list_objParam = webServiceCoreDaoImpl.queryObjParamByObjSeq(objSeq);	
		//由formulaId查询T_FORMULA_PARAM_REF获取公式参数
		List<TFormulaParamRef> list_formulaParam = webServiceCoreDaoImpl.queryFormulaParamRef(tObjFormula.getFormulaId().toString());
		for(int i = 0; i < list_formulaParam.size(); i++){			
			TFormulaParamRef itemParamRef = list_formulaParam.get(i);
			String paramType = itemParamRef.getParamType();
			String returnType = itemParamRef.getReturnType();
			if(paramType.equals("1")){
				//默认值
				Object defaultValue = null;
				if(list_objParam.size() > 0){
					for(int j = 0; j < list_objParam.size(); j++){
						if(itemParamRef.getId().equals(list_objParam.get(j).getParamId())){
							if(returnType.equals("number")){
								//去掉了转换成Integer的步骤  update by shi
								defaultValue = new BigDecimal(list_objParam.get(j).getParamValue().toString());
							}else{
								defaultValue = (String) list_objParam.get(j).getParamValue();					
							}	
							mapParam.put(itemParamRef.getProperty(), defaultValue);
							break;
						}	
					}				
				}else{					
					throw new Exception();
				}
			}else if(paramType.equals("2")){
				//引用Bom的属性
				String refValue = itemParamRef.getRefValue();
				Object bomValue = getDynamicBeanValue(refValue, returnType, paramBean);
				mapParam.put(itemParamRef.getProperty(), bomValue);
			}else{
				//引用属性, 从map取值
				
			}
		}
	}

	/**
	 * 匹配公式的相关性
	 * */
//	public boolean prepareCheckObjRelation(TObjFormula tObjFormula, Object paramObj){	
	public boolean prepareCheckObjRelation(TObjFormula tObjFormula, PfDynamicBean paramBean){
		boolean rtnFlag = false;
		String objSeq = tObjFormula.getObjSeq();//同对象标识
		//由objSeq查询T_OBJ_RELATION	 list	 
		List<TObjRelation> list = webServiceCoreDaoImpl.queryObjRelationByObjSeq(objSeq);
		for(int i = 0; i < list.size(); i++){
			//校验每个对象相关性
			TObjRelation objRela = list.get(i);
			String relaDefId = objRela.getRelaDefId().toString();
			//由relaDefId查询T_RELATION_DEF 获取ref_value
			TRelationDef relaDef = webServiceCoreDaoImpl.queryRelationDef(relaDefId);
			if(relaDef.getRelationType().equals("2")){
				//引用bom属性
				String refValue = relaDef.getRefValue();
				String returnType = relaDef.getReturnType();
				//Object bomValue = getBomValue(refValue, returnType, paramBean);
				Object bomValue = getDynamicBeanValue(refValue, returnType, paramBean);
				//对象相关性运算符
				String relaDefOpt = optMap.get(objRela.getRelaDefOpt());
				//对象相关性值
				String relaDefValue = objRela.getRelaDefValue();
				if(objRela.getRelaDefType().equals("2")){
					TRelationDef relaDefrela = webServiceCoreDaoImpl.queryRelationDef(relaDefValue);
					if(relaDef.getRelationType().equals("2")){
						String relaDefrelaValue=relaDefrela.getRefValue();
						String relaDefrelaReturn = relaDefrela.getReturnType();
						relaDefValue = getDynamicBeanValue(relaDefrelaValue, relaDefrelaReturn, paramBean).toString();
					}
					
				}
				
				rtnFlag = excuteCheckObjRelation(bomValue, relaDefOpt, relaDefValue);
				if(!rtnFlag){		
					rtnFlag = false;
					break;
				}	
			}else{
				//引用属性, 从map中取值...	
				
				
				
			}
		}	
		return rtnFlag;
	}
	
	/**
	 * 执行相关性校验
	 * */
	private boolean excuteCheckObjRelation(Object bomValue, String relaDefOpt, String relaDefValue) {
		boolean rtnFlag = false;
		//生成一个关系运算表达式
		String relation_expression = bomValue+" "+relaDefOpt+" "+relaDefValue;
			//System.out.println("Log relation_expression..................................................: "+relation_expression);
		ExpressionParser parser = new SpelExpressionParser();
		StandardEvaluationContext sc = new StandardEvaluationContext();		
		rtnFlag = ((Boolean)parser.parseExpression(relation_expression).getValue(sc, boolean.class).booleanValue());	
			//System.out.println("Log rtnFlag.....................................................: "+rtnFlag);
		return rtnFlag;
	}

	/**
	 * 获取bom中的属性
	 * */
//	private Object getBomValue(String refValue, String returnType, Object paramObj) {
//		Object rtnBomValue = null;
//		String propertyName = refValue.substring(refValue.lastIndexOf(".")+1);
//		try {
//			Class<?> c = paramObj.getClass();	 
//			Field[] f_s = c.getDeclaredFields();
//			for(int i = 0; i < f_s.length; i++){
//				Field f = f_s[i];
//				String f_name = f.getName();
//				if(f_name.equals(propertyName)){
//					PropertyDescriptor pd = new PropertyDescriptor(f_name, c);
//					Method readM = pd.getReadMethod();
//					if(returnType.equals("number")){					
//						rtnBomValue = new BigDecimal(Integer.parseInt(readM.invoke(paramObj).toString()));
//					}else{
//						rtnBomValue = (String) readM.invoke(paramObj);					
//					}
//					break;
//				}
//			}	
//		} catch (Exception e) {
//			e.printStackTrace();
//		}		
//		return rtnBomValue;
//	}
	
	/**
	 * 获取PfDynamicBean中的属性
	 * */
	private Object getDynamicBeanValue(String refValue, String returnType, PfDynamicBean paramBean) {
		Object rtnBomValue = null;
		String propertyName = refValue.substring(refValue.lastIndexOf(".")+1);
		try {
			if(returnType.equals("number")){					
				rtnBomValue = paramBean.getBigDecimal(propertyName);
			}else if(returnType.equals("date")){
				rtnBomValue = paramBean.getDate(propertyName);
			}else{
				rtnBomValue = paramBean.getString(propertyName);				
			}
		} catch (Exception e) {
			Logger.info("获取DynamicBeanValue异常",e);
		}		
		return rtnBomValue;
	}
	
	/**
	 * 入参转PfDynamicBean
	 * */
	//改用map此方法不适用
	/*private void invokeObj(PfDynamicBean paramBean, Object paramObj) throws Exception {
		//由busi_type 获取paramObj的类
		//String path = paramObj.getClass().toString().substring(6);
		Class<?> c = paramObj.getClass();	 
		Field[] f_s = c.getDeclaredFields();
		for(int i = 0; i < f_s.length; i++){			
			Field f = f_s[i];
			String f_name = f.getName();
			if(!f_name.equals("serialVersionUID")){
				PropertyDescriptor pd = new PropertyDescriptor(f_name, c);
				Method readM = pd.getReadMethod();
				Serializable value =(Serializable)readM.invoke(paramObj);		
				paramBean.put(f_name, value);
			}		
		}
	}	
	*/
	/**
	 * 入参转PfDynamicBean.insuredBirthDay
	 * */
//	private void invokeKey(PfDynamicBean paramBean, Object paramObj) throws Exception {
//
//		Class<?> c = paramObj.getClass();
//		Field[] f_s = c.getDeclaredFields();
//		for(int i = 0; i < f_s.length; i++){			
//			Field f = f_s[i];
//			String f_name = f.getName();
//			if(f_name.equals("insuredBirthDay")){
//				PropertyDescriptor pd = new PropertyDescriptor(f_name, c);
//				Method readM = pd.getReadMethod();
//				Serializable value =(Serializable)readM.invoke(paramObj);		
//				paramBean.put(f_name, value);
//			}		
//		}
//	}
	
	/**
	 * 设置精度
	 * */
	private static Object setScale(Object value,Integer scale,String roundMode)
    {
    	Object ret=value;
    	if(value!=null&& (value instanceof BigDecimal))
    	{
    		BigDecimal number=(BigDecimal)value;
    		if(scale!=null)
    		{
    			if(roundMode==null)
    			{
    				roundMode="HALF_UP"; ;
    			}
    			if(roundMode.equals("UP"))
    			{
    				ret=number.setScale(scale, RoundingMode.UP);
    			}
    			else if(roundMode.equals("DOWN"))
    			{
    				ret=number.setScale(scale, RoundingMode.DOWN);
    			}
    			else if(roundMode.equals("CEILING"))
    			{
    				ret=number.setScale(scale, RoundingMode.CEILING);
    			}
    			else if(roundMode.equals("FLOOR"))
    			{
    				ret=number.setScale(scale, RoundingMode.FLOOR);
    			}
    			else if(roundMode.equals("HALF_UP"))
    			{
    				ret=number.setScale(scale, RoundingMode.HALF_UP);
    			}
    			else if(roundMode.equals("HALF_DOWN"))
    			{
    				ret=number.setScale(scale, RoundingMode.HALF_DOWN);
    			}
    			else if(roundMode.equals("HALF_EVEN"))
    			{
    				ret=number.setScale(scale, RoundingMode.HALF_EVEN);
    			}
    			else if(roundMode.equals("UNNECESSARY"))
    			{
    				ret=number.setScale(scale, RoundingMode.UNNECESSARY);
    			}
    		}
    	}
    	return ret;
    }
	
	/**
	 * 保存首个保单周年日
	 * @param birthday 
	 * @param bdsxr 
	 * @param paramObj 
	 * @throws ParseException 
	 * 
	 */
	@SuppressWarnings({ "static-access" })
	private String getInsuredBirthDay(BigDecimal slipEge, Object bdsxr, Object birthday) {
		
		Date insuredBirthDay=null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		
		Calendar cVali = GregorianCalendar.getInstance();
		try {
			cVali.setTime(sdf.parse((String) bdsxr));
		} catch (ParseException e) {
			Logger.info("时间转换错误",e);
		}
		//获取参数，出生日期，保单生效日期，首个保单周年日年龄,insuredBirthDay
		if(slipEge==null || birthday==null){
			cVali.add(cVali.YEAR, 1);
			insuredBirthDay = cVali.getTime();
		}else{
			Calendar birth = GregorianCalendar.getInstance();
			try {
				birth.setTime(sdf.parse((String) birthday));
			} catch (ParseException e) {
				Logger.info("时间转换错误",e);
			}
			Calendar birth2 = birth;
			
			birth2.add(birth.YEAR, slipEge.intValue());
			if(birth2.compareTo(cVali) <= 0){
				cVali.add(cVali.YEAR, 1);
				insuredBirthDay = cVali.getTime();
			}else{
				Calendar insured = GregorianCalendar.getInstance();
				String march = ""+(cVali.get(cVali.MARCH)+1);
				String date = ""+cVali.get(cVali.DAY_OF_MONTH);
				if(cVali.get(cVali.MARCH)<9){
					march="0"+(cVali.get(cVali.MARCH)+1);	
				}
				if(cVali.get(cVali.DAY_OF_MONTH)<10){
					date="0"+cVali.get(cVali.DAY_OF_MONTH);
				}
				try {
					insuredBirthDay = sdf.parse(birth2.get(birth2.YEAR)+""+march+date);
				} catch (ParseException e) {
					Logger.info("时间转换错误",e);
				}
				Calendar birth3 = birth;
				birth3.add(birth.YEAR, cVali.get(cVali.YEAR)-birth.get(birth.YEAR));
				if(birth3.compareTo(cVali) > 0){
					insured.setTime(insuredBirthDay);
					insured.add(insured.YEAR, 1);
					insuredBirthDay = insured.getTime();
				}
			}
		/*if(slipEge==null || birth2.compareTo(cVali)!=1){
			cVali.add(birth.YEAR, 1);
			insuredBirthDay = cVali.getTime();
		}else{
			Calendar insured = GregorianCalendar.getInstance();
			String march = "";
			String date = "";
			if(cVali.get(cVali.MARCH)<9){
				march="0"+(cVali.get(cVali.MARCH)+1);	
			}
			if(cVali.get(cVali.DAY_OF_MONTH)<10){
				date="0"+cVali.get(cVali.DAY_OF_MONTH);
			}
			insuredBirthDay = sdf.parse(birth2.get(birth2.YEAR)+""+march+date);
			Calendar birth3 = birth;
			birth3.add(birth.YEAR, cVali.get(cVali.YEAR)-birth.get(birth.YEAR));
			if(birth3.compareTo(cVali)==1){
				insured.setTime(insuredBirthDay);
				insured.add(insured.YEAR, 1);
				insuredBirthDay = insured.getTime();
			}*/
		}
//		System.out.println(sdf.format(insuredBirthDay));
		return sdf.format(insuredBirthDay);
	}
	
}
