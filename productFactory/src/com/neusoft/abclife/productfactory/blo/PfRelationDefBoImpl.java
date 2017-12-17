/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRelationDefDaoImpl;
import com.neusoft.abclife.productfactory.entity.TRelationDef;
import com.neusoft.fdframework.core.base.QueryResult;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Service("factoryabclife_pfRelationDefBo_bo")
@ModelFile(value = "pfRelationDefBo.bo")
public class PfRelationDefBoImpl {
	@Resource(name = "factoryabclife_pfRelationDefDao_dao")
	private PfRelationDefDaoImpl RelationDef;

	/**
	 * 
	 */
	public PfRelationDefBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 相关性定义查询
	 * @param relationDef
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 */
	public QueryResult queryRelationDef(int pageNumber, int pageSize) {

		return this.RelationDef.queryRelationDef(pageNumber, pageSize);

	}

	/**
	 * 相关性定义保存
	 * @param relationDef
	 * @param opt
	 * @return
	 */
	public String saveRelationDef(TRelationDef relationDef, String opt){
		String message="";
		if("add".equals(opt)){
			this.RelationDef.addRelationDef(relationDef);
		}
		if("update".equals(opt)){
			this.RelationDef.updateRelationDef(relationDef);
		}
		return message;
	}
	
	/**
	 * 相关性定义删除
	 * @param relationDef
	 * @return
	 */
	public String delRelationDef(TRelationDef relationDef){
		this.RelationDef.delRelationDef(relationDef);
		return "";
	}

}
