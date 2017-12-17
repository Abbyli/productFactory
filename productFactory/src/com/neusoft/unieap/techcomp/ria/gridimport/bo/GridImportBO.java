/**
 * 
 */
package com.neusoft.unieap.techcomp.ria.gridimport.bo;

import java.util.List;
import java.util.Map;

import com.neusoft.unieap.core.common.bo.context.BOContext;
import com.neusoft.unieap.core.common.form.Form;

/**
 * @author wuzb
 *
 */  
public interface GridImportBO {
	
	/**  
	 * 通过Excel文件路径获取sheet页
	 * @param form
	 * @return 
	 */
	public Map<String,String> getSheets(Form form);
	
	/**  
	 * 通过Excel文件路径获取数据
	 * @param form
	 * @param data 封装了需要的数据 ：dataTypeCells dataType的信息
	 *      					    rowSetName 列数据类型
	 *                              uniqueCells 唯一性校验
	 *                              rowSet 原数据
	 *                              sheetId sheet页
	 *                              viewModelId 配置bean的id
	 *       
	 */
	public BOContext getDataByFileUrl(Form form, String data);
	
	/**  
	 * 复杂导入自动获得导入信息
	 * @param form
	 * @param dataTypeCells dataType的信息
	 * @param sheetId sheet页
	 * @return 
	 */
	public BOContext getImportMessage(Form form, String dataTypeCells,String sheetId, String configImformation);
	
	/**  
	 * 复杂导入自动获得导入信息
	 * @param data数据
	 * @return 
	 */
	public BOContext validationModifed(String data);
	
//	/**  
//	 * 保存高级导入配置信息
//	 * @param configInfo 配置数据
//	 * @param cmpPath cmp的路径
//	 * @param userAccount 用户
//	 * @param cmpID cmp的id
//	 * @return 
//	 */
//	public void saveImportConfig(String configInfo,String cmpPath,String userAccount,String cmpID );
//	
//	/**  
//	 * 保存高级导入配置信息
//	 * @param cmpPath cmp的路径
//	 * @param userAccount 用户
//	 * @param cmpID cmp的id
//	 * @return 
//	 */
//	public String getImportConfig(String cmpPath,String userAccount,String cmpID );
}
