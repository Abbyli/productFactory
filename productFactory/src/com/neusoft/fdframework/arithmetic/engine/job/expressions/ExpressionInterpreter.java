package com.neusoft.fdframework.arithmetic.engine.job.expressions;

import java.io.PrintStream;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTree;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.commons.lang.StringUtils;

//import com.neusoft.fdframework.arithmetic.engine.exception.EngineException;

public class ExpressionInterpreter {
       private static Map<String,ParseTree> treeCache=new HashMap<String,ParseTree>();
       private EngineCalcVisitor engineCalcVisitor=new EngineCalcVisitor();
       public void set(String id,String value)
       {
           Context.getInstance().setContext(id, value);
       }
       public void set(String id,Date value)
       {
           Context.getInstance().setContext(id, value);
       }
       public void set(String id,BigDecimal value)
       {
           Context.getInstance().setContext(id, value);
       }
       public void set(String id,Object bom)
       {
           Context.getInstance().setContext(id, bom);
       }
       public Object exec(String tExpress)
       {
           String orgExpression=tExpress;
           Object ret=null;
           tExpress="calc "+tExpress;
           PrintStream standError=System.err;
           try
           {
               ParseTree tree =treeCache.get(tExpress);
               if(tree==null)
               {
            	   ByteArrayOutputStream baos=new ByteArrayOutputStream();
                   PrintStream err = new PrintStream(baos);  
                   System.setErr(err);  
                   ANTLRInputStream input = new ANTLRInputStream(tExpress);
                   CalcLexer lexer = new CalcLexer(input);
                   CommonTokenStream tokens = new CommonTokenStream(lexer);
                   CalcParser parser = new CalcParser(tokens);
                   tree = parser.exprs();
                   String errMsg=new String(baos.toByteArray());
                   System.setErr(standError);//恢复默认异常
                   if(StringUtils.isEmpty(errMsg))
                   {
                       treeCache.put(tExpress, tree);
                   }
                   else
                   {
                	   RuntimeException tempException=new RuntimeException(errMsg);
                       //throw new EngineException("10020",new String[]{orgExpression},tempException);
                   }
               }
               ret=engineCalcVisitor.visit(tree);
           }
           catch(Throwable e)
           {
               //throw new EngineException("10012",new String[]{orgExpression},e);
           }
           finally
           {
        	   System.setErr(standError);
               //Context.getInstance().clear();//清空线程变量 add by qyt 20160815不清
           }
           return ret;
       }
       
//       public boolean isExpressiionValid(String tExpress, ParseTree tree)
//       {
////           String org=tExpress.replaceAll("\\s*", "");
//           String dst=getChildString(tree);
//           System.out.println(dst);
////           if(dst.equals(org))
////           {
////               return true;
////           }
//           return true;
//       }
//       private String getChildString(ParseTree tree)
//       {
//    	   RecognitionException e;
//           String str="";
//           if(tree.getChildCount()>0)
//           {
//               for(int i=0;i<tree.getChildCount();i++)
//               {
//                   str=str+getChildString(tree.getChild(i));
//                  
//               }
//              
//           }
//           else
//           {
//               str=str+tree.getText();
//           }
//           return str;
//       }
       
       public static void main(String[] args) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
//           Map<String,String> targetExtMethod=new HashMap<String,String>();
//           targetExtMethod.put("chengfang", "com.neusoft.sfzj.jr.TestMa.chengfang1");
//           targetExtMethod.put("strTest", "com.neusoft.sfzj.jr.TestMa.strTest");
//           ExtMethodExecutor.setTargetExtMethod(targetExtMethod);
           ExpressionInterpreter ite=new ExpressionInterpreter();
           String tExpress="query('ds1','select 12*(year( to_date(to_char(${wageDate},\\'yyyy-mm-dd\\'),\\'yyyy-mm-dd\\')) - year(employdate)) + abs(month( ${wageDate} ) - month(employdate)) from a001_test where agentcode=${agentCode}')";
           ite.set("policyNo", "policy_1");
           System.out.println(ite.exec(tExpress));
//           long start=System.currentTimeMillis();
//           int totalCount=1;
//           for(int i=0;i<totalCount;i++)
//           {
//               ite.set("a", new BigDecimal(4.9E-324D));
//               ite.set("b", new BigDecimal(-1));
//               ite.set("c", new BigDecimal(3));
//               ite.set("parma1", "src_kkc你好");
//               ite.set("你好b", "3");
//               ite.set("parma3", "src_kkc你好");
//               System.out.println(ite.exec(tExpress));
//           }
//           long end=System.currentTimeMillis();
//           System.out.println("消耗："+(end-start));
       }
}
