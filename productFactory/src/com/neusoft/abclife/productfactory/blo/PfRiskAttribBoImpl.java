/**
 * 
 */
package com.neusoft.abclife.productfactory.blo;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.neusoft.abclife.productfactory.dao.PfRiskAttribDaoImpl;
import com.neusoft.abclife.productfactory.entity.TInsurtypeBasicInf;
import com.neusoft.abclife.productfactory.entity.TInsurtypePsAttribDef;
import com.neusoft.unieap.core.annotation.ModelFile;

/**
 * @author neusoft
 * 
 */
@Service("factoryabclife_pfRiskAttribBo_bo")
@ModelFile(value = "pfRiskAttribBo.bo")
public class PfRiskAttribBoImpl {
	@Resource(name = "factoryabclife_pfRiskAttribDao_dao")
	private PfRiskAttribDaoImpl pfRiskAttrib;

	/**
	 * 
	 */
	public PfRiskAttribBoImpl() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 保全属性查询
	 * @param basic
	 * @return
	 */
	public List<TInsurtypePsAttribDef> queryAttrib(TInsurtypeBasicInf basic) {
		return this.pfRiskAttrib.queryAttrib(basic);
	}

	/**
	 * 保全属性保存
	 * @param basic
	 * @return
	 */
	public String saveAttrib(TInsurtypeBasicInf basic,
			TInsurtypePsAttribDef attrib) {
		String message = "";
		this.pfRiskAttrib.saveAttrib(basic, attrib);
		return message;
	}

}
