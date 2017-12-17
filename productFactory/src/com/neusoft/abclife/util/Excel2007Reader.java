package com.neusoft.abclife.util;

import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.eventusermodel.XSSFReader;
import org.apache.poi.xssf.model.SharedStringsTable;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.DefaultHandler;
import org.xml.sax.helpers.XMLReaderFactory;

import com.neusoft.abclife.productfactory.dao.PfRiskRateManageDaoImpl;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.fdframework.core.exception.CoreException;

/**
 * XML方式逐行读取  改, 
 * 每次由BO类创建, 非单列, 禁止添加static方法
 * */
public class Excel2007Reader extends DefaultHandler{
	
	private final int batchSize = 5000;
	//共享字符串表  
    private SharedStringsTable sst; 
    //上一次的内容
    private String lastContents;  
    private boolean nextIsString;  
 
    private int sheetIndex = -1;  
    private List<String> rowlist = new ArrayList<String>(); 
    //当前行
    private int curRow = 0;  
    //当前列
    private int curCol = 0;  
    
    private String sql = "";    
    private excelUpload eu = null;
    private int columnSize = 0;

	//转数组   结构
    private List<Object[]> insertList = new ArrayList<Object[]>(); 
    
    public Excel2007Reader(String sql, int columnSize){
    	this.sql = sql; 
    	this.columnSize = columnSize;
    }
    
    public <T extends excelUpload> void setDao(T t){
    	this.eu = t;  	
    }
    
    /**
     * 读取第一个sheet
     */  
	public void processOneSheet(InputStream is) throws Exception {  
        OPCPackage pkg = OPCPackage.open(is);       
        XSSFReader r = new XSSFReader(pkg);  
        SharedStringsTable sst = r.getSharedStringsTable();               
        XMLReader parser = fetchSheetParser(sst);  
              
        InputStream sheet = r.getSheet("rId1");  
        InputSource sheetSource = new InputSource(sheet);  
        parser.parse(sheetSource);   
       
        sheet.close();     
    }
	
	/**
     * 业务处理
     */   
	public void optRow(int sheetIndex, int curRow, List<String> rowList) {   
		//int batchSize = 5000; //每batchSize条数据保存一次 
		int phyNum = rowList.size();
        if(curRow != 0){       	
    		Object[] obj = new Object[phyNum];
    		for(int i = 0; i < rowList.size(); i++) {  
    			obj[i] = rowList.get(i);
    			if(i==rowList.size()-1){
    				obj[i] = new BigDecimal(obj[i].toString()).divide(new BigDecimal("1"), 4, RoundingMode.HALF_UP);
    			}
            }  
    		insertList.add(obj);
    		if(insertList.size() == batchSize){ 
    			eu.saveTableDatasBatch(sql, insertList);
    			//System.out.println("insert "+batchSize);
    			insertList.clear();
    		}       	
        }else{
        	//第1行数据 表头
        	if(columnSize!= phyNum){
        		throw new CoreException("91102", 
        				new String[] {"上传费率文件列数与费率表列数不一致！"}, null);	       		
        	} 
        }				
    } 
	
//	public String arrayToString(List<Object[]> list){
//		String str1 = "";
//		for(int i = 0; i < list.size(); i++){
//			Object[] o = list.get(i);
//			String str2 = "";
//			for(int j = 0; j < o.length; j++){
//				str2 = str2 + o[j] + ", ";	
//			}	
//			str1 = str1 + str2 +"___";
//		}
//		return str1;
//	}
	
	/**
     * 业务处理 保存最后剩余的数据
     */
	private void optFinish(boolean b) {
		eu.saveTableDatasBatch(sql, insertList);
		//System.out.println("insert "+insertList.size());
		//System.out.println("all finish ----");
		insertList.clear();
	}

	private XMLReader fetchSheetParser(SharedStringsTable sst) throws SAXException {
		 XMLReader parser = XMLReaderFactory  
         	.createXMLReader("org.apache.xerces.parsers.SAXParser");  //或者javax.xml.parsers.SAXParser		 
		 this.sst = sst;  
		 parser.setContentHandler(this);  
		 return parser;  
	} 
	
	public void startElement(String uri, String localName, String name,  
            Attributes attributes) throws SAXException {  
        // c => 单元格  
        if (name.equals("c")) {  
            // 如果下一个元素是 SST 的索引，则将nextIsString标记为true  
            String cellType = attributes.getValue("t");  
            if (cellType != null && cellType.equals("s")) {  
                nextIsString = true;  
            } else {  
                nextIsString = false;  
            }  
        }  
        // 置空  
        lastContents = "";  
    }  
	
	public void endElement(String uri, String localName, String name)  
    	throws SAXException, CoreException{  
		// 根据SST的索引值的到单元格的真正要存储的字符串  
		// 这时characters()方法可能会被调用多次  
		if (nextIsString) {  
		    try {  
		        int idx = Integer.parseInt(lastContents);  
		        lastContents = new XSSFRichTextString(sst.getEntryAt(idx)).toString();  
		    } catch (Exception e) {  
		    	
		    }  
		}  		
		// v => 单元格的值，如果单元格是字符串则v标签的值为该字符串在SST中的索引  
		// 将单元格内容加入rowlist中，在这之前先去掉字符串前后的空白符  
		//System.out.println("e: "+name); //打印 xml节点
		if (name.equals("v")) {  
		    String value = lastContents.trim();  
		    value = value.equals("") ? " " : value;  
		    rowlist.add(curCol, value);  
		    curCol++;  
		} else {  		   
		    if (name.equals("row")) {  
		    	// 标签名称为 row，已到行尾，调用 optRows()方法  
		    	optRow(sheetIndex, curRow, rowlist);
		    	rowlist.clear();  
		        curRow++;  
		        curCol = 0;
		    }else if(name.equals("sheetData")){
		    	// 标签名称为 sheetData，sheet已结束，调用 optFinish()方法
		    	optFinish(true);	
		    	rowlist.clear();  		  
		        curCol = 0;
		    }else{
		    	//其他节点不操作
		    }		    
		}  
	} 

	public void characters(char[] ch, int start, int length)  
	    throws SAXException {  
		// 得到单元格内容的值  
		lastContents += new String(ch, start, length);  
	}  
	
//	private boolean isBlankRow(List<String> rowlist){
//		boolean b = true;
//		if(rowlist.size() != 0){
//			b = false;			
//		}
//		return b;
//	}
	
	/**
	 * sheetPr, dimension, selection, sheetView, sheetViews, sheetFormatPr
		 col, col, col, col, col, cols
		 v
		 c
		 v
		 c
		 v
		 c
		 v
		 c
		 v
		 c
		 v
		 c
		 v
		 c
		 row (多行时, row多个)
	 * sheetData, phoneticPr, pageMargins, pageSetup, worksheet
	 * */
	
}
