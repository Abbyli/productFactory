/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;

import com.neusoft.abclife.productfactory.dao.PfRiskRateManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.TDimensionDef;
import com.neusoft.abclife.productfactory.entity.TObjRate;
import com.neusoft.abclife.productfactory.entity.TObjRateDimenRef;
import com.neusoft.abclife.util.Excel2007Reader;
import com.neusoft.fdframework.core.exception.CoreException;
import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.common.form.Form;
import com.neusoft.unieap.core.fileupload.FileAttachment;

/**
 * @author think
 *
 */
@Service("factoryabclife_pfRiskRateManageBo_bo")
@ModelFile(value = "pfRiskRateManageBo.bo")
public class PfRiskRateManageBoImpl implements ServletContextAware {

	public PfRiskRateManageBoImpl() {}
	
	private String webRoot;
	
	private final static String LS = System.getProperty("line.separator");
	
	private static final Logger Logger = LoggerFactory.getLogger(PfwebServiceOutterBoImpl.class);
	
	@Resource(name="factoryabclife_pfRiskRateManageDao_dao")
	private PfRiskRateManageDaoImpl pfRiskRateManageDaoImpl;

	public PfRiskRateManageDaoImpl getPfRiskRateManageDaoImpl() {
		return pfRiskRateManageDaoImpl;
	}

	public void setPfRiskRateManageDaoImpl(
			PfRiskRateManageDaoImpl pfRiskRateManageDaoImpl) {
		this.pfRiskRateManageDaoImpl = pfRiskRateManageDaoImpl;
	}
	
	/**
	 * 查询对象费率表
	 * */
	public List<TObjRate> queryRiskRateById(String insurtypeCode, String verNo, String pricingLiabCode){
		
		List<TObjRate> list = pfRiskRateManageDaoImpl.queryRiskRateById(insurtypeCode, verNo, pricingLiabCode);		
		return list;
	}
	
	/**
	 * 查询维度表 精确
	 * */
	public List<TDimensionDef> queryTDimensionDefs1(String rateType){
		List<TDimensionDef> list_single = pfRiskRateManageDaoImpl.queryTDimensionDefs(rateType, "0");	
		return list_single;
	}
	
	/**
	 * 查询维度表 范围
	 * */
	public List<TDimensionDef> queryTDimensionDefs2(String rateType){
		List<TDimensionDef> list_range = pfRiskRateManageDaoImpl.queryTDimensionDefs(rateType, "1");
		return list_range;
	}
	
	/**
	 * 保存对象费率表,对象费率表维度表
	 * */
	public String saveRiskRate(String insurtypeCode, String verNo, String pricingLiabCode, 
				String rateType, List<TObjRateDimenRef> conditionCol, String opt){
		String message = "";
		if("add".equals(opt)){
			message = checkRiskRate(insurtypeCode, verNo, pricingLiabCode, rateType);
			if("".equals(message)){
				//保存 TObjRate TObjRateDimenRef
				TObjRate tObjRate = new TObjRate();
				tObjRate.setInsurtypeCode(insurtypeCode);
				tObjRate.setVerNo(Long.parseLong(verNo));
				tObjRate.setPricingLiabCode(pricingLiabCode);
				tObjRate.setRateType(rateType);
				tObjRate.setTableName("R_"+rateType+"_"+pricingLiabCode+"_"+verNo);
				if(pricingLiabCode == null || "".equals(pricingLiabCode)){
					tObjRate.setTableName("C_"+rateType+"_"+insurtypeCode+"_"+verNo);
				}
				
				pfRiskRateManageDaoImpl.saveTObjRate(tObjRate);
				pfRiskRateManageDaoImpl.saveTObjRateDimenRef(conditionCol, tObjRate);
				//生成sql语句
				String SQL = createTableSQL(conditionCol, tObjRate);
				//System.out.println(SQL);
				pfRiskRateManageDaoImpl.saveTable(SQL);
			}
		}
		return message;
	}
	
	/**
	 * 生成sql语句
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

	/**
	 * 校验对象费率表
	 * */
	public String checkRiskRate(String insurtypeCode, String verNo, String pricingLiabCode, String rateType){	
		String message = "";
		List<TObjRate> list = pfRiskRateManageDaoImpl.checkRiskRate(insurtypeCode, verNo, pricingLiabCode, rateType);
		if(list.size() != 0 ){			
			message = "险种定价责任费率表已存在!";		
		}	
		return message;
	}
	
	/**
	 * 删除对象费率表,对象费率表维度表
	 * */
	public void delRiskRate(TObjRate tObjRate){
		//删除 TObjRate TObjRateDimenRef
		pfRiskRateManageDaoImpl.delTObjRateDimenRef(tObjRate);
		pfRiskRateManageDaoImpl.delTObjRate(tObjRate);	
		//删除表
		pfRiskRateManageDaoImpl.delTable(tObjRate);		
	}
	
	/**
	 * 模板导出
	 * */
	public File exportModel(TObjRate formId4Download){	
		//创建模板 下载
		String fileDir = webRoot+"objRateModel"+File.separator+"R"+File.separator+formId4Download.getRateType();
		File dir = new File(fileDir);
		if(!dir.exists()){
			dir.mkdirs();			
		}
		String fileName = formId4Download.getTableName()+".xlsx";
		File file = new File(fileDir+File.separator+fileName);
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				Logger.info("模板导出异常",e);
			}			
		}
		//创建xls模板
		List<TObjRateDimenRef> list = pfRiskRateManageDaoImpl.queryRiskRateDimenRefById(formId4Download.getId().toString());				
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		CellStyle style = getStyle(workbook);
		Sheet sheet = workbook.createSheet("sheet1");
		Row row0 = sheet.createRow(0);
		for(int i = 0; i < list.size(); i++) {
			TObjRateDimenRef item = list.get(i);
	        Cell cell_1 = row0.createCell(i, Cell.CELL_TYPE_STRING);	        
	        cell_1.setCellStyle(style);
	        cell_1.setCellValue(item.getDimensionName());
	        sheet.autoSizeColumn(i);
		}
		Cell cell_1 = row0.createCell(list.size(), Cell.CELL_TYPE_STRING);
        //CellStyle style = getStyle(workbook);
        cell_1.setCellStyle(style);
        cell_1.setCellValue("值");
        sheet.autoSizeColumn(list.size());
        //写入文件
		try {
			FileOutputStream outputStream = new FileOutputStream(file);
			workbook.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (FileNotFoundException e) {
			Logger.info("模板导出",e);
		} catch (IOException e) {
			Logger.info("模板导出",e);
		}
		return file;
	}
	
	/**
	 * 设置cell格式
	 * */
	private CellStyle getStyle(Workbook workbook){
         CellStyle style = workbook.createCellStyle();
         style.setAlignment(CellStyle.ALIGN_CENTER); 
         style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
         // 设置单元格字体
         Font headerFont = workbook.createFont(); // 字体
         headerFont.setFontHeightInPoints((short)14);
         headerFont.setColor(HSSFColor.BLACK.index);
         headerFont.setFontName("宋体");
         style.setFont(headerFont);
         style.setWrapText(true);
         // 设置单元格边框及颜色
         style.setBorderBottom((short)1);
         style.setBorderLeft((short)1);
         style.setBorderRight((short)1);
         style.setBorderTop((short)1);
         style.setWrapText(true);
         return style;
	}
	
	/**
	 * 上传费率
	 * @throws InterruptedException 
	 * */
	@SuppressWarnings("unchecked")
	public void saveFileUpload(Form formId4Upload, TObjRate tObjRate) throws Exception{
		//Thread.sleep(10000);
		//清除表中的数据
		pfRiskRateManageDaoImpl.delTableDatas(tObjRate);		
		//查询费率表 维度
		List<TObjRateDimenRef> dimenRefList = pfRiskRateManageDaoImpl.queryRiskRateDimenRefById(tObjRate.getId().toString());
		int columnSize = dimenRefList.size()+1;//维度数量
//		List<Object[]> insertList = new ArrayList<Object[]>();
		List fileList = formId4Upload.getFiles();// 获取所有上传的临时文件列表
		if (fileList.size() > 0 && fileList.get(0) != null) {
			FileAttachment fileAttachment = (FileAttachment) fileList.get(0);
			InputStream is = fileAttachment.getInputStream();
			try {
//				int startRowNum = 1;//开始行数
//				int startCellNum = 0;//开始列数				
//				Workbook workbook = WorkbookFactory.create(is);
//				for (int numSheet = 0; numSheet < workbook.getNumberOfSheets(); numSheet++) {
//					Sheet hssfSheet = workbook.getSheetAt(numSheet);
//					if (hssfSheet == null) {
//						continue;
//					}
//					int phyNum = hssfSheet.getRow(0).getPhysicalNumberOfCells();
//					//Cell myCell = hssfSheet.getRow(0).getCell(columnSize);
//					//String myVal = this.getValue(myCell);
//					if(columnSize!=phyNum){
//						throw new CoreException("91102", new String[] {"上传费率文件列数与费率表列数不一致！"}, null);						
//					}					
//					int dataEndRow = hssfSheet.getLastRowNum();//总行数
//					for (int rowNum = startRowNum; rowNum <= dataEndRow; rowNum++) {
//						Row hssfRow = hssfSheet.getRow(rowNum);
//						if (hssfRow == null) {
//							continue;
//						}
//						Object[] obj = new Object[columnSize];
//						boolean isInsert = true;
//						for(int cellNum = startCellNum; cellNum < columnSize; cellNum++){
//							Cell hssfCell = hssfRow.getCell(cellNum);
//							if(hssfCell == null){
//								isInsert = false;
//								break;							
//							}
//							obj[cellNum] = this.getValue(hssfCell);							
//						}
//						if(isInsert){
//							insertList.add(obj);
//						}					
//					}				
//				}
//				//插入
//				String sql = insertTableSQL(dimenRefList, tObjRate);
//				pfRiskRateManageDaoImpl.saveTableDatas(sql, insertList);
				
				//add 20161215				
				Long start = System.currentTimeMillis();
				String sql = insertTableSQL(dimenRefList, tObjRate);
				Excel2007Reader reader = new Excel2007Reader(sql, columnSize);
				reader.setDao(pfRiskRateManageDaoImpl);
				reader.processOneSheet(is);				
				Long end = System.currentTimeMillis();
				System.out.println("BO finishTime: "+(end-start));
			} catch(CoreException e){
				throw new CoreException("91103", new String[] {"上传费率文件失败"}, e);	
				
			}finally{
				try {
					is.close();
				} catch (IOException e) {
					Logger.info("上传费率文件异常",e);
				}				
			}
		}
	}
	
	/**
	 * 获取cell的值
	 * */
//	private String getValue(Cell hssfCell) {
//		if (hssfCell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {
//			return String.valueOf(hssfCell.getBooleanCellValue());
//		} else if (hssfCell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
//			Double d = hssfCell.getNumericCellValue();
//			return doubleOrInt(d);
//		} else {
//			return String.valueOf(hssfCell.getStringCellValue());
//		}
//	}
	
	/**
	 * 区分 1和1.0
	 * */
	public String doubleOrInt(Double d){
		 if(Math.round(d) - d == 0){
			 return String.valueOf(d.intValue());
		 }
		 return String.valueOf(d);
	}
	
	/**
	 * 生成sql语句
	 * */
	private String insertTableSQL(List<TObjRateDimenRef> conditionCol, TObjRate tObjRate) {
		String Q = "";
		StringBuilder sb = new StringBuilder();
		sb.append("insert into ").append(tObjRate.getTableName()).append("(");
		for(int i = 0; i < conditionCol.size(); i++){
			TObjRateDimenRef dimenRef = conditionCol.get(i);
			sb.append(dimenRef.getDimensionProperty()).append(",");		
			Q += "?,";
		}
		sb.append("val").append(")values(").append(Q).append("?").append(")");
		return sb.toString();
	}

	@Override
	public void setServletContext(ServletContext sc) {
		this.webRoot = sc.getRealPath("/");		
	}

	/**
	 * 下载精算数据
	 * @param formId4Download
	 * @return
	 */
	public File exportRateTable(TObjRate formId4Download){	
		//创建模板 下载
		String fileDir = webRoot+"objRateModel"+File.separator+"R"+File.separator+formId4Download.getRateType();
		File dir = new File(fileDir);
		if(!dir.exists()){
			dir.mkdirs();			
		}
		String fileName = formId4Download.getTableName()+".xlsx";
		File file = new File(fileDir+File.separator+fileName);
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				Logger.info("下载精算数据异常",e);
			}			
		}
		//创建xls模板
		//Long start = System.currentTimeMillis();
		List<TObjRateDimenRef> list = pfRiskRateManageDaoImpl.queryRiskRateDimenRefById(formId4Download.getId().toString());				
		SXSSFWorkbook workbook = new SXSSFWorkbook();
		CellStyle style = getStyle(workbook);
		Sheet sheet = workbook.createSheet("sheet1");
		Row row0 = sheet.createRow(0);
		for(int i = 0; i < list.size(); i++) {
			TObjRateDimenRef item = list.get(i);
	        Cell cell_1 = row0.createCell(i, Cell.CELL_TYPE_STRING);	        
	        cell_1.setCellStyle(style);
	        cell_1.setCellValue(item.getDimensionName());
	        //sheet.autoSizeColumn(i);
		}
		Cell cell_1 = row0.createCell(list.size(), Cell.CELL_TYPE_STRING);
        //CellStyle style = getStyle(workbook);
        cell_1.setCellStyle(style);
        cell_1.setCellValue("值");
        //sheet.autoSizeColumn(list.size());
        //查询精算数据放入xls  --这个查询以后改成分页每次查询1000条, 20161115 by qyt 
        SqlRowSet srs = pfRiskRateManageDaoImpl.getRateTable(formId4Download.getTableName());
        int i = 1;
        while(srs.next()){
        	Row row = sheet.createRow(i);
        	for(int j = 0; j <= list.size(); j++){
        		Cell cell_2 = row.createCell(j, Cell.CELL_TYPE_STRING);
    	        //CellStyle style2 = getStyle(workbook);
    	        //cell_2.setCellStyle(style2);
        		cell_2.setCellStyle(style);
    	        cell_2.setCellValue(srs.getString(j+1));
    	        //sheet.autoSizeColumn(j);
        	}
        	i++;
        }
        //最后设置列宽
        for(int s = 0; s < list.size(); s++) {
	        sheet.autoSizeColumn(s);
		}
        //Long end = System.currentTimeMillis();
        //System.out.println("result----:"+(end-start));
        //写入文件
		try {
			FileOutputStream outputStream = new FileOutputStream(file);
			workbook.write(outputStream);
			outputStream.flush();
			outputStream.close();
		} catch (FileNotFoundException e) {
			Logger.info("下载精算数据异常",e);
		} catch (IOException e) {
			Logger.info("下载精算数据异常",e);
		}
		return file;
	}
	
	
	
}
