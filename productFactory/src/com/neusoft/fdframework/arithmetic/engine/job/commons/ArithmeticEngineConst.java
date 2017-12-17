package com.neusoft.fdframework.arithmetic.engine.job.commons;

import java.math.BigDecimal;


/**
 * 
 * <p>Title: 金融软件开发平台</p>.
 * <p>Description:算法引擎常量类</p>
 * <p>Copyright: Copyright (c) 2014</p>
 * @author 张阳
 * 2015年1月6日
 */
public class ArithmeticEngineConst {
    public static final String QUERY_COLUMN="colName";
    public static final String QUERY_CONDITION="condition";
    public static final String QUERY_VALUE="value";
    
    
    public static final String BUSI_TYPE_IF="1";//业务类型：IF
    public static final String BUSI_TYPE_TRUE="2";//业务类型：TRUE
    public static final String BUSI_TYPE_FALSE="3";//业务类型：FALSE
    public static final String BUSI_TYPE_STEP="4";//业务类型：STEP
    public static final String BUSI_TYPE_LOADPARAMETER="5";//业务类型：LOADPARAMETER
    public static final String BUSI_TYPE_LOADINDICATOR="6";//业务类型：LOADINDICATOR
    
    public static final int SUB_TYPE_FORMULA=41;//业务子类型：公式
    public static final int SUB_TYPE_RULE=42;//业务子类型：规则
    public static final int SUB_TYPE_SETVALUE=43;//业务子类型：赋值
    public static final int SUB_TYPE_PRIVATE_FORMULA=44;//私有公式调用
    public static final int SUB_TYPE_LOADPARAMETER_JAVA=51;
    public static final int SUB_TYPE_LOADPARAMETER_SQL=52;
    
    public static final String PARAM_REF_TYPE_FORMULA="1";//公式参数
    public static final String PARAM_REF_TYPE_RULE="2";//规则参数
    public static final String PARAM_REF_TYPE_PARAMETER="3";//参数的参数
    public static final String PARAM_REF_TYPE_LOADPARAMETER="4";//LOADPARAMETER的参数
    public static final String PARAM_REF_TYPE_INDICATOR="5";//指标的参数
    public static final String PARAM_REF_TYPE_STEP="6";//Step的参数
    
    public static final int PARAM_TYPE_GENERAL=1;//输入
    public static final int PARAM_TYPE_SQL=2;//SQL
    public static final int PARAM_TYPE_JAVA=3;//JAVA类
    
    public static final String KIND_TYPE_PARAM="1";//类别类型 1:参数类别
    public static final String KIND_TYPE_FORMALA="2";//类别类型 2:公式类别
    public static final String KIND_TYPE_RULE="3";//类别类型 3:规则类别
    public static final String KIND_TYPE_INDICATOR="4";//类别类型 4:指标类别
    public static final String KIND_TYPE_RATE="5";//类别类型 5:费率类别
    
    public static final String VERSION_TYPE_FORMALA="1";//版本分类：1.公式版本 2.规则版本
    public static final String VERSION_TYPE_RULE="2";//类别类型 3:规则类别
    
    public static final String REQUIRED_TRUE="true";//true：true
    public static final String REQUIRED_FALSE="false";//false:false
    
    public static final String PARAM_RETURN_TYPE_STRING="string";// STRING：日期型,
    public static final String PARAM_RETURN_TYPE_DATE="date";//字符串型,DATE
    public static final String PARAM_RETURN_TYPE_NUMBER="number";//NUMBER:数字型
    public static final String PARAM_RETURN_TYPE_BOM="bom";//NUMBER:数字型
    
    
    public static final int RUN_TYPE_FORMALA=1;//FORMALA
    public static final int RUN_TYPE_RULE=2;//RULE
    
    public static final String RECORD_LEVAL_ALL="1";//记录等级 1:全部,2:出错是记录,3:不记录
    public static final String RECORD_LEVAL_ONERROR="2";//记录等级 1:全部,2:出错是记录,3:不记录
    public static final String RECORD_LEVAL_NONE="3";//记录等级 1:全部,2:出错是记录,3:不记录
    
    
    
    public static final String MULTI_DIMENSIONAL_INDICATOR_ID="id";
    public static final String MULTI_DIMENSIONAL_INDICATOR_VALUE="value";
    public static final String MULTI_DIMENSIONAL_INDICATOR_MONTH="month";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION1="dimension1";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION2="dimension2";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION3="dimension3";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION4="dimension4";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION5="dimension5";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION6="dimension6";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION7="dimension7";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION8="dimension8";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION9="dimension9";
    public static final String MULTI_DIMENSIONAL_INDICATOR_DIMENSION10="dimension10";
    
    
    public static final BigDecimal PRE_JOB_TYPE_INIT=BigDecimal.ONE;//1.数据初始化
    public static final BigDecimal PRE_JOB_TYPE_DESTORY=new BigDecimal("2");//2.数据销毁
    
    public static final BigDecimal PRE_JOB_RUNMODE_TIMER=BigDecimal.ONE;//1.定时运行
    public static final BigDecimal PRE_JOB_RUNMODE_RANDOM=new BigDecimal("2");//2.随机运行
    
    public static final String RULE_INDICATOR_RECALULATE="com.neusoft.fdframework.arithmetic.engine.indicator.IndicatorStatus.reCalulate";//指标重算
    
    public static final String INDICATOR_OPERATE_FORMULA="1";//1.公式
    public static final String INDICATOR_OPERATE_RULE="2";//2.规则
    
    
    public static final String OBJECT_TYPE_VERSION="object_type_version";//版本
    public static final String OBJECT_TYPE_DATASOURCE="object_type_datasource";//数据源
    public static final String OBJECT_TYPE_BOM="object_type_bom";//bom
    public static final String OBJECT_TYPE_FUNCTION="object_type_function";//函数
    public static final String OBJECT_TYPE_KIND="object_type_kind";//类型
    public static final String OBJECT_TYPE_PARAMETER="object_type_parameter";//参数
    public static final String OBJECT_TYPE_FORMULA="object_type_formula";//公式
    public static final String OBJECT_TYPE_RULE="object_type_rule";//规则
    public static final String OBJECT_TYPE_INDICATOR="object_type_indicator";//指标
    public static final String OBJECT_TYPE_RATE="object_type_rate";//费率
    public static final String OBJECT_TYPE_PREPAREJOB="object_type_preparejob";//预处理任务
    
    
    public static final String OPERATE_ADD="operate_add";//修改操作
    public static final String OPERATE_MODIFY="operate_modify";//修改操作
    public static final String OPERATE_DELETE="operate_delete";//删除操作
    
    
    public static final String REFRESH_TYPE_ID="refresh_type_id";//按ID刷新
    public static final String REFRESH_TYPE_VERSIONID="refresh_type_versionid";//按版本刷新
    public static final String REFRESH_TYPE_ALL="refresh_type_all";//全部刷新
    
    
    public static final String EXPORT_TYPE_ID="export_type_id";//导出类型
    public static final String EXPORT_TYPE_VERSIONID="export_type_versionid";//导出版本
    public static final String EXPORT_TYPE_ALL="export_type_all";//导出全部
    
    
    
    public static final String STEP_DETAIL_INPUT="step_detail_input";//步骤详细入参
    public static final String STEP_DETAIL_RESULT="step_detail_result";//步骤详细结果,string,number,date,bom,formulaResult,indicatorResult,ruleResult
    public static final String STEP_DETAIL_REF_OBJDEFINE="step_detail_ref_objdefine";//步骤引用对象的id+tag号，格式:id_tag
    
    public static final String MATCH_FLAG_FIX="0";//0:精确匹配
    public static final String MATCH_FLAG_RANGE="1";//1:范围匹配
    
    
    
}
