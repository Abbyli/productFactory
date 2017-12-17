/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.TClaimGivepayDef;
import com.neusoft.abclife.productfactory.entity.TComboInf;
import com.neusoft.abclife.productfactory.entity.TComboInsurtypeElemRel;
import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.abclife.productfactory.entity.TFeeRate;
import com.neusoft.abclife.productfactory.entity.TFormulaDef;
import com.neusoft.abclife.productfactory.entity.TFormulaParamRef;
import com.neusoft.abclife.productfactory.entity.TFunctionArgRef;
import com.neusoft.abclife.productfactory.entity.TFunctionDef;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TObjEntrance;
import com.neusoft.abclife.productfactory.entity.TObjEntranceCombine;
import com.neusoft.abclife.productfactory.entity.TObjFormula;
import com.neusoft.abclife.productfactory.entity.TObjParam;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjRateDimenRef;
import com.neusoft.abclife.productfactory.entity.TObjRelation;
import com.neusoft.abclife.productfactory.entity.TObjSkelement;
import com.neusoft.abclife.productfactory.entity.TOccRate;
import com.neusoft.abclife.productfactory.entity.TPricingLiabDef;
import com.neusoft.abclife.productfactory.entity.TProtecLiabDef;
import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.abclife.util.StringUtil;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.jdbc.CustomerDataSourceDaoTemplates;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author think
 *
 */
@Component("factoryabclife_webServiceCoreDAO_dao")
@ModelFile(value = "webServiceCoreDAO.dao")
public class WebServiceCoreDaoImpl extends BaseDao {
	//extends BaseDao {
	
	protected String getTemplateName() {
		return "dataSource";
	}

	public WebServiceCoreDaoImpl() {}
	
	
	public List<TObjEntrance> queryObjEntrance(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2,String subGetdutyCode) {
		//参数不为空拼接进sql		
//		String sql = "select * from T_OBJ_ENTRANCE t where t.RISK_CODE = ? and t.RISK_VER = ? " +
//				"and t.PROTEC_LIAB_CODE = ? and t.ALGO_TYPE = ? and t.SUB_TYPE1 = ? and t.SUB_TYPE2 = ?";
		String sql = getEntranceQuerySQL(riskCode,riskVer,pricingLiabCode,protecLiabCode,algoType,subType1,subType2,subGetdutyCode);
		Object[] obj = getEntranceQuerySQLAttr(riskCode,riskVer,pricingLiabCode,protecLiabCode,algoType,subType1,subType2,subGetdutyCode);
		//List<TObjEntrance> list = customerDataSourceDaoTemplates.queryForList(TObjEntrance.class, sql, obj);
		List<TObjEntrance> list = this.queryForList(TObjEntrance.class, sql, obj);
		return list;
	}
	
	private String getEntranceQuerySQL(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2,String subGetdutyCode){
		String sql = "select * from T_OBJ_ENTRANCE t where 1=1";
		if(StringUtil.isNotEmpty(riskCode)){
			sql += " and t.RISK_CODE = ?";						
		}
		if(StringUtil.isNotEmpty(riskVer)){
			sql += " and t.RISK_VER = ?";		
		}
		if(StringUtil.isNotEmpty(pricingLiabCode)){			
			sql += " and t.PRICING_LIAB_CODE = ?";		
		}
		if(StringUtil.isNotEmpty(protecLiabCode)){			
			sql += " and t.PROTEC_LIAB_CODE = ?";		
		}
		if(StringUtil.isNotEmpty(algoType)){
			sql += " and t.ALGO_TYPE = ?";		
		}
		if(StringUtil.isNotEmpty(subType1)){
			sql += " and t.SUB_TYPE1 = ?";		
		}
		if(StringUtil.isNotEmpty(subType2)){
			sql += " and t.SUB_TYPE2 = ?";		
		}
		if(StringUtil.isNotEmpty(subGetdutyCode)){
			sql += " and t.sub_getduty_code = ? ";
		}
		return sql;
	}
	
	private Object[] getEntranceQuerySQLAttr(String riskCode, String riskVer, String pricingLiabCode, String protecLiabCode, 
			String algoType, String subType1, String subType2,String subGetdutyCode){
		List<String> list = new ArrayList<String>();
		if(StringUtil.isNotEmpty(riskCode)){
			list.add(riskCode);						
		}
		if(StringUtil.isNotEmpty(riskVer)){
			list.add(riskVer);			
		}
		if(StringUtil.isNotEmpty(pricingLiabCode)){			
			list.add(pricingLiabCode);			
		}
		if(StringUtil.isNotEmpty(protecLiabCode)){			
			list.add(protecLiabCode);			
		}
		if(StringUtil.isNotEmpty(algoType)){
			list.add(algoType);			
		}
		if(StringUtil.isNotEmpty(subType1)){
			list.add(subType1);			
		}
		if(StringUtil.isNotEmpty(subType2)){
			list.add(subType2);			
		}	
		if(StringUtil.isNotEmpty(subGetdutyCode)){
			list.add(subGetdutyCode);			
		}
		Object[] obj = list.toArray();
		return obj;
	}
	
	/**
	 * 查询公式 
	 * */
//	public List<TObjFormula> queryDutyGetFormula(String claimGivepayId, String type) {
	public List<TObjFormula> queryDutyGetFormula(String objSeq) {
//		String sql = "select * from T_OBJ_FORMULA f where f.TYPE = ? and f.OBJ_ID = ?";	
		String sql = "select * from T_OBJ_FORMULA f where f.OBJ_SEQ = ? ";	
//		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql, new Object[]{type, claimGivepayId});
		//List<TObjFormula> list = this.queryForList(TObjFormula.class, sql, new Object[]{objSeq});
		List<TObjFormula> list = this.queryForList(TObjFormula.class, sql, new Object[]{objSeq});
		return list;
	}

	/**
	 * 由objSeq查询T_OBJ_RELATION
	 * */
//	public List<TObjRelation> queryObjRelationByObjSeq(String objSeq, String type) {
	public List<TObjRelation> queryObjRelationByObjSeq(String objSeq) { //(type = 1生存给付, type = 2理赔给付)
		//首个保单周年日年龄相关性（不进行算法匹配）30为该相关性
		String sql = "select * from T_OBJ_RELATION r where r.OBJ_SEQ = ? and rela_def_id not in '30'";
		//List<TObjRelation> list = this.queryForList(TObjRelation.class, sql, new Object[]{ objSeq});	
		List<TObjRelation> list = this.queryForList(TObjRelation.class, sql, new Object[]{ objSeq});	
		
		return list;
	}
	
	/**
	 * 由relaDefId查询T_RELATION_DEF 获取ref_value
	 * */
	public TRelationDef queryRelationDef(String relaDefId) {
		String sql = "select * from T_RELATION_DEF r where r.ID = ?";
		TRelationDef relaDef = this.queryForObject(TRelationDef.class, sql, new Object[]{relaDefId});
		return relaDef;
	}
	
	/**
	 * 由property查询T_RELATION_DEF 获取ref_value
	 * */
	public TRelationDef queryRelationDef2(String property) {
		String sql = "select * from T_RELATION_DEF r where r.property = ?";
		TRelationDef relaDef = this.queryForObject(TRelationDef.class, sql, new Object[]{property});
		return relaDef;
	}
	
	
	/**
	 * 由formulaId查询T_FORMULA_DEF获取公式
	 * */
	public TFormulaDef queryFormulaDef(String formulaId) {
		String sql = "select * from T_FORMULA_DEF r where r.ID = ?";
		TFormulaDef formulaDef = this.queryForObject(TFormulaDef.class, sql, new Object[]{formulaId});
		return formulaDef;
	}
	
	/**
	 * 由formulaId查询T_FORMULA_PARAM_REF获取公式参数
	 * */
	public List<TFormulaParamRef> queryFormulaParamRef(String formulaId) {
		String sql = "select * from T_FORMULA_PARAM_REF r where r.FORMULA_ID = ?";
		List<TFormulaParamRef> list = this.queryForList(TFormulaParamRef.class, sql, new Object[]{formulaId});
		return list;
	}
	
	/**
	 * 由objSeq查询T_OBJ_PARAM
	 * */
//	public List<TObjParam> queryObjParamByObjSeq(String objSeq, String type) {
	public List<TObjParam> queryObjParamByObjSeq(String objSeq) {
		String sql = "select * from T_OBJ_PARAM r where  r.OBJ_SEQ = ?";
		List<TObjParam> list = this.queryForList(TObjParam.class, sql, new Object[]{objSeq});
		return list;
	}
	
	/**
	 * 查询函数
	 * */
	public TFunctionDef queryTFunctionDef(String name) {
		String sql = "select * from T_FUNCTION_DEF d where  d.FUNC_PROPERTY = ?";
		TFunctionDef tFunctionDef = this.queryForObject(TFunctionDef.class, sql, new Object[]{name});
		return tFunctionDef;
	}
	
	/**
	 * 查询函数参数
	 * */
	public List<TFunctionArgRef> queryTFunctionDefArg(String funcId, String flag) {
		String sql = "select * from T_FUNCTION_ARG_REF r where r.FUNC_ID = ? and r.FLAG = ? order by r.ORDER_NUM asc";
		List<TFunctionArgRef> list = this.queryForList(TFunctionArgRef.class, sql, new Object[]{funcId, flag});
		return list;
	}
	
	/**
	 * 查询费用定义
	 * @param set 
	 * */
	public BigDecimal queryFee(Set<Entry<String, Object>> set,Map<String, Object> argMap) {
		//T_FEE_RATE
		BigDecimal rtnB = null;
		String sql = getFeeQuerySQL(set);
		Object[] obj = getFeeQuerySQLAttr(set);
		List<TFeeRate> tFeeRate = this.queryForList(TFeeRate.class, sql, obj);
		int i = 0;
		Long insuYear = null;
		BigDecimal amount = null;
		if(argMap.get("insuYear") != null){
			insuYear = Long.valueOf(argMap.get("insuYear").toString());
		}
		if(argMap.get("amount") != null){
			amount = new BigDecimal(argMap.get("amount").toString());
		}
		for(;i<tFeeRate.size();i++){
			TFeeRate rate = tFeeRate.get(i);
			Boolean flag = true;
			if(insuYear == null && amount == null){
				break;
			}
			if(insuYear != null){
				if(insuYear >= rate.getBeginYear() && insuYear <= rate.getEndYear()){
				}else{
					flag = false;
				}
			}
			
			if(amount != null){
				int a = amount.compareTo(rate.getMinAmount())-amount.compareTo(rate.getMaxAmount());
				if(a==-2 || a == 0){
					flag = false;
				}
			}
			if(flag){
				break;
			}
			
		}
		if(tFeeRate != null && i < tFeeRate.size()){			
			rtnB = new BigDecimal(tFeeRate.get(i).getRate().toString());
		}
		return rtnB;
	}
	
	
	private String getFeeQuerySQL(Set<Entry<String, Object>> set) {
		String sql = "select * from T_FEE_RATE r where 1=1";
		for(Map.Entry<String, Object> entry: set){
			String key = entry.getKey();
			Object value = entry.getValue();
			if(value != null && !(key.equals("insuYear")||key.equals("amount"))){
				sql += " and r."+modelName2dbNAME(key).toUpperCase(Locale.US)+" = ?";
			}
		}
		return sql;
	}
	/**
	 * 查询费率
	 * @param set
	 * @param paramMap
	 * @return
	 */
	public BigDecimal queryRate(Set<Entry<String, Object>> set,Map<String,Object> paramMap){
		BigDecimal rtnB = null;
		TObjRate tObjRate = getRateTable(set);
		List<TObjRateDimenRef> list = getDimen(tObjRate);
		Map<String,Object> newMap = new HashMap<String,Object>();
		
		Iterator it = paramMap.entrySet().iterator();
		while(it.hasNext()){
			Entry entry = (Entry)it.next();
			if(((String) entry.getKey()).indexOf("$")>0){
				return this.queryRateRange(tObjRate,paramMap);
			}
		}
		
		for(TObjRateDimenRef t:list){
			Object value = paramMap.get(t.getDimensionProperty());
			newMap.put(t.getDimensionProperty(), value);
		}
		String sql = getRateSQL(tObjRate.getTableName(),newMap.entrySet());
		Object[] obj = getRateQuerySQLAttr(newMap.entrySet());
		SqlRowSet srs = this.queryForRowSet(sql, obj);
		if(srs.next()){
			rtnB=srs.getBigDecimal("val");
		}
		return rtnB;
	}
	
	/**
	 * 查询费率带范围的
	 * @param tObjRate 
	 * @param paramMap 
	 * @param set
	 * @param paramMap
	 * @return 
	 * @return
	 */
	private BigDecimal queryRateRange(TObjRate tObjRate, Map<String, Object> paramMap) {
		BigDecimal rtnB = null;
		List<TObjRateDimenRef> list = getDimen(tObjRate);
		Map<String,Object> newMap = new HashMap<String,Object>();
		List<String> precisionList = new ArrayList<String>();//精度
		List<String> rangeList = new ArrayList<String>();//范围
		Map<String,Object> rangeMap = new HashMap<String,Object>();//范围匹配值
		
		Iterator it = paramMap.entrySet().iterator();
		while(it.hasNext()){
			Entry entry = (Entry)it.next();
			if(((String) entry.getKey()).indexOf("$")>0){
				rangeList.add(((String) entry.getKey()).replace("$", ""));
				rangeMap.put(((String) entry.getKey()).replace("$", ""),entry.getValue());
			}else{
				precisionList.add((String) entry.getKey());
			}
		}
		
		for(int i=0;i<precisionList.size();i++){
			for(TObjRateDimenRef t:list){
				if(precisionList.get(i).equals(t.getDimensionProperty()) ){
					newMap.put(t.getDimensionProperty(), paramMap.get(t.getDimensionProperty()));
				}
			}
		}
		String sql = getRateSQL(tObjRate.getTableName(),newMap.entrySet());
		Object[] obj = getRateQuerySQLAttr(newMap.entrySet());
		SqlRowSet srs = this.queryForRowSet(sql, obj);
		
		while(srs.next()){
			
			for(int i=0;i<rangeList.size();i++){
				boolean cirProc = circularProcess((String) srs.getObject(rangeList.get(i)),Integer.parseInt(rangeMap.get(rangeList.get(i)).toString()));
				if(!cirProc){
					break;
				}
				if(cirProc && i == rangeList.size()-1){
					return srs.getBigDecimal("val");
				}
			}
		}
		return rtnB;
	}
	
	
	/**
	 * 循环比较范围值
	 * @param rangeK
	 * @param rangeV
	 * @return
	 */
	private boolean circularProcess(String rangeK, int rangeV){
		boolean ret = false;
		boolean start = false ;
		boolean end = false ;
		String[] range = rangeK.split(",");
		for(int i=0;i<range.length;i++){
			String indexOf = range[i].replace("[", "").toString();
			if(range[i].indexOf("[")!=-1){
				start = rangeV >= Integer.parseInt(range[i].replace("[", ""));
			}else if(range[i].indexOf("(")!=-1){
				start = rangeV > Integer.parseInt(range[i].replace("(", ""));
			}else if(range[i].indexOf("]")!=-1){
				end = rangeV <= Integer.parseInt(range[i].replace("]", ""));
			}else if(range[i].indexOf(")")!=-1){
				end = rangeV < Integer.parseInt(range[i].replace(")", ""));
			}
		}
		if(start && end){
			ret=true;
		}
		return ret;
	}
	
	/*private BigDecimal circularProcess(SqlRowSet srs, String rangeK, int rangeV){
		BigDecimal rtnB = null;
		while(srs.next()){
			String[] range = ((String) srs.getObject(rangeK)).split(",");
			boolean start = false ;
			boolean end = false ;
			for(int i=0;i<range.length;i++){
				String indexOf = range[i].replace("[", "").toString();
				if(range[i].indexOf("[")!=-1){
					start = rangeV >= Integer.parseInt(range[i].replace("[", ""));
				}else if(range[i].indexOf("(")!=-1){
					start = rangeV > Integer.parseInt(range[i].replace("(", ""));
				}else if(range[i].indexOf("]")!=-1){
					end = rangeV <= Integer.parseInt(range[i].replace("]", ""));
				}else if(range[i].indexOf(")")!=-1){
					end = rangeV < Integer.parseInt(range[i].replace(")", ""));
				}
			}
			if(start && end){
				rtnB=srs.getBigDecimal("val");
			}
		}
		return rtnB;
		
		//上个方法备份
		 java.util.Iterator rangeIt = rangeMap.entrySet().iterator();
		while(rangeIt.hasNext()){
			
			//SqlRowSet sqlRowSet = new SqlRowSet(srs);
			int hashCode = rangeIt.hashCode();
			java.util.Map.Entry entry = (java.util.Map.Entry)rangeIt.next();
			String rangeK =(String) entry.getKey();
			int rangeV =Integer.parseInt(rangeMap.get(rangeK).toString());
			
			BigDecimal getsrs = this.circularProcess(srs,rangeK,rangeV);
			if(getsrs!=null){
				rtnB = getsrs;
			}else{
				return rtnB;
			}
		}
	}*/
	
	
	
	/**
	 * 获取查询费率SQL
	 * @param tableName
	 * @param set
	 * @return
	 */
	private String getRateSQL(String tableName,Set<Entry<String, Object>> set){
		String sql = "select * from "+tableName+" r where 1=1";
		for(Map.Entry<String, Object> entry: set){
			String key = entry.getKey();
			Object value = entry.getValue();
			if(value != null){
				sql += " and r."+key+" = ?";
			}
			
		}
		return sql;
	}
	/**
	 * 获取费率表信息
	 * @param set
	 * @return
	 */
	private TObjRate getRateTable(Set<Entry<String, Object>> set){
		TObjRate  tor= null;
		String sql = getRateTableQuerySQl(set);
		Object[] obj = getRateQuerySQLAttr(set);
		TObjRate tObjRate = this.queryForObject(TObjRate.class,sql, obj);
		if(tObjRate != null){			
			tor = tObjRate;
		}
		return tor;
	}
	/**
	 * 获得维度信息
	 * @param tObjRate
	 * @return
	 */
	private List<TObjRateDimenRef> getDimen(TObjRate tObjRate){
		String sql = "select * from T_OBJ_RATE_DIMEN_REF where obj_rate_id=? ";
		return this.queryForList(TObjRateDimenRef.class, sql, tObjRate.getId());
	}
	/**
	 * 查询相关维度信息
	 * @param set 
	 * @return
	 */
	public List<TDimensionDef> queryDemension(Set<Entry<String, Object>> set){
		List<TDimensionDef> list = new ArrayList<TDimensionDef>();
		TObjRate tObjRate = getRateTable(set);
		if(null != tObjRate){
			List<TObjRateDimenRef> tords = getDimen(tObjRate);
			String sql  = "select * from t_dimension_def where 1=0 ";
			
			for(TObjRateDimenRef t :tords){
				sql +=" or id="+t.getDimensionId();
			}
			list = this.queryForList(TDimensionDef.class, sql);
		}
		
		return list;
		
	}
	
	/**
	 * 获取费率表查询SQL
	 * @param set
	 * @return
	 */
	private String getRateTableQuerySQl(Set<Entry<String, Object>> set){
		String sql = "select * from t_obj_rate r where 1=1 ";
		for(Map.Entry<String, Object> entry: set){
			String key = entry.getKey();
			Object value = entry.getValue();
			if(value != null){
				sql += " and r."+modelName2dbNAME(key).toUpperCase(Locale.US)+" = ?";
			}
		}
		return sql;
	}
	
	private Object[] getRateQuerySQLAttr(Set<Entry<String, Object>> set) {
		List<Object> list = new ArrayList<Object>();
		for(Map.Entry<String, Object> entry: set){
			Object value = entry.getValue();
				list.add(value);
		}	
		return list.toArray();
	}
	
	
	
	private Object[] getFeeQuerySQLAttr(Set<Entry<String, Object>> set) {
		List<Object> list = new ArrayList<Object>();
		for(Map.Entry<String, Object> entry: set){
			Object value = entry.getValue();
			String key = entry.getKey();
			if(value != null && !(key.equals("insuYear")||key.equals("amount"))){
				list.add(value);
			}
		}	
		return list.toArray();
	}
	 	
	private static String modelName2dbNAME(String modelName){	
		String PATTERN_STR = "[A-Z]";
		Pattern p = Pattern.compile(PATTERN_STR);
		Matcher m = p.matcher(modelName);
		if(m.find()){
			//System.out.println("modelName: "+m.group()+", "+m.start());
			String group = m.group();
			int start = m.start();
			int end = m.end();		
			modelName = modelName.substring(0, start)+"_"+group.toLowerCase(Locale.US)+modelName.substring(end);		
			modelName = modelName2dbNAME(modelName);
		}		
		return modelName;
	}
	
	public TOccRate getOccRate(String payIntv,String job){
		String sql="select * from t_occ_rate t where t.payintv=? and t.occupationtype=? ";
		return  this.queryForObject(TOccRate.class, sql, new Object[]{payIntv,job});
	}
	//查询险种信息
	public TInsurtypeBasicInf getTInsurtypeBasicInf(Long insurtypeId){
		String sql="select * from t_insurtype_basic_inf where insurtype_id=? ";
		TInsurtypeBasicInf insurtypeBasicInf 
			= this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{insurtypeId});
		return insurtypeBasicInf;
	}
	//查询对象相关性
	public TObjRelation getTObjRelation(Long relaId,String objSeq){
		String sql = "select * from t_obj_relation r where r.obj_seq=? and r.rela_def_id=? ";
		return this.queryForObject(TObjRelation.class, sql, new Object[]{objSeq,relaId});
	}
	
	public TPricingLiabDef getTPricingLiabDef(Long insurId,String pricingLiabCode){
		String sql = "select * from t_pricing_liab_def where insurtype_id=? and pricing_liab_code=? ";
		return this.queryForObject(TPricingLiabDef.class, sql, new Object[]{insurId,pricingLiabCode});
	}
	
	public TInsurtypeBasicInf getTInsurtypeBasicInf(String Code,String verNo){
		String sql = "select * from t_insurtype_basic_inf where insurtype_code= ? and ver_no= ? ";
		return this.queryForObject(TInsurtypeBasicInf.class, sql, new Object[]{Code,verNo});
	}
	
	public TObjEntranceCombine queryObjEntranceCombine(String comboCode, String comboVer, String comboInsurelemrelId,
			String algoType, String subType1, String subType2){
		String sql = "select * from t_obj_entrance_combine where 1=1";
		List<String> list = new ArrayList<String>();
		if(StringUtil.isNotEmpty(comboCode)){
			sql += " and combine_code = ? ";
			list.add(comboCode);
		}
		if(StringUtil.isNotEmpty(comboVer)){
			sql += " and combine_ver = ? ";
			list.add(comboVer);
		}
		if(StringUtil.isNotEmpty(comboInsurelemrelId)){
			sql += " and combine_elem_id = ? ";
			list.add(comboInsurelemrelId);
		}
		if(StringUtil.isNotEmpty(algoType)){
			sql += " and algo_type = ? ";
			list.add(algoType);
		}
		if(StringUtil.isNotEmpty(subType1)){
			sql += " and sub_type1 = ? ";
			list.add(subType1);
		}
		if(StringUtil.isNotEmpty(subType2)){
			sql += " and sub_type2 = ? ";
			list.add(subType2);
		}
		return this.queryForObject(TObjEntranceCombine.class, sql, list.toArray());
	}
	
	public TObjFormula queryTObjFormula(String objSeq){
		String sql = "select * from t_obj_formula where obj_seq = ? ";
		return this.queryForObject(TObjFormula.class, sql, new Object[]{objSeq});
	}
	
	public List<TComboInsurtypeElemRel> getTComboInsurtype(String comboId){
		String sql = "select * from t_combo_insurtype_elem_rel where combo_id = ? ";
		return this.queryForList(TComboInsurtypeElemRel.class, sql, new Object[]{comboId});
	}
	
	public TComboInsurtypeElemRel queryAnotherOneElem(String comboId,String pricingCode,String elemName){
		String sql = "select * from t_combo_insurtype_elem_rel where combo_id = ? and pricing_code=? and elem_name=? ";
		return this.queryForObject(TComboInsurtypeElemRel.class, sql,new Object[]{comboId,pricingCode,elemName});
	}
	
	public TComboInf queryComboInfById(String comboId){
		String sql = "select * from t_combo_inf where combo_id = ? ";
		return this.queryForObject(TComboInf.class, sql, new Object[]{comboId});
	}
	
	public TObjSkelement queryTObjSkelement(Long id){
		String sql = "select * from t_obj_skelement where id = ?";
		return this.queryForObject(TObjSkelement.class, sql, new Object[]{id});
	}
	
	public List<TPricingLiabDef> queryTPricingLiabDef(Long insurtypeId){
		String sql = "select * from t_pricing_liab_def where insurtype_id=? ";
		return this.queryForList(TPricingLiabDef.class, sql, new Object[]{insurtypeId});
	}
	
	public List<TObjRate> queryObjRate(String pricingliabCode,String verNo){
		String sql = "select * from t_obj_rate where rate_type like 'RT%' and pricing_liab_code=?  and ver_no=? ";
		return this.queryForList(TObjRate.class, sql, new Object[]{pricingliabCode,verNo});
	}
}
