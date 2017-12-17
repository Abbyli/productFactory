package com.neusoft.fdframework.arithmetic.engine.job.expressions;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;

//import com.neusoft.fdframework.arithmetic.engine.entity.AeFunctionArg;
import com.neusoft.abclife.productfactory.entity.PfDynamicBean;
import com.neusoft.abclife.productfactory.entity.TFunctionArgRef;
import com.neusoft.abclife.productfactory.entity.TFunctionDef;
import com.neusoft.abclife.util.PfIndicatorContextHolder;
import com.neusoft.fdframework.arithmetic.engine.exceptions.EngineException;
import com.neusoft.fdframework.arithmetic.engine.job.commons.DateUtil;
import com.neusoft.fdframework.arithmetic.engine.job.commons.ExtMethodExecutor;
//import com.neusoft.fdframework.arithmetic.engine.job.common.ExtMethodExecutor;
//import com.neusoft.fdframework.arithmetic.engine.job.model.FunctionModel;
import com.neusoft.fdframework.arithmetic.engine.job.models.TypeConverter;

public class EngineCalcVisitor extends CalcBaseVisitor<Object> {

    private static final int DEFAULT_PRECISION=40;//默认精度
    /**
     * date:'#2015-01-02 23:00:00#'
     * string:'小明'
     * number:1.0
     * @param text
     * @return
     */
    private Object getRealString(String text)
    {
        Object real=null;
        String ret=text;
        if(text!=null&&text.startsWith("'#")&&text.endsWith("#'"))
        {
            ret=text.substring(2, text.length()-2);//去掉首尾的'
            if(StringUtils.isNotEmpty(ret))
            {
                real=DateUtil.string2Date(ret, 1);//返回Date对象
            }
        }
        else if(text!=null&&text.startsWith("'")&&text.endsWith("'"))
        {
            ret=text.substring(1, text.length()-1);//去掉首尾的',返回字符串
            ret=ret.replace("\\'", "'");
            real=ret;
        }
        else if(text!=null&&text.startsWith("\"")&&text.endsWith("\""))
        {
            ret=text.substring(1, text.length()-1);//去掉首尾的',返回字符串
            real=ret;
        }
        else
        {
            real=new BigDecimal(ret);
        }
        return real;
    }
    @Override
    public Object visitExprs(CalcParser.ExprsContext ctx) {
        return visit(ctx.getChild(0));
    }

    @Override
    public Object visitAgmt(CalcParser.AgmtContext ctx) {
        Object text=getRealString(ctx.num.getText());
        Context.getInstance().setContext(ctx.id.getText(), text);
        return null;
    }

    @Override
    public Object visitAgmts(CalcParser.AgmtsContext ctx) {
        visit(ctx.agmt());
        if (ctx.agmts() != null)
            visit(ctx.agmts());
        return null;
    }

    @Override
    public Object visitCalcExpr(CalcParser.CalcExprContext ctx) {
        return visit(ctx.expr());
    }

    @Override
    public Object visitExpr(CalcParser.ExprContext ctx) {
        int cc = ctx.getChildCount();
        if (cc == 3) {
            switch (ctx.op.getType()) {
            case CalcParser.ADD:
                return executeAdd(visit(ctx.expr(0)),visit(ctx.expr(1)));
            case CalcParser.SUB:
                return executeSubtract(visit(ctx.expr(0)),visit(ctx.expr(1)));
            case CalcParser.MUL:
                return executeMultiply(visit(ctx.expr(0)),visit(ctx.expr(1))) ;
            case CalcParser.DIV:
                return executeDivide(visit(ctx.expr(0)),visit(ctx.expr(1))) ;
            }
        } else if (cc == 1) {
            return visit(ctx.getChild(0));
        }
        throw new RuntimeException();
    }

    @Override
    public Object visitFactor(CalcParser.FactorContext ctx) {
        int cc = ctx.getChildCount();
        if (cc == 3) {
            return visit(ctx.getChild(1));
        } else if (cc == 2) {
            if (ctx.sign.getType() == CalcParser.ADD)
                return (new BigDecimal(ctx.getChild(1).getText()));
            if (ctx.sign.getType() == CalcParser.SUB)
                return (new BigDecimal(ctx.getChild(1).getText()).multiply(new BigDecimal("-1")));
        } else if (cc == 1) {
            if (ctx.num != null)
                return getRealString(ctx.getChild(0).getText());
            if (ctx.id != null)
            {
                String idText=ctx.id.getText();
                if(idText.contains("."))
                {//访问对象的属性
                    int index=idText.indexOf(".");
                    String beanName=idText.substring(0,index).trim();
                    String property=idText.substring(index+1).trim();
                    Object bean= Context.getInstance().getValue(beanName);
                    if(bean!=null)
                    {
                        try {
                            Object value=PropertyUtils.getNestedProperty(bean, property);//用于支持BOM嵌套的情况：bom1.bom2.p
                            return value;
                        } catch (Exception e) {
                            //throw new EngineException("10031",new String[]{idText,idText+"属性获取失败"},e);
                        } 
                    }
                    else
                    {
                        //throw new EngineException("10031",new String[]{idText,beanName+"对象未找到"},null);
                    }
                }
                else
                {
                    return Context.getInstance().getValue(ctx.id.getText());
                }
                
            }
            return visit(ctx.funCall());
        }
        throw new RuntimeException();
    }

    @Override
    public Object visitParams(CalcParser.ParamsContext ctx) {
    	//System.out.println("visitParams");
        if (ctx.params() != null)
            visit(ctx.params());
        Object obj = visit(ctx.expr());
        //System.out.println(obj);
        Context.getInstance().pushStack(obj);
        return null;
    }

//    @Override
//    public Object visitFunCall(CalcParser.FunCallContext ctx) {
//        visit(ctx.params());
//        String funName = ctx.name.getText();
//        if(ExtMethodExecutor.contains(funName)) 
//        {
//        	List<Object> args=new ArrayList<Object>();
////           int count=ExtMethodExecutor.getParameterCount(funName);
//           FunctionModel functionModel=ExtMethodExecutor.getFunctionModel(funName);
//           if(functionModel!=null)
//           {
//        	   List<AeFunctionArg> argList=functionModel.getArgList();
//        	   if(argList!=null&&!argList.isEmpty())
//        	   {
//        		   for(AeFunctionArg aeFunctionArg:argList)
//        		   {
//        			   Object obj=Context.getInstance().popStack();
//        			   obj=TypeConverter.convert(obj, aeFunctionArg.getArgType());
//        			   args.add(obj);
//        		   }
//        	   }
//           }
////           if(count>0)
////           {
////               for(int i=0;i<count;i++)
////               {
////                   args.add(Context.getInstance().popStack());
////               }
////           }
////           String ret=ExtMethodExecutor.executeMethod(funName, args.toArray());
////           return ret==null?null:new BigDecimal(ret);
//           return ExtMethodExecutor.executeMethod(funName, args.toArray());
//        }      
//        throw new IllegalArgumentException("不支持的函数："+funName);
//    }
    
    /**
     * add by qyt
     * */
    @Override
    public Object visitFunCall(CalcParser.FunCallContext ctx) {
        visit(ctx.params());
        String funName = ctx.name.getText();
    	List<Object> args = new ArrayList<Object>();
    	TFunctionDef tFunctionDef = ExtMethodExecutor.getFunctionModel(funName);
    	if(tFunctionDef != null)
        {
    		//查询outter参数
    		List<TFunctionArgRef> argList = ExtMethodExecutor.getFunctionModelArg(tFunctionDef.getId().toString(), "outter");   		
       	    if(argList != null && !argList.isEmpty())
       	    {
       	    	/**
       	    	 * 方法1 从PfDynamicBean直接取实际值
       	    	 * */
//       	    	PfDynamicBean paramBean = PfIndicatorContextHolder.get();
//       		    for(TFunctionArgRef argRef : argList)
//       		    {
//            		String refValue = argRef.getRefValue();
//            		Object obj = null;
//            		if(argRef.getReturnType().equals("number")){					
//            			obj = paramBean.getBigDecimal(refValue.substring(refValue.lastIndexOf(".")+1));
//					}else{
//						obj = paramBean.getString(refValue.substring(refValue.lastIndexOf(".")+1));					
//					}       			    
//       			    args.add(obj);
//       		    }
       		    /**
       	    	 * 方法2 从Context直接取实际值
       	    	 * */
//       		    for(TFunctionArgRef argRef : argList)
//       		    {
//            		String refValue = argRef.getRefValue();
//            		Object obj = Context.getInstance().getValue(refValue.substring(refValue.lastIndexOf(".")+1));
//            		obj = TypeConverter.convert(obj, argRef.getReturnType());   		      			    
//       			    args.add(obj);
//       		    }
       		    /**
       	    	 * 方法3 从队列取引用值
       	    	 * */
       		    for(TFunctionArgRef argRef : argList)
       		    {
       		    	Object obj = Context.getInstance().popStack();
            		obj = TypeConverter.convert(obj, argRef.getReturnType());   		     			    
       			    args.add(obj);
       		    }
       	    }
       	    return ExtMethodExecutor.executeMethod(tFunctionDef, args);
        }       
        throw new IllegalArgumentException("不支持的函数："+funName);
    }

    @Override
    public Object visitSetExpr(CalcParser.SetExprContext ctx) {
        return visit(ctx.agmts());
    }
    
    private BigDecimal executeAdd(Object param1,Object param2)
    {
        BigDecimal ret=null;
        BigDecimal b1=TypeConverter.convert(param1, BigDecimal.class);
        BigDecimal b2=TypeConverter.convert(param2, BigDecimal.class);
        ret=b1.add(b2);
//        if(checkType(BigDecimal.class,param1,param2))
//        {
//            BigDecimal b1=(BigDecimal) param1;
//            BigDecimal b2=(BigDecimal) param2;
//            ret=b1.add(b2);
//        }
//        else
//        {
//            throw new IllegalArgumentException("参数类型不合法，请输入number类型的参数。");
//        }
        return ret;
    }
    
    private BigDecimal executeSubtract(Object param1,Object param2)
    {
        BigDecimal ret=null;
        BigDecimal b1=TypeConverter.convert(param1, BigDecimal.class);
        BigDecimal b2=TypeConverter.convert(param2, BigDecimal.class);
        ret=b1.subtract(b2);
//        if(checkType(BigDecimal.class,param1,param2))
//        {
//            BigDecimal b1=(BigDecimal) param1;
//            BigDecimal b2=(BigDecimal) param2;
//            ret=b1.subtract(b2);
//        }
//        else
//        {
//            throw new IllegalArgumentException("参数类型不合法，请输入number类型的参数。");
//        }
        return ret;
    }
    private BigDecimal executeMultiply(Object param1,Object param2)
    {
        BigDecimal ret=null;
        BigDecimal b1=TypeConverter.convert(param1, BigDecimal.class);
        BigDecimal b2=TypeConverter.convert(param2, BigDecimal.class);
        ret=b1.multiply(b2);
//        if(checkType(BigDecimal.class,param1,param2))
//        {
//            BigDecimal b1=(BigDecimal) param1;
//            BigDecimal b2=(BigDecimal) param2;
//            ret=b1.multiply(b2);
//        }
//        else
//        {
//            throw new IllegalArgumentException("参数类型不合法，请输入number类型的参数。");
//        }
        return ret;
    }
    private BigDecimal executeDivide(Object param1,Object param2)
    {
        BigDecimal ret=null;
        BigDecimal b1=TypeConverter.convert(param1, BigDecimal.class);
        BigDecimal b2=TypeConverter.convert(param2, BigDecimal.class);
        ret=b1.divide(b2, DEFAULT_PRECISION, RoundingMode.FLOOR);
//        if(checkType(BigDecimal.class,param1,param2))
//        {
//            BigDecimal b1=(BigDecimal) param1;
//            BigDecimal b2=(BigDecimal) param2;
//            ret=b1.divide(b2, DEFAULT_PRECISION, RoundingMode.FLOOR);
//        }
//        else
//        {
//            throw new IllegalArgumentException("参数类型不合法，请输入number类型的参数。");
//        }
        return ret;
    }
    
//    private static boolean checkType(Class<?> clasz,Object... params)
//    {
//        if(params!=null&&params.length>0)
//        {
//            for(Object param:params)
//            {
//                if(param==null||!param.getClass().isAssignableFrom(clasz) )
//                {
//                    return false;
//                }
//            }
//        }
//        return true;
//    }
    
}