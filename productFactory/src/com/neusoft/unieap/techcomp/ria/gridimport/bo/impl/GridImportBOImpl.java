/**
 * 
 */
package com.neusoft.unieap.techcomp.ria.gridimport.bo.impl;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.hibernate.validator.engine.ConstraintViolationImpl;
import org.springframework.stereotype.Service;

import com.neusoft.unieap.core.annotation.ModelFile;
import com.neusoft.unieap.core.common.bo.context.BOContext;
import com.neusoft.unieap.core.common.bo.context.impl.BOContextImpl;
import com.neusoft.unieap.core.common.form.Form;
import com.neusoft.unieap.core.exception.UniEAPBusinessException;
import com.neusoft.unieap.core.fileupload.FileAttachment;
import com.neusoft.unieap.core.util.BeanUtil;
import com.neusoft.unieap.core.validation.BeanValidatorFactory;
import com.neusoft.unieap.techcomp.ria.gridimport.ErrorMessage;
import com.neusoft.unieap.techcomp.ria.gridimport.ImportData;
import com.neusoft.unieap.techcomp.ria.gridimport.bo.GridImportBO;
import com.neusoft.unieap.techcomp.ria.gridimport.util.JsonDateValueProcessor;
import com.neusoft.unieap.techcomp.ria.gridimport.util.MessagesUtil;
import com.neusoft.unieap.techcomp.ria.gridimport.validation.GridImportValidation;
import com.neusoft.unieap.techcomp.ria.util.GMT;

/**
 * @author wu.zb
 * 
 */
@Service("gridImportBO.bo")
@ModelFile(value = "gridImportBO.bo")
public class GridImportBOImpl implements GridImportBO {
	
//	private GridImportDAO gridImportDAO;
//
//	public void setGridImportDAO(GridImportDAO gridImportDAO) {
//		this.gridImportDAO = gridImportDAO;
//	}

	public InputStream getFormFileInputStream(Form form) {
		List list = form.getFiles();
		InputStream is = null;
		if (list == null || list.size() == 0) {
			throw new UniEAPBusinessException("EAPTECHRIA1007");
		}
		long size = ((FileAttachment) list.get(0)).getSize();
		if (size == 0) {
			throw new UniEAPBusinessException("EAPTECHRIA1008");
		}
		is = ((FileAttachment) list.get(0)).getInputStream();
		return is;
	}

	/**
	 * {@inheritDoc} 获取标题信息
	 */
	public BOContext getImportMessage(Form form, String dataTypeCells,
			String sheetId, String configImformation) {
		BOContext bc = new BOContextImpl();
		List<ErrorMessage> errorMessageList = new ArrayList<ErrorMessage>();
		List pojoList = new ArrayList();

		if (sheetId == null || sheetId.equals("")||sheetId.equals("null")) {
			throw new UniEAPBusinessException("EAPTECHRIA1022");
		}

		// 存放excel中的列名返回到前台
		Map<String, String> excelLabels = new HashMap<String, String>();

		InputStream is = getFormFileInputStream(form);
		HSSFWorkbook wb = null;
		try {
			wb = new HSSFWorkbook(is);
		} catch (IOException e) {
			throw new UniEAPBusinessException("EAPTECHRIA1009");
		}
		if (wb != null) {
			HSSFSheet sheet = wb.getSheetAt(Integer.parseInt(sheetId));
			if (sheet.getLastRowNum() == 0) {
				throw new UniEAPBusinessException("EAPTECHRIA1021");
			}
			int lastRowNum = sheet.getLastRowNum() + 1;
			boolean flag = false;
			int num = 0;
			// 不是加载按钮获取的是自动匹配的信息
			if (configImformation == null || configImformation.equals("")) {
				Map<String, String> labelMap = new HashMap<String, String>();
				JSONArray layoutJSON = JSONArray.fromObject(dataTypeCells);
				for (int i = 0; i < layoutJSON.size(); i++) {
					JSONObject lay = layoutJSON.getJSONObject(i);
					String label = lay.getString("label");
					labelMap.put(label, lay.getString("name"));
				}
				for (int j = 0; j < lastRowNum; j++) {
					HSSFRow row = sheet.getRow(j);
					if (row == null) {
						continue;
					}
					int lastCellNum = row.getLastCellNum();
					for (int i = 0; i < lastCellNum; i++) {
						HSSFCell cell = row.getCell(i);
						if (cell != null) {
							cell.setCellType(Cell.CELL_TYPE_STRING);
							if (cell.getStringCellValue() != null) {
								String cellString = cell.getStringCellValue()
										.toString();
								try {
									if (!flag
											&& !labelMap.get(cellString)
													.equals("")) {
										flag = true;
										bc.put("labelRow", j + 1);
										bc.put("labelCell", i + 1);
										bc.put("labelEndCell", lastCellNum);
										bc.put("dataStartRow", j + 2);
										bc.put("dataEndRow", lastRowNum);
									}
									if (flag) {
										excelLabels.put(String.valueOf(num),
												cellString);
										num++;
									}
								} catch (Exception e) {
									continue;
								}
							} else {
								if (flag) {
									excelLabels.put(String.valueOf(num), "");
									num++;
								}
							}
						}
					}
					if (flag) {
						break;
					}
				}
			} else {
				JSONObject config = JSONObject.fromObject(configImformation);
				int labelRowSpinner = Integer.parseInt(config
						.getString("labelRowSpinner")) - 1;
				int labelStartCellSpinner = Integer.parseInt(config
						.getString("labelStartCellSpinner")) - 1;
				int labelEndCellSpinner = Integer.parseInt(config
						.getString("labelEndCellSpinner")) - 1;

				HSSFRow row = sheet.getRow(labelRowSpinner);
				if (row == null) {
					throw new UniEAPBusinessException("EAPTECHRIA1019");
				}
				for (int i = labelStartCellSpinner; i <= labelEndCellSpinner; i++) {
					HSSFCell cell = row.getCell(i);
					if (cell != null) {
						String ret = null;
						if(cell.getCellType() == Cell.CELL_TYPE_NUMERIC){
							if (DateUtil.isCellDateFormatted(cell)) {
								Date theDate = cell.getDateCellValue();
								ret = String.valueOf(theDate.toLocaleString());
							} else {
								ret = NumberToTextConverter.toText(cell.getNumericCellValue());
							}
						}
						cell.setCellType(Cell.CELL_TYPE_STRING);
						if (cell.getStringCellValue() != null) {
							String cellString = ret==null?cell.getStringCellValue():ret;
							excelLabels.put(String.valueOf(num), cellString);
							num++;
						} else {
							if (flag) {
								excelLabels.put(String.valueOf(num), "");
								num++;
							}
						}
					}
				}
				bc.put("dataStartRow", labelRowSpinner + 2);
				bc.put("dataEndRow", lastRowNum);
			}
		}
		bc.put("excelLabels", excelLabels);
		return bc;
	}

	/**
	 * {@inheritDoc} 获取sheet页
	 */
	public Map<String,String> getSheets(Form form) {
		BOContext bc = new BOContextImpl();
		List list = form.getFiles();
		Map<String,String> listSheetName=new HashMap<String,String>();
		if (list == null || list.size() == 0) {
			throw new UniEAPBusinessException("EAPTECHRIA1007");
		}
		long size = ((FileAttachment) list.get(0)).getSize();
		if (size == 0) {
			throw new UniEAPBusinessException("EAPTECHRIA1008");
		}
		InputStream is = null;
		is = ((FileAttachment) list.get(0)).getInputStream();
		HSSFWorkbook wb = null;
		try {
			wb = new HSSFWorkbook(is);
		} catch (IOException e) {
			throw new UniEAPBusinessException("EAPTECHRIA1009");
		}
		if (wb != null) {
			for (int i = 0; i < wb.getNumberOfSheets(); i++) {
//				listSheetName.add(wb.getSheetAt(i).getSheetName());
				listSheetName.put(i + "", wb.getSheetAt(i).getSheetName());
			}
		}
		return listSheetName;
	}

	/**
	 * {@inheritDoc}获取EXCEL信息
	 */
	public BOContext getDataByFileUrl(Form form, String data) {
		JSONObject dataObject = JSONObject.fromObject(data);
		String rowSetName = dataObject.getString("rowSetName");
		String sheetId = dataObject.getString("sheetId");
		String viewModelId = dataObject.getString("customBeanName");
		String uniqueCells = dataObject.getString("uniqueCells");
		String rowSet = dataObject.getString("orginRowSet");
		String dataTypeCells = dataObject.getString("dataTypeCells");
		int import_maxLength = dataObject.getInt("import_maxLength");
		boolean advance_Flag = dataObject.getBoolean("advanceFlag");
		String configNum = advance_Flag ? dataObject.getString("configNum")
				: null;
		String advanceConfig = advance_Flag ? dataObject
				.getString("advanceConfig") : null;
		
		ImportData importData = new ImportData();
		List<ErrorMessage> errorMessageList = new ArrayList<ErrorMessage>();
		List pojoList = new ArrayList();

		if (sheetId == null || sheetId.equals("")||sheetId.equals("null")) {
			throw new UniEAPBusinessException("EAPTECHRIA1022");
		}
		InputStream is = getFormFileInputStream(form);

		String[] uniCells = null;
		if (uniqueCells != null && !uniqueCells.equals("null")) {
			JSONArray uniqueCellsJSON = JSONArray.fromObject(uniqueCells);
			if (uniqueCellsJSON != null) {
				uniCells = new String[uniqueCellsJSON.size()];
				for (int i = 0; i < uniqueCellsJSON.size(); i++) {
					uniCells[i] = uniqueCellsJSON.getString(i);
				}
			}
		}

		// 记录旧数据出现覆盖时用新数据替换
		JSONArray rowSetJSON = JSONArray.fromObject(rowSet);
		Map<String, String> excelToOrginId = new HashMap<String, String>();// 覆盖时Excel数据序列号对于的旧数据序列号

		// 记录Excel中每一行的数据状态，覆盖：cover、增加：add、错误：error
		Map<String, String> stateMap = new HashMap<String, String>();
		//decoder的一个map：label<---->decoder
		Map<String,String> decoderMap = new HashMap<String,String>();
		Map<String,String> formatMap = new HashMap<String,String>();
		Map<String, String> labelMap = new HashMap<String, String>();
		List<String> labels = new ArrayList<String>();
		Map<String, Object> dataTypeMap = new HashMap<String, Object>();
		JSONArray layoutJSON = JSONArray.fromObject(dataTypeCells);
		for (int i = 0; i < layoutJSON.size(); i++) {
			JSONObject lay = layoutJSON.getJSONObject(i);
			String label = lay.getString("label");
			String decoder = lay.getString("decoder");
			decoderMap.put(lay.getString("name"), decoder);
			labels.add(label);
			labelMap.put(label, lay.getString("name"));
			dataTypeMap.put(label, lay.get("dataType"));
			formatMap.put(label, lay.getString("format"));
		}
		// 定义一组读取excel的数据
		int labelRowSpinner = 0;// 标题行
		int labelStartCellSpinner = 0;// 标题开始列
		int labelEndCellSpinner = 0;// 标题结束行
		int dataStartRowSpinner = 1;// 数据开始行
		int dataEndRowSpinner = 0; // 数据结束行

		// 高级配置信息读取
		JSONObject configSpinner = null;
		boolean advanceFlag = false;// 是否高级配置
		if (configNum != null && !configNum.equals("") && advanceConfig != null
				&& !advanceConfig.equals("")) {
			advanceFlag = true;
			configSpinner = JSONObject.fromObject(configNum);
			Map<String, String> label_Map = new HashMap<String, String>();
			List<String> _labels = new ArrayList<String>();
			Map<String, Object> dataType_Map = new HashMap<String, Object>();
			labelRowSpinner = configSpinner.getInt("labelRowSpinner") - 1;
			labelStartCellSpinner = configSpinner
					.getInt("labelStartCellSpinner") - 1;
			labelEndCellSpinner = configSpinner.getInt("labelEndCellSpinner") - 1;
			dataStartRowSpinner = configSpinner.getInt("dataStartRowSpinner") - 1;
			dataEndRowSpinner = configSpinner.getInt("dataEndRowSpinner") - 1;

			JSONArray configs = JSONArray.fromObject(advanceConfig);
			for (int n = 0; n < configs.size(); n++) {
				JSONObject config = configs.getJSONObject(n);
				Object excelLabel = config.get("excelLabel");
				if (excelLabel != null && !excelLabel.equals("")
						&& !excelLabel.toString().equals("null")) {
					label_Map.put(excelLabel.toString(), labelMap.get(config
							.getString("gridLabel")));
					_labels.add(excelLabel.toString());
					dataType_Map.put(excelLabel.toString(), dataTypeMap
							.get(config.getString("gridLabel")));
				}
			}
			labels = _labels;
			labelMap = label_Map;
			dataTypeMap = dataType_Map;
		}
		try {
			HSSFWorkbook wb = null;
			try {
				wb = new HSSFWorkbook(is);
			} catch (IOException e) {
				throw new UniEAPBusinessException("EAPTECHRIA1009");
			}
			if (wb != null) {
				HSSFSheet sheet = wb.getSheetAt(Integer.parseInt(sheetId));
				int maxRowNum = sheet.getLastRowNum();
				if (maxRowNum == 0) {
					throw new UniEAPBusinessException("EAPTECHRIA1021");
				}
				if(maxRowNum>import_maxLength){
					throw new UniEAPBusinessException("EAPTECHRIA1020");
				}
				HSSFRow firstRow;
				String[] firstRowContext;
				int firstrowNum;
				try {
					firstRow = sheet.getRow(labelRowSpinner);
					firstrowNum = advanceFlag ? labelEndCellSpinner
							- labelStartCellSpinner : firstRow.getLastCellNum();
					firstRowContext = new String[firstrowNum + 1];
				} catch (Exception e) {
					throw new UniEAPBusinessException("EAPTECHRIA1010");
				}
				if (!advanceFlag && sheet.getLastRowNum() == 0) {
					throw new UniEAPBusinessException("EAPTECHRIA1021");
				}
				if (!advanceFlag && labels.size() != firstrowNum) {
					throw new UniEAPBusinessException("EAPTECHRIA1016");
				}
				// 基本导入时读取Excel第一行数据，必须和grid一一对应
				// 复杂导入则不需要
				int labelLength = advanceFlag ? labelEndCellSpinner : firstRow
						.getLastCellNum()-1;
				for (int k = labelStartCellSpinner; k <=labelLength; k++) {
					Cell cell = firstRow.getCell(k);
					if (cell != null) {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						if (cell.getStringCellValue() != null) {
							int labelContextIndex = k - labelStartCellSpinner;
							String cellString = cell.getStringCellValue()
									.toString();
							if (!advanceFlag) {
								if (labels.get(labelContextIndex).equals(
										cellString)) {
									firstRowContext[labelContextIndex] = cellString;
								} else {
									throw new UniEAPBusinessException(
											"EAPTECHRIA1016");
								}
							} else {
								String importLabel = getValueFormMap(labelMap,
										cellString);
								if (importLabel != null) {
									firstRowContext[labelContextIndex] = cellString;
								}
							}
						} else {
							throw new UniEAPBusinessException("EAPTECHRIA1016");
						}
					} else {
						if (!advanceFlag) {
							throw new UniEAPBusinessException("EAPTECHRIA1016");
						}
					}
				}

				// 处理JSONObject日期类型set对象出错问题
				JsonConfig jsonConfig = new JsonConfig(); // JsonConfig是net.sf.json.JsonConfig中的这个，为固定写法
				jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
						new JsonDateValueProcessor());
				// 读取Excel
				int rowNum = advanceFlag ? dataEndRowSpinner + 1 : sheet
						.getLastRowNum() + 1;
				for (int j = dataStartRowSpinner; j < rowNum; j++) {
					Object obj = Class.forName(rowSetName).newInstance();
					HSSFRow row = sheet.getRow(j);
					// pojolist的行数是按0开始算的，最后对于errormessager中的行数是从0开始的，校验接口中errormessage和pojolist的行数一致
					int pojoListRowNumber = j - dataStartRowSpinner;
					if (row == null) {
						throw new UniEAPBusinessException("EAPTECHRIA1018");
					}
					boolean flag = true;
					for (int i = labelStartCellSpinner; i <= firstrowNum; i++) {
						HSSFCell cell = row.getCell(i);
						String cellValue = "";
						int labelContextIndex = i - labelStartCellSpinner;
						String labelContextValue = firstRowContext[labelContextIndex];
						String thisName = getValueFormMap(labelMap,
								labelContextValue);
						if (thisName != null) {
							if (cell != null) {
								List<String> cellMessage = getCellValue(cell,
										dataTypeMap.get(labelContextValue)
												.toString());
								cellValue = cellMessage.get(0);
								if (cellMessage.get(2).equals("true")
										&& !cellValue.equals("")
										&& dataTypeMap.get(labelContextValue)
												.toString().equals("date")) {
									String format = formatMap.get(labelContextValue);
									Format f = new SimpleDateFormat(
											!format.equals("")?format:"yyyy-MM-dd");
									Date d;
									try {
										d = (Date) f.parseObject(cellValue);
									} catch (ParseException e) {
										flag = false;
										ErrorMessage errorMessage = new ErrorMessage();
										errorMessage
												.setRowNum(pojoListRowNumber);
										errorMessage.setCellName(thisName);
										errorMessage
												.setOriginalValue(cellValue);
										errorMessage.setMessage("数据类型错误");
										errorMessageList.add(errorMessage);
										continue;
									}
									cellValue = String.valueOf(Long.valueOf(d
											.getTime()));
								}
								if (cellMessage.get(1).equals("true")) {
									flag = false;
									ErrorMessage errorMessage = new ErrorMessage();
									errorMessage.setRowNum(pojoListRowNumber);
									errorMessage.setCellName(thisName);
									errorMessage.setOriginalValue(cellValue);
									errorMessage.setMessage("数据类型错误");
									errorMessageList.add(errorMessage);
									continue;
								}
							}
							try {
								//codelist处理
								String _decoder = decoderMap.get(thisName);
								if(!_decoder.equals("{}") && cellValue != null && !cellValue.equals("")){
									JSONObject dec = JSONObject.fromObject(_decoder);
									String valueAttr = dec.getString("valueAttr");
									String displayAttr = dec.getString("displayAttr");
									JSONArray store = dec.getJSONArray("store");
									for(int p=0;p<store.size();p++){
										JSONObject d = store.getJSONObject(p);
										if(d.getString(displayAttr).equalsIgnoreCase(cellValue)){
											cellValue = d.getString(valueAttr);
										}
									}
								}
								// 处理数据类型，并强制转换后放入到一个pojo中，返回该对象
								doSetProperty(obj, cellValue, thisName);
							} catch (Exception e) {// 错误数据不需要唯一校验
								flag = false;
								ErrorMessage errorMessage = new ErrorMessage();
								errorMessage.setRowNum(pojoListRowNumber);
								errorMessage.setCellName(thisName);
								errorMessage.setOriginalValue(thisName);
								errorMessage.setMessage("数据类型错误");
								errorMessageList.add(errorMessage);
							}
						}
					}
					// 唯一性检验处理，返回一个map类型记录状态，覆盖：cover、增加：add、错误：error
					int num = uniqueValidate(uniCells, obj, rowSetJSON);
					if (num != -1) {
						if (excelToOrginId.containsValue(num + "")) {
							throw new UniEAPBusinessException(
									"EAPTECHRIA1017");
						}
						stateMap.put(String.valueOf(pojoListRowNumber),
								"cover");
						excelToOrginId.put(String
								.valueOf(pojoListRowNumber), num + "");
					} else {
						stateMap.put(String.valueOf(pojoListRowNumber),
								"add");
					}
					pojoList.add(obj);
				}
			}
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		importData.setPojoList(pojoList);
		importData.setErrorMessageList(errorMessageList);
		importData.setValidationContinue(true);

		Object obj = null;
		obj = BeanUtil.getBean(viewModelId);
		importData = ((GridImportValidation) obj).beforeValidate(importData);
		if (importData.getValidationContinue()) {
			validation(importData);
			importData = ((GridImportValidation) obj).afterValidate(importData);
		}

		Iterator errorMessageIt = importData.getErrorMessageList().iterator();
//		Iterator orginCoverIndex = excelToOrginId.values().iterator();
//		List coverIndex = new ArrayList();
//		while (orginCoverIndex.hasNext()) {
//			coverIndex.add(orginCoverIndex.next());
//		}

		BOContext bct = new BOContextImpl();
		bct.put("pojoList", importData.getPojoList());
		bct.put("errorMessageList", importData.getErrorMessageList());
		bct.put("stateMap", stateMap);
		bct.put("excelToOrginId", excelToOrginId);
		return bct;
	}

	/**
	 * {@inheritDoc} 二次校验
	 */
	public BOContext validationModifed(String data) {
		JSONObject dataObject = JSONObject.fromObject(data);
		String rowSetName = dataObject.getString("rowSetName");
		String newRowSet = dataObject.getString("newRowSet");
		String customBeanName = dataObject.getString("customBeanName");
		String uniqueCells = dataObject.getString("uniqueCells");
		String orginRowSet = dataObject.getString("orginRowSet");
		String dataTypeCells = dataObject.getString("dataTypeCells");

		ImportData importData = new ImportData();
		List<ErrorMessage> errorMessageList = new ArrayList<ErrorMessage>();
		List pojoList = new ArrayList();

		// 读取唯一性校验数据
		String[] uniCells = null;
		if (uniqueCells != null && !uniqueCells.equals("null")) {
			JSONArray uniqueCellsJSON = JSONArray.fromObject(uniqueCells);
			if (uniqueCellsJSON != null) {
				uniCells = new String[uniqueCellsJSON.size()];
				for (int i = 0; i < uniqueCellsJSON.size(); i++) {
					uniCells[i] = uniqueCellsJSON.getString(i);
				}
			}
		}

		// 记录旧数据出现覆盖时用新数据替换
		JSONArray rowSetJSON = JSONArray.fromObject(orginRowSet);
		Map<String, String> excelToOrginId = new HashMap<String, String>();// 覆盖时Excel数据序列号对于的旧数据序列号

		// 记录Excel中每一行的数据状态，覆盖：cover、增加：add、错误：error
		Map<String, String> stateMap = new HashMap<String, String>();
		//decoder的一个map：label<---->decoder
		Map<String,String> decoderMap = new HashMap<String,String>();
		Map<String, String> labelMap = new HashMap<String, String>();
		List<String> labels = new ArrayList<String>();
		Map<String, Object> dataTypeMap = new HashMap<String, Object>();
		JSONArray layoutJSON = JSONArray.fromObject(dataTypeCells);
		for (int i = 0; i < layoutJSON.size(); i++) {
			JSONObject lay = layoutJSON.getJSONObject(i);
			String label = lay.getString("label");
			labels.add(label);
			String decoder = lay.getString("decoder");
			decoderMap.put(lay.getString("name"), decoder);
			labelMap.put(label, lay.getString("name"));
			dataTypeMap.put(label, lay.get("dataType"));
		}

		// 处理JSONObject日期类型set对象出错问题
		JsonConfig jsonConfig = new JsonConfig(); // JsonConfig是net.sf.json.JsonConfig中的这个，为固定写法
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,
				new JsonDateValueProcessor());
		JSONArray newRowSetJSON = JSONArray.fromObject(newRowSet);
		int newDatalength = newRowSetJSON.size();
		for (int j = 0; j < newDatalength; j++) {
			Object obj;
			try {
				obj = Class.forName(rowSetName).newInstance();
				boolean flag = true;
				JSONObject objJSON = JSONObject
						.fromObject(newRowSetJSON.get(j));
				Iterator names = labelMap.values().iterator();
				while (names.hasNext()) {
					String thisName = names.next().toString();
					String thisValue = null;
					if(objJSON.containsKey(thisName)){
						thisValue = objJSON.getString(thisName);
					}
					try {
						//codelist处理
						String _decoder = decoderMap.get(thisName);
						if(!_decoder.equals("{}") && thisValue != null && !thisValue.equals("")){
							JSONObject dec = JSONObject.fromObject(_decoder);
							String valueAttr = dec.getString("valueAttr");
							String displayAttr = dec.getString("displayAttr");
							JSONArray store = dec.getJSONArray("store");
							for(int p=0;p<store.size();p++){
								JSONObject d = store.getJSONObject(p);
								if(d.getString(displayAttr).equalsIgnoreCase(thisValue)){
									thisValue = d.getString(valueAttr);
								}
							}
						}
						// 处理数据类型，并强制转换后放入到一个pojo中，返回该对象
						doSetProperty(obj, thisValue, thisName);
					} catch (Exception e) {// 错误数据不需要唯一校验
						flag = false;
						ErrorMessage errorMessage = new ErrorMessage();
						errorMessage.setRowNum(j);
						errorMessage.setCellName(thisName);
						errorMessage.setOriginalValue(thisName);
						errorMessage.setMessage("数据类型错误");
						errorMessageList.add(errorMessage);
					}
				}
				// 唯一性检验处理，返回一个map类型记录状态，覆盖：cover、增加：add、错误：error
				int num = uniqueValidate(uniCells, obj, rowSetJSON);
				if (num != -1) {
					if (excelToOrginId.containsValue(String.valueOf(num))) {
						throw new UniEAPBusinessException("EAPTECHRIA1017");
					}
					stateMap.put(String.valueOf(j), "cover");
					excelToOrginId.put(String.valueOf(j), String.valueOf(num));
				} else {
					stateMap.put(String.valueOf(j), "add");
				}
				pojoList.add(obj);
			} catch (InstantiationException e1) {
				e1.printStackTrace();
			} catch (IllegalAccessException e1) {
				e1.printStackTrace();
			} catch (ClassNotFoundException e1) {
				e1.printStackTrace();
			}
		}

		importData.setPojoList(pojoList);
		importData.setErrorMessageList(errorMessageList);
		importData.setValidationContinue(true);

		Object obj = null;
		obj = BeanUtil.getBean(customBeanName);
		importData = ((GridImportValidation) obj).beforeValidate(importData);
		if (importData.getValidationContinue()) {
			validation(importData);
			importData = ((GridImportValidation) obj).afterValidate(importData);
		}

		// 最后处理，如果有的行数被用户自定义校验或者自动校验认为是错误数据，就把stateMap中的行数变成error并还原原始值
		Iterator orginCoverIndex = excelToOrginId.values().iterator();
		List coverIndex = new ArrayList();
		while (orginCoverIndex.hasNext()) {
			coverIndex.add(orginCoverIndex.next());
		}

		BOContext bct = new BOContextImpl();
		bct.put("pojoList", importData.getPojoList());
		bct.put("errorMessageList", importData.getErrorMessageList());
		bct.put("stateMap", stateMap);
		bct.put("excelToOrginId", excelToOrginId);
		return bct;
	}

	/*
	 * 自动校验处理
	 */
	public ImportData validation(ImportData importData) {
//		List pojoList = importData.getPojoList();
//		List errorMessageList = importData.getErrorMessageList();
//		Iterator it = pojoList.iterator();
//		int num = 0;
//		while (it.hasNext()) {
//			Object obj = it.next();
//			Set errors = BeanValidatorFactory.getBeanValidator().getValidator()
//					.validate(obj);
//			Iterator itobj = errors.iterator();
//			while (itobj.hasNext()) {
//				ConstraintViolationImpl cv = (ConstraintViolationImpl) itobj
//						.next();
//				String property = cv.getPropertyPath().toString();
//				ErrorMessage em = new ErrorMessage();
//				em.setRowNum(num);
//				em.setCellName(property);
//				em.setMessage(MessagesUtil.getExceptionMessage(cv));
//				try {
//					Class clazz = PropertyUtils.getPropertyType(obj, property);
//					Object value = PropertyUtils.getProperty(obj, property);
//					if (clazz == Date.class
//							|| clazz.getSuperclass() == Date.class) {
//						value = ((new java.text.SimpleDateFormat(
//								"yyyy-MM-dd HH:mm:ss")).format(value));
//					}
//					em.setOriginalValue(value.toString());
//				} catch (Exception e) {
//					em.setOriginalValue("");
//				}
//				errorMessageList.add(em);
//			}
//			num++;
//		}
		return importData;
	}

	/*
	 * 唯一性校验,如果是覆盖，返回原有数据的序列号
	 */
	public int uniqueValidate(String[] uniCells, Object obj,
			JSONArray rowSetJSON) {
		if (rowSetJSON != null && uniCells != null) {
			for (int i = 0; i < rowSetJSON.size(); i++) {
				JSONObject oldObj = rowSetJSON.getJSONObject(i);
				for (int j = 0; j < uniCells.length; j++) {
					Object bindingValue = oldObj.get(uniCells[j]);
					try {
						Object excelValue = PropertyUtils.getProperty(obj,
								uniCells[j]);
						if (excelValue != null
								&& bindingValue != null
								&& bindingValue.toString().equals(
										excelValue.toString())) {
						} else {
							break;
						}
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					} catch (NoSuchMethodException e) {
						e.printStackTrace();
					}
					if (j == uniCells.length - 1) {
						return i;
					}
				}
			}
		}
		return -1;
	}

	public void doSetProperty(Object obj, String value, String propertyName)
			throws Exception {
		if (value == null || value.equals("null") || value.equals("")) {
			return;
		}
		// 支持嵌套pojo
		if (propertyName.indexOf(".") > 0) {
			String subName = propertyName.substring(0, propertyName.indexOf("."));
			// 获得嵌套pojo
			Object subObj = PropertyUtils.getProperty(obj, subName);
			if (subObj == null) {
				subObj =  PropertyUtils.getPropertyType(obj, subName).newInstance();
				PropertyUtils.setProperty(obj, subName, subObj);
			}
			doSetProperty(subObj, value, propertyName.substring(propertyName.indexOf(".") + 1));
		}
		Class clazz = PropertyUtils.getPropertyType(obj, propertyName);
		if (clazz == String.class) {
			PropertyUtils.setProperty(obj, propertyName, value);
		} else if (clazz == int.class) {
			PropertyUtils.setProperty(obj, propertyName, Integer
					.parseInt(value));
		} else if (clazz == byte.class) {
			PropertyUtils.setProperty(obj, propertyName, Byte.parseByte(value));
		} else if (clazz == long.class) {
			PropertyUtils.setProperty(obj, propertyName, Long.parseLong(value));
		} else if (clazz == short.class) {
			PropertyUtils.setProperty(obj, propertyName, Short
					.parseShort(value));
		} else if (clazz == double.class) {
			PropertyUtils.setProperty(obj, propertyName, Double
					.parseDouble(value));
		} else if (clazz == float.class) {
			PropertyUtils.setProperty(obj, propertyName, Double
					.parseDouble(value));
		} else if (clazz == byte.class) {
			PropertyUtils.setProperty(obj, propertyName, Byte.parseByte(value));
		} else if (clazz == boolean.class || clazz == Boolean.class) {// boolean需要考虑codevalue和codename，暂时预留，待解决
			PropertyUtils.setProperty(obj, propertyName, Boolean
					.parseBoolean(value));
		} else if (clazz == Date.class || clazz.getSuperclass() == Date.class) {
			PropertyUtils.setProperty(obj, propertyName, clazz.getConstructor(
					new Class[] { long.class }).newInstance(
					new Object[] { Long.valueOf(GMT.fromGMTToCST(
							((Long.valueOf(value))).longValue()).getTime()) }));
		} else if (clazz.getSuperclass() == Number.class) {
			if (clazz == Integer.class) {
				PropertyUtils.setProperty(obj, propertyName, Integer
						.parseInt(value));
			} else if (clazz == Byte.class) {
				PropertyUtils.setProperty(obj, propertyName, Byte
						.parseByte(value));
			} else if (clazz == Long.class) {
				PropertyUtils.setProperty(obj, propertyName, Long
						.parseLong(value));
			} else if (clazz == Short.class) {
				PropertyUtils.setProperty(obj, propertyName, Short
						.parseShort(value));
			} else if (clazz == Double.class) {
				PropertyUtils.setProperty(obj, propertyName, Double
						.parseDouble(value));
			} else if (clazz == Float.class) {
				PropertyUtils.setProperty(obj, propertyName, Float
						.parseFloat(value));
			} else if (clazz == BigDecimal.class) {
				PropertyUtils.setProperty(obj, propertyName, new BigDecimal(
						value));
			}
		}
	}

	public List<String> getCellValue(Cell cell, String label) {
		String ret;
		List<String> cellMessage = new ArrayList<String>();
		String dateFlag = "false";
		boolean isStringType = false;
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_BLANK:
			ret = "";
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			ret = String.valueOf(cell.getBooleanCellValue());
			break;
		case Cell.CELL_TYPE_ERROR:
			// ret = null;
			ret = "";
			break;
		case Cell.CELL_TYPE_FORMULA:
			Workbook wb = cell.getSheet().getWorkbook();
			CreationHelper crateHelper = wb.getCreationHelper();
			FormulaEvaluator evaluator = crateHelper.createFormulaEvaluator();
			ret = getCellValue(evaluator.evaluateInCell(cell), "").get(0);
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if (DateUtil.isCellDateFormatted(cell)) {
				Date theDate = cell.getDateCellValue();
				ret = String.valueOf(theDate.getTime());
			} else {
				if (label.equals("date")) {
					dateFlag = "true";
				}
				ret = NumberToTextConverter.toText(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_STRING:
			ret = cell.getRichStringCellValue().getString();
			isStringType = true;
			break;
		default:
			// ret = null;
			ret = "";
		}
		cellMessage.add(ret.trim());
		cellMessage.add(dateFlag);
		cellMessage.add(String.valueOf(isStringType));
		return cellMessage;
	}

	// 返回map中的数据（map没有回抛出异常）
	public String getValueFormMap(Map<String, String> m, String value) {
		try {
			return m.get(value);
		} catch (Exception e) {
			return null;
		}
	}
	
//	public void saveImportConfig(String configInfo,String cmpPath,String userAccount,String cmpID ){
//		GridImportConfig importConfig = new GridImportConfig();
//		importConfig.setCmpId(cmpID);
//		importConfig.setContent(configInfo);
//		importConfig.setPath(cmpPath);
//		importConfig.setUserId(userAccount);
//		gridImportDAO.saveImportConfig(importConfig);
//	}
//	
//	public String getImportConfig(String cmpPath,String userAccount,String cmpID ){
//		return gridImportDAO.getImportConfig(cmpPath, userAccount, cmpID);
//	}
}
