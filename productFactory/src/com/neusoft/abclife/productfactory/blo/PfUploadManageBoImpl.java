/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfUploadManageDaoImpl;
import com.neusoft.abclife.productfactory.entity.SysAsyncExecuteResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author shi.chl
 *
 */
@Service("factoryabclife_pfUploadManageBo_bo")
@ModelFile(value = "pfUploadManageBo.bo")
public class PfUploadManageBoImpl {

	/**
	 * 
	 */
	public PfUploadManageBoImpl() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="factoryabclife_pfUploadManageDao_dao")
	private PfUploadManageDaoImpl uploadManageDao;
	/**
	 * 获取所有精算数据管理
	 * @return
	 */
	public List<SysAsyncExecuteResult> getAllSysAsyncExecuteResult(){
		return this.uploadManageDao.getAllSysAsyncExecuteResult();
	}
}
