package com.neusoft.unieap.techcomp.ria.export.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;

import com.neusoft.unieap.techcomp.ria.context.ViewContext;
import com.neusoft.unieap.techcomp.ria.ds.DataStore;
import com.neusoft.unieap.techcomp.ria.export.Column;

public final class ExportUtil {
	private ExportUtil() {

	}

	public static void exportExcel(List headersInfo, DataStore gridStore,
			DataStore lockedStore, String footer, OutputStream out)
			throws Exception {

		HSSFWorkbook workbook = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = workbook.createSheet("sheet1");

		sheet.setDefaultColumnWidth(15);

		// 输出头信息
		ExportUtil.outputHeaders(headersInfo, sheet);

		int rowIndex = 1;
		// 输出锁定列数据
		if (lockedStore != null) {
			rowIndex = ExportUtil.outputColumns(headersInfo, lockedStore
					.getRowDatas(), sheet, rowIndex);
		}

		// 输出列数据
		if (gridStore != null) {
			rowIndex = ExportUtil.outputColumns(headersInfo, gridStore
					.getRowDatas(), sheet, rowIndex);
		}

		// 输出footer
		ExportUtil.outputFooter(footer, sheet, rowIndex);

		autoSizeWorkbook(workbook);
		workbook.write(out);
	}
	
	//自动调整每个列的宽度
	public static void autoSizeWorkbook(HSSFWorkbook workbook){
		HSSFSheet sheet = workbook.getSheetAt(0);
		for(int i=0;i<sheet.getRow(0).getLastCellNum();i++){
			sheet.autoSizeColumn(i);
			sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 500);
		}
	}

	public static void outputHeaders(List headersInfo, HSSFSheet sheet) {
		// 暂不考虑多表头
		HSSFRow row = sheet.createRow(0);
		int columnSize = headersInfo.size();
		Column cpi = null;
		
		CellStyle style = sheet.getWorkbook().createCellStyle();
		style.setFillForegroundColor(IndexedColors.AQUA.getIndex());
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		
		for (int k = 0; k < columnSize; k++) {
			cpi = (Column) headersInfo.get(k);
			Cell cell = row.createCell(k);
			cell.setCellValue(cpi.getTitle());
			cell.setCellStyle(style);
		}
	}

	public static int outputColumns(List headersInfo, List columnsInfo,
			HSSFSheet sheet, int rowIndex) {
		Column cpi;
		Map map;
		HSSFRow row;
		String cellValue = "";
		int headerSize = headersInfo.size();
		int columnSize = columnsInfo.size();
		for (int i = 0; i < columnSize; i++) {
			row = sheet.createRow(rowIndex + i);
			map = (Map) columnsInfo.get(i);
			for (int j = 0; j < headerSize; j++) {
				cpi = (Column) headersInfo.get(j);
				if (map.get(cpi.getName()) == null) {
					cellValue = null;
				} else {
					cellValue = ExportUtil.formatCellValue(cpi, map.get(cpi
							.getName()), "excel");
				}
				Cell cell = row.createCell(j);
				if (cellValue == null) {
					cell.setCellValue("");
				} else {
//					try {
						//updated by lianggh for 乱码
						cell.setCellValue(cellValue);
//					} catch (UnsupportedEncodingException e) {
//						throw new RuntimeException(e);
//					}
				}
				//设置导出的格式是文本型，避免出现数字科学计数法
				HSSFWorkbook wb = sheet.getWorkbook();
				HSSFCellStyle cellStyle2 = wb.createCellStyle();  
				HSSFDataFormat format = wb.createDataFormat();  
				cellStyle2.setDataFormat(format.getFormat("@"));  
				cell.setCellStyle(cellStyle2);  
			}
		}
		return rowIndex + columnSize;
	}

	public static void outputFooter(String footer, HSSFSheet sheet, int rowIndex) {
		if (footer != null && !footer.equals("")) {
			sheet.createRow(rowIndex).createCell(0).setCellValue(footer);
		}
	}

	// 获得grid的列信息,包括多标题信息和grid列信息
	public static List getHeadersInfo(ViewContext context) throws JSONException {
		List list = new ArrayList();
//		String exportType = (String) context.getDataCenter().getParameter("exportLabels");
		JSONArray layout = (JSONArray) context.get("layout");
		JSONArray exportLabels = null;
		try {
			if(context.getDataCenter().getParameter("exportLabels")!=null&& !context.getDataCenter().getParameter("exportLabels").toString().equals("{}")){
				exportLabels = (JSONArray)context.getDataCenter().getParameter("exportLabels");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JSONArray firstArray, secondArray;
		Column cpi = null;
		for (int i = 0, j = layout.size(); i < j; i++) {
			firstArray = layout.getJSONArray(i);
			for (int k = 0, l = firstArray.size(); k < l; k++) {
				secondArray = firstArray.getJSONArray(k);
				for (int m = 0, n = secondArray.size(); m < n; m++) {
					JSONObject obj = (JSONObject) secondArray.get(m);
					if (obj.containsKey("isMulTitle")) { // 多标题信息
						// 暂时不考虑多标题
					} else if (obj.containsKey("name") && advanceConfigContains(exportLabels,obj.getString("name"))) { // 普通grid信息
//						try {
							//updated by lianggh for 乱码
							cpi = new Column(obj.getString("name"), obj.getString("label"));
//						} catch (UnsupportedEncodingException e) {
//							throw new RuntimeException(e);
//						}
						if (obj.containsKey("dataFormat")) {
							cpi.setFormat(obj.getString("dataFormat"));
						}
						if (obj.containsKey("decoder")) {
							cpi.setCodelist((Map) obj.get("decoder"));
						}
						list.add(cpi);
					}
				}
			}
		}
		return list;
	}
	
	//add by wu.zb 增加高级导出选择标题列导出 2014-5-26
	public static boolean advanceConfigContains(JSONArray exportLabels,String name){
		if(exportLabels == null){//如果exportLabels是空表示不是高级导出
			return true;
		}
		int size = exportLabels.size();
		for(int i=0;i<size;i++){
			JSONObject object = exportLabels.getJSONObject(i);
			if(object.get("name").toString().equals(name)){
				return true;
			}
		}
		return false;
	}
	// 输出头信息
	public static void outputHeaders(List headersInfo, OutputStreamWriter writer)
			throws IOException {
		int columnSize = headersInfo.size();
		Column cpi = null;
		for (int k = 0; k < columnSize; k++) {
			cpi = (Column) headersInfo.get(k);
			writer.write(cpi.getTitle());
			if (k != columnSize - 1) {
				writer.write(",");
			}
		}
		// 输出换行符
		writer.write("\r\n");
	}

	// 输出客户端导出的列数据
	public static void outputColumns(List headersInfo, List columnsInfo,
			OutputStreamWriter writer) throws IOException {
		Column cpi;
		Map map;
		String cellValue = "";
		int headerSize = headersInfo.size();
		int columnSize = columnsInfo.size();
		for (int i = 0; i < columnSize; i++) {
			map = (Map) columnsInfo.get(i);
			for (int j = 0; j < headerSize; j++) {
				cpi = (Column) headersInfo.get(j);
				if (map.get(cpi.getName()) == null) {
					cellValue = null;
				} else {
					cellValue = ExportUtil.formatCellValue(cpi, map.get(cpi
							.getName()), "csv");
				}
				if (cellValue == null) {
					writer.write("\"\"");
				} else {
					//updated by lianggh for 乱码
					writer.write(new String(cellValue.getBytes("ISO8859-1")));
				}
				if (j != headerSize - 1) {
					writer.write(",");
				}
			}
			writer.write("\r\n");
		}
	}

	// 输出footer
	public static void outputFooter(String footer, OutputStreamWriter writer)
			throws IOException {
		if (footer != null && !footer.equals("")) {
			// 判断是否存在逗号或者换行符
			if (footer.indexOf(",") > -1 || footer.indexOf("\n") > -1) {
				footer = "\"" + footer + "\"";
			} else {
				// 数字过长或者数字以0开头
				String pattern = "^(-)?\\d+(.)?\\d*$";
				footer = footer.trim();
				if (footer.matches(pattern) && (footer.length() >= 9)
						|| footer.startsWith("0")) {
					footer = "=\"" + footer + "\"";
				}
			}
			writer.write(footer);
		}
	}

	private static String formatCellValue(Column paramColumn,
			Object paramObject, String type) {
		Object localObject;
		String str1 = "";
		String str2 = paramColumn.getFormat();
		
		if (paramColumn.ifCodeList()) {
			localObject = paramColumn.getCodelist();
			
			// 处理多个codevalue值的情况，用于CheckBoxGroup
			String CodeValue = paramObject.toString();
			String []CodeValues = CodeValue.split(",");
			if(CodeValues.length > 1){
				StringBuilder codeNames = new StringBuilder();
				for(String key : CodeValues){
					codeNames.append((String) ((Map) localObject).get(key))
					  .append(",");
				}
				str1 = codeNames.substring(0, codeNames.length() - 1);
			}else{
				str1 = (String) ((Map) localObject).get(paramObject.toString());
			}
//			str1 = (String) ((Map) localObject).get(paramObject.toString());
		}else if ((str2 != null) && (!(str2.equals("")))) {
			if ((paramObject instanceof Date)
					|| (paramObject instanceof Timestamp)
					|| (str2.indexOf("yyyy") > -1)) {
				localObject = new SimpleDateFormat(str2);
				try {
					paramObject = Long.valueOf(paramObject.toString());
					str1 = ((SimpleDateFormat) localObject).format(paramObject);
				} catch (NumberFormatException localNumberFormatException1) {
					str1 = ((SimpleDateFormat) localObject).format(paramObject);
				}
			} else if ((paramObject instanceof Number)
					|| (str2.startsWith("#"))) {
				localObject = new DecimalFormat();
				
				((DecimalFormat) localObject).applyPattern(str2);
				try {
					BigDecimal bd = new BigDecimal(paramObject.toString());
					str1 = ((DecimalFormat) localObject).format(bd);
				} catch (NumberFormatException localNumberFormatException2) {
					// LogFactory.getLog(SystemConfig.logCatagroy).warn(
					// "数字类型格式化错误");
					str1 = paramObject.toString();
				}
			}
		} else {
			str1 = paramObject.toString();
		}
		if (str1 != null) {
			if (str1.contains("\n") || str1.contains("\r")) {
				str1 = str1.replace("\n", " ");
				str1 = str1.replace("\r", " ");
			}
		}
		StringBuilder sb = new StringBuilder();
		if (str1 != null) {
			if (type.equals("csv")) {
				Pattern pat = Pattern.compile("\\d{1}[\\d-/.]*");
				Matcher matcher = pat.matcher(str1);
				if (matcher.matches()) {
					sb.append("=");
				}
				sb.append("\"").append(str1).append("\"");
			} else {
				sb.append(str1);
			}
		}
		return sb.toString();
	}
}
