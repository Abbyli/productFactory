/**
 * 
 */
package com.neusoft.abclife.productfactory.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.neusoft.abclife.productfactory.entity.SysAsyncExecuteResult;
import com.neusoft.fdframework.core.base.BaseDao;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Component("factoryabclife_pfUploadManageDao_dao")
@ModelFile(value = "pfUploadManageDao.dao")
public class PfUploadManageDaoImpl extends BaseDao {

	protected String getTemplateName() {
		return "dataSource";
	}

	/**
	 * 
	 */
	public PfUploadManageDaoImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public List<SysAsyncExecuteResult> getAllSysAsyncExecuteResult(){
		String sql="select * from Sys_Async_Execute_Result order by execute_time desc";
		List<SysAsyncExecuteResult> list = this.queryForList(SysAsyncExecuteResult.class, sql);
		return list;
	}
}
